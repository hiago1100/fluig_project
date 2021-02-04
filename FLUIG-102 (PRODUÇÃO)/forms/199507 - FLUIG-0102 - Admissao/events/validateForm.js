function validateForm(form, customHTML)
{
	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";
	
	var regras_do_formulario = [
	    { campo: 'cpNumeroChamadoRescisao', label: 'N&#250;mero do chamado de rescis&#227;o', atividades: [22,114], regras: ['obrigatorio'], condicoes: [{
	        campo: 'cpSolicitacao', valores: ['2']
	    }] },
	    { campo: 'cpEncerramentoParecer', label: 'Parecer ', atividades: [125], regras: ['obrigatorio'], condicoes: [{
            campo: 'cpSolicitacao', valores: ['']
        }] },
	];
	
	// AGENDAR DATA DE INICIO

	if (form.getValue("cpAvancoAutomatico") == "1" && (atividade == 105 || atividade == 111 || atividade == 0))
	{
		//PASSA SEM VALIDACAO
		
	} else {

		loading.setMessage("Validando dados...");
		log.info("Carregando o formulário FLUIG-0102 - Cadastro de novos colaboradores");
		log.info("Carregando o formulário FLUIG-0102 - Admissao - validateForm -  atividade:" + parseInt(getValue("WKNumState")));

		if (atividade == 105 && form.getValue("cpAvancoAutomatico") != "1") {
			
			if (form.getValue("cpTransferir") == "2") {
				if (form.getValue("cpDpDestino") == "")
				{
					msg += "Favor informar o usu&aacute;rio destino.";
				}
				
			} else if (form.getValue("cpDataInicio") == "") {
				msg += "O campo de Data est&aacute; vazio.";
			}
		}

		// DATA PROGRAMADA PARA ADMISSAO
		if (atividade == 111 && form.getValue("cpAvancoAutomatico") != "1") {
			if (form.getValue("cpTransferir") == "2") {
				
				if (form.getValue("cpDpDestino") == "")
				{
					msg += "Favor informar o usu&aacute;rio destino.";
				}
				
			} else if (form.getValue("cpDataProgramadaAdmissao") == "") {
				msg += "O campo de Data est&aacute; vazio.";
			}
		}

		// INICIO E RECOLHIMENTO DA DOCUMENTACAO
		if ((atividade == 0 && form.getValue("cpAvancoAutomatico") != "1") || atividade == 3 || atividade == 85) {
			
			if (form.getValue("cpTransferir") == "1") {
				
				if (form.getValue("cpNomeCompleto") == "") {
					msg += "O campo Nome Completo est&aacute; vazio.";
				}
				if (form.getValue("cpObraSede") == "1" && form.getValue("cpCpf") == "") {
					msg += "O campo CPF est&aacute; vazio.";
				}
				if (form.getValue("cpCentroCusto") == "") {
					msg += "O campo Centro de Custo est&aacute; vazio.";
				}
				if (form.getValue("cpCodigoSecao") == "") {
					msg += "O campo Código se&ccedil;&atilde;o est&aacute; vazio.";
				}
				if (form.getValue("cpGestor") == "") {
					msg += "O campo Gestor est&aacute; vazio.";
				}
				if (form.getValue("cpEstado") == "") {
					msg += "O campo Estado est&aacute; vazio.";
				}
				if (form.getValue("cpHorarioTrabalho") == "") {
					msg += "O campo Horario de Trabalho est&aacute; vazio.";
				}
				if (form.getValue("cpSalario") == "") {
					msg += "O campo Sal&aacute;rio est&aacute; vazio.";
				}
				if (form.getValue("cpHorarioTrabalho") == "") {
					msg += "O campo Horario de Trabalho est&aacute; vazio.";
				}
				if (form.getValue("cpObraSede") == "1" && form.getValue("cpSituacao") == "0") {
					msg += "O campo Situa&ccedil;&atilde;o est&aacute; vazio.";
				}
				if (form.getValue("cpObraSede") == "1" && form.getValue("cpViasDesemprego") == "0") {
					msg += "O campo de Seguro Desemprego est&aacute; vazio.";
				}

				if (form.getValue("cpDataAdmissao") == "") {
					msg += "O campo de Data de admiss&atilde;o est&aacute; vazio.";
				}
				if (form.getValue("cpCalendarioDtAdmissao") == "") {
					msg += "O campo de Data de admiss&atilde;o est&aacute; vazio.";
				}
				if (form.getValue("cpValeTransporte") == "0") {
					msg += "O campo de Vale Transporte est&aacute; vazio.";
				}
				/**Validação desabilitada provisoriamente, aguardando especificação de novo processo 
				if (form.getValue("cpValeAlimRefeicao") == "0") {
					msg += "O campo de Vale Alim/Refei&ccedil;&atilde;o est&aacute; vazio.";
				}
				if (form.getValue("cpPlanoOdontologico") == "0") {
					msg += "O campo de Plano Odontologico est&aacute; vazio.";
				}
				if (form.getValue("cpConvenioFarmacia") == "0") {
					msg += "O campo Conv&ecirc;nio farm&aacute;cia est&aacute; vazio.";
				}
				if (form.getValue("cpCestaBasica") == "") {
					msg += "O campo de Cesta b&aacute;sica est&aacute; vazio.";
				}
				if (form.getValue("cpSeguroSaude") == "0") {
					msg += "O campo de Seguro Sa&uacute;de est&aacute; vazio.";
				}**/
				
			} else if (form.getValue("cpTransferir") == "2") {
				
				if (form.getValue("cpDpDestino") == "") {
					msg += "Favor informar um DP de destino.";
				}
			}
		}

		// CONFERENCIA DA DOCUMENTACAO
		if (atividade == 8) {
			if (form.getValue("cpDocumentacaoEntregue") == "0") {
				msg += "O campo 'A Documenta&ccedil;&atilde;o foi Entregue' est&aacute; vazio.";
			}
			
			if (form.getValue("cpAprovacaoDocumentacao") == "0") {
				msg += "Favor informar se foi aprovado.";
				
			} else if (form.getValue("cpAprovacaoDocumentacao") == "1") {
				
				if (form.getValue("cpColaboradorKitGerado") == "") {
					msg += "O campo Colaborador est&aacute; vazio.";
				}
				if (form.getValue("cpMatriculaKitGerado") == "") {
					msg += "O campo Matr&iacute;cula est&aacute; vazio.";
				}
				if (form.getValue("cpDataAdmissaoKitGerado") == "") {
					msg += "O campo Data de Admiss&atilde;o est&aacute; vazio.";
				}
				
			} else if (form.getValue("cpAprovacaoDocumentacao") == "2") {

				if (form.getValue("cpMotivoReprovacao") == "0") {
					msg += "Favor informar o motivo .";
				}
				
				if (form.getValue("cpParecerDocumentacao") == "")
				{
					msg += "Favor informar um parecer .";
				}
			}
			
		} else if (atividade == 18) { //CONFÊRENCIA KIT ADMISSIONAL

			if (form.getValue("cpConferenciaKitAdmissional") == "0") {
				msg += "Favor informar se o kit est&aacute; correto.";
			}
			if (form.getValue("cpConferenciaKitAdmissional") == "2" && form.getValue("cpConfKitParecer") == "") {
				msg += "Favor informar um parecer.";
			}
			if (form.getValue("cpConferenciaKitAdmissional") == "2" && form.getValue("cpMotivoReprovacaoConfKit") == "0") {
				msg += "Favor informar o Motivo da reprovação.";
			}
			
		} else if (atividade == 22 || atividade == 114) { //RECOLHIMENTO ASSINATURAS
			
			if (form.getValue("cpRecolAssinatura") == "0") {
				msg += "Favor informar se os documentos foram assinados.";
			}
			if (form.getValue("cpRecolAssinatura") == "2" && form.getValue("cpRecolAssinaturaParecer") == "") {
				msg += "Favor informar um parecer.";
			}
			
		} else if (atividade == 27 || atividade == 117) { // ENVIO DE DADOS DO COLABORADOR
			
			if (form.getValue("cpEnvioNome") == "") {
				msg += "O campo Nome est&aacute; vazio.";
			}
			if (form.getValue("cpEnvioSecao") == "") {
				msg += "O campo Se&ccedil;&atilde;o est&aacute; vazio.";
			}
			if (form.getValue("cpEnvioFuncao") == "") {
				msg += "O campo Fun&ccedil;&atilde;o est&aacute; vazio.";
			}
			if (form.getValue("cpEnvioDtAdmissao") == "") {
				msg += "O campo Data de Admiss&atilde;o est&aacute; vazio.";
			}
			
		} else if (atividade == 34) { //CADASTRO SEGURO SAUDE
			
			if (form.getValue("cpSeguroCadastrado") == "0") {
				msg += "Favor informar se foi cadastrado.";
			}
			if (form.getValue("cpSeguroCadastrado") == "2" && form.getValue("cpSeguroParecer") == "") {
				msg += "Favor informar um parecer.";
			}
			
		} else if (atividade == 28 || atividade == 121) {// CANCELAMENTO DE CADASTRO
			
			if (form.getValue("cpCadastroCancelado") == "0") {
				msg += "Favor informar se o cadastro foi cancelado.";
			}
			if (form.getValue("cpCadastroCancelado") == "2" && form.getValue("cpCadastroCanceladoParecer") == "") {
				msg += "Favor informar um parecer.";
			}
		}
		
		else if (atividade == 191) {// CANCELAMENTO DE CADASTRO
			
			if (form.getValue("cpCadVT") == "0") {
				msg += "Favor informar se o cadastro foi cancelado.";
			}
			if (form.getValue("cpCadVT") == "2" && form.getValue("cpParecerCadVT") == "") {
				msg += "Favor informar um parecer.";
			}
		}
		
		else if (atividade == 211 ) {
			if (form.getValue("cpAprovacaopostoTrabalhoManual") == "0") {
				msg += "Favor informar se o Posto de trabalho foi cadastrado.";
			}
		}
		
		 

		loading.setMessage("Validando dados...");
		log.info("Carregando o formulário FLUIG-0102 - Cadastro de novos colaboradores");
	}

	if (msg != "") {
		throw "\n ERRO! \nCampo(s) n&atilde;o informado(s): \n" + msg;
	}
	
	var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) {
        throw Validador.mensagem_de_erro();
        }
}