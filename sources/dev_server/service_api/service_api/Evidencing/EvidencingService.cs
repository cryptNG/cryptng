using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
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
using CryptNG.Autogen.BasicEvidencingToken.ContractDefinition;
using CryptNG.Autogen.BasicEvidencingToken;
using ApiClient.PdfDestiller;
using Nethereum.ABI.FunctionEncoding;
using Nethereum.RPC.Eth.DTOs;

namespace service_api.Evidencing
{
    public class EvidencingService : IHostedService
    {
        private string _evidenceMemoryDirectory;
        private string _basicEvidencingTokenContractAddress;
        private int _delayMinutes;
        private Account _account;
        private Web3 _web3;

        public EvidencingService(IConfiguration configuration)
        {
            _evidenceMemoryDirectory = configuration["EvidenceDirectory"];
            _basicEvidencingTokenContractAddress = configuration["Web3:Contracts:BasicEvidencingToken"];
            _account = new Account(configuration["Web3:PrivateKeys:owner"], 1337);
            _web3 = new Web3(_account, configuration["Web3:RPC_URL"]);
            _delayMinutes = Convert.ToInt32(configuration["EvidencingTimeBetweenMinutes"]);

            try
            {
                if (!Directory.Exists(_evidenceMemoryDirectory)) Directory.CreateDirectory(_evidenceMemoryDirectory);
            }
            catch (Exception ex)
            {
                if (!Directory.Exists(_evidenceMemoryDirectory))
                {
                    Console.WriteLine("[EvidencingService] " + ex);
                    Environment.Exit(-1);
                }
            }
        }



        private async Task createBlockchainProof(BigInteger fileHash, BigInteger txHash)
        {
            BasicEvidencingTokenService service = new BasicEvidencingTokenService(_web3, _basicEvidencingTokenContractAddress);



            var mintHashMapEvidenceFunc = new MintHashMapEvidenceFunction()
            {
                FromHash = fileHash,
                ToHash = txHash
            };


            //var mintHashMapProofEvent = service.ContractHandler.GetEvent<MintedHashMapProofEventDTO>();
            try
            {
                var receipt = await service.MintHashMapEvidenceRequestAndWaitForReceiptAsync(mintHashMapEvidenceFunc);
                Console.WriteLine("[EvidencingService] " + "RECEIPT TXH: " + receipt.BlockHash);
            }
            catch (Exception ex)
            {
                var res = await TryGetRevertMessage<MintHashMapEvidenceFunction>(_web3, _basicEvidencingTokenContractAddress, mintHashMapEvidenceFunc);
                if (res != null)
                {
                    Console.WriteLine("[EvidencingService] " + res.Message + " REV: " + res.RevertMessage); //if exception is 'cannot proof existing', delete file
                }
                throw ex;
            }
        }

        private static async Task<SmartContractRevertException> TryGetRevertMessage<TFunction>(
            Web3 web3, string contractAddress, TFunction functionArgs, BlockParameter blockParameter = null)
            where TFunction : FunctionMessage, new()
        {
            try
            {
                Console.WriteLine("[EvidencingService] " + $"* Querying Function {typeof(TFunction).Name}");
                // instead of sending a transaction again, we do a query with the same function parameters
                // the smart contract code will be executed but no changes will be made on chain
                var functionHandler = web3.Eth.GetContractQueryHandler<TFunction>();
                // we're not bothered about the return value here
                // we'd only get that if it was successful
                // we only want the revert reason which we'll get from the exception
                // we cant use QueryRaw as that will never throw a SmartContractRevertException
                await functionHandler.QueryAsync<bool>(contractAddress, functionArgs, blockParameter);

                // if we got here there was no revert message to retrieve
                return null;
            }
            catch (SmartContractRevertException revertException)
            {
                return revertException;
            }
        }



        public async Task StartAsync(CancellationToken cancellationToken)
        {
            while (true)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    Environment.Exit(0);
                }
                foreach (string file in Directory.GetFiles(_evidenceMemoryDirectory))
                {

                    try
                    {
                        Console.WriteLine("[EvidencingService] " + "Found file: " + file);
                        string[] fileHashTxHash = System.IO.File.ReadAllText(file).Split('#');
                        BigInteger fileHash = BigInteger.Parse(fileHashTxHash[0].Replace("x", ""));
                        BigInteger txHash = BigInteger.Parse(fileHashTxHash[1].Replace("x", ""));
                        Console.WriteLine("[EvidencingService] " + fileHash + "#" + txHash + " proofing now.");
                        await createBlockchainProof(fileHash, txHash);
                        Console.WriteLine("[EvidencingService] " + "Proofing finished");
                        File.Delete(file);
                        Console.WriteLine("[EvidencingService] " + "File deleted");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("[EvidencingService] " + ex.ToString());
                    }

                }
                Console.WriteLine("[EvidencingService] " + "I am still alive!");
                Thread.Sleep(_delayMinutes * 60 * 1000);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
