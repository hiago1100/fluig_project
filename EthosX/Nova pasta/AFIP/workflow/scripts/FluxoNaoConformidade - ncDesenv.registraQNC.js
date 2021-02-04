function registraQNC(atividade,nextSequenceId){
	log.warn(">>> registraQNC : atividade "+ atividade+" | nextSequenceId " + nextSequenceId);
	var objQNCA340 = montaQNCA340(atividade,nextSequenceId);
	
	var wsProvider = ServiceManager.getService("FWWSMODEL").getBean();
	var wsLocator = wsProvider.instantiate("Protheus.FWWSMODEL");
	var wsService = wsLocator.getFWWSMODELSOAP();
	
	var properties = {};
	properties["disable.chunking"] = "true";
	properties["log.soap.messages"] = "true";
	properties["receive.timeout"] = "100000";
	
	var customClient = wsProvider.getCustomClient(wsService, "Protheus.FWWSMODELSOAP", properties);
	
	var USERTOKEN = customClient.login("TOTVS",new java.lang.String("TOTVS@2018").getBytes());
	var MODELID = "QNCA340";
	
	var err = {message:"", empty:true};
	var ret, xml;

	try {
	   ret = customClient.getxmldatadetail(USERTOKEN,MODELID);
	   xml = new XML(new String(new java.lang.String(ret)).replace(/<\?.*\?>/g,"").replace(/<QIFDETAIL.*\/QIFDETAIL>/g,""));
	}
	catch(erro){
	   throw erro.message;
	   return;
	}

	updateXMLFields340(xml,err,objQNCA340);

	if(atividade == 4 && (hAPI.getCardValue("validarSelecionarQualidade") != "Nao" && hAPI.getCardValue("confirmacaoNaoConformidade") != "Nao" )){
		eval("xml.@Operation = 3");
	}else{
		eval("xml.@Operation = 4");
	}
	
	log.warn("=== xml: \n" + xml);

	try{
		
		customClient.putxmldata(USERTOKEN,MODELID,new java.lang.String(xml.toXMLString()).getBytes());

	} catch(e){

	   throw e.message;

	}

}

function updateXMLFields340(node,err,objQNCA340){

	
	var list = node.children();
	var name,value;
	
	for (var i=0;i<list.length();i++){
	   switch (Trim(eval("list[i].@modeltype.toString()"))){
	      case "FIELDS":
	         updateXMLFields340(list[i],err,objQNCA340);
	         break;
	      default:
	         name = list[i].name().localName;
	         value = eval("objQNCA340."+name);
	         if (value != null)
	            list[i].value = convertValue2(name,list[i],value,err);
	         break;
	   }
	
	   if (err.message.length > 0)
	      break;
	}

}

 

function convertValue2(name,struct,value,err){

	var y,m,d,n,len,str,reg
	var setYear = new Date().getFullYear().toString().substring(0,2);
	var setDate = "dd/mm/yyyy";
	var yCount = setDate.match(/yyyy/) ? 4 : 2;
	var hasErr = false;
	
	value = value.trim();
	
	switch (eval("struct.@datatype.toString()")){
	
	case "D":

	   if (value.replace("/","").trim() != ""){
	      len = value.length();
	      d = setDate.indexOf("d");
	      m = setDate.indexOf("m");
	      y = setDate.indexOf("y");
	
	      if (d + 2 > len || m + 2 > len || y + yCount > len){
	         hasErr = true;
	      }
	
	      else{
	         str = value.substr(m,2) + value.substr(d,2);
	         if (yCount == 4)
	            str = value.substr(y,4) + str;
	         else
	            str = setYear + value.substr(y,2) + str;
	
	         if (str.match(/((((19|20)(([02468][048])|([13579][26]))0229))|((19|20)[0-9][0-9])((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))31)|(((0[1,3-9])|(1[0-2]))(29|30)))))/g))
	            value = new java.lang.String(str);
	         else
	            hasErr = true;
	
	      }
	
	      if (hasErr)
	         err.message = "O campo "+eval("struct.@info")+" ("+name+") contém uma data inválida";
	      else
	         err.empty = false;
	
	   }
	
	   break;
	
	case "N":
	
	   len = eval("struct.@len.toString().split(',')");
	
	   if (len[1] == "0"){
	      reg = new RegExp("^[0-9]{1,"+len[0]+"}$");
	      str = value.replace(",","");
	      if(!reg.test(str)){
	         str = value.replace(".","");
	         if(!reg.test(str)){
	            err.message = "O campo "+eval("struct.@info")+" ("+name+") contém um número (valor ou tamanho) inválido"
	            hasErr = true;
	            break;
	         }
	      }
	
	      if (!hasErr){
	         n = parseInt(str);
	         if (!isNaN(n)){
	            value = new java.lang.String(str);
	            if (n > 0)
	               err.empty = false;
	         }
	      }
	
	   }
	   else{
	      reg = new RegExp("^0$|^0\.[0-9]{1,"+len[1]+"}$|^[0-9]{0,"+len[0]+"}(\.[0-9]{1,"+len[1]+"})?$");
	      str = value.replace(".","").replace(",",".");
	
	      if(!reg.test(str)){
	         str = value.replace(",","");
	         if(!reg.test(str)){
	            err.message = "O campo "+eval("struct.@info")+" ("+name+") contém um número (valor ou tamanho) inválido"
	            hasErr = true;
	            break;
	         }
	      }
	
	      if (!hasErr){
	         n = parseFloat(str);
	         if (!isNaN(n)){
	            value = new java.lang.String(str);
	            if (n > 0)
	               err.empty = false;
	         }
	      }
	   }
	
	   break;
	
	default:
	
	   if (value != "")
	      err.empty = false;
	
	   break;
	
	}

	return value;

}

