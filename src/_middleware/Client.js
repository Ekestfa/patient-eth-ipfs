import web3 from 'web3'
import {ethers} from 'ethers';
import client from '../abi/ClientFactory.json'
import contract from 'truffle-contract';

// // array in local storage for registered users
// let users = JSON.parse(localStorage.getItem('users')) || [];

var DeployedClient = contract(client);
web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;
const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({host:'ipfs.infura.io', port:'5001', protocol: 'HTTPS'});

export default {
  registerPatient: (object) => {
    var valuesBuffer = Buffer.from(JSON.stringify(object)); //values.ETHaddress + values.username + ipfsHash
    console.log("Client-registerPatient-function")
    DeployedClient.setProvider(web3.currentProvider);

    var usnameByte32 = ethers.utils.formatBytes32String(object.username);
    web3.eth.defaultAccount = object.ethadd

    ipfs.add(valuesBuffer, (error, result) =>{
      console.log("Client-registerPatient-function-ipfs-add")
      if(error){
        console.error("ipfs error")
        return
      }
      console.log(result[0].hash)
      DeployedClient.deployed().then(function(contractInstance){
        contractInstance.registerPatient(usnameByte32, Buffer.from(result[0].hash),{gas: 6721975 ,from: ethereum.selectedAddress}).then(function(success){
            console.log("fake-backend register-CONTRACT REGISTER")
          if(success){
          console.log("created user on ethereum!");
          // resolve({ ok: true, text: () => Promise.resolve() });
          }else{
            console.log("error creating user on ethereum!");
            // resolve({ ok: false, text: () => Promise.resolve() });
          }
        });
      }).catch(function(e) {
        // There was an error! Handle it.
        console.log('error creating user:', object.username, ':', e);
        // resolve({ ok: false, text: () => Promise.resolve() });
      });
    })
  }
}

