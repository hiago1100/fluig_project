function createDataset(fields, constraints, sortFields) {

	log.info("##### INICIO - TESTE DS PEDRO #####");

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("FECHADO");
	dataset.addColumn("MENSAGEM");
	dataset.addColumn("SALDO");
	dataset.addColumn("SUCESSO");

	var periodicService = ServiceManager.getService("ws_FechamentoCaixa");
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa_apw.WSFECHAMENTOCAIXA");
	var service = serviceLocator.getWSFECHAMENTOCAIXASOAP();

	var dados = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsfechamentocaixa.WSDADOSCAIXAGERAL");
	dados.setFILIAL("00401")

	var resultObj = service.wssaldocaixa(dados);
	var result = resultObj.getWSRETCAIXAGERAL().get(0);

	log.info("##### FIM - TESTE DS PEDRO #####");

	dataset.addRow(new Array(result.getFECHADO(),
								result.getMENSAGEM(),
								result.getSALDO(),
								result.getSUCESSO()));

	return dataset;

}