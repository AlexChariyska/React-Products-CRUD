import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ message, onClick }) => (
	<div className="popup">
		<div className="popup__wrapper">
			<p>{ message }</p>
			<span className="popup__link" onClick={ onClick }>Ok</span>
		</div>
	</div>
);

export default PopUp;

PopUp.propTypes = {
	message: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
