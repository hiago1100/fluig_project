function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	// Instancia o serviço
// Obtém a instância do serviço 'WorkflowEngineService'
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



















	// if (nextSequenceId == 5) {

	//     var anexos   = hAPI.listAttachments();
	//     var temAnexo = false;

	//     if (anexos.size() > 0) {
	//         temAnexo = true;
	//     }

	//     if ((!temAnexo)){
	//         throw "<br><br>Para continuar a solicitação por favor inserir anexo do Contrato!<br><br>";
	//     }

	// }

	// if (nextSequenceId == 19){

	// 	log.info("Antes da soma " + hAPI.getCardValue("nivelAtualAprovacao"));
	// 	hAPI.setCardValue("nivelAtualAprovacao", parseInt(hAPI.getCardValue("nivelAtualAprovacao")) + 1);
	// 	log.info("Depois da soma " + hAPI.getCardValue("nivelAtualAprovacao"));
	// }
}