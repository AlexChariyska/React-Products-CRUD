import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(sagaMiddleware),
	);

	sagaMiddleware.run(sagas);
	return store;
}
