import { userReducer } from "./user.reducer"
import { combineReducers } from 'redux';


// const rootReducer = combineReducers({
//   userReducer
// //   // registration,
// //   // users,
// //   // alert
// });
const rootReducer = (state, action) => {
    console.log('Test if rootReducer is ever called')
    return userReducer.enableEthereumReducer(state,action)
}
export default rootReducer;