// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MessageCounter {
    uint256 counter;

    function count() public {
        counter += 1;
    }

    function getCount() public view returns (uint256) {
        return counter;
    }
}
