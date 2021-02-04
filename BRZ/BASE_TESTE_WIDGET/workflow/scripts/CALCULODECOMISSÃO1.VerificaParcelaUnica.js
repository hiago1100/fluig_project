function VerificaParcelaUnica(){
	var value;
	(hAPI.getCardValue('cpValorliquidovenda') == hAPI.getCardValue('cpValor1parcelacomissao')) ? value = true : value = false;
	return value;
}