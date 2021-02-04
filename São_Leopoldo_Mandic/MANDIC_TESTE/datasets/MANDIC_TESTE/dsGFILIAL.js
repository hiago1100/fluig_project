function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/FluigDSRM_TST";
    
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false; 
    var filtro = " ";
    
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") { 
                filtro += " AND CODCOLIGADA = " +constraints[i].initialValue ; 
            }
            
            else if (constraints[i].fieldName == "FILIAL") { 
                filtro += " AND FILIAL like '%" +constraints[i].initialValue + "%'"; 
            }            
            

        }
    }    
    
     var myQuery =  " SELECT CODCOLIGADA, CODFILIAL, FILIAL, CODLOC " +
                    " FROM ( SELECT GFILIAL.CODCOLIGADA, GFILIAL.CODFILIAL, GFILIAL.NOMEFANTASIA, RIGHT(REPLICATE('0',2) + CAST( GFILIAL.CODFILIAL AS VARCHAR ),2) + ' - ' + GFILIAL.NOMEFANTASIA FILIAL, TLOC.CODLOC " +
                    "       FROM GFILIAL (NOLOCK) " +
                    "           INNER JOIN TLOC (NOLOCK) ON GFILIAL.CODCOLIGADA = TLOC.CODCOLIGADA AND GFILIAL.CODFILIAL = TLOC.CODFILIAL " +
                    "       WHERE GFILIAL.CODFILIAL NOT IN (6,7)) X  " + 
                    " WHERE 1=1 " + filtro +
                    " ORDER BY FILIAL ";
                      
    
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