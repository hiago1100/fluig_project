function inserirNumeracaoPA(){
	var numeroAtual = consultaNumeroPAAtual();
	gravaProximoNumeroPA(parseInt(numeroAtual)+1);
	
	var txtNumero = "0000000000" + numeroAtual;
	txtNumero = txtNumero.substring(txtNumero.length - 11) + hAPI.getCardValue("anoOcorrencia");

	hAPI.setCardValue("numeroPA",txtNumero);
}

function consultaNumeroPAAtual(){
	var minhaQuery = "SELECT COD_PROX_ID FROM SEQ_ECM WHERE COD_EMPRESA = " + getValue("WKCompany") + " AND CD_TABELA = 'PA" + hAPI.getCardValue("anoOcorrencia") + "'";
	
	var dataSource = "/jdbc/FluigDSRO";
	
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	
	var obj = 1;
	
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(minhaQuery);

		while(rs.next()) {
			
			obj = rs.getObject("COD_PROX_ID");

		}
		
	}catch(e){
		return 0;
	}finally{
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();
	}
	
	return obj;
}

function gravaProximoNumeroPA(proxNumero){

	var minhaQuery = (parseInt(proxNumero) == 2 ? "INSERT INTO SEQ_ECM (COD_EMPRESA,CD_TABELA,COD_PROX_ID) VALUES ("+getValue("WKCompany")+",'PA"+hAPI.getCardValue("anoOcorrencia")+"',"+proxNumero+")" : "UPDATE SEQ_ECM SET COD_PROX_ID = "+proxNumero+" WHERE COD_EMPRESA = "+getValue("WKCompany")+" AND CD_TABELA = 'PA"+hAPI.getCardValue("anoOcorrencia")+"'");

	var dataSource = "/jdbc/FluigDSRO";

	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeUpdate(minhaQuery);
	}catch(e){
		
	}finally{
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();	
	}
}