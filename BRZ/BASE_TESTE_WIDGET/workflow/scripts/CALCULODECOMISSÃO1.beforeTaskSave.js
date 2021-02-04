function beforeTaskSave(colleagueId,nextSequenceId,userList){
	if(nextSequenceId == 18 && hAPI.getCardValue("cpVerificaAtualizacao") == ""){
		hAPI.setCardValue("cpVerificaAtualizacao", "true");
	}
}	