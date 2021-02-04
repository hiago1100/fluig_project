$(document).ready(function() {
    /*
      if (currentState == 0) {
          alert("Este processo só pode ser aberto automaticamente");
          window.top.onbeforeunload = null;
          window.top.location.href = "http://"+window.top.location.hostname+":8080/portal/p/1/pageprocessstart";
      }
    */

    var currentState = getAtividade();

    Compartilhados.carregaDescricaoProcesso(getCodProcess());
    Compartilhados.expandePainel(currentState);
    Compartilhados.destacaAprovacoes();
    Compartilhados.destacaParecer();
    Compartilhados.camposObrigatorio();
    Compartilhados.carregaManual(getCodProcess(), "ID_LINK_MANUAL");

    //calcula primeira avaliacao
    $("#cpAvaliacaoN1").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN2").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN3").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN4").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN5").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN6").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN7").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN8").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN9").change(function() {
        CalcPrimeiraAval();
    });
    $("#cpAvaliacaoN10").change(function() {
        CalcPrimeiraAval();
    });

    //calcula Segunda avaliacao
    $("#cpSegundaAvaliacaoN1").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN2").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN3").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN4").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN5").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN6").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN7").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN8").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN9").change(function() {
        CalcSegundaAval();
    });
    $("#cpSegundaAvaliacaoN10").change(function() {
        CalcSegundaAval();
    });

    // checkbox de transferencia de gestor
    $("#cbTransferirGestor").change(function(){
        if($(this).val() == "sim"){
            $("#GestorTransfer").removeClass("hide");
            $("#cpEvidenciaHabilidade").closest(".col-md-6").addClass("hide");
            $("#cpObservacao").closest(".col-md-12").addClass("hide");
        }else{
            $("#GestorTransfer").addClass("hide");
            $("#cpEvidenciaHabilidade").closest(".col-md-6").removeClass("hide");
            $("#cpObservacao").closest(".col-md-12").removeClass("hide");
        }
    });

    // checkbox de transferencia de gestor
    $("#cbTransferirGestorSeg").change(function(){
        if($(this).val() == "sim"){
            $("#GestorTransferSeg").removeClass("hide");
            $("#cpEvidenciaGestor").closest(".col-md-6").addClass("hide");
            $("#cpObservacaoGestor").closest(".col-md-12").addClass("hide");
            
        }else{
            $("#GestorTransferSeg").addClass("hide");
            $("#cpEvidenciaGestor").closest(".col-md-6").removeClass("hide");
            $("#cpObservacaoGestor").closest(".col-md-12").removeClass("hide");
        }
    });


    if($("#cbTransferirGestor").val() == "sim"){
        $("#GestorTransfer").removeClass("hide");
    }

    if($("#cbTransferirGestorSeg").val() == "sim"){
        $("#GestorTransferSeg").removeClass("hide");
    }

    

    if (currentState == 0) {
        $("#btDepartamentoObra").prop('disabled', false);
    }

    if (currentState != 3 && currentState != 1 && currentState != 0) { //colore a avaliacao primeira
        var soma = $("#cpNotaAva").val();
        pintaTr(soma, "cpNotaResultado", "trNotaPimAv");
    }

    // Atividade Avaliação do Gestor
    if (currentState == 3) {
        var soma = $("#cpNotaAva").val().trim();
        if (soma != "") pintaTr(soma, "cpNotaResultado", "trNotaPimAv");

        $("#btObraDepartamentoTransfer").prop('disabled', false);
    }

    // Atividade 2. Avaliação do Gestor && 2ª Avaliação - Parecer da Consultoria RH
    if (currentState == 5 && currentState == 6) {
        var soma2 = $("#cpNotaAva2").val().trim();
        if(soma2 != "") pintaTr(soma2, "cpNotaResultado2", "trNotaSegAv");
    }

    if(currentState == 5 ){
        $("#btObraDepartamentoTransferSeg").prop('disabled', false);
    }

    

    var coligada = "";
    var secao = "";

    $('#btDepartamentoObra').click(function() {
        FLUIGC.sessionStorage.setItem('selecionandoSubstituto', true);
        window.loadingLayer.show();

        $.when(ZOOM.getInstance().GetTodosCentroCusto()).then(function() {
            window.loadingLayer.hide();
        });
    });

    $('#btColaborador').click(function(coligada, secao) {
        FLUIGC.sessionStorage.setItem('selecionandoColaborador', true);
        window.loadingLayer.show();

        $.when(ZOOM.getInstance().GetColaboradoresSecao(coligada, secao)).then(function() {
            window.loadingLayer.hide();
        });
    });
    
    // Gestores substitutos da primeira avaliação
    $('#btObraDepartamentoTransfer').click(function() {
        FLUIGC.sessionStorage.setItem('selecionandoObraSubst', true);
        window.loadingLayer.show();

        $.when(ZOOM.getInstance().GetTodosCentroCustoSubst()).then(function() {
            window.loadingLayer.hide();
        });
    });


    // Gestores substitutos da segunda avaliação
    $('#btObraDepartamentoTransferSeg').click(function() {
        FLUIGC.sessionStorage.setItem('selecionandoObraSubstSeg', true);
        window.loadingLayer.show();

        $.when(ZOOM.getInstance().GetTodosCentroCustoSubstSeg()).then(function() {
            window.loadingLayer.hide();
        });
    });

    // TRIGGUER ZOOM
    $(document).on('ZoomSecaoSelecionada', function(ev, retorno) {
        window.loadingLayer.show();
        setTimeout(function() {
            ZOOM.getInstance().GetColaboradoresSecao(retorno.CODCOLIGADA, retorno.CODSECAO)
            window.loadingLayer.hide();
        }, 100);
    });

    $(document).on('ZoomSecaoSelecionadaSubst', function(ev, retorno) {
        window.loadingLayer.show();

        console.log("chapa", retorno.CHAPA_GESTOR);
        console.log("coligada", retorno.CODCOLIGADA);


        setTimeout(function() {
            ZOOM.getInstance().GetGestoresSecao(retorno.CHAPA_GESTOR, retorno.CODCOLIGADA);
            window.loadingLayer.hide();
        }, 100);
    });

    $(document).on('ZoomSecaoSelecionadaSubstSeg', function(ev, retorno) {
        window.loadingLayer.show();
        setTimeout(function() {
            ZOOM.getInstance().GetGestoresSecaoSeg(retorno.CHAPA_GESTOR, retorno.CODCOLIGADA);
            window.loadingLayer.hide();
        }, 100);
    });

    

    $(document).on('ZoomColaboradorSelecionado', function(ev, colaborador) {
        window.loadingLayer.show();

        setTimeout(function() {
            var dados = Model.get_DS1000('SP_FLUIG_1005', "'" + colaborador.CHAPA + "', " + colaborador.CODCOLIGADA);
            var dados2 = Model.get_DS0003(colaborador.CHAPA, colaborador.CODCOLIGADA);

            if (dados.values.length == 0 || dados2.values.length == 0) {
                Compartilhados.WarningToast('', Mensagens.M0012, 'error');
                window.loadingLayer.hide();
                return;
            }


            if (FLUIGC.sessionStorage.getItem('selecionandoSubstituto')) {

                console.log("entrou no if do colaborador");

                Compartilhados.LimparCampos(['limparDadosColaboradorSubstituto']);

                $('#cpObraDepartamentoInfo').val(dados2.values[0].SECAO);
                $('#cpColaboradorInfo').val(dados2.values[0].NOME);
                $('#cpMatriculaInfo').val(dados2.values[0].CHAPA);
                $('#cpDataAdmissaoInfo').val(dados2.values[0].ADMISSAO);
                $('#cpFuncaoInfo').val(dados2.values[0].FUNCAO);
                $('#cpMaoObraInfo').val(dados2.values[0].OBRAOUSEDE);
                $('#cpEmpresaInfo').val(dados2.values[0].EMPRESA);
                $('#cpGestorInfo').val(dados2.values[0].NOME_GESTOR);

                $("#cpChapaGestor").val(dados2.values[0].CHAPA_GESTOR);
                $("#cpChapaConsultor").val(dados2.values[0].CHAPA_CONS);
                FLUIGC.sessionStorage.setItem('selecionandoSubstituto', false);
            }else {
                Compartilhados.LimparCampos(['limparDadosColaborador']);
                VIEW.getInstance().preencherCamposColaborador(dados.values[0]);

            }

            window.loadingLayer.hide();

        }, 1000);
    });

    $(document).on('ZoomGestorSelecionado', function(ev, colaborador) {
        window.loadingLayer.show();

        setTimeout(function() {
            var dados2 = Model.get_DS0003(colaborador.CHAPA, colaborador.CODCOLIGADA);

            if (dados2.values.length == 0) {
                Compartilhados.WarningToast('', Mensagens.M0012, 'error');
                window.loadingLayer.hide();
                return;
            }


            if (FLUIGC.sessionStorage.getItem('selecionandoObraSubst')) { //zoom de substituição do gestor.

                console.log("teste 1");

                Compartilhados.LimparCampos(['limparDadosColaboradorSubstituto']);

                $('#cpObraDepartamentoTransfer').val(dados2.values[0].SECAO);
                $('#cpObraGestorAvaliadorTransfer').val(dados2.values[0].NOME_GESTOR);
                $("#cpChapaGestor").val(dados2.values[0].CHAPA_GESTOR);

                console.log("GESTOR SUBST" +dados2.values[0].CHAPA_GESTOR);



                FLUIGC.sessionStorage.setItem('selecionandoSubstituto', false);

            }else if (FLUIGC.sessionStorage.getItem('selecionandoObraSubstSeg')) { //zoom de substituição do gestor.

                console.log("teste 2");

                Compartilhados.LimparCampos(['limparDadosColaboradorSubstituto']);

                $('#cpObraDepartamentoTransferSeg').val(dados2.values[0].SECAO);
                $('#cpObraGestorAvaliTransfSeg').val(dados2.values[0].NOME_GESTOR);
                $("#cpChapaGestorSubstSeg").val(dados2.values[0].CHAPA_GESTOR);

                console.log("campo SECAO" ,  dados2.values[0].SECAO);
                console.log("campo NOME_GESTOR" ,  dados2.values[0].NOME_GESTOR);
                console.log("campo CHAPA_GESTOR" ,  dados2.values[0].CHAPA_GESTOR);

                FLUIGC.sessionStorage.setItem('selecionandoSubstituto', false);

            }else {
                Compartilhados.LimparCampos(['limparDadosColaborador']);
                VIEW.getInstance().preencherCamposColaborador(dados2.values[0]);

            }

            window.loadingLayer.hide();

        }, 1000);
    });

    $(document).on('ZoomGestorSelecionadoSeg', function(ev, colaborador) {
        window.loadingLayer.show();

        setTimeout(function() {
            var dados2 = Model.get_DS0003(colaborador.CHAPA, colaborador.CODCOLIGADA);

            if (dados2.values.length == 0) {
                Compartilhados.WarningToast('', Mensagens.M0012, 'error');
                window.loadingLayer.hide();
                return;
            }


            if (FLUIGC.sessionStorage.getItem('selecionandoObraSubstSeg')) { //zoom de substituição do gestor.

                Compartilhados.LimparCampos(['limparDadosColaboradorSubstituto']);

                $('#cpObraDepartamentoTransferSeg').val(dados2.values[0].SECAO);
                $('#cpObraGestorAvaliTransfSeg').val(dados2.values[0].NOME_GESTOR);
                $("#cpChapaGestorSubstSeg").val(dados2.values[0].CHAPA_GESTOR);


                console.log("SECAO", dados2.values[0].SECAO);
                console.log("NOME_GESTOR", dados2.values[0].NOME_GESTOR);
                console.log("CHAPA_GESTOR", dados2.values[0].CHAPA_GESTOR);

                FLUIGC.sessionStorage.setItem('selecionandoSubstituto', false);

            }else {
                Compartilhados.LimparCampos(['limparDadosColaborador']);
                VIEW.getInstance().preencherCamposColaborador(dados2.values[0]);

            }

            window.loadingLayer.hide();

        }, 1000);
    });

}); // fim document.ready

