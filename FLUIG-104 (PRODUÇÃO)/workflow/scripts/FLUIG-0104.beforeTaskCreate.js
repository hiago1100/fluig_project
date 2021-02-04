function beforeTaskCreate(colleagueId){
    
    var atividade = getValue("WKCurrentState");
    var carregados = hAPI.getCardValue('candidatosCarregados');
    
    if (atividade == 93 && carregados == 0) {
        
        var quantidade = hAPI.getCardValue("cpQuantidade");
        
        for (var i = 0; i < quantidade; i += 1) {
            var toAdd = new java.util.HashMap();
            toAdd.put("cpTipoCandidato", 0);
            hAPI.addCardChild("candidatos", toAdd);
        }
        
        hAPI.setCardValue("candidatosCarregados", "1");
    }
    

}