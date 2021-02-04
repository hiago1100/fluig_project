function afterTaskSave(colleagueId,nextSequenceId,userList){
    
    var buscaVersoes = function(numSolicitacao) {
        var result = DatasetFactory.getDataset('DS_FLUIG_0055', [numSolicitacao + ''], null, null),
            versoes = result.map,
            length = versoes.size();
        
        return {
            atual: versoes.get(length - 1),
            anterior: versoes.get(length - 2)
        };
    };
    
    var getDataAtualFormatada = function() {
        var hoje = new Date(),
            d = hoje.getDate(),
            m = hoje.getMonth() + 1;
        
        if (d < 10) d = '0' + d;
        if (m < 10) m = '0' + m;
        
        return d + '/' + m + '/' + hoje.getFullYear();
    };
    
    var getDadosHistorico = function(atividade) {
        return (atividade == 45) ?
                {
                    tabela: 'histComplemento',
                    campoData: 'cpHistDtComplemento',
                    campoHistorico: 'cpHistAltComplemento'
                } : {
                    tabela: 'histPreenchimento',
                    campoData: 'cpHistDtPreenchimento',
                    campoHistorico: 'cpHistAltPreenchimento'
                };
    };
    
    var salvaAlteracoes = function(atividade, alteracoes) {
        var dadosHistorico = getDadosHistorico(atividade),
            childData = new java.util.HashMap();
        
        childData.put(dadosHistorico.campoHistorico, '[' + alteracoes + ']');
        childData.put(dadosHistorico.campoData, getDataAtualFormatada());
        
        hAPI.addCardChild(dadosHistorico.tabela, childData);
    };
    
    log.info('FLUIG-0105 - AfterTaskSave');
    
    var atividadeMovimentada = getValue('WKNumState');
    var numSolicitacao = getValue('WKNumProces');
    
    if (atividadeMovimentada == 45 || atividadeMovimentada == 313) {
        var versoes = buscaVersoes(numSolicitacao),
            anterior = versoes.anterior,
            atual = versoes.atual,
            campos = ['cpZoomObraDep', 'cpCodEmpresa', 'cpEstadoOrigem',
                      'cpDoisEmpresa', 'cpGestorAtual',
                      'cpOrigemParceiro', 'cpNomeParceiroOrigem', 'cpOrigemConstrutor',
                      'cpColaborador', 'cpFuncaoAtual',
                      'cpMatricula', 'cpDataAdmissao', 'cpSalario', 'cpSituacao',
                      'cpPeriodoFerias', 'cpCPF',
                      'cpTransferencia',
                      'cpZoomNovaObraDepTransPadrao', 'cpCodigoEmpresaTransPadrao', 'cpEstadoDestino',
                      'cpNovaEmpresaTransPadrao', 'cpNovoGestorTransPadrao',
                      'cpDestinoParceiro', 'cpNomeParceiroDestino', 'cpDestinoConstrutor',
                      'cpPreenchedorNome',
                      'cpTransferenciaKm',
                      'cpMudanca', 'cpMembrosFamilia', 'cpQuantidadeMembros',
                      'cpTipoMoradia',
                      'cpAuxilioInstalacao', 'cpValorAuxilio', 'cpDataAuxilio',
                      'cpTransporteMobiliario', 'cpDataTransporte',
                      'cpTransVeiculo', 'cpDataTransporteVeic',
                      'cpPassagemRetorno', 'cpPeridiocidade', 'cpQtViajantes',
                      'cpTipoMovimentacao',
                      'cpZoomNovoCargo',
                      'cpZoomNovoSalario', 'cpPercentualAumento',
                      'cpAdicionalTransferencia', 'cpSemAdicionalTransferencia', 'cpNovoSalarioComAdicional',
                      'cpTipoMaoObraTexto', 'cpMesCompetencia',
                      'cpRecolhedorASONome'];
        
        var alteracoes = campos.reduce(function(alteracoes, campo){
            var valorAnterior = anterior.get(campo),
                valorAtual = atual.get(campo);
            
            if (valorAnterior == 'null') valorAnterior = '';
            if (valorAtual == 'null') valorAtual = '';
            
            if (valorAnterior != valorAtual) {
                if (alteracoes != '') alteracoes += ',';
                alteracoes += '{"campo": "' + campo + '", "valorAnterior": "' + valorAnterior + '", "valorAtual": "' + valorAtual + '"}';
            }
            
            return alteracoes;
        }, '');
        
        if (alteracoes != '') {
            salvaAlteracoes(atividadeMovimentada, alteracoes);
        }
    }
}