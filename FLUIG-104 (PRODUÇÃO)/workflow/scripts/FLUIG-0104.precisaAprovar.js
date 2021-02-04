function precisaAprovar(cargo){
    
    var solicitante = hAPI.getCardValue('cpSolicitante'),
        consultor = hAPI.getCardValue('cpConsultor'),
        gestor = hAPI.getCardValue('cpGestor'),
        gerenteGeral = hAPI.getCardValue('cpGerenteGeral'),
        superintendente = hAPI.getCardValue('cpSuperintendente'),
        diretor = hAPI.getCardValue('cpDiretor'),
        
        tipoMaoObra = hAPI.getCardValue('cpTipoMaoObra'),
        
        solIsGestor = solicitante == gestor,
        solIsGG = solicitante == gerenteGeral,
        solIsSup = solicitante == superintendente,
        solIsDiretor = solicitante == diretor,
        
        gestorIsGG = gestor == gerenteGeral,
        gestorIsSup = gestor == superintendente,
        gestorIsDiretor = gestor == diretor,
        
        ggIsSup = gerenteGeral == superintendente,
        ggIsDiretor = gerenteGeral == diretor,
        
        supIsDiretor = superintendente == diretor,
        
        existeGG = gerenteGeral != "",
        existeSup = superintendente != "";
    
    
    if ( cargo == 'gestor' ) {
        
        if (!solIsGestor && !solIsGG && !solIsSup && !solIsDiretor) {
            return true;
        }
        
    } else if ( cargo == 'gerenteGeral' ) {
        
        if (existeGG && !solIsGG && !solIsSup && !solIsDiretor && !gestorIsGG) {
            return true;
        }
        
    } else if ( cargo == 'superintendente' ) {
        
        if (existeSup && !solIsSup && !solIsDiretor && !gestorIsSup && !ggIsSup && tipoMaoObra != 1) {
            return true;
        }
        
    } else if ( cargo == 'diretor' ) {
        
        if (tipoMaoObra == 4 && !solIsDiretor && !ggIsDiretor && !supIsDiretor) {
            return true;
        }
        
    } else {
        throw "Cargo não identificado!";
    }
        
    
    return false;
}