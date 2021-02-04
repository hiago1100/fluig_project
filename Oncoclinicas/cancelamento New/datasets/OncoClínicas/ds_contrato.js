function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("FILIAL");
	dataset.addColumn("CONTRATO");
	dataset.addColumn("REVISAO");
	dataset.addColumn("COD_PAGTO");
	dataset.addColumn("DESC_PAGTO");
	dataset.addColumn("SALDO");
	dataset.addColumn("COD_AREA");
	dataset.addColumn("DESC_AREA");

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var filial = "";
	var email = "";
	var fornecedor = "";
	var loja = "";

	for ( var i in constraints) {

		if(constraints[i].fieldName == "FILIAL"){
			filial = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "EMAIL"){
			email = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "FORNECEDOR"){
			fornecedor = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "LOJA"){
			loja = constraints[i].initialValue;
		}
	}

	var resultObj = service.wscontrato(filial, email, fornecedor, loja);
	var result = resultObj.getWSRETCONSULTAS().toArray();

	for (var x in result) {
		dataset.addRow(new Array(result[x].getFILIAL(),
									result[x].getCONTRATO(),
									result[x].getREVISAO(),
									result[x].getCODPAGTO(),
									result[x].getDESCPAGTO(),
									result[x].getSALDO(),
									result[x].getCODAREA(),
									result[x].getDESCAREA()));
	}

	return dataset;

}