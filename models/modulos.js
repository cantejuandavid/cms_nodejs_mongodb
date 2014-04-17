var Schema = require('mongoose').Schema

var modulo_schema = new Schema({
	name 				: String,
	description 		: String,
	description_all		: String,
	photo 				: String,
	url 				: String,
	tag 				: String,
	created 			:{type: Date, default: Date.now},
	lastUpdated			:{type: Date, default: Date.now}
})

var Modulo = module.exports = modulo_schema