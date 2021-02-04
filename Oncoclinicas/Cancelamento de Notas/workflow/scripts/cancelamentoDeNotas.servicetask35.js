function servicetask35(attempt, message) {
    var filial = hAPI.getCardValue("cpCodFiliais");
    var idFluig = getValue("WKNumProces");
    var numeroNF = hAPI.getCardValue("cpNumeroNota");
    var serieNF = hAPI.getCardValue("cpNumeSerie");

    log.info("DADOS " + filial);
    log.info("DADOS " + idFluig);
    log.info("DADOS " + numeroNF);
    log.info("DADOS " + serieNF);

    var c1 = DatasetFactory.createConstraint('FILIAL', filial, filial, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('IDFLUIG', idFluig, idFluig, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('NUMERONF', numeroNF, numeroNF, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('SERIENF', serieNF, serieNF, ConstraintType.MUST);
    // Chamada dataSet
    var retorno = DatasetFactory.getDataset('ds_atualizaHistoricoExtemporaneo', null, [c1, c2, c3, c4], null);

    log.info("Teste 123 " +retorno.getValue(0,'SUCESSO'));

    if (retorno.getValue(0, 'SUCESSO') == 'false') {
        throw retorno.getValue(0, 'MENSAGEM');
    }

}