
using evaluation_distiller_api.services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Reflection;

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
            if (!isValidEmail(userId))
            {
                return StatusCode(400, "The UserId provided was not a real email address");
            }
            if (!Int32.TryParse(captchaSolution, out int n))
            {
                return StatusCode(400, "The captcha provided was not a number");
            }
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
