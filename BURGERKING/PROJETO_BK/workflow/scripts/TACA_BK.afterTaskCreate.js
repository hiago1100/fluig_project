function afterTaskCreate(colleagueId){
	
    var processo = getValue("WKNumProces");
    hAPI.setCardValue("cpNumSolicitacao", processo);
}