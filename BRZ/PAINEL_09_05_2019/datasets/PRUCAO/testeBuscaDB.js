function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


    var SQL = "SELECT TOP 10 * FROM BRZ_COMISSAO";

    var c1 = DatasetFactory.createConstraint("SQL", SQL, SQL, ConstraintType.MUST);    
    var dataset = DatasetFactory.getDataset("ds_buscaDB", null, [c1], null);

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