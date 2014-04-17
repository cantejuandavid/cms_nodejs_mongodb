var publicaciones	= angular.module('publicaciones', [
	'ngRoute',
	'publicacionControllers'
])


publicaciones.config(['$routeProvider',
	function($routeProvider) {		
		$routeProvider.
			when('/',{
				templateUrl: '../partials/pagina/publicaciones/list.html',
				controller: 'PublicacionesCtrl'
			}).
			when('/:url',{
				templateUrl: '../partials/pagina/publicaciones/publicacion.html',
				controller: 'PublicacionCtrl'				
			}).
			otherwise({
				templateUrl: '../partials/404.html'
			})		
	}
])

function MainPublicaciones ($scope) {
	$scope.seo = {
        pageTitle : 'Publicaciones',
        pageDescription : 'Publciaciones description'
    };
}
