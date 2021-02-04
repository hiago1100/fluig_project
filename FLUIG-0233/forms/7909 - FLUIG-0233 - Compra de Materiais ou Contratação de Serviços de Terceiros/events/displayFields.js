function displayFields(form,customHTML)
{
	var modo = form.getFormMode();
	var cod_atividade = getValue('WKNumState');

    customHTML.append("<script>function getModo(){ return '" + modo + "'; }</script>");
	customHTML.append("<script>function getAtividade(){ return '" + cod_atividade + "'; }</script>");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
	var arrayCamposData = ["cpDataAbertura", "cpDataEntregaContratacao", "cpDataCotacao", "cpMesPL"];

	CorrecaoDatas(form, arrayCamposData);

}
