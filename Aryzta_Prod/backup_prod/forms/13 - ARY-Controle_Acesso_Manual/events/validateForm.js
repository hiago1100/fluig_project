function validateForm(form){
	checkErrorJs(form);

	log.info("### ENTROU NO validateForm");

	var WKNumState = getValue('WKNumState');
	var tipoAcao = form.getValue("tipoAcao");

	if(tipoAcao == 'selecione'){
		throw "Selecione um Tipo de Ação";
	}

	if(WKNumState == 32){

		var indexes = form.getChildrenIndexes("tabelaAba2");

		if(indexes.length <= 0){
			throw "Insira e Preencha o Campo Observação";
		}
		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba2Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação!";
			}
			if(form.getValue("aba2Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}	
		
	}

	if(WKNumState == 41){

		var indexes = form.getChildrenIndexes("tabelaAba3");
		
		if(indexes.length <= 0){
			throw "Insira e Preencha o Campo Observação";
		}
		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba3Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação";
			}
			if(form.getValue("aba3Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}
		
	}

	if(WKNumState == 27){

		var indexes = form.getChildrenIndexes("tabelaAba5");
		
		if(indexes.length <= 0){
			throw "Insira e Preencha o Campo Observação";
		}
		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba5Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação";
			}
			if(form.getValue("aba5Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}
		
	}
}

function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "O FORMULARIO POSSUI ERROS. FAVOR VERIFICAR OS CAMPOS NAO PREENCHIDOS.";
	}
}