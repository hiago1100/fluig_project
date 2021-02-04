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
        vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);

        if (vm.Params.formMode === 'ADD') {
          vm.adicionaPermissao();
          vm.Usuarios = fluigService.getUsuarios(null, ['colleagueId', 'colleagueName', 'mail']);
          vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.usuario = fluigService.getUsuarios(vm.Formulario.usuario.colleagueId, ['colleagueId', 'colleagueName', 'mail'])[0];
          vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaPermissao = function adicionaPermissao() {
        wdkAddChild('permissoes');
        formService.updateChildren($scope);
      };

      vm.removePermissao = function removePermissao($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir permissão'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.usuario) &&
          angular.isObject(vm.Formulario.estabelecimento)) {
          if (adfService.getPermissoesUsuario(vm.Formulario.usuario.colleagueId, vm.Formulario.estabelecimento.codigo)[0]) {
            vm.Errors.push('Permissões já cadastradas para esse usuário nesse estabelecimento.');
          }
        }
      };
    }
  ]);
