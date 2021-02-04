angular.module('AdfApp')
  .eventoContratoController = function eventoContratoController($scope, $log) {
    $scope.iniciaDocto = function iniciaDocto() {
      try {

      } catch (error) {
        $log.error(error);
      }
    };
  };
