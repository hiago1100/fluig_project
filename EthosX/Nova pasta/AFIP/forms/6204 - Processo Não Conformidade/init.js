var arrayResponsaveis = new Array();
var responsaveis = "";
$(function(){
	
	//FLUIGC.calendar(".fluig-date");

	if(atividade == 0){
		$("#dataRegistro,#_dataRegistro").val(moment().format("DD/MM/YYYY"));
	}
	
	if(atividade == 0 || atividade == 4){
		aplicaCalendario("dataOcorrencia");
		
		
		setTimeout(function(){
			reloadZoomFilterValues("classificacaoEvento", "eventoAdverso,"+$("#eventoAdverso").val());
			destacaCampos("green",["descricaoEventoRisco","departamentoDestino"]);
		}, 2000);
	}
	else if(atividade == 54){ //Selecionar Qualidade
		$("input[name='validarSelecionarQualidade']").on("change", function(){
			if(this.value == "Sim"){
				$("#divSelecionarAnalista").removeClass("hide");
				$("#divCriticaSelecionarQualidade").addClass("hide");
				definirObrigatorio("analista");
				removerObrigatorio("criticaSelecionarQualidade");
			}else if(this.value == "Nao"){
				$("#divCriticaSelecionarQualidade").removeClass("hide");
				$("#divSelecionarAnalista").addClass("hide");
				definirObrigatorio("criticaSelecionarQualidade");
				removerObrigatorio("analista");
			}
		});
		
		if($("[name='validarSelecionarQualidade']:checked").val() == "Sim"){
			$("#divSelecionarAnalista").removeClass("hide");
			$("#divCriticaSelecionarQualidade").addClass("hide");
			definirObrigatorio("analista");
			removerObrigatorio("criticaSelecionarQualidade");
		}else if($("[name='validarSelecionarQualidade']:checked").val() == "Nao"){
			$("#divCriticaSelecionarQualidade").removeClass("hide");
			$("#divSelecionarAnalista").addClass("hide");
			definirObrigatorio("criticaSelecionarQualidade");
			removerObrigatorio("analista");
		}
	}
	
	else if(atividade == 8){ //Validar Não Conformidade
		$("input[name='confirmacaoNaoConformidade']").on("change", function(){
			if(this.value == "Sim"){
				$("#divResponsavelResposta").removeClass("hide");
				$("#divCritica").addClass("hide");
				definirObrigatorio("responsavelResposta");
				removerObrigatorio("critica");
			}else if(this.value == "Nao"){
				$("#divCritica").removeClass("hide");
				$("#divResponsavelResposta").addClass("hide");
				definirObrigatorio("critica");
				removerObrigatorio("responsavelResposta");
			}
		});
		
		if($("[name='confirmacaoNaoConformidade']:checked").val() == "Sim"){
			$("#divResponsavelResposta").removeClass("hide");
			$("#divCritica").addClass("hide");
			definirObrigatorio("responsavelResposta");
			removerObrigatorio("critica");
		}else if($("[name='confirmacaoNaoConformidade']:checked").val() == "Nao"){
			$("#divCritica").removeClass("hide");
			$("#divResponsavelResposta").addClass("hide");
			definirObrigatorio("critica");
			removerObrigatorio("responsavelResposta");
		}
		
		setTimeout(function(){
			reloadZoomFilterValues("classificacaoEvento", "eventoAdverso,"+$("#eventoAdverso").val());
		}, 2000);
	}
	
	else if(atividade == 15){ //Área Responsável Valida
		$("input[name='conferenciaNaoConformidade']").on("change", function(){
			if(this.value == "Sim"){
				$("#procede").find("div").show();
				definirObrigatorio("descricaoCausaEvento");
				removerObrigatorio("justificativaNaoProcede");
				
				$("#naoProcede").find("div").hide();
				
				FLUIGC.toast({
		            message: 'As ações devem ser incluídas em ordem cronológica',
		            type: 'warning'
		        });

			}else if(this.value == "Nao"){
				$("#procede").find("div").hide();
				$("#naoProcede").find("div").show();

				definirObrigatorio("justificativaNaoProcede");
				removerObrigatorio("descricaoCausaEvento");
			}
		});
		
		if($("[name='conferenciaNaoConformidade']:checked").val() == "Sim"){
			$("#procede").find("div").show();
			definirObrigatorio("descricaoCausaEvento");
			removerObrigatorio("justificativaNaoProcede");
			
			$("#naoProcede").find("div").hide();

		}else if($("[name='conferenciaNaoConformidade']:checked").val() == "Nao"){
			$("#procede").find("div").hide();
			$("#naoProcede").find("div").show();

			definirObrigatorio("justificativaNaoProcede");
			removerObrigatorio("descricaoCausaEvento");

		}
		FLUIGC.calendar("[name^='prazo']");
		$("[name^='prazo']").keydown(function(event){
			if(event.keyCode  != 46) return false});
	}
	
	else if(atividade == 41){ //Validar Não Procede
		$("input[name='confirmacaoNaoProcede']").on("change", function(){
			if(this.value == "Sim"){
				$("#divAnaliseQualidade").addClass("hide");
				$("#divNovoResponsavelResposta").hide();
				removerObrigatorio("analiseQualidade");
				removerObrigatorio("idNovoResponsavelResposta");
			}else if(this.value == "Nao"){
				$("#divAnaliseQualidade").removeClass("hide");
				$("#divNovoResponsavelResposta").hide();
				removerObrigatorio("idNovoResponsavelResposta");
				definirObrigatorio("analiseQualidade");
			}else if(this.value == "Altera"){
				$("#divNovoResponsavelResposta").show();
				$("#divAnaliseQualidade").addClass("hide");
				removerObrigatorio("analiseQualidade");
				definirObrigatorio("idNovoResponsavelResposta");
			}
		});
		
		if($("[name='confirmacaoNaoProcede']:checked").val() == "Sim"){
			$("#divAnaliseQualidade").addClass("hide");
			$("#divNovoResponsavelResposta").hide();
			removerObrigatorio("analiseQualidade");
			removerObrigatorio("idNovoResponsavelResposta");
		}else if($("[name='confirmacaoNaoProcede']:checked").val() == "Nao"){
			$("#divAnaliseQualidade").removeClass("hide");
			$("#divNovoResponsavelResposta").hide();
			removerObrigatorio("idNovoResponsavelResposta");
			definirObrigatorio("analiseQualidade");
		}else if($("[name='confirmacaoNaoProcede']:checked").val() == "Altera"){
			$("#divNovoResponsavelResposta").show();
			$("#divAnaliseQualidade").addClass("hide");
			removerObrigatorio("analiseQualidade");
			definirObrigatorio("idNovoResponsavelResposta");
		}
	}
	
	else if(atividade == 28){ //Validar baixa ação
		$("input[name='confirmacaoAcaoCorretiva']").on("change", function(){
			if(this.value == "Sim"){
				$("#divCriticaAcaoCorretiva").addClass("hide");

			}else if(this.value == "Nao"){
				$("#divCriticaAcaoCorretiva").removeClass("hide");

			}
		});
		
		if($("input[name='confirmacaoAcaoCorretiva']:checked").val() == "Sim"){
			$("#divCriticaAcaoCorretiva").addClass("hide");

		}else if($("input[name='confirmacaoAcaoCorretiva']:checked").val() == "Nao"){
			$("#divCriticaAcaoCorretiva").removeClass("hide");

		}
		
		FLUIGC.calendar("[name^='prazo']");
		$("#prazoAcaoCorretiva,#_prazoAcaoCorretiva").val(moment().format("DD/MM/YYYY"));
	}
	
	else if(atividade == 34){ //Valida Eficácia
		$("#dataEncerramentoEficacia").val(moment().format("DD/MM/YYYY"));
		$("#prazoEficacia,#_prazoEficacia").val(moment().format("DD/MM/YYYY"));
		$("input[name='confirmacaoEficacia']").on("change", function(){
			if(this.value == "Sim"){
				$("#divCriticaEficacia").addClass("hide");

				removerObrigatorio("criticaEficacia");

			}else if(this.value == "Nao"){
				$("#divCriticaEficacia").removeClass("hide");

				definirObrigatorio("criticaEficacia");

			}
		});
	}
	
	else if(atividade == 66 || atividade == 68 || atividade == 70 || atividade == 72 || atividade == 74 || atividade == 76 || atividade == 78 || atividade == 80){
		definirTabelaObrigatoria("tablePlanoAcao");
		esconderCamposResponsaveis(atividade);
	}
	
	$("label,table").closest("div").hide();
	$(".panel").hide();
	$("#painelTitulo").show();
	
	if($("#status").val().toUpperCase() == "FINALIZADO" || $("#status").text().toUpperCase() == "FINALIZADO"){
		$("#painelTitulo").find("h2").text($("#painelTitulo").find("h2").text() + " - Finalizado");
	}
	
	displayFields();
	enableFields();
	
	formataTabela();
	
	setTimeout(function(){
		definirObrigatorios(atividade);
		reloadZoomFilterValues("classificacaoEvento", "eventoAdverso,"+$("#eventoAdverso").val());
	},1000);
	
	$("#descricaoEventoRisco").on("change",function(){
		$("#descricaoEventoRiscoRes").val(($("#descricaoEventoRisco").val().replace(/\n/g," ").length > 50 ? $("#descricaoEventoRisco").val().replace(/\n/g," ").substring(0,50): $("#descricaoEventoRisco").val().replace(/\n/g," ")));
	});
});


