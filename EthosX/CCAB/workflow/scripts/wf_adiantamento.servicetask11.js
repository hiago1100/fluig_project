function servicetask11(attempt, message) {
	
	var sequenceId = getValue("WKNextState");
	var processo = getValue("WKNumProces");
	
	var dadosIntegracao = compilarDadosContasPagar();
	
	var xml				= compilarXMLContasPagar(dadosIntegracao);
	
	var retorno = integrarProtheus(xml) ;
	
	if (retorno.LOGMASTER.RETORNO == '0'){
		MovAnexoProtheus(sequenceId,retorno.LOGMASTER.ANEXOKEY,retorno.LOGMASTER.ANEXOID);
		hAPI.setTaskComments("44209840823", processo, 0, "Gerado titulo numero " + retorno.LOGMASTER.ID)
		return;
	}else{
		throw retorno.LOGMASTER.MOTIVO;
	}
}

function integrarProtheus(xml){

	//GETTING PARAM TO CONNECTION ON SERVICE PROTHEUS
	var SYSTEM = "EAISERVICE";
	var constraints = new Array(DatasetFactory.createConstraint("SYSTEM", SYSTEM, SYSTEM, ConstraintType.MUST));
	var paramService = DatasetFactory.getDataset("ds_params", null, constraints, null);	
	var pBasicPath = paramService.getValue(0, "basicPath");
	
	try {
        
		var servico = ServiceManager.getService(SYSTEM); 
        var bean    = servico.getBean();
        var locator = bean.instantiate(pBasicPath + "EAISERVICE");
        var metodos = locator.getEAISERVICESOAP();
        var retorno = metodos.receivemessage(xml);
        
        var oXml 	= extrairRetornoXML(retorno);
        
        return oXml;
        
	} catch (e) {
		var msgErro = "Ocorreu um erro ao integrar com protheus... " + e.message;
		log.info(msgErro);
		throw msgErro;
		return msgErro;
	}
	
}

function compilarDadosContasPagar(){
	var UUID = java.util.UUID.randomUUID();
	var integracao  = [];	
	
	integracao["GlobalProduct"]                     = "TOTVS|EAI";    
	integracao["GlobalFunctionCode"]                = "EAI";               
	integracao["GlobalDocumentFunctionCode"]        = "CEAIA01";
	integracao["GlobalDocumentFunctionDescription"] = "Integracao Fluig x Protheus - Contas a Pagar";
	integracao["DocVersion"] 						= "1.0";
	integracao["DocDateTime"] 					    = consultarDataHoraAtual();
	integracao["DocIdentifier"] 					= UUID;
	integracao["DocCompany"] 						= "01";
	integracao["DocBranch"] 						= "09";
	integracao["DocName"] 						    = "";
	integracao["DocFederalID"] 					    = "";
	integracao["DocType"] 						    = "1";
	integracao["Identifier"]                        = "CEAIA01";
	integracao["Version"]                           = "1.0";
	integracao["FunctionCode"]                      = "U_CEAIA01";
	
	var cData = (hAPI.getCardValue("dataNecessidade").toString()).substring(8,10);
	cData += "/";
	cData += (hAPI.getCardValue("dataNecessidade").toString()).substring(5,7);
	cData += "/";
	cData += (hAPI.getCardValue("dataNecessidade").toString()).substring(0,4);	
	
	var tipoMoeda = hAPI.getCardValue("slc_moeda");

	var d = new Date()
	var dataHoje =   ("0" + d.getDate()).slice(-2).toString() +"/"+ ("0" + (d.getMonth() + 1)).slice(-2).toString() + "/"+ d.getFullYear().toString();

	log.info("############################## dataHoje  "+dataHoje);		

	if(tipoMoeda == "1"){
		integracao["E2_EMISSAO"] 						= cData;
	}else{
		 integracao["E2_EMISSAO"] 						= dataHoje;
	}
	
	integracao["E2_VENCTO"] 						= cData;
	log.info("############################## DATA "+cData);	
	
	integracao["E2_PREFIXO"] 						= hAPI.getCardValue("prefixo");
	integracao["E2_TIPO"] 							= hAPI.getCardValue("tipoTitulo");
	integracao["E2_NATUREZ"] 						= hAPI.getCardValue("natureza");
	integracao["E2_FORNECE"] 						= hAPI.getCardValue("codFornecedor");
	integracao["E2_LOJA"] 							= hAPI.getCardValue("loja");
	integracao["E2_XNUMFLG"] 						= hAPI.getCardValue("numeroSolicitacao");
	integracao["E2_VALOR"] 							= hAPI.getCardValue("valorTratado");
	log.info("############################## VALOR"+hAPI.getCardValue("valorTratado"));
	integracao["E2_HIST"] 							= hAPI.getCardValue("motivo");
	integracao["AUTBANCO"] 							= hAPI.getCardValue("idbancoOrigem");
	integracao["AUTAGENCIA"] 						= hAPI.getCardValue("agenciaOrigem");
	integracao["AUTCONTA"] 							= hAPI.getCardValue("contaOrigem");
	integracao["E2_MOEDA"] 							= hAPI.getCardValue("slc_moeda");	
	log.info("############################## MOEDA"+hAPI.getCardValue("slc_moeda"));	
	
	if (hAPI.getCardValue("origem") == "SIGAEIC"){
		integracao["E2_ORIGEM"] 					= hAPI.getCardValue("origem");
		integracao["HAWB"] 							= hAPI.getCardValue("hawb");
	}else{
		integracao["E2_ORIGEM"] 					= "FINA050";
		integracao["HAWB"] 							= "";
	}

	return integracao;
}

