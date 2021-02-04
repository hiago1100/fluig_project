function tipoMaterial(){
		
	var grupo = hAPI.getCardValue("grupoAnaliseComprador");
	
	if (grupo == "Pool:Group:CM")
		return "matmed";
	else
		return "diversos";
	
}