var Schema = require('mongoose').Schema
	
var usuario_schema = new Schema({
	username	: String,
	password 	: String,
	name 		: String,
	email 		: String,
	created 	:{type: Date, default: Date.now},
	lastUpdated	:{type: Date, default: Date.now}
})

var Usuario = module.exports = usuario_schema	