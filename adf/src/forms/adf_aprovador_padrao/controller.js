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
          vm.TiposAprovacao = adfService.getTipoAprovacao(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.tipoAprovacao = adfService.getTipoAprovacao(vm.Formulario.tipoAprovacao.codigo, ['codigo', 'descricao', 'displaykey'])[0];
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
        if (angular.isObject(vm.Formulario.tipoAprovacao)) {
          if (adfService.getAprovadorPadrao(vm.Formulario.tipoAprovacao.codigo)[0]) {
            vm.Errors.push('Aprovadores já cadastrados para esse tipo de aprovação.');
          }
        }
      };
    }
  ]);
