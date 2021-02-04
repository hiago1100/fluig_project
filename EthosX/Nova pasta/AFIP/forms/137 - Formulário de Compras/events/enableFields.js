function enableFields(form) {

	var activity = getValue('WKNumState'); // armazena o número da atividade

	if (activity == 0 || activity == 4) { // Inicio

		form.setVisibleById("panelDadosSolicitacao", true);

	}

	if (activity == 5) { // Verificar requisição

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setEnabled("txtRespostaDuvidaVerificador", false);

		form.setValue('numAtividade', activity);
		form.setValue("txtAprovaRequisicao", "");

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);

		form.setVisibleById("removeProduto", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

	}

	if (activity == 114) { // Duvida

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setEnabled("zoomCentroCusto", true);
		form.setEnabled("DescCentroCusto", true);
		
		form.setEnabled("observacaoVerificador", false);

		form.setVisibleById("txtDuvidaVerificador", true);
		form.setVisibleById("txtRespostaDuvidaVerificador", true);
		form.setEnabled("txtDuvidaVerificador", false);

		form.setVisibleById("motivo", false);
		form.setVisibleById("justificativa", false);
		form.setEnabled("txtAprovaRequisicao", false);

		form.setValue('numAtividade', activity);
		
		/*form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		
		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}*/

	}

	if (activity == 19) { // Avaliar requisição e realizar orçamento

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setValue("txtAprovaRequisicaoCompras", "");

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}
		
		}

	if (activity == 69) { // Duvida sobre requisição

		form.setVisibleById("panelDadosSolicitacao", true);		
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setValue('numAtividade', activity);

		form.setEnabled("txtDuvidaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		form.setValue("txtAprovaRequisicaoCompras", "");
		
		/*form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);*/
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

	}

	if (activity == 24) { // Avaliar Orçamento

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelVerificaRequisicao", true); 

		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		form.setEnabled("txtObservacaoCompras", false);
		

		form.setEnabled("RespostaPreAprovadorS", false);
		form.setEnabled("RespostaPreAprovadorC", false);
		form.setValue("txtAprovacaoPreAProvador", "");

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {			
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
			
		}

	}

	if (activity == 124) { // Aprovação Financeiro

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelVerificaRequisicao", true); 

		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		form.setEnabled("txtObservacaoCompras", false);
		

		form.setEnabled("RespostaPreAprovadorS", false);
		form.setEnabled("RespostaPreAprovadorC", false);
		form.setValue("txtAprovacaoPreAProvador", "");
		form.setEnabled("undNegocio", false);
		form.setEnabled("diretor", false);
		form.setEnabled("txtObsPreAProvadorAprov", false);
		form.setEnabled("txtObservacaoCompras", false);
		// form.setEnabled("txtAprovacaoPreAProvador", false);
		form.setEnabled("RespostaFinanceiroS", false);
		form.setEnabled("RespostaFinanceiroC", false);
		

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {			
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
			
		}

	}

	if (activity == 72) { // Responder Questionamento (Solicitante)

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", false);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", false);
		form.setVisibleById("panelPreAprovador", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setValue("txtAprovaRequisicaoCompras", "");

		form.setEnabled("zoomCentroCusto", false);
		// form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		form.setEnabled("txtObservacaoCompras", false);

		form.setEnabled("DuvidaPreAprovadorS", false);
		// form.setEnabled("txtAprovacaoPreAProvador", false);

		form.setEnabled("undNegocio", false);
		form.setEnabled("txtAprovacaoFinanceiro", false);
		form.setEnabled("DuvidaFinanceiroS", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("checkAprovacaoFornecedor___" + indexes[i], false);
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
		}

	}

	if (activity == 32) { // Responder Questionamento (Comprador)

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", false);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		// form.setValue("txtAprovaRequisicaoCompras", "");

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", true);

		form.setEnabled("DuvidaPreAprovadorC", false);
		// form.setEnabled("txtAprovacaoPreAProvador", false);
		form.setEnabled("txtObservacaoCompras", false);

		form.setEnabled("undNegocio", false);
		form.setEnabled("txtAprovacaoFinanceiro", false);
		form.setEnabled("DuvidaFinanceiroC", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("checkAprovacaoFornecedor___" + indexes[i], false);
			//form.setEnabled("nomeFornecedor___" + indexes[i], false);
			//form.setEnabled("valorFornecedor___" + indexes[i], false);
			
		}

	}

	if (activity == 35) { // Aprovação Diretoria

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		
		form.setEnabled("diretor", false);
		form.setEnabled("undNegocio", false);
		form.setEnabled("txtObsPreAProvadorAprov", false);
		form.setEnabled("txtObservacaoCompras", false);
		// form.setEnabled("txtAprovacaoPreAProvador", false);
		
		form.setEnabled("txtObsFinanceiro", false);
		form.setEnabled("txtObsFinanceiroAprov", false);
		form.setEnabled("txtObservacaoFinanceiro", false);
		form.setEnabled("txtAprovacaoFinanceiro", false);
		form.setEnabled("diretorFinanceiro", false);
		form.setEnabled("DuvidaFinanceiroC", false);
		form.setEnabled("DuvidaFinanceiroS", false);
		form.setEnabled("RespostaFinanceiroS", false);
		form.setEnabled("RespostaFinanceiroC", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			// form.setEnabled("checkAprovacaoFornecedor___" + indexes[i],false);

			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
		}

	}

	if (activity == 61) { // Classificar

		form.setVisibleById("panelDadosSolicitacao", true);
		form.setVisibleById("panelVerificaRequisicao", true);
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelPreAprovador", true);
		// form.setVisibleById("panelAprovaoDiretoria", true);
		form.setVisibleById("panelClassificar", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		// form.setEnabled("txtAprovacaoPreAProvador", false);
		form.setEnabled("diretor", false);
		form.setEnabled("txtObsPreAProvadorAprov", false);
		form.setEnabled("txtObservacaoCompras", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("checkAprovacaoFornecedor___" + indexes[i], false);
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
		}

	}

	if (activity == 41) { // Informar dados da compra

		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);
		form.setEnabled("undNegocio", false);
		// form.setEnabled("txtAprovacaoPreAProvador", false);
		form.setEnabled("diretor", false);
		form.setEnabled("txtObsPreAProvadorAprov", false);
		
		form.setEnabled("txtAprovacaoFinanceiro", false);
		form.setEnabled("diretorFinanceiro", false);
		form.setEnabled("txtObsFinanceiroAprov", false);

		form.setEnabled("txtAprovacaoDiretoria", false);
		form.setEnabled("txtObsDiretoria", false);
		form.setEnabled("txtObservacaoCompras", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("checkAprovacaoFornecedor___" + indexes[i], false);
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
		}

	}

	if (activity == 95) { // Entrega

		form.setVisibleById("panelDadosSolicitacao", true);		
		form.setVisibleById("panelAvaliarRequisicaoOrcamento", true);
		form.setVisibleById("panelDadosdaCompra", true);
		form.setVisibleById("panelAprovacaoOrcamento", false);
		form.setVisibleById("panelEntrega", true);

		form.setValue('numAtividade', activity);
		form.setEnabled("txtRespostaCompras", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		form.setEnabled("zoomCentroCusto", false);
		form.setEnabled("DescCentroCusto", false);
		form.setEnabled("zoomPreAprovador", false);
		form.setEnabled("txtPrioridade", false);
		form.setEnabled("txtJustificativaPedido", false);
		form.setEnabled("txtAprovaRequisicao", false);
		form.setEnabled("observacaoVerificador", false);
		form.setEnabled("txtAprovaRequisicaoCompras", false);

		// form.setEnabled("txtAprovacaoPreAProvador", false);
		form.setEnabled("diretor", false);
		form.setEnabled("txtObsPreAProvadorAprov", false);
		form.setEnabled("txtAprovacaoDiretoria", false);
		form.setEnabled("txtObsDiretoria", false);
		form.setEnabled("txtObservacaoCompras", false);

		form.setEnabled("undNegocio", false);
		form.setEnabled("txtAprovacaoFinanceiro", false);
		form.setEnabled("diretorFinanceiro", false);
		form.setEnabled("txtObsFinanceiroAprov", false);

		var indexes = form.getChildrenIndexes("tableItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("quantidadeProduto___" + indexes[i], false);
			form.setEnabled("nomeProduto___" + indexes[i], false);
			form.setEnabled("descricaoProduto___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableFornecedor");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("checkAprovacaoFornecedor___" + indexes[i], false);
			form.setEnabled("nomeFornecedor___" + indexes[i], false);
			form.setEnabled("condicaoPagamento___" + indexes[i], false);
			form.setEnabled("prazoEntrega___" + indexes[i], false);
			form.setEnabled("valorFornecedor___" + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tableDadosDaCompra");
		for (var i = 0; i < indexes.length; i++) {			
			form.setEnabled("nomeFornecedor2___" + indexes[i], false);
			form.setEnabled("valorFornecedor2___" + indexes[i], false);
			form.setEnabled("fornecedorAnexo2___" + indexes[i], false);
		}

	}

}
