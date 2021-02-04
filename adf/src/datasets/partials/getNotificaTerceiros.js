function getNotificaTerceiros(codTipoDocto) {

  const c1 = DatasetFactory.createConstraint('codTipoDocto', codTipoDocto, codTipoDocto, ConstraintType.MUST);
  const dsNotificaTerceiro = DatasetFactory.getDataset('adf_notifica_terceiros', null, [c1], null);

  const Terceiros = [];

  if (dsNotificaTerceiro.rowsCount > 0) {
    const documentId = dsNotificaTerceiro.getValue(0, 'metadata#id');
    const documentVersion = dsNotificaTerceiro.getValue(0, 'metadata#version');

    const c1 = DatasetFactory.createConstraint('tablename', 'notificados', 'notificados', ConstraintType.MUST);
    const c2 = DatasetFactory.createConstraint('metadata#id', documentId, documentId, ConstraintType.MUST);
    const c3 = DatasetFactory.createConstraint('metadata#version', documentVersion, documentVersion, ConstraintType.MUST);
    const constraintsFilhos = new Array(c1, c2, c3);

    const dsTerceiros = DatasetFactory.getDataset('adf_notifica_terceiros', null, constraintsFilhos, null);

    const campos = ['nome', 'area', 'email'];

    for (var i = 0; i < dsTerceiros.rowsCount; i++) {
      var terceiro = {};
      campos.forEach((campo) => {
        terceiro[campo] = dsTerceiros.getValue(i, campo);
      });

      Terceiros.push(terceiro);
    }
  }

  return Terceiros;
}
