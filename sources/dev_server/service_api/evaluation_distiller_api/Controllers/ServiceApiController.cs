using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Numerics;
using ApiClient.PdfDestiller;
using System.Net;
using System.Xml;
using evaluation_distiller_api.services;

namespace evaluation_distiller_api.Controllers
{
    [ApiController]
    [Route("api/service")]
    public class ServiceApiController : ControllerBase
    {
        private string _test_secretKey;
        private string _distiller_url;
        private string _tempMemoryDirectory;
        private IConfiguration _configuration;
        private readonly IOrderService _orderService;

        //TYPE 0 does not exist and is due to a mathematical limitation inside the calculations (times 0)
        readonly int[] _typedExecutionBatchSize = { 0, 10, 1 };
        readonly BigInteger _maxTokens = 100000000000;


        private readonly ILogger<ServiceApiController> _logger;

        public ServiceApiController(ILogger<ServiceApiController> logger, IConfiguration configuration, IOrderService orderService)
        {
            _logger = logger;
            _configuration = configuration;
            _orderService = orderService;
            _test_secretKey = _configuration["Setup:Test_SecretKey"];

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
        public async Task<ActionResult> GetResult(string requestId)
        {
            OrderResultPo resultData;
            try
            {

                resultData = _orderService.GetResult(requestId);
            }
            catch (ApiException apiex)
            {
                if (apiex.StatusCode == 400)
                {
                    return new ContentResult() { StatusCode = 400, Content = "You cannot retrieve the order result, it was not generated.", ContentType = "text" };
                }
                return new ContentResult() { StatusCode = apiex.StatusCode, Content = apiex.Message, ContentType = "text" };
            }
            if (resultData.State == "Error")
            {
                return new ContentResult() { StatusCode = 200, Content = resultData.DataAsBase64, ContentType = "text" };
            }

            try
            {
                return new FileContentResult(Convert.FromBase64String(resultData.DataAsBase64), "application/pdf");

            }

            catch (Exception ex)
            {
                return new ContentResult() { StatusCode = 500, Content = ex.Message, ContentType = "text" };
            }
        }

        [HttpGet("order/state")]
        public ActionResult GetState(string requestId)
        {
            return StatusCode(200, _orderService.GetState(requestId));
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

        private int createOrLoadTempFile(string tokenId)
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
            if (!isValidEmail(model.userId))
            {
                return StatusCode(400, "The UserId provided was not a real email address");
            }
            //string wellFormedOrError = isWellFormedXml(model.xmlData);
            //if (wellFormedOrError == null) wellFormedOrError = isWellFormedXml(model.xslData);
            //if (wellFormedOrError != null)
            //{
            //    return StatusCode(500, wellFormedOrError);
            //}

            if (!validateExecutionTicket(model.tokenId, model.userId))
            {
                return StatusCode(401, "Unauthorized, the token could not be validated (userId/token do not match)");
            }




            var requestId = _orderService.CreateOrder(model.xmlData, model.xslData);
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

        private void writeCounterFile(string tokenId, int counter)
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

        private void deleteCounterFile(string tokenId)
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

        private bool validateExecutionTicket(string tokenId, string userId)
        {
            if (tokenId != toServiceSecret(userId, _test_secretKey))
            {
                return false;
            }
            return true;
        }





        public static string toServiceSecret(string text, string secretKey)
        {

            BigInteger val = 0;

            using (var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
            {
                var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                var hexString = "0" + BitConverter.ToString(hash).Replace("-", "");
                val = BigInteger.Parse(
                hexString,
                NumberStyles.HexNumber);

            }

            return val.ToString();

        }



        string? isWellFormedXml(string xmlData)
        {
            try
            {
                var settings = new XmlReaderSettings { DtdProcessing = DtdProcessing.Ignore, XmlResolver = null };

                using (var reader = XmlReader.Create(new StringReader(xmlData), settings))
                {
                    var document = new XmlDocument();
                    document.Load(reader);
                }
                return null;
            }
            catch (Exception exc)
            {
                return exc.Message;
            }
        }

        static bool isValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }


    }
}
