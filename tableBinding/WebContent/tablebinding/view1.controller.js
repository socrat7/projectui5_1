
sap.ui.controller("tablebinding.view1", {

	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	* @memberOf tablebinding.view1
	*/
	onInit: function() {

		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/vhcalnplci:8000/sap/opu/odata/sap/ZTABLE_SRV/");
		this.getView().setModel(oModel);

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
			alert("Please Select a Row")
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
			alert("Please Select a Row")
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

	},

	//Delete

	onDelete: function() {

	},

	//onMEssageSuccess

	onSuccessMessageDialogPress: function() {
		if (!this.oSuccessMessageDialog) {
			this.oSuccessMessageDialog = new Dialog({
				type: DialogType.Message,
				title: "Success",
				state: ValueState.Success,
				content: new Text({ text: "Data Updated Successfully" }),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: "OK",
					press: function() {
						this.oSuccessMessageDialog.close();
					}.bind(this)
				})
			});
		}

		this.oSuccessMessageDialog.open();
	},

	//onSave

	onSave: function() {

		view = this.getView();

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

						}


						);


				}
				//				function(err) {
				//					var request = err.request;
				//					var response = err.response;
				//					alert("Error in Get -- Request " + request + " Response " + response);
				//				}


			)

		}

	}

});