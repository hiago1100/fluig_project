//VERSÃO: 1.4.4.6
function addCentralTarefasInfo(processo, numProcess)
{
	try
	{
		getResumo(processo, numProcess);
	}
	catch (err)
	{
		var message = "ERRO AO INSERIR AS INFORMAÇÕES ADICIONAIS DA CENTRAL DE TAREFAS - DESCRIÇÃO DO ERRO: " + err.message;

		log.error("-----------------------------------------------------------------");
		log.error(message);
		log.error("-----------------------------------------------------------------");

	}
}

function getResumo(processo, numProcess)
{
	log.warn("ADICIONANDO OS MAPEAMENTOS PARA A CENTRAL DE TAREFAS - PROCESSO: " + processo + " - NUMERO PROCESSO: " + numProcess);

	var resumo = "";
	var mapa = getMapeamento(processo);
	var quantidade = mapa.rowsCount;
	if (quantidade == undefined || quantidade == null)
	{
		quantidade = 0;
	}

	debugLogCentral(isDebug(getValue("WKDef")), mapa);

	for (var y = 0; y < quantidade; y++)
	{
		var tipo = mapa.getValue(y, "TIPO_CAMPO");
		var campo = mapa.getValue(y, "CAMPO");
		var label = mapa.getValue(y, "LABEL");

		if (tipo == 10) //combobox
		{
			if (resumo == "")
			{
				resumo = label + ": " + valoresDescricao(campo, hAPI.getCardValue(campo), processo);
			}
			else
			{
				resumo = resumo + "; " + label + ": " + valoresDescricao(campo, hAPI.getCardValue(campo), processo);
			}
		}
		else if (tipo == 5) //pai e filho 
		{
			if (resumo == "")
			{
				resumo = valoresPaiFilho(campo, processo, label);
			}
			else
			{
				resumo = resumo + "; " + valoresPaiFilho(campo, processo, label);
			}
		}
		else if (tipo == 20) //customizado 
		{
			if (resumo == "")
			{
				resumo = label + ": " + valoresCustomizados(campo, hAPI.getCardValue(campo), processo);
			}
			else
			{
				resumo = resumo + "; " + label + ": " + valoresCustomizados(campo, hAPI.getCardValue(campo), processo);
			}
		}
		else
		{
			if (resumo == "") // normal 
			{
				resumo = label + ": " + hAPI.getCardValue(campo);
			}
			else
			{
				resumo = resumo + "; " + label + ": " + hAPI.getCardValue(campo);
			}
		}

		// para evitar que aja um loop eterno.
		if (y > 10)
		{
			return;
		}

	};

	setMapeamento(numProcess, resumo);
}

function setMapeamento(numProcess, resumo)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);

	try
	{
		log.info('[central] - excluindo registro de resumo');
		DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_CENTRAL_EXCLUIR_RESUMO', numProcess + '', 'DELETE'], constraints, null);
	}
	catch (e)
	{
		log.error('ERRO AO EXCLUIR OS RESUMOS ASSOCIADOS A ESSE PROCESSO - ' + numProcess);
	}

	try
	{
		DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_CENTRAL_INSERE_RESUMO', "'" + resumo + "'," + numProcess, 'INSERT'], constraints, null);
	}
	catch (e)
	{
		log.error('ERRO AO INSERIR OS RESUMOS ASSOCIADOS A ESSE PROCESSO - ' + numProcess);
	}
}

function valoresCustomizados(campo, valor, processo)
{
	//-----------------------------------------------
	//FLUIG-0130
	if (processo == "FLUIG-0130")
	{
		if (campo == "cpHorarioDesejadoHora")
		{
			return hAPI.getCardValue("cpHorarioDesejadoHora") + ":" + hAPI.getCardValue("cpHorarioDesejadoMinuto");
		}
	}

	if (processo == "FLUIG-0122")
	{
		if (campo == "cpAreaDepartamento")
		{
			if (hAPI.getCardValue("cpAreaDepartamento") != '')
			{
				return valoresDescricao('cpAreaDepartamento', hAPI.getCardValue("cpAreaDepartamento"), 'FLUIG-0122');
			}
			else
			{
				return valoresDescricao('cpAreaDepartamentoCAP', hAPI.getCardValue("cpAreaDepartamentoCAP"), 'FLUIG-0122');
			}
		}

		if (campo == "cpTipoSolicitacao")
		{
			if (hAPI.getCardValue("cpTipoSolicitacao") != '')
			{
				return valoresDescricao('cpTipoSolicitacao', hAPI.getCardValue("cpTipoSolicitacao"), 'FLUIG-0122');
			}
			else
			{
				return valoresDescricao('cpTipoCAP',hAPI.getCardValue("cpTipoCAP"),'FLUIG-0122');
			}
		}
	}

	//FLUIG-0130
	if (processo == "FLUIG-0141")
	{
		var isPJ = hAPI.getCardValue("cpFornecedor") == 2;
		var isPF = hAPI.getCardValue("cpFornecedor") == 1;

		if (campo == "cpNome")
		{
			if (isPJ)
			{
				return hAPI.getCardValue("cpRazaoSocial");
			}
			if (isPF)
			{
				return hAPI.getCardValue("cpNome");
			}
		}
		if (campo == "cpCPF")
		{
			if (isPJ)
			{
				return hAPI.getCardValue("cpCNPJ");
			}
			if (isPF)
			{
				return hAPI.getCardValue("cpCPF");
			}
		}
	}

	//-----------------------------------------------
	//FLUIG-0179
	if (processo == "FLUIG-0179")
	{
		if (campo == "cpCentroDeCusto")
		{
			if (hAPI.getCardValue("cpTipo") == 2)
			{
				return hAPI.getCardValue("cpCentroDeCustoSemVarios")
			}
			else
			{
				return hAPI.getCardValue("cpCentroDeCusto")
			}
		}
		if (campo == "cpResponsavel")
		{
			if (hAPI.getCardValue("cpTipo") == 2)
			{
				return hAPI.getCardValue("cpSecaoLinhaRespSemVarios")
			}
			else
			{
				return hAPI.getCardValue("cpSecaoLinhaResp");
			}

			return "";
		}
	}
}

