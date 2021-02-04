function defineStructure() {
  addColumn("CODPROCESSO");
  addColumn("STATUS");
  addColumn("DATAREF", DatasetFieldType.DATE);
  addColumn("DATAREF2", DatasetFieldType.NUMBER);
  addColumn("DOCUMENTID");
  addColumn("APROVADOR1");
  addColumn("DATAAPROV1");
  addColumn("APROVADOR2");
  addColumn("DATAAPROV2");
  setKey(["CODPROCESSO"]);
  addIndex(["CODPROCESSO"]);
  addIndex(["DATAREF"]);
  addIndex(["DATAREF2"]);
  addIndex(["STATUS"]);

}

function onSync(lastSyncDate) {

  log.info('<<< INICIO CONSULTA');

  log.info('<<< LASTSYNCDATE: ' + lastSyncDate);

  log.info('<<< HORA INICIAL: ' + new Date()
    .toTimeString());

  var dataset = DatasetBuilder.newDataset();

  /* lastSyncDate == 0 || lastSyncDate == undefined */
  if (1 == 2) {

    var datasetAdf_aprovacao_docto = DatasetFactory.getDataset(
      'adf_aprovacao_docto', null, null, null);

    for (var i = 0; i < datasetAdf_aprovacao_docto.rowsCount; i++) {

      var codProcesso = datasetAdf_aprovacao_docto.getValue(i,
        "codProcesso");
      var dataRef = datasetAdf_aprovacao_docto.getValue(i, "dataRef");
      var status = datasetAdf_aprovacao_docto.getValue(i, "status");
      var documentid = datasetAdf_aprovacao_docto.getValue(i,
        "metadata#id");

      // Cria as constraints para buscar os campos filhos, passando o
      // tablename, número da formulário e versão
      var c1 = DatasetFactory.createConstraint("tablename",
        "tabelaAprovadores", "tabelaAprovadores",
        ConstraintType.MUST);
      var c2 = DatasetFactory.createConstraint("metadata#id", documentid,
        documentid, ConstraintType.MUST);

      var constraintsFilhos = new Array(c1, c2);

      var aprov1 = null;
      var aprov2 = null;
      var dtAprov1 = null;
      var dtAprov2 = null;

      // Busca o dataset
      var datasetFilhos = DatasetFactory.getDataset(
        "adf_aprovacao_docto", null, constraintsFilhos, null);

      for (var j = 0; j < datasetFilhos.rowsCount; j++) {
        // Adiciona os valores nas colunas respectivamente.

        if (datasetFilhos.getValue(j, "aprovadorStatus") == "A") {

          if (!aprov1) {
            aprov1 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov1 = datasetFilhos.getValue(j, "aprovadorData");
          } else {
            aprov2 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov2 = datasetFilhos.getValue(j, "aprovadorData");
          }

        }

      }

      if (codProcesso != null != dataRef != null && status != null &&
        status != 'C') {
        log.info('*** 1. codProcesso = ' + codProcesso);
        dataset.addOrUpdateRow([
          codProcesso,
          status,
          new java.util.Date(dataRef.substr(5, 2) + '/' +
            dataRef.substr(8, 2) + '/' +
            dataRef.substr(0, 4)),
          Number(dataRef.substr(0, 4) + dataRef.substr(5, 2) +
            dataRef.substr(8, 2)), documentid,
          aprov1 == null ? '' : aprov1,
          dtAprov1 == null ? '' : dtAprov1,
          aprov2 == null ? '' : aprov2,
          dtAprov2 == null ? '' : dtAprov2
        ]);

      }

    }

  } else {

    log.info('<<< iniciando syncRegistrosNovos: ' +
      new Date()
      .toTimeString());
    syncRegistrosNovos(dataset);
    log.info('<<< finalizou syncRegistrosNovos: ' +
      new Date()
      .toTimeString());

    log.info('<<< iniciando syncRegistrosPendentes: ' +
      new Date()
      .toTimeString());
    syncRegistrosPendentes(dataset);
    log.info('<<< finalizou syncRegistrosPendentes: ' +
      new Date()
      .toTimeString());

  }

  log.info('<<< FIM CONSULTA');
  log.info('<<< HORA FINAL: ' + new Date()
    .toTimeString());

  return dataset;

}

