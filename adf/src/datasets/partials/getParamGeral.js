function getParamGeral() {
  const constraintsParam = new Array(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));

  const dsParam = DatasetFactory.getDataset('adf_param_geral', null, constraintsParam, null);
  const Param = {};
  const campos = ['usuarioErp', 'senhaErp', 'empresaFluig', 'usuarioFluig', 'senhaFluig', 'emailNotifica', 'emailNotificaErros'];

  if (dsParam.rowsCount > 0) {
    campos.forEach((campo) => {
      Param[campo] = String(dsParam.getValue(0, campo));
    });
  }

  return Param;
}
