function validateForm(form) {
	var houveErro = false;
	var mensagem = "";

	if (form.getValue("codigo") == null || form.getValue("codigo") ==  ""){
		mensagem = agruparMensagem(mensagem, "O campo código não pode ser vazio");
		houveErro = true;
	}

	if (form.getValue("filial_protheus") == null || form.getValue("filial_protheus") ==  ""){
		mensagem = agruparMensagem(mensagem, "O campo código do protheus não pode ser vazio");
		houveErro = true;
	}

	if (isCampoVazio(form, "filial")) {
		mensagem = agruparMensagem(mensagem, "O campo nome da filial não pode ser vazio");
		houveErro = true;
	}
	if (isCampoVazio(form, "filialRadioterapia")) {
		mensagem = agruparMensagem(mensagem, "O campo Convênio é Radioterapia não pode ser vazio");
		houveErro = true;
	} else if(form.getValue("filialRadioterapia") == "sim") {
		if (isCampoVazio(form, "id_filial_radioterapia")) {
			mensagem = agruparMensagem(mensagem, "O campo ID Radioterapia não pode ser vazio");
			houveErro = true;
		}
	}

	if (houveErro == true) {
		throw mensagem;
	}
	concatenarCodigoDescricao(form);
}

function concatenarCodigoDescricao(form) {
	var filial = form.getValue("filial");
	var codigo = form.getValue("codigo");
	var codigoProtheus = form.getValue("filial_protheus");
	var statusFilial = form.getValue("status");
	//var concatenarValor = filial + " - " + codigo + " - " + codigoProtheus + " [" + statusFilial + "]";
	var concatenarValor = filial + " - " + codigo + " - " + codigoProtheus;
	log.info("statusFilial: "+ statusFilial);
	if(statusFilial === "inativa")
		concatenarValor += " [" + statusFilial + "]";
	//$("#campoIdentificador").val(concatenarValor);
	form.setValue("campoIdentificador", concatenarValor);
	log.info("Identificador: " + form.getValue("campoIdentificador"));
}