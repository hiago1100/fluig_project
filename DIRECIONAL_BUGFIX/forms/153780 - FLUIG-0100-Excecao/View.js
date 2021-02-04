$(document).ready(function () {

    var atividade = Compartilhados.getCurrentState();

    VIEW.getInstance().Inicializar(atividade, getModo());
    VIEW.getInstance().preencheDescritor();

    if (atividade == '42') {

        $('#cpLoginAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CODUSUARIOREDE);
        $('#cpSecaoAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].SECAO);
        $('#cpNomeAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].NOME);
        $('#cpMatricAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CHAPA);
        $('#cpAdmissaoAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].ADMISSAO);
        $('#cpCodSecaoAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CODSECAO);
        $('#cpCodColigAcessIni').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].CODCOLIGADA);
        $('#cpFuncaoLog').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].FUNCAO);
        $('#cpGestorLog').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].NOME_GESTOR);
        $('#cpGGLog').val(FLUIGC.sessionStorage.getItem('userInformation').values[0].NOME_GG);

    }

    if (atividade == '40') {

        $('#cpAprovacaoRecolhimentoDoc').change(function () {

            $('#divDtAdmisRecDoc').toggle(this.value == '1');

            if ((this.value == '1') && ($('#cpTipoExcecao').val() == '1')) {
                $('#cpValData').val('SIM');
            } else {
                $('#cpValData').val('NAO');
            }

        });
    }

    if (($('#cpTipoExcecao').val() == "1") && ($('#cpSolAcessoCriada').val() != "")) {
        $('#blockReqAcesso').show();
    } else {
        $('#blockReqAcesso').hide();
    }

    $("#buscaDataMovimentacao").click(function () {
        $("#cpDtMov").datepicker('show');
    });

    $("#buscaDataAdmissao").click(function () {
        $("#cpDtAdmiss").datepicker('show');
    });

    $('#zoomObraDepSolicitanteExcecao').click(function () {
        FLUIGC.sessionStorage.setItem('obraDepartamentoInfSolExcecao', true);
        ZOOM.getInstance().getObraDepartamento();
    });

    $('#zoomColabSolicitanteExcecao').click(function () {

        var obra = $("#cpObraDepSolicitanteExcecao").val();

        if (obra == "") {

            Compartilhados.WarningToast('', Mensagens.M0001, 'error');

        } else {

            var codSecao = $("#cpCodsecao").val();
            var codColigada = $("#cpCodColigada").val();

            FLUIGC.sessionStorage.setItem('colabInfSolExcecao', true);
            ZOOM.getInstance().getColaborador(codSecao, codColigada);

        }
    });

    $('#zoomBuscaObraDepartamento').click(function () {
        FLUIGC.sessionStorage.setItem('obraDepartamentoAdmissao', true);
        ZOOM.getInstance().getObraDepartamento();

    });

    $('#zoomBuscaObraDepartamentoFerias').click(function () {
        FLUIGC.sessionStorage.setItem('obraDepartamentoFerias', true);
        ZOOM.getInstance().getObraDepartamento();

    });

    $('#zoomBuscaFuncao').click(function () {

        var codSecao = $("#cpCodSecaoF").val();
        var codColigada = $("#cpCodColigF").val();

        FLUIGC.sessionStorage.setItem('funcaoAdmissao', true);
        ZOOM.getInstance().getFuncao(codSecao, codColigada);

    });

    $('#zoomNovaFuncProm').click(function () {

        var haveraTransferencia = $("#cpHaveraTransferencia").val();
        var codSecao, codColigada;

        if (haveraTransferencia == '1') {

            codSecao = $("#cpCodSecaoMM").val();
            codColigada = $("#cpCodColigMm").val();

        } else if (haveraTransferencia == '2') {

            codSecao = $("#cpCodSecaoM").val();
            codColigada = $("#cpCodColigM").val();
        }

        FLUIGC.sessionStorage.setItem('funcaoMov', true);
        ZOOM.getInstance().getFuncao(codSecao, codColigada);

    });

    $('#zoomBuscaHorarioTrabalho').click(function () {

        var codColigada = $("#cpCodColigF").val();
        ZOOM.getInstance().getHorarioTrabalho(codColigada);

    });

    $('#btBuscaPostoTrabalho').click(function () {

        var tipoPostoTrab = $("#cpTipoPostoTrabalho").val();
        if (tipoPostoTrab == "") {

            Compartilhados.WarningToast('', Mensagens.M0002, 'error');

        } else {

            var codColigada = $("#cpCodColigF").val();

            if ($('#cpTipoPostoTrabalho').val() == '1') {
                nomeTipoDoPosto = "COM ALTURA";
            }
            else {
                nomeTipoDoPosto = "SEM ALTURA";
            }

            FLUIGC.sessionStorage.setItem('postoTrabalho', true);
            ZOOM.getInstance().getPostoTrabalho(codColigada, nomeTipoDoPosto);
        }
    });

    $('#btZoomNovoPosto').click(function () {

        var tipoPostoTrab = $("#cpTipoNovoPost").val();
        if (tipoPostoTrab == "") {

            Compartilhados.WarningToast('', Mensagens.M0003, 'error');

        } else {

            var codColigada = $("#cpCodColigM").val();
            if ($('#cpTipoNovoPost').val() == '1') {
                nomeTipoDoPosto = "COM ALTURA";
            }
            else {
                nomeTipoDoPosto = "SEM ALTURA";
            }

            FLUIGC.sessionStorage.setItem('postoTrabalhoMovPessoal', true);
            ZOOM.getInstance().getPostoTrabalho(codColigada, nomeTipoDoPosto);
        }
    });

    $('#zoomResponsavelDoc').click(function () {

        var codSecao = $("#cpCodSecaoF").val();
        var codColigada = $("#cpCodColigF").val();

        FLUIGC.sessionStorage.setItem('respDocAdmissao', true);
        ZOOM.getInstance().getRecolhimentoDoc(codColigada, codSecao);

    });

    $('#zoomColaboradorFerias').click(function () {

        var obra = $("#cpObraDepartamento").val();

        if (obra == "") {

            Compartilhados.WarningToast('', Mensagens.M0001, 'error');

        } else {

            var codSecao = $("#cpCodSecaoL").val();
            var codColigada = $("#cpCodColig").val();

            FLUIGC.sessionStorage.setItem('colabFerias', true);
            ZOOM.getInstance().getColaborador(codSecao, codColigada);

        }
    });

    $('#btRespRecolDoc').click(function () {

        var codSecao = $("#cpCodSecaoM").val();
        var codColigada = $("#cpCodColigM").val();

        FLUIGC.sessionStorage.setItem('respDocMovPessoal', true);
        ZOOM.getInstance().getRecolhimentoDoc(codColigada, codSecao);

    });


    $('#zoomColabM').click(function () {

        var obra = $("#cpObraDepartamentoM").val();

        if (obra == "") {

            Compartilhados.WarningToast('', Mensagens.M0001, 'error');

        } else {

            var codSecao = $("#cpCodSecaoM").val();
            var codColigada = $("#cpCodColigM").val();

            FLUIGC.sessionStorage.setItem('colabMov', true);
            ZOOM.getInstance().getColaborador(codSecao, codColigada);

        }
    });

    $('#zoomBuscaObraDepartamentoME').click(function () {
        FLUIGC.sessionStorage.setItem('obraDepartamentoME', true);
        ZOOM.getInstance().getObraDepartamento();

    });

    $('#zoomBuscaNovaObraDepartamento').click(function () {
        FLUIGC.sessionStorage.setItem('novoObraDepartamentoME', true);
        ZOOM.getInstance().getObraDepartamento();

    });

    $('#zoomNovaFuncReclas').click(function () {

        var haveraTransferencia = $("#cpHaveraTransferencia").val();
        var codSecao, codColigada;

        if (haveraTransferencia == '1') {

            codSecao = $("#cpCodSecaoMM").val();
            codColigada = $("#cpCodColigMm").val();

        } else if (haveraTransferencia == '2') {

            codSecao = $("#cpCodSecaoM").val();
            codColigada = $("#cpCodColigM").val();
        }

        FLUIGC.sessionStorage.setItem('funcaoMovRec', true);
        ZOOM.getInstance().getFuncao(codSecao, codColigada);

    });

    $('#cpTipoExcecao').change(function () {

        $('#divAdmissaoForaPoliticaRemuneracao').toggle(this.value == '1');
        $('#divFerias').toggle(this.value == '3');
        $('#divMovimentacaoPessoal').toggle(this.value == '5');
        $('#divOutrosExcecaoFerias').toggle(this.value != '3');
        $('#divOutrosExcecao').toggle(this.value != '1');
        $('#divOutrosExcecaoM').toggle(this.value != '5');
        $('#divSimHaveraTransf').toggle(this.value != '5');
        $('#divMais300Km').toggle(this.value != '5');
        $('#divAltPosto').toggle(this.value != '5');
        $('#divPromocao').toggle(this.value != '5');
        $('#divProgressao').toggle(this.value != '5');
        $('#divEnquadramento').toggle(this.value != '5');
        $('#divReclassificao').toggle(this.value != '5');
        $('#divSemAlteracaoSalarial').toggle(this.value != '5');

        if (this.value == '1') {//Admissão (Fora da Política de Remuneração)

            Compartilhados.LimparCampos(['limparCamposFerias', 'limparCamposMov']);

            $('#cpMecAtribProcExc').val('Pool:Role:DRH.001');
            $('#cpPrazoProcExc').val('008:00');
            $('#cpPrazoProcExcAtrib').val('008:00');

        } else if (this.value == '3') {//ferias
            Compartilhados.LimparCampos(['limparCamposAdmissao', 'limparCamposMov']);
            $('#cpMecAtribProcExc').val('Pool:Role:DRH.048');

        } else if (this.value == '5') {//Movimentação de Pessoal
            Compartilhados.LimparCampos(['limparCamposAdmissao', 'limparCamposFerias']);

        }
    });

    $('#cpAdmissaoRemuneracao').change(function () {
        $('#divOutrosExcecao').toggle(this.value == 'outros');
        if (this.value != 'outros') {
            Compartilhados.LimparCampos(['limpaOutrosMov']);
        }
    });

    $('#cpMotivoAdmissao').change(function () {
        $('#divColaboradorSubsti').toggle((this.value != '1') && (this.value != '') && (this.value != '2'));

        if ((this.value == '1') || (this.value == '')) {
            Compartilhados.LimparCampos(['limpaColabSubs']);
        }

    });

    $('#cpFerias').change(function () {
        $('#divOutrosExcecaoFerias').toggle(this.value == 'outros');

        if (this.value != 'outros') {
            Compartilhados.LimparCampos(['limpaOutrosMotFerias']);
        }

    });

    $('#cpMovimentacao').change(function () {
        $('#divOutrosExcecaoM').toggle(this.value == 'outros');

        if (this.value != 'outros') {
            Compartilhados.LimparCampos(['limpaOutrosExc']);
        }
    });

    $('#cpHaveraTransferencia').change(function () {
        $('.divSimHaveraTransf').toggle(this.value == '1');
    });

    $('#cpAcima300Km').change(function () {
        $('#divMais300Km').toggle(this.value == '1');
    });

    $('#cpAltPostTrab').change(function () {
        $('#divAltPosto').toggle(this.value == '1');
    });

    $('#cpTipoAlteracaoSalarial').change(function () {

        $('#divPromocao').toggle(this.value == '1');
        $('#divProgressao').toggle(this.value == '2');
        $('#divEnquadramento').toggle(this.value == '3');
        $('#divReclassificao').toggle(this.value == '4');
        $('#divSemAlteracaoSalarial').toggle(this.value == '5');

        if (this.value == '1') {
            Compartilhados.LimparCampos(['limparProgressao', 'limparEnquadramento', 'limparReclassificacao', 'limparSemAlteracaoSalarial']);
        } else if (this.value == '2') {
            Compartilhados.LimparCampos(['limparPromocao', 'limparEnquadramento', 'limparReclassificacao', 'limparSemAlteracaoSalarial']);
        } else if (this.value == '3') {
            Compartilhados.LimparCampos(['limparPromocao', 'limparProgressao', 'limparReclassificacao', 'limparSemAlteracaoSalarial']);
        } else if (this.value == '4') {
            Compartilhados.LimparCampos(['limparPromocao', 'limparProgressao', 'limparEnquadramento', 'limparSemAlteracaoSalarial']);
        } else if (this.value == '5') {
            Compartilhados.LimparCampos(['limparPromocao', 'limparProgressao', 'limparEnquadramento', 'limparReclassificacao']);
        }
    });

    $('#cpAprovacaoConferencia').change(function () {
        $('#divSatisfacao').toggle(this.value == '1');
        $('#divJustificativaSatisfacao').toggle(this.value == '4');

        if ((this.value == '2')) {
            Compartilhados.LimparCampos(['limparCampoObservacao', 'limparCampoGrauSatisfacao']);
        }
    });

    $('#cpGrauSatisfacao').change(function () {
        $('#divJustificativaSatisfacao').toggle((this.value == '3') || (this.value == '4'));

        if ((this.value == '1') || (this.value == '2')) {
            Compartilhados.LimparCampos(['limparCampoObservacao']);
        }
    });

    $('#cpTerminoFerias').change(function () {
        VIEW.getInstance().calcDiasFerias();
    });

    $('#cpInicioFerias').change(function () {

        var inicio = $('#cpInicioFerias').val();
        var inivio = VIEW.getInstance().dateStrToDate(inicio);
        var inicioPeriodo = new Date(inivio.getFullYear(), inivio.getMonth(), inivio.getDate());

        var x = inicioPeriodo.setDate(inicioPeriodo.getDate() - 25);

        VIEW.getInstance().converteDataEmString(x, 'cpPrazoProcExc');
        VIEW.getInstance().somaDiaUteis(($('#cpPrazoProcExc').val()), 2);
        var prazo = VIEW.getInstance().converteDataEmModeloAtribFluig(($('#cpPrazoProcExc').val()));
        //var inicio = $('#cpPrazoProcExcAtrib').val(prazo);

        VIEW.getInstance().calcDiasFerias();

    });

    $("#cpNovoSalario").blur(function () {
        VIEW.getInstance().calculaPercentualAumento('cpSalarioAtualM', 'cpNovoSalario', 'cpAumentoSalarial');
    });

    $("#cpNovoSalarioProg").blur(function () {

        VIEW.getInstance().calculaPercentualAumento('cpSalarioAtualM', 'cpNovoSalarioProg', 'cpAumentoSalarialProg');
    });

    $("#cpAdicionalTransferencia").blur(function () {
        VIEW.getInstance().calculaSalarioTransf('cpNovoSalario', 'cpSalarioAdicionalTrans', 'cpAdicionalTransferencia');

        $("#cpSalarioAdicionalTrans").unmask();
        $("#cpSalarioAdicionalTrans").mask("#.##0,00", { reverse: true });

    });

    $("#cpAdicionalTransferenciaProg").blur(function () {
        VIEW.getInstance().calculaSalarioTransf('cpNovoSalarioProg', 'cpSalarioAdicionalTransProg', 'cpAdicionalTransferenciaProg');

        $("#cpSalarioAdicionalTransProg").unmask();
        $("#cpSalarioAdicionalTransProg").mask("#.##0,00", { reverse: true });

    });

    $("#cpNovoSalarioEnq").blur(function () {
        VIEW.getInstance().calculaPercentualAumento('cpSalarioAtualM', 'cpNovoSalarioEnq', 'cpAumentoSalarialEnq');
    });

    $("#cpAdicionalTransferenciaEnq").blur(function () {
        VIEW.getInstance().calculaSalarioTransf('cpNovoSalarioEnq', 'cpSalarioAdicionalTransEnq', 'cpAdicionalTransferenciaEnq');

        $("#cpSalarioAdicionalTransEnq").unmask();
        $("#cpSalarioAdicionalTransEnq").mask("#.##0,00", { reverse: true });
    });

    $("#cpAdicionalTransferenciaRec").blur(function () {
        VIEW.getInstance().calculaSalarioTransf('cpSalarioAtualM', 'cpSalarioAdicionalTransRec', 'cpAdicionalTransferenciaRec');

        $("#cpSalarioAdicionalTransRec").unmask();
        $("#cpSalarioAdicionalTransRec").mask("#.##0,00", { reverse: true });
    });

    $("#cpAdicionalTransferenciaSemAlt").blur(function () {
        VIEW.getInstance().calculaSalarioTransf('cpSalarioAtualM', 'cpSalarioAdicionalTransSemAlt', 'cpAdicionalTransferenciaSemAlt');

        $("#cpSalarioAdicionalTransSemAlt").unmask();
        $("#cpSalarioAdicionalTransSemAlt").mask("#.##0,00", { reverse: true });
    });


    $(document).on('ZoomObraDepartamento', function (ev, retorno) {

        if (FLUIGC.sessionStorage.getItem('obraDepartamentoInfSolExcecao')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $("#cpObraDepSolicitanteExcecao").val(retorno.SECAO);
                $("#cpCodsecao").val(retorno.CODSECAO);
                $("#cpCodColigada").val(retorno.CODCOLIGADA);
                //$("#cpGestorObra").val(retorno.CHAPA_GESTOR);

                //  VIEW.getInstance().preencheDadosHierarquia(retorno);

                window.loadingLayer.hide();

                FLUIGC.sessionStorage.setItem('colaboradorInfSolExcecao', true);
                ZOOM.getInstance().getColaborador(retorno.CODSECAO, retorno.CODCOLIGADA);
            }, 1000);

            FLUIGC.sessionStorage.setItem('obraDepartamentoInfSolExcecao', false);

        } else if (FLUIGC.sessionStorage.getItem('obraDepartamentoAdmissao')) {

            window.loadingLayer.show();
            setTimeout(function () {
                var tipoExcecao = $("#cpTipoExcecao").val();
                $("#cpObraDepartamentoF").val(retorno.SECAO);
                $("#cpCodSecaoF").val(retorno.CODSECAO);
                $("#cpCodColigF").val(retorno.CODCOLIGADA);
                $("#cpGestorAdm").val(retorno.NOME_GESTOR);
                $("#cpGGAdmiss").val(retorno.NOME_GG);
                $("#cpConsultorFolha").val(retorno.CHAPA_FOLHA);
                $("#cpConsultorRH").val(retorno.CHAPA_CONSULTORA);
                $("#cpGGObra").val(retorno.CHAPA_GG);
                $("#cpSuperinObra").val(retorno.CHAPA_SUPER);
                $("#cpDiretorObra").val(retorno.CHAPA_DIRETOR);
                $("#cpGestorObra").val(retorno.CHAPA_GESTOR);

                VIEW.getInstance().preencheDadosHierarquia(retorno);
                VIEW.getInstance().verificaObra(retorno.CODSECAO, retorno.CODCOLIGADA, tipoExcecao, 'cpEhObra');

                if ($("#cpEhObra").val() == '') {
                    $('#cpMecAtribRecDocument').val('Pool:Role:DRH.001');

                }

                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('obraDepartamentoAdmissao', false);
        } else if (FLUIGC.sessionStorage.getItem('obraDepartamentoFerias')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $("#cpObraDepartamento").val(retorno.SECAO);
                $("#cpCodSecaoL").val(retorno.CODSECAO);
                $("#cpCodColig").val(retorno.CODCOLIGADA);

                $("#cpConsultorRH").val(retorno.CHAPA_CONSULTORA);
                $("#cpConsultorFolha").val(retorno.CHAPA_FOLHA);
                $("#cpGGObra").val(retorno.CHAPA_GG);
                $("#cpSuperinObra").val(retorno.CHAPA_SUPER);
                $("#cpDiretorObra").val(retorno.CHAPA_DIRETOR);
                $("#cpGestorObra").val(retorno.CHAPA_GESTOR);

                //  VIEW.getInstance().preencheDadosDiretor(retorno);

                VIEW.getInstance().preencheDadosHierarquia(retorno);
                window.loadingLayer.hide();

                FLUIGC.sessionStorage.setItem('colaboradorFerias', true);
                ZOOM.getInstance().getColaborador(retorno.CODSECAO, retorno.CODCOLIGADA);

            }, 1000);

            FLUIGC.sessionStorage.setItem('obraDepartamentoFerias', false);

        } else if (FLUIGC.sessionStorage.getItem('obraDepartamentoME')) {

            window.loadingLayer.show();
            setTimeout(function () {

                var tipoExcecao = $("#cpTipoExcecao").val();
                $("#cpObraDepartamentoM").val(retorno.SECAO);
                $("#cpCodSecaoM").val(retorno.CODSECAO);
                $("#cpCodColigM").val(retorno.CODCOLIGADA);
                $("#cpGestorAdmM").val(retorno.NOME_GESTOR);
                $("#cpGGAdmissM").val(retorno.NOME_GG);

                $("#cpConsultorRH").val(retorno.CHAPA_CONSULTORA);
                $("#cpConsultorFolha").val(retorno.CHAPA_FOLHA);
                $("#cpGGObra").val(retorno.CHAPA_GG);
                $("#cpSuperinObra").val(retorno.CHAPA_SUPER);
                $("#cpDiretorObra").val(retorno.CHAPA_DIRETOR);
                $("#cpGestorObra").val(retorno.CHAPA_GESTOR);

                VIEW.getInstance().preencheDadosHierarquia(retorno);

                // VIEW.getInstance().preencheDadosDiretor(retorno);
                VIEW.getInstance().verificaObra(retorno.CODSECAO, retorno.CODCOLIGADA, tipoExcecao, 'cpEhObraM');

                if ($("#cpEhObraM").val() == '') {
                    $('#cpMecAtribRecDocument').val('Pool:Role:DRH.001');
                }

                if (tipoExcecao == '3') {
                    $('#cpMecAtribProcExc').val('Pool:Role:DRH.048');
                    $('#cpPrazoProcExcAtrib').val('008:00');
                }

                window.loadingLayer.hide();

                FLUIGC.sessionStorage.setItem('colaboradorMovEx', true);
                ZOOM.getInstance().getColaborador(retorno.CODSECAO, retorno.CODCOLIGADA);

            }, 1000);

            FLUIGC.sessionStorage.setItem('obraDepartamentoME', false);

        } else if (FLUIGC.sessionStorage.getItem('novoObraDepartamentoME')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $("#cpNovaObraDepartamentoM").val(retorno.SECAO);
                $("#cpCodSecaoMM").val(retorno.CODSECAO);
                $("#cpCodColigMm").val(retorno.CODCOLIGADA);
                $("#cpNomeNovoGestorM").val(retorno.NOME_GESTOR);
                $("#cpChapaDiretorNovaObra").val(retorno.CHAPA_GESTOR);

                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('novoObraDepartamentoME', false);
        };
    });

    $(document).on('ZoomColaborador', function (ev, retorno) {

        $("#cpSalarioAtualM").unmask();

        if (FLUIGC.sessionStorage.getItem('colaboradorInfSolExcecao')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $('#cpColabSolicitanteExcecao').val(retorno.NOME);
                $('#cpFuncaoSolicitanteExcecao').val(retorno.FUNCAO);
                var matriculaFluig = Model.get_DS1000('SP_FLUIG_1073', `"${retorno.CODUSUARIOREDE}"`).values
                $('#cpMatriculaSolicitanteExcecao').val(matriculaFluig[0].USER_CODE);
                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('colaboradorInfSolExcecao', false);

        } else if (FLUIGC.sessionStorage.getItem('colabInfSolExcecao')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpColabSolicitanteExcecao').val(retorno.NOME);
                $('#cpFuncaoSolicitanteExcecao').val(retorno.FUNCAO);
                var matriculaFluig = Model.get_DS1000('SP_FLUIG_1073', `"${retorno.CODUSUARIOREDE}"`).values
                $('#cpMatriculaSolicitanteExcecao').val(matriculaFluig[0].USER_CODE);
                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('colabInfSolExcecao', false);

        } else if (FLUIGC.sessionStorage.getItem('colaboradorFerias')) {

            window.loadingLayer.show();
            setTimeout(function () {

                var codColigada = $('#cpCodColig').val();

                $('#cpColaboradorFerias').val(retorno.NOME);
                $('#cpFuncao').val(retorno.FUNCAO);
                $('#cpMatriulaFer').val(retorno.CHAPA);
                $('#cpDtAdmiFer').val(retorno.DATAADMISSAO);
                $('#cpDtNasc').val(retorno.DTNASCIMENTO);
                $('#cpIdade').val(retorno.IDADE);

                VIEW.getInstance().buscaPeriodoAquisitivo(retorno.CHAPA);
                VIEW.getInstance().getTipoMaoObra(codColigada, retorno.CODFUNCAO);

                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('colaboradorFerias', false);

        } else if (FLUIGC.sessionStorage.getItem('colaboradorMovEx')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $('#cpColaboradorFeriasM').val(retorno.NOME);
                $('#cpFuncaoM').val(retorno.FUNCAO);
                $('#cpMatriulaM').val(retorno.CHAPA);
                $('#cpDtAdmissaoM').val(retorno.DATAADMISSAO);
                $('#cpcodFuncaoM').val(retorno.CODFUNCAO);

                var codColigada = $('#cpCodColigM').val();

                VIEW.getInstance().getTipoMaoObra(codColigada, retorno.CODFUNCAO);
                VIEW.getInstance().mascaraSalario(retorno.SALARIO, 'cpSalarioAtualM');
                VIEW.getInstance().postoTrabalhoAtual(codColigada, retorno.CHAPA);

                window.loadingLayer.hide();
            }, 1000);


            FLUIGC.sessionStorage.setItem('colaboradorMovEx', false);
        } else if (FLUIGC.sessionStorage.getItem('colabFerias')) {

            window.loadingLayer.show();
            setTimeout(function () {

                var codColigada = $('#cpCodColig').val();

                $('#cpColaboradorFerias').val(retorno.NOME);
                $('#cpFuncao').val(retorno.FUNCAO);
                $('#cpMatriulaFer').val(retorno.CHAPA);
                $('#cpDtAdmiFer').val(retorno.DATAADMISSAO);
                $('#cpDtNasc').val(retorno.DTNASCIMENTO);
                $('#cpIdade').val(retorno.IDADE);

                VIEW.getInstance().buscaPeriodoAquisitivo(retorno.CHAPA);
                VIEW.getInstance().getTipoMaoObra(codColigada, retorno.CODFUNCAO);

                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('colabFerias', false);

        } else if (FLUIGC.sessionStorage.getItem('colabMov')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $('#cpColaboradorFeriasM').val(retorno.NOME);
                $('#cpFuncaoM').val(retorno.FUNCAO);
                $('#cpMatriulaM').val(retorno.CHAPA);
                $('#cpDtAdmissaoM').val(retorno.DATAADMISSAO);
                $('#cpcodFuncaoM').val(retorno.CODFUNCAO);

                var codColigada = $('#cpCodColigM').val();

                VIEW.getInstance().getTipoMaoObra(codColigada, retorno.CODFUNCAO);
                VIEW.getInstance().mascaraSalario(retorno.SALARIO, 'cpSalarioAtualM');
                VIEW.getInstance().postoTrabalhoAtual(codColigada, retorno.CHAPA);

                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('colabMov', false);
        }

    });

    $(document).on('ZoomFuncao', function (ev, retorno) {

        if (FLUIGC.sessionStorage.getItem('funcaoAdmissao')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpFuncaoF').val(retorno.NOME);
                $('#cpcodFuncaoF').val(retorno.CODIGO);

                var codColigada = $('#cpCodColigF').val();
                var codFuncao = $('#cpcodFuncaoF').val();

                VIEW.getInstance().getTipoMaoObra(codColigada, codFuncao);

                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('funcaoAdmissao', false);
        } else if (FLUIGC.sessionStorage.getItem('funcaoMov')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $('#cpNovaFunc').val(retorno.NOME);
                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('funcaoMov', false);

        } else if (FLUIGC.sessionStorage.getItem('funcaoMovRec')) {

            window.loadingLayer.show();
            setTimeout(function () {

                $('#cpNovaFuncRec').val(retorno.NOME);
                window.loadingLayer.hide();

            }, 1000);

            FLUIGC.sessionStorage.setItem('funcaoMovRec', false);
        }

    });

    $(document).on('ZoomHorarioTrabalho', function (ev, retorno) {

        window.loadingLayer.show();
        setTimeout(function () {

            $('#cpHorarioTrabalho2').val(retorno.HORARIO);
            window.loadingLayer.hide();

        }, 1000);
    });

    $(document).on('ZoomPostoTrabalho', function (ev, retorno) {

        if (FLUIGC.sessionStorage.getItem('postoTrabalho')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpNomePostoTrabalho').val(retorno.DESCRICAO);
                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('postoTrabalho', false);

        } else if (FLUIGC.sessionStorage.getItem('postoTrabalhoMovPessoal')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpNomeNovoPostTrab').val(retorno.DESCRICAO);
                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('postoTrabalhoMovPessoal', false);
        }
    });

    $(document).on('ZoomRecolhimentoDoc', function (ev, retorno) {

        if (FLUIGC.sessionStorage.getItem('respDocAdmissao')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpResponsavelDoc').val(retorno.NOME);
                $('#cpMecAtribRecDocument').val(retorno.CHAPA);


                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('respDocAdmissao', false);
        } else if (FLUIGC.sessionStorage.getItem('respDocMovPessoal')) {

            window.loadingLayer.show();
            setTimeout(function () {
                $('#cpRespRecolDoc').val(retorno.NOME);
                $('#cpMecAtribRecDocument').val(retorno.CHAPA);

                window.loadingLayer.hide();
            }, 1000);

            FLUIGC.sessionStorage.setItem('respDocMovPessoal', false);
        }

    });

});

