function getTabelaAprovadores(docto) {
    const c1 = DatasetFactory.createConstraint('nrTrans', docto.codProcesso, docto.codProcesso, ConstraintType.MUST);
      
    const tbAprovadores = DatasetFactory.getDataset('adf_get_status_aprovacao', null, [c1], null);
  
    return tbAprovadores;
}