function createDataset(fields, constraints, sortFields) {
	//Cria as colunas
	var codSolicitacao = fields[0];
    // var codSolicitacao = "14188";

    log.info("SEGUNDO DATASET PAI FILHO CONSTRAINT = " + codSolicitacao);
    
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("cpVagaSalario");
    dataset.addColumn("cpVagaHorario");
    dataset.addColumn("cpTipoPostoTrabalho");
    dataset.addColumn("cpNomePostoTrabalho");
    dataset.addColumn("cpCodNomePostoTrabalho");
    dataset.addColumn("cpVagaQuantidade");

    dataset.addColumn("cpVagaFuncao");
    dataset.addColumn("cpCodVagaFuncao");
    dataset.addColumn("cpAprovacaoRHASalarioAlterado");



    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("cpNumeroSolicitacao", codSolicitacao, codSolicitacao, ConstraintType.MUST));

    var datasetPrincipal = DatasetFactory.getDataset("FLUIG_R0236", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var WKNumProces     = datasetPrincipal.getValue(i, "WKNumProces");
        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "pfVagas" ,"pfVagas", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("FLUIG_R0236", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow([
                datasetFilhos.getValue(j, "cpVagaSalario"),
                datasetFilhos.getValue(j, "cpVagaHorario"),
                datasetFilhos.getValue(j, "cpTipoPostoTrabalho"), 
                datasetFilhos.getValue(j, "cpNomePostoTrabalho"),
                datasetFilhos.getValue(j, "cpCodNomePostoTrabalho"),
                datasetFilhos.getValue(j, "cpVagaQuantidade"),
                datasetFilhos.getValue(j, "cpVagaFuncao"),
                datasetFilhos.getValue(j, "cpCodVagaFuncao"),
                datasetFilhos.getValue(j, "cpAprovacaoRHASalarioAlterado")
            ]);
        }
    }

    return dataset;
}
