function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


    var SQL = "SELECT * FROM FLUIG.DBO.BRZ_COMISSAO WHERE DATAVENDA BETWEEN '2019-02-01' AND '2019-03-25' ORDER BY NUM_VENDA, COD_COMPN DESC";

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