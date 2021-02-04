function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		var cpf = getParametroStr(constraints, "CPF").toUpperCase();
				
		var codSentenca = "BK_FUNCPORCPF";  
	    var codColigada = 0; 
	    var codSistema  = "P";
	    var parametros = "CPF=%"+cpf+"%";
	    
	    var codigoServico  = ServiceManager.getService("RM_FOLHA_WSCONSULTA");
	    var helperServico  = codigoServico.getBean();
	    var locatorServico = codigoServico.instantiate("com.totvs.WsConsultaSQL");        
	    var servico        = locatorServico.getRMIwsConsultaSQL();
	    
	    var dsAuth = DatasetFactory.getDataset("dsAuthRM", null, null, null);
	    
	    var authServico    = helperServico.getBasicAuthenticatedClient(servico, "com.totvs.IwsConsultaSQL", dsAuth.getValue(0, "USUARIO"), dsAuth.getValue(0, "SENHA"));
	    var result         = authServico.realizarConsultaSQL(codSentenca, codColigada, codSistema, parametros);
	    var xmlResultados = new XML(result);
	    
	    for each(item in xmlResultados.Resultado){
	    	dataset.addRow(new Array(
	    				item.CHAPA.toString(),
	    				item.CPF.toString(),	
	    				item.NOME.toString(),
	    				formatarData(item.DATAADMISSAO.toString()),
	    				item.CODFUNCAO.toString(),
	    				item.CODFUNCAO.toString() + ' - ' + item.NOMEFUNCAO.toString(),
	    				item.GRAUINSTRUCAO.toString(),
	    				item.DESCRICAO.toString(),
	    				item.CODSECAO.toString(),
	    				item.NOMSECAO.toString(),
	    				item.NUMCENTROCUSTO.toString(),
	    				item.NUMCENTROCUSTO.toString() + ' - ' + item.NOMECENTROCUSTO.toString(),
	    				item.CODHORARIO.toString(),
	    				item.CODHORARIO.toString() + ' - ' + item.NOMHORARIO.toString(),
	    				item.SALARIO.toString()
	    			)); // addRow
	    } // for each
	} catch (e){
        var mensagemErro = e;
        log.error("dsDadosFuncionarioRM.createDataset: "+mensagemErro);
        
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("ERROR");
        dataset.addColumn("MESSAGE_ERROR");
        dataset.addRow(new Array(-1, mensagemErro));	
	}
	return dataset;
}

function criarEstrutura(dataset){
	dataset.addColumn("CHAPA", DatasetFieldType.STRING);
	dataset.addColumn("CPF", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	dataset.addColumn("DATAADMISSAO", DatasetFieldType.DATE);
	dataset.addColumn("CODFUNCAO", DatasetFieldType.STRING);
	dataset.addColumn("NOMFUNCAO", DatasetFieldType.STRING);
	dataset.addColumn("GRAUINSTRUCAO", DatasetFieldType.STRING);
	dataset.addColumn("DESCRICAO", DatasetFieldType.STRING);
	dataset.addColumn("CODSECAO", DatasetFieldType.STRING);
	dataset.addColumn("NOMSECAO", DatasetFieldType.STRING);
	dataset.addColumn("NUMCENTROCUSTO", DatasetFieldType.STRING);
	dataset.addColumn("NOMECENTROCUSTO", DatasetFieldType.STRING);
	dataset.addColumn("CODHORARIO", DatasetFieldType.STRING);
	dataset.addColumn("NOMHORARIO", DatasetFieldType.STRING);
	dataset.addColumn("SALARIO", DatasetFieldType.STRING);
}

function getParametroStr(constraints, campo) {
	var valor = "";
	if ((constraints != null) && (constraints.length > 0)) {
		for each(con in constraints) {
			if (con.getFieldName().trim().toUpperCase() == campo.trim().toUpperCase()) {
				valor = con.getInitialValue();
				break;
			}
		}
	}
	return valor;
}

function formatarData(data){
	if (data == null || data == undefined || data == ""){
		return "";
	}
	
	return data;
	// 2018-01-01T0:0:00:000
	var dataStr = data.split('T')[0];
	
	var novaData = dataStr.split("-")[0] + "/" + dataStr.split("-")[1] + "/" + dataStr.split("-")[2];
	return novaData;
}