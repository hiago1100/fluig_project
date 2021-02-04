$(document).ready(function () {
	var atividade = Compartilhados.getCurrentState();
	AuxiliarSRH.Regras();
	Compartilhados.mostrarReabertura(atividade, '2');
	VIEW.getInstance().inicializar(atividade, getModo());
	var CodUsuarioRede = FLUIGC.sessionStorage.getItem('userInformation').values[0].CODUSUARIOREDE;
	VIEW.getInstance().listarFeriados()


	//FUNÇÃO CLICK
	$('#btEmpresa').click(function () {
		ZOOM.getInstance().GetEmpresa(CodUsuarioRede);
	})

	$('#btCentroCustoUau').click(function () {
		if ($('#cpEmpresa').val() != '') {
			var dados = VIEW.getInstance().filtrarCentroCustoUau(CodUsuarioRede)
			ZOOM.getInstance().GetCentroCustoUau(dados);

		} else {
			Compartilhados.WarningToast('', Mensagens.M0004, 'danger');
		}
	})

	$('#btNomeFornecedor').click(function () {
		ZOOM.getInstance().GetFornecedorUau();
	})

	$('#btAddItensTi').click(function () {
		VIEW.getInstance().adicionaItensTi();
		VIEW.getInstance().adicionarFornAprovado('tbFornAprovadoItensTi');
	})

	$('#btAddDemaisCompras').click(function () {
		VIEW.getInstance().adicionaDemaisCompras();
		VIEW.getInstance().adicionarFornAprovado('tbFornAprovadoDemaisCompras');
	})

	$('#btAddServico').click(function () {
		VIEW.getInstance().adicionaServico();
		VIEW.getInstance().adicionarFornAprovado('tbFornAprovadoServicos');
	})

	$('#btAddSolicitacaoVerba').click(function () {
		VIEW.getInstance().adicionaSolicitacaoVerba();
	})

	//FUNÇÃO CHANGE
	$('#cpTipoSolicitacao').change(function () {
		var cpTipoSolicitacao = $('#cpTipoSolicitacao').val();
		$('.divtpCompra').toggle(cpTipoSolicitacao == '1');
		$('.divServicoTerceiro').toggle(cpTipoSolicitacao == '2');

		var index = sessionStorage.getItem('indexReferencia')
		var fields = ['#cpComposicaoServicos___', '#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___',
			'#cpInsumoServico___', '#cpInsumoDemaisCompras___', '#cpItensCompra___'];
		VIEW.getInstance().removeTabelas(index, fields)
		Compartilhados.LimparCampos(['limparTpSolicitacao'])
		VIEW.getInstance().preencherDescritor();
		VIEW.getInstance().setStatusElementos();

	})

	$('#tpCompra').change(function () {
		var index = sessionStorage.getItem('indexReferencia')
		var fields = ['#cpInsumoDemaisCompras___', '#cpInsumoItensTi___', '#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___'];
		VIEW.getInstance().removeTabelas(index, fields);
		VIEW.getInstance().setStatusElementos();

		var index = sessionStorage.getItem('indexReferencia')
		var fields = ['#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___'];
		VIEW.getInstance().removeTabelas(index, fields);
	});
	$('#cpAprovaIntegracao1').change(function () {
		$('.integraNovamente1').toggle($('#cpAprovaIntegracao1').val() == '2')
	});

	$('#cpAprovaIntegracao4').change(function () {
		$('.integraNovamente4').toggle($('#cpAprovaIntegracao4').val() == '2')
	});

	$('#cpAprovaFornecedoreVerba').change(function () {
		$('.ReprovaFornecedoreVerba').toggle($('#cpAprovaFornecedoreVerba').val() == '2')
	});

	$('#cpAprovaCompraN1').change(function () {
		$('.ReprovaCompraN1').toggle($('#cpAprovaCompraN1').val() == '2')
	});

	$('#cpAprovaCompraN3').change(function () {
		$('.ReprovaCompraN3').toggle($('#cpAprovaCompraN3').val() == '2')
	});

	$('#cpAprovaOrdemCompra').change(function () {
		$('#PrevisaoEntrega').toggle($('#cpAprovaOrdemCompra').val() == '1');
	});

	$('#cpAprovaConfSuprimentos').change(function () {
		var aprovado = $('#cpAprovaConfSuprimentos').val() == '1';
		$('#PossuiEstoque').toggle($('#tpCompra').val() == '1' && aprovado);
	});

	$('#cpAprovaConfSolicitante').change(function () {
		$('.ReprovadoConfSolicitante').toggle($('#cpAprovaConfSolicitante').val() == '2');
	});


	//FUNçÃO blur
	$('#cpNumeroCotacao').blur(function () {
		var dados = VIEW.getInstance().getFornecedoresAprovados();
		if (dados.length == 0) {
			Compartilhados.LimparCampos(['limparCotacao'])

			throw Compartilhados.WarningToast('', Mensagens.M0009, 'danger')
		}
	});


	//TRIGGER ZOOM

	//Retorno Zoom Empresa
	$(document).on('ZoomEmpresa', function (ev, Empresa) {
		window.loadingLayer.show();
		setTimeout(function () {
			$('#cpEmpresa').val(Empresa.EMPRESA);
			$('#cpCnpjEmpresa').val(Empresa.CNPJ);
			$('#cpCodEmpresa').val(Empresa.CODEMPRESA);
			window.loadingLayer.hide();
			var dados = VIEW.getInstance().filtrarCentroCustoUau(CodUsuarioRede);
			ZOOM.getInstance().GetCentroCustoUau(dados);
		}, 1000);
	});

	//Retorno Zoom Centro de Custo UAU
	$(document).on('ZoomCentroCustoUau', function (ev, centroCusto) {

		window.loadingLayer.show();
		setTimeout(function () {
			$('#cpCentroCustoUau').val(centroCusto.DESCRICAOOBRA);
			$('#cpCodCentroCustoUau').val(centroCusto.CODOBRA);

			window.loadingLayer.hide();

			VIEW.getInstance().atualizaHierarquiaSRH($('#cpCodEmpresa').val(), centroCusto.CODOBRA);
			VIEW.getInstance().limparUsuariosPorPapel()
			VIEW.getInstance().listarUsuariosPorPapel()

			VIEW.getInstance().atribuirMecAtividade21()
			VIEW.getInstance().preencherDescritor();

		}, 1000);
	});

	//Retorno Zoom Insumo/Composição UAU (AutoComplete)

	$(document).on('retornoInsumoItensTi', function (ev, dadosInsumo) {
		var index = sessionStorage.getItem('indexItensTi');
		VIEW.getInstance().verificarSeItenRepetido(index, dadosInsumo, '#cpCodInsumoItensTi', '#cpInsumoItensTi');
		VIEW.getInstance().preencheCamposTabelas(index, '', dadosInsumo, 'ItensTi')
	});

	$(document).on('retornoInsumoDemaisCompras', function (ev, dadosInsumo) {
		var index = sessionStorage.getItem('indexDemaisCompras');
		VIEW.getInstance().verificarSeItenRepetido(index, dadosInsumo, '#cpCodInsumoDemaisCompras', '#cpInsumoDemaisCompras');
		VIEW.getInstance().preencheCamposTabelas(index, '', dadosInsumo, 'DemaisCompras')

	});

	$(document).on('retornoComposicaoServicos', function (ev, dadosComposicao) {
		var index = sessionStorage.getItem('indexServicos');
		VIEW.getInstance().verificarSeItenRepetido(index, dadosComposicao, '#cpCodInsumoServicos', '#cpComposicaoServicos');
		VIEW.getInstance().preencheCamposTabelas(index, '', dadosComposicao, 'Servicos')

	});

	//Retorno Zoom Produto UAU
	$(document).on('ZoomProdutoUAU', function (ev, dadosProduto) {
		window.loadingLayer.show();
		setTimeout(function () {
			if (sessionStorage.getItem('zoomProdutoUauItensTi')) {
				var index = sessionStorage.getItem('indexItensTi');

				$(`#cpProdutoUAUItensTi___${index}`).val(dadosProduto.DESCRICAO);
				$(`#cpCodProdutoUAUItensTi___${index}`).val(dadosProduto.CODPRODUTO);

				sessionStorage.setItem('zoomProdutoUauItensTi', false)
				sessionStorage.setItem('zoomPlanejamentoUAUItensTi', true)
			}
			if (sessionStorage.getItem('zoomProdutoUauDemaisCompras')) {
				window.loadingLayer.show();
				var index = sessionStorage.getItem('indexDemaisCompras');

				$(`#cpProdutoUAUDemaisCompras___${index}`).val(dadosProduto.DESCRICAO);
				$(`#cpCodProdutoUAUDemaisCompras___${index}`).val(dadosProduto.CODPRODUTO);

				sessionStorage.setItem('zoomProdutoUauDemaisCompras', false)
				sessionStorage.setItem('zoomPlanejamentoUAUDemaisCompras', true)
			}
			if (sessionStorage.getItem('zoomProdutoUauServicos')) {

				var index = sessionStorage.getItem('indexServicos');

				$(`#cpProdutoUAUServicos___${index}`).val(dadosProduto.DESCRICAO);
				$(`#cpCodProdutoUAU___${index}`).val(dadosProduto.CODPRODUTO);

				sessionStorage.setItem('zoomProdutoUauServicos', false)
				sessionStorage.setItem('zoomPlanejamentoUAUServicos', true)
			}
			if (sessionStorage.getItem('zoomProdutoUauLiberacao')) {
				var index = sessionStorage.getItem('indexSolicitaVerba');
				$(`#cpProdutoLiberacao___${index}`).val(dadosProduto.DESCRICAO);
				$(`#cpCodProdutoUAULiberacao___${index}`).val(dadosProduto.CODPRODUTO);

				sessionStorage.setItem('zoomProdutoUauLiberacao', false)
				sessionStorage.setItem('zoomPlanejamentoUAULiberacao', true)
			}
			if (sessionStorage.getItem('zoomProdutoUauOrigem')) {
				var index = sessionStorage.getItem('indexSolicitaVerba');
				$(`#cpProdutoOrigem___${index}`).val(dadosProduto.DESCRICAO);
				sessionStorage.setItem('zoomProdutoUauOrigem', false)
			}
			if (sessionStorage.getItem('zoomProdutoUauDestino')) {
				var index = sessionStorage.getItem('indexSolicitaVerba');
				$(`#cpProdutoDestino___${index}`).val(dadosProduto.DESCRICAO);
				sessionStorage.setItem('zoomProdutoUauDestino', false)
			}

			var codEmpresa = $('#cpCodEmpresa').val()
			var codObra = $('#cpCodCentroCustoUau').val()
			var codProduto = dadosProduto.CODPRODUTO
			var data = Compartilhados.GetDateNow().split('/')
			$('#cpMesPL').val(Compartilhados.GetDateNow())
			ZOOM.getInstance().GetPlanejamentosUAU(codEmpresa, codObra, codProduto, data[1], data[2]);

			window.loadingLayer.hide();
		}, 1000);

	});

	//Retorno Zoom Planejamento UAU
	$(document).on('ZoomPlanejamentoUAU', function (ev, dadosPlanejamento) {
		window.loadingLayer.show();
		setTimeout(function () {
			if (sessionStorage.getItem('zoomPlanejamentoUAUItensTi')) {
				var index = sessionStorage.getItem('indexItensTi');
				VIEW.getInstance().preencheCamposTabelas(index, dadosPlanejamento, '', 'ItensTi')
				sessionStorage.setItem('zoomPlanejamentoUAUItensTi', false)
			}

			if (sessionStorage.getItem('zoomPlanejamentoUAUDemaisCompras')) {
				var index = sessionStorage.getItem('indexDemaisCompras');
				VIEW.getInstance().preencheCamposTabelas(index, dadosPlanejamento, '', 'DemaisCompras')
				sessionStorage.setItem('zoomPlanejamentoUAUDemaisCompras', false)
			}

			if (sessionStorage.getItem('zoomPlanejamentoUAUServicos')) {
				var index = sessionStorage.getItem('indexServicos');
				VIEW.getInstance().preencheCamposTabelas(index, dadosPlanejamento, '', 'Servicos')
				sessionStorage.setItem('zoomPlanejamentoUAUServicos', false)
			}
			if (sessionStorage.getItem('zoomPlanejamentoUAULiberacao')) {
				var index = sessionStorage.getItem('indexSolicitaVerba');
				$(`#cpInsumoPlanej___${index}`).val(dadosPlanejamento.DESCRICAO_INSUMO_PLANEJAMENTO)
				sessionStorage.setItem('zoomPlanejamentoUAULiberacao', false)
			}

			$(`#cpCodObraFiscal`).val(dadosPlanejamento.COD_OBRA_FISCAL);

			window.loadingLayer.hide();
		}, 1000);
	});

	//TRIGGER DATAS

	$(document).on('DataEntregaContratacao', function (ev, data) {
		var diaSemana = data.split('/')
		diaSemana = new Date(`${diaSemana[1]}/${diaSemana[0]}/${diaSemana[2]}`)
		if (BLL.getInstance().VerificarSeDataMenor(data)) {
			Compartilhados.WarningToast('', Mensagens.M0005, 'danger')
			Compartilhados.LimparCampos(['limparDataEntregaContratacao'])
		}
		if (diaSemana.getDay() == 6 || diaSemana.getDay() == 0) { //Verifica se data é SÁBADO (6) ou DOMINGO (0)
			Compartilhados.WarningToast('', Mensagens.M0007, 'danger')
			Compartilhados.LimparCampos(['limparDataEntregaContratacao'])
		}
		if (BLL.getInstance().VerificarSeEhFeriado(data, VIEW.getInstance().getFeriado())) {
			Compartilhados.WarningToast('', Mensagens.M0001, 'danger')
			Compartilhados.LimparCampos(['limparDataEntregaContratacao'])
		}
	});

	$(document).on('DataPrevisaoEntrega', function (ev, data) {

		var dataEntregaSplit = data.split('/')
		data = `${dataEntregaSplit[2]}/${dataEntregaSplit[1]}/${dataEntregaSplit[0]}`
		$('#cpPrazo_23').val(data + ' 18:00')

	});
});

