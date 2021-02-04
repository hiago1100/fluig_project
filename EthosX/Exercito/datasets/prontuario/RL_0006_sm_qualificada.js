function createDataset(fields, constraints, sortFields) {
    var cd_etapa_const = 'ALIMENTAÇÃO PARA O QUARTEL';

    try{
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "CD_ETAPA") {
					cd_etapa_const = constraints[c].initialValue;
				}
			}
		}

        var SQL = "SELECT * FROM VIEW_SOLICITACAO_MUDANCA_CONTRATO m "+
        "INNER JOIN VIEW_SOLICITACAO_MUDANCA_CONTRATO_ETAPA e ON e.masterid = m.ID WHERE e.etapa LIKE '"+cd_etapa_const+"' ";


		var datasetReturn = DatasetBuilder.newDataset();		
        var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
        var dataset = DatasetFactory.getDataset("ds_buscaDB", null, [c1], null);

		datasetReturn.addColumn("etapa");
		datasetReturn.addColumn("instrumento");
        datasetReturn.addColumn("descSM");
        datasetReturn.addColumn("dtHrSolicitacao");
        datasetReturn.addColumn("secao");
              
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" + dataset.getValue(0,"descSM"));

		for(var x=0;x<dataset.rowsCount;x++){

   

			    datasetReturn.addRow(new Array(dataset.getValue(x, "etapa"),
                                                "num_ams",
                                                "descricao",
                                                dataset.getValue(x, "dtHrSolicitacao"),
                                                dataset.getValue(x, "secao")
                ));	
    
        }
        
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}

