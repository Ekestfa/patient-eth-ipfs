pragma solidity >=0.5.16;

contract Consultation {
    // Consultation mapping
    bytes32 private consulDateID;
    bytes private ipfsConsulHash;
    // event consultationCreated(bytes32 pname, bytes32 _consulDateID);

    constructor(bytes32 _consulDateID, bytes memory _ipfsConsulHash) public{
      consulDateID = _consulDateID;
      ipfsConsulHash = _ipfsConsulHash;
  }
}