function compilarXMLContasPagar(integracao){
	    
	var xml = 
		"<TOTVSIntegrator>" + 
			"<GlobalProduct>"                     + integracao["GlobalProduct"]                     + "</GlobalProduct>" +
			"<GlobalFunctionCode>"                + integracao["GlobalFunctionCode"]                + "</GlobalFunctionCode>" +
			"<GlobalDocumentFunctionCode>"        + integracao["GlobalDocumentFunctionCode"]        + "</GlobalDocumentFunctionCode>" +
			"<GlobalDocumentFunctionDescription>" + integracao["GlobalDocumentFunctionDescription"] + "</GlobalDocumentFunctionDescription>" +
			"<DocVersion>"                        + integracao["DocVersion"] 						+ "</DocVersion>" +
			"<DocDateTime>"                       + integracao["DocDateTime"] 					    + "</DocDateTime>" +
			"<DocIdentifier>"                     + integracao["DocIdentifier"] 					+ "</DocIdentifier>" +
			"<DocCompany>"                        + integracao["DocCompany"] 						+ "</DocCompany>" +
			"<DocBranch>"                         + integracao["DocBranch"] 						+ "</DocBranch>" +
			"<DocName>"                           + integracao["DocName"] 						    + "</DocName>" +
			"<DocFederalID>"                      + integracao["DocFederalID"] 					    + "</DocFederalID>" +
			"<DocType>"                           + integracao["DocType"] 						    + "</DocType>" +
			"<Message>" +
				"<Layouts>" +
					"<Identifier>"   + integracao["Identifier"]   + "</Identifier>" +
					"<Version>"      + integracao["Version"]      + "</Version>" +
					"<FunctionCode>" + integracao["FunctionCode"] + "</FunctionCode>" +					  
					"<Content>" +
						"<CEAIA01 Operation='3' version='1.01'>" +
							"<SE2MASTER modeltype='FIELDS'>" +							
								"<E2_PREFIXO>" 	+ integracao["E2_PREFIXO"] 	+ "</E2_PREFIXO>" +
								"<E2_TIPO>" 	+ integracao["E2_TIPO"] 	+ "</E2_TIPO>"    +
								"<E2_FORNECE>" 	+ integracao["E2_FORNECE"] 	+ "</E2_FORNECE>" +
								"<E2_LOJA>" 	+ integracao["E2_LOJA"] 	+ "</E2_LOJA>"    +
								"<E2_NATUREZ>" 	+ integracao["E2_NATUREZ"] 	+ "</E2_NATUREZ>" +
								"<E2_XNUMFLG>" 	+ integracao["E2_XNUMFLG"] 	+ "</E2_XNUMFLG>" +
								"<E2_EMISSAO>" 	+ integracao["E2_EMISSAO"] 	+ "</E2_EMISSAO>" +
								"<E2_VENCTO>" 	+ integracao["E2_VENCTO"] 	+ "</E2_VENCTO>"  +
								"<E2_VALOR>" 	+ integracao["E2_VALOR"] 	+ "</E2_VALOR>"   +
								"<E2_HIST>" 	+ integracao["E2_HIST"] 	+ "</E2_HIST>"   +
								"<AUTBANCO>" 	+ integracao["AUTBANCO"] 	+ "</AUTBANCO>"   +
								"<AUTAGENCIA>" 	+ integracao["AUTAGENCIA"] 	+ "</AUTAGENCIA>"   +
								"<AUTCONTA>" 	+ integracao["AUTCONTA"] 	+ "</AUTCONTA>"   +
								"<E2_MOEDA>" 	+ integracao["E2_MOEDA"] 	+ "</E2_MOEDA>"   +
								"<E2_ORIGEM>" 	+ integracao["E2_ORIGEM"] 	+ "</E2_ORIGEM>"   +
								"<HAWB>" 		+ integracao["HAWB"] 		+ "</HAWB>"   +
							"</SE2MASTER>" +
						"</CEAIA01>" +					
					"</Content>" +
				"</Layouts>" +
			"</Message>" +
		"</TOTVSIntegrator>";
	
	return xml;	
}

