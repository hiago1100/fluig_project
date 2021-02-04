angular
  .module('AdfAdminApp')
  .controller('AdfExportaCadastrosController', ['$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfExportaCadastrosController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
        vm.CadastrosADF = Global.Cadastros.ADF;
        vm.total = 0;
        vm.processados = 0;
        vm.percProcessado = 100;
        vm.done = true;
      }());

      vm.selectAll = function selectAll(selected) {
        for (const cadastro in vm.CadastrosADF) {
          vm.CadastrosADF[cadastro].selected = selected;
        }
      };

      vm.selectCadastro = function selectCadastro(cadastro) {
        cadastro.selected = !cadastro.selected;
      };

      vm.exportaCadastros = function exportaCadastros(form) {
        vm.loading = true;

        if (form.$valid) {
          vm.loading = true;
          let str = '';
          for (const cadastro in vm.CadastrosADF) {
            if (vm.CadastrosADF[cadastro].selected) {
              // let str = vm.toCsv(vm.pivot(vm.CadastrosADF[cadastro].content));

              // str = cadastro + '\n' + str;

              str += `\n${cadastro}\n${vm.toCsv(vm.pivot(vm.CadastrosADF[cadastro].content))}`;
            }
          }
          vm.strToFile(str, 'Cadastros.csv');
          vm.loading = false;
        }

        vm.gerandoArquivo = false;
      };

      vm.pivot = function pivot(arr) {
        const mp = new Map();

        const ignoreFields = [
          // 'metadata#parent_id',
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
          // 'version',
          'metadata#card_index_id',
          'masterid',
        ];

        function setValue(a, path, val) {
          if (Object(val) !== val) { // primitive value
            const pathStr = path.join('.');
            const i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size))
              .get(pathStr);
            a[i] = val;
          } else {
            for (const key in val) {
              if (ignoreFields.indexOf(key) < 0) {
                setValue(a, path.concat(key), val[key]);
              }
            }
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
