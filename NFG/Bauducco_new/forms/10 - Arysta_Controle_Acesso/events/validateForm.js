function validateForm(form){
	checkErrorJs(form);

	log.info("### ENTROU NO validateForm");

	var WKNumState = getValue('WKNumState');
	var tipoAcao = form.getValue("tipoAcao");

	if(tipoAcao == 'selecione'){
		throw "Selecione um Tipo de Ação";
	}


}

function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "O FORMULARIO POSSUI ERROS. FAVOR VERIFICAR OS CAMPOS NAO PREENCHIDOS.";
	}
}