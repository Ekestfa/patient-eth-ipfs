// import { ipfs } from '../_constants';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientIndex from '../abi/PatientIndex.json'

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

var Patient = contract(PatientIndex);
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;
const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({host:'ipfs.infura.io', port:'5001', protocol: 'HTTPS'});


export function configureFakeBackend() {
    let realFetch = window.fetch;
    
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    console.log("fake-backend register function")
                    // // get new user object from post body
                    let newUser = JSON.parse(opts.body);
                    console.log("2")
                    // // validation
                    // let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    // if (duplicateUser) {
                    //     reject('Username "' + newUser.username + '" is already taken');
                    //     return;
                    // }

                    // save new user
                    // newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    // users.push(newUser);
                    // localStorage.setItem('users', JSON.stringify(users));

                    // // respond 200 OK
                    
                    
                    var valuesBuffer = Buffer.from(JSON.stringify(opts.body)); //values.ETHaddress + values.username + ipfsHash
                    console.log("3")
                    Patient.setProvider(web3.currentProvider);
                    var usnameByte32 = ethers.utils.formatBytes32String(newUser.username);
                    web3.eth.defaultAccount = users.ethadd
                    console.log("4")
                    ipfs.add(valuesBuffer, (error, result) =>{
                      console.log("fake-backend register-IPFS.ADD")
                      if(error){
                        console.error(error)
                        return
                      }
                      console.log(result[0].hash)
                      Patient.deployed().then(function(contractInstance){
                        contractInstance.registerPatient(usnameByte32, Buffer.from(result[0].hash),{gas: 6721975 ,from: ethereum.selectedAddress}).then(function(success){
                            console.log("fake-backend register-CONTRACT REGISTER")
                          if(success){
                          console.log("created user on ethereum!");
                          resolve({ ok: true, text: () => Promise.resolve() });
                          }else{
                            console.log("error creating user on ethereum!");
                            resolve({ ok: false, text: () => Promise.resolve() });
                          }
                        });
                      }).catch(function(e) {
                        // There was an error! Handle it.
                        console.log('error creating user:', values.username, ':', e);
                        resolve({ ok: false, text: () => Promise.resolve() });
                      });
                    })
                    resolve({ ok: false, text: () => Promise.resolve() });
                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}