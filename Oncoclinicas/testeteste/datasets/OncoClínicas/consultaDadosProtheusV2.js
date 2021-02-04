var DATASET_NAME = 'consultaDadosProtheusV2';
var DATASET_CONFIG = 'configZoomV5';

var SEPARADOR_REGISTRO = '&&';
var SEPARADOR_COLUNA = '||';

var MSG_DEBUG_PREFIXO = 'DEBUG - ';
var MSG_CONSULTA_VAZIA = 'NENHUM DADO RETORNADO POR ESTA CONSULTA';

var MGS_ERRO_PONTO_01 = 'PONTO 01 - Requisitos minimos nao informados';
var MGS_ERRO_PONTO_02 = 'PONTO 02 - Instancia do webservice CFGTable nao executada';
var MGS_ERRO_PONTO_03 = 'PONTO 03 - Instancia do servico CFGTABLELocator nao executada';
var MGS_ERRO_PONTO_04 = 'PONTO 04 - Consulta a tabela';
var MGS_ERRO_PONTO_05 = 'PONTO 05 - Processamento do retorno da tabela ';

var DEBUG = true;
// var DEBUG = false;

// VALORES FIXADOS PARA SIMULACAO
var userCode = new String('MSALPHA');
// var alias = new String('NNR');
// var queryaddwhere = new String('');
// var listfieldsview = new String('NNR_CODIGO,NNR_DESCRI');
// var branch = new String('');

