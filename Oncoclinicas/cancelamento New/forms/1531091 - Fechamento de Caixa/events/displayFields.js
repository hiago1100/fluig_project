function displayFields(form,customHTML){ 
	ARYForms(form, customHTML);
	
	var atividade = getValue('WKNumState');

// solicitante

if (atividade == 0 || atividade == 4) {
		
	if (form.getValue("cpNomeSolicitante") == "") {
		var user = getUser(getValue("WKUser"));	
		
		form.setValue("cpNomeSolicitante", user.colleagueName);
		form.setValue("cpSolicitacao", atividade);

		if (form.getValue("dtPeriodoFim") == "") {
			var currentTime = new Date()
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			
			var date = day + "/" + month + "/" + year;
			form.setValue("dtPeriodoFim", date);
	}
		
	}
	

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