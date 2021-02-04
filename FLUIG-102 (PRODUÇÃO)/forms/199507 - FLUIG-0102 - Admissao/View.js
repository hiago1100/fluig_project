window.alert = function() {};
$(document).ready(function() {
	var dt = new Date();
	dt = dt.toISOString();
	$('#cpDataIntegracao').val(dt);
	
	$('#cpNumeroChamadoRescisao').parent().hide();
	
	$('#cpRecolAssinatura').on('change',
		function(){
			$('#cpRecolAssinatura').val() == 2 ? $('#cpNumeroChamadoRescisao').parent().show("slow") : $('#cpNumeroChamadoRescisao').parent().hide("slow");
		}
	)
	
	var atividade = getWKNumState();
	
	if ((getFormMode() != "VIEW") && (atividade == 0 || atividade == 2 || atividade == 3 || atividade == 85))
	{
		var colaborador = getDatasetValues('colleague', {"colleaguePK.colleagueId": getUser()})[0];
		$("#cpMatriculaSolicitante").val(getUser());
	    $("#cpLoginFluig").val(colaborador.login);
	}
	
	Compartilhados.enabledButtonZoom(['#BucarHorarioTrabalho'],[3]);
	Compartilhados.enabledButtonZoom(['#BuscarColaboradorKitGerado'],[8]);

	/**
	 * TRIGGERS EVENTS
	 */
	$(document).on('ZoomColaboradorSelecionado', function (ev, retorno) {
		window.loadingLayer.show();
		setTimeout(function () {
			console.log('OK');
			VIEW.getInstance().fillColaborador(retorno);
			window.loadingLayer.hide();
		}, 100);
	});
});

var VIEW = (function()
{
	var instance;

	function init()
	{
		function fillColaborador(colaborador)
		{
			$("#cpColaboradorKitGerado").val(colaborador.NOME);
			$("#cpMatriculaKitGerado").val(colaborador.CHAPA);
			$("#cpDataAdmissaoKitGerado").val(colaborador.DATAADMISSAO);
		};

		return {
			fillColaborador: fillColaborador
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