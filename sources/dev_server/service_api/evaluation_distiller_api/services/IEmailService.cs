namespace evaluation_distiller_api.services
{
    public interface IEmailService
    {
        bool SendMail(string receiver, string token);
    }
}
