import axios from 'axios';
import {Router, browserHistory } from 'react-router';


/* ------------------    ACTIONS    --------------------- */

const GET_INDUSTRY_LST = 'GET_INDUSTRY_LST';

/* --------------    ACTION CREATORS    ----------------- */
const getIndustries = industries =>({ type: GET_INDUSTRY_LST, industries });

/* ------------------    REDUCER    --------------------- */
 const initialIndustryState = {
     list: []
 };

 export default function reducer (state=initialIndustryState, action) {
    switch (action.type) {

      case GET_INDUSTRY_LST:
        return Object.assign({}, state, {list: action.industries})

      default:
        return initialIndustryState;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchIndustries = () => 
    dispatch =>
        axios.get('/api/industry')
            .then(res => dispatch(getIndustries(res.data)))
            .catch(err => console.error('Fetching industries unsuccessful', err))


