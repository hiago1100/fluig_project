function buscaHistorico(codProcesso) {
	var fields = null;

	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("processHistoryPK.processInstanceId", codProcesso, codProcesso, ConstraintType.MUST));
	var sortingFields = new Array("processHistoryPK.movementSequence");

	var dataset = DatasetFactory.getDataset("processHistory", fields, constraints, sortingFields);
	var count = dataset.rowsCount;

	return dataset.getValue(count - 2, "stateSequence");

};

function adicionarComentarios(numProcesso, numEmpresa, numAtividade, usuario, actualThread) {
	var msg = '';

	var comentarios = [

		{ atividade: '2', campo: 'cpParecerReabertura' },
		{ atividade: '18', campo: 'cpParecerSolicitanteExcecao' },
		{ atividade: '20', campo: 'cpParecerConsultoriaRhExcecao' },
		{ atividade: '22', campo: 'cpParecerRemuneracao' },
		{ atividade: '25', campo: 'cpParecerGestorAreaExcecao' },
		{ atividade: '26', campo: 'cpParecerGerenteAreaExcecao' },
		{ atividade: '28', campo: 'cpParecerSupAreaExcecao' },
		{ atividade: '30', campo: 'cpParecerDiretorAreaExcecao' },
		{ atividade: '32', campo: 'cpParecerGestorDestino' },
		{ atividade: '34', campo: 'cpParecerGestorCSC' },
		{ atividade: '37', campo: 'cpParecerGestorRH' },
		{ atividade: '40', campo: 'cpParecerRecolhimentoDoc' },
		{ atividade: '42', campo: 'cpParecerExcecaoCSC' },
		{ atividade: '43', campo: 'cpParecerAjuste' },
		{ atividade: '44', campo: 'cpParecerConferencia' }

	];

	Object.keys(comentarios).forEach(function (key) {
		if (comentarios[key].atividade == numAtividade) {
			msg = 'Parecer: ' + hAPI.getCardValue(comentarios[key].campo);
		}
	});

	if (msg != '') {
		hAPI.setTaskComments(usuario, numProcesso, actualThread, msg);
	}
};
