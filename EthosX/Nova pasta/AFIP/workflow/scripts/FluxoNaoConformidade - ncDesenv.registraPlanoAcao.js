function registraPlanoAcao(atividade,nextSequenceId){
	log.warn(">>> registraPlanoAcao : atividade "+ atividade+" | nextSequenceId " + nextSequenceId);
	var objQNCA330 = montaQNCA330(atividade,nextSequenceId);
	var objPlanos = montaPlanos(atividade,nextSequenceId);
	
	log.warn("==== objQNCA330: \n" + objQNCA330);
	
	var wsProvider = ServiceManager.getService("FWWSMODEL").getBean();
	var wsLocator = wsProvider.instantiate("Protheus.FWWSMODEL");
	var wsService = wsLocator.getFWWSMODELSOAP();
	
	var properties = {};
	properties["disable.chunking"] = "true";
	properties["log.soap.messages"] = "true";
	properties["receive.timeout"] = "100000";
	
	var customClient = wsProvider.getCustomClient(wsService, "Protheus.FWWSMODELSOAP", properties);
	
	var USERTOKEN = customClient.login("TOTVS",new java.lang.String("TOTVS@2018").getBytes());
	var MODELID = "QNCA330";
	
	var err = {message:"", empty:true};
	var ret, xml;

	try {
	   ret = customClient.getxmldatadetail(USERTOKEN,MODELID);
	   xml = new XML(new String(new java.lang.String(ret)).replace(/<\?.*\?>/g,"").replace(/<QI4DETAIL.*\/QI4DETAIL>/g,"").replace(/<QI6DETAIL.*\/QI6DETAIL>/g,"").replace(/<QI7DETAIL.*\/QI7DETAIL>/g,"").replace(/<QI8DETAIL.*\/QI8DETAIL>/g,"").replace(/<QI9DETAIL.*\/QI9DETAIL>/g,"").replace(/<QIEDETAIL.*\/QIEDETAIL>/g,""));
	}
	catch(erro){
	   throw erro.message;
	   return;
	}

	updateXMLFields(xml,err,objQNCA330,objPlanos);
	
	if(atividade == 92 && hAPI.getCardValue("confirmacaoAcaoCorretiva") != "Nao"){
		eval("xml.@Operation = 3");
	}else{
		eval("xml.@Operation = 4");
	}
	
	var txtItem = xml.QI3MASTER.QI5DETAIL.items.item.toString();
	
	for (var i=0 ; i<objPlanos.length ; i++){
		if(i == 0){
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_FILIAL	= objPlanos[i].QI5_FILIAL;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_CODIGO	= objPlanos[i].QI5_CODIGO;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_REV		= objPlanos[i].QI5_REV;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_SEQ		= objPlanos[i].QI5_SEQ;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_TPACAO	= objPlanos[i].QI5_TPACAO;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_FILMAT	= objPlanos[i].QI5_FILMAT;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_MAT		= objPlanos[i].QI5_MAT;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_PRAZO	= objPlanos[i].QI5_PRAZO;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_REALIZ	= objPlanos[i].QI5_REALIZ;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_STATUS	= objPlanos[i].QI5_STATUS;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_DESCRE	= objPlanos[i].QI5_DESCRE;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_PEND		= objPlanos[i].QI5_PEND;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_OBRIGA	= objPlanos[i].QI5_OBRIGA;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_AUXOBR	= objPlanos[i].QI5_AUXOBR;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_TRFACT	= objPlanos[i].QI5_TRFACT;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_PARSEQ	= objPlanos[i].QI5_PARSEQ;
			xml.QI3MASTER.QI5DETAIL.items.item.QI5_PLAGR	= objPlanos[i].QI5_PLAGR;
		}else{
			var nodePlano = new XML(txtItem);
			eval("nodePlano.@id = "+objPlanos[i].QI5_SEQ);
			
			nodePlano.QI5_FILIAL	= objPlanos[i].QI5_FILIAL;
			nodePlano.QI5_CODIGO	= objPlanos[i].QI5_CODIGO;
			nodePlano.QI5_REV		= objPlanos[i].QI5_REV;
			nodePlano.QI5_SEQ		= objPlanos[i].QI5_SEQ;
			nodePlano.QI5_TPACAO	= objPlanos[i].QI5_TPACAO;
			nodePlano.QI5_FILMAT	= objPlanos[i].QI5_FILMAT;
			nodePlano.QI5_MAT		= objPlanos[i].QI5_MAT;
			nodePlano.QI5_PRAZO		= objPlanos[i].QI5_PRAZO;
			nodePlano.QI5_REALIZ	= objPlanos[i].QI5_REALIZ;
			nodePlano.QI5_STATUS	= objPlanos[i].QI5_STATUS;
			nodePlano.QI5_DESCRE	= objPlanos[i].QI5_DESCRE;
			nodePlano.QI5_PEND		= objPlanos[i].QI5_PEND;
			nodePlano.QI5_OBRIGA	= objPlanos[i].QI5_OBRIGA;
			nodePlano.QI5_AUXOBR	= objPlanos[i].QI5_AUXOBR;
			nodePlano.QI5_TRFACT	= objPlanos[i].QI5_TRFACT;
			nodePlano.QI5_PARSEQ	= objPlanos[i].QI5_PARSEQ;
			nodePlano.QI5_PLAGR		= objPlanos[i].QI5_PLAGR;
			
			xml.QI3MASTER.QI5DETAIL.items.appendChild(nodePlano);
		}
		
	}
	
	log.warn("=== xml: \n" + xml);

	try{
		
		customClient.putxmldata(USERTOKEN,MODELID,new java.lang.String(xml.toXMLString()).getBytes());

	} catch(e){

	   throw e.message;

	}
	
}

