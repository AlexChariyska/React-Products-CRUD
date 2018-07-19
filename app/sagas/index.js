/* eslint-disable no-constant-condition */
import { take, put, call, fork, all } from 'redux-saga/effects';
import Api from '../services';
import * as ActionTypes from '../actions';

function* loadPermissions(permissionsRequest) {
	yield put({ type: ActionTypes.PERMISSIONS.REQUEST });
	const permissions = yield call(Api.fetchPermissions, permissionsRequest);
	if (!permissions.error) {
		yield put({ type: ActionTypes.PERMISSIONS.SUCCESS, permissions });
	} else {
		yield put({ type: ActionTypes.PERMISSIONS.FAILURE });
	}
}

function* loadProducts() {
	yield put({ type: ActionTypes.PRODUCTS.REQUEST });
	const products = yield call(Api.fetchProducts);
	if (!products.error) {
		yield put({ type: ActionTypes.PRODUCTS.SUCCESS, products });
	} else {
		yield put({ type: ActionTypes.PRODUCTS.FAILURE });
	}
}

function* loadCreateProduct(product) {
	yield put({ type: ActionTypes.PRODUCT_CREATE.REQUEST });
	const products = yield call(Api.fetchCreateProduct, product);
	if (!products.error) {
		yield put({ type: ActionTypes.PRODUCT_CREATE.SUCCESS, products });
	} else {
		yield put({ type: ActionTypes.PRODUCT_CREATE.FAILURE });
	}
}

function* loadDeleteProduct(id) {
	yield put({ type: ActionTypes.PRODUCT_DELETE.REQUEST });
	const products = yield call(Api.fetchDeleteProduct, id);
	if (!products.error) {
		yield put({ type: ActionTypes.PRODUCT_DELETE.SUCCESS, products });
	} else {
		yield put({ type: ActionTypes.PRODUCT_DELETE.FAILURE });
	}
}

function* loadEditProduct(id, product) {
	yield put({ type: ActionTypes.PRODUCT_UPDATE.REQUEST });
	const products = yield call(Api.fetchEditProduct, id, product);
	if (!products.error) {
		yield put({ type: ActionTypes.PRODUCT_UPDATE.SUCCESS, products });
	} else {
		yield put({ type: ActionTypes.PRODUCT_UPDATE.FAILURE });
	}
}

/** ************************************************************************** **/
/** ***************************** WATCHERS *********************************** **/
/** ************************************************************************** **/

function* watchLoadPermissions() {
	while(true) {
		const { permissions } = yield take(ActionTypes.PERMISSIONS.LOAD);
		yield fork(loadPermissions, permissions);
	}
}

function* watchLoadProducts() {
	while(true) {
		yield take(ActionTypes.PRODUCTS.LOAD);
		yield fork(loadProducts);
	}
}

function* watchLoadCreateProduct() {
	while(true) {
		const { product } = yield take(ActionTypes.PRODUCT_CREATE.LOAD);
		yield fork(loadCreateProduct, product);
	}
}

function* watchLoadDeleteProduct() {
	while(true) {
		const { id } = yield take(ActionTypes.PRODUCT_DELETE.LOAD);
		yield fork(loadDeleteProduct, id);
	}
}

function* watchLoadEditProduct() {
	while(true) {
		const { id, product } = yield take(ActionTypes.PRODUCT_UPDATE.LOAD);
		yield fork(loadEditProduct, id, product);
	}
}

export default function* root() {
	yield all([
		fork(watchLoadPermissions),
		fork(watchLoadProducts),
		fork(watchLoadCreateProduct),
		fork(watchLoadDeleteProduct),
		fork(watchLoadEditProduct),
	]);
}
