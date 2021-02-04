angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.fieldFilters = [
        { name: 'Texto', type: '' },
        { name: 'Data', type: 'date' },
        { name: 'Decimal', type: 'number' },
        { name: 'Monetário', type: 'currency' }
      ];

      vm.inicia = function inicia() {
        if (vm.Params.formMode === 'ADD') {
          vm.adicionaCampoLista();
        }
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];

        if (adfService.getTipoDocumento(vm.Formulario.codigo)[0]) {
          vm.Errors.push('Tipo de documento já cadastrado com esse código.');
        }
      };

      vm.adicionaCampoLista = function adicionaCampoLista() {
        wdkAddChild('camposLista');
        formService.updateChildren($scope);
      };

      vm.removeCampoLista = function removeCampoLista($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir campo'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };
    }
  ]);
