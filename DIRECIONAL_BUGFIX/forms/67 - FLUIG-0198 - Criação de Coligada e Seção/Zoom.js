var ZOOM = (function () {
	var instance;
	var _model = model.getInstance();

	function init() {
		var GetTodosCentroCusto = function () {
			var titulo = "Buscar Obra/Departamento";

			var data = _model.get1007('');

			var campos = [{
					"title": "CodEmpresa",
					"data": "CODEMPRESA"
				},
				{
					"title": "Empresa",
					"data": "EMPRESA"
				},
				{
					"title": "CNPJ",
					"data": "CNPJ"
				},
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSecaoSelecionada', ['PDF', 'EXCEL']);

		};

		var GetTodosSecaoAtivas = function () {
			var titulo = "Buscar Obra/Departamento";

			var data = Model.get_DS1000('SP_FLUIG_1004', '').values;

			var campos = [{
					"title": "Seção",
					"data": "SECAO"
				},
				{
					"title": "Cod.Seção",
					"data": "CODSECAO"
				},
				{
					"title": "Cod.Coligada",
					"data": "CODCOLIGADA"
				},
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSecaoAtivasSelecionada', ['PDF', 'EXCEL']);

		};

		var GetColaborador = function (filter) {
			var titulo = "Buscar Colaborador";

			var data = Model.get_DS1000('SP_FLUIG_1062', `'${filter}'`).values;

			var campos = [{
					"title": "Colaborador",
					"data": "NOME"
				},
				{
					"title": "Chapa",
					"data": "CHAPA"
				},
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaboradorSelecionado', ['PDF', 'EXCEL']);
		};

		var GetbuscaRespFolhaRm = function () {
			var titulo = "Buscar Colaborador";

			var data = Model.get_DS1000('SP_FLUIG_1065', '').values;

			var campos = [{
					"title": "Colaborador",
					"data": "NOME"
				},
				{
					"title": "Chapa",
					"data": "CHAPA"
				},
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomResponsavelSelecionado', ['PDF', 'EXCEL']);
		};

		var GetEmpresaUAU = function (filter) {
			var titulo = "Buscar Obra/Empresa";

			var data = Model.get_DS1000('SP_FLUIG_1063', `'${filter}'`).values;

			var campos = [{
					"title": "Cod.Obra",
					"data": "CODOBRA"
				},
				{
					"title": "Obra",
					"data": "OBRA"
				},
				//  {"title" : "Cod.Empresa", "data" : "CODEMPRESA"}
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomEmpresaUAU', ['PDF', 'EXCEL']);
		}

		var GetEmpresasRM = function () {
			var titulo = "Buscar Cod/Empresa";

			var data = Model.get_DS1000('SP_FLUIG_1061', '').values;

			var campos = [{
					"title": "Cod.Empresa",
					"data": "CODEMPRESARM"
				},
				{
					"title": "Empresa",
					"data": "EMPRESARM"
				}
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomEmpresasRM', ['PDF', 'EXCEL']);

		}

		var GetDadosUau = function () {
			var titulo = "Buscar Dados Empresa";

			var data = Model.get_DS1000('SP_FLUIG_1007', '').values;

			var campos = [{
					"title": "Cod.Empresa",
					"data": "CODEMPRESA"
				},
				{
					"title": "Empresa",
					"data": "EMPRESA"
				}
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomEmpresasRM', ['PDF', 'EXCEL']);

		}

		return {
			GetTodosCentroCusto: GetTodosCentroCusto,
			GetColaborador: GetColaborador,
			GetEmpresaUAU: GetEmpresaUAU,
			GetEmpresasRM: GetEmpresasRM,
			GetTodosSecaoAtivas: GetTodosSecaoAtivas,
			GetbuscaRespFolhaRm: GetbuscaRespFolhaRm,
			GetDadosUau: GetDadosUau
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