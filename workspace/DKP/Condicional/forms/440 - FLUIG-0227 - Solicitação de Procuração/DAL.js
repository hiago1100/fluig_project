var DAL = (function()
{
	var instance;

	function init(){
	    var getPeriodoAtivo = function (){
			var cache = {};
			return function(chapa, coligada) {
				var key = chapa + '_' + coligada,
				safeChapa = chapa + '',
				safeColigada = coligada + '';
				return cache[key] || (cache[key] = DatasetFactory.getDataset('DS_FLUIG_DATASERVER_0002', [safeChapa, safeColigada], null, null).values[0]);
			};
		}
		
		var getFeriasMarcadas = function(){
			var cache = {};
			return function(chapa, coligada, fimPeriodoAquisitivo) {
				var key = chapa + '_' + coligada + '_' + fimPeriodoAquisitivo,
				safeChapa = chapa + '',
				safeColigada = coligada + '';
				return cache[key] || (cache[key] = DatasetFactory.getDataset('DS_FLUIG_DATASERVER_0003', [safeChapa, safeColigada, fimPeriodoAquisitivo], null, null).values);
			};
		}
		
		var getDetalhesPeriodoAtivo = function(){
			var cache = {};
			return function (chapa, coligada, fimPeriodoAquisitivo)
			{
				var key = chapa + '_' + coligada + '_' + fimPeriodoAquisitivo,
				safeChapa = chapa + '',
				safeColigada = coligada + '';
				return cache[key] || (cache[key] = DatasetFactory.getDataset('DS_FLUIG_DATASERVER_0001', [safeChapa, safeColigada, fimPeriodoAquisitivo], null, null).values[0]);
			};
		}

		var getChamadosFeriasAbertos = function (matricula, nome, chamado){
		    var cache = {};
		    var key = matricula + '_' + nome;
		    var chamados;
		    chamado = chamado == undefined ? 0 : chamado;
		    var c1 = DatasetFactory.createConstraint("cpColaboradorMatricula", matricula + '', matricula + '', ConstraintType.MUST);
		    var c2 = DatasetFactory.createConstraint("cpColaboradorNome", nome, nome, ConstraintType.MUST);
		    var c3 = DatasetFactory.createConstraint("userSecurityId", "adm", "adm", ConstraintType.MUST);
		    var c4 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
		    var c5 = DatasetFactory.createConstraint("cpNumeroSolicitacao", chamado, chamado, ConstraintType.MUST_NOT);

		    var datasetReturn = DatasetFactory.getDataset('FLUIG_0109', ['cpNumeroSolicitacao'], [c1, c2, c3, c4, c5], null);

		    if (!datasetReturn && datasetReturn != undefined)
		    {
		        chamados = datasetReturn.values.map(function (chamado) {
		            return chamado.cpNumeroSolicitacao;
		        });
		    }
		    

		    return cache[key] || (cache[key] = chamados);
		};
        
		var getLoginCSC = function(chapa)
		{
		    var filter = new Object();
		    filter["colleaguePK.colleagueId"] = chapa;
		    var colleagues = DatasetFactory.getDatasetValues("colleague", filter);

		    return colleagues.length > 0 ? colleagues[0].login : null;
		}

	return {
	    getPeriodoAtivo: getPeriodoAtivo,
	    getFeriasMarcadas: getFeriasMarcadas,
		getDetalhesPeriodoAtivo: getDetalhesPeriodoAtivo,
		getChamadosFeriasAbertos: getChamadosFeriasAbertos,
		getLoginCSC: getLoginCSC
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