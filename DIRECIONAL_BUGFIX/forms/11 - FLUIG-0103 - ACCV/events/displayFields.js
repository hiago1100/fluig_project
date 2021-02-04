/* function displayFields(form, customHTML) {
	
	var atividade = parseInt(getValue("WKNumState"));
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getServerTime(){ return " + (new Date().getTime()) + "; }</script>");

	if ((form.getFormMode() != "VIEW") && (atividade == 0 || atividade == 1)) {
		
		var filterColaborador = new java.util.HashMap(),
			dadosColaborador,
			loginColaborador,
			DadosSolicitante;
		
		filterColaborador.put("colleaguePK.colleagueId", getValue("WKUser"));
		dadosColaborador = getDatasetValues('colleague', filterColaborador);
		loginColaborador = new Array(dadosColaborador.get(0).get("login"));
		DadosSolicitante = DatasetFactory.getDataset("DS_FLUIG_0012", loginColaborador, null, null);
		
		//DADOS DO SOLICITANTE
		form.setValue('cpLoginFluig', dadosColaborador.get(0).get("login"));
		form.setValue('cpNomeSolicitante', DadosSolicitante.getValue(0, "NOME"));
		form.setValue('cpMatriculaSolicitante', DadosSolicitante.getValue(0, "CHAPA"));
		form.setValue('cpFuncaoSolicitante', DadosSolicitante.getValue(0, "FUNCAO"));
		form.setValue('cpEmpresaSolicitante', DadosSolicitante.getValue(0, "EMPRESA"));
		form.setValue('cpDepartamentoObraSolicitante', DadosSolicitante.getValue(0, "SECAO"));
		form.setValue('cpEmailSolicitante', DadosSolicitante.getValue(0, "EMAIL"));
		form.setValue('cpEstadoSolicitante', DadosSolicitante.getValue(0, "ESTADO"));
		form.setValue('cpCpfSolicitante', DadosSolicitante.getValue(0, "CPF"));
		//REMOVE A DE CHAPA GESTOR
		var conste = DadosSolicitante.getValue(0, "CHAPA_GESTOR").toString().replace("A","");
		form.setValue('cpGestorSolicitante', conste);
		
		form.setValue('cpCodColigadaSolicitante', DadosSolicitante.getValue(0, "CODCOLIGADA"));
		form.setValue('cpCodSecaoSolicitante', DadosSolicitante.getValue(0, "CODSECAO"));
	}	
} */

function displayFields(form, customHTML) 
{
	var modo = form.getFormMode();

    customHTML.append("<script>function getModo(){ return '" + modo + "'; }</script>");
    customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
    customHTML.append("<script>function WKDef(){ return '" + getValue("WKDef") + "'; }</script>");
    customHTML.append("<script>function WKUser(){ return '" + getValue("WKUser") + "'; }</script>");
    
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);
    
    if(modo == 'VIEW')
    {
    	form.setHideDeleteButton(true);
    }

	//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
	var arrayCamposData = ["cpDataAbertura", "cpDataInicioViagem", "cpDataTermino"];
		   
	CorrecaoDatas(form,arrayCamposData);
}