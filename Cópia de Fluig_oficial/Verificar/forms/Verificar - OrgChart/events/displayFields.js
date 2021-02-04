function displayFields(form,customHTML) {	
	if (form.getFormMode() == "VIEW" || form.getFormMode() == "MOD") {
		customHTML.append("<script>");
		customHTML.append("viewMode();");
		customHTML.append("</script>");
	}
	
	if (form.getFormMode() == "VIEW") {
		customHTML.append("<script>");
		customHTML.append("$('#zerar_drag_and_drop').hide();");
		customHTML.append("$('.input-group-addon').hide();");
		customHTML.append("</script>");
	}
}