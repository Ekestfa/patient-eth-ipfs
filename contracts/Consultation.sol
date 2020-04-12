pragma solidity >=0.5.16;

contract Consultation {
    address addr;
    bytes32 patientuname;
    bytes32 private consulDateID;


    constructor(address _addr, bytes32 _patientuname, bytes32 _consulDateID) public{
      addr = _addr;
      patientuname = _patientuname;
      consulDateID = _consulDateID;
  }
}