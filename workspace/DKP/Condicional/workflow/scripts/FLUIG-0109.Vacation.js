var coligadaSistema = 'CODCOLIGADA=1;CODSISTEMA=P';

function RegisterVacation(dataInicioFerias, dataFimFerias, quantidadeDias)
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('RegisterVacation'); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var url = new java.net.URL("http://csc.direcional.com.br/compartilhados/xml/CadastraFerias.txt");
	var xml = XmlRead(url);
	
	//var dataPagamento = addDays(dataInicioFerias,-3);
	
	var dataPagamento = hAPI.getCardValue("cpDataPagamento");
	
	var replacement = 
		[
			{xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodColigadaSolicitante")},
			{xmlField: "[Chapa]", value: hAPI.getCardValue("cpColaboradorMatricula")},
			{xmlField: "[DataFimPeriodoAquisitivo]", value: DataConverteRMService(hAPI.getCardValue("cpFimPeriodoAquisitivo"))},
			{xmlField: "[DataPagamento]", value: DataConverteRMService(dataPagamento)},
			{xmlField: "[DataInicioFerias]", value: DataConverteRMService(dataInicioFerias)},
			{xmlField: "[DataFimFerias]", value: DataConverteRMService(dataFimFerias)},
			{xmlField: "[DataAviso]", value: DataConverteRMService(dataFimFerias)},
			{xmlField: "[NumeroDiasFerias]", value: quantidadeDias},
			{xmlField: "[NumeroDiasAbono]", value: hAPI.getCardValue("cpDiasAbono")},
			{xmlField: "[TemAbono]", value: hAPI.getCardValue("cpHaveraAbono")},
			{xmlField: "[Antecipa13Salario]", value: hAPI.getCardValue("cpAntecipar13Salario")}
		];
	
	xml = ReplaceParameters(xml, replacement);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('xml: ' + xml); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

	var service = ServiceCreate('HOST_WsDataServer','com.totvs.WsDataServer')
	
	var result = service.saveRecord('FopFuFeriasPerDataBR', xml, coligadaSistema);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}

function ReceiptVacation()
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('ReceiptVacation'); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var url = new java.net.URL("http://csc.direcional.com.br/compartilhados/xml/ReciboFerias.txt");
	var xml = XmlRead(url);
	
	//var dataPagamento = addDays(dataInicioFerias,-3);
	
	var dataPagamento = hAPI.getCardValue("cpDataPagamento");
	
	var replacement = [{xmlField: "[Chapa]", value: hAPI.getCardValue("cpColaboradorMatricula")},
		{xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodColigadaSolicitante")},
		{xmlField: "[DataFimPeriodoAquisitivo]", value: DataConverteRMService(hAPI.getCardValue("cpFimPeriodoAquisitivo"))},
		{xmlField: "[DataPagamento]", value: DataConverteRMService(dataPagamento)}]
	
	xml  = ReplaceParameters(xml, replacement);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('xml: ' + xml); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var service = ServiceCreate('HOST_WsDataServer','com.totvs.WsDataServer')
	var result = service.saveRecord('FopFuFeriasReciboData', xml, coligadaSistema);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}

function CalculateVacations(dataInicioFerias,dataFimFerias)
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('CalculateVacations'); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var url = new java.net.URL("http://csc.direcional.com.br/compartilhados/xml/CalculaFerias.txt");
	var xml = XmlRead(url);
	
	var replacement = [{xmlField: "[Chapa]", value: hAPI.getCardValue("cpColaboradorMatricula")},
		{xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodColigadaSolicitante")},
		{xmlField: "[DataFimPeriodoAquisitivo]", value: DataConverteRMService(hAPI.getCardValue("cpFimPeriodoAquisitivo"))},
		{xmlField: "[DataPagamento]", value: DataConverteRMService(hAPI.getCardValue("cpDataPagamento"))}];
	
	xml = ReplaceParameters(xml, replacement);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('xml: ' + xml); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var service = ServiceCreate('HOST_WsProcess','com.totvs.WsProcess')
	var result =  service.executeWithXmlParams('FopCalculaFeriasProcess', xml);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}

function CancelVacation(dataInicioFerias,dataFimFerias)
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('CalculateVacations'); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var url = new java.net.URL("http://csc.direcional.com.br/compartilhados/xml/CancelarFerias.txt");
	var xml = XmlRead(url);
	
	var replacement = [{xmlField: "[Chapa]", value: hAPI.getCardValue("cpColaboradorMatricula")},
		{xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodColigadaSolicitante")},
		{xmlField: "[DataFim]", value: DataConverteRMService(dataFimFerias)},
		{xmlField: "[DataInicio]", value: DataConverteRMService(dataInicioFerias)}];
	
	xml  = ReplaceParameters(xml, replacement);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('xml: ' + xml); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

	var result =  ServiceCreate('HOST_WsProcess','com.totvs.WsProcess').executeWithXmlParams('FopCancelaFeriasProcess', xml);
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.error('result: ' + result); //TODO: retirar ao subir para produção
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	if ((result != null) && (result.indexOf("===") != -1))
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}

