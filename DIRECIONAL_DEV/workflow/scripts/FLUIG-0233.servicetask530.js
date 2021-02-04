function servicetask530(attempt, message) {
	//Atividade que abre chamado de erro referente à atividade de integra 199

	var numAtividade = getValue("WKNumState");
	var numAtividadeIntegracao = '199'

	var passouNaAtividade = function (numAtividadeIntegracao) {
		return hAPI.getCardValue('cpAtividade' + numAtividadeIntegracao) == '1'
	}

	if (!passouNaAtividade(numAtividadeIntegracao)) {

		hAPI.setCardValue('cpAtividade' + numAtividadeIntegracao, 1)

		//var dados = getDadosGestaoChamadosTi(numAtividadeIntegracao)

		var startProcess = startProcessFluigGcti(numAtividadeIntegracao, getLoginUsuario());

		hAPI.setCardValue('cpNumChamado' + numAtividade, startProcess.get("iProcess"))
	}

	

}
