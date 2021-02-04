function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    /*                   Documentação do Dataset, by : Hiago Oliveira (Grupo DKP).  
      
     *  Parâmetros que serão utilizados para filtrar os dados{
            NUM_PROCES || COD_DEF_PROCES || NUM_SEQ_ESTADO
        }

     *  Dados a serem utilizados no Painel{
            DT_MOVTO || HRA_MOVTO || NUM_SEQ_ESTADO || COD_MATR_REQUISIT(SE FOR O CODIGO ADMIN = AUTOMATICO != MANUAL) || LENGTH DOS FLUXOS || COD_MATR_REQUISIT
        }
    */

    var SQL =  "SELECT DISTINCT DAT_MOVTO as DATA_INICIO , MIN(HRA_MOVTO) as HORA_INICIO, MAX(HRA_MOVTO) as HORA_FIM, COD_MATR_REQUISIT as USUARIO, COUNT(P.NUM_PROCES) as MOVIMENTACOES  FROM proces_workflow AS C  JOIN histor_proces AS P  ON C.NUM_PROCES = P.NUM_PROCES  WHERE COD_DEF_PROCES = 'CALCULODECOMISSÃO1'  AND  NUM_SEQ_ESTADO = 67 GROUP BY DAT_MOVTO,COD_MATR_REQUISIT  ORDER BY 1";



    //var SQL = "SELECT TOP 10 C.NUM_PROCES, COD_DEF_PROCES, NUM_SEQ_ESTADO FROM proces_workflow AS C JOIN histor_proces AS P ON C.NUM_PROCES = P.NUM_PROCES AND COD_DEF_PROCES = 'CALCULODECOMISSÃO1'"; // tem NUM_PROCES  
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