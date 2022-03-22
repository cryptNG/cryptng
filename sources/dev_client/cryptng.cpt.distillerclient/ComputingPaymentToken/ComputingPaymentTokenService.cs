using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using CryptNG.Autogen.ComputingPaymentToken.ContractDefinition;

namespace CryptNG.Autogen.ComputingPaymentToken
{
    public partial class ComputingPaymentTokenService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, ComputingPaymentTokenDeployment ComputingPaymentTokenDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<ComputingPaymentTokenDeployment>().SendRequestAndWaitForReceiptAsync(ComputingPaymentTokenDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, ComputingPaymentTokenDeployment ComputingPaymentTokenDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<ComputingPaymentTokenDeployment>().SendRequestAsync(ComputingPaymentTokenDeployment);
        }

        public static async Task<ComputingPaymentTokenService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, ComputingPaymentTokenDeployment ComputingPaymentTokenDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, ComputingPaymentTokenDeployment, cancellationTokenSource);
            return new ComputingPaymentTokenService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public ComputingPaymentTokenService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<string> OwnerQueryAsync(OwnerFunction ownerFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(ownerFunction, blockParameter);
        }

        
        public Task<string> OwnerQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerFunction, string>(null, blockParameter);
        }

        public Task<string> RenounceOwnershipRequestAsync(RenounceOwnershipFunction renounceOwnershipFunction)
        {
             return ContractHandler.SendRequestAsync(renounceOwnershipFunction);
        }

        public Task<string> RenounceOwnershipRequestAsync()
        {
             return ContractHandler.SendRequestAsync<RenounceOwnershipFunction>();
        }

        public Task<TransactionReceipt> RenounceOwnershipRequestAndWaitForReceiptAsync(RenounceOwnershipFunction renounceOwnershipFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(renounceOwnershipFunction, cancellationToken);
        }

        public Task<TransactionReceipt> RenounceOwnershipRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<RenounceOwnershipFunction>(null, cancellationToken);
        }

        public Task<string> TransferOwnershipRequestAsync(TransferOwnershipFunction transferOwnershipFunction)
        {
             return ContractHandler.SendRequestAsync(transferOwnershipFunction);
        }

        public Task<TransactionReceipt> TransferOwnershipRequestAndWaitForReceiptAsync(TransferOwnershipFunction transferOwnershipFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferOwnershipFunction, cancellationToken);
        }

        public Task<string> TransferOwnershipRequestAsync(string newOwner)
        {
            var transferOwnershipFunction = new TransferOwnershipFunction();
                transferOwnershipFunction.NewOwner = newOwner;
            
             return ContractHandler.SendRequestAsync(transferOwnershipFunction);
        }

        public Task<TransactionReceipt> TransferOwnershipRequestAndWaitForReceiptAsync(string newOwner, CancellationTokenSource cancellationToken = null)
        {
            var transferOwnershipFunction = new TransferOwnershipFunction();
                transferOwnershipFunction.NewOwner = newOwner;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferOwnershipFunction, cancellationToken);
        }

        public Task<List<BigInteger>> GetTokensQueryAsync(GetTokensFunction getTokensFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetTokensFunction, List<BigInteger>>(getTokensFunction, blockParameter);
        }

        
        public Task<List<BigInteger>> GetTokensQueryAsync(string owner, BlockParameter blockParameter = null)
        {
            var getTokensFunction = new GetTokensFunction();
                getTokensFunction.Owner = owner;
            
            return ContractHandler.QueryAsync<GetTokensFunction, List<BigInteger>>(getTokensFunction, blockParameter);
        }

        public Task<BigInteger> GetTicketIdQueryAsync(GetTicketIdFunction getTicketIdFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetTicketIdFunction, BigInteger>(getTicketIdFunction, blockParameter);
        }

        
        public Task<BigInteger> GetTicketIdQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var getTicketIdFunction = new GetTicketIdFunction();
                getTicketIdFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<GetTicketIdFunction, BigInteger>(getTicketIdFunction, blockParameter);
        }

        public Task<BigInteger> GetTicketSecretQueryAsync(GetTicketSecretFunction getTicketSecretFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetTicketSecretFunction, BigInteger>(getTicketSecretFunction, blockParameter);
        }

        
        public Task<BigInteger> GetTicketSecretQueryAsync(BigInteger ticketId, BlockParameter blockParameter = null)
        {
            var getTicketSecretFunction = new GetTicketSecretFunction();
                getTicketSecretFunction.TicketId = ticketId;
            
            return ContractHandler.QueryAsync<GetTicketSecretFunction, BigInteger>(getTicketSecretFunction, blockParameter);
        }

        public Task<string> AssignAllowedServiceRequestAsync(AssignAllowedServiceFunction assignAllowedServiceFunction)
        {
             return ContractHandler.SendRequestAsync(assignAllowedServiceFunction);
        }

        public Task<TransactionReceipt> AssignAllowedServiceRequestAndWaitForReceiptAsync(AssignAllowedServiceFunction assignAllowedServiceFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(assignAllowedServiceFunction, cancellationToken);
        }

        public Task<string> AssignAllowedServiceRequestAsync(string addressToAllow)
        {
            var assignAllowedServiceFunction = new AssignAllowedServiceFunction();
                assignAllowedServiceFunction.AddressToAllow = addressToAllow;
            
             return ContractHandler.SendRequestAsync(assignAllowedServiceFunction);
        }

        public Task<TransactionReceipt> AssignAllowedServiceRequestAndWaitForReceiptAsync(string addressToAllow, CancellationTokenSource cancellationToken = null)
        {
            var assignAllowedServiceFunction = new AssignAllowedServiceFunction();
                assignAllowedServiceFunction.AddressToAllow = addressToAllow;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(assignAllowedServiceFunction, cancellationToken);
        }

        public Task<string> UnassignAllowedServiceRequestAsync(UnassignAllowedServiceFunction unassignAllowedServiceFunction)
        {
             return ContractHandler.SendRequestAsync(unassignAllowedServiceFunction);
        }

        public Task<TransactionReceipt> UnassignAllowedServiceRequestAndWaitForReceiptAsync(UnassignAllowedServiceFunction unassignAllowedServiceFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(unassignAllowedServiceFunction, cancellationToken);
        }

        public Task<string> UnassignAllowedServiceRequestAsync(string addressToDisallow)
        {
            var unassignAllowedServiceFunction = new UnassignAllowedServiceFunction();
                unassignAllowedServiceFunction.AddressToDisallow = addressToDisallow;
            
             return ContractHandler.SendRequestAsync(unassignAllowedServiceFunction);
        }

        public Task<TransactionReceipt> UnassignAllowedServiceRequestAndWaitForReceiptAsync(string addressToDisallow, CancellationTokenSource cancellationToken = null)
        {
            var unassignAllowedServiceFunction = new UnassignAllowedServiceFunction();
                unassignAllowedServiceFunction.AddressToDisallow = addressToDisallow;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(unassignAllowedServiceFunction, cancellationToken);
        }

        public Task<string> ServiceBurnExecutionTicketsRequestAsync(ServiceBurnExecutionTicketsFunction serviceBurnExecutionTicketsFunction)
        {
             return ContractHandler.SendRequestAsync(serviceBurnExecutionTicketsFunction);
        }

        public Task<TransactionReceipt> ServiceBurnExecutionTicketsRequestAndWaitForReceiptAsync(ServiceBurnExecutionTicketsFunction serviceBurnExecutionTicketsFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(serviceBurnExecutionTicketsFunction, cancellationToken);
        }

        public Task<string> ServiceBurnExecutionTicketsRequestAsync(BigInteger ticketId)
        {
            var serviceBurnExecutionTicketsFunction = new ServiceBurnExecutionTicketsFunction();
                serviceBurnExecutionTicketsFunction.TicketId = ticketId;
            
             return ContractHandler.SendRequestAsync(serviceBurnExecutionTicketsFunction);
        }

        public Task<TransactionReceipt> ServiceBurnExecutionTicketsRequestAndWaitForReceiptAsync(BigInteger ticketId, CancellationTokenSource cancellationToken = null)
        {
            var serviceBurnExecutionTicketsFunction = new ServiceBurnExecutionTicketsFunction();
                serviceBurnExecutionTicketsFunction.TicketId = ticketId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(serviceBurnExecutionTicketsFunction, cancellationToken);
        }

        public Task<string> CreateExecutionTicketRequestAsync(CreateExecutionTicketFunction createExecutionTicketFunction)
        {
             return ContractHandler.SendRequestAsync(createExecutionTicketFunction);
        }

        public Task<TransactionReceipt> CreateExecutionTicketRequestAndWaitForReceiptAsync(CreateExecutionTicketFunction createExecutionTicketFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createExecutionTicketFunction, cancellationToken);
        }

        public Task<string> CreateExecutionTicketRequestAsync(BigInteger serviceSecret)
        {
            var createExecutionTicketFunction = new CreateExecutionTicketFunction();
                createExecutionTicketFunction.ServiceSecret = serviceSecret;
            
             return ContractHandler.SendRequestAsync(createExecutionTicketFunction);
        }

        public Task<TransactionReceipt> CreateExecutionTicketRequestAndWaitForReceiptAsync(BigInteger serviceSecret, CancellationTokenSource cancellationToken = null)
        {
            var createExecutionTicketFunction = new CreateExecutionTicketFunction();
                createExecutionTicketFunction.ServiceSecret = serviceSecret;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createExecutionTicketFunction, cancellationToken);
        }

        public Task<string> BurnExecutionTicketRequestAsync(BurnExecutionTicketFunction burnExecutionTicketFunction)
        {
             return ContractHandler.SendRequestAsync(burnExecutionTicketFunction);
        }

        public Task<TransactionReceipt> BurnExecutionTicketRequestAndWaitForReceiptAsync(BurnExecutionTicketFunction burnExecutionTicketFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(burnExecutionTicketFunction, cancellationToken);
        }

        public Task<string> BurnExecutionTicketRequestAsync(BigInteger ticketId)
        {
            var burnExecutionTicketFunction = new BurnExecutionTicketFunction();
                burnExecutionTicketFunction.TicketId = ticketId;
            
             return ContractHandler.SendRequestAsync(burnExecutionTicketFunction);
        }

        public Task<TransactionReceipt> BurnExecutionTicketRequestAndWaitForReceiptAsync(BigInteger ticketId, CancellationTokenSource cancellationToken = null)
        {
            var burnExecutionTicketFunction = new BurnExecutionTicketFunction();
                burnExecutionTicketFunction.TicketId = ticketId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(burnExecutionTicketFunction, cancellationToken);
        }

        public Task<string> MintRequestAsync(MintFunction mintFunction)
        {
             return ContractHandler.SendRequestAsync(mintFunction);
        }

        public Task<TransactionReceipt> MintRequestAndWaitForReceiptAsync(MintFunction mintFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintFunction, cancellationToken);
        }

        public Task<string> MintRequestAsync(string to)
        {
            var mintFunction = new MintFunction();
                mintFunction.To = to;
            
             return ContractHandler.SendRequestAsync(mintFunction);
        }

        public Task<TransactionReceipt> MintRequestAndWaitForReceiptAsync(string to, CancellationTokenSource cancellationToken = null)
        {
            var mintFunction = new MintFunction();
                mintFunction.To = to;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintFunction, cancellationToken);
        }

        public Task<BigInteger> TotalSupplyQueryAsync(TotalSupplyFunction totalSupplyFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TotalSupplyFunction, BigInteger>(totalSupplyFunction, blockParameter);
        }

        
        public Task<BigInteger> TotalSupplyQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TotalSupplyFunction, BigInteger>(null, blockParameter);
        }

        public Task<string> SetIsSaleActiveRequestAsync(SetIsSaleActiveFunction setIsSaleActiveFunction)
        {
             return ContractHandler.SendRequestAsync(setIsSaleActiveFunction);
        }

        public Task<string> SetIsSaleActiveRequestAsync()
        {
             return ContractHandler.SendRequestAsync<SetIsSaleActiveFunction>();
        }

        public Task<TransactionReceipt> SetIsSaleActiveRequestAndWaitForReceiptAsync(SetIsSaleActiveFunction setIsSaleActiveFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setIsSaleActiveFunction, cancellationToken);
        }

        public Task<TransactionReceipt> SetIsSaleActiveRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<SetIsSaleActiveFunction>(null, cancellationToken);
        }

        public Task<string> SetIsSaleInactiveRequestAsync(SetIsSaleInactiveFunction setIsSaleInactiveFunction)
        {
             return ContractHandler.SendRequestAsync(setIsSaleInactiveFunction);
        }

        public Task<string> SetIsSaleInactiveRequestAsync()
        {
             return ContractHandler.SendRequestAsync<SetIsSaleInactiveFunction>();
        }

        public Task<TransactionReceipt> SetIsSaleInactiveRequestAndWaitForReceiptAsync(SetIsSaleInactiveFunction setIsSaleInactiveFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setIsSaleInactiveFunction, cancellationToken);
        }

        public Task<TransactionReceipt> SetIsSaleInactiveRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<SetIsSaleInactiveFunction>(null, cancellationToken);
        }

        public Task<string> AdaptMarketPriceRequestAsync(AdaptMarketPriceFunction adaptMarketPriceFunction)
        {
             return ContractHandler.SendRequestAsync(adaptMarketPriceFunction);
        }

        public Task<TransactionReceipt> AdaptMarketPriceRequestAndWaitForReceiptAsync(AdaptMarketPriceFunction adaptMarketPriceFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(adaptMarketPriceFunction, cancellationToken);
        }

        public Task<string> AdaptMarketPriceRequestAsync(BigInteger newPriceGwei)
        {
            var adaptMarketPriceFunction = new AdaptMarketPriceFunction();
                adaptMarketPriceFunction.NewPriceGwei = newPriceGwei;
            
             return ContractHandler.SendRequestAsync(adaptMarketPriceFunction);
        }

        public Task<TransactionReceipt> AdaptMarketPriceRequestAndWaitForReceiptAsync(BigInteger newPriceGwei, CancellationTokenSource cancellationToken = null)
        {
            var adaptMarketPriceFunction = new AdaptMarketPriceFunction();
                adaptMarketPriceFunction.NewPriceGwei = newPriceGwei;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(adaptMarketPriceFunction, cancellationToken);
        }

        public Task<bool> SupportsInterfaceQueryAsync(SupportsInterfaceFunction supportsInterfaceFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<SupportsInterfaceFunction, bool>(supportsInterfaceFunction, blockParameter);
        }

        
        public Task<bool> SupportsInterfaceQueryAsync(byte[] interfaceId, BlockParameter blockParameter = null)
        {
            var supportsInterfaceFunction = new SupportsInterfaceFunction();
                supportsInterfaceFunction.InterfaceId = interfaceId;
            
            return ContractHandler.QueryAsync<SupportsInterfaceFunction, bool>(supportsInterfaceFunction, blockParameter);
        }

        public Task<BigInteger> BalanceOfQueryAsync(BalanceOfFunction balanceOfFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<BalanceOfFunction, BigInteger>(balanceOfFunction, blockParameter);
        }

        
        public Task<BigInteger> BalanceOfQueryAsync(string owner, BlockParameter blockParameter = null)
        {
            var balanceOfFunction = new BalanceOfFunction();
                balanceOfFunction.Owner = owner;
            
            return ContractHandler.QueryAsync<BalanceOfFunction, BigInteger>(balanceOfFunction, blockParameter);
        }

        public Task<string> OwnerOfQueryAsync(OwnerOfFunction ownerOfFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<OwnerOfFunction, string>(ownerOfFunction, blockParameter);
        }

        
        public Task<string> OwnerOfQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var ownerOfFunction = new OwnerOfFunction();
                ownerOfFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<OwnerOfFunction, string>(ownerOfFunction, blockParameter);
        }

        public Task<string> NameQueryAsync(NameFunction nameFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<NameFunction, string>(nameFunction, blockParameter);
        }

        
        public Task<string> NameQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<NameFunction, string>(null, blockParameter);
        }

        public Task<string> SymbolQueryAsync(SymbolFunction symbolFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<SymbolFunction, string>(symbolFunction, blockParameter);
        }

        
        public Task<string> SymbolQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<SymbolFunction, string>(null, blockParameter);
        }

        public Task<string> TokenURIQueryAsync(TokenURIFunction tokenURIFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TokenURIFunction, string>(tokenURIFunction, blockParameter);
        }

        
        public Task<string> TokenURIQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var tokenURIFunction = new TokenURIFunction();
                tokenURIFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<TokenURIFunction, string>(tokenURIFunction, blockParameter);
        }

        public Task<string> ApproveRequestAsync(ApproveFunction approveFunction)
        {
             return ContractHandler.SendRequestAsync(approveFunction);
        }

        public Task<TransactionReceipt> ApproveRequestAndWaitForReceiptAsync(ApproveFunction approveFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(approveFunction, cancellationToken);
        }

        public Task<string> ApproveRequestAsync(string to, BigInteger tokenId)
        {
            var approveFunction = new ApproveFunction();
                approveFunction.To = to;
                approveFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAsync(approveFunction);
        }

        public Task<TransactionReceipt> ApproveRequestAndWaitForReceiptAsync(string to, BigInteger tokenId, CancellationTokenSource cancellationToken = null)
        {
            var approveFunction = new ApproveFunction();
                approveFunction.To = to;
                approveFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(approveFunction, cancellationToken);
        }

        public Task<string> GetApprovedQueryAsync(GetApprovedFunction getApprovedFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetApprovedFunction, string>(getApprovedFunction, blockParameter);
        }

        
        public Task<string> GetApprovedQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var getApprovedFunction = new GetApprovedFunction();
                getApprovedFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<GetApprovedFunction, string>(getApprovedFunction, blockParameter);
        }

        public Task<string> SetApprovalForAllRequestAsync(SetApprovalForAllFunction setApprovalForAllFunction)
        {
             return ContractHandler.SendRequestAsync(setApprovalForAllFunction);
        }

        public Task<TransactionReceipt> SetApprovalForAllRequestAndWaitForReceiptAsync(SetApprovalForAllFunction setApprovalForAllFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setApprovalForAllFunction, cancellationToken);
        }

        public Task<string> SetApprovalForAllRequestAsync(string @operator, bool approved)
        {
            var setApprovalForAllFunction = new SetApprovalForAllFunction();
                setApprovalForAllFunction.Operator = @operator;
                setApprovalForAllFunction.Approved = approved;
            
             return ContractHandler.SendRequestAsync(setApprovalForAllFunction);
        }

        public Task<TransactionReceipt> SetApprovalForAllRequestAndWaitForReceiptAsync(string @operator, bool approved, CancellationTokenSource cancellationToken = null)
        {
            var setApprovalForAllFunction = new SetApprovalForAllFunction();
                setApprovalForAllFunction.Operator = @operator;
                setApprovalForAllFunction.Approved = approved;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setApprovalForAllFunction, cancellationToken);
        }

        public Task<bool> IsApprovedForAllQueryAsync(IsApprovedForAllFunction isApprovedForAllFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<IsApprovedForAllFunction, bool>(isApprovedForAllFunction, blockParameter);
        }

        
        public Task<bool> IsApprovedForAllQueryAsync(string owner, string @operator, BlockParameter blockParameter = null)
        {
            var isApprovedForAllFunction = new IsApprovedForAllFunction();
                isApprovedForAllFunction.Owner = owner;
                isApprovedForAllFunction.Operator = @operator;
            
            return ContractHandler.QueryAsync<IsApprovedForAllFunction, bool>(isApprovedForAllFunction, blockParameter);
        }

        public Task<string> TransferFromRequestAsync(TransferFromFunction transferFromFunction)
        {
             return ContractHandler.SendRequestAsync(transferFromFunction);
        }

        public Task<TransactionReceipt> TransferFromRequestAndWaitForReceiptAsync(TransferFromFunction transferFromFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferFromFunction, cancellationToken);
        }

        public Task<string> TransferFromRequestAsync(string from, string to, BigInteger tokenId)
        {
            var transferFromFunction = new TransferFromFunction();
                transferFromFunction.From = from;
                transferFromFunction.To = to;
                transferFromFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAsync(transferFromFunction);
        }

        public Task<TransactionReceipt> TransferFromRequestAndWaitForReceiptAsync(string from, string to, BigInteger tokenId, CancellationTokenSource cancellationToken = null)
        {
            var transferFromFunction = new TransferFromFunction();
                transferFromFunction.From = from;
                transferFromFunction.To = to;
                transferFromFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(transferFromFunction, cancellationToken);
        }

        public Task<string> SafeTransferFromRequestAsync(SafeTransferFromFunction safeTransferFromFunction)
        {
             return ContractHandler.SendRequestAsync(safeTransferFromFunction);
        }

        public Task<TransactionReceipt> SafeTransferFromRequestAndWaitForReceiptAsync(SafeTransferFromFunction safeTransferFromFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(safeTransferFromFunction, cancellationToken);
        }

        public Task<string> SafeTransferFromRequestAsync(string from, string to, BigInteger tokenId)
        {
            var safeTransferFromFunction = new SafeTransferFromFunction();
                safeTransferFromFunction.From = from;
                safeTransferFromFunction.To = to;
                safeTransferFromFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAsync(safeTransferFromFunction);
        }

        public Task<TransactionReceipt> SafeTransferFromRequestAndWaitForReceiptAsync(string from, string to, BigInteger tokenId, CancellationTokenSource cancellationToken = null)
        {
            var safeTransferFromFunction = new SafeTransferFromFunction();
                safeTransferFromFunction.From = from;
                safeTransferFromFunction.To = to;
                safeTransferFromFunction.TokenId = tokenId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(safeTransferFromFunction, cancellationToken);
        }

        public Task<string> SafeTransferFromRequestAsync(SafeTransferFrom1Function safeTransferFrom1Function)
        {
             return ContractHandler.SendRequestAsync(safeTransferFrom1Function);
        }

        public Task<TransactionReceipt> SafeTransferFromRequestAndWaitForReceiptAsync(SafeTransferFrom1Function safeTransferFrom1Function, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(safeTransferFrom1Function, cancellationToken);
        }

        public Task<string> SafeTransferFromRequestAsync(string from, string to, BigInteger tokenId, byte[] data)
        {
            var safeTransferFrom1Function = new SafeTransferFrom1Function();
                safeTransferFrom1Function.From = from;
                safeTransferFrom1Function.To = to;
                safeTransferFrom1Function.TokenId = tokenId;
                safeTransferFrom1Function.Data = data;
            
             return ContractHandler.SendRequestAsync(safeTransferFrom1Function);
        }

        public Task<TransactionReceipt> SafeTransferFromRequestAndWaitForReceiptAsync(string from, string to, BigInteger tokenId, byte[] data, CancellationTokenSource cancellationToken = null)
        {
            var safeTransferFrom1Function = new SafeTransferFrom1Function();
                safeTransferFrom1Function.From = from;
                safeTransferFrom1Function.To = to;
                safeTransferFrom1Function.TokenId = tokenId;
                safeTransferFrom1Function.Data = data;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(safeTransferFrom1Function, cancellationToken);
        }

        public Task<BigInteger> GetTokenBalanceQueryAsync(GetTokenBalanceFunction getTokenBalanceFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetTokenBalanceFunction, BigInteger>(getTokenBalanceFunction, blockParameter);
        }

        
        public Task<BigInteger> GetTokenBalanceQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var getTokenBalanceFunction = new GetTokenBalanceFunction();
                getTokenBalanceFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<GetTokenBalanceFunction, BigInteger>(getTokenBalanceFunction, blockParameter);
        }
    }
}
