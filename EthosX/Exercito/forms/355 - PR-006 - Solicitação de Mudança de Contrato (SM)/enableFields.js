//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

function enableFields(){
	
	// enableContainer($("form")[0],false);
	// enableField($("#CAMPO"), false);
	// enableContainer($("#panelDados"),false);
	
	if(CONTEXT.CURRENT_STATE == Activity.ZERO || CONTEXT.CURRENT_STATE == Activity.INICIAR){
		
		enableContainer($("#panelElaboracaoSM"),false);
		enableContainer($("#panelQualificarSM"),false);
		enableContainer($("#panelCGM"),false);
		enableContainer($("#panelAditivoApostilamento"),false);
		
	} else if(CONTEXT.CURRENT_STATE == Activity.ELABORAR_SM){

		enableContainer($("#panelDadosSolicitacao"),false);
		enableContainer($("#panelDetalhesSM"),false);
		enableContainer($("#panelQualificarSM"),false);
		enableContainer($("#panelCGM"),false);
		enableContainer($("#panelAditivoApostilamento"),false);

	} else if(CONTEXT.CURRENT_STATE == Activity.QUALIFICAR_SM){

		enableContainer($("#panelDadosSolicitacao"),false);
		enableContainer($("#panelDetalhesSM"),false);
		enableContainer($("#panelElaboracaoSM"),false);
		enableContainer($("#panelCGM"),false);
		enableContainer($("#panelAditivoApostilamento"),false);
	
	} else if(CONTEXT.CURRENT_STATE == Activity.PRE_CGM){
	
		enableContainer($("#panelDadosSolicitacao"),false);
		enableContainer($("#panelDetalhesSM"),false);
		enableContainer($("#panelElaboracaoSM"),false);
		enableContainer($("#panelQualificarSM"),false);
		enableContainer($("#divCGM"),false);
		enableContainer($("#panelAditivoApostilamento"),false);
		
	} else if(CONTEXT.CURRENT_STATE == Activity.CGM){

		enableContainer($("#panelDadosSolicitacao"),false);
		enableContainer($("#panelDetalhesSM"),false);
		enableContainer($("#panelElaboracaoSM"),false);
		enableContainer($("#panelQualificarSM"),false);
		enableContainer($("#divPreCGM"),false);
		enableContainer($("#panelAditivoApostilamento"),false);
	
	} else {
		enableContainer($("form")[0],false);
		enableField($("#btnConsultarAditivoApostilamento"), true);
	}

	/* 
	enableField($('#numSM'), true);
	enableField($('#nmSolicitante'), true);
	enableField($('#dtHrSolicitacao'), true);
	enableField($('#solicitadoPorEB'), true);
	enableField($('#solicitadoPorContratada'), true);
	enableField($('#nmContratada'), true);
	enableField($('#contrato'), true);
	enableField($('#secao'), true);
	enableField($('#btnAddObrigacoes'), true);
	enableField($('#obrigacaoAcessoria'), true);
	enableField($('#btnAddEtapas'), true);
	enableField($('#etapa'), true);
	enableField($('#descSM'), true);
	enableField($('#descSMProposta'), true);
	enableField($('#respElaboracao'), true);
	enableField($('#nmDemandante'), true);
	enableField($('#nmDemandado'), true);
	enableField($('#dataLimiteDemanda'), true);
	enableField($('#descDemanda'), true);
	enableField($('#numDemanda'), true);
	enableField($('#statusDemanda'), true);
	enableField($('#btnCriarDemanda'), true);
	enableField($('#escopoSim'), true);
	enableField($('#escopoNao'), true);
	enableField($('#descImpactoEscopo'), true);
	enableField($('#impactoMetodologiaS'), true);
	enableField($('#impactoMetodologiaN'), true);
	enableField($('#descImpactoMetodologia'), true);
	enableField($('#impactoPrazoS'), true);
	enableField($('#impactoPrazoN'), true);
	enableField($('#descImpactoPrazo'), true);
	enableField($('#impactoSecoesS'), true);
	enableField($('#impactoSecoesN'), true);
	enableField($('#descImpactoSecoes'), true);
	enableField($('#impactoCustoS'), true);
	enableField($('#impactoCustoN'), true);
	enableField($('#descImpactoCusto'), true);
	enableField($('#valorImpactoCusto'), true);
	enableField($('#respQualificarSM'), true);
	enableField($('#qualificarAditivo'), true);
	enableField($('#qualificarApostilamento'), true);
	enableField($('#descQualificaca'), true);
	enableField($('#respPreCGM'), true);
	enableField($('#pautaPreCGMS'), true);
	enableField($('#pautaPreCGMN'), true);
	enableField($('#btnAddPreCGM'), true);
	enableField($('#dataReuniaoPreCGM'), true);
	enableField($('#descReuniaoPreCGM'), true);
	enableField($('#respCGM'), true);
	enableField($('#pautaCGMS'), true);
	enableField($('#pautaCGMN'), true);
	enableField($('#btnAddCGM'), true);
	enableField($('#dataReuniaoCGM'), true);
	enableField($('#descReuniaoCGM'), true);
	enableField($('#escopoDeliberacaoCGMS'), true);
	enableField($('#escopoDeliberacaoCGMN'), true);
	enableField($('#escopoDeliberacaoCGMR'), true);
	enableField($('#metodologiaDeliberacaoCGMS'), true);
	enableField($('#metodologiaDeliberacaoCGMN'), true);
	enableField($('#metodologiaDeliberacaoCGMR'), true);
	enableField($('#prazoDeliberacaoCGMS'), true);
	enableField($('#prazoDeliberacaoCGMN'), true);
	enableField($('#prazoDeliberacaoCGMR'), true);
	enableField($('#custoDeliberacaoCGMS'), true);
	enableField($('#custoDeliberacaoCGMN'), true);
	enableField($('#custoDeliberacaoCGMR'), true);
	enableField($('#pendenciasDeliberacaoCGMS'), true);
	enableField($('#pendenciasDeliberacaoCGMN'), true);
	enableField($('#confirmarAditivo'), true);
	enableField($('#confirmarApostilamento'), true);
	enableField($('#descPendenciasEB'), true);
	enableField($('#descPendenciasContratada'), true);
	enableField($('#numAditivoApostilamento'), true);
	enableField($('#statusApostilamento'), true);
	enableField($('#btnConsultarAditivoApostilamento'), true);
	*/
}

