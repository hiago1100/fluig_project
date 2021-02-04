function createDataset(fields, constraints, sortFields) {

	try{
		var table_name = "table_regras";
		var metadata_id = 2378;
		var metadata_version = 3000;
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
		var dataset = DatasetFactory.getDataset("geral_cadastro_etapa", null, constraints, null);

		datasetReturn.addColumn("cd_regra");
		datasetReturn.addColumn("nome_regra");
		datasetReturn.addColumn("estagio_verificacao");
		datasetReturn.addColumn("conformidade");

				
		for(var x=0;x<dataset.rowsCount;x++){


			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_regra"),
										   dataset.getValue(x, "nome_regra"),
                                           dataset.getValue(x, "estagio_verificacao"),
                                           dataset.getValue(x, "conformidade")										
										   ));			
			}
				
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}
