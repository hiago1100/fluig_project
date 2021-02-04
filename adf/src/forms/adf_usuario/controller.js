angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$log', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $log, $http, $timeout, erpService, fluigService, formService, adfService) {
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
        vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
        vm.Moedas = erpService.getMoeda(null, ['codigo', 'descricao', 'displaykey']);
        vm.Lotacoes = adfService.getLotacao(null, ['codigo', 'descricao', 'displaykey']);

        if (vm.Params.formMode === 'ADD') {
          vm.Usuarios = fluigService.getUsuarios(null, ['colleagueId', 'colleagueName', 'mail']);
        } else {
          vm.Formulario.usuario = fluigService.getUsuarios(vm.Formulario.usuario.colleagueId, ['colleagueId', 'colleagueName', 'mail'])[0];
        }
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];

        if (!vm.Formulario.usuario.colleagueId) { return; }

        if (adfService.getUsuario(vm.Formulario.usuario.colleagueId)[0]) {
          vm.Errors.push('Usuário já cadastrado no ADF.');
        }
      };
    }
  ]);
