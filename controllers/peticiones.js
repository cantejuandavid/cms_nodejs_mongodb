var pagina	= require('../routes/pagina')
var sistema = require('../routes/sistema')
module.exports = function(app){
	//sistema
	app.get('/sistema', sistema.autenticar, sistema.index)
		app.get('/sistema/login', sistema.getLogin)
		app.post('/sistema/login', sistema.postLogin)
		app.get('/sistema/logout', sistema.logout) 
		app.get('/sistema/crearusuario', sistema.crear)

		//publicaciones
		app.route('/sistema/publicaciones')
			.post(sistema.autenticar, sistema.createPub)
			.get(sistema.autenticar, sistema.publicaciones)	
			.put(sistema.autenticar, sistema.savePub)

		app.get('/sistema/publicaciones/all', sistema.autenticar, sistema.getAllPubs)	
		app.get('/sistema/publicaciones/:id', sistema.getEditPub)
		app.delete('/sistema/publicaciones/delete/:id', sistema.deletePub)

		//modulos
		app.route('/sistema/modulos')
			.post(sistema.autenticar, sistema.createModulo)
			.get(sistema.autenticar, sistema.modulos)	
			.put(sistema.autenticar, sistema.saveModulo)

		app.get('/sistema/modulos/all', sistema.autenticar, sistema.getAllModulos)	
		app.get('/sistema/modulos/:id', sistema.getEditModulo)
		app.delete('/sistema/modulos/delete/:id', sistema.deleteModulo)

		//sponsors
		app.route('/sistema/sponsors')
			.post(sistema.autenticar, sistema.createSponsor)
			.get(sistema.autenticar, sistema.sponsors)	
			.put(sistema.autenticar, sistema.saveSponsor)

		app.get('/sistema/sponsors/all', sistema.autenticar, sistema.getAllSponsor)	
		app.get('/sistema/sponsors/:id', sistema.getEditSponsor)
		app.delete('/sistema/sponsors/delete/:id', sistema.deleteSponsor)

	//pagina
	app.get('/', pagina.index)
	app.get('/software', pagina.software)
	app.get('/modulos', pagina.modulos)
	app.get('/manual', pagina.manual)
	app.get('/nosotros', pagina.nosotros)

	app.get('/publicaciones', pagina.publicaciones)
	app.get('/publicaciones/all', pagina.getAllPublicacion)
	app.get('/publicaciones/:url', function(req, res) {
		var url = req.params.url
		res.redirect('/publicaciones#/' + url)
	})
	app.get('/publicaciones/json/:url', pagina.getPublicacion)

}
