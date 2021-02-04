angular.module('AdfApp')
  .medicaoContratoController = function medicaoContratoController($scope, $log) {
    $scope.iniciaDocto = function iniciaDocto() {
      try {

      } catch (error) {
        $log.error(error);
      }
    };
  };
