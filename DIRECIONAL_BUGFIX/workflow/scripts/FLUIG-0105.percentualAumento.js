function percentualAumento(){
	
	if(parseInt(hAPI.getCardValue("cpPercentualAumento")) > 25){
		return 1;
	}else{
		return 2;
	}

}