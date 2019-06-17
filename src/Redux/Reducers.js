import { combineReducers } from 'redux';
import LoginReducer from '../Reducer/LoginReducer';
import RegisterReducer from '../Reducer/RegisterReducer';
import  LogoutReducer  from "../Reducer/LogoutReducer";


export default combineReducers({
   LoginReducer,
   RegisterReducer,
   LogoutReducer,
   
});