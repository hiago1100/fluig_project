function VerificarKitAdm(){
	
	var cpConferenciaKitAdmissional= hAPI.getCardValue("cpConferenciaKitAdmissional"); 
	
	if(cpConferenciaKitAdmissional == "1"){
		return 1;
	}else if(cpConferenciaKitAdmissional == "2")
		return 2;
}