function esconderCamposResponsaveis(){
	for(var i = 1 ; i <= 8 ; i++){
		$("#idResponsavelPlacoAcao"+i+",#_idResponsavelPlacoAcao"+i).closest("tr").hide();
	}
	switch(atividade){
		case 66:
			$("#idResponsavelPlacoAcao1,#_idResponsavelPlacoAcao1").closest("tr").show();
			definirObrigatorioTab("acaoImplementada1");
			if($("#validacaoAcao1").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao1").closest("td").removeClass("hide");
				$("#_obsValidacao1").closest("td").removeClass("hide");
			}
			break;
		case 68:
			$("#idResponsavelPlacoAcao2,#_idResponsavelPlacoAcao2").closest("tr").show();
			definirObrigatorioTab("acaoImplementada2");
			if($("#validacaoAcao2").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao2").closest("td").removeClass("hide");
				$("#_obsValidacao2").closest("td").removeClass("hide");
			}
			break;
		case 70:
			$("#idResponsavelPlacoAcao3,#_idResponsavelPlacoAcao3").closest("tr").show();
			definirObrigatorioTab("acaoImplementada3");
			if($("#validacaoAcao3").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao3").closest("td").removeClass("hide");
				$("#_obsValidacao3").closest("td").removeClass("hide");
			}
			break;
		case 72:
			$("#idResponsavelPlacoAcao4,#_idResponsavelPlacoAcao4").closest("tr").show();
			definirObrigatorioTab("acaoImplementada4");
			if($("#validacaoAcao4").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao4").closest("td").removeClass("hide");
				$("#_obsValidacao4").closest("td").removeClass("hide");
			}
			break;
		case 74:
			$("#idResponsavelPlacoAcao5,#_idResponsavelPlacoAcao5").closest("tr").show();
			definirObrigatorioTab("acaoImplementada5");
			if($("#validacaoAcao5").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao5").closest("td").removeClass("hide");
				$("#_obsValidacao5").closest("td").removeClass("hide");
			}
			break;
		case 76:
			$("#idResponsavelPlacoAcao6,#_idResponsavelPlacoAcao6").closest("tr").show();
			definirObrigatorioTab("acaoImplementada6");
			if($("#validacaoAcao6").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao6").closest("td").removeClass("hide");
				$("#_obsValidacao6").closest("td").removeClass("hide");
			}
			break;
		case 78:
			$("#idResponsavelPlacoAcao7,#_idResponsavelPlacoAcao7").closest("tr").show();
			definirObrigatorioTab("acaoImplementada7");
			if($("#validacaoAcao7").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao7").closest("td").removeClass("hide");
				$("#_obsValidacao7").closest("td").removeClass("hide");
			}
			break;
		case 80:
			$("#idResponsavelPlacoAcao8,#_idResponsavelPlacoAcao8").closest("tr").show();
			definirObrigatorioTab("acaoImplementada8");
			if($("#validacaoAcao8").val() != ""){
				$("#colunaValidacao").removeClass("hide");
				$("#colunaObsValidacao").removeClass("hide");
				$("#_validacaoAcao8").closest("td").removeClass("hide");
				$("#_obsValidacao8").closest("td").removeClass("hide");
			}
			break;
	}
}

