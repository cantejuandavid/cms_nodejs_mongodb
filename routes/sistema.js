var db = require('./mongoose')
var fs = require('fs')

var usuario_schema = require('../models/usuario')
var Usuario = db.model('usuario', usuario_schema)

var publicacion_schema = require('../models/publicacion')
var Publicacion = db.model('publicacion', publicacion_schema)

var sponsor_schema = require('../models/sponsor')
var Sponsor = db.model('sponsor', sponsor_schema)

var modulo_schema = require('../models/modulos')
var Modulo = db.model('modulo', modulo_schema)

exports.index = function(req, res) {
	res.render('sistema/index', {user: req.session.username})
}
exports.autenticar = function(req, res, next) {
	if(!req.session.username)
		res.redirect('/sistema/login')
	else next()
}
exports.postLogin = function(req, res) {
	var username = req.body.username
	var password = encript(username, req.body.password)
	Usuario.findOne({username: username}, function(err, userFind) {
		if(err) console.log(err)		

		if(userFind && userFind.password == password) {			
			req.session.username = {
				_id: userFind._id, 
				username: userFind.username,
				name: userFind.name,
				email: userFind.email,
				created: userFind.created,
				lastUpdated: userFind.lastUpdated
			}
			res.redirect('/sistema')
		}
		else			
			res.render('sistema/login', {
				error: 'usuario y/o contraseña incorrecta',
				username: username,
				title: 'Login'
			})
	})
}
exports.crear = function(req, res) {
	Usuario.create({
		username: 'j',
		password: encript('j','j'),
		name: 'juan j j j',
		email: 'j@gmail.com'
	}, function(err, user) {
		if(err) console.log(err)
		else res.json(user)
	})
}
exports.getLogin = function(req, res) {
	if(!req.session.username)
		res.render('sistema/login', {title: 'Login'	})
	else res.redirect('/sistema')
}
exports.logout = function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
		res.redirect('/sistema');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}
function encript(user, pass){
	var crypto = require('crypto'),
		q = crypto.createHmac('sha1', user).update(pass).digest('hex')
	return q
}


//publicaciones
exports.publicaciones = function(req, res) {
	res.render('sistema/publicaciones', {
		title: 	'Publicaciones',
		user: 	req.session.username
	})
}
exports.getAllPubs = function(req, res) {
	Publicacion.find(function(err, pubs) {
		if(err) console.log(err);
		res.json(pubs)
	})
}
exports.savePub = function(req, res){

	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

		Publicacion.findById(datos._id,'photo', function(err, publicacion){
			var directory = './public/images/img_publics/'
			var filename = publicacion.photo

			if(req.files.file !== undefined) {
				filename = uploadFile(file, directory, publicacion.photo)
				console.log('files length > 0')
			}
			
			if(filename){
				Publicacion.findByIdAndUpdate(datos._id, {
					title 				: datos.title,
					description_short 	: datos.description_short,
					description 		: datos.description,
					url 				: datos.url,
					tag 				: datos.tag,
					photo 				: filename,
					lastUpdated 		: new Date
				}, function(err, publicacion){
					if(err) console.log(err);
					res.json(publicacion)
				})				
			}
			else res.json({'error': {'message':'Extensión no permitida'}})
		})		
}
exports.createPub = function(req, res){	
	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

	if(file) {
		var directory = './public/images/img_publics/'
		var filename = uploadFile(file, directory)
		if(filename){
			Publicacion.create({
				title 				: datos.title,
				description_short 	: datos.description_short,
				description 		: datos.description,
				tag 				: datos.tag,
				url 				: datos.url,
				photo 				: filename
			}, function(err){
				if(err) console.log(err);
				Publicacion.find(function(err, sponsors) {
					if(err) console.log(err)
					res.json(sponsors)
				})
			})
		}
		else res.json({'error': {'message':'Extensión no permitida'}})
	}   
}
exports.getEditPub = function(req, res) {
	Publicacion.findById(req.params.id, function(err, pub) {
		if(err) console.log(err)
		res.json(pub)
	})	
}
exports.deletePub = function(req, res) {

	var id = req.params.id
	Publicacion.findByIdAndRemove(id, function(err, affect) {	
		if(fs.existsSync('./public/images/img_publics/' + affect.photo)){
			fs.unlinkSync('./public/images/img_publics/' + affect.photo);
		}	
		Publicacion.find(function(err, publicaciones) {
			if(err) console.log(err)
			res.json(publicaciones)
		})		
	})
}

