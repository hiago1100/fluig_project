$(function() {
	concatenarCampo();
	hints();
	visualizaIdRadioAction();
	visualizaIdRadio($("[name=filialRadioterapia]:checked"));
});


function concatenarCampo() {
	$("[name=filial]").change(function() {
		concatenarCodigoDescricao();
	});
	$("[name=codigo]").change(function() {
		concatenarCodigoDescricao();
	});
	$("[name=filial_protheus]").change(function() {
		concatenarCodigoDescricao();
	});
	$("[name=status]").change(function() {
		concatenarCodigoDescricao();
		console.log("change: " + $(this).val());
	});
	$("[name=status]").click(function() {
		concatenarCodigoDescricao();
		console.log("click: " + $(this).val());
	});
}

function hints() {
	$('[data-toggle="tooltip"]').tooltip();
}

function concatenarCodigoDescricao() {
	var filial = $("[name=filial]").val();
	var codigo = $("[name=codigo]").val();
	var codigoProtheus = $("[name=filial_protheus]").val();
	var statusFilial = $("#status:checked").val();
	//var concatenarValor = filial + " - " + codigo + " - " + codigoProtheus + " [" + statusFilial + "]";
	var concatenarValor = filial + " - " + codigo + " - " + codigoProtheus;
	console.log("statusFilial: "+ statusFilial);
	if(statusFilial == "inativa")
		concatenarValor += " [" + statusFilial + "]";
	$("#campoIdentificador").val(concatenarValor);
}

function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;   
    if((tecla>47 && tecla<58)) return true;
    else{
    	if (tecla==8 || tecla==0) return true;
	else  return false;
    }
}

function visualizaIdRadio(obj) {
	if(obj.is(':checked')) {
		var valor = obj.val();
		if(valor == "nao")
			$(".id_radio").hide();
		else
			$(".id_radio").show();
	}
}

function visualizaIdRadioAction() {
	$("[name=filialRadioterapia]").click(function () {
		visualizaIdRadio($(this));
	});
}

function setSelectedZoomItem(selectedItem){
	if (selectedItem.inputName == "nomeGestor") {
		$("#codGstFluig").val(selectedItem["colleagueId"]);
	}
	if (selectedItem.inputName == "nomeGestorSubst") {
		$("#codGstFluigSubst").val(selectedItem["colleagueId"]);	
	}
}

function removedZoomItem(removedItem) {
	if (removedItem.inputName == "nomeGestor") {
		$("#codGstFluig").val("");
	}
	if (removedItem.inputName == "nomeGestorSubst") {
		$("#codGstFluigSubst").val("");	
	}
}
