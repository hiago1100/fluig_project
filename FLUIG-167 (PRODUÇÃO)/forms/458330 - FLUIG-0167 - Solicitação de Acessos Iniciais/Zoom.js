var ZOOM = (function () {
	var instance;

	function init() {

		var GetObraDepartamento = function () {
			var titulo = "Buscar Obra/Departamento";
			var data = Model.get_DS1000("SP_FLUIG_1024", "").values;
			var campos = [
				{ "title": "Obra/Departamento", "data": "SECAO", },
				{ "title": "Cod.Secao", "data": "CODSECAO", },
				{ "title": "Coligada", "data": "NOME_EMPRESA", "visible": false },
				{ "title": "Cód.Coligada", "data": "CODCOLIGADA", "visible": false },
				{ "title": "Gestor", "data": "NOME_GESTOR", "visible": false },
				{ "title": "Estado", "data": "ESTADO", "visible": false },
				{ "title": "ChapaGestor", "data": "CHAPA_GESTOR", "visible": false },
				{ "title": "ChapaGG", "data": "CHAPA_GG", "visible": false },
				{ "title": "Gerente Geral", "data": "NOME_GG", "visible": false },
				{ "title": "Chapa Gerente Geral", "data": "CHAPA_SUPER", "visible": false },

			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomObraSecao', ['PDF', 'EXCEL']);
		}

		var GetColaboradorAdmitido = function (codSecao, codColigada) {

			var titulo = "Buscar Colaborador";

			var data = Model.get_DS1000("SP_FLUIG_1023", `'${codSecao}', '${codColigada}'`).values;
			var campos = [
				{ "title": "Matrícula", "data": "CHAPA", },
				{ "title": "Nome", "data": "NOME", },
				{ "title": "Função", "data": "FUNCAO", },
				{ "title": "Data Admissão", "data": "DATAADMISSAO", },
				{ "title": "Cód.Coligada", "data": "CODCOLIGADA", "visible": false },
				{ "title": "Gestor", "data": "CHAPA_DIRETOR", "visible": false },
				{ "title": "Gerente Geral", "data": "CHAPA_GG", "visible": false }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaboradorSelecionado', ['PDF', 'EXCEL']);
		}

		return {

			GetObraDepartamento: GetObraDepartamento,
			GetColaboradorAdmitido: GetColaboradorAdmitido
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