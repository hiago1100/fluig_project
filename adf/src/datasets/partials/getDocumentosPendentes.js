function getDocumentosPendentes(campos) {
  const c1 = DatasetFactory.createConstraint('integrado', 'false', 'false', ConstraintType.MUST);
  const c2 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
  const c3 = DatasetFactory.createConstraint('status', 'P', 'P', ConstraintType.MUST_NOT);
  // const c4 = DatasetFactory.createConstraint('codProcesso', '', '', ConstraintType.MUST_NOT);

  const dsDocumentos = DatasetFactory.getDataset('adf_aprovacao_docto', null, [c1, c2, c3], null);
  const Documentos = [];

  if (dsDocumentos.rowsCount > 0) {
    for (let i = 0; i < dsDocumentos.rowsCount; i++) {
      let documento = {};
      campos.forEach(campo => {
        documento[campo] = String(dsDocumentos.getValue(i, campo)) === 'null' ? null : String(dsDocumentos.getValue(i, campo));
      });
      Documentos.push(documento);
    }
  }

  return Documentos;
}
