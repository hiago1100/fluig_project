function createDataset(fields, constraints, sortFields) {

  log.info('### Início dataset adf_consulta_doc_pendente');

  const dataset = DatasetBuilder.newDataset();
  dataset.addColumn("documentid");
  dataset.addColumn("nrTrans");
  dataset.addColumn("integrado");
  dataset.addColumn("status");

  const c1 = DatasetFactory.createConstraint('integrado', 'false', 'false', ConstraintType.MUST);
  const c2 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
  const c3 = DatasetFactory.createConstraint('status', 'P', 'P', ConstraintType.MUST_NOT);
  // const c4 = DatasetFactory.createConstraint('codProcesso', '', '', ConstraintType.MUST_NOT);

  const dsDocumentos = DatasetFactory.getDataset('adf_aprovacao_docto', null, [c1, c2, c3], null);
  const Documentos = [];

  if (dsDocumentos.rowsCount > 0) {
    for (let i = 0; i < dsDocumentos.rowsCount; i++) {

      dataset.addRow(new Array(
        dsDocumentos.getValue(i, "documentid"),
        dsDocumentos.getValue(i, "nrTrans"),
        dsDocumentos.getValue(i, "integrado"),
        dsDocumentos.getValue(i, "status")));
    }
  }

  return dataset;
}
