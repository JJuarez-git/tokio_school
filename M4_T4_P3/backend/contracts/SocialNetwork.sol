// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./MessageCounter.sol";

contract SocialNetwork {
    MessageCounter public counterContract;

    struct Message {
        address sender;
        string name;
        string content;
    }

    Message[] messages;

    constructor(address _counterContractAddress) {
        counterContract = MessageCounter(_counterContractAddress);
    }

    function writeMessage(string memory name, string memory mes) public {
        require(
            bytes(mes).length <= 300,
            "Message exceeds maximum length"
        );
        messages.push(Message(msg.sender, name, mes));
        countMessage();
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function countMessage() public {
        counterContract.count();
    }
}