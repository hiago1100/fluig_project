angular.module('AdfApp')
  .contratosController = function contratosController($scope, $log) {
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
        }
      };

      $scope.itemData = [];
      $scope.itemLabels = [];
      $scope.documento.Itens.forEach((item) => {
        $scope.itemData.unshift(Number(item.itemValorTotal));
        $scope.itemLabels.unshift(item.itemDescricao);
      });
    };
  };