//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

var beginWithDisabled = new RegExp(/^d_/);
function filterDisabled(index, element) {
	return !beginWithDisabled.test(element.id);
}

function disableField($el, disabled){
	//Pega o ID, pois no caso do radio é preciso desabilitar cada item do radio.
	//Pendente avaliar qual o comportamento FLUIG quanto a radio no pai x filho:
	//XXX: Por hora é obrigatório ter ids diferentes por linha e por opção do radio

	var selector = "#d_"+$el.attr("id")+"[name='d_"+$el.attr("name")+"']";
	$el = $el.filter(filterDisabled);
	if(disabled){
		$(selector).hide();
		$el.show();
	}
	else{
		($(selector).length > 0) ? $(selector).show() : $el.before($el.clone().attr({"id":("d_"+$el.attr("id")),"name":("d_"+$el.attr("name"))}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],input[type='zoom'],textarea,select,input[type='button'],img,button,span").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "TEXTAREA"){
		
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "SELECT"){
		disableField($el, enabled);
	}
	else if($el.attr("type") == "button"){
		$el.prop("disabled",!enabled);
		handleOpacity($el, enabled);
	}
	else if($el.prop("tagName") == "SPAN"){
		!enabled ? $el.css("pointer-events", "none") : $el.css("pointer-events", "auto");
		handleOpacity($el, enabled);
	}
	else if($el.prop("tagName") == "IMG"){
		$el.prop("onclick",enabled);
		handleOpacity($el, enabled);
	}
	else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox"){
		var nameOf = $el.attr("name");

		//Como ID não recebe ___, seletor por ID
		//Nâo há como automatizar desabilitar específico pelo ID, justamente por não receber ___

		if(nameOf != ""){
			var selector = "[name='"+nameOf+"'],[name^='" + nameOf + "___']";
			$el = $(selector).filter(filterDisabled);
			if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
				$el.each(function(i){
					var labelSelector = "label[for^='"+$(this).prop("id")+"'],label[for^='d_"+$(this).prop("id")+"']";
					$(labelSelector).each(function (i) {
						var prefix = (beginWithDisabled.test($(this).prop("for"))) ? "d_" : "";
						if(enabled){
							$(this).prop("for", $(this).prop("for").replace(beginWithDisabled,""));
						}
						else if(prefix == ""){
							$(this).prop("for", "d_"+$(this).prop("for"));
						}
					});
					disableField($(this), enabled);
				});
			}
		}
		else{
			disableField($el, enabled);
		}
	}
	else{
		$el.prop("readonly",!enabled);
	}
}
function handleOpacity($el, enabled){
	if(enabled){
		$el.css("opacity", 1);
		$el.css("filter", "");
	} else {
		$el.css("opacity", 0.7);
		$el.css("filter", "alpha(opacity=70)");
	}
}

//@Deprecated
function applyDisabledStyle(){
	var arr = $("input");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("textarea");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("select");
	$.each(arr,function(index, item){
		$(item).change();
	});	

	var imgs = document.getElementById(tableId).getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].style.display = "none";
	}
}