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
using CryptNG.Autogen.BasicEvidencingToken.ContractDefinition;
using CryptNG.Autogen.BasicEvidencingToken;
using ApiClient.PdfDestiller;



namespace service_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {

        private IConfiguration _configuration;


        private readonly ILogger<ServiceApiController> _logger;

        public HealthController(ILogger<ServiceApiController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

        }


        [HttpGet]
        public ActionResult GetResult()
        {
            const string result = "{\"QUESTION\":\"What is the meaning of Life, the Universe, and Everything?\",\"ANSWER\":42}";
            return StatusCode(200, result);
        }


    }
}
