var express = require('express'),
	http 	= require('http'),	
	stylus 	= require('stylus'),
	path 	= require('path'),
	cookieP = require('cookie-parser'),
	nib 	= require('nib'),
	body_parser	= require('body-parser'),
	multipart = require('connect-multiparty'),
	Session = require('express-session'),
	Met_ove = require('method-override')

var app = module.exports = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(Met_ove());
app.use(multipart());
app.use(body_parser());
app.use(cookieP('NODEJS_XD'));  
app.use(require('prerender-node'));
app.use(Session()); 

app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(path.join(__dirname, 'public')));

require('./controllers/peticiones')(app)

http.createServer(app).listen(3000, function(){
	console.log('Express server escuchando en puerto 3000');
});

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib())
}