function enableFields(){
	if(atividade == 0){
		$("#situacao").attr("readonly", true)
		$("#status").attr("readonly", true)
	}
	if(atividade == 4){
		enableFieldsRetornoInicio();
	}
	
	
	if(atividade == 8 || atividade == 54){
		enableVieldsValidarNaoConformidade();
	}
	
	if(atividade == 15){
		enableFieldsAreaResponsavelValida();
		enableFieldsDefinirAcao();
	}
	
	if(atividade == 41){
		enableFieldsAreaResponsavelValida();
		$("#situacao").attr("readonly", true)
		$("#justificativaNaoProcede").attr("readonly", true)
	}
	
	
	if(atividade == 26){
		enableFieldsAreaResponsavelValida();
		enableFieldsValidarAcaoSelecionada()
		enableFieldsAreaResponsavelValida()
		$("#situacao").attr("readonly", true)
		$("#descricaoCausaEvento").attr("readonly", true)
		if($("#confirmacaoAcaoCorretiva").val() == "Não"){
			$("#confirmacaoAcaoCorretiva").attr("readonly", true)
			$("#criticaAcaoCorretiva").attr("readonly", true)
		}
	}
	

	if(atividade == 34){
		enableFieldsValidarAcaoCorretiva();
		enableFieldsAreaResponsavelValida();
		enableFieldsValidarAcaoSelecionada()
		enableFieldsAreaResponsavelValida()
		enableFieldsValidarAcaoCorretiva();
		$("#situacao").attr("readonly", true)
		$("#descricaoCausaEvento").attr("readonly", true)
		
		$("[name^=acaoImplementada___]").each(function(){
			$(this).attr("disabled", true)
		})
		
		$("#painelValidaBaixaAcao").find("input").attr("readonly", true);
	}
}

function enableFieldsRetornoInicio(){
	$("#situacao").attr("readonly", true);
	$("#status").attr("readonly", true);
	
	if($("[name='confirmacaoNaoConformidade']:checked").val() == "Nao"){
		$("#critica").attr("readonly", true);
	}
	
	if($("[name='validarSelecionarQualidade']:checked").val() == "Nao"){
		$("#criticaSelecionarQualidade").attr("readonly", true);
	}
}

function enableVieldsValidarNaoConformidade(){
	/*
	$("#numeroFluig").attr("readonly", true)
	$("#numeroNc").attr("readonly", true)
	$("#dataOcorrencia").attr("readonly", true)
	$("#dataRegistro").attr("readonly", true)
	$("#situacao").attr("readonly", true)
	$("#status").attr("readonly", true)
	$("#origem").attr("readonly", true)
	$("#processo").attr("readonly", true)
	$("#danoPaciente").attr("readonly", true)
	$("#acaoImediata").attr("readonly", true)
	$("#departamentoOrigem").attr("readonly", true)
	$("#departamentoDestino").attr("readonly", true)
	$("#responsavelAbertura").attr("readonly", true)
	$("#descricaoEventoRisco").attr("readonly", true)
	$("#motivoNaoConformidade").attr("readonly", true)
	$("#gerenciamentoRisco").attr("readonly", true)
	$("#classificacaoEvento").attr("readonly", true)
	$("#eventoAdverso").attr("readonly", true)
	$("#classificacaoNaoConformidade").attr("readonly", true)
	*/
}

function enableFieldsAreaResponsavelValida(){
	enableVieldsValidarNaoConformidade();
	
	$("#responsavelResposta").attr("readonly", true);
}

function enableFieldsDefinirAcao(){
	
	var confirmaPlanoAcao = $("#confirmacaoPlanoAcao");
	
	if(confirmaPlanoAcao.val() == "Não"){
		$("#confirmacaoPlanoAcao").attr("readonly", true)
		$("#criticaPlanoAcao").attr("readonly", true)
	}
	
	var analiseQualidade = $("#confirmacaoNaoProcede");
	
	if(analiseQualidade.val() == "Não"){
		$("#confirmacaoNaoProcede").attr("readonly", true)
		$("#analiseQualidade").attr("readonly", true)
	}
	
}

function enableFieldsValidarAcaoSelecionada(){
	$("[name^=acaoCorretiva___],[name^=responsavelPlacoAcao___],[name^=prazo___]").each(function(){
		$(this).attr("readonly", true)
	})
}

function enableFieldsValidarAcaoCorretiva(){
	$("[name^=comentarioAcaoCorretiva___],[name^=responsavelAcaoCorretiva___],[name^=prazoAcaoCorretiva___]").each(function(){
		$(this).attr("readonly", true)
	})
}
