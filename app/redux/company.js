import axios from 'axios';
import {Router, browserHistory } from 'react-router';


/* ------------------    ACTIONS    --------------------- */

const GET_COMPANY_LST = 'GET_COMPANY_LST';
const GET_ACCOUNT_STATES = 'GET_ACCOUNT_STATES';
const ADD_NEW_COMPANY = 'ADD_NEW_COMPANY';

/* --------------    ACTION CREATORS    ----------------- */
const getCompanies = companies =>({ type: GET_COMPANY_LST, companies });
const getAccountStates = accountStates => ({ type: GET_ACCOUNT_STATES, accountStates});
const addCompany = company => ({type: ADD_NEW_COMPANY, company});

/* ------------------    REDUCER    --------------------- */
 const initialCompaniesState = {
     list: [],
     accountStates: []
 };

 export default function reducer (state=initialCompaniesState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case GET_COMPANY_LST:
            return Object.assign({}, state, {list: action.companies})
        case GET_ACCOUNT_STATES:
            return Object.assign({},state,{accountStates: action.accountStates})
        case ADD_NEW_COMPANY:
            newState.list.push(action.company);
            return newState;
        default:
            return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchDCompanies = () => 
    dispatch =>
        axios.get('/api/company')
            .then(res => dispatch(getCompanies(res.data)))
            .catch(err => console.error('Fetching companies unsuccessful', err))


export const fetchAccountStates = () => 
    dispatch =>
        axios.get('/api/company?state=true')
            .then(res => dispatch(getAccountStates(res.data)))
            .catch(err => console.error('Fetching account states unsuccessful', err))

//add a new company the account state will be 'trial'
export const addNewCompany = (company) => 
dispatch =>
    axios.put('/api/company')
        .then(res => dispatch(addCompany(res.data)))
        .catch(err => console.error('Adding a new company unsuccessful', err))
