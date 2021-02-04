function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
		
		var WKNumState = getValue("WKNumSTATE");

	
	 var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
	 var cont = parseInt(hAPI.getCardValue('cont'));    
	 var codGest =  cod_gestorAux.split(",");     
	 var force = hAPI.getCardValue('gestorHide___1');


	 //log.info("***" + codGest[0]);
	 
	  if(nextSequenceId == 5 ){  
		  

	      try {
	          hAPI.setCardValue('recebeCod', force );
	          hAPI.setCardValue('cont','1');
	          
	    	 

	      } catch(error) { 
	        log.info("##### ERRO" + error)

	      }
	    }
	  
	  
	  if(nextSequenceId == 21 ){  
		  
			log.info("***** BEFORE Contador : " +  cont);
			log.info("***** BEFORE  hapi cont : " +  hAPI.getCardValue('cont'));
			log.info("***** BEFORE  hapi tamanho Array : " +  codGest.length);
		  
		  
	      try {

	        hAPI.setCardValue('recebeCod', codGest[cont]);   
	        hAPI.setCardValue('cont', cont + 1);
	       
	      } catch(error) { 
	        log.info("##### ERRO" + error)

	      }
	    }
	  
	    
	}
	
