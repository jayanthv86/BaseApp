import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout } from '../redux/auth';
/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }
//<nav id="discover-navbar" className="navbar navbar-light navbar-brand">
  render() {
    console.log("in nav bar renser current user",this.props.currentUser);
    return (
        <nav id="discover-navbar" className="navbar navbar-light">
         <a className="navbar-brand" href="/">
             <img id="logo" src="/images/1010data_Logo_2016.png" width="200" className="d-inline-block align-top" alt=""/>
        </a>
        <div className="collapse navbar-collapse">
        { this.props.currentUser ? this.renderLogout() : this.renderLoginSignup() }
        </div>
       </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul id="nav-sign-buttons" className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active" className="sign-field-title">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active" className="sign-field-title">login</Link>
        </li>
      </ul>
    );
  }

  renderLogout() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default sign-btn"
          onClick={this.props.logout}>
          logout {name}
        </button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */


const mapState = state => {
    console.log("navbar state",state);
  return (
    {
        currentUser: state.auth.currentUser
      }

  ) ;
};

// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logOutUser());
//     // browserHistory.push('/'); // removed to demo logout instant re-render
//   }
// });

const mapDispatch = { logout: logout };

export default connect(mapState, mapDispatch)(Navbar);
