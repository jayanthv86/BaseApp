import axios from 'axios';
import {Router, browserHistory } from 'react-router';


/* ------------------    ACTIONS    --------------------- */

const GET_DATA_SET_LST = 'GET_DATA_SET_LST';

/* --------------    ACTION CREATORS    ----------------- */
const getDatasets = dataSets =>({ type: GET_DATA_SET_LST, dataSets });

/* ------------------    REDUCER    --------------------- */
 const initialDataSetState = {
     list: []
 };

 export default function reducer (state=initialDataSetState, action) {
    switch (action.type) {

      case GET_DATA_SET_LST:
        return Object.assign({}, state, {list: action.dataSets})

      default:
        return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchDataSets = () => 
    dispatch =>
        axios.get('/api/dataset')
            .then(res => dispatch(getDatasets(res.data)))
            .catch(err => console.error('Fetching data sets unsuccessful', err))