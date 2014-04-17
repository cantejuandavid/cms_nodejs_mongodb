var publicacionControllers = angular.module('publicacionControllers', [])

publicacionControllers.controller('PublicacionesCtrl', ['$scope', '$http', 

	function($scope, $http){

		$http.get('/publicaciones/all')
			.success(function(data) {								
				$scope.publicaciones = data			
			})
			.error(function(err){
				console.log('error: ' + err)
			})
	}
])

publicacionControllers.controller('PublicacionCtrl', ['$scope','$routeParams','$http','$window',
	function($scope, $routeParams, $http, $window){

		var url = $routeParams.url		
		$http.get('/publicaciones/json/'+ url)
			.success(function(data){						
				$scope.publicacion = data	
				$scope.$parent.seo = {
					pageTitle : data.title,
					pageDescription: data.description_short
				}		
				$scope.publicacion.created = moment($scope.publicacion.created).format('MMMM DD[,] YYYY').toUpperCase();
				$('#contenido').html($scope.publicacion.description)
			})
	}
])
