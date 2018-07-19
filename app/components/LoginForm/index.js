import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ state, handleSubmit, handleChange }) => (
	<form 
		className="form" 
		onSubmit={ handleSubmit }>
		<label 
			className="label"
			htmlFor="username">Username:</label>
		<input 
			className="input-field"
			id="username"
			type="text" 
			value={ state.username } 
			onChange={ handleChange } />
		<input 
			className="button button--submit"
			type="submit" 
			value="Submit" />
	</form>
);

export default LoginForm;

LoginForm.propTypes = {
	state: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
};
