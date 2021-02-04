function criaDesvinculados(){
	var camposItens = {"sPrioridadeProdutoDesv": "sPrioridadeProduto",
				       "hiddenPrioridadeDesv": "hiddenPrioridade",
				       "txtSeqItemProdutoDesv": "txtSeqItemProduto",	
				       "txtCodItemProdutoDesv": "txtCodItemProduto",
				       "txtDescProdutoDesv": "txtDescProduto",
				       "txtUnidMedProdutoDesv" :"txtUnidMedProduto",
				       "txtQuantidadeProdutoDesv":"txtQuantidadeProduto",
				       "txtSaldoProdutoDesv": "txtSaldoProduto",
				       "dtNecessidadeProdutoDesv": "dtNecessidadeProduto",
				       "txtArmazemProdutoDesv": "txtArmazemProduto",
				       "prazoProdutoDesv": "prazoProduto",				       
				       "txtObsProdutoDesv" : "txtObsProduto",					   
					   "nmFabricanteDesv": "nmFabricante",
					   "txtConsumoMedioDesv": "txtConsumoMedio",
				       "txtContaContabilDesv": "txtContaContabil"};	
	// verificar se item itensDesvinculados
	if (hAPI.getCardValue("txtCodItemProdutoDesv___1") != null) {
	    try {
				var workflowServiceProvider = ServiceManager.getServiceInstance("WorkflowService");
				var workflowServiceLocator = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceServiceLocator");				
			    var workflowService = workflowServiceLocator.getWorkflowEngineServicePort();
			    	    
			    var config = new objDataSet("configServer");
			    config.buscar();
			    var configServer = config.getDados();
			    try {
				     for ( var posValues in configServer.values) {
				      var wsUser = configServer.getValue(posValues,"usuarioPublicaDoc");
				      var wsPass = configServer.getValue(posValues,"senhaPublicaDoc");
				     }
			    } catch (e) {
			    	log.error("Falha ao utilizar o objAnexo, não encontrado dataSet configServer.");
			    }
			    var wsCompany = 1;
	
			    var grupoAnaliseComprador = hAPI.getCardValue("grupoAnaliseComprador");
			    var usuarioDestino = workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
			    
			    
			    var userAux = new Array(grupoAnaliseComprador);
			    			   
			    usuarioDestino.setItem(userAux);
			
			    var keyValueDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");	    	    
			    var listaCampos = new Array();		
			    
				var numProcess = getValue("WKNumProces");
				var obsSolic = "Solicitação gerada a partir dos itens desvinculados na solicitação " + numProcess; 
			    		    
				var mapa = hAPI.getCardData(parseInt(numProcess));
				var card = new java.util.HashMap();
			    
				var it = mapa.keySet().iterator();
				while (it.hasNext()) {
				   var campo = it.next();
				   
				   // cabe?alho
				   if(campo == "nmFilial"                          ||
				      campo == "hiddenFilial"                      ||
				      campo == "txtNmRequisitante"                 ||
				      campo == "txtComprador"                      ||
				      campo == "hiddenComprador"                   ||
				      campo == "txtCodCentroCusto"                 ||
				      campo == "txtNomeCentroCusto"                ||
				      campo == "nmFilialEntrega"                   ||
				      campo == "hiddenFilialEntrega"               ||				
				      campo == "txtLocalEntrega"                   ||
				      campo == "rdContrato"                        ||
				      campo == "ckImportado"                       ||						
				      campo == "dtValidadeCotacao"                 ||
				      campo == "txtCodFormaPagamento"              ||	
				      campo == "txtNomeFormaPagamento"             ||
				      campo == "hrValidadeCotacao"                 ||
				      campo == "grupoAnaliseComprador"             ||				      
				      campo == "dtEmissao"                         ||
				      campo == "FilialAlcada"                      ||
				      campo == "filial_protheus"                   ||

				      // correcao filial vazia
				      campo == "codigo_filial"                     ||
				      campo == "filial"                            ||
				      campo == "codigo"                            ||
				      campo == "analyticsNmFilial"				   ||
				      campo == "cdSolicitante"   				   ||
				      
				      //glpi 136367
				      campo == "isProdutoTI" ||
				      campo == "txtAInfoAdicionais" ||
				      				      
				      // pai x filho tbItens				      
				      
				      campo.indexOf("sPrioridadeProdutoDesv___") > -1   ||
				      campo.indexOf("hiddenPrioridadeDesv___") > -1     ||
				      campo.indexOf("txtSeqItemProdutoDesv___") > -1    ||
				      campo.indexOf("txtCodItemProdutoDesv___") > -1    ||			
				      campo.indexOf("txtDescProdutoDesv___") > -1       ||
				      campo.indexOf("txtUnidMedProdutoDesv___") > -1    ||
				      campo.indexOf("txtQuantidadeProdutoDesv___") > -1        ||
				      campo.indexOf("txtSaldoProdutoDesv___") > -1      ||	             
				      campo.indexOf("dtNecessidadeProdutoDesv___") > -1     ||	             
				      
				      campo.indexOf("txtArmazemProdutoDesv___") > -1       ||				      
				      
				      campo.indexOf("dtEmissaoProdutoDesv___") > -1     ||				      
				      
				      campo.indexOf("prazoProdutoDesv___") > -1     ||
				      campo.indexOf("txtObsProdutoDesv___") > -1        ||
				      				      
				      campo.indexOf("nmFabricanteDesv___") > -1        ||				      
				      campo.indexOf("txtConsumoMedioDesv___") > -1        ||
				      
				      campo.indexOf("txtContaContabilDesv___") > -1){

					   var keyValueDto1 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");

				      
				 	 if (campo.indexOf("___") > -1) {
				 		 
							 var nomeCampo = campo.split("___")[0];
							 var sufixo = campo.split("___")[1];
							 var campoSolicNova = camposItens[nomeCampo] + "___" + sufixo; 
				          		             
				          keyValueDto1.setKey(campoSolicNova);
				   	 }
				 	 else
				 	 {
				 		 keyValueDto1.setKey(campo);
				   	 }
				     keyValueDto1.setValue(mapa.get(campo));
				     listaCampos.push(keyValueDto1);
				   } // if(campo)
			   
			    } // while
			   				
				keyValueDtoArray.setItem(listaCampos);
		    
			    var processTaskAppointmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
			    var processAttachmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");

				
			    var usuarioAbertura = hAPI.getCardValue("idRequisitante");			    
							    

			    var keyValueDtoArrayResult = workflowService.startProcessClassic(wsUser, wsPass, wsCompany, "SolicitacaoCompras", 137,usuarioDestino, obsSolic, usuarioAbertura, true,processAttachmentDtoArray, keyValueDtoArray, processTaskAppointmentDtoArray, false);
			    
			    
				
			} catch (e) {
	    	
				log.info("_-------------------ERRO WEBSERVICE STARTPROCESS DESVINCULADO------"+e.message);
	    	
	    	
			}		

	    
	
	
	  } // if
	
	
	
} // fim