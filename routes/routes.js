const express = require('express');
const router = express.Router();
const productsJSON = require('./products.json');
let fs = require('fs');

function saveProductsToFile(products, callback) {
	fs.writeFile('./routes/products.json', JSON.stringify(productsJSON), callback);
};

router.get('/', function(req, res){
	res.json(productsJSON);
});

router.get('/:id([0-9]{3,})', function(req, res){
	const currProduct = productsJSON.products.filter(function(product){
		if(product.id == req.params.id){
			return true;
		}
	});
	
	if(currProduct.length == 1){
		res.json(currProduct[0])
	} else {
		res.status(404);  //Set status to 404 as movie was not found
		res.json({message: "Not Found"});
	}
});

router.post('/', (req, res) => {
	//Check if all fields are provided and are valid:
	if(!req.body.name ||
		!req.body.price ||
		!req.body.currency){
		res.status(400);
		res.json({ message: "Bad Request Create " + req.body.toString() });
	} else {
		let newId = productsJSON.products[productsJSON.products.length-1] ? productsJSON.products[productsJSON.products.length-1].id + 1 : 1;
		productsJSON.products.push({
			id: newId,
			name: req.body.name,
			price: parseInt(req.body.price),
			currency: req.body.currency
		});

		saveProductsToFile ( productsJSON, (err) => {
			console.log(err)
			res.json({ message: "New product created.", location: "/products/" + newId });
		});
	}
});

router.put('/:id', (req, res) => {
	//Check if all fields are provided and are valid:
	if(!req.body.name ||
		!req.body.price ||
		!req.body.currency ||
		!req.params.id){
		res.status(400);
		res.json({message: "Bad Request Put"});
	} else {
		//Gets us the index of product with given id.
		const updateIndex = productsJSON.products.map(function(product){
			return product.id;
		}).indexOf(parseInt(req.params.id));
		
		if(updateIndex === -1){
			//Product not found, create new
			productsJSON.products.push({
				id: parseInt(req.params.id),
				name: req.body.name,
				price: req.body.price,
				currrency: req.body.currrency
			});

			saveProductsToFile ( productsJSON, () => {		
				res.json({
					message: "New product created.", location: "/products/" + req.params.id});
			});
		} else {
			//Update existing product
			productsJSON.products[updateIndex] = {
				id: parseInt(req.params.id),
				name: req.body.name,
				price: req.body.price,
				currency: req.body.currency
			};
			saveProductsToFile ( productsJSON, () => {
				res.json({ message: "Product id " + req.params.id + ' - ' + req.body.name + " updated.",
					location: "/products/" + req.params.id});
			});
		}
	}
});

router.delete('/:id', (req, res) => {
	const removeIndex = productsJSON.products.map(product => {
		return product.id;
	}).indexOf(parseInt(req.params.id)); //Gets us the index of product with given id.
	
	if(removeIndex === -1){
		res.json({ message: "Sorry something went wrong. Id not found for delete" });
	} else {
		productsJSON.products.splice(removeIndex, 1);
		saveProductsToFile ( productsJSON, () => {
			res.send({ message: "Product id " + req.params.id + " removed." });
		});
	}
});

module.exports = router;
