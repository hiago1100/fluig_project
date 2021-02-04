function validateForm(form){

	var numAtividade = getValue("WKNumState");
	var msgValidacao = "";
	
	// if(form.getValue('nome') == "") {
	// 	msgValidacao += " Campo nome é obrigatório. </br>";
	// }

	if(form.getValue('cpf') == "") {
		msgValidacao += " Campo cpf é obrigatório. </br>";
	}

	if(numAtividade == 5) {

		if(form.getValue('acao') == "renovacao" || form.getValue('acao') == "exclusao") {

			if(form.getValue('matricula') === "") {
				msgValidacao += " Campo matrícula é obrigatório. </br>";
			}

			if(form.getValue('data_admissao') == "") {
				msgValidacao += " Campo data de admissão é obrigatório. </br>";
			}
		}

		if(form.getValue('local_trabalho') == "") {
			msgValidacao += " Campo local de trabalho é obrigatório. </br>";
		}

		if(form.getValue('cargo') == "") {
			msgValidacao += " Campo cargo é obrigatório. </br>";
		}

		if(form.getValue('rg') == "") {
			msgValidacao += " Campo rg é obrigatório. </br>";
		}

		if(form.getValue('data_nascimento') == "") {
			msgValidacao += " Campo data de nascimento é obrigatório. </br>";
		}

		if(form.getValue('cep') == "") {
			msgValidacao += " Campo cep do endereço é obrigatório. </br>";
		}

		if(form.getValue('logradouro') == "") {
			msgValidacao += " Campo logradouro do endereço é obrigatório. </br>";
		}

		if(form.getValue('numero') == "") {
			msgValidacao += " Campo número do endereço é obrigatório. </br>";
		}

		if(form.getValue('bairro') == "") {
			msgValidacao += " Campo bairro do endereço é obrigatório. </br>";
		}

		if(form.getValue('municipio') == "") {
			msgValidacao += " Campo município do endereço é obrigatório. </br>";
		}

		if(form.getValue('estado') == "") {
			msgValidacao += " Campo estado do endereço é obrigatório. </br>";
		}

		if(form.getValue('telefone') == "") {
			msgValidacao += " Campo telefone é obrigatório. </br>";
		}
	}


	if(msgValidacao != "") {
		throw msgValidacao;
	}
}