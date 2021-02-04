function displayFields(){
	if(atividade == 0){
		displayFieldsInicio()
	}
	
	else if(atividade == 4){
		displayFieldsRetornoInicio()
	}
	
	else if(atividade == 54){
		displayFieldsInicio();
		displayFieldsSelecionarQualidade()
	}
	
	
	else if(atividade == 8){
		displayFieldsInicio();
		displayFieldsValidarNaoConformidade();
		
	}
	
	else if(atividade == 15 ){ //Área Responsável Valida
		displayFieldsInicio();
		displayFieldsAreaResponsavelValida();
		displayFieldsDefinirAcao();

		if($("#confirmacaoAcaoCorretiva").val() == "Nao"){
			$("#colunaValidacao").removeClass("hide");
			$("#colunaObsValidacao").removeClass("hide");
			$("[id^=validacaoAcao],[id^=_validacaoAcao]").closest("td").removeClass("hide");
			$("[id^=obsValidacao],[id^=_obsValidacao]").closest("td").removeClass("hide");
			$("#procede").find("div").show();
		}else{
			if($("#confirmacaoNaoProcede").val() == "Nao") displayFieldsValidaNaoProcede();
		}
		
		$("#responsavelResposta").closest("div").show()
		$("#responsavelResposta").closest("div").removeClass("hide");
	}
	
	else if(atividade == 41){
		displayFieldsInicio();
		displayFieldsValidaNaoProcede();
	}
	
	
	else if(atividade == 66 || atividade == 68 || atividade == 70 || atividade == 72 || atividade == 74 || atividade == 76 || atividade == 78 || atividade == 80){
		displayFieldsInicio();
		displayFieldsValidaAcaoSelecionada();
		displayFieldsAreaResponsavelValida();
		displayFieldsBaixarAcao();
		
		$("#colunaAcao").removeClass("hide");
		$("[id^=acaoImplementada],[id^=_acaoImplementada]").closest("td").removeClass("hide");
		
	}
	
	else if(atividade == 28){
		displayFieldsValidaBaixaAcao();
		displayFieldsInicio();
		displayFieldsValidaAcaoSelecionada();
		displayFieldsAreaResponsavelValida();
		
		$("#colunaAcao").removeClass("hide");
		$("#colunaValidacao").removeClass("hide");
		$("#colunaObsValidacao").removeClass("hide");
		$("[id^=acaoImplementada],[id^=_acaoImplementada]").closest("td").removeClass("hide");
		$("[id^=validacaoAcao],[id^=_validacaoAcao]").closest("td").removeClass("hide");
		$("[id^=obsValidacao],[id^=_obsValidacao]").closest("td").removeClass("hide");
		
	}
	else if(atividade == 34){
		displayFieldsInicio();
		displayFieldsValidaAcaoSelecionada();
		displayFieldsAreaResponsavelValida();
		
		$("#colunaAcao").removeClass("hide");
		$("[id^=_acaoImplementada").closest("td").removeClass("hide")
		displayFieldsValidaEficacia();
	}
	else if(atividade == 36){ // Finalizada
		displayFieldsInicio();
		displayFieldsValidarNaoConformidade();
		displayFieldsValidaAcaoSelecionada();
		
		displayFieldsSelecionarQualidade();
		if($("[name=validarSelecionarQualidade]:checked").val() == "Sim"){
			$("#divSelecionarAnalista").removeClass("hide");
		}else if($("[name=validarSelecionarQualidade]:checked").val() == "Nao"){
			$("#divCriticaSelecionarQualidade").removeClass("hide");
		}
		
		displayFieldsAreaResponsavelValida();
		if($("#confirmacaoAcaoCorretiva").val() == "Nao"){
			$("#colunaValidacao").removeClass("hide");
			$("#colunaObsValidacao").removeClass("hide");
			$("[id^=validacaoAcao],[id^=_validacaoAcao]").closest("td").removeClass("hide");
			$("[id^=obsValidacao],[id^=_obsValidacao]").closest("td").removeClass("hide");
			$("#procede").find("div").show();
		}else{
			if($("#confirmacaoNaoProcede").val() == "Nao") displayFieldsValidaNaoProcede();
		}
		
		$("#responsavelResposta").closest("div").show()
		$("#responsavelResposta").closest("div").removeClass("hide");
		
		displayFieldsValidaBaixaAcao();
		displayFieldsValidaEficacia();
	}
	else if(atividade == 51){ // Finalizada
		displayFieldsInicio();
		displayFieldsValidarNaoConformidade();
		displayFieldsValidaAcaoSelecionada();
		
		displayFieldsSelecionarQualidade();
		if($("[name=validarSelecionarQualidade]:checked").val() == "Sim"){
			$("#divSelecionarAnalista").removeClass("hide");
		}else if($("[name=validarSelecionarQualidade]:checked").val() == "Nao"){
			$("#divCriticaSelecionarQualidade").removeClass("hide");
		}
		
		displayFieldsAreaResponsavelValida();
		
		$("#naoProcede").find("div").show();
		$("#procede").find("div").hide();
		
		$("#responsavelResposta").closest("div").show()
		$("#responsavelResposta").closest("div").removeClass("hide");

	}
	$("#divOrientacao").show();
}

