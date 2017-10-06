import React from 'react';
import { connect } from 'react-redux';
import { addNewCompany } from '../redux/company';
/* -----------------    COMPONENT     ------------------ */

class addCompany extends React.Component{
    constructor(props) {
        super(props);
        this.onAddCompanySubmit = this.onAddCompanySubmit.bind(this);
        this.checkIfCompanyExists = this.checkIfCompanyExists.bind(this);
        this.findIndustryId = this.findIndustryId.bind(this);
      }
    render(){
        //assign props properties to local consts
        const { message } = this.props;
        const { industries } = this.props;
        const { companies } = this.props;
        return (
            <div className="container-fluid">
                <h3 className="page-title">Add Company</h3>
                <form className="col-sm-6" onSubmit={this.onAddCompanySubmit}>
                    <div className="form-group">
                        <label className="sign-field-title">New Company Name</label>
                        <input
                            name="newCompName"
                            type="name"
                            className="form-control sign-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="sign-field-title">Industry</label>
                        <select name="industry" className="form-control sign-input">
                        {
                            industries && industries.map((name) => (
                                <option key={name.id}>{name.id} {name.title}</option>
                             ))
                         }
                         </select>
                     </div>
                     <button type="submit" className="btn btn-block btn-primary sign-input sign-btn">{message}</button>
                 </form>
            </div>
        );
    }

    //onSubmit and validate implementation
    //input validate: validates the company doesn't already exist
    //onSubmit: add a new company to company table and assosiate it with an industry
    onAddCompanySubmit(event){
        /*
        1. getting the company name
        2. getting the industry id
        3. call this.props.addNewCompany to update the db
         */
        event.preventDefault();
        let companyName = event.target.newCompName.value;

        let industry = event.target.industry.value;
        let industryId = this.findIndustryId(industry);
        if(industryId){
            const company = {
                name: companyName,
                account_state: 'trial',
                industry_id: industryId

            };
            this.props.addNewCompany(company);

        }

    }

    checkIfCompanyExists(companyName){
        /*
        if comoany doesnt exists in the DB - returns true
        otherwise - returns flase
         */
        let companies = this.props.companies;
        let foundCompanies= companies.filter((element)=>{
            return (element.name === companyName)

        });
        //if there is already a company with the same name
        if(foundCompanies.length > 0){
            return false;

        }
        return true;

    }

    //extracts the idustry id from the idustries list on the state
    findIndustryId(industryStr){
        let industries = this.props.industries;
        let industry = industries.filter((element)=>{
            console.log('element', element);
            return element['title'].includes(industryStr);

        });
        if(industry.length > 0){
            let id = industry[0]['id'];
            return id;

        }
    }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
    message: 'Add Company',
    industries: state.industry.list,
    companies: state.company.list
   });

const mapDispatch = { addNewCompany: addNewCompany };


export default connect(mapState, mapDispatch)(addCompany);