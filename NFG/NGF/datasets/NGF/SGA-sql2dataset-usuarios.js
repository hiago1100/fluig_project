function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

	var idEmpresa = findConstraint("idEmpresa",constraints,"");
	
	
	var SQL = "SELECT userEmp.idEmpresa,userEmp.idUsuario,u.z_sga_usuarios_id,u.nome_usuario,u.cod_usuario,u.email,u.funcao from z_sga_usuario_empresa as userEmp JOIN z_sga_usuarios as u on u.z_sga_usuarios_id = userEmp.idUsuario where userEmp.idEmpresa = '"+idEmpresa+"'";

	
//	var SQL = getStringSqlDSusuario()

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