function publicaDocumentoGED(arvorePastas, codigoProcesso)
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
		
		copiarAnexosGed(idPastaAnexos);
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

function copiarAnexosGed(idPastaAnexos)
{	
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('copiarAnexosGed');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	
	log.warn('idPastaAnexos');
	log.warn(idPastaAnexos);
	
	var workflowAttachments = hAPI.listAttachments();

	for (var i = 0; i < workflowAttachments.size(); i++) 
	{
		var docDto = workflowAttachments.get(i);
		var attachments = getAttachments(docDto);
		
		docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
		
		docDto.setDocumentId(0);
		docDto.setParentDocumentId(idPastaAnexos);
		docDto.setKeyWord('');
		docDto.setVersionDescription('');
		
		var dtosSecurity = new Array();
		var dtoAllUsersSecurity = docAPI.newDocumentSecurityConfigDto();
	    dtoAllUsersSecurity.setAttributionType(3);
	    dtoAllUsersSecurity.setAttributionValue("");
	    dtoAllUsersSecurity.setPermission(true);
	    dtoAllUsersSecurity.setShowContent(true);
	    dtoAllUsersSecurity.setSecurityLevel(2);
		
	    dtosSecurity.push(dtoAllUsersSecurity);

		try 
		{
			//var publicaDoc = retornaPastaId(docDto.getPhisicalFile(), idPastaAnexos);
			
			//if(publicaDoc == '')
			//{
				docAPI.createDocument(docDto, attachments, dtosSecurity, null, null);
			//}
		} 
		catch (e) 
		{
			log.info("Erro ao publicar o documento, por favor, contate o administrador.<br/><br/> "+ e);
		}
	}	
}

function getAttachments(docDto) 
{
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('getAttachments');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	
	var attachmentArray = new java.util.ArrayList();
	var attachment = docAPI.newAttachment();
	attachment.setFileName(docDto.getPhisicalFile());
	attachment.setPrincipal(true);
	attachment.setAttach(false);
	attachmentArray.add(attachment);
	return attachmentArray;
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

