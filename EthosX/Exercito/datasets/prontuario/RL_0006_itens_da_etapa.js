function createDataset(fields, constraints, sortFields) {

	try{
		var table_name = "table_item_etapa";
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

		datasetReturn.addColumn("cd_item");
		datasetReturn.addColumn("nm_item");
		datasetReturn.addColumn("descricao_item");
		datasetReturn.addColumn("zoom_om_item");
		datasetReturn.addColumn("local_recebidor_item");
		datasetReturn.addColumn("valor_total_item");
				
		for(var x=0;x<dataset.rowsCount;x++){

			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_item"),
										   dataset.getValue(x, "nm_item"),
										   dataset.getValue(x, "descricao_item"),
										   dataset.getValue(x, "zoom_om_item"),
										   dataset.getValue(x, "local_recebidor_item"),
										   dataset.getValue(x, "valor_total_item")
										   ));			
			}
				
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}