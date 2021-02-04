function registerWorkstation() 
{
	var coligadaSistema = 'CODCOLIGADA=1;CODSISTEMA=P';
	var email = 'fluig@direcional.com.br';

	var linkUrl = getUrlXml("postoTrabalho");

	var url = new java.net.URL(linkUrl);

	var xml = XmlRead(url);

	var dt = new Date();
	dt = dt.toISOString();

	var replacement =
		[
			{ xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCadastroKitCodColigada") },
			{ xmlField: "[CodPosto]", value: hAPI.getCardValue("cpCodNomePostoTrabalho") },
			{ xmlField: "[Chapa]", value: hAPI.getCardValue("cpCadastroKitMatricula") },
			{ xmlField: "[Descricao]", value: hAPI.getCardValue("cpReqNomePostoTrabalho") },
			{ xmlField: "[data]", value: dt },
		];

	xml = replaceParameters(xml, replacement);

	var service = ServiceCreate('HOST_WsDataServer', 'com.totvs.WsDataServer')

	var result = service.saveRecordEmail('SmtPostosTrabalhoData', xml, coligadaSistema, email);

	if ((result != null) && (result.indexOf("===") != -1)) 
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}