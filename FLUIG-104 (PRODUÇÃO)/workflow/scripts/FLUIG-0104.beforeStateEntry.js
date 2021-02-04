function beforeStateEntry(sequenceId){
    
    var atividade = getValue("WKCurrentState");
    
    if (atividade == 56 || atividade == 93) {
        
        var solicitante = hAPI.getCardValue('cpSolicitante'),
            gestor = hAPI.getCardValue('cpGestor'),
            gerenteGeral = hAPI.getCardValue('cpGerenteGeral'),
            superintendente = hAPI.getCardValue('cpSuperintendente'),
            diretor = hAPI.getCardValue('cpDiretor');
        
        if (solicitante != gestor && solicitante != gerenteGeral && solicitante && superintendente && solicitante != diretor) {
            hAPI.setCardValue('cpRespAprovCandidatos', gestor);
        } else {
            hAPI.setCardValue('cpRespAprovCandidatos', solicitante);
        }
        
    }
}