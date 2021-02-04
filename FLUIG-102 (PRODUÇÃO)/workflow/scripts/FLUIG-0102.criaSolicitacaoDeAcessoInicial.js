function criaSolicitacaoDeAcessoInicial() {

    var tipoMaoObra = hAPI.getCardValue('cpMaoDeObra');
    var Secao417c = hAPI.getCardValue('cpCodigoSecao');

    Secao417c = Secao417c.substring("5", "10");

    log.info('Criando Solicitação de Acessos Iniciais...');

    if (Secao417c != "41701") {
        if ((tipoMaoObra == 3 || tipoMaoObra == 4)) {

            var numRequisicao = getValue("WKNumProces").toString(),
                recolhedor = hAPI.getCardValue('cpMatriculaRecolhedor'),
                loginRecolhedor = hAPI.getCardValue('cpLoginRecolhedor'),
                secao = hAPI.getCardValue('cpCentroCusto'),
                nome = hAPI.getCardValue('cpColaboradorKitGerado'),
                matricula = hAPI.getCardValue('cpMatriculaKItGerado'),
                admissao = hAPI.getCardValue('cpDataAdmissaoKitGerado'),
                codSecao = hAPI.getCardValue('cpCodigoSecao'),
                codColigada = hAPI.getCardValue('cpCodColigada'),
                funcao = hAPI.getCardValue('cpFuncao');
            data = getDate();



            var parametros = new java.util.HashMap();

            parametros.put("cpLoginRecolhedor", loginRecolhedor);
            parametros.put("cpSecaoNovoColaborador", secao);
            parametros.put("cpNomeNovoColaborador", nome);
            parametros.put("cpChapaNovoColaborador", matricula);
            parametros.put("cpDtAdmissaoNovoColaborador", admissao);
            parametros.put("cpSolicitanteCarregado", '0');
            parametros.put("cpReqCadastro", numRequisicao);
            parametros.put("cpCodSecao", codSecao);
            parametros.put("cpInfCodSecao", codSecao);
            parametros.put("cpCodColigada", codColigada);
            parametros.put("cpInfCodColigada", codColigada);
            parametros.put("cpInfFuncao", funcao);
            parametros.put("cpIsAberturaAutomatica", "true");
            parametros.put("cpDataAbertura", data);


            try {
                var solicitacaoCriada = hAPI.startProcess("FLUIG-0167", "204", [recolhedor], "Criado a partir da OS: " + numRequisicao, true, parametros, true);
                hAPI.setCardValue('cpSolAcessoCriada', solicitacaoCriada.get("iProcess"));
            } catch (e) {
                throw e;
            }
        }
    }

    return true;
}

function getDate() {
    var data = new Date();
    var dia = data.getDate();
    var mes = (data.getMonth() + 1);
    var ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
}