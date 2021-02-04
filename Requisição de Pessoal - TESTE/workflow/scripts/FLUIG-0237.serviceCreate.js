function ServiceCreate(serviceName,servicePath)
{
	var dados = buscaUsuarioIntegracaoRM();
	
	var USUARIO = dados.getValue(0, "USUARIO");
	var SENHA = dados.getValue(0, "SENHA");
	var SERVICO = ServiceManager.getServiceInstance(serviceName);
	var INSTANCIA = SERVICO.instantiate(servicePath);
	
	var WS = serviceName == 'HOST_WsDataServer' ? INSTANCIA.getRMIwsDataServer() : INSTANCIA.getRMIwsProcess();
	var nameSpace = serviceName == 'HOST_WsDataServer' ?  'com.totvs.IwsDataServer' : 'com.totvs.IwsProcess';

	var BEAN = SERVICO.getBean();
	
	return BEAN.getBasicAuthenticatedClient(WS, nameSpace, USUARIO, SENHA);	
}


function ReplaceParameters(xml, replacement)
{
	Object.keys(replacement).forEach(function(key) 
	{
		xml = xml.replace(replacement[key].xmlField, replacement[key].value);
	});
	
	return xml;
}

function getUrlXml(xmlName)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
    var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1070',""], constraints, null);
	var linkXml = '';

	for (var i = 0; i < dados.rowsCount; i++) 
	{
		var name = dados.getValue(i,"NOME");

		if(name == xmlName)
		{
			linkXml = dados.getValue(i,"LINK");
		} 
	}
	
	return linkXml;
}  