function displayFieldsInicio(){
	$("#painelIncluir").show();
	$("#numeroNc,#_numeroNc").closest("div").show();
	$("#dataOcorrencia,#_dataOcorrencia").closest("div").show();
	$("#dataRegistro,#_dataRegistro").closest("div").show();
	$("#situacao,#_situacao").closest("div").show();
	$("#status,#_status").closest("div").show();
	$("#origem,#_origem").closest("div").show();
	$("#processo,#_processo").closest("div").show();
	$("#danoPaciente,#_danoPaciente").closest("div").show();
	$("#acaoImediata,#_acaoImediata").closest("div").show();
	$("#departamentoOrigem,#_departamentoOrigem").closest("div").show();
	$("#departamentoDestino,#_departamentoDestino").closest("div").show();
	$("#responsavelAbertura,#_responsavelAbertura").closest("div").show();
	$("#classificacaoNaoConformidade,#_classificacaoNaoConformidade").closest("div").show();
	$("#eventoAdverso,#_eventoAdverso").closest("div").show();
	$("#classificacaoEvento,#_classificacaoEvento").closest("div").show();
	$("#gerenciamentoRisco,#_gerenciamentoRisco").closest("div").show();
	$("#descricaoEventoRisco,#_descricaoEventoRisco").closest("div").show();
	$("#motivoNaoConformidade,#_motivoNaoConformidade").closest("div").show();
	
}

function displayFieldsRetornoInicio(){
	displayFieldsInicio();
	
	if($("[name='confirmacaoNaoConformidade']:checked,[name='_confirmacaoNaoConformidade']:checked").val() == "Nao"){
		$("#painelValidarNaoConformidade").show();
		$("#confirmacaoNaoConformidade,#_confirmacaoNaoConformidade").closest(".form-group").show();
		$("[name='confirmacaoNaoConformidade'],[name='_confirmacaoNaoConformidade']").closest(".radio").show();
		$("#critica,#_critica").closest("div").show();
		$("#critica,#_critica").closest("div").removeClass("hide");
		
	}
	
	if($("[name='validarSelecionarQualidade']:checked,[name='_validarSelecionarQualidade']:checked").val() == "Nao"){
		$("#painelSelecionarQualidade").show();
		$("#validarSelecionarQualidade,#_validarSelecionarQualidade").closest(".form-group").show();
		$("[name='validarSelecionarQualidade'],[name='_validarSelecionarQualidade']").closest(".radio").show();
		$("#criticaSelecionarQualidade,#_criticaSelecionarQualidade").closest("div").show();
		$("#criticaSelecionarQualidade,#_criticaSelecionarQualidade").closest("div").removeClass("hide")
	}
	
}

function displayFieldsSelecionarQualidade(){
	$("#painelSelecionarQualidade").show()
	$("#validarSelecionarQualidade,#_validarSelecionarQualidade").closest(".form-group").show();
	$("input[name='validarSelecionarQualidade'],input[name='_validarSelecionarQualidade']").closest(".radio").show();
	$("#criticaSelecionarQualidade,#_criticaSelecionarQualidade").closest("div").show();
	$("#analista,#_analista").closest("div").show();
}


function displayFieldsValidarNaoConformidade(){
	
	$("#painelValidarNaoConformidade").show();
	$("#confirmacaoNaoConformidade,#_confirmacaoNaoConformidade").closest(".form-group").show();
	$("input[name='confirmacaoNaoConformidade'],input[name='_confirmacaoNaoConformidade']").closest(".radio").show();
	$("#critica,#_critica").closest("div").show();
	$("#responsavelResposta,#_responsavelResposta").closest("div").show();
	
}

function displayFieldsAreaResponsavelValida(){
	
	$("#painelAreaResponsavelValida").show();
	$("#conferenciaNaoConformidade,#_conferenciaNaoConformidade").closest(".form-group").show();
	$("input[name='conferenciaNaoConformidade'],input[name='_conferenciaNaoConformidade']").closest(".radio").show();

}

function displayFieldsValidaNaoProcede(){

	$("#naoProcede").show();
	$("#naoProcede").find("div").show();
	$("#painelAreaResponsavelValida").show();
	$("#painelValidaNaoProcede").show();
	$("#confirmacaoNaoProcede,#_confirmacaoNaoProcede").closest(".form-group").show();
	$("input[name='confirmacaoNaoProcede'],input[name='_confirmacaoNaoProcede']").closest(".radio").show();
	$("#analiseQualidade,#_analiseQualidade").closest("div").show();
	$("#dataEncerramento,#_dataEncerramento").closest("div").show();
	if($("#confirmacaoNaoProcede").val() == "Nao"){
		$("#divAnaliseQualidade").removeClass("hide");
	}

}