function updateXMLFields(node,err,objQNCA330,objPlanos){

	var list = node.children();
	var name,value;
	
	for (var i=0;i<list.length();i++){
	   switch (Trim(eval("list[i].@modeltype.toString()"))){
	      case "FIELDS":
	         updateXMLFields(list[i],err,objQNCA330,objPlanos);
	         break;
	      default:
	         name = list[i].name().localName;
	         value = eval("objQNCA330."+name);
	         if (value != null)
	            list[i].value = convertValue(name,list[i],value,err);
	         break;
	   }
	
	   if (err.message.length > 0)
	      break;
	}

}

function convertValue(name,struct,value,err){

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

function formataData(txtData){
	var y,m,d,n,len,str,reg;
	var setYear = new Date().getFullYear().toString().substring(0,2);
	var setDate = "dd/mm/yyyy";
	var yCount = setDate.match(/yyyy/) ? 4 : 2;
	var hasErr = false;
	
	if (txtData.replace("/","").trim() != ""){
	      len = txtData.length();
	      d = setDate.indexOf("d");
	      m = setDate.indexOf("m");
	      y = setDate.indexOf("y");
	
	      if (d + 2 > len || m + 2 > len || y + yCount > len){
	         hasErr = true;
	      }
	
	      else{
	         str = txtData.substr(m,2) + txtData.substr(d,2);
	         if (yCount == 4)
	            str = txtData.substr(y,4) + str;
	         else
	            str = setYear + txtData.substr(y,2) + str;
	
	         if (str.match(/((((19|20)(([02468][048])|([13579][26]))0229))|((19|20)[0-9][0-9])((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))31)|(((0[1,3-9])|(1[0-2]))(29|30)))))/g)){
	        	 txtData = new java.lang.String(str);
	        	 log.warn("dataFormatada: " + txtData);
		         return txtData;
	         }
	         else
	            hasErr = true;
	
	      }
	
	      if (hasErr)
	         err.message = "O campo "+eval("struct.@info")+" ("+name+") contém uma data inválida";
	      else
	         err.empty = false;
	
	   }
}

