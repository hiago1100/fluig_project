function displayFields(form, customHTML) {

	log.info("Carregando DISPLAY do FLUIG-0198 - Criação de Coligada e Seção");
	
	var atividade = parseInt(getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getServerTime(){ return " + (new Date().getTime()) + "; }</script>");
	customHTML.append("<script>function getUser() { return '" + getValue("WKUser") + "'; }</script>");	
	
	log.info("Fim do DisplayFields do formulário  FLUIG-0198 - Criação de Coligada e Seção");
}