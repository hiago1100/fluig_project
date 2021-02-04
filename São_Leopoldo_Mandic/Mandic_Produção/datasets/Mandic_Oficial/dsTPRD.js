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
    

    var filtro = " ";
    
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            
            if (constraints[i].fieldName == "CODCOLIGADA") { 
                filtro += " AND CODCOLIGADA = " +constraints[i].initialValue; 
            }
             else if (constraints[i].fieldName == "CODFILIAL") { 
                filtro += " AND CODFILIAL = " +constraints[i].initialValue; 
                }
                else if (constraints[i].fieldName == "CODCOLOC") { 
                    filtro += " AND CODLOC = '" +constraints[i].initialValue+"'"; 
                    }
                    else if (constraints[i].fieldName == "TIPO") { 
                    filtro += " AND TIPO = '" +constraints[i].initialValue+"'"; 
                    }
                    else if (constraints[i].fieldName == "ESTOCAVEL") { 
                    filtro += " AND ESTOCAVEL = '" +constraints[i].initialValue+"'"; 
                    }
                    else if (constraints[i].fieldName == "PRODUTO") { 
                        filtro += " AND PRODUTO like '%" +constraints[i].initialValue + "%'"; 
                    }
                     else if (constraints[i].fieldName == "IDCNT") { 
                        filtro += " AND IDPRD IN ( SELECT IDPRD FROM TITMCNT WHERE CODCOLIGADA = C.CODCOLIGADA AND IDCNT = " +constraints[i].initialValue +" ) " ; 
                        }
        }
    } 

    var myQuery = " SELECT TOP 100 IDPRD, CODCOLIGADA, CODIGOPRD, PRODUTO, IDPRD, CODFILIAL, ESTOCAVEL, CUSTOUNITARIO " + 
                  " FROM ( SELECT ISNULL(CAST(L.CUSTOUNITARIO AS NUMERIC(10,3)),0) CUSTOUNITARIO, P.TIPO, L.CODLOC, CASE WHEN F.ESTOCAVEL = 1 THEN 'SIM' ELSE 'NAO' END ESTOCAVEL, P.INATIVO, F.CODFILIAL, P.ULTIMONIVEL, P.IDPRD, P.CODCOLIGADA, P.CODIGOPRD, "+
                  "                     P.CODIGOPRD + ' - ' + P.NOMEFANTASIA + "+
                  "                     CASE WHEN P.CODIGOAUXILIAR IS NULL THEN ' ' ELSE ' - Ref: '+P.CODIGOAUXILIAR END + "+
                  "                     CASE WHEN D.IDMARCA IS NULL THEN ' ' ELSE ' - Marca : '+M.DESCMARCA END PRODUTO "+
                  " FROM TPRD P (NOLOCK) " +
                  "  INNER JOIN TPRODUTODEF D (NOLOCK) ON P.CODCOLIGADA = D.CODCOLIGADA AND P.IDPRD = D.IDPRD "+
                  "  LEFT JOIN TPRDFIL F (NOLOCK) ON P.CODCOLIGADA = F.CODCOLIGADA AND P.IDPRD = F.IDPRD " +
                  "  LEFT JOIN TPRDLOC L (NOLOCK) ON P.CODCOLIGADA = L.CODCOLIGADA AND P.IDPRD = L.IDPRD AND L.CODFILIAL = F.CODFILIAL " +
                  "  LEFT JOIN TMARCA M (NOLOCK) ON M.CODCOLIGADA = D.CODCOLMARCA AND M.IDMARCA = D.IDMARCA ) AS C  "+
                  " WHERE INATIVO = 0 AND ULTIMONIVEL = 1 " + filtro +
                  " ORDER BY PRODUTO ";
    
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