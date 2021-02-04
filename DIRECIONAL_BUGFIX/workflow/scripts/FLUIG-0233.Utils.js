function adicionarComentarios(numProcesso, numEmpresa, numAtividade, usuario, actualThread) {
	var msg = '';

	var comentarios = [

		{ atividade: '2', campoAprovacao: 'cpReaberturaChamado', campoParecer: 'cpParecerReabertura' },
		{ atividade: '14', campoAprovacao: 'cpAprovaN1', campoParecer: 'cpPareceN1' },
		{ atividade: '19', campoAprovacao: 'cpAprovaConfSuprimentos', campoParecer: 'cpPareceConfSuprimentos' },
		{ atividade: '206', campoAprovacao: 'cpAprovaIntegracao1', campoParecer: 'cpPareceIntegracao1' },
		{ atividade: '20', campoAprovacao: 'cpAprovaCotacao', campoParecer: 'cpPareceCotacao' },
		{ atividade: '227', campoAprovacao: 'cpAprovaIntegracao2', campoParecer: 'cpPareceIntegracao2' },
		{ atividade: '240', campoAprovacao: 'cpAprovaIntegracao3', campoParecer: 'cpPareceIntegracao3' },
		{ atividade: '21', campoAprovacao: 'cpAprovaFornecedoreVerba', campoParecer: 'cpPareceFornecedoreVerba' },
		{ atividade: '15', campoAprovacao: 'cpAprovaAprovaCompraGG', campoParecer: 'cpPareceAprovaCompraGG' },
		{ atividade: '16', campoAprovacao: 'cpAprovaCompraSuper', campoParecer: 'cpPareceCompraSuper' },
		{ atividade: '17', campoAprovacao: 'cpAprovaCompraDiretor', campoParecer: 'cpPareceCompraDiretor' },
		{ atividade: '282', campoAprovacao: 'cpAprovaIntegracao4', campoParecer: 'cpParecerIntegracao4' },
		{ atividade: '22', campoAprovacao: 'cpAprovaOrdemCompra', campoParecer: 'cpPareceOrdemCompra' },
		{ atividade: '23', campoAprovacao: 'cpAprovaConfSolicitante', campoParecer: 'cpPareceConfSolicitante' },
		{ atividade: '32', campoAprovacao: 'cpAprovaPrevisaoFornecedor', campoParecer: 'cpParecePrevisaoFornecedor' },
		{ atividade: '313', campoAprovacao: 'cpAprovaLancamentoNF', campoParecer: 'cpPareceLancamentoNF' }

	];

	var comentariosIntegracao = [
		{ atividade: '199', statusIntegracao: 'cpNumeroPedido', numChamado: 'cpNumChamado199' },
		{ atividade: '150', statusIntegracao: '', numChamado: 'cpNumChamado150' },
		{ atividade: '530', statusIntegracao: '', numChamado: 'cpNumChamado530' },
		{ atividade: '525', statusIntegracao: '', numChamado: 'cpNumChamado525' },
	]

	Object.keys(comentarios).forEach(function (key) {
		var aprovacao;
		if (comentarios[key].atividade == numAtividade) {
			if (hAPI.getCardValue(comentarios[key].campoAprovacao) == '1') aprovacao = 'Sim'
			else aprovacao = 'Não'
			msg = 'HISTÓRICO: Aprovado - ' + aprovacao + ' | Parecer - ' + hAPI.getCardValue(comentarios[key].campoParecer);
		}
	});

	Object.keys(comentariosIntegracao).forEach(function (key) {
		if (comentariosIntegracao[key].atividade == numAtividade) {
			if (numAtividade == '199') {
				msg = 'HISTÓRICO: N° Pedido - ' + hAPI.getCardValue(comentariosIntegracao[key].statusIntegracao) + '] | Numero do Chamado de Erro - ' + hAPI.getCardValue(comentariosIntegracao[key].numChamado);

			} else {
				msg = 'HISTÓRICO: Numero do Chamado de Erro - ' + hAPI.getCardValue(comentariosIntegracao[key].numChamado);
			}
		}
	});

	if (numAtividade == '0' || numAtividade == '1') {
		var DemandaUrgente;
		var tpSolicitacao;
		if (hAPI.getCardValue('cpTipoSolicitacao') == '1' ? tpSolicitacao = 'Compra de Materiais ou Produtos' : tpSolicitacao = 'Contratação de Servico de Terceiros')
			if (ehPedidoUrgente() ? DemandaUrgente = 'SIM' : DemandaUrgente = 'NÃO')
				msg = 'HISTÓRICO: Solicitação - ' + tpSolicitacao + ' | Demanda é Urgente? - ' + DemandaUrgente;
	}

	if (msg != '') {
		hAPI.setTaskComments(usuario, numProcesso, actualThread, msg);
	}
};

function getIndexes(fieldReference) {
	var regex = new RegExp(fieldReference + '___');
	var map = hAPI.getCardData(parseInt(getValue('WKNumProces')));
	var iterator = map.keySet().iterator();
	var indexes = new java.util.TreeSet();

	while (iterator.hasNext()) {
		var id = iterator.next();
		if (id.match(regex) == null) continue;
		else indexes.add(id.split('___')[1]);
	}
	return indexes;
}

function ehPedidoUrgente() {

	var dataInicio = new Date(getPedido().DATA_INICIO)
	var dateNow = new Date()
	var dataMaior30 = new Date(dateNow.setDate(dateNow.getDate() + 30))

	return dataInicio <= dataMaior30
}

function getLoginUsuario() {
	var RoleDatasets = DatasetFactory.getDataset("workflowColleagueRole", null, null, null).values;
	var CollegueDatasets = DatasetFactory.getDataset("colleague", null, null, null).values;
	var loginUsuario = '';

	RoleDatasets.forEach(function (papel) {
		var papelObra = 'Pool:Role:DSUP.008'
		var CodUsuario = papel[1];
		var CodPapel = papel[2];

		if ('Pool:Role:' + CodPapel == papelObra) {
			CollegueDatasets.forEach(function (dadoUsuario) {
				var matriculaUsuario = dadoUsuario[1];
				if (CodUsuario == matriculaUsuario) {
					loginUsuario = dadoUsuario[4]
				}
			})
		}

	})	

	return loginUsuario
}