angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        if (vm.Params.formMode === 'ADD') {
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.adicionaReferencia();
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaReferencia = function adicionaReferencia() {
        wdkAddChild('referencias');
        formService.updateChildren($scope);
      };

      vm.removeReferencia = function removeReferencia($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir referência'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.tipoDocumento)) {
          if (adfService.getReferencias(vm.Formulario.tipoDocumento.codigo)[0]) {
            vm.Errors.push('Referencias já cadastradas para o tipo de documento informado.');
          }
        }
      };
    }
  ]);