function mostrarCampoSelecionarQualidade(){
	
}

function buscaDadosURL(){
	var url = window.location.href;
	var domain = url.split("/portal")[0];
	var parametros = window.location.href.split("?")[1].split("&");
	var dadosUrl = '{';
	for (var i = 0 ; i < parametros.length ; i++){
		var param = parametros[i].split("=");
		dadosUrl += (dadosUrl!="{"?",":"") +'"'+param[0]+'":"'+param[1]+'"';
	}
	dadosUrl += '}';
	return JSON.parse(dadosUrl);
}

function definirObrigatorios(atividade){
	var campos = [];
	
	if(atividade == 0 || atividade == 4){
		campos = ["dataOcorrencia","origem","processo","departamentoOrigem","departamentoDestino","classificacaoNaoConformidade","eventoAdverso","classificacaoEvento","gerenciamentoRisco","descricaoEventoRisco","motivoNaoConformidade","danoPaciente","acaoImediata"];
	}
	else if(atividade == 54){
		campos = ["validarSelecionarQualidade"];
	}
	else if(atividade == 8){
		campos = ["confirmacaoNaoConformidade","dataOcorrencia","origem","processo","departamentoOrigem","departamentoDestino","classificacaoNaoConformidade","eventoAdverso","classificacaoEvento","gerenciamentoRisco","descricaoEventoRisco","motivoNaoConformidade","danoPaciente","acaoImediata"];
	}
	else if(atividade == 15){
		campos = ["conferenciaNaoConformidade"];
	}
	else if(atividade == 28){
		campos = ["confirmacaoAcaoCorretiva"];
	}
	else if(atividade == 34){
		campos = ["confirmacaoEficacia"];
	}
	
	for (var i=0 ; i<campos.length ; i++){
		definirObrigatorio(campos[i]);
	}
}

