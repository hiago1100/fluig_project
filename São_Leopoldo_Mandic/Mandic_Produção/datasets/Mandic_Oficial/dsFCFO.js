function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

  //  var codFilial = findConstraint('CODFILIAL', constraints);

	var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/FluigDSRM_Prod";
    
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false; 
    var filtro = "";
    
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") { 
                filtro += " AND (CODCOLIGADA = 0 OR CODCOLIGADA = " +constraints[i].initialValue+" )" ; 
            }
             else if (constraints[i].fieldName == "FORNECEDOR") { 
	                filtro += " AND FORNECEDOR like '%" +constraints[i].initialValue + "%'"; 
	            }

        }
    }    

    // se necessário colocar um IF aqui

    var myQuery =   " SELECT TOP 20 FORNECEDOR, CODCFO, CODCOLIGADA   "+
                    " FROM " +
                    " ( SELECT FCFO.CODCFO, FCFO.CODCOLIGADA, FCFO.CODCFO + ' - ' + FCFO.NOMEFANTASIA+' - ' + FCFO.CGCCFO FORNECEDOR "+
                    "   FROM FCFO (NOLOCK) "+
                    "   WHERE PAGREC <> 1 "+
                    "   AND ATIVO = 1 "+
                    "   AND CFOIMOB = 0 ) AS FORN " +
                    "  WHERE 1=1"  + filtro ;
    

                    log.info("### MINHA QUERY DATASET : " + myQuery); 

    
    // var myQuery = 	" SELECT TOP 20 FORNECEDOR, CODCFO, CODCOLIGADA "+
    //                 " FROM " +
    //                 " ( SELECT CODCFO, CODCOLIGADA, CODCFO + ' - ' + NOMEFANTASIA+' - ' + ISNULL(CGCCFO,'') FORNECEDOR "+
    // 				"   FROM FCFO (NOLOCK) "+
    // 				"   WHERE PAGREC <> 1 "+
    // 				"   AND ATIVO = 1 "+
    // 				"   AND CFOIMOB = 0 ) AS FORN " +
    //                 "  WHERE 1=1 "+filtro;
    
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

function findConstraint(fieldName, constraints, defaultValue) {
    if (constraints != null) {
        for (var i=0; i<constraints.length; i++){
            if (constraints[i].fieldName == fieldName){
                return constraints[i].initialValue;
            }
        }
    }
    return defaultValue;
}

function onMobileSync(user) {

}