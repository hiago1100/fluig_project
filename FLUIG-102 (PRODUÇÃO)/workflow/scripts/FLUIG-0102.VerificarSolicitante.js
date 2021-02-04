function VerificarSolicitante(){
	var cpMaoDeObra = hAPI.getCardValue("cpMaoDeObra"); 
		
		if(cpMaoDeObra == "0"){
			return 1;
		}else if(cpMaoDeObra == "1")
			return 2;
}