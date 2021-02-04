function servicetask220(attempt, message) {
	try
	{
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('servicetask220'); //TODO: retirar ao subir para produção
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('INICIANDO A INTEGRAÇÃO PARA A SOLICITACAO N.'+  hAPI.getCardValue("cpNumeroSolicitacao")); //TODO: retirar ao subir para produção
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
		var indexes = getIndexes('cpNomeColaborador'); // quantidade pai x filho
		log.warn('indice --> ' + indexes);
		var iterator = indexes.iterator();
		log.warn('iterator --> ' + iterator);
		

	    while(iterator.hasNext())
	    {	
			log.info('pre index');
			var index = iterator.next();
			log.info('pos index');
			
			log.warn('Processamento da Solicitacao – Rotinas de Folha');
			log.warn('Colaborador -–>' + hAPI.getCardValue("cpNomeColaboradorFolha___"+index));
			log.warn('Processado -->' + hAPI.getCardValue("cpProcessadoFolha___"+index));

			log.warn('IF -->' + hAPI.getCardValue("cpProcessadoFolha___"+index) == "1");
	        if(hAPI.getCardValue("cpProcessadoFolha___"+index) == "1") //Colaborador Processado Rotina de Folha
	        {	
		        var chapa = hAPI.getCardValue("cpMatriculaColaborador___"+index);

		     	log.warn('chapa: ' + chapa); //TODO: retirar ao subir para produção
		    	
		    	try
		    	{
		    		registerTransfer(chapa);
		    		processTransfer(chapa);

		    		log.info("CHAPA INTEGRA "+ chapa);
		    		
		    		//CalculateVacations(dataInicioFerias, dataFimFerias);
		    		//ReceiptVacation(dataInicioFerias);
		    		
		    		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
			     	log.warn('Setando integração completa'); //TODO: retirar ao subir para produção
			     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
			    	//hAPI.setCardValue("cpFeriasIntegradaRM___" + index, '1');
		    	}
		    	catch(erro)
		    	{
		    		//hAPI.setCardValue("cpFeriasIntegradaRM___" + index, '0');
		    		//CancelVacation(dataInicioFerias, dataFimFerias);
		    		throw 'ERRO: ' + erro.message;
		    	}
		        break;
	        }
	    }
	}
	catch(erro)
	{
		throw 'OCORREU UM ERRO NA INTEGRAÇÃO DE TRANSFERENCIA EM MASSA COM O RM :( GOD DAMMIT. ERRO: ' + erro.message;
	}
}