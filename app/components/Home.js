import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { logout } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Home extends React.Component {
	constructor(props) {
		super(props);
	  }
	render(){
		return (
			<div className="banner text-center text-inverted">
			<h1>Simple App for signup and login</h1>
			
		</div>
		);
	}
}

/* -----------------    CONTAINER     ------------------ */
const mapState = null;

const mapDispatch = { logout: logout };

export default connect(mapState, mapDispatch)(Home);

/*
<div className="container">
				<div className="btn-group btn-group-lg">
					<Link to={'/signup'}>
						<button type="button" className="btn btn-primary">signup</button>
					</Link>
					<Link to={'/login'}>
						<button type="button" className="btn btn-primary">login</button>
					</Link>
					<button type="button" className="btn btn-primary" onClick={this.props.logout}>logout</button>
				</div>
			</div>
 */