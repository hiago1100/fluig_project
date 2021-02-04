function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetFactory.newDataset();
	
	dataset.addColumn("FECHADO");
	dataset.addColumn("MENSAGEM");
	dataset.addColumn("SALDO");
	dataset.addColumn("SUCESSO");
	
	
	var	periodicService = ServiceManager.getService('ws_FechamentoCaixa');
	var serviceHelper = periodicService.getBean();
	// GET
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsfechamentocaixa_apw.WSFECHAMENTOCAIXA');
	var service = serviceLocator.getWSFECHAMENTOCAIXASOAP();
	// SET + FILIAL PARAMETRO
	var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa.WSDADOSCAIXAGERAL");
 	

	var filial = "";	
	
	for ( var i in constraints) {
		if(constraints[i].fieldName == "FILIAL"){
			filial = constraints[i].initialValue;
		}
	}
 	
 	dados.setFILIAL(filial);
	
	var resultObj = service.wssaldocaixa(dados);
	var result = resultObj.getWSRETCAIXAGERAL().get(0);
	
	dataset.addRow(new Array(result.getFECHADO(),
			result.getMENSAGEM(),
			result.getSALDO(),
			result.getSUCESSO()));
	
	return dataset;
	
}


