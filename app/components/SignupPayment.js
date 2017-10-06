import React from 'react';
import { connect } from 'react-redux';
import { signupAndGoToUser } from '../redux/auth';


/* -----------------    COMPONENT     ------------------ */

class SignupPayment extends React.Component {
    constructor(props) {
        super(props);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
      }

      render(){
		const { message } = this.props;
        return(
            <div className="container-fluid">
             <h3 className="page-title">Payment</h3>
            <form className="col-sm-6" onSubmit={this.onSignupSubmit}>
                <div className="form-group">
                    <label className="sign-field-title">Amount</label>
                    <input 
                        name="paymentAmount"
                        type="numbber"
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
        
    //getting the dollar amount payment
    let amount = event.target.paymentAmount.value;
    amount = parseInt(amount);


    const credentials = {
        paymentAmount: amount
    };
    this.props.signup(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
    message: 'complete',
   });

const mapDispatch = { signup: signupAndGoToUser };


export default connect(mapState, mapDispatch)(SignupPayment);
