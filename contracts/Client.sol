pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./PatientStorage.sol";

contract Client {

PatientStorage datastore;

constructor(address storageAddress) public {
    datastore = PatientStorage(storageAddress);
}

function consultationCreate(bytes32 _pname, bytes32 _consulDateID,
   bytes memory _ipfsConsulHash, bytes memory newPatientIpfs)public returns(bool){
   datastore.consultationCreate(_pname, _consulDateID, _ipfsConsulHash, newPatientIpfs);
   return true;

}

function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID, bytes memory ipfs){
   return datastore.getConsultationByConsultationIndex(_index);
}

function getConsultationIpfsByConsultationID(bytes32 _consulDateID) public view returns(bytes memory ipfs){
   return datastore.getConsultationIpfsByConsultationID(_consulDateID);
}

function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
   return datastore.getConsultationIndexByConsultationID(_consulDateID);
}

function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory, bytes[] memory) {
   return datastore.getConsultationsByPatientName(_pname);
}

function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory, bytes[] memory){
   return datastore.getConsultationsByPatientAddress(patientAddress);
}

function registerPatient(bytes32 patientName, bytes memory ipfsHash) public returns(bool) {
    return datastore.registerPatient(patientName,ipfsHash);
 }

function hasPatient(address _patientAdresses) public view returns(bool) {
    return datastore.hasPatient(_patientAdresses);
 }
function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
    return datastore.patientNameTaken(pname);
 }

  function updatePatient(bytes memory ipfsHash) public returns(bool){
    return datastore.updatePatient(ipfsHash);
 }

 function getPatientCount() public view returns(uint){
    return datastore.getPatientCount();
 }

 function getPatientByIndex(uint index) public view returns(address,bytes32,bytes memory){
    return datastore.getPatientByIndex(index);
 }

 function getAddressByIndex(uint index) public view returns(address){
    return datastore.getAddressByIndex(index);
 }

 function getPatientNameByIndex(uint index) public view returns(bytes32){
    return datastore.getPatientNameByIndex(index);
 }

 function getIpfsHashByIndex(uint index) public view returns(bytes memory){
    return datastore.getIpfsHashByIndex(index);
 }

 function getPatientByAddress(address patientAddress) public view returns(uint, bytes32, bytes memory){
    return datastore.getPatientByAddress(patientAddress);
 }

 function getIndexByAddress(address patientAddress) public view returns(uint){
    return datastore.getIndexByAddress(patientAddress);
 }

 function getPatientNameByAddress(address patientAddress) public view returns(bytes32){
    return datastore.getPatientNameByAddress(patientAddress);
 }

 function getIpfsHashByAddress(address patientAddress) public view returns(bytes memory){
    return datastore.getIpfsHashByAddress(patientAddress);
 }

 function getPatientByPatientName(bytes32 patientname) public view returns(uint,address,bytes memory){
    return datastore.getPatientByPatientName(patientname);
 }

 function getIndexByPatientName(bytes32 patientname) public view returns(uint){
    return datastore.getIndexByPatientName(patientname);
 }

 function getAddressByPatientName(bytes32 patientname) public view returns(address){
    return datastore.getAddressByPatientName(patientname);
 }
 function getIpfsHashByPatientName(bytes32 patientname) public view returns(bytes memory){
    return datastore.getIpfsHashByPatientName(patientname);
 }
}