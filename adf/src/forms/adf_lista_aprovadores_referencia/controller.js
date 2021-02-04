angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', '$log', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, $log, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        vm.Usuarios = fluigService.getUsuarios(null, ['colleagueId', 'colleagueName', 'mail']);

        if (vm.Params.formMode === 'ADD') {
          vm.adicionaAprovador();
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }

        vm.childrenReferencias = [{
          name: 'referencias',
          fields: ['referenciaCodigo', 'referenciaDescricao']
        }];
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
        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.tipoDocumento) &&
          angular.isObject(vm.Formulario.referencia)) {
          if (adfService.getAprovadoresReferencia(vm.Formulario.estabelecimento.codigo, vm.Formulario.tipoDocumento.codigo, vm.Formulario.referencia.codigo)[0]) {
            vm.Errors.push('Aprovadores já cadastrados nesse estabelecimento, tipo de documento e referencia.');
          }
        }
      };
    }
  ]);
