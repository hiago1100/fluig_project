function enableFields(form){
	var atividade = getValue('WKNumState');
	
	if (atividade != 0){
		form.setEnabled("fornecedor",false);
		form.setEnabled("valor",false);
		form.setEnabled("valorDolar",false);
		form.setEnabled("centrocusto",false);
		form.setEnabled("dataNecessidade",false);
		form.setEnabled("natureza",false);
		form.setEnabled("motivo",false);
		form.setEnabled("tipoPagamento",false);
		
		if (atividade == 8){
			form.setEnabled("dataNecessidade",true);
			form.setEnabled("valor",true);
		}
	}
	
}