function aprovacaoGestor()
{

	var aprovarGestor = hAPI.getCardValue("cpAprovarGestor");

	if (aprovarGestor == "1")
	{
		return 1;
	}
	else if (aprovarGestor == "2")
		return 2;
}