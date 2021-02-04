function createDataset(fields, constraints, sortFields) {
	var filtroRazaoSocial = "";
	var filtroNomeFantasia = "";
	var filtroCNPJ = ""; 
	var filtroNrContrato = "";
	var filial = "";
	
//	var filtroRazaoSocial = "Global Village";
//	var filtroNomeFantasia = "";
//	var filtroCNPJ = ""; 
//	var filtroNrContrato = "";
//	var filial = "00101";
	
	
	var datasetConsultaContratos;
	var datasetConsultaContratoFornecedor;
	var datasetConsultaFornecedores;
	
	if(constraints != null && constraints != undefined && constraints.length > 0){
		var campo = "";
		var valor = "";
		
		for (var i = 0; i < constraints.length; i++) {
			if(constraints[i]["fieldName"] == "filial"){
				
				filial = constraints[i]["initialValue"];
				
			}else if(constraints[i]["fieldName"] == "codigoContrato"){
				filtroNrContrato = constraints[i]["initialValue"];
				if((filtroNrContrato+"").length < 15){
					for(var y = (filtroNrContrato+"").length; y < 15 ; y++){
						filtroNrContrato = "0"+filtroNrContrato;
					}
				}
			}else if(constraints[i]["fieldName"] == "razaoSocial"){
				
				filtroRazaoSocial = constraints[i]["initialValue"];
				
			}else if(constraints[i]["fieldName"] == "nomeFantasia"){
				
				filtroNomeFantasia = constraints[i]["initialValue"];
				
			}else if(constraints[i]["fieldName"] == "cnpj"){
				filtroCNPJ = constraints[i]["initialValue"];
			}
		}
	}
	/*
	log.info("================= consultaContratos filtroRazaoSocial #"+filtroRazaoSocial+"#");
	log.info("================= consultaContratos filtroNomeFantasia #"+filtroNomeFantasia+"#");
	log.info("================= consultaContratos filtroCNPJ #"+filtroCNPJ+"#");
	log.info("================= consultaContratos filtroNrContrato #"+filtroNrContrato+"#");
	log.info("================= consultaContratos filial #"+filial+"#");
	*/
	
	if(filtroNrContrato != ""){
		log.info("================= busca por nr de contrato ");
		var filtroContratoFornecedor = "";
		var filtroFornecedor = "";
		//consulta contratos
		datasetConsultaContratos = consultaContratos(filial, "CN9_NUMERO = '"+filtroNrContrato+"' AND CN9_REVATU = '' AND CN9_SITUAC = '05' ");
		
		
		//cria filtro contrato x Fornecedor
		for(var i=0; i < datasetConsultaContratos.rowsCount; i++){
			if(filtroContratoFornecedor != "" && filtroContratoFornecedor.indexOf(datasetConsultaContratos.getValue(i,"CN9_NUMERO")) == -1 ){
				filtroContratoFornecedor = filtroContratoFornecedor + "OR CNC_NUMERO = '" +datasetConsultaContratos.getValue(i,"CN9_NUMERO")+"'";
			}else if(filtroContratoFornecedor == ""){
				filtroContratoFornecedor = filtroContratoFornecedor + "(CNC_NUMERO = '" +datasetConsultaContratos.getValue(i,"CN9_NUMERO")+"'";
			}
		}
		filtroContratoFornecedor = filtroContratoFornecedor + ") AND CNC_REVISA = ''";
		
		//consulta contrato x Fornecedor
		datasetConsultaContratoFornecedor = consultaContratosFornecedor(filial, filtroContratoFornecedor);
		
		var outrosFiltros = false;
		if(filtroCNPJ != ""){
			filtroFornecedor += " A2_CGC = '"+filtroCNPJ+"' AND "; 
			outrosFiltros = true;
		}
		if(filtroRazaoSocial != ""){
			filtroFornecedor += " A2_NOME LIKE '%"+filtroRazaoSocial+"%' AND "; 
			outrosFiltros = true;
		}
		if(filtroNomeFantasia != ""){
			filtroFornecedor += " A2_NREDUZ LIKE '%"+filtroNomeFantasia+"%' AND "; 
			outrosFiltros = true;
		}
		if(outrosFiltros){
			filtroFornecedor += " ( ";
		}
		//cria filtro Fornecedor
		for(var i=0; i< datasetConsultaContratoFornecedor.rowsCount; i++){
			if(i>0){
				filtroFornecedor += " OR ";
			}
			filtroFornecedor = filtroFornecedor + 
			"(A2_COD = '" + datasetConsultaContratoFornecedor.getValue(i,"CNC_CODIGO")+"' AND "+
			"A2_LOJA = '" + datasetConsultaContratoFornecedor.getValue(i,"CNC_LOJA")+"')";
		}
		if(outrosFiltros){
			filtroFornecedor += " ) "; 
		}
		
		//consulta contrato x Fornecedor
		datasetConsultaFornecedores = consultaFornecedores(filtroFornecedor);	
	}else if(filtroRazaoSocial != "" || filtroNomeFantasia != "" || filtroCNPJ != ""){
		log.info("================= busca por cnpj/razao/fantasia ");
		var filtroContratoFornecedor = "";
		var filtroFornecedor = "";
		var filtroContrato = "";
		
		log.info("================= filtroRazaoSocial "+filtroRazaoSocial);
		log.info("================= filtroNomeFantasia "+filtroNomeFantasia);
		log.info("================= filtroCNPJ "+filtroCNPJ);
		
		if(filtroRazaoSocial != ""){
			log.info("================= adicionando filtro por razao social ");
			filtroFornecedor = "A2_NOME LIKE '%"+filtroRazaoSocial+"%'"
		}if(filtroNomeFantasia != ""){
			log.info("================= adicionando filtro por nome fantasia ");
			if(filtroFornecedor != ""){
				filtroFornecedor = filtroFornecedor +" AND ";
			}
			filtroFornecedor = filtroFornecedor+ "A2_NREDUZ LIKE '%"+filtroNomeFantasia+"%'";
		}if(filtroCNPJ != ""){
			log.info("================= adicionando filtro por cnpj ");
			if(filtroFornecedor != ""){
				filtroFornecedor = filtroFornecedor +" AND ";
			}
			filtroFornecedor = filtroFornecedor+ "A2_CGC = '"+filtroCNPJ+"'";
		}
		
		log.info("================= filtroFornecedor "+filtroFornecedor);
		//consulta contrato x Fornecedor
		datasetConsultaFornecedores = consultaFornecedores(filtroFornecedor);
		
		//cria filtro contrato x Fornecedor
		for(var i=0; i < datasetConsultaFornecedores.rowsCount; i++){
			if(filtroContratoFornecedor != "" && filtroContratoFornecedor.indexOf(datasetConsultaFornecedores.getValue(i,"A2_COD")) == -1 ){
				filtroContratoFornecedor = filtroContratoFornecedor + " OR (CNC_CODIGO = '" +datasetConsultaFornecedores.getValue(i,"A2_COD") +"' AND CNC_LOJA = "+datasetConsultaFornecedores.getValue(i,"A2_LOJA")+")";

			}else if(filtroContratoFornecedor == ""){
				
				filtroContratoFornecedor = filtroContratoFornecedor + "((CNC_CODIGO = '" +datasetConsultaFornecedores.getValue(i,"A2_COD") +"' AND CNC_LOJA = "+datasetConsultaFornecedores.getValue(i,"A2_LOJA")+")";
			}
		}
		filtroContratoFornecedor = filtroContratoFornecedor + ") AND CNC_REVISA = ''";
		
		//consulta contrato x Fornecedor
		datasetConsultaContratoFornecedor = consultaContratosFornecedor(filial, filtroContratoFornecedor);	
		
		
		//cria filtro Fornecedor
		for(var i=0; i< datasetConsultaContratoFornecedor.rowsCount; i++){
			
			
			if(filtroContrato != "" && filtroContrato.indexOf(datasetConsultaContratoFornecedor.getValue(i,"CNC_NUMERO")) == -1){
				filtroContrato = filtroContrato + " OR CN9_NUMERO = '" + datasetConsultaContratoFornecedor.getValue(i,"CNC_NUMERO")+"'";
			}else{
				filtroContrato = filtroContrato + "CN9_NUMERO = '" + datasetConsultaContratoFornecedor.getValue(i,"CNC_NUMERO")+"'";
			}
		}
		
		if(filtroContrato != ""){
			filtroContrato = "("+filtroContrato + ") AND CN9_REVATU = '' AND CN9_SITUAC = '05' ";
		}else{
			filtroContrato = "CN9_REVATU = '' AND CN9_SITUAC = '05' ";
		}
		
		log.info("================= filtroContrato "+filtroContrato);
		//consulta contratos
		datasetConsultaContratos = consultaContratos(filial, filtroContrato);
		
		
	}
	
	var datasetRetorno = mergeDados(datasetConsultaContratos, datasetConsultaContratoFornecedor, datasetConsultaFornecedores);
	return datasetRetorno;
	
}