//Função de exclusão das tabelas  
var fnExcluirFilhosItensTi = function (oElement) {
	fnWdkRemoveChild(oElement);
	VIEW.getInstance().removeFilhosFornAprovado(oElement, '#cpDescricaoInsumoItensTi___');
}

var fnExcluirFilhosDemaisCompras = function (oElement) {
	fnWdkRemoveChild(oElement);
	VIEW.getInstance().removeFilhosFornAprovado(oElement, '#cpDescricaoInsumoDemaisCompras___');

}

var fnExcluirFilhosServicos = function (oElement) {
	fnWdkRemoveChild(oElement);
	VIEW.getInstance().removeFilhosFornAprovado(oElement, '#cpDescricaoInsumoServicos___');
}

var fnExcluirFilhosSolicitacaoVerba = function (oElement) {
	fnWdkRemoveChild(oElement);
}

var VIEW = (function () {
	var instance;

	function init() {

		function inicializar(currentState, modoExibicao) {
			if (modoExibicao == 'MOD' || modoExibicao == 'ADD') {
				VIEW.getInstance().carregarInterfaceEmModificacao(currentState, modoExibicao);
			}
			else {
				VIEW.getInstance().carregarInterfaceEmVisualizacao(currentState, modoExibicao);
			}
		};

		function carregarInterfaceEmVisualizacao(atividade, modo) {
			var cpTipoSolicitacao = $('#cpTipoSolicitacao').val();
			var tpCompra = $('#tpCompra').val();
			var possuiEstoque = $('#cpPossuiEstoque').val();

			if (possuiEstoque == '2' || cpTipoSolicitacao == '2' || tpCompra == '2') {
				VIEW.getInstance().preencherDadosFornecedorAprovado(cpTipoSolicitacao, tpCompra);
			}

			VIEW.getInstance().removerImgLixeira();
			VIEW.getInstance().atribuirBotoes();
			VIEW.getInstance().setStatusElementos();
		}

		function carregarInterfaceEmModificacao(atividade, modo) {
			//CONFIGURAÇÕES DOS CAMPOS DE DATAS

			Compartilhados.InitilizeDatePicker([
				['cpDataEntregaContratacao', [0, 1, 2], 'DataEntregaContratacao']
			], '', 8)

			Compartilhados.InitilizeDatePicker([
				['cpPrevisaoEntrega', [22], 'DataPrevisaoEntrega']
			], '', 1)

			VIEW.getInstance().setStatusElementos();
			VIEW.getInstance().preencherHieraquiaSolicitante(atividade);

			Compartilhados.enabledButtonZoom(['#btEmpresa', '#btCentroCustoUau',
				'#btNomeFornecedor', '#btAddServico'
			], ['0', '1', '2'])

			if (atividade != '0' && atividade != '1' && atividade != '2') {
				VIEW.getInstance().removerImgLixeira();
				VIEW.getInstance().atribuirBotoes();
			}
			if (atividade == '19' || atividade == '20') {
				VIEW.getInstance().listarUsuariosPorPapel();
				VIEW.getInstance().atribuirMecAtividade21();
			}

			if (atividade == '21') {

				var cpTipoSolicitacao = $('#cpTipoSolicitacao').val();
				var tpCompra = $('#tpCompra').val();
				var possuiEstoque = $('#cpPossuiEstoque').val();

				Compartilhados.enabledButtonZoom(['#btbuscarProdutoLiberacao', '#btbuscarInsumoPlanej',
					'#btbuscarProdutoOrigem', '#btbuscarProdutoDestino', '#btbuscarInsumoOrigem',
					'#btbuscarInsumoDestino'], ['21'])

				if (possuiEstoque == '2' || cpTipoSolicitacao == '2' || tpCompra == '2') {
					VIEW.getInstance().preencherDadosFornecedorAprovado(cpTipoSolicitacao, tpCompra);
				}

				$('#btDataCotacao').attr('disabled', 'true')
				$('#btPeriodoLiberacao').attr('disabled', 'true')
				$('#btPeriodoOrigemVerba').attr('disabled', 'true')
				$('#btPeriodoDestinoVerba').attr('disabled', 'true')

				VIEW.getInstance().isPapelGestao();
				VIEW.getInstance().setStatusElementos();
			}

		};

		function setStatusElementos() {
			var hasEstoque = $('#cpPossuiEstoque').val() == '1';
			$('.divtpCompra').toggle($('#cpTipoSolicitacao').val() == '1');
			$('.divServicoTerceiro').toggle($('#cpTipoSolicitacao').val() == '2');
			$('#tbFornAprovadoDemaisCompras').toggle($('#tpCompra').val() == '2');
			$('#tbFornAprovadoServicos').toggle($('#cpTipoSolicitacao').val() == '2');
			$('.divItensTi').toggle($('#tpCompra').val() == '1');
			$('.divDemaisCompras').toggle($('#tpCompra').val() == '2');
			$('#solicitacaoVerba').toggle($('#hasSaldoOrcadoNegativo').val() == '1');
			$('#PossuiEstoque').toggle($('#tpCompra').val() == '1' && $('#cpAprovaConfSuprimentos').val() == '1');
			$('.IntegraNovamente1').toggle($('#cpAprovaIntegracao1').val() == '2');
			$('.IntegraNovamente4').toggle($('#cpAprovaIntegracao4').val() == '2');
			$('.ReprovaFornecedoreVerba').toggle($('#cpAprovaFornecedoreVerba').val() == '2');
			$('.ReprovaCompraN2').toggle($('#cpAprovaCompraN2').val() == '2');
			$('.ReprovaCompraN3').toggle($('#cpAprovaCompraN3').val() == '2');
			$('.FornAprovado').toggle(!hasEstoque);
			$('.ReprovadoConfSolicitante').toggle($('#cpAprovaConfSolicitante').val() == '2');
			$('#PrevisaoEntrega').toggle($('#cpAprovaOrdemCompra').val() == '1');
			$('.ReprovaCompraN4').toggle($('#cpAprovaCompraN4').val() == '2');
		}

		function adicionaItensTi() {
			var numLinhas = $('#tbItensTi tbody tr').length;

			if (numLinhas <= 30) {
				VIEW.getInstance().verificarCentroCustoUau();
				var indexItensTi = wdkAddChild('tbItensTi');
				sessionStorage.setItem('indexItensTi', indexItensTi);

				Compartilhados.enabledButtonZoom([`#btbuscarProdUAUItensTi___${indexItensTi}`,
				`#btInsumoPlanejItensTi___${indexItensTi}`], ['0', '1', '2']);

				$(`#cpInsumoItensTi___${indexItensTi}`).keyup(function () {
					VIEW.getInstance().autoComplete(`cpInsumoItensTi___${indexItensTi}`, 'retornoInsumoItensTi');
				})

				$(`#btbuscarProdUAUItensTi___${indexItensTi}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauItensTi', true)
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})

				$(`#btInsumoPlanejItensTi___${indexItensTi}`).click(function () {
					VIEW.getInstance().verificarCodProduto('cpCodProdutoUAUItensTi___', indexItensTi);
					sessionStorage.setItem('zoomPlanejamentoUAUItensTi', true);
					var data = Compartilhados.GetDateNow().split('/');
					ZOOM.getInstance().GetPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoUAUItensTi___${indexItensTi}`).val(),
						data[1],
						data[2]);
				})

				MaskEvent.init();
			}
		}

		function adicionaDemaisCompras() {
			var numLinhas = $('#tbDemaisCompras tbody tr').length;

			if (numLinhas <= 30) {
				VIEW.getInstance().verificarCentroCustoUau();
				var indexDemaisCompras = wdkAddChild('tbDemaisCompras');

				Compartilhados.enabledButtonZoom([`#btbuscarProdUAUDemaisCompras___${indexDemaisCompras}`,
				`#btInsumoPlanejDemaisCompras___${indexDemaisCompras}`], ['0', '1', '2']);

				$(`#cpInsumoDemaisCompras___${indexDemaisCompras}`).keyup(function () {
					VIEW.getInstance().autoComplete(`cpInsumoDemaisCompras___${indexDemaisCompras}`, 'retornoInsumoDemaisCompras');
				})

				$(`#btbuscarProdUAUDemaisCompras___${indexDemaisCompras}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauDemaisCompras', true);
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})

				$(`#btInsumoPlanejDemaisCompras___${indexDemaisCompras}`).click(function () {
					VIEW.getInstance().verificarCodProduto('cpCodProdutoUAUDemaisCompras___', indexDemaisCompras)
					sessionStorage.setItem('zoomPlanejamentoUAUDemaisCompras', true)
					var data = Compartilhados.GetDateNow().split('/')
					ZOOM.getInstance().GetPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoUAUDemaisCompras___${indexDemaisCompras}`).val(),
						data[1],
						data[2]);
				})
				sessionStorage.setItem('indexDemaisCompras', indexDemaisCompras);

				MaskEvent.init();
			}
		}

		function adicionaServico() {
			var numLinhas = $('#tbContratacaoServicos tbody tr').length;

			if (numLinhas <= 30) {
				VIEW.getInstance().verificarCentroCustoUau();
				var indexServicos = wdkAddChild('tbContratacaoServicos');
				sessionStorage.setItem('indexServicos', indexServicos);

				Compartilhados.enabledButtonZoom([`#btbuscarProdUAUServicos___${indexServicos}`, `#btComposicaoPlanejServicos___${indexServicos}`], ['0', '1', '2'])

				$(`#cpComposicaoServicos___${indexServicos}`).keyup(function () {
					VIEW.getInstance().autoComplete(`cpComposicaoServicos___${indexServicos}`, 'retornoComposicaoServicos');
				})

				$(`#btbuscarProdUAUServicos___${indexServicos}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauServicos', true)
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})

				$(`#btComposicaoPlanejServicos___${indexServicos}`).click(function () {
					VIEW.getInstance().verificarCodProduto('cpCodProdutoPlanServicos___', indexServicos)
					sessionStorage.setItem('zoomProdutoUauServicos', true)
					var data = Compartilhados.GetDateNow().split('/')
					ZOOM.getInstance().GetPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoPlanServicos___${indexServicos}`).val(),
						data[1],
						data[2]);
				})

				MaskEvent.init();
			}
		}

		function adicionaSolicitacaoVerba() {
			var numLinhas = $('#tbSolicitacaoVerba tbody tr').length;

			if (numLinhas <= 30) {
				var indexSolicitaVerba = wdkAddChild('tbSolicitacaoVerba');
				sessionStorage.setItem('indexSolicitaVerba', indexSolicitaVerba);

				MaskEvent.init();

				Compartilhados.InitilizeDatePicker([
					[`cpPeriodoLiberacao___${indexSolicitaVerba}`, [0, 1, 2, 21]],
					[`cpPeriodoOrigemVerba___${indexSolicitaVerba}`, [0, 1, 2, 21]],
					[`cpPeriodoDestinoVerba___${indexSolicitaVerba}`, [0, 1, 2, 21]],
				]);

				$(`#cpTipoSolicitacaoVerba___${indexSolicitaVerba}`).change(function () {

					var cpTipoSolicitacao = $(`#cpTipoSolicitacaoVerba___${indexSolicitaVerba}`).val();
					$(`#cpProdutoLiberacao___${indexSolicitaVerba}`).closest('.divLiberacaoVerba').toggle(cpTipoSolicitacao == '1');
					$(`#cpProdutoOrigem___${indexSolicitaVerba}`).closest('.divRemanejVerba').toggle(cpTipoSolicitacao == '2');
				});

				$('.divLiberacaoVerba').toggle($('#cpTipoSolicitacaoVerba').val() == '1');
				$('.divRemanejVerba').toggle($('#cpTipoSolicitacaoVerba').val() == '2');

				$(`#cpEmpresaUAU___${indexSolicitaVerba}`).val($('#cpEmpresa').val());
				$(`#cpObraUAU___${indexSolicitaVerba}`).val($('#cpCentroCustoUau').val());
				$(`#cpNumPedidoCompras___${indexSolicitaVerba}`).val($('#cpNumeroPedido').val().replace(/[[/"]/g, ''));
				$(`#cpNumChamadoCompras___${indexSolicitaVerba}`).val($('#cpNumeroSolicitacao').val());

				$(`#btbuscarProdutoLiberacao___${indexSolicitaVerba}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauLiberacao', true);
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})

				$(`#btbuscarInsumoPlanej___${indexSolicitaVerba}`).click(function () {
					VIEW.getInstance().verificarCodProduto('cpCodProdutoUAULiberacao___', indexSolicitaVerba)
					sessionStorage.setItem('zoomPlanejamentoUAULiberacao', true)
					var data = Compartilhados.GetDateNow().split('/')
					ZOOM.getInstance().GetPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoUAULiberacao___${indexSolicitaVerba}`).val(),
						data[1],
						data[2]);
				})

				$(`#btbuscarProdutoOrigem___${indexSolicitaVerba}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauOrigem', true);
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})

				$(`#btbuscarProdutoDestino___${indexSolicitaVerba}`).click(function () {
					sessionStorage.setItem('zoomProdutoUauDestino', true);
					ZOOM.getInstance().GetProdutosUAU($('#cpCodCentroCustoUau').val());
				})
				$(`#cpInsumoOrigem___${indexSolicitaVerba}`).keyup(function () {
					VIEW.getInstance().autoComplete(`cpInsumoOrigem___${indexSolicitaVerba}`, 'retornoInsumoOrigem');
				})
				$(`#cpInsumoDestino___${indexSolicitaVerba}`).keyup(function () {
					VIEW.getInstance().autoComplete(`cpInsumoDestino___${indexSolicitaVerba}`, 'retornoInsumoDestino');
				})
			}
		}

		function adicionarFornAprovado(table) {

			var index = wdkAddChild(table);
			sessionStorage.setItem('indexReferencia', index);

			MaskEvent.init();
		}

		function removeFilhosFornAprovado(element, field) {
			while (element != null) {
				if (element.id != null) {
					if (element.nodeName.toUpperCase() == "TR") {
						row = element;
					}
				}
				element = element.parentNode;
			}
			let arrayFields = $(row).find("input");
			arrayFields = arrayFields[0];
			let fieldName = arrayFields.name;
			let index = fieldName.match(/[0-9]/g);

			$(`${field}${index[0]}`).closest('tr').remove();
		}

		function removeTabelas(index, fields) {
			for (i = 1; i <= index; i++) {
				fields.forEach(function (field) {
					$(`${field}${i}`).closest('tr').remove();
				})
			}
		}

		function autoComplete(field, callback) {
			var dados = [];

			var dados = VIEW.getInstance().getComposicaoInsumos(field);

			dados = dados.map(function (obj) {
				return {
					label: obj.DESCRICAO,
					CAP: obj.CAP,
					CODIGO: obj.CODIGO,
					DESCRICAO: obj.DESCRICAO,
					UNIDADE: obj.UNIDADE
				};
			});

			Compartilhados.autoComplete(field, dados, callback, 5);
		}

		function getComposicaoInsumos(cpDescricao) {
			var tipoSolicitacao = '';
			var descricao = '';

			$('#cpTipoSolicitacao').val() == '1' ? tipoSolicitacao = 'MATERIAL' : tipoSolicitacao = 'SERVICO'
			descricao = $(`#${cpDescricao}`).val()
			if (descricao.length > 4) {
				/* BUSCA COMPOSIÇÃO / INSUMO */
				var dados = Model.get_DS1000("SP_FLUIG_1083", `'${tipoSolicitacao}', '${descricao}'`).values;
				if (dados == '') throw Compartilhados.WarningToast('', Mensagens.M0002, 'danger');

			} else dados = [{ DESCRICAO: '' }]

			return dados
		}

		function verificarCentroCustoUau() {
			if ($(`#cpCentroCustoUau`).val() == '') {
				throw Compartilhados.WarningToast('', Mensagens.M0006, 'danger');
			}
		}

		function getIndex(campo) {
			var indexes = [];
			var dadosCampo = $(`input[id^='${campo}']`);
			for (let i = 0; i < dadosCampo.length; i++) {
				var indexSplit = dadosCampo[i].id.split('___');
				index = indexSplit[1];
				indexes.push(index);
			}
			return indexes
		}

		function atualizaHierarquiaSRH(codEmpresa, codObra) {
			var dados = Model.get_DS1000('SP_FLUIG_1088', `'${codEmpresa}', '${codObra}'`).values;

			dados.forEach(dado => {
				if (dado.CODOBRA == codObra) {
					if (dado.CHAPA_GESTOR != '') {

						$('#cpPapelN1').val(`Pool:Role:${dado.PAPELN1}`);
						$('#cpPapelN2').val(`Pool:Role:${dado.PAPELN2}`);
						$('#cpPapelN3').val(`Pool:Role:${dado.PAPELN3}`);
						$('#cpPapelN4').val(`Pool:Role:${dado.PAPELN4}`);

					} else {
						throw Compartilhados.WarningToast('', Mensagens.M0003, 'warning');
					}
				}
			});
			AuxiliarSRH.Regras();
		};

		function preencherHieraquiaSolicitante(atividade) {
			if (atividade == '0' || atividade == '1' || atividade == '2') {
				$('#cpMatriculaGestorSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GESTOR);
				$('#cpMatriculaGGSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GG);
				$('#cpMatriculaSuperSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_SUP);
				$('#cpMatriculaDiretorSolicitante').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_DIRETOR);
			}
		}

		function preencherDescritor() {

			var $obra = $("#cpCentroCustoUau").val();
			var $nomeEtapa = $("#textActivity").val();
			var $cpTipoSolicitacao = $("#cpTipoSolicitacao").val();

			$('#cpDescritor').val($obra + ' | ' + $nomeEtapa + ' | ' + $cpTipoSolicitacao);
		}

		function inserirMask(indexes) {
			indexes.forEach(index => {

				campos = [
					`#cpUnitarioItensTi___${index}`, `#cpUnitarioDemaisCompras___${index}`, `#cpUnitarioServicos___${index}`, `#cpOrcadoItensTi___${index}`,
					`#cpOrcadoDemaisCompras___${index}`, `#cpOrcadoServicos___${index}`, `#cpTotalItensTi___${index}`, `#cpTotalDemaisCompras___${index}`,
					`#cpTotalServicos___${index}`, `#cpSaldoDemaisCompras___${index}`, `#cpSaldoItensTi___${index}`, `#cpSaldoServicos___${index}`,
					`#cpTotalPedido`
				];

				VIEW.getInstance().formatarMask(campos);
			});
		}

		function formatarMask(campos) {
			campos.forEach(campo => {
				$(campo).priceFormat({
					prefix: '',
					centsSeparator: ',',
					thousandsSeparator: '.',
					allowNegative: true
				});
			});
		}

		function verificarCodProduto(cpCodProduto, index) {
			var codProduto = $(`#${cpCodProduto}${index}`).val();
			if (codProduto == '') {
				throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO PRODUTO', 'danger');
			}
		}

		function preencheCamposTabelas(index, Planejamento, ComposicaoOuInsumo, tabela) {
			if (ComposicaoOuInsumo != '') {
				if (ComposicaoOuInsumo.obj.CODIGO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO INSUMO/COMPOSIÇÃO', 'danger')
				else if (ComposicaoOuInsumo.obj.CAP == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CAP', 'danger')
				else if (ComposicaoOuInsumo.obj.UNIDADE == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'UN', 'danger')
				else {
					$(`#cpUnidade${tabela}___${index}`).val(ComposicaoOuInsumo.obj.UNIDADE)
					$(`#cpCodInsumo${tabela}___${index}`).val(ComposicaoOuInsumo.obj.CODIGO)
					$(`#cpCAP${tabela}___${index}`).val(ComposicaoOuInsumo.obj.CAP)

					$(`#cpDescricaoInsumo${tabela}___${index}`).val(ComposicaoOuInsumo.obj.DESCRICAO)
				}
			} else if (Planejamento != '') {
				if (Planejamento.INSUMO_PLANEJAMENTO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO INSUMO/COMPOSIÇÃO PLANEJAMENTO', 'danger')
				else if (Planejamento.CODIGO_SERVICO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DE SERVIÇO', 'danger')
				else if (Planejamento.CODIGO_ITEM_PLANEJAMENTO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO ITEM PLANEJAMENTO', 'danger')
				else if (Planejamento.CODIGO_PRODUTO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO PRODUTO PLANEJAMENTO', 'danger')
				else if (Planejamento.CODIGO_CONTRATO == '') throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DE CONTRATO DO PLANEJAMENTO', 'danger')
				else {
					$(`#cpInsumoPlanej${tabela}___${index}`).val(Planejamento.DESCRICAO_INSUMO_PLANEJAMENTO);
					$(`#cpComposicaoPlanej${tabela}___${index}`).val(Planejamento.DESCRICAO_INSUMO_PLANEJAMENTO);
					$(`#cpCodInsumoPlanej${tabela}___${index}`).val(Planejamento.INSUMO_PLANEJAMENTO);
					$(`#cpCodServico${tabela}___${index}`).val(Planejamento.CODIGO_SERVICO)
					$(`#cpServico${tabela}___${index}`).val(Planejamento.DESCRICAO_SERVICO);
					$(`#cpCodItemPlanej${tabela}___${index}`).val(Planejamento.CODIGO_ITEM_PLANEJAMENTO);
					$(`#cpCodProdutoPlan${tabela}___${index}`).val(Planejamento.CODIGO_PRODUTO);
					$(`#cpCodContratoPl${tabela}___${index}`).val(Planejamento.CODIGO_CONTRATO);
					$(`#cpOrcado${tabela}___${index}`).val(Planejamento.PRECO)
				}
			}
		}

		function getFornecedoresAprovados() {
			var codEmpresa = $('#cpCodEmpresa').val()
			var codObra = $('#cpCodCentroCustoUau').val()
			var numCotacao = $('#cpNumeroCotacao').val()

			return Model.get_DS1000("SP_FLUIG_1084", `'${codEmpresa}', '${codObra}', '${numCotacao}'`).values;
		}

		function preencherTabelaFornAprovado(indexes, tabela, dados) {

			indexes.forEach(index => {
				$(`#cpQuantidade${tabela}Aprov___${index}`).val($(`#cpQuantidade${tabela}___${index}`).val())
				$(`#cpUnidade${tabela}Aprovado___${index}`).val($(`#cpUnidade${tabela}___${index}`).val())
				$(`#cpDataCotacao`).val(Compartilhados.GetDateNow())
				$(`#cpNumSimulacao${tabela}`).val(dados[0].NUM_SIMULACAO)
				$(`#cpTipoCotacao${tabela}`).val(dados[0].TIPO_COTACAO)

				dados.forEach(dado => {
					if ($(`#cpCodInsumo${tabela}___${index}`).val() == dado.COD_INSUMO) {
						$(`#cpFornAprovado${tabela}___${index}`).val(dado.NOME_FORNECEDOR)
						$(`#cpUnitario${tabela}___${index}`).val(dado.PRECO_UNITARIO)
						$(`#cpTotal${tabela}___${index}`).val(dado.TOTAL)
						if ($('#cpTipoSolicitacao').val() == '1') $(`#cpInsumoPlanej${tabela}Apr___${index}`).val($(`#cpInsumoPlanej${tabela}___${index}`).val())
						else $(`#cpInsumoPlanej${tabela}Apr___${index}`).val($(`#cpComposicaoPlanej${tabela}___${index}`).val())
					}
				})
			})
		}

		function filtrarCentroCustoUau(CodUsuarioRede) {
			var dadosFiltrados = [];
			var dados = Model.get_DS1000("SP_FLUIG_1090", `${CodUsuarioRede}, ${$('#cpCodEmpresa').val()}`).values;
			if (dados.length == 0) throw Compartilhados.WarningToast('', Mensagens.M0012, 'danger')

			dados.forEach(dado => {
				if (dado.STATUSOBRA == '0 - Andamento') {
					dadosFiltrados.push(dado);
				}
			})

			return dadosFiltrados
		}

		function listarFeriados() {

			var url = `${location.origin}/api/public/2.0/holidays`
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.responseType = "json";
			xhr.addEventListener("readystatechange", function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					setFeriado(xhr.response)
				}
			})
			xhr.send();
		}

		var feriados = []
		function setFeriado(respostaFeriado) {
			respostaFeriado.content.items.forEach(function (feriado) {
				var dataFeriadoSplit = feriado.date.split('-')
				var dataFeriado = new Date(`${dataFeriadoSplit[1]}/${dataFeriadoSplit[2]}/${dataFeriadoSplit[0]}`)
				feriados.push(dataFeriado)
			})
		}
		function getFeriado() {
			return feriados
		}

		function isPapelGestao() {
			var matriculaSolicitante = $('#cpMatriculaSolicitante').val()
			var inPaper = false
			var Usuarios = getUsuariosPapel()
			for (var index = 0; index < 4; index++) {
				Object.values(Usuarios)[index].forEach(usuario => {
					if (matriculaSolicitante == usuario) {
						inPaper = true;
					}
				});
			}
			return inPaper
		}

		function listarUsuariosPorPapel() {

			var codEmpresa = $('#cpCodEmpresa').val()
			var codObra = $('#cpCodCentroCustoUau').val()

			var dados = Model.get_DS1000("SP_FLUIG_1088", `'${codEmpresa}', '${codObra}'`).values

			if (dados[0].PAPELN1 == '') {
				Compartilhados.LimparCampos(['limparCentroCusto'])
				throw Compartilhados.WarningToast('', Mensagens.M0011, 'danger')
			}

			var PapelObra = [dados[0].PAPELN1, dados[0].PAPELN2, dados[0].PAPELN3, dados[0].PAPELN4]

			for (var index = 0; index < 4; index++) {

				var papelObra = PapelObra[index]

				//Buscar Papéis por Código
				var Datasets = DatasetFactory.getDataset("workflowColleagueRole", null, null, null).values;
				if (Datasets.length == 0) {
					Compartilhados.WarningToast('', Mensagens.M0013, 'error');
					return;
				}

				Datasets.forEach(function (papel) {
					if (papel['workflowColleagueRolePK.roleId'] == papelObra) {
						VIEW.getInstance().setUsuariosPapel(papel['workflowColleagueRolePK.colleagueId'], index)
					}
				})
			}
			if (!VIEW.getInstance().hasUsuarioPAPELN1()) {
				throw Compartilhados.WarningToast('', `${Mensagens.M0010} ${dados[0].PAPELN1}`, 'danger')
			}
		}

		var Papeis = { PAPELN1: [], PAPELN2: [], PAPELN3: [], PAPELN4: [] }

		function setUsuariosPapel(usuarios, index) {

			Object.values(Papeis)[index].push(usuarios)
		}

		function getUsuariosPapel() {
			return Papeis
		}

		function limparUsuariosPorPapel() {
			for (var index = 0; index < 4; index++) {
				Object.values(Papeis)[index].length = 0
			}
		}

		function hasUsuarioPAPELN1() {
			var hasUser = false;

			hasUser = VIEW.getInstance().getUsuariosPapel().PAPELN1.filter(usuario => {
				return usuario != ''
			})

			return hasUser
		}

		function atribuirMecAtividade21() {
			if (VIEW.getInstance().isPapelGestao()) {
				$('#cpMecAtribuicao_21').val($('#cpMatriculaSolicitante').val())

			} else {
				$('#cpMecAtribuicao_21').val($('#cpPapelN1').val())
			}
		}

		function preencherDadosFornecedorAprovado(cpTipoSolicitacao, tpCompra) {
			var indexes;
			var cpOrcado, cpTotal, cpSaldo;
			var dados = VIEW.getInstance().getFornecedoresAprovados();
			if (dados.length == 0 && $('#tpCompra').val() == '2') {
				$('.erroConsultaDataset1084').show()
			} else {



				if (cpTipoSolicitacao == 1 && tpCompra == 1) {
					indexes = VIEW.getInstance().getIndex('cpDescricaoInsumoItensTi')
					cpOrcado = '#cpOrcadoItensTi___'
					cpTotal = '#cpTotalItensTi___'
					cpSaldo = '#cpSaldoItensTi___'

					VIEW.getInstance().preencherTabelaFornAprovado(indexes, 'ItensTi', dados)

				}
				else if (cpTipoSolicitacao == 1 && tpCompra == 2) {
					indexes = VIEW.getInstance().getIndex('cpDescricaoInsumoDemaisCompras')
					cpOrcado = '#cpOrcadoDemaisCompras___'
					cpTotal = '#cpTotalDemaisCompras___'
					cpSaldo = '#cpSaldoDemaisCompras___'

					VIEW.getInstance().preencherTabelaFornAprovado(indexes, 'DemaisCompras', dados)

				}
				else if (cpTipoSolicitacao == 2) {
					indexes = VIEW.getInstance().getIndex('cpDescricaoInsumoServicos')
					cpOrcado = '#cpOrcadoServicos___'
					cpTotal = '#cpTotalServicos___'
					cpSaldo = '#cpSaldoServicos___'

					VIEW.getInstance().preencherTabelaFornAprovado(indexes, 'Servicos', dados)

				}
				VIEW.getInstance().inserirMask(indexes)
				BLL.getInstance().CalcularSaldoOrcamento(indexes, cpOrcado, cpTotal, cpSaldo);

				if (BLL.getInstance().VerificaSaldoNegativo(indexes, cpSaldo)) {
					$('#hasSaldoOrcadoNegativo').val('1')
				}

				BLL.getInstance().SomarTotalGeral(indexes, cpTotal, '#cpTotalPedido')
				VIEW.getInstance().inserirMask(indexes)
			}
		}

		function atribuirBotoes() {
			$('#btAddServico').attr('disabled', 'true');
			$('#btAddItensTi').attr('disabled', 'true');
			$('#btAddDemaisCompras').attr('disabled', 'true');
			$('#btDataEntregaContratacao').attr('disabled', 'true')
		}

		function removerImgLixeira() {
			$('tr td img').remove();
		}

		function verificarSeItenRepetido(index, dadosItem, cpCodItem, cpItem) {
			if (index > 1) {
				for (let i = 0; i <= index; i++) {
					if (dadosItem.obj.CODIGO == $(`${cpCodItem}___${i}`).val()) {
						$(`${cpItem}___${index}`).val('')
						throw Compartilhados.WarningToast('', Mensagens.M0014, 'danger');
					}
				}
			}
		}

		return {
			inicializar,
			carregarInterfaceEmModificacao,
			carregarInterfaceEmVisualizacao,
			setStatusElementos,
			adicionaServico,
			adicionaDemaisCompras,
			adicionaItensTi,
			autoComplete,
			getComposicaoInsumos,
			atualizaHierarquiaSRH,
			preencherHieraquiaSolicitante,
			preencherDescritor,
			adicionaSolicitacaoVerba,
			adicionarFornAprovado,
			removeFilhosFornAprovado,
			removeTabelas,
			inserirMask,
			verificarCodProduto,
			preencheCamposTabelas,
			filtrarCentroCustoUau,
			getFeriado,
			setFeriado,
			listarFeriados,
			isPapelGestao,
			listarUsuariosPorPapel,
			setUsuariosPapel,
			getUsuariosPapel,
			limparUsuariosPorPapel,
			hasUsuarioPAPELN1,
			atribuirMecAtividade21,
			getFornecedoresAprovados,
			preencherDadosFornecedorAprovado,
			atribuirBotoes,
			removerImgLixeira,
			verificarCentroCustoUau,
			getIndex,
			preencherTabelaFornAprovado,
			verificarSeItenRepetido,
			formatarMask
		};
	}
	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}
})();
