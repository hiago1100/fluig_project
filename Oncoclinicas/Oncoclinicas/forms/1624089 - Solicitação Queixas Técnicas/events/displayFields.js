function displayFields(form,customHTML){
	var CURRENT_STATE = getValue('WKNumState');
	customHTML.append('<script> var CURRENT_STATE = '+CURRENT_STATE+';</script>');
	customHTML.append('<script> var MODO_EDICAO = '+form.getFormMode()+';</script>');
	
	if(CURRENT_STATE == INICIO || CURRENT_STATE == '0' ){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeSolicitante', usuarioLogado.nome);
		form.setValue('dataSolicitante', data);
		form.setValue('codSolicitante', usuarioLogado.id);
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		form.setVisibleById('fieldsetNumChamadoNF', false);
		
	}
	
	if(CURRENT_STATE == VALIDAR_FORMULARIO){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeUserMatMed', usuarioLogado.nome);
		form.setValue('dataUserMatMed', data);
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		form.setVisibleById('fieldsetNumChamadoNF', false);
		
		bloqueiaSolicitante(form);
	}
	
	if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		form.setVisibleById('fieldsetNumChamadoNF', false);
		
		bloqueiaMatMed(form)
	}
	
	if(CURRENT_STATE == RETORNO_FORNECEDOR){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeUserMatMedRetorno', usuarioLogado.nome);
		form.setValue('dataUserMatMedRetorno', data);
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		form.setVisibleById('fieldsetNumChamadoNF', false);
		
		if(form.getValue('equipamentoRecolhido') == ""){
			form.setVisibleById('fieldsetColetaItem', false);
		}
		
		bloqueiaSolicitante(form);
		bloqueiaColetaRegistroNFD(form);
	}
	
	if(CURRENT_STATE == COLETA_REGISTRA_NFD){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeSolicitanteUnidade', usuarioLogado.nome);
		form.setValue('dataSolicitanteUnidade', data);
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		form.setVisibleById('fieldsetNumChamadoNF', false);
		
		bloqueiaSolicitante(form);
		bloqueiaRetornoFornec(form);
	}
	
	if(CURRENT_STATE == AGUARDANDO_RETORNO_FORNECEDOR){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeSolicitanteMatMed2', usuarioLogado.nome);
		form.setValue('dataSolicitanteMatMed2', data);
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAprovSolicitante', false);
		form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		
		if(form.getValue('seraRecolhido') == "NAO"){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		if(form.getValue('numChamadoNF') == ""){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		bloqueiaSolicitante(form);
	}
	
	if(CURRENT_STATE == APROVACAO_SOLICITANTE){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeSolicitanteAprov', usuarioLogado.nome);
		form.setValue('dataSolicitanteAprov', data);
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		if(form.getValue('aprovSolicitacao') == ""){
			form.setVisibleById('fieldsetSolucaoInconsistencia', false);
		}
		
		if(form.getValue('laudoEnviado') == ""){
			form.setVisibleById('semRetornofornecedor', true);
		}
		
		if(form.getValue('seraRecolhido') == "NAO"){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		if(form.getValue('numChamadoNF') == ""){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		bloqueiaSolicitante(form);
		bloqueiaSolucaoInconsistencia(form);
	}
	
	if(CURRENT_STATE == SOLUCAO_INCONSISTENCIA){
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		
		form.setValue('nomeUserInconsistencia', usuarioLogado.nome);
		form.setValue('dataUserInconsistencia', data);
		
		form.setVisibleById('fieldsetMatMed', false);
		form.setVisibleById('fieldsetRetornoFornecedor', false);
		form.setVisibleById('fieldsetColetaItem', false);
		form.setVisibleById('fieldsetAguardaRetornoFornecedor', false);
		
		if(form.getValue('seraRecolhido') == "NAO"){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		if(form.getValue('numChamadoNF') == ""){
			form.setVisibleById('fieldsetNumChamadoNF', false);
		}
		
		bloqueiaSolicitante(form);
		bloqueiaAprovaSolicitante(form);
	}
	
}


//Busca o Usuário logado
function getCurrentUser(){
	var user = {};
	
	user.id = getValue('WKUser');
	
	var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', user.id, user.id, ConstraintType.MUST);
	var constraints = new Array(c1);
	
	var ds_colleague = DatasetFactory.getDataset('colleague', null, constraints, null);
	
	user.nome = ds_colleague.getValue(0, 'colleagueName');
	
	return user;
}


//Busca a data atual
function getCurrenteDate(){
	var dia = new Date().getDate().toString();
	var mes = (new Date().getMonth() + 1).toString();
	var ano = new Date().getFullYear().toString();
	
	if (dia.length == 1)
		dia = 0 + dia;
	if (mes.length == 1)
		mes = 0 + mes;
	
	return dia + "/" + mes + "/" + ano
}

function bloqueiaSolicitante(form){
	form.setEnabled("cnpjFilial", false);
	form.setEnabled("codProduto", false);
	form.setEnabled("loteProduto", false);
	form.setEnabled("validadeProduto", false);
	form.setEnabled("tipoDesvio", false);
	form.setEnabled("notificacaoNotivisa", false);
	form.setEnabled("aceiteEvidencia", false);
	form.setEnabled("descricaoDesvio", false);
	form.setEnabled("fornecedor", false);
	form.setEnabled("nfProduto", false);
	form.setEnabled("numSeloRastreabilidade", false);
	form.setEnabled("qtdDesvio", false);
	form.setEnabled("recolhimentoProduto", false);
	form.setEnabled("situacaoEstoque", false);
	form.setEnabled("devolverUnidades", false);
	form.setEnabled("qtdMesmoLote", false);
	form.setEnabled("adminEmPaciente", false);
	form.setEnabled("impactoPaciente", false);
	form.setEnabled("nomeResponsavel", false);
	form.setEnabled("numConselhoProfi", false);
	form.setEnabled("uf", false);
	form.setEnabled("descricaoImpacto", false);
}

function bloqueiaMatMed(form){
	form.setEnabled("aprovMatMed", false);
	form.setEnabled("descMatMed", false);
	form.setEnabled("emailFornecedor", false);
}

function bloqueiaRetornoFornec(form){
	form.setEnabled("seraRecolhido", false);
	form.setEnabled("dataAproximada", false);
	form.setEnabled("observacaoRetorno", false);
}

function bloqueiaColetaRegistroNFD(form){
	form.setEnabled("equipamentoRecolhido", false);
	form.setEnabled("observacaoNaoRecolhido", false);
}

function bloqueiaAprovaSolicitante(form){
	form.setEnabled("aprovSolicitacao", false);
	form.setEnabled("MotivoReprovSoli", false);
}

function bloqueiaSolucaoInconsistencia(form){
	form.setEnabled("solucaoInconsistencia", false);
}