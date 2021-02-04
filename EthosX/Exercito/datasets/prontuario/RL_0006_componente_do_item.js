function createDataset(fields, constraints, sortFields) {

	var cd_etapa_const;

	try{
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "CD_ETAPA") {
					cd_etapa_const = constraints[c].initialValue;
				}
			}
		}

		var SQL = "SELECT e.qtd_nao_conforme, m.ds_status_processo, e.cd_item_componente,e.nm_item_componente,e.obs_componente,e.vl_componente , m.cd_etapa, m.vl_retido_recuperavel, e.qtd_componente FROM VIEW_ACEITACAO_SIMPLIFICADA m "+  
		"INNER JOIN VIEW_ACEITACAO_SIMPLIFICADA_ITEM e ON e.masterid = m.ID "+ 
		"WHERE m.companyid = '1' and m.ds_status_processo <> 'Cancelada' AND m.cd_etapa = 'ET-00003-00000005-MAGE' ";




		var datasetReturn = DatasetBuilder.newDataset();		
        var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
        var dataset = DatasetFactory.getDataset("ds_buscaDB", null, [c1], null);

		datasetReturn.addColumn("cd_item_componente");
		datasetReturn.addColumn("nm_item_componente");
		datasetReturn.addColumn("obs_componente");
		datasetReturn.addColumn("vl_componente");
		datasetReturn.addColumn("conformidade");
		datasetReturn.addColumn("vl_retido_recuperavel");

				
		for(var x=0;x<dataset.rowsCount;x++){
			var vl_retido = dataset.getValue(x, "vl_retido_recuperavel");
			var conformidade = "Conforme";
			var unidade = dataset.getValue(x, "qtd_componente");
			var valor   = dataset.getValue(x, "vl_componente");
			log.info("############################################## UNIDADE = "+ valor);	
			
			if(valor == null || valor == ""){
				valor = "0";
			}
			if(unidade == null || unidade == ""){
				unidade = "0";
			}
			
			var total   = parseInt(valor) * parseInt(unidade);

			var retorno = formatarMoeda(total.toFixed(2));
				retorno = "R$ "+ retorno;

			var qtd = dataset.getValue(x, "qtd_nao_conforme");
			
			if(parseInt(qtd) > 0 ){
				conformidade = "Não conforme";
			} 

			if(dataset.getValue(x, "vl_retido_recuperavel") == '' || dataset.getValue(x, "vl_retido_recuperavel") == null){
				vl_retido = "0,00";
			}

			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_item_componente"),
										   dataset.getValue(x, "nm_item_componente"),
										   dataset.getValue(x, "obs_componente"),
										   retorno,	
										   conformidade,
										   vl_retido
										   ));			
			}
				
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}


function formatarMoeda(d) {
	var valor = d;
	valor = valor + '';
	valor = parseInt(valor.replace(/[\D]+/g,''));
	valor = valor + '';
	valor = valor.replace(/([0-9]{2})$/g, ",$1");
	if (valor.length > 6) {
	  valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
	}
   return valor
  }