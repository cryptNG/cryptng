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
using CryptNG.Autogen.cryptngTesttoken.ContractDefinition;
using CryptNG.Autogen.cryptngTesttoken;
using ApiClient.PdfDestiller;

public class executionRequestModel
{
    public string xmlData { get; set; }
    public string xslData { get; set; }
}

namespace test_server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestServiceController : ControllerBase
    {


        private readonly ILogger<TestServiceController> _logger;

        public TestServiceController(ILogger<TestServiceController> logger)
        {
            _logger = logger;
        }


        [HttpGet("order/result")]
        public ActionResult GetResult(string clientSecret, Int64 ticketId, string requestId)
        {

            if (!validateExecutionTicket(ticketId, clientSecret))
            {
                return StatusCode(401, "Unauthorized");
            }


            return StatusCode(200, getResult(requestId));
        }

        [HttpGet("order/state")]
        public ActionResult GetState(string clientSecret, Int64 ticketId, string requestId)
        {

            if (!validateExecutionTicket(ticketId, clientSecret))
            {
                return StatusCode(401, "Unauthorized");
            }


            return StatusCode(200, getState(requestId));
        }

        [HttpPost("order")]
        public ActionResult CreateOrder(string clientSecret, Int64 ticketId, [FromBody] executionRequestModel model)
        {
            
            if(!validateExecutionTicket(ticketId, clientSecret))
            {
                return StatusCode(401,"Unauthorized");
            }
           

            return StatusCode(200, createOrder(model.xmlData, model.xslData));
        }



        [HttpGet("createsecret")]
        public string CreateServiceSecret(string clientSecret)
        {
            
            return toServiceSecret(clientSecret).ToString();
        }

        private bool validateExecutionTicket(Int64 ticketId, string clientSecret)
        {var net_localdevelop = "http://localhost:9545";
            var net_noventdevelopment = "http://192.168.0.7:9545";
            var privateKey = "f973e5765aa921c3e848fe5dfbf696f37029343b597bcaf2d6fe48da67d81734";
            var account = new Account(privateKey, 1337);
            var web3 = new Web3(account, net_localdevelop);
            var contractAddress = "0x59F79f6CC2B522EEf168A1384ebaE6a1A01B6508";
            CryptngTesttokenService service = new CryptngTesttokenService(web3, contractAddress);



            var getTicketSecretFunc = new GetTicketSecretFunction()
            {
                TicketId = ticketId
            };


            var tSecret = service.GetTicketSecretQueryAsync(getTicketSecretFunc).Result;

            if(tSecret != toServiceSecret(clientSecret))
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
                var hexString = "0"+BitConverter.ToString(hash).Replace("-","");
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