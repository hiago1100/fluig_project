function decryptForm()
{
	if(hAPI.getCardValue("cpIsEncode") == '1')
	{
		var camposCript = [
			'cpMatriculaSolicitante',
			'cpResponsavelRecrutamentoSelec',
			'cpResponsavelExcecaoRH',
			'cpResponsavelAprovadorN1Candid',
			'cpResponsavelRecolhimentoObra',
			'cpResponsavelAssinaturaKit',
			'cpResponsavelAberturaDesligame',
			'cpResponsavelAberturMovimentac',
			'cpResponsavelExcecaoN1',
			'cpResponsavelExcecaoN2',
			'cpResponsavelExcecaoN3',
			'cpResponsavelExcecaoN4'
		];

		var key = hAPI.getCardValue("cpEncodeKey") + ''; 

		camposCript.forEach(function(campo)
		{
			if(hAPI.getCardValue(campo) != "")
			{
				var valor = decrypt(hAPI.getCardValue(campo), key);
				hAPI.setCardValue(campo, valor);
			}
		});
		
		hAPI.setCardValue("cpIsEncode", '0');
		hAPI.setCardValue("cpEncodeKey", '');
	}	
}