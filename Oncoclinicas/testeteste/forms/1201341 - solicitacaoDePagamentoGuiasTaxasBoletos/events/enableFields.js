function enableFields(form){ 
	var primeiraAtividade = 8;
	var corrigirSolicitacao = 12;
	var avaliarPeloGestor = 9;
	var avaliarGerarTitulo = 10;
	var validacaoFiscal = 11;
	var programarPagamento = 13; 
	var contabilizarImobilizado = 12;
	var aprovacaoSolicitante = 15;
	var solucaoInconsistencia = 16;
	
	var objForm = new objFormulario(form);
	
	bloqueiaCadastroEdicao(form);
		
	if (objForm.isAtividadeInicial(primeiraAtividade)) {
	}
	else if (objForm.isAtividadeAtual(corrigirSolicitacao)){
		bloqueiaEdicaoAprovacao(form);
	}
	else if (objForm.isAtividadeAtual(avaliarPeloGestor)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloqueiaAprovacaoFiscal(form);
		bloquearRateio(form);
	}
	else if (objForm.isAtividadeAtual(avaliarGerarTitulo)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloqueiaAprovacaoGestor(form);
		bloquearRateio(form);
	}
	else if (objForm.isAtividadeAtual(validacaoFiscal)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloqueiaAprovacaoGestor(form);
		bloquearRateio(form);
	}
	else if (objForm.isAtividadeAtual(programarPagamento)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiaEdicaoAprovacao(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloquearRateio(form);
	}
	else if (objForm.isAtividadeAtual(aprovacaoSolicitante)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiaEdicaoAprovacao(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloquearCampoSolucaoInconsistencia(form);
		bloquearRateio(form);
	}
	else if (objForm.isAtividadeAtual(solucaoInconsistencia)){
		bloqueiaFormCadastro(form);
		bloqueiaFornecedor(form);
		bloqueiaEdicaoAprovacao(form);
		bloqueiapgtoGuiaTaxaBoletos(form);
		bloquearCampoAprovacaoSolicitacao(form);
		bloquearRateio(form);
	}	
	
}

//Fornecedor
function bloqueiaFornecedor(form) {
	bloquearCampo(form, "A2_COD");
	bloquearCampo(form, "cnpjFornecedor");
}

function bloqueiaEdicaoAprovacao(form) {
	// Gestor
	bloquearCampo(form, "decisaoGestor");
	bloquearCampo(form, "motivoAprovGestor");

	// Fiscal
	bloquearCampo(form, "decisaoFiscal");
	bloquearCampo(form, "motivoAprovFiscal");
}

function bloqueiaCadastroEdicao(form) {
	bloquearCampo(form, "solicitante");
	bloquearCampo(form, "dataSolicitante");

	bloquearCampo(form, "nomeAprovGestor");
	bloquearCampo(form, "aprovDataGestor");
	
	bloquearCampo(form, "nomeAprovFiscal");
	bloquearCampo(form, "aprovDataFiscal");	
	
	bloquearCampo(form, "nomeAprovacaoFinanc");
	bloquearCampo(form, "dataAprovacaoFinanc");
	bloquearCampo(form, "dataemissaoPgtoGuiaTaxaBoletos");
	bloquearCampo(form, "aprovDataPrevista");
	
	
}

function bloqueiaFormCadastro(form) {
	bloquearCampo(form, "filial");
	bloquearCampo(form, "CTT_CUSTO");
	bloquearCampo(form, "numeroDocumento");
	bloquearCampo(form, "dataApuracao");
	bloquearCampo(form, "cbGeraDirf");
	bloquearCampo(form, "codTributoGPS");
	bloquearCampo(form, "cgcTributo");
	bloquearCampo(form, "historico");
	bloquearCampo(form, "prefixo");
	bloquearCampo(form, "vlrOutEntidades");
	bloquearCampo(form, "tipoTributo");
	bloquearCampo(form, "dtDeVencPgtoGuiaTaxaBoletos");
	bloquearCampo(form, "dtDePgtoGuiaTaxaBoletos");
}

function bloqueiapgtoGuiaTaxaBoletos(form) {
	bloquearCampo(form, "numSolLancNfPgtoGuiaTxBoletos");
	bloquearCampo(form, "numeronfPgtoGuiaTaxaBoletos");
	bloquearCampo(form, "valorPgtoGuiaTaxaBoletos");
	bloquearCampo(form, "input-group-addon");
}

function bloqueiaAprovacaoGestor(form) {
	bloquearCampo(form, "decisaoGestor");
	bloquearCampo(form, "motivoAprovGestor");
}

function bloqueiaAprovacaoFiscal(form) {
	bloquearCampo(form, "decisaoFiscal");
	bloquearCampo(form, "motivoAprovFiscal");
}

function bloquearCampoSolucaoInconsistencia(form) {
	bloquearCampo(form, "retorno");
}
function bloquearCampoAprovacaoSolicitacao(form) {
	bloquearCampo(form, "aceite");
	bloquearCampo(form, "compSolicitante");
}

function bloquearRateio(form){
	bloquearCampo(form,'existeRateio');
	
	//busca os indices do pai filho
	var indexes = form.getChildrenIndexes("tbBeneficios");
	//percorre os campos do pai
	for (var i = 0; i < indexes.length; i++) {
		var index = indexes[i];
		//Objeto com todos os campos de da linha atual
		var rowTable = {
			codCentroCusto:	'codCentroCustoBeneficio___'+index,
			centroCusto:	'centroCustoBeneficio___'+index,
			valorMovimento:	'valorBeneficio___'+index,
			percentual:		'percentualBeneficio___'+index
		}
		bloquearCampo(form,rowTable.codCentroCusto);
		bloquearCampo(form,rowTable.valorMovimento);
		bloquearCampo(form,rowTable.percentual);
	}
}