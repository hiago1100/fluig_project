function validateForm(form) {

	log.info("inicio do VALIDATEFORM do formulário  FLUIG-0198 - Criação de Coligada e Seção");

	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";
	var acaoUsuario = getValue("WKCompletTask");
	var ErroColaborador = "";
	//SOLICITANTE
	if ((atividade == 0) || (atividade == 4) || (atividade == 10) && (acaoUsuario == "true")) {

		if ((form.getValue("ValchkEmpresa") == "") && (form.getValue("ValchkObra") == "")) {
			msg += "Tipo de solicita&ccedil;&atilde;o.<br/>";

		}
		//Criacao de Nova Coligada(Empresa e CEI)
		if ((form.getValue("ValchkEmpresa") == "1")) {

			if (form.getValue("cpTpMatricula") == "") {
				msg += "Matr&iacute;cula.<br/>";

			} if (form.getValue("cpObraDepartamento") == "") {
				msg += "Descrição da Empresa UAU.<br/>";

			} if (form.getValue("cpNumEmpresa") == "") {
				msg += "N&uacute;mero da Empresa UAU.<br/>";

			} if (form.getValue("cpEmpresa") == "") {
				msg += "Empresa UAU.<br/>";
			}
			if (form.getValue("cpDescNewCol") == "") {
				msg += "Nome do Empreendimento.<br/>";
			}
			if (form.getValue("cpNumNewCol") == "") {
				msg += "N&uacute;mero da Obra.<br/>";
			}
			if (form.getValue("chkDemolicaoConstr") == "0") {
				msg += "Tipo de Matr&iacute;cula.<br/>";
			}

			//contrucao
			if (form.getValue("chkDemolicaoConstr") == "1") {

				if (form.getValue("cpTPObra2") == "") {
					msg += "Tipo da Obra.<br/>";

				} if (form.getValue("cpPreFabr2") == "") {
					msg += "Pr&eacute; - Fabricado.<br/>";

				} if (form.getValue("cpUsoObra") == "") {
					msg += " Uso da Obra.<br/>";
				}
				if (form.getValue("cpQtdUNi") == "") {
					msg += "Quantidade de Unidades.<br/>";
				}
				if (form.getValue("cpQtdPavi") == "") {
					msg += "Quantidade de	Pavimento.<br/>";
				}
				if (form.getValue("cpQtdUNi2") == "") {
					msg += " Quantidade de Unidades com 2 Quartos.<br/>";

				} if (form.getValue("cpQtdUNi3") == "") {
					msg += " Quantidade de Unidades com 3 Quartos.<br/>";

				} if (form.getValue("cpAreaAcresc") == "") {
					msg += " Comercial - &Aacute;rea Existente.<br/>";
				}
				if (form.getValue("cpAreaAcrescRes") == "") {
					msg += "Residencial - &Aacute;rea Existente.<br/>";
				}
			}

			//contrucao
			if (form.getValue("chkDemolicaoConstr") == "2") {

				if (form.getValue("cpDemTipo") == "") {
					msg += " Pr&eacute; - Fabricado.<br/>";

				} if (form.getValue("cpAreaDemo") == "") {
					msg += "&Aacute;rea da Demoli&ccedil;&atilde;o .<br/>";

				} if (form.getValue("cpTipDemo") == "") {
					msg += " Tipo de Demoli&ccedil;&atilde;o.<br/>";
				}
				if (form.getValue("cpQtdUNiDem") == "") {
					msg += "Quantidade de Unidades.<br/>";
				}
				if (form.getValue("cpQtdPaviDem") == "") {
					msg += "Quantidade de	Pavimento.<br/>";
				}
				if (form.getValue("cpQtdUNi2DEM") == "") {
					msg += " Quantidade de Unidades com 2 Quartos.<br/>";

				} if (form.getValue("cpQtdUNi3DEM") == "") {
					msg += " Quantidade de Unidades com 3 Quartos.<br/>";

				}
			}
			if (form.getValue("cpCep") == "") {
				msg += "O Campo 'Cep do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpLogradouro") == "") {
				msg += "O Campo 'Logradouro do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpNumero") == "") {
				msg += "O Campo 'Número do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpBairro") == "") {
				msg += "O Campo 'Bairro do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpCidade") == "") {
				msg += "O Campo 'Cidade do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpEstado") == "") {
				msg += "O Campo 'Estado do Endereço da Obra' está vazio. <br/>";
			}
			if (form.getValue("cpBairroCorres") == "") {
				msg += "O Campo 'Bairro do Endereço de Correspodência' está vazio. <br/>";
			}
			if (form.getValue("cpCEPCorres") == "") {
				msg += "O Campo 'Cep do Endereço de Correspodência' está vazio. <br/>";
			}
			if (form.getValue("cpCidadeCorres") == "") {
				msg += "O Campo 'Cidade do Endereço de Correspodência' está vazio. <br/>";
			}
			if (form.getValue("cpEstadoCorres") == "") {
				msg += "O Campo 'Estado do Endereço de Correspodência' está vazio. <br/>";
			}
			if (form.getValue("cpLogradouroCorres") == "") {
				msg += "O Campo 'Logradouro do Endereço de Correspodência' está vazio. <br/>";
			}

			if (form.getValue("cpNumeroCorres") == "") {
				msg += "O Campo 'Número do Endereço de Correspodência' está vazio. <br/>";
			}


			if (form.getValue("cpNatJur") == "0") {
				msg += "O Campo 'Natureza Jurídica' está vazio. <br/>";
			} if (form.getValue("cpCNAE") == "0") {
				msg += "O Campo 'CNAE' está vazio. <br/>";
			} if (form.getValue("cpVinGov") == "0") {
				msg += "O Campo 'Vínculo com o governo' está vazio. <br/>";
			}

		}

		//Cricao de Nova Secao (Obra, Departamento, Escrit&oacute;rio)
		if ((form.getValue("ValchkObra") == "1")) {
			if (form.getValue("cpINfObrDes") == "0") {
				msg += "Informa&ccedil;&atilde;o se a obra ter&aacute; a folha desonerada.<br/>";

			} if (form.getValue("cpTipodeSecao") == "0") {
				msg += "Tipo de Se&ccedil;&atilde;o.<br/>";

			}
			if (form.getValue("cpDtContrat") == "") {
				msg += "Previs&atilde;o de contrata&ccedil;&atilde;o / transfer&ecirc;ncias.<br/>";
			}

			//obra parceira 
			if ((form.getValue("cpTipodeSecao") == "1")) {
				if (form.getValue("cpObraParceira") == "0") {
					msg += "Obra Parceira.<br/>";
				}
			}
			//empresa parceira
			if ((form.getValue("cpObraParceira") == "1")) {
				if (form.getValue("cpEmprParceira") == "") {
					msg += "Empresa Parceira.<br/>";
				}
			}

			var fieldList = "cpDesSecaoDpto,cpEtapa,cpDiretorSecao,cpGestorSecao".split(",");
			var detail = getDetailOfMaster(fieldList, form);

			if (detail.length == 0) {
				ErroColaborador += "Gentileza preencher os dados do Dados da Se&ccedil;&atilde;o, com pelo menos um item!" + "<br/>";
			}
			for (var i = 0; i < detail.length; i++) {

				if (detail[i]["cpDesSecaoDpto"].value.isEmpty()) {
					ErroColaborador += "Descri&ccedil;&atilde;o da nova Se&ccedil;&atilde;o (Obra/Departamento)" + "<br/>";
				}
				if (detail[i]["cpEtapa"].value.isEmpty()) {
					ErroColaborador += "Etapa" + "<br />";
				} if (detail[i]["cpDiretorSecao"].value.isEmpty()) {
					ErroColaborador += "Diretor" + "<br />";
				} if (detail[i]["cpGestorSecao"].value.isEmpty()) {
					ErroColaborador += "Gestor" + "<br />";
				}
			}
			msg += ErroColaborador;


		}

		if ((form.getValue("ValchkObra") == "1") && (form.getValue("ValchkEmpresa") != "1")) {
			if (form.getValue("cpDescColigada") == "") {
				msg += "Descri&ccedil;&atilde;o da Coligada.<br/>";

			} if (form.getValue("cpNumColigada") == "") {
				msg += "N&uacute;mero da Coligada.<br/>";

			}
		}




	}
	//CORRECAO - REENVIAR CHAMADO
	if (atividade == 10) {

		if (form.getValue("cpAprovacaoSolicitante") == "") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovacaoSolicitante") == "2") && (form.getValue("cpParecerAprovacaoSolicitante") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}

	//ACOMPANHAMENTO DA OBRA 
	if (atividade == 5) {

		if (form.getValue("cpAprovarAcomObra") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarAcomObra") == "2") && (form.getValue("cpParecerAcompObra") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	//APROV ADM PESSOAL
	if (atividade == 21) {

		if (form.getValue("cpAprovarAdmPessoal") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarAdmPessoal") == "2") && (form.getValue("cpParecerAdmPessoal") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	//APROV CONTROLE
	if (atividade == 37) {

		if (form.getValue("cpAprovarControle") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if (((form.getValue("cpAprovarControle") == "2") || (form.getValue("cpAprovarControle") == "3")) && (form.getValue("cpParecerControle") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		if ((form.getValue("cpAprovarControle") == "1")) {
			if (form.getValue("cpEmpreCodUau") == "") {
				msg += "O campo 'C&oacute;digo da Empresa UAU' está vazio.<br/>";

			} if (form.getValue("cpCodObraUau") == "") {
				msg += "O campo 'C&oacute;digo da Obra UAU' está vazio.<br/>";

			} if (form.getValue("cpCCContabil") == "") {
				msg += "O campo 'Centro de Custo Conat&aacute;bil' está vazio.<br/>";

			} if (form.getValue("cpOrcaControle") == "0") {
				msg += "O campo 'Or&ccedil;amento Liberado' está vazio.<br/>";

			} if (form.getValue("cpFolhaDeson") == "0") {
				msg += "O campo 'Informa&ccedil;&atilde;o se a obra ter&aacute; folha desonerada' está vazio.<br/>";

			} if (form.getValue("cpTpMaoObra") == "0") {
				msg += "O campo 'Tipo de M;&atilde;o de Obra' está vazio.<br/>";
			}

		}
	}
	//APROV PLANEJAMENTO
	if (atividade == 47) {

		if (form.getValue("cpAprovarPLanejamento") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if (((form.getValue("cpAprovarPLanejamento") == "2") || (form.getValue("cpAprovarPLanejamento") == "3")) && (form.getValue("cpParecerPLanejamento") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		if ((form.getValue("cpAprovarPLanejamento") == "1")) {
			if (form.getValue("cpEmpreCodUauPLan") == "") {
				msg += "O campo 'C&oacute;digo da Empresa UAU' está vazio.<br/>";

			} if (form.getValue("cpCodObraUauPlan") == "") {
				msg += "O campo 'C&oacute;digo da Obra UAU' está vazio.<br/>";

			} if (form.getValue("cpAprovarPLanOrc") == "0") {
				msg += "O campo 'Or&ccedil;amento Liberado' está vazio.<br/>";

			} if (form.getValue("cpTpMaoObraPLa") == "0") {
				msg += "O campo 'Tipo de M;&atilde;o de Obra' está vazio.<br/>";
			}

		}
	}
	//APROV TESOURARIA
	if (atividade == 49) {

		if (form.getValue("cpAprovarTes") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if (((form.getValue("cpAprovarTes") == "2") || (form.getValue("cpAprovarTes") == "3")) && (form.getValue("cpParecerTesouraria") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		else if ((form.getValue("cpAprovarTes") == "3") && (form.getValue("cpPagtoProv") == "")) {
			msg += "O campo 'Meio de pagamento Provisório' está vazio.<br/>";
		}
		if ((form.getValue("cpAprovarTes") == "1")) {
			if (form.getValue("cpBanco") == "") {
				msg += "O campo 'Banco' está vazio.<br/>";

			} if (form.getValue("cpAgencia") == "") {
				msg += "O campo 'Agência' está vazio.<br/>";

			} if (form.getValue("cpContCorrente") == "") {
				msg += "O campo 'Conta Corrente' está vazio.<br/>";
			}
		}
	}

	//APROV TI
	if (atividade == 51) {

		if (form.getValue("cpAprovarTI") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if (((form.getValue("cpAprovarTI") == "2") || (form.getValue("cpAprovarTI") == "3")) && (form.getValue("cpParecerTI") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		if ((form.getValue("cpAprovarTI") == "1")) {
			if (form.getValue("cpDescColi") == "") {
				msg += "O campo 'Descrição da Coligada' está vazio.<br/>";

			} if (form.getValue("cpNumcoligadaTI") == "") {
				msg += "O campo 'Número da Coligada' está vazio.<br/>";
			}
		}

	}
	//APROV BENEFICIOS
	if (atividade == 56) {

		if (form.getValue("cpAprovarBen") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if (((form.getValue("cpAprovarBen") == "2") || (form.getValue("cpAprovarBen") == "3")) && (form.getValue("cpParecerBeneficios") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		else if (form.getValue("cpNumInsc") == "") {
			msg += "O campo 'N&uacute;mero de inscri&ccedil;&atilde;o está vazio.<br/>";

		} else if (form.getValue("cpDadAcesso") == "") {
			msg += "O campo 'Dados de acesso' está vazio.<br/>";
		} else if (form.getValue("cpContForn") == "") {
			msg += "O campo 'Contrato com Fornecedor' está vazio.<br/>";
		}

	}

	//APROV FOLHA
	if (atividade == 70) {

		if (form.getValue("cpAprovarFolha") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarFolha") != "1") && (form.getValue("cpAprovarFolha") != "0") && (form.getValue("cpParecerFolha") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	//APROV CORRECAO
	if (atividade == 115) {

		if (form.getValue("cpParCorrePara") == "") {
			msg += "O campo 'Parecer Correção' está vazio.<br/>";
		}
	}


	//CONFERENCIA SOLICITANTE
	if (atividade == 133) {

		if (form.getValue("cpAprovarSolicitante") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarSolicitante") == "2") && (form.getValue("cpParecerSolicitante") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		} else if ((form.getValue("cpAprovarSolicitante") == "1") && (form.getValue("cpAprovarAvaliacao") == "")) {
			msg += "O campo 'Avalia&ccedil;&atilde;o' está vazio.<br/>";
		}
	}
	//AJUSTE
	if (atividade == 165) {

		if (form.getValue("cpAprovarAjuste") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarAjuste") == "2") && (form.getValue("cpParecerAjuste") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	//CSC
	if (atividade == 175) {

		if (form.getValue("cpAprovarCSC") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";

		} else if ((form.getValue("cpAprovarCSC") == "2") && (form.getValue("cpParecerCSC") == "")) {
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	//HIERARQUIA RH
	if (atividade == 195) {

		if (form.getValue("cpAprovHieRHVlr") == "") {
			msg += "O campo 'Ciente' está vazio.<br/>";

		}

		var fieldList = "cpConsultHierRH".split(",");
		var detail = getDetailOfMaster(fieldList, form);

		for (var i = 0; i < detail.length; i++) {

			if (detail[i]["cpConsultHierRH"].value.isEmpty()) {
				ErroColaborador += "Consultor RH" + "<br/>";
			}
		}
		msg += ErroColaborador;
	}
	//Acompanhamento de Abertura de Conta
	if (atividade == 213) {

		if (form.getValue("cpContaLib2") == "2") {
			msg += "Não se pode avançar esta atividade, sem que a conta seja liberada.<br/>";
		}
		if (form.getValue("cpContaLib2") == "1") {

			if (form.getValue("cpBanco2") == "") {
				msg += "O campo 'Banco' está vazio.<br/>";
			} if (form.getValue("cpAgencia2") == "") {
				msg += "O campo 'Agência' está vazio.<br/>";
			} if (form.getValue("cpContCorrente2") == "") {
				msg += "O campo 'Conta Corrente' está vazio.<br/>";
			} if (form.getValue("cpNumConv2") == "") {
				msg += "O campo 'Número do Convênio' está vazio.<br/>";
			} if (form.getValue("cpContaLib2") == "0") {
				msg += "O campo 'Conta Liberada' está vazio.<br/>";
			}
		}

	}
	//Emissao do Comunicado de Inicio de Obra
	if (atividade == 223) {
		if (form.getValue("cpAprovacaoEmissaoComunicado") == "") {
			msg += "Campo Aprovação não foi selecionado.<br/>";
		}
		if (form.getValue("cpAprovacaoEmissaoComunicado") == "2") {
			if (form.getValue("cpParecerEmissaoComunicado") == "") {
				msg += "O campo 'Parecer' está vazio.<br/>";
			}
		}
	}

	//Vinculação de tabela salarial
	if (atividade == 247) {
		
		if(form.getValue("cpAprovarVinculacao") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if ((form.getValue("cpAprovarVinculacao") == "2") && (form.getValue("cpParecerVinculacao") == "")){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	if (msg != "") {

		throw "\n ERRO! \nCampo(s) nao informado(s): \n" + msg;
	}

	log.info("fim do VALIDATEFORM do formulário  FLUIG-0198 - Criação de Coligada e Seção");
}
