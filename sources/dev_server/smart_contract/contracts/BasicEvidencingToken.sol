//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract BasicEvidencingToken is
    Context,
    ERC165,
    IERC721,
    IERC721Metadata,
    Ownable
{
    using Address for address;
    using Strings for uint256;

    constructor() {
        
        _name = "BasicEvidencingToken";
        _symbol = "bpt";
        _allowedServices[_msgSender()] = true;
        _isSelfEvidencingActive = true;

    }

    //ERC721
    mapping(address => bool) _allowedServices;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping tokenId to time
    mapping(uint256 => uint256) private _mintTime;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) internal _operatorApprovals;

    string private _name;

    string private _symbol;
    
    uint256 private _mintSelfEvidencePriceGwei = 300000; //0.0003ETH

    bool private _isSelfEvidencingActive = true;

    //LCT
    

    //fileHash to txHash
    mapping(uint256 => uint256) _hashMap;
    mapping(uint256 => string) _evidenceMessage;
    mapping(uint256 => uint32) _messageType;
    uint32[] _types;
    address[] internal _owners;
    mapping(uint256 => uint256) _tokenIdEvidence;
    uint internal _maxTokens = 1000000000000000000000000000000000000000000000000000000000000000000000000; 
    string _baseURL;

    event MintedBatchHashEvidence(address creator , uint8 indexed bucket,uint256 hashdata, uint256 tokenId);
    event MintedHashMapEvidence(address creator ,uint256 fromHash, uint256 toHash, uint256 tokenId);
    event AssignedAllowedServiceEvent(address sender ,address addressToAllow);
    event UnassignedAllowedServiceEvent(address sender ,address addressToUnassign);
  
    function setBaseURI(string memory uri) public onlyOwner {
        _baseURL = uri;
    }


    function getIsSelfEvidencingActive() public view returns (bool){
        return _isSelfEvidencingActive;
    }

    function setIsSelfEvidencingActive() public onlyOwner {
        _isSelfEvidencingActive = true;
    }

    function setIsSelfEvidencingInactive() public onlyOwner {
        _isSelfEvidencingActive = false;
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


    //fromHash = fileHash, toHash = txHash
    function mintHashMapEvidence(uint256 fromHash, uint256 toHash) public isService()
    {
        require(_hashMap[fromHash] == 0, "You cannot overwrite existing evidence!");
        require(toHash != 0 && fromHash != 0, "You cannot evidence NULL (0) values!");
        _hashMap[fromHash] = toHash;
       

        // tokenID + type * _maxTokens
        uint256 typedTokenId = (_owners.length ) + 1 * _maxTokens; 

        _mint(_msgSender(), typedTokenId);

        emit MintedHashMapEvidence(_msgSender(), fromHash, toHash, typedTokenId);
    }

     function mintBatchHashEvidence(uint256[] calldata hashes) public isService()
    {
        uint256 typedTokenId = (_owners.length ) + 1 * _maxTokens; 
        _mint(_msgSender(), typedTokenId);
         for (uint256 i = 0; i < hashes.length; i++) {

             emit MintedBatchHashEvidence(_msgSender(),getBucketFromHash(hashes[i]), hashes[i], typedTokenId);
        }
    }

    function getBucketFromHash(uint256 hashData) pure internal returns(uint8)
    {
        return uint8(hashData % 1000);
    }

    function mintSelfEvidence(uint256 evidenceHash) public payable
    {
        require(_isSelfEvidencingActive, "Sale is currently not active");
        require(
            msg.value >= (_mintSelfEvidencePriceGwei * 1000000000),
            "Amount of ether sent not correct."
        );
        require(evidenceHash != 0, "You cannot evidence NULL (0) values!");
        require(_hashMap[evidenceHash] == 0, "You cannot overwrite existing evidence!");
        
        // tokenID + type * _maxTokens
        uint256 typedTokenId = (_owners.length ) + 2 * _maxTokens; 
        _mintTime[evidenceHash] = block.timestamp;
        _hashMap[evidenceHash] = typedTokenId;
        _tokenIdEvidence[typedTokenId]=evidenceHash;

        _mint(_msgSender(), typedTokenId);
    }

    //  function mintBidirectionalHashMapProof(uint256 fromHash, uint256 toHash) public
    // {
    //     mintHashMapEvidence(fromHash, toHash);
    //     mintHashMapEvidence(toHash, fromHash);
    // }


    //implied tbd by service/website
    // function ProofHashMapFromToken(uint256 tokenId) public view
    // {
        
    // }

    modifier onlyTokenHolder(uint256 tokenId)
    {
        require(_exists(tokenId),'The provided token does not exist');

        require(_owners[getTokenIdIndex(tokenId)] == _msgSender(),"Caller is not owner of the token.");
        _;
    }
    
    
    function evidenceByTokenId(uint256 tokenId) public view onlyTokenHolder(tokenId) returns (uint256) 
    {
        return _tokenIdEvidence[tokenId];
    }


    function verifyEvidenceHashMap(uint256 fromHash) public view returns (uint256)
    {
        require(_hashMap[fromHash] != 0, "The evidence you are requesting does not exist!");
        return _hashMap[fromHash];
    }

    function verifySelfEvidence(uint256 evidenceHash) public view returns (uint256, uint256, uint256)
    {
        require(_hashMap[evidenceHash] != 0, "The evidence you are requesting does not exist!");
        return (evidenceHash, _mintTime[evidenceHash], _hashMap[evidenceHash]);
    }
    //CALC

    
    function getTokenIdIndex(uint tokenId) internal view returns (uint256){
        return tokenId - getTypeIdFromTokenId(tokenId) * _maxTokens;
    }

    
    function getTypeIdFromTokenId(uint tokenId) internal view returns (uint32){
        return  uint32(tokenId /_maxTokens);
    }


    //ERC721 #################################
    

    function totalSupply() public view returns (uint256) {
        return _owners.length;
    }

    
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf( address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            owner != address(0),
            "ERC721: balance query for the zero address"
        );

        uint256 amt = 0;
        for (uint256 i = 0; i < _owners.length; i++) {
            if (_owners[i] == owner) {
                amt++;
            }
        }
        return amt;
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        address owner = _owners[getTokenIdIndex(tokenId)];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(),".json"))
                : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return _baseURL;
    }

    

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = BasicEvidencingToken.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );

        return _tokenApprovals[getTokenIdIndex(tokenId)];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(
            _checkOnERC721Received(from, to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners.length < getTokenIdIndex( tokenId); //owner length is the amt of existing tokens, including burned tokens
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        virtual
        returns (bool)
    {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = BasicEvidencingToken.ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);
        uint32 ttype = uint32(tokenId / _maxTokens);
        _owners.push(to);
        _types.push(ttype);

        emit Transfer(address(0), to, tokenId);
    }


    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = BasicEvidencingToken.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _owners[tokenId] = address(0);

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(
            BasicEvidencingToken.ownerOf(tokenId) == from,
            "ERC721: transfer of token that is not own"
        );
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(BasicEvidencingToken.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits a {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try
                IERC721Receiver(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    _data
                )
            returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert(
                        "ERC721: transfer to non ERC721Receiver implementer"
                    );
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

}
