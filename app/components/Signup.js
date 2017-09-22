import React from 'react';
import { connect } from 'react-redux';
import { signupAndGoToUser } from '../redux/auth';


/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render(){
  	const { message } = this.props;
  	return(
  		<div className="signin-container">
  		 <form onSubmit={this.onSignupSubmit}>
  		  <div className="form-group">
  		   <label>email</label>
  		   <input
  		    name="email"
  		    type="email"
  		    className="form-cntrol"
  		   />
  		  </div>
  		  <div className="form-group">
  		   <label>password</label>
  		   <input
  		    name="password"
  		    type="password"
  		    className="form-control"
  		   />
  		  </div>
  		  <button type="submit" className="btn btn-block btn-primary">{message}</button>
  		 </form>
  		</div>
  	);
  }
  onSignupSubmit(event) {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.signup(credentials);
  }

}


/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = { signup: signupAndGoToUser };


export default connect(mapState, mapDispatch)(Signup);





