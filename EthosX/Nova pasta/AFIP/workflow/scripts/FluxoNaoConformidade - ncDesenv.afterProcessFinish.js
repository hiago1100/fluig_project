function afterProcessFinish(processId){
	
	hAPI.setCardValue("status", FINALIZADO)
	
	var eficaz = hAPI.getCardValue("confirmacaoEficacia");
	var numSolicitacao = getValue("WKNumProcess")
	if(eficaz == "Nao"){
		//enviarEmail(processId);
	}
}

function enviarEmail(numSolicitacao){
	
	var requester = getRequesterName(numSolicitacao)

	//Monta mapaPaiFilho com parâmetros do template
	var parametros = new java.util.HashMap();
	parametros.put("SERVER_URL",objeto.servidor);
	parametros.put("TENANT_ID", getValue("WKCompany"));
	parametros.put("RECEIVER", requester.requesterName);
	parametros.put("processo", processId);
	parametros.put("link_download", url);

	//Este parâmetro é obrigatório e representa o assunto do e-mail
	parametros.put("subject", "[Fluig] Solicitação "+numSolicitacao+ ": Ação não eficaz");

	//Monta lista de destinatários
	var destinatarios = new java.util.ArrayList();
	destinatarios.add(requester.requesterId);
	
	//Envia e-mail
	notifier.notify(getValue("WKUser"), "meu_template", parametros, destinatarios, "text/html");
}

function getRequesterName(numSolicitacao){
	var constraintNumSolicitacao = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", numSolicitacao, numSolicitacao, ConstraintType.MUST);
	
	var workflowProcess = DatasetFactory.getDataset("workflowProcess", null, [constraintNumSolicitacao], null);
	
	var requesterId = workflowProcess.getValue(0, "requesterId");
	
	var constraintNome = DatasetFactory.createConstraint("colleaguePK.colleagueId", requesterId, requesterId, ConstraintType.MUST);
	
	var colleague = DatasetFactory.getDataset("colleague", null, [constraintNome], null);
	var name = colleague.getValue(0, "colleagueName");
	
	return {
		requesterId: requesterId,
		requesterName: name
	}
	
}