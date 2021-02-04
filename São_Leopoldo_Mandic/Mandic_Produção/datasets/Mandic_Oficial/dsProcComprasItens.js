function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/FluigDSRO";
    
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    

    var filtro = "";
    var USR = "";
  
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	if (constraints[i].fieldName == "documentid") { 
                filtro = constraints[i].initialValue ;
            } else if (constraints[i].fieldName == "usr") { 
                USR = constraints[i].initialValue ;
            }

        }
    }   
 
    var myQuery =  " select CASE WHEN C.CODCCUSTO IS NULL THEN '' ELSE C.CODCCUSTO END CODCCUSTO, txtCodigoPrd, CASE WHEN C.CODCCUSTO IS NULL THEN '' ELSE M6.txtCodCCusto END txtCodCCusto, IDPRD, CODIGOPRD, txtQtdSolicitada, ckPrdEstocavel, M6.documentid , M6.CODCOMP, txtQtdCompra "+
                   " from ML001006 (NOLOCK) M6 "+
                   "    INNER JOIN ML001005 M5 (NOLOCK) ON M6.documentid = M5.documentid "+
                   "    LEFT JOIN CORPORE_PRODUCAO.DBO.TUSUARIOCCUSTO C (NOLOCK) ON M5.CODCOLIGADA = C.CODCOLIGADA AND M6.CODCCUSTO = C.CODCCUSTO COLLATE Latin1_General_CI_AS AND C.CODUSUARIO = '"+USR+"' "+
                   "  where M6.documentid = "+filtro; 
    
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