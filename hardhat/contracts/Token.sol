// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AtlasToken is ERC20 {
    address public taxRecipient;
    uint256 public taxRate = 50; // Tax rate as a percentage multiplied by 10 (e.g., 50 for 5%)

    mapping(address => bool) public isExchangeAddress;

    constructor() ERC20("ATLAS", "AtlasPairs") {
        _mint(msg.sender, 100_000_000 * 10 ** 18);
        taxRecipient = msg.sender;
    }

    function setTaxRate(uint256 _taxRate) public {
        require(
            msg.sender == taxRecipient,
            "Only the tax recipient can change the tax rate"
        );
        taxRate = _taxRate;
    }

    function setTaxRecipient(address _taxRecipient) public {
        require(
            msg.sender == taxRecipient,
            "Only the tax recipient can change the tax recipient"
        );
        taxRecipient = _taxRecipient;
    }

    function setExchangeAddress(address _exchange, bool _status) public {
        require(
            msg.sender == taxRecipient,
            "Only the tax recipient can change the exchange addresses"
        );
        isExchangeAddress[_exchange] = _status;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        if (isExchangeAddress[sender] || isExchangeAddress[recipient]) {
            uint256 tax = (amount * taxRate) / 1000; // Adjusted to account for taxRate being a percentage multiplied by 10
            uint256 amountAfterTax = amount - tax;

            super._transfer(sender, taxRecipient, tax);
            super._transfer(sender, recipient, amountAfterTax);
        } else {
            super._transfer(sender, recipient, amount);
        }
    }
}
