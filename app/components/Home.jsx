import React from 'react';

const Home = () => (
	<div className="banner text-center text-inverted">
		<h1>Simple App for signup and login</h1>
		<div className="container">
			<div className="btn-group btn-group-lg">
				<button type="button" className="btn btn-primary">signup</button>
    			<button type="button" className="btn btn-primary">login</button>
    			<button type="button" className="btn btn-primary">logout</button>
			</div>
		</div>
	</div>

);

export default Home;