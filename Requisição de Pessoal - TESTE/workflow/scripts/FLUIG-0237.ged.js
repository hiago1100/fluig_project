function publicaDocumentoGED(arvorePastas, codigoProcesso, arquivoBytes)
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('publicaDocumentoGED');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	var dados = retornaUsuarioIntegracao('CSC');
	
	log.warn('Usuarios da integração CSC');
	log.dir(dados);
	
	var user = dados.getValue(0,"USUARIO");
	var pass = dados.getValue(0,"SENHA");
	
	var idPastaPai = retornaPastaPai(codigoProcesso);
	
	log.warn('Id da pasta pai de processo');
	log.warn(idPastaPai);

	try
	{
		var idPastaAnexos = '1';
		
		var array = criarArvorePastasGed(arvorePastas, idPastaPai);
		
		idPastaAnexos = array[array.length - 1];
		
		log.warn('Id da pasta onde serão publicados os documentos');
		log.warn(idPastaAnexos);
		
		copiarAnexosGed(idPastaAnexos, arquivoBytes, user, pass);
	}
	catch(e)
	{
		throw('Erro publicar os anexos no GED. Processo - ' + codigoProcesso)
	}
}

function criarArvorePastasGed(parameters, idPastaPai)
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('criarArvorePastasGed');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	var nomePasta = '';
	var idNovaPasta;
	var arvorePastas = [];
	
	for(var i = 0; i < parameters.length; i++)
	{
		nomePasta = parameters[i]['pasta'];
		
		log.warn('nomePasta');
		log.warn(nomePasta);
		
		log.warn('idPastaPai');
		log.warn(idPastaPai);
		
		idNovaPasta = retornaPastaId(nomePasta, idPastaPai);
		
		log.warn('idNovaPasta');
		log.warn(idNovaPasta);
		
		idPastaPai =  idNovaPasta == '' ? criarPasta(idPastaPai, nomePasta) : idNovaPasta;
		
		arvorePastas.push(idPastaPai);
	}
	
	return arvorePastas;
}


function retornaPastaId(nomePastaACriar, idPastaPai)
{
	
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('retornaPastaId');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	log.warn('nomePastaACriar');
	log.warn(nomePastaACriar);
	
	log.warn('idPastaPai');
	log.warn(idPastaPai);
	
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
	
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('retornaFilhos');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	log.warn('idPastaPai');
	log.warn(idPastaPai);
	
	var dataset;
	var childs = [];
	var fields = ['documentPK.documentId', 'documentDescription'];
	
	var c1 = DatasetFactory.createConstraint('documentPK.companyId', 1,	1, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('parentDocumentId', idPastaPai,	idPastaPai, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('activeVersion', true,	true, ConstraintType.MUST);

	dataset = DatasetFactory.getDataset("document", fields, [c1,c2,c3,c4], null);
	
	log.warn('dataset');
	log.dir(dataset);
	
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
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('criarPasta');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	
	log.warn('idPastaPai');
	log.warn(idPastaPai);
	
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
     dtoAllUsersSecurity.setSecurityLevel(2);
	
     dtosSecurity.push(dtoAllUsersSecurity);
	
	try 
	{
		newDocument = docAPI.createFolder(docDto, dtosSecurity, null);
	} 
	catch (e) 
	{
		log.info("******************** Erro ao criar a pasta para a publica\u00E7\u00E3o do documento: " + e);
	}

	return newDocument.getDocumentId();
}

function copiarAnexosGed(idPastaAnexos, arquivo, user , pass)
{	
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('copiarAnexosGed');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	log.warn('idPastaAnexos');
	log.warn(idPastaAnexos);

	//Chama servico
	var periodicService = ServiceManager.getService('Fluig_ECMDocumentService');
	var serviceHelper = periodicService.getBean();
	
	var filename = 'Documentos_Admissao.pdf';
	var filenameDesc = 'Documentos_Admissao';
	
	//Chama a as classes para criar o arquivo
	var attachmentArray = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.AttachmentArray');
	
	var attachment = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.Attachment');
	
	attachment.setFileName(filename); //nome do arquivo
	 
	//attachment.setFileSize(10000); //tamanho do arquivo em bytes
	
	attachment.setAttach(false); // se é um anexo ou o documento publicado (true = anexo/ false = documento)
	
	attachment.setEditing(false); // se está em edição ou não
	
	attachment.setFullPatch(filename); //Caminho relativo do arquivo (Fluig verifica a pasta de upload do usuário que está sendo usado para realizar a publicação)
	
	attachment.setPrincipal(true); // Se é o arquivo principal
	//var anexoB64 = "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";
	var x = java.util.Base64.getDecoder().decode(new java.lang.String(arquivo).getBytes("UTF-8"));
	
	attachment.setFilecontent(x);
	
	attachmentArray.getItem().add(attachment);
	
	log.dir(attachment);
	
	//Instancia funcoes para chamar o webservice
	var DMEngineServiceService = serviceHelper.instantiate('com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService');
	var service = DMEngineServiceService.getDocumentServicePort();
	
	//Chama o webservice
	var result = service.createSimpleDocument(user, pass, '1', idPastaAnexos, 'adm', filenameDesc , attachmentArray);	
}

function retornaPastaPai(codigoProcesso)
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('retornaPastaPai');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1085', "'"+codigoProcesso+"'"], constraints, null);
	
	if(dados == null && dados.rowsCount == 0)
	{
        throw  "GED - FALHA AO BUSCAR A PASTA RAIZ DO PROCESSO." ;
    }
	
	return dados.getValue(0,"PASTA_RAIZ");		
}

function retornaUsuarioIntegracao(sistema)
{
	
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('retornaUsuarioIntegracao');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados =  DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_USUARIO_INTEGRACAO',"'"+sistema+"'"], constraints, null);
	
	if(dados==null && dados.rowsCount==0)
	{
        throw  "FALHA AO BUSCAR OS USUARIOS DE INTEGRAÇÃO." ;
    }
	
	return dados;
}

