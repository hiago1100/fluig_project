function servicetask19(attempt, message) {
	var dadosIntegracao = compilarDadosReprova();
	
	var xml				= compilarXMLReprova(dadosIntegracao);
	
	var retorno 		= integrarProtheus(xml) ;
	
	if (retorno.LOGMASTER.RETORNO == '0'){
		return;
	}else{
		throw retorno.LOGMASTER.MOTIVO;
	}
}

function compilarDadosReprova(){
	var UUID = java.util.UUID.randomUUID();
	var integracao  = [];	
	
	integracao["GlobalProduct"]                     = "TOTVS|EAI";    
	integracao["GlobalFunctionCode"]                = "EAI";               
	integracao["GlobalDocumentFunctionCode"]        = "CEAIA02";
	integracao["GlobalDocumentFunctionDescription"] = "Integracao Fluig x Protheus - Contas a Pagar";
	integracao["DocVersion"] 						= "1.0";
	integracao["DocDateTime"] 					    = consultarDataHoraAtual();
	integracao["DocIdentifier"] 					= UUID;
	integracao["DocCompany"] 						= "01";
	integracao["DocBranch"] 						= "01";
	integracao["DocName"] 						    = "";
	integracao["DocFederalID"] 					    = "";
	integracao["DocType"] 						    = "1";
	integracao["Identifier"]                        = "CEAIA02";
	integracao["Version"]                           = "1.0";
	integracao["FunctionCode"]                      = "U_CEAIA02";

	integracao["CR_FILIAL"] 						= hAPI.getCardValue("codFilial");
	integracao["RECNO"] 							= hAPI.getCardValue("recno");
	integracao["OPER"] 								= "7";
	integracao["DBM_ITGRP"] 						= hAPI.getCardValue("dbmitgrp");
	integracao["C7_CCUSTO"] 						= hAPI.getCardValue("codCC");
	integracao["C7_NUM"] 							= hAPI.getCardValue("numPedido");
	integracao["AK_XCPF"] 							= hAPI.getCardValue("matAprovador");
	integracao["CR_OBS"] 							= hAPI.getCardValue("motivo");
	
	return integracao;
}

function compilarXMLReprova(integracao){
    
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
						"<CEAIA02 Operation='3' version='1.01'>" +
							"<SCRMASTER modeltype='FIELDS'>" +							
								"<CR_FILIAL>" 	+ integracao["CR_FILIAL"] 	+ "</CR_FILIAL>" 	+
								"<RECNO>" 		+ integracao["RECNO"] 		+ "</RECNO>"    	+
								"<OPER>" 		+ integracao["OPER"] 		+ "</OPER>" 		+
								"<DBM_ITGRP>" 	+ integracao["DBM_ITGRP"] 	+ "</DBM_ITGRP>"    +
								"<C7_CCUSTO>" 	+ integracao["C7_CCUSTO"] 	+ "</C7_CCUSTO>"    +
								"<C7_NUM>" 		+ integracao["C7_NUM"] 		+ "</C7_NUM>"   	+
								"<AK_XCPF>" 	+ integracao["AK_XCPF"] 	+ "</AK_XCPF>"      +
								"<CR_OBS>" 		+ integracao["CR_OBS"] 		+ "</CR_OBS>"       +
							"</SCRMASTER>" +
						"</CEAIA02>" +					
					"</Content>" +
				"</Layouts>" +
			"</Message>" +
		"</TOTVSIntegrator>";
	
	return xml;	
}

function consultarDataHoraAtual(){
	var dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZZZ");
	return dateFormat.format(new java.util.Date());
}

function extrairRetornoXML(strXml){
	var xml = new XML(strXml);
	
	return xml;
}