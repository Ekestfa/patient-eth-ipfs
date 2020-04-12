pragma solidity >=0.5.16;

contract Test {
    address addr;
    bytes32 puname;
    bytes32 private testDateID;

    constructor(address _addr, bytes32 _puname, bytes32 _testDateID) public{
      addr = _addr;
      puname = _puname;
      testDateID = _testDateID;
  }
}