function criaProcessos() {
    
    log.info('Requisição de Pessoal FLUIG_0104: Criando processos secundários...');
    
    var getTodayString = function() {
        var hoje = new Date(),
            dia = hoje.getDate() > 9 ? hoje.getDate() : "0" + hoje.getDate(),
            mes = hoje.getMonth() > 8 ? hoje.getMonth() + 1 : '0' + (hoje.getMonth() + 1);
        return dia + '/' + mes + '/' + hoje.getFullYear();
    };

    var getDestinatarioCadastro = function(tipoMaoObra, isObra) {
        var lista = new java.util.ArrayList(),
            destinatario = (tipoMaoObra == 1 || tipoMaoObra == 2) ? codRecolhedor : consultora;
        
        if (isObra) {
            lista.add(destinatario);
        }

        return lista;
    };
    
    var appendRequisicao = function(index, requisicao, tipo) {
        var lista = hAPI.getCardValue(tipo);
        
        lista += lista != "" ? ', ' + requisicao : requisicao;
        
        hAPI.setCardValue(tipo, lista);
        
        if (index) {
            
            var chamadosGerados = hAPI.getCardValue('chamadosGerados');
            
            if (chamadosGerados != "") {
                chamadosGerados += ',';
            }
            
            var gerado = chamadosGerados + index + "|" + requisicao;
            
            hAPI.setCardValue('chamadosGerados', gerado);
            
        }
    };
    
    var numRequisicao = getValue("WKNumProces").toString(),
        hoje = getTodayString(),
        solicitante = hAPI.getCardValue('cpSolicitante'),
        isObra = parseInt(hAPI.getCardValue('isObra')),
        estado = hAPI.getCardValue('cpEstado'),
        secao = hAPI.getCardValue('cpSecao'),
        codSecao = hAPI.getCardValue('cpCodSecao'),
        codColigada = hAPI.getCardValue('cpCodColigada'),
        tipoMaoObra = parseInt(hAPI.getCardValue('cpTipoMaoObra')),
        quantidade = parseInt(hAPI.getCardValue('cpQuantidade')),
        cargo = hAPI.getCardValue('cpCargo'),
        horario = hAPI.getCardValue("cpHorario"),
        nomeGestor = hAPI.getCardValue('cpNomeGestor'),
        salario = hAPI.getCardValue('cpSalario'),
        codRecolhedor = hAPI.getCardValue('cpRecolhedor'),
        consultora = hAPI.getCardValue('cpConsultor')
        gestor = hAPI.getCardValue('cpGestor'),
        gerenteGeral = hAPI.getCardValue('cpGerenteGeral'),
        superintendente = hAPI.getCardValue('cpSuperintendente'),
        diretor = hAPI.getCardValue('cpDiretor'),
        consultor = hAPI.getCardValue('cpConsultor'),
        empresa = hAPI.getCardValue('cpEmpresa');

    function criaCadastro(index) {

        var parametros = new java.util.HashMap(),
            ativiadeDestino = "205",
            usuarioDestino = getDestinatarioCadastro(tipoMaoObra, isObra);

        parametros.put("cpNumeroSolicitacaoRequisicao", numRequisicao);
        parametros.put("cpEnvioFuncao", cargo);
        parametros.put("cpFuncao", cargo);
        parametros.put("cpAvancoAutomatico", '1');
        parametros.put("cpEnvioDtAdmissao", hoje);
        parametros.put("cpDataAbertura", hoje);
        parametros.put("cpCodigoSecao", codSecao);
        parametros.put("cpCodColigada", codColigada);
        parametros.put("cpEstado", estado);
        parametros.put("cpMatriculaSolicitante", solicitante);
        parametros.put("cpCentroCusto", secao);
        parametros.put("cpObraSede", isObra.toString());
        parametros.put("cpEnvioSecao", secao);
        parametros.put("cpZoomHorarioTrabalho", horario);
        parametros.put("cpHorarioTrabalho", horario);
        parametros.put("cpGestor", nomeGestor);
        parametros.put("cpMatriculaObra", codRecolhedor);
        parametros.put("cpPapelPadraoRecolhimentoDoc", codRecolhedor);
        parametros.put("cpMaoDeObra", tipoMaoObra + '');
        
        if (index) {
            var nome = hAPI.getCardValue('cpCandidato___' + index),
                salarioCandidato = hAPI.getCardValue("cpSalarioCandidato___" + index),
                xpField = parseInt(hAPI.getCardValue('cpXPCandidato___' + index)),
                xpCandidato = xpField == 1 ? "Sim" : "Não";
            
            parametros.put("cpPossuiXp", xpCandidato);
            parametros.put("cpNomeCompleto", nome);
            parametros.put("cpEnvioNome", nome);
            parametros.put("cpSalario", salarioCandidato.toString());
            
        } else {
            parametros.put("cpSalario", salario.toString());
        }

        try {       	
            var cadGerado = hAPI.startProcess("FLUIG-0102", ativiadeDestino, usuarioDestino, "Criado a partir da OS: " + numRequisicao, true, parametros, true);
            appendRequisicao(index, cadGerado.get("iProcess"), 'reqCadastro');
            
        } catch(e) {
            log.info('Falha na criação da requisição');
            log.dir(ativiadeDestino);
            log.dir(usuarioDestino);
            log.dir(parametros);
            throw e;
        }
    }

    
    function criaMovimentacao(index){
        var parametros = new java.util.HashMap();
        
        parametros.put('cpMatriculaSolicitante', solicitante);
        parametros.put("cpAvancoAutomatico","1");
        parametros.put("cpNumRequisicao", numRequisicao);
        parametros.put("cpDtRequisicao", hoje);
        parametros.put("cpCodigoEmpresaTransPadrao", codColigada);
        parametros.put("cpCodColigadaNovo", codColigada);
        parametros.put("cpCodSecaoNovo", codSecao);
        parametros.put("cpEstadoDestino", estado);
        parametros.put("cpNovoGestorTransPadrao", nomeGestor);
        parametros.put("cpZoomNovaObraDepTransPadrao", secao);
        parametros.put("cpGestorDestino", gestor);
        parametros.put("cpGerenteGeralDestino", gerenteGeral);
        parametros.put("cpSuperintendenteDestino", superintendente);
        parametros.put("cpDiretorDestino", diretor);
        parametros.put("cpConsultoriaDestino", consultor);
        parametros.put("cpZoomObraDep", hAPI.getCardValue('cpSecaoCandidato___' + index));
        parametros.put("cpCodEmpresa", hAPI.getCardValue('cpCodColigadaCandidato___' + index));
        parametros.put("cpCodSecao",hAPI.getCardValue('cpCodSecaoCandidato___' + index));
        parametros.put("cpColaborador", hAPI.getCardValue('cpCandidato___' + index));
        parametros.put("cpNome", hAPI.getCardValue('cpCandidato___' + index));
        parametros.put("cpFuncaoAtual", hAPI.getCardValue('cpCargoAtual___' + index));
        parametros.put("cpSalario", hAPI.getCardValue('cpSalarioCandidato___' + index));
        parametros.put("cpMatricula", hAPI.getCardValue('cpMatricula___' + index));
        parametros.put("cpNovaEmpresaTransPadrao", empresa);

        try {
            var movGerado = hAPI.startProcess("FLUIG-0105", "141", [solicitante], "Criado a partir da OS: " + numRequisicao, true, parametros, true);
            appendRequisicao(index, movGerado.get("iProcess"), 'reqMovimentacao');
            
        } catch(e) {
            log.info('Falha na criação da requisição');
            log.dir(parametros);
            throw e;
        }
    }
    
    for (var i = 1; i <= quantidade; i += 1) {
        
        if (tipoMaoObra == 1 || tipoMaoObra == 2) {
            criaCadastro();
            continue;
        }
        
        var status = parseInt(hAPI.getCardValue('cpStatusCandidato___' + i)),
            OSCandidato = hAPI.getCardValue('cpOSCandidato___' + i),
            tipoCandidato = parseInt(hAPI.getCardValue('cpTipoCandidato___' + i));
        
        if (status != 1 || OSCandidato != "") {
            continue;
        }

        if (tipoCandidato == 2) {
            criaCadastro(i);
        } else {
            criaMovimentacao(i);
        }
    }
    
    return true;
}