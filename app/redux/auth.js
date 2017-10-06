import axios from 'axios';
import {Router, browserHistory } from 'react-router';
import { push } from 'react-router-redux'

/* ------------------    ACTIONS    --------------------- */
const SET = 'SET_CURRENT_USE';
const REMOVE = 'REMOVE_CURRENT_USER';
const LOGIN_ERROR = 'LOGIN_ERROR'

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });
const remove  = () => ({ type: REMOVE });
const login_error = (error_msg) => ({type: LOGIN_ERROR, error_msg});

/* ------------------    REDUCER    --------------------- */

const initialAuthState = {
  currentUser: null,
  login_error: ""
}

//export default function reducer (currentUser = null, action) {
  export default function reducer (state=initialAuthState, action) {
    switch (action.type) {

      case SET:
        //return action.user;
        return Object.assign({}, state, {currentUser: action.user, login_error: ""})

      case REMOVE:
        //return null;
        return Object.assign({}, state, {currentUser: null})

      case LOGIN_ERROR:
        return Object.assign({}, state, {login_error: action.error_msg})

      default:
        //return initialAuthState;
        return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

const resToData = res => res.data;

// a "simple" dispatcher which uses API, changes state, and returns a promise.
// export const login = credentials => dispatch => {
//   return axios.put('/api/login/local', credentials)
//   .then(resToData)
//   .then(user => {
//     dispatch(set(user));
//     return user;
//   });
// };

export const login = credentials => dispatch => {
  return axios.post('/api/login/local', credentials)
  .then((res) => {
    dispatch(retrieveLoggedInUser());
    return resToData;
  }).catch(err => {
    if(err.response){
      console.log("in login, got an error",err.response.statusText);
      return err.response.statusText;

    }
    //return axios.get('api/login/local')
    console.log("in login, got an error",err);
    return err;
  });
};

// a "composed" dispatcher which uses the "simple" one, then routes to a page.
// export const loginAndGoToUser = credentials => dispatch => {
//   dispatch(login(credentials))
//   .then(user => browserHistory.push(`/users/${user.id}`))
//   .catch(err => {
//     console.error('Problem logging in:', err)
//     return browserHistory.push('/login')
//   });
// };

export const loginAndGoToUser = credentials => dispatch => {
  dispatch(login(credentials))
  .then(res => {
    if(typeof res === 'string'){
      return dispatch(login_error(res));
      //return browserHistory.push('/login'); //send a local stet error message to show on the screen
      //return dispatch(push('/login'));

    }
    return browserHistory.push(`/users/${res.id}`)
  })
  .catch(err => {
    console.error('Problem logging in:', err)
    return browserHistory.push('/login')
  });
};

export const signup = credentials => dispatch => {
  return axios.post('/api/signup', credentials)
  .then(resToData)
  .then(user => {
    dispatch(set(user)); // set current user
    return user;
  });
};

//signPreferences: update the new created user with their preferences
//step2 in signup process
export const signupPreferences = credentials => dispatch => {
  return axios.put('/api/signup', credentials)
  .then(resToData)
  .then(user => {
    dispatch(set(user)); // set current user
    return user;
  });
};


export const signupAndGoToUser = credentials => dispatch => {
  dispatch(signupPreferences(credentials))
  .then(user => browserHistory.push(`/users/${user.id}`))
  .catch(err => console.error('Problem signing up:', err));
};

//a function that sends signs the user in the data base and redirects
//to the set-preferences page
export const signupAndGoToUSetPreferences = credentials => dispatch => {
  dispatch(signup(credentials))
  .then(user => browserHistory.push('/signup_preferences'))
  .catch(err => console.error('Problem signing up:', err));
};

//signup and go to payment
export const signupAndGoToPayment = credentials => dispatch => {
  dispatch(signupPreferences(credentials))
  .then(user => browserHistory.push('/signup_payment'))
  .catch(err => console.error('Problem signing up:', err));
};

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/api/me')
  .then(resToData)
  .then(user => {
  	return dispatch(set(user))})
  .catch(err => console.error('Problem fetching current user', err));
};

// optimistic
export const logout = () => dispatch => {
  dispatch(remove());
  axios.delete('/api/logout')
  .then(err => console.log('logout unsuccessful', err));
};



