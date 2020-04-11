pragma solidity >=0.5.16;
import "./Client.sol";

contract ClientFactory {
 event LogNewClientCreated(address sender, Client newClient);

 function createClient(address storageContract) public returns(Client newClient) {
   Client c = new Client(storageContract);
   emit LogNewClientCreated(msg.sender, c);
   return c;
   }
}