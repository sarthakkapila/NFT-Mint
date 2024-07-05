// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract horoscopeNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("Horoscope", "HSCP") {}

    function mintNFT(address recipient, string memory zodiacSign)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, zodiacSign);
        _tokenIds += 1;
        return newItemId;
    }
}

