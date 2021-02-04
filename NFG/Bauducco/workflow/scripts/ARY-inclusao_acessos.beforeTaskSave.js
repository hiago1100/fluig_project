function beforeTaskSave(colleagueId,nextSequenceId,userList){ 
	
	var WKNumState = getValue("WKNumSTATE");

	
 var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
 var cont = parseInt(hAPI.getCardValue('cont'));    
 var codGest =  cod_gestorAux.split(",");     


 log.info("***CODGEST " + codGest[0]);
 
  if(nextSequenceId == 32 ){  
	  

      try {
    	    hAPI.setCardValue('recebeCod', codGest[0]);
    	    hAPI.setCardValue('cont', cont + 1);
      } catch(error) { 
        log.info("##### ERRO" + error)

      }
    }
  
  
  if(nextSequenceId == 43 ){  
	  
		log.info("***** BEFORE Contador : " +  cont);
		log.info("***** BEFORE  hapi cont : " +  hAPI.getCardValue('cont'));
		log.info("***** BEFORE  hapi Array : " +  codGest[cont]);
		log.info("***** BEFORE  hapi tamanho Array : " +  codGest.length);
	  
	  
      try {

        hAPI.setCardValue('recebeCod', codGest[cont]);   
        hAPI.setCardValue('cont', cont + 1);
       
      } catch(error) { 
        log.info("##### ERRO" + error)

      }
    }
  
    
}