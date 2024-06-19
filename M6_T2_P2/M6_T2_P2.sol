// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";

contract DIDMethod {

    struct DIDDocument {
        address owner;
        string DID;
        bool status;
        string data;
    }

    mapping(address => DIDDocument) private registry;

    function registerDID() public {
        DIDDocument memory doc = registry[msg.sender];
        require(bytes(doc.DID).length == 0, "did already in use");

        string memory hexAddress = Strings.toString(
            uint256(uint160(msg.sender))
        );

        registry[msg.sender] = DIDDocument({
            owner: msg.sender,
            DID: string.concat("did:test:", hexAddress),
            status: true,
            data: "DID Document"
        });
    }

    function resolveDID(address _address) public view returns (DIDDocument memory) {
        DIDDocument memory doc = registry[_address];
        require(bytes(doc.DID).length != 0, "invalid did");
        return doc;
    }

    function activateDID(address _address) public {
        DIDDocument memory doc = registry[_address];
        require(bytes(doc.DID).length != 0, "invalid did");
        registry[_address].status = true;
    }

    function suspendDID(address _address) public {
        DIDDocument memory doc = registry[_address];
        require(bytes(doc.DID).length != 0, "invalid did");
        registry[_address].status = false;
    }

    function revokeDID(address _address) public {
        DIDDocument memory doc = registry[_address];
        require(bytes(doc.DID).length != 0, "invalid did");
        delete registry[_address];
    }


}