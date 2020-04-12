pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
import "./Patient.sol";

contract PatientStorage {
   mapping(address => uint) private addressToIndex;
   mapping(bytes32 => uint) private patientnameToIndex;
   address[] private addresses;
   bytes32[] private patientUnames;
   bytes[] private ipfsHashes;
   Patient p;
   mapping(bytes32 => Patient) patientnameToPatient;

   function registerPatient(bytes32 patientName, bytes memory ipfsHash) public returns(bool) {
     require(!hasPatient(msg.sender),
            "Sender not authorized.");
     require(!patientNameTaken(patientName),
            "Patient name has been taken.");
      patientnameToPatient[patientName] = new Patient(patientName, ipfsHash);
      addresses.push(msg.sender);
      patientUnames.push(patientName);
      ipfsHashes.push(ipfsHash);
      addressToIndex[msg.sender] = addresses.length - 1;
      patientnameToIndex[patientName] = addresses.length - 1;
      return true;
    }

   function hasPatient(address _patientAdresses) public view returns(bool) {
      return (addressToIndex[_patientAdresses] > 0 || _patientAdresses == addresses[0]);
    }

   function patientNameTaken(bytes32 pname) public view returns(bool takenIndeed) {
      return (patientnameToIndex[pname] > 0 || pname == 'self');
    }

   function updatePatient(bytes memory ipfsHash) public returns(bool){
      require(!hasPatient(msg.sender),
            "Sender not authorized.");
      p.updatePatient(ipfsHash);
      return true;
    }

   function getPatientCount() public view returns(uint){
      return addresses.length;
    }
   function getPatientByPatientname(bytes32 _pname) public view returns(Patient){
      return patientnameToPatient[_pname];
   }
   function getPatientByIndex(uint index) public view returns(address,bytes32,bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return(addresses[index], patientUnames[index], ipfsHashes[index]);
    }

   function getAddressByIndex(uint index) public view returns(address){
      require((index < addresses.length),
            "Index out of bound!");
      return addresses[index];
    }

   function getPatientNameByIndex(uint index) public view returns(bytes32){
      require((index < addresses.length),
            "Index out of bound!");
      return patientUnames[index];
    }

   function getIpfsHashByIndex(uint index) public view returns(bytes memory){
      require((index < addresses.length),
            "Index out of bound!");
      return ipfsHashes[index];
    }

   function getPatientByAddress(address patientAddress) public view returns(uint, bytes32, bytes memory){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return(addressToIndex[patientAddress], patientUnames[addressToIndex[patientAddress]], ipfsHashes[addressToIndex[patientAddress]]);
    }

   function getIndexByAddress(address patientAddress) public view returns(uint){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return addressToIndex[patientAddress];
    }

   function getPatientNameByAddress(address patientAddress) public view returns(bytes32){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return patientUnames[addressToIndex[patientAddress]];
    }

   function getIpfsHashByAddress(address patientAddress) public view returns(bytes memory){
      require(hasPatient(patientAddress),
            "Patient doesn't exist!");
      return ipfsHashes[addressToIndex[patientAddress]];
    }

   function getPatientByPatientName(bytes32 patientname) public view returns(uint,address,bytes memory){
      require((patientnameToIndex[patientname] < addresses.length),
            "Patient index out of bound!");
      return(patientnameToIndex[patientname], addresses[patientnameToIndex[patientname]], ipfsHashes[patientnameToIndex[patientname]]);
    }

   function getIndexByPatientName(bytes32 patientname) public view returns(uint){
      require((patientNameTaken(patientname)),
            "Can't find the patient!");
      return patientnameToIndex[patientname];
    }

   function getAddressByPatientName(bytes32 patientname) public view returns(address){
      require((patientNameTaken(patientname)),
        "Can't find the patient!");
      return addresses[patientnameToIndex[patientname]];
    }

   function getIpfsHashByPatientName(bytes32 patientname) public view returns(bytes memory){
      require((patientNameTaken(patientname)),
            "Can't find the patient!");
      return ipfsHashes[patientnameToIndex[patientname]];
    }

   function consultationCreate(bytes32 _pname, bytes32 _consulDateID, bytes memory newPatientIpfs)public returns(bool){
      return p.consultationCreate(_pname, _consulDateID, newPatientIpfs);
    }

   function getConsultationByConsultationIndex(uint _index) public view returns(bytes32 consulID){
      return p.getConsultationByConsultationIndex(_index);
    }
   function getConsultationIndexByConsultationID(bytes32 _consulDateID) public view returns(uint){
      return p.getConsultationIndexByConsultationID(_consulDateID);
    }

   function getConsultationsByPatientName(bytes32 _pname) public view returns(bytes32[] memory){
      return p.getConsultationsByPatientName(_pname);
    }

   function getConsultationsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
      return p.getConsultationsByPatientAddress(patientAddress);
    }
   function testCreate(bytes32 _pname, bytes32 _testDateID, bytes memory newPatientIpfs)public returns(bool){
      return p.testCreate(_pname,_testDateID,newPatientIpfs);
    }

   function getTestByTestIndex(uint _index) public view returns(bytes32 testID){
      return p.getTestByTestIndex(_index);
    }

   function getTestIndexByTestID(bytes32 _testDateID) public view returns(uint){
      return p.getTestIndexByTestID(_testDateID);
    }

   function getTestsByPatientName(bytes32 _pname) public view returns(bytes32[] memory) {
      return p.getTestsByPatientName(_pname);
    }

   function getTestsByPatientAddress(address patientAddress) public view returns(bytes32[] memory){
      return p.getTestsByPatientAddress(patientAddress);
    }
   function getTestsCount() public view returns (uint){
      return p.getTestsCount();
    }
}