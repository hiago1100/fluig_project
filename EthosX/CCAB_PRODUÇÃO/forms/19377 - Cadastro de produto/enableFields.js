function disableField($el, disabled){
	if(disabled){
		$("#" + $el.attr('id') + "_d").hide();
		$el.show();
	}
	else{
		($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name") + "_d")}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img").not(".logo").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableContainer2($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,input[type='button'],img").not(".logo").each(function (i) {
		enableField($(this), enabled);
	});

	$($el).find("select").each(function (i){
		if(enabled == false){
			$(this).attr('readonly', true);
		}else{
			$(this).removeAttr('readonly', true);
		}
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
	}else if($el.prop("tagName") == "TEXTAREA"){
		$el.prop("readonly",!enabled);
	}else if($el.prop("tagName") == "SELECT"){
		disableField($el, enabled);
	}else if($el.attr("type") == "button" || $el.prop("tagName") == "IMG"){
		$el.prop("disabled",!enabled);
		if(enabled){
			$el.css("opacity", 1);
			$el.css("filter", "");
		} else {
			$el.css("opacity", 0.4);
			$el.css("filter", "alpha(opacity=40)");
		}
	}else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox" || $el.attr("type") == undefined){
		var endWithDisabled = new RegExp(/_d$/);
		var nameOf = ($el.selector.replace("#","") != "") ? $el.selector.replace("#","") : $el.attr("name");

		$el = $("[name='" + nameOf + "']").filter(function(index, element) {
			return !endWithDisabled.test(element.id);		
		});

		if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
			$el.each(function(i){
				$("label[for^='"+$(this).prop("id")+"']").each(function (i) {
					var suffix = (endWithDisabled.test($(this).prop("for"))) ? "_d" : "";
					if(enabled){
						$(this).prop("for", $(this).prop("for").replace(endWithDisabled,""));
					}else if(suffix == ""){
						$(this).prop("for", $(this).prop("for")+"_d");
					}
				});
				disableField($(this), enabled);
			});
		}
	}
}

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

//Funcoes genericas referentes a zoom.

/**
 * Bloqueia ou desbloqueia um campo do tipo novo zoom.
 * @param $el: Objeto JQuery do campo.
 * @param enabled: true para desbloquear e false para bloquear.
 * @returns void.
 */
function enableZoom($el, enabled){
	if((typeof window['data-zoom_'+$el.attr('name')])  == "undefined"){
		setTimeout(function(){
			enableZoom($el, enabled);
		}, 500);
	}else window[$el.attr('name')].disable(!enabled);
}

