var Schema = require('mongoose').Schema
	
var sponsor_schema = new Schema({
	name 	:String,
	dir 	:String,
	tel 	:String,
	photo 	:String,
	pag 	:String,
	created 			:{type: Date, default: Date.now},
	lastUpdated			:{type: Date, default: Date.now}
})

var Sponsor = module.exports = sponsor_schema