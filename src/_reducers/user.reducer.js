import {userActions} from "../_actions"
import {userConstants} from "../_constants"


export const userReducer = {
    enableEthereumReducer,
}


function enableEthereumReducer( state = "", action ){
    switch(action.type){
        case userConstants.ENABLED_ETHEREUM :{
            return {
                ethaddr: action.payload
            }
        }
        default: return state;
    }
}
  