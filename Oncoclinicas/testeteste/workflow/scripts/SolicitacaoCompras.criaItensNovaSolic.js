function criaItensNovaSolic(){
		
		
	
	var camposItens = {"sPrioridadeProduto": "sPrioridadeProduto",
				       "hiddenPrioridade": "hiddenPrioridade",
				       "txtSeqItemProduto": "txtSeqItemProduto",	
				       "txtCodItemProduto": "txtCodItemProduto",
				       "txtDescProduto": "txtDescProduto",
				       "txtUnidMedProduto" :"txtUnidMedProduto",
				       "txtQuantidadeProduto":"txtQuantidadeProduto",
				       "txtSaldoProduto": "txtSaldoProduto",
				       "dtNecessidadeProduto": "dtNecessidadeProduto",
				       "txtArmazemProduto": "txtArmazemProduto",
				       "prazoProduto": "prazoProduto",				       
				       "txtObsProduto" : "txtObsProduto",					   
					   "nmFabricante": "nmFabricante",
					   "txtConsumoMedio": "txtConsumoMedio",
				       "txtContaContabil": "txtContaContabil"};	

	
	// verificar se item itensinculados
	if (hAPI.getCardValue("txtCodItemProduto___1") != null)
		
		
	{
			
		
	
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
			    var usuarioAbertura = hAPI.getCardValue("idRequisitante");	
			    var usuarioDestino = workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
			    
			    
			    var userAux = new Array(usuarioAbertura);
			    			   
			    usuarioDestino.setItem(userAux);
			
			    var keyValueDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");	    	    
			    var listaCampos = new Array();		
			    
				var numProcess = getValue("WKNumProces");
				var obsSolic = "Solicitação gerada a partir do parecer da solicitação " + numProcess; 
			    		    
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
				      
				      // pai x filho tbItens				      
				      
				      campo.indexOf("sPrioridadeProduto___") > -1   ||
				      campo.indexOf("hiddenPrioridade___") > -1     ||
				      campo.indexOf("txtSeqItemProduto___") > -1    ||
				      campo.indexOf("txtCodItemProduto___") > -1    ||			
				      campo.indexOf("txtDescProduto___") > -1       ||
				      campo.indexOf("txtUnidMedProduto___") > -1    ||
				      campo.indexOf("txtQuantidadeProduto___") > -1        ||
				      campo.indexOf("txtSaldoProduto___") > -1      ||	             
				      campo.indexOf("dtNecessidadeProduto___") > -1     ||	             
				      
				      campo.indexOf("txtArmazemProduto___") > -1       ||				      
				      
				      campo.indexOf("dtEmissaoProduto___") > -1     ||				      
				      
				      campo.indexOf("prazoProduto___") > -1     ||
				      campo.indexOf("txtObsProduto___") > -1        ||
				      				      
				      campo.indexOf("nmFabricante___") > -1        ||				      
				      campo.indexOf("txtConsumoMedio___") > -1        ||

				      campo.indexOf("txtContaContabil___") > -1){
				
					   
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
			    var keyValueDtoArrayResult = workflowService.startProcessClassic(wsUser, wsPass, wsCompany, "SolicitacaoCompras", 137,usuarioDestino, obsSolic, usuarioAbertura, false,processAttachmentDtoArray, keyValueDtoArray, processTaskAppointmentDtoArray, false);
			    
			    
				
			} catch (e) {
	    	
	    	
	    	
			}		

	    
	
	
	  } // if
	
	
	
} // fim