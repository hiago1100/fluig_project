function afterStateLeave(sequenceId)
{
	var estado = getValue("WKNumState");
	
	// Apos finalizar o condicional de aprovacao
	if ( estado == 24 )
	{
		hAPI.setCardValue("op_consenseh","");
	}
}