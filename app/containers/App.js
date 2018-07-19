import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from '../routes';
import { logOut } from '../actions';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

require('../styles/index.scss');

class App extends Component {
	logOut = () => {
		this.props.logOut();
		this.props.history.push('/');
	}

	render() {
		const permissionValues = Object.values(this.props.permissions.permissions);

		return (
			<main className="main">
				<Header />
				<Navigation
					logOut={ this.logOut }
					signedIn={ this.props.permissions.signedIn } 
					permissions={ permissionValues }/>
				{ Routes }
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		permissions: state.permissions
	};
}

export default connect(mapStateToProps, {
	logOut,
})(App);

App.propTypes = {
	permissions: PropTypes.object.isRequired,
	logOut: PropTypes.func.isRequired,
	history: PropTypes.any.isRequired,
};

