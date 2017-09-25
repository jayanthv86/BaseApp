import React from 'react';
import { Link } from 'react-router'

const Home = () => (
	<div className="banner text-center text-inverted">
		<h1>Simple App for signup and login</h1>
		<div className="container">
			<div className="btn-group btn-group-lg">
				<Link to={'/signup'}>
					<button type="button" className="btn btn-primary">signup</button>
				</Link>
				<Link to={'/login'}>
    				<button type="button" className="btn btn-primary">login</button>
    			</Link>
    			<Link to={'/logout'}>
    				<button type="button" className="btn btn-primary">logout</button>
    			</Link>
			</div>
		</div>
	</div>

);

export default Home;