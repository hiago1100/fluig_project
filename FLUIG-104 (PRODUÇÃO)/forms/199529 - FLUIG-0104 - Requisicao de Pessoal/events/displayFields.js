function displayFields(form, customHTML)
{

	loading.setMessage("Carregando dados...");
	log.info("------------------------------------------------------------");
	log.info("Carregando o formulario de FLUIG-0104 - Requisicao de Pessoal- displayFields - Inicio");
	log.info("------------------------------------------------------------");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; };</script>");
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getTodayDate(){ return " + new java.util.Date().getTime() + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	customHTML.append("<script>function getServerTime(){ return " + (new Date().getTime()) + "; }</script>");

	var atividade = parseInt(getValue("WKNumState"));

	form.setValue('cpNumeroAtividade', atividade);
}
