function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
 
	var empresa     = findConstraint("codigoEmpresa",constraints,"");
 	var cod_usuario = findConstraint("cod_usuario",constraints,"");
	
	
 	 if(empresa != "" && cod_usuario != ""){	
 		var SQL = "select * from v_sga_matriz_usuario where cod_usuario = '"+cod_usuario+"' and idEmpresa = '"+empresa+"' ";
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