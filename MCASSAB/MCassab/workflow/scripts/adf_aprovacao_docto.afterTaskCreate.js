function afterTaskCreate(colleagueId) {

    var atividade = getValue('WKCurrentState');

    var Params = parametros();

    if (atividade == Params.atividades.aprovacaoDocumento) {
        calculaPrazo(colleagueId);
    }
}