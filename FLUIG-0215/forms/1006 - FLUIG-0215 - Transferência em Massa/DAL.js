var DAL = (function()
{
	var instance;

	function init()
	{
		var getPeriodoFerias = function (chapa, coligada)
		{
			return Model.get_DS1000('SP_FLUIG_1079', `'${chapa}','${coligada}'`).values;
		};

		var getFeriasMarcadas = (chapa, coligada, fimPeriodoAquisitivo) =>
		{
			return Model.get_DS1000('SP_FLUIG_1080', `'${chapa}','${coligada}','${fimPeriodoAquisitivo}'`).values;
		};

		return {
			getPeriodoFerias: getPeriodoFerias,
			getFeriasMarcadas: getFeriasMarcadas
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