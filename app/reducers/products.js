import * as ActionTypes from '../actions';

const initialState = {
	items: [], 
	error: false,
};

const products = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.PRODUCTS.SUCCESS:
			return { ...state, items: action.products, error: false };
		case ActionTypes.PRODUCTS.FAILURE:
			return { ...state, items: [], error: true };
		default:
			return state;
	}
};

export default products;
