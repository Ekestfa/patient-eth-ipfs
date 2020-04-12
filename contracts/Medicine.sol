pragma solidity >=0.5.16;

contract Medicine{
    bytes32 private medicineName;
    bytes private medIpfsHash;

    constructor(bytes32 _medicineName, bytes memory _medIpfsHash) public {
        medicineName = _medicineName;
        medIpfsHash = _medIpfsHash;
    }

    function updateMedicine(bytes memory ipfsHash) public returns(bool){
      medIpfsHash = ipfsHash;
      return true;
     }
}