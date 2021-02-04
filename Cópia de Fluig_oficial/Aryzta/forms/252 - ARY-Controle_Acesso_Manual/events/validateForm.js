function validateForm(form){
	checkErrorJs(form);

	log.info("### ENTROU NO validateForm");

	var WKNumState = getValue('WKNumState');
	var tipoAcao = form.getValue("tipoAcao");

	if(tipoAcao == 'selecione'){
		throw "Selecione um Tipo de Ação";
	}

	if(WKNumState == 25){

		var indexes = form.getChildrenIndexes("tabelaAba2");

		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba2Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação!";
			}
			if(form.getValue("aba2Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}	
		
	}

	if(WKNumState == 5){

		var indexes = form.getChildrenIndexes("tabelaAba3");

		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba3Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação";
			}
			if(form.getValue("aba3Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}
		
	}

	if(WKNumState == 10){

		var indexes = form.getChildrenIndexes("tabelaAba4");

		for(var i = 0; i< indexes.length; i++){
			if(form.getValue("aba4Obs___" + indexes[i]) == ""){ 
				throw "Preencha o Campo Observação";
			}
			if(form.getValue("aba4Obs___" + indexes[i]).length() < 20){ 
				throw "Preencha o Campo Observação com no mínimo 20 caracteres!";
			}
		}
		
	}

	if(WKNumState == 30){

		var indexes = form.getChildrenIndexes("tabelaAba5");

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