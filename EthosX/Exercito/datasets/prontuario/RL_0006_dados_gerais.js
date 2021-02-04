function createDataset(fields, constraints, sortFields) {
    var cd_etapa_const = "ET-00038-54321-COMEST";
    var dataHora   = RetornaDataHoraAtual();
    
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

		datasetReturn.addColumn("cd_etapa");
		datasetReturn.addColumn("cd_contrato");
        datasetReturn.addColumn("data_hora");
        datasetReturn.addColumn("nome_guerra");
        datasetReturn.addColumn("dt_apresentacao_realizado");
        datasetReturn.addColumn("zoom_tipo_etapa");
        datasetReturn.addColumn("zoom_natureza_tributaria");
        datasetReturn.addColumn("situacao_fisica");
        datasetReturn.addColumn("natureza"); 
        datasetReturn.addColumn("cadastrador");
        datasetReturn.addColumn("dt_cadastro_etapa");  
        datasetReturn.addColumn("sel_requisito_externo");
        datasetReturn.addColumn("ds_descricao");              

		for(var x=0;x<dataset.rowsCount;x++){

            var userFiscal = dataset.getValue(x,"matricula_fiscal");
            var nomeGuerra = buscaNomeGuerra(userFiscal);

            var metadataId = dataset.getValue(x, "metadata#id");
            var publicador = buscaPublicador(metadataId);

            var requisito = dataset.getValue(x, "sel_requisito_externo");
            if(requisito == "sim"){
                requisito = "Externo";                
            }else{
                requisito = "Safe"
            } 

			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_etapa"),
										   dataset.getValue(x, "cd_contrato"),
                                           dataHora,
                                           nomeGuerra,
                                           dataset.getValue(x, "dt_apresentacao_realizado"),
                                           dataset.getValue(x, "zoom_tipo_etapa"),
                                           dataset.getValue(x, "zoom_natureza_tributaria"),
                                           dataset.getValue(x, "situacao_fisica"),
                                           dataset.getValue(x, "natureza"),
                                           publicador,
                                           dataset.getValue(x, "dt_cadastro_etapa"),
                                           requisito,
                                           dataset.getValue(x, "ds_descricao")
										   ));
			
			
		}
		
		return datasetReturn;
	}
	catch(erro){
		datasetReturn.addRow(new Array(0,erro.message));
		return datasetReturn;
	}
}

function RetornaDataHoraAtual(){
    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' '  + dNow.getHours() + ':' + dNow.getMinutes();
    return localdate;
}


function buscaNomeGuerra(param){ 

    var c1 = DatasetFactory.createConstraint("hidden_matriculaUsuario", param, param, ConstraintType.MUST);
    var constraints = new Array(c1);
    var dataset = DatasetFactory.getDataset("profissional_cadastro_info", null, constraints, null);
            
    for(var x=0;x<dataset.rowsCount;x++){
        var userGuerra = dataset.getValue(x, "txt_nome_de_guerra_completo");
    }
      
    return userGuerra;

}

function buscaPublicador(param){

    var c1 = DatasetFactory.createConstraint("documentPK.documentId", param, param, ConstraintType.MUST);
    var constraints = new Array(c1);
    var dataset = DatasetFactory.getDataset("document", null, constraints, null);
         
    for(var x=0;x<dataset.rowsCount;x++){
        var matricula = dataset.getValue(x, "publisherId");
    }

    var nomeUsuario = buscaColleague(matricula);

    return nomeUsuario;

}

function buscaColleague(param){ 

    var c1 = DatasetFactory.createConstraint("colleagueId", param, param, ConstraintType.MUST);
    var constraints = new Array(c1);
    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
          
    for(var x=0;x<dataset.rowsCount;x++){
        var nomeUsuario = dataset.getValue(x, "colleagueName");
    }

    return nomeUsuario;

}