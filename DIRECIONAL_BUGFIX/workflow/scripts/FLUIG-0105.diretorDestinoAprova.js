function diretorDestinoAprova() {
    
    var tipoMaoObra = hAPI.getCardValue("cpTipoMaoObra"),
        percentualAumento = hAPI.getCardValue("cpPercentualAumento"),
        transferenciaKm = hAPI.getCardValue('cpTransferenciaKm'),
        gerenteGeralDestino = hAPI.getCardValue('cpGerenteGeralDestino'),
        superintendenteDestino = hAPI.getCardValue('cpSuperintendenteDestino'),
        solicitante = hAPI.getCardValue("cpMatriculaSolicitante"),
        diretorDestino = hAPI.getCardValue("cpDiretorDestino");
    
    var isEstrategico = tipoMaoObra == 4,
        isEncarregado = tipoMaoObra == 2,
        isAdministrativo = tipoMaoObra == 3,
        aumentoMaiorQue25 = parseInt(percentualAumento) > 25,
        transferencia300km = transferenciaKm == 1,
        semGG = gerenteGeralDestino == '',
        semSup = superintendenteDestino == '',
        faltouAprovador = semGG || semSup;
    
    if (solicitante == diretorDestino) return false;
        
    if (isEstrategico) return true;
    
    if ((isEncarregado || isAdministrativo) && aumentoMaiorQue25) return true;
    
    if ((isEncarregado || isAdministrativo) && transferencia300km) return true;
    
    if ((isEncarregado || isAdministrativo) && faltouAprovador) return true;
    
    return false;
}