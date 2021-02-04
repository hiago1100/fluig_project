
(function () {
  angular
    .module('AdfAdminApp')
    .directive('sideBar', SideBar);

  SideBar.$inject = ['$route'];

  function SideBar($route) {
    // Definition of directive
    const directiveDefinitionObject = {
      restrict: 'E',
      scope: {},
      templateUrl: 'sidebar.tmpl.html',
      link: SiteBarLink
    };

    function SiteBarLink(scope) {
      scope.$route = $route;
    }
    return directiveDefinitionObject;
  }
}());
