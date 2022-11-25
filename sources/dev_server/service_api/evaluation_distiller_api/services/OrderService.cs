using ApiClient.PdfDestiller;
using Microsoft.Extensions.Logging;

namespace evaluation_distiller_api.services
{
    public class OrderService : IOrderService
    {
        public OrderService(IConfiguration configuration)
        {
            _configuration = configuration;
            _distiller_url = _configuration["Distiller_URL"];

        }

        public IConfiguration _configuration { get; }

        private string? _distiller_url;

        public string CreateOrder(string xmlData, string xslData)
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

        public string GetState(string requestId)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri(_distiller_url) };
            PdfDestillerClient distiller = new PdfDestillerClient(client);
            return distiller.GetOrderStateAsync(requestId).GetAwaiter().GetResult();
        }



        public OrderResultPo GetResult(string requestId)
        {
            HttpClient client = new HttpClient() { BaseAddress = new Uri(_distiller_url) };
            PdfDestillerClient distiller = new PdfDestillerClient(client);

            var orderResult = distiller.GetOrderResultObjectAsync(requestId).GetAwaiter().GetResult();


            return orderResult;
        }

    }
}
