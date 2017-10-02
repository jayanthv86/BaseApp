import { combineReducers } from 'redux';
//import currentUser from './auth';

//export default combineReducers({ currentUser });

const rootReducer = combineReducers({
    auth: require('./auth').default,
    industry: require('./industry').default
  })
  
  export default rootReducer