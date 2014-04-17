var mongoose = require('mongoose')
var db = module.exports = mongoose.connect('mongodb://localhost/sisfec')

mongoose.connection.on('error', function(err) {
	console.log(err)
})

mongoose.connection.on('connected', function(e) {
	console.log('->DB Lista!')	
})