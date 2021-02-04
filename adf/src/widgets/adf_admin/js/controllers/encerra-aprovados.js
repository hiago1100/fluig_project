angular
  .module('AdfAdminApp')
  .controller('AdfEncerraAprovadosController', ['$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfEncerraAprovadosController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
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

              vm.Processos = [];

              lines.forEach((line) => {
                if (line !== '') {
                  const cadastroAux = line
                    .split(';');

                  // const processo = {};
                  // processo.dataImplantacao = cadastroAux[0];
                  // processo.dataAprovacao = cadastroAux[1];
                  // processo.aprovado = cadastroAux[2];
                  // processo.codigo = cadastroAux[3];

                  let urlDataset = cadastroAux[3] !== '0' ? '/api/public/ecm/dataset/search?datasetId=adf_aprovacao_docto&filterFields=codProcesso,' + cadastroAux[3] : '/api/public/ecm/dataset/search?datasetId=adf_aprovacao_docto&filterFields=nrTrans,' + cadastroAux[4];

                  $http.get(urlDataset)
                    .then((response) => {
                      const processos = response.data.content;

                      processos.forEach(p => {
                        if (p['metadata#active'] === 1) {
                          if (p.integrado === 'false') {
                            vm.Processos.push(p);
                          }
                        }
                      });
                    });

                  // const constraints = new Array();

                  // constraints.push(
                  //   DatasetFactory.createConstraint('codProcesso', processo.codigo, processo.codigo, ConstraintType.MUST)
                  // );
                  // const dataset = DatasetFactory.getDataset('adf_aprovacao_docto', null, constraints)
                  //   .values;

                  // dataset.forEach(p => {
                  //   if (p['metadata#active'] === '1') {
                  //     processo.form = p;
                  //   }
                  // })

                  // if (processo.form.integrado == 'false') {
                  //   vm.Processos.push(processo);
                  // }

                }
              });
            });
          };
          reader.onerror = function (evt) {
            console.log('error reading file', evt);
          };
        }
      };

      vm.importaCadastros = function importaCadastros(form) {

      };
    }
  ]);
