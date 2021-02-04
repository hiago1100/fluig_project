function aprovacaoSalario()
{
	var aprovarSalario = hAPI.getCardValue("cpAprovarSalario");

	if (aprovarSalario == "1")
	{
		return 1;
	}
	else if (aprovarSalario == "2")
		return 2;
}