//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./ComputingPaymentTokenERC721.sol";


/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ComputingPaymentToken is ComputingPaymentTokenERC721
{
    using Address for address;
    using Strings for uint256;

    constructor() {
        
      _executionBatchSize[0] = 16000;  // Reserved token type, 0 does not exist.
      _executionBatchSize[1] = 10; //Testtoken Standard 
      _executionBatchSize[2] = 1;  //Testtoken Evidencing
      _executionBatchSize[3] = 100;  //Testtoken BatchEvidencing
        _allowedServices[_msgSender()] = true;
    }



    uint256 private _mintPriceGwei = 100000; //0.0001ETH

    bool private _isSaleActive = true;

   
   
    mapping(address => bool) _allowedServices;
    
    event CreatedExecutionTicket(address indexed from, uint256 indexed tokenId,uint256 indexed ticketId);

    
    event GivenTokenAllowance(address indexed to, uint256 indexed tokenId);


    event RevokedTokenAllowance(uint256 indexed tokenId);

    event AssignedAllowedServiceEvent(address sender ,address addressToAllow);

    event UnassignedAllowedServiceEvent(address sender ,address addressToUnassign);
   
    mapping(uint256 => address) internal _tokenAllowances;

    //max amt of executions before a ticket is burned.
    //if a ticket is not fully burned e.g. when the executing customer service dies
    //it will stay open like this and await the next service time until consumed
    mapping(uint16 => uint16) internal _executionBatchSize;

    //Client (Customer) calls our service (outside blockchain) to prepare for executionTokenRequest
    //in this, the client provides a secret (random) e.g. string X123
    //Our service encrypts the secret and returns an encrypted service-secret
    //The client requests an executionticket from the smart contract
    //the request contains the service secret
    //we know the wallet has an nft, allowance, and has no existing executionticket
    //so we create a ticket and store the secret on the blockchain
    //The client calls our service with the executionTicket, provides the original client secret
    //in this case, X123 alongside the executionTicket
    //Our service can validate with the blockchain that it encrypted this string and knows
    //the client is not an impostor.
    //In case the client of the customer fails to hold the client secret,
    //e.g. crashes and looses the information because it is not persisted/cached
    //the client can burn the rest of his ticket, loosing the small amount of executions
    //that were granted


//TODO: in production, we should expose the variables like maxTokens, executionBatchSize etc. and these methods should be moved to the api
    function getExecutionBatchSizeByTokenId(uint256 tokenId) public view isService() _tokenHasBeenMinted(tokenId) returns (uint256)
    {
        uint16 typeId = getTypeIdFromTokenId(tokenId);
        return _executionBatchSize[typeId];
    }

    function getTicketId(uint256 tokenId)
        public
        view
        _tokenHasBeenMinted(tokenId)
        returns (uint256)
    {
        uint256 ticketId = getTokenIdIndex(tokenId);
        require(_ticketExists(ticketId), "Ticket does not exist");

        return ticketId;
    }

    //tbd: is approvedTicketHolder
    //that includes: adding approved addresses, removing them
    //owner can be part of the list to make checks easier

    function _ticketExists(uint256 ticketId) internal view returns (bool) {
        return _executionTickets[_getTokenIdByTicketId(ticketId)][ticketId] != 0;
    }

    function _getTokenIdByTicketId(uint256 ticketId) internal view returns (uint256)
    {
        return ticketId + _maxTokens * _types[ticketId];
    }

    function getTicketSecret(uint256 tokenId, uint256 ticketId) public view returns (uint256) {
        return _executionTickets[tokenId][ticketId];
    }


   modifier _senderIsTokenOwnerOrHasAllowance(uint256 tokenId) {
        require(
            (_owners[getTokenIdIndex( tokenId)] == _msgSender())
            ||
            (_tokenAllowances[tokenId] == _msgSender()),
            "You are not the token owner and you don't have allowance to the token"
        );
        _;
    }
    
    function revokeTokenAllowance(uint tokenId) public _senderIsTokenOwner(tokenId)
    {
        _tokenAllowances[tokenId] = address(0);
        emit RevokedTokenAllowance(tokenId);
    }

    
    function giveTokenAllowance(uint tokenId, address to) public _senderIsTokenOwner(tokenId)
    {
        _tokenAllowances[tokenId] = to;
        emit GivenTokenAllowance(to, tokenId);
    }



    function assignAllowedService(address addressToAllow) public onlyOwner
    {
        _allowedServices[addressToAllow] = true;
        emit AssignedAllowedServiceEvent(_msgSender(), addressToAllow);
    }

    
    function unassignAllowedService(address addressToUnassign) public onlyOwner
    {
        require(addressToUnassign != owner(),"You are the contract owner, what are you doing?");
        _allowedServices[addressToUnassign] = false;
        emit UnassignedAllowedServiceEvent(_msgSender(), addressToUnassign);
    }

    modifier isService()
    {
        require(_allowedServices[_msgSender()] == true,"Caller has to be an assigned/allowed service.");
        _;
    }

    function getTokenIdByTicketId(uint256 ticketId) public view isService() returns (uint256)
    {
        require(_ticketExists(ticketId),"The provided ticket does not exist");
     
        return uint256(_getTokenIdByTicketId(ticketId));

    }

    function serviceBurnExecutionTickets(uint256 ticketId) public isService()
    {
        uint256 tokenId = getTokenIdByTicketId(ticketId);
        //remove this require if this does not affect gasPrice estimation
        require( _executionTickets[tokenId][ticketId] > 0,"The ticket was already burned");
        _executionTickets[tokenId][ticketId] = 0;
        emit ExecutionTicketBurned(_msgSender(),tokenId,ticketId);
    }



    function createExecutionTicket(uint256 tokenId ,uint256 serviceSecret)
        public _senderIsTokenOwnerOrHasAllowance(tokenId)
    {

        uint256 tokenIndex = getTokenIdIndex(tokenId);

        require(_tokenBalance[tokenIndex] >= _executionBatchSize[getTypeIdFromTokenId(tokenId)], "You have no tokens that have enough balance and no assigned execution ticket");
     
        _executionTickets[tokenId][tokenIndex] = serviceSecret;

        
        emit CreatedExecutionTicket(_msgSender(),tokenId,tokenIndex);
        
    }


    function burnExecutionTicket(uint256 tokenId)
        public
        _senderIsTokenOwnerOrHasAllowance(tokenId)
    {
        uint256 tokenIndex = getTokenIdIndex(tokenId);
        require(_ticketExists(tokenIndex), "The ticket does not exist");

        uint16 tokenType = _types[tokenIndex];
        _executionTickets[tokenId][tokenIndex] = 0;
        _tokenBalance[tokenIndex] = _tokenBalance[tokenIndex] - _executionBatchSize[tokenType];
    }

    function mint(uint16 tokenType, address _to) public payable {
        require(tokenType > 0 && tokenType <= _maxTypes,"Invalid token type");
        require(_isSaleActive, "Sale is currently not active");
        require(
            msg.value >= (_mintPriceGwei * 1000000000),
            "Amount of ether sent not correct."
        );

        _mint(_to, _owners.length + tokenType * _maxTokens);
    }

    function getIsSaleActive() public view returns (bool){
        return _isSaleActive;
    }

    function setIsSaleActive() public onlyOwner {
        _isSaleActive = true;
    }

    //if we have high demand and need to expand infrastructure
    //we stop selling nfts for this period
    function setIsSaleInactive() public onlyOwner {
        _isSaleActive = false;
    }

    function adaptMarketPrice(uint256 newPriceGwei) public onlyOwner {
        _mintPriceGwei = newPriceGwei;
    }


    function getTokenBalance(uint256 tokenId) public view returns (uint256) {
        uint256 tokenIndex = getTokenIdIndex(tokenId);
        require(_tokenBalance.length > tokenIndex, "This token does not exist");
        return _tokenBalance[tokenIndex];
    }

}
