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
    var filtro = "";
    
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "NUMFLUIG") { 
                filtro += " " +constraints[i].initialValue+" " ; 
            }
             else if (constraints[i].fieldName == "DATAINICIAL") { 
	                filtro += " , '" +constraints[i].initialValue + "' "; 
	            }
	             else if (constraints[i].fieldName == "DATAFINAL") { 
		                filtro += " , '" +constraints[i].initialValue + "' "; 
		            }
		             else if (constraints[i].fieldName == "USUARIO") { 
			                filtro += " , '" +constraints[i].initialValue + "' "; 
			            }

        }
    }    
    
    var myQuery = 	" EXEC SP_CRM_PESQUISARPROCESSO "+filtro;
    
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
    	log.error("MYQUERY==============> " + myQuery);
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