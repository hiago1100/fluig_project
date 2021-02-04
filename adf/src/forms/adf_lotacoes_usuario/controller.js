angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', '$log', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, $log, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          try {
            vm.inicia();
          } catch (error) {
            $log.error(error);
          }
        });

      vm.inicia = function inicia() {
        vm.Lotacoes = adfService.getLotacao(null, ['codigo', 'descricao', 'displaykey']);

        if (vm.Params.formMode === 'ADD') {
          vm.adicionaLotacao();
          vm.Usuarios = fluigService.getUsuarios(null, ['colleagueId', 'colleagueName', 'mail']);
        }
      };

      vm.adicionaLotacao = function adicionaLotacao() {
        wdkAddChild('lotacoes');
        formService.updateChildren($scope);
      };

      vm.removeLotacao = function removeLotacao($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir lotação'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.usuario)) {
          if (adfService.getLotacoesUsuario(vm.Formulario.usuario.colleagueId)[0]) {
            vm.Errors.push('Lotações já cadastradas para esse usuário.');
          }
        }
      };
    }
  ]);
