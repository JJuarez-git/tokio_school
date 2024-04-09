// José Carlos Juárez Calvo M4_T4_P1
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract SocialNetwork {
    struct Message {
        address sender;
        string name;
        string content;
    }

    Message[] messages;

    function writeMessage(string memory name, string memory mes) public {
        require(
            bytes(mes).length <= 300,
            "Message exceeds maximum length"
        );
        messages.push(Message(msg.sender, name, mes));
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
