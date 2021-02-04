function createDataset(fields, constraints, sortFields) {



	try{
		var table_name = "table_item_etapa";
		var metadata_id = 1321;
		var metadata_version = 7000;
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

		datasetReturn.addColumn("cd_item_componente");
		datasetReturn.addColumn("nm_item_componente");
		datasetReturn.addColumn("local_recebidor_item");
		datasetReturn.addColumn("vl_componente");
		datasetReturn.addColumn("qtd_componente");
		datasetReturn.addColumn("vl_total");
		datasetReturn.addColumn("qtd_nao_conforme");
		datasetReturn.addColumn("status_componente");
		datasetReturn.addColumn("quantidade_retida");
		datasetReturn.addColumn("vl_retido");
		datasetReturn.addColumn("observacao_componente");

        

		for(var x=0;x<dataset.rowsCount;x++){
			
			var valor = dataset.getValue(x, "status_componente");

			if (valor == null || valor == "") {
				valor = "Não";
			}else{
				valor = "Sim"
			}

			log.info("################################################## VALOR "+ valor)

		

			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_item_componente"),
										   dataset.getValue(x, "nm_item_componente"),
										   dataset.getValue(x, "local_recebidor_item"),
										   dataset.getValue(x, "vl_componente"),
										   dataset.getValue(x, "qtd_componente"),
										   dataset.getValue(x, "vl_total"),
										   dataset.getValue(x, "qtd_nao_conforme"),
										   valor,
										   dataset.getValue(x, "quantidade_retida"),
										   dataset.getValue(x, "vl_retido"),
										   dataset.getValue(x, "observacao_componente")
										   ));
			}
		 

		
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}