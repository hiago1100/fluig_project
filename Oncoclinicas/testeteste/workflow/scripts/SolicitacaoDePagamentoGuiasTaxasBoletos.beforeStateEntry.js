function beforeStateEntry(sequenceId) {
	var pastaPai = 8898;
	var verificarAnexo = new checkAnexo();
	
	populaCamposHiddenAnalytics(sequenceId);
	
	
	
	
	
	if (sequenceId == GESTOR) {
		
		var nivelAtualAprovacao = hAPI.getCardValue("nivelAtualAprovacao");
		var nivelMaximoAprovacao = hAPI.getCardValue("nivelMaximoAprovacao");
		
		if(nivelAtualAprovacao < nivelMaximoAprovacao){
			
			nivelAtualAprovacao = parseInt(nivelAtualAprovacao) + 1;
			hAPI.setCardValue("proximoAprovador", hAPI.getCardValue("idAprovGestor" + nivelAtualAprovacao));
			//hAPI.setCardValue("codigoAprovador", hAPI.getCardValue("idAprovGestor" + nivelAtualAprovacao));
			
		} else {
			
			hAPI.setCardValue("proximoAprovador", "");
			
		}
		
	}
	
	
	
	
	
	
	
	if (sequenceId) {
		log.info("beforeStateEntry -> Proxima Tarefa =>>>> " + sequenceId);
		if (sequenceId == ATRIBUIR_RESPONSAVEL) {			
			verificarAnexo.executar("Guias/Taxas/Boletos/Nota Fiscal");
		} else if (sequenceId == 31) {
			verificarAnexo.executar("Guias/Taxas/Boletos/Nota Fiscal");
			publicaDocumento(pastaPai);
		}else if(sequenceId == SOLUCAO_INC && sequenceId != buscarAtividadeAtual()){
			incrementaNrReprovacoes();
		}			
	} else {
		log.info("Execu??o do beforeStateEntry sem preenchimento do sequenceId!");
		return;
	}
	
	if (sequenceId == ATRIBUIR_RESPONSAVEL) {
		//var gestorResponsavel = getWFParametro("gestorResponsavel");
		//if(gestorResponsavel == ""){
			//throw "Ausência de cadastro de Gestor para aprovação do Centro de Custo selecionado. Favor entrar em contato com a Central de Atendimento.";  
		//}
		definirAtividadeAutomatica();
	}
	
	if (sequenceId == ATUALIZA_SLA_1) {
		var users = new java.util.ArrayList();
		users.add(hAPI.getCardValue("cdSolicitante")); 		
		hAPI.setAutomaticDecision(CORRECAO, users,
			"Tarefa movimentada atualizando o tempo que está sendo empenhado na atividade.");
	}
	
	if (sequenceId == ATUALIZA_SLA_2) {
		var users = new java.util.ArrayList();
		users.add(hAPI.getCardValue("cdSolicitante")); 
		hAPI.setAutomaticDecision(APROV_SOLIC, users,
			"Tarefa movimentada atualizando o tempo que está sendo empenhado na atividade.");
		
	}
	
}

function publicaDocumento(pastaPai) {
	var tipoSolicitacao = getTipoSolicitacao();
	log.info("tipoSolicitacao: " + tipoSolicitacao);
	log.info("Prepara??o para a publica??o dos anexos!");
	var objAnexar = new objAnexo(pastaPai);

	objAnexar.setParametro(1, tipoSolicitacao);
	objAnexar.setParametro(2);

	log.info("TRATOU STRING");
	
	objAnexar.publicar();
	log.info("PUBLICOU ARQUIVO");
}

function getTipoSolicitacao() {
	var nomeTipo = '';
	nomeTipo = i18n.translate("label.pgtoTaxasBoletos");
	return nomeTipo;
}

function definirAtividadeAutomatica() {
	var users = new java.util.ArrayList();
	users.add("System:auto");
	hAPI.setAutomaticDecision(EXCLUSIVO_ATRIBUICAO, users,
			"Decisao tomada automaticamente pelo Fluig");

	log.info("movimentando para a atividade automatica");
}