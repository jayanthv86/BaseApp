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
import { signupAndGoToPayment } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class SignupPreferences extends React.Component{
    constructor(props){
        super(props);
        this.onSignupPreferencesSubmit = this.onSignupPreferencesSubmit.bind(this);
        this.findTimeZoneId = this.findTimeZoneId.bind(this);
        this.findQuantitySKUId = this.findQuantitySKUId.bind(this);

    }

    render(){
        //debugger;
        console.log('@@@@@@@@@in signup preferences');
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
								<option key={timeZone.id}>{timeZone.time_zone}</option>
							))
						}
					    </select>
  		            </div>
                    <div className="form-group">
                        <label className="sign-field-title">Quantity and SKU</label>
                        <select name="quantitySKU" className="form-control sign-input">
                        {
                            quantity_SKUs && quantity_SKUs.map((quantitySKU) => (
                                <option key={quantitySKU.id}>{quantitySKU.range_value}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="form-group">
                    <label className="sign-field-title">Data Set</label>
                        <fieldset>
                        {
                            data_sets && data_sets.map((dataset)=>(
                                <span key={dataset.id}>
                                    <input type="checkbox" id="dataset" name="data_set" value={dataset.dataset}/>
                                    <label id="dataset-label">{` ${dataset.dataset}`}</label>
                                 </span>
                            ))

                        }
                        </fieldset>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
                </form>
            </div>

        );
    }
    findTimeZoneId(timezoneStr){
        let timezones = this.props.time_zones;
        let timezone = timezones.filter((element)=>{
            console.log('element', element);
            return element['time_zone'].includes(timezoneStr);

        });
        if(timezone.length > 0){
            let id = timezone[0]['id'];
            return id;

        }
    }

    findQuantitySKUId(qSKUStr){
        let qSKUs = this.props.quantity_SKUs;
        let qSKU = qSKUs.filter((element)=>{
            console.log('element', element);
            return element['range_value'].includes(qSKUStr);

        });
        if(qSKU.length > 0){
            let id = qSKU[0]['id'];
            return id;

        }

    }

    onSignupPreferencesSubmit(event) {
        event.preventDefault();

        let data_sets = this.props.data_sets;
        let checkboxes = event.target.data_set;
        let datasetIds=[];

        //get the ids of: timezone, quantitySKU and datasets
        let timeZAoneId = this.findTimeZoneId(event.target.timeZone.value);
        console.log('time zone id',timeZAoneId );

        let quantitySKUId = this.findQuantitySKUId(event.target.quantitySKU.value);
        console.log('q sku id',quantitySKUId );
        

        for(let i=0;i<checkboxes.length;i++){
            if(checkboxes[i].checked){
                datasetIds.push(data_sets[i].id);


            }

        }
        const credentials = {
            time_zone_id: timeZAoneId,
            quantity_s_k_u_id: quantitySKUId,
            datasetIds: datasetIds
        }
        console.log('preferences credentials', credentials);
        this.props.signup(credentials);

    }

    
}


/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
    message: 'Next',
    time_zones: state.time_zone.list,
    quantity_SKUs: state.quantity_SKU.list,
    data_sets: state.data_set.list

   });

const mapDispatch = { signup: signupAndGoToPayment };

export default connect(mapState, mapDispatch)(SignupPreferences);