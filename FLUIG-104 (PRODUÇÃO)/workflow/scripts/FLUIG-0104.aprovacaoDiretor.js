function aprovacaoDiretor()
{
	var aprovarDiretor = hAPI.getCardValue("cpAprovarDiretor");

	if (aprovarDiretor == "1")
	{
		return 1;
	}
	else if (aprovarDiretor == "2")
		return 2;

}