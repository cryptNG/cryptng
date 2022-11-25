
using evaluation_distiller_api.captcha;
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

        public TokenController(ILogger<ServiceApiController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _test_secretKey = _configuration["Setup:Test_SecretKey"];
        }

        [HttpGet]
        public ActionResult GetToken(string userId, string captchaSolution, string captchaSecret)
        {
            if (!CaptchaProvider.CheckCaptchaResult(HttpContext, captchaSolution, captchaSecret))
            {
                return new ContentResult() { Content = "The Captcha was incorrect!", ContentType = "text", StatusCode = 401};
            }
            return new ContentResult()
            {
                Content = ServiceApiController.toServiceSecret(userId, _test_secretKey).ToString(),
                ContentType = "text",
                StatusCode = 200
            };
        }




    }
}
