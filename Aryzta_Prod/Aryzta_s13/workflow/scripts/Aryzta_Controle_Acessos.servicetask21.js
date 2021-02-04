function servicetask21(attempt, message) {

	var cod_gestorAux = hAPI.getCardValue('cont_aprovador');
	var cont = parseInt(hAPI.getCardValue('cont'));    
	var codGest =  cod_gestorAux.split(",");  

	log.info("***** SERVICE Contador : " +  cont);
	log.info("***** SERVICE hapi cont : " +  hAPI.getCardValue('cont'));
	log.info("***** SERVICE hapi Array : " +  codGest[cont]);
	log.info("***** SERVICE hapi tamanho Array : " +  codGest.length);

	try {
		if (codGest.length < cont) {
			hAPI.setCardValue('recebeCod', codGest[cont]);
	
		}     
	} catch(error) { 
		log.info("ERRO looping : " + error);
	}

}