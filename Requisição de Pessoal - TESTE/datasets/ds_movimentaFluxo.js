function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("SOLICITACAO");

	var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
	var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
	var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
	var objectFactory = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");
	var cardData = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
	var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
	var appointment =  workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");;

	var constraintFLUIG_R02361 = DatasetFactory.createConstraint('cpNumeroSolicitacao', '14188', '14188', ConstraintType.MUST);

	var datasetPrincipal = DatasetFactory.getDataset("FLUIG_R0236", null, [constraintFLUIG_R02361], null);

for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var cpNumeroSolicitacao             = datasetPrincipal.getValue(i, "cpNumeroSolicitacao");
        var cpReqDepartamentoObra           = datasetPrincipal.getValue(i, "cpReqDepartamentoObra");
        var cpReqCodSecao                   = datasetPrincipal.getValue(i, "cpReqCodSecao");
        var cpReqTipoSecao                  = datasetPrincipal.getValue(i, "cpReqTipoSecao");
        var cpReqEmpresaDescricao           = datasetPrincipal.getValue(i, "cpReqEmpresaDescricao");
        var cpReqCodEmpresa                 = datasetPrincipal.getValue(i, "cpReqCodEmpresa");
        var cpReqEstado                     = datasetPrincipal.getValue(i, "cpReqEstado");
        var cpReqGestorNome                 = datasetPrincipal.getValue(i, "cpReqGestorNome");
        var cpReqGerenteGeralNome           = datasetPrincipal.getValue(i, "cpReqGerenteGeralNome");                
        var cpTipoMaoObra                   = datasetPrincipal.getValue(i, "cpTipoMaoObra");
        var cpReqNomeResponsRecolhimento    = datasetPrincipal.getValue(i, "cpReqNomeResponsRecolhimento");
        var cpReqChapaResponsRecolhimento   = datasetPrincipal.getValue(i, "cpReqChapaResponsRecolhimento");
        var cpReqChapaResponsRecolhimento   = datasetPrincipal.getValue(i, "cpReqChapaResponsRecolhimento");
        var cpMatriculaGestorObraDep        = datasetPrincipal.getValue(i, "cpMatriculaGestorObraDep");
        var cpMatriculaGestorObraDep        = datasetPrincipal.getValue(i, "cpMatriculaGestorObraDep");
        var cpMatriculaConsultoraObraDep    = datasetPrincipal.getValue(i, "cpMatriculaConsultoraObraDep");
        var cpMatriculaGestorObraDep        = datasetPrincipal.getValue(i, "cpMatriculaGestorObraDep");
        var cpMatriculaGGObraDep            = datasetPrincipal.getValue(i, "cpMatriculaGGObraDep");
        var cpMatriculaSuperObraDep         = datasetPrincipal.getValue(i, "cpMatriculaSuperObraDep");
        var cpMatriculaDiretorObraDep       = datasetPrincipal.getValue(i, "cpMatriculaDiretorObraDep");
        var cpCodObra                       = datasetPrincipal.getValue(i, "cpCodObra");   
        // bloco 2 
		var cpDataAbertura 					= datasetPrincipal.getValue(i, "cpDataAbertura");   
		var cpSolicitanteNome 				= datasetPrincipal.getValue(i, "cpSolicitanteNome");   
		var cpSolicitanteFuncao				= datasetPrincipal.getValue(i, "cpSolicitanteFuncao");   
		var cpSolicitanteEmpresa 			= datasetPrincipal.getValue(i, "cpSolicitanteEmpresa");   
		var cpSolicitanteObraDep 			= datasetPrincipal.getValue(i, "cpSolicitanteObraDep");   
		var cpSolicitanteEstado 			= datasetPrincipal.getValue(i, "cpSolicitanteEstado");   
		var cpSolicitanteEmail 				= datasetPrincipal.getValue(i, "cpSolicitanteEmail");   

   		 var datasetPaiFilho = DatasetFactory.getDataset("dsPaiFilho0236", [cpNumeroSolicitacao], null, null); 
    
    for (var y = 0; y < datasetPaiFilho.rowsCount; y++) {

		var cpVagaSalario  		          = datasetPaiFilho.getValue(y, "cpVagaSalario");
		var cpVagaHorario                 = datasetPaiFilho.getValue(y, "cpVagaHorario");
		var cpTipoPostoTrabalho           = datasetPaiFilho.getValue(y, "cpTipoPostoTrabalho");
		var cpNomePostoTrabalho           = datasetPaiFilho.getValue(y, "cpNomePostoTrabalho");
		var cpCodNomePostoTrabalho        = datasetPaiFilho.getValue(y, "cpCodNomePostoTrabalho");
		var cpVagaQuantidade      	      = datasetPaiFilho.getValue(y, "cpVagaQuantidade");
		var cpVagaFuncao    			  = datasetPaiFilho.getValue(y, "cpVagaFuncao");
		var cpCodVagaFuncao               = datasetPaiFilho.getValue(y, "cpCodVagaFuncao");
		var cpAprovacaoRHASalarioAlterado = datasetPaiFilho.getValue(y, "cpAprovacaoRHASalarioAlterado");		
            
        var itemForm1 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm1.getItem().add("cpNumeroRequisicao");
        itemForm1.getItem().add(cpNumeroSolicitacao);
        cardData.getItem().add(itemForm1);
                
        var itemForm2 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm2.getItem().add("cpReqDepartamentoObra");
        itemForm2.getItem().add(cpReqDepartamentoObra);
        cardData.getItem().add(itemForm2);        
                 
		var itemForm3 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm3.getItem().add("cpReqCodSecao");
		itemForm3.getItem().add(cpReqCodSecao);
		cardData.getItem().add(itemForm3);
     
        var itemForm4 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm4.getItem().add("cpReqTipoSecao");
        itemForm4.getItem().add(cpReqTipoSecao);
        cardData.getItem().add(itemForm4);

        var itemForm5 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm5.getItem().add("cpReqEmpresaDescricao");
        itemForm5.getItem().add(cpReqEmpresaDescricao);
        cardData.getItem().add(itemForm5);
        
        
        var itemForm6 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm6.getItem().add("cpReqCodEmpresa");
        itemForm6.getItem().add(cpReqCodEmpresa);
        cardData.getItem().add(itemForm6);        
                 
		var itemForm7 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm7.getItem().add("cpReqEstado");
		itemForm7.getItem().add(cpReqEstado);
		cardData.getItem().add(itemForm7);
     
        var itemForm8 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm8.getItem().add("cpReqGestorNome");
        itemForm8.getItem().add(cpReqGestorNome);
        cardData.getItem().add(itemForm8);

        var itemForm9 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm9.getItem().add("cpReqGerenteGeralNome");
        itemForm9.getItem().add(cpReqGerenteGeralNome);
        cardData.getItem().add(itemForm9);
        
        
        var itemForm10 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm10.getItem().add("cpReqTipoMaoObra");
        itemForm10.getItem().add(cpTipoMaoObra);
        cardData.getItem().add(itemForm10);        
                 
		var itemForm11 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm11.getItem().add("cpReqResponsavelRecolhimento");
		itemForm11.getItem().add(cpReqNomeResponsRecolhimento);
		cardData.getItem().add(itemForm11);
     
        var itemForm12 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm12.getItem().add("cpResponsavelRecrutamentoSelec");
        itemForm12.getItem().add(cpReqChapaResponsRecolhimento);
        cardData.getItem().add(itemForm12);

        var itemForm13 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");       
        itemForm13.getItem().add("cpResponsavelRecolhimentoObra");
        itemForm13.getItem().add(cpReqChapaResponsRecolhimento);
        cardData.getItem().add(itemForm13);
        
        
        var itemForm14 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm14.getItem().add("cpResponsavelAprovadorN1Candid");
        itemForm14.getItem().add(cpMatriculaGestorObraDep);
        cardData.getItem().add(itemForm14);        
                 
		var itemForm15 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm15.getItem().add("cpResponsavelAberturMovimentac");
		itemForm15.getItem().add(cpMatriculaGestorObraDep);
		cardData.getItem().add(itemForm15);
     
        var itemForm16 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm16.getItem().add("cpResponsavelExcecaoRH");
        itemForm16.getItem().add(cpMatriculaConsultoraObraDep);
        cardData.getItem().add(itemForm16);

        var itemForm17 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm17.getItem().add("cpResponsavelExcecaoN1");
        itemForm17.getItem().add(cpMatriculaGestorObraDep);
        cardData.getItem().add(itemForm17);
        
        
        var itemForm18 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm18.getItem().add("cpResponsavelExcecaoN2");
        itemForm18.getItem().add(cpMatriculaGGObraDep);
        cardData.getItem().add(itemForm18);        
                 
		var itemForm19 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm19.getItem().add("cpResponsavelExcecaoN3");
		itemForm19.getItem().add(cpMatriculaSuperObraDep);
		cardData.getItem().add(itemForm19);
     
        var itemForm20 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm20.getItem().add("cpResponsavelExcecaoN4");
        itemForm20.getItem().add(cpMatriculaDiretorObraDep);
        cardData.getItem().add(itemForm20);

        var itemForm21 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm21.getItem().add("cpCodObra");
        itemForm21.getItem().add(cpCodObra);
        cardData.getItem().add(itemForm21);

        var itemForm22 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm22.getItem().add("cpResponsavelDataAdmissao");
        itemForm22.getItem().add(cpReqTipoSecao == 'Sede' ? 'Pool:Role:DRH.112' : cpMatriculaConsultoraObraDep);
        cardData.getItem().add(itemForm22);

        var itemForm23 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm23.getItem().add("cpDataAbertura");
        itemForm23.getItem().add(cpDataAbertura);
        cardData.getItem().add(itemForm23);

        var itemForm24 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm24.getItem().add("cpSolicitanteNome");
        itemForm24.getItem().add(cpSolicitanteNome);
        cardData.getItem().add(itemForm24);

        var itemForm25 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
        itemForm25.getItem().add("cpSolicitanteFuncao");
        itemForm25.getItem().add(cpSolicitanteFuncao);
        cardData.getItem().add(itemForm25);

		var itemForm26 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm26.getItem().add("cpSolicitanteEmpresa");
		itemForm26.getItem().add(cpSolicitanteEmpresa);
		cardData.getItem().add(itemForm26);

		var itemForm27 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm27.getItem().add("cpSolicitanteObraDep");
		itemForm27.getItem().add(cpSolicitanteObraDep);
		cardData.getItem().add(itemForm27);

		var itemForm28 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm28.getItem().add("cpSolicitanteEstado");
		itemForm28.getItem().add(cpSolicitanteEstado);
		cardData.getItem().add(itemForm28);

		var itemForm29 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm29.getItem().add("cpSolicitanteEmail");
		itemForm29.getItem().add(cpSolicitanteEmail);
		cardData.getItem().add(itemForm29);   

		var itemForm30 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm30.getItem().add("cpReqSalario");
		itemForm30.getItem().add(cpAprovacaoRHASalarioAlterado);
		cardData.getItem().add(itemForm30);   

		var itemForm31 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm31.getItem().add("cpReqHorario");
		itemForm31.getItem().add(cpVagaHorario);
		cardData.getItem().add(itemForm31);   

		var itemForm32 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm32.getItem().add("cpReTipoPosto");
		itemForm32.getItem().add(cpTipoPostoTrabalho);
		cardData.getItem().add(itemForm32);   

		var itemForm33 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm33.getItem().add("cpReqNomePostoTrabalho");
		itemForm33.getItem().add(cpNomePostoTrabalho);
		cardData.getItem().add(itemForm33);   

		var itemForm34 = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		itemForm34.getItem().add("cpCodNomePostoTrabalho");
		itemForm34.getItem().add(cpCodNomePostoTrabalho);
		cardData.getItem().add(itemForm34);   


		log.info("**********************************************************************************");
		log.info("CARD DATA = "+ cardData);
		log.info("**********************************************************************************");


        for (var index = 1; index <= cpVagaQuantidade; index++) 
        {
       var avaliacaoGerada = workflowEngineService.startProcess("adm", "fluig**csc", 1,"FLUIG-0237", 22, ["adm"], "Solicitação aberta automaticamente", true, processAttachmentDtoArray, cardData,appointment, false);
            
            var solicitacoesGeradas = solicitacoesGeradas + '\n' + avaliacaoGerada.get("iProcess") + ', ';
        }

           
  }
}


    dataset.addRow([
    				solicitacoesGeradas
    			   		]);

    return dataset;
}

