angular.module('AdfApp', ['adf.directives', 'adf.services', 'angular.fluig', 'ngAnimate'])

  .controller('AdfController', ['$scope', '$http', '$timeout', 'erpService', 'fluigService', 'formService', 'adfService',
    function AdfController($scope, $http, $timeout, erpService, fluigService, formService, adfService) {
      const vm = this;
      formService.atualizaFormulario($scope, vm)
        .then(() => {
          vm.inicia();
        });

      vm.inicia = function inicia() {
        if (vm.Params.formMode === 'ADD') {
          vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
          vm.Lotacoes = adfService.getLotacao(null, ['codigo', 'descricao', 'displaykey']);
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.adicionaFaixa();
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.lotacao = adfService.getLotacao(vm.Formulario.lotacao.codigo, ['codigo', 'descricao', 'displaykey'])[0];
        }
      };

      vm.adicionaFaixa = function adicionaFaixa() {
        wdkAddChild('faixas');
        formService.updateChildren($scope);
      };

      vm.removeFaixa = function removeFaixa($event) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir faixa'
        }, (result) => {
          if (result) { fnWdkRemoveChild($event.currentTarget); }
        });
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.lotacao) &&
          angular.isObject(vm.Formulario.tipoDocumento)) {
          if (adfService.getFaixasAprovacao(vm.Formulario.estabelecimento.codigo, vm.Formulario.lotacao.codigo, vm.Formulario.tipoDocumento.codigo)[0]) {
            vm.Errors.push('Faixas de aprovação já cadastradas para o estabelecimento, lotação e tipo de documento informados.');
          }
        }
      };
    }
  ]);