function buscaUltimoPrazo(){
	var ultimoPrazo = hAPI.getCardValue("dataRegistro");
	for(var i=1 ; i <= 8 ; i++){
		if(hAPI.getCardValue("prazo"+i) != ""){
			var prazoAtual = hAPI.getCardValue("prazo"+i);
			if((prazoAtual.substring(6)+prazoAtual.substring(3,5)+prazoAtual.substring(0,2)) > (ultimoPrazo.substring(6)+ultimoPrazo.substring(3,5)+ultimoPrazo.substring(0,2)))
				ultimoPrazo = prazoAtual;
		}
	}
	
	hAPI.setCardValue("dataEncPrevisto",ultimoPrazo);
}

function calculaPrazo(horas,campo){
	var dataAtual = new Date();
	var segundos = parseInt((dataAtual.getHours()*60*60) + (dataAtual.getMinutes()*60));
	var prazoMinutos = parseInt(horas*60);
	var prazoAtiv = hAPI.calculateDeadLineTime(dataAtual,segundos,prazoMinutos,"Default");
	var dataPrazo = prazoAtiv[0];
	var diaPrazo = (dataPrazo.getDate() < 10 ? "0"+dataPrazo.getDate() : ""+dataPrazo.getDate());
	var mesPrazo = ((dataPrazo.getMonth()+1) < 10 ? "0"+(dataPrazo.getMonth()+1) : ""+(dataPrazo.getMonth()+1));
	var anoPrazo = 1900+dataPrazo.getYear();
	var txtPrazo = diaPrazo + "/" + mesPrazo + "/" + anoPrazo;
	
	hAPI.setCardValue(campo,txtPrazo);
}

function formataSeq(seq){
	seq = "0"+seq;
	return seq.substring(seq.length - 2);
}

function montaQNCA330(atividade,nextSequenceId){
	
	if(hAPI.getCardValue("dataEncPrevisto") == "")
		buscaUltimoPrazo();
	
	if(hAPI.getCardValue("numeroPA") == "")
		inserirNumeracaoPA();
	
	var QNCA330 = {
		QI3_FILIAL	: "  ",
		QI3_CODIGO	: hAPI.getCardValue("numeroPA"),
		QI3_REV 	: "00",
		QI3_ANO		: hAPI.getCardValue("anoOcorrencia"),
		QI3_ABERTU	: hAPI.getCardValue("dataRegistro"),
		QI3_ENCPRE	: hAPI.getCardValue("dataEncPrevisto"), 
		QI3_ENCREA	: (atividade == 34 ? tools.buscaDataAtual("dd/MM/yyyy") : ""),
		QI3_FILMAT	: hAPI.getCardValue("filResponsavelResposta"),
		QI3_MAT		: hAPI.getCardValue("matResponsavelResposta"),
		QI3_MEMO1	: hAPI.getCardValue("descricaoCausaEvento"),
		QI3_STATUS	: hAPI.getCardValue("codSituacao"),
		QI3_TIPO	: "1",
		QI3_MODELO	: "001",
		QI3_SIGILO	: "2"
	}
	
	log.warn("==== QNCA330: \n" + QNCA330);
	return QNCA330;
}

