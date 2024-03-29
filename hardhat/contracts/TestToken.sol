// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("AtlasPairs", "ATLAS") {
        _mint(msg.sender, 1_000_000 * 10 ** 18);
    }

    function mint() public {
        _mint(msg.sender, 1_000 * 10 ** 18);
    }
}
