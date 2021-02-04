function validateForm(form){
	log.info("===============Validate (inicio)===============");
	var numAtividade = getValue("WKNumState");



	// obrigatoriedade dos campos
	if (numAtividade == 0 || numAtividade == 4) {

		if (form.getValue("cpFilial") == "")
			throw "<br/><strong>O Processo deve ser iniciado apenas pelo Protheus:</strong><br/>";

	}

	if (numAtividade == 5) {

		if (form.getValue("numPedido") == "") {
			throw "<br/><strong>A atividade deve ser movimentada pelo Protheus:</strong><br/>";
		}
	}

	log.info("===============ValidateFields (Fim)===============");
}