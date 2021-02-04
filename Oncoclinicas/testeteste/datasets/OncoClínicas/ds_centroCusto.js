function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var codigo = "";
	var descricao = "";
	
	for ( var i in constraints) {
		if(constraints[i].fieldName == "CODIGO"){
			codigo = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "DESCRICAO"){
			descricao = constraints[i].initialValue;
		}
	}
	
	
	var resultObj = service.wscentrocusto(codigo, descricao);
	var result = resultObj.getWSRETCONSULTAS().toArray();
	
	for (var x in result) {
		dataset.addRow(new Array(result[x].getCODIGO(), result[x].getDESCRICAO()));
	}
	
	return dataset;
	
}