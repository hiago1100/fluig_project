var ZOOM = (function()
{
	var instance;

	function init()
	{
		var getDepartamentoOrigem = function (login) {
            var titulo = "Buscar Obra/Departamento";

            var data = Model.get_DS1000('SP_FLUIG_1013',`${login}`).values;

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
				{ "title": "Chapa respónsavel Folha", "data": "FOLHA", "visible": false },
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomDpOrigemSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getDepartamentoDestino = function () {
            var titulo = "Buscar Obra/Departamento";

            var data = Model.get_DS1000('SP_FLUIG_1004','').values;

            var campos = [
				{ "title": "Obra/Departamento", "data": "SECAO" },
				{ "title" : "Cód. Empresa", "data" : "CODCOLIGADA" },//COD COLIGADA
				{ "title" : "Empresa", "data" : "NOME_EMPRESA" },
				{ "title" : "Estado", "data" : "ESTADO", "visible" : false },
				{ "title" : "Nome Gestor", "data" : "NOME_GESTOR", "visible" : false },
				{ "title" : "Gestor", "data" : "CHAPA_GESTOR", "visible" : false },
				{ "title" : "Código da Secao", "data" : "CODSECAO", "visible" : false },
				{ "title" : "Consultoria Destino", "data" : "CHAPA_CONSULTORA", "visible" : false },
				{ "title" : "Gerente Geral Destino", "data" : "CHAPA_GG", "visible" : false },
				{ "title" : "Superintendente Destino", "data" : "CHAPA_SUPER", "visible" : false },
				{ "title" : "Diretor Destino", "data" : "CHAPA_DIRETOR", "visible" : false },
				{ "title" : "Gerente", "data" : "NOME_GG", "visible" : false },
				{ "title" : "Nome Consultor", "data" : "NOME_CONSULTORA", "visible" : false },
				{ "title" : "OBRA/SEDE", "data" : "OBRA_SEDE", "visible" : false },
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomDpDestinoSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getDadosColaborador = function () {
            var titulo = "Dados Colaborador";
			let codSecao = sessionStorage.getItem("codSecaoOrigem");
			let codColigada = sessionStorage.getItem("codColigadaOrigem");

            var data = Model.get_DS1000('SP_FLUIG_1023',"'"+codSecao+"'"+","+codColigada).values;

            var campos = [
				{ "title": "Nome", "data": "NOME" },
				{ "title": "Função", "data": "FUNCAO" }
            ];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomColaboradorSelecionado', ['PDF', 'EXCEL']);
		}
		
		var getRecolhedorASO = function (codColigada,codSecao) {
            var titulo = "Dados Recolhedor ASO";

			var data = Model.get_DS1000('SP_FLUIG_1011',`'${codColigada}','${codSecao}'`).values

            var campos = [
				{ "title": "Nome", "data": "NOME" },
				{ "title": "Chapa", "data": "CHAPA", "visible" : false}
			];

            ZoomModal.getInstance().open(titulo, campos, data, 'ZoomRecolhedorASOSelecionado', ['PDF', 'EXCEL']);
		}
		

		return {
			getDepartamentoOrigem: getDepartamentoOrigem,
			getDepartamentoDestino: getDepartamentoDestino,
			getDadosColaborador: getDadosColaborador,
			getRecolhedorASO: getRecolhedorASO
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