function setResumoPaiFilho(label, campo, quantidade)
{
	var resumo = '';

	for (var x = 1; x <= quantidade; x++)
	{
		if (resumo == "")
		{
			resumo = "[" + x + "] " + label + ": " + hAPI.getCardValue(campo + "___" + x);
		}
		else
		{
			resumo = resumo + "; [" + x + "] " + label + ": " + hAPI.getCardValue(campo + "___" + x);
		}

		// para evitar que aja um loop eterno.
		if (x > 30)
		{
			return;
		}
	}

	return resumo;
}

function valoresPaiFilho(campo, processo, label)
{

	//-----------------------------------------------
	//FLUIG-0104
	if (processo == "FLUIG-0104")
	{

		if (campo == "itmNomeCargo")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeColaboradores"));
		}
		if (campo == "itmQuantidade")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeColaboradores"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0109
	if (processo == "FLUIG-0109")
	{
		if (campo == "cpDataInicioFerias")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeFerias"));
		}

		if (campo == "cpDataFimFerias")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeFerias"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0130
	if (processo == "FLUIG-0130")
	{
		if (campo == "cpOrigem")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeTotal"));
		}

		if (campo == "cpDestino")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeTotal"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0169
	if (processo == "FLUIG-0169")
	{
		if (campo == "cpNomeColigada")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeObras"));
		}

		if (campo == "cpNomeObraUAU")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeObras"));
		}

	}


	//-----------------------------------------------
	//FLUIG-0170
	if (processo == "FLUIG-0170")
	{
		if (campo == "cpObra")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeObras"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0173
	if (processo == "FLUIG-0173")
	{
		if (campo == "cpNomeColaborador")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQuantidadeObras"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0236
	if (processo == "FLUIG-0236")
	{
		if (campo == "cpVagaFuncao")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQntTotalFuncoes"));
		}

		if (campo == "cpVagaSalario")
		{
			return setResumoPaiFilho(label, campo, hAPI.getCardValue("cpQntTotalFuncoes"));
		}
	}
}

function filterMap(processo, campo, valor)
{
	var processos = mapeamentoCombos.filter(function(map)
	{
		return map.processo == processo
	});

	if (processos == undefined || processos.length == 0)
	{
		log.warn('NAO FOI POSSIVEL ACHAR A DESCRICAO DESSE RESUMO - processo - ');
		log.warn('processo' + processo);
		log.warn('campo' + campo);
		log.warn('valor' + valor);
		return valor;
	}

	var campos = processos[0].campos.filter(function(map)
	{
		return map.campo == campo
	})[0];

	if (campos == undefined || campos.length == 0)
	{
		log.warn('NAO FOI POSSIVEL ACHAR A DESCRICAO DESSE RESUMO - campo - ');
		log.warn('processo' + processo);
		log.warn('campo' + campo);
		log.warn('valor' + valor);
		return valor;
	}

	var valores = campos.valores.filter(function(map)
	{
		return map.valor == valor;
	});

	if (valores == undefined || valores.length == 0)
	{
		log.warn('NAO FOI POSSIVEL ACHAR A DESCRICAO DESSE RESUMO - valores- ');
		log.warn('processo' + processo);
		log.warn('campo' + campo);
		log.warn('valor' + valor);
		return valor;
	}
	else
	{
		return valores[0].descricao;
	}


}

//mapeamento dos valores de itens nao text - proxima atualização colocar isso dinamicamente
function valoresDescricao(campo, valor, processo)
{
	var valor = filterMap(processo, campo, valor);

	return (valor == '' || valor == undefined) ? '' : valor;
}

function getMapeamento(processo)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_CENTRAL_LISTA_MAPEAMENTO', "'" + processo + "'"], constraints, null);

	if (dados == null && dados.rowsCount == 0)
	{
		throw "FALHA AO BUSCAR O MAPEAMENTO.";
	}

	return dados;
}