function aplicaCalendario(campo){
	FLUIGC.calendar("#"+campo);
	$("#"+campo).on("keydown",function(){return false});
}

function destacaCampos(bordercolor,campos){
	for(var i = 0 ; i < campos.length ; i++){
		$("#"+campos[i]+",#_"+campos[i]).css("border",bordercolor+" solid 1px");
		$("#"+campos[i]+",#_"+campos[i]).siblings(".select2-container").css("border",bordercolor+" solid 1px");
	}
}

function formataTabela(){
	$(".divTable").css("overflow-x","scroll");
	
	var tamanhoAcao = 0;
	var tamanhoObs = 0;
	
	$("[name^=acaoCorretiva],[name^=_acaoCorretiva]").each(function(){
		$(this).removeAttr("data-toggle");
		$(this).removeAttr("title");
		
		if(this.value != ""){
			$(this).attr("title",this.value);
			$(this).attr("data-toggle","tooltip");
			if(this.value.length > tamanhoAcao) tamanhoAcao = this.value.length;
		}
		
		$(this).blur(function(){
			formataTabela();
		});
	});
	$("[name^=obsValidacao],[name^=_obsValidacao]").each(function(){
		$(this).removeAttr("data-toggle");
		$(this).removeAttr("title");
		
		if(this.value != ""){
			$(this).attr("title",this.value);
			$(this).attr("data-toggle","tooltip");
			if(this.value.length > tamanhoObs) tamanhoObs = this.value.length;
		}
		
		$(this).blur(function(){
			formataTabela();
		});
	});
	if(tamanhoAcao != 0){
		$("#colunaAcaoCorretiva").attr("width",parseInt(((tamanhoAcao/12)>2? (tamanhoAcao/12) : 2)*100)+'px');
	}else{
		
		$("#colunaAcaoCorretiva").removeAttr("width");
	}
	$("#colunaObsValidacao").attr("width",parseInt(((tamanhoObs/12)>2? (tamanhoObs/12) : 2)*100)+'px');

}

function definirObrigatorio(campo){
	$("[name='"+campo+"']").addClass("obrigatorio");
	$("#"+campo).closest(".form-group").find("label").first().append("<span style='color:red'>*</span>");
}

function removerObrigatorio(campo){
	$("#"+campo).removeClass("obrigatorio");
	$("#"+campo).siblings("label")[0].innerText = $("#"+campo).siblings("label")[0].innerText.replace("*","");
}

function definirTabelaObrigatoria(tabela){
	$("table[id='"+tabela+"']").addClass("TabObrigatoria");
}

function removerTabelaObrigatoria(tabela){
	$("table[id='"+tabela+"']").removeClass("TabObrigatoria");
}

function definirObrigatorioTab(campo){
	$("#"+campo).addClass("obrigatorioTab");
}