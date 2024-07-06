// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";                                  
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";    
import "hardhat/console.sol";

// Basic idea -> Make a contract for ELon's quote nfts and give mr musk royalty of 5% on every transaction
// Give another 5% to PlantTrees fund
contract MuskNFT {
  address public minter;
  address public ElonMusk=0x9a96B40ffE1Fbb5734AbE92400f256b3DBaDa202;   // Using the address of my Phantom wallet here
  address public PlantTrees=0xF6490d8da3f6Fe027018A01F61eF71f8D69519E4;   // Using the address of my MetaMask wallet here
  uint public MuskPercent = 5;
  uint public TreesPercent = 5;

  constructor() (string memory _name, string memory _symbol, address _minter, address _ElonMusk, address _PlantTrees, uint _MuskPercent, uint _TreesPercent) ERC721(_name, _symbol) {
    minter = _minter;
    ElonMusk = _ElonMusk;
    PlantTrees = _PlantTrees;
    MuskPercent = _MuskPercent;
    TreesPercent = _TreesPercent;
  }

}

