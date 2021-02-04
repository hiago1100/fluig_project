function ServiceCreate(serviceName,servicePath)
{
	var retorno;
	var USUARIO = "srv_fluig";
	var SENHA = "XADMfluig2014";
	var SERVICO = ServiceManager.getServiceInstance(serviceName);
	var INSTANCIA = SERVICO.instantiate(servicePath);
	
	if (serviceName == 'HOST_WsDataServer')
	{
		var WS = INSTANCIA.getRMIwsDataServer();
		var nameSpace =  'com.totvs.IwsDataServer';
	}
	else
	{
		var WS = INSTANCIA.getRMIwsProcess();
		var nameSpace =  'com.totvs.IwsProcess';
	}
	
	try
	{
		var BEAN = SERVICO.getBean();	
		retorno = BEAN.getBasicAuthenticatedClient(WS, nameSpace, USUARIO, SENHA);	
	}
	catch(e)
	{
		log.error(e.message);
		log.dir(e)
		throw e.message;
	}
	
	return retorno
}

function DataConverteRMService(data)
{
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('DataConverteRMService: ' + data);
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var formatoInput = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var formatoOutput = new java.text.SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");
	
	return formatoOutput.format(formatoInput.parse(data)).replace("T12","T00");
}


function ReplaceParameters(xml, replacement)
{
	log.warn('INICIANDO ReplaceParameters');
	Object.keys(replacement).forEach(function(key) 
	{
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('replacement[key].xmlField' + replacement[key].xmlField);
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('replacement[key].value' + replacement[key].value);
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
		xml = xml.replace(replacement[key].xmlField, replacement[key].value);
	});
	
	return xml;
}