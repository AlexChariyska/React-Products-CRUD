import { combineReducers } from 'redux';
import permissions from './permissions';
import products from './products';
import product from './product';

const rootReducer = combineReducers({
	permissions,
	products,
	product,
});

export default rootReducer;
