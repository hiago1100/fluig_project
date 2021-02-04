function displayFields(form,customHTML)
{
	customHTML.append("<script>function getAtividade(){ return " + getValue("WKNumState") + "; }</script>");
    customHTML.append("<script>function getCodProcess(){ return '" + getValue("WKDef") + "'; }</script>");
    
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	/* campos utilizados para testes 
	form.setValue('cpEmpresaSolicitante', 'DIRECIONAL CORRETORA DE IMOVEIS LTDA');
	form.setValue('cpFuncaoInfo', 'SUPERINTENDENTE DE INCORPORACAO');
	form.setValue('cpObraDepartamentoInfo', 'ERIRJ - INCORPORACAO');
	form.setValue('cpDepartamentoObraSolicitante', 'EXRIO - DIRECIONAL VENDAS');
	form.setValue('cpNomeSolicitante', 'ADRIANA VIEIRA DA SILVA');
	
	form.setValue('cpColaboradorInfo', 'RENATO SOUZA VASCO');
	form.setValue('cpMatriculaInfo', '0185355');
	form.setValue('cpEmailSolicitante', 'adriana.vieira@direcional.com.br');
	form.setValue('cpEstadoSolicitante', 'RJ');
	form.setValue('cpDataAdmissaoInfo', '23/10/2017');
	form.setValue('cpGestorInfo', 'JOAO ADRIANO PONCIANO NOBRE');
	form.setValue('cpMaoObraInfo', 'Estrategico');
	form.setValue('cpChapaGestor', '0181756');
	form.setValue('cpChapaConsultor', '1203156');
	form.setValue('cpEmpresaInfo', 'DIRECIONAL ENGENHARIA S/A');
	form.setValue('cpFuncaoSolicitante', 'CONSULTOR INTERNO DE RH');
*/
}