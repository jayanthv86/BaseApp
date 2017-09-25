import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class UserDetail extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const {user} = this.props;
		return(
			<div className="container">
				<h1>Current user details</h1>
				<h2>Email:{user.email}</h2>
				
			</div>
		);
	}
}

const mapState = (state) => ({user: state})

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UserDetail);
