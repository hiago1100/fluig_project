function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	// var fnEmail = loadLiv(["com.totvsNacoesUnidas.fluig.js.ds.CustomEmail"]);
	
	// var ds = DatasetBuilder.newDataset();
	// ds.addColumn("OK");

 //    var solicitante     = "Hiago Oliveira";
 //    var numSolicitacao     = "123123";
 //    // var dataSolicitacao = "29/08/2018";
 //    // var unidade         = "São Paulo";
 //    // var fornecedor      = "Teste";
 //    // var status          = "Aprovado";

    
 					
	// 		//for (var i = 0; i < 900; i++) {
	
	// 			log.info("Dentro do dataset Produção");	

	// 	    	fnEmail.mail.sendCustomEmail({
	// 	    		 companyId: getValue("WKCompany"),
	//                  subject: "O QUE EU FALEI PRA VOCE ?!?!?!",
	//                  from: "hiago.oliveira@live.com", 
	//                  to: "nilson.ramos@grupodkp.com.br",
	//                  templateId: "tempEmailExt", // ID do template criado no Fluig
	//                  templateDialect: "pt_BR", 
	//                  templateHtml: "cancelamentoExtemporaneo.html", // nome do arquivo html
	//                  dados: {   // Essa parte dos dados, serão os dados do form para enviar por email
	// 					 "solicitante": "Hiago Domingos",
	// 					"numProcesso": "6666"
						
	// 					// "centroCusto": centroCusto,
	// 					// "dataSolicitacao": dataSolicitacao,
	// 					// "unidade":unidade, //ok
	// 					// "fornecedor":fornecedor, // ok
	// 					// "status":status //ok  
	//                  }
	// 	    	});
		    	
	// 	   // }
	// 	    	ds.addRow(["OK"]);
		    	
	
    	
	// return ds;



          var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
          var processAttachmentDtoArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
          var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
          var campos =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
          var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

           var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
           var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
           var cardData =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');

          // Adicionando os campos no cardData do no fluxo de NFD
      var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          fieldCampo1.getItem().add("fornecedor");
          fieldCampo1.getItem().add("Hiago Oliveira");
          cardData.getItem().add(fieldCampo1);            
                  
                  // var fieldCampo2  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo2.getItem().add("datasolic");
          //       fieldCampo2.getItem().add(dataSolicitante);
          //       cardData.getItem().add(fieldCampo2);
                
          //       var fieldCampo3  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo3.getItem().add("cdSolicitante");
          //       fieldCampo3.getItem().add(codSolicitante);
          //       cardData.getItem().add(fieldCampo3);
                
          //       var fieldCampo4  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo4.getItem().add("analyticsNmFilial");
          //       fieldCampo4.getItem().add(filial);
          //       cardData.getItem().add(fieldCampo4);
                
          //       var fieldCampo5  = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo5.getItem().add("area");
          //       fieldCampo5.getItem().add("Compras Mat/Med");
          //       cardData.getItem().add(fieldCampo5);
                
          //       var fieldCampo6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo6.getItem().add("categoria");
          //       fieldCampo6.getItem().add("Recebimento de Compras de Mat/ Med");
          //       cardData.getItem().add(fieldCampo6);
                
          //       var fieldCampo7 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo7.getItem().add("solicitacao");
          //       fieldCampo7.getItem().add("Envio de Nota de Bonificação, outras remessas e devolução");
          //       cardData.getItem().add(fieldCampo7);
                
          //       var fieldCampo8 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo8.getItem().add("analyticsTpSolicitacao");
          //       fieldCampo8.getItem().add("Solicitacao De Chamados");
          //       cardData.getItem().add(fieldCampo8);
                  
          //       var fieldCampo9 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo9.getItem().add("codigoCadastro");
          //       fieldCampo9.getItem().add("envioNotaBonificacaoOutrasRemessas");
          //       cardData.getItem().add(fieldCampo9);
                
                  // var fieldCampo10 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo10.getItem().add("grupoId");
                  // fieldCampo10.getItem().add("DOCUMENTOS_FISCAL");
          //       cardData.getItem().add(fieldCampo10);                 
                  
                  // var fieldCampo11 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo11.getItem().add("grupoDescricao");
          //       fieldCampo11.getItem().add("CSO - Fiscal");
          //       cardData.getItem().add(fieldCampo11);
                
          //       var fieldCampo12 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo12.getItem().add("sla");
          //       fieldCampo12.getItem().add("2");
          //       cardData.getItem().add(fieldCampo12);
                  
                  // var fieldCampo13 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo13.getItem().add("medidaPrazo");
                  // fieldCampo13.getItem().add("horas");
          //       cardData.getItem().add(fieldCampo13);
                  
                  // var fieldCampo14 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo14.getItem().add("filial");
                  // fieldCampo14.getItem().add(filial);
          //       cardData.getItem().add(fieldCampo14);
                
          //       var fieldCampo15 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
          //       fieldCampo15.getItem().add("prioridade");
          //       fieldCampo15.getItem().add(prioridade);
          //       cardData.getItem().add(fieldCampo15);
                
                  // var fieldCampo16 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo16.getItem().add("tituloSolicitacao");
                  // fieldCampo16.getItem().add(tituloSolicitacao);
          //       cardData.getItem().add(fieldCampo16);
                
                  // var fieldCampo17 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                  // fieldCampo17.getItem().add("descricaoProblema");
                  // fieldCampo17.getItem().add("Nota Fiscal: " + numNF + ", " + "VALOR DA NOTA: " + valorNF + ", " + "VENCIMENTO: " + vencimentoNF + ", " + "CNPJ Fornecedor: " + cnpjFornecedor);
          //       cardData.getItem().add(fieldCampo17);
                  
                // Serviço WS StartProcess
                  var rest = workflowEngineService.startProcess("integrador.guiando@oncoclinicas.com",
                         "#9?vu3ip0erO",
                         1,
                         "Encerramentodecontratos",
                         0,
                         stringArray, 
                         "Solicitação inicializada pela função hAPI",
                         "admin.fluig.oncoclinicas.com.1",
                         false, 
                         processAttachmentDtoArray,
                         cardData,
                         processTaskAppointmentDtoArray, 
                         false);    


                  var iProcess = "";
                  for (var j = 0; j < rest.getItem().size(); j++) {
                      var item = rest.getItem().get(j).getItem();
                      var key = item.get(0);
                      var value = item.get(1);
                      log.info("numero do chamado 0 " + value);

                      if (key == "iProcess") { 
                          iProcess = value;
                          log.info("numero do chamado 1 " + value);
                      }
                  }                        

	
	
}function onMobileSync(user) {
}
//loadLiv - v1.0 - All rights reserverd
function loadLiv(e){var t={};if(e==null){return t}var n=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t)return true}return false};var r=DatasetFactory.getDataset("tnuCustomJS",null,null,null);for(var i=0;i<r.rowsCount;i++){var s=r.getValue(i,"liv");if(n(e,s)){var o=r.getValue(i,"src");var u=r.getValue(i,"name");try{var a=new Function("liv","return "+o);t[u]=a(t)}catch(f){log.error("*** Erro ao compilar livraria "+s+":"+f)}}}return t}


