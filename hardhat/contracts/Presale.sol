// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract Presale {
    IERC20 public token;
    address public owner;
    uint256 public publicSalePrice;
    uint256 public publicSaleCap;
    bool public publicSaleActive;

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function setPrice(uint256 _publicSalePrice) external onlyOwner {
        publicSalePrice = _publicSalePrice;
    }

    function setCap(uint256 _publicSaleCap) external onlyOwner {
        publicSaleCap = _publicSaleCap;
    }

    function togglePublicSale(bool _state) external onlyOwner {
        publicSaleActive = _state;
    }

    function buyTokens() external payable {
        require(publicSaleActive, "Sale not active");
        require(msg.value <= publicSaleCap, "Exceeds public sale cap");
        uint256 tokens = msg.value / publicSalePrice;
        require(token.transfer(msg.sender, tokens), "Token transfer failed");
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
