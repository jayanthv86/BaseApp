import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { loginAndGoToUser } from '../redux/auth';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: 'https://dev-108550.oktapreview.com'});

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => this.setState({
      sessionToken: res.sessionToken
    }))
    .catch(err => console.log('Found an error', err));
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }
    const { message } = this.props;
    const { error_message } = this.props;

    return (
      <div className="container-fluid">
        <h3 className="page-title">Login</h3>
        <div className="buffer local">
          {
            error_message.length > 0 &&
            <h4 id="login_err">{error_message}</h4>
          }
          <form className="col-sm-6" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sign-field-title">email</label>
              <input
                name="email"
                type="email"
                className="form-control sign-input"
                id="username" type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
                <label className="sign-field-title">password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control sign-input"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
          </form>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

//const mapState = () => ({ message: 'Log in' });

const mapState = state => {
  console.log("login state",state);
return (
  {
    message: 'Log in',
    error_message: state.auth.login_error
  });
};

const mapDispatch = { login: loginAndGoToUser };

export default connect(mapState, mapDispatch)(LoginForm);