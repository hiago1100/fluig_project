function beforeCancelProcess(colleagueId,processId){
	var ativAtual = getValue("WKNumState");
	var user = getValue('WKUser');

	if (user != '44209840823'){
		if (ativAtual == 42){
			throw "Não é possivel cancelar a solicitação na atividade de pagamento!";
		}
		
		if (ativAtual == 46){
			throw "Não é possivel cancelar a solicitação na atividade de compensação!";
		}
		
	}
	
	hAPI.setCardValue("status", 'cancelada');
	
}