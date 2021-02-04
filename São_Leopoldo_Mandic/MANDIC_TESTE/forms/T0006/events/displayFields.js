function displayFields(form,customHTML){ 
	ARYForms(form, customHTML);
	
	var atividade = getValue('WKNumState');

// solicitante

if (atividade == 0 || atividade == 4) {
		
	if (form.getValue("nomeSolicitante") == "") {
		var user = getUser(getValue("WKUser"));	

		form.setValue("txtUsuarioRM", getValue("WKUser"));
		form.setValue("nomeSolicitante", user.colleagueName);
		form.setValue("emailSolicitante", user.mail);
		
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



// PRONTUARIOS

if (atividade == 20) {

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
		form.setValue("dataPRONT", data);

		form.setValue("respPront", user.colleagueName);

}


// Departamento Financeiro

if (atividade == 21) {

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
		form.setValue("dataDPF", data);

		form.setValue("respFin", user.colleagueName);

}


// Comite

if (atividade == 22) {

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
		form.setValue("dataComite", data);

		form.setValue("respComite", user.colleagueName);


}

// academico

if (atividade == 23) {

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
		form.setValue("dataAcademico", data);

		form.setValue("respAcade", user.colleagueName);


}

// EMPRESTIMOS 

if (atividade == 27) {

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
		form.setValue("dataArm", data);

		form.setValue("respEmp", user.colleagueName);


}


// DEPTO. FINANCEIRO LIBERAÇÃO PARA QUALIFICAÇÃO E DEFESA
	if (atividade == 28) {

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
		form.setValue("dataDef", data);

		form.setValue("responsavelQuali", user.colleagueName);


	}

if (atividade == 47) {

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
		form.setValue("dataBibli", data);

		form.setValue("respBibli", user.colleagueName);


	
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