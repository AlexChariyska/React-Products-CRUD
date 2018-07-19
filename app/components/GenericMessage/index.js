import React from 'react';
import PropTypes from 'prop-types';
const ERROR = 'error';

const GenericMessage = ({ message, type }) => (
	<p className={`generic-message ${type === ERROR && 'generic-message--error' }`}>{ message }</p>
);

export default GenericMessage;

GenericMessage.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string,
};

GenericMessage.defaultProps = {
	message: "Sorry you don't have permissions to use this component :)",
	type: '',
};
