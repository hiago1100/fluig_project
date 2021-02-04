function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
 	var idGrupo = findConstraint("idGrupo",constraints,"");
 	
 	var idPrograma = findConstraint("idPrograma",constraints,"");

 	var idUser = findConstraint("idUser",constraints,"");

 	var codEmpresa = findConstraint("codEmpresa",constraints,"");

 	
 if(idPrograma != ""){	
 	var SQL = "SELECT prog.idGrupo, prog.cod_programa, prog.cod_grupo,prog.nome_grupo, p.descricao_programa, p.cod_programa from z_sga_grupo_programa as prog JOIN z_sga_programas as p on p.cod_programa = prog.cod_programa where prog.cod_programa = '"+idPrograma+"';";

 }
 	 
 	
 	
 if(idGrupo != ""){	
 	var SQL = "SELECT prog.cod_programa, prog.idGrupo, p.descricao_programa, p.cod_programa, p.z_sga_programas_id from z_sga_grupo_programa as prog JOIN z_sga_programas as p on p.cod_programa = prog.cod_programa where prog.idGrupo = '"+idGrupo+"';";

 }
 
 if(idUser != "" && codEmpresa != ""){
	 
	 	var SQL = "SELECT u.z_sga_usuarios_id, u.cod_usuario, u.nome_usuario, g.descAbrev,g.idLegGrupo, p.cod_programa,p.descricao_programa FROM z_sga_usuarios AS u, z_sga_usuario_empresa AS eu, z_sga_grupos AS gu, z_sga_grupo AS g, z_sga_grupo_programa AS gp, z_sga_programas AS p WHERE u.z_sga_usuarios_id = '"+idUser+"' AND eu.idUsuario = u.z_sga_usuarios_id AND gu.idUsuario = u.z_sga_usuarios_id AND g.idGrupo = gu.idGrupo AND g.idGrupo <> '13' AND g.idEmpresa = eu.idEmpresa AND gp.idGrupo = gu.idGrupo AND p.z_sga_programas_id = gp.idPrograma AND eu.idEmpresa = '"+codEmpresa+"' ;";
		 
 }
 
	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("buscaDB", null, [c1], null);

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


function onMobileSync(user) {

}




