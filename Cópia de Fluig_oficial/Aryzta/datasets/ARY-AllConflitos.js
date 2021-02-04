function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("codConflito");
    dataset.addColumn("descConflito");
    dataset.addColumn("appMain");
    dataset.addColumn("descMain");
    dataset.addColumn("appMainObs");
    dataset.addColumn("appConflito");

    var datasetPrincipal = DatasetFactory.getDataset("CadastroConflitos", null, null, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tabelaConflitos" ,"tabelaConflitos", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
        
        var codConflito = datasetPrincipal.getValue(i, "codConflito");
        var descConflito = datasetPrincipal.getValue(i, "descricao");
        var appMain = datasetPrincipal.getValue(i, "appMain");
        var descMain = datasetPrincipal.getValue(i, "appMainDesc");
        var appMainObs = datasetPrincipal.getValue(i, "appMainObs");
       
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("CadastroConflitos", null, constraintsFilhos, null);
 
        for (var j = 0; j < datasetFilhos.rowsCount; j++) { 
        	log.info('>>>>>>>>> datasetFilhos.getValue('+j+', "aplicativo"): ' + datasetFilhos.getValue(j, "aplicativo"))
        	if (datasetFilhos.getValue(j, "aplicativo") != '' 
        	 && datasetFilhos.getValue(j, "aplicativo") != ' '
             && datasetFilhos.getValue(j, "aplicativo") != null
             && datasetFilhos.getValue(j, "aplicativo") != 'null'
             && datasetFilhos.getValue(j, "aplicativo") != 'undefined'){
	            dataset.addRow([
	                codConflito,
	                descConflito,
	                appMain,
	                descMain,
	                appMainObs,
	                datasetFilhos.getValue(j, "aplicativo") 
	            ]); 
        	}
        }
    }
     
    return dataset;
}

function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {

		for (var i=0; i<constraints.length; i++){
			log.info("***CONSTRAN : " + constraints[i].fieldName );
			log.info("***CONSTRAN2 : " + constraints[i].initialValue);
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}