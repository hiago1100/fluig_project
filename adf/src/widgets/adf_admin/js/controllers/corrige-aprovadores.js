angular
  .module('AdfAdminApp')
  .controller('AdfCorrigeAprovadoresController', [
    '$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfCorrigeAprovadoresController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
        vm.Usuarios = Global.Cadastros.Fluig.Usuarios.content;

        vm.done = true;
      }());

      vm.corrigeAprovadores = function corrigeAprovadores(form) {
        if (form.$valid) {
          vm.loading = true;
          vm.Resultado = [];

          vm.cadastrosAprovadores = [];
          vm.cadastrosUsuarios = [];
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
            if (Global.Cadastros.ADF[cadastro].usuario) {
              vm.cadastrosUsuarios.push({
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
              cadastro.aprovadores.forEach((aprovador, index) => {
                const usuario = vm.Usuarios.filter(u => u.login == aprovador.aprovadorUsuario.colleagueId)[0];

                if (usuario && usuario.login !== usuario.colleagueId) {
                  aprovador.aprovadorUsuario.mail = usuario.mail;
                  aprovador.aprovadorUsuario.colleagueId = usuario.colleagueId;
                  aprovador.aprovadorUsuario.colleagueName = usuario.colleagueName;
                  aprovador.aprovadorCodUsuario = usuario.colleagueId;
                  aprovador.aprovadorUsuario_input = usuario.colleagueName;
                  alterou = true;
                }
              });

              // cadastro.displaykey = 'Estab: ' + cadastro.estabelecimento.displaykey + ' | Lotação: ' + cadastro.lotacao.displaykey + ' | Tipo Documento: ' + cadastro.tipoDocumento.displaykey + ' | Faixa: ' + cadastro.faixa.faixaCodigo;
              if (alterou) {
                obj.registros++;
                vm.registrosAprovadores++;
                vm.pushResultado(cadastro, obj);
              }
            });
          });

          vm.cadastrosUsuarios.forEach((obj) => {
            $log.log(obj);
            Global.Cadastros.ADF[obj.name].content.forEach((cadastro) => {
              let alterou = false;

              const usuario = vm.Usuarios.filter(u => u.login == cadastro.codUsuario)[0];

              $log.log(usuario, cadastro.codUsuario, cadastro.usuario);

              if (usuario && usuario.login !== usuario.colleagueId) {
                cadastro.usuario.mail = usuario.mail;
                cadastro.usuario.colleagueId = usuario.colleagueId;
                cadastro.usuario.colleagueName = usuario.colleagueName;
                cadastro.codUsuario = usuario.colleagueId;
                cadastro.usuario_input = usuario.colleagueName;
                alterou = true;
              }

              // cadastro.displaykey = 'Estab: ' + cadastro.estabelecimento.displaykey + ' | Lotação: ' + cadastro.lotacao.displaykey + ' | Tipo Documento: ' + cadastro.tipoDocumento.displaykey + ' | Faixa: ' + cadastro.faixa.faixaCodigo;
              if (alterou) {
                obj.registros++;
                vm.registrosAprovadores++;
                vm.pushResultado(cadastro, obj);
              }
            });
          });

          vm.loading = true;
        }
      };

      vm.pushResultado = function pushResultado(documento, cadastro) {
        fluigService.editCard(documento)
          .then((result) => {
            vm.Resultado.push({
              cadastro: cadastro.title,
              displaykey: documento.displaykey,
              documentid: documento.documentid,
              result: 'Corrigido com sucesso'
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
