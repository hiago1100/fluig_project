function valida_aprovador(){
	
	    var WKNumProces = getValue("WKNumProces");
	    var WKUser = getValue("WKUser");

	    var cod_gestorAux = hAPI.getCardValue('cont_aprovador').split(",");
	    var cont = parseInt(hAPI.getCardValue('cont'));    
	    

	    if (cod_gestorAux.lenght < cont) {
	      try {
	        hAPI.setCardValue('recebeCod', cod_gestorAux[cont]);
	        hAPI.setCardValue('cont',cont + 1);

	        hAPI.setTaskComments(WKUser, WKNumProces,  0, "Encaminhando para a aprovação do Gestor ");

	      } catch(error) { 
	        hAPI.setCardValue('recebeCod', cod_gestorAux[cont]);
	        hAPI.setCardValue('cont',cont + 1);

	        hAPI.setTaskComments(WKUser, WKNumProces,  0, "Encaminhando para a aprovação do Gestor ");
	      }
	    } 
	
	
}