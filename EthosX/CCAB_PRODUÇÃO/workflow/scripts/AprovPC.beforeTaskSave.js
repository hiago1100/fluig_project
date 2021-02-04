function beforeTaskSave(colleagueId,nextSequenceId,userList){
	if (nextSequenceId == 7 || nextSequenceId == 19){
		hAPI.setCardValue("matAprovador", getValue("WKUser"));
		
		if (nextSequenceId == 19){
			hAPI.setCardValue("motivo", getValue("WKUserComment"));
		}
	}
	
	
}