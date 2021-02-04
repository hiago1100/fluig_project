function afterStateEntry(sequenceId){
	hAPI.setCardValue("seqProcesso", sequenceId);
	hAPI.setCardValue("numeroSolicitacao", getValue("WKNumProces"));
	if (sequenceId == 54 || sequenceId == 32 || sequenceId == 38){
		hAPI.setCardValue("status", 'finalizada');
	}
}