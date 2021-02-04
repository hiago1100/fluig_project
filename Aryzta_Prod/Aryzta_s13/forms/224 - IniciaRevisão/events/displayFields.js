function displayFields(form,customHTML){
	BDOForms(form, customHTML);
	
	var numActivity = getValue("WKNumState");
	
	if(numActivity == 0 ||numActivity == 2 ){
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);

		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);

		form.setValue('solicitante',colaborador.getValue(0,"colleagueName"));
		
		 var sdf = new java.text.SimpleDateFormat('dd/MM/yyyy');
		  form.setValue('dataInicio', sdf.format(new java.util.Date()));
		  
		  
		 var fullDate = new Date();
	  	var hours = fullDate.getHours();
		var minutes = fullDate.getMinutes();
		if (minutes <= 9){	
			minutes = "0" + minutes;
		}
		var timeValue = hours + ":" + minutes;
		form.setValue("hora", timeValue);
	
	}


}

function BDOForms(form,customHTML) { 	
	customHTML.append("<script type='text/javascript'>");
	customHTML.append("if (BDOForms && BDOForms.initForm) {");
	customHTML.append("BDOForms.initForm({");
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