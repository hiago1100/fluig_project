var codEmpresaFluig = getValue("WKCompany") + '';
var tempoLimite = "100";
var msgErroPadrao = "ERRO AO INVOCAR O SERVIÇO DO OCR - ANALISAR O LOG PARA MAIS DETALHES";

function kaptureOCRReenvioSolicitacao()
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('kaptureOCRReenvioSolicitacao');


	var campoRegistro = 'cpIntegracaoOcReenvio';
	var metodoAssinatura = "kaptureOCRReenvioSolicitacao";
	var numeroSolicitacao = '' + hAPI.getCardValue("cpNumeroSolicitacao") + '';
	var parecerCadastroKit = '' + hAPI.getCardValue("cpParecerCadastroKit") + '';
	
	var solicitacao = {
		"numero_solicitacao": numeroSolicitacao,
		"nome_usuario_requisitente": "de0185387",
		"observacao": parecerCadastroKit
	}

	var data = {
		companyId: codEmpresaFluig,
		serviceCode: "Kapture_OCR_reenvio_da_solicitacao",
		endpoint: "/api/vagas/ReiniciarVaga",
		method: "post",
		timeoutService: tempoLimite,
		params: solicitacao,
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

	if(numeroSolicitacao == '' || parecerCadastroKit == '')
	{
		var error = 'erro ao montar o json de envio para o ocr';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}
	
	try
	{
		var clientService = fluigAPI.getAuthorizeClientService();
		var vo = clientService.invoke(JSON.stringify(data));
	}
	catch(error)
	{
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	hAPI.setCardValue(campoRegistro, "1");

}

function kaptureOCREnvioSolicitacao()
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('kaptureOCREnvioSolicitacao');

	var campoRegistro = 'cpIntegracaoOcrEnvio';
	var metodoAssinatura = 'kaptureOCREnvioSolicitacao';

	if(hAPI.getCardValue(campoRegistro) == '1')
	{
		kaptureOCRReenvioSolicitacao();
		return;
	}
	
	var numeroSolicitacao = '' + hAPI.getCardValue("cpNumeroSolicitacao") + '';
	var codigoColigada =  '' +hAPI.getCardValue("cpReqCodEmpresa") +'';
	var codigoSecao = '' + hAPI.getCardValue("cpReqCodSecao")  + '';
	var descricaoSecao = '' + hAPI.getCardValue("cpReqDepartamentoObra") + '';
	var codigoFuncao =  ''+ hAPI.getCardValue("cpReqCodFuncao") + '';
	var descricaoFuncao = '' + hAPI.getCardValue("cpReqFuncao") + '';
	var tipoSecao = '' + hAPI.getCardValue("cpCodObra") + '';

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
	
	var data = {
			companyId: codEmpresaFluig,
			serviceCode: "Kapture_OCR_envio_da_solicitacao",
			endpoint: "/api/obras",
			method: "post",
			timeoutService: tempoLimite,
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

	if(numeroSolicitacao == '' || codigoColigada == '' || codigoSecao == '' || descricaoSecao == ''
	|| codigoFuncao == '' || descricaoFuncao == '' || tipoSecao == '')
	{
		var error = 'erro ao montar o json de envio para o ocr';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	log.warn('kaptureOCREnvioSolicitacao ' + numeroSolicitacao);
	log.warn('JSON');
	log.dir(data);
	
	try
	{
		var clientService = fluigAPI.getAuthorizeClientService();
		var vo = clientService.invoke(JSON.stringify(data));
	}
	catch(error)
	{
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	log.warn('JSON');
	log.dir(vo.getResult());
	
	if (vo.getResult() == null || vo.getResult().isEmpty()) 
	{
		var error = 'O objeto de retorno do serviço está vazio';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	if(vo.getResult().sucesso == 'false')
	{
		var error = 'o serviço retornou falha no inclusão';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	hAPI.setCardValue(campoRegistro, "1");
}

function kaptureOCRRecebimento()
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('kaptureOCRRecebimento');
	
	var campoRegistro = 'cpIntegracaoOcrDocumento';
	var metodoAssinatura = 'kaptureOCRRecebimento';

	if(hAPI.getCardValue( "cpIntegracaoOcrEnvio") != '1')
	{
		hAPI.setCardValue(campoRegistro, "0");
		var error = 'o envio da solicitação para o OCR falhou numa atividade anterior, impossivel recolher a documentação';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	var data = {
		companyId : codEmpresaFluig,
		serviceCode : 'Kapture_OCR_retorno_documentos',
		endpoint : '/api/resultado/listar/' + getValue("WKNumProces"),
		method : 'get',
		timeoutService: tempoLimite
	}

	log.warn(data);

	try
	{
		var clientService = fluigAPI.getAuthorizeClientService();
		var vo = clientService.invoke(JSON.stringify(data));
	}
	catch(error)
	{
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	if (vo.getResult() == null || vo.getResult().isEmpty() || parseInt(vo.getHttpStatusResult()) == '204') 
	{
		var error = 'O objeto de retorno do serviço está vazio';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}
	
	var retorno = JSON.parse(vo.getResult());

	log.warn(retorno);

	var arquivoBytes =  retorno.ArquivoPdf;
	var arquivoJson =  JSON.stringify(retorno.ArquivoJson);

	if (arquivoBytes == '' || arquivoBytes == null || arquivoBytes == undefined)
	{
		var error = 'o arquivo com os documentos está vazio';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	if (arquivoJson == '' || arquivoJson == null || arquivoJson == undefined)
	{
		var error = 'o json com as informações do documento está vazio';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	var parametro = getValue("WKNumProces") + ",'" + arquivoBytes  + "'," + "'" + arquivoJson + "'" ;

	try 
	{
		var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
		var constraints = new Array(c);
		DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_OCR_DOCUMENTACAO_INSERT', parametro], constraints, null);
	} 
	catch (error) 
	{
		var error = 'ocorreu ao ao registrar as informações de retorno no banco de dados';
		errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
		throw msgErroPadrao;
	}

	hAPI.setCardValue(campoRegistro, "1");

}

function kaptureOCRExcluir(atividade)
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('kaptureOCRExcluir');

	if(atividade == 321 || atividade == 87 || atividade == 91)
	{
		var campoRegistro = 'cpIntegracaoOcrExclusao';
		var metodoAssinatura = 'kaptureOCRExcluir';
		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		var data = {
				companyId: codEmpresaFluig,
				serviceCode: "Kapture_OCR_excluir_vaga",
				endpoint: "/api/vagas/" + getValue("WKNumProces"),
				method: "delete",
				timeoutService: tempoLimite
			}
		
		try
		{
			clientService.invoke(JSON.stringify(data));
		}
		catch(error)
		{
			errorRegister(data, error, msgErroPadrao, metodoAssinatura, campoRegistro);
			throw msgErroPadrao;
		}
	
		hAPI.setCardValue(campoRegistro, "1");
	}
}

function errorRegister(data, error, msg, metodo, campo)
{
	hAPI.setCardValue(campo, "0");

	log.error('#####################################################################');
	log.error('FLUIG-0237 - CADASTRO DE COLABORADORES - INTEGRAÇÃO OCR');
	log.error('N. SOLICITAÇÃO ' + getValue("WKNumProces"));
	log.error('ERRO AO INVOCAR O SERVIÇO DO OCR - ' + metodo);
	log.error('JSON ENVIADO');
	log.dir(data);
	log.error('STACK TRACE');
	log.dir(error);
	log.error('MENSAGEM');
	log.dir(msg);
	log.error('#####################################################################');
}