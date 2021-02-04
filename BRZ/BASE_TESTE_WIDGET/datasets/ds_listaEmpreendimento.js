function defineStructure() {
}
function onSync(lastSyncDate) {
}
function createDataset(fields, constraints, sortFields) {


    var empreendimentoFluig = findConstraint("slctEmpreendimento",constraints,""); 

    //var empreendimentoFluig = "LÍRIOS"; 

   // var SQL = "SELECT DISTINCT(H.NUM_PROCES) as NUMERO_PROCESSO, MAX(M.EMPNOME) AS EMPREENDIMENTO FROM DOCUMENTO AS D  JOIN ANEXO_PROCES    AS A ON A.NUM_SEQ_MOVTO_ORIG = D.VERSAO_ATIVA JOIN ML001855  AS M ON D.NR_DOCUMENTO = M.DOCUMENTID JOIN histor_proces   AS H ON H.NUM_PROCES = A.NUM_PROCES  JOIN PROCES_WORKFLOW AS P ON H.NUM_PROCES = P.NUM_PROCES WHERE P.COD_DEF_PROCES = 'CALCULODECOMISSÃO1'  AND h.NUM_SEQ_ESTADO = 67  AND M.EMPNOME LIKE '%PORTAL%' GROUP BY h.NUM_PROCES";

    var SQL =  "Select DISTINCT c.num_proces, a.cpEmpreendimento from ML0012472 a  join documento b on ( b.COD_EMPRESA = a.companyid and b.NR_DOCUMENTO = a.documentid and b.NR_VERSAO = a.version and b.VERSAO_ATIVA = 1 ) join anexo_proces c on (c.cod_empresa = b.cod_empresa and c.NR_DOCUMENTO = b.NR_DOCUMENTO and c.NR_VERSAO = b.NR_VERSAO)  join proces_workflow u on ( u.COD_EMPRESA = c.COD_EMPRESA and u.NUM_PROCES = c.NUM_PROCES ) left join tar_proces t on (t.COD_EMPRESA = c.COD_EMPRESA and t.NUM_PROCES = c.NUM_PROCES and t.LOG_ATIV = '1' ) left join histor_proces x on (x.COD_EMPRESA = t.COD_EMPRESA and x.NUM_PROCES = t.NUM_PROCES and x.NUM_SEQ_MOVTO = t.NUM_SEQ_MOVTO) left join estado_proces v on (v.COD_EMPRESA = t.COD_EMPRESA and v.COD_DEF_PROCES = u.COD_DEF_PROCES and v.NUM_SEQ = x.NUM_SEQ_ESTADO and v.NUM_VERS = u.NUM_VERS) WHERE a.cpEmpreendimento LIKE '%"+empreendimentoFluig+"%' AND u.[STATUS] = 0";

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