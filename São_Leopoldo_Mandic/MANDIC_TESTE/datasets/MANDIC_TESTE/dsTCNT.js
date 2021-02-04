function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    var codFilial = findConstraint('CODFILIAL', constraints);

	var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/FluigDSRM_TST";
    
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    
    var filtro = "";
    
    if (constraints != null) {

        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "CODUSUARIO") { 
                filtro += " AND UPPER(CODUSUARIO) = UPPER( '" +constraints[i].initialValue +"' ) " ;
            }
            else if (constraints[i].fieldName == "CODCOLIGADA") { 
                 filtro += " AND CODCOLIGADA = " + constraints[i].initialValue ;
            }            
            else if (constraints[i].fieldName == "CONTRATO") { 
                filtro += " AND CONTRATO like '%" +constraints[i].initialValue + "%' ";
            }

        }
    }    

   
   var myQuery = " SELECT TOP 20  CODIGOCONTRATO, CONTRATO , IDCNT, CODCOLIGADA, CODUSUARIO, CODCPG, CODCOLCFO, CODCFO, CODFILIAL "+  
                   " FROM  (SELECT L.CODTMV, C.IDCNT, CODCPG, C.CODIGOCONTRATO+' - '+C.NOME+' - '+ F.NOMEFANTASIA CONTRATO, C.CODIGOCONTRATO, C.CODCOLIGADA , U.CODUSUARIO, C.CODCCUSTO, C.CODCOLCFO, C.CODCFO, C.CODFILIAL "+  
                   " FROM TCNT C (NOLOCK)  "+
                   " INNER JOIN TCNTCOMPL L (NOLOCK) ON C.CODCOLIGADA = L.CODCOLIGADA AND C.IDCNT = L.IDCNT  "+
                   " INNER JOIN FCFO F (NOLOCK) ON C.CODCOLCFO = F.CODCOLIGADA AND C.CODCFO = F.CODCFO  "+
                   " INNER JOIN TUSUARIOCCUSTO U (NOLOCK) ON C.CODCOLIGADA = U.CODCOLIGADA AND C.CODCCUSTO = U.CODCCUSTO "+
                  // "INNER JOIN GFILIAL G (NOLOCK) ON C.CODCOLIGADA = G.CODCOLIGADA AND C.CODFILIAL = G.CODFILIAL "+           
                   " WHERE   C.CODSTACNT = '0001' ) AS X  "+
                   //"WHERE CODTMV IS NOT NULL AND  CONTRATO like '%1%' AND CODFILIAL = '1' "+
                   " WHERE CODTMV IS NOT NULL AND CODFILIAL = "+ codFilial + filtro +
                   " ORDER BY CONTRATO";

                  log.info("### MINHA QUERY DATASET >>>  "+ myQuery);
    
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

