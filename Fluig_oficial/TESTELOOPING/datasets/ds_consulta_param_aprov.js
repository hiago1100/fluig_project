function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

//	log.info("*** Iniciando consulta de agendas");

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("cod_papel");
	dataset.addColumn("desc_papel");

	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);

	var datasetPrincipal = DatasetFactory.getDataset('ds_parametros_aprovacao', null, [c1], null);    
	if(datasetPrincipal){
		if(datasetPrincipal.rowsCount > 0){
			for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
				var documentId = datasetPrincipal.getValue(i, "metadata#id");
				var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

				var c1 = DatasetFactory.createConstraint("tablename", "tabela_aprovadores" ,"tabela_aprovadores", ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

				var datasetFilhos = DatasetFactory.getDataset('ds_parametros_aprovacao', null, [c1, c2, c3], null);                

				if(datasetFilhos){
					if(datasetFilhos.rowsCount > 0){
						for (var j = 0; j < datasetFilhos.rowsCount; j++) {
							dataset.addRow([datasetFilhos.getValue(j, "cod_papel"),
							                datasetFilhos.getValue(j, "desc_papel")
							                ]);
						}
					}                	
				}                
			}
		}
	}
	return dataset;
}
function onMobileSync(user) {

}
function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}