function consultaContratos(filial, filtros){
	log.info("====================================");
	log.info("================= metodo consultaContratos filial |"+filial+"|");
	log.info("================= metodo consultaContratos filtros |"+filtros+"|");
	var datasetConsultaContratos = DatasetFactory.getDataset("consultaDadosProtheus", ["CN9___"+filial,filtros,"CN9_FILIAL,CN9_TPCTO,CN9_NUMERO,CN9_SITUAC,CN9_DTINIC,CN9_DTASSI,CN9_ZDTASS,CN9_DTFIM,CN9_CONDPG,CN9_VLINI,CN9_VLATU,CN9_SALDO,CN9_INDICE"], null, null);
	log.info("================= metodo consultaContratos retorno "+datasetConsultaContratos.rowsCount);
	log.info("====================================");
	return datasetConsultaContratos;
}

function consultaContratosFornecedor(filial, filtros){
	log.info("====================================");
	log.info("================= metodo consultaContratosFornecedor filial |"+filial+"|");
	log.info("================= metodo consultaContratosFornecedor filtros |"+filtros+"|");
	var datasetConsultaContratoFornecedor = DatasetFactory.getDataset("consultaDadosProtheus", ["CNC___"+filial,filtros,"CNC_FILIAL,CNC_NUMERO,CNC_CODIGO,CNC_LOJA,CNC_REVISA"], null, null);
	log.info("================= metodo consultaContratosFornecedor retorno "+datasetConsultaContratoFornecedor.rowsCount);
	log.info("====================================");
	return datasetConsultaContratoFornecedor;
}

