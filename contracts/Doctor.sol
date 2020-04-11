pragma solidity >=0.5.16;

contract Doctor{
    address private addr;
    bytes32 private doctoruname;
    bytes private IpfsHash;

    constructor(bytes32 _doctoruname,bytes memory _IpfsHash) public{
        addr = msg.sender;
        doctoruname = _doctoruname;
        IpfsHash = _IpfsHash;
    }

    function updateDoctor(bytes memory ipfsHash) public returns(bool){
        IpfsHash = ipfsHash;
        return true;
    }


}