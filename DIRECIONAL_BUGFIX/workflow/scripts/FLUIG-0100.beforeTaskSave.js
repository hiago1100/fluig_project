function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var atividadeAtual = getValue("WKNumState");
    var tipoExcecao = hAPI.getCardValue('cpTipoExcecao');
    var aprovacao = hAPI.getCardValue("cpAprovacaoExcecaoCSC");

    if ((atividadeAtual == '0') || (atividadeAtual == '1') || (atividadeAtual == '2')) {

        var chapaColbSolExcecao = hAPI.getCardValue('cpMatriculaSolicitanteExcecao');
        var gestor = hAPI.getCardValue('cpChapaGestor');
        var gerenteGeral = hAPI.getCardValue('cpChapaGerGeral');
        var superintendente = hAPI.getCardValue('cpChapaSuper');
        var diretor = hAPI.getCardValue('cpChapaDiretor');

        //nao entram na aprovação do gestor quando
        if ((chapaColbSolExcecao == gestor) || (chapaColbSolExcecao == gerenteGeral) ||
            (chapaColbSolExcecao == superintendente) || (chapaColbSolExcecao == diretor)) {
            hAPI.setCardValue('cpNivelHierarquiaGestor', 'NAO_ENTRAR');
        }

        //nao entram na aprovação do gerente geral quando
        if (((chapaColbSolExcecao == gerenteGeral) || (chapaColbSolExcecao == superintendente) ||
            (chapaColbSolExcecao == diretor) || (gerenteGeral == ""))) {
            hAPI.setCardValue('cpNivelHierarquiaGG', 'NAO_ENTRAR');
        }


        //nao entram na aprovação do superintendente quando
        if (((chapaColbSolExcecao == superintendente) || (chapaColbSolExcecao == diretor)) || superintendente == "") {
            hAPI.setCardValue('cpNivelHierarquiaSuper', 'NAO_ENTRAR');
        }

        //nao entram na aprovacao do diretor quando
        if ((chapaColbSolExcecao == diretor) || diretor == "") {
            hAPI.setCardValue('cpNivelHierarquiaDiretor', 'NAO_ENTRAR');
        }
    }


    if ((atividadeAtual == '42') && (tipoExcecao == '1') && (aprovacao == '1')) {
        criaSolicitacaoDeAcessoInicial();
    }

    function criaSolicitacaoDeAcessoInicial() {
        var parametros = new java.util.HashMap();
        var usuarios = new java.util.ArrayList();
        var nome_colaborador = hAPI.getCardValue('cpColaboradorF');
        var matricula_colaborador;
        var funcao_colaborador = hAPI.getCardValue('cpFuncaoF');
        var dtadmissao_colaborador = hAPI.getCardValue('cpDtAdmiss');
        var codobra_colaborador = hAPI.getCardValue('cpObraDepartamentoF');
        var codsecao_colaborador = hAPI.getCardValue('cpCodSecaoF');
        var codcoligada_colaborador = hAPI.getCardValue('cpCodColigF');
        var empresa_colaborador = '-';
        var gestor_colaborador = hAPI.getCardValue('cpGestorAdm');
        var ggeral_colaborador = hAPI.getCardValue('cpGGAdmiss');
        var codsolicitacao = hAPI.getCardValue('cpNumeroSolicitacao');
        var login_recolhedor = hAPI.getCardValue('cpMatricAcessIni');

        usuarios.add("Pool:Role:DTI.004");

        parametros.put("cpLoginRecolhedor", login_recolhedor);
        parametros.put("cpSecaoNovoColaborador", codobra_colaborador);
        parametros.put("cpNomeNovoColaborador", nome_colaborador);
        parametros.put("cpDtAdmissaoNovoColaborador", dtadmissao_colaborador);
        parametros.put("cpDtAdmissaoNovoColaborador", '-');
        parametros.put("cpSolicitanteCarregado", '0');
        parametros.put("cpReqCadastro", codsolicitacao);
        parametros.put("cpCodSecao", codsecao_colaborador);
        parametros.put("cpInfCodSecao", codsecao_colaborador);
        parametros.put("cpCodColigada", codcoligada_colaborador);
        parametros.put("cpInfFuncao", funcao_colaborador);
        parametros.put("cpInfGestor", gestor_colaborador);
        parametros.put("cpInfGerenteGeral", ggeral_colaborador);


        try {
            //var solicitacaoCriada = hAPI.startProcess("FLUIG-0167", "1", ['Pool:Role:DRH.001'], "Criado a partir da OS: " + numRequisicao, true, parametros, true);
            var solicitacaoCriada = hAPI.startProcess("FLUIG-0167", "204", usuarios, "Criado a partir da OS: " + codsolicitacao, false, parametros, true);

            hAPI.setCardValue('cpSolAcessoCriada', solicitacaoCriada.get("iProcess"));
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
