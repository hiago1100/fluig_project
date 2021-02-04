function beforeTaskSave(colleagueId,nextSequenceId,userList){

	if(nextSequenceId === 10) {
		var anexos = hAPI.listAttachments();

		if(anexos.size() === 0) {
			throw("Necessário assinar o termo de opção de vale transporte e anexar ao processo");
		}

		if(anexos.size() > 1) {
			throw("Solicitação possui mais de um arquivo em anexo, anexe somenteo termo assinado mais recente e remova o restante.");
		}
	}

}