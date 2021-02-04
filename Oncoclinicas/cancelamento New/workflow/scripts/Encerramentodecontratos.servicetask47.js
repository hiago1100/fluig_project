function servicetask47(attempt, message) {
	var contrato = hAPI.getCardValue("numeroContratoAux");
	var filial = hAPI.getCardValue("codFilial");
	var c1 = DatasetFactory.createConstraint('CONTRATO', contrato, contrato, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('FILIAL', filial, filial, ConstraintType.MUST);
    // Chamada dataSet
    var retorno = DatasetFactory.getDataset('ds_encerramentoContratoWS', null, [c1,c2], null);

    if (retorno.getValue(0, 'SUCESSO') == 'false') {
        throw retorno.getValue(0, 'MENSAGEM');
    }
}