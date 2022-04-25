// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./base64.sol";

interface IBody {
  function get(uint256 _id, string memory _skinColor) external view returns (string memory);
}

interface IHead{
  function get(uint256 _id, string memory _skinColor) external view returns (string memory);
}

interface IFace {
  function get(uint256 _id) external view returns (string memory);
}

interface IAccessory {
  function get(uint256 _id) external view returns (string memory);
}

contract Profile is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Profile", "PFL") {}

    bool public _saleIsActive = false;
    uint256 public constant price = 0.05 ether;
    uint256 public constant maxMintQuantity = 5;

    IBody ibody;
    IHead ihead;
    IFace iface;
    IAccessory iaccessory;

    struct Profile {
        string skinColor;
        uint256 body;
        uint256 head;
        uint256 face;
        uint256 accessory;
    }
    
    Profile[] public profiles;    
    event profileMinted(uint256 tokenId, string skinColor, uint256 body, uint256 head, uint256 face, uint256 accessory);
    event profileChanged(uint256 tokenId, string skinColor, uint256 body, uint256 head, uint256 face, uint256 accessory);

    uint256 public bodyCount = 2;
    uint256 public headCount = 1;
    uint256 public faceCount = 1;
    uint256 public accessoryCount = 2;

    string svgBegin = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1935 3033">';
    string svgEnd = '</svg>';

    function setSaleIsActive(bool saleIsActive) external onlyOwner {
      _saleIsActive = saleIsActive;
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    
    function mintProfile(uint256 quantity) external payable {
        require(_saleIsActive,"SALE IS NOT ACTIVE!");
        require(maxMintQuantity + 1 > quantity,"You can't mint that many at once!");
        // require(totalSupply() + quantity <= collectionSize, "MAX SUPPLY!");
        require(quantity * price <= msg.value, "INCORRECT AMOUNT SENT!");
        _safeMint(msg.sender, quantity);
        
        profiles.push(Profile("#FFFFFF", 0, 0, 0, 0));
        emit profileMinted(_tokenIdCounter.current(), "#FFFFFF", 0, 0, 0, 0);
    }

    function setAttributes(
        uint256 tokenId, 
        string memory skinColor, 
        uint256 body, 
        uint256 head, 
        uint256 face, 
        uint256 accessory) public {
        require(msg.sender == ownerOf(tokenId), "YOU ARE NOT THE OWNER!");
            profiles[tokenId] = Profile(skinColor, body, head, face, accessory);
            emit profileChanged(tokenId, skinColor, body, head, face, accessory);
        }

    function setFeaturesAddress(address[] memory addr) external onlyOwner{
      ibody= IBody(addr[0]);
      ihead = IHead(addr[1]);
      iface = IFace(addr[2]);
      iaccessory = IAccessory(addr[3]);
    }

    function getFinalSvg(
        string memory skinColor, 
        uint256 body, 
        uint256 head, 
        uint256 face, 
        uint256 accessory
    ) public view returns(string memory) {
        return string(abi.encodePacked(
            svgBegin, 
            ibody.get(body, skinColor), 
            ihead.get(head, skinColor), 
            iface.get(face), 
            iaccessory.get(accessory), 
            svgEnd
        ));
    }

    function svgToImageURI(string memory svg)
        public
        pure
        returns (string memory)
    {
        string memory baseURI = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        string memory imageURI = string(
            abi.encodePacked(baseURI, svgBase64Encoded)
        );
        return imageURI;
    }

    function formatTokenURI(string memory imageURI)
        public
        pure
        returns (string memory)
    {
        string memory baseURI = "data:application/json;base64,";
        return
            string(
                abi.encodePacked(
                    baseURI,
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "Profile"',
                                '"description": "A low poly profile"',
                                '"attributes": ""',
                                '"image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        Profile memory profile = profiles[tokenId];
        string memory imageURI = svgToImageURI(getFinalSvg(profile.skinColor, profile.body, profile.head, profile.face, profile.accessory));
        string memory _tokenURI = formatTokenURI(imageURI);
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}