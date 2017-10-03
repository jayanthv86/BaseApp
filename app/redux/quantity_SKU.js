import axios from 'axios';
import {Router, browserHistory } from 'react-router';


/* ------------------    ACTIONS    --------------------- */

const GET_QUANTITY_SKU_LST = 'GET_QUANTITY_SKU_LST';

/* --------------    ACTION CREATORS    ----------------- */
const getQuantitySKU = guantitySKUs =>({ type: GET_QUANTITY_SKU_LST, guantitySKUs });

/* ------------------    REDUCER    --------------------- */
 const initialQuantitySKUeState = {
     list: []
 };

 export default function reducer (state=initialQuantitySKUeState, action) {
    switch (action.type) {

      case GET_QUANTITY_SKU_LST:
        return Object.assign({}, state, {list: action.guantitySKUs})

      default:
        return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchQuantitySKUs = () => 
    dispatch =>
        axios.get('/api/quantity_SKU')
            .then(res => dispatch(getQuantitySKU(res.data)))
            .catch(err => console.error('Fetching quantity and SKU unsuccessful', err))