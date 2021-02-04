function validateForm(form){

    var CURRENT_STATE = getValue('WKNumState');
	var NEXT_STATE = getValue("WKNextState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
    var errorMsg = '';
    
    log.info('##### PR-008 - validateForm - CURRENT_STATE: ' + CURRENT_STATE + ' - NEXT_STATE: ' + NEXT_STATE + '- COMPLETED_TASK: ' + COMPLETED_TASK) 
    
    if(COMPLETED_TASK){
    
        if(CURRENT_STATE == Activity.ZERO || CURRENT_STATE == Activity.INICIAR){

            if (form.getValue('nm_solicitante') == '' || form.getValue('nm_solicitante').isEmpty()){
                errorMsg += 'Campo Solicitante é obrigatório.\n';
            } else {
                if (form.getValue('id_solicitante') == '' || form.getValue('id_solicitante').isEmpty()){
                    errorMsg += 'Campo ID solicitante (id_solicitante) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
            if (form.getValue('rb_SM_de') == '' || form.getValue('rb_SM_de').isEmpty()){
                errorMsg += 'Campo Solicitação de (Aditivo ou Apostilamento) é obrigatório.\n';
            }
            
            if (form.getValue('nm_contratada') == '' || form.getValue('nm_contratada') == null){
                errorMsg += 'Campo Contratada é obrigatório.\n';
            } else {
                if (form.getValue('cnpj_contratada') == '' || form.getValue('cnpj_contratada').isEmpty()){
                    errorMsg += 'Campo CNPJ contratada (cnpj_contratada) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }

            if (form.getValue('nm_contrato') == '' || form.getValue('nm_contrato') == null){
                errorMsg += 'Campo Contrato é obrigatório.\n';
            } else {
                if (form.getValue('cd_contrato') == '' || form.getValue('cd_contrato').isEmpty()){
                    errorMsg += 'Campo Código Contrato (cd_contrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                } else{
                   
                    var constraints = new Array()
                    constraints.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST))
                    constraints.push(DatasetFactory.createConstraint('cd_contrato', form.getValue('cd_contrato'), form.getValue('cd_contrato'), ConstraintType.MUST))
                    constraints.push(DatasetFactory.createConstraint('estado_processo', 'andamento', 'andamento', ConstraintType.MUST))
                    var dsPR008 = DatasetFactory.getDataset('PR_008_aditivo_apostilamento', null, constraints, null)
    
                    if( dsPR008 != null && dsPR008 != undefined && dsPR008.rowsCount > 0) {
                        errorMsg += 'O Contrato selecionado possuí a solicitação SAFE ' + dsPR008.getValue(0,'id_fluig') + 
                                        ' em andamento (Nº Aditivo/Apostilamento ' + dsPR008.getValue(0,'num_adt_apo') + ').' +
                                        ' Não é possível iniciar solicitação para este Contrato.\n'
                    }

                }
                if (form.getValue('id_gestor_contrato') == '' || form.getValue('id_gestor_contrato').isEmpty()){
                    errorMsg += 'Campo ID Gestor contrato (id_gestor_contrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }

            var indexesSMs = form.getChildrenIndexes("tb_SMs");
            if (indexesSMs.length > 0) {
                for (var i = 0; i < indexesSMs.length; i++) {
                    if (form.getValue('num_SM___' + indexesSMs[i]) == '' || form.getValue('num_SM___' + indexesSMs[i]) == null){
                        linha = parseInt(i)+1
                        errorMsg += 'Campo SM é obrigatório (linha' +linha+ ' da tabela de SMs).\n';
                    } else {
                        if (form.getValue('id_fluig_SM___' + indexesSMs[i]) == '' || form.getValue('id_fluig_SM___' + indexesSMs[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo ID fluig SM (id_fluig_SM) é obrigatório (linha' +linha+ ' da tabela de SMs). Entre em contato com Administrador SAFE.\n';
                        }
                        if (form.getValue('id_card_SM___' + indexesSMs[i]) == '' || form.getValue('id_card_SM___' + indexesSMs[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo ID card SM (id_card_SM) é obrigatório (linha' +linha+ ' da tabela de SMs). Entre em contato com Administrador SAFE.\n';
                        }
                        if (form.getValue('id_version_SM___' + indexesSMs[i]) == '' || form.getValue('id_version_SM___' + indexesSMs[i]).isEmpty()){
                            linha = parseInt(i)+1
                            errorMsg += 'Campo ID version card SM (id_version_SM) é obrigatório (linha' +linha+ ' da tabela de SMs). Entre em contato com Administrador SAFE.\n';
                        }
                    }						
                }
            } else {
                errorMsg += 'Tabela SMs é obrigatório adicionar ao menos uma SM.\n';
            }

            if (form.getValue('desc_finalidade') == '' || form.getValue('desc_finalidade').isEmpty()){
                errorMsg += 'Campo Finalidade é obrigatório.';
            }
        }

        if(CURRENT_STATE == Activity.VALIDAR_COMPOSICAO){

            if (form.getValue('nm_resp_valida_composicao') == '' || form.getValue('nm_resp_valida_composicao').isEmpty()){
                errorMsg += 'Campo Responsável validar composição é obrigatório.\n';
            } else {
                if (form.getValue('id_resp_valida_composicao') == '' || form.getValue('id_resp_valida_composicao').isEmpty()){
                    errorMsg += 'Campo ID Responsável validar composição (id_resp_valida_composicao) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
        }

        if(CURRENT_STATE == Activity.ELABORAR_DOCUMENTAL_ACODE){

            if (form.getValue('nm_resp_analise_acode') == '' || form.getValue('nm_resp_analise_acode').isEmpty()){
                errorMsg += 'Campo Responsável Elaboração Aditivo ou Apostilamento é obrigatório.\n';
            } else {
                if (form.getValue('id_resp_analise_acode') == '' || form.getValue('id_resp_analise_acode').isEmpty()){
                    errorMsg += 'Campo ID Responsável Elaboração Aditivo ou Apostilamento (id_resp_analise_acode) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
        }

        if(CURRENT_STATE == Activity.COLHER_ASSINATURAS){

            if (form.getValue('nm_resp_assinaturas_acode') == '' || form.getValue('nm_resp_assinaturas_acode').isEmpty()){
                errorMsg += 'Campo Responsável Assinaturas Aditivo é obrigatório.\n';
            } else {
                if (form.getValue('id_resp_assinaturas_acode') == '' || form.getValue('id_resp_assinaturas_acode').isEmpty()){
                    errorMsg += 'Campo ID Responsável Assinaturas Aditivo (id_resp_assinaturas_acode) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
        }

        if((CURRENT_STATE == Activity.ELABORAR_DOCUMENTAL_ACODE && form.getValue('rb_SM_de') == '') || CURRENT_STATE == Activity.COLHER_ASSINATURAS){

            if (form.getValue('dt_assinaturas') == '' || form.getValue('dt_assinaturas').isEmpty()){
                errorMsg += 'Campo Data assinaturas é obrigatório.\n';
            } else if (form.getValue('dt_assinaturas_filtro') == '' || form.getValue('dt_assinaturas_filtro').isEmpty()){
                errorMsg += 'Campo Data assinaturas filtro (dt_assinaturas_filtro) é obrigatório. Entre em contato com Administrador SAFE.\n';
            }
            if (form.getValue('dt_inicio_vigencia') == '' || form.getValue('dt_inicio_vigencia').isEmpty()){
                errorMsg += 'Campo Início Vigência é obrigatório.\n';
            } else if (form.getValue('dt_inicio_vigencia_filtro') == '' || form.getValue('dt_inicio_vigencia_filtro').isEmpty()){
                errorMsg += 'Campo Início Vigência filtro (dt_inicio_vigencia_filtro) é obrigatório. Entre em contato com Administrador SAFE.\n';
            }
            if (form.getValue('dt_termino_vigencia') == '' || form.getValue('dt_termino_vigencia').isEmpty()){
                errorMsg += 'Campo Término Vigência é obrigatório.\n';
            } else if (form.getValue('dt_termino_vigencia_filtro') == '' || form.getValue('dt_termino_vigencia_filtro').isEmpty()){
                errorMsg += 'Campo Término Vigência filtro (dt_termino_vigencia_filtro) é obrigatório. Entre em contato com Administrador SAFE.\n';
            }
            if (form.getValue('txt_ref_dou_bi') == '' || form.getValue('txt_ref_dou_bi').isEmpty()){
                errorMsg += 'Campo Referência DOU/BI é obrigatório.\n';
            }
            if (form.getValue('dt_pub_dou_bi') == '' || form.getValue('dt_pub_dou_bi').isEmpty()){
                errorMsg += 'Campo Publicação DOU/BI é obrigatório.\n';
            } else if (form.getValue('dt_pub_dou_bi_filtro') == '' || form.getValue('dt_pub_dou_bi_filtro').isEmpty()){
                errorMsg += 'Campo Publicação DOU/BI filtro (dt_pub_dou_bi_filtro) é obrigatório. Entre em contato com Administrador SAFE.\n';
            }
        }

        if(CURRENT_STATE == Activity.AVALIAR_MINUTA){

            if (form.getValue('nm_resp_avalicao_aditivo') == '' || form.getValue('nm_resp_avalicao_aditivo').isEmpty()){
                errorMsg += 'Campo Responsável avaliar aditivo é obrigatório.\n';
            } else {
                if (form.getValue('id_resp_avalicao_aditivo') == '' || form.getValue('id_resp_avalicao_aditivo').isEmpty()){
                    errorMsg += 'Campo ID Responsável avaliar aditivo (id_resp_avalicao_aditivo) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
            }
        }

        if(CURRENT_STATE == Activity.ATUALIZAR_CONTRATO){

            if (form.getValue('nm_resp_atualizacao_contrato') == '' || form.getValue('nm_resp_atualizacao_contrato').isEmpty()){
                errorMsg += 'Campo Responsável atualizar contrato é obrigatório.\n';
            } else {
                if (form.getValue('id_resp_atualizacao_contrato') == '' || form.getValue('id_resp_atualizacao_contrato').isEmpty()){
                    errorMsg += 'Campo ID Responsável atualizar contrato (id_resp_atualizacao_contrato) é obrigatório. Entre em contato com Administrador SAFE.\n';
                }
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