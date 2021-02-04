function validateForm(form){
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	log.info("@@@@ validateForm");
	log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	
	
	var errorMsg = ""; 
	var lineBreaker = "</br>";
	/*
	var indexes_itens = form.getChildrenIndexes("table_item_etapa");
	var indexes_componentes = form.getChildrenIndexes("table_componente_item");
	
	if(form.getValue("cd_contrato") == null || form.getValue("cd_contrato").trim()  == ""){
		errorMsg += "O campo Contrato é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("sigla_secao") == null || form.getValue("sigla_secao").trim()  == ""){
		errorMsg += "O campo Seção é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("nm_etapa") == null || form.getValue("nm_etapa").trim()  == ""){
		errorMsg += "O campo Nome é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("matricula_fiscal") == null || form.getValue("matricula_fiscal").trim()  == ""){
		errorMsg += "O campo Fiscal é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("cd_identificador") == null || form.getValue("cd_identificador").trim()  == ""){
		errorMsg += "O campo Identificador é de preenchimento obrigatório!"+lineBreaker;
	}
		
	if(form.getValue("ds_sigla_tipo_etapa") == null || form.getValue("ds_sigla_tipo_etapa").trim()  == ""){
		errorMsg += "O campo Tipo da Etapa é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("natureza") == null || form.getValue("natureza").trim()  == ""){
		errorMsg += "O campo Natureza é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("cd_natureza_tributaria") == null || form.getValue("cd_natureza_tributaria").trim()  == ""){
		errorMsg += "O campo Natureza Tributária é de preenchimento obrigatório!"+lineBreaker;
	}
		
	if(form.getValue("metodo_aceitacao") == null || form.getValue("metodo_aceitacao").trim()  == ""){
		errorMsg += "O campo Método de Aceitação é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("ds_descricao") == null || form.getValue("ds_descricao").trim()  == ""){
		errorMsg += "O campo Descrição é de preenchimento obrigatório!"+lineBreaker;
	}
		
	if(form.getValue("dt_apresentacao") == null || form.getValue("dt_apresentacao").trim()  == ""){
		errorMsg += "O campo Data Apresentação é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if(form.getValue("dt_apresentacao_realizado") == null || form.getValue("dt_apresentacao_realizado").trim()  == ""){
		errorMsg += "O campo Data Apresentação Realizado é de preenchimento obrigatório!"+lineBreaker;
	}
	
	if((indexes_itens.length == 0 || indexes_componentes.length == 0) && form.getValue("considera_valor_caput") == "nao"){
		errorMsg += "O campo Considerar valor do caput da etapa deve ser selecionado com a opção 'Sim' quando não há cadastro de itens e/ou componentes!"+lineBreaker;
	}
	
	if((form.getValue("vl_etapa") == null && form.getValue("considera_valor_caput") == "sim") || (form.getValue("vl_etapa").trim() == "" && form.getValue("considera_valor_caput") == "sim")){
		errorMsg += "O campo Valor da Etapa é de preenchimento obrigatório quando campo Considerar valor do caput da etapa estiver marcado como 'Sim'!"+lineBreaker;
	}

	if(form.getValue("situacao_fisica") == "cancelada" && (form.getValue("justificativa").trim()  == "" || form.getValue("justificativa").trim()  == null)){
		errorMsg += "O campo Justificativa é de preenchimento obrigatório quando a etapa está Cancelada!"+lineBreaker;
	}
	*/
	 
	/////////////////////////////////////////////////////
	//validação dos indicadores
	/////////////////////////////////////////////////////
    var indexes = form.getChildrenIndexes("tb_indicador");
    log.info("@@@@@@@@@@@");
    log.info("@@@@ indexes -" + indexes.length);
    
    for (var i = 0; i < indexes.length; i++) 
    {
    	if (form.getValue("ds_indicador___" + indexes[i]) == "") 
    	{
    		errorMsg += "O Preenchimento do Indicador é obrigatorio! (Indicadores)" + lineBreaker;
    	}
    	if (form.getValue("ds_valor___" + indexes[i]) == "") 
    	{
    		errorMsg += "O Preenchimento do campo Valor é obrigatorio! (Indicadores)" + lineBreaker;
    	}
    }

    var indexes = form.getChildrenIndexes("table_versoes");
	
    if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
        	
            if(form.getValue('tb_versao_etapa___' + indexes[i]) == null || form.getValue('tb_versao_etapa___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'Versão' não foi preenchido!"+lineBreaker;  
            }  
            if(form.getValue('tb_dt_versao___' + indexes[i]) == null || form.getValue('tb_dt_versao___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'Data' não foi preenchido!"+lineBreaker;  
            }  
            if(form.getValue('tb_cd_usuario_versao___' + indexes[i]) == null || form.getValue('tb_cd_usuario_versao___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'cd_usuario_versaoa' não foi preenchido!"+lineBreaker;  
            }  
            if(form.getValue('tb_nm_usuario_versao___' + indexes[i]) == null || form.getValue('tb_nm_usuario_versao___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'Usuário' não foi preenchido!"+lineBreaker;  
            }  
            if(form.getValue('situacao_versao___' + indexes[i]) == null || form.getValue('situacao_versao___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'Situação da Versão' não foi preenchido!"+lineBreaker;  
            }  
            if(form.getValue('tb_ds_versao_etapa___' + indexes[i]) == null || form.getValue('tb_ds_versao_etapa___' + indexes[i]).trim() == '') {
            	mensagemErro+= "\n\t Versões:  Campo 'Descritivo' não foi preenchido!"+lineBreaker;  
            } 
        }
    }
    
    if (errorMsg != "") { 
		throw errorMsg; 
	}
	
	
	
	
}