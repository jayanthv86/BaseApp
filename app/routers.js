import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
//import Logout from './components/Logout';
import { retrieveLoggedInUser } from './redux/auth';

/* -----------------    COMPONENT     ------------------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} onEnter={fetchInitialData}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="users/:id" component={UserDetail} />
      <Route path="stories" component={StoryList} />
      <Route path="stories/:id" component={StoryDetail} onEnter={onStoryEnter} />
      <Route path="*" component={Home} />
    </Route>
  </Router>
);