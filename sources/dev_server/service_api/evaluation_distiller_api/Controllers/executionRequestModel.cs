using System.Numerics;

namespace evaluation_distiller_api.Controllers
{
    public class executionRequestModel
    {
        public string xmlData { get; set; }
        public string xslData { get; set; }

        public string tokenId { get; set; }

        public string userId { get; set; }

    }
}
