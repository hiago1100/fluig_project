function servicetask291(attempt, message) 
{
	try 
	{
		log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
		log.warn('servicetask291');
		log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
		
		var cpf = hAPI.getCardValue("cpCadExternoCpf");
		var secao = hAPI.getCardValue("cpReqDepartamentoObra");
		var descProcesso = retornaDescricaoProcesso(getValue("WKDef"));
		
		log.warn(cpf);
		log.warn(secao);
		log.warn(descProcesso);
		log.warn(getValue("WKDef"));
		
		
		var	parameters = [{pasta: cpf},
			              {pasta: secao},
			              {pasta: descProcesso}];
		
		//publicaDocumentoGED(parameters,getValue("WKDef"));
	} 
	catch(error) 
	{ 
		log.error(error);
		throw error;
	}
}