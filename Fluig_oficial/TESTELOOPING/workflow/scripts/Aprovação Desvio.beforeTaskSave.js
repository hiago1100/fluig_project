function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var WKNumProces = getValue("WKNumProces");
	var WKUser = getValue("WKUser");	

	if(nextSequenceId == '233'){
		var dataset = DatasetFactory.getDataset('ds_consulta_param_aprov', null, null, null);
		if(!dataset)
			throw "Não há aprovadores cadastrados!";
		
		if(dataset.rowsCount < 1)
			throw "Não há aprovadores cadastrados!";
	}
	
	if(nextSequenceId == '238'){
		var dataset = DatasetFactory.getDataset('ds_consulta_param_aprov', null, null, null);		

		var cont = dataset.rowsCount - 1;
		var cont_aprovador = parseInt(hAPI.getCardValue('cont_aprovador'));

		if(cont_aprovador < cont){
			var ctap = cont_aprovador + 1;

			var aprovador = 'Pool:Role:' + dataset.getValue(ctap,'cod_papel');
			var descAprovador = dataset.getValue(ctap,'desc_papel');

			hAPI.setCardValue('cod_aprovador',aprovador);
			hAPI.setCardValue('cod_aprovador',aprovador);
			hAPI.setCardValue('cont_aprovador',ctap);
			hAPI.setCardValue('envia_aprovador','sim');			

			hAPI.setTaskComments(WKUser, WKNumProces,  0, "Encaminhando para a aprovação do papel " + descAprovador);

		} else {
			hAPI.setCardValue('envia_aprovador','nao');
		}
	}
	
	if(nextSequenceId == '122'){
		hAPI.setTaskComments(WKUser, WKNumProces,  0, "Solicitação aprovada!");
	}
}