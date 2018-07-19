import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import GenericMessage from '../GenericMessage';

const ProductsListComponent = ({ items, permissions, onProductDelete, onProductEdit, error }) => (
	<div className="item-wrapper">
		<article className="item">
			<span>Name</span>
			<span>Price</span>
			<span>Currency</span>
		</article>
		{
			error 
			&& <GenericMessage 
					type={'error'} 
					message={"Sorry There Was a Problem with Your Request"} /> 
		}
		{
			items.map( item => 
				<ListItem 
					key={ item.id }
					item={ item } 
					permissions = { permissions }
					onProductDelete={ onProductDelete }
					onProductEdit={ onProductEdit } /> 
			)
		}
	</div> 
);

export default ProductsListComponent;

ProductsListComponent.propTypes = {
	items: PropTypes.array.isRequired,
	permissions: PropTypes.array.isRequired,
	onProductDelete: PropTypes.func.isRequired,
	onProductEdit: PropTypes.func.isRequired,
	error: PropTypes.bool,
};
