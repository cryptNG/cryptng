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
using CryptNG.Autogen.BasicEvidencingToken.ContractDefinition;

namespace CryptNG.Autogen.BasicEvidencingToken
{
    public partial class BasicEvidencingTokenService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, BasicEvidencingTokenDeployment basicEvidencingTokenDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<BasicEvidencingTokenDeployment>().SendRequestAndWaitForReceiptAsync(basicEvidencingTokenDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, BasicEvidencingTokenDeployment basicEvidencingTokenDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<BasicEvidencingTokenDeployment>().SendRequestAsync(basicEvidencingTokenDeployment);
        }

        public static async Task<BasicEvidencingTokenService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, BasicEvidencingTokenDeployment basicEvidencingTokenDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, basicEvidencingTokenDeployment, cancellationTokenSource);
            return new BasicEvidencingTokenService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public BasicEvidencingTokenService(Nethereum.Web3.Web3 web3, string contractAddress)
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

        public Task<string> SetBaseURIRequestAsync(SetBaseURIFunction setBaseURIFunction)
        {
             return ContractHandler.SendRequestAsync(setBaseURIFunction);
        }

        public Task<TransactionReceipt> SetBaseURIRequestAndWaitForReceiptAsync(SetBaseURIFunction setBaseURIFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setBaseURIFunction, cancellationToken);
        }

        public Task<string> SetBaseURIRequestAsync(string uri)
        {
            var setBaseURIFunction = new SetBaseURIFunction();
                setBaseURIFunction.Uri = uri;
            
             return ContractHandler.SendRequestAsync(setBaseURIFunction);
        }

        public Task<TransactionReceipt> SetBaseURIRequestAndWaitForReceiptAsync(string uri, CancellationTokenSource cancellationToken = null)
        {
            var setBaseURIFunction = new SetBaseURIFunction();
                setBaseURIFunction.Uri = uri;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setBaseURIFunction, cancellationToken);
        }

        public Task<bool> GetIsSelfEvidencingActiveQueryAsync(GetIsSelfEvidencingActiveFunction getIsSelfEvidencingActiveFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetIsSelfEvidencingActiveFunction, bool>(getIsSelfEvidencingActiveFunction, blockParameter);
        }

        
        public Task<bool> GetIsSelfEvidencingActiveQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetIsSelfEvidencingActiveFunction, bool>(null, blockParameter);
        }

        public Task<string> SetIsSelfEvidencingActiveRequestAsync(SetIsSelfEvidencingActiveFunction setIsSelfEvidencingActiveFunction)
        {
             return ContractHandler.SendRequestAsync(setIsSelfEvidencingActiveFunction);
        }

        public Task<string> SetIsSelfEvidencingActiveRequestAsync()
        {
             return ContractHandler.SendRequestAsync<SetIsSelfEvidencingActiveFunction>();
        }

        public Task<TransactionReceipt> SetIsSelfEvidencingActiveRequestAndWaitForReceiptAsync(SetIsSelfEvidencingActiveFunction setIsSelfEvidencingActiveFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setIsSelfEvidencingActiveFunction, cancellationToken);
        }

        public Task<TransactionReceipt> SetIsSelfEvidencingActiveRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<SetIsSelfEvidencingActiveFunction>(null, cancellationToken);
        }

        public Task<string> SetIsSelfEvidencingInactiveRequestAsync(SetIsSelfEvidencingInactiveFunction setIsSelfEvidencingInactiveFunction)
        {
             return ContractHandler.SendRequestAsync(setIsSelfEvidencingInactiveFunction);
        }

        public Task<string> SetIsSelfEvidencingInactiveRequestAsync()
        {
             return ContractHandler.SendRequestAsync<SetIsSelfEvidencingInactiveFunction>();
        }

        public Task<TransactionReceipt> SetIsSelfEvidencingInactiveRequestAndWaitForReceiptAsync(SetIsSelfEvidencingInactiveFunction setIsSelfEvidencingInactiveFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setIsSelfEvidencingInactiveFunction, cancellationToken);
        }

        public Task<TransactionReceipt> SetIsSelfEvidencingInactiveRequestAndWaitForReceiptAsync(CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync<SetIsSelfEvidencingInactiveFunction>(null, cancellationToken);
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

        public Task<string> UnassignAllowedServiceRequestAsync(string addressToUnassign)
        {
            var unassignAllowedServiceFunction = new UnassignAllowedServiceFunction();
                unassignAllowedServiceFunction.AddressToUnassign = addressToUnassign;
            
             return ContractHandler.SendRequestAsync(unassignAllowedServiceFunction);
        }

        public Task<TransactionReceipt> UnassignAllowedServiceRequestAndWaitForReceiptAsync(string addressToUnassign, CancellationTokenSource cancellationToken = null)
        {
            var unassignAllowedServiceFunction = new UnassignAllowedServiceFunction();
                unassignAllowedServiceFunction.AddressToUnassign = addressToUnassign;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(unassignAllowedServiceFunction, cancellationToken);
        }

        public Task<string> MintHashMapEvidenceRequestAsync(MintHashMapEvidenceFunction mintHashMapEvidenceFunction)
        {
             return ContractHandler.SendRequestAsync(mintHashMapEvidenceFunction);
        }

        public Task<TransactionReceipt> MintHashMapEvidenceRequestAndWaitForReceiptAsync(MintHashMapEvidenceFunction mintHashMapEvidenceFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintHashMapEvidenceFunction, cancellationToken);
        }

        public Task<string> MintHashMapEvidenceRequestAsync(BigInteger fromHash, BigInteger toHash)
        {
            var mintHashMapEvidenceFunction = new MintHashMapEvidenceFunction();
                mintHashMapEvidenceFunction.FromHash = fromHash;
                mintHashMapEvidenceFunction.ToHash = toHash;
            
             return ContractHandler.SendRequestAsync(mintHashMapEvidenceFunction);
        }

        public Task<TransactionReceipt> MintHashMapEvidenceRequestAndWaitForReceiptAsync(BigInteger fromHash, BigInteger toHash, CancellationTokenSource cancellationToken = null)
        {
            var mintHashMapEvidenceFunction = new MintHashMapEvidenceFunction();
                mintHashMapEvidenceFunction.FromHash = fromHash;
                mintHashMapEvidenceFunction.ToHash = toHash;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintHashMapEvidenceFunction, cancellationToken);
        }

        public Task<string> MintSelfEvidenceRequestAsync(MintSelfEvidenceFunction mintSelfEvidenceFunction)
        {
             return ContractHandler.SendRequestAsync(mintSelfEvidenceFunction);
        }

        public Task<TransactionReceipt> MintSelfEvidenceRequestAndWaitForReceiptAsync(MintSelfEvidenceFunction mintSelfEvidenceFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintSelfEvidenceFunction, cancellationToken);
        }

        public Task<string> MintSelfEvidenceRequestAsync(BigInteger evidenceHash)
        {
            var mintSelfEvidenceFunction = new MintSelfEvidenceFunction();
                mintSelfEvidenceFunction.EvidenceHash = evidenceHash;
            
             return ContractHandler.SendRequestAsync(mintSelfEvidenceFunction);
        }

        public Task<TransactionReceipt> MintSelfEvidenceRequestAndWaitForReceiptAsync(BigInteger evidenceHash, CancellationTokenSource cancellationToken = null)
        {
            var mintSelfEvidenceFunction = new MintSelfEvidenceFunction();
                mintSelfEvidenceFunction.EvidenceHash = evidenceHash;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(mintSelfEvidenceFunction, cancellationToken);
        }

        public Task<BigInteger> EvidenceByTokenIdQueryAsync(EvidenceByTokenIdFunction evidenceByTokenIdFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<EvidenceByTokenIdFunction, BigInteger>(evidenceByTokenIdFunction, blockParameter);
        }

        
        public Task<BigInteger> EvidenceByTokenIdQueryAsync(BigInteger tokenId, BlockParameter blockParameter = null)
        {
            var evidenceByTokenIdFunction = new EvidenceByTokenIdFunction();
                evidenceByTokenIdFunction.TokenId = tokenId;
            
            return ContractHandler.QueryAsync<EvidenceByTokenIdFunction, BigInteger>(evidenceByTokenIdFunction, blockParameter);
        }

        public Task<BigInteger> VerifyEvidenceHashMapQueryAsync(VerifyEvidenceHashMapFunction verifyEvidenceHashMapFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<VerifyEvidenceHashMapFunction, BigInteger>(verifyEvidenceHashMapFunction, blockParameter);
        }

        
        public Task<BigInteger> VerifyEvidenceHashMapQueryAsync(BigInteger fromHash, BlockParameter blockParameter = null)
        {
            var verifyEvidenceHashMapFunction = new VerifyEvidenceHashMapFunction();
                verifyEvidenceHashMapFunction.FromHash = fromHash;
            
            return ContractHandler.QueryAsync<VerifyEvidenceHashMapFunction, BigInteger>(verifyEvidenceHashMapFunction, blockParameter);
        }

        public Task<VerifySelfEvidenceOutputDTO> VerifySelfEvidenceQueryAsync(VerifySelfEvidenceFunction verifySelfEvidenceFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<VerifySelfEvidenceFunction, VerifySelfEvidenceOutputDTO>(verifySelfEvidenceFunction, blockParameter);
        }

        public Task<VerifySelfEvidenceOutputDTO> VerifySelfEvidenceQueryAsync(BigInteger evidenceHash, BlockParameter blockParameter = null)
        {
            var verifySelfEvidenceFunction = new VerifySelfEvidenceFunction();
                verifySelfEvidenceFunction.EvidenceHash = evidenceHash;
            
            return ContractHandler.QueryDeserializingToObjectAsync<VerifySelfEvidenceFunction, VerifySelfEvidenceOutputDTO>(verifySelfEvidenceFunction, blockParameter);
        }

        public Task<BigInteger> TotalSupplyQueryAsync(TotalSupplyFunction totalSupplyFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TotalSupplyFunction, BigInteger>(totalSupplyFunction, blockParameter);
        }

        
        public Task<BigInteger> TotalSupplyQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TotalSupplyFunction, BigInteger>(null, blockParameter);
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
    }
}
