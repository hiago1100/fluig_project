function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var fnEmail            	   = loadLivTNU(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
	var receptorEmail      	   = hAPI.getCardValue("email");
	var numSolicitacao     	   = getValue("WKNumProces");
	var numeroNota         	   = hAPI.getCardValue("vetorNfiscal");
    var numeroSerie        	   = hAPI.getCardValue("vetorNserie");
    var razaoSocial   	   	   = hAPI.getCardValue("nomeCliente");
    var TotalDescGetalMerc     = hAPI.getCardValue("TotalDescGetalMerc");
    var TotalDescritivoIpi     = hAPI.getCardValue("TotalDescGetalIpi");
    var TotalDescritivoBcIcms  = hAPI.getCardValue("TotalDescritivoBcIcms");
    var TotalDescGetalIcms     = hAPI.getCardValue("TotalDescGetalIcms");
    var TotalDescritivoSt 	   = hAPI.getCardValue("TotalDescGetalSt");
    var TotalDescritivoBcSt    = hAPI.getCardValue("TotalDescritivoBcSt");
    var TotalDescritivoPeso    = hAPI.getCardValue("TotalDescritivoPeso");
    var versao  			   = hAPI.getCardValue("versao");
    var TotalDescritivo        =  hAPI.getCardValue("TotalDescGetalNFD");
    var cnpj 				   = hAPI.getCardValue("cnpjCli");
	var nomeAbreviado		   = hAPI.getCardValue("nomeAbrev");
	var endereco			   = hAPI.getCardValue("enderecoCli");
	var bairro			       = hAPI.getCardValue("bairro");
	var cep			           = hAPI.getCardValue("cep");
	var cidade			       = hAPI.getCardValue("cidade");
	var estado    			   = hAPI.getCardValue("estado");

	var razaoSocialTrans	   = hAPI.getCardValue("nomeTransp");	
	var cnpjTrans       	   = hAPI.getCardValue("cnpjTransp");

	var telefone 			   = hAPI.getCardValue("telCli");	

	var diaAgendado			   = hAPI.getCardValue("dataRetirada");
	
	var dataArray = diaAgendado.split("-");
	var dia = dataArray[2];
	var mes = dataArray[1];
	var ano = dataArray[0];

	var diaAgendado = dia+"/"+mes+"/"+ano;
	
	var solicitante  = hAPI.getCardValue("nomeSolicitante");
	
		
	var emailCli 	= hAPI.getCardValue("emailSolicitante");







	
	if (nextSequenceId == 33 && versao == "1"){
		
		var index = getChildrenIndexes("cod_item");
		
		var notaEmitida = hAPI.getCardValue("nfdEmitida");
		
			var descritivo = "<table width='100%' border='1'  class='table2'>";
			descritivo = descritivo + "<tr>"+
										"<th>C&oacute;digo</th>"+
										"<th>Refer&ecirc;ncia</th>"+
										"<th>Descri&ccedil;&atilde;o</th>"+
										"<th>Unidade</th>"+
										"<th>Ean</th>"+
										"<th>Dun</th>"+
										"<th>Nf Sa&iacute;da</th>"+
										"<th>Dt Emiss&atilde;o</th>"+
										"<th>Quantidade</th>"+
										"<th>Pre&ccedil;o L&iacute;quido</th>"+
										"<th>Total Merc. R$</th>"+
										"<th>BC ICMS</th>"+
										"<th>ICMS R$</th>"+
										"<th>ICMS %</th>"+
										"<th>BC ST R$</th>"+
										"<th>ST R$</th>"+
										"<th>IPI R$</th>"+
										"<th>IPI %</th>"+
										"<th>Total Item</th>"+
										"<th>Peso Kg</th>"+
									"</tr>";
			
			for(var i=0;i<index.length;i++){

				var codigo = hAPI.getCardValue("cod_item___"+index[i]);
				
				var referencia = hAPI.getCardValue("referencia___"+index[i]);
				var descricao = hAPI.getCardValue("descricaoItem___"+index[i]);
				var unidade = hAPI.getCardValue("unidade___"+index[i]);
				var ean = hAPI.getCardValue("eantT___"+index[i]);
				
				var dun = hAPI.getCardValue("dunTt___"+index[i]);
				var nfSaida = hAPI.getCardValue("nfsaida___"+index[i]);
				var dtEmissao = hAPI.getCardValue("emissao___"+index[i]);
				var qtd = hAPI.getCardValue("quantidade___"+index[i]);
				var precoLiquido = hAPI.getCardValue("precoliquido___"+index[i]);
				
				var totalMerc = hAPI.getCardValue("totalMercadoria___"+index[i]);
				log.info("*** totalMerc "+ totalMerc);
				var bcICMS = hAPI.getCardValue("bcicms___"+index[i]);
				log.info("*** bcICMS "+ bcICMS);
				var icmsReal = hAPI.getCardValue("valoricms___"+index[i]); 
				log.info("*** icmsReal "+ icmsReal);
				var icmsPorcento = hAPI.getCardValue("icms___"+index[i]); // esse nao
				log.info("*** icmsPorcento "+ icmsPorcento);
				var bcSt = hAPI.getCardValue("valorst___"+index[i]);
		
				var stReal = hAPI.getCardValue("valorbcst___"+index[i]);
				log.info("*** stReal "+ stReal);
				var ipiReal = hAPI.getCardValue("valorIpi___"+index[i]); //esse nao
				log.info("*** ipiReal "+ ipiReal);
				var ipiPorcento = hAPI.getCardValue("ipi___"+index[i]); //esse nao
				log.info("*** ipiPorcento "+ ipiPorcento);
				var totalItem = hAPI.getCardValue("totalitem___"+index[i]);
				log.info("*** totalItem "+ totalItem);
				var pesoKg = hAPI.getCardValue("pesokg___"+index[i]); //esse nao
				log.info("*** pesoKg "+ pesoKg);
				

				var descritivo	= descritivo +	"<tr>" +
				"<td>"+codigo+"</td>"+
				"<td>"+referencia+"</td>"+
				"<td>"+descricao+"</td>"+
				"<td>"+unidade+"</td>"+
				"<td>"+ean+"</td>"+
				"<td>"+dun+"</td>"+
				"<td>"+nfSaida+"</td>"+
				"<td>"+dtEmissao+"</td>"+
				"<td>"+qtd+"</td>"+
				"<td>"+precoLiquido+"</td>"+
				"<td>"+totalMerc+"</td>"+
				"<td>"+bcICMS+"</td>"+
				"<td>"+icmsReal+"</td>"+
				"<td>"+icmsPorcento+"</td>"+
				"<td>"+stReal+"</td>"+
				"<td>"+bcSt+"</td>"+
				"<td>"+ipiReal+"</td>"+
				"<td>"+ipiPorcento+"</td>"+
				"<td>"+totalItem+"</td>"+
				"<td>"+pesoKg+"</td>"+
				"</tr>"+
				"<tr>" +
				"<td colspan='20' style='background-color: #0c3572; padding: 0; border-spacing: 0; line-height: 0px;'></td>"+
				"</tr>";
			}

			descritivo = descritivo + "</table>";
			
			fnEmail.mail.sendCustomEmail({
				companyId: getValue("WKCompany"),
				subject: "Instruções de Alinhamento de Aprovação de Mercadoria",
				from: "fluig@aurora.com.br",
				to: receptorEmail,
				templateId: "aprovacaoDoDescritivo",
				templateDialect: "pt_BR",
				templateHtml: "AprovacaoDoDescritivo.html",
				dados: {
					"numeroSolicitacao": numSolicitacao,
					"razaoSocial": razaoSocial,
					"numDescritivo": numSolicitacao,
					"descritivo": descritivo,
					"TotalDescritivoMercadoria":TotalDescGetalMerc, //ok
					"TotalDescritivoIpi":TotalDescritivoIpi, // ok
					"TotalDescritivoBcIcms":TotalDescritivoBcIcms, //ok
					"TotalDescritivoIcmsReal":TotalDescGetalIcms, //ok
					"TotalDescritivoBcSt":TotalDescritivoBcSt, // ok
					"TotalDescritivoSt":TotalDescritivoSt, //ok
					"TotalDescritivoPeso":TotalDescritivoPeso, // ok
					"TotalDescritivo":TotalDescritivo
				}
			});
		}




		// DESTRUIÇÃO 

		if (nextSequenceId == 110){
			
			var index = getChildrenIndexes("chaveNfd");
			
			
			var descritivo = "<table width='20%' border='1'>";
			descritivo = descritivo + "<tr>"+
										"<th>N&uacute;mero</th>"+
										"<th>S&eacute;rie</th>"+

									"</tr>";
			
			for(var i=0;i<index.length;i++){

				var nfd_aux = hAPI.getCardValue("numeroNotaFis___"+index[i]);
				var serie_aux = hAPI.getCardValue("serieNota___"+index[i]);
			

				var descritivo	= descritivo +	"<tr>" +
				"<td>"+nfd_aux+"</td>"+
				"<td>"+serie_aux+"</td>"+
				"</tr>";
			}

			descritivo = descritivo + "</table>";
				
	    	fnEmail.mail.sendCustomEmail({
	    		companyId: getValue("WKCompany"),
	             subject: "Instruções de Alinhamento de Destruição de Mercadoria",
	             from: "fluig@aurora.com.br",
	             to: emailCli,
	             templateId: "DestruicaoMercadoreia",
	             templateDialect: "pt_BR",
	             templateHtml: "destruicao_mercadoria.html",
	             dados: {
	            	 "razaoSocialCliente":razaoSocial,
	            	 "descritivo": descritivo,
	               "numeroSolicitacao": numSolicitacao,
	              "solicitante": solicitante
	             }
	    	});
	    }




	    	// AGENDAR RETIRADA 

	    if (nextSequenceId == 107){		
	    	
			var index = getChildrenIndexes("chaveNfd");
						
				var descritivo = "<table width='20%' border='1' >";
				descritivo = descritivo + "<tr>"+
											"<th>N&uacute;mero</th>"+
											"<th>S&eacute;rie</th>"+

										"</tr>";
				
				for(var i=0;i<index.length;i++){

					var nfd_aux = hAPI.getCardValue("numeroNotaFis___"+index[i]);
					var serie_aux = hAPI.getCardValue("serieNota___"+index[i]);
				

					var descritivo	= descritivo +	"<tr>" +
					"<td>"+nfd_aux+"</td>"+
					"<td>"+serie_aux+"</td>"+
					"</tr>";
				}

				descritivo = descritivo + "</table>";
				

	    	fnEmail.mail.sendCustomEmail({
	    		companyId: getValue("WKCompany"),
	    		subject: "Instruções de Alinhamento de RETIRADA de Mercadoria",
	    		from: "fluig@aurora.com.br",
	    		to: receptorEmail,  //receptorEmail
	    		templateId: "agendamentoDescritivo",
	    		templateDialect: "pt_BR",
	    		templateHtml: "agendamento.html",
	    		dados: {
		            "numeroSolicitacao": numSolicitacao, // ok
		            "razaoSocial" : razaoSocial, //ok
		            "descritivo": descritivo,
	    			"razaoSocialCliente":razaoSocial,
	    			"razaoSocialTrans":razaoSocialTrans,
	    			"nomeAbreviado":nomeAbreviado,
	    			"endereco":endereco,
	    			"cnpjTrans":cnpjTrans,
	    			"bairro":bairro,
	    			"telefone":telefone,
	    			"cep":cep,
	    			"cidade":cidade,
	    			"estado":estado,
	    			"diaAgendado":diaAgendado,
	    			"cnpj":cnpj
	    		}
	    	});   	
		}
	    	// fim agenda retirada


	    
	    
	    // começo dos complementos
	    
	    
	    
	    
	    
		var numProcesso = getValue("WKNumProces");
		var numThread = 0;
		var minhaLinha = hAPI.getCardValue("minhaLinha");
	    var mensagem = hAPI.getCardValue("areaRespRegional___"+minhaLinha);
	    // 
		var minhaLinha1 = hAPI.getCardValue("minhaLinha1");
	    var mensagem1 = hAPI.getCardValue("areaRespPadrao___"+minhaLinha1);
	    // 
		var minhaLinha2 = hAPI.getCardValue("minhaLinha2");
	    var mensagem2 = hAPI.getCardValue("areaRespDiretor___"+minhaLinha2);
	    // 
		var minhaLinha3 = hAPI.getCardValue("minhaLinha3");
	    var mensagem3 = hAPI.getCardValue("areaRespPresidente___"+minhaLinha3);
	    // 
	    var mensagem4 = hAPI.getCardValue("obsCompara");
	    // 
		var minhaLinha4 = hAPI.getCardValue("minhaLinha4");
	    var mensagem5 = hAPI.getCardValue("areaRespDif___"+minhaLinha4);
	    
	    var user = getValue("WKUser");
	    var numAtividade = parseInt(getValue("WKNumState"));
	    	 
	    //var ativAtual = getValue("WKNumState");
	    	    
		log.info("#### ENTRANDO NO BEFORE TASK SAVE mensagem encontro de NOTAS " + mensagem4 + "usuario "+ user );

//		var user = getUser(getValue("WKUser"));		


		if(numAtividade == 5){
			 
			 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem1);

		}

		if(numAtividade == 12){
			 
			 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem);

		}
		
		if(numAtividade == 13){
			 
			 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem2);

		}
		
		if(numAtividade == 15){
			 
			 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem3);

		}

		if(numAtividade == 42){
				
		    var user = getValue("WKUser");
		    var mensagem4 = hAPI.getCardValue("obsCompara");
		    var comparaDesc = hAPI.getCardValue("comparaDesc");
		    
		    if(comparaDesc == "nao"){ 
			 hAPI.setTaskComments(user, numProcesso,  numThread, mensagem4);
		    }
		}


		if(numAtividade == 68){
			 
			 hAPI.setTaskComments("userId", numProcesso,  numThread, mensagem5);
	//		 log.info("#### mensagem Aprovação diferença ", mensagem5);

		}

	    
		
	}
	


function loadLivTNU(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}

function getChildrenIndexes(fieldName) {
	var datos = hAPI.getCardData(getValue("WKNumProces"));
	var enteries = datos.entrySet().iterator();
	var indexes = [];

	while (enteries.hasNext()) {
		var e = enteries.next();
		if (e.getKey().startsWith(fieldName + "___")) {
			indexes.push(e.getKey().split("___")[1]);
		}
	}
	return indexes;
}



function truncate(valor){
	  var truncated = Math.floor(valor * 100) / 100;
	      truncated = truncated.toFixed(2).toString().replace(".",",");
	  return truncated;
	}
