var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var bodyParser = require('body-parser')

var db = {};
var jsonParser = bodyParser.json()
// http get
router.get('/', (req, res) => {
	res.json(db);
});

router.post('/', jsonParser, (request, response) => {
	if (!(request.body.id in db)) {
		db[request.body.id] = request.body;
	}
});

module.exports = router;
