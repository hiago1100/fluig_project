function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	var codGest     = findConstraint("codGest",constraints,"");
	var solicitante = findConstraint("nomeUser",constraints,"");
	var dataInicio = findConstraint("dataInicio",constraints,"");
	var dataFim = findConstraint("dataFim",constraints,"");
	var tipoUser = findConstraint("tipoUser",constraints,"");
	var auxQuery    = 'colleagueName":"';
	var constConc   = auxQuery + solicitante ;
	var SQL;

	if (tipoUser == "GERENTE") {
	 SQL = 'Select b.dt_criacao, a.GERAL,y.DESPESA , a.GESTORCCUSTOVIAJANTE as gestor, a.PARAMS , a.IDVIAJANTE '+
				'FROM ML001025 a '+ 
				'join ML001026 y on (a.ID = y.ID) '+
				'join documento b on ( b.COD_EMPRESA = a.companyid and b.NR_DOCUMENTO = a.documentid and b.NR_VERSAO = a.version and b.VERSAO_ATIVA = 1 ) '+
				"WHERE b.DT_CRIACAO BETWEEN '"+dataInicio+"' AND '"+dataFim+"' AND a.GESTORCCUSTOVIAJANTE = '"+codGest+"' AND GERAL LIKE '%"+constConc+"%' ";

	}else if(tipoUser == "DIRETOR"){
	 SQL = 'Select b.dt_criacao, a.GERAL,y.DESPESA , a.GESTORCCUSTOVIAJANTE as gestor, a.PARAMS , a.IDVIAJANTE '+
				'FROM ML001025 a '+ 
				'join ML001026 y on (a.ID = y.ID) '+
				'join documento b on ( b.COD_EMPRESA = a.companyid and b.NR_DOCUMENTO = a.documentid and b.NR_VERSAO = a.version and b.VERSAO_ATIVA = 1 ) '+
				"WHERE b.DT_CRIACAO BETWEEN '"+dataInicio+"' AND '"+dataFim+"' AND GERAL LIKE '%"+constConc+"%' ";
	 }			

	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("ds_buscaDB", null, [c1], null);

	return dataset;
}

function findConstraint(fieldName, constraints, defaultValue) {
     if (constraints != null) {
      
      for (var i=0; i<constraints.length; i++){
       if (constraints[i].fieldName == fieldName){
        return constraints[i].initialValue;
       }
      }
     }
     return defaultValue;
    }


function onMobileSync(user) {

}