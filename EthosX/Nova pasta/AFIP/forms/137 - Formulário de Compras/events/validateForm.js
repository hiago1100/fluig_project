function validateForm(form) {

	var activity = getValue("WKNumState");
	var acaoUsuario = getValue("WKCompletTask")
	var errorMsg = "";
	var lineBreaker = "\n";
	var campos = "";

	if (getValue("WKCompletTask") == "true") {
		if ((activity == 0 || activity == 4) && (acaoUsuario == "true")) { // inicio

			if (form.getValue("zoomCentroCusto") == null) { campos += "\n - Centro de Custo "; }


			if (form.getValue("zoomPreAprovador") == null) { campos += "\n - Pre-Aprovador "; }

			if (form.getValue("txtPrioridade") == "valor0"
				|| form.getValue("txtPrioridade") == null
				|| form.getValue("txtPrioridade") == "") {
				campos += "\n - Prioridade";
			}

			if (form.getValue("txtJustificativaPedido").trim() == "") { campos += "\n - Justificativa do Pedido de Compra "; }

			var idxProdutos = form.getChildrenIndexes("tableItens");

			if (idxProdutos.length == 0) {
				campos += "\n - Ao menos um Produto deve ser incluido";
			} else {
				for (var i = 0; i < idxProdutos.length; i++) {
					if (form.getValue("quantidadeProduto___" + idxProdutos[i]) == "") {
						campos += "\n - Quantidade na linha " + idxProdutos[i];
					}
					if (form.getValue("nomeProduto___" + idxProdutos[i]) == "") {
						campos += "\n - Produto na linha " + idxProdutos[i];
					}
					if (form.getValue("descricaoProduto___" + idxProdutos[i]) == "") {
						campos += "\n - Descrição na linha " + idxProdutos[i];
					}
				}
			}

		}

		if (activity == 5) { // Verificar requisição

			if (form.getValue("txtAprovaRequisicao") == null
				|| form.getValue("txtAprovaRequisicao").trim() == "") {

				throw "\n\n Campo 'Aprova Requisição?' é obrigatório!";

			}

			if (form.getValue("txtAprovaRequisicao") == "Nao") {

				if (form.getValue("txtMotivoVerificador") == "valor0"
					|| form.getValue("txtMotivoVerificador") == null
					|| form.getValue("txtMotivoVerificador") == "") {
					throw "\n\n Campo 'Motivo' é obrigatório!";
				}

				if (form.getValue("txtJustificativaVerificador") == null
					|| form.getValue("txtJustificativaVerificador").trim() == "") {
					throw "\n\n Campo 'Justificativa' é obrigatório!";
				}

			}

			if (form.getValue("txtAprovaRequisicao") == "Duvida") {

				if (form.getValue("txtDuvidaVerificador") == null
					|| form.getValue("txtDuvidaVerificador").trim() == "") {
					throw "\n\n Campo 'Dúvida' é obrigatório!";
				}

			}

		}

		if (activity == 114) { // Duvida Verificador

			if (form.getValue("txtRespostaDuvidaVerificador") == null
				|| form.getValue("txtRespostaDuvidaVerificador").trim() == "") {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}

		}

		if (activity == 19) { // Avaliar requisição e realizar orçamento

			if (form.getValue("txtAprovaRequisicaoCompras") == null
				|| form.getValue("txtAprovaRequisicaoCompras").trim() == "") {

				throw "\n\n Campo 'Aprova Requisição?' é obrigatório!";

			}

			if (form.getValue("txtAprovaRequisicaoCompras") == "Sim") {
				var campos = "";
				var indexes = form.getChildrenIndexes("tableFornecedor");

				if (indexes.length == 0) {
					throw "\n\n É obrigatório inserir ao menos 1(um) item na sessão 'Comprador - Orçamento'";
				}

				for (var i = 0; i < indexes.length; i++) {
					if (form.getValue("nomeFornecedor___" + indexes[i]) == "") {
						campos += "\n - Nome do Fornecedor/Documento (Linha " + indexes[i] + ")";
					}
					if (form.getValue("condicaoPagamento___" + indexes[i]) == "") {
						campos += "\n - Condição de Pagamento (Linha " + indexes[i] + ")";
					}
					if (form.getValue("prazoEntrega___" + indexes[i]) == "") {
						campos += "\n - Prazo de Entrega (Linha " + indexes[i] + ")";
					}
					if (form.getValue("valorFornecedor___" + indexes[i]) == "") {
						campos += "\n - Valor de orçamento (Linha " + indexes[i] + ")";
					}
				}

				if (campos != "") throw "\n\n É obrigatório inserir as informações nos campos abaixo antes de prosseguir " + campos;
			}

			if (form.getValue("txtAprovaRequisicaoCompras") == "Nao") {

				if (form.getValue("txtMotivoCompras") == "valor0"
					|| form.getValue("txtMotivoCompras") == null
					|| form.getValue("txtMotivoCompras") == "") {
					throw "\n\n Campo 'Motivo' é obrigatório!";
				}

				if (form.getValue("JustificativaComprador_3") == null
					|| form.getValue("JustificativaComprador_3").trim() == "") {
					throw "\n\n Campo 'Justificativa' é obrigatório!";
				}

			}

			if (form.getValue("txtAprovaRequisicaoCompras") == "Duvida") {

				if (form.getValue("txtDuvidaCompras") == null
					|| form.getValue("txtDuvidaCompras").trim() == "") {
					throw "\n\n Campo 'Dúvida' é obrigatório!";
				}

			}

		}

		if (activity == 69) { // Duvida sobre requisição

			if (form.getValue("txtRespostaCompras") == null
				|| form.getValue("txtRespostaCompras").trim() == "") {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}
		}

		if (activity == 24) { // Avaliar Orçamento

			if (form.getValue("undNegocio") == "AFIP") {
				if (form.getValue("txtAprovacaoPreAProvador") == null
					|| form.getValue("txtAprovacaoPreAProvador").trim() == "") {

					throw "\n\n Campo 'Aprova Solicitação?' é obrigatório!";

				}


				if (form.getValue("txtAprovacaoPreAProvador") == "Sim") {
					var controle = false;
					var indexes = form.getChildrenIndexes("tableFornecedor");

					for (var i = 0; i < indexes.length; i++) {
						if (form.getValue("checkAprovacaoFornecedor___" + indexes[i]) == "Aprovado") {
							controle = true;
						}
					}

					if (!controle) throw "\n\n É obrigatório selecionar o orçamento na coluna Aprovação para Aprovar solicitação";

					if (form.getValue("diretor") == null || form.getValue("diretor") == "") { campos += "\n - Diretor" };
					if (form.getValue("txtObsPreAProvadorAprov") == null || form.getValue("txtObsPreAProvadorAprov").trim() == "") { campos += "\n - Justificativa" };
				}

				if (form.getValue("txtAprovacaoPreAProvador") == "Nao") {

					if (form.getValue("txtMotivoPreAProvador") == "valor0"
						|| form.getValue("txtMotivoPreAProvador") == null
						|| form.getValue("txtMotivoCompras") == "") {
						throw "\n\n Campo 'Motivo' é obrigatório!";
					}

					if (form.getValue("txtObsPreAProvador") == null
						|| form.getValue("txtObsPreAProvador").trim() == "") {
						throw "\n\n Campo 'Justificativa' é obrigatório!";
					}

				}

				if (form.getValue("txtAprovacaoPreAProvador") == "Duvida_Solicitante") {

					if (form.getValue("DuvidaPreAprovadorS") == null
						|| form.getValue("DuvidaPreAprovadorS").trim() == "") {
						throw "\n\n Campo 'Dúvida' é obrigatório!";
					}

				}

				if (form.getValue("txtAprovacaoPreAProvador") == "Duvida_Comprador") {

					if (form.getValue("DuvidaPreAprovadorC") == null
						|| form.getValue("DuvidaPreAprovadorC").trim() == "") {
						throw "\n\n Campo 'Dúvida' é obrigatório!";
					}

				}
			}

			if (form.getValue("undNegocio").trim() == "") {

				throw "\n\n Campo 'Unidade de Negócio' é obrigatório!";

			}

		}

		if (activity == 72) { // Responder Questionamento (Solicitante)
			if ((form.getValue("RespostaFinanceiroS") == null || form.getValue("RespostaFinanceiroS").trim() == "") && form.getValue("ativAtual") == 124) {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}
			if ((form.getValue("RespostaPreAprovadorS") == null || form.getValue("RespostaPreAprovadorS").trim() == "") && form.getValue("ativAtual") == 24) {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}
		}

		if (activity == 32) { // Responder Questionamento (Comprador)
			if ((form.getValue("RespostaFinanceiroC") == null || form.getValue("RespostaFinanceiroC").trim() == "") && form.getValue("ativAtual") == 124) {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}

			if ((form.getValue("RespostaPreAprovadorC") == null || form.getValue("RespostaPreAprovadorC").trim() == "") && form.getValue("ativAtual") == 24) {
				throw "\n\n Campo 'Resposta' é obrigatório!";
			}
		}

		if (activity == 35) { // Aprovação Diretoria

			if (form.getValue("txtAprovacaoDiretoria") == null
				|| form.getValue("txtAprovacaoDiretoria").trim() == "") {

				throw "\n\n Campo 'Aprova Solicitação?' é obrigatório!";

			}

			if (form.getValue("txtAprovacaoDiretoria") == "Sim") {
				var controle = false;
				var indexes = form.getChildrenIndexes("tableFornecedor");

				for (var i = 0; i < indexes.length; i++) {
					if (form.getValue("checkAprovacaoFornecedor___" + indexes[i]) == "Aprovado") {
						controle = true;
					}
				}

				if (!controle) throw "\n\n É obrigatório selecionar o orçamento na coluna Aprovação para Aprovar solicitação";
			}

			if (form.getValue("txtAprovacaoDiretoria") == "Nao") {
				if (form.getValue("txtObsDiretoria") == "") {
					throw "\n\n campo 'Observações' é obrigatório para Reprovar solicitação!";
				}
			}
		}

		if (activity == 61) { // Classificar

		}
		if (activity == 124) { // Financeiro //

			if (form.getValue("txtAprovacaoFinanceiro") == null
				|| form.getValue("txtAprovacaoFinanceiro").trim() == "") {
				throw "\n\n Campo 'Financeiro - Realizar Aprovação' é obrigatório!";
			}
		}

		if (activity == 41) { // Informar dados da compra
			var campos = "";
			var indexes = form.getChildrenIndexes("tableDadosDaCompra");
			if (indexes.length < 1) {
				throw "\n\n É obrigatório inserir ao menos 1(um) item na sessão 'Comprador - Informar Dados de Compra'";
			} else {
				for (var i = 0; i < indexes.length; i++) {
					if (form.getValue("nomeFornecedor2___" + indexes[i]) == "") {
						campos += "\n - Nome do Fornecedor/Documento (linha " + indexes[i] + ")";
					}
					if (form.getValue("valorFornecedor2___" + indexes[i]) == "") {
						campos += "\n - Valor(Pedido/NF/Orçamento) (linha " + indexes[i] + ")";
					}
				}

				if (campos != "") throw "\n\n Os campos abaixo são obrigatórios para prosseguir " + campos;
			}

		}

		if (activity == 95) { // Entrega
			//Não pode encerrar se estiver sem NF
			if (form.getValue("rdNotaFiscalAnexado") == "") {
				campos += "\n - Nota fiscal foi anexada ao processo? ";
			} else if (form.getValue("rdNotaFiscalAnexado") == "Nao") {
				throw "\n\n Não será permitido finalizar a solicitação enquanto a Nota fiscal não for anexada ao processo";
			}

			if (form.getValue("dtEntrega") == "") {
				campos += "\n - Data do Recebimento";
			} else if (!validaDataFim(form.getValue("dtEntrega"))) {
				throw "\n\n A Data do Recebimento não pode ser superior a data atual";
			}
		}
	}

	if (campos != "") {
		throw "\n Os campos abaixo são de preenchimento obrigatório nesta atividade \n" + campos;
	}
}

function validaDataFim(dataReceb) {
	dataReceb = dataReceb.indexOf("-") > -1 ? dataReceb.split("-") : dataReceb.indexOf("/") > -1 ? dataReceb.split("/") : "";
	dataReceb = parseInt(dataReceb[2]) > 2000 ? dataReceb[2] + "/" + dataReceb[1] + "/" + dataReceb[0] : dataReceb[0] + "/" + dataReceb[1] + "/" + dataReceb[2];

	var agora = new Date();
	var dataAgora = agora.getFullYear() + "/" + ((agora.getMonth() + 1) < 10 ? "0" + (agora.getMonth() + 1) : (agora.getMonth() + 1)) + "/" + (agora.getDate() < 10 ? "0" + agora.getDate() : agora.getDate());

	log.warn("=== dataReceb: " + dataReceb);
	log.warn("=== dataAgora: " + dataAgora);
	return dataAgora >= dataReceb;
}