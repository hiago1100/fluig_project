angular.module('AdfApp', ['adf.directives', 'angular.fluig', 'ngAnimate', 'adf.services', 'chart.js'])

  .controller('AdfController', ['$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService',
    function AdfController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService) {
      const vm = this;

      vm.Errors = [];

      const ParamGeral = adfService.getParamGeral()[0];

      angular.element($window)
        .on('resize', () => {
          $scope.$apply(() => {
            vm.checkInnerWidth();
          });
        });

      fluigService.findUserAppParamByUser({
          userId: WCMAPI.userCode,
          companyId: WCMAPI.tenantCode
        })
        .then((result) => {
          angular.forEach(result.params, (param) => {
            vm[param.userApplicationParameterPK.parameterName] = param.parameterValue;
          });

          vm.temaGerencial = vm.temaGerencial || ParamGeral.temaGerencial;
          vm.listaGerencial = vm.listaGerencial || ParamGeral.listaGerencial;

          vm.checkInnerWidth();
        }, (error) => {
          $log.error(error);
        });

      if (!ParamGeral) {
        vm.Errors.push('Parâmetros gerais não cadastrados');
        return;
      }

      vm.checkInnerWidth = function checkInnerWidth() {
        if ($window.innerWidth < 1024) {
          vm.mobile = true;
        } else {
          vm.mobile = false;
        }
      };

      vm.load = function load() {
        try {
          vm.done = false;

          adfService.buscaDocumentosPendentes(vm.selectedUser.colleagueId)
            .then((result) => {
              vm.Processos = result;
              vm.inicia();
            }, (error) => {
              vm.Errors.push(`Erro na busca de documentos pendentes: ${error}`);
              vm.done = true;
              vm.Control.tab = 1;
            });
        } catch (error) {
          vm.Errors.push(`Erro na busca de documentos pendentes: ${error}`);
          vm.done = true;
          vm.Control.tab = 1;
        }
      };

      fluigService.getValidReplacedUsers()
        .then((result) => {
          vm.Users = result;
          if (!vm.Users || vm.Users.length === 0) {
            vm.Users = fluigService.getUsuarios(WCMAPI.userCode, ['colleagueName', 'colleagueId']);
          }
          const current = vm.Users.filter(u => String(u.colleagueId) === String(WCMAPI.userCode))[0];
          vm.selectUser(current);
        }, (error) => {
          $log.error(error);
        });

      vm.saveUserPreferences = function saveUserPreferences(parameterName) {
        fluigService.saveUserApplicationParameter({
          codAplicat: 'adf',
          userId: WCMAPI.userCode,
          companyId: WCMAPI.tenantCode,
          parameterName,
          parameterValue: vm[parameterName]
        });
      };

      vm.selectUser = function selectUser(user) {
        if (vm.selectedUser !== user) {
          vm.selectedUser = user;
          vm.load();
        }
      };

      vm.inicia = function inicia() {
        try {
          vm.atualizaFiltros();
          vm.atualizaProcessos();
          vm.calculaTotais();
          vm.done = true;
          vm.Control.tab = 1;
        } catch (error) {
          vm.Errors.push(`Erro ao iniciar a página: ${error}`);
          vm.done = true;
          vm.Control.tab = 1;
          $log.error(error);
        }
      };

      vm.atualizaFiltros = function atualizaFiltros() {
        vm.Filtros = {
          Especies: [],
          selectedEspecies: [],
          Estabelecimentos: [],
          selectedEstabs: [],
          TiposDocumento: [],
          selectedTiposDocto: [],
          startDate: undefined,
          endDate: undefined,
          presetsDate: [{
            name: 'Esta Semana',
            start: moment()
              .startOf('week')
              .startOf('day'),
            end: moment()
              .endOf('week')
              .endOf('day'),
          }, {
            name: 'Este Mês',
            start: moment()
              .startOf('month')
              .startOf('day'),
            end: moment()
              .endOf('month')
              .endOf('day'),
          }, {
            name: 'Este Ano',
            start: moment()
              .startOf('year')
              .startOf('day'),
            end: moment()
              .endOf('year')
              .endOf('day'),
          }, {
            name: 'Redefinir',
            start: undefined,
            end: undefined,
          }]

        };

        angular.forEach(vm.Processos, (processo) => {
          let iEspecie = vm.Filtros.Especies.map(x => x.codEspecie)
            .indexOf(processo.codEspecie);

          if (iEspecie < 0) {
            let especie;
            if (processo.codEspecie) { especie = erpService.getEspecDocto(processo.codEspecie)[0]; }
            vm.Filtros.Especies.unshift({
              codEspecie: processo.codEspecie,
              especie: especie ? especie.descricao : 'N/D',
              qtd: 0
            });
            iEspecie = 0;
          }

          vm.Filtros.Especies[iEspecie].qtd += 1;

          let iEstab = vm.Filtros.Estabelecimentos.map(x => x.codEstab)
            .indexOf(processo.codEstab);

          if (iEstab < 0) {
            vm.Filtros.Estabelecimentos.unshift({
              codEstab: processo.codEstab,
              estab: processo.estab,
              qtd: 0
            });
            iEstab = 0;
          }

          vm.Filtros.Estabelecimentos[iEstab].qtd += 1;

          let iTipoDocumento = vm.Filtros.TiposDocumento.map(x => x.codTipoDocto)
            .indexOf(processo.codTipoDocto);

          if (iTipoDocumento < 0) {
            vm.Filtros.TiposDocumento.unshift({
              codTipoDocto: processo.codTipoDocto,
              tipoDocto: processo.tipoDocto,
              qtd: 0
            });
            iTipoDocumento = 0;
          }

          vm.Filtros.TiposDocumento[iTipoDocumento].qtd += 1;
        });
      };

      vm.atualizaProcessos = function atualizaProcessos() {
        const childrenTipoDocumento = [{
          name: 'camposLista',
          fields: ['campoListaCodigo', 'campoListaDescricao', 'campoListaTipoType']
        }];

        vm.existemDocumentosProximoPrazo = false;

        angular.forEach(vm.Filtros.TiposDocumento, (td) => {
          const tipoDocto = adfService.getTipoDocumento(td.codTipoDocto, null, childrenTipoDocumento)[0];

          if (tipoDocto) {
            td.camposLista = tipoDocto.camposLista;

            fluigService.appendScript(tipoDocto.templateController)
              .then(() => {
                try {
                  vm.Processos.filter(p => String(p.codTipoDocto) === String(tipoDocto.codigo))
                    .forEach((p) => {
                      p.tab = 1;
                      p.dataRef = new Date(p.dataRef);
                      p.TipoDocumento = tipoDocto;

                      p.dateExpires = p.dateExpires.replace('Desde ', '');
                      p.dateExpires = p.dateExpires.replace('Até ', '');

                      if (tipoDocto.destacarDoctoPrazo) {
                        p.prazoDestacar = moment(p.dateExpires);
                        p.prazoDestacar.subtract(tipoDocto.prazoDestacar, 'days');
                        p.proximoPrazo = moment(new Date()) - p.prazoDestacar > 0;
                      }
                      if (p.proximoPrazo) {
                        vm.existemDocumentosProximoPrazo = true;
                      }
                      fluigService.getActiveDocument(p.codDoctoTemplate)
                        .then((documento) => {
                          if (p.TipoDocumento.atributoPaiJson) {
                            documento = globalService.deepValue(documento, p.TipoDocumento.atributoPaiJson);
                          }
                          p.doctoTemplate = documento;
                        });
                    });
                } catch (error) {
                  vm.Errors.push(`Erro ao instanciar o script do documento ${tipoDocto.descricao}: ${error}`);
                  $log.error('error appendScript', error);

                  vm.done = true;
                  vm.Control.tab = 1;
                }
              });
          } else {
            vm.Errors.push(`Documento Não encontrado com o código ${td.codTipoDocto}`);
            $log.error('Documento Não encontrado com o código ', td.codTipoDocto);

            vm.done = true;
            vm.Control.tab = 1;
          }
        });
      };

      vm.calculaTotais = function calculaTotais() {
        vm.Total = {
          aprovado: 0,
          reprovado: 0,
          pendente: 0
        };

        angular.forEach(vm.Processos, (processo) => {
          if (vm.filterProcesso(processo)) {
            switch (processo.status) {
            case 'A':
              vm.Total.aprovado += Number(processo.valor);
              break;
            case 'R':
              vm.Total.reprovado += Number(processo.valor);
              break;
            default:
              vm.Total.pendente += Number(processo.valor);
              break;
            }
          }
        });

        vm.Grafico.data[0] = (Number(vm.Total.aprovado));
        vm.Grafico.data[1] = (Number(vm.Total.reprovado));
        vm.Grafico.data[2] = (Number(vm.Total.pendente));
      };

      vm.closeDetalhe = function closeDetalhe() {
        vm.selectedProcesso = null;
        vm.doctoOpen = false;
      };

      vm.modalDetalhe = function modalDetalhe(processo) {
        processo.visualizado = true;
        vm.selectedProcesso = processo;
        vm.doctoOpen = true;
      };

      vm.alteraStatusTipoDocumento = function alteraStatusTipoDocumento(tipoDocto, status) {
        angular.forEach(vm.Processos, (processo) => {
          if (vm.filterProcesso(processo)) {
            if (processo.codTipoDocto === tipoDocto.codTipoDocto) {
              processo.status = status;
            }
          }
        });

        vm.calculaTotais();
      };

      vm.alteraStatus = function alteraStatus(processo, status) {
        if (processo.status === status) {
          processo.status = null;
        } else {
          processo.status = status;
        }
        vm.calculaTotais();
      };
      vm.statusGeral = function statusGeral(status) {
        angular.forEach(vm.Processos, (processo) => {
          if (vm.filterProcesso(processo)) { processo.status = status; }
        });

        vm.calculaTotais();
      };

      vm.send = function send() {

        vm.processosPendentes = [];

        angular.forEach(vm.Processos, (processo, index) => {
          if (processo.status && processo.status !== '' && !processo.done) {
            if (((processo.status === 'A' && processo.TipoDocumento.aprovVisualizarDetalhe === true) ||
                (processo.status === 'R' && processo.TipoDocumento.reprovVisualizarDetalhe === true)) &&
              !processo.visualizado) {
              processo.result = {
                status: 'ERROR',
                message: 'Você deve visualizar os detalhes do documento para continuar.'
              };
            }

            if (((processo.status === 'A' && processo.TipoDocumento.aprovObrigaNarrativa === true) ||
                (processo.status === 'R' && processo.TipoDocumento.reprovObrigaNarrativa === true)) &&
              !processo.comments) {
              processo.result = {
                status: 'ERROR',
                message: 'Você deve informar as observações do documento para continuar.'
              };
            }

            if (!processo.result) {
              processo.selectedState = processo.status == 'A' ? '4' : '5';
              vm.processosPendentes.push(processo);
            }
          }
        });

        console.log(vm.processosPendentes);

        if (vm.processosPendentes.length > 0) {

          vm.stateLoaded = 0;
          vm.loading = true;

          vm.statesAndVersions = [];

          vm.processosPendentes.forEach(p => {
            let proc = vm.statesAndVersions.filter(sv => sv.selectedState === p.selectedState && sv.version == p.version)[0];
            if (!proc) {
              vm.statesAndVersions.push({
                selectedState: p.selectedState,
                version: p.version
              })
            }
          });

          console.log(vm.statesAndVersions);

          vm.statesAndVersions.forEach(stateAndVersion => {

            const processosByState = vm.processosPendentes.filter(p => p.selectedState === stateAndVersion.selectedState && p.version === stateAndVersion.version);

            if (processosByState.length > 0) {
              try {
                adfService.aprovaReprovaDocumentoEmBloco(processosByState, vm.selectedUser.colleagueId, stateAndVersion.selectedState)
                  .then(result => {

                    result.content.forEach(resProcess => {
                      const processo = vm.Processos.filter(p => p.processInstanceId == resProcess.instanceId)[0];
                      if (processo) {

                        const status = processo.status === 'A' ? 'Aprovado' : 'Reprovado';
                        processo.done = true;
                        processo.result = {
                          status: resProcess.status,
                          message: resProcess.status == 'SUCCESS' ? `Documento ${status} com sucesso` : resProcess.message
                        };
                      }
                    });

                    vm.checkStateLoaded();

                  }, (error) => {

                    processosByState.forEach(processo => {
                      processo.result = {
                        status: 'ERROR',
                        message: error.data.message.message || error.data.message || 'Ocorreu um erro ao processar a solicitação'
                      };
                    })

                    vm.checkStateLoaded();
                    $log.error(error);
                  });
              } catch (error) {
                vm.checkStateLoaded();
                $log.error(error);
              }
            } else {
              vm.checkStateLoaded();
            }
          })
        }
      };

      vm.checkStateLoaded = function checkStateLoaded() {
        vm.stateLoaded++;
        if (vm.stateLoaded === vm.statesAndVersions.length) {
          vm.loading = false;
        }
      }

      vm.selectEspecie = function selectEspecie(especie) {
        especie.selected = !especie.selected;
        vm.Filtros.selectedEspecies = vm.Filtros.Especies.filter(e => e.selected === true);
        vm.filtra();
      };

      vm.selectEstab = function selectEstab(estab) {
        estab.selected = !estab.selected;
        vm.Filtros.selectedEstabs = vm.Filtros.Estabelecimentos.filter(e => e.selected === true);
        vm.filtra();
      };

      vm.selectTipoDocto = function selectTipoDocto(tipoDocto) {
        tipoDocto.selected = !tipoDocto.selected;
        vm.Filtros.selectedTiposDocto = vm.Filtros.TiposDocumento.filter(e => e.selected === true);
        vm.filtra();
      };

      vm.filtra = function filtra() {
        vm.Filtros.Especies.forEach(especie => especie.qtd = 0);
        vm.Filtros.Estabelecimentos.forEach(estab => estab.qtd = 0);
        vm.Filtros.TiposDocumento.forEach(tipoDocto => tipoDocto.qtd = 0);

        angular.forEach(vm.Processos, (processo) => {
          processo.hide = !vm.filterProcesso(processo);
          if (!processo.hide) {
            vm.Filtros.Especies[
              vm.Filtros.Especies.map(x => x.codEspecie)
              .indexOf(processo.codEspecie)
            ].qtd += 1;

            vm.Filtros.Estabelecimentos[
              vm.Filtros.Estabelecimentos.map(x => x.codEstab)
              .indexOf(processo.codEstab)
            ].qtd += 1;

            vm.Filtros.TiposDocumento[
              vm.Filtros.TiposDocumento.map(x => x.codTipoDocto)
              .indexOf(processo.codTipoDocto)
            ].qtd += 1;
          }
        });

        vm.calculaTotais();
      };

      vm.filterProcesso = function filterProcesso(processo) {
        const especie = !vm.Filtros.selectedEspecies || vm.Filtros.selectedEspecies.length === 0 ||
          vm.Filtros.selectedEspecies.filter(e => e.codEspecie === processo.codEspecie)
          .length > 0;

        const estab = !vm.Filtros.selectedEstabs || vm.Filtros.selectedEstabs.length === 0 ||
          vm.Filtros.selectedEstabs.filter(e => e.codEstab === processo.codEstab)
          .length > 0;

        const tipoDocto = !vm.Filtros.selectedTiposDocto || vm.Filtros.selectedTiposDocto.length === 0 ||
          vm.Filtros.selectedTiposDocto.filter(e => e.codTipoDocto === processo.codTipoDocto)
          .length > 0;

        const startDate = !vm.Filtros.startDate || moment(processo.dataRef)
          .startOf('day') >= vm.Filtros.startDate.startOf('day');
        const endDate = !vm.Filtros.endDate || moment(processo.dataRef)
          .startOf('day') <= vm.Filtros.endDate.startOf('day');

        return estab && tipoDocto && especie && startDate && endDate;
      };

      vm.closeResult = function closeResult(processo) {
        if (processo.result.status === 'ERROR') {
          processo.result = null;
        } else {
          processo.done = true;
        }
      };

      vm.Control = {
        tab: 1
      };
      vm.Grafico = {
        data: [],
        labels: ['Aprovado', 'Reprovado', 'Pendente'],
        colors: ['#27ae60', '#c0392b', '#bdc3c7', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };

      vm.closeDateFilter = function closeDateFilter() {
        vm.filtra();
      };

      $scope.dynamicOrder = function (processo) {
        let order = '';

        if (processo.TipoDocumento && processo.doctoTemplate) {
          if (processo.TipoDocumento.campoClassificaCodigo && processo.TipoDocumento.campoClassificaCodigo !== '') {
            order = processo.doctoTemplate[processo.TipoDocumento.campoClassificaCodigo];

            switch (processo.TipoDocumento.campoClassificaTipoType) {
            case 'date':
              order = new Date(order);
              break;
            case 'number':
              order = Number(order);
              break;
            case 'currency':
              order = Number(order);
              break;
            default:
              order = order;
              break;
            }

            if (processo.TipoDocumento.campoClassificaReverso) {
              order = -order;
            }
          }
        }

        return order;
      };
    }
  ]);
