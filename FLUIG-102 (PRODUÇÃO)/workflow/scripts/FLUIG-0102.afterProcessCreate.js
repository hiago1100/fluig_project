function afterProcessCreate(processId){
	 hAPI.setCardValue( "cpNumeroSolicitacaoNovosColab", getValue("WKNumProces")); 
	 
	//CENTRAL DE TAREFAS
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
}