import React from 'react';
import { connect } from 'react-redux';
import { loginAndGoToUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="container-fluid">
        <h3 className="page-title">Login</h3>
        <div className="buffer local">
          <form className="col-sm-6" onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label className="sign-field-title">email</label>
              <input
                name="email"
                type="email"
                className="form-control sign-input"
                required
              />
            </div>
            <div className="form-group">
                <label className="sign-field-title">password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control sign-input"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
          </form>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.login(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });

const mapDispatch = { login: loginAndGoToUser };
// // equivalent to:
// const mapDispatch = (dispatch) => {
//   return {
//     login: function (credentials) {
//       dispatch(loginAndGoToUser(credentials));
//     }
//   };
// };

export default connect(mapState, mapDispatch)(Login);
