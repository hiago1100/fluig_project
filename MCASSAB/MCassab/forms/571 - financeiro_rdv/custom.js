var app = angular.module('RDVApp', ['fluig.directives', 'angular.fluig', 'ngAnimate', 'totvs.service', 'fluig.service']);

app.controller('RDVController', ['$scope', '$http', '$timeout', 'totvsService', 'fluigService',
    function ($scope, $http, $timeout, totvsService, fluigService) {

        $scope.templatesDir = fluigService.templatesDir + "financeiro_rdv/";

        fluigService.atualizaFormulario($scope, ["Geral", "DespesaIds", "Despesas", "Integracao", "Ccustos"]).then(
            function () {
                $scope.atualizaEtapa();
            }
        )
        $scope.resultFieldsUsuario = ["colleagueName", "mail", "colleagueId", "colleaguePK.colleagueId"];
        $scope.resultFieldsDespesa = ["contaContabil", "valorPadrao", "alteraValor", "descricao", "alteraQtde", "valorLimite", "qtdePadrao", "ativa"];
        $scope.resultFieldsCcusto = ["cod_empresa", "cod_plano_ccusto", "cod_ccusto", "displayKey", "descricao", "responsavel"];

        $scope.atualizaEtapa = function () {

            $scope.Formulario.today = new Date();

            switch ($scope.Params.etapa) {
                case 'inicio':
                    if ($scope.Params.edit) {

                        $("form").hide();
                        var loading = FLUIGC.loading('body', {
                            textMessage: 'Aguarde...',
                        });
                        loading.show();

                        $timeout(function () {
                            $scope.Usuarios = fluigService.getUsuarios(null, $scope.resultFieldsUsuario);

                            var u = $scope.Usuarios.map(function (x) {
                                return x.colleagueId.toString();
                            }).indexOf($scope.Params.responsavel);

                            var solicitante = $scope.Usuarios[u];

                            $scope.Despesas = fluigService.getParametroDespesas(null, $scope.resultFieldsDespesa);
                            $scope.Ccustos = totvsService.getCcustoUsuario(solicitante.mail);
                            $scope.Estabelecimentos = totvsService.getEstabelecimento();

                            if ($scope.Params.formMode == "ADD") {
                                $scope.Formulario.Geral = {
                                    "solicitante": solicitante,
                                    "viajante": solicitante
                                }
                                $scope.Formulario.Despesas = [];
                                $scope.Formulario.DespesaIds = [];

                                $scope.selecionaViajante();
                            }

                            $("form").fadeIn();
                            loading.hide();

                        }, 1000)

                    }

                    break;

                case 'revisarSolicitacao':

                    $("form").hide();
                    var loading = FLUIGC.loading('body', {
                        textMessage: 'Aguarde...',
                    });
                    loading.show();

                    $timeout(function () {
                        var solicitante = fluigService.getUsuarios($scope.Params.responsavel, $scope.resultFieldsUsuario)[0];

                        $scope.Despesas = fluigService.getParametroDespesas(null, $scope.resultFieldsDespesa);
                        $scope.Ccustos = totvsService.getCcustoUsuario(solicitante.mail);
                        $scope.Estabelecimentos = totvsService.getEstabelecimento();

                        angular.forEach($scope.Formulario.Despesas, function (despesa, i) {

                            var i = $scope.Despesas.map(function (x) {
                                return x.codigo;
                            }).indexOf(despesa.item.codigo);

                            despesa.item = $scope.Despesas[i];

                        })

                        $("form").fadeIn();
                        loading.hide();
                    }, 1000)

                    break;

                case 'aprovarDespesasCcusto':
                    $scope.aprovarTudo();
                    $scope.calculaTotalAprovador();
                    break;

                case 'aprovarDespesasGestor':
                    $scope.aprovarTudo();
                    $scope.calculaTotalAprovador();

                    break;

                case 'analisarErrosIntegracao':
                    $("form").hide();
                    var loading = FLUIGC.loading('body', {
                        textMessage: 'Aguarde...',
                    });
                    loading.show();

                    $timeout(function () {
                        $scope.Despesas = fluigService.getParametroDespesas();
                        $scope.Ccustos = totvsService.getCcusto();
                        $scope.Estabelecimentos = totvsService.getEstabelecimento();

                        $("form").fadeIn();
                        loading.hide();
                    }, 1000)

                    break;
            }

            if ($scope.Formulario.Integracao && $scope.Formulario.Integracao.ttTitulo) $scope.Params.relatorio = true;

            if (FLUIGC.utilities.checkBrowser().isIe()) {
                $("body").addClass("ie");
            }
        }

        $scope.calculaTotalAprovador = function () {

            $scope.Formulario.totalAprovar = 0;
            $scope.Formulario.totalAprovado = 0;
            $scope.Formulario.totalReprovado = 0;

            angular.forEach($scope.Formulario.Ccustos, function (ccusto, i) {

                if ($scope.aprovadorResponsavel(ccusto)) {

                    $scope.Formulario.Despesas
                        .filter(function (despesa) {
                            return despesa.ccusto.displayKey == ccusto.displayKey
                        })
                        .forEach(function (despesa) {
                            if (!despesa.done) $scope.Formulario.totalAprovar += despesa.valorTotal;
                            if (despesa.status == 'A') $scope.Formulario.totalAprovado += despesa.valorTotal;
                            if (despesa.status == 'R') $scope.Formulario.totalReprovado += despesa.valorTotal;
                        });
                }
            })
        }

        $scope.aprovarTudo = function () {

            angular.forEach($scope.Formulario.Ccustos, function (ccusto, i) {

                if ($scope.aprovadorResponsavel(ccusto)) {
                    $scope.statusGeral(ccusto, 'A');
                }
            })
        }

        $scope.atualizaTotalDespesa = function (despesa) {
            if (despesa) despesa.valorTotal = despesa.qtde * despesa.valor;
            $scope.Formulario.Geral.valorTotal = 0;
            angular.forEach($scope.Formulario.Despesas, function (d) {
                $scope.Formulario.Geral.valorTotal = $scope.Formulario.Geral.valorTotal + d.valorTotal;
            })
        }

        $scope.selecionaViajante = function () {

            $scope.removeDespesas();

            if (typeof $scope.Formulario.Geral.viajante == "object") {
                $scope.Formulario.Geral.viajante.colaborador = fluigService.getParametroUsuario($scope.Formulario.Geral.viajante.colleagueId)[0];

                if (!$scope.Formulario.Geral.viajante.colaborador) {
                    $scope.Formulario.Geral.viajante.colaborador = totvsService.getFuncionario($scope.Formulario.Geral.viajante.mail)[0];
                    if ($scope.Formulario.Geral.viajante.colaborador) {
                        $scope.Formulario.Geral.viajante.colaborador.ccusto = totvsService.getCcusto($scope.Formulario.Geral.viajante.colaborador.cod_empresa_ems, null, $scope.Formulario.Geral.viajante.colaborador.cod_rh_ccusto)[0];
                        $scope.Formulario.Geral.viajante.colaborador.estabelecimento = totvsService.getEstabelecimento($scope.Formulario.Geral.viajante.colaborador.cod_empresa_ems, $scope.Formulario.Geral.viajante.colaborador.cod_estab_ems)[0];

                    }
                } else {
                    $scope.Formulario.Geral.viajante.colaborador = $scope.Formulario.Geral.viajante.colaborador.Usuario;
                }

                if ($scope.Formulario.Geral.viajante.colaborador) {
                    $scope.Formulario.Geral.estabelecimento = $scope.Formulario.Geral.viajante.colaborador.estabelecimento;

                    if ($scope.Formulario.Geral.viajante.colaborador.ccusto) {
                        var i = $scope.Ccustos.map(function (x) {
                            return x.cod_ccusto;
                        }).indexOf($scope.Formulario.Geral.viajante.colaborador.ccusto.cod_ccusto);

                        if (i < 0) {
                            $scope.Ccustos.unshift($scope.Formulario.Geral.viajante.colaborador.ccusto);
                        }
                    }
                    $scope.adicionaDespesa();
                }

            }
        }

        $scope.adicionaDespesa = function () {

            $scope.toggleDespesa();

            var fluigId = wdkAddChild("Despesas");

            $scope.Formulario.DespesaIds.unshift(fluigId);
            $scope.Formulario.Despesas.unshift({
                "fluigId": fluigId,
                "ccusto": $scope.Formulario.Geral.viajante.colaborador.ccusto,
                "editing": true
            });

            $("#despesa___" + fluigId).val(JSON.stringify($scope.Formulario.Despesas[0]));

            $timeout(function () {

                if ($("#despesaItem")[0])
                    $("#despesaItem")[0].focus();
            }, 100)
        }

        $scope.removeDespesa = function (index) {
            fnWdkRemoveChild($("#despesa___" + $scope.Formulario.Despesas[index].fluigId)[0]);
            $scope.Formulario.DespesaIds.splice(index, 1);
            $scope.Formulario.Despesas.splice(index, 1);
            $scope.atualizaTotalDespesa();
        }
        $scope.removeDespesas = function () {
            angular.forEach($scope.Formulario.Despesas, function (despesa, index) {
                $scope.removeDespesa(index);
            })
        }


        $scope.saveEditDespesa = function (despesa) {
            if (!despesa.item) {
                $scope.erro("Informe a despesa");
                return;
            }

            if (!despesa.ccusto) {
                $scope.erro("Informe o centro de custo");
                return;
            }

            if (!despesa.valorTotal || despesa.valorTotal == 0) {
                $scope.erro("Informe o valor");
                return;
            }

            if (despesa.item.valorLimite > 0 && despesa.valorTotal > despesa.item.valorLimite) {
                $scope.erro("Valor da despesa maior que o limite");
                return;
            }

            if (!despesa.obs || despesa.obs == "") {
                $scope.erro("Informe as observações");
                return;
            }

            if (despesa.editing) {
                despesa.editing = false;
                $("#btnAddDespesa").focus();
            } else {
                despesa.editing = true;
            }
        }

        $scope.toggleDespesa = function () {
            angular.forEach($scope.Formulario.Despesas, function (despesa) {
                despesa.editing = false;
            })
        }

        $scope.aprovadorResponsavel = function (ccusto) {

            if ($scope.processDefinition.managerMode) return true;

            if ($scope.Params.etapa == 'aprovarDespesasCcusto') {
                return ccusto.aprovador.colleagueId == $scope.Params.responsavel || ccusto.aprovador.colleagueId == $scope.processDefinition.taskUserId;
            } else {
                if ($scope.Params.etapa == 'aprovarDespesasGestor') {
                    return $scope.Formulario.Geral.gestorCcustoViajante == $scope.Params.responsavel || $scope.Formulario.Geral.gestorCcustoViajante == $scope.processDefinition.taskUserId;
                }
            }
            return false;
        }

        $scope.statusGeral = function (ccusto, status) {
            angular.forEach($scope.Formulario.Despesas, function (despesa, i) {
                if (despesa.ccusto.cod_ccusto == ccusto.cod_ccusto && !despesa.done) {

                    despesa.status = status;
                }
            })
        }

        $scope.erro = function (message) {
            FLUIGC.toast({
                title: 'Erro',
                message: message,
                type: 'warning',
                timeout: 7000
            });
        }
        $scope.imprime = function () {
            if (parent.WCMAPI) {

                if (parent.WCMAPI.isIe()) {
                    printModeView();
                } else {
                    window.print();
                }
            } else {
                window.print();
            }
        }
    }
]);