function validateForm(form){
	
	if (form.getValue('cod_desvio') == null || form.getValue('cod_desvio') == ''){

	     throw "O código do Desvio não foi informado";

	   }
	
	if (form.getValue('cod_estabel') == null || form.getValue('cod_estabel') == '' ){

	     throw "O Estabelecimento não foi informado";

	   }   

	if (form.getValue('ind_status_desvio') == null || form.getValue('ind_status_desvio') == ''){

	     throw "O Status não foi informado";

	   }   

	if (form.getValue('cod_solicitante') == null || form.getValue('cod_solicitante') == ''){

	     throw "O Solicitante cnão foi informado";

	   }   
	
}