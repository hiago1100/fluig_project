function aprovacaoGerenteGeral()
{

	var aprovarGerenteGeral = hAPI.getCardValue("cpAprovarGerenteGeral");

	if (aprovarGerenteGeral == "1")
	{
		return 1;
	}
	else if (aprovarGerenteGeral == "2")
		return 2;
}