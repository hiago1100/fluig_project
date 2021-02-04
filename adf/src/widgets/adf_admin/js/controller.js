angular.module('AdfAdminApp', ['ngRoute', 'adf.directives', 'angular.fluig', 'ngAnimate', 'adf.services', 'chart.js', 'ngFileUpload'])

  .controller('AdfAdminController', ['$scope', '$route', '$log', '$http', '$timeout', '$compile', '$rootScope', '$window', '$document', 'fluigService', 'adfService', 'erpService', 'globalService', 'Global',
    function AdfController($scope, $route, $log, $http, $timeout, $compile, $rootScope, $window, $document, fluigService, adfService, erpService, globalService, Global) {
      const vm = this;

      vm.Errors = [];

      vm.$route = $route;

      Global.inicia();

      vm.done = true;
    }
  ])
  .config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(false);

        // routes
      $routeProvider
          .when('/', {
            templateUrl: '../views/dashboard.html',
            controller: 'AdfDashboardController',
            controllerAs: 'vm',
            title: 'Home',
            activetab: 'dashboard',
            icon: 'fa fa-home'
          })
          .when('/transfere-aprovador', {
            templateUrl: '../views/transfere-aprovador.html',
            controller: 'AdfTransfereAprovadorController',
            controllerAs: 'vm',
            title: 'Transferência de Aprovadores',
            activetab: 'transfere-aprovador',
            icon: 'fa fa-exchange'
          })
          // .when('/deleta-rdv-analytics', {
          //   templateUrl: '../views/deleta-rdv-analytics.html',
          //   controller: 'AdfDeletaRdvAnalyticsController',
          //   controllerAs: 'vm',
          //   title: 'Deleta RDV Analytics',
          //   activetab: 'deleta-rdv-analytics',
          //   icon: 'fa fa-exchange'
          // })
          .when('/exporta-cadastros', {
            templateUrl: '../views/exporta-cadastros.html',
            controller: 'AdfExportaCadastrosController',
            controllerAs: 'vm',
            title: 'Exportação de Cadastros',
            activetab: 'exporta-cadastros',
            icon: 'fa fa-download'
          })
          .when('/importa-cadastros', {
            templateUrl: '../views/importa-cadastros.html',
            controller: 'AdfImportaCadastrosController',
            controllerAs: 'vm',
            title: 'Importação de Cadastros',
            activetab: 'importa-cadastros',
            icon: 'fa fa-upload'
          })
          // .when('/encerra-aprovados', {
          //   templateUrl: '../views/encerra-aprovados.html',
          //   controller: 'AdfEncerraAprovadosController',
          //   controllerAs: 'vm',
          //   title: 'Encerrar Solicitações Aprovadas',
          //   activetab: 'encerra-aprovados',
          //   icon: 'fa fa-checked'
          // })
          .otherwise({
            redirectTo: '/'
          });

        // $httpProvider.interceptors.push('authInterceptor');
    }
  ]

  )
  .service('Global', ['adfService', 'fluigService', 'erpService', 'globalService', '$http', function (adfService, fluigService, erpService, globalService, $http) {
    let
      keepMetadata = true,
      fields,
      codigo,
      children,
      codTipoAprovacao,
      codEstab,
      codLotacao,
      codTipoDocto,
      codFaixa,
      codFamilia,
      codItem,
      codReferencia,
      codUsuario;

    this.Cadastros = {
      Fluig: {
        Usuarios: {
          title: 'Usuários',
          content: fluigService.getUsuarios()
        }
      },
      ERP: {
        CodigosRejeicao: {
          title: 'Códigos de Rejeição',
          content: erpService.getCodigosRejeicao()
        },
        EspecDocto: {
          title: 'Espécies',
          content: erpService.getEspecDocto()
        },
        Estabelecimentos: {
          title: 'Estabelecimentos',
          content: erpService.getEstabelecimento()
        },
        Familias: {
          title: 'Famílias de Itens',
          content: erpService.getFamilia()
        },
        Itens: {
          title: 'Itens',
          // content: erpService.getItem()
        },
        Moedas: {
          title: 'Moedas',
          content: erpService.getMoeda()
        }
      },
      ADF: {
        AprovadorPadrao: {
          title: 'Aprovadores Padrão',
          dataset: 'adf_aprovador_padrao',
          children: ['aprovadores'],
          content: adfService.getAprovadorPadrao(codTipoAprovacao, codEstab, fields, children, keepMetadata),
          aprovadores: true
        },
        AprovadoresFaixa: {
          title: 'Aprovadores da Faixa',
          dataset: 'adf_aprovadores_faixa',
          children: ['aprovadores'],
          // content: adfService.getAprovadoresFaixa(codEstab, codLotacao, codTipoDocto, codFaixa, fields, children, keepMetadata),
          aprovadores: true
        },
        FaixasAprovacao: {
          title: 'Faixas de Aprovação',
          dataset: 'adf_faixas_aprovacao',
          children: ['faixas'],
          // content: adfService.getFaixasAprovacao(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata)
        },
        HierarquiaAprovadores: {
          title: 'Hierarquia de Aprovadores',
          dataset: 'adf_hierarquia_aprovadores',
          children: ['aprovadores'],
          // content: adfService.getHierarquiaAprovadores(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata),
          aprovadores: true
        },
        LimitesAprovacaoFamilia: {
          title: 'Limites de Aprovação por Família',
          dataset: 'adf_limite_aprovacao_familia',
          children: ['limites'],
          // content: adfService.getLimiteAprovacaoFamilia(codFamilia, codTipoDocto, fields, children, keepMetadata)
        },
        ListaAprovadoresDocumento: {
          title: 'Lista de Aprovadores por Documento',
          dataset: 'adf_lista_aprovadores_documento',
          children: ['aprovadores'],
          // content: adfService.getAprovadoresDocumento(codEstab, codTipoDocto, fields, children, keepMetadata),
          aprovadores: true
        },
        ListaAprovadoresFamilia: {
          title: 'Lista de Aprovadores por Família',
          dataset: 'adf_lista_aprovadores_familia',
          children: ['aprovadores'],
          // content: adfService.getAprovadoresFamilia(codEstab, codFamilia, fields, children, keepMetadata),
          aprovadores: true
        },
        ListaAprovadoresItem: {
          title: 'Lista de Aprovadores por Item',
          dataset: 'adf_lista_aprovadores_item',
          children: ['aprovadores'],
          // content: adfService.getAprovadoresItem(codEstab, codItem, fields, children, keepMetadata),
          aprovadores: true
        },
        ListaAprovadoresReferencia: {
          title: 'Lista de Aprovadores por Referência',
          dataset: 'adf_lista_aprovadores_referencia',
          children: ['aprovadores'],
          // content: adfService.getAprovadoresReferencia(codEstab, codTipoDocto, codReferencia, fields, children, keepMetadata),
          aprovadores: true
        },
        Lotacoes: {
          title: 'Lotações',
          dataset: 'adf_lotacao',
          // content: adfService.getLotacao(codigo, fields, children, keepMetadata)
        },
        LotacoesUsuario: {
          title: 'Lotações do Usuário',
          dataset: 'adf_lotacoes_usuario',
          usuario: true,
          // content: adfService.getLotacoesUsuario(codUsuario, fields, children, keepMetadata)
        },
        NivelEmergencial: {
          title: 'Níveis Emergenciais',
          dataset: 'adf_nivel_emergencial',
          children: ['niveis'],
          // content: adfService.getNivelEmergencial(codTipoDocto, codEstab, fields, children, keepMetadata)
        },
        NotificacaoTerceiros: {
          title: 'Notificação de Terceiros',
          dataset: 'adf_notifica_terceiros',
          children: ['notificados'],
          // content: adfService.getNotificaTerceiros(codTipoDocto, fields, children, keepMetadata)
        },
        ParamGeral: {
          title: 'Parâmetros Gerais',
          dataset: 'adf_param_geral',
          // content: adfService.getParamGeral(fields, children, keepMetadata)
        },
        PermissoesUsuario: {
          title: 'Permissões do Usuário',
          dataset: 'adf_permissoes_usuario',
          children: ['permissoes'],
          usuario: true
          // content: adfService.getPermissoesUsuario(codUsuario, codEstab, fields, children, keepMetadata)
        },
        Referencias: {
          title: 'Referências',
          dataset: 'adf_referencias',
          children: ['referencias'],
          // content: adfService.getReferencias(codTipoDocto, fields, children, keepMetadata)
        },
        TipoAprovacao: {
          title: 'Tipos de Aprovação',
          dataset: 'adf_tipo_aprovacao',
          // content: adfService.getTipoAprovacao(codigo, fields, children, keepMetadata)
        },
        TipoAprovacaoDocumento: {
          title: 'Tipos de Aprovação por Documento',
          dataset: 'adf_tipo_aprovacao_documento',
          children: ['tipos'],
          // content: adfService.getTipoAprovacaoDocumento(codTipoDocto, fields, children, keepMetadata)
        },
        TipoAprovacaoFamilia: {
          title: 'Tipos de Aprovação por Família',
          dataset: 'adf_tipo_aprovacao_familia',
          children: ['tipos'],
          // content: adfService.getTipoAprovacaoFamilia(codFamilia, fields, children, keepMetadata)
        },
        TipoAprovacaoItem: {
          title: 'Tipos de Aprovação por Item',
          dataset: 'adf_tipo_aprovacao_item',
          children: ['tipos'],
          // content: adfService.getTipoAprovacaoItem(codItem, fields, children, keepMetadata)
        },
        TipoAprovacaoReferencia: {
          title: 'Tipos de Aprovação por Referência',
          dataset: 'adf_tipo_aprovacao_referencia',
          children: ['tipos'],
          // content: adfService.getTipoAprovacaoReferencia(codTipoDocto, codReferencia, fields, children, keepMetadata)
        },
        TiposDocumento: {
          title: 'Tipos de Documentos',
          dataset: 'adf_tipo_documento',
          children: ['camposLista'],
          // content: adfService.getTipoDocumento(codigo, fields, children, keepMetadata)
        },
        Usuarios: {
          title: 'Usuários do ADF',
          dataset: 'adf_usuario',
          usuario: true,
          // content: adfService.getUsuario(codUsuario, fields, children, keepMetadata)
        }
      }
    };

    this.inicia = function inicia() {
      const active = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);

      for (const cadastro in this.Cadastros.ADF) {
        this.Cadastros.ADF[cadastro].content = [];

        if (!this.Cadastros.ADF[cadastro].ignore) {
          $http.post('/api/public/ecm/dataset/datasets/', {
            name: this.Cadastros.ADF[cadastro].dataset,
            contraints: new Array(active)
          })
            .then((result) => {
              this.Cadastros.ADF[cadastro].content = result.data.content.values;

              this.Cadastros.ADF[cadastro].content.forEach((value) => {
                Object.keys(value)
                  .forEach((key) => {
                    value[key] = globalService.isJson(value[key]) ? angular.fromJson(value[key]) : value[key];
                  });
              });

              if (this.Cadastros.ADF[cadastro].children) {
                this.Cadastros.ADF[cadastro].children.forEach((child) => {
                  const constraints = new Array(active);

                  constraints.push(DatasetFactory.createConstraint(
                    'tablename', child, child, ConstraintType.MUST
                  ));

                  const children = DatasetFactory.getDataset(this.Cadastros.ADF[cadastro].dataset, null, constraints)
                    .values;

                  if (children) {
                    children.forEach((value) => {
                      Object.keys(value)
                        .forEach((key) => {
                          value[key] = globalService.isJson(value[key]) ? angular.fromJson(value[key]) : value[key];
                        });

                      const parent = this.Cadastros.ADF[cadastro].content.filter(e => e.documentid === value.documentid)[0];

                      if (parent) {
                        if (!parent[child]) {
                          parent[child] = [];
                        }
                        parent[child].push(value);
                      }
                    });
                    this.Cadastros.ADF[cadastro].loaded = true;
                  } else {
                    this.Cadastros.ADF[cadastro].loaded = true;
                  }
                });
              } else {
                this.Cadastros.ADF[cadastro].loaded = true;
              }
            }, (error) => {

              // $log.error(error);
            });
        }
      }
    };
  }]);
