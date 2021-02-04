angular
  .module('AdfAdminApp')
  .controller('AdfTransfereAprovadorController', [
    '$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfTransfereAprovadorController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
        vm.Usuarios = Global.Cadastros.Fluig.Usuarios.content;
        vm.Estabelecimentos = Global.Cadastros.ERP.Estabelecimentos.content;
        vm.TiposDocumento = Global.Cadastros.ADF.TiposDocumento.content;
        vm.Lotacoes = Global.Cadastros.ADF.Lotacoes.content;

        vm.Filtros = {
          Estabelecimentos: [],
          TiposDocumento: [],
          Lotacoes: []
        };

        vm.done = true;
      }());

      vm.selectEstabelecimento = function selectEstabelecimento() {
        if (angular.isObject(vm.filtroEstabelecimento)) {
          const exists = vm.Filtros.Estabelecimentos.filter(e => e.codigo === vm.filtroEstabelecimento.codigo)[0];
          if (!exists) {
            vm.Filtros.Estabelecimentos.push(vm.filtroEstabelecimento);
            vm.filtroEstabelecimento = null;
          }
        }
      };

      vm.selectTipoDocumento = function selectTipoDocumento() {
        if (angular.isObject(vm.filtroTipoDocumento)) {
          const exists = vm.Filtros.TiposDocumento.filter(e => e.codigo === vm.filtroTipoDocumento.codigo)[0];
          if (!exists) {
            vm.Filtros.TiposDocumento.push(vm.filtroTipoDocumento);
            vm.filtroTipoDocumento = null;
          }
        }
      };

      vm.selectLotacao = function selectLotacao() {
        if (angular.isObject(vm.filtroLotacao)) {
          const exists = vm.Filtros.Lotacoes.filter(e => e.codigo === vm.filtroLotacao.codigo)[0];
          if (!exists) {
            vm.Filtros.Lotacoes.push(vm.filtroLotacao);
            vm.filtroLotacao = null;
          }
        }
      };

      vm.removeEstab = function removeEstab(estab) {
        const index = vm.Filtros.Estabelecimentos.indexOf(estab);
        vm.Filtros.Estabelecimentos.splice(index, 1);
      };

      vm.removeLotacao = function removeLotacao(lotacao) {
        const index = vm.Filtros.Lotacoes.indexOf(lotacao);
        vm.Filtros.Lotacoes.splice(index, 1);
      };

      vm.removeTipoDocumento = function removeTipoDocumento(tipoDocumento) {
        const index = vm.Filtros.TiposDocumento.indexOf(tipoDocumento);
        vm.Filtros.TiposDocumento.splice(index, 1);
      };

      vm.transfereAprovadores = function transfereAprovadores(form) {
        if (form.$valid) {
          vm.loading = true;
          vm.Resultado = [];

          vm.cadastrosAprovadores = [];
          vm.registrosAprovadores = 0;
          vm.registrosAprovadoresProcessados = 0;

          for (const cadastro in Global.Cadastros.ADF) {
            if (Global.Cadastros.ADF[cadastro].aprovadores) {
              vm.cadastrosAprovadores.push({
                name: cadastro,
                title: Global.Cadastros.ADF[cadastro].title,
                registros: 0,
                processados: 0
              });
            }
          }
          vm.cadastrosAprovadores.forEach((obj) => {
            Global.Cadastros.ADF[obj.name].content.forEach((cadastro) => {
              let alterou = false;
              if (vm.filtraCadastro(cadastro)) {
                cadastro.aprovadores.forEach((aprovador, index) => {
                  if (aprovador.aprovadorUsuario.colleagueId == vm.usuarioOrigem.colleagueId) {
                    obj.registros++;
                    vm.registrosAprovadores++;
                    const exists = cadastro.aprovadores.filter(e => e.aprovadorUsuario.colleagueId === vm.usuarioDestino.colleagueId)[0];

                    if (exists) {
                      cadastro.aprovadores.splice(index, 1);
                    } else {
                      vm.deparaAprovador(aprovador);
                    }

                    alterou = true;
                  }
                });
                if (alterou) {
                  vm.transfere(cadastro, obj);
                }
              }
            });
          });

          // vm.loading = true;
        }
      };

      vm.filtraCadastro = function filtraCadastro(cadastro) {
        let estab = true,
          tipoDocumento = true,
          lotacao = true;

        if (vm.Filtros.Estabelecimentos.length > 0) {
          if (cadastro.estabelecimento) {
            estab = vm.Filtros.Estabelecimentos.filter(e => e.codigo === cadastro.estabelecimento.codigo)[0];
          }
        }
        if (vm.Filtros.TiposDocumento.length > 0) {
          if (cadastro.tipoDocumento) {
            tipoDocumento = vm.Filtros.TiposDocumento.filter(e => e.codigo === cadastro.tipoDocumento.codigo)[0];
          }
        }
        if (vm.Filtros.Lotacoes.length > 0) {
          if (cadastro.lotacao) {
            lotacao = vm.Filtros.Lotacoes.filter(e => e.codigo === cadastro.lotacao.codigo)[0];
          }
        }

        return estab && tipoDocumento && lotacao;
      };

      vm.transfere = function transfere(documento, cadastro) {
        fluigService.editCard(documento)
          .then((result) => {
            vm.Resultado.push({
              cadastro: cadastro.title,
              displaykey: documento.displaykey,
              documentid: documento.documentid,
              result: 'Transferido com sucesso'
            });
            vm.checkCadastro(cadastro);
          }, (error) => {
            vm.Resultado.push({
              cadastro: cadastro.title,
              displaykey: documento.displaykey,
              documentid: documento.documentid,
              result: error.result.data
            });
            vm.checkCadastro(cadastro);
          });
      };

      vm.checkCadastro = function checkCadastro(cadastro) {
        cadastro.processados++;
        vm.registrosAprovadoresProcessados++;

        if (vm.registrosAprovadores === vm.registrosAprovadoresProcessados) {
          const str = vm.toCsv(vm.pivot(vm.Resultado));

          if (str !== '') {
            vm.strToFile(str, 'resultado.csv');
          }

          vm.loading = false;
        }
      };

      vm.deparaAprovador = function deparaAprovador(aprovador) {
        aprovador.aprovadorUsuario.mail = vm.usuarioDestino.mail;
        aprovador.aprovadorUsuario.colleagueId = vm.usuarioDestino.colleagueId;
        aprovador.aprovadorUsuario.colleagueName = vm.usuarioDestino.colleagueName;
        aprovador.aprovadorCodUsuario = vm.usuarioDestino.colleagueId;
        aprovador.aprovadorUsuario_input = vm.usuarioDestino.colleagueName;
      };

      vm.pivot = function pivot(arr) {
        const mp = new Map();

        function setValue(a, path, val) {
          const ignoreFields = [
            'metadata#parent_id',
            'Params',
            'Errors',
            'metadata#card_index_id',
            'companyid',
            'metadata#version',
            'cardid',
            'metadata#active',
            'tableid',
            'id',
            'metadata#id',
            'metadata#card_index_version',
            'aprovadores.metadata#parent_id',
            'wdk_sequence_id',
            'version',
            'metadata#card_index_id',
            'masterid',

          ];

          // if (ignoreFields.indexOf(path) < 0) {
          if (Object(val) !== val) { // primitive value
            const pathStr = path.join('.');
            const i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size))
              .get(pathStr);
            a[i] = val;
          } else {
            for (const key in val) {
              if (ignoreFields.indexOf(key) < 0) {
                setValue(a, key == '0' ? path : path.concat(key), val[key]);
              }
            }
            // }
          }
          return a;
        }

        const result = arr.map(obj => setValue([], [], obj));
        return [
          [...mp.keys()], ...result
        ];
      };

      vm.toCsv = function toCsv(arr) {
        return arr.map(row =>
            row.map(val => isNaN(val) ? JSON.stringify(val) : +val)
            .join(';')
          )
          .join('\n');
      };

      vm.strToFile = function strToFile(str, file) {
        const blob = new Blob(['\ufeff', str], {
          type: 'text/csv;charset=UTF-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, file);
        } else {
          const downloadContainer = angular.element('<div data-tap-disabled="true"><a></a></div>');
          const downloadLink = angular.element(downloadContainer.children()[0]);
          downloadLink.attr('href', window.URL.createObjectURL(blob));
          downloadLink.attr('download', file);
          downloadLink.attr('target', '_blank');

          $document.find('body')
            .append(downloadContainer);
          $timeout(() => {
            downloadLink[0].click();
            downloadLink.remove();
          }, null);
        }
      };
    }
  ]);