var objConsulta = ({
	// nomeZoom : '',
	codigoZoom : '',
	tabela : '',
	listfieldsview : '',
	branch : '',
	where : '',
	whereExtra : '',
	whereConstraints : '',
	limite : '',
	dadosDataSetZoom : '',
	dataSet : false,
	exibirDebug : function(nomeCampo, valorCampo) {
		log.info(MSG_DEBUG_PREFIXO + nomeCampo + ': "' + valorCampo + '"');
	},
	validarCampo : function(strField, fieldObrigatorio) {
		if (fieldObrigatorio && (strField == '' || strField == undefined)) {
			return false;
		} else {
			return true;
		}
	},
	setarCampo : function(nomeMetodo, strField, fieldObrigatorio) {
		if (!this.validarCampo(strField, fieldObrigatorio)) {
			return false;
		}

		var valorCampo = (strField == undefined) ? '' : strField;

		// case 'setNomeZoom': this.setNomeZoom(valorCampo);break;
		switch (nomeMetodo) {
		case 'setCodigoZoom':
			this.setCodigoZoom(valorCampo);
			break;
		case 'setBranch':
			this.setBranch(valorCampo);
			break;
		case 'setLimite':
			this.setLimite(valorCampo);
			break;
		}

		return (valorCampo != '');
	},
	setNomeZoom : function(strField) {
		this.nomeZoom = strField;
	},
	setCodigoZoom : function(strField) {
		this.codigoZoom = strField;
	},
	getCodigoZoom : function() {
		return this.codigoZoom;
	},
	setarCampoWhereExtra : function(strField) {
		// Trocar aspas Duplas por Simples
		this.whereExtra = replaceAll(strField, '"', "'");
	},
	setDataSet : function(dataSet) {
		this.dataSet = dataSet;
	},
	getDataSet : function() {
		return this.dataSet;
	},
	setTabela : function() {
		this.tabela = this.dadosDataSetZoom.getValue(0, 'tabela');
	},
	getTabela : function() {
		return this.tabela;
	},
	getQueryaddwhere : function() {
		var queryaddwhere = '';

		log.info("this.where=(" + this.where + ")");
		log.info("this.whereExtra=(" + this.whereExtra + ")");
		log.info("this.whereConstraints=(" + this.whereConstraints + ")");

		queryaddwhere += this.where;
		queryaddwhere += (queryaddwhere != '' && this.whereExtra != '') ? ' AND '
				+ this.whereExtra
				: this.whereExtra;
		queryaddwhere += (queryaddwhere != '' && this.whereConstraints != '') ? ' AND '
				+ this.whereConstraints
				: this.whereConstraints;
		queryaddwhere += ' ';

		log.info("queryaddwhere=(" + queryaddwhere + ")");

		return queryaddwhere;
	},
	setBranch : function(strField) {
		this.branch = strField;
	},
	getBranch : function() {
		return this.branch;
	},
	setLimite : function(strField) {
		this.limite = strField;
	},
	setListfieldsview : function() {
		this.setLimiteDataSet();
		this.listfieldsview = this.getLimite();
		this.listfieldsview += ','
				+ this.dadosDataSetZoom.getValue(0, 'columnCodigo');
		this.listfieldsview += ','
				+ this.dadosDataSetZoom.getValue(0, 'columnDescricao');

		var CamposExtra = this.getCamposExtra();

		this.listfieldsview += (CamposExtra != '') ? ',' + CamposExtra
				: CamposExtra;
	},
	getCamposExtra : function() {
		var campoExtraDataSet = this.dadosDataSetZoom
				.getValue(0, 'camposExtra');

		var strCampoExtra = '';
		var objCampoExtraDataSet = new String(campoExtraDataSet);

		if (objCampoExtraDataSet != '') {

			var arrayCampoExtra = objCampoExtraDataSet
					.split(SEPARADOR_REGISTRO);

			var regCampoExtra = '';
			var arrayRegCampoExtra = '';

			for ( var reg in arrayCampoExtra) {
				regCampoExtra = arrayCampoExtra[reg];
				arrayRegCampoExtra = regCampoExtra.split(SEPARADOR_COLUNA);

				strCampoExtra += (strCampoExtra != '') ? ',' : '';
				strCampoExtra += arrayRegCampoExtra[1];
			}
		}

		return strCampoExtra;
	},
	setLimiteDataSet : function() {
		// Busca o valor do limite do dataSet
		var limiteDataSet = this.dadosDataSetZoom.getValue(0, 'limite');
		limiteDataSet = (limiteDataSet != '') ? limiteDataSet : '100';

		// Prioriza o limite para ser usado o parametro caso contrario usa o
		// valor do dataSet
		var numero = (this.limite != '') ? this.limite : limiteDataSet;
		// Cuidado ao retirar as aspas da expressao abaixo
		this.limite = 'TOP ' + numero + " ''";
	},
	getLimite : function() {
		return this.limite;
	},
	getListfieldsview : function() {
		return this.listfieldsview;
	},
	processarFields : function(fields) {
		// var retornoFields0 = this.setarCampo('setNomeZoom', fields[0], true);
		var retornoFields0 = this.setarCampo('setCodigoZoom', fields[0], false);
		var retornoFields1 = this.setarCampo('setBranch', fields[1], false);
		var retornoFields2 = this.setarCampoWhereExtra(fields[2]);
		var retornoFields3 = this.setarCampo('setLimite', fields[3], false);

		// log.info("aqui this.whereExtra=" + this.whereExtra);

		if (!retornoFields0 && !retornoFields2) {
			// Retornar ERRO - requisitos minimos nao informados
			log.error(MGS_ERRO_PONTO_01);
			return false;
		} else if (retornoFields0) {
			// Metodo para buscar os dados do dataSet
			getDadosDataSetZoom();

		} else {
			// Metodo nativo que executa apenas a whereExtra informada na url

		}
	},
	processarConstraints : function(constraints) {
		if (constraints != undefined && constraints != null) {

			var searchField = constraints[0].fieldName;
			var searchValue = constraints[0].initialValue;
			var searchValueUpper = searchValue.toUpperCase();

			this.whereConstraints = searchField + " LIKE '%" + searchValueUpper
					+ "%' ";
		}
	},
	setDadosDataSetZoom : function(dadosDataSetZoom) {
		this.dadosDataSetZoom = dadosDataSetZoom;

		this.setTabela();
		this.setListfieldsview();

		var dadosProtheus = getDadosProtheus();
		exibirTextoDebug('*** Fim da execucao a consulta no Protheus ***');

		this.setDataSet(dadosProtheus);
	},
	construtor : function(fields, constraints) {
		this.processarConstraints(constraints);
		this.processarFields(fields);
	}
});

function explode(variavel, string) {
	return variavel.split(string);
}

