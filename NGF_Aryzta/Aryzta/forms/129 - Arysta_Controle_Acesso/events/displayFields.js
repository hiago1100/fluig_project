function displayFields(form,customHTML){ 
	ARYForms(form, customHTML);
	
	if (form.getValue("nomeSolicitante") == "") {
		var user = getUser(getValue("WKUser"));		
		form.setValue("matriculaSolicitante", getValue("WKUser"));
		form.setValue("nomeSolicitante", user.colleagueName);
	}
	
	if (form.getValue("dataSolic") == "") {
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
		form.setValue("dataSolic", data);
	}
	
	if (form.getValue("horaSolic") == "") {
		var hours = fullDate.getHours();
		var minutes = fullDate.getMinutes();
		
		if (minutes <= 9){	
			minutes = "0" + minutes;
		}
		
		var timeValue = hours + ":" + minutes;
		
		form.setValue("horaSolic", timeValue);
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