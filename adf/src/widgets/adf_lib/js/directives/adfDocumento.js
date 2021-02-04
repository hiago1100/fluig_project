angular.module('adf.directives')
  .directive('adfDocumento', ['$log', '$filter', 'fluigService', 'globalService', 'adfService',
    ($log, $filter, fluigService, globalService, adfService) => ({
      restrict: 'E',
      scope: {
        tipoDocumento: '=',
        codDoctoTemplate: '=',
        doctoTemplate: '='
      },
      link(scope, element, attrs) {
        scope.start = function start() {
          try {
            angular.module('AdfApp')[scope.tipoDocumento.controllerFunction](scope, $log, $filter, fluigService, globalService, adfService);
            getDoctoTemplate();
          } catch (error) {
            $log.error('adfDocumento error: ', error);
          }
        };

        scope.$watch('codDoctoTemplate', (newValue, oldValue) => {
          if (newValue !== oldValue) {
            getDoctoTemplate();
          }
        }, true);

        scope.$watch('tipoDocumento', () => {
          if (scope.tipoDocumento) {
            scope.template = attrs.type === 'resumo' ? scope.tipoDocumento.templateResumo : scope.tipoDocumento.templateDetalhe;
          }
        }, true);

        function getDoctoTemplate() {
          if (scope.doctoTemplate) {
            applyTemplate(scope.doctoTemplate);
          } else {
            fluigService.getActiveDocument(scope.codDoctoTemplate)
              .then((doctoTemplate) => {
                try {
                  if (scope.tipoDocumento.atributoPaiJson) {
                    doctoTemplate = globalService.deepValue(doctoTemplate, scope.tipoDocumento.atributoPaiJson);
                  }
                  applyTemplate(doctoTemplate);
                } catch (error) {
                  $log.error(error);
                }
              });
          }
        }

        function applyTemplate(doctoTemplate) {
          const documento = doctoTemplate;

          if (angular.isObject(documento)) {
            scope.documento = documento;

            scope.iniciaDocto();
          } else {
            scope.erro = 'Não foi possível carregar os detalhes do documento';
          }
        }
      },
      templateUrl: './adfDocumento.html'
    })
  ]);
