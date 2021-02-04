function existeReprovado(){
    
    var jaGerado = function(lista, index) {
        for (var x = 0; x < lista.length; x += 1) {
            if (parseInt(lista[x]) == parseInt(index)) {
                return true;
            }
        }
        return false;
    };
    
    var quantidade = parseInt(hAPI.getCardValue('cpQuantidade')),
        tipoMaoObra = parseInt(hAPI.getCardValue('cpTipoMaoObra'))
        chamadosGerados = String(hAPI.getCardValue('chamadosGerados')),
        gerados = [];
    
    if (tipoMaoObra == 1 || tipoMaoObra == 2) {
        return false;
    }
    
    if (chamadosGerados != "") {
        gerados = chamadosGerados.split(',').map(function(gerado){
            return parseInt(gerado.split("|")[0]);
        });
    }
    
    for (var i = 1; i <= quantidade; i+= 1) {
        
        var status = parseInt(hAPI.getCardValue('cpStatusCandidato___' + i));
        
        if (status != 1 || !jaGerado(gerados, i)) {
            return true;
        }
    }
    
    return false;
}