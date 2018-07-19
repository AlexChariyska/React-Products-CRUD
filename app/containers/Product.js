import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCreateProduct, updateProduct, resetProduct } from '../actions';
import ProductForm from '../components/ProductForm';
import GenericMessage from '../components/GenericMessage';
import PopUp from '../components/PopUp';

import config from '../config';

const UPDATE = config.FORM_TYPE.UPDATE;
const CREATE = config.FORM_TYPE.CREATE;
const MIN_VALUE_PRICE = 0;

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			name: '', 
			price: 0, 
			currency: '' 
		};
	}

	componentWillMount() {
		if (this.props.product) {
			this.setState({ ...this.props.product });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.id) {
			this.setState({ 
				name: '', 
				price: MIN_VALUE_PRICE, 
				currency: '' 
			});
		}
	}

	handleChange = (event, type) => {
		if (type === 'price') {
			const price = parseInt(event.target.value, 10);
			this.setState({ [type]: price });

			// Price cann't be a negative number
			if ( price < MIN_VALUE_PRICE ) this.setState({ [type]: MIN_VALUE_PRICE });
		} else {
			this.setState({ [type]: event.target.value });
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.props.id) {
			this.props.updateProduct(parseInt(this.props.id, 10), this.state);
		} else {
			this.props.loadCreateProduct(this.state);
		}
	}

	onPopUpClose = (event) => {
		event.preventDefault();
		this.props.resetProduct();
		this.props.history.push('/');
	}

	render() {
		const title = this.props.type === CREATE ? 'Create product' : 'Edit Product';
		const permissionValues = Object.values(this.props.permissions.permissions);

		const showForm = permissionValues.includes(this.props.type);

		if (!showForm) {
			return <GenericMessage />;
		}

		return (
			<section>
				<h2 className="heading">{ title }</h2>
				<ProductForm 
					state={ this.state } 
					handleSubmit={ this.handleSubmit } 
					handleChange= {this.handleChange} />
				{
					this.props.error &&
					<GenericMessage type={'error'} message={"Sorry, There Was a Problem with Your Request"}/>
				}
				{ 
					this.props.message && 
					<PopUp message={ this.props.message } onClick={ this.onPopUpClose }/> 
				}
			</section>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const id = ownProps.location.state && ownProps.location.state.id;
	const product = state.products.items.find( item => {
		return item && item.id === id;
	});

	const type = product ? UPDATE : CREATE;

	return {
		message: state.product.message || null,
		error: state.product.error,
		permissions: state.permissions,
		product,
		type,
		id,
	};
}

export default connect(mapStateToProps, {
	loadCreateProduct,
	updateProduct,
	resetProduct,
})(Product);

Product.propTypes = {
	permissions: PropTypes.object.isRequired,
	message: PropTypes.string,
	id: PropTypes.number,
	product: PropTypes.object,
	error: PropTypes.bool,
	type: PropTypes.string.isRequired,
	loadCreateProduct: PropTypes.func.isRequired,
	updateProduct: PropTypes.func.isRequired,
	resetProduct: PropTypes.func.isRequired,
	history: PropTypes.any.isRequired,
};
