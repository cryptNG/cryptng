
using evaluation_distiller_api.services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace evaluation_distiller_api.Controllers
{
    [ApiController]
    [Route("api/token")]
    public class TokenController : ControllerBase
    {
        private string _test_secretKey;
        private IConfiguration _configuration;
        private readonly ILogger<ServiceApiController> _logger;
        private IEmailService _emailService;


        public TokenController(ILogger<ServiceApiController> logger, IConfiguration configuration, IEmailService emailService)
        {
            _logger = logger;
            _configuration = configuration;
            _test_secretKey = _configuration["Setup:Test_SecretKey"];
            _emailService = emailService;
        }

        [HttpGet]
        public ActionResult GetToken(string userId, string captchaSolution, string captchaSecret)
        {
            if (!CaptchaProvider.CheckCaptchaResult(HttpContext, captchaSolution, captchaSecret))
            {
                return new ContentResult() { Content = "The Captcha was incorrect!", ContentType = "text", StatusCode = 401 };
            }
            string serviceSecret = ServiceApiController.toServiceSecret(userId, _test_secretKey).ToString();

            new Thread(() =>
            {
                this._emailService.SendMail(userId, serviceSecret);
            }).Start();
            return new ContentResult()
            {
                Content = serviceSecret,
                ContentType = "text",
                StatusCode = 200
            };
        }




    }
}
