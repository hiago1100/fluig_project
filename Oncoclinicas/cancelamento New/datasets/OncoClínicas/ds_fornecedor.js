function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	dataset.addColumn("LOJA");
	dataset.addColumn("CGC");
	dataset.addColumn("BANCO");
	dataset.addColumn("AGENCIA");
	dataset.addColumn("DVAGENCIA");
	dataset.addColumn("CONTA");
	dataset.addColumn("DVCONTA");
	dataset.addColumn("CEP");
	dataset.addColumn("ENDERECO");
	dataset.addColumn("BAIRRO");
	dataset.addColumn("CODMUNICIPIO");
	dataset.addColumn("MUNICIPIO");
	dataset.addColumn("ESTADO");
	dataset.addColumn("DEPENDENTES");
	dataset.addColumn("TIPO");
	dataset.addColumn("EMAIL");

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var codigo = " ";
	var descricao = " ";
	var loja = " ";
	var cgc = " ";
	var tipo = " ";

		for ( var i in constraints) {
			if (constraints[i].fieldName == "CODIGO") {
				codigo = constraints[i].initialValue;
			}
			if (constraints[i].fieldName == "DESCRICAO") {
				descricao = constraints[i].initialValue;
			}
			if (constraints[i].fieldName == "LOJA") {
				loja = constraints[i].initialValue;
			}
			if (constraints[i].fieldName == "CGC") {
				cgc = constraints[i].initialValue;
			}
			if (constraints[i].fieldName == "TIPO") {
				tipo = constraints[i].initialValue;
			}
		}
			var resultObj = service.wsfornecedor(codigo, loja, descricao, cgc, tipo);
			var result = resultObj.getWSRETCONSULTAS().toArray();
			for (var x in result) {
				dataset.addRow(new Array(
						result[x].getCODIGO(),
						result[x].getDESCRICAO(),
						result[x].getLOJA(),
						result[x].getCGC(),
						result[x].getBANCO(),
						result[x].getAGENCIA(),
						result[x].getDVAGENCIA(),
						result[x].getCONTA(),
						result[x].getDVCONTA(),
						result[x].getCEP(),
						result[x].getENDERECO(),
						result[x].getBAIRRO(),
						result[x].getCODMUNICIPIO(),
						result[x].getMUNICIPIO(),
						result[x].getESTADO(),
						result[x].getNUMDEPENDENTES(),
						result[x].getTIPO(),
						result[x].getEMAIL()));
			}

	return dataset;
}