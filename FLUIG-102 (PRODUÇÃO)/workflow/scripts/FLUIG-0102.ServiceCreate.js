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

function getUrlXml(xmlName){
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
    var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1070',""], constraints, null);
	var linkXml = '';

	for (var i = 0; i < dados.rowsCount; i++) {
		var name = dados.getValue(i,"NOME");

		if(name == xmlName)
		{
			linkXml = dados.getValue(i,"LINK");
		} 
	}
	return linkXml;
}  