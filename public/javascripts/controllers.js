var sponsorControllers = angular.module('sponsorControllers', [])

sponsorControllers.controller('SponsorListCtrl', ['$scope', '$http', 

	function($scope, $http){

		$http.get('/sistema/sponsors/all')
			.success(function(data) {
				$scope.sponsors = data			
			})
			.error(function(err){
				console.log('error: ' + err)
			})

		$scope.deleteSponsor = function(id) {			

			$http.delete('/sistema/sponsors/delete/'+id)
				.success(function(data) {
					$scope.sponsors = data					
				})
				.error(function(err){
					console.log('error: ' + err)
				})
		}

		$scope.orderProp = 'name'
	}
])
sponsorControllers.controller('SponsorCreateCtrl', ['$scope','$http','$window','fileReader',
	function($scope, $http, $window, fileReader){
		$scope.progress = 0;
		$scope.saveSponsor = function() {

			var file = document.getElementById('img').files[0]		
			var datos = $scope.sponsor
			var url = '/sistema/sponsors'		
			var formdata = new FormData()

			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.post(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){
				if(!data.error){
					$window.location.href = '/sistema/sponsors';
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}

		$scope.getFile = function() {
			$scope.progress = 0;
			fileReader.readAsDataUrl($scope.file, $scope)
				.then(function(result) {
					$scope.imageSrc = result					
				})
		}

		$scope.$on("fileProgress", function(e, progress) {
			$scope.progress = progress.loaded / progress.total;
		});

	}
])

sponsorControllers.directive("ngFileSelect",function(){
  return {
    link: function($scope, el){
      
      el.bind("change", function(e) {      	
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    } 
  } 
})

sponsorControllers.controller('SponsorDetailCtrl', ['$scope','$routeParams','$http','$window',
	function($scope, $routeParams, $http, $window){
		var id = $routeParams.sponsorId
		$http.get('/sistema/sponsors/'+ id)
			.success(function(data){
				$('#currentImg').attr('src','/images/img_sponsors/'+data.photo);
				$scope.sponsor = data
				$scope.sponsor.lastUpdated = moment($scope.sponsor.lastUpdated).fromNow();
				$scope.sponsor.created = moment($scope.sponsor.created).format('LLL');
			})

		$scope.saveSponsor = function() {							

			var file = document.getElementById('img').files[0]		
			var datos = $scope.sponsor
			var url = '/sistema/sponsors'		
			var formdata = new FormData()

			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.put(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){
				if(!data.error){
					$scope.sponsor = {}
					$scope.sponsor = data
					$scope.sponsor.lastUpdated = moment($scope.sponsor.lastUpdated).fromNow();
					$scope.sponsor.created = moment($scope.sponsor.created).format('LLL');
					$scope.sponsor.updated = 'Actualizado!'					
					$('#updated').removeClass("hide")
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}

		$scope.deleteSponsor = function(id) {	

			$http.delete('/sistema/sponsors/delete/'+id)
				.success(function(data) {
					$window.location.href = '/sistema/sponsors';
				})
		}
	}
])


var publicacionControllers = angular.module('publicacionControllers',[])

publicacionControllers.controller('PublicacionListCtrl', ['$scope', '$http', 

	function($scope, $http){

		$http.get('/sistema/publicaciones/all')
			.success(function(data) {
				$scope.publicaciones = data			
			})
			.error(function(err){
				console.log('error: ' + err)
			})

		$scope.deletePublicacion = function(id) {			

			$http.delete('/sistema/publicaciones/delete/' + id)
				.success(function(data) {
					$scope.publicaciones = data					
				})
				.error(function(err){
					console.log('error: ' + err)
				})
		}

		$scope.orderProp = 'name'
	}
])
publicacionControllers.controller('PublicacionCreateCtrl', ['$scope','$http','$window',

	function($scope, $http, $window){
		CKEDITOR.replace('contenido');

		$scope.savePublicacion = function() {

			var file = document.getElementById('img').files[0]				
			$scope.publicacion.description = CKEDITOR.instances.contenido.getData()		
			var datos = $scope.publicacion
			var url = '/sistema/publicaciones'	

			var formdata = new FormData()
			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.post(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){
				if(!data.error){
					$window.location.href = '/sistema/publicaciones';
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}
	}
])
publicacionControllers.controller('PublicacionDetailCtrl', ['$scope','$routeParams','$http','$window',
	
	function($scope, $routeParams, $http, $window){

		var id = $routeParams.publicacionId
		$http.get('/sistema/publicaciones/'+ id)
			.success(function(data){	
				$('#currentImg').attr('src','/images/img_publics/'+data.photo);				
				$scope.publicacion = data
				$scope.publicacion.lastUpdated = moment($scope.publicacion.lastUpdated).fromNow();
				$scope.publicacion.created = moment($scope.publicacion.created).format('LLL');
				CKEDITOR.replace('contenido');
			})

		$scope.savePublicacion = function() {							

			var file = document.getElementById('img').files[0]			
			$scope.publicacion.description = CKEDITOR.instances.contenido.getData()	
			var datos = $scope.publicacion
			var url = '/sistema/publicaciones'

			var formdata = new FormData()
			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.put(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){				
				if(!data.error){					
					$scope.publicacion = {}
					$scope.publicacion = data
					$scope.publicacion.lastUpdated = moment($scope.publicacion.lastUpdated).fromNow();
					$scope.publicacion.created = moment($scope.publicacion.created).format('LLL');
					$scope.publicacion.updated = 'Actualizado!'					
					$('#updated').removeClass("hide")
					$(document).scrollTop( 0 );
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}

		$scope.deletePublicacion = function(id) {	

			$http.delete('/sistema/publicaciones/delete/'+id)
				.success(function(data) {
					$window.location.href = '/sistema/publicaciones';
				})
		}

	}
])


var moduloControllers = angular.module('moduloControllers',[])

moduloControllers.controller('ModuloListCtrl', ['$scope', '$http', 

	function($scope, $http){

		$http.get('/sistema/modulos/all')
			.success(function(data) {
				$scope.modulos = data			
			})
			.error(function(err){
				console.log('error: ' + err)
			})

		$scope.deleteModulo = function(id) {			

			$http.delete('/sistema/modulos/delete/' + id)
				.success(function(data) {
					$scope.modulos = data					
				})
				.error(function(err){
					console.log('error: ' + err)
				})
		}

		$scope.orderProp = 'name'
	}
])
moduloControllers.controller('ModuloCreateCtrl', ['$scope','$http','$window',

	function($scope, $http, $window){
		CKEDITOR.replace('contenido');

		$scope.saveModulo = function() {

			var file = document.getElementById('img').files[0]				
			$scope.modulo.description_all = CKEDITOR.instances.contenido.getData()		
			var datos = $scope.modulo
			var url = '/sistema/modulos'	

			var formdata = new FormData()
			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.post(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){
				if(!data.error){
					$window.location.href = '/sistema/modulos';
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}
	}
])
moduloControllers.controller('ModuloDetailCtrl', ['$scope','$routeParams','$http','$window',
	
	function($scope, $routeParams, $http, $window){

		var id = $routeParams.moduloId
		$http.get('/sistema/modulos/'+ id)
			.success(function(data){	
				$('#currentImg').attr('src','/images/img_modulos/'+data.photo);
				$scope.modulo = data
				$scope.modulo.lastUpdated = moment($scope.modulo.lastUpdated).fromNow();
				$scope.modulo.created = moment($scope.modulo.created).format('LLL');
				CKEDITOR.replace('contenido');
			})

		$scope.saveModulo = function() {							

			var file = document.getElementById('img').files[0]			
			$scope.modulo.description_all = CKEDITOR.instances.contenido.getData()	
			var datos = $scope.modulo
			var url = '/sistema/modulos'

			var formdata = new FormData()
			formdata.append('file', file);
			formdata.append('datos', JSON.stringify(datos));

			$http.put(url, formdata, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success(function(data){				
				if(!data.error){					
					$scope.modulo = {}
					$scope.modulo = data
					$scope.modulo.lastUpdated = moment($scope.modulo.lastUpdated).fromNow();
					$scope.modulo.created = moment($scope.modulo.created).format('LLL');
					$scope.modulo.updated = 'Actualizado!'					
					$('#updated').removeClass("hide")
					$(document).scrollTop( 0 );
				}					
				else
					console.log(data.error.message)				
			})
			.error(function(err){
				console.log('Error->: ' + err)
			})
		}

		$scope.deleteModulo = function(id) {	

			$http.delete('/sistema/modulos/delete/'+id)
				.success(function(data) {
					$window.location.href = '/sistema/modulos';
				})
		}

	}
])