pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./Consultation.sol";

contract Patient{
    address private addr;
    bytes32 private patientuname;
    bytes private IpfsHash;

    // Consultation mapping
    mapping(bytes32 => uint) private consulDateIDToIndex;
    // patient name to consultations
    mapping(bytes32 => bytes32[]) pnameToConsulArray;
    mapping(bytes32 => bytes[]) pnameToConsulIpfsArray;
    // patient address to consultations
    mapping(address => bytes32[]) paddressToConsulArray;
    mapping(address => bytes[]) paddressToConsulIpfsArray;
    bytes32[] consIDs;
    bytes[] private consulIPFShashes;

    event NewConsultationCreadted(bytes32 pname, bytes32 consID);

    constructor(bytes32 _patientuname,bytes memory _IpfsHash) public{
        addr = msg.sender;
        patientuname = _patientuname;
        IpfsHash = _IpfsHash;
    }

    function updatePatient(bytes memory ipfsHash) public returns(bool){
        IpfsHash = ipfsHash;
        return true;
    }

    function consultationCreate(bytes32 _pname, bytes32 _consulDateID,
        bytes memory _ipfsConsulHash, bytes memory newPatientIpfs)public returns(bool){
        // Create new consultation with ID and its IPFS Hash
        new Consultation(_consulDateID, _ipfsConsulHash);
        consIDs.push(_consulDateID);
        consulIPFShashes.push(_ipfsConsulHash);
        consulDateIDToIndex[_consulDateID] = consIDs.length;
        pnameToConsulArray[_pname] = consIDs;
        pnameToConsulIpfsArray[_pname] = consulIPFShashes;
        paddressToConsulArray[msg.sender] = consIDs;
        paddressToConsulIpfsArray[msg.sender] = consulIPFShashes;
        // Consultations hash append to patient ipfs storage
        updatePatient(newPatientIpfs);
        emit NewConsultationCreadted(_pname, _consulDateID);
        return true;
    }

    function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID, bytes memory ipfs){
        return (consIDs[_index], consulIPFShashes[_index]);
    }

    function getConsultationIpfsByConsultationID(bytes32 _consulDateID) public view returns(bytes memory ipfs){
        return consulIPFShashes[consulDateIDToIndex[_consulDateID]];
    }

    function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
        return consulDateIDToIndex[_consulDateID];
    }

    function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory, bytes[] memory) {
        return (pnameToConsulArray[_pname], pnameToConsulIpfsArray[_pname]);
    }

    function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory, bytes[] memory){
        return(paddressToConsulArray[patientAddress],paddressToConsulIpfsArray[patientAddress]);
    }
}