function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  var codTipoDoctoIni, codTipoDoctoFim;
  var companyidIni, companyidFim;

  if (constraints != null) {
    for (var i = 0; i < constraints.length; i++) {

      if (constraints[i].fieldName == "codTipoDocto") {
        codTipoDoctoIni = constraints[i].initialValue;
        codTipoDoctoFim = constraints[i].finalValue;
      }

      if (constraints[i].fieldName == "companyid") {
        companyidIni = constraints[i].initialValue;
        companyidFim = constraints[i].finalValue;
      }
    }
  }

  if (codTipoDoctoIni == 0 || codTipoDoctoIni == null) {

    codTipoDoctoIni = 1;
    codTipoDoctoFim = 999;
    companyidIni = 1;
    companyidFim = 999;

  }

  log.info('>>>> codTipoDoctoIni: ' + codTipoDoctoIni);
  log.info('>>>> codTipoDoctoFim: ' + codTipoDoctoFim);
  log.info('>>>> companyidIni: ' + companyidIni);
  log.info('>>>> companyidFim: ' + companyidFim);

  dsTipo = DatasetBuilder.newDataset();
  dsTipo.addColumn("prioridade");
  dsTipo.addColumn("tipo");
  dsTipo.addColumn("quantidade");
  dsTipo.addColumn("comLimite");

  var ctTipo = DatasetFactory.createConstraint("codTipoDocto", codTipoDoctoIni, codTipoDoctoFim, ConstraintType.SHOULD);
  var ctCompany = DatasetFactory.createConstraint("companyid", companyidIni, companyidFim, ConstraintType.SHOULD);

  var datasetPrincipal = DatasetFactory.getDataset("adf_tipo_aprovacao_documento",
    null,
    new Array(ctTipo, ctCompany),
    null);

  log.info('datasetPrincipal.rowsCount: ' + datasetPrincipal.rowsCount);

  for (var i = 0; i < datasetPrincipal.rowsCount; i++) {

    var documentId = datasetPrincipal.getValue(i, "metadata#id");
    var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c1 = DatasetFactory.createConstraint("tablename", "tipos", "tipos", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
    var constraintsFilhos = new Array(c1, c2, c3);

    //Busca o dataset
    var datasetFilhos = DatasetFactory.getDataset("adf_tipo_aprovacao_documento", null, constraintsFilhos, null);

    for (var j = 0; j < datasetFilhos.rowsCount; j++) {
      //Adiciona os valores nas colunas respectivamente.
      dsTipo.addRow(new Array(
        datasetFilhos.getValue(j, "tipoPrioridade"),
        datasetFilhos.getValue(j, "tipoCodTipoAprovacao"),
        datasetFilhos.getValue(j, "tipoQtdMinima"),
        datasetFilhos.getValue(j, "tipoSomenteComLimite")
      ));
    }

  }

  return dsTipo;

}

function onMobileSync(user) {

}
