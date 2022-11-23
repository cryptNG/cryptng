using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Numerics;
using ApiClient.PdfDestiller;

namespace evaluation_distiller_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceApiController : ControllerBase
    {
        private string _test_secretKey;
        private string _distiller_url;
        private string _tempMemoryDirectory;
        private IConfiguration _configuration;

        //TYPE 0 does not exist and is due to a mathematical limitation inside the calculations (times 0)
        readonly int[] _typedExecutionBatchSize = { 0, 10, 1 };
        readonly BigInteger _maxTokens = 100000000000;


        private readonly ILogger<ServiceApiController> _logger;

        public ServiceApiController(ILogger<ServiceApiController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

            _test_secretKey = _configuration["Setup:Test_SecretKey"];
            _distiller_url = _configuration["Distiller_URL"];

            _tempMemoryDirectory = _configuration["TempDirectory"];


            try
            {
                if (!Directory.Exists(_tempMemoryDirectory)) Directory.CreateDirectory(_tempMemoryDirectory);
            }
            catch (Exception ex)
            {
                if (!Directory.Exists(_tempMemoryDirectory))
                {
                    Console.WriteLine("[ServiceAPI] " + ex);
                    Environment.Exit(-1);
                }
            }
        }


        [HttpGet("order/result")]
        public async Task<ActionResult> GetResult(UInt64 tokenId, string requestId)
        {
            var resultData = getResult(requestId);

            return StatusCode(200, resultData);
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

        private int getExecutionBatchSize()
        {
            return 100;
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

        private int createOrLoadTempFile(UInt64 tokenId)
        {
            if (!System.IO.File.Exists($"{_tempMemoryDirectory}/{tokenId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{_tempMemoryDirectory}/{tokenId}.cnt", "0");

                }
                catch (Exception ex)
                {
                    if (!System.IO.File.Exists($"{_tempMemoryDirectory}/{tokenId}.cnt"))
                    {
                        throw new Exception("Cannot access counter file " + ex);
                    }
                }
            }
            return Convert.ToInt32(System.IO.File.ReadAllText($"{_tempMemoryDirectory}/{tokenId}.cnt"));
        }



        [HttpPost("order")]
        public ActionResult CreateOrder([FromBody] executionRequestModel model)
        {


            if (!validateExecutionTicket(model.tokenId, model.userId))
            {
                return StatusCode(401, "Unauthorized");
            }




            var requestId = createOrder(model.xmlData, model.xslData);
            int counterMax = getExecutionBatchSize();


            int counter = createOrLoadTempFile(model.tokenId) + 1;

            if (counter >= counterMax)
            {
                deleteCounterFile(model.tokenId);
            }
            else
            {
                writeCounterFile(model.tokenId, counter);
            }
            return StatusCode(200, requestId);
        }

        private void writeCounterFile(UInt64 tokenId, int counter)
        {
            if (System.IO.File.Exists($"{_tempMemoryDirectory}/{tokenId}.cnt"))
            {
                try
                {
                    System.IO.File.WriteAllText($"{_tempMemoryDirectory}/{tokenId}.cnt", counter.ToString());
                }
                catch (Exception ex)
                {
                    Console.WriteLine("[ServiceAPI] " + "Could not write counter " + ex);
                }
            }
        }

        private void deleteCounterFile(UInt64 tokenId)
        {
            try
            {
                System.IO.File.Delete($"{_tempMemoryDirectory}/{tokenId}.cnt");
            }
            catch (Exception ex)
            {
                if (System.IO.File.Exists($"{_tempMemoryDirectory}/{tokenId}.cnt"))
                {
                    Console.WriteLine("[ServiceAPI] " + "Could not delete counterfile: " + ex.Message);
                    Console.WriteLine("[ServiceAPI] " + $"FILE: {_tempMemoryDirectory}/{tokenId}.cnt");
                }
            }

        }

        private bool validateExecutionTicket(UInt64 tokenId, string userId)
        {
            if (tokenId != toServiceSecret(userId))
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
            Console.WriteLine("[ServiceAPI] " + "Result written");



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