function diretorOrigemAprova(){
    
    var gerenteGeralOrigem = hAPI.getCardValue("cpGerenteGeralOrigem"),
        superintendenteOrigem = hAPI.getCardValue("cpSuperintendenteOrigem"),
        diretorOrigem = hAPI.getCardValue("cpDiretorOrigem"),
        diretorDestino = hAPI.getCardValue("cpDiretorDestino"),
        solicitante = hAPI.getCardValue("cpMatriculaSolicitante"),
        tipoMaoObra = hAPI.getCardValue("cpTipoMaoObra"),
        percentualAumento = hAPI.getCardValue("cpPercentualAumento"),
        transferenciaKm = hAPI.getCardValue('cpTransferenciaKm');
    
    var mesmoDiretor = diretorOrigem == diretorDestino,
        diretorOrigemSolicitante = solicitante == diretorOrigem,
        isEncarregado = tipoMaoObra == 2,
        isAdministrativo = tipoMaoObra == 3,
        isEstrategico = tipoMaoObra == 4,
        semGG = gerenteGeralOrigem == "",
        semSup = superintendenteOrigem == "",
        faltouAprovador = semGG && semSup,
        aumentoMaiorQue25 = parseInt(percentualAumento) > 25,
        transferencia300km = transferenciaKm == 1;
    
    if (mesmoDiretor || diretorOrigemSolicitante) return false;

    if (isEstrategico || ((isEncarregado || isAdministrativo) && (aumentoMaiorQue25 || transferencia300km || faltouAprovador))) return true;
    
    return false;
}