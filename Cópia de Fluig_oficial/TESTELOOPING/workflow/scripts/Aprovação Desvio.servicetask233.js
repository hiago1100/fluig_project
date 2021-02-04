function servicetask233(attempt, message) {
	var WKNumProces = getValue("WKNumProces");
	var WKUser = getValue("WKUser");

	var dataset = DatasetFactory.getDataset('ds_consulta_param_aprov', null, null, null);		

	var aprovador = 'Pool:Role:' + dataset.getValue(0,'cod_papel');
	var descAprovador = dataset.getValue(0,'desc_papel');

	try {
		hAPI.setCardValue('cod_aprovador',aprovador);
		hAPI.setCardValue('cont_aprovador','0');

		hAPI.setTaskComments(WKUser, WKNumProces,  0, "Encaminhando para a aprovação do papel " + descAprovador);

	} catch(error) { 
		hAPI.setCardValue('cod_aprovador',aprovador);
		hAPI.setCardValue('cont_aprovador','0');

		hAPI.setTaskComments(WKUser, WKNumProces,  0, "Encaminhando para a aprovação do papel " + descAprovador);
	}
}