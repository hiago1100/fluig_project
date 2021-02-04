var ZOOM = (function()
{
	var instance;

	function init()
	{
		var getDepartamento = function (login) {
            var titulo = "Buscar Obra/Departamento";

            var data = Model.get_DS1000('SP_FLUIG_1013',login).values;

            var campos = [
				{ "title": "Obra/Departamento", "data": "DEPARTAMENTO" },
				{ "title": "Empresa", "data": "EMPRESA"},
				{ "title": "Cód. Empresa", "data": "CODCOLIGADA"},
				{ "title": "Estado", "data": "ESTADO", "visible": false },
				{ "title": "Nome gestor", "data": "NOME_GESTOR", "visible": false },
				{ "title": "Chapa gestor", "data": "GESTOR", "visible": false },
				{ "title": "Obra Parceira", "data": "CODPARCEIRO", "visible": false },
				{ "title": "Nome Parceiro", "data": "NOMEPARCEIRO", "visible": false },              
                { "title": "Chapa GG", "data": "CHAPA_GG", "visible": false },
                { "title": "Nome GG", "data": "NOME_GG", "visible": false },
                { "title": "Chapa superintendente", "data": "SUP", "visible": false },
                { "title": "Nome superintendente", "data": "NOME_SUP", "visible": false },
                { "title": "Chapa diretor", "data": "DIRETOR", "visible": false },
				{ "title": "Nome diretor", "data": "NOME_DIRETOR", "visible": false },
				{ "title": "Consultor RH", "data": "CHAPA_CONSULTORA", "visible": false },
				{ "title": "Obra/Sede", "data": "OBRAOUSEDE", "visible": false },
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomDepartamentoSelecionado', ['PDF', 'EXCEL']);
		}

		
		var getPostoTrabalho = function () {
            var titulo = "Posto de trabalho";
            var coligada = $('#cpCodColigadaDepartamento').val();

            var data = Model.get_DS1000('SP_FLUIG_1029', coligada).values;

            var campos = [
				{ "title": "Cod Posto", "data": "CODPOSTO" },
				{ "title": "Descrição", "data": "DESCRICAO" },
				{ "title": "Tipo de Posto", "data": "TIPOPOSTO" },
				
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomPostoTrabalhoSelecionado', ['PDF', 'EXCEL']);
		}
		var getColaborador = function (codSecao,codColigada) {
            var titulo = "Buscar Colaborador";

			var data = Model.get_DS1000('SP_FLUIG_1023', `'${codSecao}','${codColigada}'`).values;

            var campos = [
				{ "title": "Nome", "data": "NOME" },
				{ "title": "Matrícula", "data": "CHAPA" },				
				{ "title": "Data de Admissão", "data": "DATAADMISSAO"},				
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaboradorSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getRecolhedorASO = function (codColigada,codSecao) {
            var titulo = "Dados Recolhedor ASO";

			var data = Model.get_DS1000('SP_FLUIG_1011',`'${codColigada}','${codSecao}'`).values;

            var campos = [
				{ "title": "Nome", "data": "NOME" },
				{ "title": "Chapa", "data": "CHAPA", "visible" : false}
			];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomRecolhedorASOSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getSalario = function (codFuncao,codSecao,codColigada) {
            var titulo = " Buscar Salário";

			var data = Model.get_DS1000('SP_FLUIG_1066',`'${codFuncao}','${codSecao}','${codColigada}'`).values;

            var campos = [
				{ "title": "Salário", "data": "SALARIO" },
			];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSalarioSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getHorario = function (codColigada) {
            var titulo = " Buscar Horário";

			var data = Model.get_DS1000('SP_FLUIG_1067',`'${codColigada}'`).values;

            var campos = [
				{ "title": "Cod horario", "data": "CODHORARIO", "visible" : false },
				{ "title": "Horário", "data": "HORARIO"},
			];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomHorarioSelecionado', ['PDF', 'EXCEL']);
		}
		

		return {
            getColaborador:  getColaborador,
			getDepartamento: getDepartamento,
			getPostoTrabalho: getPostoTrabalho,
			getRecolhedorASO: getRecolhedorASO,
			getSalario: getSalario,
			getHorario: getHorario
		};
	}

	return {
		getInstance: function()
		{
			if (!instance)
			{
				instance = init();
			}

			return instance;
		}
	}
})();