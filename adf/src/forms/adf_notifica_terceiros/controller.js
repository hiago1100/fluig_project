angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', '$log', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, $log, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        try {
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);

          if (vm.Params.formMode === 'ADD') {
            vm.adicionaNotificado();
          } else {
            vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          }
        } catch (error) {
          $log.error(error);
        }
      };

      vm.adicionaNotificado = function adicionaNotificado() {
        wdkAddChild('notificados');
        formService.updateChildren($scope);
      };

      vm.removeNotificado = function removeNotificado($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir notificado'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.tipoDocumento)) {
          if (adfService.getNotificaTerceiros(vm.Formulario.tipoDocumento.codigo)[0]) {
            vm.Errors.push('Terceiros já cadastrados para o tipo de documento informado.');
          }
        }
      };
    }
  ]);
