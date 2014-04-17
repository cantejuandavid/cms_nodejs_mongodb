var db = require('./mongoose')

var publicacion_schema = require('../models/publicacion')
var Publicacion = db.model('publicacion', publicacion_schema)


exports.index = function(req, res) {
	Publicacion.find(function(err, pubs) {
		if(err) console.log(err)
		else {
			res.render('index', {tilte: 'Publicaciones', pubs: pubs})
		}
	})	
}

exports.software = function(req, res) {
	res.render('pagina/software')
}

exports.modulos = function(req, res) {
	res.render('pagina/modulos')
}

exports.getPublicacion = function(req, res) {
	var url = req.params.url

	Publicacion.findOneAndUpdate({url: url},{ $inc: { views: 1 }}, function(err, pub) {
		if(err) console.log(err)
		if(pub)
			res.json(pub)
		else
			res.json({'error': true})
	})
}

exports.getAllPublicacion = function(req, res) {
	console.log('getAllPublicacion')
	Publicacion.find(function(err, pubs){		
		res.json(pubs)
	})
}
exports.publicaciones = function(req, res) {
	res.render('pagina/publicaciones')
}

exports.nosotros = function(req, res) {
	res.render('pagina/nosotros')
}

exports.manual = function(req, res) {
	res.render('pagina/manual')
}