// objConsulta
function getDadosDataSetZoom() {
	var objConfigZoom = new objDataSet(DATASET_CONFIG);

	objConfigZoom.setCampo('codigo');
	objConfigZoom.setCampo('nameZoom');
	objConfigZoom.setCampo('tabela');
	objConfigZoom.setCampo('columnCodigo');
	objConfigZoom.setCampo('columnDescricao');
	objConfigZoom.setCampo('filtros');
	objConfigZoom.setCampo('camposExtra');
	objConfigZoom.setCampo('dataSetCustomizado');
	objConfigZoom.setCampo('limite');

	var codigo = objConsulta.getCodigoZoom();

	objConfigZoom.setFiltro('metadata#active', true, true, true);
	objConfigZoom.setFiltro('codigo', codigo, codigo, true);

	// var configZoom = objConfigZoom.filtrarBusca();
	objConfigZoom.buscar();
	var configZoom = objConfigZoom.getDados();

	/*
	 * if (configZoom.values.length == 0) { alert("Erro ao buscar acessar o
	 * banco de dados!"); return false; }
	 */

	exibirRetornoDataSet(configZoom);

	/*
	 * 0 = codigo 1 = nameZoom 2 = datasetId 3 = title 4 = table 5 =
	 * columnCodigo 6 = columnDescricao 7 = columnTitle 8 = filtros 9 =
	 * camposExtra 10 = salvarDadosHtml 11 = campoObrigatorio 12 =
	 * dataSetCustomizado 13 = limite
	 */

	objConsulta.setDadosDataSetZoom(configZoom);
}

function exibirRetornoDataSet(configZoom) {
	if (DEBUG) {
		log.info('*** Inicio dos Dados do DataSet ***');
		log.info('Lista de Campos');

		// log.info("configZoom=" + configZoom);
		// log.info("configZoom.rowsCount=" + configZoom.rowsCount);

		var nomeCampos = configZoom.getColumnsName();
		// var nomeCampos = configZoom.columns;

		var nomeCampo = '';
		var valor = '';

		for ( var posValues in configZoom.values) {
			for ( var posColumns in nomeCampos) {
				nomeCampo = nomeCampos[posColumns];
				valor = configZoom.getValue(posValues, nomeCampo);

				log.info(MSG_DEBUG_PREFIXO + nomeCampo + ': "' + valor + '"');
			}
		}
	}
}

function exibirParametrosProtheus(userCode, alias, queryaddwhere, branch,
		listfieldsview) {
	if (DEBUG) {
		log.info('*** Inicio dos Parametros da Consulta Protheus ***');
		log.info('Lista de Parametros');

		log.info(MSG_DEBUG_PREFIXO + 'userCode: "' + userCode + '"');
		log.info(MSG_DEBUG_PREFIXO + 'alias: "' + alias + '"');
		log.info(MSG_DEBUG_PREFIXO + 'queryaddwhere: "' + queryaddwhere + '"');
		log.info(MSG_DEBUG_PREFIXO + 'branch: "' + branch + '"');
		log
				.info(MSG_DEBUG_PREFIXO + 'listfieldsview: "' + listfieldsview
						+ '"');

		log.info('*** Fim dos Parametros da Consulta Protheus ***');
	}
}

function exibirTextoDebug(texto) {
	if (DEBUG) {
		log.info(texto);
	}
}

