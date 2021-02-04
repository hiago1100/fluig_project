function aprovacaoSuperintendente()
{

	var aprovarSuperintendente = hAPI.getCardValue("cpAprovarSuperintendente");

	if (aprovarSuperintendente == "1")
	{
		return 1;
	}
	else if (aprovarSuperintendente == "2")
		return 2;
}