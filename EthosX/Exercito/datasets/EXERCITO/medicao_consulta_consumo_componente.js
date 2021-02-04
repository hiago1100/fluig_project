function createDataset(fields, constraints, sortFields) {
	
	//var cd_contrato = "00000001";
	//var cd_etapa = "ET-00007-00000001-COMEST";
	//var cd_item = "IT-00002-00007-00000001";
	//var cd_componente = "01_01";    
	var cd_contrato = "";
    var cd_etapa = "";
    var cd_item = "";
    var cd_componente = "";
    var vl_qtde_item_etapa_componente = 0;
    var vl_qtde_consumo = 0;
    var vl_saldo = 0;
    
    
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("cd_contrato");
    dataset.addColumn("cd_etapa");
    dataset.addColumn("cd_item");
    dataset.addColumn("cd_componente");
    
    dataset.addColumn("vl_qtde_itens_comp_contrato");
    dataset.addColumn("vl_qtde_consumido");
    dataset.addColumn("vl_saldo");
    dataset.addColumn("ds_obs");
    
    
    //tratamento das constraints
    if(constraints != null)
    {
        for (var i = 0; i < constraints.length; i++) 
        {
            if (constraints[i].fieldName == "cd_contrato") 
            { 
            	cd_contrato = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "cd_etapa") 
            { 
            	cd_etapa = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "cd_item") 
            { 
            	cd_item = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "cd_componente") 
            { 
            	cd_componente = constraints[i].initialValue; 
            }
        }
    }
    
    if 	((cd_contrato == "" || cd_contrato == null) ||
    		(cd_etapa == "" || cd_etapa == null) || 
    		(cd_item == "" || cd_item == null) || 
    		(cd_componente == "" || cd_componente == null))
	{
    	 dataset.addRow(new Array(
    			 0,
 	    		 0,
 	             0,
 	             0,
 	             0,
    	    	 0,
    	         0,
    	         "Parâmetros inválidos !!! Procure o Administrador do SAFE"));
    	    
    	    return dataset;
	}
  
    //1o - buscando qtde de componentes definidos no cadastro de contratos/etapas/itens/Componentes
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("cd_contrato", cd_contrato, cd_contrato, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("cd_etapa", cd_etapa, cd_etapa, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("cd_item", cd_item, cd_item, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("cd_componente", cd_componente, cd_componente, ConstraintType.MUST));
    var datasetCompItem = DatasetFactory.getDataset("medicao_contrato_etapa_item_componente", null, constraints, null);

    if (datasetCompItem != null)
	{
    	if (datasetCompItem.rowsCount > 0) 
		{
			vl_qtde_item_etapa_componente = parseFloat(0 + datasetCompItem.getValue(0, "vl_qtde_item_etapa_componente"));
		}
	}
   
    
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("cd_contrato", cd_contrato, cd_contrato, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("cd_etapa", cd_etapa, cd_etapa, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("rb_validacao_patrimonio", "aprovado", "aprovado", ConstraintType.MUST));
    var datasetPrincipal = DatasetFactory.getDataset("medicao_registroNFE", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) 
    {
    	 
    	var nm_solicitante = datasetPrincipal.getValue(i, "nm_solicitante");
		var companyId = datasetPrincipal.getValue(i, "companyid");
    	var id = datasetPrincipal.getValue(i, "metadata#id");
    	var documentId  = datasetPrincipal.getValue(i, "documentId");
    	var vl_num_solic     = datasetPrincipal.getValue(i, "vl_num_solic");
    	var vl_num_solic  = datasetPrincipal.getValue(i, "vl_num_solic");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
    	
    	var constraintsFilhos = new Array();
    	constraintsFilhos.push(DatasetFactory.createConstraint("companyid", companyId ,companyId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tablecomponenteitem" ,"tablecomponenteitem", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", id, id, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("cd_componenteItem", cd_componente, cd_componente, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("cd_componenteItemItem", cd_item, cd_item, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
        var datasetFilhos = DatasetFactory.getDataset("medicao_registroNFE", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) 
        {
        	vl_qtde_consumo = vl_qtde_consumo + parseFloat(0 + datasetFilhos.getValue(j, "vl_componenteItemQuantidade").replace(".","").replace(",","."));
        }
    }
    
    //calculando saldo
    vl_saldo = parseFloat(vl_qtde_item_etapa_componente) - parseFloat(vl_qtde_consumo);
    
    dataset.addRow(new Array(
    		cd_contrato,
    		cd_etapa,
    		cd_item,
    		cd_componente,
    		vl_qtde_item_etapa_componente,
    		vl_qtde_consumo,
            vl_saldo,
            ""));
    

    return dataset;
}