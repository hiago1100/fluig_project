function Paralelas(){
	
	var obra = hAPI.getCardValue("ValchkObra");
	var cpAprovarControle = hAPI.getCardValue("cpAprovarControle");
	var cpAprovarPLanejamento = hAPI.getCardValue("cpAprovarPLanejamento");
	var cpAprovarTes = hAPI.getCardValue("cpAprovarTes");
	var cpAprovarTI = hAPI.getCardValue("cpAprovarTI");
	var cpAprovarBen = hAPI.getCardValue("cpAprovarBen");
	var retorno;
	
	if(cpAprovarControle=="2" || cpAprovarPLanejamento=="2" || cpAprovarTes=="2" || 
			cpAprovarTI=="2" || cpAprovarBen=="2"){
		retorno=2;
	}else{
		if(obra=="1"){
			retorno=1;
		}if(obra!="1"){
			retorno=3;
		}
	}
	return retorno;
	
}