function displayFields(form, customHTML) {
	
	var usuarioSolicitacao = getValue("WKUser");
	var activity = getValue('WKNumState');
	var colaborador = buscaUsuario();
	form.setHidePrintLink(true);
	//customHTML.append("<script>alert('"+activity+"');</script>")
	form.setValue('numAtividade', activity);
	
	form.setVisibleById("panelDadosSolicitacao", false);
	form.setVisibleById("panelVerificaRequisicao", false);
	form.setVisibleById("panelAvaliarRequisicaoOrcamento", false);
	form.setVisibleById("panelPreAprovador", false);
	form.setVisibleById("panelFinanceiro", false);
	form.setVisibleById("panelClassificar", false);
	form.setVisibleById("panelAprovaoDiretoria", false);
	form.setVisibleById("panelDadosdaCompra", false);
	form.setVisibleById("panelEntrega", false);	
	
	if(form.getFormMode() == "VIEW"){
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);
		form.setVisibleById("instrucao03", false);
		form.setVisibleById("instrucao04", false);
		form.setVisibleById("instrucao05", false);
		form.setVisibleById("instrucao06", false);
		form.setVisibleById("instrucao07", false);
		form.setVisibleById("instrucao08", false);
		form.setHideDeleteButton(true);
		customHTML.append("<script>$(function(){ $('.fluigicon-trash').hide(); }); </script>")
	}
	
	if (activity != 0) {

		form.setValue('numSolicitacao', getValue("WKNumProces"));

	}
	

	if (activity == 0 || activity == 4) { // Inicio

		form.setVisibleById("panelDadosSolicitacao", true);

		form.setValue('numSolicitacao', getValue("WKNumProces"));
		form.setValue('cdSolicitante', usuarioSolicitacao);
		form.setValue('nmSolicitante', colaborador.getValue(0,"colleagueName"));
		form.setValue('dtSolicitacao', buscaDataAtual());

	}

	if (activity == 5) { // Verificar requisição

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", false);
		form.setEnabled("txtRespostaDuvidaVerificador", false);
		form.setVisibleById("removeProduto", false);
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		
		form.setVisibleById("removeFornecedor", false);

		//form.setVisibleById("divCentroCusto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 114) { // Duvida

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("txtDuvidaVerificador", true);
		form.setVisibleById("txtRespostaDuvidaVerificador", true);
		form.setVisibleById("motivo", false);
		form.setVisibleById("justificativa", false);
		form.setVisibleById("instrucao01", false);
		//form.setVisibleById("divCentroCusto", false);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 19) { // Avaliar requisição e realizar orçamento

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);	
		
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);

		
		form.setVisibleById("addItens", false);
		form.setVisibleById("removeProduto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 69) { // Duvida sobre requisição

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 24) { // Avaliar Orçamento

		if(form.getFormMode() == "VIEW"){
			customHTML.append("<script>setTimeout(function () { apareceView(); }, 500)</script>");
			}
	

		form.setVisibleById("Aprova_PreAprovador", true);
		

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", false);
		form.setVisibleById("panelVerificaRequisicao", true);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);
		form.setVisibleById("instrucao03", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
			customHTML.append(montaTabelaFornecedor(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}
	}

	if (activity == 124) { // Avaliar Orçamento
		
		if(form.getFormMode() == "VIEW"){
		customHTML.append("<script>$('#txtObsPreAProvador').parent().parent().hide();</script>");
		customHTML.append("<script>$('#txtMotivoPreAProvador').parent().parent().hide();</script>");
		customHTML.append("<script>$('#RespostaPreAprovadorC').parent().parent().hide();</script>");
		customHTML.append("<script>$('#RespostaPreAprovadorS').parent().parent().hide();</script>");
		customHTML.append("<script>setTimeout(function(){ $('#Aprova_PreAprovador').show(); }, 1000);</script>");
		}

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelVerificaRequisicao", true);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);
		form.setVisibleById("instrucao03", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
			customHTML.append(montaTabelaFornecedor(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 72) { // Responder Questionamento (Solicitante)

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", false);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		//form.setVisibleById("divCentroCusto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 32) { // Responder Questionamento (Comprador)

	/*	form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelVerificaRequisicao", false);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);*/
		
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelClassificar", false);
		form.setVisibleById("panelAprovaoDiretoria", false);
		form.setVisibleById("panelDadosdaCompra", false);
		form.setVisibleById("panelEntrega", false);	

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);
		
		//form.setVisibleById("divCentroCusto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

		//form.setVisibleById("addFornecedor", false);
		//form.setVisibleById("removeFornecedor", false);

	}

	if (activity == 35) { // Aprovação Diretoria
		
		if(form.getFormMode() == "VIEW"){
			customHTML.append("<script>$('#txtAprovacaoPreAProvador').attr('checked', true);</script>");
			var uniNegocio = form.getValue('undNegocio');
			if (uniNegocio != "AFIP") {
				form.setVisibleById("painelEsconde", false);
			}
		}

		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true); 
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelAprovaoDiretoria", true);
		
		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);
		form.setVisibleById("instrucao03", false);
		form.setVisibleById("instrucao04", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
			customHTML.append(montaTabelaFornecedor(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 30) {

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 39) {

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
	}

	if (activity == 97) {

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);

		form.setVisibleById("addDadosDaCompra", false);
		form.setVisibleById("removerDados", false);
		form.setVisibleById("panelClassificar", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 61) { // Classificar

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelClassificar", true);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		//form.setVisibleById("divCentroCusto", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}
	}

	if (activity == 41) { // Informar dados da compra
		customHTML.append("<script>setTimeout(function () { apareceView2(); }, 500)</script>");

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelDadosdaCompra", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelAprovaoDiretoria", true);
		form.setVisibleById("panelVerificaRequisicao", true); 

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}

	if (activity == 95) { // Entrega
		if(form.getFormMode() == "VIEW"){
			customHTML.append("<script>setTimeout(function () { apareceView2(); }, 500)</script>");
		}
		customHTML.append("<script>setTimeout(function () { apareceView2(); }, 500)</script>");

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelDadosdaCompra", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelEntrega", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelAprovaoDiretoria", true);
		form.setVisibleById("panelVerificaRequisicao", true); 

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
		form.setVisibleById("removeProduto", false);

		form.setVisibleById("addFornecedor", false);
		form.setVisibleById("divAdicionarFornecedor", false);
		form.setVisibleById("removeFornecedor", false);

		form.setVisibleById("addDadosDaCompra", false);
		form.setVisibleById("removerDados", false);
		

		form.setVisibleById("instrucao01", false);
		form.setVisibleById("instrucao02", false);
		form.setVisibleById("instrucao03", false);
		form.setVisibleById("instrucao04", false);
		form.setVisibleById("instrucao05", false);
		form.setVisibleById("instrucao06", false);
		form.setVisibleById("instrucao07", false);
		
		if(form.getMobile()){
			customHTML.append(montaTabelaItens(form));
		}else{
			customHTML.append("<script>var mobile=false;</script>");
			customHTML.append("<script>$('#tabelaItens').closest('.tabela').hide();</script>");
			customHTML.append("<script>$('#tabelaFornecedores').closest('.tabela').hide();</script>");
		}

	}
	
	if (activity == 17){
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		//form.setVisibleById("divCentroCusto", false);
		
		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
	}
	if (activity == 58){
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		//form.setVisibleById("divCentroCusto", false);

		form.setVisibleById("addItens", false);
		form.setVisibleById("divAdicionarItens", false);
	}
	if (activity == 30){
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		//form.setVisibleById("divCentroCusto", false);
	}
	if (activity == 97){
		if(form.getFormMode() == "VIEW"){
			customHTML.append("<script>setTimeout(function () { apareceView2(); }, 500)</script>");
		}
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);		
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelAprovaoDiretoria", true);
		form.setVisibleById("panelDadosdaCompra", true);
		form.setVisibleById("panelEntrega", true);	
			
		//form.setVisibleById("divCentroCusto", false);
	}

	
	//	Caso seja FIM EXIBO TUDO
	if(activity == 17 ||
		activity == 58 ||
		activity == 30 ||
		activity == 65 ||
		activity == 39 ||
		activity == 97){
		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		form.setVisibleById("panelFinanceiro", true);
		form.setVisibleById("panelClassificar", false);
		form.setVisibleById("panelAprovaoDiretoria", true);
		form.setVisibleById("panelDadosdaCompra", true);
		form.setVisibleById("panelEntrega", true);	

		form.setVisibleById("divAdicionarItens", false);	
		form.setVisibleById("addDadosDaCompra", false);	
	}
}

function buscaDataAtual() {

	var dataAtual = new Date();
	var dia = dataAtual.getDate();
	var mes = dataAtual.getMonth();
	var ano = dataAtual.getFullYear();
	var mesForm = mes + 1;
	if (mesForm.toString().length == 1)
		mesForm = "0" + mesForm;

	if(dia.toString().length == 1)
		dia = "0" + dia;
	
	var dataForm = "" + dia + "/" + mesForm + "/" + ano + "";

	return dataForm;

}

function buscaUsuario() {

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",
			getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraints = new Array(c1);
	var colaborador = DatasetFactory.getDataset("colleague", null, constraints,	null);

	return colaborador;

}

function montaTabelaItens(form){
	var htmlTabela = "<script>$('#tableItens').hide();document.getElementById('tabelaItens').innerHTML=\"";
	htmlTabela += "<table class='table table-stripped table-bordered'><tr><th>Qtd</th><th>Produto</th><th>Descrição do Produto</th></tr>";
	var idx = form.getChildrenIndexes("tableItens");
	for (var i=0 ; i < idx.length ; i++){
		htmlTabela += "<tr><td>"+form.getValue("quantidadeProduto___"+idx[i])+"</td><td>"+form.getValue("nomeProduto___"+idx[i])+"</td><td>"+form.getValue("descricaoProduto___"+idx[i])+"</td></tr>";
	}
	htmlTabela += "</table>\";</script>";
	
	return htmlTabela;
}

function montaTabelaFornecedor(form){
	var lOnClick = (getValue("WKNumState").toString() == "24" || getValue("WKNumState").toString() == "35" ? "validaAprov(this);" : "return false;");
	var htmlTabela = "<script>$('#tableFornecedor').hide();var mobile=true;document.getElementById('tabelaFornecedores').innerHTML=\"";
	htmlTabela += "<table class='table table-stripped table-bordered'><tr><th>Aprovação</th><th>Nome do Fornecedor/Documento</th><th>Condição de Pagamento</th><th>Prazo de Entrega</th><th>Valor de orçamento</th></tr>";
	var idx = form.getChildrenIndexes("tableFornecedor");
	for (var i=0 ; i < idx.length ; i++){
		var checado = (form.getValue("checkAprovacaoFornecedor___"+idx[i]) == "Aprovado" ? "checked='true'" : "");
		htmlTabela += "<tr><td align='center'><input type='checkbox' "+checado+" name='chkAprovacaoFornecedor___"+idx[i]+"' id='chkAprovacaoFornecedor___"+idx[i]+"' onclick='"+lOnClick+"' /></td><td>"+form.getValue("nomeFornecedor___"+idx[i])+"</td><td>"+form.getValue("condicaoPagamento___"+idx[i])+"</td><td>"+form.getValue("prazoEntrega___"+idx[i])+"</td><td align='right'>"+form.getValue("valorFornecedor___"+idx[i])+"</td></tr>";
	}
	
	htmlTabela += "</table>\";</script>";
	
	return htmlTabela;
}