using System.Net.Mail;
using System.Net;
using System.Xml.Linq;
using System.Text;
using System.Xml;

namespace evaluation_distiller_api.services
{
    public class EmailService : IEmailService
    {
        public EmailService(IConfiguration configuration, IOrderService orderService)
        {
            _configuration = configuration;
            _orderService = orderService;
        }

        public IConfiguration _configuration { get; }
        public IOrderService _orderService { get; }

        public bool SendMail(string receiver, string token)
        {
            var smtpClient = new SmtpClient("smtp.ionos.de")
            {
                Port = 587,
                Credentials = new NetworkCredential(_configuration["PDFWEAVER_EMAIL"], _configuration["PDFWEAVER_PASSWORD"]),
                EnableSsl = true,
            };

            string receiptXml = File.ReadAllText("receipt/receipt.xml");
            receiptXml = updateXmlString(receiptXml, receiver, token);
            string receiptXsl = File.ReadAllText("receipt/receipt.xsl");


            string requestId = _orderService.CreateOrder(receiptXml, receiptXsl);
            string orderState = "Created";
            while (orderState == "Created")
            {
                Thread.Sleep(500);
                orderState = _orderService.GetState(requestId);
            }
            if (orderState == "Error")
            {
                Console.WriteLine("An Error occured while creating the PDF Receipt for a Token Request");
                var res = _orderService.GetResult(requestId);
                byte[] decodedBytes = Convert.FromBase64String(res.DataAsBase64);
                string decodedText = Encoding.UTF8.GetString(decodedBytes);
                Console.WriteLine(decodedText);
            }
            if (orderState == "Finished")
            {
                var orderRes = _orderService.GetResult(requestId);
                byte[] orderFileBytes = Convert.FromBase64String(orderRes.DataAsBase64);
                Attachment pdfAttachment = new Attachment(new MemoryStream(orderFileBytes), "token_receipt.pdf");
                MailMessage receipt = new MailMessage(_configuration["PDFWEAVER_EMAIL"], receiver)
                {
                    Sender = new MailAddress(_configuration["PDFWEAVER_EMAIL"]),
                    Subject = "Thank you for trying out Pdf Weaver!",
                    Priority = MailPriority.High,
                    Body = $"Dear User,<br/> please find attached the receipt document that contains the token you can use during your <u>evaluation period</u> of our <b>Pdf Weaver</b> service<br/>This is your token (for your convenience): <b>{token}</b>  <br/>Thank you for trusting us!<br/><br/>Sincerely, the CryptNG Team",
                    IsBodyHtml = true
                };
                receipt.Attachments.Add(pdfAttachment);
                smtpClient.Send(receipt);
                return true;
            }
            return false;


        }

        private string updateXmlString(string xmlString, string receiver, string token)
        {

            StringBuilder builder = new StringBuilder(xmlString);
            builder.Replace("[invoicenumber]", Guid.NewGuid().ToString());
            builder.Replace("[invoicedate]", DateTime.Now.ToShortDateString());
            builder.Replace("[purchaseordernumber]", $"{DateTime.Now.Day}/{DateTime.Now.Year}");
            builder.Replace("[duedate]", "no due date");

            builder.Replace("[shipto_name]", receiver);
            builder.Replace("[shipto_street]", "online");
            builder.Replace("[shipto_zipcode]", "");
            builder.Replace("[shipto_city]", "");

            builder.Replace("[billto_name]", receiver);
            builder.Replace("[billto_street]", "online");
            builder.Replace("[billto_zipcode]", "");
            builder.Replace("[billto_city]", "");

            builder.Replace("[accesstoken]", token);

            return builder.ToString();

        }


    }
}