function Trim(str){return str.replace(/^\s+|\s+$/g,"");}

function montaQNCA340(atividade,nextSequenceId){
	var status = ((atividade == 41 && hAPI.getCardValue("confirmacaoNaoProcede") == "Sim" ) ? "4" : hAPI.getCardValue("codSituacao"));
	var QNCA340 = {
				QI2_FILIAL		: "  ",
				QI2_OCORRE		: hAPI.getCardValue("dataOcorrencia"),
				QI2_FNC			: hAPI.getCardValue("numeroNC"),
				QI2_REV			: "00",
				QI2_ANO			: hAPI.getCardValue("anoOcorrencia"),
				QI2_TPFIC		: hAPI.getCardValue("codClassificacaoNConformidade"),
				QI2_PRIORI		: "3",
				QI2_REGIST		: hAPI.getCardValue("dataRegistro"),
				QI2_STATUS		: status,
				QI2_XEVESE		: hAPI.getCardValue("codEventoAdverso"),
				QI2_XCLASS		: hAPI.getCardValue("codClassificacaoEvento"),
				QI2_MEMO1		: hAPI.getCardValue("descricaoEventoRisco"),
				QI2_MEMO3		: hAPI.getCardValue("acaoImediata"),
				QI2_ORIDEP		: hAPI.getCardValue("codDepartamentoOrigem"),
				QI2_DESDEP 		: hAPI.getCardValue("codDepartamentoDestino"),
				QI2_TPNC		: "1",
				QI2_DESCR		: hAPI.getCardValue("descricaoEventoRiscoRes"),
				QI2_XRISCO 		: hAPI.getCardValue("codGerenciamentoRisco"),
				QI2_CODDIS 		: hAPI.getCardValue("codDanoPaciente"),
				QI2_CODORI 		: hAPI.getCardValue("codOrigem"),
				QI2_ORIGEM 		: "QNC",
				QI2_CODEFE 		: hAPI.getCardValue("codMotivoNaoConformidade"),
				QI2_CODCAT 		: hAPI.getCardValue("codProcesso"),
				QI2_FILMAT 		: hAPI.getCardValue("filRespAbertura"),
				QI2_MAT 		: hAPI.getCardValue("matRespAbertura"),
				QI2_MATDEP 		: hAPI.getCardValue("deptoRespAbertura"),
				QI2_FILRES 		: ( hAPI.getCardValue("filResponsavelResposta") != "" ? hAPI.getCardValue("filResponsavelResposta") : hAPI.getCardValue("filRespAbertura") ),
				QI2_MATRES 		: ( hAPI.getCardValue("matResponsavelResposta") != "" ? hAPI.getCardValue("matResponsavelResposta") : hAPI.getCardValue("matRespAbertura") ),
				QI2_CONPRE		: hAPI.getCardValue("dataEncPrevisto"),
				QI2_CONREA		: (atividade == 34 ? hAPI.getCardValue("prazoEficacia") : ""), 
				QI2_SIGILO 		: "2"
		}
	
	return QNCA340;
}