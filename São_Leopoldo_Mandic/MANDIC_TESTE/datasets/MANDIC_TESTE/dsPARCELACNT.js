function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/FluigDSRM_Prod";
    
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    
    var filtro = "";
    
    if (constraints != null) {

        for (var i = 0; i < constraints.length; i++) {
            
            if (constraints[i].fieldName == "IDCNT") { 
                filtro += " AND I.IDCNT = " +constraints[i].initialValue;
            } else if (constraints[i].fieldName == "CODCOLIGADA") { 
                        filtro += " AND I.CODCOLIGADA = " +constraints[i].initialValue;
                    }

        }
    }    

    var myQuery = " SELECT DISTINCT TOP 100 T.NUMEROMOV +' - '+ CONVERT(VARCHAR(10),L.DATAVENCIMENTO,103)+' - '+REPLACE(CAST(CAST(T.VALORLIQUIDO AS NUMERIC(15,2)) AS VARCHAR(MAX)),'.',',') PARCELACONTRATO, "+
                  "        REPLACE(CAST(CAST(T.VALORLIQUIDO AS NUMERIC(15,2)) AS VARCHAR(MAX)),'.',',') VALORLIQUIDO, T.NUMEROMOV, T.CODCOLCFO, I.IDMOV , C.CODTMV, CONVERT(VARCHAR(10),L.DATAVENCIMENTO,126) DATAVENCIMENTO, "+
                  "        (SELECT IDNAT  "+
                  "         FROM DCFOP  "+
                  "         WHERE  DCFOP.CODCOLIGADA = T.CODCOLIGADA "+
                  "         AND    DCFOP.CODNAT = CASE WHEN F.CODETD = FI.ESTADO THEN '1.' ELSE '2.' END + "+
                  "                               CASE WHEN C.CODTMV = '1.2.11' THEN '556.01'ELSE '933.01' END ) IDNAT "+
                  " FROM TMOV T "+
                  "     INNER JOIN TITMMOV I ON T.CODCOLIGADA = I.CODCOLIGADA AND T.IDMOV = I.IDMOV "+
                  "     INNER JOIN TCNTCOMPL C ON C.CODCOLIGADA = I.CODCOLIGADA AND C.IDCNT = I.IDCNT  "+
                  "     INNER JOIN FCFO F ON T.CODCOLCFO = F.CODCOLIGADA AND T.CODCFO = F.CODCFO "+
                  "     INNER JOIN GFILIAL FI ON  T.CODCOLIGADA = FI.CODCOLIGADA AND T.CODFILIAL = FI.CODFILIAL "+
                  "     LEFT JOIN FLAN L ON L.CODCOLIGADA = T.CODCOLIGADA AND T.IDMOV = L.IDMOV "+
                  " WHERE T.CODTMV = '1.1.17' "+
                  " AND  T.STATUS = 'A' "+
                  " AND T.IDMOV NOT IN (SELECT M.IDMOVCNT "+
                  "                     FROM FLUIG_PRODUCAO.DBO.ML001005 M "+
                  "                         INNER JOIN FLUIG_PRODUCAO.DBO.PROCES_WORKFLOW W ON M.DOCUMENTID = W.NR_DOCUMENTO_CARD "+
                  "  WHERE W.STATUS = 0 AND ISNULL(M.IDMOVCNT,'') <> '') "+filtro;

    
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}

function onMobileSync(user) {

}