function montaPlanos(atividade,nextSequenceId){
	var planos = new Array();
	for ( var i=1 ; i<=8 ; i++){
		if(hAPI.getCardValue("matResponsavelPlacoAcao"+i) != ""){
			log.warn("--- i: " + i + " matResponsavelPlacoAcao " + hAPI.getCardValue("matResponsavelPlacoAcao"+i) + " Prazo: " + hAPI.getCardValue("prazo"+i) + " acaoImplementada: " + hAPI.getCardValue("acaoImplementada"+i));
			var status = ((hAPI.getCardValue("validacaoAcao"+i) == "Validado" && hAPI.getCardValue("confirmacaoAcaoCorretiva") == "Sim") ? "4" : "0");
			var pend = ((hAPI.getCardValue("acaoImplementada"+i) == "" && hAPI.getCardValue("validacaoAcao"+i) == "Validado") ? "N" : "S");
			var novoPlano = {
				QI5_FILIAL	: "  ",
				QI5_CODIGO	: hAPI.getCardValue("numeroPA"),
				QI5_REV		: "00",
				QI5_SEQ		: formataSeq(i.toString()),
				QI5_TPACAO	: "AC",
				QI5_FILMAT	: hAPI.getCardValue("filResponsavelPlacoAcao"+i),
				QI5_MAT		: hAPI.getCardValue("matResponsavelPlacoAcao"+i),
				QI5_PRAZO	: formataData(hAPI.getCardValue("prazo"+i)),
				QI5_REALIZ	: (hAPI.getCardValue("dtExecucao"+i) != "" ? formataData(hAPI.getCardValue("dtExecucao"+i)) : ""),
				QI5_STATUS	: status,
				QI5_DESCRE	: hAPI.getCardValue("acaoCorretiva"+i),
				QI5_PEND	: pend,
				QI5_OBRIGA	: "2",
				QI5_AUXOBR	: "1",
				QI5_TRFACT	: "1",
				QI5_PARSEQ	: "2",
				QI5_PLAGR	: "2"
			}
			planos.push(novoPlano);
		}
	}
	
	if(atividade == 28 || atividade == 30 || atividade == 34){
		var status_1 = (((atividade == 28 && nextSequenceId == 28) || ((atividade == 28 || atividade == 30) && hAPI.getCardValue("confirmacaoAcaoCorretiva") != "Sim")) ? "0" : "4"); //Implementação
		var pend_1 = ((atividade == 28 && hAPI.getCardValue("confirmacaoAcaoCorretiva") != "Sim") ? "S" : "N"); //Implementação
		if(hAPI.getCardValue("fimVerificaImplementacao") == "")
			calculaPrazo(88,"fimVerificaImplementacao");
		
		var novoPlano = {
				QI5_FILIAL	: "  ",
				QI5_CODIGO	: hAPI.getCardValue("numeroPA"),
				QI5_REV		: "00",
				QI5_SEQ		: "09",
				QI5_TPACAO	: "VI",
				QI5_FILMAT	: hAPI.getCardValue("filAnalista"),
				QI5_MAT		: hAPI.getCardValue("matAnalista"),
				QI5_PRAZO	: formataData(hAPI.getCardValue("fimVerificaImplementacao")),
				QI5_REALIZ	: (status_1 == "4" ? formataData(hAPI.getCardValue("prazoAcaoCorretiva")) : ""),
				QI5_STATUS	: status_1,
				QI5_DESCRE	: "Verificação de Implementação",
				QI5_PEND	: pend_1,
				QI5_OBRIGA	: "2",
				QI5_AUXOBR	: "1",
				QI5_TRFACT	: "1",
				QI5_PARSEQ	: "2",
				QI5_PLAGR	: "2"
			}
			planos.push(novoPlano);
		
		if(atividade == 34 && hAPI.getCardValue("confirmacaoAcaoCorretiva") == "Sim" ){
			
			var status_2 = ((atividade == 34 && nextSequenceId == 34) ? "0" : "4"); //Eficacia
			var pend_2 = ((atividade == 34 && nextSequenceId == 34) ? "S" : "N"); //Eficacia
			if(hAPI.getCardValue("fimVerificaEficacia") == "")
				calculaPrazo(160,"fimVerificaEficacia");
			
			var novoPlano = {
					QI5_FILIAL	: "  ",
					QI5_CODIGO	: hAPI.getCardValue("numeroNC"),
					QI5_REV		: "00",
					QI5_SEQ		: "10",
					QI5_TPACAO	: "VE",
					QI5_FILMAT	: hAPI.getCardValue("filAnalista"),
					QI5_MAT		: hAPI.getCardValue("matAnalista"),
					QI5_PRAZO	: formataData(hAPI.getCardValue("fimVerificaEficacia")),
					QI5_REALIZ	: (status_2 == "4" ? formataData(hAPI.getCardValue("dataEncerramentoEficacia")) : ""),
					QI5_STATUS	: status_2,
					QI5_DESCRE	: "Verificação de Eficácia",
					QI5_PEND	: pend_2,
					QI5_OBRIGA	: "2",
					QI5_AUXOBR	: "1",
					QI5_TRFACT	: "1",
					QI5_PARSEQ	: "2",
					QI5_PLAGR	: "2"
				}
				planos.push(novoPlano);
		}
	}
	
	return planos;
}

