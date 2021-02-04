function salarioDiferente(){
    
    var quantidade = parseInt(hAPI.getCardValue('cpQuantidade')),
        salario = parseFloat(hAPI.getCardValue('cpSalario'));
    
    for (var i = 1; i <= quantidade; i += 1) {
        var tipo = hAPI.getCardValue('cpTipoCandidato___' + i);
        var status = hAPI.getCardValue('cpStatusCandidato___' + i);
        
        if (status != 1 && tipo != 0) {
            var salarioCandidato = parseFloat(hAPI.getCardValue('cpSalarioCandidato___' + i));
            var tipoObra = hAPI.getCardValue('isObra');
            if(tipoObra == 0){
            	if (salarioCandidato != salario) {
                return true;
            	}
            }
        }
    }
    
    return false;
}