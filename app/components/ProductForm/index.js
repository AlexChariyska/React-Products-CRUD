import React from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ state, handleSubmit, handleChange }) => (
	<form 
		className="form" 
		onSubmit={ handleSubmit }>
		<label 
			className="label"
			htmlFor="name">Name:</label>
		<input
			id="name"
			className="input-field" 
			type="text" 
			value={ state.name } 
			onChange={ (e) => handleChange(e, 'name') } />
		<label 
			htmlFor="price"
			className="label">Price:</label>
		<input
			id="price" 
			className="input-field"
			type="number" 
			value={ state.price } 
			onChange={ (e) => handleChange(e, 'price') } />
		<label
			htmlFor="currency" 
			className="label">Currency:</label>
		<input 
			id="currency"
			className="input-field"
			type="text" 
			value={ state.currency } 
			onChange={ (e) => handleChange(e, 'currency') } />
		<input 
			className="button button--submit"
			type="submit" 
			value="Submit" />
	</form>
);

export default ProductForm;

ProductForm.propTypes = {
	state: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
};
