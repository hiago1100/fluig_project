angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate', 'chart.js'])

  .controller('AdfController', ['$scope', '$http', '$timeout', '$log', '$location', 'erpService', 'fluigService', 'formService', 'adfService',
    function AprovacaoDoctoController($scope, $http, $timeout, $log, $location, erpService, fluigService, formService, adfService) {
      const vm = this;
      try {
        formService.atualizaFormulario($scope, vm)
          .then(() => {
            vm.inicia();
          });
      } catch (error) {
        $log.error(error);
      }
      vm.inicia = function inicia() {
        vm.getTipoDocumento();

        vm.Rejeicao = erpService.getCodigosRejeicao();
        vm.Aprovadores = formService.carregaItens('#tabelaAprovadores');
      };
      vm.getTipoDocumento = function getTipoDocumento() {
        try {
          if (vm.Formulario.codTipoDocto) {
            const tipoDocto = adfService.getTipoDocumento(vm.Formulario.codTipoDocto)[0];

            fluigService.appendScript(tipoDocto.templateController)
              .then(() => {
                vm.TipoDocumento = tipoDocto;
              });
          }
        } catch (error) {
          $log.error('getTipoDocumento error', error);
          vm.loadFinished = true;
        }
      };

      vm.adicionaAprovador = function adicionaAprovador() {
        wdkAddChild('tabelaAprovadores');
      };
    }
  ]);
