function kaptureOCREnvioSolicitacao()
{
	log.warn("XXX ANDERSON");

	var numeroSolicitacao = '' + hAPI.getCardValue("cpNumeroSolicitacao") + '';
	var codigoColigada =  '' +hAPI.getCardValue("cpReqCodEmpresa") +'';
	var codigoSecao = '' + hAPI.getCardValue("cpReqCodSecao")  + '';
	var descricaoSecao = '' + hAPI.getCardValue("cpReqDepartamentoObra") + '';
	var codigoFuncao =  ''+ hAPI.getCardValue("cpReqCodFuncao") + '';
	var descricaoFuncao = '' + hAPI.getCardValue("cpReqFuncao") + '';
	var tipoSecao = '' + hAPI.getCardValue("cpCodObra") + '';
	
	var clientService = fluigAPI.getAuthorizeClientService();
	
	var solicitacao = {
	          "numero_solicitacao": numeroSolicitacao,
	          "codigo_coligada": codigoColigada,
	          "codigo_secao": codigoSecao,
	          "descricao_secao": descricaoSecao,
	          "codigo_funcao": codigoFuncao,
	          "descricao_funcao": descricaoFuncao,
	          "tipo_secao": tipoSecao
		     }

	var objReturn = {"solicitacao": [solicitacao]};

	log.warn("XXX ANDERSON");

	log.dir(objReturn);
	
	var data = {
			companyId: getValue("WKCompany") + '',
			serviceCode: "Kapture_OCR_envio_da_solicitacao",
			endpoint: "/api/obras",
			method: "post",
			timeoutService: "100",
			params: objReturn,
			options:
			{
				encoding: "UTF-8",
				mediaType: "application/json",
				 useSSL : true
			},
			headers:
			{
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
	
	try
	{
		var vo = clientService.invoke(JSON.stringify(data));
	}
	catch(e)
	{
		log.dir(e);
		throw "Erro ao invocar o serviço";
	}

	if (vo.getResult() == null || vo.getResult().isEmpty()) 
	{
		hAPI.setCardValue( "cpIntegracaoOcrEnvio", "0");
		throw "O objeto de retorno do serviço está vazio";
	}
	else
	{
		if(vo.getResult().sucesso == 'false')
		{
			hAPI.setCardValue( "cpIntegracaoOcrEnvio", "0");
			throw "o serviço retornou falha no inclusão";
		}
	}

	hAPI.setCardValue( "cpIntegracaoOcrEnvio", "1");
}

function kaptureOCRRecebimento()
{
	var data = {
		companyId : getValue("WKCompany") + '',
		serviceCode : 'Kapture_OCR_retorno_documentos',
		endpoint : '/api/resultado/listar/' + getValue("WKNumProces"),
		method : 'get',
		timeoutService: '100' // segundos
	}

	try
	{
		var vo = clientService.invoke(JSON.stringify(data));
	}
	catch(e)
	{
		throw "Erro ao invocar o serviço";
		log.dir(e);
	}

	if (vo.getResult() == null || vo.getResult().isEmpty()) 
	{
		hAPI.setCardValue( "cpIntegracaoOcrDocumento", "0");
		throw "O objeto de retorno do serviço está vazio";
	}
	else
	{
		if(vo.getResult().sucesso == 'false')
		{
			hAPI.setCardValue( "cpIntegracaoOcrDocumento", "0");
			throw "o serviço retornou falha no inclusão";
		}
	}

	hAPI.setCardValue( "cpIntegracaoOcrDocumento", "1");
	var arquivoBytes =  ""
	var parameters = null;
	var cpf = hAPI.getCardValue("cpCadExternoCpf");
	var secao = hAPI.getCardValue("cpReqDepartamentoObra");
	var processoDescricao = 'Cadastro de colaboradores'

	var	parameters = [{cpf: cpf },
						{secao: secao},
						{processo: processoDescricao} 
						];
						  
	publicaDocumentoGED(parameters, getValue("WKDef"), arquivoBytes)

}

function kaptureOCRExcluir(atividade)
{
	if(atividade == 321 || atividade == 87)
	{
		var numeroSolicitacao = '' + hAPI.getCardValue("cpNumeroSolicitacao") + '';
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var solicitacao = {
				  "numero_solicitacao": numeroSolicitacao
				 }
	
		var objReturn = {"solicitacao": [solicitacao]};
		
		var data = {
				companyId: getValue("WKCompany") + '',
				serviceCode: "Kapture_OCR_exclusao_da_solicitacao",
				endpoint: "/api/obras",
				method: "post",
				timeoutService: "100",
				params: objReturn,
				options:
				{
					encoding: "UTF-8",
					mediaType: "application/json",
					 useSSL : true
				},
				headers:
				{
					'Content-Type': 'application/json; charset=utf-8'
				}
			}
		
		try
		{
			var vo = clientService.invoke(JSON.stringify(data));
		}
		catch(e)
		{
			throw "Erro ao invocar o serviço";
			log.dir(e);
		}
	
		if (vo.getResult() == null || vo.getResult().isEmpty()) 
		{
			hAPI.setCardValue( "cpIntegracaoOcrEnvio", "0");
			throw "O objeto de retorno do serviço está vazio";
		}
		else
		{
			if(vo.getResult().sucesso == 'false')
			{
				hAPI.setCardValue( "cpIntegracaoOcrEnvio", "0");
				throw "o serviço retornou falha no inclusão";
			}
		}
	
		hAPI.setCardValue( "cpIntegracaoOcrExclusao", "1");
	}
}