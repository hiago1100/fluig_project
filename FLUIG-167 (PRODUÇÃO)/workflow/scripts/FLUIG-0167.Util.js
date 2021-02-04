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

		{ atividade: '13', campo: 'cpHistAtv13' },
		{ atividade: '19', campo: 'cpHistAtv19' },
		{ atividade: '143', campo: 'cpObsAcessosIniciais' },
		{ atividade: '8', campo: 'cpHistAtv8' },
		{ atividade: '21', campo: 'cpHistAtv21' },


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