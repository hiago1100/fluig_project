function createDataset(fields, constraints, sortFields) {

	try{
		var nr_ficha = 3510;
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "NR_FICHA") {
					nr_ficha = constraints[c].initialValue;
				}
			}
		}
		
		var datasetReturn = DatasetBuilder.newDataset();
		
		var c1 = DatasetFactory.createConstraint("documentid", nr_ficha, nr_ficha, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		var constraints = new Array(c1,c2);
		var dataset = DatasetFactory.getDataset("PR004", null, constraints, null);
		
		datasetReturn.addColumn("metadata_id");
		datasetReturn.addColumn("metadata_version");
		datasetReturn.addColumn("dt_solicitacao");
		datasetReturn.addColumn("zoom_contrato");
		datasetReturn.addColumn("zoom_etapa");
		for(var x=0;x<dataset.rowsCount;x++){
			
			datasetReturn.addRow(new Array(dataset.getValue(x, "metadata#id"),
											dataset.getValue(x, "metadata#version"),
											dataset.getValue(x, "dt_solictacao"),
											dataset.getValue(x, "zoom_contrato"),
											dataset.getValue(x, "zoom_etapa"))
											);
		}
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}