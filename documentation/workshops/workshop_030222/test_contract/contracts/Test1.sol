//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Test1 is ERC721 {
    constructor() ERC721("Minimal", "MIN") {}
    
}