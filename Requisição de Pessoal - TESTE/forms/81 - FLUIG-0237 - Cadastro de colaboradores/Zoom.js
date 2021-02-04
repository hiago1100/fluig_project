var ZOOM = (function()
{
	var instance;

	function init()
	{
	
		var getFuncoes = function (codColigada, codSecao, tipoMaoObra) 
		{
	        var titulo = "Buscar funções";
	        var data = Model.get_DS1000('SP_FLUIG_1049',`'${codColigada}','%','${codSecao}','${tipoMaoObra}'`).values
	        var campos = [
				{ "title": "Função", "data": "nome" },
				{ "title": "Codigo", "data": "codigo", "visible": false },
				{ "title": "MaoDeObra", "data": "MaoDeObra", "visible": false }
	        ];

	        ZoomModal.getInstance().open(titulo, campos, data, 'ZoomFuncaoSelecionada', ['PDF', 'EXCEL']);
		};

		var getSalarios = function (codColigada, codSecao, codFuncao) 
		{
	        var titulo = "Buscar salarios";
	        var data = Model.get_DS1000('SP_FLUIG_1066',`'${codFuncao}','${codSecao}','${codColigada}'`).values
	        var campos = [
				{ "title": "Função", "data": "SALARIO" }
	        ];

	        ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSalarioSelecionada', ['PDF', 'EXCEL']);
		};

		var getHorarios = function (codColigada) 
		{
	        var titulo = "Buscar horarios";
	        var data = 	Model.get_DS1000('SP_FLUIG_1067',`'${codColigada}'`).values;
	        var campos = [
				{ "title": "Horario", "data": "HORARIO" },
				{ "title": "Codigo", "data": "CODHORARIO", "visible": false }
	        ];

	        ZoomModal.getInstance().open(titulo, campos, data, 'ZoomHorariosSelecionada', ['PDF', 'EXCEL']);
		};

		var getTodosCentroCusto = function ()
		{
		    var titulo = "Buscar Obra/Departamento";
			var data = Model.get_DS1000('SP_FLUIG_1004','').values;
		    var campos = [
				{"title" : "Obra/Departamento", "data" : "SECAO"},
				{"title" : "Cod. Seção", "data" : "CODSECAO", "visible" : false},
				{"title" : "Cod. Coligada", "data" : "CODCOLIGADA", "visible" : false},
				];

		    ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSecaoColaboradorRecrutamentoInternoSelecionada', ['PDF', 'EXCEL']);
		};

		var getColaboradoresSecao = function(coligada,secao)
		{
		    var titulo = "Busca Colaboradores";
			var data = Model.get_DS1000('SP_FLUIG_1023',`'${secao}',${coligada}`).values;
		    var campos = [
            {"title" : "Nome", "data" : "NOME"},
            {"title" : "Matrícula", "data" : "CHAPA"},
            {"title" : "Cargo", "data" : "FUNCAO"},
            {"title" : "Data de Admissão", "data" : "DATAADMISSAO"},
            {"title" : "Gerente Geral", "data" : "CHAPA_GG", "visible": false},
            {"title" : "Superintendente", "data" : "CHAPA_SUP", "visible": false},
            {"title" : "Diretor", "data" : "CHAPA_DIRETOR", "visible": false},
            {"title" : "Data nascimento", "data" : "DTNASCIMENTO", "visible": false},
            {"title" : "Situação", "data" : "SITUACAO", "visible": false},
            {"title" : "Idade", "data" : "IDADE", "visible": false},
            { "title": "CTPS", "data": "CARTEIRATRAB", "visible": false },
			{ "title": "Coligada", "data": "CODCOLIGADA", "visible": false },
			{ "title": "Nome gerente geral", "data": "NOME_GG", "visible": false },
            { "title": "Nome gestor", "data": "NOME_GESTOR", "visible": false }
		    ];

		    ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaboradorRecrutamentoInternoSelecionada', ['PDF', 'EXCEL']);
		};


		return {
			getFuncoes,
			getSalarios,
			getHorarios,
			getTodosCentroCusto,
			getColaboradoresSecao
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