angular
  .module('AdfAdminApp')
  .controller('AdfDashboardController', ['$scope', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfDashboardController($scope, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.inicia = (function inicia() {
        vm.test = 'dashboard';
        vm.done = true;
        vm.Global = Global;
      }());
    }
  ]);
