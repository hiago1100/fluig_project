function displayFields(form,customHTML){

	var id = getValue("WKUser"); 
	var atividade = getValue("WKNumState");
	var aprovadores = form.getValue("aprovadores");
	var diretor = form.getValue("diretor");

	form.setShowDisabledFields(true);

	if (atividade == 30) {
		var custo = aprovadores + ',' + id;
		form.setValue('aprovadores', custo);
		
	}

	if (atividade == 21) {
		var custo = aprovadores + ',' + diretor;
		form.setValue('aprovadores', custo);
		
	}

}