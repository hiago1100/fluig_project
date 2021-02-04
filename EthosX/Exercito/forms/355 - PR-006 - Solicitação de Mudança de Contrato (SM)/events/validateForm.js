function validateForm(form){

    var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
    var errorMsg = '';
    
    log.info('##### PR-006 - validateForm - CURRENT_STATE: ' + CURRENT_STATE + ' - NEXT_STATE: ' + NEXT_STATE + '- COMPLETED_TASK: ' + COMPLETED_TASK) 
    
    if(COMPLETED_TASK){
    
        if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIAR){

            if (form.getValue('nmSolicitante') == '' || form.getValue('nmSolicitante').isEmpty()){
                errorMsg += 'Campo Solicitante é obrigatório.\n';
            } else {
                if (form.getValue('idSolicitante') == '' || form.getValue('idSolicitante').isEmpty()){
                    errorMsg += 'Campo ID solicitante (idSolicitante) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('solicitadoPor') == '' || form.getValue('solicitadoPor').isEmpty()){
                errorMsg += 'Campo Solicitado por é obrigatório.\n';
            }
            if (form.getValue('nmContratada') == '' || form.getValue('nmContratada') == null){
                errorMsg += 'Campo Contratada é obrigatório.\n';
            } else {
                if (form.getValue('cnpjContratada') == '' || form.getValue('cnpjContratada').isEmpty()){
                    errorMsg += 'Campo CNPJ Contratada (cnpjContratada) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('contrato') == '' || form.getValue('contrato') == null){
                errorMsg += 'Campo Contrato é obrigatório.\n';
            } else {
                if (form.getValue('idContrato') == '' || form.getValue('idContrato').isEmpty()){
                    errorMsg += 'Campo ID Contrato (idContrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
                if (form.getValue('idGestorContrato') == '' || form.getValue('idGestorContrato').isEmpty()){
                    errorMsg += 'Campo ID Gestor Contrato (idGestorContrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
                if (form.getValue('nmGestorContrato') == '' || form.getValue('nmGestorContrato').isEmpty()){
                    errorMsg += 'Campo Nome GestorContrato (nmGestorContrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            
            if (form.getValue('secao') == '' || form.getValue('secao') == null){
                errorMsg += 'Campo Seção vínculada é obrigatório.\n';
            } else {
                if (form.getValue('idSecao') == '' || form.getValue('idSecao').isEmpty()){
                    errorMsg += 'Campo ID Seção (idSecao) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
                if (form.getValue('idChefeSecao') == '' || form.getValue('idChefeSecao').isEmpty()){
                    errorMsg += 'Campo ID Chefe Seção (idChefeSecao) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }

            var indexesObrigacoes = form.getChildrenIndexes("tableObrigacoesAcessorias");
            if (indexesObrigacoes.length > 0) {
                for (var i = 0; i < indexesObrigacoes.length; i++) {
                    if (form.getValue('obrigacaoAcessoria___' + indexesObrigacoes[i]) == '' || form.getValue('obrigacaoAcessoria___' + indexesObrigacoes[i]) == null){
                        linha = parseInt(i)+1
                        errorMsg += 'Campo Obrigação Acessória na linha ' + linha + ' é obrigatório.\n';
                    } else {
                        if (form.getValue('idObrigacaoAcessoria___' + indexesObrigacoes[i]) == '' || form.getValue('idObrigacaoAcessoria___' + indexesObrigacoes[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo ID Obrigação Acessória (idObrigacaoAcessoria) na linha ' + linha + ' é obrigatório. Entre em contato com Administrador SAFE.\n';
                        }
                    }						
                }
            }

            var indexesEtapas = form.getChildrenIndexes("tableEtapas");
            if (indexesEtapas.length > 0) {
                for (var i = 0; i < indexesEtapas.length; i++) {
                    if (form.getValue('etapa___' + indexesEtapas[i]) == '' || form.getValue('etapa___' + indexesEtapas[i]) == null){
                        linha = parseInt(i)+1
                        errorMsg += 'Campo Etapa na linha ' + linha + ' é obrigatório.\n';
                    } else {
                        if (form.getValue('idEtapa___' + indexesEtapas[i]) == '' || form.getValue('idEtapa___' + indexesEtapas[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo ID Etapa (idEtapa) na linha ' + linha + ' é obrigatório. Entre em contato com Administrador SAFE.\n';
                        }
                    }				
                }
            }

            if (form.getValue('descSM') == '' || form.getValue('descSM').isEmpty()){
                errorMsg += 'Campo Descrição da SM é obrigatório.';
            }

        }

        if(CURRENT_STATE == Activity.ELABORAR_SM && NEXT_STATE == Activity.QUALIFICAR_SM){

            if (form.getValue('descSMProposta') == '' || form.getValue('descSMProposta').isEmpty()){
                errorMsg += 'Campo Descrever SM de contrato proposta é obrigatório.\n';
            }
            if (form.getValue('respElaboracao') == '' || form.getValue('respElaboracao').isEmpty()){
                errorMsg += 'Campo Responsável elaboração é obrigatório.\n';
            } else {
                if (form.getValue('idRespElaboracao') == '' || form.getValue('idRespElaboracao').isEmpty()){
                    errorMsg += 'Campo ID Responsável Elaboração (idRespElaboracao) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
                if (form.getValue('nmRespElaboracao') == '' || form.getValue('nmRespElaboracao').isEmpty()){
                    errorMsg += 'Campo Nome Responsável Elaboração (nmRespElaboracao) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if(form.getValue('respElaboracao') == 'demandar'){
                if (form.getValue('numDemanda') == '' || form.getValue('numDemanda').isEmpty()){
                    errorMsg += 'Não é possível movimentar a solicitação sem criar a Solicitação de demanda.\n';
                } else {
                    if (form.getValue('statusDemanda') != 'Demanda Concluída' 
                        && form.getValue('statusDemanda') != 'Demanda Recusada'
                        && form.getValue('statusDemanda') != 'Demanda Cancelada')
                    {
                        errorMsg += 'Não é possível movimentar a solicitação sem que Solicitação de Demanda seja Concluída.\n';
                    }  
                }
                
            }
            if (form.getValue('impactoEscopo') == '' || form.getValue('impactoEscopo').isEmpty()){
                errorMsg += 'Campo Impacto escopo é obrigatório.\n';
            } else if (form.getValue('impactoEscopo') == 'sim'){
                if (form.getValue('descImpactoEscopo') == '' || form.getValue('descImpactoEscopo').isEmpty()){
                    errorMsg += 'Campo Descrição impacto escopo é obrigatório.\n';
                }
            }
            if (form.getValue('impactoMetodologia') == '' || form.getValue('impactoMetodologia').isEmpty()){
                errorMsg += 'Campo Impacto metodologia é obrigatório.\n';
            } else if (form.getValue('impactoMetodologia') == 'sim'){
                if (form.getValue('descImpactoMetodologia') == '' || form.getValue('descImpactoMetodologia').isEmpty()){
                    errorMsg += 'Campo Descrição impacto metodologia é obrigatório.\n';
                }
            }
            if (form.getValue('impactoPrazo') == '' || form.getValue('impactoPrazo').isEmpty()){
                errorMsg += 'Campo Impacto prazo é obrigatório.\n';
            } else  if (form.getValue('impactoPrazo') == 'sim'){
                if (form.getValue('descImpactoPrazo') == '' || form.getValue('descImpactoPrazo').isEmpty()){
                    errorMsg += 'Campo Descrição impacto prazo é obrigatório.\n';
                }
            }
            if (form.getValue('impactoSecoes') == '' || form.getValue('impactoSecoes').isEmpty()){
                errorMsg += 'Campo Impacto seções é obrigatório.\n';
            } else if (form.getValue('impactoSecoes') == 'sim'){
                if (form.getValue('descImpactoSecoes') == '' || form.getValue('descImpactoSecoes').isEmpty()){
                    errorMsg += 'Campo Descrição impacto seções é obrigatório.\n';
                }
            }
            if (form.getValue('impactoCusto') == '' || form.getValue('impactoCusto').isEmpty()){
                errorMsg += 'Campo Impacto custo é obrigatório.\n';
            } else if (form.getValue('impactoCusto') == 'sim'){
                if (form.getValue('descImpactoCusto') == '' || form.getValue('descImpactoCusto').isEmpty()){
                    errorMsg += 'Campo Descrição impacto custo é obrigatório.\n';
                }
                if (form.getValue('valorImpactoCusto') == '' || form.getValue('valorImpactoCusto').isEmpty()){
                    errorMsg += 'Campo Valor do custo é obrigatório.\n';
                }
            }
        }

        if(CURRENT_STATE == Activity.QUALIFICAR_SM && NEXT_STATE == Activity.PRE_CGM){

            if (form.getValue('respQualificarSM') == '' || form.getValue('respQualificarSM').isEmpty()){
                errorMsg += 'Campo Responsável (Gestão de contratos) é obrigatório.\n';
            } else {
                if (form.getValue('idRespQualificarSM') == '' || form.getValue('idRespQualificarSM').isEmpty()){
                    errorMsg += 'Campo ID Responsável (idRespQualificarSM) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('qualificarSM') == '' || form.getValue('qualificarSM').isEmpty()){
                errorMsg += 'Campo Qualificação SM é obrigatório.\n';
            }
            if (form.getValue('descQualificaca') == '' || form.getValue('descQualificaca').isEmpty()){
                errorMsg += 'Campo Descrever qualificação é obrigatório.\n';
            }

        }

        if(CURRENT_STATE == Activity.PRE_CGM){

            if (form.getValue('respPreCGM') == '' || form.getValue('respPreCGM').isEmpty()){
                errorMsg += 'Campo Responsável (Gestão de contratos) é obrigatório.\n';
            } else {
                if (form.getValue('idRespPreCGM') == '' || form.getValue('idRespPreCGM').isEmpty()){
                    errorMsg += 'Campo ID Responsável (idRespPreCGM) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('pautaPreCGM') == '' || form.getValue('pautaPreCGM').isEmpty()){
                errorMsg += 'Campo Esteve na pauta Pré CGM é obrigatório.\n';
            }

            var indexesPreCGM = form.getChildrenIndexes("tableReunioesPreCGM");
            if (indexesPreCGM.length > 0) {
                for (var i = 0; i < indexesPreCGM.length; i++) {    
                    if (form.getValue('dataReuniaoPreCGM___' + indexesPreCGM[i]) == '' || form.getValue('dataReuniaoPreCGM___' + indexesPreCGM[i]).isEmpty()){
                        linha = parseInt(i)+1
                        errorMsg += 'Campo Data reunião pré CGM na linha ' + linha + ' é obrigatório.\n';
                    } else {
                        if (form.getValue('dataReuniaoPreCGMFiltro___' + indexesPreCGM[i]) == '' || form.getValue('dataReuniaoPreCGMFiltro___' + indexesPreCGM[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo Data reunião pré CGM (dataReuniaoPreCGMFiltro) na linha ' + linha + ' é obrigatório. Entre em contato com Administrador SAFE.\n';
                        }
                    }
                    if (form.getValue('descReuniaoPreCGM___' + indexesPreCGM[i]) == '' || form.getValue('descReuniaoPreCGM___' + indexesPreCGM[i]).isEmpty()){
                        errorMsg += 'Campo Descrição Reuniao pré CGM na linha ' + linha + ' é obrigatório.\n';
                    }
                }				
            } else {
                errorMsg += 'Tabela Reuniões Pré CGM é obrigatório adicionar ao menos uma reunião.\n';
            }
        }
        
        if(CURRENT_STATE == Activity.CGM){

            if (form.getValue('respCGM') == '' || form.getValue('respCGM').isEmpty()){
                errorMsg += 'Campo Responsável CGM é obrigatório.\n';
            } else {
                if (form.getValue('idRespCGM') == '' || form.getValue('idRespCGM').isEmpty()){
                    errorMsg += 'Campo ID Responsável CGM (idRespCGM) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('pautaCGM') == '' || form.getValue('pautaCGM').isEmpty()){
                errorMsg += 'Campo Esteve na pauta CGM é obrigatório.\n';
            }

            var indexesCGM = form.getChildrenIndexes("tableReunioesCGM");
            if (indexesCGM.length > 0) {
                for (var i = 0; i < indexesCGM.length; i++) {    
                    if (form.getValue('dataReuniaoCGM___' + indexesCGM[i]) == '' || form.getValue('dataReuniaoCGM___' + indexesCGM[i]).isEmpty()){
                        linha = parseInt(i)+1
                        errorMsg += 'Campo Data reunião CGM na linha ' + linha + ' é obrigatório.\n';
                    } else {
                        if (form.getValue('dataReuniaoCGMFiltro___' + indexesCGM[i]) == '' || form.getValue('dataReuniaoCGMFiltro___' + indexesCGM[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo Data reunião CGM (dataReuniaoCGMFiltro) na linha ' + linha + ' é obrigatório. Entre em contato com Administrador SAFE.\n';
                        }
                    }
                    if (form.getValue('descReuniaoCGM___' + indexesCGM[i]) == '' || form.getValue('descReuniaoCGM___' + indexesCGM[i]).isEmpty()){
                        errorMsg += 'Campo Descrição Reuniao CGM na linha ' + linha + ' é obrigatório.\n';
                    }
                }				
            } else {
                errorMsg += 'Tabela Reuniões CGM é obrigatório adicionar ao menos uma reunião.\n';
            }
            if (form.getValue('escopoDeliberacaoCGM') == '' || form.getValue('escopoDeliberacaoCGM').isEmpty()){
                errorMsg += 'Campo Escopo (Deliberação CGM) é obrigatório.\n';
            }
            if (form.getValue('metodologiaDeliberacaoCGM') == '' || form.getValue('metodologiaDeliberacaoCGM').isEmpty()){
                errorMsg += 'Campo Metodologia (Deliberação CGM) é obrigatório.\n';
            }
            if (form.getValue('prazoDeliberacaoCGM') == '' || form.getValue('prazoDeliberacaoCGM').isEmpty()){
                errorMsg += 'Campo Prazo (Deliberação CGM) é obrigatório.\n';
            }
            if (form.getValue('custoDeliberacaoCGM') == '' || form.getValue('custoDeliberacaoCGM').isEmpty()){
                errorMsg += 'Campo Custo (Deliberação CGM) é obrigatório.\n';
            }
            if (form.getValue('pendenciasDeliberacaoCGM') == '' || form.getValue('pendenciasDeliberacaoCGM').isEmpty()){
                errorMsg += 'Campo Outras pendências (Deliberação CGM) resolver é obrigatório.\n';
            }
            if (form.getValue('escopoDeliberacaoCGM') == 'ressalva'
                || form.getValue('metodologiaDeliberacaoCGM') == 'ressalva'
                || form.getValue('prazoDeliberacaoCGM') == 'ressalva'
                || form.getValue('custoDeliberacaoCGM') == 'ressalva'
                || form.getValue('pendenciasDeliberacaoCGM') == 'sim')
            {
                if (form.getValue('descPendenciasEB') == '' || form.getValue('descPendenciasEB').isEmpty()){
                    errorMsg += 'Campo Pendências Exército Brasileiro é obrigatório.\n';
                }
                if (form.getValue('descPendenciasContratada') == '' || form.getValue('descPendenciasContratada').isEmpty()){
                    errorMsg += 'Campo Pendências contratada é obrigatório.\n';
                }
            }

            if (form.getValue('escopoDeliberacaoCGM') == 'sim'
                && form.getValue('metodologiaDeliberacaoCGM') == 'sim'
                && form.getValue('prazoDeliberacaoCGM') == 'sim'
                && form.getValue('custoDeliberacaoCGM') == 'sim')
            {
                if (form.getValue('confirmarQualificarSM') == '' || form.getValue('confirmarQualificarSM').isEmpty()){
                    errorMsg += 'Campo Confirmar/Qualificar (Deliberação CGM) SM é obrigatório.\n';
                }
            }
        }

        if(CURRENT_STATE == Activity.AGUARDAR){
            
            if (form.getValue('numAditivoApostilamento') == '' || form.getValue('numAditivoApostilamento').isEmpty()){
                errorMsg += 'Campo Nº Aditivo/Apostilamento é obrigatório.\n';
            }
            if (form.getValue('statusApostilamento') == '' || form.getValue('statusApostilamento').isEmpty()){
                errorMsg += 'Campo Status Aditivo/Apostilamento é obrigatório.\n';
            }
        }

    }

    if(errorMsg != ''){
        if (CURRENT_STATE == Activity.ZERO){
            throw errorMsg
        } else {
            throw '\n'+ errorMsg
        }
    }
}