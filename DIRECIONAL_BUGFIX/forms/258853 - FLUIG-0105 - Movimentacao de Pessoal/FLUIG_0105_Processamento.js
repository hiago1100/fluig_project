$(document).ready(function(){
    
    var atvAtual = parseInt(getWKNumState());
    
    if (atvAtual != 80) return;
    
    var getColigada = function(){
        var transferencia = $("#cpTransferencia").val(),
            campoColigada = transferencia == 1 ? 'cpCodigoEmpresaTransPadrao' : 'cpCodEmpresa';
        
        return $("#" + campoColigada).val();
    };
    
    var getDadosColaborador = function(matricula, coligada) {
        return DatasetFactory.getDataset('DS_FLUIG_0003', [matricula, coligada], null, null).values[0];
    };
    
    var calcNovoSalarioComAdicional = function(salario, adicional) {
        var salarioComAdicional = parseFloat(salario / 100 * (100 + parseInt(adicional)));
        $("#cpConfSalarioAjustadoAtual").val(salarioComAdicional.toFixed(2));
    };
    
    var getCompetenciaRM = function(coligada) {
        return DatasetFactory.getDataset("DS_FLUIG_0043_INTEGRACAO", [coligada], null, null).values[0];
    };
    
    var getTipoMovRM = function(chapa, coligada) {
        return DatasetFactory.getDataset('DS_FLUIG_0067', [coligada, chapa], null, null).values[0].MOTIVO;
    };
    
    var getTextoTipoMovRM = function(codTipo) {
        if (codTipo == '01') return 'ADMISSAO';
        if (codTipo == '02') return 'TRANSFERENCIA DE C. CUSTO';
        if (codTipo == '03') return 'ADMISSAO';
        if (codTipo == '04') return 'PROMOCAO';
        if (codTipo == '05') return 'ENQUADRAMENTO';
        if (codTipo == '06') return 'RECLASSIFICACAO';
        if (codTipo == '07') return 'progressao';
        if (codTipo == '08') return 'TRANSFERENCIA';
        if (codTipo == '09') return 'ACERTO DE CADASTRO';
        if (codTipo == '11') return 'Reintegração';
        return 'ERRO';
    };
    
    var converteTipoMovRM_FUNCAO = function(codTipoMovRM_FUNCAO) {
        if (codTipoMovRM_FUNCAO == '04') return 1; // Promoção
        if (codTipoMovRM_FUNCAO == '07') return 2; // Progressao
        if (codTipoMovRM_FUNCAO == '05') return 3; // Enquadramento
        if (codTipoMovRM_FUNCAO == '06') return 4; // Reclassificação
    };
    
    var converteTipoMovRM_SALARIO = function(codTipoMovRM_SALARIO) {
        if (codTipoMovRM_SALARIO == '02') return 1; // Promoção
        if (codTipoMovRM_SALARIO == '04') return 1; // Promoção
        
        if (codTipoMovRM_SALARIO == '13') return 2; // Progressao
        
        if (codTipoMovRM_SALARIO == '03') return 3; // Enquadramento
        if (codTipoMovRM_SALARIO == '15') return 3; // Enquadramento
        
        if (codTipoMovRM_SALARIO == '14') return 4; // Reclassificação
    };


    var getMotivoAlteracaoSalarial = function(coligada, chapa) {
        return DatasetFactory.getDataset("DS_FLUIG_0071", [coligada + '', chapa + ''], null, null).values.pop();
    };
    
    
    ////////////////////////////////////////////////////////////////////////////
    
    $("#buscaMatriculaAtual").click(function(){
        var matricula = $("#cpConfMatriculaAtual").val();
        
        if(matricula!=""){
        var coligada = getColigada(),
            dadosColaborador = getDadosColaborador(matricula, coligada),
            competenciaRM = getCompetenciaRM(coligada),
            tipoTrasnfRM = getTipoMovRM(matricula, coligada),
            txtTipoMovRM = getTextoTipoMovRM(tipoTrasnfRM),
            motivoAlteracaoSalarial = getMotivoAlteracaoSalarial(coligada, matricula);
            adicionalTransf = dadosColaborador.PERCTRANSF != '' ? dadosColaborador.PERCTRANSF : 0;
        
        $("#cpNomeAtual").val(dadosColaborador.NOME);
        $("#cpSecaoAtual").val(dadosColaborador.SECAO);
        $("#cpConfFuncaoAtual").val(dadosColaborador.FUNCAO);
        $("#cpConfSalarioAtual").val(dadosColaborador.SALARIO);
        $("#cpConfAdicionalAtual").val(adicionalTransf);
        $("#cpConfMesCompRM").val(competenciaRM.MESCOMP + '/' + competenciaRM.ANOCOMP);
        
        calcNovoSalarioComAdicional(dadosColaborador.SALARIO, adicionalTransf);
        
        FormHelper.verificaMovimentacao();
        }else{
        	window.parent.FLUIGC.message.alert({
    			message:"Antes de realizar a busca, preencha a matr&iacute;cula.",
    			title: 'Erro',
    			label: 'Ok'
    			});
        }
    });
    
    if(atvAtual=="80"){
    $("#aprovarPMP").change(function(){
        var mostraBlock = this.value == 1 || this.value == 4;
        var mostraCCT = this.value == 4;
        
        $("#blockCCT").toggle(mostraCCT);
        $("#blockProcessado").toggle(mostraBlock);
        $("#blockProcessado input").val('');
        $(".dadoCCT").val('');
    });
    }
    
  
});