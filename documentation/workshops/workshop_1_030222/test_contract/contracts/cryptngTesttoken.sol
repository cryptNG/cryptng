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
contract cryptngTesttoken is
    Context,
    ERC165,
    IERC721,
    IERC721Metadata,
    Ownable
{
    using Address for address;
    using Strings for uint256;

    constructor() {
        _name = "cryptngTesttoken";
        _symbol = "cnx";
        _allowedServices[_msgSender()] = true;
    }

    uint256 private _mintPriceGwei = 1000000; //0.001ETH

    bool private _isSaleActive = true;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    address[] private _owners;

    // Mapping token id to token balance / num of executions
    uint256[] private _tokenBalance;

    
    event CreatedExecutionTicket(address indexed from, uint256 indexed ticketId, uint256 indexed tokenId);

    // Mapping from token ID to minutes since contract creation
    // if there is any value, the ticket exists and is in use
    //if a ticket is not fully burned e.g. when the executing customer service dies
    //it will stay open like this and await the next service time until consumed
    //consumed ticket = 0
    uint256[] private _executionTickets;

    //max amt of executions before a ticket is burned.
    //if a ticket is not fully burned e.g. when the executing customer service dies
    //it will stay open like this and await the next service time until consumed
    uint256 _executionBatchSize = 10;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

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

    function getTokens(address owner) public view returns (uint256[] memory) {
        uint256 tokenamt = balanceOf(owner);
        uint256[] memory tokens = new uint256[](tokenamt);
        uint256 tokenlistpos = 0;
        for (uint256 i = 0; i < _owners.length; i++) {
            if (_owners[i] == owner) {
                tokens[tokenlistpos] = i;
                tokenlistpos++;
            }
        }
        return tokens;
    }

    modifier _tokenHasBeenMinted(uint256 tokenId) {
        require(_owners.length > tokenId, "Token does not exist");
        _;
    }

    modifier _senderIsTokenOwner(uint256 tokenId) {
        require(
            _owners[tokenId] == _msgSender(),
            "You are not the token owner"
        );
        _;
    }

    function getTicketId(uint256 tokenId)
        public
        view
        _tokenHasBeenMinted(tokenId)
        returns (uint256)
    {
        require(_ticketExists(tokenId), "Ticket does not exist");

        return tokenId;
    }

    //tbd: is approvedTicketHolder
    //that includes: adding approved addresses, removing them
    //owner can be part of the list to make checks easier

    function _ticketExists(uint256 ticketId) internal view returns (bool) {
        return _executionTickets[ticketId] != 0;
    }

    function getTicketSecret(uint256 ticketId) public view returns (uint256) {
        return _executionTickets[ticketId];
    }


    mapping(address => bool) _allowedServices;

    function assignAllowedService(address addressToAllow) public onlyOwner
    {
        _allowedServices[addressToAllow] = true;
    }
    
    function unassignAllowedService(address addressToDisallow) public onlyOwner
    {
        require(addressToDisallow != owner(),"You are the contract owner, what are you doing?");
        _allowedServices[addressToDisallow] = false;
    }

    modifier isService()
    {
        require(_allowedServices[_msgSender()] == true,"Caller has to be an assigned/allowed service.");
        _;
    }


    function serviceBurnExecutionTickets(uint256 ticketId) public isService()
    {

        //remove this require if this does not affect gasPrice estimation
        require( _executionTickets[ticketId] > 0,"The ticket was already burned");
        _executionTickets[ticketId] = 0;
    }



    function createExecutionTicket(uint256 serviceSecret)
        public
    {
        int256 tokenIdUnverified = _getTokenWithEnoughBalance(_msgSender());
        require(
            tokenIdUnverified > -1,
            "You have no tokens that have enough balance and no assigned execution ticket"
        );
        uint256 tokenId = uint256(tokenIdUnverified);

        _executionTickets[tokenId] = serviceSecret;
        
        //tokenId is the same as ticketId, this is just to make it easier to understand
        emit CreatedExecutionTicket(_msgSender(),tokenId, tokenId);
        
    }

    function _getTokenWithEnoughBalance(address _sender)
        private
        view
        returns (int256)
    {
        for (uint256 i = 0; i < _owners.length; i++) {
            if (_owners[i] == _sender) {
                if (
                    (_tokenBalance[i] > _executionBatchSize) &&
                    (_executionTickets[i] == 0)
                ) {
                    return int256(i);
                }
            }
        }
        return -1;
    }

    function burnExecutionTicket(uint256 ticketId)
        public
        _senderIsTokenOwner(ticketId)
    {
        require(_ticketExists(ticketId), "The ticket does not exist");

        _executionTickets[ticketId] = 0;
        _tokenBalance[ticketId] = _tokenBalance[ticketId] - _executionBatchSize;
    }

    function mint(address _to) public payable {
        require(_isSaleActive, "Sale is currently not active");
        require(
            msg.value >= (_mintPriceGwei * 1000000000),
            "Amount of ether sent not correct."
        );

        _mint(_to, _owners.length);
    }

    function totalSupply() public view returns (uint256) {
        return _owners.length;
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
    function balanceOf(address owner)
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
        address owner = _owners[tokenId];
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
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = cryptngTesttoken.ownerOf(tokenId);
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

        return _tokenApprovals[tokenId];
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
        return _owners.length < tokenId; //owner length is the amt of existing tokens, including burned tokens
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
        address owner = cryptngTesttoken.ownerOf(tokenId);
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

        _owners.push(to);
        _tokenBalance.push(1000);
        _executionTickets.push(0);

        emit Transfer(address(0), to, tokenId);
    }

    function getTokenBalance(uint256 tokenId) public view returns (uint256) {
        require(_tokenBalance.length > tokenId, "This token does not exist");
        return _tokenBalance[tokenId];
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
        address owner = cryptngTesttoken.ownerOf(tokenId);

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
            cryptngTesttoken.ownerOf(tokenId) == from,
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
        emit Approval(cryptngTesttoken.ownerOf(tokenId), to, tokenId);
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
