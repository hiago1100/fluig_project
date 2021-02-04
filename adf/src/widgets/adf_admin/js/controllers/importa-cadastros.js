angular
  .module('AdfAdminApp')
  .controller('AdfImportaCadastrosController', ['$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfImportaCadastrosController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
        vm.CadastrosADF = Global.Cadastros.ADF;
        vm.total = 0;
        vm.processados = 0;
        vm.percProcessado = 100;
        vm.done = true;
      }());

      vm.readFile = function readFile(file) {
        if (file) {
          const reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = function (evt) {
            $scope.$apply(() => {
              const lines = evt.target.result.split('\n');

              vm.CadastrosParaImportar = {};
              let cadastro = '';

              lines.forEach((line) => {
                if (line !== '') {
                  const cadastroAux = line
                    .split(';')[0];

                  // console.log(cadastroAux, Global.Cadastros.ADF[cadastroAux]);

                  if (Global.Cadastros.ADF[cadastroAux]) {
                    cadastro = cadastroAux;
                    vm.CadastrosParaImportar[cadastro] = {
                      title: Global.Cadastros.ADF[cadastro].title,
                      dataset: Global.Cadastros.ADF[cadastro].dataset,
                      children: Global.Cadastros.ADF[cadastro].children,
                      fields: Global.Cadastros.ADF[cadastro].fields,
                      content: [],
                      contentArray: [],
                      processados: 0
                    };
                  } else if (vm.CadastrosParaImportar[cadastro]) {
                    vm.CadastrosParaImportar[cadastro].contentArray.push(line);
                  }
                  // console.log(cadastro, vm.CadastrosParaImportar[cadastro]);
                }
              });

              for (const cadastro in vm.CadastrosParaImportar) {
                console.log(cadastro);
                const contentArray = vm.CadastrosParaImportar[cadastro].contentArray;
                const str = contentArray.join('\n');

                csvtojson({ delimiter: ';', checkType: true })
                  .fromString(str)
                  .on('end_parsed', (jsonArrObj) => {
                    $scope.$apply(() => {
                      $log.log(jsonArrObj);
                      vm.CadastrosParaImportar[cadastro].content = jsonArrObj;
                    });
                  });
              }

              // $log.log(lines);

              // var result = [];

              // var cadastro = lines.shift()
              //   .trim()
              //   .split(";")[0];
              // // var headers = lines[1].split(";");

              // $log.log(cadastro);
              // $log.log(Global.Cadastros.ADF[cadastro])

              // vm.CadastrosParaImportar = {};
              // vm.CadastrosParaImportar[cadastro] = {
              //   title: Global.Cadastros.ADF[cadastro].title,
              //   dataset: Global.Cadastros.ADF[cadastro].dataset,
              //   children: Global.Cadastros.ADF[cadastro].children,
              //   fields: Global.Cadastros.ADF[cadastro].fields,
              //   content: [],
              //   processados: 0
              // };

              // // lines.shift();

              // var str = lines.join('\n');

              // csvtojson({ delimiter: ";", checkType: true })
              //   .fromString(str)
              //   .on('end_parsed', (jsonArrObj) => {
              //     $scope.$apply(() => {
              //       $log.log(jsonArrObj);
              //       vm.CadastrosParaImportar[cadastro].content = jsonArrObj;
              //     })
              //   });
            });
          };
          reader.onerror = function (evt) {
            console.log('error reading file', evt);
          };
        }
      };

      vm.strToObj = function strToObj(str, val) {
        let i,
          obj = {},
          strarr = str.split('.');
        let x = obj;
        for (i = 0; i < strarr.length - 1; i++) {
          x = x[strarr[i]] = {};
        }
        x[strarr[i]] = val;
        return obj;
      };

      vm.importaCadastros = function importaCadastros(form) {
        if (form.$valid) {
          vm.Resultado = [];

          vm.loading = true;

          if (vm.removerCadastros) {
            const docsToDelete = [];

            for (const cadastro in vm.CadastrosParaImportar) {
              Global.Cadastros.ADF[cadastro].content.forEach((reg) => {
                docsToDelete.push({ docId: reg.documentid, isLink: false, parentId: reg['metadata#parent_id'] });
              });
            }

            fluigService.removeDoc(docsToDelete);
          }

          for (const cadastro in vm.CadastrosParaImportar) {
            // vm.CadastrosParaImportar[cadastro].content.forEach(cadastro => {

            vm.CadastrosParaImportar[cadastro].processados = 0;

            vm.CadastrosParaImportar[cadastro].content.forEach((reg) => {
              if (reg.documentid && !vm.removerCadastros) {
                fluigService.editCard(reg)
                  .then((result) => {
                    reg.status = 'Registro incluído com sucesso';
                    vm.Resultado.push(reg);

                    $log.log(result);
                    vm.checkCadastro(cadastro);
                  }, (error) => {
                    reg.status = error.data;
                    vm.Resultado.push(reg);

                    $log.log(error);
                    vm.checkCadastro(cadastro);
                  });
              } else {
                fluigService.newCard(reg)
                  .then((result) => {
                    reg.status = 'Registro incluído com sucesso';
                    vm.Resultado.push(reg);

                    $log.log(result);
                    vm.checkCadastro(cadastro);
                  }, (error) => {
                    reg.status = error.data;
                    vm.Resultado.push(reg);

                    $log.error(error);
                    vm.checkCadastro(cadastro);
                  });
              }
            });
          }

          // vm.loading = false;
        }
      };

      vm.checkCadastro = function checkCadastro(cadastro) {
        vm.CadastrosParaImportar[cadastro].processados++;
        vm.CadastrosParaImportar[cadastro].percProcessado = (vm.CadastrosParaImportar[cadastro].processados / vm.CadastrosParaImportar[cadastro].content.length) * 100;

        if (vm.CadastrosParaImportar[cadastro].percProcessado >= 100) {
          const str = vm.toCsv(vm.pivot(vm.Resultado));

          if (str !== '') {
            vm.strToFile(str, 'resultado.csv');
          }

          vm.loading = false;
          Global.inicia();
        }
      };

      vm.pivot = function pivot(arr) {
        const mp = new Map();

        function setValue(a, path, val) {
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
