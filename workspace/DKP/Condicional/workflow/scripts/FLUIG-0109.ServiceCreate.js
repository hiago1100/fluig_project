function ServiceCreate(serviceName,servicePath)
{
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
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('WS: ' + WS);
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('nameSpace: ' + nameSpace);
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	
	var BEAN = SERVICO.getBean();
	
	return BEAN.getBasicAuthenticatedClient(WS, nameSpace, USUARIO, SENHA);	
}

//converte a data pro prodrão que o webservice do rm quer receber  yyyy-MM-dd'T'hh:mm:ss
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