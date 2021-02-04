function createDataset(fields, constraints, sortFields) {
    try{
    	var dataset = DatasetBuilder.newDataset();
	    var dataSource = "/jdbc/FluigDSRO";
	    var ic = new javax.naming.InitialContext();
	    var ds = ic.lookup(dataSource);
	    var created = false;
        var index = fields[0];
	    var sql = Consultas[index];
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(sql);
        var columnCount = rs.getMetaData().getColumnCount();

        while(rs.next()){
            if(!created){
                for(var i = 1; i <= columnCount; i++) {
                    dataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            
            var Arr = new Array();
            
            for(var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if(null != obj){
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                }
                else{
                    Arr[i - 1] = "null";
                }
            }
            
            dataset.addRow(Arr);
        }
    }
    catch(ex){
        log.error("ERRO: " + ex);
    }
    finally{
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return dataset;
}

var Consultas = [
	"SELECT PW.*, HP.NUM_SEQ_ESTADO FROM PROCES_WORKFLOW PW JOIN HISTOR_PROCES HP ON HP.NUM_PROCES = PW.NUM_PROCES WHERE PW.COD_DEF_PROCES = 'FLUIG-0241' AND PW.LOG_ATIV = 1 AND HP.LOG_ATIV = 1 AND PW.NUM_VERS = (SELECT TOP 1 NUM_VERS FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'FLUIG-0241' ORDER BY NUM_VERS DESC)",
    "SELECT PW.*, HP.NUM_SEQ_ESTADO FROM PROCES_WORKFLOW PW JOIN HISTOR_PROCES HP ON HP.NUM_PROCES = PW.NUM_PROCES WHERE PW.COD_DEF_PROCES = 'FLUIG-0233' AND PW.LOG_ATIV = 1 AND HP.LOG_ATIV = 1 AND PW.NUM_VERS = (SELECT TOP 1 NUM_VERS FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'FLUIG-0233' ORDER BY NUM_VERS DESC)",
    "SELECT NUM_SEQ, NOM_ESTADO FROM ESTADO_PROCES WHERE COD_DEF_PROCES = 'FLUIG-0233' AND NUM_VERS = (SELECT TOP 1 NUM_VERS FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'FLUIG-0233' ORDER BY NUM_VERS DESC) AND IDI_TIP_BPMN IN (10, 80, 65, 68, 82)",
    "SELECT NUM_SEQ, NOM_ESTADO FROM ESTADO_PROCES WHERE COD_DEF_PROCES = 'FLUIG-0241' AND NUM_VERS = (SELECT TOP 1 NUM_VERS FROM PROCES_WORKFLOW WHERE COD_DEF_PROCES = 'FLUIG-0241' ORDER BY NUM_VERS DESC) AND IDI_TIP_BPMN IN (10, 80, 65, 68, 82)",
]