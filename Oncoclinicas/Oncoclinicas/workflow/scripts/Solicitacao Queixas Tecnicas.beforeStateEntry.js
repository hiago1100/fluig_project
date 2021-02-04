function beforeStateEntry(sequenceId){
	
	var CURRENT_STATE = getValue('WKNumState');
	
	if(CURRENT_STATE == 10 && hAPI.getCardValue('aprovMatMed') == 'SIM'){		
		var sender = "1umcvsru1dngvu8n1539114285072";
		try{
		    //Monta mapa com parâmetros do template
		    var parameters = new java.util.HashMap();
		    var constaEstoqueOuPerda = hAPI.getCardValue("hiddenSituacaoEstoque");
		    
		    if(constaEstoqueOuPerda == "SIM" || constaEstoqueOuPerda == "NAO"){
				parameters.put("CONSTAESTOQUEOUPERDA", constaEstoqueOuPerda);
			}else{
				parameters.put("CONSTAESTOQUEOUPERDA", "");
			}
		    
		    parameters.put("RAZAO_SOCIAL",hAPI.getCardValue("razaoSocial"));
			parameters.put("CNPJ_FILIAL",hAPI.getCardValue("cnpjFilial"));		    
			parameters.put("ENDERECO",hAPI.getCardValue("endereco"));
			parameters.put("COMPLEMENTO",hAPI.getCardValue("complemento"));
			parameters.put("BAIRRO",hAPI.getCardValue("bairro"));
			parameters.put("CIDADE",hAPI.getCardValue("cidade"));
			parameters.put("ESTADO",hAPI.getCardValue("estado"));
			parameters.put("RESPONSAVEL",hAPI.getCardValue("nomeResponsavel"));
			parameters.put("CONSELHOPROFISSIONAL",hAPI.getCardValue("numConselhoProfi"));
			parameters.put("UF",hAPI.getCardValue("uf"));
			parameters.put("NOTIVISA", hAPI.getCardValue("notificacaoNotivisa"));
			parameters.put("CODPRODUTO", hAPI.getCardValue("codProduto"));
			parameters.put("PRODUTO", hAPI.getCardValue("descricaoProdu"));
			parameters.put("TIPOPRODUTO", hAPI.getCardValue("tipoProduto"));
			parameters.put("PRINCIPIOATIVO", hAPI.getCardValue("principioAtivo"));
			parameters.put("FORMAFARMACEUTICA", hAPI.getCardValue("formFarmaceutica"));
			parameters.put("FABRICANTE", hAPI.getCardValue("fabricante"));
			parameters.put("LOTE", hAPI.getCardValue("loteProduto"));
			parameters.put("VALIDADE", hAPI.getCardValue("validadeProduto"));
			parameters.put("FORNECEDOR", hAPI.getCardValue("fornecedor"));
			parameters.put("NF", hAPI.getCardValue("nfProduto"));
			parameters.put("RASTREABILIDADE", hAPI.getCardValue("numSeloRastreabilidade"));
			parameters.put("DESCRICAODESVIO", hAPI.getCardValue("descricaoDesvio"));
			parameters.put("EVIDENCIA", hAPI.getCardValue("aceiteEvidencia"));
			parameters.put("QUANTIDADEDESVIO", hAPI.getCardValue("qtdDesvio"));
			parameters.put("QUARENTENA", hAPI.getCardValue("recolhimentoProduto"));
			parameters.put("DEVOLVERUNIDADE", hAPI.getCardValue("devolverUnidades"));
			parameters.put("QUANTAS", hAPI.getCardValue("qtdMesmoLote"));
			parameters.put("EMPACIENTE", hAPI.getCardValue("adminEmPaciente"));
			parameters.put("IMPACTOPACIENTE", hAPI.getCardValue("impactoPaciente"));
			parameters.put("DESCRICAOIMPACTO", hAPI.getCardValue("descricaoImpacto"));
			
		    //Este parâmetro é obrigatório e representa o assunto do e-mail
		    parameters.put("subject", "[GRUPO ONCOCLÍNICAS] Queixa Técnica - " + hAPI.getCardValue("descricaoProdu"));
		 
		    //Monta lista de destinatários
		    var recipients = new java.util.ArrayList();
		    recipients.add(hAPI.getCardValue('emailFornecedor'));
		    recipients.add(hAPI.getCardValue('emailAlternativo'));
		    
		    log.info("E-mails enviados" + recipients);
		    
		    //Envia e-mail
		    notifier.notify(sender, "template_email_mat_med", parameters, recipients, "text/html");
		    
		} catch(e){
			throw "Ocorreu um erro ao tentar enviar o e-mail: " + e;
		}
	}
	
		if(CURRENT_STATE == 57 && hAPI.getCardValue('equipamentoRecolhido') == 'SIM' && hAPI.getCardValue('hiddenSituacaoEstoque') == 'SIM'){
			// Atividade que cria um subfluxo e abre solicitação para NF de Entrada
			
			var anexoColetaNFD   = hAPI.listAttachments();
			
			// Obtém a instância do serviço 'WorkflowEngineService'
		  	var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
		  	var processAttachmentDtoArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
		  	var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
		  	var campos =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
		  	var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
		  	stringArray.getItem().add("Pool:Group:DOCUMENTOS_FISCAL");
		  	
		  	// Adicionando o anexo a nova solicitação aberta do subfluxo NFD
	        for (var i = 0; i < anexoColetaNFD.size(); i++) {
	        	
	        	var doc = anexoColetaNFD.get(i);
	        	var descricao = hAPI.getCardValue("numAnexoNF");
	        	
	        	if(doc.getDocumentId() == descricao){
	        	
			        var nfAttachmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
			        nfAttachmentDto.setAttachmentSequence(i);
			        nfAttachmentDto.setCompanyId(1);
			        nfAttachmentDto.setDocumentType(2);
			        nfAttachmentDto.setFileName(doc.getDocumentDescription());
			        nfAttachmentDto.setDescription(doc.getDocumentDescription());
			        nfAttachmentDto.setNewAttach(true);
			        nfAttachmentDto.setVersion(1000);
			        nfAttachmentDto.setDocumentId(doc.getDocumentId());
			        
			        var attachment =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
			        attachment.setAttach(true);
			        attachment.setFileName(doc.getDocumentDescription());
			        nfAttachmentDto.getAttachments().add(attachment);
			        processAttachmentDtoArray.getItem().add(nfAttachmentDto);
	        	}
	        } 
			
	        // Recebendo os valores do Fluxo Queixas Técnicas
			var nomesolicitante = hAPI.getCardValue('nomeSolicitanteUnidade');
			var dataSolicitante = hAPI.getCardValue('dataSolicitanteUnidade');
			var codSolicitante = hAPI.getCardValue('codSolicitante');
			var filial = hAPI.getCardValue('razaoSocial');
			var prioridade = hAPI.getCardValue('prioridade');
			var tituloSolicitacao = hAPI.getCardValue('tituloSolicitacao');
			var numNF = hAPI.getCardValue('numNF');
			var valorNF = hAPI.getCardValue('valorNF');
			var vencimentoNF = hAPI.getCardValue('vencimentoNF');
			var cnpjFornecedor = hAPI.getCardValue('cnpjFornecedor');
			
			try{
		        // A tarefa destino tem o mecanismo de atribuição para um papel, cujo o código é papelUser
		        var users = "6flj4wx2g9j1intz1535047344468";

			 	// Instancia o serviço
		        var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
		      	var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
                var cardData =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
      

                // Adicionando os campos no cardData do no fluxo de NFD
		        var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo1.getItem().add("solicitante");
                fieldCampo1.getItem().add(nomesolicitante);
                cardData.getItem().add(fieldCampo1);	        
		        
		        var fieldCampo2  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo2.getItem().add("datasolic");
                fieldCampo2.getItem().add(dataSolicitante);
                cardData.getItem().add(fieldCampo2);
                
                var fieldCampo3  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo3.getItem().add("cdSolicitante");
                fieldCampo3.getItem().add(codSolicitante);
                cardData.getItem().add(fieldCampo3);
                
                var fieldCampo4  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo4.getItem().add("analyticsNmFilial");
                fieldCampo4.getItem().add(filial);
                cardData.getItem().add(fieldCampo4);
                
                var fieldCampo5  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo5.getItem().add("area");
                fieldCampo5.getItem().add("Compras Mat/Med");
                cardData.getItem().add(fieldCampo5);
                
                var fieldCampo6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo6.getItem().add("categoria");
                fieldCampo6.getItem().add("Recebimento de Compras de Mat/ Med");
                cardData.getItem().add(fieldCampo6);
                
                var fieldCampo7 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo7.getItem().add("solicitacao");
                fieldCampo7.getItem().add("Envio de Nota de Bonificação, outras remessas e devolução");
                cardData.getItem().add(fieldCampo7);
                
                var fieldCampo8 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo8.getItem().add("analyticsTpSolicitacao");
                fieldCampo8.getItem().add("Solicitacao De Chamados");
                cardData.getItem().add(fieldCampo8);
		        
                var fieldCampo9 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo9.getItem().add("codigoCadastro");
                fieldCampo9.getItem().add("envioNotaBonificacaoOutrasRemessas");
                cardData.getItem().add(fieldCampo9);
                
		        var fieldCampo10 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo10.getItem().add("grupoId");
		        fieldCampo10.getItem().add("DOCUMENTOS_FISCAL");
                cardData.getItem().add(fieldCampo10);		        
		        
		        var fieldCampo11 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo11.getItem().add("grupoDescricao");
                fieldCampo11.getItem().add("CSO - Fiscal");
                cardData.getItem().add(fieldCampo11);
                
                var fieldCampo12 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo12.getItem().add("sla");
                fieldCampo12.getItem().add("2");
                cardData.getItem().add(fieldCampo12);
		        
		        var fieldCampo13 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo13.getItem().add("medidaPrazo");
		        fieldCampo13.getItem().add("horas");
                cardData.getItem().add(fieldCampo13);
		        
		        var fieldCampo14 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo14.getItem().add("filial");
		        fieldCampo14.getItem().add(filial);
                cardData.getItem().add(fieldCampo14);
                
                var fieldCampo15 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                fieldCampo15.getItem().add("prioridade");
                fieldCampo15.getItem().add(prioridade);
                cardData.getItem().add(fieldCampo15);
                
		        var fieldCampo16 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo16.getItem().add("tituloSolicitacao");
		        fieldCampo16.getItem().add(tituloSolicitacao);
                cardData.getItem().add(fieldCampo16);
                
		        var fieldCampo17 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
		        fieldCampo17.getItem().add("descricaoProblema");
		        fieldCampo17.getItem().add("Nota Fiscal: " + numNF + ", " + "VALOR DA NOTA: " + valorNF + ", " + "VENCIMENTO: " + vencimentoNF + ", " + "CNPJ Fornecedor: " + cnpjFornecedor);
                cardData.getItem().add(fieldCampo17);
		        
                // Serviço WS StartProcess
		        var rest = workflowEngineService.startProcess("integrador.guiando@oncoclinicas.com",
		        		"#9?vu3ip0erO",
		        		1,
		        		"SolicitacaoDeChamados",
		        		52,
		        		stringArray, 
		        		"Solicitação inicializada pela função hAPI",
		        		codSolicitante,
		        		true, 
		        		processAttachmentDtoArray,
		        		cardData,
		        		processTaskAppointmentDtoArray, 
		        		true);      
		        
		        // Adicionando o número da nova solicitação aberta de NFD para o Fluxo Queixas Técnicas
		        var iProcess = "";
		        for (var j = 0; j < rest.getItem().size(); j++) {
		            var item = rest.getItem().get(j).getItem();
		            var key = item.get(0);
		            var value = item.get(1);

		            if (key == "iProcess") { 
		                iProcess = value;
		                hAPI.setCardValue('numChamadoNF', iProcess);
		            }
		        }	        		        
		        
		        return true;
		        
			} catch(e){
				throw "Ocorreu um erro ao tentar criar uma solicitação de NOTA FISCAL " + e;
			}
		}
	}