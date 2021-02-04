function displayFields(form, customHTML) {

//	var c1 = DatasetFactory.createConstraint("metadata#active",   "true", "true",  ConstraintType.MUST);
//	var c2 = DatasetFactory.createConstraint("status",   "ativa", "ativa",  ConstraintType.MUST);
//	var filtros = new Array(c1, c2);
//	var campos = new Array("codigo", "filial", "filial_protheus");
//	var sort = new Array("filial");
//
//	var dataset = DatasetFactory.getDataset("filiais", campos, filtros, sort);
//	log.info("testDataSet" + dataset.rowsCount);
	
	if(form.getValue("filialRadioterapia") == "nao")
		ocultarCampo(customHTML, "id_radio");

}