$(document).ready(function(){
	View.getInstance().constructor();
});

const View = (function(){
	var instance;

	function startInstance() {
		const Bll = BLL.getInstance();
		const Dal = DAL.getInstance();
		const Zoom = ZOOM.getInstance();
		const NewCompartilhados = compartilhados.getInstance();
		var obj_papeis = {
			PAPELN1: [],
			PAPELN2: [],
			PAPELN3: [],
			PAPELN4: []
		}

		/**
		 * @description Função inicializadora da classe View
		 */
		function constructor(){
			let cod_usuario_rede = FLUIGC.sessionStorage.getItem('userInformation').values[0].CODUSUARIOREDE;
			let form_mode = getModo();
			let cod_atividade = getAtividade();
			const $btn_lixeira_tabela_paifilho = $('#panelAtividade_Solicitacao table tbody tr td .delete-button-tabela');
			const $btn_additem_tabela_paifilho = $('.add-item-paifilho');

			parent.$('#collapse-tabs').css('width', '100%');

			createInfoFeriados();
			bindFormEvents(cod_usuario_rede);
			bindZoomEvent(cod_usuario_rede);
			bindCallbackDatepicker();
			Bll.setRegrasNegocioAprovacao();
			NewCompartilhados.mostrarReabertura(cod_atividade, '2');

			if(form_mode == 'MOD' || form_mode == 'ADD') {
				$btn_lixeira_tabela_paifilho.hide();
				$btn_additem_tabela_paifilho.prop('disabled', true);
				$('#btDataEntregaContratacao').prop("disabled", true);

				switch(cod_atividade){
					case '0':
					case '1':
					case '2':
						applyHierarquiaSolicitante();
						$btn_lixeira_tabela_paifilho.show();
						$btn_additem_tabela_paifilho.prop('disabled', false);
						$('#btDataEntregaContratacao').prop("disabled", false);
						$('#cpMesPL').val(moment().format('DD/MM/YYYY'));
						break;
					case '19':
					case '20':
						listarUsuariosPorPapel();
						atribuirMecAtividade21();
						break;
					case '21':
						createListaAnaliseVerba();
						/*var cpTipoSolicitacao = $('#cpTipoSolicitacao').val();
						var tpCompra = $('#tpCompra').val();
						var possuiEstoque = $('#cpPossuiEstoque').val();

						if(possuiEstoque == '2' || cpTipoSolicitacao == '2' || tpCompra == '2') {
							preencherDadosFornecedorAprovado(cpTipoSolicitacao, tpCompra);
						}

						$('#btDataCotacao').attr('disabled', 'true');
						$('#btPeriodoLiberacao').attr('disabled', 'true');
						$('#btPeriodoOrigemVerba').attr('disabled', 'true');
						$('#btPeriodoDestinoVerba').attr('disabled', 'true');

						isPapelGestao();
						createListaAnaliseVerba();*/
						break;
				}

				setStatusElementos();

				NewCompartilhados.initilizeDatePicker([
	                ["cpDataEntregaContratacao", [0, 1, 2], 'DataEntregaContratacao']
	            ], '', 8);

				NewCompartilhados.initilizeDatePicker([
					['cpPrevisaoEntrega', [22], 'DataPrevisaoEntrega']
				], '', 1);

				NewCompartilhados.enableButtonZoom([
					'#btbuscarProdutoLiberacao',
					'#btbuscarInsumoPlanej',
					'#btbuscarProdutoOrigem',
					'#btbuscarProdutoDestino',
					'#btbuscarInsumoOrigem',
					'#btbuscarInsumoDestino'],
					['21']
				);

				NewCompartilhados.enableButtonZoom([
					'#btEmpresa',
					'#btCentroCustoUau',
					'#btNomeFornecedor',
					'#btAddServico'],
					['0', '1', '2']
				);
			}
			else{
				$btn_lixeira_tabela_paifilho.hide();
				$btn_additem_tabela_paifilho.prop('disabled', true);
				$('#btDataEntregaContratacao').prop("disabled", true);
				setStatusElementos();
			}
		}

		/**
		 * @description Popula a tabela de fornecedores aprovados
		 */
		function createListaAnaliseVerba(){
			let cod_empresa = $('#cpCodEmpresa').val();
			let cod_obra = $('#cpCodCentroCustoUau').val();
			let tipo_solicitacao = FLUIGC.sessionStorage.getItem('tipo_solicitacao');
			let index_tabela;
			let mes_competencia = $('#cpMesPL').val().split('/')[1];
			let ano_competencia = $('#cpMesPL').val().split('/')[2];
			let cod_produto;
			let json_orcado;
			let soma_total_pedido = 0;

			if(tipo_solicitacao == 'itens_ti'){
				index_tabela = $('#tbItensTi tbody tr').length - 1;

				for(let i = 1; i <= index_tabela; i++){
					cod_produto = $('#cpCodProdutoUAUItensTi___' + i).val();
					json_orcado = Model.get_DS1000("SP_FLUIG_1082", `'${cod_empresa}', '${cod_obra}', '${cod_produto}', '${ano_competencia}', '${mes_competencia}' `).values;
					json_orcado = json_orcado.filter(function(item){
						if(item.INSUMO_PLANEJAMENTO == $('#cpCodInsumoPlanejDemaisCompras___' + i).val()){
							return item;
						}
					});

					fillTabelaPlanejamentoOrcamento(i, json_orcado[0], 'ItensTi');

					soma_total_pedido = soma_total_pedido + parseFloat($(`#cpTotalItensTi___${i}`).val());
				}
			}
			else if(tipo_solicitacao == 'demais_compras'){
				index_tabela = $('#tbDemaisCompras tbody tr').length - 1;

				for(let i = 1; i <= index_tabela; i++){
					cod_produto = $('#cpCodProdutoUAUDemaisCompras___' + i).val();
					json_orcado = Model.get_DS1000("SP_FLUIG_1082", `'${cod_empresa}', '${cod_obra}', '${cod_produto}', '${ano_competencia}', '${mes_competencia}' `).values;
					json_orcado = json_orcado.filter(function(item){
						if(item.INSUMO_PLANEJAMENTO == $('#cpCodInsumoPlanejDemaisCompras___' + i).val()){
							return item;
						}
					});

					fillTabelaPlanejamentoOrcamento(i, json_orcado[0], 'DemaisCompras');

					soma_total_pedido = soma_total_pedido + parseFloat($(`#cpTotalDemaisCompras___${i}`).val());
				}

				$('#cpTotalPedido').val(soma_total_pedido);
			}
			else{
				index_tabela = $('#tbContratacaoServicos tbody tr').length - 1;

				for(let i = 1; i <= index_tabela; i++){
					cod_produto = $('#cpCodProdutoUAUServicos___' + i).val();
					json_orcado = Model.get_DS1000("SP_FLUIG_1082", `'${cod_empresa}', '${cod_obra}', '${cod_produto}', '${ano_competencia}', '${mes_competencia}' `).values;
					json_orcado = json_orcado.filter(function(item){
						if(item.INSUMO_PLANEJAMENTO == $('#cpCodInsumoPlanejServicos___' + i).val()){
							return item;
						}
					});

					fillTabelaPlanejamentoOrcamento(i, json_orcado[0], 'Servicos');

					soma_total_pedido = soma_total_pedido + parseFloat($(`#cpTotalServicos___${i}`).val());
				}
			}
		}

		/**
		 * @description Binda os retornos callback do Zoom
		 * @param  {[string]} cod_usuario_rede [Código do usuário de rede]
		 * @return {[type]}                  [description]
		 */
		function bindZoomEvent(cod_usuario_rede){
			$(document).on('callbackZoomEmpresa', function(ev, retorno){
				let retorno_obra_uau;

				$('#cpEmpresa').val(retorno.EMPRESA);
				$('#cpCnpjEmpresa').val(retorno.CNPJ);
				$('#cpCodEmpresa').val(retorno.CODEMPRESA);

				retorno_obra_uau = getObraUAUPopulandoZoom(cod_usuario_rede, retorno.CODEMPRESA);

				Zoom.getCentroCustoUau(retorno_obra_uau);
			});

			$(document).on('ZoomCentroCustoUau', function(ev, centroCusto){
				$('#cpCentroCustoUau').val(centroCusto.DESCRICAOOBRA);
				$('#cpCodCentroCustoUau').val(centroCusto.CODOBRA);

				applyHierarquiaAprovadoresPorNivel();
				limparUsuariosPorPapel();
				listarUsuariosPorPapel();
				atribuirMecAtividade21();
				setValorCampoDescritor();
			});

			$(document).on('callbackAutoCompleteInsumoComposicao', function(elem, dados){
				let tipo_solicitacao = FLUIGC.sessionStorage.getItem('tipo_solicitacao');
				let index_tabela = dados.obj.INDEX;
				let dados_insumo = dados.obj;

				switch(tipo_solicitacao){
					case 'demais_compras':
						//all code
						$(`#cpCodInsumoDemaisCompras___${index_tabela}`).val(dados.obj.CODIGO);
						$(`#cpCAPDemaisCompras___${index_tabela}`).val(dados.obj.CAP);
						$(`#cpUnidadeDemaisCompras___${index_tabela}`).val(dados.obj.UNIDADE);

						break;
					case 'itens_ti':
						//all code
						$(`#cpCodInsumoItensTi___${index_tabela}`).val(dados.obj.CODIGO);
						$(`#cpCAPItensTi___${index_tabela}`).val(dados.obj.CAP);
						$(`#cpUnidadeItensTi___${index_tabela}`).val(dados.obj.UNIDADE);
						break;
					case 'servicos':
						//all code
						break;
				}
			});

			$(document).on('callbackZoomProdutoUAU', function(ev, dados){
				let tipo_solicitacao = FLUIGC.sessionStorage.getItem('tipo_solicitacao');
				let index_tabela = dados.INDEX;

				switch(tipo_solicitacao){
					case 'demais_compras':
						$(`#cpProdutoUAUDemaisCompras___${index_tabela}`).val(dados.DESCRICAO);
						$(`#cpCodProdutoUAUDemaisCompras___${index_tabela}`).val(dados.CODPRODUTO);

						$(`#btInsumoPlanejDemaisCompras___${index_tabela}`).trigger('click');
						break;
					case 'itens_ti':
						$(`#cpProdutoUAUItensTi___${index_tabela}`).val(dados.DESCRICAO);
						$(`#cpCodProdutoUAUItensTi___${index_tabela}`).val(dados.CODPRODUTO);

						$(`#btInsumoPlanejItensTi___${index_tabela}`).trigger('click');
						break;
					case 'servicos':
						$(`#cpProdutoUAUServicos___${index_tabela}`).val(dados.DESCRICAO);
						$(`#cpCodProdutoUAUServicos___${index_tabela}`).val(dados.CODPRODUTO);
						break;
				}
			});

			$(document).on('callbackZoomPlanejamentoUAU', function(ev, dados){
				let index_elemento = dados.INDEX;
				let tipo_solicitacao = FLUIGC.sessionStorage.getItem('tipo_solicitacao');

				switch(tipo_solicitacao){
					case 'demais_compras':
						$(`#cpInsumoPlanejDemaisCompras___${index_elemento}`).val(dados.DESCRICAO_INSUMO_PLANEJAMENTO);
						$(`#cpServicoDemaisCompras___${index_elemento}`).val(dados.DESCRICAO_SERVICO);
						$(`#cpCodProdutoPlanDemaisCompras___${index_elemento}`).val(dados.CODIGO_PRODUTO);
						$(`#cpCodServicoDemaisCompras___${index_elemento}`).val(dados.CODIGO_SERVICO);
						$(`#cpCodItemPlanejDemaisCompras___${index_elemento}`).val(dados.CODIGO_ITEM_PLANEJAMENTO);
						$(`#cpCodInsumoPlanejDemaisCompras___${index_elemento}`).val(dados.INSUMO_PLANEJAMENTO);
						$(`#cpCodContratoPlDemaisCompras___${index_elemento}`).val(dados.CODIGO_CONTRATO);
						break;
					case 'itens_ti':
						$(`#cpInsumoPlanejItensTi___${index_elemento}`).val(dados.DESCRICAO_INSUMO_PLANEJAMENTO);
						$(`#cpServicoItensTi___${index_elemento}`).val(dados.DESCRICAO_SERVICO);
						$(`#cpCodProdutoPlanItensTi___${index_elemento}`).val(dados.CODIGO_PRODUTO);
						$(`#cpCodServicoItensTi___${index_elemento}`).val(dados.CODIGO_SERVICO);
						$(`#cpCodItemPlanejItensTi___${index_elemento}`).val(dados.CODIGO_ITEM_PLANEJAMENTO);
						$(`#cpCodInsumoPlanejItensTi___${index_elemento}`).val(dados.INSUMO_PLANEJAMENTO);
						$(`#cpCodContratoPlItensTi___${index_elemento}`).val(dados.CODIGO_CONTRATO);
						break;
					case 'servicos':
						$(`#cpInsumoPlanejServicos___${index_elemento}`).val(dados.DESCRICAO_INSUMO_PLANEJAMENTO);
						$(`#cpServicoServicos___${index_elemento}`).val(dados.DESCRICAO_SERVICO);
						$(`#cpCodProdutoPlanServicos___${index_elemento}`).val(dados.CODIGO_PRODUTO);
						$(`#cpCodServicoServicos___${index_elemento}`).val(dados.CODIGO_SERVICO);
						$(`#cpCodItemPlanejServicos___${index_elemento}`).val(dados.CODIGO_ITEM_PLANEJAMENTO);
						$(`#cpCodInsumoPlanejServicos___${index_elemento}`).val(dados.INSUMO_PLANEJAMENTO);
						$(`#cpCodContratoPlServicos___${index_elemento}`).val(dados.CODIGO_CONTRATO);
						break;
				}

				$(`#cpCodObraFiscal`).val(dados.COD_OBRA_FISCAL);
			});
		}

		/**
		 * @description Binda os retornos callback dos Datepickers
		 * @return {[type]} [description]
		 */
		function bindCallbackDatepicker(){
			$(document).on('DataEntregaContratacao', function(ev, data) {
				let data_arr = data.split('/');
				let data_padrao_sistema = data_arr[2] + '-' + data_arr[1] + '-' + data_arr[0];
				let data_padrao_usuario = moment(data_padrao_sistema).format('DD/MM/YYYY');
				let validacao = true;
				let regras_validacao = {
					isDataMenorQueHoje: Bll.isDataMenorQueHoje(moment(data_padrao_sistema)),
					isFinalSemana: Bll.isFinalSemana(moment(data_padrao_sistema)),
					isFeriado: Bll.isFeriado(data_padrao_usuario)
				}

				for(let key in regras_validacao){
					if(regras_validacao[key] == true){
						if(key == 'isDataMenorQueHoje'){
							parent.FLUIGC.toast({
								type: 'warning',
								message: Mensagens.M0005
							});
						}
						else if(key == 'isFinalSemana'){
							parent.FLUIGC.toast({
								type: 'warning',
								message: Mensagens.M0007
							});
						}
						else{
							parent.FLUIGC.toast({
								type: 'warning',
								message: Mensagens.M0001
							});
						}

						$('#cpDataEntregaContratacao').val('');
					}
				}

				identifyTipoSolicitacao();
			});

			$(document).on('DataPrevisaoEntrega', function(ev, data) {
				var dataEntregaSplit = data.split('/')
				data = `${dataEntregaSplit[2]}/${dataEntregaSplit[1]}/${dataEntregaSplit[0]}`
				$('#cpPrazo_23').val(data + ' 18:00')

			});
		}

		/**
		 * @description Binda as funções e operações do Formulário
		 * @param  {[string]} cod_usuario_rede [Código do usuário de rede]
		 * @return {[type]}                  [description]
		 */
		function bindFormEvents(cod_usuario_rede){
			$('#btEmpresa').click(function(){
				Zoom.createZoomEmpresaUAU(cod_usuario_rede);
			});

			$('#btCentroCustoUau').click(function(){
				if($('#cpEmpresa').val() != '') {
					var dados = filtrarCentroCustoUau(cod_usuario_rede)
					Zoom.GetCentroCustoUau(dados);

				}
				else {
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0004
					});
				}
			});

			$('#btNomeFornecedor').click(function(){
				Zoom.getFornecedorUau();
			});

			$('#btAddItensTi').click(function(){
				let centro_custo_uau = $('#cpCentroCustoUau').val();

				if(centro_custo_uau != ''){
					addLinhaTabelaItensTI();
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0006
					});
				}
			});

			$('#btAddDemaisCompras').click(function(){
				let centro_custo_uau = $('#cpCentroCustoUau').val();

				if(centro_custo_uau != ''){
					addLinhaTabelaDemaisCompras();
					adicionarFornAprovado('tblAnaliseVerbaDemaisCompras');
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0006
					});
				}
			});

			$('#btAddServico').click(function(){
				let centro_custo_uau = $('#cpCentroCustoUau').val();

				if(centro_custo_uau != ''){
					addLinhaTabelaDemaisCompras();
					adicionarFornAprovado('tblAnaliseVerbaDemaisCompras');
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0006
					});
				}

				adicionaServico();
				//adicionarFornAprovado('tblAnaliseVerbaServicos');
			});

			$('#btAddSolicitacaoVerba').click(function(){
				addLinhaTabelaSolicitacaoVerba();
			});

			//FUNÇÃO CHANGE
			$('#cpTipoSolicitacao').change(function(){
				var cpTipoSolicitacao = $('#cpTipoSolicitacao').val();
				$('.divtpCompra').toggle(cpTipoSolicitacao == '1');
				$('.divServicoTerceiro').toggle(cpTipoSolicitacao == '2');

				var index = sessionStorage.getItem('indexReferencia')
				var fields = ['#cpComposicaoServicos___', '#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___',
					'#cpInsumoServico___', '#cpInsumoDemaisCompras___', '#cpItensCompra___'];
				removeTabelas(index, fields)
				Compartilhados.LimparCampos(['limparTpSolicitacao'])
				setValorCampoDescritor();
				setStatusElementos();

			});

			$('#tpCompra').change(function(){
				var index = sessionStorage.getItem('indexReferencia')
				var fields = ['#cpInsumoDemaisCompras___', '#cpInsumoItensTi___', '#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___'];
				removeTabelas(index, fields);
				setStatusElementos();

				var index = sessionStorage.getItem('indexReferencia')
				var fields = ['#cpDescricaoInsumoItensTi___', '#cpDescricaoInsumoDemaisCompras___', '#cpDescricaoInsumoServicos___'];
				removeTabelas(index, fields);
			});

			$('#cpAprovaIntegracao1').change(function(){
				$('.integraNovamente1').toggle($('#cpAprovaIntegracao1').val() == '2')
			});

			$('#cpAprovaIntegracao4').change(function(){
				$('.integraNovamente4').toggle($('#cpAprovaIntegracao4').val() == '2')
			});

			$('#cpAprovaFornecedoreVerba').change(function(){
				$('.ReprovaFornecedoreVerba').toggle($('#cpAprovaFornecedoreVerba').val() == '2')
			});

			$('#cpAprovaCompraN1').change(function(){
				$('.ReprovaCompraN1').toggle($('#cpAprovaCompraN1').val() == '2')
			});

			$('#cpAprovaCompraN3').change(function(){
				$('.ReprovaCompraN3').toggle($('#cpAprovaCompraN3').val() == '2')
			});

			$('#cpAprovaOrdemCompra').change(function(){
				$('#PrevisaoEntrega').toggle($('#cpAprovaOrdemCompra').val() == '1');
			});

			$('#cpAprovaConfSuprimentos').change(function(){
				var aprovado = $('#cpAprovaConfSuprimentos').val() == '1';
				$('#PossuiEstoque').toggle($('#tpCompra').val() == '1' && aprovado);
			});

			$('#cpAprovaConfSolicitante').change(function(){
				$('.ReprovadoConfSolicitante').toggle($('#cpAprovaConfSolicitante').val() == '2');
			});

			$('#cpNumeroCotacao').blur(function(){
				var $campo = $(this);

				if($campo.val() != ''){
					Dal.getPedidoCompraUAU(function(status, dados){
						if(!status){
							$campo.val('');

							parent.FLUIGC.toast({
								type: 'warning',
								message: Mensagens.M0009
							});
						}
					});
				}
			});
		}

		/**
		 * @description Identifica qual o tipo de solicitação
		 */
		function identifyTipoSolicitacao(){
			let $tipo_solicitacao = $('#cpTipoSolicitacao');
			let $tipo_compra = $('#tpCompra');
			let regras = {
				demais_compras: '1,2',
				itens_ti: '1,1',
				servicos: '2,'
			}

			for(let key in regras){
				if(regras[key] == `${$tipo_solicitacao.val()},${$tipo_compra.val()}`){
					FLUIGC.sessionStorage.setItem('tipo_solicitacao', key);
				}
			}
		}

		/**
		 * @description Configura o comportamento dos elementos, de acordo com condições específicas
		 */
		function setStatusElementos(){
			let $possui_estoque = $('#cpPossuiEstoque');
			let $tipo_solicitacao = $('#cpTipoSolicitacao');
			let $tipo_compra = $('#tpCompra');
			let $saldo_orcado_negativo = $('#hasSaldoOrcadoNegativo');
			let $aprova_conferencia_suprimentos = $('#cpAprovaConfSuprimentos');
			let $aprova_integracao_1 = $('#cpAprovaIntegracao1');
			let $aprova_integracao_4 = $('#cpAprovaIntegracao4');
			let $aprova_fornecedor_verba = $('#cpAprovaFornecedoreVerba');
			let $aprova_compra_n2 = $('#cpAprovaCompraN2');
			let $aprova_compra_n3 = $('#cpAprovaCompraN3');
			let $aprova_compra_n4 = $('#cpAprovaCompraN4');
			let $aprova_conferencia_solicitante = $('#cpAprovaConfSolicitante');
			let $aprova_ordem_compra = $('#cpAprovaOrdemCompra');

			$('.divtpCompra').toggle($tipo_solicitacao.val() == '1');
			$('.divServicoTerceiro').toggle($tipo_solicitacao.val() == '2');
			$('#tblAnaliseVerbaDemaisCompras').toggle($tipo_compra.val() == '2');
			$('#tblAnaliseVerbaServicos').toggle($tipo_solicitacao.val() == '2');
			$('.divItensTi').toggle($tipo_compra.val() == '1');
			$('.divDemaisCompras').toggle($tipo_compra.val() == '2');
			$('#solicitacaoVerba').toggle($saldo_orcado_negativo.val() == '1');
			$('#PossuiEstoque').toggle($tipo_compra.val() == '1' && $aprova_conferencia_suprimentos.val() == '1');
			$('.IntegraNovamente1').toggle($aprova_integracao_1.val() == '2');
			$('.IntegraNovamente4').toggle($aprova_integracao_4.val() == '2');
			$('.ReprovaFornecedoreVerba').toggle($aprova_fornecedor_verba.val() == '2');
			$('.ReprovaCompraN2').toggle($aprova_compra_n2.val() == '2');
			$('.ReprovaCompraN3').toggle($aprova_compra_n3.val() == '2');
			$('.FornAprovado').toggle(!$possui_estoque.val() == '1');
			$('.ReprovadoConfSolicitante').toggle($aprova_conferencia_solicitante.val() == '2');
			$('#PrevisaoEntrega').toggle($aprova_ordem_compra.val() == '1');
			$('.ReprovaCompraN4').toggle($aprova_compra_n4.val() == '2');
		}

		/**
		 * @description Adiciona Linha a tabela de Itens de TI
		 */
		function addLinhaTabelaItensTI(){
			let qtde_linhas_tabela = $('#tbItensTi tbody tr').length - 1;
			var index_tabela;

			if(qtde_linhas_tabela <= 30) {
				index_tabela = wdkAddChild('tbItensTi');
				FLUIGC.sessionStorage.setItem('indexItensTi', index_tabela);

				NewCompartilhados.enableButtonZoom([`#btbuscarProdUAUItensTi___${index_tabela}`,
				`#btInsumoPlanejItensTi___${index_tabela}`], ['0', '1', '2']);

				$(`#cpInsumoItensTi___${index_tabela}`).keyup(function() {
					createCampoAutoComplete(`cpInsumoItensTi___${index_tabela}`, 'retornoInsumoItensTi');
				});

				$(`#btbuscarProdUAUItensTi___${index_tabela}`).click(function() {
					let obra = $('#cpCodCentroCustoUau').val();

					sessionStorage.setItem('zoomProdutoUauItensTi', true);
					Zoom.createZoomProdutoUAU(index_tabela, obra);
				});

				$(`#btInsumoPlanejItensTi___${index_tabela}`).click(function(){
					let cod_empresa = $('#cpCodEmpresa').val();
					let cod_obra = $('#cpCodCentroCustoUau').val();
					let cod_produto = $(`#cpCodProdutoUAUItensTi___${index_tabela}`).val();
					let mes_corrente = moment().format('MM');
					let ano_corrente = moment().format('YYYY');

					if(cod_produto != ''){
						FLUIGC.sessionStorage.setItem('zoomPlanejamentoUAUItensTi', true);
						Zoom.createZoomPlanejamentosUAU(cod_empresa, cod_obra, cod_produto, mes_corrente, ano_corrente, index_tabela);
					}
					else{
						parent.FLUIGC.toast({
							type: 'danger',
							message: Mensagens.M0008
						});
					}
				});
			}
			else{
				parent.FLUIGC.toast({
					type: 'warning',
					message: Mensagens.M0015
				});
			}
		}

		/**
		 * @description Adiciona linha a tabela de Demais Compras
		 */
		function addLinhaTabelaDemaisCompras(){
			let qtde_linhas_tabela = $('#tbDemaisCompras tbody tr').length - 1;
			var index_tabela;

			if(qtde_linhas_tabela <= 30) {
				index_tabela = wdkAddChild('tbDemaisCompras');
				FLUIGC.sessionStorage.setItem('indexDemaisCompras', index_tabela);

				NewCompartilhados.enableButtonZoom([`#btbuscarProdUAUDemaisCompras___${index_tabela}`,
				`#btInsumoPlanejDemaisCompras___${index_tabela}`], ['0', '1', '2']);

				$(`#cpInsumoDemaisCompras___${index_tabela}`).keyup(function() {
					createCampoAutoComplete(`cpInsumoDemaisCompras___${index_tabela}`, 'retornoInsumoDemaisCompras');
				});

				$(`#btbuscarProdUAUDemaisCompras___${index_tabela}`).click(function() {
					let obra = $('#cpCodCentroCustoUau').val();

					sessionStorage.setItem('zoomProdutoUauDemaisCompras', true);
					Zoom.createZoomProdutoUAU(index_tabela, obra);
				});

				$(`#btInsumoPlanejDemaisCompras___${index_tabela}`).click(function(){
					let cod_empresa = $('#cpCodEmpresa').val();
					let cod_obra = $('#cpCodCentroCustoUau').val();
					let cod_produto = $(`#cpCodProdutoUAUDemaisCompras___${index_tabela}`).val();
					let mes_corrente = moment().format('MM');
					let ano_corrente = moment().format('YYYY');

					if(cod_produto != ''){
						FLUIGC.sessionStorage.setItem('zoomPlanejamentoUAUDemaisCompras', true);
						Zoom.createZoomPlanejamentosUAU(cod_empresa, cod_obra, cod_produto, mes_corrente, ano_corrente, index_tabela);
					}
					else{
						parent.FLUIGC.toast({
							type: 'danger',
							message: Mensagens.M0008
						});
					}
				});
			}
			else{
				parent.FLUIGC.toast({
					type: 'warning',
					message: Mensagens.M0015
				});
			}
		}

		/**
		 * @description Adiciona linha a tabela de Solicitação de Verba
		 */
		function addLinhaTabelaSolicitacaoVerba(){
			let qtde_linhas_tabela = $('#tbSolicitacaoVerba tbody tr').length - 1;
			let index_tabela;

			if(qtde_linhas_tabela <= 30) {
				index_tabela = wdkAddChild('tbSolicitacaoVerba');
				FLUIGC.sessionStorage.setItem('indexSolicitaVerba', index_tabela);

				NewCompartilhados.initilizeDatePicker([
					[`cpPeriodoLiberacao___${index_tabela}`, [0, 1, 2, 21]],
					[`cpPeriodoOrigemVerba___${index_tabela}`, [0, 1, 2, 21]],
					[`cpPeriodoDestinoVerba___${index_tabela}`, [0, 1, 2, 21]]
				]);

				$(`#cpTipoSolicitacaoVerba___${index_tabela}`).change(function() {

					var cpTipoSolicitacao = $(`#cpTipoSolicitacaoVerba___${index_tabela}`).val();
					$(`#cpProdutoLiberacao___${index_tabela}`).closest('.divLiberacaoVerba').toggle(cpTipoSolicitacao == '1');
					$(`#cpProdutoOrigem___${index_tabela}`).closest('.divRemanejVerba').toggle(cpTipoSolicitacao == '2');
				});

				$('.divLiberacaoVerba').toggle($('#cpTipoSolicitacaoVerba').val() == '1');
				$('.divRemanejVerba').toggle($('#cpTipoSolicitacaoVerba').val() == '2');

				$(`#cpEmpresaUAU___${index_tabela}`).val($('#cpEmpresa').val());
				$(`#cpObraUAU___${index_tabela}`).val($('#cpCentroCustoUau').val());
				$(`#cpNumPedidoCompras___${index_tabela}`).val($('#cpNumeroPedido').val().replace(/[[/"]/g, ''));
				$(`#cpNumChamadoCompras___${index_tabela}`).val($('#cpNumeroSolicitacao').val());

				$(`#btbuscarProdutoLiberacao___${index_tabela}`).click(function() {
					sessionStorage.setItem('zoomProdutoUauLiberacao', true);
					Zoom.createZoomProdutoUAU($('#cpCodCentroCustoUau').val());
				});

				$(`#btbuscarInsumoPlanej___${index_tabela}`).click(function() {
					verificarCodProduto('cpCodProdutoUAULiberacao___', index_tabela)
					sessionStorage.setItem('zoomPlanejamentoUAULiberacao', true)
					var data = Compartilhados.GetDateNow().split('/')
					Zoom.createZoomPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoUAULiberacao___${index_tabela}`).val(),
						data[1],
						data[2]
					);
				});

				$(`#btbuscarProdutoOrigem___${index_tabela}`).click(function() {
					sessionStorage.setItem('zoomProdutoUauOrigem', true);
					Zoom.createZoomProdutoUAU($('#cpCodCentroCustoUau').val());
				});

				$(`#btbuscarProdutoDestino___${index_tabela}`).click(function() {
					sessionStorage.setItem('zoomProdutoUauDestino', true);
					Zoom.createZoomProdutoUAU($('#cpCodCentroCustoUau').val());
				});
				$(`#cpInsumoOrigem___${index_tabela}`).keyup(function() {
					createCampoAutoComplete(`cpInsumoOrigem___${index_tabela}`, 'retornoInsumoOrigem');
				});
				$(`#cpInsumoDestino___${index_tabela}`).keyup(function() {
					createCampoAutoComplete(`cpInsumoDestino___${index_tabela}`, 'retornoInsumoDestino');
				});
			}
		}

		/**
		 * @description Adiciona linha a tabela de Serviços
		 */
		function addLinhaTabelaServicos(){
			let qtde_linhas_tabela = $('#tbContratacaoServicos tbody tr').length - 1;
			let index_tabela;

			if(numLinhas <= 30){
				index_tabela = wdkAddChild('tbContratacaoServicos');
				sessionStorage.setItem('indexServicos', index_tabela);

				NewCompartilhados.enableButtonZoom([`#btbuscarProdUAUServicos___${index_tabela}`, `#btComposicaoPlanejServicos___${index_tabela}`], ['0', '1', '2'])

				$(`#cpComposicaoServicos___${index_tabela}`).keyup(function() {
					createCampoAutoComplete(`cpComposicaoServicos___${index_tabela}`, 'retornoComposicaoServicos');
				});

				$(`#btbuscarProdUAUServicos___${index_tabela}`).click(function() {
					sessionStorage.setItem('zoomProdutoUauServicos', true)
					Zoom.createZoomProdutoUAU($('#cpCodCentroCustoUau').val());
				});

				$(`#btComposicaoPlanejServicos___${index_tabela}`).click(function() {
					verificarCodProduto('cpCodProdutoPlanServicos___', index_tabela)
					sessionStorage.setItem('zoomProdutoUauServicos', true)
					var data = Compartilhados.GetDateNow().split('/')
					Zoom.createZoomPlanejamentosUAU(
						$('#cpCodEmpresa').val(),
						$('#cpCodCentroCustoUau').val(),
						$(`#cpCodProdutoPlanServicos___${index_tabela}`).val(),
						data[1],
						data[2]);
				});
			}
		}

		/**
		 * @description Adiciona linha a tabela de fornecedores aprovados
		 * @param  {[type]} table [description]
		 * @return {[type]}       [description]
		 */
		function adicionarFornAprovado(table){
			var index = wdkAddChild(table);
			sessionStorage.setItem('indexReferencia', index);
		}

		/**
		 * @description Exclui a linha da tabela pai/filho
		 * @param  {[elemento html]} $elemento [description]
		 * @return {[type]}           [description]
		 */
		function deleteLinhaTabela($elemento){
			let tabela = $($elemento).data('tabela');

			switch(tabela){
				case 'demais_compras':
					removeFilhosFornAprovado($elemento, '#cpDescricaoInsumoDemaisCompras___');
					break;
				case 'itens_ti':
					removeFilhosFornAprovado($elemento, '#cpDescricaoInsumoItensTi___');
					break;
				case 'servicos':
					removeFilhosFornAprovado($elemento, '#cpDescricaoInsumoServicos___');
					break;
			}

			fnWdkRemoveChild($elemento);
		}

		/**
		 * @description Cria o campo autocomplete para buscar os Insumos e Composições
		 * @param  {[string]}   field    [description]
		 * @param  {Function} callback [description]
		 */
		function createCampoAutoComplete(field, callback){
			let campo_insumo = $(`#${field}`).val();
			var info_itens;

			if(campo_insumo.length > 3){
				Dal.getListaInsumosComposicaoUAU(campo_insumo, function(status, dados){
					if(status){
						info_itens = dados.map(function(insumo) {
							return{
								label: insumo.DESCRICAO,
								CAP: insumo.CAP,
								CODIGO: insumo.CODIGO,
								DESCRICAO: insumo.DESCRICAO,
								UNIDADE: insumo.UNIDADE,
								INDEX: field.split('___')[1]
							}
						});


					}
					else{
						parent.FLUIGC.toast({
	                        type: 'warning',
	                        message: Mensagens.M0002
	                    });
					}
				});

				NewCompartilhados.autoComplete(field, info_itens, 'callbackAutoCompleteInsumoComposicao', 5);
			}
		}

		/**
		 * @description Aplica mascara monetária nos campos apontados
		 * @param  {[float]} valor [Valor a ser alterado]
		 * @return {[string]}       [Valor com a máscara já aplicada]
		 */
		function mascaraValor(valor){
			if(valor > 0){
				valor = valor.toString().replace(/\D/g,"");
				valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
				valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
				valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");

				return valor;
			}
			else{
				valor = valor.toString().replace(/\D/g,"");
				valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
				valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
				valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");

				return "-" + valor;
			}
		}

		/**
		 * @description Cria um array contendo os feriados cadastrados no Fluig, e guarda na session
		 */
		function createInfoFeriados(){
			var arr_feriados = [];

			Dal.getFeriadosCadastradosFluig(function(status, obj_feriados){
				if(status != false){
					obj_feriados.items.forEach(function(feriado){
						arr_feriados.push(moment(feriado.date).format('DD/MM/YYYY'));
					});

					FLUIGC.sessionStorage.setItem('feriados', arr_feriados);
				}
			});
		}

		/**
		 * @description Busca os usuários por cada papel aprovador
		 * @return {[type]} [description]
		 */
		function listarUsuariosPorPapel(){
			Dal.getAprovadoresNivelEmpresaObraUAU(function(status, dados){
				let arr_papeis = [];
				let papel;
				let consulta_papel;

				if(status){
					if(dados[0].PAPELN1 != '' && dados[0].PAPELN1 != null){
						arr_papeis.push(dados[0].PAPELN1, dados[0].PAPELN2, dados[0].PAPELN3, dados[0].PAPELN4);

		                for(let i = 0; i < arr_papeis.length; i++){
		    				papel = arr_papeis[i];

							Dal.getPapelPorCodigo(papel, function(status, consulta_papel){
								if(status){
									consulta_papel.forEach(function(papel_item) {
					                    if(papel_item['workflowColleagueRolePK.roleId'] == papel){
					                       setUsuariosPapel(papel_item['workflowColleagueRolePK.colleagueId'], i);
					                    }
					                });
								}
								else{
									parent.FLUIGC.toast({
					                    type: 'warning',
					                    message: Mensagens.M0013
					                });
								}
							});
		    			}

						if(!hasUsuarioPAPELN1()) {
							Compartilhados.WarningToast('', `${Mensagens.M0010} ${dados[0].PAPELN1}`, 'danger');
							return false;
		    			}
					}
					else{
						NewCompartilhados.limparCampos(['limparCentroCusto']);
						parent.FLUIGC.toast({
		                    type: 'warning',
		                    message: Mensagens.M0011
		                });
					}
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0017
					});
				}
			});
		}

		/**
		 * @description Aplica os valores aos campos de hierarquia relacionaodos ao Solicitante
		 */
		function applyHierarquiaSolicitante(){
			let gestor_solicitante = FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GESTOR;
			let gerente_geral_solicitante = FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_GG;
			let superintendente_solicitante = FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_SUP;
			let diretor_solicitante = FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA_DIRETOR;

			$('#cpMatriculaGestorSolicitante').val(gestor_solicitante);
			$('#cpMatriculaGGSolicitante').val(gerente_geral_solicitante);
			$('#cpMatriculaSuperSolicitante').val(superintendente_solicitante);
			$('#cpMatriculaDiretorSolicitante').val(diretor_solicitante);
		}

		/**
		 * @description Busca e aplica o valor do campo descritor de acordo com Especificação
		 */
		function setValorCampoDescritor(){
			var obra_uau = $("#cpCentroCustoUau").val();
			var etapa_fluxo = parent.$("#textActivity").text();
			var tipo_solicitacao = $("#cpTipoSolicitacao").val();

			$('#cpDescritor').val(`${obra_uau} | ${etapa_fluxo} | ${tipo_solicitacao}`);
		}

		/**
		 * @TODO alterar funcionamento desta function
		 * @return {[type]} [description]
		 */
		function applyHierarquiaAprovadoresPorNivel(){
			let cod_obra = $('#cpCodCentroCustoUau').val();

			Dal.getAprovadoresNivelEmpresaObraUAU(function(status, dados){
				if(status){
					dados.forEach(function(item){
						if(item.CODOBRA == cod_obra){
							if(item.CHAPA_GESTOR != ''){
								$('#cpPapelN1').val(`Pool:Role:${item.PAPELN1}`);
								$('#cpPapelN2').val(`Pool:Role:${item.PAPELN2}`);
								$('#cpPapelN3').val(`Pool:Role:${item.PAPELN3}`);
								$('#cpPapelN4').val(`Pool:Role:${item.PAPELN4}`);
							}
							else{
								parent.FLUIGC.toast({
									type: 'warning',
									message: Mensagens.M0003
								});
							}
						}
					});
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0017
					});
				}
			});

			Bll.setRegrasNegocioAprovacao();
		}

		/**
		 * @description Preenche a tabela de Orçamento e fornecedores aprovados
		 * @param  {[int]} index       [description]
		 * @param  {[json]} json_pedido [description]
		 * @param  {[string]} tabela      [description]
		 */
		function fillTabelaPlanejamentoOrcamento(index, json_pedido, tabela){
			Dal.getPedidoCompraUAU(function(status, fornecedor){
				if(status){
					switch(tabela){
						case 'DemaisCompras':
							$(`#cpFornAprovadoDemaisCompras___${index}`).val(fornecedor[index - 1].NOME_FORNECEDOR);
							$(`#cpInsumoPlanejDemaisComprasApr___${index}`).val(json_pedido.DESCRICAO_INSUMO_PLANEJAMENTO);
							$(`#cpQuantidadeDemaisComprasAprov___${index}`).val(fornecedor[index - 1].QUANTIDADE);
							$(`#cpDescricaoInsumoDemaisCompras___${index}`).val(fornecedor[index - 1].NOME_INSUMO);
							$(`#cpUnidadeDemaisComprasAprovado___${index}`).val(fornecedor[index - 1].UNID_INS);
							$(`#cpUnitarioDemaisCompras___${index}`).val(fornecedor[index - 1].PRECO_UNITARIO);
							$(`#cpTotalDemaisCompras___${index}`).val(fornecedor[index - 1].TOTAL);
							$(`#cpOrcadoDemaisCompras___${index}`).val(json_pedido.SALDONAOBRA);
							$(`#cpSaldoDemaisCompras___${index}`).val(Bll.calcSaldoOrcamento(index));

							break;
						case 'ItensTi':
							$(`#cpFornAprovadoItensTi___${index}`).val(fornecedor[index - 1].NOME_FORNECEDOR);
							$(`#cpInsumoPlanejItensTiApr___${index}`).val(json_pedido.DESCRICAO_INSUMO_PLANEJAMENTO);
							$(`#cpQuantidadeItensTiAprov___${index}`).val(fornecedor[index - 1].QUANTIDADE);
							$(`#cpDescricaoInsumoItensTi___${index}`).val(fornecedor[index - 1].NOME_INSUMO);
							$(`#cpUnidadeItensTiAprovado___${index}`).val(fornecedor[index - 1].UNID_INS);
							$(`#cpUnitarioItensTi___${index}`).val(fornecedor[index - 1].PRECO_UNITARIO);
							$(`#cpTotalItensTi___${index}`).val(fornecedor[index - 1].TOTAL);
							$(`#cpOrcadoItensTi___${index}`).val(json_pedido.SALDONAOBRA);
							$(`#cpSaldoItensTi___${index}`).val(Bll.calcSaldoOrcamento(index));

							break;
						case 'Servicos':
							$(`#cpFornAprovadoServicos___${index}`).val(fornecedor[index - 1].NOME_FORNECEDOR);
							$(`#cpInsumoPlanejServicosApr___${index}`).val(json_pedido.DESCRICAO_INSUMO_PLANEJAMENTO);
							$(`#cpQuantidadeServicosAprov___${index}`).val(fornecedor[index - 1].QUANTIDADE);
							$(`#cpDescricaoInsumoServicos___${index}`).val(fornecedor[index - 1].NOME_INSUMO);
							$(`#cpUnidadeServicosAprovado___${index}`).val(fornecedor[index - 1].UNID_INS);
							$(`#cpUnitarioServicos___${index}`).val(fornecedor[index - 1].PRECO_UNITARIO);
							$(`#cpTotalServicos___${index}`).val(fornecedor[index - 1].TOTAL);
							$(`#cpOrcadoServicos___${index}`).val(json_pedido.SALDONAOBRA);
							$(`#cpSaldoServicos___${index}`).val(Bll.calcSaldoOrcamento(index));

							break;
					}
				}
				else{
					parent.FLUIGC.toast({
						type: 'danger',
						message: Mensagens.M0016
					});
				}
			});
		}

		/**
		 * @description Filtra as obras do UAU e popula o zoom
		 * @param  {[string]} usuario [description]
		 * @param  {[string]} empresa [description]
		 * @return {[json]}         [description]
		 */
		function getObraUAUPopulandoZoom(usuario, empresa){
			var obras_abertas;

			Dal.getObraUAU(usuario, empresa, function(status, dados){
				if(status){
					obras_abertas = dados.filter(function(obra){
						if(obra.STATUSOBRA == '0 - Andamento'){
							return obra;
						}
					});
				}
				else{
					parent.FLUIGC.toast({
						type: 'danger',
						message: Mensagens.M0012
					})
				}
			});

			return obras_abertas;
		}













		//=========================== FUNCTIONS A SEREM ATUALIZADAS AINDA


		function removeFilhosFornAprovado(element, field) {
			while (element != null) {
				if(element.id != null) {
					if(element.nodeName.toUpperCase() == "TR") {
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
				fields.forEach(function(field) {
					$(`${field}${i}`).closest('tr').remove();
				})
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

		function inserirMask(indexes) {
			indexes.forEach(index => {
				if(index != undefined){
					campos = [
						`#cpUnitarioItensTi___${index}`, `#cpUnitarioDemaisCompras___${index}`, `#cpUnitarioServicos___${index}`, `#cpOrcadoItensTi___${index}`,
						`#cpOrcadoDemaisCompras___${index}`, `#cpOrcadoServicos___${index}`, `#cpTotalItensTi___${index}`, `#cpTotalDemaisCompras___${index}`,
						`#cpTotalServicos___${index}`, `#cpSaldoDemaisCompras___${index}`, `#cpSaldoItensTi___${index}`, `#cpSaldoServicos___${index}`,
						`#cpTotalPedido`
					];

					formatarMask(campos);
				}
			});
		}

		function formatarMask(campos) {
			campos.forEach(campo => {
				if($(campo).val() != undefined){
					var valor_campo = parseFloat($(campo).val()).toFixed(2);

					$(campo).val(mascaraValor(valor_campo));
				}
			});
		}

		function verificarCodProduto(cpCodProduto, index) {
			var codProduto = $(`#${cpCodProduto}${index}`).val();
			if(codProduto == '') {
				throw Compartilhados.WarningToast('', Mensagens.M0008 + 'CÓDIGO DO PRODUTO', 'danger');
			}
		}

		function isPapelGestao() {
			var matriculaSolicitante = $('#cpMatriculaSolicitante').val()
			var inPaper = false
			var Usuarios = getUsuariosPapel()
			for (var index = 0; index < 4; index++) {
				Object.values(Usuarios)[index].forEach(usuario => {
					if(matriculaSolicitante == usuario) {
						inPaper = true;
					}
				});
			}
			return inPaper
		}

		function limparUsuariosPorPapel() {
			for (var index = 0; index < 4; index++) {
				Object.values(obj_papeis)[index].length = 0
			}
		}

		function atribuirMecAtividade21() {
			if(isPapelGestao()) {
				$('#cpMecAtribuicao_21').val($('#cpMatriculaSolicitante').val())

			} else {
				$('#cpMecAtribuicao_21').val($('#cpPapelN1').val())
			}
		}

		function verificarSeItenRepetido(index, dadosItem, cpCodItem, cpItem){
			if(index > 1) {
				for (let i = 0; i <= index; i++) {
					if(dadosItem.obj.CODIGO == $(`${cpCodItem}___${i}`).val()) {
						$(`${cpItem}___${index}`).val('')
						throw Compartilhados.WarningToast('', Mensagens.M0014, 'danger');
					}
				}
			}
		}

		function setUsuariosPapel(usuarios, index) {
			Object.values(obj_papeis)[index].push(usuarios);
		}

		function getUsuariosPapel(){
			return obj_papeis;
		}

		function hasUsuarioPAPELN1(){
			var hasUser = false;

			hasUser = getUsuariosPapel().PAPELN1.filter(usuario => {
				return usuario != ''
			});

			return hasUser;
		}

		return{
			constructor,
			deleteLinhaTabela
		}
	}

	return{
		getInstance: function(){
			if(!instance){
				instance = startInstance();
			}
			return instance;
		}
	}
})();
