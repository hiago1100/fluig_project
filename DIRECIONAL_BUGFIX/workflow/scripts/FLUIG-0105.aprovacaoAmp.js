function aprovacaoAmp(){
	
	var aprovarAMP= hAPI.getCardValue("aprovarAMP"); 
	
	if(aprovarAMP == "1"){
		return 1;
	}else if(aprovarAMP == "2")
		return 2;
}