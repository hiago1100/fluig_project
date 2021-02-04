function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("FILIAL");
	dataset.addColumn("DOCUMENTO");
	dataset.addColumn("SERIE");
	dataset.addColumn("COD_CLIENTE");
	dataset.addColumn("LOJA_CLIENTE");
	dataset.addColumn("DESC_CLIENTE");
	dataset.addColumn("CGC");
	dataset.addColumn("DATA_EMISSAO");
	dataset.addColumn("VALOR");
	dataset.addColumn("BASE_PIS");
	dataset.addColumn("ALQ_PIS");
	dataset.addColumn("VALOR_PIS");
	dataset.addColumn("BASE_COFINS");
	dataset.addColumn("ALQ_COFINS");
	dataset.addColumn("VALOR_COFINS");
	dataset.addColumn("BASE_CSLL");
	dataset.addColumn("ALQ_CSLL");
	dataset.addColumn("VALOR_CSLL");
	dataset.addColumn("BASE_INSS");
	dataset.addColumn("ALQ_INSS");
	dataset.addColumn("VALOR_INSS");
	dataset.addColumn("BASE_IR");
	dataset.addColumn("ALQ_IR");
	dataset.addColumn("VALOR_IR");

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var filial = "";
	var documento = "";
	var serie = "";
	var cliente = "";
	var loja = "";
	var cgc = "";
	var valor = "";
	var dias = "";

	for ( var i in constraints) {
		if(constraints[i].fieldName == "FILIAL"){
			filial = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "DOCUMENTO"){
			documento = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "SERIE"){
			serie = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "COD_CLIENTE"){
			cliente = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "LOJA_CLIENTE"){
			loja = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "CGC"){
			cgc = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "VALOR"){
			valor = constraints[i].initialValue;
		}

		if(constraints[i].fieldName == "DIAS"){
			dias = constraints[i].initialValue;
		}
	}

	var resultObj = service.wsnotasfiscaissaida(filial, documento, serie, cliente, loja, cgc, valor, dias);
	var result = resultObj.getWSRETCONSULTAS().toArray();

	for (var x in result) {
		dataset.addRow(new Array(result[x].getFILIAL(),
									result[x].getDOCUMENTO(),
									result[x].getSERIE(),
									result[x].getCODCLIENTE(),
									result[x].getLOJACLIENTE(),
									result[x].getDESCCLIENTE(),
									result[x].getCGC(),
									result[x].getDTEMISSAO(),
									result[x].getVALOR(),
									result[x].getBASEPIS(),
									result[x].getALQPIS(),
									result[x].getVALORPIS(),
									result[x].getBASECOFINS(),
									result[x].getALQCOFINS(),
									result[x].getVALORCOFINS(),
									result[x].getBASECSLL(),
									result[x].getALQCSLL(),
									result[x].getVALORCSLL(),
									result[x].getBASEINSS(),
									result[x].getALQINSS(),
									result[x].getVALORINSS(),
									result[x].getBASEIR(),
									result[x].getALQIR(),
									result[x].getVALORIR()));
	}

	return dataset;

}