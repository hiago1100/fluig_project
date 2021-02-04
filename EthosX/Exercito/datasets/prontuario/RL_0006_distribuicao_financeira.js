function createDataset(fields, constraints, sortFields) {
    var cd_etapa_const = "ET-00038-54321-COMEST";
    
    try{
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "CD_ETAPA") {
					cd_etapa_const = constraints[c].initialValue;
                }				
			}
        }


		var datasetReturn = DatasetBuilder.newDataset();		
		var c1 = DatasetFactory.createConstraint("cd_etapa", cd_etapa_const, cd_etapa_const, ConstraintType.MUST);
    	var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("geral_cadastro_etapa", null, constraints, null);

		datasetReturn.addColumn("vl_aprovado_etapa");
		datasetReturn.addColumn("vl_utilizado");
        datasetReturn.addColumn("vl_reservado");
        datasetReturn.addColumn("vl_liquidacao");
        datasetReturn.addColumn("vl_liquidado");
        datasetReturn.addColumn("vl_pago");
           
		for(var x=0;x<dataset.rowsCount;x++){

			datasetReturn.addRow(new Array(dataset.getValue(x, "vl_aprovado_etapa"),
										   dataset.getValue(x, "vl_utilizado"),
                                           dataset.getValue(x, "vl_reservado"),
                                           dataset.getValue(x, "vl_liquidacao"),
                                           dataset.getValue(x, "vl_liquidado"),
                                           dataset.getValue(x, "vl_pago")
										   ));
			
			
		}
		
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}
