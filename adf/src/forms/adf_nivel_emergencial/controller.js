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
          vm.Estabelecimentos = erpService.getEstabelecimento();
          vm.NiveisEmergenciais = erpService.getNivelEmergencial();
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);

          if (vm.Params.formMode === 'ADD') {
            vm.adicionaNivel();
          } else {
            vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
            vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          }
        } catch (error) {
          $log.error(error);
        }
      };

      vm.adicionaNivel = function adicionaNivel() {
        wdkAddChild('niveis');
        formService.updateChildren($scope);
      };
      vm.removeNivel = function removeNivel($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir nível'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.tipoDocumento)) {
          if (adfService.getNivelEmergencial(vm.Formulario.tipoDocumento.codigo, vm.Formulario.estabelecimento.codigo)[0]) {
            vm.Errors.push('Níveis já cadastrados para o tipo de documento e estabelecimento informados.');
          }
        }
      };
    }
  ]);
