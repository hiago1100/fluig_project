var coligadaSistema = 'CODCOLIGADA=1;CODSISTEMA=P';
var email = 'fluig@direcional.com.br';

function RegisterWorkstation() 
{
	log.error('RegisterWorkstation');
	
	var linkUrl = getUrlXml("postoTrabalho");
	
	log.error(linkUrl);

	var url = new java.net.URL(linkUrl);

	var xml = XmlRead(url);
	
	var dt = new Date();
	dt = dt.toISOString();

	var replacement =
		[
			{ xmlField: "[CodColigada]", value: hAPI.getCardValue("cpCodColigada") },
			{ xmlField: "[CodPosto]", value: hAPI.getCardValue("cpCodigoPostoTrabalho") },
			{ xmlField: "[Chapa]", value: hAPI.getCardValue("cpMatriculaKitGerado") },
			{ xmlField: "[Descricao]", value: hAPI.getCardValue("cpNomePostoTrabalho") },
			{ xmlField: "[data]", value: dt },
		];

	xml = ReplaceParameters(xml, replacement);

	log.error('xml: ' + xml); //TODO: retirar ao subir para produção

	var service = ServiceCreate('HOST_WsDataServer', 'com.totvs.WsDataServer')

	//var result = service.saveRecord('SmtPostosTrabalhoData', xml, coligadaSistema);
	var result = service.saveRecordEmail('SmtPostosTrabalhoData', xml, coligadaSistema, email);

	log.error('result: ' + result); //TODO: retirar ao subir para produção

	if ((result != null) && (result.indexOf("===") != -1)) 
	{
		var msgErro = result.substring(0, result.indexOf("==="));
		throw msgErro;
	}
}