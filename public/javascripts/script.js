var angularSponsor	= angular.module('angularSponsor', [
	'ngRoute',
	'sponsorControllers'
])

var angularPublicacion	= angular.module('angularPublicacion', [
	'ngRoute',
	'publicacionControllers'
])

var angularModulo	= angular.module('angularModulo', [
	'ngRoute',
	'moduloControllers'
])


angularSponsor.config(['$routeProvider',
	function($route, $provide) {
		$route.
			when('/',{
				templateUrl: '../partials/sponsor/list.html',
				controller: 'SponsorListCtrl'
			}).
			when('/create',{
				templateUrl: '../partials/sponsor/create.html',
				controller: 'SponsorCreateCtrl'
			}).
			when('/:sponsorId',{
				templateUrl: '../partials/sponsor/detail.html',
				controller: 'SponsorDetailCtrl'
			}).
			otherwise({
				templateUrl: '../partials/404.html'
			})

	}
]).factory("fileReader", ["$q", "$log", function($q, $log){

        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
}]);

angularPublicacion.config(['$routeProvider',
	function($route) {
		$route.
			when('/',{
				templateUrl: '../partials/publicacion/list.html',
				controller: 'PublicacionListCtrl'
			}).
			when('/create',{
				templateUrl: '../partials/publicacion/create.html',
				controller: 'PublicacionCreateCtrl'
			}).
			when('/:publicacionId',{
				templateUrl: '../partials/publicacion/detail.html',
				controller: 'PublicacionDetailCtrl'
			}).
			otherwise({
				templateUrl: '../partials/404.html'
			})
	}
])

angularModulo.config(['$routeProvider',
	function($route) {
		$route.
			when('/',{
				templateUrl: '../partials/modulo/list.html',
				controller: 'ModuloListCtrl'
			}).
			when('/create',{
				templateUrl: '../partials/modulo/create.html',
				controller: 'ModuloCreateCtrl'
			}).
			when('/:moduloId',{
				templateUrl: '../partials/modulo/detail.html',
				controller: 'ModuloDetailCtrl'
			}).
			otherwise({
				templateUrl: '../partials/404.html'
			})
	}
])