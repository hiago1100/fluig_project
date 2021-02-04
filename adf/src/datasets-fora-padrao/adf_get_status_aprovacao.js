function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  var nrTrans;

  var ds = DatasetBuilder.newDataset();
  ds.addColumn("status");
  ds.addColumn("aprovadorEmail");
  ds.addColumn("aprovadorStatus");
  ds.addColumn("aprovadorSeq");
  ds.addColumn("aprovadorData");
  ds.addColumn("dataRef");
  ds.addColumn("documentid");

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {

      log.info(constraints[i].fieldName);
      log.info(constraints[i].initialValue);

      if (constraints[i].fieldName == "nrTrans")
        nrTrans = constraints[i].initialValue;
      else
        nrTrans = "6879";
    }
  }

  log.info('NrTrans:' + nrTrans);

  /*var constraintAdf_aprovacao_docto1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);*/
  var ctNrTrans = DatasetFactory.createConstraint("codProcesso", nrTrans, nrTrans, ConstraintType.MUST);
  var active = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
  var datasetAdf_aprovacao_docto = DatasetFactory.getDataset('adf_aprovacao_docto',
    null,
    new Array(ctNrTrans, active),
    null
  );

  log.info('Retornou: ' + datasetAdf_aprovacao_docto.rowsCount);

  for (var i = 0; i < datasetAdf_aprovacao_docto.rowsCount; i++) {

    var documentId = datasetAdf_aprovacao_docto.getValue(i, "metadata#id");
    var documentVersion = datasetAdf_aprovacao_docto.getValue(i, "metadata#version");

    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c1 = DatasetFactory.createConstraint("tablename", "tabelaAprovadores", "tabelaAprovadores", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
    var constraintsFilhos = new Array(c1, c2, c3);

    //Busca o dataset
    var datasetFilhos = DatasetFactory.getDataset("adf_aprovacao_docto", null, constraintsFilhos, null);

    //return datasetFilhos;

    log.info('Retornou filhos: ' + datasetFilhos.rowsCount);
    for (var j = 0; j < datasetFilhos.rowsCount; j++) {
      //Adiciona os valores nas colunas respectivamente.

      ds.addRow(new Array(
        datasetAdf_aprovacao_docto.getValue(i, "status"),
        datasetFilhos.getValue(j, "aprovadorEmail"),
        datasetFilhos.getValue(j, "aprovadorStatus"),
        datasetFilhos.getValue(j, "aprovadorSeq"),
        datasetFilhos.getValue(j, "aprovadorData"),
        datasetAdf_aprovacao_docto.getValue(i, "dataRef"),
        datasetAdf_aprovacao_docto.getValue(i, "documentid")
      ));
    }

  }

  log.info('Retornou Fim:: ' + ds.rowsCount);
  return ds;

}

function onMobileSync(user) {

}
