angular.module('AdfApp')
  .requisicaoEstoqueController = function requisicaoEstoqueController($scope, $log) {
    $scope.iniciaDocto = function iniciaDocto() {
      try {
        $scope.montaChartData();
      } catch (error) {
        $log.error(error);
      }
    };

    $scope.montaChartData = function montaChartData() {
      $scope.chartOptions = {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      };
      $scope.documento.Itens.forEach((item) => {
        if (item.UltRequisicoes) {
          item.ultRequisicoesLabels = [];
          item.ultRequisicoesData = [];
          item.UltRequisicoes.forEach((ultRequisicao) => {
            item.ultRequisicoesData.push(Number(ultRequisicao.ultRequisicoesQtdRequisitada));
            item.ultRequisicoesLabels.push(ultRequisicao.ultRequisicoesRequisitante);
            // item.ultComprasLabels.unshift(ultCompra.ultComprasDataEntrega);
          });
        }
      });
    };
  };
