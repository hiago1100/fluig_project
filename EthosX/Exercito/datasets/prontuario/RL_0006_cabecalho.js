function createDataset(fields, constraints, sortFields) {
    var cd_etapa_const = "";
    var userLogado = buscaColleague(getValue("WKUser"));
    var dataHora   = RetornaDataHoraAtual();

	

    try{
		if (constraints != null) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() == "CD_ETAPA") {
					cd_etapa_const = constraints[c].initialValue;
				}
			}
		}

		var SQL = 	"SELECT etapa.cd_etapa, etapa.cd_contrato, versao.* FROM VIEW_ETAPA_TODAS_VERSOES etapa "+
		"INNER JOIN VIEW_ETAPA_VERSOES versao on etapa.documentid = versao.documentid and etapa.version = versao.version and situacao_versao='Aprovada' AND etapa.cd_etapa = 'ET-00040-GALDINO1409_1-COMEST' "+ 
		"ORDER BY versao.id DESC";




		var datasetReturn = DatasetBuilder.newDataset();		
        var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
        var dataset = DatasetFactory.getDataset("ds_buscaDB", null, [c1], null);

		datasetReturn.addColumn("cd_etapa");
		datasetReturn.addColumn("cd_contrato");
		datasetReturn.addColumn("data_hora");
		datasetReturn.addColumn("usuario");


				
		for(var x=0;x<dataset.rowsCount;x++){

			datasetReturn.addRow(new Array(dataset.getValue(x, "cd_etapa"),
										   dataset.getValue(x, "cd_contrato"),
										   dataHora,
										   userLogado
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
	
	function buscaColleague(param){ 

		var c1 = DatasetFactory.createConstraint("colleagueId", param, param, ConstraintType.MUST);
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
			  
		for(var x=0;x<dataset.rowsCount;x++){
			var nomeUsuario = dataset.getValue(x, "colleagueName");
		}
	
		return nomeUsuario;
	
	}