function displayFieldsDefinirAcao(){
	
	var analiseQualidade = $("#confirmacaoNaoProcede");
	
	if(analiseQualidade.val() == "Nao"){
		$("#painelValidaNaoProcede").show();
		$("#confirmacaoNaoProcede,#_confirmacaoNaoProcede").closest("div").show();
		$("#analiseQualidade,#_analiseQualidade").closest("div").show();
		$("#analiseQualidade,#_analiseQualidade").closest("div").removeClass("hide")
		$("#naoProcede").show()
		$("#naoProcede").find("div").show();
		$("#procede").hide
	}
}


function displayFieldsValidaAcaoSelecionada(){
	
	$("#tablePlanoAcao").closest("div").show();
	$("#addPlanoAcao").hide();
	$("#tablePlanoAcao").find(".bpm-mobile-trash-column").find(".fluigicon-trash").hide();
	
	$("#confirmacaoPlanoAcao,#_confirmacaoPlanoAcao").closest("div").show();
	$("#criticaPlanoAcao,#_criticaPlanoAcao").closest("div").show();
	
}

function displayFieldsBaixarAcao(){
	$("#tablePlanoAcao").closest("div").show();
	$("#addPlanoAcao").hide();
	$("#tablePlanoAcao").find(".bpm-mobile-trash-column").find(".fluigicon-trash").hide()
	
	$("#tableAcaoCorretiva").closest("div").show();
	
	$("#descricaoCausaEvento,#_descricaoCausaEvento").closest(".form-group").show();
	$("input[name='conferenciaNaoConformidade'],input[name='_conferenciaNaoConformidade']").closest(".form-group").hide();
	
	var confirmaAcaoCorretiva = $("#confirmacaoAcaoCorretiva");
	
	if(confirmaAcaoCorretiva.val() == "Nao"){
		$("#painelValidaBaixaAcao").show();

		$("#divCriticaAcaoCorretiva").show();
		$("#divCriticaAcaoCorretiva").removeClass("hide");
		$("#criticaAcaoCorretiva,#_criticaAcaoCorretiva").closest(".form-group").removeClass("hide");
	}
}

function displayFieldsValidaBaixaAcao(){
	
	$("#tableAcaoCorretiva").closest("div").show();
	
	$("#painelValidaBaixaAcao").show();
	$("#confirmacaoAcaoCorretiva,#_confirmacaoAcaoCorretiva").closest(".form-group").show();
	$("input[name='confirmacaoAcaoCorretiva'],input[name='_confirmacaoAcaoCorretiva']").closest(".radio").show();
	
	$("#confirmacaoAcaoCorretiva").closest("div").show();
	$("#criticaAcaoCorretiva").closest("div").show();
	
	$("#descricaoCausaEvento,#_descricaoCausaEvento").closest(".form-group").show();
	$("input[name='conferenciaNaoConformidade'],input[name='_conferenciaNaoConformidade']").closest(".form-group").hide();
	
	$("#responsavelAcaoCorretiva,#_responsavelAcaoCorretiva").val($("#responsavelResposta").val());
	
}

function displayFieldsValidaEficacia(){
	$("#tableAcaoCorretiva").closest("div").show();
	$("#addAcaoCorretiva").hide();
	
	$("#panelValidaEficacia").show();
	$("#divCriticaEficacia").show();
	$("#tableEficacia").closest("div").show();
	$("#confirmacaoEficacia").closest(".form-group").show();
	$("input[name='confirmacaoEficacia'],input[name='_confirmacaoEficacia']").closest(".radio").show();
	
	$("#descricaoCausaEvento,#_descricaoCausaEvento").closest(".form-group").show();
	$("input[name='conferenciaNaoConformidade'],input[name='_conferenciaNaoConformidade']").closest(".form-group").hide();
	
	$("#responsavelEficacia,#_responsavelEficacia").val($("#responsavelResposta").val());

}

function reloadResponsaveis(){
	$("[id^=responsavelPlacoAcao___],[id^=_responsavelPlacoAcao___]").each(function(){
		var nome = $(this).val()
		var constraintNome = DatasetFactory.createConstraint("colleagueName", nome, nome, ConstraintType.MUST);
		var usuarios = DatasetFactory.getDataset("colleague", null, [constraintNome], null);
		for(var i = 0; i < usuarios.values.length; i++){
			if(responsaveis == ""){
				responsaveis = usuarios.values[i]["colleaguePK.colleagueId"]+";";
			}else if(responsaveis.endsWith(";")){
				responsaveis += usuarios.values[i]["colleaguePK.colleagueId"];
			}else{
				responsaveis += ";"+usuarios.values[i]["colleaguePK.colleagueId"];
			}
			arrayResponsaveis.push(usuarios.values[i]["colleaguePK.colleagueId"]);
			
		}
		
	})
	$("#responsaveis").val(responsaveis);
}