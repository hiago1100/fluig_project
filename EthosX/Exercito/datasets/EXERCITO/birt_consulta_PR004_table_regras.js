function createDataset(fields, constraints, sortFields) {

	try{
		var table_name = 0;
		var metadata_id = 0;
		var metadata_version = 0;
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "TABLENAME") {
					table_name = constraints[c].initialValue;
				}
				if (constraints[c].fieldName.toUpperCase() == "METADATA#ID") {
					metadata_id = constraints[c].initialValue;
				
}				if (constraints[c].fieldName.toUpperCase() == "METADATA#VERSION") {
					metadata_version = constraints[c].initialValue;
				}
			}
		}
		
		var datasetReturn = DatasetBuilder.newDataset();
		
		var c1 = DatasetFactory.createConstraint("tablename", table_name, table_name, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", metadata_id, metadata_id, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", metadata_version, metadata_version, ConstraintType.MUST);
		var constraints = new Array(c1,c2,c3);
		var dataset = DatasetFactory.getDataset("PR004", null, constraints, null);

		datasetReturn.addColumn("cd_regra");
		datasetReturn.addColumn("nm_regra");
		datasetReturn.addColumn("descricao_regra");
		datasetReturn.addColumn("status_regra");
		datasetReturn.addColumn("observacao");
		datasetReturn.addColumn("como_verificar");

		var conformidade= "";
				
		for(var x=0;x<dataset.rowsCount;x++){

			if (dataset.getValue(x, "status_regra") == "nao_conforme") {
				conformidade = "Não conforme"
			}else{
				conformidade = "Conforme"
			}	
			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_regra"),
										   dataset.getValue(x, "nm_regra"),
										   dataset.getValue(x, "descricao_regra"),
										   conformidade,
										   dataset.getValue(x, "observacao"),
										   dataset.getValue(x, "como_verificar")
										   ));
		}


		
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}