function inputFields(form){
	var atividade = getValue("WKNumState");
	
	if(atividade == 0 || atividade == 4){ //Inicio
		var dataAtual = new Date();
		form.setValue("anoOcorrencia",dataAtual.getFullYear().toString());
	}
}