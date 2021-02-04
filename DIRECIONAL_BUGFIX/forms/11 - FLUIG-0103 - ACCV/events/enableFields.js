function enableFields(form){ 
	
	log.info("Carregando EnableFields do formulário FLUIG-0103 - Alteração de Centro de Custo de viajante");
	
	var atividade = parseInt(getValue("WKNumState"));
	
	var Campos = new Array(
			
		{"campo" : "cpTipoViajante","atividade" : "0,1"},
		{"campo" : "cpCentroCusto","atividade" : "0,1"},
		{"campo" : "cpNomeCompleto","atividade" : "0,1"},
		{"campo" : "cpCpf","atividade" : "0,1"},
		{"campo" : "cpCargo","atividade" : "0,1"},
		{"campo" : "CentroCustoUauColab","atividade" : "0,1"},
		
		//DADOS DA VIAGEM
		{"campo" : "cpCentroCustoViagem","atividade" : "0,1"},
		{"campo" : "cpCentroCustoUau","atividade" : "0,1"},
		{"campo" : "cpDataInicioViagem","atividade" : "0,1"},
		{"campo" : "cpDataInicioViagem","atividade" : "0,1"},
		{"campo" : "cpObservacao","atividade" : "0,1"},
		
		//APROVACAO GESTOR ATUAL
		{"campo" : "cpAprovarGestorAtual","atividade" : "18"},
		{"campo" : "cpParecerGestorAtual","atividade" : "18"},
		
		//APROVACAO GESTOR VIAGEM
		{"campo" : "cpAprovarGestorViagem","atividade" : "23"},
		{"campo" : "cpParecerGestorViagem","atividade" : "23"},
		
		//ALTERACAO DO CENTRO DE CUSTO
		{"campo" : "cpAlterarCentroCusto","atividade" : "28"},
		{"campo" : "cpParecerAlterarCentroCusto","atividade" : "28"},
		
		//CONFIRMACAO DA ALTERACAO
		{"campo" : "cpSolicitacaoAtendida","atividade" : "33"},
		{"campo" : "cpNumeroOs","atividade" : "33"},
		{"campo" : "cpParecerSolicitacaoAtendida","atividade" : "33"},
		
		//CORRECAO DO CENTRO DE CUSTO
		{"campo" : "cpCorrigirCentroCusto","atividade" : "38"},
		{"campo" : "cpParecercpCorrigirCentroCusto","atividade" : "38"},
		
		//ADD CENTRO DE CUSTO NA LISTA DE CONVERSAO
		{"campo" : "cpAddCentroCustoListaConversao","atividade" : "44"},
		{"campo" : "cpParecerCCListaConversao","atividade" : "44"}
		
	);
	
	//BLOQUEIA CAMPOS PAI E FILHO 
	if (atividade != 0 && atividade != 1) {
		
		 var indexes = form.getChildrenIndexes("tbAddDependente");
		    
	    for (var i = 0; i < indexes.length; i++) {
	        form.setEnabled("cpNomeCompletoDependente___" + indexes[i], false);
	        form.setEnabled("cpCpfDependente___" + indexes[i], false);
	        form.setEnabled("cpDataNascimento___" + indexes[i], false);
	        form.setEnabled("cpParentesco___" + indexes[i], false);
	    }
	}

	for (var item in Campos) {
		var Campo = Campos[item];
		var atividades = Campo["atividade"].split(",");
		if (atividades.indexOf(atividade.toString()) >= 0) {
			form.setEnabled(Campo["campo"],true);
		} else {
			form.setEnabled(Campo["campo"],false);
		} 
	}

	log.info("Fim do EnableFields do formulário FLUIG-0103 - Alteração de Centro de Custo de viajante");

}