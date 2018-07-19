import * as ActionTypes from '../actions';

const initialState = {
	message: null,
	error: false,
};

const product = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.PRODUCT_UPDATE.SUCCESS:
		case ActionTypes.PRODUCT_DELETE.SUCCESS:
		case ActionTypes.PRODUCT_CREATE.SUCCESS:
			return { ...state, message: action.products.message, error: false };
		case ActionTypes.PRODUCT_UPDATE.FAILURE:
		case ActionTypes.PRODUCT_DELETE.FAILURE:
		case ActionTypes.PRODUCT_CREATE.FAILURE:
			return { ...state, error: true };
		case ActionTypes.RESET_PRODUCT:
			return { ...state, error: false, message: null };
		default:
			return state;
	}
};

export default product;
