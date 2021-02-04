function displayFields(form,customHTML){ 
	
	var activity = getValue('WKNumState');
	var colaborador = buscaUsuario();
	form.setValue("txt_NumeroMudanca", "CHG-BR" + getValue("WKNumProces"));
	form.setValue('numAtividade', activity);	
	form.setVisibleById("panel_ExecucaoGMUD", false);	
		
	
	if (activity == 0 || activity == 4) { // Inicio		

		form.setValue("txt_Nome", colaborador.getValue(0,"zoomSolicitante"));
		form.setValue("txt_telefone_01", colaborador.getValue(0,"txt_telefone_01"));
		form.setValue("txt_telefone_02", colaborador.getValue(0,"txt_telefone_02"));
		form.setValue("txt_telefone_02", colaborador.getValue(0,"txt_telefone_02"));
		form.setValue("txt_NomeGestor", colaborador.getValue(0,"zoomGestor"));
		form.setValue("txt_departamento", colaborador.getValue(0,"txt_departamento"));
		form.setValue("txt_Cargo", colaborador.getValue(0,"txt_Cargo"));
		form.setValue("dt_dataSolicitacao", buscaDataAtual());
		form.setValue("txt_NumeroMudanca", "");	
		
		
		form.setVisibleById("abaEscondida", false);			
	    var indexes = form.getChildrenIndexes("tableAtividadesMudanca");
	    form.setValue("qtdRegistros", indexes.length);	 	    
	    	    
		
	}	
	
	if (activity == 12 || activity == 183 || activity == 66 || activity == 21 || activity == 199 || activity == 75 || activity == 28 || activity == 42 || activity == 49 || activity == 104 || activity == 107 || activity == 35 || activity == 130 || activity == 140) {  //Avaliar solicitação
	
		//Ocultar Botão Add Itens PaiXFilho
		
		form.setVisibleById("addItens", false);	
		form.setVisibleById("addItens_planoTete", false);	
		form.setVisibleById("addItens_planoDeVolta", false);	
		form.setVisibleById("addItens_escalonamento", false);
		
		
		//Ocultar Lixeira
		
		form.setHideDeleteButton(true);		
							
	
	}
	
	if (activity == 12) { //Aprovacao Sysadmins
		
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);		
		
		form.setValue("aprovacao_sysadmins", "");
		form.setValue("txtObservacoesSysadmins", "");
		
		
		
		
	}
	
	if (activity == 183) { //DBA
		
		form.setVisibleById("panelaprovacaoSysadmins", false);		
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_DBA", "");
		form.setValue("txtObservacoesDBA", "");
		
		
	}
	
	if (activity == 66) { //Telecom
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Telecom_2", "");
		form.setValue("txtObservacoesTelecom", "");
		
		
	}
	
	if (activity == 21) { //Network
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);				
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Network", "");
		form.setValue("txtObservacoesNetwork", "");
		
	}
	
	if (activity == 199) { //Seguranca
		
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);			
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Seguranca", "");
		form.setValue("txtObservacoesSeguranca", "");
		
		
	}
	
	if (activity == 75) { //Workplace
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);		
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		
		form.setValue("aprovacao_Workplace", "");
		form.setValue("txtObservacoesWorkplace", "");
		
	}
	
	if (activity == 28) { //Desenvolvimento
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);				
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Desenvolvimento", "");
		form.setValue("txtObservacoesDesenvolvimento", "");
		
		
	}
	
	if (activity == 42) { //Fornecedor
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);				
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Fornecedor_2", "");
		form.setValue("txtObservacoesFornecedor", "");
		
		
	}
	
	if (activity == 49) { //Gerente_1
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);				
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);
		
		form.setValue("aprovacao_Gerente_1", "");
		form.setValue("txtObservacoesGerente_1", "");
		
		
	}
	
	if (activity == 104) { //Gerente_2
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);		
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Gerente_2", "");
		form.setValue("txtObservacoesGerente_2", "");
		
		
	}
	
	if (activity == 107) { //Gerente_3
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_Gerente_3", "");
		form.setValue("txtObservacoesGerente_3", "");
		
		
	}
	
	if (activity == 35) { //Diretoria_TI
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);			
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);
		
		form.setValue("aprovacao_DiretoriaTI", "");
		form.setValue("txtObservacoesDiretoriaTI", "");
		
		
	}
	
	if (activity == 130) { //Area de Nagócios
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoDiretoriaNegocios", false);	
		
		form.setValue("aprovacao_AreaNegocios", "");
		form.setValue("txtObservacoesAreaNegocios", "");
		
		
	}
	
	if (activity == 140) { //Diretoria - Area Negocios
		
		form.setVisibleById("panelaprovacaoSysadmins", false);
		form.setVisibleById("panelaprovacaoDBA", false);	
		form.setVisibleById("panelApvTelecom", false);	
		form.setVisibleById("panelaprovacaoNetwork", false);	
		form.setVisibleById("panelaprovacaoSeguranca", false);	
		form.setVisibleById("panelaprovacaoWorkplace", false);	
		form.setVisibleById("panelApvDesenvolvimento", false);	
		form.setVisibleById("panelaprovacaoFornecedor", false);	
		form.setVisibleById("panelaprovacaoGerente_1", false);	
		form.setVisibleById("panelaprovacaoGerente_2", false);	
		form.setVisibleById("panelaprovacaoGerente_3", false);	
		form.setVisibleById("panelaprovacaoDiretoriaTI", false);	
		form.setVisibleById("panelaprovacaoAreaNegocios", false);	
		
		form.setValue("aprovacao_DiretoriaNegocios", "");
		form.setValue("txtObservacoesDNegocios", "");
	
		
		
	}
	
	if (activity == 18 || activity == 185 || activity == 68 || activity == 25 || activity == 201 || activity == 77 || activity == 32 || activity == 46 || activity == 53 || activity == 106 || activity == 109 || activity == 39 || activity == 132 || activity == 142) { //Corrigir Informações
		
		form.setVisibleById("abaEscondida", false);	
		
	}
	
	if (activity == 243 ) { //Execução GMUD
		
		form.setVisibleById("panel_ExecucaoGMUD", true);	
		
		
	}

	
	
	
	
}

function buscaDataAtual() {

	var dataAtual = new Date();
	var dia = dataAtual.getDate();
	var mes = dataAtual.getMonth();
	var ano = dataAtual.getFullYear();
	var mesForm = mes + 1;
	if ((mesForm + "").length < 10) {
		mesForm = "0" + mesForm;
	}

	if((dia + "").length == 1)
		dia = "0" + dia;
	
	var dataForm = "" + dia + "/" + mesForm + "/" + ano + "";

	return dataForm;

}


function buscaUsuario() {

	var c1 = DatasetFactory.createConstraint("matriculaUsuario",
			getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraints = new Array(c1);
	var colaborador = DatasetFactory.getDataset("ds_cadastroSolicitanteNovo", null, constraints,	null);

	return colaborador;

}







