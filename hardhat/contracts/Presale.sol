// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract Presale is ReentrancyGuard {
    IERC20 public token;
    address public owner;
    uint256 public publicSalePrice;
    uint256 public publicSaleCap;
    uint256 public publicSaleStartTime;
    uint256 public publicSaleTokenAllocation;
    bool public publicSaleActive;
    mapping(address => bool) public whitelisted;
    mapping(address => uint256) public tokensOwed;

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

    function togglePublicSale(
        bool _state,
        uint256 _startTime
    ) external onlyOwner {
        publicSaleActive = _state;
        publicSaleStartTime = _startTime;
    }

    function addToWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            whitelisted[addresses[i]] = true;
        }
    }

    function isSaleOpenFor(address _address) public view returns (bool) {
        if (!publicSaleActive) {
            return false;
        }
        if (block.timestamp >= publicSaleStartTime) {
            return true;
        }
        if (
            block.timestamp >= publicSaleStartTime - 30 minutes &&
            whitelisted[_address]
        ) {
            return true;
        }
        return false;
    }

    function buyTokens() external payable nonReentrant {
        require(isSaleOpenFor(msg.sender), "Sale not open for you yet");
        require(msg.value <= publicSaleCap, "Exceeds public sale cap");

        uint256 tokensToReceive = msg.value / publicSalePrice;
        require(
            publicSaleTokenAllocation >= tokensToReceive,
            "Not enough tokens left in allocation"
        );

        tokensOwed[msg.sender] += tokensToReceive;
        publicSaleTokenAllocation -= tokensToReceive;
    }

    function claimTokens() external nonReentrant {
        uint256 amountOwed = tokensOwed[msg.sender];
        require(amountOwed > 0, "No tokens to claim");
        require(
            token.transfer(msg.sender, amountOwed),
            "Token transfer failed"
        );
        tokensOwed[msg.sender] = 0;
    }

    function withdraw() external onlyOwner nonReentrant {
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}
