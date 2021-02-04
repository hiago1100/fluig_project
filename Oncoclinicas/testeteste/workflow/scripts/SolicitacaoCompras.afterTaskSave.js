var ativPosInicial = 137;
function afterTaskSave(colleagueId, nextSequenceId, userList) {
	var currentId = getValue("WKNumState");
	if (nextSequenceId == ativPosInicial) {
		preencherIdentificador();
	}
	if(currentId == ''){
		var dsPedido = DatasetFactory.getDataset('ds_pedidoCompra',  new Array(xmlPedido),null, null);
		var codRetorno = dsPedido.getValue(0, "codigoPedido");
		var statusRetorno = dsPedido.getValue(0, "statusRetorno");
		if(codRetorno == 'ERRO'){
			throw "Erro na integração. \n"+statusRetorno;
		}else{
			hAPI.setCardValue("numPedido", codRetorno);
		}
	}
}

function preencherIdentificador() {
	var prioridade = hAPI.getCardValue("hiddenPrioridadeSolicitacao");

	var unidade = hAPI.getCardValue("hiddenFilial");
	var dataInicial = hAPI.getCardValue("dtEmissao");
	var outrosParam = [];

	// outrosParam.push(hAPI.getCardValue("hiddenTipoProdSolicitacao"));
	outrosParam.push(hAPI.getCardValue("hiddenTipoProduto"));

	var identificador = new objIdentificador(prioridade, unidade, dataInicial,
			outrosParam);

}
