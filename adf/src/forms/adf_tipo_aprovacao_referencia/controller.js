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
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.adicionaTipo();
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }

        vm.childrenReferencias = [{
          name: 'referencias',
          fields: ['referenciaCodigo', 'referenciaDescricao']
        }];
      };

      vm.adicionaTipo = function adicionaTipo() {
        wdkAddChild('tipos');
        formService.updateChildren(vm);
      };

      vm.removeTipo = function removeTipo($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir tipo'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.buscaReferencias = function buscaReferencias() {
        vm.Referencias = null;
        vm.Formulario.referencia = '';

        if (angular.isObject(vm.Formulario.tipoDocumento)) {
          const referenciasDocumento = adfService.getReferencias(vm.Formulario.tipoDocumento.codigo, ['displaykey'], vm.childrenReferencias)[0];

          if (!referenciasDocumento) {
            vm.Errors.push('Referencias não cadastradas para esse tipo de documento.');
            return;
          }

          vm.Referencias = referenciasDocumento.referencias;
        }
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.tipoDocumento) &&
          angular.isObject(vm.Formulario.referencia === 'object')) {
          if (adfService.getTipoAprovacaoReferencia(vm.Formulario.tipoDocumento.codigo, vm.Formulario.referencia.codigo)[0]) {
            vm.Errors.push('Tipos de aprovação já cadastrados para o tipo de documento e referência selecionados.');
          }
        }
      };
    }
  ]);
