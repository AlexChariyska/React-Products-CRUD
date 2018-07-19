import * as ActionTypes from '../actions';

const initialState = {
	permissions: [], 
	signedIn: false,
	error: false,
};

const permissions = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.PERMISSIONS.SUCCESS:
			return { ...state, signedIn: true, permissions: action.permissions, error: false };
		case ActionTypes.PERMISSIONS.FAILURE:
			return { ...state, signedIn: false, permissions: [], error: true };
		case ActionTypes.LOG_OUT:
			return { ...state, signedIn: false, permissions: [], error: false };
		default:
			return state;
	}
};

export default permissions;
