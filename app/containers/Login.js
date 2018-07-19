import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPermissions } from '../actions';
import LoginForm from '../components/LoginForm';
import GenericMessage from '../components/GenericMessage';

import { Redirect } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '' };
	}

	handleChange = (event) => {
		this.setState({ username: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.loadPermissions(this.state);
	}

	render() {
		if (this.props.permissions.signedIn) {
			return <Redirect to={ '/' } />;
		}

		return (
			<section>
				<h2 className="heading">Login</h2>
				<LoginForm 
					state={ this.state }
					handleSubmit={ this.handleSubmit }
					handleChange={ this.handleChange } 
				/>
				{
					this.props.permissions.error 
					&& <GenericMessage 
							type={'error'} 
							message={"Sorry There Was a Problem with Your Request"} /> 
				}
				<article className="info">
					<p>For test purposes a  few usernames with spesific permissions are added:</p>
					<ul>
						<li>Ivan -> CREATE, READ, UPDATE, DELETE</li>
						<li>Mitko -> CREATE, READ</li>
						<li>Simo -> READ</li>
						<li>Alex -> no permissions</li>
					</ul>
				</article>
			</section>
		);
	}
}


function mapStateToProps(state) {
	return {
		permissions: state.permissions,
	};
}

export default connect(mapStateToProps, {
	loadPermissions,
})(Login);

Login.propTypes = {
	permissions: PropTypes.object.isRequired,
	loadPermissions: PropTypes.func.isRequired,
};
