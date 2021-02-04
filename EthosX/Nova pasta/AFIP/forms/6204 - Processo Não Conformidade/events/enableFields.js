function enableFields(form){
	var atividade = getValue("WKNumState");
	form.setValue('atividade', atividade);
	
	if(atividade == 0 || atividade == 4){ //InÃ­cio
		setEnable(form,false);
		form.setEnabled("dataOcorrencia",true);
		form.setEnabled("origem",true);
		form.setEnabled("processo",true);
		form.setEnabled("codDepartamentoOrigem",true);
		form.setEnabled("departamentoOrigem",true);
		form.setEnabled("codDepartamentoDestino",true);
		form.setEnabled("departamentoDestino",true);
		form.setEnabled("classificacaoNaoConformidade",true);
		form.setEnabled("eventoAdverso",true);
		form.setEnabled("classificacaoEvento",true);
		form.setEnabled("gerenciamentoRisco",true);
		form.setEnabled("descricaoEventoRisco",true);
		form.setEnabled("codMotivoNaoConformidade",true);
		form.setEnabled("motivoNaoConformidade",true);
		form.setEnabled("danoPaciente",true);
		form.setEnabled("acaoImediata",true);
	}
	
	else if(atividade == 54){ //Selecionar Qualidade
		setEnable(form,false);
		form.setEnabled("validarSelecionarQualidade",true);
		form.setEnabled("analista",true);
		form.setEnabled("criticaSelecionarQualidade",true);
	}
	
	else if(atividade == 8){ //Validar NÃ£o Conformidade
		setEnable(form,false);
		
		//Campos da solicitaÃ§Ã£o
		form.setEnabled("dataOcorrencia",true);
		form.setEnabled("origem",true);
		form.setEnabled("processo",true);
		form.setEnabled("codDepartamentoOrigem",true);
		form.setEnabled("departamentoOrigem",true);
		form.setEnabled("codDepartamentoDestino",true);
		form.setEnabled("departamentoDestino",true);
		form.setEnabled("classificacaoNaoConformidade",true);
		form.setEnabled("eventoAdverso",true);
		form.setEnabled("classificacaoEvento",true);
		form.setEnabled("gerenciamentoRisco",true);
		form.setEnabled("descricaoEventoRisco",true);
		form.setEnabled("codMotivoNaoConformidade",true);
		form.setEnabled("motivoNaoConformidade",true);
		form.setEnabled("danoPaciente",true);
		form.setEnabled("acaoImediata",true);
		//Campos da aprovaÃ§Ã£o
		form.setEnabled("confirmacaoNaoConformidade",true);
		form.setEnabled("idResponsavelResposta",true);
		form.setEnabled("responsavelResposta",true);
		form.setEnabled("critica",true);
	}
	
	else if(atividade == 41){ //Validar NÃ£o Procede
		setEnable(form,false);
		
		//Campos da solicitaÃ§Ã£o
		form.setEnabled("dataOcorrencia",true);
		form.setEnabled("origem",true);
		form.setEnabled("processo",true);
		form.setEnabled("codDepartamentoOrigem",true);
		form.setEnabled("departamentoOrigem",true);
		form.setEnabled("codDepartamentoDestino",true);
		form.setEnabled("departamentoDestino",true);
		form.setEnabled("classificacaoNaoConformidade",true);
		form.setEnabled("eventoAdverso",true);
		form.setEnabled("classificacaoEvento",true);
		form.setEnabled("gerenciamentoRisco",true);
		form.setEnabled("descricaoEventoRisco",true);
		form.setEnabled("codMotivoNaoConformidade",true);
		form.setEnabled("motivoNaoConformidade",true);
		form.setEnabled("danoPaciente",true);
		form.setEnabled("acaoImediata",true);
		//Campos da aprovaÃ§Ã£o
		form.setEnabled("confirmacaoNaoProcede",true);
		form.setEnabled("analiseQualidade",true);
		form.setEnabled("dataEncerramento",true);
		form.setEnabled("idNovoResponsavelResposta",true);
		form.setEnabled("novoResponsavelResposta",true);
		form.setEnabled("idResponsavelResposta",true);
		form.setEnabled("responsavelResposta",true);
	}
	
	else if(atividade == 15){ //Ã?rea ResponsÃ¡vel Valida
		setEnable(form,false);
		form.setEnabled("conferenciaNaoConformidade",true);
		form.setEnabled("descricaoCausaEvento",true);
		form.setEnabled("justificativaNaoProcede",true);
		form.setEnabled("acaoCorretiva",true);
		form.setEnabled("idResponsavelPlacoAcao",true);
		form.setEnabled("responsavelPlacoAcao",true);
		form.setEnabled("prazo",true);
		
		for(var a = 1 ; a <= 8 ; a++){
			if(form.getValue("validacaoAcao"+a) == "" || form.getValue("validacaoAcao"+a) == "Alterar"){
				form.setEnabled("acaoCorretiva"+a,true);
				form.setEnabled("responsavelPlacoAcao"+a,true);
				form.setEnabled("idResponsavelPlacoAcao"+a,true);
				form.setEnabled("prazo"+a,true);
			}else if(form.getValue("validacaoAcao"+a) == "Refazer"){
				form.setEnabled("prazo"+a,true);
			}
		}
		
	}
	
	else if(atividade == 66){
		setEnable(form,false);
		form.setEnabled("acaoImplementada1",true);
	}
	else if(atividade == 68){
		setEnable(form,false);
		form.setEnabled("acaoImplementada2",true);
	}
	else if(atividade == 70){
		setEnable(form,false);
		form.setEnabled("acaoImplementada3",true);
	}
	else if(atividade == 72){
		setEnable(form,false);
		form.setEnabled("acaoImplementada4",true);
	}
	else if(atividade == 74){
		setEnable(form,false);
		form.setEnabled("acaoImplementada5",true);
	}
	else if(atividade == 76){
		setEnable(form,false);
		form.setEnabled("acaoImplementada6",true);
	}
	else if(atividade == 78){
		setEnable(form,false);
		form.setEnabled("acaoImplementada7",true);
	}
	else if(atividade == 80){
		setEnable(form,false);
		form.setEnabled("acaoImplementada8",true);
	}
	
	
	else if(atividade == 28){ //Validar baixa aÃ§Ã£o
		setEnable(form,false);
		form.setEnabled("comentarioAcaoCorretiva",true);
		form.setEnabled("confirmacaoAcaoCorretiva",true);
		form.setEnabled("criticaAcaoCorretiva",true);
		
		for(var a = 1 ; a <= 8 ; a++){
			form.setEnabled("validacaoAcao"+a,true);
			form.setEnabled("obsValidacao"+a,true);
		}
	}
	
	else if(atividade == 34){ //Valida EficÃ¡cia
		setEnable(form,false);
		form.setEnabled("comentarioEficacia",true);
		form.setEnabled("confirmacaoEficacia",true);
		form.setEnabled("criticaEficacia",true);
	}
}


function setEnable(form,lEnable){

	var hpForm = new java.util.HashMap();
	
	hpForm = form.getCardData();
	
	var it = hpForm.keySet().iterator();
	
	while(it.hasNext()){
		var key = it.next();
		form.setEnabled(key,lEnable);
	}
		
}

function enableTable(form,table,campos,lEnable){
	
}