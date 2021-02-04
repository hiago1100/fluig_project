var ZOOM = (function () {
	var instance;

	function init() {

		//ZOOM BUSCA OBRA DEPARTAMENTO
		function getObraDepartamento() {

			var titulo = "Buscar Obra/Departamento";
			var data = Model.get_DS1000('SP_FLUIG_1004', '').values;
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
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomObraDepartamento', ['PDF', 'EXCEL']);

		}

		//ZOOM BUSCA COLABORADOR
		function getColaborador(codSecao, codColigada) {

			var titulo = "Buscar Colaborador";
			var data = Model.get_DS1000('SP_FLUIG_1023', `'${codSecao}','${codColigada}'`).values;
			var campos = [
				{ "title": "Matrícula", "data": "CHAPA" },
				{ "title": "Colaborador", "data": "NOME" },
				{ "title": "Função", "data": "FUNCAO", "visible": false },
				{ "title": "Data Admissão", "data": "DATAADMISSAO", "visible": false },
				{ "title": "Código função", "data": "CODFUNCAO", "visible": false },
				{ "title": "Salário", "data": "SALARIO", "visible": false },
				{ "title": "DT NASCIMENTO", "data": "DTNASCIMENTO", "visible": false },
				{ "title": "IDADE", "data": "IDADE", "visible": false }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaborador', ['PDF', 'EXCEL']);
		}

		function getFuncao(codSecao, codColigada) {
			var titulo = "Buscar Função";
			var data = Model.get_DS1000('SP_FLUIG_1035', `'${codSecao}','${codColigada}'`).values;
			var campos = [
				{ "title": "Função", "data": "NOME" },
				{ "title": "Código", "data": "CODIGO", "visible": false }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomFuncao', ['PDF', 'EXCEL']);
		}

		//ZOOM BUSCA HORARIO DE TRABALHO EXCECAO
		function getHorarioTrabalho(codColigada) {

			var titulo = "Buscar Horário de Trabalho";
			var data = Model.get_DS1000('SP_FLUIG_1067', `'${codColigada}'`).values;
			var campos = [
				{ "title": "Horário", "data": "HORARIO" },
				{ "title": "Código", "data": "CODHORARIO", "visible": false }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomHorarioTrabalho', ['PDF', 'EXCEL']);
		}

		//ZOOM BUSCA POSTO DE TRABALHO
		function getPostoTrabalho(codColigada, cpTipoPosto) {

			var titulo = "Buscar Posto de Trabalho";
			var data = Model.get_DS1000('SP_FLUIG_1029', `'${codColigada}'`).values;
			var campos = [
				{ "title": "Código", "data": "CODPOSTO" },
				{ "title": "Horário", "data": "DESCRICAO" },
				{ "title": "Tipo Posto", "data": "TIPOPOSTO", "visible": false },

			];

			data = data.filter(function (obj) {
				return obj.TIPOPOSTO == cpTipoPosto;
			});

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomPostoTrabalho', ['PDF', 'EXCEL']);
		}

		//ZOOM BUSCA RESPONSAVEL PELO RECOLHIMENTO DA DOCUMENTACAO
		function getRecolhimentoDoc(codColigada, codSecao) {

			var titulo = "Buscar Responsável por recolher documentação";
			var data = Model.get_DS1000('SP_FLUIG_1011', `'${codColigada}','${codSecao}'`).values;
			var campos = [
				{ "title": "Chapa Responsável", "data": "CHAPA" },
				{ "title": "Responsável", "data": "NOME" }
			];

			ZoomModal.getInstance().open(titulo, campos, data, 'ZoomRecolhimentoDoc', ['PDF', 'EXCEL']);

		}

		return {

			getObraDepartamento: getObraDepartamento,
			getColaborador: getColaborador,
			getFuncao: getFuncao,
			getHorarioTrabalho: getHorarioTrabalho,
			getRecolhimentoDoc: getRecolhimentoDoc,
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