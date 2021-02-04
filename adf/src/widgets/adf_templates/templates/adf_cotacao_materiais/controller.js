angular.module('AdfApp')
  .cotacaoMateriaisController = function cotacaoMateriaisController($scope, $log) {
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
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }

      };

      $scope.cotacoesSeries = [];
      $scope.cotacoesLabels = ['Cotações'];
      $scope.cotacoesData = [];
      $scope.documento.Cotacoes.forEach((cotacao) => {
        // $scope.cotacoesLabels.push(cotacao.cotacaoFornecedor);
        $scope.cotacoesSeries.push(cotacao.cotacaoFornecedor);
        $scope.cotacoesData.push([Number(cotacao.cotacaoValor)]);
      });
    };
  };
