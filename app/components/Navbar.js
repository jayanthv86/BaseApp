import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout } from '../redux/auth';
import  { NavDropdown, MenuItem } from 'react-bootstrap'
/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogoutAndSettings = this.renderLogoutAndSettings.bind(this);
    this.settingsSelect = this.settingsSelect.bind(this);
    this.renderBilling = this.renderBilling.bind(this);
    this.createBilling = this.createBilling.bind(this);
    this.toggleExternalHTML = this.toggleExternalHTML.bind(this);
    //this.getInitialState = this.getInitialState.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this. state={
      showExternalHTML: false
    };

  }
//<nav id="discover-navbar" className="navbar navbar-light navbar-brand">
  render() {
    return (
        <nav id="discover-navbar" className="navbar navbar-light">
         <a className="navbar-brand" href="/">
             <img id="logo" src="/images/1010data_Logo_2016.png" width="200" className="d-inline-block align-top" alt=""/>
        </a>
        <div>
        <button onClick={this.toggleExternalHTML}>Toggle Html</button>
        {this.state.showExternalHTML ? <div>
          <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
        </div> : null}
      </div>
        <div className="collapse navbar-collapse">
        { 
            this.props.currentUser ? this.renderLogoutAndSettings() : this.renderLoginSignup()
            
        }
        </div>
       </nav>
    );
  }

  /*
  var Demo = React.createClass({

  getInitialState: function() {
    return {showExternalHTML: false};
  },
  
  render: function() {
    return (
      <div>
        <button onClick={this.toggleExternalHTML}>Toggle Html</button>
        {this.state.showExternalHTML ? <div>
          <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
        </div> : null}
      </div>
    );
  },
  
  toggleExternalHTML: function() {
    this.setState({showExternalHTML: !this.state.showExternalHTML});
  },
  
  createMarkup: function() { 
    return {__html: '<div class="ext">Hello!</div>'};
  }

});

ReactDOM.render(
  <Demo />,
  document.getElementById('container')
); 
  */

  createMarkup() { 
    return {__html: '<div class="ext">Hello!</div>'};
  }

  // getInitialState() {
  //   return {showExternalHTML: false};
  // }

  toggleExternalHTML() {
    this.setState({showExternalHTML: !this.state.showExternalHTML});
  }
  renderBilling(){
    return (
      <div dangerouslySetInnerHTML={this.createBilling()}> </div>
    );
  }
  createBilling(){
  
    return {__html: '<div>Hello!</div>'};
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

  renderLogoutAndSettings() {
    const name = this.props.currentUser.fullName || this.props.currentUser.email;
    return (
      <ul className="nav navbar-nav navbar-right">
          {
            this.props.currentUser.admin ? 
            <NavDropdown title="Settings" id="nav-dropdown" onSelect={this.settingsSelect}>
                <MenuItem name="user" eventKey="1">User</MenuItem>
                <MenuItem name="companies" eventKey="2">Companies</MenuItem>
            </NavDropdown>
            :
            null
        }
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

  settingsSelect(eventKey) {
      //event.preventDefault();
      console.log('got to setting select event key',eventKey);
      switch(eventKey){
          case '1':
             return  browserHistory.push('/user_settings');
             break;
        case '2':
            return browserHistory.push('/companies_settings');
            break;
        default:
            break;
        }
    }
}

/* -----------------    CONTAINER     ------------------ */


const mapState = state => {
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

//(this.props.currentUser && this.props.currentUser.admin) ? this.renderSettings() : null