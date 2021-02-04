function beforeCancelProcess(colleagueId,processId){
	// Faz a remoção do Título no protheus
	var numeroTitulo = hAPI.getCardValue('numeroDocumento');
	if(numeroTitulo != '' && numeroTitulo != undefined){
		var msgWS = removeTiTuloProtheus();
		var retornoWS = verificaErro(msgWS);
		if (retornoWS != "Sucesso") {
			throw "Não foi possível remover o Título no Protheus. "+msgWS;
		}
	}
}