var VIEW = (function () {
    var instance;

    function init() {

        var Inicializar = function (atividade, modoExibicao) {

            setStatusElementos();
            setDatePicker();
            setMascaras();

            if (modoExibicao == 'ADD' || modoExibicao == 'MOD') {
                Compartilhados.enabledButtonZoom(['#buscaDataAdmissao'], ['40']);
                Compartilhados.enabledButtonZoom(['#zoomObraDepSolicitanteExcecao', '#zoomColabSolicitanteExcecao', '#zoomBuscaObraDepartamento',
                    '#zoomBuscaFuncao', '#zoomBuscaHorarioTrabalho', '#btBuscaPostoTrabalho', '#zoomResponsavelDoc', '#zoomBuscaObraDepartamentoFerias',
                    '#zoomColaboradorFerias', '#zoomBuscaObraDepartamentoME', '#zoomColabM', '#zoomBuscaNovaObraDepartamento', '#btZoomNovoPosto',
                    '#zoomNovaFuncProm', '#zoomNovaFuncReclas', '#btRespRecolDoc', '#buscaDataMovimentacao'], ['0', '1', '2']);

                setDatePicker();
            }
        };

        var setStatusElementos = function () {

            $('#divAdmissaoForaPoliticaRemuneracao').toggle($('#cpTipoExcecao').val() == '1');
            $('#divFerias').toggle($('#cpTipoExcecao').val() == '3');
            $('#divMovimentacaoPessoal').toggle($('#cpTipoExcecao').val() == '5');
            $('#divOutrosExcecao').toggle($('#cpTipoExcecao').val() == 'outros');
            $('#divColaboradorSubsti').toggle(($('#cpMotivoAdmissao').val() != '1') && ($('#cpMotivoAdmissao').val() != '') && ($('#cpMotivoAdmissao').val() != '2'));//xxxxxx
            $('#divOutrosExcecaoFerias').toggle($('#cpFerias').val() == 'outros');
            $('#divOutrosExcecaoM').toggle($('#cpMovimentacao').val() == 'outros');
            $('.divSimHaveraTransf').toggle($('#cpHaveraTransferencia').val() == '1');
            $('#divMais300Km').toggle($('#cpAcima300Km').val() == '1');
            $('#divAltPosto').toggle($('#cpAltPostTrab').val() == '1');
            $('#divPromocao').toggle($('#cpTipoAlteracaoSalarial').val() == '1');
            $('#divProgressao').toggle($('#cpTipoAlteracaoSalarial').val() == '2');
            $('#divEnquadramento').toggle($('#cpTipoAlteracaoSalarial').val() == '3');
            $('#divReclassificao').toggle($('#cpTipoAlteracaoSalarial').val() == '4');
            $('#divSemAlteracaoSalarial').toggle($('#cpTipoAlteracaoSalarial').val() == '5');
            $('#divSatisfacao').toggle($('#cpAprovacaoConferencia').val() == '1');
            $('#divJustificativaSatisfacao').toggle(($('#cpGrauSatisfacao').val() == '3') || ($('#cpGrauSatisfacao').val() == '4'));
            $('#responsavelDocumentacao').toggle($('#cpExibRespRecDoc').val() == 'mostrar');
            $('#divRecDocMov').toggle($('#cpExibRespRecDoc').val() == 'mostrar');
            $('#divDtAdmisRecDoc').toggle($('#cpAprovacaoRecolhimentoDoc').val() == '1');

        };

        var setDatePicker = function () {

            $("#cpInicioFerias").datepicker();
            $("#cpTerminoFerias").datepicker();

            var dtMovimentacao = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
            var dtAdmissao = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var dtAdmiDisp = new Date();

            $("#cpDtMov").datepicker({
                showOn: "button",
                beforeShowDay: function (date) {
                    var string = jQuery.datepicker.formatDate('dd', date);
                    return [dtMovimentacao.includes(string)]
                },
                minDate: new Date(),
                onClose: setMecAtribDtMov

            });

            $("#cpDtAdmiss").datepicker({
                showOn: "button",
                beforeShowDay: noWeekendsOrHolidays,
                minDate: dtAdmiDisp.addDays(4)

            });

            function setMecAtribDtMov() {

                setTimeout(function () {
                    var dataSeleciondada = $("#cpDtMov").val();
                    VIEW.getInstance().calculaPrazoMecAtribDtAdmissao(dataSeleciondada);

                }, 1000);

            }

            function noWeekendsOrHolidays(date) {
                var noWeekend = jQuery.datepicker.noWeekends(date);
                return noWeekend[0] ? nationalDays(date) : noWeekend;
            }

            function nationalDays(date) {
                var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
                for (i = 0; i < dtAdmissao.length; i++) {
                    if (d > 20) {
                        if ($.inArray((m + 1) + '-' + d + '-' + y, dtAdmissao) == -1 || new Date() > date) {
                            return [false];
                        }
                    }
                }
                return [true];
            }
        };

        var setMascaras = function () {

            $("#cpSalarioAdmissao").mask("#.##0,00", { reverse: true });
            $("#cpNovoSalario").mask("#.##0,00", { reverse: true });
            $("#cpNovoSalarioProg").mask("#.##0,00", { reverse: true });
            $("#cpNovoSalarioEnq").mask("#.##0,00", { reverse: true });
        }

        var getTipoMaoObra = function (codColigada, codFuncao) {

            var data = Model.get_DS1000('SP_FLUIG_1049', `'${codColigada}','${codFuncao}','%','%'`).values;
            var tipoMaObra = data[0].MaoDeObra;

            var tipoExcecao = $("#cpTipoExcecao").val();

            if (tipoExcecao == '5') {
                $("#cpTipoMaoObraM").val(tipoMaObra);
                //setCodTipoMaoObra((tipoMaObra.slice(0, 3)), tipoExcecao, tipoMaObra);
                setCodTipoMaoObra((tipoMaObra.slice(0, 3)), tipoExcecao, 'cpCodTipoMaoObra');
            } else if (tipoExcecao == '1') {
                $("#cpTipoMaoDeObra").val(tipoMaObra);
                setCodTipoMaoObra((tipoMaObra.slice(0, 3)), tipoExcecao, 'cpCodTipoMaoObra');
            } else if (tipoExcecao == '3') {

                $("#cpTipoMaoObraF").val(tipoMaObra);
                setCodTipoMaoObra((tipoMaObra.slice(0, 3)), tipoExcecao, 'cpCodTipoMaoObra');
            }
        }

        var setCodTipoMaoObra = function (tipoMaoObra, codTipoExcecao, campoPreencherComCod) {

            if (codTipoExcecao == '5') {
                preencheCodMaoObra(campoPreencherComCod, tipoMaoObra);

            } else if (codTipoExcecao == '1') {
                preencheCodMaoObra(campoPreencherComCod, tipoMaoObra);
            } else if (codTipoExcecao == '3') {
                preencheCodMaoObra(campoPreencherComCod, tipoMaoObra);
            }
        }

        var preencheCodMaoObra = function (campoPreencherComCod, tipoMaoObra) {
            if (tipoMaoObra == "PRO") {
                $("#" + campoPreencherComCod).val('1');

            } else if (tipoMaoObra == "ENC") {
                $("#" + campoPreencherComCod).val('2');

            } else if (tipoMaoObra == "ADM") {
                $("#" + campoPreencherComCod).val('3');

            } else if (tipoMaoObra == "EST") {
                $("#" + campoPreencherComCod).val('4');
            }
        }

        var verificaObra = function (codSecao, codColigada, codTipoExcecao, campoObra) {
            var data = Model.get_DS1000('SP_FLUIG_1045', `'${codSecao}','${codColigada}'`).values;

            if ((data[0].TIPOSECAO.includes("OBRA")) || (data[0].TIPOSECAO.includes("ESCRITORIO / OBRA"))) {

                if (codTipoExcecao == '5') {
                    $('#divRecDocMov').show();

                } else if (codTipoExcecao == '1') {
                    $('#responsavelDocumentacao').show();
                }

                $('#' + campoObra).val('SIM');
                $('#cpExibRespRecDoc').val('mostrar');
            }

        };

        var buscaPeriodoAquisitivo = function (chapa) {

            var codColigada = $('#cpCodColig').val();
            var dadosPeriodo = Model.get_DS1000('SP_FLUIG_1048', `'${chapa}','${codColigada}'`).values;
            var inicio = (dadosPeriodo[0].INICIOPERAQUIS).split(" ")[0];
            var fim = (dadosPeriodo[0].FIMPERAQUIS).split(" ")[0];
            var periodoI = converteStringDoPeriodoEmData(inicio);
            var periodoF = converteStringDoPeriodoEmData(fim);
            var periodo = periodoI + " A " + periodoF;

            $('#cpPeriodoAquisitivo').val(periodo);

        };

        var converteStringDoPeriodoEmData = function (data) {

            var dia = data.split("-")[2]
            var mes = data.split("-")[1]
            var ano = data.split("-")[0]

            data = dia + "/" + mes + "/" + ano;

            return data;
        };

        var converteDataEmModeloAtribFluig = function (stringData) {

            var dia = stringData.split("/")[0]
            var mes = stringData.split("/")[1]
            var ano = stringData.split("/")[2]

            stringData = ano + "-" + mes + "-" + dia;

            return stringData;
        };

        var dateStrToDate = function (dateStr) {

            var dateArr = dateStr;
            var dia = dateArr.substring(0, 2);
            var mes = dateArr.substring(3, 5);
            var ano = dateArr.substring(6, 10);
            return new Date(mes + '/' + dia + '/' + ano);

        };

        var getDataConvertida = function (campo) {
            var inicioPeriodo = $("#" + campo).val();
            return dateStrToDate(inicioPeriodo);
        };

        var getInicioFerias = function () {
            return getDataConvertida('cpInicioFerias');
        };

        var getFimFerias = function () {
            return getDataConvertida('cpTerminoFerias');
        };


        var calcDiasFerias = function () {
            var diasFerias = getDiasFerias();
            diasFerias = diasFerias || 0;
            $("#cpDiasFerias").val(diasFerias);
        };

        var getDiasFerias = function () {
            var inicio = getInicioFerias();
            var fim = getFimFerias();
            var ONE_DAY = 1000 * 60 * 60 * 24
            var date1_ms = inicio.getTime()
            var date2_ms = fim.getTime()

            if (date1_ms < date2_ms) {

                var difference_ms = Math.abs((date2_ms - date1_ms) + ONE_DAY)
                return Math.round(difference_ms / ONE_DAY)

            } else {
                return 0;
            }

        };

        var mascaraSalario = function (salario, campo) {

            salario = salario.replace('.', '');
            $('#' + campo).val(salario);
            $("#" + campo).unmask();
            $("#" + campo).mask("#.##0,00", { reverse: true }/* , { reverse: true, maxlength: false } */);
        }

        var postoTrabalhoAtual = function (codColigada, chapa) {

            var postoAtual = Model.get_DS1000('SP_FLUIG_1030', `'${codColigada}','${chapa}'`).values;
            $("#cpPostTrabAtual").val(postoAtual[0].DESCRICAO);
        };

        var calculaPercentualAumento = function (cpSlAtual, cpSlNovo, cpPercAumSal) {

            var slAtual = $("#" + cpSlAtual).val();
            var slNovo = $("#" + cpSlNovo).val();

            slAtual = slAtual.replace('.', '').replace(',', '.');
            slNovo = slNovo.replace('.', '').replace(',', '.');

            var percAumento = (((slNovo - slAtual) / slAtual) * 100).toFixed(2);

            $("#" + cpPercAumSal).val(percAumento);
        };

        var calculaSalarioTransf = function (cpSlNovo, cpsalAdicTransf, percentTransf) {

            var valorParaMascara;
            var slNovo = $("#" + cpSlNovo).val();
            var percentual = parseFloat(($("#" + percentTransf).val()) / 100);

            slNovo = parseFloat(slNovo.replace('.', '').replace(',', '.'));

            var salario = (slNovo + (slNovo * percentual)).toFixed(2);

            $("#" + cpsalAdicTransf).val(salario);
            valorParaMascara = ($("#" + cpsalAdicTransf).val()).replace('.', '');

            VIEW.getInstance().mascaraSalario(valorParaMascara, 'cpSalarioAdicionalTrans');

        };

        var preencheDescritor = function () {

            tipoSolicitacao = $("#cpTipoExcecao :selected").text();
            $("#cpDescritor").val(tipoSolicitacao);
        };

        var converteDataEmString = function (dataCompleta, campoASerPreenchido) {

            dataCompleta = new Date(dataCompleta);

            var dia = dataCompleta.getDate();
            var mes = dataCompleta.getMonth() + 1;
            var ano = dataCompleta.getFullYear();

            if (dia < 10) {
                dia = "0" + dia;
            };

            if (mes < 10) {
                mes = "0" + mes;
            };

            $('#' + campoASerPreenchido).val(dia + '/' + mes + '/' + ano);
        };

        var somaDiaUteis = function (stringData, numDias) {

            var dtFnal = VIEW.getInstance().dateStrToDate(stringData);
            var dtAtual = new Date();

            if (dtFnal < dtAtual) {

                $('#cpPrazoProcExcAtrib').val("016:00");
                /* var contador = 0;
                var dtConv = dtAtual;

                while (contador < numDias) {

                    if ((dtConv.getDay() != 6) && (dtConv.getDay() != 0)) {

                        dtConv = dtConv.addDays(1);
                        contador++;
                        VIEW.getInstance().converteDataEmString(dtConv, 'cpPrazoProcExc');
                    } else {
                        dtConv = dtConv.addDays(1);
                    }
                } */
            }
        }

        var calculaPrazoMecAtribDtAdmissao = function (data) {

            var dataAdmissao = VIEW.getInstance().dateStrToDate(data);
            var inicio = new Date(dataAdmissao.getFullYear(), dataAdmissao.getMonth(), dataAdmissao.getDate());

            if (inicio.getDate() > 10) {
                var x = inicio.setMonth(inicio.getMonth() + 1);
                x = new Date(x);
                x = inicio.setDate(10);
                VIEW.getInstance().converteDataEmString(new Date(x), 'cpPrazoProcExc');
                var dtAtribuicao = VIEW.getInstance().converteDataEmModeloAtribFluig($("#cpPrazoProcExc").val());
                $('#cpPrazoProcExcAtrib').val(dtAtribuicao);

            } else {

                var x = inicio.setDate(10);
                VIEW.getInstance().converteDataEmString(new Date(x), 'cpPrazoProcExc');
                var dtAtribuicao = VIEW.getInstance().converteDataEmModeloAtribFluig($("#cpPrazoProcExc").val());
                $('#cpPrazoProcExcAtrib').val(dtAtribuicao);

            }

            var respFolha = $('#cpConsultorFolha').val();
            $('#cpMecAtribProcExc').val(respFolha);

        }
        var preencheDadosHierarquia = function (retorno) {

            $("#cpChapaGestor").val(retorno.CHAPA_GESTOR);
            $("#cpChapaSuper").val(retorno.CHAPA_SUPER);
            $("#cpChapaGerGeral").val(retorno.CHAPA_GG);
            $("#cpChapaDiretor").val(retorno.CHAPA_DIRETOR);
        }

        return {
            Inicializar: Inicializar,
            setStatusElementos: setStatusElementos,
            getTipoMaoObra: getTipoMaoObra,
            setCodTipoMaoObra: setCodTipoMaoObra,
            setDatePicker: setDatePicker,
            setMascaras: setMascaras,
            verificaObra: verificaObra,
            buscaPeriodoAquisitivo: buscaPeriodoAquisitivo,
            converteStringDoPeriodoEmData: converteStringDoPeriodoEmData,
            getDataConvertida: getDataConvertida,
            getInicioFerias: getInicioFerias,
            getFimFerias: getFimFerias,
            calcDiasFerias: calcDiasFerias,
            getDiasFerias: getDiasFerias,
            dateStrToDate: dateStrToDate,
            preencheCodMaoObra: preencheCodMaoObra,
            mascaraSalario: mascaraSalario,
            postoTrabalhoAtual: postoTrabalhoAtual,
            calculaPercentualAumento: calculaPercentualAumento,
            calculaSalarioTransf: calculaSalarioTransf,
            preencheDescritor: preencheDescritor,
            converteDataEmString: converteDataEmString,
            somaDiaUteis: somaDiaUteis,
            converteDataEmModeloAtribFluig: converteDataEmModeloAtribFluig,
            calculaPrazoMecAtribDtAdmissao: calculaPrazoMecAtribDtAdmissao,
            preencheDadosHierarquia: preencheDadosHierarquia


        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();