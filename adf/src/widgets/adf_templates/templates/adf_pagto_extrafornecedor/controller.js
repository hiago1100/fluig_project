angular.module('AdfApp')
  .pagtoExtraFornecedorController = function pagtoExtraFornecedorController($scope, $log) {
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

      if ($scope.documento.GradeContabil) {
        $scope.documento.gradeContabilLabels = [];
        $scope.documento.gradeContabilData = [];
        $scope.documento.GradeContabil.forEach((gradeContabil) => {
          $scope.documento.gradeContabilData.push(Number(gradeContabil.gradeValor));
          $scope.documento.gradeContabilLabels.push(gradeContabil.gradeContaContabil);
        });
      }
    };
  };
