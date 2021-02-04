function servicetask13(attempt, message) {
	
try{ 
	var clientService = fluigAPI.getAuthorizeClientService(); 
	var data = {
	    companyId: getValue("WKCompany") + '', 
	    serviceCode: 'api_solicitacaocompra',
	    endpoint: '/rest/FLG_MATA030',
	    method: 'post',
	    timeoutService: '1000',
	    params:{	
				"StatusFluig": 1,
				"A1_NOME": "TESTE",
				"A1_CONTA": "1120101001",
				"A1_NATUREZ": "3010101",
				"A1_TPFRET": "C",
				"A1_BAIRRO": "Vila Barros",
				"A1_CEP": "72137331",
				"A1_COD_MUN": "50308",
				"A1_COMPLEM": "111111",
				"A1_CONTATO": "111111111",
				"A1_DDD": "11",
				"A1_EMAIL": "jde.xml2@casio.com.br",
				"A1_PESSOA": "J",
				"A1_XTEL2": "11111111",
				"A1_TEL": "1111111111",
				"A1_TIPO": "F",
				"A1_XEMLREP": "TESTE@TESTE.COM.BR",
				"A1_XGRPVEN": "000011",
				"A1_CGC": "47960950112868",
				"A1_END": "TESTE",
				"A1_EST": "SP",
				"A1_MUN": "São Paulo",
				"A1_NREDUZ": "Teste",
				"A1_XNRO": "11",
				"A1_PAIS": "105"
			
        }
    }	 			
	var vo = clientService.invoke(JSON.stringify(data));

	if(vo.getResult()== null || vo.getResult().isEmpty()){ 
		throw "Retorno está vazio"; 
	} 
		} catch(err) { 
			throw (err); 
	}
	
}