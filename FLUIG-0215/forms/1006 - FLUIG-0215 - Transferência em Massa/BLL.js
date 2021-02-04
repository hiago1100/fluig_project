var BLL = (function()
{
	var instance;

	function init()
	{	
		
		function setMesCompetencia(atividade) {
			if (atividade == 11)
			{
				var date = new Date();
				date.setMonth(date.getMonth() + 1);

				return (date.getMonth() + 1) +'/' + (date.getFullYear()); 
			}
			else if (atividade == 0 || atividade == 1 || atividade == 2)
			{
				var date = new Date();
				date.setMonth(date.getMonth() + 1);

				return (date.getMonth() + 1) +'/' + (date.getFullYear()); 
			}
			else
			{
				return $('#cpMesCompetencia').val();
			}
		}

		function isPCD(colaborador) {
			return colaborador.PCD == 0 ?  false: true;
		}

		function isFeriasMarcada(chapa,coligada) {
			const FIM_PERIODO_AQUISITIVO = DAL.getInstance().getPeriodoFerias(chapa,coligada)[0].FIMPERAQUIS;
			let feriasMarcada = DAL.getInstance().getFeriasMarcadas(chapa,coligada,FIM_PERIODO_AQUISITIVO).length;

			return feriasMarcada > 0 ? true : false;
		}

		function isAtivo(colaborador) {
			return colaborador.SITUACAO == "Ativo" ? true : false;
		}

		function isParceirosValidos() {
			return $('#cpObraParceiraOrigem').val() == $('#cpObraParceiraDestino').val();
		}

		/**
		 * Verifica se o CNPJ de origem e destinos são iguais
		 */
		function isTransferenciaValida(){
			let cnpjOrigem = $('#cpCnpjOrigem').val();
			let cnpjDestino = $('#cpCnpjDestino').val();
			
			if(cnpjOrigem  && cnpjDestino )
			{
				cnpjOrigem = cnpjOrigem.replace(/\D/g,'');
				cnpjDestino = cnpjDestino.replace(/\D/g,'');

				if(cnpjOrigem == cnpjDestino)
				{
					$('#cpIsMesmoCNPJ').val('true');
					return true;
				}
				else
				{
					$('#cpIsMesmoCNPJ').val('false');
					return false;
				}
			}
			else
			{
				return true; //Caso o cnpj de destino não esteja preenchido (durante a abertura)
			}	
		}

		let isMesmaSecao = function() 
		{
			let codSecaoOrigem = sessionStorage.getItem("codSecaoOrigem");
			let codSecaoDestino = sessionStorage.getItem("codSecaoDestino");
			
			$('#cpIsMesmaSecao').val(codSecaoOrigem == codSecaoDestino);

			return codSecaoOrigem == codSecaoDestino;
		}

		return {
			setMesCompetencia: setMesCompetencia,
			isPCD: isPCD,
			isFeriasMarcada: isFeriasMarcada,
			isAtivo : isAtivo,
			isParceirosValidos : isParceirosValidos,
			isTransferenciaValida: isTransferenciaValida,
			isMesmaSecao: isMesmaSecao,
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