function createDataset(fields, constraints, sortFields) {

}

function onMobileSync(user) {

}

function syncRegistrosNovos(dataset) {

  // primeiro sincroniza os registros novos
  log.info('<<< sincronização incremental');

  var datasetAdf_get_status_aprovacao_lote = DatasetFactory.getDataset(
    'adf_get_status_aprovacao_lote', ['CODPROCESSO'], null, ['CODPROCESSO']);

  var lastProcesso;

  if (datasetAdf_get_status_aprovacao_lote == null) {
    lastProcesso = 0;
  } else {

    lastProcesso = datasetAdf_get_status_aprovacao_lote.getValue(
      datasetAdf_get_status_aprovacao_lote.rowsCount - 1,
      'CODPROCESSO');

  }

  log.info('<<< ultimo processo: ' + lastProcesso);

  var ctLimit = DatasetFactory.createConstraint('sqlLimit', '200', '200',
    ConstraintType.MUST);
  var ct = DatasetFactory.createConstraint("codProcesso", lastProcesso,
    999999999, ConstraintType.MUST);

  var datasetAdf_aprovacao_docto = DatasetFactory.getDataset(
    'adf_aprovacao_docto', null, new Array(ct, ctLimit), ['codProcesso']);

  log.info('<<< consultou registros: ' + new Date()
    .toTimeString());

  if (datasetAdf_aprovacao_docto != null) {

    log.info('<<< retornou registros: ' +
      datasetAdf_aprovacao_docto.rowsCount);

    for (var i = 0; i < datasetAdf_aprovacao_docto.rowsCount; i++) {

      var codProcesso = datasetAdf_aprovacao_docto.getValue(i,
        "codProcesso");
      var dataRef = datasetAdf_aprovacao_docto.getValue(i, "dataRef");
      var status = datasetAdf_aprovacao_docto.getValue(i, "status");
      var documentid = datasetAdf_aprovacao_docto.getValue(i,
        "metadata#id");

      // Cria as constraints para buscar os campos filhos, passando o
      // tablename, número da formulário e versão
      var c1 = DatasetFactory.createConstraint("tablename",
        "tabelaAprovadores", "tabelaAprovadores",
        ConstraintType.MUST);
      var c2 = DatasetFactory.createConstraint("metadata#id", documentid,
        documentid, ConstraintType.MUST);

      var constraintsFilhos = new Array(c1, c2);

      var aprov1 = null;
      var aprov2 = null;
      var dtAprov1 = null;
      var dtAprov2 = null;

      // Busca o dataset
      var datasetFilhos = DatasetFactory.getDataset(
        "adf_aprovacao_docto", null, constraintsFilhos, null);

      for (var j = 0; j < datasetFilhos.rowsCount; j++) {
        // Adiciona os valores nas colunas respectivamente.

        if (datasetFilhos.getValue(j, "aprovadorStatus") == "A") {

          if (!aprov1) {
            aprov1 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov1 = datasetFilhos.getValue(j, "aprovadorData");
          } else {
            aprov2 = datasetFilhos.getValue(j, "aprovadorEmail");
            dtAprov2 = datasetFilhos.getValue(j, "aprovadorData");
          }

        }

      }

      if (codProcesso != null != dataRef != null && status != null &&
        status != 'C') {

        log.info('*** 2. codProcesso = ' + codProcesso);

        dataset.addOrUpdateRow([
          codProcesso,
          status,
          new java.util.Date(dataRef.substr(5, 2) + '/' +
            dataRef.substr(8, 2) + '/' +
            dataRef.substr(0, 4)),
          Number(dataRef.substr(0, 4) + dataRef.substr(5, 2) +
            dataRef.substr(8, 2)), documentid,
          aprov1 == null ? '' : aprov1,
          dtAprov1 == null ? '' : dtAprov1,
          aprov2 == null ? '' : aprov2,
          dtAprov2 == null ? '' : dtAprov2
        ]);

      }

    }
  }

  // fim sinc dos registros novos
}

