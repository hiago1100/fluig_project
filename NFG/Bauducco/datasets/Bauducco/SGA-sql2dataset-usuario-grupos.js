function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
 	var codUsuario = findConstraint("idUsuario",constraints,"");
 	
 	var idGrupoUser = findConstraint("idGrupoUser",constraints,"");
 	
 	
 //	log.info("@@@ ENTROU NO DATASET GRUPOS");
 	
 //	log.info("@@@ EMPRESA "+ empresa);
 	
 if(codUsuario != ""){ 	
 	var SQL = "SELECT g.idLegGrupo, g.descAbrev, g.idGrupo,  (select ui.nome_usuario from z_sga_usuarios as ui where ui.cod_usuario = gs.gestor) as nomeGestor from z_sga_grupos as gs, z_sga_usuarios as u, z_sga_grupo as g where gs.idUsuario = '"+codUsuario+"' and g.idGrupo = gs.idGrupo and u.z_sga_usuarios_id = gs.idUsuario";

	var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
	var dataset = DatasetFactory.getDataset("buscaDB", null, [c1], null);

	return dataset;
 }
 
 if(idGrupoUser != ""){
	 
		var SQL = "SELECT g.idUsuario,u.cod_usuario,u.nome_usuario,u.email,u.funcao from z_sga_grupos as g JOIN z_sga_usuarios as u on g.idUsuario = z_sga_usuarios_id where idGrupo = '"+idGrupoUser+"'";
	 
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




