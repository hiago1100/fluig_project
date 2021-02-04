function enableFields(form){	
	
	var activity = getValue('WKNumState'); // armazena o número da atividade
			
	if ( activity == 12 || activity == 183 || activity == 66 || activity == 21 || activity == 199 || activity == 75 || activity == 28 || activity == 42 || activity == 49 || activity == 104 || activity == 107 || activity == 35 || activity == 130 || activity == 140) {  //Avaliar solicitação
		
		
		form.setEnabled("txt_tituloMudanca", false);
		form.setEnabled("txt_dataInicial", false);
		form.setEnabled("dt_dataFinal", false);
		form.setEnabled("txt_horaInicial", false);
		form.setEnabled("txt_horaFinal", false);
		form.setEnabled("txt_descricaoDetalhada", false);
		form.setEnabled("classificacao", false);
		form.setEnabled("motivo_melhoria", false);
		form.setEnabled("motivo_preventiva", false);
		form.setEnabled("motivo_projeto", false);
		form.setEnabled("motivo_legal", false);
		form.setEnabled("tipo_dadosbancarios", false);
		form.setEnabled("tipo_SI", false);
		form.setEnabled("tipo_aplicacao", false);
		form.setEnabled("tipo_telecom", false);
		form.setEnabled("tipo_segurancaInformacao", false);
		form.setEnabled("tipo_imac", false);
		form.setEnabled("tipo_telecomVoz", false);
		form.setEnabled("tipo_distribuicaoPacotes", false);
		form.setEnabled("ambiente_dataCenterAllianzBR", false);
		form.setEnabled("ambiente_callCenter", false);
		form.setEnabled("ambiente_level3", false);
		form.setEnabled("ambiente_Infraestrutura", false);
		form.setEnabled("necessario_psa", false);
		form.setEnabled("txt_sistemaAfetado", false);
		form.setEnabled("txt_servidoresAfetados", false);
		form.setEnabled("txt_outros", false);
		form.setEnabled("severidade_critica", false);
		form.setEnabled("severidade_medioImpacto", false);
		form.setEnabled("severidade_grandeImpacto", false);
		form.setEnabled("severidade_baixoImpacto", false);
		form.setEnabled("txt_detalhesImpacto", false);
		form.setEnabled("indisponibilidade_dataInicial", false);
		form.setEnabled("indisponibilidade_horaInicial", false);
		form.setEnabled("indisponibilidade_dataFinal", false);
		form.setEnabled("indisponibilidade_horaFinal", false);
		form.setEnabled("indisponibilidade_totalHoras", false);
		form.setEnabled("radio_planoExecucao", false);
		form.setEnabled("radio_planoDeTeste", false);
		form.setEnabled("radio_planoDeRollback", false);
		form.setEnabled("radio_escalonamento", false);
		form.setEnabled("check_aprovador_1", false);
		form.setEnabled("check_aprovador_2", false);
		form.setEnabled("check_aprovador_3", false);
		form.setEnabled("check_aprovador_4", false);
		form.setEnabled("check_aprovador_5", false);
		form.setEnabled("check_aprovador_6", false);
		form.setEnabled("check_aprovador_7", false);
		form.setEnabled("check_aprovador_8", false);
		form.setEnabled("check_aprovador_9", false);
		form.setEnabled("check_aprovador_10", false);
		form.setEnabled("check_aprovador_11", false);
		form.setEnabled("check_aprovador_12", false);
		form.setEnabled("responsavel_Sysadmins", false);
		form.setEnabled("responsavel_DBA", false);
		form.setEnabled("responsavel_Telecom", false);
		form.setEnabled("responsavel_Network", false);
		form.setEnabled("responsavel_Seguranca", false);
		form.setEnabled("responsavel_Workplace", false);
		form.setEnabled("responsavel_Desenvolvimento", false);
		form.setEnabled("responsavel_fornecedor", false);
		form.setEnabled("responsavel_diretoriaTI", false);
		form.setEnabled("responsavel_areaNegocios", false);
		form.setEnabled("responsavel_diretoriaNegocios", false);
				
		
		var indexes = form.getChildrenIndexes('tableAtividadesMudanca');
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("executor_atividade___" + indexes[i], false);
			form.setEnabled("area_responsavel___" + indexes[i], false);
			form.setEnabled("atividade___" + indexes[i], false);
			form.setEnabled("data_inicial___" + indexes[i], false);
			form.setEnabled("data_final___" + indexes[i], false);
			form.setEnabled("hora_inicial___" + indexes[i], false);
			form.setEnabled("hora_final___" + indexes[i], false);			
		}
		
		form.setEnabled("txt_observacoesAtividades", false);
		
		
		var indexes = form.getChildrenIndexes('tablePlanoTeste');
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("txt_ItemTestado___" + indexes[i], false);
			form.setEnabled("planoTeste_responsavel___" + indexes[i], false);
			form.setEnabled("planoTeste_pre___" + indexes[i], false);
			form.setEnabled("planoTeste_pos___" + indexes[i], false);
			form.setEnabled("planoTeste_checklist___" + indexes[i], false);
			form.setEnabled("planoTeste_resultado___" + indexes[i], false);
				
		}
		
		form.setEnabled("txt_observacoesTeste", false);
		
		var indexes = form.getChildrenIndexes('tablePlanoDeVolta');
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("executor_planoDeVolta___" + indexes[i], false);
			form.setEnabled("areaResponsavel_PlanoDeVolta___" + indexes[i], false);
			form.setEnabled("atividade_planoDeVolta___" + indexes[i], false);
			form.setEnabled("dtInicialPlanoDeVolta___" + indexes[i], false);
			form.setEnabled("dtFinalPlanoDeVolta___" + indexes[i], false);
			form.setEnabled("horaInicialPlanoDeVolta___" + indexes[i], false);
			form.setEnabled("horaFinalPlanoDeVolta___" + indexes[i], false);			
		}
		
		form.setEnabled("observacoesPlanoDeVolta", false);
		
		var indexes = form.getChildrenIndexes('tableEscalonamento');
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("txtNomeEscalonamento___" + indexes[i], false);
			form.setEnabled("txtAreaEscalonamento___" + indexes[i], false);
			form.setEnabled("txtTelefoneEscalonamento___" + indexes[i], false);		
				
		}
		
		
		
		
		
		
	}
	
	
	
}