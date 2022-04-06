using Nethereum.Web3;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;
using CryptNG.Autogen.ComputingPaymentToken.ContractDefinition;
using CryptNG.Autogen.ComputingPaymentToken;
using System.Text.Json;
using System.Text;
using app;
using CryptNG.Autogen.BasicEvidencingToken;
using CryptNG.Autogen.BasicEvidencingToken.ContractDefinition;
using System;
using Microsoft.Extensions.Configuration;

namespace app
{
    public class ServiceClient
    {

        private static IConfiguration? _configuration;

        private Account _account = null;
        private Web3 _web3 = null;
        private string _samplesDirectory;
        private string _computingPaymentTokenContractAddress;
        private string _basicEvidencingTokenContractAddress;

        public ServiceClient(IConfiguration? configuration)
        {
            _configuration = configuration;

            _account = new Account(_configuration["Web3:PrivateKeys:owner"], 1337);
            _web3 = new Web3(_account, _configuration["Web3:RPC_URL"]);

            _samplesDirectory = _configuration["SamplesLocation"];

            _computingPaymentTokenContractAddress = _configuration["Web3:Contracts:ComputingPaymentToken"];
            _basicEvidencingTokenContractAddress = _configuration["Web3:Contracts:basicEvidencingToken"];



            Console.WriteLine("OwnerPK: " + _configuration["Web3:PrivateKeys:owner"]);
            Console.WriteLine("RPC: " + _configuration["Web3:RPC"]);
            Console.WriteLine("SAMPLES: " + _configuration["SamplesLocation"]);
            Console.WriteLine("CPT: " + _configuration["Web3:Contracts:ComputingPaymentToken"]);
            Console.WriteLine("BPT: " + _configuration["Web3:Contracts:basicEvidencingToken"]);
        }
        public async Task Run()
        {


            //TODO: make this a cli application
            //TODO: load wallet privateKey/ passphrase to generate privateKey
            //decryption


            Console.WriteLine("& After truffle develop:");
            Console.WriteLine("Did you migrate the contract in develop?");
            Console.WriteLine("After truffle migrate --reset:");
            Console.WriteLine("Did you generate the autogen code with");
            Console.WriteLine("ngc generate from-abi -abi ./ComputingPaymentToken.abi -o . -ns CryptNG.Autogen");
            Console.WriteLine("And then copy the autogen code from WSL to here?");
            Console.WriteLine("This is just temporary");

            Console.WriteLine("Did you update the contract address?");
            Console.WriteLine("Did you update the wallet addresses?");
            Console.WriteLine("Did you start the distiller service?");
            Console.WriteLine();



            //SERVICE API, get secret for service, use it to create executiontoken
            //service can determine your api calls via your secret key you provided 
            //when you generated the clientsecret ib this call
            string clientSecret = _configuration["TempClientSecret"];
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["ServiceApi_URL"]);
            var serviceSecretReq = client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}").Result;



