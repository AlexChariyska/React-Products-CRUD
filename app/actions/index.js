function createRequestTypes(base) {
	return ['LOAD', 'REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	}, {});
}

function action(type, payload = {}) {
	return { type, ...payload };
}

export const PERMISSIONS = createRequestTypes('PERMISSIONS');
export const PRODUCTS = createRequestTypes('PRODUCTS');
export const PRODUCT_CREATE = createRequestTypes('PRODUCT_CREATE');
export const PRODUCT_DELETE = createRequestTypes('PRODUCT_DELETE');
export const PRODUCT_UPDATE = createRequestTypes('PRODUCT_UPDATE');

export const LOG_OUT = 'LOG_OUT';
export const RESET_PRODUCT = 'RESET_PRODUCT';

export const loadPermissions = (permissions) => action(PERMISSIONS.LOAD, { permissions });
export const loadProducts = () => action(PRODUCTS.LOAD);
export const loadCreateProduct = (product) => action(PRODUCT_CREATE.LOAD, { product });
export const deleteProduct = (id) => action(PRODUCT_DELETE.LOAD, { id });
export const updateProduct = (id, product) => action(PRODUCT_UPDATE.LOAD, { id, product });
export const logOut = () => action(LOG_OUT);
export const resetProduct = () => action(RESET_PRODUCT);
