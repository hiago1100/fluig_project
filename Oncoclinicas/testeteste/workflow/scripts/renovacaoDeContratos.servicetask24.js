function servicetask24(attempt, message) {

	hAPI.setCardValue("dataEmissao", formataData(hAPI.getCardValue("dataEmissao")));
	hAPI.setCardValue("dataInicio", formataData(hAPI.getCardValue("dataInicio")));
	hAPI.setCardValue("dataVencReal", formataData(hAPI.getCardValue("dataVencReal")));
	hAPI.setCardValue("vigUltimoContrato", formataData(hAPI.getCardValue("vigUltimoContrato")));
	var idArea = hAPI.getCardValue("idArea");
	var idFilial = hAPI.getCardValue("idFilial");
	if (idArea != "" || idArea == null) {
		log.info("##### -- " + idArea);
		getCompletaDados(idArea, idFilial);
	} else {
		throw "<b>ERRO: </b>Area não informada.";
	}
}

// Insere os valores do aprovador da solicitação e a descrição da filial
function getCompletaDados(idArea, idfilial) {

	//// Buscar Aprovador da solicitação
	if (idArea != "0018" && idArea != "9999") {
		var filtro1 = DatasetFactory.createConstraint("CODIGO_AREA", idArea, idArea, ConstraintType.MUST);
		var constraints = new Array(filtro1);
		var dsGestor = DatasetFactory.getDataset("ds_revisaoSaldoContrato", null, constraints, null);
		var idGestor = dsGestor.getValue(0, "CODIGO_GESTOR");
		var nomeRequisitante = dsGestor.getValue(0, "GESTOR");
		hAPI.setCardValue("idRequisitante", idGestor);
		hAPI.setCardValue('idAprovador', idGestor);
		hAPI.setCardValue('nomeRequisitante', nomeRequisitante);
	} else {
		var filtro1 = DatasetFactory.createConstraint("filial_protheus", idfilial, idfilial, ConstraintType.MUST);
		var filtro2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		var constraints = new Array(filtro1, filtro2);
		var dsGestor = DatasetFactory.getDataset("cad_Filiais", null, constraints, null);
		var idGestor = dsGestor.getValue(0, "codGstFluig");
		var nomeRequisitante = dsGestor.getValue(0, "nomeGestor");
		hAPI.setCardValue("idRequisitante", idGestor);
		hAPI.setCardValue('idAprovador', idGestor);
		hAPI.setCardValue('nomeRequisitante', nomeRequisitante);
	}

	//// Buscar descrição da filial
	var filtro1 = DatasetFactory.createConstraint("CODIGO", idfilial, idfilial, ConstraintType.MUST);
	var constraints = new Array(filtro1);
	var dataset = DatasetFactory.getDataset("ds_filial", null, constraints, null);
	var descricaoFilial = dataset.getValue(0, "DESCRICAO");
	hAPI.setCardValue("filial", idfilial + " - " + descricaoFilial);
}