import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

const ListItem = ({ item, permissions, onProductDelete, onProductEdit }) => {
	const showUpdateButton = permissions.includes(config.PERMISSIONS.UPDATE);
	const showDeleteButton = permissions.includes(config.PERMISSIONS.DELETE);
	return (
		<article className="item">
			<span>{ item.name }</span>
			<span>{ item.price }</span>
			<span>{ item.currency }</span>
			{ showUpdateButton && <span className="button button--action" onClick={() => onProductEdit(item.id)}>Edit</span> }
			{ showDeleteButton && <span className="button button--action" onClick={() => onProductDelete(item.id)}>Delete</span> }
		</article>
	);
};

export default ListItem;

ListItem.propTypes = {
	item: PropTypes.object.isRequired,
	onProductDelete: PropTypes.func.isRequired,
	onProductEdit: PropTypes.func.isRequired,
	permissions: PropTypes.array.isRequired,
};