function debugLogCentral(bool, dados)
{
	if (bool)
	{
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
		log.warn('DEBUG - CENTRAL');
		log.warn('Dados do mapeamento da central para esse processo');
		log.dir(dados);
		log.warn('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

	}
}

function isDebug(processo)
{
	var c = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
	var constraints = new Array(c);
	var dados = DatasetFactory.getDataset('DS_FLUIG_1000', ['SP_FLUIG_1016', "'CENTRAL'"], constraints, null);

	if (dados == null && dados.rowsCount == 0)
	{
		throw "FALHA AO BUSCAR O DEBUG.";
	}

	return dados.getValue(0, "DEBUG");;
}

var mapeamentoCombos = [
	{
		processo: 'FLUIG-0100',
		campos: [
		{
			campo: 'cpTipoExcecao',
			valores: [
			{
				valor: '1',
				descricao: 'Admissão (Fora da Política de Remuneração)'
			},
			{
				valor: '3',
				descricao: 'Férias'
			},
			{
				valor: '5',
				descricao: 'Movimentação de Pessoal'
			}]
		}],
	},
	{
		processo: 'FLUIG-0104',
		campos: [
		{
			campo: 'cpTipoMaoObra',
			valores: [
			{
				valor: '1',
				descricao: 'Produção'
			},
			{
				valor: '2',
				descricao: 'Encarregado de Produção'
			},
			{
				valor: '3',
				descricao: 'Administrativo'
			},
			{
				valor: '4',
				descricao: 'Estratégico'
			}]
		},
		{
			campo: 'cpMotivoAdmissaoProd',
			valores: [
			{
				valor: '1',
				descricao: 'Aumento de Quadro'
			},
			{
				valor: '6',
				descricao: 'Efetivação'
			},
			{
				valor: '2',
				descricao: 'Substituição de demissão'
			},
			{
				valor: '3',
				descricao: 'Substituição de férias'
			},
			{
				valor: '4',
				descricao: 'Substituição de Licença Maternidade'
			},
			{
				valor: '5',
				descricao: 'Substituição de Acidente de trabalho ou doença'
			},
			{
				valor: '7',
				descricao: 'Substituição de Transferência / Promoção'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0105',
		campos: [
		{
			campo: 'cpTransferencia',
			valores: [
			{
				valor: '1',
				descricao: 'Sim'
			},
			{
				valor: '2',
				descricao: 'Não'
			}]
		},
		{
			campo: 'cpTipoMovimentacao',
			valores: [
			{
				valor: '1',
				descricao: 'Promoção'
			},
			{
				valor: '2',
				descricao: 'Progressão'
			},
			{
				valor: '3',
				descricao: 'Enquadramento'
			},
			{
				valor: '4',
				descricao: 'Reclassificação'
			},
			{
				valor: '5',
				descricao: 'Sem alteração salarial'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0106',
		campos: [
			{
				campo: 'cpTipoBeneficio',
				valores: [
				{
					valor: 'ConvenioOdontologico',
					descricao: 'Convênio Odontológico'
				},
				{
					valor: 'ConvenioFarmacia',
					descricao: 'Convênio Farmácia'
				},
				{
					valor: 'SeguroDeVida',
					descricao: 'Seguro de Vida'
				},
				{
					valor: 'PlanoDeSaude',
					descricao: 'Plano de Saúde'
				},
				{
					valor: 'CartaoAlimentacao',
					descricao: 'Cartão Alimentação e Refeição'
				},
				{
					valor: 'ValeTransporte',
					descricao: 'Vale Transporte'
				}]
			},

			{
				campo: 'cpTipoSolicitacao',
				valores: [
					{
						valor: '1',
						descricao: 'Solicitação de Continuidade de Convênio Odontológico'
					},
					{
						valor: '2',
						descricao: 'Solicitação de Convênio Odontológico'
					},
					{
						valor: '3',
						descricao: 'Solicitação de 2ª via do cartão do Convênio Odontológico'
					},
					{
						valor: '4',
						descricao: 'Solicitação de alteração/atualização de Convênio Odontológico'
					},
					{
						valor: '5',
						descricao: 'Solicitação de exclusão de Convênio Odontológico'
					},
					{
						valor: '6',
						descricao: 'Solicitação de cartão Convênio Farmácia"'
					},
					{
						valor: '7',
						descricao: 'Solicitação de 2ª via do cartão Convênio Farmácia'
					},
					{
						valor: '8',
						descricao: 'Solicitação de exclusão de Cartão Convênio Farmácia'
					},
					{
						valor: '9',
						descricao: 'Solicitação de Processo Indenizatório'
					},
					{
						valor: '10',
						descricao: 'Solicitação de Cesta de Natalidade"'
					},
					{
						valor: '11',
						descricao: 'Solicitação de Certificado da Apólice'
					},
					{
						valor: '12',
						descricao: 'Solicitação de Plano de Saúde'
					},
					{
						valor: '13',
						descricao: 'Solicitação de 2ª via do cartão Plano de Saúde'
					},
					{
						valor: '14',
						descricao: 'Solicitação de reembolso de Plano de Saúde'
					},
					{
						valor: '15',
						descricao: 'Solicitação de exclusão de Plano de Saúde'
					},
					{
						valor: '16',
						descricao: 'Solicitação de alteração/atualização de dados cadastrais de Plano de Saúde'
					},
					{
						valor: '17',
						descricao: 'Solicitação de Continuidade de Plano de Saúde (demitidos)'
					},
					{
						valor: '18',
						descricao: 'Solicitação mensal de Ticket Alimentação ou Cesta Básica'
					},
					{
						valor: '19',
						descricao: 'Solicitação de Pedido Complementar'
					},
					{
						valor: '20',
						descricao: 'Solicitação de alteração de Cartão Alimentação ou Refeição'
					},
					{
						valor: '21',
						descricao: 'Crédito mensal não disponibilizado / valor incorreto'
					},
					{
						valor: '22',
						descricao: 'Solicitação de Cartão Alimentação/refeição Provisório'
					},
					{
						valor: '23',
						descricao: 'Solicitação de 2ª Via Cartão Alimentação/Refeição'
					},
					{
						valor: '24',
						descricao: 'Solicitação de saldo de Vale Transporte'
					},
					{
						valor: '25',
						descricao: 'Solicitação de relatório de carga de Vale transporte'
					},
					{
						valor: '26',
						descricao: 'Solicitação de exclusão de Vale Transporte'
					},
					{
						valor: '27',
						descricao: 'Informações para pedido mensal de Vale Transporte'
					},
					{
						valor: '28',
						descricao: 'Solicitação de Vale Transporte Complementar'
					},
					{
						valor: '29',
						descricao: 'Solicitação de Vale Transporte (após admissão)'
					},
					{
						valor: '30',
						descricao: 'Solicitação de 2ª via/bloqueio do cartão de Vale Transporte'
					},
					{
						valor: '31',
						descricao: 'Solicitação de alteração/atualização de tarifa de Vale Transporte'
					},
					{
						valor: '32',
						descricao: 'Solicitação de Vale Transporte Admitidos (regional MG)'
					},
					{
						valor: '34',
						descricao: 'Crédito mensal não disponibilizado / valor incorreto'
					},
					{
						valor: '35',
						descricao: 'Solicitação de extrato de coparticipação'
					},

				]
			}
		],
	},
	{
		processo: 'FLUIG-0107',
		campos: [
		{
			campo: 'cpFinalidade',
			valores: [
			{
				valor: '1',
				descricao: 'Pagamento'
			},
			{
				valor: '2',
				descricao: 'Cobrança'
			},
			{
				valor: '3',
				descricao: 'Financiamento'
			},
			{
				valor: '4',
				descricao: 'Outros'
			}]
		},
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Abertura de conta bancária (Obra já existente no UAU)'
			},
			{
				valor: '2',
				descricao: 'Criação de nova Empresa / Obra / Etapa / Conta Bancária'
			}]
		},
		{
			campo: 'cpTipoConta',
			valores: [
			{
				valor: '1',
				descricao: 'Abertura de Conta Bancária de gaveta'
			},
			{
				valor: '2',
				descricao: 'Abertura de Conta Bancária'
			}]
		}],
	},
	{
		processo: 'FLUIG-0109',
		campos: [
		{
			campo: 'cpHaveraAbono',
			valores: [
			{
				valor: '1',
				descricao: 'Sim'
			},
			{
				valor: '0',
				descricao: 'Não'
			}]
		}],
	},
	{
		processo: 'FLUIG-0113',
		campos: [
		{
			campo: 'cpTipoAfastamento',
			valores: [
			{
				valor: '1',
				descricao: 'Licença maternidade'
			},
			{
				valor: '2',
				descricao: 'Afastamento por motivo de doença'
			},
			{
				valor: '3',
				descricao: 'Afastamento por acidente de trabalho'
			},
			{
				valor: '4',
				descricao: 'Aposentadoria por invalidez'
			},
			{
				valor: '5',
				descricao: 'Licença sem vencimentos'
			},
			{
				valor: '6',
				descricao: 'Outros'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0114',
		campos: [
		{
			campo: 'cpTipoAviso',
			valores: [
			{
				valor: '1',
				descricao: 'Trabalhado'
			},
			{
				valor: '2',
				descricao: 'Indenizado'
			},
			{
				valor: '3',
				descricao: 'Não se aplica'
			}]
		}],
	},
	{
		processo: 'FLUIG-0115',
		campos: [
		{
			campo: 'cpTipoMudanca',
			valores: [
			{
				valor: '1',
				descricao: 'Todos os Colaboradores de uma Empresa ou Seção'
			},
			{
				valor: '2',
				descricao: 'Adicionar colaboradores separadamente'
			},
			{
				valor: '3',
				descricao: 'Próprio colaborador'
			}]
		}],
	},
	{
		processo: 'FLUIG-0122',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Crachá'
			},
			{
				valor: '2',
				descricao: 'Plano de Saúde'
			},
			{
				valor: '3',
				descricao: 'Seguro de Vida'
			},
			{
				valor: '4',
				descricao: 'Vale Transporte'
			},
			{
				valor: '5',
				descricao: 'Vale Alimentação / Refeição'
			},
			{
				valor: '6',
				descricao: 'Convênio Farmácia'
			},
			{
				valor: '7',
				descricao: 'Convênio Odontológico'
			},
			{
				valor: '8',
				descricao: 'Uniformes'
			},
			{
				valor: '62',
				descricao: 'Serviços de Terceiro'
			},
			{
				valor: '76',
				descricao: 'Vale Combustível'
			},
			{
				valor: '9',
				descricao: 'Férias'
			},
			{
				valor: '10',
				descricao: 'Férias - Pensão Alimentícia'
			},
			{
				valor: '11',
				descricao: 'Folha Mensal - Mensal'
			},
			{
				valor: '12',
				descricao: 'Folha Mensal - Fora do prazo'
			},
			{
				valor: '13',
				descricao: 'Folha Mensal - Inconsistências'
			},
			{
				valor: '14',
				descricao: 'Folha Quinzenal'
			},
			{
				valor: '15',
				descricao: 'Folha Complementar'
			},
			{
				valor: '16',
				descricao: 'Folha Vale Transporte'
			},
			{
				valor: '17',
				descricao: 'Folha PLR'
			},
			{
				valor: '18',
				descricao: 'Folha 13º salário'
			},
			{
				valor: '19',
				descricao: 'Folha prêmio de Produção'
			},
			{
				valor: '20',
				descricao: 'Mensalidade Social'
			},
			{
				valor: '63',
				descricao: 'Mensalidade Social Patronal'
			},
			{
				valor: '21',
				descricao: 'Contribuição Sindical'
			},
			{
				valor: '64',
				descricao: 'Contribuição Sindical Patronal'
			},
			{
				valor: '22',
				descricao: 'Contribuição Assistencial'
			},
			{
				valor: '23',
				descricao: 'Seconci'
			},
			{
				valor: '24',
				descricao: 'Empréstimo Consignado'
			},
			{
				valor: '25',
				descricao: 'FGTS'
			},
			{
				valor: '26',
				descricao: 'INSS 13º salário'
			},
			{
				valor: '27',
				descricao: 'INSS Folha'
			},
			{
				valor: '65',
				descricao: 'INSS FAP Judicial'
			},
			{
				valor: '28',
				descricao: 'Imposto de Renda sobre Folha'
			},
			{
				valor: '66',
				descricao: 'Adicional SENAI'
			},
			{
				valor: '69',
				descricao: 'Franquia - UNIK'
			},
			{
				valor: '70',
				descricao: 'Cartões - UNIK'
			},
			{
				valor: '29',
				descricao: 'Pensão Alimentícia'
			},
			{
				valor: '30',
				descricao: 'Pagamento PJ'
			},
			{
				valor: '31',
				descricao: 'Aquisição de Equipamento'
			},
			{
				valor: '32',
				descricao: 'Manutenção de equipamento'
			},
			{
				valor: '33',
				descricao: 'Liberação de CND'
			},
			{
				valor: '34',
				descricao: 'Multas'
			},
			{
				valor: '35',
				descricao: 'Salário dos detentos'
			},
			{
				valor: '36',
				descricao: 'Segurança e Medicina do Trabalho'
			},
			{
				valor: '67',
				descricao: 'Auditorias ou Serviços de Terceiros'
			},
			{
				valor: '37',
				descricao: 'Rescisão e FGTS'
			},
			{
				valor: '68',
				descricao: 'Rescisão - Pensão Alimentícia'
			},
			{
				valor: '38',
				descricao: 'Água (COPASA)'
			},
			{
				valor: '39',
				descricao: 'Aluguel'
			},
			{
				valor: '40',
				descricao: 'Condomínio'
			},
			{
				valor: '77',
				descricao: 'Correios e Telégrafos'
			},
			{
				valor: '41',
				descricao: 'Entrega de Documentos'
			},
			{
				valor: '42',
				descricao: 'Estacionamento'
			},
			{
				valor: '43',
				descricao: 'IPTU'
			},
			{
				valor: '44',
				descricao: 'Lanche'
			},
			{
				valor: '45',
				descricao: 'Limpeza e Conservação'
			},
			{
				valor: '46',
				descricao: 'Luz(CEMIG)'
			},
			{
				valor: '47',
				descricao: 'Manutenção de Infraestrutura'
			},
			{
				valor: '48',
				descricao: 'Materiais para manutenção'
			},
			{
				valor: '71',
				descricao: 'Nota de Débito'
			},
			{
				valor: '90',
				descricao: 'Segurança Patrimonial (EMIVE)'
			},
			{
				valor: '50',
				descricao: 'Adiantamento de Viagem'
			},
			{
				valor: '51',
				descricao: 'Aéreo'
			},
			{
				valor: '52',
				descricao: 'Conexão Aeroporto'
			},
			{
				valor: '53',
				descricao: 'Hospedagem'
			},
			{
				valor: '54',
				descricao: 'Locação de Veículo'
			},
			{
				valor: '55',
				descricao: 'Passagem Rodoviária'
			},
			{
				valor: '56',
				descricao: 'Prestação de contas de viagem'
			},
			{
				valor: '57',
				descricao: 'Taxa FEE'
			},
			{
				valor: '58',
				descricao: 'Taxi'
			},
			{
				valor: '59',
				descricao: 'Transfer'
			},
			{
				valor: '60',
				descricao: 'Solicitação de adiantamento de adornos'
			},
			{
				valor: '61',
				descricao: 'Reembolso de desespesas avulsas'
			},
			{
				valor: '80',
				descricao: 'Gestão da Dívida'
			},
			{
				valor: '81',
				descricao: 'Tarifas'
			}]
		},
		{
			campo: 'cpTipoNota',
			valores: [
			{
				valor: '1',
				descricao: 'NF de Serviço'
			},
			{
				valor: '2',
				descricao: 'NF de Material'
			},
			{
				valor: '3',
				descricao: 'Processo para contabilidade'
			},
			{
				valor: '4',
				descricao: 'Sem NF'
			}]
		},
		{
			campo: 'cpTipoCAP',
			valores: [
			{
				valor: '1',
				descricao: 'Adiantamentos'
			},
			{
				valor: '2',
				descricao: 'Aluguel'
			},
			{
				valor: '3',
				descricao: 'Contas de consumo'
			},
			{
				valor: '4',
				descricao: 'Despesas'
			},
			{
				valor: '5',
				descricao: 'IPTU'
			},
			{
				valor: '6',
				descricao: 'Prestação de Contas'
			},
			{
				valor: '7',
				descricao: 'NF serviço'
			},
			{
				valor: '8',
				descricao: 'NF empreiteiro'
			},
			{
				valor: '9',
				descricao: 'NF material'
			},
			{
				valor: '10',
				descricao: 'Condomínio'
			},
			{
				valor: '11',
				descricao: 'Seguro de vida'
			},
			{
				valor: '12',
				descricao: 'IPTU'
			},
			{
				valor: '13',
				descricao: 'Desconto a promitente'
			},
			{
				valor: '14',
				descricao: 'Devolução de valores a Cliente'
			},
			{
				valor: '15',
				descricao: 'Rescisão com transferência de crédito'
			},
			{
				valor: '16',
				descricao: 'Taxas operacionais estruturadas'
			},
			{
				valor: '17',
				descricao: 'NF serviço'
			},
			{
				valor: '18',
				descricao: 'NF material'
			},
			{
				valor: '19',
				descricao: 'Impostos s/NF'
			},
			{
				valor: '20',
				descricao: 'Impostos s/receita'
			},
			{
				valor: '21',
				descricao: 'Aluguel'
			},
			{
				valor: '22',
				descricao: 'IPTU'
			},
			{
				valor: '23',
				descricao: 'Contas de consumo'
			},
			{
				valor: '24',
				descricao: 'NF serviço'
			},
			{
				valor: '25',
				descricao: 'NF material'
			},
			{
				valor: '26',
				descricao: 'Acordos'
			},
			{
				valor: '27',
				descricao: 'Aluguel'
			},
			{
				valor: '28',
				descricao: 'IPTU'
			},
			{
				valor: '29',
				descricao: 'Contas de consumo'
			},
			{
				valor: '30',
				descricao: 'NF serviço'
			},
			{
				valor: '31',
				descricao: 'NF material'
			},
			{
				valor: '32',
				descricao: 'NF serviço'
			},
			{
				valor: '33',
				descricao: 'NF material'
			},
			{
				valor: '34',
				descricao: 'Recompra de ações'
			},
			{
				valor: '35',
				descricao: 'Amortização'
			},
			{
				valor: '36',
				descricao: 'Dividendos'
			},
			{
				valor: '37',
				descricao: 'Distrato'
			},
			{
				valor: '38',
				descricao: 'Aluguel'
			},
			{
				valor: '39',
				descricao: 'IPTU'
			},
			{
				valor: '40',
				descricao: 'NF comissão'
			},
			{
				valor: '41',
				descricao: 'Taxas'
			},
			{
				valor: '42',
				descricao: 'Aluguel'
			},
			{
				valor: '43',
				descricao: 'Contas de consumo'
			},
			{
				valor: '44',
				descricao: 'NF serviço'
			},
			{
				valor: '45',
				descricao: 'NF material'
			},
			{
				valor: '46',
				descricao: 'Aluguel'
			},
			{
				valor: '47',
				descricao: 'IPTU'
			},
			{
				valor: '48',
				descricao: 'Contas de consumo'
			},
			{
				valor: '49',
				descricao: 'NF serviço'
			},
			{
				valor: '50',
				descricao: 'NF material'
			},
			{
				valor: '51',
				descricao: 'Aporte'
			},
			{
				valor: '52',
				descricao: 'Distribuição'
			},
			{
				valor: '53',
				descricao: 'NF serviço'
			},
			{
				valor: '54',
				descricao: 'Permuta'
			},
			{
				valor: '55',
				descricao: 'Apólice de seguro'
			},
			{
				valor: '56',
				descricao: 'NF serviço'
			},
			{
				valor: '57',
				descricao: 'Permuta'
			},
			{
				valor: '58',
				descricao: 'Aluguel'
			},
			{
				valor: '59',
				descricao: 'IPTU'
			},
			{
				valor: '60',
				descricao: 'Contas de consumo'
			},
			{
				valor: '61',
				descricao: 'NF serviço'
			},
			{
				valor: '62',
				descricao: 'NF material'
			},
			{
				valor: '63',
				descricao: 'Nota de premiação'
			},
			{
				valor: '64',
				descricao: 'Material'
			},
			{
				valor: '65',
				descricao: 'Material de contrato'
			},
			{
				valor: '66',
				descricao: 'Serviço - contrato'
			},
			{
				valor: '67',
				descricao: 'Empreiteiro'
			},
			{
				valor: '68',
				descricao: 'IPTU'
			},
			{
				valor: '69',
				descricao: 'Pagamento de terreno'
			},
			{
				valor: '70',
				descricao: 'Certidões'
			},
			{
				valor: '71',
				descricao: 'Material contrato'
			},
			{
				valor: '72',
				descricao: 'Serviço Contrato'
			},
			{
				valor: '73',
				descricao: 'Honorários'
			},
			{
				valor: '74',
				descricao: 'Processos Judiciais'
			},
			{
				valor: '75',
				descricao: 'NF Serviço'
			},
			{
				valor: '76',
				descricao: 'Acordos'
			},
			{
				valor: '77',
				descricao: 'Aluguel'
			},
			{
				valor: '78',
				descricao: 'IPTU'
			},
			{
				valor: '79',
				descricao: 'Contas de consumo'
			},
			{
				valor: '80',
				descricao: 'NF serviço'
			},
			{
				valor: '81',
				descricao: 'NF empreiteiro'
			},
			{
				valor: '82',
				descricao: 'NF material'
			},
			{
				valor: '83',
				descricao: 'Aluguel'
			},
			{
				valor: '84',
				descricao: 'IPTU'
			},
			{
				valor: '85',
				descricao: 'Contas de consumo'
			},
			{
				valor: '86',
				descricao: 'NF serviço'
			},
			{
				valor: '87',
				descricao: 'NF material'
			},
			{
				valor: '88',
				descricao: 'NF empreiteiro'
			},
			{
				valor: '89',
				descricao: 'Aluguel'
			},
			{
				valor: '90',
				descricao: 'Contas de consumo'
			},
			{
				valor: '91',
				descricao: 'NF serviço'
			},
			{
				valor: '92',
				descricao: 'NF material'
			},
			{
				valor: '93',
				descricao: 'NF empreiteiro'
			},
			{
				valor: '94',
				descricao: 'Aluguel'
			},
			{
				valor: '95',
				descricao: 'IPTU'
			},
			{
				valor: '96',
				descricao: 'Contas de consumo'
			},
			{
				valor: '97',
				descricao: 'NF serviço'
			},
			{
				valor: '98',
				descricao: 'NF material'
			},
			{
				valor: '99',
				descricao: 'Aluguel'
			},
			{
				valor: '100',
				descricao: 'IPTU'
			},
			{
				valor: '101',
				descricao: 'Contas de consumo'
			},
			{
				valor: '102',
				descricao: 'NF serviço'
			},
			{
				valor: '103',
				descricao: 'NF material'
			},
			{
				valor: '104',
				descricao: 'Consumo'
			},
			{
				valor: '105',
				descricao: 'Aluguel'
			},
			{
				valor: '106',
				descricao: 'NF material'
			},
			{
				valor: '107',
				descricao: 'NF serviço'
			},
			{
				valor: '108',
				descricao: 'Aluguel'
			},
			{
				valor: '109',
				descricao: 'IPTU'
			},
			{
				valor: '110',
				descricao: 'Contas de consumo'
			},
			{
				valor: '111',
				descricao: 'NF serviço'
			},
			{
				valor: '112',
				descricao: 'NF material'
			},
			{
				valor: '113',
				descricao: 'Nota de premiação'
			},
			{
				valor: '114',
				descricao: 'Aluguel'
			},
			{
				valor: '115',
				descricao: 'IPTU'
			},
			{
				valor: '116',
				descricao: 'Contas de consumo'
			},
			{
				valor: '117',
				descricao: 'NF serviço'
			},
			{
				valor: '118',
				descricao: 'NF material'
			},
			{
				valor: '119',
				descricao: 'Pagamento de terreno'
			},
			{
				valor: '120',
				descricao: 'Aluguel'
			},
			{
				valor: '121',
				descricao: 'IPTU'
			},
			{
				valor: '122',
				descricao: 'Contas de consumo'
			},
			{
				valor: '123',
				descricao: 'NF serviço'
			},
			{
				valor: '124',
				descricao: 'NF material'
			},
			{
				valor: '125',
				descricao: 'Nota de premiação'
			},
			{
				valor: '126',
				descricao: 'Patrocínios'
			},
			{
				valor: '127',
				descricao: 'Aluguel'
			},
			{
				valor: '128',
				descricao: 'IPTU'
			},
			{
				valor: '129',
				descricao: 'Contas de consumo'
			},
			{
				valor: '130',
				descricao: 'NF serviço'
			},
			{
				valor: '131',
				descricao: 'NF material'
			}]
		},
		{
			campo: 'cpAreaDepartamento',
			valores: [
			{
				valor: '1',
				descricao: 'Administração de pessoal'
			},
			{
				valor: '2',
				descricao: 'Benefícios'
			},
			{
				valor: '3',
				descricao: 'Férias'
			},
			{
				valor: '4',
				descricao: 'Folha de Pagamento'
			},
			{
				valor: '5',
				descricao: 'PJ'
			},
			{
				valor: '6',
				descricao: 'Ponto Eletrônico'
			},
			{
				valor: '7',
				descricao: 'Relações Trabalhistas'
			},
			{
				valor: '8',
				descricao: 'Rescisão'
			},
			{
				valor: '9',
				descricao: 'Infraestrutura'
			},
			{
				valor: '10',
				descricao: 'Viagem'
			},
			{
				valor: '14',
				descricao: 'Financiamento Imobiliário'
			},
			{
				valor: '11',
				descricao: 'Adorno'
			},
			{
				valor: '12',
				descricao: 'Despesas Diretoria'
			},
			{
				valor: '13',
				descricao: 'Gestão de Dívida'
			}]
		},
		{
			campo: 'cpAreaDepartamentoCAP',
			valores: [
			{
				valor: '1',
				descricao: 'Administrativo Sede'
			},
			{
				valor: '21',
				descricao: 'Adminstrativo Obra'
			},
			{
				valor: '16',
				descricao: 'Assistência Técnica'
			},
			{
				valor: '22',
				descricao: 'Comercial'
			},
			{
				valor: '3',
				descricao: 'Contabilidade Fiscal'
			},
			{
				valor: '2',
				descricao: 'Contas a receber'
			},
			{
				valor: '10',
				descricao: 'Controladoria'
			},
			{
				valor: '18',
				descricao: 'Controle'
			},
			{
				valor: '11',
				descricao: 'Finaças Corporativas'
			},
			{
				valor: '12',
				descricao: 'Financiamento Imobiliário'
			},
			{
				valor: '23',
				descricao: 'Incorporação'
			},
			{
				valor: '14',
				descricao: 'Jurídico Consultivo'
			},
			{
				valor: '15',
				descricao: 'Jurídico Contencioso'
			},
			{
				valor: '24',
				descricao: 'Marketing de Vendas'
			},
			{
				valor: '13',
				descricao: 'Obra'
			},
			{
				valor: '25',
				descricao: 'Produto'
			},
			{
				valor: '19',
				descricao: 'Projetos Executivos'
			},
			{
				valor: '20',
				descricao: 'Qualidade'
			},
			{
				valor: '4',
				descricao: 'Recursos Humanos'
			},
			{
				valor: '5',
				descricao: 'Relacionamento com Cliente'
			},
			{
				valor: '6',
				descricao: 'Relacionamento com Investidores'
			},
			{
				valor: '7',
				descricao: 'Secretaria de Vendas'
			},
			{
				valor: '17',
				descricao: 'Suprimentos'
			},
			{
				valor: '8',
				descricao: 'Tecnologia da Informação'
			},
			{
				valor: '9',
				descricao: 'Vendas'
			}, ]
		}],

	},
	{
		processo: 'FLUIG-0125',
		campos: [
		{
			campo: 'cpTipoViajante',
			valores: [
			{
				valor: '1',
				descricao: 'Próprio Colaborador'
			},
			{
				valor: '2',
				descricao: 'Outro Colaborador'
			},
			{
				valor: '3',
				descricao: 'Terceiro'
			},
			{
				valor: '4',
				descricao: 'Dependente'
			}]
		}],
	},
	{
		processo: 'FLUIG-0128',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Corte de adiantamento'
			},
			{
				valor: '2',
				descricao: 'Descontos danos causados em folha'
			},
			{
				valor: '3',
				descricao: 'Folha complementar'
			},
			{
				valor: '4',
				descricao: 'Prêmio de produção'
			},
			{
				valor: '5',
				descricao: 'Reenvio de pagamento'
			},
			{
				valor: '7',
				descricao: 'Tratamento de folha'
			},
			{
				valor: '8',
				descricao: 'Comissão'
			}]
		}],
	},
	{
		processo: 'FLUIG-0131',
		campos: [
		{
			campo: 'cpTipoAjuste',
			valores: [
			{
				valor: '1',
				descricao: 'Admissão'
			},
			{
				valor: '2',
				descricao: 'Férias'
			},
			{
				valor: '3',
				descricao: 'Rescisão'
			},
			{
				valor: '4',
				descricao: 'Movimentação de Pessoal'
			},
			{
				valor: '5',
				descricao: 'Tratamento de Folha de Pagamento'
			},
			{
				valor: '6',
				descricao: 'Rescisão Complementar'
			}]
		}],
	},
	{
		processo: 'FLUIG-0138',
		campos: [
		{
			campo: 'cpMotivo',
			valores: [
			{
				valor: '1',
				descricao: 'Perda/Roubo'
			},
			{
				valor: '2',
				descricao: 'Desgaste Natural'
			},
			{
				valor: '3',
				descricao: 'Quebra/Danificação'
			}]
		},
		{
			campo: 'cpSolicitaCordao',
			valores: [
			{
				valor: '1',
				descricao: 'Sim'
			},
			{
				valor: '2',
				descricao: 'Não'
			}]
		}],
	},
	{
		processo: 'FLUIG-0141',
		campos: [
		{
			campo: 'cpFornecedor',
			valores: [
			{
				valor: '1',
				descricao: 'Pessoa Física'
			},
			{
				valor: '2',
				descricao: 'Pessoa Jurídica'
			}]
		}],
	},
	{
		processo: 'FLUIG-0142',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Alteração de cadastro'
			},
			{
				valor: '2',
				descricao: 'Pessoa Jurídica'
			},
			{
				valor: '3',
				descricao: 'Aditivo de estágio'
			},
			{
				valor: '4',
				descricao: 'Informe de aposentadoria'
			},
			{
				valor: '5',
				descricao: 'Mensalidade Sindical'
			},
			{
				valor: '6',
				descricao: 'Salário Família'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0149',
		campos: [
		{
			campo: 'cpTipoAfastamento',
			valores: [
			{
				valor: '1',
				descricao: 'Licença maternidade'
			},
			{
				valor: '2',
				descricao: 'Afastamento po motivo de doença'
			},
			{
				valor: '3',
				descricao: 'Afastamento por acidente de trabalho'
			},
			{
				valor: '4',
				descricao: 'Aposentadoria por invalidez'
			},
			{
				valor: '5',
				descricao: 'Licença sem vencimentos'
			},
			{
				valor: '6',
				descricao: 'Outros'
			}]
		}],
	},
	{
		processo: 'FLUIG-0150',
		campos: [
		{
			campo: 'cpTipoManutencao',
			valores: [
			{
				valor: '1',
				descricao: 'Elétrica'
			},
			{
				valor: '2',
				descricao: 'Manutenção Predial'
			},
			{
				valor: '3',
				descricao: 'Máquina de café'
			},
			{
				valor: '4',
				descricao: 'Purificador de água'
			},
			{
				valor: '5',
				descricao: 'Material Gráfico'
			},
			{
				valor: '6',
				descricao: 'Ar condicionado'
			},
			{
				valor: '7',
				descricao: 'Outros'
			}]
		}],
	},
	{
		processo: 'FLUIG-0151',
		campos: [
		{
			campo: 'cpTipoDeclaracao',
			valores: [
			{
				valor: '1',
				descricao: 'Comprovação de vínculo empregatício'
			},
			{
				valor: '2',
				descricao: 'Atestado pra Faculdade(Perda de Atividades)'
			},
			{
				valor: '3',
				descricao: 'Comprovação de mais de um vínculo'
			}]
		}],
	},
	{
		processo: 'FLUIG-0161',
		campos: [
		{
			campo: 'cpTipoMudanca',
			valores: [
			{
				valor: '1',
				descricao: 'Emergencial'
			},
			{
				valor: '2',
				descricao: 'Programada'
			},
			{
				valor: '3',
				descricao: 'Imediata'
			}]
		},
		{
			campo: 'cpLocalidadesAfetadas',
			valores: [
			{
				valor: 'Escritorios_Regionais',
				descricao: 'Escritórios Regionais'
			}]
		}],
	},
	{
		processo: 'FLUIG-0168',
		campos: [
		{
			campo: 'cpMesReferencia',
			valores: [
			{
				valor: '1',
				descricao: 'Janeiro'
			},
			{
				valor: '2',
				descricao: 'Fevereiro'
			},
			{
				valor: '3',
				descricao: 'Março'
			},
			{
				valor: '4',
				descricao: 'Abril'
			},
			{
				valor: '5',
				descricao: 'Maio'
			},
			{
				valor: '6',
				descricao: 'Junho'
			},
			{
				valor: '7',
				descricao: 'Julho'
			},
			{
				valor: '8',
				descricao: 'Agosto'
			},
			{
				valor: '9',
				descricao: 'Setembro'
			},
			{
				valor: '10',
				descricao: 'Outubro'
			},
			{
				valor: '11',
				descricao: 'Novembro'
			},
			{
				valor: '12',
				descricao: 'Dezembro'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0170',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Criação de Acesso'
			},
			{
				valor: '2',
				descricao: 'Alteração de Acesso'
			}]
		}],
	},
	{
		processo: 'FLUIG-0174',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Criação de Acesso'
			},
			{
				valor: '2',
				descricao: 'Alteração de Acesso'
			}]
		}],
	},
	{
		processo: 'FLUIG-0179',
		campos: [
		{
			campo: 'cpTipo',
			valores: [
			{
				valor: '1',
				descricao: 'Instalação de ramal'
			},
			{
				valor: '2',
				descricao: 'Configuração de ramal'
			}]
		}],
	},
	{
		processo: 'FLUIG-0189',
		campos: [
		{
			campo: 'cpPublico',
			valores: [
			{
				valor: '1',
				descricao: 'Sede'
			},
			{
				valor: '2',
				descricao: 'Todo Brasil'
			}]
		}],
	},
	{
		processo: 'FLUIG-0190',
		campos: [
		{
			campo: 'cpAreaResponsavel',
			valores: [
			{
				valor: '1',
				descricao: 'Admissão'
			},
			{
				valor: '2',
				descricao: 'Benefícios'
			},
			{
				valor: '3',
				descricao: 'Férias'
			},
			{
				valor: '4',
				descricao: 'Ponto'
			},
			{
				valor: '5',
				descricao: 'Rescisão'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0192',
		campos: [
		{
			campo: 'cpTipoCargo',
			valores: [
			{
				valor: '1',
				descricao: 'Gerencial'
			},
			{
				valor: '2',
				descricao: 'Técnico/Administrativo'
			},
			{
				valor: '3',
				descricao: 'Obras'
			}]
		}],
	},
	{
		processo: 'FLUIG-0196',
		campos: [
		{
			campo: 'cpTipoCargo',
			valores: [
			{
				valor: '1',
				descricao: 'Criação de Acesso'
			},
			{
				valor: '2',
				descricao: 'Alteração de Acesso'
			}]
		}],
	},
	{
		processo: 'FLUIG-0197',
		campos: [
		{
			campo: 'cpTipoSolicitacao',
			valores: [
			{
				valor: '1',
				descricao: 'Balan&ccedil;o'
			},
			{
				valor: '2',
				descricao: 'Balancete'
			},
			{
				valor: '3',
				descricao: 'Declaração de Faturamento'
			},
			{
				valor: '4',
				descricao: 'Sped ECD / ECF (Copia)'
			}, ]
		}],
	},
	{
		processo: 'FLUIG-0227',
		campos: [
		{
			campo: 'cbTipoProcuracao',
			valores: [
			{
				valor: 'particular',
				descricao: 'Particular'
			},
			{
				valor: 'publica',
				descricao: 'Pública'
			}]
		},
		{
			campo: 'cbModalidade',
			valores: [
			{
				valor: 'certidao',
				descricao: 'Certidão'
			},
			{
				valor: 'nova',
				descricao: 'Nova Procuração'
			},
			{
				valor: 'renovacao',
				descricao: 'Renovação'
			}]
		}],
	},
	{
		processo: 'FLUIG-0213',
		campos: [
		{
			campo: 'cpAtestadoTipoPeriodo',
			valores: [
			{
				valor: '1',
				descricao: 'Horas'
			},
			{
				valor: '2',
				descricao: 'Dias'
			}]
		},
		{
			campo: 'cpTipoAtestado',
			valores: [
			{
				valor: '1',
				descricao: 'Declaração Escolar'
			},
			{
				valor: '2',
				descricao: 'Declaração Serviço Militar'
			},
			{
				valor: '3',
				descricao: 'Certidão de casamento'
			},
			{
				valor: '4',
				descricao: 'Certidão de nascimento (filhos)'
			},
			{
				valor: '5',
				descricao: 'Atestado de Óbito'
			},
			{
				valor: '6',
				descricao: 'Declaração Serviço Eleitoral'
			},
			{
				valor: '7',
				descricao: 'Abono Amamentação'
			},
			{
				valor: '8',
				descricao: 'Outros'
			},
			{
				valor: '9',
				descricao: 'Atestado Médico'
			},
			{
				valor: '10',
				descricao: 'Consulta Odontológica'
			},
			{
				valor: '11',
				descricao: 'Atestado de Acompanhamento'
			},
			{
				valor: '12',
				descricao: 'Exame Periódico'
			},
			{
				valor: '13',
				descricao: 'Declaração de Comparecimento'
			},
			{
				valor: '14',
				descricao: 'Doação de Sangue'
			}, ]
		}],
	},

];