function getDadosProtheus() {
	exibirTextoDebug('*** Inicio da execucao a consulta no Protheus ***');

	// Nome da tabela
	var alias = objConsulta.getTabela();

	// Filtro
	// log.info("whereExtra=" + objConsulta.whereExtra);

	var queryaddwhere = objConsulta.getQueryaddwhere();

	// Tabela compartilhada vazia ou campo preenchido com empresa protheys
	var branch = objConsulta.getBranch();

	// Lista de campos de retorno
	var listfieldsview = objConsulta.getListfieldsview();

	var dataset = DatasetFactory.newDataset();

	try {
		var webServiceProvider = ServiceManager.getService('CFGTable');
		var wsWrapper = webServiceProvider.getBean();
	} catch (e) {
		return createDatasetErro(dataset, MGS_ERRO_PONTO_02 + ' (' + e.message
				+ ')');
	}

	try {
		var svcHelper = wsWrapper
				.instantiate('br.com.microsiga.webservices.cfgtable_apw.CFGTABLELocator');
		var webservice = svcHelper.getCFGTABLESOAP();
	} catch (e) {
		return createDatasetErro(dataset, MGS_ERRO_PONTO_03 + ' (' + e.message
				+ ')');
	}

	try {
		exibirParametrosProtheus(userCode, alias, queryaddwhere, branch,
				listfieldsview);

		var tableView = wsWrapper
				.instantiate('br.com.microsiga.webservices.cfgtable_apw.TABLEVIEW');
		tableView = webservice.GETTABLE(userCode, alias, queryaddwhere, branch,
				listfieldsview);
		var arrayFieldStruct = wsWrapper
				.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDSTRUCT');
		var arrayFieldView = wsWrapper
				.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFFIELDVIEW');
		var arrayOfString = wsWrapper
				.instantiate('br.com.microsiga.webservices.cfgtable_apw.ARRAYOFSTRING');
		var fieldStruct;
		var fieldData;
		var campo;
		var valor;
	} catch (e) {
		return createDatasetErro(dataset, MGS_ERRO_PONTO_04 + ' ' + alias
				+ ' nao executada (' + e.message + ')');
	}

	try {
		exibirTextoDebug('*** Inicio do Retorno da Consulta Protheus ***');

		if (!tableView || tableView == null) {
			exibirTextoDebug(MSG_CONSULTA_VAZIA);
			dataset.addRow(new Array(MSG_CONSULTA_VAZIA));
		} else {
			arrayFieldStruct = tableView.getTABLESTRUCT();
			arrayFieldView = tableView.getTABLEDATA();
			fieldStruct = arrayFieldStruct.getFIELDSTRUCT();
			fieldData = arrayFieldView.getFIELDVIEW();

			var qtdFieldStruct = fieldStruct.length;
			exibirTextoDebug(MSG_DEBUG_PREFIXO + 'Quantidade de colunas: "'
					+ qtdFieldStruct + '"');

			for ( var a = 0; a < qtdFieldStruct; a++) {
				campo = fieldStruct[a].getFLDNAME();

				dataset.addColumn(campo);
				exibirTextoDebug(MSG_DEBUG_PREFIXO + 'Campo: "' + campo + '"');
			}

			var qtdFieldData = fieldData.length;
			exibirTextoDebug(MSG_DEBUG_PREFIXO + 'Quantidade de registros: "'
					+ qtdFieldData + '"');

			for ( var x = 0; x < qtdFieldData; x++) {
				arrayOfString = fieldData[x].getFLDTAG();
				valor = arrayOfString.getSTRING();
				dataset.addRow(valor);
			}
		}

		exibirTextoDebug('*** Fim do Retorno da Consulta Protheus ***');
	} catch (e) {
		return createDatasetErro(dataset, MGS_ERRO_PONTO_05 + ' '
				+ DATASET_CONFIG + ' falhou ' + ' (' + e.message + ')');
	}

	return dataset;
}

