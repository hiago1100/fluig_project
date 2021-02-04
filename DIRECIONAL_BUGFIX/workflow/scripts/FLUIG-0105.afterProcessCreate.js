function afterProcessCreate(processId){
	hAPI.setCardValue( "cpNumSolicitacao", getValue("WKNumProces") );
	//CENTRAL DE TAREFAS
	Anexos(getValue("WKNumProces"));
	Resumo(getValue("WKDef"),getValue("WKNumProces"));  
	
	addCentralTarefasInfo(getValue("WKDef"),getValue("WKNumProces"));  
}