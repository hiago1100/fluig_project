
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	
	try{
		var uf = getParametro(constraints, "UF").toUpperCase().trim();
		var descricao = getParametro(constraints, "DESCRICAO").toUpperCase().trim();
		
		if (uf == ""){
			dataset = DatasetBuilder.newDataset();
	        dataset.addColumn("ERROR");
	        dataset.addColumn("MESSAGE_ERROR");
	        dataset.addRow(new Array(-1, "UF não informado."));
	        return dataset;
		}
	    
	    var constraintOne = DatasetFactory.createConstraint("UF", uf, uf, ConstraintType.MUST);
	    var constraints = new Array(constraintOne);
	    var operadoresSubGrupos = DatasetFactory.getDataset("dsOperadoresSubGrupos", null, constraints, null);
	    
	    
	    for(var i = 0; i < operadoresSubGrupos.rowsCount; i++) {
	    	
	    	var constraintOperadoresUm = DatasetFactory.createConstraint("subgrupo", operadoresSubGrupos.getValue(i, "subgrupo"), operadoresSubGrupos.getValue(i, "subgrupo"), ConstraintType.MUST);
			var constraintOperadoresDois = DatasetFactory.createConstraint("descricao", descricao, descricao, ConstraintType.MUST);
			var constraintsOperadores = new Array(constraintOperadoresUm, constraintOperadoresDois);
		    var operadores = DatasetFactory.getDataset("dsOperadoresTransporte", null, constraintsOperadores, null);
	    	
		    for(var x = 0; x < operadores.rowsCount; x++) {
		    	
		    	dataset.addRow(new Array(
	    			operadores.getValue(x, "descricao"),
	    			operadores.getValue(x, "subgrupo"),
	    			operadores.getValue(x, "codigo"),
	    			operadores.getValue(x, "unitario"),    			
	    			operadoresSubGrupos.getValue(i, "uf")
		    	));
		    	

		    	
		    }
		    
	    		    	
	    }
	    
	} catch (e){
        var mensagemErro = e;
        log.error("dsRMAdmDes.createDataset: "+mensagemErro);
        
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("ERROR");
        dataset.addColumn("MESSAGE_ERROR");
        dataset.addRow(new Array(-1, mensagemErro));	
	}
	return dataset;
	

}

function criarEstrutura(dataset){
	dataset.addColumn("OPERADOR", DatasetFieldType.STRING);
	dataset.addColumn("SUBGRUPO", DatasetFieldType.STRING);
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("UNITARIO", DatasetFieldType.NUMBER);
	dataset.addColumn("UF", DatasetFieldType.STRING);
}

function getParametro(constraints, campo) {
	var valor = "";
	if ((constraints != null) && (constraints.length > 0)) {
		for each(con in constraints) {
			if (con.getFieldName().trim().toUpperCase() == campo.trim().toUpperCase()) {
				valor = con.getInitialValue();
				break;
			}
		}
	}
	return valor;
}
