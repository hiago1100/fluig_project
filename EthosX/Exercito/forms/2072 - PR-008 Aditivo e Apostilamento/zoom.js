function setSelectedZoomItem(selectedItem){
	
	let id = "";
	let index = "";
	if(selectedItem.inputId.indexOf("___") > -1){
		id = selectedItem.inputId.split('___')[0];
		index = selectedItem.inputId.split('___')[1];
	} else {
		id = selectedItem.inputId;
	}

	if(id == 'nm_contratada'){
		MAIN.clearFieldsContrato();
		$('#cnpj_contratada').val(selectedItem.ds_cnpj)
		MAIN.setFilterZoomContrato();
	}

	if(id == 'nm_contrato'){
		MAIN.clearTableSMs();
		$('#cd_contrato').val(selectedItem.cd_contrato)
		$('#id_gestor_contrato').val(selectedItem.id_gestor_contrato)
		$('#nm_gestor_contrato').val(selectedItem.nm_gestor_contrato)
	}

	if(id == 'num_SM'){
		
		$('#id_fluig_SM___'+index).val(selectedItem.idFluig)
		$('#id_card_SM___'+index).val(selectedItem.documentid)
		$('#id_version_SM___'+index).val(selectedItem.version)
		MAIN.setLinkSMs();
		MAIN.validateContainsSM(selectedItem)
		
	}

}

function removedZoomItem(selectedItem) {
	
	let id = "";
	let index = "";
	if(selectedItem.inputId.indexOf("___") > -1){
		id = selectedItem.inputId.split('___')[0];
		index = selectedItem.inputId.split('___')[1];
	} else {
		id = selectedItem.inputId;
	}

	if(id == 'nm_contratada'){
		MAIN.clearFieldsContratada();
	}
	
	if(id == 'nm_contrato'){
		MAIN.clearFieldsContrato();
	}

	if(id == 'num_SM'){
		window['num_SM___'+index].clear()
		$('#id_fluig_SM___'+index).val('')
		$('#id_card_SM___'+index).val('')
		$('#id_version_SM___'+index).val('')
		MAIN.setLinkSMs();
	}
}