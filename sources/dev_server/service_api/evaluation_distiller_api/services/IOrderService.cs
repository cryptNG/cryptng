using ApiClient.PdfDestiller;

namespace evaluation_distiller_api.services
{
    public interface IOrderService
    {
        string CreateOrder(string xmlData, string xslData);
        string GetState(string requestId);
        OrderResultPo GetResult(string requestId);
    }
}
