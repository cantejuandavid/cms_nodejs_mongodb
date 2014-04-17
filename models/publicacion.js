var Schema = require('mongoose').Schema

var publicacion_schema = new Schema({
	title 				: String,
	description_short 	: String,
	description 		: String,
	photo 				: String,
	views 				: {type: Number, default: 0},
	url 				: String,
	tag 				: String,
	created 			:{type: Date, default: Date.now},
	lastUpdated			:{type: Date, default: Date.now}
})

var Publicacion = module.exports = publicacion_schema