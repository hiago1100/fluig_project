function displayFields(form, customHTML) {
	customHTML.append("<script>var FORM_MODE = '" + form.getFormMode() + "'</script>");
	var atividade 		= getValue("WKNumState");
	var statusForm 		= form.getFormMode();
	var valorTitulo 	= form.getValue("totalTitulo");
	var justificativa 	= form.getValue("justificativaFinanceiro");
	var auxPA 			= form.getValue("aux_total_pa");
	var mobile 			= getValue("WKMobile");
	var id 				= getValue("WKUser");

	var mail = fluigAPI.getUserService().getCurrent().getEmail();
	var nome = fluigAPI.getUserService().getCurrent().getFullName();

	var date = new Date();
	var month = date.getMonth() + 1;

	if (month.length <= 1) {
		month = month;
	}

	var dataAtual = date.getDate() + "/" + month + "/" + date.getFullYear();

	form.setValue('formMode', form.getFormMode());
    form.setValue('isMobile', mobile);
    form.setValue('atvAtual', atividade);

	if (atividade == 0 || atividade == 4) {
		form.setValue('cpSolicitante', nome);
		form.setValue('cpDataSolic', dataAtual);
	}

	if (atividade == 5) {
		// form.setValue('dtAprovador', dataAtual);
		// form.setValue('cpNomeAprovador', nome);
		form.setValue('verificaTitulo', valorTitulo);

		if(auxPA != 0){
			customHTML.append("<script>" +
			"$('#div_pa').css('display', 'block');" +
			"</script>");
		}



	
	}

	if (atividade == 11) {
		form.setValue('dtFinanceiro', dataAtual);
		form.setValue('cpNomeFinanceiro', nome);

		if(auxPA != 0){
			customHTML.append("<script>" +
			"$('#div_pa').css('display', 'block');" +
			"</script>");
		}
	}

	if (atividade == 0 || atividade == 4) {
		customHTML.append("<script>" +
			"$('#div_financeiro').css('display', 'none');" +
			"</script>");
	}

	if (atividade == 5) {
		customHTML.append("<script>" +
			"$('#centroCusto').css('display', 'block');" +
			"$('#div_financeiro').css('display', 'none');" +
			"$('#cpAgencia').attr('readonly', 'true');" +
			"$('#cpConta').attr('readonly', 'true');" +
			"$('#cpBanco').attr('readonly', 'true');" +
			"$('#cpDataSolic').attr('readonly', 'true');" +
			"$('#cpCpf').attr('readonly', 'true');" +
			"</script>");
	}

	if (atividade == 11) {
		customHTML.append("<script>" +
			"$('#centroCusto').css('display', 'block');" +
			"$('#div_financeiro').css('display', 'block');" +
			"$('#cpAgencia').attr('readonly', 'true');" +
			"$('#cpConta').attr('readonly', 'true');" +
			"$('#cpBanco').attr('readonly', 'true');" +
			"$('#cpDataSolic').attr('readonly', 'true');" +
			"$('#cpCpf').attr('readonly', 'true');" +
			"</script>");
	}

	if (atividade == 15 & justificativa != "") {
		customHTML.append("<script>" +
			"$('#centroCusto').css('display', 'block');" +
			"$('#div_justificativaFinanceiro').css('display', 'block');" +
			"$('#cpReembolsado).removeAttr('readonly', 'readonly');" +
			"$('#cpCentroCusto).removeAttr('readonly', 'readonly');" +
			"$('#div_financeiro').css('display', 'block');" +
			"$('#cpAgencia').attr('readonly', 'false');" +
			"$('#cpConta').attr('readonly', 'false');" +
			"$('#cpBanco').attr('readonly', 'false');" +
			"$('#cpDataSolic').attr('readonly', 'false');" +
			"$('#cpCpf').attr('readonly', 'false');" +
			"</script>");
	}


	if (atividade == 15 && justificativa == "") {
		customHTML.append("<script>" +
			"$('#centroCusto').css('display', 'block');" +
			"$('#div_financeiro').css('display', 'none');" +
			"$('#cpAgencia').attr('readonly', 'false');" +
			"$('#cpReembolsado).removeAttr('readonly', 'readonly');" +
			"$('#cpCentroCusto).removeAttr('readonly', 'readonly');" +
			"$('#cpConta').attr('readonly', 'false');" +
			"$('#cpBanco').attr('readonly', 'false');" +
			"$('#cpDataSolic').attr('readonly', 'false');" +
			"$('#cpCpf').attr('readonly', 'false');" +
			"</script>");
	}

	if(atividade == 43){
		customHTML.append("<script>" +
		"$('#div_pa').css('display', 'block');" +
		"</script>");
	}

	if(atividade == 45){
		customHTML.append("<script>" +
		"$('#div_pa').css('display', 'block');" +
		"</script>");
	}

	if(atividade == 25){
		customHTML.append("<script>" +
		"$('#div_pa').css('display', 'block');" +
		"</script>");
	}

}