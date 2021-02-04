const ZOOM = (function () {
	var instance;

	function startInstance() {
		var Dal = DAL.getInstance();
		var CallZoom = ZoomModal.getInstance();

		function createZoomEmpresaUAU(usuario){
			const TITULO = "Buscar Empresa";
			const FORMAS_EXPORTACAO = ['PDF', 'EXCEL'];
			const CAMPOS = [
				{ "title": "Código", "data": "CODEMPRESA" },
				{ "title": "Descrição", "data": "EMPRESA" },
				{ "title": "CNPJ", "data": "CNPJ" }
			];

			Dal.getEmpresaUAU(usuario, function(status, dados){
				if(status){
					CallZoom.open(TITULO, CAMPOS, dados, 'callbackZoomEmpresa', FORMAS_EXPORTACAO);
				}
				else{
					parent.FLUIGC.toast({
						type: 'danger',
						message: Mensagens.M0012
					});
				}
			});
		}

		function getCentroCustoUau(dados){
			var titulo = "Buscar Centro de Custo";

			var campos = [
				{ "title": "Código", "data": "CODOBRA"},
				{ "title": "Obra", "data": "DESCRICAOOBRA"}
			];

			ZoomModal.getInstance().open(titulo, campos, dados, 'ZoomCentroCustoUau', ['PDF', 'EXCEL']);
		}

		function getFornecedorUau(){
			var titulo = "Busca Fornecedor Uau";
			window.loadingLayer.show();
			var data = Model.get_DS1000('SP_FLUIG_1018', '').values;
			window.loadingLayer.hide();
			var campos = [
				{ "title": "Codigo", "data": "COD_SOCIO" },
				{ "title": "Nome", "data": "SOCIO" },

			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomFornecedorUau', ['PDF', 'EXCEL']);
		}

		function createZoomProdutoUAU(index, obra){
			const TITULO = "Buscar Produto UAU";
			const TIPOS_EXPORTACAO = ['PDF', 'EXCEL'];
			const CAMPOS = [
				{ "title": "Cod.Produto", "data": "CODPRODUTO"},
				{ "title": "Produto", "data": "DESCRICAO"}
			];

			Dal.getProdutoUAU(obra, function(status, dados){
				if(status){
					dados.forEach(function(item){
						item.INDEX = index;
					});

					CallZoom.open(TITULO, CAMPOS, dados, 'callbackZoomProdutoUAU', TIPOS_EXPORTACAO);
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0019
					});
				}
			});
		}

		function createZoomPlanejamentosUAU(empresa, obra, produto, mes, ano, index) {
			const TITULO = "Buscar Planejamento UAU";
			const TIPOS_EXPORTACAO = ['PDF', 'EXCEL'];
			const CAMPOS = [
				{ "title": "Código", "data": "CODIGO_ITEM_PLANEJAMENTO"},
				{ "title": "Descrição", "data": "DESCRICAO_INSUMO_PLANEJAMENTO"},
				{ "title": "Contrato", "data": "CODIGO_CONTRATO"},
				{ "title": "Item", "data": "INSUMO_PLANEJAMENTO"}
			];

			Dal.getPlanejamentoUAU(empresa, obra, produto, mes, ano, function(status, dados){
				if(status){
					dados.forEach(function(item){
						item.INDEX = index;
					});

					console.log(dados);
					CallZoom.open(TITULO, CAMPOS, dados, 'callbackZoomPlanejamentoUAU', TIPOS_EXPORTACAO);
				}
				else{
					parent.FLUIGC.toast({
						type: 'warning',
						message: Mensagens.M0018
					});
				}
			});
		}

		return{
			createZoomEmpresaUAU,
			getCentroCustoUau,
			getFornecedorUau,
			createZoomPlanejamentosUAU,
			createZoomProdutoUAU,
			getFornecedorUau
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
