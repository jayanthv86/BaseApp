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
  		<div className="container-fluid">
				<h3 className="page-title">Sign Up</h3>
  		 <form className="col-sm-6" onSubmit={this.onSignupSubmit}>
				<div className="form-group">
					<label className="sign-field-title">Name</label>
					<input 
						name="name"
						type="name"
						className="form-control sign-input"
					/>
  		  </div>
  		  <div className="form-group">
  		   <label className="sign-field-title">Email</label>
  		   <input 
  		    name="email"
  		    type="email"
  		    className="form-control sign-input"
  		   />
  		  </div>
  		  <div className="form-group">
  		   <label className="sign-field-title">Password</label>
  		   <input 
  		    name="password"
  		    type="password"
  		    className="form-control sign-input"
  		   />
  		  </div>
				<div className="form-group">
					<label className="sign-field-title">Company Name</label>
					<input 
						name="companyName"
						type="name"
						className="form-control sign-input"
					/>
  		  </div>
				<div className="form-group">
					<label className="sign-field-title">Employee Title</label>
					<input 
						name="employeeTitle"
						type="name"
						className="form-control sign-input"
					/>
  		  </div>
				<div className="form-group">
					<label className="sign-field-title">Industry</label>
					<input 
						name="industry"
						type="name"
						className="form-control sign-input"
					/>
  		  </div>
  		  <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
  		 </form>
  		</div>
  	);
	}
	/*reading all input information from the form and send them via
	"signup" to the data base
	*/
  onSignupSubmit(event) {
    event.preventDefault();
    const credentials = {
			name: event.target.name.value,
      email: event.target.email.value,
			password: event.target.password.value,
			company:	event.target.companyName.value,
			employeeTitle: event.target.employeeTitle.value,
			industry:	event.target.industry.value
    };
    this.props.signup(credentials);
  }

}


/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = { signup: signupAndGoToUser };


export default connect(mapState, mapDispatch)(Signup);





