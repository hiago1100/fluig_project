function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var cod_programa = findConstraint("cod_programa",constraints,"");
	var dbInstancia = 2;
	
	
	log.info("@@@ ENTRANDO NO DATASET");

// tratamento SQL
	

switch(dbInstancia){
//case 1:
//	var SQL = "Select * from z_sga_programas where cod_programa like '%"+cod_programa+"%' limit 10;";
//	 break;
case 2:
	var SQL = "Select top 10 * from z_sga_programas where cod_programa like '%"+cod_programa+"%';"
	 break;
//case 3:
	//var SQL = "Select * from z_sga_programas where cod_programa like '%"+cod_programa+"%';"
	// break;
	default:
	break;
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




