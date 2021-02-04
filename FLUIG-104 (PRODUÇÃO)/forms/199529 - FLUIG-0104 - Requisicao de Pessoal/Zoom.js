var ZOOM = (function () {
	var instance;

	function init() {

		//ZOOM BUSCA POSTO DE TRABALHO
		function getPostoTrabalho(codColigada, cpTipoPosto) {

			var titulo = "Buscar Posto de Trabalho";

			/* var data = Model.get_DS1000('SP_FLUIG_1004', '').values;
			var campos = [

				{ "title": "Obra / Departamento", "data": "SECAO" },
				{ "title": "Cod Secao", "data": "CODSECAO", "visible": false },
				{ "title": "Cod Coligada", "data": "CODCOLIGADA", "visible": false },
				{ "title": "Gestor", "data": "NOME_GESTOR", "visible": false },
				{ "title": "Gerente Geral", "data": "NOME_GG", "visible": false },
				{ "title": "Gestor", "data": "CHAPA_GESTOR", "visible": false },
				{ "title": "Obra ou Sede", "data": "OBRA_SEDE", "visible": false },
				{ "title": "Folha", "data": "CHAPA_FOLHA", "visible": false },
				{ "title": "", "data": "CHAPA_CONSULTORA", "visible": false },
				{ "title": "", "data": "CHAPA_DIRETOR", "visible": false },
				{ "title": "", "data": "CHAPA_GG", "visible": false },
				{ "title": "", "data": "CHAPA_SUPER", "visible": false },
			]; */

			var data = Model.get_DS1000('SP_FLUIG_1029', `'${codColigada}'`).values;
			var campos = [
				{ "title": "Código", "data": "CODPOSTO" },
				{ "title": "Descrição", "data": "DESCRICAO" },
				{ "title": "Tipo Posto", "data": "TIPOPOSTO" },
			];

			data = data.filter(function (obj) {
				return obj.TIPOPOSTO == cpTipoPosto;
			});

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomPostoTrabalho', ['PDF', 'EXCEL']);
		}

		return {

			getPostoTrabalho: getPostoTrabalho

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