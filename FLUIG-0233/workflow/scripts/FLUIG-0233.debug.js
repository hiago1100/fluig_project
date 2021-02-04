function gravarDebugLog(bool, numAtividade) {
	if (bool) {
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - COMPRA DE MATERIAIS OU CONTRATAÇÃO DE SERVIÇOS DE TERCEIROS - FLUIG-0233');
		log.warn('AprovaReabertura() ' + AprovaReabertura());
		log.warn('AprovacaoN1() ' + AprovacaoN1());
		log.warn('AprovaConfSuprimentos() ' + AprovaConfSuprimentos());
		log.warn('AprovaIntegracao1() ' + AprovaIntegracao1());
		log.warn('AprovaMapaCotacao() ' + AprovaMapaCotacao());
		log.warn('AprovaCompraN1() ' + AprovaCompraN1());
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_15) ' + verificarPedidoMenorQueAlcada('cpAlcada_15'));
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_16) ' + verificarPedidoMenorQueAlcada('cpAlcada_16'));
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_17) ' + verificarPedidoMenorQueAlcada('cpAlcada_17'));
		log.warn('hasN2() ' + hasN2());
		log.warn('hasN3() ' + hasN3());
		log.warn('hasN4() ' + hasN4());
		log.warn('AprovaCompraN2() ' + AprovaCompraN2());
		log.warn('AprovaCompraN3() ' + AprovaCompraN3());
		log.warn('AprovaCompraN4() ' + AprovaCompraN4());
		log.warn('AprovaIntegracao4() ' + AprovaIntegracao4());
		log.warn('AprovaAreaPlanejamento() ' + AprovaAreaPlanejamento());
		log.warn('AprovaLancamentoOrdemCompra() ' + AprovaLancamentoOrdemCompra());
		log.warn('AprovaConferenciaSolicitante() ' + AprovaConferenciaSolicitante());
		log.warn('AprovaPrevisaoFornecedor() ' + AprovaPrevisaoFornecedor());
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_15) ' + verificarPedidoMenorQueAlcada('cpAlcada_15'));
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_16) ' + verificarPedidoMenorQueAlcada('cpAlcada_16'));
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_17) ' + verificarPedidoMenorQueAlcada('cpAlcada_17'));
		log.warn('verificarPedidoMenorQueAlcada(cpAlcada_18) ' + verificarPedidoMenorQueAlcada('cpAlcada_18'));
		log.warn('getUsuariosPorPapel(hAPI.getCardValue("cpPapelN1")) ' + getUsuariosPorPapel(hAPI.getCardValue("cpPapelN1")));
		log.warn('getUsuariosPorPapel(hAPI.getCardValue("cpPapelN2")) ' + getUsuariosPorPapel(hAPI.getCardValue("cpPapelN2")));
		log.warn('getUsuariosPorPapel(hAPI.getCardValue("cpPapelN3")) ' + getUsuariosPorPapel(hAPI.getCardValue("cpPapelN3")));
		log.warn('getUsuariosPorPapel(hAPI.getCardValue("cpPapelN4")) ' + getUsuariosPorPapel(hAPI.getCardValue("cpPapelN4")));
		log.warn('getPedido() ');
		log.dir(getPedido());
		log.warn('getDescricaoProcesso() ' + getDescricaoProcesso());
		log.warn('isDataMobile(Data Entrega Contratacao) ' + isDataMobile(hAPI.getCardValue('cpDataEntregaContratacao')));
		log.warn('isDataMobile(Mes PL) ' + isDataMobile(hAPI.getCardValue('cpMesPl')));
		log.warn('getLoginUsuario() ' + getLoginUsuario());
	}
}

function isDebug(processo) {
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1016', "'" + processo + "'"], constraints, null);

	if (dados == null && dados.rowsCount == 0) {
		throw "FALHA AO BUSCAR O DEBUG.";
	}

	return dados.getValue(0, "DEBUG");;
}