function replaceAll(str, de, para) {
	var pos = str.indexOf(de);
	while (pos > -1) {
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
	return (str);
}

function createDatasetErro(dataset, erro) {
	dataset.addColumn('ERRO');
	erro = new String(erro).replace(/\n/, '  ');
	log.error('[DATASET ' + DATASET_NAME + '] ERRO: ' + erro);
	dataset.addRow(new Array(erro));
	return dataset;
}

function createDataset(fields, constraints, sortFields) {
	log.info("*** Inicio da execucao do consultaDadosProtheusV2 ***");

	// URL para uso
	// oncoclinicasdev.fluig.com/webdesk/zoom.jsp?datasetId=consultaDadosProtheusV2&dataFields=&resultFields=FORNECEDOR_BANCO,001,00104,A2_MSBLQL='2'

	// falta
	// &type=precad
	// &title=Despesas

	// com dataFields

	// http://oncoclinicasdev.fluig.com/webdesk/zoom.jsp?datasetId=consultaDadosProtheusV2&dataFields=YA_CODGI,cod,YA_DESCR,desc&resultFields=FORNECEDOR_BANCO,001,00104,A2_MSBLQL=%272%27,100

	// var texto = String.fromCharCode(65,66,67);
	// log.info("texto:" + texto);

	objConsulta.construtor(fields, constraints);

	log.info("*** Fim da execucao do consultaDadosProtheusV2 ***");

	return objConsulta.getDataSet();
}

/**
 * Objeto para efetuar a consulta de DataSet's
 * 
 * @param nomeDataSet
 *            Informar o Nome do DataSet que deseja efetuar a busca
 * @author sergio.santos
 */
var objDataSet = function(nomeDataSet) {
	var metodoFiltroAnd = '';
	var metodoFiltroOr = '';
	var nameDataSet = '';
	var filtros = [];
	var ordenacao = [];
	var campos = [];
	var dados = '';

	var setMetodoFiltro = function() {
		metodoFiltroAnd = ConstraintType.MUST;
		metodoFiltroOr = ConstraintType.SHOULD;
	};
	var setNameDataSet = function(nomeDataSet) {
		if (nomeDataSet == '') {
			throw 'Nome do dataSet n�o informado.';
		}

		nameDataSet = nomeDataSet;
	};
	/**
	 * M�todo para cadastrar filtro na busca do DataSet
	 * 
	 * @param nomeColuna
	 *            Informar a string com o Nome da coluna que ser� usado para
	 *            filtro
	 * @param filtroInicio
	 *            Informar o valor que seja filtrar, se omitido o filtroFim ser�
	 *            filtrado com valor �nico
	 * @param filtroFim
	 *            Informar o valor que seja filtrar como fim de
	 *            intervalo/between, n�o obrigat�rio, caso deseja filtro com
	 *            valor �nico. Exemplo: carro = 1
	 * @param metodoFiltroAnd
	 *            Informar True ou False, em caso de omiss�o ser� conderado True
	 * @author sergio.santos
	 */
	this.setFiltro = function(nomeColuna, filtroInicio, filtroFim, condicaoAnd) {
		if (nomeColuna == '') {
			throw 'Nome da Coluna nao informado.';
		}

		/*
		 * Em caso de n�o ser informado o metodo do Filtro ser� atribuido a
		 * condi��o AND
		 */
		var metodoFiltro = (condicaoAnd || condicaoAnd == null) ? metodoFiltroAnd
				: metodoFiltroOr;

		if (filtroFim == null && filtroInicio != null) {
			filtroFim = filtroInicio;
		}

		filtros.push(DatasetFactory.createConstraint(nomeColuna, filtroInicio,
				filtroFim, metodoFiltro));
	};

	var clearFiltro = function() {
		filtros = [];
	};
	/**
	 * M�todo para cadastrar a ordem desejada
	 * 
	 * @param order
	 *            Informar a ordem desejada
	 * @author sergio.santos
	 */
	this.setOrdenacao = function(order) {
		if (order == '') {
			throw 'Order n�o informado.';
		}

		ordenacao.push(order);
	};
	/**
	 * M�todo para cadastrar os campos que deseja exibi��o
	 * 
	 * @param nomeCampo
	 *            Informar o Nome do Campo
	 * @author sergio.santos
	 */
	this.setCampo = function(nomeCampo) {
		/*
		 * if (nomeCampo == '') { throw 'Nome do Campo n�o informado.'; }
		 */

		campos.push(nomeCampo);
	};
	/**
	 * M�todo para buscar os dados do DataSet
	 * 
	 * @author sergio.santos
	 */
	this.buscar = function() {
		/*
		 * campos = null; filtros = null;
		 */
		ordenacao = null;

		dados = DatasetFactory.getDataset(nameDataSet, campos, filtros,
				ordenacao);
	};
	/**
	 * M�todo para filtrar os dados do DataSet no "Server Client" conforme
	 * solicitado no setFilter, como o sistema n�o est� filtrando nativamente
	 * este m�todo faz o filtro ap�s o retorno completo do dataSet.
	 * 
	 * @author sergio.santos
	 */
	this.filtrarBusca = function() {
		this.buscar();

		var novoDados = [];
		var nomeCampos = [];
		var valorDataSet = '';
		var nomeCampoFiltrado = '';

		if (filtros.length > 0) {
			for ( var i in filtros) {
				if (filtros[i]._type == 1) {
					nomeCampoFiltrado = filtros[i]._field;

					for ( var posValues in dados.values) {
						valorDataSet = eval("dados.values[posValues]."
								+ nomeCampoFiltrado);

						if (filtros[i]._initialValue == filtros[i]._finalValue
								&& valorDataSet == filtros[i]._initialValue) {
							novoDados.push(dados.values[posValues]);
						} else if (valorDataSet >= filtros[i]._initialValue
								&& valorDataSet <= filtros[i]._finalValue) {
							novoDados.push(dados.values[posValues]);
						}
					}
				}
			}

			dados.values = novoDados;
		}

		return dados;
	};
	/**
	 * M�todo de uso interno para retirar os campos do filtro
	 * 
	 * @author sergio.santos
	 */
	popularDadosFiltrados = function() {

		return;
	};
	/**
	 * M�todo para buscar o valor de um campo
	 * 
	 * @param campoBuscar
	 *            string com nome do campo que ir� informar o valor do filtro
	 * @param valorBuscar
	 *            string com o valor do campo que deseja filtrar
	 * @param campoRetorno
	 *            string com o nome do campo que deseja o retorno
	 * @returns string com valor do campo
	 * @author sergio.santos
	 */
	this.buscarCampo = function(campoBuscar, valorBuscar, campoRetorno) {
		var encontrado = false;
		var valorRetornado = '';
		this.setCampo(campoRetorno);

		this.buscar();

		dadosLoop: for ( var posValues in dados.values) {
			if (dados.getValue(posValues, campoBuscar) == valorBuscar) {
				valorRetornado = dados.getValue(posValues, campoRetorno);
				encontrado = true;
				break dadosLoop;
			}
		}

		if (!encontrado) {
			log.info("<< Erro objDataSet: N�o encontrado o valor do campo "
					+ campoRetorno + " para o dataSet " + nameDataSet + " >>");
			return false;
		}

		return valorRetornado;
	};
	/**
	 * M�todo para verificar se valor informado existe no dataSet. Este m�todo
	 * limpa todo o filtro de dataSet e inicia novamente em caso de chamar mais
	 * de uma vez o mesmo objeto.
	 * 
	 * @param nomeCampo
	 *            Informar o nome do campo que deseja verificar
	 * @param valorCampoArray
	 *            Informar um array com o valor ou valores de campos que dejesa
	 *            que seja encontrado, qualquer identifica��o ser� retornado
	 *            true
	 * @returns Ser� retornado se o campo informado foi localizado na lista do
	 *          dataSet
	 * @author sergio.santos
	 */
	this.isExists = function(nomeCampo, valorCampoArray) {
		clearFiltro();

		var existe = false;

		for ( var posCampo in valorCampoArray) {
			this.setFiltro(nomeCampo, valorCampoArray[posCampo],
					valorCampoArray[posCampo], false);
		}

		this.buscar();

		dadosLoop: for ( var posValues in dados.values) {
			for ( var posCampo in valorCampoArray) {
				if (dados.getValue(posValues, nomeCampo) == valorCampoArray[posCampo]) {
					existe = true;
					break dadosLoop;
				}
			}
		}

		clearFiltro();

		return existe;
	};
	/**
	 * M�todo para buscar a �ltima atividade executada. Lembrando que se existir
	 * Exclusivo dever� ser contado na hora de informar o campo numPosicao
	 * 
	 * @param solicitacaoId
	 *            C�digo da Solicita��o
	 * @param numPosicao
	 *            Informar o n�mero de posi��es que devemos localizar, caso
	 *            queira a atual informar 0, �ltima informar 1, penultima
	 *            informar 2 e etc.
	 * @returns valor Retonar o valor do campo solicitado, em caso de n�o
	 *          identificado � retornado NULL
	 * @author sergio.santos
	 */
	this.getAtividadeIdAnterior = function(solicitacaoId, numPosicao) {
		if (nomeDataSet == '') {
			return false;
		}

		clearFiltro();

		this.setFiltro('processHistoryPK.processInstanceId', solicitacaoId,
				solicitacaoId, true);

		this.setCampo('stateSequence');

		this.setOrdenacao('processHistoryPK.movementSequence');

		this.buscar();

		var qtd = dados.values.length;
		var posicao;

		clearFiltro();

		posicao = qtd - numPosicao - 1;

		if (posicao < 0) {
			return null;
		}

		return dados.getValue(posicao, 'stateSequence');
	};
	this.getDados = function() {
		return dados;
	}
	var __construct = function(nomeDataSet) {
		setMetodoFiltro();
		setNameDataSet(nomeDataSet);
	}(nomeDataSet);
};