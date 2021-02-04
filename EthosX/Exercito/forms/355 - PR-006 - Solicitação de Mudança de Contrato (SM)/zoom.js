function setSelectedZoomItem(selectedItem){
	
	let id = "";
	let index = "";
	if(selectedItem.inputId.indexOf("___") > -1){
		id = selectedItem.inputId.split('___')[0];
		index = selectedItem.inputId.split('___')[1];
	} else {
		id = selectedItem.inputId;
	}

	if(id == 'nmContratada'){
		MAIN.clearFieldsContrato();
		$('#cnpjContratada').val(selectedItem.ds_cnpj)
		MAIN.setFilterZoomContrato();
	}

	if(id == 'contrato'){
		MAIN.clearFieldsObrigacoesAcessorias();
		MAIN.clearFieldsEtapas();
		$('#idContrato').val(selectedItem.cd_contrato)
		MAIN.setFilterZoomSecao();

		let constraintsContratos = new Array()
		constraintsContratos.push(DatasetFactory.createConstraint("metadata#active", 'true', 'true', ConstraintType.MUST))
		constraintsContratos.push(DatasetFactory.createConstraint('cd_contrato', selectedItem.cd_contrato, selectedItem.cd_contrato, ConstraintType.MUST))
		let fieldsContrato = new Array('cd_contrato','id_gestor_contrato','nm_gestor_contrato','ds_cnpj_contratada','nm_contratada')
		let dsDadosContrato = DatasetFactory.getDataset('geral_cadastro_contratos', fieldsContrato, constraintsContratos, null)

		if(dsDadosContrato != null && dsDadosContrato != undefined && dsDadosContrato.values.length > 0){

			$('#idGestorContrato').val(dsDadosContrato.values[0].id_gestor_contrato)
			$('#nmGestorContrato').val(dsDadosContrato.values[0].nm_gestor_contrato)

			if($('input[name="solicitadoPor"]:checked').val() == 'contratada') {
				$('#cnpjContratada').val(dsDadosContrato.values[0].ds_cnpj_contratada)
				window['nmContratada'].setValue(dsDadosContrato.values[0].nm_contratada);
			}
		} else {
			FLUIGC.toast({
				title: 'Erro:',
				message: 'Não foi possível buscar dados do Contrato selecinado (dataset geral_cadastro_contratos). Entre em contato com Administrador SAFE.',
				type: 'danger'
			});

		}

	}

	if(id == 'secao'){
		$('#idSecao').val(selectedItem.txt_sigla)
		$('#idChefeSecao').val('Pool:Group:' + selectedItem.num_id_grupo_chefe)
	}

	if(id == 'obrigacaoAcessoria'){
		$('#idObrigacaoAcessoria___'+index).val(selectedItem.cod_obrigacao_acessoria)
	}

	if(id == 'etapa'){
		$('#idEtapa___'+index).val(selectedItem.cd_etapa)
	}

	if(id == "nmDemandado"){	
		$('#cargoDemandado').val(selectedItem['cargo']);
		$('#experienciaDemandado').val(selectedItem['experiencia']);
		$('#secaoDemandado').val(selectedItem['secao']);
		$('#idDemandado').val(selectedItem['matricula']);
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

	if(id == 'nmContratada'){
		MAIN.clearFieldsContratada();
	}
	
	if(id == 'contrato'){
		MAIN.clearFieldsContrato();
	}

	if(id == 'secao'){
		MAIN.clearFieldsSecao()
	}

	if(id == 'obrigacaoAcessoria'){
		$('#idObrigacaoAcessoria___'+index).val('')
	}

	if(id == 'etapa'){
		$('#idEtapa___'+index).val('')
	}
}