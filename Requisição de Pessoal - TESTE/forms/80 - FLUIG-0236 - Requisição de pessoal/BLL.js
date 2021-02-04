var BLL = (function()
{
	var instance;

	function init()
	{
		function getDescricaoTipoSecao(codigo)
		{
			var obj = [
						{codigo: '01', descricao: 'Sede'},
						{codigo: '02', descricao: 'Obra'},
						{codigo: '03', descricao: 'Escritorio obra'},
						{codigo: '04', descricao: 'Escritorio sede'}
					];
			
			return obj.find(function(item){ return item.codigo == codigo}).descricao;
		};

		function getDescricaoConstrutor(codigo)
		{
			var obj = [
						{codigo: 'false', descricao: 'Não'},
						{codigo: 'true', descricao: 'Sim'},
						{codigo: '', descricao: 'Não'},
					];
			
			return obj.find(function(item){ return item.codigo == codigo}).descricao;
		};

		return {
			getDescricaoTipoSecao,
			getDescricaoConstrutor
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