function syncRegistrosPendentes(dataset) {

  // verificando se os registros pendentes já foram aprovados

  var ct = DatasetFactory.createConstraint("STATUS", "P", "P",
    ConstraintType.MUST);
  var datasetAdf_get_status_aprovacao_lote = DatasetFactory.getDataset(
    'adf_get_status_aprovacao_lote', ['CODPROCESSO'], new Array(ct), ['CODPROCESSO']);

  if (datasetAdf_get_status_aprovacao_lote != null) {
    for (var j = 0; j < datasetAdf_get_status_aprovacao_lote.rowsCount; j++) {

      var ct = DatasetFactory.createConstraint("codProcesso",
        datasetAdf_get_status_aprovacao_lote.getValue(j,
          "codProcesso"),
        datasetAdf_get_status_aprovacao_lote.getValue(j,
          "codProcesso"), ConstraintType.MUST);
      var datasetAdf_aprovacao_docto = DatasetFactory.getDataset(
        'adf_aprovacao_docto', null, new Array(ct), null);

      if (datasetAdf_aprovacao_docto != null) {
        for (var i = 0; i < datasetAdf_aprovacao_docto.rowsCount; i++) {

          var codProcesso = datasetAdf_aprovacao_docto.getValue(i,
            "codProcesso");
          var dataRef = datasetAdf_aprovacao_docto.getValue(i,
            "dataRef");
          var status = datasetAdf_aprovacao_docto.getValue(i,
            "status");
          var documentid = datasetAdf_aprovacao_docto.getValue(i,
            "metadata#id");

          // Cria as constraints para buscar os campos filhos,
          // passando o tablename, número da formulário e versão
          var c1 = DatasetFactory.createConstraint("tablename",
            "tabelaAprovadores", "tabelaAprovadores",
            ConstraintType.MUST);
          var c2 = DatasetFactory.createConstraint("metadata#id",
            documentid, documentid, ConstraintType.MUST);

          var constraintsFilhos = new Array(c1, c2);

          var aprov1 = null;
          var aprov2 = null;
          var dtAprov1 = null;
          var dtAprov2 = null;

          // Busca o dataset
          var datasetFilhos = DatasetFactory.getDataset(
            "adf_aprovacao_docto", null, constraintsFilhos,
            null);

          if (datasetFilhos != null) {
            for (var k = 0; k < datasetFilhos.rowsCount; k++) {
              // Adiciona os valores nas colunas respectivamente.

              if (datasetFilhos.getValue(k, "aprovadorStatus") == "A") {

                if (!aprov1) {
                  aprov1 = datasetFilhos.getValue(k,
                    "aprovadorEmail");
                  dtAprov1 = datasetFilhos.getValue(k,
                    "aprovadorData");
                } else {
                  aprov2 = datasetFilhos.getValue(k,
                    "aprovadorEmail");
                  dtAprov2 = datasetFilhos.getValue(k,
                    "aprovadorData");
                }

              }

            }
          }

          if (codProcesso != null != dataRef != null &&
            status != null && status != 'C') {

            log.info('*** 3. codProcesso = ' + codProcesso);

            dataset.addOrUpdateRow([
              codProcesso,
              status,
              new java.util.Date(dataRef.substr(5, 2) + '/' +
                dataRef.substr(8, 2) + '/' +
                dataRef.substr(0, 4)),
              Number(dataRef.substr(0, 4) +
                dataRef.substr(5, 2) +
                dataRef.substr(8, 2)), documentid,
              aprov1 == null ? '' : aprov1,
              dtAprov1 == null ? '' : dtAprov1,
              aprov2 == null ? '' : aprov2,
              dtAprov2 == null ? '' : dtAprov2
            ]);

          }

        }

      }

    }
  }

}
