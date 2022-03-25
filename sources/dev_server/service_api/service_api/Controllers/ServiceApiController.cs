using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
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
using CryptNG.Autogen.BasicProofingToken.ContractDefinition;
using CryptNG.Autogen.BasicProofingToken;
using ApiClient.PdfDestiller;



namespace service_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceApiController : ControllerBase
    {

        private const string net_containerDevelop = "http://localhost:9545";
        private static string tempMemoryDirectory = "counters";
        private static string computingPaymentTokenContractAddress = "0xCE476007bd55342bc348aBD5d4C46B2967D46D30";
        private static string basicProofingTokenContractAddress = "0xab512A8125430e48b9ed1d203da737D9a3aE0965";
        private static string privateKey = "2163b1f7cb60228ec5adad6347e0768cfe909eec7a84b833c21ae516303d70d8";


        private readonly ILogger<ServiceApiController> _logger;

        public ServiceApiController(ILogger<ServiceApiController> logger)
        {
            _logger = logger;


            try
            {
                if (!Directory.Exists(tempMemoryDirectory)) Directory.CreateDirectory(tempMemoryDirectory);
            }
            catch (Exception ex)
            {
                if (!Directory.Exists(tempMemoryDirectory))
                {
                    Console.WriteLine(ex);
                    Environment.Exit(-1);
                }
            }
        }


        [HttpGet("order/result")]
        public ActionResult GetResult(UInt64 tokenId, string requestId)
        {

            var resultData = getResult(requestId);

            if (isProofingToken(tokenId) && hasStoredTransactionHash(requestId, tokenId))
            {
                byte[] hashed = createHashFromBase64String(resultData);
                BigInteger txHash = loadTransactionHashFromRequestId(requestId, tokenId);
                createBlockchainProof(new BigInteger(hashed, true), txHash); //BigInteger(byte[], bool IsUnsigned)
                return StatusCode(200, resultData);
            }


            return StatusCode(200, resultData);
        }

        private byte[] createHashFromBase64String(string b64) => createSha256(Convert.FromBase64String(b64));

        private byte[] createSha256(byte[] bin)
        {
            var sha512 = SHA256.Create();
            return sha512.ComputeHash(bin);

        }

        [HttpGet("order/state")]
        public ActionResult GetState(string requestId)
        {


            return StatusCode(200, getState(requestId));
        }

        private void storeTransactionHashToRequestId(string requestId, UInt64 tokenId, string txHash)
        {

            try
            {
                System.IO.File.WriteAllText($"{tempMemoryDirectory}/{requestId}_{tokenId}.txh", txHash);

            }
            catch (Exception ex)
            {
                if (!System.IO.File.Exists($"{tempMemoryDirectory}//{requestId}_{tokenId}.txh"))
                {
                    throw new Exception("Cannot access counter requestId to txHash mapFile " + ex);
                }
            }

        }

        //TYPE 0 does not exist and is due to a mathematical limitation inside the calculations (times 0)
        readonly int[] _typedExecutionBatchSize = { 0, 10, 1 };
        readonly BigInteger _maxTokens = 100000000000;


        private int getTypeByTokenId(BigInteger tokenId)
        {
            return (int)(tokenId / _maxTokens);
        }

        private int getExecutionBatchSize(BigInteger tokenId)
        {
            return _typedExecutionBatchSize[getTypeByTokenId(tokenId)];
        }

        private bool isProofingToken(BigInteger tokenId)
        {
            return getTypeByTokenId(tokenId) == TokenTypes.ProofingType;
        }

        private async void createBlockchainProof(BigInteger fileHash, BigInteger txHash)
        {
            var account = new Account(privateKey, 1337);
            var web3 = new Web3(account, net_containerDevelop);
            BasicProofingTokenService service = new BasicProofingTokenService(web3, basicProofingTokenContractAddress);



            var mintHashMapProofFunc = new MintHashMapProofFunction()
            {
                FromHash = fileHash,
                ToHash = txHash
            };


            //var mintHashMapProofEvent = service.ContractHandler.GetEvent<MintedHashMapProofEventDTO>();

            await service.MintHashMapProofRequestAsync(mintHashMapProofFunc);
        }

        private BigInteger loadTransactionHashFromRequestId(string requestId, UInt64 tokenId)
        {
            //TODO: Unsigned?

            return BigInteger.Parse(System.IO.File.ReadAllText($"{tempMemoryDirectory}//{requestId}_{tokenId}.txh").Replace("x", ""), NumberStyles.HexNumber);
        }

        private void deleteTransactionHashToRequestIdMappingFile(string requestId, UInt64 tokenId)
        {
            System.IO.File.Delete($"{tempMemoryDirectory}//{requestId}_{tokenId}.txh");
        }

        private int createOrLoadTempFile(string clientSecret, UInt64 ticketId)
        {
            if (!System.IO.File.Exists($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt", "0");

                }
                catch (Exception ex)
                {
                    if (!System.IO.File.Exists($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
                    {
                        throw new Exception("Cannot access counter file " + ex);
                    }
                }
            }
            return Convert.ToInt32(System.IO.File.ReadAllText($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"));
        }



        [HttpPost("order")]
        public ActionResult CreateOrder([FromBody] executionRequestModel model)
        {


            if (!validateExecutionTicket(model.tokenId, model.ticketId, model.clientSecret))
            {
                return StatusCode(401, "Unauthorized");
            }




            var requestId = createOrder(model.xmlData, model.xslData);
            int counterMax = getExecutionBatchSize(model.tokenId);


            int counter = createOrLoadTempFile(model.clientSecret, model.ticketId) + 1;

            if (counter >= counterMax)
            {
                var result = serviceBurnExecutionTicket(model.ticketId);
                if (isProofingToken(result.tokenId))
                {
                    storeTransactionHashToRequestId(requestId, model.tokenId, result.txHash);
                }
                deleteCounterFile(model.clientSecret, model.ticketId);
            }
            else
            {
                writeCounterFile(model.clientSecret, model.ticketId, counter);
            }
            return StatusCode(200, requestId);
        }

        private bool hasStoredTransactionHash(string requestId, UInt64 tokenId)
        {
            return System.IO.File.Exists($"{tempMemoryDirectory}//{requestId}_{tokenId}.txh");
        }

        private void writeCounterFile(string clientSecret, UInt64 ticketId, int counter)
        {
            if (System.IO.File.Exists($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt", counter.ToString());
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Could not write counter " + ex);
                }
            }
        }

        private void deleteCounterFile(string clientSecret, UInt64 ticketId)
        {
            try
            {
                System.IO.File.Delete($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt");
            }
            catch (Exception ex)
            {
                if (System.IO.File.Exists($"{tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
                {
                    Console.WriteLine("Could not delete counterfile: " + ex.Message);
                    Console.WriteLine($"FILE: {tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt");
                }
            }

        }


        [HttpGet("createsecret")]
        public string CreateServiceSecret(string clientSecret)
        {
            return toServiceSecret(clientSecret).ToString();
        }

        private (BigInteger tokenId, string txHash) serviceBurnExecutionTicket(BigInteger ticketId)
        {
            //no need for extra security, the services are contained within docker
            //the distiller is set to dns:0.0.0.0 in the compose
            //this disables any outside connections to it, it can only be accessed from
            //within the container ecosystem

            var account = new Account(privateKey, 1337);
            var web3 = new Web3(account, net_containerDevelop);
            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, computingPaymentTokenContractAddress);



            var serviceBurnTicketFunction = new ServiceBurnExecutionTicketsFunction()
            {
                TicketId = ticketId
            };


            var burnTicketEvent = service.ContractHandler.GetEvent<ExecutionTicketBurnedEventDTO>();
            var burnTicketEventFilter = burnTicketEvent.CreateFilterAsync().Result;

            var createTicketReceipt = service.ServiceBurnExecutionTicketsRequestAndWaitForReceiptAsync(serviceBurnTicketFunction).Result;

            var burnedTicketLog = burnTicketEvent.GetFilterChangesAsync(burnTicketEventFilter).Result;

            BigInteger tokenId = 0;
            foreach (var eventLog in burnedTicketLog)
            {
                Console.WriteLine("TicketID: " + eventLog.Event.TicketId);
                Console.WriteLine("TokenId: " + eventLog.Event.TokenId);
                if (eventLog.Event.TicketId == ticketId)
                {
                    tokenId = eventLog.Event.TokenId;
                }

            }
            return (tokenId, createTicketReceipt.TransactionHash);
        }



        //TBD: do we create mapping of executionticket to tokenid
        private bool validateExecutionTicket(UInt64 tokenId, UInt64 ticketId, string clientSecret)
        {

            var account = new Account(privateKey, 1337);
            var web3 = new Web3(account, net_containerDevelop);
            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, computingPaymentTokenContractAddress);



            var getTicketSecretFunc = new GetTicketSecretFunction()
            {
                TicketId = ticketId,
                TokenId = tokenId
            };


            var tSecret = service.GetTicketSecretQueryAsync(getTicketSecretFunc).Result;

            if (tSecret != toServiceSecret(clientSecret))
            {
                return false;
            }
            return true;
        }


        private string getResult(string requestId)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri("http://localhost:8080") };
            PdfDestillerClient distiller = new PdfDestillerClient(client);

            var pdfResult = distiller.GetPdfDocumentObjectAsync(requestId).GetAwaiter().GetResult();

            byte[] data = Convert.FromBase64String(pdfResult.DataAsBase64);

            System.IO.File.WriteAllBytes("testresult.pdf", data);
            Console.WriteLine("Result written");



            return pdfResult.DataAsBase64;
        }

        private string getState(string requestId)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri("http://localhost:8080") };
            PdfDestillerClient distiller = new PdfDestillerClient(client);
            return distiller.GetOrderStateAsync(requestId).GetAwaiter().GetResult();
        }

        private string createOrder(string xmlData, string xslData)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri("http://localhost:8080") };
            PdfDestillerClient distiller = new PdfDestillerClient(client);
            string requestId = DateTime.Now.Ticks.ToString();
            distiller.PostOrderAsync(new OrderPo()
            {
                RequestId = requestId,
                XmlData = xmlData,
                XslData = xslData
            }).GetAwaiter().GetResult();
            return requestId;
        }


        private BigInteger toServiceSecret(string text)
        {
            string key = "ourSecretKey";
            BigInteger val = 0;

            using (var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(key)))
            {
                var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                var hexString = "0" + BitConverter.ToString(hash).Replace("-", "");
                val = BigInteger.Parse(
                hexString,
                NumberStyles.HexNumber);

            }

            return val;

        }



        //[HttpPost("order/result")]
        //public ActionResult Execute(string clientSecret, Int64 ticketId, [FromBody] executionRequestModel model)
        //{

        //    if (!validateExecutionTicket(ticketId, clientSecret))
        //    {
        //        return StatusCode(401, "Unauthorized");
        //    }


        //    return StatusCode(200, requestPdf(model.xmlData, model.xslData));
        //}


        //private string requestPdf(string xmlData, string xslData)
        //{
        //    HttpClient client = new HttpClient() { BaseAddress = new Uri("http://localhost:8080") };
        //    PdfDestillerClient distiller = new PdfDestillerClient(client);
        //    string requestId = DateTime.Now.Ticks.ToString();
        //    distiller.PostOrderAsync(new OrderPo()
        //    {
        //        RequestId = requestId,
        //        XmlData = xmlData,
        //        XslData = xslData
        //    }).GetAwaiter().GetResult();

        //    int timeoutInSeconds = 30;
        //    string OrderResult = "Created";


        //    while (timeoutInSeconds > 0 && OrderResult == "Created")
        //    {
        //        Thread.Sleep(1000);

        //        try
        //        {
        //            OrderResult = distiller.GetOrderStateAsync(requestId).GetAwaiter().GetResult();
        //        }
        //        catch (Exception exc)
        //        {
        //            Console.WriteLine($"PdfDestiller GetOrderState Request errored out. Retrying");

        //        }


        //        timeoutInSeconds--;
        //    }

        //    if (OrderResult == "Error")
        //    {
        //        Console.WriteLine("An Error occurred, retrieving info");
        //        var errorResultB64 = distiller.GetPdfDocumentObjectAsync(requestId).GetAwaiter().GetResult().DataAsBase64;
        //        byte[] byData = Convert.FromBase64String(errorResultB64);
        //        string errorResult = Encoding.UTF8.GetString(byData);

        //        Console.WriteLine("ERRORDOCUMENT: " + errorResult);
        //        return errorResult;
        //    }

        //    if (OrderResult != "Finished")
        //    {
        //        Console.WriteLine("FINISHED: " + OrderResult);
        //    }

        //    var pdfResult = distiller.GetPdfDocumentObjectAsync(requestId).GetAwaiter().GetResult();

        //    byte[] data = Convert.FromBase64String(pdfResult.DataAsBase64);

        //    System.IO.File.WriteAllBytes("testresult.pdf", data);
        //    Console.WriteLine("Result written");

        //    return pdfResult.DataAsBase64;

        //}
    }
}
