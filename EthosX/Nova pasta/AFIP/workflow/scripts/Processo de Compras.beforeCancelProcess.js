function beforeCancelProcess(colleagueId,processId){
	var atividade = getValue("WKNumState");
	
	if(atividade != 4){
		throw "\n\nNão é permitido cancelamento após o envio da solicitação";
	}
	
}