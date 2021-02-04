function displayFields(form,customHTML){ 
	ARYForms(form, customHTML);
	
	var atividade  = getValue('WKNumState');
	var numProcess = getValue('WKNumProces');



	form.setValue("cpNumeroFluig", numProcess);

	if (atividade == 0 || atividade == 4) {
	
		form.setValue("nivelAtualAprovacao", "0");
		form.setValue("nivelMaximoAprovacao", "5");

	if (form.getValue("nomeSolicitante") == "") {
		var user = getUser(getValue("WKUser"));	

		form.setValue("txtUsuarioRM", getValue("WKUser"));
		form.setValue("nomeSolicitante", user.colleagueName);
		//form.setValue("emailSolicitante", user.mail);
	}


	
	if (form.getValue("dataSolicitacao") == "") {
		var fullDate = new Date();
		var date = fullDate.getDate().toString();
	
		if(date.length == 1){
			date = 0+date;
		}
		var mes = (fullDate.getMonth()+1).toString();
	
		if(mes.length == 1){
			mes = 0+mes;
		}
		
		var data = date+"/"+mes+"/"+fullDate.getFullYear();
		form.setValue("dataSolicitacao", data);
	}
	}

		var user = getUser(getValue('WKUser'));

		var fullDate = new Date();
		var date = fullDate.getDate().toString();

		if(date.length == 1){
			date = 0+date;
		}
		var mes = (fullDate.getMonth()+1).toString();

		if(mes.length == 1){
			mes = 0+mes;
		}
		
		var data = date+"/"+mes+"/"+fullDate.getFullYear();			

		ocultaAprovGestor(form, customHTML);
		
		desabilitaCampo(form, "decisaoGestor1");
		desabilitaCampo(form, "motivoAprovGestor1");
		ocultaCampo(customHTML, "avaliacaoGestor1");

		desabilitaCampo(form, "decisaoGestor2");
		desabilitaCampo(form, "motivoAprovGestor2");
		ocultaCampo(customHTML, "avaliacaoGestor2");
		
		desabilitaCampo(form, "decisaoGestor3");
		desabilitaCampo(form, "motivoAprovGestor3");
		ocultaCampo(customHTML, "avaliacaoGestor3");
		
		desabilitaCampo(form, "decisaoGestor4");
		desabilitaCampo(form, "motivoAprovGestor4");
		ocultaCampo(customHTML, "avaliacaoGestor4");
		
		desabilitaCampo(form, "decisaoGestor5");
		desabilitaCampo(form, "motivoAprovGestor5");
		ocultaCampo(customHTML, "avaliacaoGestor5");




	if (atividade == 19) {
		
		customHTML.append("<script>$('#aprovacaoGestor').show();</script>");
		var nivelAtualAprovacao = form.getValue("nivelAtualAprovacao");

		if (nivelAtualAprovacao == "1") {

			form.setValue("dataAprovGestor1", data);
			form.setValue("nomeAprovGestor1", user.colleagueName);
			form.setEnabled("decisaoGestor1", true);
			form.setEnabled("motivoAprovGestor1", true);
			customHTML.append("<script>$('#avaliacaoGestor1').show();</script>");
			
		} else if (nivelAtualAprovacao == "2") {

			
			form.setValue("nomeAprovGestor2", user.colleagueName);
			form.setValue("dataAprovGestor2", data);
			form.setEnabled("decisaoGestor2", true);
			form.setEnabled("motivoAprovGestor2", true);
			customHTML.append("<script>$('#avaliacaoGestor2').show();</script>");
			
		} else if (nivelAtualAprovacao == "3") {
			
			
			form.setValue("nomeAprovGestor3", user.colleagueName);
			form.setValue("dataAprovGestor3", data);
			form.setEnabled("decisaoGestor3", true);
			form.setEnabled("motivoAprovGestor3", true);
			customHTML.append("<script>$('#avaliacaoGestor3').show();</script>");
		
		} else if (nivelAtualAprovacao == "4") {

			
			form.setValue("nomeAprovGestor4", user.colleagueName);
			form.setValue("dataAprovGestor4", data);
			form.setEnabled("decisaoGestor4", true);
			form.setEnabled("motivoAprovGestor4", true);
			customHTML.append("<script>$('#avaliacaoGestor4').show();</script>");
			
		} else if (nivelAtualAprovacao == "5") {

			
			form.setValue("nomeAprovGestor5", user.colleagueName);
			form.setValue("dataAprovGestor5", data);
			form.setEnabled("decisaoGestor5", true);
			form.setEnabled("motivoAprovGestor5", true);
			customHTML.append("<script>$('#avaliacaoGestor5').show();</script>");
			
		} 
	}	

	if (atividade == 19) {

		form.setValue("responsavelAvalia", user.colleagueName);
		form.setValue("dataAvalia", data);

	}


}

function getUser(colleagueId) {	
	var cons = [
	            DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST)
	            ];
	var dataset = DatasetFactory.getDataset("colleague", null, cons, null);	
	var user = {};
	
	if (dataset.rowsCount > 0) {
		for(var i=0; i< dataset.getColumnsName().length; i++) {
			var col = dataset.getColumnsName()[i];
			user[col] = dataset.getValue(0, col);
		}
	}	
	
	return user;
}

function ARYForms(form,customHTML) { 	
	customHTML.append("<script type='text/javascript'>");
	customHTML.append("if (ARYForms && ARYForms.initForm) {");
	customHTML.append("ARYForms.initForm({");
	customHTML.append(" formMode:'" + form.getFormMode()+"',");
	customHTML.append(" WKCompany:'" + getValue("WKCompany")+"',");
	customHTML.append(" WKNumState:'" + getValue("WKNumState")+"',");
	customHTML.append(" WKNumProces:'" + getValue("WKNumProces")+"',");
	customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState")+"',");
	customHTML.append(" WKUser:'" + getValue("WKUser")+"',");
	customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile())+",");
	customHTML.append("});");
	customHTML.append("}</script>"); 		
 }

function desabilitaCampo(form, idCampo){
	form.setEnabled(idCampo, false);
 }

function ocultaCampo(html, idCampo){
	html.append("<script>$('#" + idCampo + "').hide();</script>");
 }

function ocultaAprovGestor(form, customHTML) {
	ocultaCampo(customHTML, "aprovacaoGestor");
 }