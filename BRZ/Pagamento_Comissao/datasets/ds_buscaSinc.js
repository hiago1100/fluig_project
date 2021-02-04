function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


    var SQL = "SELECT DISTINCT CONVERT(date, START_DATE) as DATA_INICIO , MIN(CONVERT(VARCHAR, START_DATE,108)) as HORA_INICIO, MAX(CONVERT(VARCHAR, START_DATE,108)) AS HORA_FIM ,COD_MATR_REQUISIT as USUARIO, COUNT(COD_MATR_REQUISIT) as VENDAS FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'CALCULODECOMISSÃO1' GROUP BY CONVERT(date, START_DATE),COD_MATR_REQUISIT ORDER BY 1";

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