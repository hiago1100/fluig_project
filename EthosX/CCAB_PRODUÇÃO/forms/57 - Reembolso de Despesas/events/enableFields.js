function enableFields(form){
	var atividade = getValue("WKNumState");
	
	
	
	if(atividade == 5 || atividade == 11){
			// Deixa os campos da tabela pai e filho Desabilitando
			var indexes = form.getChildrenIndexes("tblItem"); // seu tablename
			for (var i = 0; i < indexes.length; i++) {
				// aqui dentro você  pode bloquear os campos que deseja
				form.setEnabled("cpTipoDespesa___" + indexes[i], false);
				form.setEnabled("cpValor___" + indexes[i], false);
				form.setEnabled("qtd___" + indexes[i], false);
				form.setEnabled("cpDescricao___" + indexes[i], false);	        
				form.setEnabled("dtReb___" + indexes[i], false);
				form.setEnabled("aux_codigo___" + indexes[i], false);	        
				
			}
	}
	
	if(atividade == 15){
			// Deixa os campos da tabela pai e filho Desabilitando
			var indexes = form.getChildrenIndexes("tblItem"); // seu tablename
			for (var i = 0; i < indexes.length; i++) {
				// aqui dentro você  pode bloquear os campos que deseja
				form.setEnabled("cpTipoDespesa___" + indexes[i], true);
				form.setEnabled("cpValor___" + indexes[i], true);
				form.setEnabled("qtd___" + indexes[i], true);
				form.setEnabled("cpDescricao___" + indexes[i], true);	        
				form.setEnabled("dtReb___" + indexes[i], true);
				form.setEnabled("aux_codigo___" + indexes[i], true);	        
				
			}
	}
	
	if(atividade == 15 || atividade == 5){
		form.setEnabled("cpReembolsado", true);
		form.setEnabled("cpCentroCusto", true);
	}
	
	if(atividade == 5 || atividade == 11){
		form.setEnabled("cpReembolsado", false);
		form.setEnabled("cpCentroCusto", false);
	}
	
	
	
}