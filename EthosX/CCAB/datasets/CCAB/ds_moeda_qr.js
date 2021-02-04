function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/P12";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var cData = "";
    if (constraints.length > 0){
    	
		for (var c = 0; c < constraints.length; c++) {
			if (constraints[c].fieldName.toUpperCase() == "DATAATUAL") {
				cData = constraints[c].initialValue;
			}				
		}
    
	    var myQuery = "SELECT M2_MOEDA2, M2_MOEDA3, M2_MOEDA4, M2_MOEDA5 "+
		    "FROM SM2010 " +
		    "WHERE M2_DATA = '" + cData + "' "+
		    "AND D_E_L_E_T_ = ' ' ";
	    	 
	    log.info("prdd");
	    log.info(myQuery);
	    
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
    }
    return newDataset;
}