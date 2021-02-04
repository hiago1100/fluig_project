function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var atividade = hAPI.getCardValue("seqProcesso");
	var matSolicitante = getValue("WKUser");

	if (atividade == 0){
		validaAnexo();
	}

	if(hAPI.getCardValue("nivel") == "02" && atividade == "5"){
		hAPI.setCardValue("matPrimeiroAprov",matSolicitante);
	}

}

function validaAnexo(){
	var attachments = hAPI.listAttachments();
	
	if (hAPI.getCardValue("tipoPagamento") == "Boleto"){
		if (attachments.size() <= 0){
			throw "É obrigatório anexar o boleto!";
		}
	}
}