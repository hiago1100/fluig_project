var ZOOM = (function () {
	var instance;
	function init() {

		var GetEmpresa = function (codUsuarioRede) {
			var titulo = "Buscar Empresa";
			
				var data = Model.get_DS1000("SP_FLUIG_1090", `${codUsuarioRede}, ''`).values;
				if(data.length == 0) throw Compartilhados.WarningToast('', Mensagens.M0012, 'danger')
			
			var campos = [
				{ "title": "Código", "data": "CODEMPRESA" },
				{ "title": "Descricao", "data": "EMPRESA" },
				{ "title": "Cnpj", "data": "CNPJ" },
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomEmpresa', ['PDF', 'EXCEL']);
		};

		var GetCentroCustoUau = function (dados) {
			var titulo = "Buscar Centro de Custo";

			var campos = [
				{ "title": "Empresa", "data": "CODOBRA", },
				{ "title": "Obra", "data": "DESCRICAOOBRA", },
			];

			ZoomModal.getInstance().open(titulo, campos, dados, 'ZoomCentroCustoUau', ['PDF', 'EXCEL']);
		};

		var GetFornecedorUau = function () {
			var titulo = "Busca Fornecedor Uau";
			window.loadingLayer.show();
			var data = Model.get_DS1000('SP_FLUIG_1018', '').values;
			window.loadingLayer.hide();
			var campos = [
				{ "title": "Codigo", "data": "COD_SOCIO" },
				{ "title": "Nome", "data": "SOCIO" },

			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomFornecedorUau', ['PDF', 'EXCEL']);
		};

		var GetProdutosUAU = function (codObra) {
			var titulo = "Buscar Produto";
			var data = Model.get_DS1000("SP_FLUIG_1055", `'${codObra}'`).values;
			var campos = [
				{ "title": "Cod.Produto", "data": "CODPRODUTO", },
				{ "title": "Produto", "data": "DESCRICAO", }

			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomProdutoUAU', ['PDF', 'EXCEL']);
		};

		var GetPlanejamentosUAU = function (codEmpresa, codObra, codProduto, mes, ano) {
			var titulo = "Buscar Planejamento UAU";
			var data = Model.get_DS1000("SP_FLUIG_1082", `'${codEmpresa}', '${codObra}', '${codProduto}', '${ano}', '${mes}' `).values;

			var campos = [
				{ "title": "Cod.Planejamento", "data": "CODIGO_ITEM_PLANEJAMENTO", },
				{ "title": "Descrição", "data": "DESCRICAO_INSUMO_PLANEJAMENTO", },
				{ "title": "Contrato", "data": "CODIGO_CONTRATO", },
				{ "title": "Item", "data": "INSUMO_PLANEJAMENTO", }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomPlanejamentoUAU', ['PDF', 'EXCEL']);
		};

		return {
			GetEmpresa,
			GetCentroCustoUau,
			GetFornecedorUau,
			GetPlanejamentosUAU,
			GetProdutosUAU,
			GetFornecedorUau
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