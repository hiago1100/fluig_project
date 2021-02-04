function beforeStateEntry(sequenceId)
{
	if(hAPI.getCardValue("cpIsEncode") == '1')
	{
		var camposCript = [
			'cpMatriculaSolicitante',
			'cpMatriculaGestorSolicitante',
			'cpMatriculaGGSolicitante',
			'cpMatriculaSuperSolicitante',
			'cpMatriculaDiretorSolicitante',
			'cpMatriculaConsultoraObraDep',
			'cpMatriculaGestorObraDep',
			'cpMatriculaGGObraDep',
			'cpMatriculaSuperObraDep',
			'cpMatriculaDiretorObraDep',
			'cpReqChapaResponsRecolhimento',
			'cpReqCodResponsRecolhimento'
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