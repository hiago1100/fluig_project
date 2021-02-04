function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		var cpf = removerMask(getParametro(constraints, "CPF").toUpperCase().trim());
		
		if (cpf == ""){
			dataset = DatasetBuilder.newDataset();
	        dataset.addColumn("ERROR");
	        dataset.addColumn("MESSAGE_ERROR");
	        dataset.addRow(new Array(-1, "CPF não informado."));
	        return dataset;
		}
		
		var sentenca = "BK_FUNC_POR_CPF";
		var parametros = "CPF="+cpf;
	    var codigoServico = ServiceManager.getService("RM_FOLHA_WSCONSULTA");
	    var helperServico = codigoServico.getBean();
	    var locatorServico = codigoServico.instantiate("com.totvs.WsConsultaSQL");        
	    var servico = locatorServico.getRMIwsConsultaSQL();
	    
	    var dsAuth = DatasetFactory.getDataset("dsAuthRM", null, null, null);
	    
	    var authServico = helperServico.getBasicAuthenticatedClient(servico, "com.totvs.IwsConsultaSQL", dsAuth.getValue(0, "USUARIO"), dsAuth.getValue(0, "SENHA"));
	    var result = authServico.realizarConsultaSQL(sentenca, 0, "P", parametros);
	    var xmlResultados = new XML(result);
	    
	    for each(item in xmlResultados.Resultado){
    		dataset.addRow(new Array(
    				item.CHAPA.toString(),
    				item.NOME.toString(),
    				item.CODFUNCAO.toString(),
    				item.NOMEFUNCAO.toString(),
    				item.DATAADMISSAO.toString(),
    				item.SITUACAO.toString(),
    				item.DATADEMISSAO.toString(),
    				item.DATADEMISSAO.toString(),
    				item.CODSECAO.toString(),
    				item.NOMESECAO.toString(),
    				item.CODCCUSTO.toString(),
    				item.NOMECCUSTO.toString(),
    				item.CNPJ.toString(),
    				item.DTNASCIMENTO.toString(),
    				item.NATURALIDADE.toString(),
    				item.SEXO.toString(),
    				item.ESTADOCIVIL.toString(),
    				item.NRODEPIRRF.toString(),
    				item.CPF.toString(),
    				item.PISPASEP.toString(),
    				item.CARTIDENTIDADE.toString(),
    				item.ORGEMISSORIDENT.toString(),
    				item.DTEMISSAOIDENT.toString(),
    				item.PAI.toString(),
    				item.MAE.toString(),
    				item.CARTEIRATRAB.toString(),
    				item.SERIECARTTRAB.toString(),
    				item.GRAUINSTRUCAO.toString(),
    				item.DESCGRAUINSTRUCAO.toString(),
    				item.RUA.toString(),
    				item.COMPLEMENTO.toString(),
    				item.BAIRRO.toString(),
    				item.CIDADE.toString(),
    				item.ESTADO.toString(),
    				item.CEP.toString(),
    				item.CODBANCOPAGTO.toString(),
    				item.CODAGENCIAPAGTO.toString(),
    				item.CONTAPAGAMENTO.toString(),
    				item.BKNUMBER.toString(),
    				item.MATRIZ.toString()
    			)); // addRow	    		
	    } // for each
	} catch (e){
        var mensagemErro = e;
        log.error("dsRMAdmDes.createDataset: "+mensagemErro);
        
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("ERROR");
        dataset.addColumn("MESSAGE_ERROR");
        dataset.addRow(new Array(-1, mensagemErro));	
	}
	return dataset;
}

function criarEstrutura(dataset){

	dataset.addColumn("CHAPA", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	dataset.addColumn("CODFUNCAO", DatasetFieldType.STRING);
	dataset.addColumn("NOMEFUNCAO", DatasetFieldType.STRING);
	dataset.addColumn("DATAADMISSAO", DatasetFieldType.STRING);
	dataset.addColumn("SITUACAO", DatasetFieldType.STRING);
	dataset.addColumn("DATADEMISSAO", DatasetFieldType.STRING);
	dataset.addColumn("DATADEMISSAO", DatasetFieldType.STRING);
	dataset.addColumn("CODSECAO", DatasetFieldType.STRING);
	dataset.addColumn("NOMESECAO", DatasetFieldType.STRING);
	dataset.addColumn("CODCCUSTO", DatasetFieldType.STRING);
	dataset.addColumn("NOMECCUSTO", DatasetFieldType.STRING);
	dataset.addColumn("CNPJ", DatasetFieldType.STRING);
	dataset.addColumn("DTNASCIMENTO", DatasetFieldType.STRING);
	dataset.addColumn("NATURALIDADE", DatasetFieldType.STRING);
	dataset.addColumn("SEXO", DatasetFieldType.STRING);
	dataset.addColumn("ESTADOCIVIL", DatasetFieldType.STRING);
	dataset.addColumn("NRODEPIRRF", DatasetFieldType.STRING);
	dataset.addColumn("CPF", DatasetFieldType.STRING);
	dataset.addColumn("PISPASEP", DatasetFieldType.STRING);
	dataset.addColumn("CARTIDENTIDADE", DatasetFieldType.STRING);
	dataset.addColumn("ORGEMISSORIDENT", DatasetFieldType.STRING);
	dataset.addColumn("DTEMISSAOIDENT", DatasetFieldType.STRING);
	dataset.addColumn("PAI", DatasetFieldType.STRING);
	dataset.addColumn("MAE", DatasetFieldType.STRING);
	dataset.addColumn("CARTEIRATRAB", DatasetFieldType.STRING);
	dataset.addColumn("SERIECARTTRAB", DatasetFieldType.STRING);
	dataset.addColumn("GRAUINSTRUCAO", DatasetFieldType.STRING);
	dataset.addColumn("DESCGRAUINSTRUCAO", DatasetFieldType.STRING);
	dataset.addColumn("RUA", DatasetFieldType.STRING);
	dataset.addColumn("COMPLEMENTO", DatasetFieldType.STRING);
	dataset.addColumn("BAIRRO", DatasetFieldType.STRING);
	dataset.addColumn("CIDADE", DatasetFieldType.STRING);
	dataset.addColumn("ESTADO", DatasetFieldType.STRING);
	dataset.addColumn("CEP", DatasetFieldType.STRING);
	dataset.addColumn("CODBANCOPAGTO", DatasetFieldType.STRING);
	dataset.addColumn("CODAGENCIAPAGTO", DatasetFieldType.STRING);
	dataset.addColumn("CONTAPAGAMENTO", DatasetFieldType.STRING);
	dataset.addColumn("BKNUMBER", DatasetFieldType.STRING);
	dataset.addColumn("MATRIZ", DatasetFieldType.STRING);
}

function getParametro(constraints, campo) {
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

function removerMask(cpf){
	//var semMask = cpf.replace(/[^0-9]+/g,'');
	while (cpf.indexOf('.') >= 0){
		cpf = cpf.replace('.', '');
	}
	while (cpf.indexOf('-') >= 0){
		cpf = cpf.replace('-', '');
	}
	while (cpf.indexOf('/') >= 0){
		cpf = cpf.replace('/', '');
	}
	return cpf;
}