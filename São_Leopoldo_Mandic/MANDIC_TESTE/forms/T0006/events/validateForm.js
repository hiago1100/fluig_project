function validateForm(form){
	
	var atividade 	 = getValue("WKNumState");
	var selecionado  = form.getValue("liberaQual");
	var selecDefesa  = form.getValue("defesaRadio");
	var liberaBibli  = form.getValue("liberacaoBibl");
	var validaNaoUt  = form.getValue("naoUtiliza") == "on" ? true : false;
	var validaPront  = form.getValue("semProntuarios") == "on" ? true : false;
	var validaBiblio = form.getValue("cursoIsento") == "on" ? true : false;	


// PRONTUÁRIOS

if (atividade == 20) {

	if (validaPront == false) {

		if (form.getValue("pendenciaDOC") == null || form.getValue("pendenciaDOC") == '' ) {
			throw "Aluno com pendência de Documentos"
		}
		if (form.getValue("pendenciaRADIO") == null || form.getValue("pendenciaRADIO") == '') {
			throw "Aluno com pendência de radiografia panorâmica"
		}

	}



} 

// Departamento Financeiro 

if (atividade == 21) {

	if (form.getValue("semPendencia") == null || form.getValue("semPendencia") == '' ) {
		throw "Aluno com pendência não é possível movimentar atividade"
	}

}

//comite

if (atividade == 22) {

	// sem regras
}


// Academico 

if (atividade == 23) {

	if (form.getValue('semPendenciaAcad') == null || form.getValue('semPendenciaAcad') == '') {

		throw "Não é possível movimentar a atividade com pendências de documentação"
	}

	if (form.getValue('semPendenciaDipl') == null || form.getValue('semPendenciaDipl') == '') {

		throw "Não é possível movimentar a atividade com pendência de créditos em disciplinas."
	}

}

// armários


if (atividade == 27) {

	if (form.getValue('semPendenciaArm') == null || form.getValue('semPendenciaArm') == '' ) {

		throw "Não é possível avançar com a atividade caso tenha pendência"
	}
}

// DEPTO. FINANCEIRO LIBERAÇÃO PARA QUALIFICAÇÃO E DEFESA

if (atividade == 28) {

 if (validaNaoUt == false) {
	
	if(form.getValue('exameQual') == null || form.getValue('exameQual') == ''){ 
		throw " Informe a liberação do exame de qualificação";
	}
	if (selecionado == "nao" && form.getValue('dataNoQual') == '') {		
		throw "** Não é possível avançar com a atividade caso o Exame de Qualificação não seja Liberado **"
	}else if(selecionado == "sim" && form.getValue('dataLibeQual') == ''){ 
		throw " Favor preencher a data de Liberação"
	}
	// Começo da Defesa 
	if(form.getValue('defesa') == null || form.getValue('defesa') == ''){ 
		throw " Informe a liberação da Defesa";
	}
	if(form.getValue('defesaRadio') == null || form.getValue('defesaRadio') == ''){ 
		throw " Escolha o Tipo de liberação de Defesa";
	}
	if (selecDefesa == "nao" && form.getValue('dataNoDef') == '') {
		throw "** Não é possível avançar com a atividade caso a Defesa não seja Liberada **";
	}else if(selecDefesa == "sim" && form.getValue('dataLibeDef') == ''){ 
		throw " Favor preencher a data de Liberação Defesa";
	}
 } 
} 

if (atividade == 47) {

	if (validaBiblio == false) {

		if (liberaBibli == "nao" && form.getValue("dataNo") == '') {
			throw "Não é possível avançar com a atividade caso não seja liberado"
		}else if (liberaBibli == "sim" && form.getValue('dataLibe') == '') {

			throw "Favor preencher a data de liberação"
		}

	}

}

}