var BLL = (function()
{
	var instance;

	function init()
	{
	
		var validaDataAdmissao = function(dados)
		{
			var retorno = true;

			var daysWeekDenied = ['Sat','Sun'];

			daysWeekDenied.forEach(function(obj)
			{ 
				if(dados.toDateString().indexOf(obj) > -1)
				{
					retorno = false;
				} 
			});

			var daysDenied = [21,22,23,24,25,26,27,28,29,30,31];

			daysDenied.forEach(function(obj)
			{ 
				if(dados.toDateString().indexOf(obj) > -1)
				{
					retorno = false;
				} 
			});

			return retorno;
		};

		return {
			validaDataAdmissao
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