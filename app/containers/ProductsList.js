import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProduct, updateProduct, loadProducts, resetProduct } from '../actions';
import ProductsListComponent from '../components/ProductsList';
import GenericMessage from '../components/GenericMessage';
import PopUp from '../components/PopUp';

import { Redirect } from 'react-router';
import config from '../config';

class ProductsList extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadProducts();
	}

	onProductDelete = (id) => {
		this.props.deleteProduct(id);
	}

	onProductEdit = id => {
		this.props.history.push({ pathname: '/product/' + id, state: { id } });
	}

	onPopUpClose = (e) => {
		e.preventDefault();
		this.props.resetProduct();
		this.props.loadProducts();
	}

	render() {
		if (!this.props.permissions.signedIn) {
			return (
				<Redirect to={{
					pathname: '/login',
					state: { from: this.props.location }
				}} />
			);
		}

		const { items, permissions, error } = this.props;
		const permissionValues = Object.values(permissions.permissions);

		const showListItems = permissionValues.includes(config.PERMISSIONS.READ);

		return (
			<section>
				<h2 className="heading">Products List</h2>
				{	
					showListItems 
					? <ProductsListComponent
						permissions={ permissionValues }
						items={ items }
						error={ error }
						onProductDelete={ this.onProductDelete }
						onProductEdit={ this.onProductEdit }/>
					: <GenericMessage />
				}
		 		{ this.props.message && <PopUp message={ this.props.message } onClick={ this.onPopUpClose }/> }
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		error: state.products.error,
		items: state.products.items,
		permissions: state.permissions,
		message: state.product.message,
	};
}

export default connect(mapStateToProps, {
	loadProducts,
	deleteProduct,
	updateProduct,
	resetProduct,
})(ProductsList);

ProductsList.propTypes = {
	message: PropTypes.string,
	error: PropTypes.bool,
	permissions: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	loadProducts: PropTypes.func.isRequired,
	deleteProduct: PropTypes.func.isRequired,
	resetProduct: PropTypes.func.isRequired,
	updateProduct: PropTypes.func.isRequired,
	history: PropTypes.any.isRequired,
	location: PropTypes.any.isRequired,
};
