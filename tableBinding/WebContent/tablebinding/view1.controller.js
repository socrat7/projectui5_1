
sap.ui.controller("tablebinding.view1", {

	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	* @memberOf tablebinding.view1
	*/
	onInit: function() {

		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/");
		
		//para poder actualizar nuetsra pagina por ejemplo con el update tenemos que agregar un ID al model
		this.getView().setModel(oModel, "empModel");

		//obtenemos el id del formulario
		var oGrid = this.getView().byId("FormChange354");
		//escondemos el formulario
		oGrid.setVisible(false);

	},

	/**
	* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	* (NOT before the first rendering! onInit() is used for that one!).
	* @memberOf tablebinding.view1
	*/
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf tablebinding.view1
	*/
	//	onAfterRendering: function() {
	//
	//	},

	/**
	* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	* @memberOf tablebinding.view1
	*/
	//	onExit: function() {
	//
	//	}

	//Display

	onDisplay: function() {

		//Obtenemos la tabla del view
		var oTable = this.getView().byId("idEmployeeTable");
		//Obtenemos el elemento seleccionado
		var contexts = oTable.getSelectedContexts();

		//comprobamos si hay elementos seleccionados
		if (contexts.length == 0) {
			
			
			//mensaje de error
			sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Please Select a Row", {
										icon: MessageBox.Icon.ERROR,
										title: "Display",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										onClose: function (oAction) { / * do something * / }
									}
								);
							});
			
			
		} else {

			//obtenemos el id del formulario
			var oGrid = this.getView().byId("FormChange354");
			//mostramos el formulario
			oGrid.setVisible(true);

			//obtenemos el id del boton save
			var oSave = this.getView().byId("saveBtnId");
			oSave.setVisible(false);

			var items = contexts.map(function(c) {
				return c.getObject();
			});

			//obtenemos el id del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("empId");
			oId.setEditable(false);
			oId.setValue(items[0].Empno);

			//obtenemos el primer nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("fnameId");
			oId.setEditable(false);
			oId.setValue(items[0].Fname);

			//obtenemos el segundo nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("lnameId");
			oId.setEditable(false);
			oId.setValue(items[0].Lname);

			//obtenemos la direccion del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("addrsId");
			oId.setEditable(false);
			oId.setValue(items[0].Addrs);

			//obtenemos el puesto del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("desgnId");
			oId.setEditable(false);
			oId.setValue(items[0].Desgn);

		}


	},

	//Update

	mode: 0,
	onUpdate: function() {

		//Obtenemos la tabla del view
		var oTable = this.getView().byId("idEmployeeTable");
		//Obtenemos el elemento seleccionado
		var contexts = oTable.getSelectedContexts();

		//comprobamos si hay elementos seleccionados
		if (contexts.length == 0) {
			
			//mensaje de error
			sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Please Select a Row", {
										icon: MessageBox.Icon.ERROR,
										title: "Update",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										onClose: function (oAction) { / * do something * / }
									}
								);
							});
							
	
		} else {

			//obtenemos el id del formulario
			var oGrid = this.getView().byId("FormChange354");
			//mostramos el formulario
			oGrid.setVisible(true);

			//obtenemos el id del boton save
			var oSave = this.getView().byId("saveBtnId");
			oSave.setVisible(true);

			var items = contexts.map(function(c) {
				return c.getObject();
			});

			//obtenemos el id del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("empId");
			oId.setEditable(false);
			oId.setValue(items[0].Empno);

			//obtenemos el primer nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("fnameId");
			oId.setEditable(true);
			oId.setValue(items[0].Fname);

			//obtenemos el segundo nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("lnameId");
			oId.setEditable(true);
			oId.setValue(items[0].Lname);

			//obtenemos la direccion del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("addrsId");
			oId.setEditable(true);
			oId.setValue(items[0].Addrs);

			//obtenemos el puesto del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("desgnId");
			oId.setEditable(true);
			oId.setValue(items[0].Desgn);

			this.mode = "update";

		}

	},

	//Create

	onCreate: function() {
		
			//obtenemos el id del formulario
			var oGrid = this.getView().byId("FormChange354");
			//mostramos el formulario
			oGrid.setVisible(true);

			//obtenemos el id del boton save
			var oSave = this.getView().byId("saveBtnId");
			oSave.setVisible(true);

			//obtenemos el id del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("empId");
			oId.setEditable(true); //en este caso el employe ID tiene que ser editable osea true
			oId.setValue(""); //Todos los campos tienen que estar vacios

			//obtenemos el primer nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("fnameId");
			oId.setEditable(true);
			oId.setValue(""); //Todos los campos tienen que estar vacios

			//obtenemos el segundo nombre del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("lnameId");
			oId.setEditable(true);
			oId.setValue(""); //Todos los campos tienen que estar vacios

			//obtenemos la direccion del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("addrsId");
			oId.setEditable(true);
			oId.setValue(""); //Todos los campos tienen que estar vacios

			//obtenemos el puesto del empleado y escribimos su valor en el campo correspondiente
			var oId = this.getView().byId("desgnId");
			oId.setEditable(true);
			oId.setValue(""); //Todos los campos tienen que estar vacios

			this.mode = "create";


	},
	
	//declaramos una variable global para el delete
	deleteId: 0,
	
	//Delete

	onDelete: function() {
		
		   //obtenemos el id del formulario
			var oGrid = this.getView().byId("FormChange354");
			//mostramos el formulario
			oGrid.setVisible(false);
			//Obtenemos la tabla del view
			var oTable = this.getView().byId("idEmployeeTable");
			//Obtenemos el elemento seleccionado
			var contexts = oTable.getSelectedContexts();
				
			
			//comprobamos si hay elementos seleccionados
		if (contexts.length == 0) {
			
			//mensaje de error
			sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Please Select a Row", {
										icon: MessageBox.Icon.ERROR,
										title: "Update",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										onClose: function (oAction) { / * do something * / }
									}
								);
							});
							
		} else {
			
		//borramos el dato escogido	
			
		var items = contexts.map(function(c) {
				return c.getObject();
			});
			
	    	deleteId = items[0].Empno;

			this.mode = "delete";
			
			//activamos la funcion Save sin presionar un boton
			this.onSave();
			
		}

	},

	//onSave

	onSave: function() {

		view = this.getView();
		
		//Obtenemos la tabla del view
		//var oTable = this.getView().byId("idEmployeeTable");
		
		//Para el Update -------------------------------------------------------------------------------------

		if (this.mode == "update") {

			var oId = view.byId("empId").getValue();
			var fname = view.byId("fnameId").getValue();
			var lname = view.byId("lnameId").getValue();
			var addrs = view.byId("addrsId").getValue();
			var desgn = view.byId("desgnId").getValue();

			OData.request({

				requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}

			},
				function(data, response) {

					header_xcsrf_token = response.headers['x-csrf-token'];
					OData.request
						({
							requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/ztableSet('" + oId + "')",
							method: "PUT",
							headers: {
								"X-Requested-With": "XMLHttpRequest",
								"Content-Type": "application/atom+xml",
								"DataServiceVersion": "2.0",
								"Accept": "application/atom+xml, application/atomsvc+xml, application/xml",
								"X-CSRF-Token": header_xcsrf_token
							},

							data:
								{
								Empno: oId,
								Fname: fname,
								Lname: lname,
								Addrs: addrs,
								Desgn: desgn,
								}
						},
						
						//mensaje de éxito
						function(data, response){
							
							//oTable.setBusy(true);
							
							//mensaje de éxito - Datos actualizados
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Data Updated Successfully", {
										icon: MessageBox.Icon.SUCCESS,
										title: "Updated",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										//onClose: function (oAction) { / * do something * / }
									}
								);
								
								//oTable.setBusy(false);
							}
							
					
							
							);
							
							//actualiza la lista con el ID del model
							view.getModel("empModel").refresh();
							
							view.byId("FormChange354").setVisible(false);
								
													
						},
						
						function(err){
							
							var request = err.request;
							var response = err.response;
							
							//mensaje de error
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
												MessageBox.show(
													"Error, Request: "+request+" Response: "+response, {
														icon: MessageBox.Icon.ERROR,
														title: "Update",
														actions: [MessageBox.Action.OK],
														emphasizedAction: MessageBox.Action.OK,
														onClose: function (oAction) { / * do something * / }
													}
												);
											});
						}
						
					);
				}
			)
		}
		
		// Para el create ----------------------------------------------------------------------------------
		
		else if (this.mode == "create") {
			
		
		    var oId = view.byId("empId").getValue();
			var fname = view.byId("fnameId").getValue();
			var lname = view.byId("lnameId").getValue();
			var addrs = view.byId("addrsId").getValue();
			var desgn = view.byId("desgnId").getValue();

			OData.request({

				requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}

			},
				function(data, response) {

					header_xcsrf_token = response.headers['x-csrf-token'];
					OData.request
						({
							requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/ztableSet",
							method: "POST",
							headers: {
								"X-Requested-With": "XMLHttpRequest",
								"Content-Type": "application/atom+xml",
								"DataServiceVersion": "2.0",
								"Accept": "application/atom+xml, application/atomsvc+xml, application/xml",
								"X-CSRF-Token": header_xcsrf_token
							},

							data:
								{
								Empno: oId,
								Fname: fname,
								Lname: lname,
								Addrs: addrs,
								Desgn: desgn,
								}
						},
						
						//mensaje de éxito
						function(data, response){
							
							//oTable.setBusy(true);
							
							//mensaje de éxito - Datos actualizados
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Data Created Successfully", {
										icon: MessageBox.Icon.SUCCESS,
										title: "Created",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										//onClose: function (oAction) { / * do something * / }
									}
								);
								
								//oTable.setBusy(false);
							}
							
					
							
							);
							
							//actualiza la lista con el ID del model
							view.getModel("empModel").refresh();
							
							view.byId("FormChange354").setVisible(false);
								
													
						},
						
						function(err){
							
							var request = err.request;
							var response = err.response;
							
							//mensaje de error
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
												MessageBox.show(
													"Error, Request: "+request+" Response: "+response, {
														icon: MessageBox.Icon.ERROR,
														title: "Create Error",
														actions: [MessageBox.Action.OK],
														emphasizedAction: MessageBox.Action.OK,
														onClose: function (oAction) { / * do something * / }
													}
												);
											});
						}
						
					);
				}
			)
			
			
	 	}
		
		//Para el delete --------------------------------------------------------------------------------------
		
		else if (this.mode == "delete") {
			

			OData.request({

				requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}

			},
				function(data, response) {

					header_xcsrf_token = response.headers['x-csrf-token'];
					OData.request
						({
							requestUri: "proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/ztableSet('" + deleteId + "')",
							method: "DELETE",
							headers: {
								"X-Requested-With": "XMLHttpRequest",
								"Content-Type": "application/atom+xml",
								"DataServiceVersion": "2.0",
								"Accept": "application/atom+xml, application/atomsvc+xml, application/xml",
								"X-CSRF-Token": header_xcsrf_token
							}
						},
						
						//mensaje de éxito
						function(data, response){
							
							//oTable.setBusy(true);
							
							//mensaje de éxito - Datos actualizados
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
								MessageBox.show(
									"Data Delete Successfully", {
										icon: MessageBox.Icon.SUCCESS,
										title: "Delete",
										actions: [MessageBox.Action.OK],
										emphasizedAction: MessageBox.Action.OK,
										//onClose: function (oAction) { / * do something * / }
									}
								);
								
								//oTable.setBusy(false);
							}
							
							);
							
							//actualiza la lista con el ID del model
							view.getModel("empModel").refresh();
							
							view.byId("FormChange354").setVisible(false);
								
													
						},
						
						function(err){
							
							var request = err.request;
							var response = err.response;
							
							//mensaje de error
							sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
												MessageBox.show(
													"Delete Error", {
														icon: MessageBox.Icon.ERROR,
														title: "Delete",
														actions: [MessageBox.Action.OK],
														emphasizedAction: MessageBox.Action.OK,
														onClose: function (oAction) { / * do something * / }
													}
												);
											});
						}
						
					);
				}
			)
			
			
	 	}
			
	}
});