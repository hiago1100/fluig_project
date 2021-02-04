function servicetask75(attempt, message) 
{
	var numSolicitacao = startProcessFluigGcti(75, 'DE0181900');
	hAPI.setCardValue("cpNumSolicitacaoTI77", numSolicitacao);
}