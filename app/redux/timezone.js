import axios from 'axios';
import {Router, browserHistory } from 'react-router';


/* ------------------    ACTIONS    --------------------- */

const GET_TIME_ZONE_LST = 'GET_TIME_ZONE_LST';

/* --------------    ACTION CREATORS    ----------------- */
const getTimeZones = timeZones =>({ type: GET_TIME_ZONE_LST, timeZones });

/* ------------------    REDUCER    --------------------- */
 const initialTimezonStatee = {
     list: []
 };

 export default function reducer (state=initialTimezonStatee, action) {
    switch (action.type) {

      case GET_TIME_ZONE_LST:
        return Object.assign({}, state, {list: action.timeZones})

      default:
        return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchTimezones = () => 
    dispatch =>
        axios.get('/api/timezone')
            .then(res => dispatch(getTimeZones(res.data)))
            .catch(err => console.error('Fetching time zones unsuccessful', err))