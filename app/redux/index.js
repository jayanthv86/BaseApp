import { combineReducers } from 'redux';
//import currentUser from './auth';

//export default combineReducers({ currentUser });

const rootReducer = combineReducers({
    auth: require('./auth').default,
    industry: require('./industry').default,
    employee_title: require('./employee_title').default,
    time_zone: require('./timezone').default,
    quantity_SKU: require('./quantity_SKU').default,
    data_set: require('./data_set').default
  })
  
  export default rootReducer