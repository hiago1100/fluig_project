function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {


   
    // var SQL = "SELECT * FROM VIEW_SOLICITACAO_MUDANCA_CONTRATO_ETAPA  ";
            //   "INNER JOIN VIEW_SOLICITACAO_MUDANCA_CONTRATO_ETAPA e ON e.masterid = m.ID" +
            //   "WHERE m.companyid = '1' AND e.etapa = 'ET-00034-CT-00990099-COMEST' ";


              
var SQL =	"SELECT "+
    "'ML0010' + CONVERT(VARCHAR(10), l.COD_LISTA_PAI)  AS 'TABELA_PRINCIPAL', "+
   " 'ML0010' + CONVERT(VARCHAR(10), l.COD_LISTA_FILHO)  AS 'TABELA_PAIxFILHO', "+
   " d.COD_LISTA, "+
  "  l.COD_LISTA_PAI, "+
   " l.COD_LISTA_FILHO, "+
   " l.COD_TABELA "+
  "  ,d.NUM_DOCTO_PROPRIED "+
   " ,d.NUM_VERS_PROPRIED "+
"FROM DEF_PROCES             p  "+
"LEFT JOIN VERS_DEF_PROCES   vp  ON vp.COD_DEF_PROCES = p.COD_DEF_PROCES  "+
" AND vp.LOG_ATIV = 1 "+
"LEFT JOIN DOCUMENTO         d   ON d.NR_DOCUMENTO    = vp.NUM_PASTA_FORM "+
"AND d.VERSAO_ATIVA = 1 "+
"LEFT JOIN SERV_DATASET      ds  ON ds.COD_DATASET    = d.NM_DATASET  "+
"LEFT JOIN META_LISTA_REL    l   ON l.COD_LISTA_PAI    = d.COD_LISTA  "+
"WHERE p.COD_DEF_PROCES = 'NOME_DO_PROCESSO'   "+
"ORDER BY vp.NUM_VERS  DESC ";


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