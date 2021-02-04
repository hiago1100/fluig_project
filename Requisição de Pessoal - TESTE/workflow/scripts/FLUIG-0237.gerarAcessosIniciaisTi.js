function criaSolicitacaoDeAcessoInicial() 
{
    var numRequisicao = getValue("WKNumProces").toString();
    var recolhedor = hAPI.getCardValue('cpResponsavelRecolhimentoObra');
    var secao = hAPI.getCardValue('cpReqDepartamentoObra');
    var nome = hAPI.getCardValue('cpCadastroKitColaborador');
    var matricula = hAPI.getCardValue('cpCadastroKitMatricula');
    var admissao = hAPI.getCardValue('cpCadastroKitDataAdmissao');
    var codSecao = hAPI.getCardValue('cpCadastroKitCodSecao');
    var codColigada = hAPI.getCardValue('cpCadastroKitCodColigada');
    var funcao = hAPI.getCardValue('cpCadastroKitFuncao');
    var data = getDate();

    var parametros = new java.util.HashMap();

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

    try 
    {
        var solicitacaoCriada = hAPI.startProcess("FLUIG-0167", "204", [recolhedor], "Criado a partir da OS: " + numRequisicao, true, parametros, true);
        hAPI.setCardValue('cpNumeroChamadoAcessoInicialTI', solicitacaoCriada.get("iProcess"));
    } 
    catch (e) 
    {
        throw "" + e;
    }
}

