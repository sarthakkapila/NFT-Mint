// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract MuskNFT is ERC721URIStorage {
    uint256 private _tokenIds;
    address public elonMusk;
    uint256 public muskPercent;
    string[] public quotes;
    string private constant BASE_SVG = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor(
        string memory name,
        string memory symbol,
        address _elonMusk,
        uint256 _muskPercent
    ) ERC721(name, symbol) {
        elonMusk = _elonMusk;
        muskPercent = _muskPercent;
        quotes = [
            "When something is important enough, you do it even if the odds are not in your favor.",
            "Persistence is very important. You should not give up unless you are forced to give up.",
            "I think it is possible for ordinary people to choose to be extraordinary.",
            "The first step is to establish that something is possible; then probability will occur.",
            "People should pursue what they are passionate about. That will make them happier than pretty much anything else."
        ];
    }

    function mintNFT(address minter, uint256 choice) public returns (uint256) {
        require(choice < quotes.length, "Invalid quote choice");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        string memory finalSvg = string(
            abi.encodePacked(BASE_SVG, quotes[choice], "</text></svg>")
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        quotes[choice],
                        '", "description": "On-chain Quote NFTs", "attributes": [{"trait_type": "Quote", "value": "',
                        quotes[choice],
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

        _safeMint(minter, newItemId);
        _setTokenURI(newItemId, finalTokenUri);

        return newItemId;
    }
}
