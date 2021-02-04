angular.module('AdfApp')
  .solicitacaoCotacaoController = function solicitacaoCotacaoController($scope, $log, $filter) {
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
      $scope.documento.Itens.forEach((item) => {
        if (item.UltCompras) {
          item.ultComprasLabels = [];
          item.ultComprasSeries = ['Últimas Compras'];

          item.ultComprasData = [
            []
          ];
          item.UltCompras.forEach((ultCompra) => {
            item.ultComprasData[0].push(Number(ultCompra.ultComprasValor));
            item.ultComprasLabels.push($filter('date')(ultCompra.ultComprasDataEntrega));
            // item.ultComprasLabels.unshift(ultCompra.ultComprasDataEntrega);
          });
        }
      });
    };
  };
