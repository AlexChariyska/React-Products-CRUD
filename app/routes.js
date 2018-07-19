import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import ProductsList from './containers/ProductsList';
import Product from './containers/Product';

export default (
	<Switch>
		<Route exact={ true } path="/" component={ ProductsList } />
		<Route path="/login" component={ Login } />
		<Route path="/product" component={ Product } />
	</Switch>
);
