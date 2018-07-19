const express = require('express');
const router = express.Router();
const permissions = {
	IVAN: {
		"permissions" : ['CREATE', 'READ','UPDATE','DELETE']
	},
	MITKO: {
		"permissions" : ['CREATE', 'READ']
	},
	SIMO: {
		"permissions" : ['READ']
	},
	ALEX: {
		"permissions" : []
	}
};

router.post('/', function(req, res){
	//Check if all fields are provided and are valid:
	if(!req.body.username ){
		res.status(400);
		res.json({ message: "Bad Request Login " + req.body.toString() });
	} else {
		// Hard-coding some username values for easier test of diffrent permissions
		const value  = req.body.username.toUpperCase();
		res.json(permissions[value]);
	}
});


module.exports = router;
