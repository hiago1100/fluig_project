var AuxiliarSRH = (function () {

    //EXEMPLO
    /* resumo das atividades
      0,1 - Inicio
      2 - Reabertura de processo
      14 - Aprovação - N1
      19 - Conferência da solicitação - Suprimentos
      199 - Executar API de retorno do fornecedor vencedor
      206 - Erro na integração 1
      20 - Realizar mapa de cotação no UAU
      200 - Executar API de retorno do fornecedor vencedor
      227 - Erro na integração 2
      201 - Executar webservice de consulta de verba
      240 - Erro na integração 3       
      21 - Aprovação do fornecedor e Análise da verba - N1
      15 - Aprovação da compra / contratação - N2
      16 - Aprovação da compra / contratação - N3
      17 - Aprovação da compra / contratação - N4
      18 - Abertura do subprocesso de Liberação de Verba 
      150 - Executar API de validação da aprovação do fornecedor
      282 - Erro na integração 4           
      22 - Lançamento da ordem de compra no UAU / Requisição de produto em estoque        
      23 - Conferência do atendimento - Solicitante        
      32 - Confirmar previsão do fornecedor
      313 - Lançamento da NF no UAU       
 */

    var Regras = function () {        

        var RegrasTabelaSRH = [
            //14 - Aprovação - N1
            {
                atividade: "14",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'N1', valor: '' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //19 - Conferência da solicitação - Suprimentos
            {
                atividade: "19",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //206 - Erro na integração 1
            {
                atividade: "206",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //20 - Realizar mapa de cotação no UAU
            {
                atividade: "20",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //21 - Aprovação do fornecedor e Análise da verba - N1
            {
                atividade: "21",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'DIVERSOS', valor: '' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: true, valor: "0.01" }]
            },

            //15 - Aprovação da compra / contratação - N2
            {
                atividade: "15",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'N2', valor: '' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: true, valor: "2500.00" }]
            },

            //16 - Aprovação da compra / contratação - N3
            {
                atividade: "16",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'N3', valor: '' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: true, valor: "10000.00" }]
            },

            //17 - Aprovação da compra / contratação - N4
            {
                atividade: "17",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'N4', valor: '' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: true, valor: "30000.00" }]
            },

            //18 - Processamento da solicitação  - Área de Planejamento
            {
                atividade: "18",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DPLA.004' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //282 - Erro na integração 4
            {
                atividade: "282",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //22 - Lançamento da ordem de compra no UAU / Requisição de produto em estoque
            {
                atividade: "22",
                prazo: '008:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },

            //32 - Confirmar previsão do fornecedor
            {
                atividade: "32",
                prazo: '004:00',
                fluxoAutomatico: false,
                mecAtribuicao: [{ tipoUsuario: 'PAPEL', valor: 'Pool:Role:DSUP.006' }],
                etapaAtiva: true,
                aprovacaoAlcada: [{ Ativo: false, valor: "0" }]
            },
         
        ]
        processaTabelaSRH(RegrasTabelaSRH);
    }

    var processaTabelaSRH = function (RegrasTabelaSRH) {
        RegrasTabelaSRH.forEach(regraAtividade => {
            SetMecanismoAtribuicao(regraAtividade)
            SetPrazo(regraAtividade)
            SetAlcada(regraAtividade)
        })
    }

    var SetMecanismoAtribuicao = function (regraAtividade) {

        regraAtividade.mecAtribuicao.forEach(valorAtribuido => {

            if (valorAtribuido.tipoUsuario == 'N1') {
                setValorCampos('cpMecAtribuicao_', 'cpPapelN1', regraAtividade);

            } else if (valorAtribuido.tipoUsuario == 'N2') {
                setValorCampos('cpMecAtribuicao_', 'cpPapelN2', regraAtividade);

            } else if (valorAtribuido.tipoUsuario == 'N3') {
                setValorCampos('cpMecAtribuicao_', 'cpPapelN3', regraAtividade);

            } else if (valorAtribuido.tipoUsuario == 'N4') {
                setValorCampos('cpMecAtribuicao_', 'cpPapelN4', regraAtividade);

            } else {
                $(`#cpMecAtribuicao_${regraAtividade.atividade}`).val(valorAtribuido.valor)
            }
        })
    }

    var setValorCampos = function (cpMecAtribuicao, cpChapa, regraAtividade) {
        $(`#${cpMecAtribuicao}${regraAtividade.atividade}`).val($(`#${cpChapa}`).val())
    }

    var SetPrazo = function (regraAtividade) {
        $(`#cpPrazo_${regraAtividade.atividade}`).val(regraAtividade.prazo)
    }

    var SetAlcada = function (regraAtividade) {
        regraAtividade.aprovacaoAlcada.forEach(alcada => {
            if (alcada.Ativo) {
                $(`#cpAlcada_${regraAtividade.atividade}`).val(alcada.valor)
            }
        })
    }

    return {
        Regras
    };
})()
