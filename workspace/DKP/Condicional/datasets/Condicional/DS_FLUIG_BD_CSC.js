function createDataset(fields, constraints, sortFields) {
	
	log.warn("Executando o dataset DS_FLUIG_BD_CSC");
	
    var newDataset = DatasetBuilder.newDataset();

	var myQuery = "";

	if (fields != null) 
	{
		myQuery = fields[0];
	}
	else
	{
		//var myQuery = "select * from FDN_USERTENANT where user_id = 2";
		throw "PARÂMETROS OBRIGATÓRIOS NÃO FORAM PASSADOS.";
	}
	
    log.warn("QUERY: " + myQuery);

    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    try 
	{
		if (fields[1] == "CONSULTA")
		{
			log.warn("CONSULTANDO...");
  			var conn = ds.getConnection();
	        var stmt = conn.createStatement();
	        var rs = stmt.executeQuery(myQuery);

	        var columnCount = rs.getMetaData().getColumnCount();
	
	        while (rs.next()) 
			{
	            if (!created) 
				{
	                for (var i = 1; i <= columnCount; i++) 
					{
	                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
	                }
	
	                created = true;
	            }
	
	            var Arr = new Array();
	
	            for (var i = 1; i <= columnCount; i++) 
				{
	                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
	
	                if (null != obj) 
					{
	                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
	                } 
					else 
					{
	                    Arr[i - 1] = "null";
	                }
	            }
	
	            newDataset.addRow(Arr);
	        }

		}
		else
		{
			var conn = ds.getConnection();
        	var stmt = conn.createStatement();
	       	var rs = stmt.executeUpdate(myQuery);
	
			log.warn("INSERINDO...");
			
			newDataset.addColumn("Result");
 			newDataset.addRow((new Array("true")));
		}
    } 
	catch (err) 
	{
    	var mensagem = 
			"ERRO AO EXECUTAR O DATASET - DS_FLUIG_BD_CSC - DETALHES DO ERRO: " + err.message;
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++")
		log.error("ERRO AO EXECUTAR O DATASET - DS_FLUIG_BD_CSC");
		log.error("DETALHES DO ERRO: " + err);
		log.error("QUERY: " + myQuery);
		log.error("+++++++++++++++++++++++++++++++++++++++++++++++++++");
		newDataset.addRow(new Array(mensagem));
		return newDataset;
    } 
	finally 
	{
        if (stmt != null) 
		{
            stmt.close();
        }

        if (conn != null) 
		{
            conn.close();
        }
    }
	
    return newDataset;
}