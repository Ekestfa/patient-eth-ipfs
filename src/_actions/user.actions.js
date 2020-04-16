import { userConstants } from '../_constants';
import { history } from '../_helpers';
import { store } from "../_helpers"


export const userActions = {
    login,
    logout,
    enableEthereum,
    register,
    //
    // consultationCreate,
    // getConsultationByConsultationIndex,
    // getConsultationsByPatientName,
    // getConsultationsByPatientAddress,
    // saveMedicineForPatientUse,
    // getMedicinesFromConsultation,
    // getMedicineByIndex,
    // getMedicineByMedicineName,
    // getMedicinesCountFromConsultation,
    //
    getAll,
    delete: _delete
};

function enableEthereum(ethadd){
    const action = {
        type: userConstants.ENABLED_ETHEREUM,
        payload: ethadd
    }
    // dispatch(action)
    return store.dispatch(action)
}

// function enableEthereum(web3acc){
//     if(ethereum){
//         web3.eth.getAccounts((err, accounts) => {
//           if (accounts.length === 0) {
//               // there is no active accounts in MetaMask
//               this.console.log('there is no active accounts in MetaMask')
//           }else {
//               // It's ok
//               web3.eth.getAccounts(console.log);
//               ethereum.on('accountsChanged',function(accounts){
//                 // KOD BURAYA GELIYOR
//                 // BURADA BIR SEY YAPMALIYIM KI, ETHEREUM ADDRESSI DONSUN
//                 //   return dispatch(ethereum.selectedAddress);
//                 setState({user:{ethadd: ethereum.selectedAddress}})
//                 user.ethadd = ethereum.selectedAddress
//               });
//           }
//       });
//   }
//   ethereum.on('accountsChanged',function(accounts){
//       setState({user:{ethadd: ethereum.selectedAddress}})
//       user.ethadd = ethereum.selectedAddress
//   })
//       setState({user:{ethadd: ethereum.selectedAddress}})
//       user.ethadd = ethereum.selectedAddress
// }


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

    //     userService.login(username, password)
    //         .then(
    //             user => { 
    //                 dispatch(success(user));
    //                 history.push('/');
    //             },
    //             error => {
    //                 dispatch(failure(error.toString()));
    //                 dispatch(alertActions.error(error.toString()));
    //             }
    //         );
    // };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}

function logout() {
    // userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        // userService.register(user)
        //     .then(
        //         user => { 
        //             dispatch(success());
        //             history.push('/login');
        //             dispatch(alertActions.success('Registration successful'));
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}