var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');
var bodyParser = require('body-parser')

var db = {};
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// http get
router.get('/', (req, res) => {
	var rv = [];
	for (key in db) rv.push(db[key])
	res.json(rv);
});

router.post('/', jsonParser, (request, response) => {
	if (!(request.body.id in db)) {
		db[request.body.id] = request.body;
	}
});

module.exports = router;
