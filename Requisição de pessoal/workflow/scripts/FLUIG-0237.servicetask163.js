function servicetask163(attempt, message) 
{
	var numSolicitacao = startProcessFluigGcti(163, 'DE0181900')
	hAPI.setCardValue("cpNumSolicitacaoTI170", numSolicitacao);
}