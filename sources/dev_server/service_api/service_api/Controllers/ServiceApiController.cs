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
        private string _test_secretKey;
        private string _distiller_url;
        private string _tempMemoryDirectory;
        private string _computingPaymentTokenContractAddress;
        private string _basicProofingTokenContractAddress;
        private Account _account;
        private Web3 _web3;
        private IConfiguration _configuration;

        //TYPE 0 does not exist and is due to a mathematical limitation inside the calculations (times 0)
        readonly int[] _typedExecutionBatchSize = { 0, 10, 1 };
        readonly BigInteger _maxTokens = 100000000000;


        private readonly ILogger<ServiceApiController> _logger;

        public ServiceApiController(ILogger<ServiceApiController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

            _account = new Account(_configuration["Web3:PrivateKeys:owner"], 1337);
            _web3 = new Web3(_account, _configuration["Web3:RPC_URL"]);
            _test_secretKey = _configuration["Web3:Test_SecretKey"];
            _distiller_url = _configuration["Distiller_URL"];

            _tempMemoryDirectory = _configuration["TempDirectory"];

            _computingPaymentTokenContractAddress = _configuration["Web3:Contracts:ComputingPaymentToken"];
            _basicProofingTokenContractAddress = _configuration["Web3:Contracts:BasicProofingToken"];

            try
            {
                if (!Directory.Exists(_tempMemoryDirectory)) Directory.CreateDirectory(_tempMemoryDirectory);
            }
            catch (Exception ex)
            {
                if (!Directory.Exists(_tempMemoryDirectory))
                {
                    Console.WriteLine(ex);
                    Environment.Exit(-1);
                }
            }
        }


        [HttpGet("order/result")]
        public async Task<ActionResult> GetResult(UInt64 tokenId, string requestId)
        {

            var resultData = getResult(requestId);

            if (isProofingToken(tokenId) && hasStoredTransactionHash(requestId, tokenId))
            {
                byte[] hashed = createHashFromBase64String(resultData);
                BigInteger txHash = loadTransactionHashFromRequestId(requestId, tokenId);
                await createBlockchainProof(new BigInteger(hashed, true), txHash); //BigInteger(byte[], bool IsUnsigned)
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
                System.IO.File.WriteAllText($"{_tempMemoryDirectory}/{requestId}_{tokenId}.txh", txHash);

            }
            catch (Exception ex)
            {
                if (!System.IO.File.Exists($"{_tempMemoryDirectory}//{requestId}_{tokenId}.txh"))
                {
                    throw new Exception("Cannot access counter requestId to txHash mapFile " + ex);
                }
            }

        }


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

        private async Task createBlockchainProof(BigInteger fileHash, BigInteger txHash)
        {
            BasicProofingTokenService service = new BasicProofingTokenService(_web3, _basicProofingTokenContractAddress);



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

            return BigInteger.Parse(System.IO.File.ReadAllText($"{_tempMemoryDirectory}//{requestId}_{tokenId}.txh").Replace("x", ""), NumberStyles.HexNumber);
        }

        private void deleteTransactionHashToRequestIdMappingFile(string requestId, UInt64 tokenId)
        {
            System.IO.File.Delete($"{_tempMemoryDirectory}//{requestId}_{tokenId}.txh");
        }

        private int createOrLoadTempFile(string clientSecret, UInt64 ticketId)
        {
            if (!System.IO.File.Exists($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt", "0");

                }
                catch (Exception ex)
                {
                    if (!System.IO.File.Exists($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
                    {
                        throw new Exception("Cannot access counter file " + ex);
                    }
                }
            }
            return Convert.ToInt32(System.IO.File.ReadAllText($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"));
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
            return System.IO.File.Exists($"{_tempMemoryDirectory}//{requestId}_{tokenId}.txh");
        }

        private void writeCounterFile(string clientSecret, UInt64 ticketId, int counter)
        {
            if (System.IO.File.Exists($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt", counter.ToString());
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
                System.IO.File.Delete($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt");
            }
            catch (Exception ex)
            {
                if (System.IO.File.Exists($"{_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt"))
                {
                    Console.WriteLine("Could not delete counterfile: " + ex.Message);
                    Console.WriteLine($"FILE: {_tempMemoryDirectory}/{clientSecret}_{ticketId}.cnt");
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

            ComputingPaymentTokenService service = new ComputingPaymentTokenService(_web3, _computingPaymentTokenContractAddress);



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

            ComputingPaymentTokenService service = new ComputingPaymentTokenService(_web3, _computingPaymentTokenContractAddress);



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
            HttpClient client = new HttpClient() { BaseAddress = new Uri(_distiller_url) };
            PdfDestillerClient distiller = new PdfDestillerClient(client);

            var pdfResult = distiller.GetPdfDocumentObjectAsync(requestId).GetAwaiter().GetResult();

            byte[] data = Convert.FromBase64String(pdfResult.DataAsBase64);

            System.IO.File.WriteAllBytes("testresult.pdf", data);
            Console.WriteLine("Result written");



            return pdfResult.DataAsBase64;
        }

        private string getState(string requestId)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri(_distiller_url) };
            PdfDestillerClient distiller = new PdfDestillerClient(client);
            return distiller.GetOrderStateAsync(requestId).GetAwaiter().GetResult();
        }

        private string createOrder(string xmlData, string xslData)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri(_distiller_url) };
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

            BigInteger val = 0;

            using (var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(_test_secretKey)))
            {
                var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                var hexString = "0" + BitConverter.ToString(hash).Replace("-", "");
                val = BigInteger.Parse(
                hexString,
                NumberStyles.HexNumber);

            }

            return val;

        }


    }
}
