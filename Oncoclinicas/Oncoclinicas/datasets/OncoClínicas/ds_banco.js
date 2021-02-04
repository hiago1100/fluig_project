function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("FILIAL");
	dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	dataset.addColumn("AGENCIA");
	dataset.addColumn("CONTA");

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var filial = "";
	var codigo = "";
	var descricao = "";
	var agencia = "";
	var conta = "";
	
	if(constraints != undefined && constraints != '' && constraints != null){
		for ( var i in constraints) {
	
			if(constraints[i].fieldName == "FILIAL"){
				filial = constraints[i].initialValue;
			}
			
			if(constraints[i].fieldName == "CODIGO"){
				codigo = constraints[i].initialValue;
			}
	
			if(constraints[i].fieldName == "DESCRICAO"){
				descricao = constraints[i].initialValue;
			}
			
			if(constraints[i].fieldName == "AGENCIA"){
				agencia = constraints[i].initialValue;
			}
	
			if(constraints[i].fieldName == "CONTA"){
				conta = constraints[i].initialValue;
			}
			
			var resultObj = service.wsbanco(filial, codigo, descricao, agencia, conta);
			var result = resultObj.getWSRETCONSULTAS().toArray();
			
			for (var x in result) {
				dataset.addRow(new Array(result[x].getFILIAL(), result[x].getCODIGO(), result[x].getDESCRICAO(), result[x].getAGENCIA(), result[x].getCONTA()));
			}
		}
	} else {
	
		var resultObj = service.wsbanco(filial, codigo, descricao, agencia, conta);
		var result = resultObj.getWSRETCONSULTAS().toArray();
		
		for (var x in result) {
			dataset.addRow(new Array(result[x].getFILIAL(), result[x].getCODIGO(), result[x].getDESCRICAO(), result[x].getAGENCIA(), result[x].getCONTA()));
		}
		
	}
	
	return dataset;
	
}