function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
 	var empresa = findConstraint("codigoEmpresa",constraints,"");
 	var descAbrev = findConstraint("descAbrev",constraints,"");
 	
 	var dbInstancia = 2;
 	
 	
 //	log.info("@@@ ENTROU NO DATASET GRUPOS");
 	
 //	log.info("@@@ EMPRESA "+ empresa);
 	
  	
	
	switch(dbInstancia){
	case 1:
		var SQL = "select * from z_sga_grupo WHERE idEmpresa = "+empresa+" AND descAbrev LIKE  '%"+descAbrev+"%';";
		 break;
	case 2:
		var SQL = "select * from z_sga_grupo WHERE idEmpresa = "+empresa+"  AND descAbrev LIKE  '%"+descAbrev+"%'; ";
		break;
	case 3:
		var SQL = "select * from z_sga_grupo WHERE idEmpresa = "+empresa+"";
		 break;
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