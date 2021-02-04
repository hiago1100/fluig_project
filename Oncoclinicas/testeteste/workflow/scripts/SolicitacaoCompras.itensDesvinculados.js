function itensDesvinculados(){
	// verificar se item itensDesvinculados
	if (hAPI.getCardValue("txtCodItemProdutoDesv___1") != "" ||
		hAPI.getCardValue("txtCodItemProdutoDesv___1") != null)
	{
		return true;
	}	
	else
		return false;
}