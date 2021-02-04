function getParamGeral() {
  var constraintsParam = new Array(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));

  var dsParam = DatasetFactory.getDataset('adf_param_geral', null, constraintsParam, null);
  var Param = {};
  var campos = ['usuarioErp', 'senhaErp', 'empresaFluig', 'usuarioFluig', 'senhaFluig', 'emailNotifica', 'emailNotificaErros'];

  if (dsParam.rowsCount > 0) {
    campos.forEach(function (campo) {
      Param[campo] = String(dsParam.getValue(0, campo));
    });
  }

  return Param;
}
