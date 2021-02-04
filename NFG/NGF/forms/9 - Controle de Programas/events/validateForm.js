function validateForm(form){
	checkErrorJs(form);

	
	var WKNumState = getValue('WKNumState');
	var tipoAcao = form.getValue("tipoAcao");

	log.info("### ENTROU NO validateForm ativ: "+ WKNumState );
	
	if(WKNumState == 0 || WKNumState == 4){

		var indexRemove = form.getChildrenIndexes("tabela_programas2");
		var indexAdd = form.getChildrenIndexes("tabela_programas3");

		var codGrupo = form.getValue("codGrupo");
		var codGrupoDesc = form.getValue('codGrupoDesc');

		log.info("@@@ indexRemove.length : "+indexRemove.length);
		log.info("@@@ indexAdd.length : "+indexAdd.length);

		
		if(codGrupo == '' && codGrupoDesc == ''){
			throw "Insira um Grupo"
		}
		if(indexRemove.length == 0 && indexAdd.length == 0){
			throw "Insira ao menos 1 programa em Exclusão de Programas ou Adição de Programas. ";
		}


	}

	// Gestor Grupo
	if(WKNumState == 11){

		var indexes = form.getChildrenIndexes("respoCham");

		var btnIndex = form.getValue("obsIndex");
		var aprovado = form.getValue("aprovacaoProg");

		log.info("@@@ indexes : "+indexes);
		log.info("@@@ btnIndex : "+btnIndex);
		log.info("@@@ aprovado : "+aprovado);

		if(aprovado == 'nao'){

			if(btnIndex == "0"){
					throw "Insira e Preencha o Campo Observação";
			}

			for(var i = 0; i< indexes.length; i++){
				if(form.getValue("areaResp___" + indexes[i]) == ""){ 
					throw "Preencha o Campo na aba Observação!";
				}
				if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
					throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
				}
			}
			
		}
		if(aprovado == 'sim'){

			if(btnIndex == "1"){
				for(var i = 0; i< indexes.length; i++){
					if(form.getValue("areaResp___" + indexes[i]) == ""){ 
						throw "Preencha o Campo na aba Observação!";
					}
					if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
						throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
					}
				}	
			}
		}
		
		if(aprovado == ''){
			throw "Selecione uma opção Aprovar/Reprovar";
		}

		
		
	} // Fim Gestor Grupo

	//Gestor Informação
	if(WKNumState == 13){

		var indexes = form.getChildrenIndexes("respoCham");

		var btnIndex = form.getValue("obsIndex");
		var aprovado = form.getValue("aprovacaoProg");

		log.info("@@@ indexes : "+indexes);
		log.info("@@@ btnIndex : "+btnIndex);
		log.info("@@@ aprovado : "+aprovado);

		if(aprovado == 'nao'){

			if(btnIndex == "0"){
					throw "Insira e Preencha o Campo Observação";
			}

			for(var i = 0; i< indexes.length; i++){
				if(form.getValue("areaResp___" + indexes[i]) == ""){ 
					throw "Preencha o Campo na aba Observação!";
				}
				if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
					throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
				}
			}
			
		}
		if(aprovado == 'sim'){

			if(btnIndex == "1"){
				for(var i = 0; i< indexes.length; i++){
					if(form.getValue("areaResp___" + indexes[i]) == ""){ 
						throw "Preencha o Campo na aba Observação!";
					}
					if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
						throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
					}
				}	
			}	
		}	
		if(aprovado == ''){
			throw "Selecione uma opção Aprovar/Reprovar";
		}
		
	} // Fim Gestor Informação

	//Gestor S.I
	if(WKNumState == 17){

		var indexes = form.getChildrenIndexes("respoCham");

		var btnIndex = form.getValue("obsIndex");
		var aprovado = form.getValue("aprovacaoProg");


		

		if(aprovado == 'nao'){

			if(btnIndex == "0"){
					throw "Insira e Preencha o Campo Observação";
			}

			for(var i = 0; i< indexes.length; i++){
				if(form.getValue("areaResp___" + indexes[i]) == ""){ 
					throw "Preencha o Campo na aba Observação!";
				}
				if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
					throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
				}
			}
			
		}
		if(aprovado == 'sim'){

			if(btnIndex == "1"){
				for(var i = 0; i< indexes.length; i++){
					if(form.getValue("areaResp___" + indexes[i]) == ""){ 
						throw "Preencha o Campo na aba Observação!";
					}
					if(form.getValue("areaResp___" + indexes[i]).length() < 10){ 
						throw "Preencha o Campo Observação com no mínimo 10 caracteres!";
					}
				}	
			}	
		}
		if(aprovado == ''){
			throw "Selecione uma opção Aprovar/Reprovar";
		}
		
	} // Fim Gestor S.I.

	if(WKNumState == 29){
		
		var selectDestino = form.getValue("selectDestino");
		
		if(selectDestino == 'selecione'){

			throw "Selecione o destino da atividade.";
		}

	}
	

}

function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "O FORMULARIO POSSUI ERROS. FAVOR VERIFICAR OS CAMPOS NAO PREENCHIDOS.";
	}
}