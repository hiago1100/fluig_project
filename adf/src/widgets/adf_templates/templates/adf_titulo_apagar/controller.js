angular.module('AdfApp')
  .tituloApagarController = function tituloApagarController($scope, $log, $filter, fluigService, globalService, adfService) {
    $scope.iniciaDocto = function iniciaDocto() {
      try {
        $scope.DoctoPedido = adfService.getTipoDocumento(7)[0];
        fluigService.appendScript($scope.DoctoPedido.templateController);

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

      if ($scope.documento.GradeContabil) {
        $scope.documento.gradeContabilLabels = [];
        $scope.documento.gradeContabilData = [];
        $scope.documento.GradeContabil.forEach((gradeContabil) => {
          $scope.documento.gradeContabilData.push(Number(gradeContabil.gradeValor));
          $scope.documento.gradeContabilLabels.push(gradeContabil.gradeContaContabil);
          // item.ultComprasLabels.unshift(ultCompra.ultComprasDataEntrega);
        });
      }
    };
  };
