angular
  .module('AdfAdminApp')
  .controller('AdfDeletaRdvAnalyticsController', [
    '$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfDeletaRdvAnalyticsController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {

        vm.resultado = [];
        vm.total = 65000;
        vm.initialInstance = vm.total;

        vm.done = true;
      }());

      vm.deletaRdvAnalytics = function deletaRdvAnalytics() {
        vm.loading = true;
        vm.processados = vm.total - vm.initialInstance;

        $http.post('/ecm/api/rest/ecm/processdelete/getInstancesToDelete', {
            canceled: true,
            finalDate: "01/01/2020",
            finalInstance: 99999,
            finished: true,
            initialDate: "01/01/2015",
            initialInstance: vm.initialInstance,
            processId: "financeiro_rdv_despesa"
          })
          .then(result => {
            console.log(result);
            let selectedRows = [];
            result.data.forEach(instance => {
              selectedRows.push(instance.processInstanceId.toString());
            });
            $http.post('/ecm/api/rest/ecm/processdelete/deleteInstances', { selectedRows })
              .then(result => {
                console.log(result);
                vm.loading = false;
                vm.resultado.push({
                  initialInstance: vm.initialInstance,
                  selectedRows: selectedRows,
                  result: result
                });
                vm.initialInstance = vm.initialInstance - 1000;
                if (vm.initialInstance >= 0) {
                  vm.deletaRdvAnalytics();
                }
              }, error => {
                console.log(error);
                vm.loading = false;
                vm.resultado.push({
                  initialInstance: vm.initialInstance,
                  selectedRows: selectedRows,
                  result: error
                });
              });
          }, (error) => {
            console.log(error);
            vm.loading = false;
            vm.resultado.push({
              initialInstance: vm.initialInstance,
              selectedRows: [],
              result: error
            });
          });
      };

      vm.deletaCards = function deletaCards() {
        vm.loading = true;
        vm.total = 300;
        vm.processados = 300;

        $http.get('/api/public/ecm/dataset/search?datasetId=financeiro_rdv_despesa')
          .then(result => {
            console.log(result);
            let docsToDelete = [];
            result.data.content.forEach(res => {
              docsToDelete.push({ docId: res.documentid.toString(), isLink: false, parentId: 6266 });
            });

            console.log(docsToDelete);
            $http.delete('/ecm/api/rest/ecm/navigation/removeDoc/', { data: { docsToDelete: docsToDelete }, headers: { 'Content-Type': 'application/json' } })
              .then(result => {
                vm.loading = false;
                console.log(result);
                if (docsToDelete.length === 300) {
                  vm.deletaCards();
                }
                vm.resultado.push({
                  selectedRows: docsToDelete,
                  result: result
                });
              }, error => {
                vm.loading = false;
                console.log(error);
                vm.resultado.push({
                  selectedRows: docsToDelete,
                  result: error
                });
              })
          }, error => {
            console.log(error);
            vm.resultado.push({
              result: error
            });
          });
      }
    }
  ]);
