function validateForm(form){
	var CURRENT_STATE = getValue("WKNumState");

	if (CURRENT_STATE == INICIO || CURRENT_STATE == CORRIGIR_INCONSISTENCIA) {

		if (form.getValue("cnpjFilial") == "") {
			throw "A Filial não pode estar vazia!";
		}
		
		if (form.getValue("nomeResponsavel") == "") {
			throw "O campo Responsavel não pode estar vazio!";
		}
		
		if (form.getValue("numConselhoProfi") == "") {
			throw "O campo Número do Conselho Profissional não pode estar vazio!";
		}
		
		if (form.getValue("uf") == "selecione") {
			throw "O campo UF não pode estar vazio!";
		}
		
		if (form.getValue("codProduto") == "") {
			throw "O campo Produto não pode estar vazio!";
		}
		
		if (form.getValue("loteProduto") == "") {
			throw "O Lote do produto deve ser preenchido!";
		}
		
		if (form.getValue("validadeProduto") == "") {
			throw "Favor preecher a Data de Validade do produto!";
		}
		
		if (form.getValue("tipoDesvio") == "selecione") {
			throw "O campo Tipo de Desvio do produto não pode estar vazio!";
		}
		
		if (form.getValue("notificacaoNotivisa") == "") {
			throw "O campo Nº Notificação Anvisa não pode estar vazio!";
		}
		
		if (form.getValue("aceiteEvidencia") == "") {
			throw "O campo Evidência Fotográfica não pode estar vazio!";
		}
		
		if (form.getValue("descricaoDesvio") == "") {
			throw "O campo Descrição do Desvio de Qualidade deve ser preenchido!";
		}
		
		if (form.getValue("fornecedor") == "") {
			throw "O campo Fornecedor não pode estar vazio!";
		}
		
		if (form.getValue("nfProduto") == "") {
			throw "O campo Nota Fiscal não pode estar vazio!";
		}
		
		if (form.getValue("qtdDesvio") == "") {
			throw "O campo Quantidade de Desvio não pode estar vazio!";
		}
		
		if (form.getValue("recolhimentoProduto") == "") {
			throw "O campo Produto Disponível para Recolhimento deve ser preenchido!";
		}
		
		if (form.getValue("recolhimentoProduto") == "SIM" && form.getValue("situacaoEstoque") == "selecione") {
			throw "Selecione uma Situação de Estoque!";
		}
		
		if (form.getValue("devolverUnidades") == "") {
			throw "Selecione uma das opções em 'Deseja devolver outras unidades do mesmo lote'!";
		}
		
		if (form.getValue("devolverUnidades") == "SIM" && form.getValue("qtdMesmoLote") == "") {
			throw "O campo Quantidade não pode estar vazio!";
		}
		
		if (form.getValue("adminEmPaciente") == "") {
			throw "Selecione uma das opções Produto Administrado em Paciente!";
		}
		
		if (form.getValue("adminEmPaciente") == "SIM" && form.getValue("impactoPaciente") == "") {
			throw "Selecione uma das opções se Houve Impacto na Saúde do Paciente!";
		}
		
		if (form.getValue("impactoPaciente") == "SIM" && form.getValue("descricaoImpacto") == "") {
			throw "O campo Descrição do Impacto Causado deve ser preenchido!";
		}
		
	}
	
	if(CURRENT_STATE == VALIDAR_FORMULARIO) {
		if (form.getValue("aprovMatMed") == "") {
			throw "Selecione uma das opções de Aprovação!";
		}
		
		if (form.getValue("aprovMatMed") == "SIM" && form.getValue("emailFornecedor") == "") {
			throw "O campo Email do fornecedor não pode estar vazio!";
		}
		
		if (form.getValue("aprovMatMed") == "NAO" && form.getValue("descMatMed") == "") {
			throw "O campo Motivo da Reprovação não pode estar vazio!";
		}
	}
	
	if(CURRENT_STATE == RETORNO_FORNECEDOR) {
		if (form.getValue("seraRecolhido") == "") {
			throw "Selecione uma das opções de Recolhimento!";
		}
		
		if (form.getValue("seraRecolhido") == "SIM" && form.getValue("dataAproximada") == "") {
			throw "O campo Data Prevista não pode estar vazio!";
		}
		
		if (form.getValue("seraRecolhido") == "NAO" && form.getValue("observacaoRetorno") == "") {
			throw "O campo Descrição de não recolhimento deve ser preenchido!";
		}
	}
	
	if(CURRENT_STATE == COLETA_REGISTRA_NFD) {

		if (form.getValue("equipamentoRecolhido") == "") {
			throw "Selecione uma das opções de Recolhimento!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "NAO" && form.getValue("observacaoNaoRecolhido") == "") {
			throw "Favor detalhar no campo observação o não recolhimento!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "SIM" && form.getValue("hiddenSituacaoEstoque") == "SIM" && form.getValue("numNF") == "" ) {
			throw "O campo Número da Nota Fiscal não pode estar vazio!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "SIM" && form.getValue("hiddenSituacaoEstoque") == "SIM" && form.getValue("valorNF") == "" ) {
			throw "O campo Valor da Nota Fiscal não pode estar vazio!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "SIM" && form.getValue("hiddenSituacaoEstoque") == "SIM" && form.getValue("cnpjFornecedor") == "" ) {
			throw "O campo CNPJ do fornecedor não pode estar vazio!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "SIM" && form.getValue("hiddenSituacaoEstoque") == "SIM" && form.getValue("prioridade") == "selecione" ) {
			throw "Favor selecionar a prioridade!";
		}
		
		if (form.getValue("equipamentoRecolhido") == "SIM" && form.getValue("hiddenSituacaoEstoque") == "SIM" && form.getValue("tituloSolicitacao") == "" ) {
			throw "O campo Título Da Solicitação não pode estar vazio!";
		}
	}
	
	if(CURRENT_STATE == AGUARDANDO_RETORNO_FORNECEDOR) {
		if (form.getValue("laudoEnviado") == "") {
			throw "Selecione uma das opções de Retorno do Fornecedor!";
		}
		
		if (form.getValue("laudoEnviado") == "NAO" && form.getValue("motivoSemLaudo") == "") {
			throw "Favor preencher o motivo do não recolhimento!";
		}
	}
	
	if(CURRENT_STATE == APROVACAO_SOLICITANTE) {
		if (form.getValue("aprovSolicitacao") == "") {
			throw "Selecione uma das opções de Aprovação!";
		}
		
		if (form.getValue("aprovSolicitacao") == "NAO" && form.getValue("MotivoReprovSoli") == "") {
			throw "Favor preencher o motivo da Reprovação!";
		}
	}
	
	if(CURRENT_STATE == SOLUCAO_INCONSISTENCIA) {
		if (form.getValue("solucaoInconsistencia") == "") {
			throw "Favor preencher o campo de Solução!";
		}
	}
		
}