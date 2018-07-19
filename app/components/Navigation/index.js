import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import config from '../../config';

const Navigation = ({ permissions, signedIn, logOut }) => {
	const showCreateLink = permissions.includes(config.PERMISSIONS.CREATE);
	return (
		<nav className="navigation">
			<Link className="button button--link" to={'/'}>Products List</Link>
			{ showCreateLink && <Link className="button button--link" to={'/product'}>Create Product</Link> }
			{ 
				signedIn 
				? <span className="button button--link" onClick={ logOut }>Log out</span>
				: <Link className="button button--link" to={'/login'}>Login</Link>
			}
		</nav>
	);
};

export default Navigation;

Navigation.propTypes = {
	permissions: PropTypes.array.isRequired,
	signedIn: PropTypes.bool.isRequired,
	logOut: PropTypes.func.isRequired,
};
