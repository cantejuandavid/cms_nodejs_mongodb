div(ng-controller='sponsorController').panel.col-sm-8.col-md-offset-2
	h1 Sponsors
	
	ul.listaPubs
		li(ng-repeat="s in sponsors").thumbnail
			span {{s.name}}
			span {{s.dir}}
			span {{s.tel}}					
			a(ng-click='editarSponsor(s._id)').btn.btn-info.btn-sm Editar
			a(ng-click='deleteSponsor(s._id)').btn.btn-danger.btn-sm Eliminar
		h4(ng-show='!sponsors.length') No hay
	a(data-toggle='modal', data-target='#createSponsor', ng-click='showCreate()').btn.btn-primary.btn-sm Crear

	.modal.fade(id='editSponsor',tabindex='1',role='dialog')
		.modal-dialog
			.modal-content
				form(ng-submit='saveSponsor()')
					.modal-header
						button(data-dismiss="modal").close &times;
						h4.modal-title Editar Sponsor
					.modal-body
						.form-group
							input(type='text', ng-model='formEditSponsor.name', required).form-control
						.form-group
							input(type='text', ng-model='formEditSponsor.dir', required).form-control
						.form-group
							input(type='text', ng-model='formEditSponsor.tel', required).form-control
					.modal-footer
						button(data-dismiss="modal").btn.btn-default Cerrar
						button(type='submit').btn.btn-star Guardar
	.modal.fade(id='createSponsor',tabindex='1',role='dialog')
		.modal-dialog
			.modal-content
				form(ng-submit='createSponsor()', enctype="multipart/form-data")
					.modal-header
						button(data-dismiss="modal").close &times;
						h4.modal-title Crear Sponsor
					.modal-body
						.form-group
							input(type='text', ng-model='formCreateSponsor.name', placeholder='Nombre',  value='333', required).form-control
						.form-group
							input(type='text', ng-model='formCreateSponsor.dir', placeholder='Dirección',  value='333', required).form-control
						.form-group
							input(type='text', ng-model='formCreateSponsor.tel', placeholder='teléfono', value='333',  required).form-control
						.form-group
							input(type='file', ng-model='formCreateSponsor.photo', id='photo', name='photo', required).form-control
					.modal-footer
						button(data-dismiss="modal").btn.btn-default Cerrar
						button(type='submit').btn.btn-star Crear