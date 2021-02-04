angular.module('AdfApp')
  .pedidoComprasController = function pedidoComprasController($scope, $log, $filter) {
    $scope.iniciaDocto = function iniciaDocto() {
      try {
        $scope.documento.primeiroVencimento = $scope.documento.Pagamentos && $scope.documento.Pagamentos.length > 0 ? $scope.documento.Pagamentos[0].dataPagamento : null;
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
          item.ultComprasSeries = ['Pedido Atual', 'Últimas Compras'];

          item.ultComprasData = [
            [],
            []
          ];
          item.UltCompras.forEach((ultCompra) => {
            item.ultComprasData[0].unshift(Number(item.itemValor));
            item.ultComprasData[1].unshift(Number(ultCompra.ultComprasValor));
            item.ultComprasLabels.unshift($filter('date')(ultCompra.ultComprasDataEntrega));
          });
        }
        if (item.Cotacoes) {
          item.cotacoesSeries = [];
          item.cotacoesLabels = ['Cotações'];
          item.cotacoesData = [];
          item.Cotacoes.forEach((cotacao) => {
            item.cotacoesSeries.push(cotacao.cotacaoFornecedor);
            item.cotacoesData.push([Number(cotacao.cotacaoValor)]);
          });
        }
      });
    };
  };
