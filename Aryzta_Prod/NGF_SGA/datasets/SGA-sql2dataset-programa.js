function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
 	var idGrupo = findConstraint("idGrupo",constraints,"");
 	
 	
 //	log.info("@@@ ENTROU NO DATASET GRUPOS");
 	
 //	log.info("@@@ EMPRESA "+ empresa);

 	
 	var SQL = "SELECT prog.cod_programa, prog.idGrupo, p.descricao_programa, p.cod_programa from z_sga_grupo_programa as prog JOIN z_sga_programas as p on p.cod_programa = prog.cod_programa;";

	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("buscaDB", null, [c1], null);

	return dataset; 	
 	
 	
 	
 if(idGrupo != ""){	
 	var SQL = "SELECT prog.cod_programa, prog.idGrupo, p.descricao_programa, p.cod_programa from z_sga_grupo_programa as prog JOIN z_sga_programas as p on p.cod_programa = prog.cod_programa where prog.idGrupo = '"+idGrupo+"';";

	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("buscaDB", null, [c1], null);

	return dataset;
 }
 

	
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


function onMobileSync(user) {

}




