function aprovacaoConsultoria()
{

	var aprovarConsultoria = hAPI.getCardValue("cpAprovarConsultoria");

	if (aprovarConsultoria == "1")
	{
		return 1;
	}
	else if (aprovarConsultoria == "2")
		return 2;
}