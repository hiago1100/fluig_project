//ATENCAO: arquivo modificado devido as especificidades do processo.
// se for utilizar, utilize o codigo que esta no formulario padrao FLUIG-XXXX

function publicaDocumentoGED(codigoProcesso, arquivoBytes)
{
	var dados = retornaUsuarioIntegracao('CSC');
	
	var user = dados.getValue(0,"USUARIO");
	var pass = dados.getValue(0,"SENHA");

	try
	{
		idPastaAnexos = hAPI.getCardValue("cpIdPastaPai");

		if(idPastaAnexos == '')
		{
			throw 'NÃO FOI POSSIVEL LOCALIZAR A PASTA PAI DO PROCESSO';
		}
		
		copiarAnexosGed(idPastaAnexos, arquivoBytes, user, pass);
	}
	catch(e)
	{
		throw('Erro publicar os anexos no GED. Processo - ' + codigoProcesso)
	}
}

function criarArvorePastasGed(parameters, idPastaPai)
{
	var nomePasta = '';
	var idNovaPasta;
	var arvorePastas = [];
	
	for(var i = 0; i < parameters.length; i++)
	{
		nomePasta = parameters[i];
		
		idNovaPasta = retornaPastaId(nomePasta, idPastaPai);
		
		idPastaPai =  idNovaPasta == '' ? criarPasta(idPastaPai, nomePasta) : idNovaPasta;
		
		arvorePastas.push(idPastaPai);
	}
	
	return arvorePastas;
}

function retornaPastaId(nomePastaACriar, idPastaPai)
{
	var filhos = retornaFilhos(idPastaPai);
	
	for(var j = 0; j < filhos.length; j++)
	{
		if(filhos[j]['description'] == nomePastaACriar)
		{
			return filhos[j]['id'];
		}
	}

	return '';
}

function retornaFilhos(idPastaPai)
{
	var dataset;
	var childs = [];
	var fields = ['documentPK.documentId', 'documentDescription'];
	
	var c1 = DatasetFactory.createConstraint('documentPK.companyId', 1,	1, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('parentDocumentId', idPastaPai,	idPastaPai, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('activeVersion', true,	true, ConstraintType.MUST);

	dataset = DatasetFactory.getDataset("document", fields, [c1,c2,c3,c4], null);
	
	for(var i=0; i<dataset.rowsCount; i++)
	{
		var id = dataset.getValue(i,'documentPK.documentId');
		var description = dataset.getValue(i,'documentDescription');
		var child = {'id': id, 'description': description};
		childs.push(child);
	}
	
	return childs;
}

function criarPasta(idPastaPai, nomePasta) 
{
	var newDocument = null;
	var docDto = docAPI.newDocumentDto();
	docDto.setDocumentType(1);
	docDto.setParentDocumentId(parseInt(idPastaPai));
	docDto.setDocumentDescription(nomePasta);
	docDto.setInheritSecurity(true);
	
	var dtosSecurity = new Array();
	var dtoAllUsersSecurity = docAPI.newDocumentSecurityConfigDto();
    dtoAllUsersSecurity.setAttributionType(3);
    dtoAllUsersSecurity.setAttributionValue(""); //Para todos os usuários deve-se passar vazio 
    dtoAllUsersSecurity.setPermission(true);
    dtoAllUsersSecurity.setShowContent(true);
    dtoAllUsersSecurity.setSecurityLevel(3);
	
    dtosSecurity.push(dtoAllUsersSecurity);
	
	newDocument = docAPI.createFolder(docDto, dtosSecurity, null);


	return newDocument.getDocumentId();
}

function copiarAnexosGed(idPastaAnexos, arquivo, user , pass)
{	
	
	var fileDecode = java.util.Base64.getDecoder().decode(new java.lang.String(arquivo).getBytes("UTF-8"));
	var periodicService = ServiceManager.getService('Fluig_ECMDocumentService');
	var serviceHelper = periodicService.getBean();
	
	var dataAtual = new Date();
	var dataString = dataAtual.getFullYear() +
							pad(dataAtual.getMonth() + 1) + 
							pad(dataAtual.getDate()) +
							pad(dataAtual.getHours()) +
							pad(dataAtual.getMinutes()) +
							pad(dataAtual.getSeconds());

	var filename = 'Documentos_Admissao'+dataString+'.pdf';
	var filenameDesc = 'Documentos_Admissao_' + dataString;
	
	var attachmentArray = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.AttachmentArray');
	
	var attachment = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.Attachment');
	var webServiceMessage = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.WebServiceMessage');
	attachment.setFileName(filename); 
	attachment.setAttach(true);
	attachment.setFilecontent(fileDecode);
	attachmentArray.getItem().add(attachment);
	
	var DMEngineServiceService = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService');
	var service = DMEngineServiceService.getDocumentServicePort();
	
	try 
	{
		var result = service.createSimpleDocument(user, pass, '1', idPastaAnexos, 'adm', filenameDesc , attachmentArray);	

		var webServiceMessage = result.getItem().get(0).getWebServiceMessage();
		var documentId = result.getItem().get(0).getDocumentId();
		
	   	if(webServiceMessage == "ok")
		{
			hAPI.attachDocument(documentId);
		}

		
		hAPI.setCardValue( "cpIntegracaoOcrDocumentoGedId", documentId);
		
	} 
	catch (error) 
	{
		log.dir(error);
		throw error;
	}
}

function retornaPastaPai(codigoProcesso)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1085', "'"+codigoProcesso+"'"], constraints, null);
	
	if(dados == null || dados.rowsCount == 0)
	{
        throw  "GED - FALHA AO BUSCAR A PASTA RAIZ DO PROCESSO." ;
    }
	
	return dados.getValue(0,"PASTA_RAIZ");		
}

function retornaUsuarioIntegracao(sistema)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_USUARIO_INTEGRACAO',"'"+sistema+"'"], constraints, null);
	
	if(dados == null || dados.rowsCount == 0)
	{
        throw  "FALHA AO BUSCAR OS USUARIOS DE INTEGRAÇÃO." ;
    }
	
	return dados;
}

