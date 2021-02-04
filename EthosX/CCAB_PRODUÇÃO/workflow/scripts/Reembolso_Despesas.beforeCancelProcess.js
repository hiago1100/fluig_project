function beforeCancelProcess(colleagueId,processId){
	var atividade  = getValue("WKNumState");
	
	if(atividade == 25){

	    log.info("dentro do if cancelamento");
	    throw "Solicitação não pode ser cancelada, pois o titulo já foi criado!";
	    

	}
}