function enableFields(){

   // =====================================
    // PARÂMETRO
    // =====================================

    var STAGE = $('#atvAtual').val();
	var MODE = $("#formMode").val();
	var RET = $("#retorno").val();

	// =============================================
    // REGRAS DO PROCESSO
	// =============================================
    if(STAGE == null){
        enableContainer($("form"), false);
        enableZoom($("#tipo_produto"), false);
        enableZoom($("#formulacao_produto"), false);
        enableZoom($("#classe_produto"), false);
		enableZoom($("#uniMedida_Produto"), false);
		enableZoom($("#segUniMedida_Produto"), false);
        enableZoom($("#origem_produto"), false);
        enableZoom($("#grupoTrib_produto"), false);
    }

    if(STAGE == 0 || STAGE == INICIO){
        enableContainer2($("#divSolicitacao"),false);
        enableContainer2($("#catProd"), true);
		
        // CONTABILIDADE
		enableContainer2($("#divContab"), false);
		enableZoom($("#contaContb_produto"), false);
		enableZoom($("#itemContb_produto"), false);
		enableZoom($("#ccusto_produto"), false);		
    }
	
	if(STAGE == SUPRIMENTOS){
		enableContainer2($("#divSolicitacao"),false);
		enableContainer2($("#divRespLogist"), false);
		enableContainer2($("#divRespContab"), false);
		enableContainer2($("#divRespFiscal"), false);

		// LOGISTICA
		enableContainer2($("#divLogist"), false);
        enableZoom($("#armazem_produto"), false);
		enableZoom($("#princpAtivo_produto"), false);
		enableZoom($("#preProd_produto"), false);
	
		// CONTABILIDADE
		enableContainer2($("#divContab"), false);
		enableZoom($("#contaContb_produto"), false);
		enableZoom($("#itemContb_produto"), false);
		enableZoom($("#ccusto_produto"), false);
		
		// FISCAL
		enableContainer2($("#divFiscal"), false);
		enableZoom($("#origem_produto"), false);
		enableZoom($("#grupoTrib_produto"), false);
		enableZoom($("#servIss_produto"), false);
		enableZoom($("#exNcm_produto"), false);
		enableZoom($("#tabNatRec_produto"), false);
		
	}

	if(STAGE == LOGISTICA){
		enableContainer2($("#divSolicitacao"),false);
		enableContainer2($("#divRespLogist"), false);

		//Cabeçalho da solicitação
		$("select[name=consul_cod_prod]").attr('disabled',false);
		
		// SUPRIMENTOS
		enableContainer2($("#divSupply"), false);
		enableZoom($("#tipo_produto"), false);
		enableZoom($("#ncm_produto"), false);
		enableZoom($("#grupo_produto"), false);
		enableZoom($("#formulacao_produto"), false);
		enableZoom($("#classe_produto"), false);
		enableZoom($("#uniMedida_Produto"), false);
		enableZoom($("#segUniMedida_Produto"), false);
		enableZoom($("#fabric_produto"), false);
		enableZoom($("#registrante_produto"), false);

		// CONTABILIDADE
		enableContainer2($("#divContab"), false);
		enableField($("#codigo_produto"), true);
		enableZoom($("#contaContb_produto"), false);
		enableZoom($("#itemContb_produto"), false);
		enableZoom($("#ccusto_produto"), false);

        // FISCAL
		enableContainer2($("#divFiscal"), false);
		enableZoom($("#origem_produto"), false);
		enableZoom($("#grupoTrib_produto"), false);
		enableZoom($("#servIss_produto"), false);
		enableZoom($("#exNcm_produto"), false);
		enableZoom($("#tabNatRec_produto"), false);

		//ZERA CAMPO PARA VALIDAÇÃO
		if(RET == "nao"){
			$("#infoComplLogist").val('');
		}
		
	}

	if(STAGE == CONTABILIDADE){
		enableContainer2($("#divSolicitacao"),false);
		enableContainer2($("#divRespLogist"), false);
		enableContainer2($("#divRespContab"), false);

		// SUPRIMENTOS
		enableContainer2($("#divSupply"), false);
		enableZoom($("#tipo_produto"), false);
		enableZoom($("#ncm_produto"), false);
		enableZoom($("#grupo_produto"), false);
		enableZoom($("#formulacao_produto"), false);
		enableZoom($("#classe_produto"), false);
		enableZoom($("#uniMedida_Produto"), false);
		enableZoom($("#segUniMedida_Produto"), false);
		enableZoom($("#fabric_produto"), false);
		enableZoom($("#registrante_produto"), false);

		// LOGISTICA
		enableContainer2($("#divLogist"), false);
		enableZoom($("#armazem_produto"), false);
		enableZoom($("#princpAtivo_produto"), false);
		enableZoom($("#preProd_produto"), false);

		// FISCAL
		enableContainer2($("#divFiscal"), false);
		enableZoom($("#origem_produto"), false);
		enableZoom($("#grupoTrib_produto"), false);
		enableZoom($("#servIss_produto"), false);
		enableZoom($("#exNcm_produto"), false);
		enableZoom($("#tabNatRec_produto"), false);

		//ZERA CAMPO PARA VALIDAÇÃO
		if(RET == "nao"){
			$("#infoComplCont").val('');
		}
	}

	if(STAGE == FISCAL){
		enableContainer2($("#divSolicitacao"),false);
		enableContainer2($("#divRespLogist"), false);
		enableContainer2($("#divRespContab"), false);
		enableContainer2($("#divRespFiscal"), false);

		if($("#tipoProduto").val() == 'servico' && $("#departCadastrante").val() == 'fiscal'){
			// CONTABILIDADE
			enableContainer2($("#divContab"), false);
			enableZoom($("#contaContb_produto"), false);
			enableZoom($("#itemContb_produto"), false);
			enableZoom($("#ccusto_produto"), false);
		}else{
			// SUPRIMENTOS
			enableContainer2($("#divSupply"), false);
			enableZoom($("#tipo_produto"), false);
			enableZoom($("#grupo_produto"), false);
			enableZoom($("#ncm_produto"), false);
			enableZoom($("#formulacao_produto"), false);
			enableZoom($("#classe_produto"), false);
			enableZoom($("#uniMedida_Produto"), false);
			enableZoom($("#segUniMedida_Produto"), false);
			enableZoom($("#fabric_produto"), false);
			enableZoom($("#registrante_produto"), false);

			// LOGISTICA
			enableContainer2($("#divLogist"), false);
			enableZoom($("#armazem_produto"), false);
			enableZoom($("#princpAtivo_produto"), false);
			enableZoom($("#preProd_produto"), false);

			// CONTABILIDADE
			enableContainer2($("#divContab"), false);
			enableZoom($("#contaContb_produto"), false);
			enableZoom($("#itemContb_produto"), false);
			enableZoom($("#ccusto_produto"), false);
		}

		//ZERA CAMPO PARA VALIDAÇÃO
		if(RET == "nao"){
			$("#infoComplFisc").val('');
		}
	}

	if(STAGE == PRODUTO_INTG){
		enableContainer2($("#divSolicitacao"),false);
		enableContainer2($("#divRespLogist"), false);
		enableContainer2($("#divRespContab"), false);
		enableContainer2($("#divRespFiscal"), false);

		// SUPRIMENTOS
		enableContainer2($("#divSupply"), false);
		enableZoom($("#tipo_produto"), false);
		enableZoom($("#ncm_produto"), false);
		enableZoom($("#grupo_produto"), false);
		enableZoom($("#formulacao_produto"), false);
		enableZoom($("#classe_produto"), false);
		enableZoom($("#uniMedida_Produto"), false);
		enableZoom($("#segUniMedida_Produto"), false);
		enableZoom($("#fabric_produto"), false);
		enableZoom($("#registrante_produto"), false);

		// LOGISTICA
		enableContainer2($("#divLogist"), false);
		enableZoom($("#armazem_produto"), false);
		enableZoom($("#princpAtivo_produto"), false);
		enableZoom($("#preProd_produto"), false);

		// CONTABILIDADE
		enableContainer2($("#divContab"), false);
		enableZoom($("#contaContb_produto"), false);
		enableZoom($("#itemContb_produto"), false);
		enableZoom($("#ccusto_produto"), false);

		// FISCAL
		enableContainer2($("#divFiscal"), false);
		enableZoom($("#origem_produto"), false);
		enableZoom($("#grupoTrib_produto"), false);
		enableZoom($("#servIss_produto"), false);
		enableZoom($("#exNcm_produto"), false);
		enableZoom($("#tabNatRec_produto"), false);

		enableContainer2($("#divNecessidade"), false);
	}

	enableField($("#codTipo_produto"), false);
    enableField($("#descTipo_produto"), false);
    enableField($("#codNcm_produto"), false);
    enableField($("#descNcm_produto"), false);
    enableField($("#codGrupo_produto"), false);
    enableField($("#descGrupo_produto"), false);
    enableField($("#codFormula_produto"), false);
    enableField($("#descFormula_produto"), false);
    enableField($("#codClasse_produto"), false);
    enableField($("#descClasse_produto"), false);
    enableField($("#codUniMed_produto"), false);
    enableField($("#descUniMed_produto"), false);
    enableField($("#codSegUniMed_produto"), false);
    enableField($("#descSegUniMed_produto"), false);
    enableField($("#codFabric_produto"), false);
    enableField($("#descFabric_produto"), false);
    enableField($("#codRegistrante_produto"), false);
	enableField($("#descRegistrante_produto"), false);
	enableField($("#codContaContb_produto"), false);
	enableField($("#descContaContb_produto"), false);
	enableField($("#codItemContb_produto"), false);
	enableField($("#descItemContb_produto"), false);
	enableField($("#codCCusto_produto"), false);
	enableField($("#descCCusto_produto"), false);
    enableField($("#codOrigem_produto"), false);
    enableField($("#descOrigem_produto"), false);
    enableField($("#codGrupTrib_produto"), false);
    enableField($("#descGrupTrib_produto"), false);
    enableField($("#codExNcm_produto"), false);
    enableField($("#descExNcm_produto"), false);
    enableField($("#codTabNatRec_produto"), false);
    enableField($("#descTabNatRec_produto"), false);
    enableField($("#codServIss_produto"), false);
	enableField($("#descServIss_produto"), false);
	enableField($("#descArmazem_produto"), false);
    enableField($("#codArmazem_produto"), false);
    enableField($("#codPrincpAtivo_produto"), false);
    enableField($("#descPrincpAtivo_produto"), false);
    enableField($("#codPreProd_produto"), false);
    enableField($("#descPreProd_produto"), false);
}