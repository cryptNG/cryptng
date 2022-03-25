using System.Numerics;

namespace service_api.Controllers
{
    public class executionRequestModel
    {
        public string xmlData { get; set; }
        public string xslData { get; set; }

        public UInt64 tokenId { get; set; }

        public UInt64 ticketId { get; set; }

        public string clientSecret { get; set; }

    }
}
