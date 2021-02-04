function validateForm(form, customHTML) {
	var proximaAtividade = parseInt(getValue("WKNextState"));
	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";

	if (atividade == 80) {
	    var aprovacaoProcessamento = form.getValue('aprovarPMP');

	    if (aprovacaoProcessamento == 4) {
	        if (form.getValue('cpHouveCCT') == '') {
	            msg += "<br>CCT existente não informado.";
	        }
            if (form.getValue('parecerPMP') == '') {
                msg += "<br>Parecer não informado.";
            }
	    }

	    if ((aprovacaoProcessamento == 1) || (aprovacaoProcessamento == 4)) {
	        if (form.getValue('cpConfMatriculaAtual') == "") {
	            msg += "<br>Favor carregar dados do colaborador.";
	        }
	    }
	}

	if (form.getValue('cpTipoSecao') == 'SECAO_NAO_REGISTRADA') {
	    throw 'Seção não registrada, contate o administrador';
	}

	if (form.getValue("cpMatriculaSolicitante") == form.getValue("cpMatricula")) {
		msg += "Não é permitido abertura de chamado para o próprio colaborador.<br>";
	}

	var situacao = form.getValue("cpSituacaoColaborador");

	if (situacao == "") {
		msg += "Situação do colaborador inválida.<br>";
	}

	if ((form.getValue('cpTipoMaoObra') == '1') && (form.getValue('cpTransferenciaKm') == '1')) {
		msg += "Tipo de Mão de obra 'Produção não pode ser movimentado além de 300Km.";
	}

	if((proximaAtividade == 141) && (form.getValue("cpAvancoAutomatico") != "1")){
		msg += "Selecione outra atividade.<br>";
	}

	// Verifica se cpMesCompetencia foi preenchido
	if (form.getValue("cpMesCompetencia") == "") {
		msg += "O campo 'Mêss de competência da Movimentação' está vazio.";
	}


	// Verifica se o tipo de m?o de obra foi selecionado
	if ((form.getValue("cpTipoMaoObra") == '0') || (form.getValue("cpTipoMaoObra") == '')) {
		msg += "O campo 'Tipo de Mão de Obra' está vazio.";
	}

	// VERIFICA SE OBRA/DEP DE ORIGEM FOI SELECIONADO
	if (form.getValue("cpZoomObraDep") == "") {
		msg += "O campo 'Obra/Departamento' está vazio.";
	}

	if (form.getValue("cpCodEmpresa") == "") {
		msg += "O campo 'Código da Empresa' está vazio.";
	}

	if (form.getValue("cpDoisEmpresa") == "") {
		msg += "O campo 'Empresa' está vazio.";
	}


	// VERIFICA SE COLABORADOR FOI SELECIONADO
	if (form.getValue("cpColaborador") == "") {
		msg += "O campo 'Colaborador' está vazio.";
	}

	if (form.getValue("cpFuncaoAtual") == "") {
		msg += "O campo 'Função atual' está vazio.";
	}

	if (form.getValue("cpMatricula") == "") {
		msg += "O campo Matricula está vazio.";
	}

	if (form.getValue("cpSalario") == "") {
		msg += "O campo 'Salário Atual' está vazio.";
	}

	if (form.getValue("cpDataAdmissao") == "") {
		msg += "O campo 'Data de Admissão' está vazio.";
	}


	// VALIDA DADOS DA TRANSFER?NCIA
	if (form.getValue("cpTransferencia") == "0") {
		msg += "O campo 'Transferência' está vazio.";
	}

	if (form.getValue("cpTransferencia") == "1") {

		if (form.getValue("aprovarDiretoria") == "3") {
			msg += "Opção de reprovação inválida.";
		}

		// VALIDA DADOS DA OBRA/DEP DE DESTINO
		if(form.getValue("cpZoomNovaObraDepTransPadrao") == "") {
			msg += "O campo 'Nova Obra/Departamento' está vazio.";
		}

		if(form.getValue("cpCodigoEmpresaASKmSim") == "")
		{
			msg += "O campo 'Código da Empresa' está vazio.";
		}

		if(form.getValue("cpNovaEmpresaKmSim") == ""){
			msg += "O campo 'Nova Empresa' está vazio.";
		}

		if(form.getValue("cpNovoGestorKmSim") == "") {
			msg += "O campo 'Novo Gestor' está vazio.";
		}

		// Valida dados da mudan?a
		if(form.getValue("cpTransferenciaKm") == "1") {

			if(form.getValue("cpAdicionalTransferencia") == "") {
				msg += "O campo 'Adicional Transferência' está vazio.";
			}

			if((form.getValue("cpNovoSalarioComAdicional") == "") && (form.getValue("cpAdicionalTransferencia") != "0%") && (form.getValue("cpTipoMovimentacao") != 4) && (form.getValue("cpTipoMovimentacao") != 5)) {
				msg += "O campo 'Novo Salário com adicional' está vazio.";
			}

			if(form.getValue("cpMudanca") == "") {
				msg += "O campo 'Mudança' está vazio.";
			}

			if((form.getValue("cpMembrosFamilia") == "") && (form.getValue("cpMudanca") == 1)) {
				msg += "O campo 'Membros da Fam&iacute;lia' está vazio.";
			}

			if((form.getValue("cpQuantidadeMembros") == "") && (form.getValue("cpMudanca") == 1)) {
				msg += "O campo 'Quantidade de Membros' está vazio.";
			}

			if(form.getValue("cpTipoMoradia") == "") {
				msg += "O campo 'Tipo de Moradia' está vazio.";
			}

			if((form.getValue("cpAuxilioInstalacao") == "") && (form.getValue("cpMudanca") == 1)) {
				msg += "O campo 'Auxilio Instalação' está vazio.";
			}

			if((form.getValue("cpValorAuxilio") == "") && (form.getValue("cpAuxilioInstalacao") == 1)) {
				msg += "O campo 'Valor do Auxilio' está vazio.";
			}

			if(parseFloat(form.getValue("cpValorAuxilio")) > 5000) {
				msg += "O campo 'Valor do Auxilio' nao pode exceder 5.000";
			}

			if((form.getValue("cpDataAuxilio") == "") && (form.getValue("cpAuxilioInstalacao") == 1)) {
				msg += "O campo 'Data do Auxilio' está vazio.";
			}

			if(form.getValue("cpTransporteMobiliario") == "")  {
				msg += "O campo 'Transporte de Mobiliário' está vazio.";
			}

			if((form.getValue("cpDataTransporte") == "") && (form.getValue("cpTransporteMobiliario") == 1)) {
				msg += "O campo 'Data Transporte' está vazio.";
			}

			if((form.getValue("cpPassagemRetorno") == "") && ((form.getValue("cpTipoMoradia") == 2) || (form.getValue("cpTipoMoradia") == 1))) {
				msg += "O campo 'Passagem de Retorno' está vazio.";
			}

			if((form.getValue('cpPassagemRetorno') == 1) && (form.getValue("cpPeridiocidade") == "") && ((form.getValue("cpTipoMoradia") == 2) || (form.getValue("cpTipoMoradia") == 1))) {
				msg += "O campo 'Periodiocidade' está vazio.";
			}

			if((form.getValue('cpPassagemRetorno') == 1) && (form.getValue("cpQtViajantes") == "") && ((form.getValue("cpTipoMoradia") == 2) || (form.getValue("cpTipoMoradia") == 1))) {
				msg += "O campo 'Quantidade de Viajantes' está vazio.";
			}

			if(form.getValue("cpTransVeiculo") == "") {
				msg += "O campo 'Transporte de Ve&iacute;culo' está vazio.";
			}

			if((form.getValue("cpDataTransporteVeic") == "") && (form.getValue("cpTransVeiculo") == 1)) {
				msg += "O campo 'Data do Transporte' está vazio.";
			}

		}

		var parceiroOrigem = form.getValue("cpNomeParceiroOrigem");
		var parceiroDestino = form.getValue("cpNomeParceiroDestino");

		if (parceiroOrigem != parceiroDestino)
		{
			msg += "<br>O colaborador não poderá ser transferido por ser de Obra Parceira.<br>";
			msg += "Favor abrir um chamado de Desligamento e em seguida um chamado de Requisição de Pessoal para este colaborador!<br>";
		}

	}

	if ((form.getValue("cpTransferencia") == "2") && (form.getValue("cpTipoMovimentacao") == "5")) {
		msg += "Tipo de movimentação inválido.<br>";
	}

	if (((form.getValue("cpTipoMovimentacao") == "1") || (form.getValue("cpTipoMovimentacao") == "4")) && (form.getValue("cpZoomNovoCargo") == "")) {
		msg += "O campo 'Novo Cargo Função' está vazio.";
	}

	if ((form.getValue("cpTipoMovimentacao") == "1") || (form.getValue("cpTipoMovimentacao") == "2") || (form.getValue("cpTipoMovimentacao") == "3")) {
		if(form.getValue("cpZoomNovoSalario") == "") {
			msg += "O campo 'Novo Salário' está vazio.";
		}

		if(form.getValue("cpPercentualAumento") == "") {
			msg += "O campo 'Percentual de aumento' está vazio.";
		}
	}


	/*
	 * VALIDA??O DAS APROVA??ES E PARECERES
	 */


	// RELACOES TRABALHISTAS
	if (atividade == 437) {
		if (form.getValue("aprovarRelaTrab") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarRelaTrab") == "2" || form.getValue("aprovarRelaTrab") == "3") && (form.getValue("parecerRelaTrab") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}
	// APROVAçãO CONSULTORIA
	if (atividade == 7) {
		if (form.getValue("aprovarConsultoria") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarConsultoria") == "2") && (form.getValue("parecerConsultoria") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	if (atividade == 339) {
		if (form.getValue('cpAprovaASO') == 0) {
			msg += "Aprovação do ASO não preenchida.";
		}
	}

	// APROVAçãO DA REMUNERAçãO
	if (atividade == 38) {
		if (form.getValue("aprovarRemuneracao") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarRemuneracao") == "2") && (form.getValue("parecerRemuneracao") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO GESTOR
	if (atividade == 18) {
		if (form.getValue("aprovarGestor") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarGestor") == "2") && (form.getValue("parecerGestor") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO GERENTE GERAL
	if (atividade == 20) {
		if (form.getValue("aprovarGerenteGeral") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarGerenteGeral") == "2") && (form.getValue("parecerGerenteGeral") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO SUPERINTENDENTE
	if (atividade == 21) {
		if (form.getValue("aprovarSuperintendente") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarSuperintendente") == "2") && (form.getValue("parecerSuperintendente") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO DIRETOR
	if (atividade == 22) {
		if (form.getValue("aprovarDiretor") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarDiretor") == "2") && (form.getValue("parecerDiretor") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO GESTOR
	if (atividade == 45) {
		if (form.getValue("aprovarGestorDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarGestorDestino") == "2") && (form.getValue("parecerGestorDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}

		if (form.getValue("cpTransferenciaKm") == "0") {
			msg += "O campo 'Transferência com mais de 300Km' está vazio.";
		}

		if (form.getValue("cpTipoMovimentacao") == "0") {
			msg += "O campo 'Tipo de Movimentação' está vazio.";
		}
	}

	// APROVAçãO CONSULTORIA 2
	if (atividade == 47) {
		if (form.getValue("aprovarConsultoriaDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarConsultoriaDestino") == "2") && (form.getValue("parecerConsultoriaDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO DA REMUNERAçãO 2
	if (atividade == 49) {
		if (form.getValue("aprovarRemuneracaoDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarRemuneracaoDestino") == "2") && (form.getValue("parecerRemuneracaoDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO GERENTE GERAL
	if (atividade == 51) {
		if (form.getValue("aprovarGerenteGeralDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarGerenteGeralDestino") == "2") && (form.getValue("parecerGerenteGeralDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO SUPERINTENDENTE
	if (atividade == 55) {
		if (form.getValue("aprovarSuperintendenteDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarSuperintendenteDestino") == "2") && (form.getValue("parecerSuperintendenteDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO DIRETOR
	if (atividade == 102) {
		if (form.getValue("aprovarDiretorDestino") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarDiretorDestino") == "2") && (form.getValue("parecerDiretorDestino") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO DIRETORIA DE RH
	if (atividade == 118) {
		if (form.getValue("aprovarDiretoria") == "0") {
			msg += "O campo 'Aprovação' está vazio.";
		}

		if ((form.getValue("aprovarDiretoria") == "2") && (form.getValue("parecerDiretoria") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	// APROVAçãO PROCESSAMENTO DA MOVIMENTAçãO DE PESSOAL
	if (atividade == 80) {
		if (form.getValue("aprovarPMP") == "0") {
			msg += "O campo 'Movimentação realizada?' está vazio.";
		}

		if ((form.getValue("aprovarPMP") == "2") && (form.getValue("parecerPMP") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}




		// Verificar Dados
	}

	// APROVAçãO CONFERÊNCIA DA MOVIMENTAçãO DE PESSOAL
	if (atividade == 85) {
		if (form.getValue("aprovarCMP") == "0") {
			msg += "O campo 'Dados corretos?' está vazio.";
		}

		if ((form.getValue("aprovarCMP") == "2") && (form.getValue("parecerCMP") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}

		if (form.getValue('aprovarCMP') == 1) {

		    var avaliacao = form.getValue('cpAvaliacao');

		    if (avaliacao == '') {
		        msg += "Avaliação não informada.<br>";
		    }

		    if (((avaliacao == 3) || (avaliacao == 4)) && (form.getValue('cpParecerAvaliacao') == '')) {
		        msg += "Parecer da avaliação não informada.<br>";
		    }
		}
	}

	// APROVAçãO AJUSTE DA MOVIMENTAçãO DE PESSOAL
	if (atividade == 84) {
		if (form.getValue("aprovarAMP") == "0") {
			msg += "O campo 'Ajuste realizado?' está vazio.";
		}

		if ((form.getValue("aprovarAMP") == "2") && (form.getValue("parecerAMP") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

	if (atividade == 313) {
		if (form.getValue("aprovarPreenchimento") == "0") {
			msg += "O campo 'Aprovado' está vazio.";
		}

		if ((form.getValue("aprovarPreenchimento") == "2") && (form.getValue("parecerPreenchimento") == "")) {
			msg += "O campo 'Parecer' está vazio.";
		}
	}

    if (atividade == 354) {
        if (form.getValue("cpAprovacaoASO") == "0") {
            msg += "O campo 'Aprovado' está vazio.";
        }
    }

    if (atividade == 374) {
        if (form.getValue('cpReabertura') == '') {
            msg += "Reabertura não informada.<br>";
        }

        if ((form.getValue('cpReabertura') == '2') && form.getValue('cpParecerReabertura') == '') {
            msg += "Parecer não informado.<br>";
        }
    }

	if ((atividade == 96) && (form.getValue("parecerAHMP") == "")) {
		msg += "O campo 'Parecer' está vazio.";
	}

	if (msg != "") {
		throw "<br> ERRO! <br>Campo(s) não informado(s): <br>" + msg;
	}
}