function consultaDadosPaiFilho(fields){
	var nr_solicitacao 	= getValue("WKNumProces");
	var cardData   		= hAPI.getCardData(nr_solicitacao);	
	var it         		= cardData.keySet().iterator();
	var listaFilho 		= new Array();
	var fieldTemp  		= fields[0];

	while (it.hasNext()) {
		var key = it.next();
		var campo = key.split("___");		

		if (key.indexOf('___') >= 0 && campo[0] == fieldTemp) {
			var idx = campo[1];
			var row = new Object();
			
			for(var i=0; i<fields.length; i++){
				var name = fields[i] + "___" + idx;
				row[fields[i]] = {value:hAPI.getCardValue(name), idx:idx, name:name};
			}
			listaFilho.push(row);
		}		
	}
	listaFilho.reverse();
	return listaFilho;
}

function consultarDataHoraAtual(){
	var dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZZZ");
	return dateFormat.format(new java.util.Date());
}

function extrairRetornoXML(strXml){
	var xml = new XML(strXml);
	
	return xml;
}

function MovAnexoProtheus(sequenceId,CodDocProtheus,FolderProtheus){
    var calendar = java.util.Calendar.getInstance().getTime();
    var docs = hAPI.listAttachments();
    
    for (var i = 0; i < docs.size(); i++) {
        var doc = docs.get(i);
         
        if (doc.getDocumentType() != "7") {
            continue;
        }     
        
        doc.setParentDocumentId(parseInt(FolderProtheus));
        doc.setDocumentType("3"); 
        doc.setExternalDocumentId(CodDocProtheus);
        doc.setExpires(false);
        doc.setCreateDate(calendar);
        doc.setInheritSecurity(true);
        doc.setTopicId(1);
        doc.setUserNotify(false);
        doc.setValidationStartDate(calendar);
        doc.setVersionOption("0");
        doc.setUpdateIsoProperties(true);
       
        hAPI.publishWorkflowAttachment(doc);
    }
		
}


