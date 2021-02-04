function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  var dtIni;
  var dtFim;

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {

      log.info(constraints[i].fieldName);
      log.info(constraints[i].initialValue);

      if (constraints[i].fieldName == "DATAREF") {
        dtIni = constraints[i].initialValue;
        dtFim = constraints[i].finalValue;
      }

      if (constraints[i].fieldName == "dataRef") {
        dtIni = constraints[i].initialValue;
        dtFim = constraints[i].finalValue;
      }
    }
  }

  //dtIni = 20180130;
  //dtFim = 20180228;

  var constraintAdf_get_status_aprovacao_lote = DatasetFactory.createConstraint('DATAREF2', dtIni, dtFim, ConstraintType.MUST);

  var adf_get_status_aprovacao_lote = DatasetFactory.getDataset('adf_get_status_aprovacao_lote',
    new Array(),
    new Array(constraintAdf_get_status_aprovacao_lote),
    new Array()
  );

  var ds = DatasetBuilder.newDataset();

  ds.addColumn("status");
  ds.addColumn("aprovadorEmail");
  ds.addColumn("aprovadorStatus");
  ds.addColumn("aprovadorSeq");
  ds.addColumn("aprovadorData");
  ds.addColumn("dataRef");
  ds.addColumn("documentid");
  ds.addColumn("codProcesso");

  if (adf_get_status_aprovacao_lote != null) {

    for (var i = 0; i < adf_get_status_aprovacao_lote.rowsCount; i++) {

      var documentId = adf_get_status_aprovacao_lote.getValue(i, "DOCUMENTID");

      var aprov1 = null;
      var aprov2 = null;
      var dtAprov1 = null;
      var dtAprov2 = null;
      var aprovado1 = null;
      var aprovado2 = null;

      aprov1 = adf_get_status_aprovacao_lote.getValue(i, "APROVADOR1");
      aprov2 = adf_get_status_aprovacao_lote.getValue(i, "APROVADOR2");

      if (aprov1 != "") {
        aprovado1 = "A";
      }

      if (aprov2 != "") {
        aprovado2 = "A";
      }

      if (aprov1 == "" || aprov2 == "") {

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tabelaAprovadores", "tabelaAprovadores", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);

        var constraintsFilhos = new Array(c1, c2);

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("adf_aprovacao_docto", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
          //Adiciona os valores nas colunas respectivamente.

          if (aprov1 == "") {
            aprov1 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov1 = datasetFilhos.getValue(j, "aprovadorData");
            aprovado1 = datasetFilhos.getValue(j, "aprovadorStatus");
          } else if (aprov1 != datasetFilhos.getValue(j, "aprovadorEmail")) {
            aprov2 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov2 = datasetFilhos.getValue(j, "aprovadorData");
            aprovado2 = datasetFilhos.getValue(j, "aprovadorStatus");
          }

        }

      }

      ds.addRow(new Array(
        adf_get_status_aprovacao_lote.getValue(i, "STATUS"),
        aprov1,
        aprovado1,
        1,
        dtAprov1,
        adf_get_status_aprovacao_lote.getValue(i, "DATAREF"),
        adf_get_status_aprovacao_lote.getValue(i, "DOCUMENTID"),
        adf_get_status_aprovacao_lote.getValue(i, "CODPROCESSO")
      ));

      ds.addRow(new Array(
        adf_get_status_aprovacao_lote.getValue(i, "STATUS"),
        aprov2,
        aprovado2,
        2,
        dtAprov2,
        adf_get_status_aprovacao_lote.getValue(i, "DATAREF"),
        adf_get_status_aprovacao_lote.getValue(i, "DOCUMENTID"),
        adf_get_status_aprovacao_lote.getValue(i, "CODPROCESSO")
      ));

    }
  }

  log.info('Retornou Fim:: ' + ds.rowsCount);
  return ds;

}

function onMobileSync(user) {

}
