/*
SignupPreferences:
a container that renders the view of the second step of 
the signup process - preferences
user needs to choos:
time zone
quantity and SKU
dataset
 */
import React from 'react';
import { connect } from 'react-redux';
import { signupAndGoToUSetPreferencesr } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class SignupPreferences extends React.Component{
    constructor(props){
        super(props);
        this.onSignupPreferencesSubmit = this.onSignupPreferencesSubmit.bind(this);

    }

    render(){
        const { message } = this.props;
        const { time_zones } = this.props;
        const { quantity_SKUs } = this.props;
        const { data_sets } = this.props;

        return(
            <div className="container-fluid">
                <h3 className="page-title">Set Preferences</h3>
                <form className="col-sm-6" onSubmit={this.onSignupPreferencesSubmit}>
                    <div className="form-group">
                        <label className="sign-field-title">Time Zone</label>
                        <select name="timeZone" className="form-control sign-input">
						{
							time_zones && time_zones.map((timeZone) => (
								<option key={timeZone.id}>{timeZone.id} {timeZone.title}</option>
							))
						}
					    </select>
  		            </div>
                    <div className="form-group">
                        <label className="sign-field-title">Quantity and SKU</label>
                        <select name="quantitySKU" className="form-control sign-input">
                        {
                            quantity_SKUs && quantity_SKUs.map((quantitySKU) => (
                                <option key={quantitySKU.id}>{quantitySKU.id} {quantitySKU.title}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="form-group">
                    <label className="sign-field-title">Data Set</label>
                        <fieldset>
                        {
                            data_sets && data_sets.map((dataset)=>(
                                <span>
                                    <input type="checkbox" id="dataset" name="data_set" value={dataset.dataset}/>
                                    <label for="dataset">{dataset.dataset}</label>
                                 </span>
                            ))

                        }
                        </fieldset>
                    </div>
                </form>
            </div>

        );
    }
    onSignupPreferencesSubmit(event) {
        event.preventDefault();

        //get the ids of: timezone, quantitySKU and datasets
        let timeZAoneId = (event.target.timeZone.value).split(' ');
        timeZAoneId = parseInt(timeZAoneId[0]);

        let quantitySKUId = (event.target.quantitySKU.value).split(' ');
        quantitySKUId = parseInt(quantitySKUId[0]);

        let checkboxAtt = event.target.data_set.value;
        console.log('ceckbox content', checkboxAtt);

    }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
    message: 'Next',
    time_zones: state.time_zone.list,
    quantity_SKUs: state.quantity_SKU.list,
    data_sets: state.data_set.list

   });

const mapDispatch = { signup: signupAndGoToUSetPreferencesr };

export default connect(mapState, mapDispatch)(SignupPreferences);