//calcula a primeira avaliacao
function CalcPrimeiraAval() {
    var soma = 0;
    $(".PrimAvaliacao").each(function(indice, item) {
        var valor = ($(item).val());
        if (!isNaN(valor))
            (valor == undefined || valor == "") ? valor = 0 : soma += parseFloat(valor);
    });
    $("#cpNotaAva").val(soma);
    pintaTr(soma, "cpNotaResultado", "trNotaPimAv");
}

//calcula a segunda avaliacao
function CalcSegundaAval() {
    var soma = 0;
    $(".SegundaAvaliacao").each(function(indice, item) {
        var valor = ($(item).val());
        if (!isNaN(valor))
            (valor == undefined || valor == "") ? valor = 0 : soma += parseFloat(valor);
    });
    $("#cpNotaAva2").val(soma);
    pintaTr(soma, "cpNotaResultado2", "trNotaSegAv");
}


// Pinta a <tr> de acordo com o resultado das aprovações
function pintaTr(soma, campo1, campo2) {
    if (parseInt(soma) < 18) {
        $("#" + campo1).val("Não Atende");
        $('#' + campo2).css('background-color', '#ef4e49');
    } else if (parseInt(soma) > 18 && parseInt(soma) < 26) {
        $("#" + campo1).val("Atende Parcialmente");
        $('#' + campo2).css('background-color', '#ffea61');
    } else if (parseInt(soma) > 26 && parseInt(soma) < 34) {
        $("#" + campo1).val("Atende");
        $('#' + campo2).css('background-color', '#dcffa0');
    } else if (parseInt(soma) > 34) {
        $("#" + campo1).val("Supera");
        $('#' + campo2).css('background-color', '#10c390');
    }
}