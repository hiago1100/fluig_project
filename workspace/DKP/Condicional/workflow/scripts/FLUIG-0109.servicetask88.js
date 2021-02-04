function servicetask88(attempt, message) 
{
	try
	{
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('servicetask88'); //TODO: retirar ao subir para produção
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		log.warn('INICIANDO A INTEGRAÇÃO PARA A SOLICITACAO N.'+  hAPI.getCardValue("cpNumeroSolicitacao")); //TODO: retirar ao subir para produção
		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
	    var indexes = getIndexes('cpDataInicioFerias'); // quantidade pai x filho
	    var iterator = indexes.iterator();

	    while(iterator.hasNext())
	    {
	    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	    	log.warn('iterator.hasNext()'); //TODO: retirar ao subir para produção
	    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	    	
	        var index = iterator.next();
	        
	        if(hAPI.getCardValue("cpFeriasIntegradaRM___"+index) == '0')
	        {
		        var dataInicioFerias = hAPI.getCardValue("cpDataInicioFerias___"+index);
		        var dataFimFerias = hAPI.getCardValue("cpDataFimFerias___"+index);
		        var quantidadeDias = hAPI.getCardValue("cpQuantidadesDiasFeriasPeriodo___"+index);
		        
		        log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		    	log.warn('index: ' +index); //TODO: retirar ao subir para produção
		    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		     	log.warn('dataInicioFerias: ' + dataInicioFerias); //TODO: retirar ao subir para produção
		     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		     	log.warn('dataFimFerias: ' + dataFimFerias); //TODO: retirar ao subir para produção
		     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		        
		        //CancelVacation(dataInicioFerias, dataFimFerias);
		    	RegisterVacation(dataInicioFerias, dataFimFerias, quantidadeDias);
		    	
		    	try
		    	{
		    		CalculateVacations(dataInicioFerias, dataFimFerias);
		    		ReceiptVacation(dataInicioFerias);
		    		
		    		log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
			     	log.warn('Setando integração completa'); //TODO: retirar ao subir para produção
			     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
			    	hAPI.setCardValue("cpFeriasIntegradaRM___" + index, '1');
		    	}
		    	catch(erro)
		    	{
		    		hAPI.setCardValue("cpFeriasIntegradaRM___" + index, '0');
		    		CancelVacation(dataInicioFerias, dataFimFerias);
		    		throw 'ERRO: ' + erro.message;
		    	}
		        break;
	        }
	    }
	}
	catch(erro)
	{
		throw 'OCORREU UM ERRO NA INTEGRAÇÃO DE FERIAS COM O RM :( GOD DAMMIT. ERRO: ' + erro.message;
	}
}
