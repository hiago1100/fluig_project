function appendMovimentacao(numero) {
	var texto = hAPI.getCardValue('reqMovimentacao');

	if (texto) {
		hAPI.setCardValue('reqMovimentacao', texto + ', ' + numero);
	} else {
		hAPI.setCardValue('reqMovimentacao', numero);
	}
}

function appendCadastro(numero) {
	var texto = hAPI.getCardValue('reqCadastro');

	if (texto) {
		hAPI.setCardValue('reqCadastro', texto + ', ' + numero);
	} else {
		hAPI.setCardValue('reqCadastro', numero);
	}
}

function CriarProcessos() {

	var hoje = new Date();
	hoje = hoje.getDate() + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();

	var retorno = 1;

	var tipoMaoObra = hAPI.getCardValue("cpTipoMaoObra");
	var ObraOuSede = hAPI.getCardValue("cpObraSede");
	var estado = hAPI.getCardValue("cpEstadoProd");

	// MATRICULA DO USUARIO QUE IRA REECBER O PROCESSO 
	var destinatariosInterno = new java.util.ArrayList();
	destinatariosInterno.add(hAPI.getCardValue("cpMatriculaSolicitante"));

	var CandidatosEmAberto = 0;

	var AtividadeAnterior = parseInt(getValue("WKNumState"));

	if (AtividadeAnterior != 61) {

		var destinatariosExterno = new java.util.ArrayList();

		var atividadeExterno = "3";

		if (ObraOuSede == "1") {
			destinatariosExterno.add(hAPI.getCardValue("cpPapelPadraoRecolhimentoDoc"));
		} else {
			atividadeExterno = "85";
		}

		// NAO PASSOU POR RECRUTAMENTO E SELECAO  - BUSCAR TABELA INICIAL
		var tbSalarioTotal = parseInt(hAPI.getCardValue("tbSalarioTotal"));

		var departamento = "cpObraDepProd";
		var codsecao = "cpObraDepProd";
		var nomeCargo = "itmNomeCargo___";
		var nomeSalario = "itmSalario___";
		var quantidade = "itmQuantidade___";

		for (var i = 1; i <= tbSalarioTotal; i++) {

			var cargo = hAPI.getCardValue(nomeCargo + "" + i);

			if (cargo != null) {
				var salario = hAPI.getCardValue(nomeSalario + "" + i);
				var quantidade_total = parseInt(hAPI.getCardValue(quantidade + "" + i));

				// CAMPOS DO FORMULARIO QUE SERAO PREENCHIDOS 
				var parametros = new java.util.HashMap();
				parametros.put("cpNumeroSolicitacaoRequisicao", getValue("WKNumProces").toString());
				parametros.put("cpSalario", salario);
				parametros.put("cpEnvioFuncao", cargo);
				parametros.put("cpEnvioSecao", hAPI.getCardValue(codsecao));
				parametros.put("cpFuncao", cargo);
				parametros.put("cpMatriculaObra", hAPI.getCardValue("cpRecolherDocProdChapa"));
				var data = new Date();
				var stringData = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
				parametros.put("cpEnvioDtAdmissao", stringData);
				parametros.put("cpDataAbertura", stringData);

				parametros.put("cpMatriculaSolicitante", hAPI.getCardValue("cpMatriculaSolicitante"));
				parametros.put("cpCentroCusto", hAPI.getCardValue(departamento));
				parametros.put("cpZoomHorarioTrabalho", hAPI.getCardValue("itmHorario___" + i));
				parametros.put("cpHorarioTrabalho", hAPI.getCardValue("itmHorario___" + i));
				parametros.put("cpCodigoSecao", hAPI.getCardValue("cpCodSecaoProd"));
				parametros.put("cpCodColigada", hAPI.getCardValue("cpCodColigadaDepartamento"));
				parametros.put("cpGestor", hAPI.getCardValue("cpNomeGestor"));
				parametros.put("cpEstado", estado);
				parametros.put("cpMatriculaObra", hAPI.getCardValue("cpRecolherDocProdChapa"));
				parametros.put("cpMaoDeObra", tipoMaoObra);
				parametros.put("cpPapelPadraoRecolhimentoDoc", hAPI.getCardValue("cpPapelPadraoRecolhimentoDoc"));

				//para tipo de posto de trabalho
				parametros.put("cpNomePostoTrabalho", hAPI.getCardValue("itmDescMaoObra___" + i));
				parametros.put("cpCodigoPostoTrabalho", hAPI.getCardValue("itmCodPosto___" + i));
				parametros.put("cpTipoPostoTrabalho", hAPI.getCardValue("itmTipoPosto___" + i));


				parametros.put("cpAvancoAutomatico", "1");

				if (ObraOuSede == "1") {
					parametros.put("cpObraSede", "1");
				} else {
					parametros.put("cpObraSede", "0");
				}

				var possuiXp = hAPI.getCardValue("itmExperiencia___" + i);

				if (possuiXp == 1) {
					parametros.put("cpPossuiXp", "Sim");
				} else {
					parametros.put("cpPossuiXp", "Não");
				}

				var recrutados = hAPI.getCardValue("cpRecrutados");
				var tableindex = hAPI.getCardValue("itmIndexSalario___" + i);
				var JaRecrutado = false;
				var Splited = recrutados.split(",");
				if (tableindex != "") {
					for (var item in Splited) {
						if (Splited[item] == tableindex) {
							JaRecrutado = true;
						}
					}
				} else {
					hAPI.setCardValue("itmIndexSalario___" + i, "Zerado:" + i);
					tableindex = "Zerado:" + i;
				}

				if (!JaRecrutado) {
					if (recrutados != "")
						recrutados += ",";
					hAPI.setCardValue("cpRecrutados", recrutados + "" + tableindex);

					// CHAMADA PARA NOVO PROCESSO
					for (var j = 1; j <= quantidade_total; j++) {
						log.info('----------------------------');
						log.dir(destinatariosExterno);
						log.info('----------------------------');

						log.info("Yago 0104:: Abrindo chamado " + cargo + " quantidade total " + quantidade_total + " j " + j);
						var reqGerada = hAPI.startProcess("FLUIG-0102", atividadeExterno, destinatariosExterno, "Criado a partir da OS: " + getValue("WKNumProces"), true, parametros, true);

						appendCadastro(reqGerada.get("iProcess"));

					}
				}
			}
		}
	} else {

		var destinatariosExterno = new java.util.ArrayList();
		var atividadeExterno = "111";
		if (ObraOuSede == "1") {
			atividadeExterno = "111";
			destinatariosExterno.add(hAPI.getCardValue("cpConsultora"));
		} else {
			atividadeExterno = "105";
		}

		var Inicio = 0;
		var TotalCandidatosInternos = parseInt(hAPI.getCardValue("tbSalarioTotal"));
		for (var i = 1; i <= TotalCandidatosInternos; i++) {
			var index = hAPI.getCardValue("itmIndexCandidato___" + i);
			var quantidade = parseInt(hAPI.getCardValue("itmQuantidade___" + i));
			if (quantidade != null) {

				// DADOS DO DESTINO
				var ObraDestino = hAPI.getCardValue("cpObraDepProd");
				var CodSecaoDestino = hAPI.getCardValue("cpCodSecaoPadrao");
				var EstadoDestino = hAPI.getCardValue("cpEstadoProd");
				var CodColigadaDestino = hAPI.getCardValue("cpCodColigadaDepartamento");
				var empresaDestino = hAPI.getCardValue("cpEmpresa");
				var nomeGestorDestino = hAPI.getCardValue('cpNomeGestor');
				var chapa_gestorDestino = hAPI.getCardValue('cpGestor');
				var chapa_GG_Destino = hAPI.getCardValue('cpGerenteGeral');
				var chapa_Sup_Destino = hAPI.getCardValue('cpSuperintendente');
				var chapa_DiretorDestino = hAPI.getCardValue('cpDiretor');
				var chapa_ConsultoraDestino = hAPI.getCardValue('cpConsultora');





				for (var j = Inicio + 1; j <= Inicio + quantidade; j++) {

					// DADOS DA ORIGEM
					var departamento = hAPI.getCardValue("itmCetroCustoOrigem___" + j);
					var coligada = hAPI.getCardValue("itmCentroCustoColigada___" + j);
					var empresa = hAPI.getCardValue("itmEmpresaCCO___" + j);
					var secao = hAPI.getCardValue("itmCentroCustoCodSecao___" + j);
					var estado = hAPI.getCardValue('itmEmpresaUF___' + j);
					var nome_gestor = hAPI.getCardValue('itmEmpresaNomeGestor___' + j);
					var chapa_gestor = hAPI.getCardValue('itmEmpresaChapaGestor___' + j);

					// DADOS DO COLABORADOR
					var colaborador = hAPI.getCardValue("itmColaboradorCCO___" + j);
					var matricula = hAPI.getCardValue("itmMatriculaCCO___" + j);
					var dtadmissao = hAPI.getCardValue("itmDtAdmissaoCCO___" + j);
					var salario_atual = hAPI.getCardValue("itmSalarioCCO___" + j);
					var cargo_atual = hAPI.getCardValue("itmCargoAtualCCO___" + j);
					var cod_cargo_atual = hAPI.getCardValue("itmCodFuncao___" + j);

					//
					var tipo = hAPI.getCardValue("itmTipo___" + j);
					var salario = hAPI.getCardValue("itmNovoSalarioCCO___" + j);
					var itmRecrutado = hAPI.getCardValue("itmRecrutado___" + j);
					var tableindex = hAPI.getCardValue("itmTableIndex___" + j);

					if (itmRecrutado == "Aguardando") {
						if (tipo == "1") {
							if (departamento != "" && colaborador != "" && cargo != "" && salario != "") {

								// Campos do formulario que ser?o preenchidos
								var parametros = new java.util.HashMap();

								// TODO Verificar existência dos dadados no formulário de requisisão

								// Dados da Reuisição de Pessoal
								parametros.put("cpNumRequisicao", getValue("WKNumProces"));
								parametros.put("cpDtRequisicao", hoje);

								// Dados da Obra de Origem
								parametros.put("cpZoomObraDep", departamento);
								parametros.put("cpCodEmpresa", coligada);
								parametros.put("cpDoisEmpresa", empresa);
								parametros.put("cpCodSecao", secao);
								parametros.put("cpGestorAtual", nome_gestor);
								parametros.put("cpGestorOrigem", chapa_gestor);
								parametros.put("cpEstadoOrigem", estado);

								// Dados do Colaborador

								parametros.put("cpColaborador", colaborador);
								parametros.put("cpNome", colaborador);
								parametros.put("cpMatricula", matricula);
								parametros.put("cpFuncaoAtual", cargo_atual);
								parametros.put("cpCodFuncao", cod_cargo_atual);
								parametros.put("cpSalario", salario_atual);
								parametros.put("cpDataAdmissao", dtadmissao);

								// Dados da Obra de Destino

								parametros.put("cpZoomNovaObraDepTransPadrao", ObraDestino);
								parametros.put("cpCodigoEmpresaTransPadrao", CodColigadaDestino);
								parametros.put("cpCodColigadaNovo", CodColigadaDestino);
								parametros.put("cpCodSecaoNovo", CodSecaoDestino);
								parametros.put("cpEstadoDestino", EstadoDestino);
								parametros.put("cpNovaEmpresaTransPadrao", empresaDestino);
								parametros.put("cpNovoGestorTransPadrao", nomeGestorDestino);
								parametros.put("cpGestorDestino", chapa_gestorDestino);
								parametros.put("cpGerenteGeralDestino", chapa_GG_Destino);
								parametros.put("cpSuperintendenteDestino", chapa_Sup_Destino);
								parametros.put("cpDiretorDestino", chapa_DiretorDestino);
								parametros.put("cpConsultoriaDestino", chapa_ConsultoraDestino);

								parametros.put("cpAvancoAutomatico", "1");

								var recrutados = hAPI.getCardValue("cpRecrutados");
								var OS = hAPI.getCardValue("cpOs");
								var JaRecrutado = false;
								var Splited = recrutados.split(",");
								for (var item in Splited) {
									if (Splited[item] == tableindex) {
										JaRecrutado = true;
									}
								}

								if (!JaRecrutado) {
									if (recrutados != "")
										recrutados += ",";
									hAPI.setCardValue("cpRecrutados", recrutados + "" + tableindex);

									if (OS != "")
										OS += ",";

									// CHAMADA PARA NOVO PROCESSO
									var Retorno = new java.util.HashMap();
									Retorno = hAPI.startProcess("FLUIG-0105", "141", destinatariosInterno, "Criado a partir da OS: " + getValue("WKNumProces"), true, parametros, true);
									appendMovimentacao(Retorno.get("iProcess"));

									hAPI.setCardValue("cpOS", OS + "" + Retorno.get("iProcess"));
								}

							} else {
								CandidatosEmAberto = 1;
							}
						} else if (tipo == "2") {
							if (colaborador != "" && salario != "") {
								UmEncontrado = true;

								// CAMPOS DO FORMULARIO QUE SERAO PREENCHIDOS
								var parametros = new java.util.HashMap();

								parametros.put("cpNumeroSolicitacaoRequisicao", getValue("WKNumProces").toString());
								parametros.put("cpMatriculaSolicitante", hAPI.getCardValue("cpMatriculaSolicitante"));
								parametros.put("cpNomeCompleto", colaborador);
								parametros.put("cpEnvioNome", colaborador);
								parametros.put("cpSalario", hAPI.getCardValue("itmNovoSalarioCCO___" + j));
								parametros.put("cpEnvioFuncao", hAPI.getCardValue("itmCargoCCO___" + j));
								parametros.put("cpFuncao", hAPI.getCardValue("itmCargoCCO___" + j));
								parametros.put("cpEnvioSecao", hAPI.getCardValue("cpObraDepProd"));

								var data = new Date();
								var stringData = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
								parametros.put("cpEnvioDtAdmissao", stringData);
								parametros.put("cpDataAbertura", stringData);
								parametros.put("cpZoomHorarioTrabalho", hAPI.getCardValue("itmHorario___" + i));
								parametros.put("cpHorarioTrabalho", hAPI.getCardValue("itmHorario___" + i));


								//para tipo de posto de trabalho
								parametros.put("cpNomePostoTrabalho", hAPI.getCardValue("itmDescMaoObra___" + i));
								parametros.put("cpCodigoPostoTrabalho", hAPI.getCardValue("itmCodPosto___" + i));
								parametros.put("cpTipoPostoTrabalho", hAPI.getCardValue("itmTipoPosto___" + i));



								parametros.put("cpCentroCusto", hAPI.getCardValue("cpObraDepProd"));
								parametros.put("cpCodigoSecao", hAPI.getCardValue("cpCodSecaoProd"));
								parametros.put("cpCodColigada", hAPI.getCardValue("cpCodColigadaDepartamento"));
								parametros.put("cpGestor", hAPI.getCardValue("cpNomeGestor"));
								parametros.put("cpEstado", hAPI.getCardValue("cpEstadoProd"));
								parametros.put("cpMatriculaObra", hAPI.getCardValue("cpRecolherDocProdChapa"));
								parametros.put("cpPapelPadraoRecolhimentoDoc", hAPI.getCardValue("cpPapelPadraoRecolhimentoDoc"));

								parametros.put("cpObraSede", hAPI.getCardValue("cpObraSede"));

								var possuiXp = hAPI.getCardValue("itmExperiencia___" + j);

								if (possuiXp == 1) {
									parametros.put("cpPossuiXp", "Sim");
								} else {
									parametros.put("cpPossuiXp", "Não");
								}

								parametros.put("cpMaoDeObra", tipoMaoObra);
								parametros.put("cpAvancoAutomatico", "1");
								if (ObraOuSede == "1") {
									parametros.put("cpObraSede", "1");
								} else {
									parametros.put("cpObraSede", "0");
								}

								var recrutados = hAPI.getCardValue("cpRecrutados");
								var OS = hAPI.getCardValue("cpOs");
								var JaRecrutado = false;
								var Splited = recrutados.split(",");
								for (var item in Splited) {
									if (Splited[item] == tableindex) {
										JaRecrutado = true;
									}
								}

								if (!JaRecrutado) {
									if (recrutados != "")
										recrutados += ",";
									hAPI.setCardValue("cpRecrutados", recrutados + "" + tableindex);

									if (OS != "")
										OS += ",";

									// CHAMADA PARA NOVO PROCESSO
									var Retorno = new java.util.HashMap();
									Retorno = hAPI.startProcess("FLUIG-0102", atividadeExterno, destinatariosExterno, "Criado a partir da OS: " + getValue("WKNumProces"), true, parametros, true);
									appendCadastro(Retorno.get("iProcess"));

									hAPI.setCardValue("cpOS", OS + "" + Retorno.get("iProcess"));
								}

							} else {
								CandidatosEmAberto = 1;
							}
						} else if (tipo == "0") {
							CandidatosEmAberto = 1;
						}
					}
				}
				Inicio += quantidade;
			}
		}
	}

	if (CandidatosEmAberto > 0)
		retorno = 2;

	return retorno;

}