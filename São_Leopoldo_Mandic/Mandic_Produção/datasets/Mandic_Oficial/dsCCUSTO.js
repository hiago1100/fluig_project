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
        	if (constraints[i].fieldName == "CODUSUARIO") { 
                filtro += " AND CODUSUARIO = '" +constraints[i].initialValue + "'"; 
            }
        	 else if (constraints[i].fieldName == "CODCOLIGADA") { 
                 filtro += " AND CODCOLIGADA = " +constraints[i].initialValue; 
             } 
             else  if (constraints[i].fieldName == "CODFILIAL") { 
                 filtro += " AND CODFILIAL = " +constraints[i].initialValue; 
                 } 
                 else if (constraints[i].fieldName == "CODCCUSTO") { 
                     filtro += " AND CODCCUSTO = '" +constraints[i].initialValue+"'"; 
                     } 
                     else if (constraints[i].fieldName == "CENTROCUSTO") { 
                            filtro += " AND CENTROCUSTO like '%" +constraints[i].initialValue + "%'"; 
                        } else if (constraints[i].fieldName == "IDCNT") { 
                                filtro += " AND CODCCUSTO IN (SELECT CODCCUSTO FROM TITMCNT WHERE CODCOLIGADA = X.CODCOLIGADA AND IDCNT = " +constraints[i].initialValue+" )"; 
                                
                            } 

        }
    }   
    
    var myQuery = " SELECT DISTINCT CODCOLIGADA, CODFILIAL,  CODCCUSTO,  APROVADOR, APELIDO_APROVADOR, CENTROCUSTO, "+
    			  " (	SELECT USER_CODE  "+
    			  " FROM FLUIG_PRODUCAO.DBO.FDN_USERTENANT "+
    			  " WHERE LOGIN = APROVADOR COLLATE Latin1_General_CI_AS) MATRICULA "+
    			  " FROM ( SELECT G.ATIVO, G.PERMITELANC, G.CODCCUSTO, G.CODCOLIGADA, P.CODFILIAL, U.CODUSUARIO, G.CODCCUSTO + ' - ' + G.NOME CENTROCUSTO, "+
    			  " 		CASE WHEN F.CHAPA IS NULL  "+
    			  " 		THEN CASE WHEN ISNULL(PF.CODSITUACAO,'A') = 'A' THEN P.APROVADOR ELSE P.APROVADORSUB END "+
    			  " 		ELSE CASE WHEN FP.CHAPA IS NULL "+
    			  " 					THEN CASE WHEN ISNULL(PFS.CODSITUACAO,'A') = 'A' THEN P.APROVADORSUB ELSE 'SEM APROVADOR' END "+
    			  " 					ELSE 'SEM APROVADOR' "+
    			  " 			 END  "+
    			  " 		END APROVADOR, "+
    			  " 		CASE WHEN F.CHAPA IS NULL  "+
    			  " 		THEN CASE WHEN ISNULL(PF.CODSITUACAO,'A') = 'A' THEN PU.NOME ELSE PS.NOME END "+
    			  " 		ELSE CASE WHEN FP.CHAPA IS NULL "+
    			  " 					THEN CASE WHEN ISNULL(PFS.CODSITUACAO,'A') = 'A' THEN PS.NOME ELSE 'SEM APROVADOR' END "+
    			  " 					ELSE 'SEM APROVADOR' "+
    			  " 			 END "+
    			  "    		 END APELIDO_APROVADOR  "+
    			  " 	FROM GCCUSTO G(NOLOCK)  "+
    			  " 		     LEFT JOIN TUSUARIOCCUSTO U (NOLOCK) ON G.CODCOLIGADA = U.CODCOLIGADA AND G.CODCCUSTO = U.CODCCUSTO  "+
    			  " 		     LEFT JOIN ZMDAPROVADOR P (NOLOCK) ON P.CODCOLIGADA = G.CODCOLIGADA AND P.CODCCUSTO = G.CODCCUSTO  "+
    			  " 		     LEFT JOIN PPESSOA PU (NOLOCK) ON P.APROVADOR = PU.CODUSUARIO  "+
    			  "   		     LEFT JOIN PFUNC PF (NOLOCK) ON PU.CODIGO = PF.CODPESSOA AND PF.CODSITUACAO <> 'D'  "+
    			  " 			 LEFT JOIN PFUFERIASPER F ON F.CODCOLIGADA = P.CODCOLIGADA AND F.CHAPA = PF.CHAPA AND F.DATAINICIO <= GETDATE() AND F.DATAFIM >= GETDATE() "+	
    			  " 			 LEFT JOIN PPESSOA PS (NOLOCK) ON P.APROVADORSUB = PS.CODUSUARIO  "+
    			  " 			 LEFT JOIN PFUNC PFS (NOLOCK) ON PS.CODIGO = PFS.CODPESSOA AND PFS.CODSITUACAO <>'D'  "+
    			  "      		 LEFT JOIN PFUFERIASPER FP ON FP.CODCOLIGADA = P.CODCOLIGADA AND FP.CHAPA = PFS.CHAPA AND FP.DATAINICIO <= GETDATE() AND FP.DATAFIM >= GETDATE() ) X "+	
    	          "     WHERE ATIVO = 'T' AND PERMITELANC = 'T' "+filtro+
                  "     ORDER BY CENTROCUSTO ";
    
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