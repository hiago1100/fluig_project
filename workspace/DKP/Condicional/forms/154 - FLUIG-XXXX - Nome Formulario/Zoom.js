var ZOOM = (function()
{
	var instance;

	function init()
	{
	
		//EXEMPLO
		var GetTodosCentroCusto = function() {

			var zoom = new Zoom();
		    zoom.Id = Math.floor((Math.random() * 10000) + 1);
			zoom.Titulo = "Buscar Obra/Departamento";

			zoom.Colunas = [
				{"title" : "Obra/Departamento", "name" : "SECAO"},
				{"title" : "Cod. Seção", "name" : "CODSECAO", "display" : false},
				{"title" : "Cod. Coligada", "name" : "CODCOLIGADA", "display" : false},
				];

			zoom.Retorno = function(retorno) {

				
				$(document).trigger('ZoomSecaoSelecionada', 
	            {
				  nome: retorno[0],
				  codSecao: retorno[1],
				  codColigada: retorno[2],
	            });

			};

		    zoom.setPreData(Model.get_DS0006());
			zoom.Abrir();
		};

		return {
			GetTodosCentroCusto: GetTodosCentroCusto
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