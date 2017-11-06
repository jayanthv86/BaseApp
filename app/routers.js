import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import UserDetail from './components/UserDetail';
import Root from './components/Root';
import SignupPreferences from './components/SignupPreferences';
import  SignupPayment  from './components/SignupPayment'
import addCompany from './components/addCompany'
import UserSettings from './components/UserSettings'
//import Logout from './components/Logout';
import { retrieveLoggedInUser } from './redux/auth';
import { fetchIndustries } from './redux/industry';
import { fetchEmployeeTitles } from './redux/employee_title';
import { fetchTimezones } from './redux/timezone';
import { fetchQuantitySKUs } from './redux/quantity_SKU';
import { fetchDataSets } from './redux/data_set';
import { fetchDCompanies, fetchAccountStates } from './redux/company';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://dev-108550.oktapreview.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oacmp3heoEjVyxlX0h7'
}
function onAuthRequired({history}) {
  history.push('/loginform');
}

/* -----------------    COMPONENT     ------------------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Security issuer={config.issuer}
              client_id={config.clientId}
              redirect_uri={config.redirect_uri}
              onAuthRequired={onAuthRequired}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="loginform" component={LoginForm} baseUrl='https://dev-108550.oktapreview.com' />
      <Route path="signup" component={Signup} />
      <Route path="signup_preferences" component={SignupPreferences} />
      <Route path="signup_payment" component={SignupPayment} />
      <Route path="users/:id" component={UserDetail} />
      <Route path="user_settings" component={UserSettings}/>
      <Route path="implicit/callback" component={ImplicitCallback} />
    </Route>
    <Route path="*" component={Home} />
   </Security>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(retrieveLoggedInUser());
    dispatch(fetchEmployeeTitles());
    dispatch(fetchIndustries());
    dispatch(fetchTimezones());
    dispatch(fetchQuantitySKUs());
    dispatch(fetchDataSets());
    dispatch(fetchDCompanies());
    dispatch(fetchAccountStates());
  }
});

export default connect(mapProps, mapDispatch)(Routes);
//<IndexRoute component={Home} />