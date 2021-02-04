angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
        if (vm.Params.formMode === 'ADD') { vm.consultaDuplicado(); }
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];

        if (adfService.getParamGeral().rowsCount > 0 &&
            adfService.getParamGeral().rowsCount != null) {
          vm.Errors.push('Parâmetros gerais já cadastrados.');
        }
      };

      vm.adicionaEstabelecimento = function adicionaEstabelecimento() {
        wdkAddChild('estabelecimentos');
        formService.updateChildren($scope);
      };

      vm.removeEstabelecimento = function removeEstabelecimento($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir Estabelecimento'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };
    }
  ]);