//sponsors
exports.sponsors = function(req, res) {
	res.render('sistema/sponsors', {
		title: 	'Sponsors',
		user: 	req.session.username
	})
}
exports.getAllSponsor = function(req, res) {
	Sponsor.find(function(err, sponsors) {
		if(err) console.log(err);
		res.json(sponsors)
	})
}
exports.saveSponsor = function(req, res){		
	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

	if(file) {
		Sponsor.findById(datos._id,'photo', function(err, sponsor){
			var directory = './public/images/img_sponsors/'
			var filename = uploadFile(file, directory, sponsor.photo)
			if(filename){

				Sponsor.findByIdAndUpdate(datos._id, {
					name 	: datos.name,
					dir 	: datos.dir,
					tel 	: datos.tel,
					pag 	: datos.pag,
					photo 	: filename,
					lastUpdated 		: new Date
				}, function(err, sponsor){
					if(err) console.log(err);
					res.json(sponsor)
				})
			}
			else res.json({'error': {'message':'Extensión no permitida'}})
		})
	}	
}
exports.createSponsor = function(req, res){		
	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

	if(file) {
		var directory = './public/images/img_sponsors/'
		var filename = uploadFile(file, directory)
		if(filename){
			Sponsor.create({
				name 	: datos.name,
				dir 	: datos.dir,
				tel 	: datos.tel,
				pag 	: datos.pag,
				photo 	: filename
			}, function(err, sponsor){
				if(err) console.log(err);
				Sponsor.find(function(err, sponsors) {
					if(err) console.log(err)
					res.json(sponsors)
				})
			})
		}
		else res.json({'error': {'message':'Extensión no permitida'}})
	}    
}
exports.getEditSponsor = function(req, res) {
	Sponsor.findById(req.params.id, function(err, sponsor) {
		if(err) console.log(err)
		res.json(sponsor)
	})	
}
exports.deleteSponsor = function(req, res) {
	var id = req.params.id
	Sponsor.findByIdAndRemove(id, function(err, affect) {	
		if(fs.existsSync('./public/images/img_sponsors/' + affect.photo)){
			fs.unlinkSync('./public/images/img_sponsors/' + affect.photo);
		}	
		Sponsor.find(function(err, sponsors) {
			if(err) console.log(err)
			res.json(sponsors)
		})		
	})
}

//modulos
exports.modulos = function(req, res) {
	res.render('sistema/modulos', {
		title: 	'Modulos',
		user: 	req.session.username
	})
}
exports.getAllModulos = function(req, res) {
	Modulo.find(function(err, modulos) {
		if(err) console.log(err);
		res.json(modulos)
	})
}
exports.saveModulo = function(req, res){

	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

		Modulo.findById(datos._id,'photo', function(err, modulo){
			var directory = './public/images/img_modulos/'
			var filename = modulo.photo

			if(req.files.file !== undefined) {
				filename = uploadFile(file, directory, modulo.photo)
			}
			
			if(filename){
				Modulo.findByIdAndUpdate(datos._id, {
					name 				: datos.name,
					description 		: datos.description,
					description_all		: datos.description_all,
					url 				: datos.url,
					tag 				: datos.tag,
					photo 				: filename,
					lastUpdated 		: new Date
				}, function(err, modulo){
					if(err) console.log(err);
					res.json(modulo)
				})				
			}
			else res.json({'error': {'message':'Extensión no permitida'}})
		})		
}
exports.createModulo = function(req, res){	
	var datos = JSON.parse(req.body.datos)
	var file  = req.files.file

	if(file) {
		var directory = './public/images/img_modulos/'
		var filename = uploadFile(file, directory)
		if(filename){
			Modulo.create({
				name 				: datos.name,
				description 	 	: datos.description,
				description_all		: datos.description_all,
				tag 				: datos.tag,
				url 				: datos.url,
				photo 				: filename
			}, function(err){
				if(err) console.log(err);
				Publicacion.find(function(err, modulos) {
					if(err) console.log(err)
					res.json(modulos)
				})
			})
		}
		else res.json({'error': {'message':'Extensión no permitida'}})
	}   
}
exports.getEditModulo = function(req, res) {
	Modulo.findById(req.params.id, function(err, modulo) {
		if(err) console.log(err)
		res.json(modulo)
	})	
}
exports.deleteModulo = function(req, res) {

	var id = req.params.id
	Modulo.findByIdAndRemove(id, function(err, affect) {	
		if(fs.existsSync('./public/images/img_publics/' + affect.photo)){
			fs.unlinkSync('./public/images/img_publics/' + affect.photo);
		}	
		Modulo.find(function(err, modulos) {
			if(err) console.log(err)
			res.json(modulos)
		})		
	})
}

function uploadFile(file, directory, nameRemove) {

	
	var filename = file.originalFilename
	var extAllowed = [".jpg",".png",".jpeg",".gif"]
	var i = filename.lastIndexOf('.')

	var newName = new Date().getTime() + '-' + Math.floor((Math.random()*10000)+2)
	var file_extension= (i < 0) ? '' : filename.substr(i)
	filename = newName + '.' + filename.split('.')[1]
	var tmp_path = file.path
	var target_path = directory + filename	

	if(file_extension in oc(extAllowed)) {

		if(fs.existsSync(directory + nameRemove)){			
			fs.unlinkSync(directory + nameRemove);
		}			

		var is = fs.createReadStream(tmp_path);
		var os = fs.createWriteStream(target_path);

		is.pipe(os);
		is.on('end',function() {			
			fs.unlinkSync(tmp_path)						
		});
		return filename;
	}
	else {		
		fs.unlinkSync(tmp_path)
		return false
	}
}
function oc(a){
	var o = {}
	for(var i=0;i<a.length;i++) {
		o[a[i]] = ''
	}
	return o
}