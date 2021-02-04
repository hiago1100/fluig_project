function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  var codUsuario, companyid, lotacao;

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {

      log.info(' constraints... ' + constraints[i].fieldName + ' - ' + constraints[i].initialValue);

      if (constraints[i].fieldName == "codUsuario")
        codUsuario = constraints[i].initialValue;

      if (constraints[i].fieldName == "companyid")
        companyid = constraints[i].initialValue;

      if (constraints[i].fieldName == "codLotacao")
        lotacao = constraints[i].initialValue;
    }
  }

  log.info('*** companyid = ' + companyid);
  log.info('*** codUsuario = ' + codUsuario);
  log.info('*** lotacao = ' + lotacao);

  if (codUsuario == "" || codUsuario == null) {

    codUsuario = "ecm";
    companyid = 1;
    lotacao = "1000";

  }

  dsLotacoes = DatasetBuilder.newDataset();
  dsLotacoes.addColumn("lotacao");
  dsLotacoes.addColumn("dataIni");
  dsLotacoes.addColumn("dataFim");

  dsError = DatasetBuilder.newDataset();
  dsError.addColumn("mensagem");

  log.info('*** companyid = ' + companyid);
  log.info('*** codUsuario = ' + codUsuario);
  log.info('*** lotacao = ' + lotacao);

  var ctCompany = DatasetFactory.createConstraint("companyid", companyid, companyid, ConstraintType.SHOULD);
  var ctCodUsuario = DatasetFactory.createConstraint("codUsuario", codUsuario, codUsuario, ConstraintType.SHOULD);

  var datasetPrincipal = DatasetFactory.getDataset("adf_lotacoes_usuario",
    null,
    new Array(ctCompany, ctCodUsuario),
    null);

  log.info('*** datasetPrincipal.rowsCount = ' + datasetPrincipal.rowsCount);

  for (var i = 0; i < datasetPrincipal.rowsCount; i++) {

    var documentId = datasetPrincipal.getValue(i, "metadata#id");
    var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

    log.info('*** documentId = ' + documentId);
    log.info('*** documentVersion = ' + documentVersion);

    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c1 = DatasetFactory.createConstraint("tablename", "lotacoes", "lotacoes", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

    var data = new Date();
    var ctTipo = DatasetFactory.createConstraint("lotacaoCodigo", lotacao, lotacao, ConstraintType.SHOULD);
    var ctDataIni = DatasetFactory.createConstraint("lotacaoDataInicial", data, data, ConstraintType.SHOULD);
    var ctDataFim = DatasetFactory.createConstraint("lotacaoDataFinal", data, data, ConstraintType.SHOULD);

    var constraintsFilhos = new Array(c1, c2, c3);

    //Busca o dataset
    var datasetFilhos = DatasetFactory.getDataset("adf_lotacoes_usuario", null, constraintsFilhos, null);

    //return datasetFilhos;

    log.info('*** datasetFilhos.rowsCount = ' + datasetFilhos.rowsCount);

    for (var j = 0; j < datasetFilhos.rowsCount; j++) {
      //Adiciona os valores nas colunas respectivamente.
      dsLotacoes.addRow(new Array(
        datasetFilhos.getValue(j, "lotacaoCodigo"),
        datasetFilhos.getValue(j, "lotacaoDataInicial"),
        datasetFilhos.getValue(j, "lotacaoDataFinal")
      ));
    }

  }

  return dsLotacoes;

}

function onMobileSync(user) {

}
