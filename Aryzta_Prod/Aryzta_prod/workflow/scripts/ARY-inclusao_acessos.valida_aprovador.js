function valida_aprovador(){

	var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
	var cont = parseInt(hAPI.getCardValue('cont'));    
	var codGest =  cod_gestorAux.split(",");   

	log.info("***** VERIFICA Contador : " +  cont);
	log.info("***** VERIFICA  hapi cont : " +  hAPI.getCardValue('cont'));
	log.info("***** VERIFICA  hapi Array : " +  codGest[cont]);
	log.info("***** VERIFICA  hapi tamanho Array : " +  codGest.length);

	log.info("######## antes de entrar no if");
	
	if (codGest.length < cont) {
		log.info("######## PASSOU NO FALSE");		

		return false;
	} else {
		log.info("######## PASSOU NO TRUE");		
		
		return true ;
	}

}