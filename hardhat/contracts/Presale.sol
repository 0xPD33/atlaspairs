// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Presale {
    IERC20 public token;
    address public owner;
    uint256 public publicSalePrice; // tokens per ETH
    uint256 public publicSaleCap;
    uint256 public publicSaleStartTime;
    uint256 public publicSaleTokenAllocation;
    bool public publicSaleActive;
    bool public saleEnded;
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

    function startPublicSale(
        uint256 _startTime,
        uint256 _amount
    ) external onlyOwner {
        require(!publicSaleActive && !saleEnded, "Sale already initialized");

        publicSaleActive = true;
        publicSaleStartTime = _startTime;
        publicSaleTokenAllocation  = _amount;
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );
    }

    function endPublicSale() external onlyOwner {
        require(publicSaleActive, "Sale not initialized");
        publicSaleActive = false;
        saleEnded = true;
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

    function buyTokens() external payable {
        require(isSaleOpenFor(msg.sender), "Sale not open for you yet");
        require(msg.value <= publicSaleCap, "Exceeds public sale cap");

        uint256 tokensToReceive = msg.value * publicSalePrice;
        require(
            publicSaleTokenAllocation >= tokensToReceive,
            "Not enough tokens left in allocation"
        );

        tokensOwed[msg.sender] += tokensToReceive;
        publicSaleTokenAllocation -= tokensToReceive;
    }

    function claimTokens() external {
        require(saleEnded, "Sale has not ended");
        uint256 amountOwed = tokensOwed[msg.sender];
        require(amountOwed > 0, "No tokens to claim");
        tokensOwed[msg.sender] = 0;
        require(
            token.transfer(msg.sender, amountOwed),
            "Token transfer failed"
        );
        
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    function tokenWithdraw() external onlyOwner {
        require(
            token.transfer(owner, token.balanceOf(address(this))),
            "Token transfer failed"
        );
    }
}
