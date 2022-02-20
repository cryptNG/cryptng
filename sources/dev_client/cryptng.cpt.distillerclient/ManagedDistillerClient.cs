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

namespace CryptNg.CPT.DistillerClient
{
    public class ManagedDistillerClient
    {
        string contractAddress;
        Account? account = null;
        Web3? web3 = null;
        HttpClient client = null;

        public ManagedDistillerClient(Uri rpcUrl, string privateKey, int chainId, string contractAddress, Uri serviceUrl)
        {
            this.contractAddress = contractAddress;
            this.account = new Account(privateKey, chainId);
            this.web3 = new Web3(account, rpcUrl.ToString());
            this.client = new HttpClient();
            this.client.BaseAddress = serviceUrl;
        }

        public async Task<bool> MintAsync(BigInteger amountToSend)
        {
            try
            {
                ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
                var mintFunc = new MintFunction()
                {
                    AmountToSend = amountToSend,
                    To = account.Address
                };

                var mintEvent = service.ContractHandler.GetEvent<TransferEventDTO>();
                var mintFilter = await mintEvent.CreateFilterAsync();

                var mintReceipt = await service.MintRequestAsync(mintFunc);

                var mintLog = await mintEvent.GetFilterChangesAsync(mintFilter);

                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public bool Mint(BigInteger amountToSend)
        {
            try
            {
                ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
                var mintFunc = new MintFunction()
                {
                    AmountToSend = amountToSend,
                    To = account.Address
                };

                var mintEvent = service.ContractHandler.GetEvent<TransferEventDTO>();
                var mintFilter = mintEvent.CreateFilterAsync().Result;

                var mintReceipt = service.MintRequestAsync(mintFunc);

                var mintLog = mintEvent.GetFilterChangesAsync(mintFilter);


                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public Tuple<byte[],string> CreateOrderWaitForResult(string xmlData, string xslData, int timeOutSeconds, int amountToSend)
        {
            string clientSecret = new Random().Next().ToString();   
            var serviceSecretReq = client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}").Result;

            string serviceSecretStr = serviceSecretReq.Content.ReadAsStringAsync().Result;
            BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);

            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
            var mintFunc = new MintFunction()
            {
                AmountToSend = amountToSend,
                To = account.Address
            };



            BigInteger ticketId = -1;

            var createExecutionTicketFunc = new CreateExecutionTicketFunction()
            {
                ServiceSecret = serviceSecret

            };

            var createTicketEvent = service.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
            var createTicketEventFilter = createTicketEvent.CreateFilterAsync().Result;

            var createTicketReceipt = service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc).Result;

            var createTicketLog = createTicketEvent.GetFilterChangesAsync(createTicketEventFilter).Result;

            foreach (var eventLog in createTicketLog)
            {
                ticketId = eventLog.Event.TicketId;
            }

            string requestJson = JsonSerializer.Serialize(new executionRequestModel() { xmlData = xmlData, xslData = xslData });
            var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
            var executionReq = client.PostAsync($"/ServiceApi/order?clientSecret={clientSecret}&ticketId={ticketId}", requestStringContent).Result;
            string executionRequestId = executionReq.Content.ReadAsStringAsync().Result;

            string OrderResult = "Created";


            while (timeOutSeconds > 0 && OrderResult == "Created")
            {
                Thread.Sleep(1000);


                try
                {
                    Console.WriteLine("Retriving current order state");
                    OrderResult = client.GetAsync($"/ServiceApi/order/state?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
                    Console.WriteLine("STATE: " + OrderResult);
                }
                catch (Exception exc)
                {
                    Console.WriteLine($"PdfDestiller GetOrderState Request errored out. Retrying");

                }


                timeOutSeconds--;



                if (OrderResult == "Error")
                {
                    Console.WriteLine("An Error occurred, retrieving info");
                    string errorRequestResult = client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
                    byte[] byData = Convert.FromBase64String(errorRequestResult);

                    return new Tuple<byte[],string>(byData,OrderResult);
                }

                if (OrderResult == "Finished")
                {
                    Console.WriteLine("FINISHED: " + OrderResult);
                    string executionResult = client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
                    byte[] byData = Convert.FromBase64String(executionResult);
                    return new Tuple<byte[], string>(byData, OrderResult);
                }
            }

            string sResult = "Something went wrong, this result was generated as a placeholder and does not stem from any server communication";
            string sResultB64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(sResult));
            byte[] sByData = Convert.FromBase64String(sResultB64);
            return new Tuple<byte[], string>(sByData,"Error");
        }


        public async Task<Tuple<byte[], string>> CreateOrderStoreResultOnSuccessAsync(string xmlData, string xslData, int timeOutSeconds, int amountToSend)
        {
            string clientSecret = new Random().Next().ToString();
            var serviceSecretReq = await client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}");

            string serviceSecretStr = await serviceSecretReq.Content.ReadAsStringAsync();
            BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);

            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
            var mintFunc = new MintFunction()
            {
                AmountToSend = amountToSend,
                To = account.Address
            };



            BigInteger ticketId = -1;

            var createExecutionTicketFunc = new CreateExecutionTicketFunction()
            {
                ServiceSecret = serviceSecret

            };

            var createTicketEvent = service.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
            var createTicketEventFilter = await createTicketEvent.CreateFilterAsync();

            var createTicketReceipt = await service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);

            var createTicketLog = await createTicketEvent.GetFilterChangesAsync(createTicketEventFilter);

            foreach (var eventLog in createTicketLog)
            {
                ticketId = eventLog.Event.TicketId;
            }

            string requestJson = JsonSerializer.Serialize(new executionRequestModel() { xmlData = xmlData, xslData = xslData });
            var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
            var executionReq = await client.PostAsync($"/ServiceApi/order?clientSecret={clientSecret}&ticketId={ticketId}", requestStringContent);
            string executionRequestId = await executionReq.Content.ReadAsStringAsync();

            string OrderResult = "Created";


            while (timeOutSeconds > 0 && OrderResult == "Created")
            {
                Thread.Sleep(1000);


                try
                {
                    Console.WriteLine("Retriving current order state");
                    OrderResult = await client.GetAsync($"/ServiceApi/order/state?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync();
                    Console.WriteLine("STATE: " + OrderResult);
                }
                catch (Exception exc)
                {
                    Console.WriteLine($"PdfDestiller GetOrderState Request errored out. Retrying");

                }


                timeOutSeconds--;



                if (OrderResult == "Error")
                {
                    Console.WriteLine("An Error occurred, retrieving info");
                    string errorRequestResult = await client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync();
                    byte[] byData = Convert.FromBase64String(errorRequestResult);

                    return new Tuple<byte[], string>(byData, OrderResult);
                }

                if (OrderResult == "Finished")
                {
                    Console.WriteLine("FINISHED: " + OrderResult);
                    string executionResult = await client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync();
                    byte[] byData = Convert.FromBase64String(executionResult);
                    return new Tuple<byte[], string>(byData, OrderResult);
                }
            }

            string sResult = "Something went wrong, this result was generated as a placeholder and does not stem from any server communication";
            string sResultB64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(sResult));
            byte[] sByData = Convert.FromBase64String(sResultB64);
            return new Tuple<byte[], string>(sByData, "Error");
        }
    }
}