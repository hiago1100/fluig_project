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

        vm.childrenFaixa = [{
          name: 'faixas',
          fields: ['faixaCodigo', 'faixaDescricao', 'faixaLimiteInicial', 'faixaLimiteFinal']
        }];

        if (vm.Params.formMode === 'ADD') {
          vm.adicionaAprovador();
          vm.TiposDocumento = adfService.getTipoDocumento(null, ['codigo', 'descricao', 'displaykey']);
          vm.Estabelecimentos = erpService.getEstabelecimento(null, ['codigo', 'descricao', 'displaykey']);
          vm.Lotacoes = adfService.getLotacao(null, ['codigo', 'descricao', 'displaykey']);
        } else {
          vm.Formulario.tipoDocumento = adfService.getTipoDocumento(vm.Formulario.tipoDocumento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.estabelecimento = erpService.getEstabelecimento(vm.Formulario.estabelecimento.codigo, ['codigo', 'descricao', 'displaykey'])[0];
          vm.Formulario.lotacao = adfService.getLotacao(vm.Formulario.lotacao.codigo, ['codigo', 'descricao', 'displaykey'])[0];

          const faixasAprovacao = adfService.getFaixasAprovacao(vm.Formulario.estabelecimento.codigo, vm.Formulario.lotacao.codigo, vm.Formulario.tipoDocumento.codigo, ['displaykey'], vm.childrenFaixa)[0];

          console.log(faixasAprovacao);

          // vm.Formulario.faixa = faixasAprovacao.faixas.filter(f => f.faixaCodigo == vm.Formulario.faixa.codigo);
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

      vm.buscaFaixas = function buscaFaixas() {
        vm.Faixas = null;
        vm.Formulario.faixa = '';

        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.lotacao) &&
          angular.isObject(vm.Formulario.tipoDocumento)) {
          const faixasAprovacao = adfService.getFaixasAprovacao(vm.Formulario.estabelecimento.codigo, vm.Formulario.lotacao.codigo, vm.Formulario.tipoDocumento.codigo, ['displaykey'], vm.childrenFaixa)[0];

          if (!faixasAprovacao) {
            vm.Errors.push('Faixas de aprovação não cadastradas para esse estabelecimento, lotação e tipo de documento.');
            return;
          }

          vm.Faixas = faixasAprovacao.faixas;
        }
      };

      vm.consultaDuplicado = function consultaDuplicado() {
        vm.Errors = [];
        if (angular.isObject(vm.Formulario.estabelecimento) &&
          angular.isObject(vm.Formulario.lotacao) &&
          angular.isObject(vm.Formulario.tipoDocumento) &&
          angular.isObject(vm.Formulario.faixa)) {
          if (adfService.getAprovadoresFaixa(vm.Formulario.estabelecimento.codigo, vm.Formulario.lotacao.codigo, vm.Formulario.tipoDocumento.codigo, vm.Formulario.faixa.faixaCodigo)[0]) {
            vm.Errors.push('Aprovadores já cadastrados nesse estabelecimento, lotação, tipo de documento e faixa.');
          }
        }
      };
    }
  ]);