            Console.WriteLine("Service SECRET REQ: " + serviceSecretReq);
            string serviceSecretStr = serviceSecretReq.Content.ReadAsStringAsync().Result;
            Console.WriteLine("Service SECRET: " + serviceSecretStr);
            BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);



            //var serviceSecretBigInt = BigInteger.Parse(serviceSecret);

            //normally a client would not mint a token on every call but rather
            //buy a token with a balance of X, then use up the balance via executiontokens
            //then mint a token either manually or automagically depending on their preferences
            //we mint on every call because i don't want to manually mint a token from time to time.


            ComputingPaymentTokenService cptService = new ComputingPaymentTokenService(_web3, _computingPaymentTokenContractAddress);
            BasicEvidencingTokenService bptService = new BasicEvidencingTokenService(_web3, _basicEvidencingTokenContractAddress);

            var mintFunc = new MintFunction()
            {
                AmountToSend = 10000000000000000,
                To = _account.Address,
                TokenType = 1

            };

            var mintFuncEvidencing = new MintFunction()
            {
                AmountToSend = 10000000000000000,
                To = _account.Address,
                TokenType = 2
            };

            var mintEvent = cptService.ContractHandler.GetEvent<CryptNG.Autogen.ComputingPaymentToken.ContractDefinition.TransferEventDTO>();


            var mintFilter = await mintEvent.CreateFilterAsync();


            var mintReceipt = await cptService.MintRequestAsync(mintFuncEvidencing);

            Console.WriteLine(mintReceipt);

            var mintLog = await mintEvent.GetFilterChangesAsync(mintFilter);


            UInt64 tokenId = 0;
            foreach (var eventLog in mintLog)
            {
                tokenId = (UInt64)eventLog.Event.TokenId;
                Console.WriteLine("Minted: " + eventLog.Event.TokenId);
            }







            UInt64 ticketId = 8;

            var createExecutionTicketFunc = new CreateExecutionTicketFunction()
            {
                ServiceSecret = serviceSecret,
                TokenId = tokenId
            };

            var createTicketEvent = cptService.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
            var createTicketEventFilter = await createTicketEvent.CreateFilterAsync();

            var createTicketReceipt = await cptService.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);

            var createTicketLog = await createTicketEvent.GetFilterChangesAsync(createTicketEventFilter);

            foreach (var eventLog in createTicketLog)
            {
                Console.WriteLine("TicketID: " + eventLog.Event.TicketId);
                ticketId = (UInt64)eventLog.Event.TicketId;
                Console.WriteLine("TokenId: " + eventLog.Event.TokenId);
            }

            string xmlData = System.IO.File.ReadAllText(_samplesDirectory + "/testinputData.xml");
            string xslData = System.IO.File.ReadAllText(_samplesDirectory + "/testinputData2pdf.xsl");
            string requestJson = JsonSerializer.Serialize(new ExecutionRequestModel() { xmlData = xmlData, xslData = xslData, clientSecret = clientSecret, ticketId = ticketId, tokenId = tokenId });
            var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
            var executionReq = client.PostAsync($"/ServiceApi/order", requestStringContent).Result;
            string executionRequestId = executionReq.Content.ReadAsStringAsync().Result;
            Console.WriteLine("Req Result: " + executionRequestId);



            int timeoutInSeconds = 30;
            string OrderResult = "Created";


            while (timeoutInSeconds > 0 && OrderResult == "Created")
            {
                Thread.Sleep(1000);


                try
                {
                    Console.WriteLine("Retriving current order state");
                    OrderResult = client.GetAsync($"/ServiceApi/order/state?requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
                    Console.WriteLine("STATE: " + OrderResult);
                }
                catch (Exception exc)
                {
                    Console.WriteLine($"PdfDestiller GetOrderState Request errored out. Retrying");

                }


                timeoutInSeconds--;



                if (OrderResult == "Error")
                {
                    Console.WriteLine("An Error occurred, retrieving info");
                    string errorRequestResult = client.GetAsync($"/ServiceApi/order/result?requestId={executionRequestId}&tokenId={tokenId}").Result.Content.ReadAsStringAsync().Result;
                    byte[] byData = Convert.FromBase64String(errorRequestResult);
                    string errorResult = Encoding.UTF8.GetString(byData);

                    Console.WriteLine("ERRORDOCUMENT: " + errorResult);
                    return;
                }

                if (OrderResult == "Finished")
                {
                    Console.WriteLine("FINISHED: " + OrderResult);
                    string executionResult = client.GetAsync($"/ServiceApi/order/result?requestId={executionRequestId}&tokenId={tokenId}").Result.Content.ReadAsStringAsync().Result;
                    byte[] byData = Convert.FromBase64String(executionResult);
                    Console.WriteLine("Result binary length: " + byData.Length);
                    System.IO.File.WriteAllBytes("testresult.pdf", byData);
                    Console.WriteLine("Result written");

                    //proofingtoken, check

                    byte[] savedData = File.ReadAllBytes("testresult.pdf");
                    byte[] hashed = HashHelpers.createHashFromByteArray(savedData);
                    BigInteger hashBn = new BigInteger(hashed, true);

                    var verifyHashMapFunction = new VerifyEvidenceHashMapFunction()
                    {

                        FromHash = hashBn

                    };

                    Console.WriteLine("Waiting for evidence to be created");
                    Thread.Sleep(120000);

                    var proof = bptService.VerifyEvidenceHashMapQueryAsync(verifyHashMapFunction).Result;
                    Console.WriteLine("TXHASH FOR PROOF: " + proof);


                    //



                    return;
                }
            }
            //var pdfResult = client.PostAsync($"/ServiceApi/execute?clientSecret={clientSecret}&ticketId={ticketId}", stringContent).Result.Content.ReadAsStringAsync().Result;


            //byte[] data = Convert.FromBase64String(executionReqResStr);

            //System.IO.File.WriteAllBytes("testresult.pdf", data);
            //Console.WriteLine("Result written");




        }
    }
}
