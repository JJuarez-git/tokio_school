// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    // State variable to store the counter value
    uint256 private count;

    // Constructor to initialize the counter to 0
    constructor() {
        count = 0;
    }

    // Function to increment the counter
    function increment() public {
        count += 1;
    }

    // Function to decrement the counter
    function decrement() public {
        require(count > 0, "Counter cannot be negative");
        count -= 1;
    }

    // Function to get the current count value
    function getCount() public view returns (uint256) {
        return count;
    }
}
