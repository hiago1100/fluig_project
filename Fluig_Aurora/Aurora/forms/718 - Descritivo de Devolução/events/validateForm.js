function validateForm(form) {

	var _numAtiv = getValue("WKNumState");


	if (_numAtiv == 5 || _numAtiv == 12 || _numAtiv == 13) {
		if (form.getValue('aprovacaoSupDir') == ""){
			throw "Favor aprovar/reprovar.";
		}	
	}	



	if (form.getValue('devolucaoVenda') == ""){
		throw "O campo de devolucão de vendas não foi preenchido.";
	}

	if (form.getValue('nomeAbrev') == ""){
		throw "Favor preencher os campos do formulário";
	}

	if (form.getValue('email') == ""){
		throw "Favor informar um E-mail";
	}     





	var indexes = form.getChildrenIndexes("respoCham");
	if (indexes.length > 0) {
		for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespPadrao___' + indexes[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";
			}
		}
	}

	var indexesB = form.getChildrenIndexes("respRegional");
	if (indexesB.length > 0) {
		for (var i = 0; i < indexesB.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespRegional___' + indexesB[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";
			}
		}
	}   


	var indexesC = form.getChildrenIndexes("respDiretor");
	if (indexesC.length > 0) {
		for (var i = 0; i < indexesC.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespDiretor___' + indexesC[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";
			}
		}
	}

	var indexesD = form.getChildrenIndexes("respPresidente");
	if (indexesD.length > 0) {
		for (var i = 0; i < indexesD.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespPresidente___' + indexesD[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";
			}
		}
	}



	var indexesD = form.getChildrenIndexes("respPresidente");
	if (indexesD.length > 0) {
		for (var i = 0; i < indexesD.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespPresidente___' + indexesD[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";           }
		}
	}



	var indexesE = form.getChildrenIndexes("respoChamDif");
	if (indexesE.length > 0) {
		for (var i = 0; i < indexesE.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('areaRespDif___' + indexesE[i]) == '') {
				throw "Favor informar uma justificativa de aprovação!";
			}
		}
	}   

if (_numAtiv == 0 || _numAtiv == 4) { 
	var indexesF = form.getChildrenIndexes("tabelaNF");
	if (indexesF.length > 0) {
		for (var i = 0; i < indexesF.length; i++) { // percorre os campos Pai x Filho
			if(form.getValue('motivoAux___' + indexesF[i]) == '') {
				throw "Informe  um motivo para a devolução do item ! ";
			}
		}
	}   
}

	if (_numAtiv == 42) { 
		if (form.getValue('comparaDesc') == ""){
			throw "Favor retornar para o solicitante ou continuar Fluxo";
		}

		if (form.getValue('linhasCompara') == "" || form.getValue('linhasCompara') == "0" ){
			throw "Favor inserir ao menos um item de comparativo ";
		}
	  
	if(form.getValue('comparaDesc') == "nao"){
		if (form.getValue('obsCompara') == ""){
		throw "Favor Preencher observação";
		}
	  }
	}

	if (_numAtiv == 68) { 
		if (form.getValue('aprovacaoDif') == ""){
			throw "Favor retornar para o solicitante ou continuar Fluxo";
		} 
	}

	if (_numAtiv == 0 ) { 
		if (form.getValue('linhasDesc') == "" || form.getValue('linhasDesc') == "0" ){
			throw "Favor inserir ao menos um item do Descritivo ";
		}   
	}
	
	
	if(_numAtiv == 63 ){
		if (form.getValue('dataRetirada') == ""){
			throw "Favor inserir Data da retirada ";
		}  
		if (form.getValue('cnpjTransp') == ""){
			throw "Favor inserir Transportadora ";
		}	    
	}





}