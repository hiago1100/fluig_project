function servicetask145(attempt, message) 
{
	var numSolicitacao = startProcessFluigGcti(145, 'DE0181900')
	hAPI.setCardValue("cpNumSolicitacaoTI146", numSolicitacao);
}