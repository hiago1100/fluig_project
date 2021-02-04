function afterProcessCreate(processId){
    var numSolicitacao = getValue("WKNumProces");
	  hAPI.setCardValue("cpNumeroSolicitacao", numSolicitacao);

      //CENTRAL DE TAREFAS
      addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  

}