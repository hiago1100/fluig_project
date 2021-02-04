angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        vm.Usuarios = fluigService.getUsuarios(null, ['colleagueId', 'colleagueName', 'mail']);

        if (vm.Params.formMode === 'ADD') {
          vm.adicionaAprovador();
          vm.Familias = erpService.getFamilia(null, ['codigo', 'descricao', 'displaykey']);
          vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.familia = erpService.getFamilia(vm.Formulario.familia.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaAprovador = function adicionaAprovador() {
        wdkAddChild('aprovadores');
        formService.updateChildren($scope);
      };

      vm.removeAprovador = function removeAprovador($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir aprovador'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.familia)) {
          if (adfService.getAprovadoresFamilia(vm.Formulario.estabelecimento.codigo, vm.Formulario.familia.codigo)[0]) {
            vm.Errors.push('Aprovadores já cadastrados nesse estabelecimento e familia.');
          }
        }
      };
    }
  ]);