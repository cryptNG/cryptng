
using evaluation_distiller_api.services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace evaluation_distiller_api.Controllers
{
    [ApiController]
    [Route("api/captcha")]
    public class CaptchaController : ControllerBase
    {
        private string _test_secretKey;
        private IConfiguration _configuration;
        private readonly ILogger<ServiceApiController> _logger;

        public CaptchaController(ILogger<ServiceApiController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        public ActionResult GetCaptcha()
        {
            var captcha = CaptchaProvider.GenerateCaptchaImageAsByteArray(HttpContext);
            var resJson = new
            {
                ImageAsBase64 = Convert.ToBase64String(captcha.img),
                SecretAsBase64 = Convert.ToBase64String(captcha.enc)
            };
            return new ContentResult()
            {

                Content = JsonSerializer.Serialize(resJson),
                ContentType = "application/json"
            };
        }




    }
}
