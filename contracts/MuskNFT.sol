//  SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";                                  
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";    
import "hardhat/console.sol";

// Basic idea -> Make a contract for ELon's quote nfts and give mr musk royalty of 5% on every transaction
// Give another 5% to PlantTrees fund
contract MuskNFT {
  address public minter;
  address public ElonMusk=0xF6490d8da3f6Fe027018A01F61eF71f8D69519E4;   // Using the address of my Metamask wallet here
  uint public MuskPercent = 5;

  string[] public quotes;

  constructor() (string memory _name, string memory _symbol, address _minter, address _elonmusk, address _planttrees, uint _muskpercent, uint _treespercent) erc721(_name, _symbol) {
    minter = _minter;
    elonmusk = _elonmusk;
    muskpercent = _muskpercent;
    quotes.push("When something is important enough, you do it even if the odds are not in your favor.");
    quotes.push("Persistence is very important. You should not give up unless you are forced to give up.");
    quotes.push("I think it is possible for ordinary people to choose to be extraordinary.");
    quotes.push("The first step is to establish that something is possible; then probability will occur.");
    quotes.push("People should pursue what they’re passionate about. That will make them happier than pretty much anything else.");  
  }
  
  string basesvg = "<svg xmlns='<http://www.w3.org/2000/svg>' preserveaspectratio='xminymin meet' viewbox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";


 function MintNFT(address minter, uint Choice)
  public 
  returns(uint256)
  {
    _tokenIds += 1;
       
    // concat the svg 
    string memory finalSvg = string(
      abi.encodePacked(baseSvg, quotes[Choice], "</text></svg>")
    );
    string json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',quotes[Choice],
            '", "description": "On-chain Quote NFTs", "attributes": [{"trait_type": "Quote", "value": "',
            quotes[Choice],
            '"}], "image": "data:image/svg+xml;base64,',
            Base64.encode(bytes(finalSvg)),
            '"}'
            )
          )
        )
      );
    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
    uint256 newItemId = _tokenIds;
    _safeMint(minter, newItemId);
    _setTokenURI(newItemId, finalTokenUri);
    return newItemId;
  }
}

