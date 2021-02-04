function servicetask34(attempt, message) {

	var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
	var cont = parseInt(hAPI.getCardValue('cont'));    
	var codGest =  cod_gestorAux.split(",");  

	log.info("##### SERVICETASK34");
	log.info("***** SERVICE Contador : " +  cont);
	log.info("***** SERVICE hapi cont : " +  hAPI.getCardValue('cont'));
	log.info("***** SERVICE hapi Array : " +  codGest[cont]);
	log.info("***** codGest[cont-1]: "+ codGest[cont-1]);
	log.info("***** SERVICE hapi tamanho Array : " +  codGest.length);

	try {
			if (codGest.length < cont) {
				
				//if( codGest[cont-1] == "ERRO"){
				//	 codGest[cont] = '';
				//	 log.info("***** Entrou no if do gestor = ERRO : "+ codGest[cont-1]);
				//}
				
				log.info("$$$$ entrou no TRY");
				hAPI.setCardValue('recebeCod1', codGest[cont]);	
					
				log.info("$$$$ Fim do TRY");
				
			}
			
		} catch(error) { 
		log.info("ERRO looping : " + error);
	}
}