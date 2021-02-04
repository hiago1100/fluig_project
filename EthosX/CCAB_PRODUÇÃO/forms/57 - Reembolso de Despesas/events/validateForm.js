function validateForm(form) {

	log.info("===============Validate (inicio)===============");
	var numAtividade = getValue("WKNumState");
	var message = "";


	// obrigatoriedade dos campos
	if (numAtividade == 0 || numAtividade == 4) {

		// if (form.getValue("cpReembolsado") == "")
		// 	message += "</br>- Reembolsado";
		
		if (form.getValue("cpCpf") == "")
			message += "</br>- Reembolsado";

		// if (form.getValue("cpCentroCusto") == "")
		// 	message += "</br>- Centro de Custo";

		if (form.getValue("aux_codCusto") == "")
			message += "</br>- Centro de Custo";

		if (form.getValue("aux_pa") == "")
			message += "</br>- Informe se utiliza PA";
		

		var indexes = form.getChildrenIndexes("tblItem");
		if(indexes.length == 0){
			message += "</br>- Adicione uma Dispesa";
		}else if (indexes.length > 0) {
			for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
				var x = i+1;
		        // if(form.getValue('cpTipoDespesa___' + indexes[i]) == "" || form.getValue('cpValor___' + indexes[i]) == "") {
		        //    message += "</br>- A tabela de dispesas possui campos não preenchidos.";
				// }
				
				if(form.getValue('aux_codigo___' + indexes[i]) == "" || form.getValue('cpValor___'  + indexes[i]) == "" || form.getValue('cpDescricao___'  + indexes[i]) == "" || form.getValue('dtReb___' + indexes[i]) == ""){
					message += "</br>- A dispesa "+x+" possui campos não preenchidos.";
				}
		    }
		}
	}




	// if(numAtividade == 5){
	// 	if(form.getValue("aux_aprovador") == "reprovado" && form.getValue("motivoAprovador") == "")
	// 		message += "</br>- Motivo da Reprovação";

	// }

	if (numAtividade == 11) {
		if (form.getValue("aux_financeiro") == "reprovado" && form.getValue("justificativaFinanceiro") == "")
			message += "</br>- Motivo da não validação";

	}

	if (numAtividade == 15) {
		
		var indexes = form.getChildrenIndexes("tblItem");
		if(indexes.length == 0){
			message += "</br>- Adicione uma Dispesa";
		}
		else if (indexes.length > 0) {
			for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
				var x = i+1;
				
				if(form.getValue('aux_codigo___' + indexes[i]) == "" || form.getValue('cpValor___'  + indexes[i]) == "" || form.getValue('cpDescricao___'  + indexes[i]) == "" || form.getValue('dtReb___' + indexes[i]) == ""){
					message += "</br>- A dispesa "+x+" possui campos não preenchidos.";
				}
		    }
		}

	}




	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;

	log.info("===============ValidateFields (Fim)===============");
}