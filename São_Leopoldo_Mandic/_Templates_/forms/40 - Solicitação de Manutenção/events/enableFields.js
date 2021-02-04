function enableFields(form){

	var atividade = getValue("WKNumState");

	if(atividade == 16 || atividade == 11 || atividade == 5 ||atividade == 22 || atividade == 24 || atividade == 28){
		form.setEnabled("solicitante", false);
		form.setEnabled("descricaoEquipamento", false);
		form.setEnabled("descSituacao", false);
		
	}

	if(atividade == 11 || atividade == 5 ||atividade == 22 || atividade == 24 || atividade == 28){
		form.setEnabled("solicitante", false);
		form.setEnabled("descricaoEquipamento", false);
		form.setEnabled("descSituacao", false);
		form.setEnabled("manutencao", false);
		
	}

	if(atividade == 5){
		form.setEnabled("motivo", false);
	}
	
	if(atividade == 22){
			// Deixa os campos da tabela pai e filho Desabilitando
			var indexes = form.getChildrenIndexes("tbPlanejaManutencao"); // seu tablename
		    for (var i = 0; i < indexes.length; i++) {
		        // aqui dentro você  pode bloquear os campos que deseja
		        form.setEnabled("tarefa___" + indexes[i], false);
		        form.setEnabled("tbDescricao___" + indexes[i], false);
		        form.setEnabled("estado___" + indexes[i], false);
		        form.setEnabled("tempoExecucao___" + indexes[i], false);	        
		        form.setEnabled("tbEspecialidade___" + indexes[i], false);
		        form.setEnabled("homens___" + indexes[i], false);	        
		        form.setEnabled("tempoAlocacao___" + indexes[i], false);
		        form.setEnabled("tempoMinimo___" + indexes[i], false);
		        form.setEnabled("tempoMaximo___" + indexes[i], false);
		        form.setEnabled("tipo___" + indexes[i], false);
		        form.setEnabled("tipo2___" + indexes[i], false);
		    }
	}

	if (atividade == 22) {
		form.setEnabled("item", false);
		form.setEnabled("qtdItem", false);
		
	}

	if (atividade == 28) {
		form.setEnabled("estabelecimento", false);
		form.setEnabled("item", false);
		form.setEnabled("qtdItem", false);
		form.setEnabled("descSituacao", false);
	}
}