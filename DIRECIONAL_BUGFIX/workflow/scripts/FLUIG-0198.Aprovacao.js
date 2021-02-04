function isComunicadoObra() {
	return hAPI.getCardValue("ValchkEmpresa") == "1"; 
}

function isEmissaoAprovada() {
	return hAPI.getCardValue("cpAprovacaoEmissaoComunicado") == "1";
}

function aprovaVinculacao() {
	return hAPI.getCardValue("cpAprovarVinculacao") == "1";
}
