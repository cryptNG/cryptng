using Nethereum.Web3;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;
using CryptNG.Autogen.ComputingPaymentToken.ContractDefinition;
using CryptNG.Autogen.ComputingPaymentToken;
using System.Text.Json;
using System.Text;

namespace CryptNg.CPT.DistillerClient
{
    public class DistillerClient
    {
        string contractAddress;
        Account? account = null;
        Web3? web3 = null;
        HttpClient client = null;

        public DistillerClient(Uri rpcUrl, string privateKey, int chainId, string contractAddress, Uri serviceUrl)
        {
            this.contractAddress = contractAddress;
            this.account = new Account(privateKey, chainId);
            this.web3 = new Web3(account, rpcUrl.ToString());
            this.client = new HttpClient();
            this.client.BaseAddress = serviceUrl;
        }
        
        public BigInteger GetServiceSecret(string clientSecret)
        {
            var serviceSecretReq = client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}").Result;

            string serviceSecretStr = serviceSecretReq.Content.ReadAsStringAsync().Result;
            BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);
            return serviceSecret;
        }

        public async Task<BigInteger> GetServiceSecretAsync(string clientSecret)
        {
            var serviceSecretReq = await client.GetAsync($"/ServiceApi/createsecret?clientSecret={clientSecret}");

            string serviceSecretStr = serviceSecretReq.Content.ReadAsStringAsync().Result;
            BigInteger serviceSecret = BigInteger.Parse(serviceSecretStr);
            return serviceSecret;
        }

        public async Task<bool> MintAsync(BigInteger amountToSend)
        {
            try
            {
                ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
                var mintFunc = new MintFunction()
                {
                    AmountToSend = amountToSend,
                    To = account.Address
                };

                var mintEvent = service.ContractHandler.GetEvent<TransferEventDTO>();
                var mintFilter = await mintEvent.CreateFilterAsync();

                var mintReceipt = await service.MintRequestAsync(mintFunc);

                var mintLog = await mintEvent.GetFilterChangesAsync(mintFilter);

                return true;
            }
            catch (Exception)
            {

                return false;
            }
           
        }
        public bool Mint(BigInteger amountToSend)
        {
            try
            {
                ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);
                var mintFunc = new MintFunction()
                {
                    AmountToSend = amountToSend,
                    To = account.Address
                };

                var mintEvent = service.ContractHandler.GetEvent<TransferEventDTO>();
                var mintFilter = mintEvent.CreateFilterAsync().Result;

                var mintReceipt = service.MintRequestAsync(mintFunc);

                var mintLog = mintEvent.GetFilterChangesAsync(mintFilter);


                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }


        public async Task<BigInteger> CreateExecutionTicketAsync(BigInteger serviceSecret)
        {
            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);

            var createExecutionTicketFunc = new CreateExecutionTicketFunction()
            {
                ServiceSecret = serviceSecret

            };

            var createTicketEvent = service.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
            var createTicketEventFilter = await createTicketEvent.CreateFilterAsync();

            var createTicketReceipt = await service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc);

            var createTicketLog = await createTicketEvent.GetFilterChangesAsync(createTicketEventFilter);
            BigInteger ticketId = -1;
            foreach (var eventLog in createTicketLog)
            {
                ticketId = eventLog.Event.TicketId;
            }
            return ticketId;

        }


        public BigInteger CreateExecutionTicket(BigInteger serviceSecret)
        {
            ComputingPaymentTokenService service = new ComputingPaymentTokenService(web3, contractAddress);


            var createExecutionTicketFunc = new CreateExecutionTicketFunction()
            {
                ServiceSecret = serviceSecret

            };

            var createTicketEvent = service.ContractHandler.GetEvent<CreatedExecutionTicketEventDTO>();
            var createTicketEventFilter = createTicketEvent.CreateFilterAsync().Result;

            var createTicketReceipt = service.CreateExecutionTicketRequestAsync(createExecutionTicketFunc).Result;

            var createTicketLog = createTicketEvent.GetFilterChangesAsync(createTicketEventFilter).Result;
            BigInteger ticketId = -1;
            foreach (var eventLog in createTicketLog)
            {
                ticketId = eventLog.Event.TicketId;
            }
            return ticketId;

        }


        public string CreateOrder(string xmlData, string xslData, string clientSecret, BigInteger ticketId)
        {
                string requestJson = JsonSerializer.Serialize(new executionRequestModel() { xmlData = xmlData, xslData = xslData });
                var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
                var executionReq = client.PostAsync($"/ServiceApi/order?clientSecret={clientSecret}&ticketId={ticketId}", requestStringContent).Result;
                string executionRequestId = executionReq.Content.ReadAsStringAsync().Result;
                return executionRequestId;
           
        }


        public async Task<string> CreateOrderAsync(string xmlData, string xslData, string clientSecret, BigInteger ticketId)
        {
            string requestJson = JsonSerializer.Serialize(new executionRequestModel() { xmlData = xmlData, xslData = xslData });
            var requestStringContent = new StringContent(requestJson, Encoding.UTF8, "application/json");
            var executionReq = await client.PostAsync($"/ServiceApi/order?clientSecret={clientSecret}&ticketId={ticketId}", requestStringContent);
            string executionRequestId = executionReq.Content.ReadAsStringAsync().Result;
            return executionRequestId;

        }


        public string GetOrderState(string executionRequestId, string clientSecret, BigInteger ticketId)
        {
                return client.GetAsync($"/ServiceApi/order/state?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
        }

        public async Task<string> GetOrderStateAsync(string executionRequestId, string clientSecret, BigInteger ticketId)
        {
            return await client.GetAsync($"/ServiceApi/order/state?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync();
        }



        public byte[] GetOrderResult(string executionRequestId, string clientSecret, BigInteger ticketId)
        {
                string executionResult = client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync().Result;
                byte[] byData = Convert.FromBase64String(executionResult);
                return byData;
        }



        public async Task<byte[]> GetOrderResultAsync(string executionRequestId, string clientSecret, BigInteger ticketId)
        {
            string executionResult = await client.GetAsync($"/ServiceApi/order/result?clientSecret={clientSecret}&ticketId={ticketId}&requestId={executionRequestId}").Result.Content.ReadAsStringAsync();
            byte[] byData = Convert.FromBase64String(executionResult);
            return byData;
        }

    }
}