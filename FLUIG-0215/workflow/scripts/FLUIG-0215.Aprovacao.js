function getMatriculaSolicitante() {
	return hAPI.getCardValue('cpMatriculaSolicitante');
}

function getChapaConsultorOrigem() {
	return hAPI.getCardValue('cpChapaConsultorRHOrigem');
}

function getChapaGestorOrigem() {
	return hAPI.getCardValue('cpChapaGestorOrigem');
}

function getChapaGGOrigem() {
	return hAPI.getCardValue('cpChapaGGOrigem');
}

function getChapaSuperOrigem() {
	return hAPI.getCardValue('cpChapaSuperOrigem');
}

function getChapaDiretorOrigem() {
	return hAPI.getCardValue('cpChapaDiretorOrigem');
}

function getChapaConsultorDestino() {
	return hAPI.getCardValue('cpChapaConsultorRHDestino')
}

function getChapaGestorDestino() {
	return hAPI.getCardValue('cpChapaGestorDestino');
}

function getChapaGGDestino() {
	return hAPI.getCardValue('cpChapaGGDestino');
}

function getChapaSuperDestino() {
	return hAPI.getCardValue('cpChapaSuperDestino');
}

function getChapaDiretorDestino() {
	return hAPI.getCardValue('cpChapaDiretorDestino');
}

//Hierarquia Origem
function isConsultorOrigem() {
	return getMatriculaSolicitante() == getChapaConsultorOrigem();
}

function isGestorOrigem() {
	return getMatriculaSolicitante() == getChapaGestorOrigem();
}

function isGerenteGeralOrigem() {
	return getMatriculaSolicitante() == getChapaGGOrigem();
}

function isSuperOrigem() {
	return getMatriculaSolicitante() == getChapaSuperOrigem();
}

function isSecaoTemSuperOrigem() {
	return getChapaSuperOrigem() != '';
}

function isDiretorOrigem() {
	return getMatriculaSolicitante() == getChapaDiretorOrigem();
}

//Hierarquia Destino
function isConsultorDestino() {
	return getMatriculaSolicitante() == getChapaConsultorDestino();
}

function isGestorDestino() {
	return getMatriculaSolicitante() == getChapaGestorDestino() || getMatriculaSolicitante() == getChapaGGDestino() || getMatriculaSolicitante() == getChapaSuperDestino();
}

function isGerenteGeralDestino() {
	return getMatriculaSolicitante() == getChapaGGDestino() || getMatriculaSolicitante() == getChapaSuperDestino() || getChapaGGDestino() == '';
}

function isSuperDestino() {
	return getMatriculaSolicitante() == getChapaSuperDestino() || getChapaSuperDestino() == '';
}

function isSecaoTemSuperDestino() {
	return getChapaSuperDestino() != '';
}


function isDiretorDestino() {
	return getMatriculaSolicitante() == getChapaDiretorDestino();
}


//Aprovações Origem 
function isConsultorAprovou() {
	return hAPI.getCardValue("cpaprovacaoRhOrigem") == '1';
}

function isGestorAprovou() {
	return hAPI.getCardValue("cpAprovacaoGestorOrigem") == '1';
}

function isGerenteGeralAprovou() {
	return hAPI.getCardValue("cpaprovacaoGGOrigem") == '1';
}

function isSuperintendenteAprovou() {
	return hAPI.getCardValue("cpaprovacaoSuperOrigem") == '1';
}

//Aprovações Destino 
function isConsultorDestinoAprovou() {
	return hAPI.getCardValue("cpaprovacaoRHDestino") == '1';
}

function isGestorDestinoAprovou() {
	return hAPI.getCardValue("cpaprovacaoGestorDestino") == '1';
}

function isGerenteGeralDestinoAprovou() {
	return hAPI.getCardValue("cpAprovacaoGGDestino") == '1';
}

function isSuperintendenteDestinoAprovou() {
	return hAPI.getCardValue("cpaprovacaoSuperDestino") == '1';
}

//Direcionamentos Gerais
function isAprovacaoManual() {
	return hAPI.getCardValue('cpAprovacaoprocessamentoManual');
}

function isSolicitanteConferiu() {
	return hAPI.getCardValue('cpAprovacaoConfSolicitante') == '1';
}

function isAprovaFuncionariosInaptos() {
	return hAPI.getCardValue('cpAprovacaoInapto') == '1';
}

function isReaberto() {
	return hAPI.getCardValue("cpReaberturaChamado") == '1';
}

function isRecolherAso() {
	var origem = hAPI.getCardValue("cpObrauSedeOrigem");
	var destino = hAPI.getCardValue("cpObrauSedeDestino");

	return (origem == "OBRA" || destino == "OBRA");
}

function isFuncionarioInapto() {

	var todosAsoNaoRecolhido = verificaAsoRecolhido();
	var funInapto = hAPI.getCardValue("isFuncionariosInaptos")

	if (todosAsoNaoRecolhido == true) {

		return 1;///vai para reabertura

	} else {

		if (funInapto == "true") {
			return 2;//intermediatelink183 - Ciência do solicitante - fu...

		} else {
			return 3;//intermediatelink184 - Processamento da Solicitaçã...

		}

	}
}

function verificaAsoRecolhido() {

	var naoEmTodosAsoRecolhido = true;
	var indexes = getIndexes('cpNomeColaboradorASO'); // quantidade pai x filho
	var iterator = indexes.iterator();

	while (iterator.hasNext()) {
		var index = iterator.next();

		if (hAPI.getCardValue("cpAsoRecolhido___" + index) == '1') {
			naoEmTodosAsoRecolhido = false;
			break;
		}
	}

	return naoEmTodosAsoRecolhido;

}

function isGestorAprovouEmpty() {
	return hAPI.getCardValue("cpAprovacaoGestorOrigem") == '';
}

function isProcessaIntegracaoRM() {
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	log.warn('isProcessaIntegracaoRM');
	log.warn('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');


	var isProcessa = false;
	var indexes = getIndexes('cpNomeColaboradorFolha'); // quantidade pai x filho
	var iterator = indexes.iterator();

	while (iterator.hasNext()) {
		var index = iterator.next();

		log.warn('index');
		log.warn(index);

		if (hAPI.getCardValue("cpProcessadoFolha___" + index) == '1') {
			isProcessa = true;
			break;
		}
	}

	log.warn('isProcessa');
	log.warn(isProcessa);

	return isProcessa;

}

function isConsultorOrigemDestino() {
	return getChapaConsultorDestino() == getChapaConsultorOrigem();
}


