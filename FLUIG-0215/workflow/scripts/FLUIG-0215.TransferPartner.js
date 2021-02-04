var coligadaSistema = 'CODCOLIGADA=1;CODSISTEMA=P';

function registerTransfer(chapa)
{
	log.error('registerTransfer'); //TODO: retirar ao subir para produção
	
	//var url = new java.net.URL("https://csc.direcional.com.br/scripts/xml/dadosTransferencia.txt");
	
	// var xmlAux = "<FopFunc>"+
	// 		  "<PFunc>"+
	// 		    "<CODCOLIGADA>"+hAPI.getCardValue("cpCodEmpressaDestino")+"</CODCOLIGADA>"+
	// 		    "<CHAPA>"+ chapa+"</CHAPA>"+
	// 		    "<CODSECAO>"+ hAPI.getCardValue("codSecaoDestino")+"</CODSECAO>"+
	// 		  "</PFunc>"+
	// 		"</FopFunc>";

	log.info("CHAPA INTEGRA REGISTER TRANSFER "+ chapa);

  var xml = "<FopFunc>"+
			  "<PFunc>"+
			    "<CODCOLIGADA>1</CODCOLIGADA>"+
			    "<CHAPA>"+chapa+"</CHAPA>"+
			    "<CODSECAO>01.1.00001.23.003</CODSECAO>"+
			  "</PFunc>"+
			"</FopFunc>";

	log.info("XML integra "+ xml);



	 // var xml = XmlRead(xmlAux);
	
	// var replacement = 
	// 	[
	// 		{xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodEmpressaDestino")},
	// 		{xmlField: "[chapa]", value: chapa},
	// 		{xmlField: "[codSecao]", value:},
	// 		{xmlField: "[nomeSecao]", value: hAPI.getCardValue("cpObraDpDestino")},
	// 	];




	
	// xml = ReplaceParameters(xml, replacement);
		
	// log.error('xml: ' + xml); //TODO: retirar ao subir para produção

	var service = ServiceCreate('HOST_WsDataServer','com.totvs.WsDataServer')
	
	
	var result = service.saveRecord('FopFuncData', xml, coligadaSistema);
	
	
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}

function processTransfer(chapa)
{
	log.error('processTransfer'); //TODO: retirar ao subir para produção
	var dateIntegration = new Date();
	dateIntegration = dateIntegration.getDate() + "/" + (dateIntegration.getMonth()+1) + "/"+ dateIntegration.getFullYear();
	
	var url = new java.net.URL("https://csc.direcional.com.br/scripts/xml/processamentoTransferencia.txt");
	var xml = XmlRead(url);

	
	var replacement = 
		[
			{xmlField: "[codColigada]", value: hAPI.getCardValue("cpCodEmpressaDestino")},
			{xmlField: "[chapa]", value: chapa},
			{xmlField: "[dataMudanca]", value: DataConverteRMService(dateIntegration)},
			{xmlField: "[codMotivo]", value: "02"},//cod 02 Transfêrencia
			{xmlField: "[codSecao]", value: hAPI.getCardValue("codSecaoDestino")},
		];
	
	xml = ReplaceParameters(xml, replacement);
		
	log.error('xml: ' + xml); //TODO: retirar ao subir para produção

	var service = ServiceCreate('HOST_WsDataServer','com.totvs.WsDataServer')
	
	var result = service.saveRecord('Fopfhstsecdata', xml, coligadaSistema);
	
	
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}