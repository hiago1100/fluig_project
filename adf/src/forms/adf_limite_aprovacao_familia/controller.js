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
          vm.adicionaLimite();
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.Familias = erpService.getFamilia(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.familia = erpService.getFamilia(vm.Formulario.familia.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaLimite = function adicionaLimite() {
        wdkAddChild('limites');
        formService.updateChildren($scope);
      };

      vm.removeLimite = function removeLimite($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir aprovador'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.familia) &&
          angular.isObject(vm.Formulario.tipoDocumento)) {
          if (adfService.getLimiteAprovacaoFamilia(vm.Formulario.familia.codigo, vm.Formulario.tipoDocumento.codigo)[0]) {
            vm.Errors.push('Limites já cadastrados para essa família e tipo de documento.');
          }
        }
      };
    }
  ]);
