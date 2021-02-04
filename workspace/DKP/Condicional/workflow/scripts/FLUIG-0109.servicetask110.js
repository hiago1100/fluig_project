function servicetask110(attempt, message) 
{
	
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	log.warn('servicetask110');
	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
		
	var indexes = getIndexes('cpDataInicioFerias'); // quantidade pai x filho
	var iterator = indexes.iterator();

    while(iterator.hasNext())
    {
    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    	log.warn('iterator.hasNext()');
    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    	
        var index = iterator.next();
        
        
        if(hAPI.getCardValue("cpFeriasIntegradaRM___"+index) == '1')
        {
	        var dataInicioFerias = hAPI.getCardValue("cpDataInicioFerias___"+index);
	        var dataFimFerias = hAPI.getCardValue("cpDataFimFerias___"+index);
	        
	        log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	    	log.warn('index: ' +index);
	    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	     	log.warn('dataInicioFerias: ' + dataInicioFerias);
	     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	     	log.warn('dataFimFerias: ' + dataFimFerias);
	     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	        
	     	CancelVacation(dataInicioFerias,dataFimFerias);
	    	
	    	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	     	log.warn('Setando integração incompleta');
	     	log.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
	    	hAPI.setCardValue("cpFeriasIntegradaRM___" + index, '0');
	    	
	        break;
        }
    }
}