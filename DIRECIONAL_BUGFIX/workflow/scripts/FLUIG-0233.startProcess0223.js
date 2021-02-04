function startProcessFluig0223(dados) {
    try {
        var p = new java.util.HashMap();
        p.put("cpDataAbertura", dados.DATA_ABERTURA);
        p.put("cpSolicitanteNome", dados.NOME_SOLICITANTE);
        p.put("cpSolicitanteFuncao", dados.FUNCAO_SOLICITANTE);
        p.put("cpSolicitanteEmpresa", dados.EMPRESA_SOLICITANTE);
        p.put("cpSolicitanteObraDep", dados.OBRA_DEP_SOLICITANTE);
        p.put("cpSolicitanteEstado", dados.ESTADO_SOLICITANTE);
        p.put("cpSolicitanteEmail", dados.EMAIL_SOLICITANTE);

        p.put("cpMatriculaSolicitante", dados.MATRICULA_SOLICITANTE);
        p.put("cpMatriculaGestorSolicitante", dados.MATRICULA_GESTOR_SOLICITANTE);
        p.put("cpMatriculaGGSolicitante", dados.MATRICULA_GG_SOLICITANTE);
        p.put("cpMatriculaSuperSolicitante", dados.MATRICULA_SUPER_SOLICITANTE);
        p.put("cpMatriculaDiretorSolicitante", dados.MATRICULA_DIRETOR_SOLICITANTE);
        p.put("cpMatriculaGestorRequisitante", dados.MATRICULA_GESTOR_REQUISITANTE);
        p.put("cpMatriculaGGRequisitante", dados.MATRICULA_GG_REQUISITANTE);
        p.put("cpMatriculaSuperRequisitante", dados.MATRICULA_SUPER_REQUISITANTE);
        p.put("cpMatriculaDiretorRequisitante", dados.MATRICULA_DIRETOR_REQUISITANTE);
        p.put("cpSecaoRequisitante", dados.SECAO_REQUISITANTE);

        p.put("cpAprovadorNegocio", dados.APROVADOR_NEGOCIO);
        p.put("cpPapelAtendimentoN2", dados.PAPEL_ATENDIMENTO_N2);
        p.put("cpPapelAtendimentoN1", dados.PAPEL_ATENDIMENTO_N1);
        p.put("cpExecutorConferencia", dados.EXECUTOR_CONFERENCIA);
        p.put("cpSLAN1", dados.SLA_N1);
        p.put("cpSLAN2", dados.SLA_N2);
        p.put("cpSLAFornecedorCatalogo", dados.SLA_FORNECEDOR_CATALOGO);
        p.put("cpSLAFornecedorCalculada", dados.SLA_FORNECEDOR_CALCULADA);
        p.put("cpMatriculaColaboradorFluig", dados.MATRICULA_COLABORADOR_FLUIG);
        p.put("cpCodSubCategoria", dados.COD_SUBCATEGORIA);

        p.put("cpColaboradorNome", dados.NOME_COLABORADOR);
        p.put("cpColaboradorFuncao", dados.FUNCAO_COLABORADOR);
        p.put("cpColaboradorEmpresa", dados.EMPRESA_COLABORADOR);
        p.put("cpColaboradorObraDep", dados.OBRA_DEP_COLABORADOR);
        p.put("cpColaboradorEstado", dados.ESTADO_COLABORADOR);
        p.put("cpColaboradorEmail", dados.EMAIL_COLABORADOR);
        p.put("cpColaboradorUsuarioRede", dados.USUARIO_REDE_COLABORADOR);
        p.put("cpColaboradorMatricula", dados.MATRICULA_COLABORADOR);
        p.put("cpColaboradorCpf", dados.CPF_COLABORADOR);
        p.put("cpColaboradorGestorNome", dados.NOME_GESTOR_COLABORADOR);

        p.put("cpColaboradorLocal", dados.LOCAL_COLABORADOR);
        p.put("cpColaboradorTelefone1", dados.TELEFONE1_COLABORADOR);
        p.put("cpTipoRequisicao", dados.TIPO_REQUISICAO);
        p.put("cpPesquisarSolicitacoes", dados.PESQUISAR_SOLICITACOES);

        p.put("cpCategoria", dados.CATEGORIA);
        p.put("cpCodCategoria", dados.COD_CATEGORIA);
        p.put("cpServico", dados.SERVICO);
        p.put("cpArea", dados.AREA);

        p.put("cpReqFluigErroNumerSolicitacao", dados.REQ_FLUIG_ERRO_NUMERO_SOLICITACAO);
        p.put("cpReqFluigErroProcesso", dados.REQ_FLUIG_ERRO_PROCESSO);
        p.put("cpDescricaoDetalhada", dados.DESCRICAO_DETALHADA);

        return hAPI.startProcess("FLUIG-0223", '597', ['adm'], "Solicitação aberta automaticamente por erro no processo FLUIG-0233", true, p, false)

    } catch (erro) {
        throw 'Ixxx me desculpe! Favor abrir um chamado de gestão de Ti manualmente! Ocorreu um erro na criação automática do processo FLUIG-0223: DESCRIÇÃO DO ERRO - ' + erro;
    }

};
