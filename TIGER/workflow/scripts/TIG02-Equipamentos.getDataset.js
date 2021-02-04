function getDataset(name, campos, filtros) {

  var constraints = new Array(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));

  if (filtros) {
    filtros.forEach(function (filtro) {
      constraints.push(DatasetFactory.createConstraint(filtro.field, filtro.value, filtro.value, filtro.type || ConstraintType.MUST));
    });
  }

  var dataset = DatasetFactory.getDataset(name, null, constraints, null);
  var result = [];

  if (dataset.rowsCount > 0) {
    for (var i = 0; i < dataset.rowsCount; i++) {
      var o = {};

      if (!campos) {
        campos = dataset.getColumnsName();
      }

      campos.forEach(function (campo) {
        o[campo] = dataset.getValue(i, campo);
      });

      result.push(o);
    }
  }

  return result;
}
