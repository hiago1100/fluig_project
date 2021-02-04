function validateForm(form){
	var CURRENT_STATE 	= getValue("WKNumState");
	var COMPLETED_TASK 	= (getValue("WKCompletTask")=="true");
	var errorMsg 		= ""; 
	var lineBreaker 	= "\n";
	
	if (COMPLETED_TASK) {	
		if(CURRENT_STATE == 4){
			
			if(form.getValue("tipoPagamento") == ""){
				errorMsg += "Campo Banco/Boleto é obrigatório!"+lineBreaker;
			}
			
			if(form.getValue("tipoPagamento") == "Banco"){
				if(form.getValue("idbanco") == null || form.getValue("idbanco").isEmpty()){
					errorMsg += "Campo banco é obrigatório, preencha o campo fornecedor!"+lineBreaker;
				}
			}
			
			if(form.getValue("fornecedor") == null || form.getValue("fornecedor").isEmpty()){
				errorMsg += "Campo fornecedor é obrigatório!"+lineBreaker; 
			}
			
			if(form.getValue("valor") == null || form.getValue("valor").isEmpty()){
				errorMsg += "Campo valor é obrigatório!"+lineBreaker;
			}
			
			if(form.getValue("dataNecessidade") == null || form.getValue("dataNecessidade").isEmpty()){
				errorMsg += "Campo data da necessidade é obrigatório!"+lineBreaker;
			}
			
			if(form.getValue("centrocusto") == null || form.getValue("centrocusto").isEmpty()){
				errorMsg += "Campo centro de custo é obrigatório!"+lineBreaker;
			}
			
			if(form.getValue("natureza") == null || form.getValue("natureza").isEmpty()){
				errorMsg += "Campo natureza é obrigatório!"+lineBreaker;
			}
			
			if(form.getValue("motivo") == null || form.getValue("motivo").isEmpty()){
				errorMsg += "Campo motivo é obrigatório!"+lineBreaker;
			}
		}
		if(CURRENT_STATE == 8){
			if(form.getValue("idbancoOrigem") == null || form.getValue("idbancoOrigem").isEmpty()){
				errorMsg += "Campo banco de origem é obrigatório!"+lineBreaker;
			}
		}
		
		if (errorMsg != ""){
			throw errorMsg;
		}
	}
}