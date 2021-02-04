function displayFields(form,customHTML){
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    var WK_MODE = form.getFormMode();
    var WK_COMPANY = getValue("WKCompany");

    customHTML.append("<script>function getWK_MODE(){ return '" + WK_MODE + "'; }</script>");
    customHTML.append("<script>function getWK_COMPANY(){ return '" + WK_COMPANY + "'; }</script>");
    
    var currentUser = fluigAPI.getUserService().getCurrent();
    customHTML.append('<script type="text/javascript" >');
	customHTML.append('	let CONTEXT = {');
	customHTML.append('		"USER": "' + currentUser.getCode() + '"');
	customHTML.append('		, "NAME_USER": "' + currentUser.getFullName() + '"');
	customHTML.append('	};');
	customHTML.append('</script>');
}