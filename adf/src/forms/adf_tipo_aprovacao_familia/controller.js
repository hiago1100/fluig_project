angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        vm.TiposAprovacao = adfService.getTipoAprovacao(null, ['codigo', 'descricao', 'displaykey']);

        if (vm.Params.formMode === 'ADD') {
          vm.Familias = erpService.getFamilia(null, ['codigo', 'descricao', 'displaykey']);
          vm.adicionaTipo();
        } else {
          vm.Formulario.familia = erpService.getFamilia(vm.Formulario.familia.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaTipo = function adicionaTipo() {
        wdkAddChild('tipos');
        formService.updateChildren($scope);
      };

      vm.removeTipo = function removeTipo($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir tipo'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.familia)) {
          if (adfService.getTipoAprovacaoFamilia(vm.Formulario.familia.codigo)[0]) {
            vm.Errors.push('Tipos de aprovação já cadastrados para a família selecionada.');
          }
        }
      };
    }
  ]);
