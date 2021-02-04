function ExisteDiretor(){
	var cpDiretor = hAPI.getCardValue("cpDiretor"); 
	
	if(cpDiretor == ""){ // Verifica se h? diretor
		return 2;
	}else{
		return 1;
	}
}