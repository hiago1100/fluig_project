function beforeTaskSave(colleagueId,nextSequenceId,userList){
		log.info("========== beforeTaskSave Solicitação de Manutenção (Inicio) ==========");

		var atividade   = getValue("WKNumState");

		if(nextSequenceId == 5 ){

	        log.info("=========== nextSequenceId: " + nextSequenceId);

			try{
	    		var solicitante   = hAPI.getCardValue("solicitante");
	    		var motivo       = hAPI.getCardValue("motivo");
	    		var numProces     = getValue("WKNumProces");

	    		//Monta mapa com parametros do template
	    		var parametros = new java.util.HashMap();
	    		parametros.put("nome_usuario", solicitante); //definir quem vai receber o email
	    		parametros.put("motivo", motivo);
	    		parametros.put("numero_solicitacao", numProces);

				//Este parâmetro é obrigatório e representa o assunto do e-mail
	    		parametros.put("subject", "Notificação - Solicitação de Manutenção");

	    		//Monta lista de destinatários
	    		var destinatarios = new java.util.ArrayList();
	    		destinatarios.add(solicitante);
	    		// destinatarios.add("william.joao@grupoDkp.com.br");

	    		//Envia e-mail
	    		notifier.notify("admin", "email_solicitacao_manutencao", parametros, destinatarios, "text/html");

	    		//log.info("========== Email enviado para usuário: " + solicitante);

	    		log.info("========== beforeTaskSave Solicitação de Manutenção (FIM) =========================")

			} catch(e){
			    log.info("============= Error: " + e);
			}       
		}
}