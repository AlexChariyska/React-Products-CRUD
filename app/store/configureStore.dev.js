import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const devToolsExtension = window.devToolsExtension || null;
const enhancers = [];

if (devToolsExtension) {
	enhancers.push(devToolsExtension());
}

export function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
			sagaMiddleware,
		),
		...enhancers
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}
	sagaMiddleware.run(sagas);
	return store;
}
