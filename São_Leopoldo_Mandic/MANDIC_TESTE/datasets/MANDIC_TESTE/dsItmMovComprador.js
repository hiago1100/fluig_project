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
    var numProcOrigem ="";
    

    //var numProcOrigem = "where txtNumeroProcesso = 709";

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	        
        	if (constraints[i].fieldName == "NUMEROPROCESSO") { 
        		numProcOrigem +=  "and M5.txtNumeroProcesso = "+constraints[i].initialValue 
            } else if (constraints[i].fieldName == "documentoId") { 
                        numProcOrigem +=  "and M6.documentid = "+constraints[i].initialValue 
                    } else  if (constraints[i].fieldName == "CODCOMP") { 
                                numProcOrigem +=  "and M6.CODCOMP = "+constraints[i].initialValue 
                            } 
        	
        }
    }   
    
    var myQuery = 	" 	select M6.IDPRD, M6.txtQtdCompra, M6.txtPrecoUnitario, M6.documentid, M6.CODCOMP, m6.txthistoricoITMMOV, M6.CODCCUSTO "+
    				"	from ML001006 (NOLOCK) M6 "+
    				"		INNER JOIN ML001005 (NOLOCK) M5 ON M6.documentid = M5.documentid "+
    				"	where M6.txtQtdCompra <> '0' AND M6.comAprovado = 'S' "+numProcOrigem;
                 
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