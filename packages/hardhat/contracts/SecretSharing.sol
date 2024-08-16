//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract SecretSharing {
    mapping(address => string) private shares;

    // Guardar el share cifrado
    function storeShare(string memory encryptedShare) public {
        shares[msg.sender] = encryptedShare;
    }

    // Recuperar el share cifrado
    function retrieveShare(address sender) public view returns (string memory) {
        return shares[sender];
    }
}
