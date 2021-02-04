var ZOOM = (function()
{
	var instance;

	function init()
	{
	
		//EXEMPLO
		var GetTodosCentroCusto = function ()
		{
			var titulo = "Buscar Obra/Departamento";
		    var data = Model.get_DS1000('SP_FLUIG_1024', '').values;
		    var campos = [
				{"title" : "Obra/Departamento", "data" : "SECAO"},
				{"title" : "Cod. Seção", "data" : "CODSECAO", "visible" : false},
				{"title" : "Cod. Coligada", "data" : "CODCOLIGADA", "visible" : false},
				];

		    ZoomModal.getInstance().open(titulo, campos, data, 'ZoomSecaoSelecionada', ['PDF', 'EXCEL']);
		};

		return {
			GetTodosCentroCusto
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