function displayFields(form, customHTML) {

	loading.setMessage("Carregando dados...");
	
	log.info("Carregando o formulário FLUIG-0102-Cadastro de novos colaboradores");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; };</script>");
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getTodayDate(){ return " + new java.util.Date().getTime() + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	
	log.info("Fim do DisplayFields do formulário FLUIG-0102-Cadastro de novos colaboradores");
}