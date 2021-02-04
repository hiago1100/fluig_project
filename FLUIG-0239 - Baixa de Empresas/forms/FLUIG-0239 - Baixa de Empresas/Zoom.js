var ZOOM = (function()
{
	var instance;

	function init()
	{

		var callZoom = ZoomModal.getInstance();
		var getEmpresaUau = function () {
            const FORMAS_EXPORTACAO =  ['PDF', 'EXCEL'];
            const CALLBACK = 'ZoomDpOrigemSelecionado';
            const TITULO = "Buscar Obra/Departamento";
            const DATA = model.getInstance().get1007('',"","");
            const CAMPOS = [
				{ "title": "Código", "data": "CODEMPRESA" },
				{ "title": "Descrição", "data": "EMPRESA"},
				{ "title": "CNPJ", "data": "CNPJ"}
            ];
            callZoom.open(TITULO, CAMPOS, DATA, CALLBACK,FORMAS_EXPORTACAO);
		}
		
		return {
			getEmpresaUau
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