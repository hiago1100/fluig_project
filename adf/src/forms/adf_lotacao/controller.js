angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {

      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];

        if (adfService.getLotacao(vm.Formulario.codigo)[0]) {
          vm.Errors.push('Lotação já cadastrada com esse código.');
        }
      };
    }
  ]);