function consultaFornecedores(filtros){
	log.info("====================================");
	log.info("================= metodo consultaFornecedores filtros |"+filtros+"|");
	var datasetConsultaFornecedores = DatasetFactory.getDataset("consultaDadosProtheus", ["SA2",filtros,"A2_COD,A2_LOJA,A2_NOME,A2_CGC,A2_NREDUZ"], null, null);
	log.info("================= metodo consultaFornecedores retorno "+datasetConsultaFornecedores.rowsCount);
	log.info("====================================");
	return datasetConsultaFornecedores;
}

function mergeDados(datasetConsultaContratos, datasetConsultaContratoFornecedor, datasetConsultaFornecedores){
	log.info("====================================");
	log.info("================= metodo mergeDados ");
	log.info("================= metodo mergeDados datasetConsultaContratos "+datasetConsultaContratos.rowsCount);
	log.info("================= metodo mergeDados datasetConsultaContratoFornecedor "+datasetConsultaContratoFornecedor.rowsCount);
	log.info("================= metodo mergeDados datasetConsultaFornecedores "+datasetConsultaFornecedores.rowsCount);
	var datasetRetorno = DatasetBuilder.newDataset();
	datasetRetorno.addColumn("numeroContrato");
	datasetRetorno.addColumn("situacao");
	datasetRetorno.addColumn("dtInicio");
	datasetRetorno.addColumn("dtAssinatura");
	datasetRetorno.addColumn("dtFim");
	datasetRetorno.addColumn("condPagamento");
	datasetRetorno.addColumn("vlInicial");
	datasetRetorno.addColumn("vlAtual");
	datasetRetorno.addColumn("saldo");
	datasetRetorno.addColumn("cdFornecedor");
	datasetRetorno.addColumn("loja");
	datasetRetorno.addColumn("cnpj");
	datasetRetorno.addColumn("razaoSocial");
	datasetRetorno.addColumn("nomeFantasia");
	
	loopContrato:
	for(var contContrato=0; contContrato< datasetConsultaContratos.rowsCount; contContrato++){
		loopContratoFornecedor:
		for(var contContratoFornec=0; contContratoFornec< datasetConsultaContratoFornecedor.rowsCount; contContratoFornec++){
			log.info("================= metodo mergeDados comparacao1 "+datasetConsultaContratos.getValue(contContrato,"CN9_NUMERO") +" - "+  datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_NUMERO"));
				loopFornecedor:
				for(var contFornec=0; contFornec< datasetConsultaFornecedores.rowsCount; contFornec++){
					log.info("================= metodo mergeDados comparacao2 "+datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_CODIGO") +" - "+ datasetConsultaFornecedores.getValue(contFornec,"A2_COD"));
					log.info("================= metodo mergeDados comparacao3 "+datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_LOJA") +" - "+ datasetConsultaFornecedores.getValue(contFornec,"A2_LOJA"));
					if(datasetConsultaContratos.getValue(contContrato,"CN9_NUMERO") == datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_NUMERO") &&
							datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_CODIGO") == datasetConsultaFornecedores.getValue(contFornec,"A2_COD") && 
							datasetConsultaContratoFornecedor.getValue(contContratoFornec,"CNC_LOJA") == datasetConsultaFornecedores.getValue(contFornec,"A2_LOJA") ){
						log.info("================= metodo mergeDados criando dados");
						datasetRetorno.addRow([
					         datasetConsultaContratos.getValue(contContrato,"CN9_NUMERO"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_SITUAC"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_DTINIC"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_DTASSI"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_DTFIM"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_CONDPG"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_VLINI"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_VLATU"),
					         datasetConsultaContratos.getValue(contContrato,"CN9_SALDO"),
					         
					         datasetConsultaFornecedores.getValue(contFornec,"A2_COD"),
					         datasetConsultaFornecedores.getValue(contFornec,"A2_LOJA"),
					         datasetConsultaFornecedores.getValue(contFornec,"A2_CGC"),
					         datasetConsultaFornecedores.getValue(contFornec,"A2_NOME"),
					         datasetConsultaFornecedores.getValue(contFornec,"A2_NREDUZ")
						]);
						continue loopContratoFornecedor;
					}
				}
		}
	}
	log.info("==================================== datasetRetorno "+datasetRetorno.rowsCount);
	return datasetRetorno;
}