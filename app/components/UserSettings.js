import React from 'react';
import { connect } from 'react-redux';
import { hashHistory,browserHistory } from 'react-router';

/* -----------------    COMPONENT     ------------------ */
class UserSettings extends React.Component {
    
      constructor(props) {
        super(props);
            this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
            this.onChangeCompany = this.onChangeCompany.bind(this)
           
      }
    
      render(){
            const { message } = this.props;
            const { employeeTitles } = this.props;
            const { companies } = this.props;
            const { time_zones } = this.props;
            const { quantity_SKUs } = this.props;
            const { data_sets } = this.props;
            const { user } = this.props;
            const { account_states } = this.props;
            let keyId = 1;

          return(
              <div className="container-fluid">
                <h3 className="page-title">Sign Up</h3>
                <form className="col-sm-6" onSubmit={this.onUpdateSubmit}>
                    <div className="form-group">
                        <label className="sign-field-title">First Name</label>
                        <input 
                            name="firstName"
                            type="name"
                            className="form-control sign-input"
                            value={user.firstname}
                        />
                </div>
                    <div className="form-group">
                        <label className="sign-field-title">Last Name</label>
                        <input 
                            name="lastName"
                            type="name"
                            className="form-control sign-input"
                            value={user.lastName}
                        />
                </div>
                <div className="form-group">
                 <label className="sign-field-title">Email</label>
                 <input 
                  name="email"
                  type="email"
                  className="form-control sign-input"
                  value={user.email}
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
                        <select name="company" className="form-control sign-input" onChenge={this.onChangeCompany}>
                            {
                                companies && companies.map((name) => (
                                    (name.id === user.company_id) ?
                                    <option key={name.id}>{name.id} {name.name} selected</option> :
                                    <option key={name.id}>{name.id} {name.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="sign-field-title">Employee Title</label>
                        <select name="employeeTitle" className="form-control sign-input">
                            {
                                employeeTitles && employeeTitles.map((title) => (
                                    (title.id === user.emppoyee_title_id) ?
                                    <option key={title.id}>{title.id} {title.title} selected</option> :
                                    <option key={title.id}>{title.id} {title.title}</option>
                                ))
                            }
                        </select>
                </div>
                <div className="form-group">
                    <label className="sign-field-title">Accont State</label>
                    <select name="employeeTitle" className="form-control sign-input">
                            {   
                                account_states && account_states.map((state) => (
                                    <option key={keyId++}>{state}</option>
                                ))
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label className="sign-field-title">Time Zone</label>
                    <select name="timeZone" className="form-control sign-input">
                    {
                        time_zones && time_zones.map((timeZone) => (
                            (timeZone.id === user.time_zone_id) ? 
                            <option key={timeZone.id}>{timeZone.time_zone} selected</option>
                            :
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
                                (quantitySKU.id === user.quantity__s_k_u_id) ? 
                                <option key={quantitySKU.id}>{quantitySKU.range_value} selected</option>
                                :
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
                                    (user.data_sets.filter((element)=>{element.id === dataset.id}).length > 0) ?
                                    <input type="checkbox" id="dataset" name="data_set" value={dataset.dataset} checked/>
                                     :
                                    <input type="checkbox" id="dataset" name="data_set" value={dataset.dataset}/>
                                    <label id="dataset-label">{` ${dataset.dataset}`}</label>
                                 </span>
                            ))

                        }
                        </fieldset>
                </div>
                <div className="form-group">
                    <label className="sign-field-title">Amount</label>
                    <input 
                        name="paymentAmount"
                        type="numbber"
                        className="form-control sign-input"
                        value={user.payment_amount}
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
               </form>
              </div>
          );
        }

        /* ------------------- Event handling functions ------------------- */
    
        onChangeCompany(event){

        }

        /*
        
         */
        onUpdateSubmit(event){

        }
    }

    /* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
    message: 'Update',
    employeeTitles: state.employee_title.list,
    companies: state.company.list,
    time_zones: state.time_zone.list,
    quantity_SKUs: state.quantity_SKU.list,
    data_sets: state.data_set.list,
    user: state.auth.currentUser,
    account_states: state.company.accountStates


   });

const mapDispatch = { update: console.log/*<some update function that will be dispached>*/ };


export default connect(mapState, mapDispatch)(UserSettings);