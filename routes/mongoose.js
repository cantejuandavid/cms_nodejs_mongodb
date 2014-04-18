var mongoose = require('mongoose')
var db = 'mongodb://rooter:juancho123@ds053438.mongolab.com:53438/sisfecnodejs'
var dbOld = 'mongodb://localhost/sisfec'
var db = module.exports = mongoose.connect(db)


mongoose.connection.on('error', function(err) {
	console.log(err)
})

mongoose.connection.on('connected', function(e) {
	console.log('->DB Lista!')	
})