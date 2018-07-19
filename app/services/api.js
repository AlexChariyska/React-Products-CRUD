// API URL for the requests
const API_ROOT = 'http://localhost:5000';

const callApi = async (fullUrl, endpoint, method, payload) => {
	try {
		const response = await fetch( fullUrl, {
			headers: {	
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: method ? method : 'GET',
			body: JSON.stringify( payload ) 
		});
		if (response.status === 200) {
			const json = await response.json();
			switch (endpoint) {
				case endpoints.PERMISSIONS:
					return Object.assign({}, { ...json.permissions } );
				case endpoints.PRODUCTS:
					return [ ...json.products ];
				case endpoints.CREATE_PRODUCT:
					return Object.assign({}, { ...json } );
				case endpoints.DELETE_PRODUCT:
					return Object.assign({}, { ...json } );
				case endpoints.PRODUCT_UPDATE:
					return Object.assign({}, { ...json } );
				default:
					return {};
			}
		}
		throw new Error(response.status);
	} catch (error) {
		// ToDo - error handling for the apllication should be implemneted
		return { error: 'Fetch Failed' };
	}
};

const endpoints = {
	PERMISSIONS: 'PERMISSIONS',
	PRODUCTS: 'PRODUCTS',
	CREATE_PRODUCT: 'CREATE_PRODUCT',
	DELETE_PRODUCT: 'DELETE_PRODUCT',
};

// api services
export const fetchPermissions = permissions => callApi(`${API_ROOT}/permissions`, endpoints.PERMISSIONS, 'POST', permissions);
export const fetchProducts = () => callApi(`${API_ROOT}/products`, endpoints.PRODUCTS);
export const fetchCreateProduct = product => callApi(`${API_ROOT}/products/`, endpoints.CREATE_PRODUCT, 'POST', product);
export const fetchDeleteProduct = id => callApi(`${API_ROOT}/products/${id}`, endpoints.DELETE_PRODUCT, 'DELETE');
export const fetchEditProduct = (id, product) => callApi(`${API_ROOT}/products/${id}`, endpoints.DELETE_PRODUCT, 'PUT', product);
