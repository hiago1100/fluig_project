function beforeTaskSave(colleagueId,nextSequenceId,userList){ 
	
	var WKNumState = getValue('WKNumState');
	var numProcesso = getValue("WKNumProces");
	
	log.info("&&& beforeTaskSave ");
	log.info("%%%% WKNumState : "+ WKNumState);
	log.info("%%%% numProcesso : "+ numProcesso);
  log.info("%%% nextSequenceId : "+ nextSequenceId);

	
 var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
 var cont = parseInt(hAPI.getCardValue('cont'));    
 var codGest =  cod_gestorAux.split(",");     
 

 
 var myClear = []; 
 myClear = hAPI.getCardValue('cont_aprovador');
 myClear = myClear.replace(',,',',');



hAPI.setCardValue('cont_aprovador', myClear);	


 log.info("***CODGEST " + codGest[0]);
 
  if(nextSequenceId == 11 ){  
	  	  
	  
	  log.info("***CODGEST dentro da atividade " + codGest[0]);
      try {
    	    hAPI.setCardValue('recebeCod1', codGest[0]);
    	    hAPI.setCardValue('cont', cont + 1);
      } catch(error) { 
        log.info("##### ERRO" + error);

      }
    }
  
  
  if(nextSequenceId == 34 ){  
	  
	  	log.info("###### BEFORETASKSAVE");
		log.info("***** BEFORE Contador : " +  cont);
		log.info("***** BEFORE  hapi cont : " +  hAPI.getCardValue('cont'));
		log.info("***** BEFORE  hapi Array : " +  codGest[cont]);
		log.info("***** BEFORE  hapi tamanho Array : " +  codGest.length);
	  
		log.info("@@@ BEFORE cod_gestorAux: " + cod_gestorAux);
		log.info("@@@ BEFORE cont: " + cont);
		log.info("@@@ BEFORE codGest: " + codGest[0]);
	  
      try {

        hAPI.setCardValue('recebeCod1', codGest[cont]);   
        hAPI.setCardValue('cont', cont + 1);
        
        log.info("&&& DENTRO DO TRY");
        log.info("&&& hapi recebeCod1 : "+ hAPI.getCardValue('recebeCod1'));
        log.info("&&& hapi cont : " +  hAPI.getCardValue('cont'));
       
      } catch(error) { 
        log.info("##### ERRO" + error)

      }
    }
  
  	if( nextSequenceId == 29){
  		
  	
      if(hAPI.getCardValue('recebeCod1') == 'ERRO'){

          log.info("### setTaskComments");
          hAPI.setTaskComments("admin", numProcesso,  0, "NÃO FOI POSSIVEL ENCONTRAR O GESTOR DO PROGRAMA");
      } 
       
  	}

  if(WKNumState == 29 ){  
    
    log.info("***CODGEST DENTRO da atividade 29 " + codGest[0]);
      try {
          hAPI.setCardValue('recebeCod1', codGest[0]);
          hAPI.setCardValue('cont', cont + 1);
      } catch(error) { 
        log.info("##### ERRO" + error);

      }
    }
  	
  
    
}