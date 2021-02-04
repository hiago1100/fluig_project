angular.module('adf.services')
  .factory('adfService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({
      /**
       * Retorna os níveis emergenciais cadastrados no ADF
       *
       * @param {any} codTipoDocto
       * @param {any} codEstab
       * @param {any} fields
       * @returns
       */
      getNivelEmergencial: function getNivelEmergencial(codTipoDocto, codEstab, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_nivel_emergencial', {
          codTipoDocto,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os terceiros notificados nas aprovações
       *
       * @param {any} codTipoDocto
       * @param {any} fields
       * @returns
       */
      getNotificaTerceiros: function getNotificaTerceiros(codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_notifica_terceiros', {
          codTipoDocto
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os parâmetros gerais do ADF
       *
       * @param {any} fields
       * @returns
       */
      getParamGeral: function getParamGeral(fields, children, keepMetadata) {
        return fluigService.getDataset('adf_param_geral', null, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de documento do ADF
       *
       * @param {any} fields
       * @returns
       */
      getTipoDocumento: function getTipoDocumento(codigo, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_documento', {
          codigo
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna as lotações cadastradas no ADF
       *
       * @param {any} codigo
       * @param {any} fields
       * @returns
       */
      getLotacao: function getLotacao(codigo, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lotacao', {
          codigo
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna as faixas de aprovação cadastradas no ADF
       *
       * @param {any} codEstab
       * @param {any} codLotacao
       * @param {any} codTipoDocto
       * @param {any} fields
       * @param {any} children
       * @returns
       */
      getFaixasAprovacao: function getFaixasAprovacao(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_faixas_aprovacao', {
          codEstab,
          codLotacao,
          codTipoDocto
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por faixa cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codLotacao
       * @param {any} codTipoDocto
       * @param {any} codFaixa
       * @param {any} limiteInicial
       * @param {any} limiteFinal
       * @param {any} fields
       *
       * @returns
       */
      getAprovadoresFaixa: function getAprovadoresFaixa(codEstab, codLotacao, codTipoDocto, codFaixa, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_aprovadores_faixa', {
          codEstab,
          codLotacao,
          codTipoDocto,
          codFaixa
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores padrão cadastrados no ADF
       *
       * @param {any} codTipoAprovacao
       * @param {any} codEstab
       * @param {any} fields
       *
       * @returns
       */
      getAprovadorPadrao: function getAprovadorPadrao(codTipoAprovacao, codEstab, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_aprovador_padrao', {
          codTipoAprovacao,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por hierarquia cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codLotacao
       * @param {any} codTipoDocto
       * @param {any} fields
       *
       * @returns
       */
      getHierarquiaAprovadores: function getHierarquiaAprovadores(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_hierarquia_aprovadores', {
          codTipoDocto,
          codEstab,
          codLotacao
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os limites de aprovação por família cadastrados no ADF
       *
       * @param {any} codFamilia
       * @param {any} codTipoDocto
       * @param {any} fields
       *
       * @returns
       */
      getLimiteAprovacaoFamilia: function getLimiteAprovacaoFamilia(codFamilia, codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_limite_aprovacao_familia', {
          codFamilia,
          codTipoDocto
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por documento cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codTipoDocto
       * @param {any} fields
       *
       * @returns
       */
      getAprovadoresDocumento: function getAprovadoresDocumento(codEstab, codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lista_aprovadores_documento', {
          codTipoDocto,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por família cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codFamilia
       * @param {any} fields
       *
       * @returns
       */
      getAprovadoresFamilia: function getAprovadoresFamilia(codEstab, codFamilia, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lista_aprovadores_familia', {
          codFamilia,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por item cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codItem
       * @param {any} fields
       *
       * @returns
       */
      getAprovadoresItem: function getAprovadoresItem(codEstab, codItem, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lista_aprovadores_item', {
          codItem,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os aprovadores por referência cadastrados no ADF
       *
       * @param {any} codEstab
       * @param {any} codTipoDocto
       * @param {any} codReferencia
       * @param {any} fields
       *
       * @returns
       */
      getAprovadoresReferencia: function getAprovadoresReferencia(codEstab, codTipoDocto, codReferencia, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lista_aprovadores_referencia', {
          codTipoDocto,
          codReferencia,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna as lotações do usuário cadastradas no ADF
       *
       * @param {any} codUsuario
       * @param {any} fields
       *
       * @returns
       */
      getLotacoesUsuario: function getLotacoesUsuario(codUsuario, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_lotacoes_usuario', {
          codUsuario
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os campos do gerencial (Formato Lista) do tipo de documento cadastrados no ADF
       *
       * @param {any} codUsuario
       * @param {any} fields
       *
       * @returns
       */
      getCamposLista: function getCamposLista(codigo, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_documento', {
          codigo
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna as permissões do usuário cadastradas no ADF
       *
       * @param {any} codUsuario
       * @param {any} codEstab
       * @param {any} fields
       *
       * @returns
       */
      getPermissoesUsuario: function getPermissoesUsuario(codUsuario, codEstab, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_permissoes_usuario', {
          codUsuario,
          codEstab
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna as referências cadastradas no ADF
       *
       * @param {any} codTipoDocto
       * @param {any} fields
       *
       * @returns
       */
      getReferencias: function getReferencias(codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_referencias', {
          codTipoDocto
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de aprovação cadastradas no ADF
       *
       * @param {any} codigo
       * @param {any} fields
       *
       * @returns
       */
      getTipoAprovacao: function getTipoAprovacao(codigo, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_aprovacao', {
          codigo
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de aprovação por família cadastrados no ADF
       *
       * @param {any} codFamilia
       * @param {any} fields
       *
       * @returns
       */
      getTipoAprovacaoFamilia: function getTipoAprovacaoFamilia(codFamilia, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_aprovacao_familia', {
          codFamilia
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de aprovação por referência cadastrados no ADF
       *
       * @param {any} codTipoDocto
       * @param {any} codReferencia
       * @param {any} fields
       *
       * @returns
       */
      getTipoAprovacaoReferencia: function getTipoAprovacaoReferencia(codTipoDocto, codReferencia, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_aprovacao_referencia', {
          codTipoDocto,
          codReferencia
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de aprovação por referência cadastrados no ADF
       *
       * @param {any} codTipoDocto
       * @param {any} fields
       *
       * @returns
       */
      getTipoAprovacaoDocumento: function getTipoAprovacaoDocumento(codTipoDocto, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_aprovacao_documento', {
          codTipoDocto
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os tipos de aprovação por item cadastrados no ADF
       *
       * @param {any} codItem
       * @param {any} fields
       *
       * @returns
       */
      getTipoAprovacaoItem: function getTipoAprovacaoItem(codItem, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_tipo_aprovacao_item', {
          codItem
        }, fields, children, keepMetadata);
      },

      /**
       * Retorna os usuários cadastrados no ADF
       *
       * @param {any} codUsuario
       * @param {any} fields
       *
       * @returns
       */
      getUsuario: function getUsuario(codUsuario, fields, children, keepMetadata) {
        return fluigService.getDataset('adf_usuario', {
          codUsuario
        }, fields, children, keepMetadata);
      },

      aprovaReprovaDocumento: function aprovaReprovaDocumento(processo, taskUserId) {
        const defer = $q.defer();

        $log.log(processo);

        try {
          const form = fluigService.getDataset('adf_aprovacao_docto', { documentid: processo.attachId }, null, [{ name: 'tabelaAprovadores' }])[0];

          form.statusNarrativa = processo.comments;

          const formData = fluigService.jsonToFormData(form);

          const params = {
            processId: 'adf_aprovacao_docto',
            processInstanceId: processo.processInstanceId,
            selectedState: processo.status === 'A' ? '4' : '5',
            version: processo.version,
            versionDoc: processo.attachVersion,
            currentMovto: processo.movementSequence,
            taskUserId,
            formData
          };

          fluigService.sendWorkflow(params)
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              defer.reject(error);
            });

          // defer.resolve({});

          // fluigService.getDefinitionProcess(processo.processInstanceId, processo.movementSequence, false, taskUserId)
          //   .then((processDefinition) => {

          //     $log.log(processDefinition);

          //     fluigService.getProcessFormData(processDefinition.content ? processDefinition.content.formHtml : processDefinition.formHtml)
          //       .then((formData) => {

          //         const i = formData.map(x => x.name)
          //           .indexOf('statusNarrativa');

          //         formData[i].value = processo.comments;

          //         const params = {
          //           processId: 'adf_aprovacao_docto',
          //           processInstanceId: processo.processInstanceId,
          //           selectedState: processo.status === 'A' ? '4' : '5',
          //           version: processo.version,
          //           versionDoc: processo.attachVersion,
          //           currentMovto: processo.movementSequence,
          //           taskUserId,
          //           formData
          //         };

          //         fluigService.sendWorkflow(params)
          //           .then((response) => {
          //             defer.resolve(response.data);
          //           }, (error) => {
          //             defer.reject(error);
          //           });
          //       }, (error) => {
          //         defer.reject(error);
          //         $log.error(error);
          //       });
          //   }, (error) => {
          //     defer.reject(error);
          //     $log.error(error);
          //   });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      aprovaReprovaDocumentoEmBloco: function aprovaReprovaDocumentoEmBloco(processos, taskUserId, selectedState) {
        const defer = $q.defer();

        $log.log(processos);

        try {

          const instances = [];

          processos.forEach(p => {
            instances.push({ instanceId: p.processInstanceId, movementSequence: p.movementSequence })
          })

          const params = {
            colleagueTaskOwner: taskUserId,
            instances: instances,
            managerMode: false,
            observation: '',
            password: null,
            selectedColleagues: [],
            selectedState: selectedState
          };

          fluigService.batchSend(params)
            .then((response) => {
              defer.resolve(response);
            }, (error) => {
              defer.reject(error);
            });

        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      buscaDocumentosPendentes: function buscaDocumentosPendentes(userCode) {
        const defer = $q.defer();

        const camposDocto = [
          'codDoctoTemplate',
          'codEspecie',
          'codEstab',
          'codProcesso',
          'codTipoDocto',
          'dataRef',
          'descricao',
          'estab',
          'labelDataRef',
          'nrTrans',
          'tipoDocto',
          'valor'
        ];
        const documentos = [];
        let columns;
        let filterTaskColumns = [];

        try {
          $http.get('/ecm/api/rest/ecm/filtercolumn', {
              params: {
                processId: 'adf_aprovacao_docto'
              }
            })
            .then((responseFilterColumn) => {
              try {
                columns = responseFilterColumn.data.content;
                filterTaskColumns = [];

                if (columns.length === 0) {
                  throw new Error('Colunas não informadas na exportação do processo.');
                }

                angular.forEach(camposDocto, (col) => {
                  const field = columns.filter(column => column.fieldDescription === col);

                  if (!field[0]) {
                    throw new Error(`Coluna ${col} não informada na exportação do processo.`);
                  }
                  filterTaskColumns.push({
                    type: 'FORM',
                    key: field[0].fieldDescription,
                    slotId: field[0].slotId
                  });
                });

                filterTaskColumns.push({
                  key: 'processId',
                  value: 'adf_aprovacao_docto',
                  type: 'REQUEST'
                });
              } catch (error) {
                defer.reject(error);
                $log.error(error);
                return;
              }

              $http.get(`/ecm/api/rest/ecm/centralTasks/getTasks/open/${userCode}`, {
                  params: {
                    filter: {
                      isActive: true,
                      isModified: true,
                      fields: filterTaskColumns
                    },
                    offset: 0,
                    _search: false,
                    rows: 9999,
                    page: 1,
                    sidx: 'processInstanceId',
                    sord: 'asc'
                  }
                })
                .then((responseGetTasks) => {
                  angular.forEach(responseGetTasks.data.invdata, (data) => {
                    const documento = {};
                    angular.forEach(camposDocto, (col) => {
                      const field = columns.filter(column => column.fieldDescription === col);

                      documento[field[0].fieldDescription] = data[`fieldValue${field[0].slotId}`];
                    });
                    documento.movementSequence = data.movementSequence;
                    documento.attachId = data.attachId;
                    documento.processInstanceId = data.processInstanceId;
                    documento.version = data.version;
                    documento.attachVersion = data.attachVersion;
                    documento.dateExpires = data.dateExpires;
                    documento.expired = data.expired;
                    documentos.push(documento);
                  });

                  defer.resolve(documentos);
                }, (error) => {
                  $log.error(`buscaDocumentosPendentes Failed 1: ${error}`);
                  defer.reject(error);
                });
            }, (error) => {
              $log.error(`buscaDocumentosPendentes Failed 2: ${error}`);
              defer.reject(error);
            });
        } catch (error) {
          defer.reject(error);
          $log.error(`buscaDocumentosPendentes Failed 3: ${error}`);
        }

        return defer.promise;
      },

      buscaValores(usuario, inicio, termino) {
        return fluigService.getDataset('adf_consulta_valores_periodo', {
          usuario,
          inicio,
          termino
        });

        // const defer = $q.defer();
        // try {
        //   $http.get('/api/public/ecm/dataset/search?datasetId=adf_consulta_valores_periodo&limit=999999&filterFields=usuario,' + usuario + ',inicio,' + inicio + ',termino,' + termino)
        //     .then(response => {
        //       const valores = response.data.content;
        //       defer.resolve(valores);
        //     });
        // } catch (error) {
        //   defer.reject(error);
        //   $log.error(`buscaValores Failed: ${error}`);
        // }

        // return defer.promise;
      }
    })
  ]);
