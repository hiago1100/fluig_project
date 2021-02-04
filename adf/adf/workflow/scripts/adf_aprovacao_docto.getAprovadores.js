function getAprovadores() {

    var i = 0;
    var Aprovadores = new Array();
    var email;

    do {
        i++;
        email = hAPI.getCardValue("aprovadorEmail___" + i);
        if (email) {
            Aprovadores.push({
                "i": i,
                "email": email,
                "codigo": String(hAPI.getCardValue("aprovadorCodigo___" + i)),
                "prioridade": String(hAPI.getCardValue("aprovadorPrioridade___" + i)),
                "qtdMinima": String(hAPI.getCardValue("aprovadorQtdMinima___" + i)),
                "seq": String(hAPI.getCardValue("aprovadorSeq___" + i)),
                "status": String(hAPI.getCardValue("aprovadorStatus___" + i)),
                "rejeicao": String(hAPI.getCardValue("aprovadorRejeicao___" + i)),
                "narrativa": String(hAPI.getCardValue("aprovadorNarrativa___" + i)),
                "data": String(hAPI.getCardValue("aprovadorData___" + i))
            });
        }
    } while (email);

    return Aprovadores;
}