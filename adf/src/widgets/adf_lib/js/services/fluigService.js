angular.module('adf.services')
  .factory('fluigService', ['$q', '$http', '$log', '$document', 'globalService',
    ($q, $http, $log, $document, globalService) => ({

      active: DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST),
      propertiesToIgnore: [
        'Params',
        'Errors',
        'metadata#id',
        'metadata#parent_id',
        'metadata#version',
        'metadata#card_index_id',
        'metadata#card_index_version',
        'metadata#active',
        'cardid',
        'companyid',
        'documentid',
        'id',
        'tableid',
        'version'
      ],

      /**
       * Retorna os usuários do Fluig
       *
       * @returns
       */
      getUsuarios: function getUsuarios(userId, fields) {
        const constraints = [];
        let dataset;

        if (userId) {
          constraints.push(
            DatasetFactory.createConstraint('colleaguePK.colleagueId', userId, userId, ConstraintType.MUST)
          );
        }

        try {
          dataset = DatasetFactory.getDataset('colleague', null, constraints)
            .values;
        } catch (error) {
          $log.error('fluigService Error: ', error);
        }

        angular.forEach(dataset, (usuario) => {
          usuario.colleagueId = usuario['colleaguePK.colleagueId'];
        });

        return this.fixDataset(dataset, fields);
      },

      removeDoc: function removeDoc(docsToDelete) {
        const defer = $q.defer();
        try {
          $http.delete('/ecm/api/rest/ecm/navigation/removeDoc/', { data: { docsToDelete }, headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('editCard Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      newCard: function newCard(document) {
        const defer = $q.defer();
        try {
          const cardFormData = this.jsonToFormData(document);

          const param = {
            companyId: WCMAPI.tenantCode,
            version: 1000,
            parentDocumentId: document['metadata#parent_id'],
            cardDescription: 'displaykey',
            publisherId: WCMAPI.userCode,
            inheritSecurity: true,
            deleteUploadFiles: true,
            documentType: '5',
            attachments: ['custom.min.js'],
            userSecurityLevel: 3,
            metaListId: 7,
            cardFormData
          };

          $http.post('/ecm/api/rest/ecm/cardPublisher/saveNewCardItem', param)
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('editCard Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      editCard: function editCard(document) {
        const defer = $q.defer();
        try {
          const cardFormData = this.jsonToFormData(document);

          $http.post(`/ecm/api/rest/ecm/cardView/editCard/${document.documentid}/${document.version}`, cardFormData)
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('editCard Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      jsonToFormData: function jsonToFormData(document) {
        const cardFormData = [];
        for (const key in document) {
          if ($.inArray(key, this.propertiesToIgnore) < 0) {
            if (angular.isArray(document[key])) {
              angular.forEach(document[key], (child, index) => {
                for (const childKey in child) {
                  cardFormData.push({
                    name: `${childKey}___${index + 1}`,
                    value: angular.isObject(child[childKey]) ? JSON.stringify(child[childKey]) : child[childKey]
                  });
                }
              });
            } else {
              cardFormData.push({
                name: key,
                value: angular.isObject(document[key]) ? JSON.stringify(document[key]) : document[key]
              });
            }
          }
        }

        return cardFormData;
      },

      /**
       * Retorna dados de um dataset
       *
       * @param {any} name
       * @param {any} params
       * @param {any} fields
       * @returns
       */
      getDataset: function getDataset(name, params, fields, children, keepMetadata, ignoreActive) {
        const that = this;
        let dataset;

        const constraints = ignoreActive ? new Array() : new Array(this.active);
        if (params) {
          Object.keys(params)
            .forEach((prop) => {
              if (params[prop]) {
                constraints.push(
                  DatasetFactory.createConstraint(prop, params[prop], params[prop], ConstraintType.MUST)
                );
              }
            });
        }

        try {
          dataset = DatasetFactory.getDataset(name, null, constraints)
            .values;

          if (children) {
            angular.forEach(dataset, (value) => {
              angular.forEach(children, (child) => {
                const c1 = DatasetFactory.createConstraint(
                  'tablename', child.name, child.name, ConstraintType.MUST
                );
                const c2 = DatasetFactory.createConstraint(
                  'metadata#id', value['metadata#id'], value['metadata#id'], ConstraintType.MUST
                );
                const c3 = DatasetFactory.createConstraint(
                  'metadata#version', value['metadata#version'], value['metadata#version'], ConstraintType.MUST
                );
                const constraintsFilhos = [c1, c2, c3];

                const datasetFilhos = DatasetFactory.getDataset(name, null, constraintsFilhos, null)
                  .values;

                value[child.name] = angular.toJson(that.fixDataset(datasetFilhos, child.fields));
                if (fields) {
                  fields.push(child.name);
                }
              });
            });
          }
        } catch (error) {
          $log.error(error);
        }

        return this.fixDataset(dataset, fields, null, keepMetadata);
      },

      /**
       * Gera um id
       *
       * @returns
       */
      guid: function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return `${s4() + s4()}$${s4()}$${s4()}$${
                s4()}$${s4()}${s4()}${s4()}`;
      },

      /**
       * Enviar uma notificação a um usuário
       *
       * @param {any} _loginReceiver - O login do usuário que receberá a notificação
       * @param {any} _notification
       * @param {any} _eventKey
       * @param {any} _priority
       * @param {any} _objectClass
       * @returns
       */
      sendNotification: function sendNotification(_loginReceiver, _notification, _eventKey, _priority, _objectClass) {
        const eventKey = _eventKey || 'NEW_COMPLEMENT_AUTHORITY';
        const priority = _priority || 'NORMAL';
        const objectClass = _objectClass || 'com.fluig.Class';
        const loginReceiver = _loginReceiver;

        const defer = $q.defer();
        const loading = FLUIGC.loading('body');

        const notification = {
          eventKey,
          loginReceiver,
          priority,
          object: {
            alertObjectId: '1',
            alertObjectClass: objectClass,
            alertObjectDescription: _notification

          }
        };

        loading.show();

        $http.post('/api/public/alert/service/sendNotification', notification)
          .success((data) => {
            loading.hide();
            defer.resolve(data);
          })
          .error((error) => {
            $log.error('fluigService Error: ', error);
            loading.hide();
            defer.reject(error);
          });

        return defer.promise;
      },

      /**
       * Remover propriedades não utilizadas do dataset
       *
       * @param {any} dataset - O dataset
       * @param {any} fields - Os campos do dataset
       * @returns
       */
      fixDataset: function fixDataset(_dataset, _fields, _lower, keepMetadata) {
        const properties = [
          'Params',
          'Errors',
          'metadata#id',
          'metadata#parent_id',
          'metadata#version',
          'metadata#card_index_id',
          'metadata#card_index_version',
          'metadata#active',
          'cardid',
          'companyid',
          'documentid',
          'id',
          'tableid',
          'version'
        ];
        const dataset = _dataset;

        angular.forEach(dataset, (value) => {
          Object.keys(value)
            .forEach((key) => {
              if (!keepMetadata) {
                if ($.inArray(key, properties) >= 0) { delete value[key]; }
              }

              if (_fields && $.inArray(key, _fields) < 0) { delete value[key]; }

              if (value[key]) {
                value[key] = globalService.isJson(value[key]) ? angular.fromJson(value[key]) : value[key];
                if (_lower) {
                  value[key.toLowerCase()] = value[key];
                  if (key !== key.toLowerCase()) { delete value[key]; }
                }
              }
            });
        });

        return dataset;
      },

      /**
       * Busca o arquivo de um documento no ECM
       *
       * @param {any} documentId - O código do documento
       * @param {any} version - A versão do documento
       * @returns
       */
      getDocument: function getDocument(documentId, version) {
        const defer = $q.defer();
        const loading = FLUIGC.loading('body');

        loading.show();

        try {
          $http.get(`/api/public/ecm/document/documentfile/${documentId}/${version}`)
            .then((response) => {
              loading.hide();
              defer.resolve(response.data);
            }, (error) => {
              $log.error('getDocument Failed:', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      findUserAppParamByUser(params) {
        const defer = $q.defer();

        try {
          $http.post('/ecm/api/rest/ecm/userpreferences/findUserAppParamByUser', {
              companyId: params.companyId,
              userId: params.userId
            })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('findUserAppParamByUser Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      saveUserApplicationParameter(params) {
        const defer = $q.defer();

        try {
          $http.post('/ecm/api/rest/ecm/userpreferences/saveUserApplicationParameter', {
              codAplicat: params.codAplicat,
              companyId: params.companyId,
              parameterName: params.parameterName,
              parameterValue: params.parameterValue,
              userId: params.userId
            })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('findUserAppParamByUser Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      /**
       * Busca o arquivo de um documento na última versão
       *
       * @param {any} documentId - O código do documento
       * @returns
       */
      getActiveDocument: function getActiveDocument(documentId) {
        const defer = $q.defer();
        const loading = FLUIGC.loading('body');

        loading.show();

        try {
          // const oReq = new XMLHttpRequest();

          // oReq.open('GET', `/api/public/ecm/document/activeDocumentFile/${documentId}`, true);
          // oReq.responseType = 'application/json';
          // oReq.onload = function (e) {
          //   loading.hide();
          //   defer.resolve(JSON.parse(oReq.response));
          // };
          // oReq.send();

          // TODO:  A CHAMADA ABAIXO NÃO ESTÁ FUNCIONANDO NA MOINHO.
          //        TESTAR NO FLUIG 1.6 PRA VER SE OCORRE ERRO

          $http.get(`/api/public/ecm/document/downloadURL/${documentId}`)
            .then((response) => {
              $log.log(response.data.content);
              $http.get(response.data.content)
                .then((downloadURL) => {
                  $log.log(downloadURL.data);
                  defer.resolve(downloadURL.data);
                }, (error) => {
                  $log.error('getActiveDocument Failed: ', error);
                  defer.reject(error);
                });
              loading.hide();

            }, (error) => {
              $log.error('getActiveDocument Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      /**
       * Associa um script ao DOM
       *
       * @param {any} src - A URL do script
       * @returns
       */
      appendScript: function appendScript(src) {
        const defer = $q.defer();
        try {
          if (angular.element(`script[src="${src}"]`)
            .length <= 0) {
            const script = $document[0].createElement('script');
            script.src = src;
            script.async = true;

            const onScriptLoad = function onScriptLoad() {
              defer.resolve();
            };

            script.onreadystatechange = onScriptLoad;
            script.onload = onScriptLoad;

            $document[0].querySelector('head')
              .appendChild(script);
          } else {
            defer.resolve();
          }
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      /**
       * Busca as definições de um processo
       *
       * @param {any} processInstanceId - O código da instância do processo
       * @param {any} currentMovto - Código da atividade corrente
       * @param {any} managerMode - Se acessa como gestor
       * @returns
       */
      getDefinitionProcess: function getDefinitionProcess(processInstanceId, currentMovto, managerMode, taskUserId) {
        const defer = $q.defer();

        try {
          $http.get('/ecm/api/rest/ecm/workflowView/getDefinitionProcess', {
              params: {
                processId: '',
                processInstanceId,
                taskUserId,
                currentMovto,
                managerMode
              }
            })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              $log.error('getDefinitionProcess Failed: ', error);
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
        }

        return defer.promise;
      },

      /**
       * Monta o array de dados com base em um formulário de processo
       *
       * @param {any} formHtml - A URL do formulário
       * @returns
       */
      getProcessFormData: function getProcessFormData(formHtml) {
        const defer = $q.defer();

        try {
          $http.get(formHtml)
            .then((response) => {
                const html = $.parseHTML(response.data);

                const formData = angular.element(html)
                  .contents()
                  .find('form')
                  .serializeArray();

                const radios = angular.element(html)
                  .contents()
                  .find('form')
                  .find('input[type=radio]');

                const that = this;

                $.each(radios, (index, radio) => {
                  const needsToAdd = that.formdata.filter(existent => existent.name === radio.name)
                    .length === 0;
                  if (needsToAdd) {
                    that.formdata.push({
                      name: radio.name,
                      value: ''
                    });
                  }
                });
                defer.resolve(formData);
              },
              (error) => {
                $log.error('getProcessFormData Failed: ', error);
                defer.reject(error);
              });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      /**
       * Movimenta um processo de workflow
       *
       * @param {any} params - Todos os parâmetros esperados pela API
       * @returns
       */
      sendWorkflow: function sendWorkflow(params) {
        const defer = $q.defer();

        try {
          $http.post('/ecm/api/rest/ecm/workflowView/send', {
              appointments: params.appointments || [],
              attachments: params.attachments || [],
              comments: params.comments || '',
              completeTask: params.completeTask || true,
              conditionAfterAutomatic: params.conditionAfterAutomatic || -1,
              currentMovto: params.currentMovto,
              currentState: params.currentState || params.currentMovto,
              digitalSignature: params.digitalSignature || false,
              formData: params.formData || [],
              internalFields: params.internalFields || [],
              isDigitalSigned: params.isDigitalSigned || false,
              // isLinkReturn: params.isLinkReturn || false,
              managerMode: params.managerMode || false,
              newObservations: params.newObservations || [],
              processId: params.processId,
              processInstanceId: params.processInstanceId,
              selectedColleague: params.selectedColleague || [],
              selectedDestinyAfterAutomatic: params.selectedDestinyAfterAutomatic || -1,
              selectedState: params.selectedState,
              // subProcessId: params.subProcessId || params.processId,
              // subProcessSequence: params.subProcessSequence || params.selectedState,
              taskUserId: params.taskUserId || WCMAPI.userCode,
              // transferTaskAfterSelection: params.transferTaskAfterSelection || false,
              version: params.version || 1,
              versionDoc: params.versionDoc || 1000
            })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      batchSend: function batchSend(params) {
        const defer = $q.defer();

        try {
          $http.post('/ecm/api/rest/ecm/centralTasks/batchSend/', {
              colleagueTaskOwner: params.colleagueTaskOwner || WCMAPI.userCode,
              instances: params.instances,
              managerMode: params.managerMode || false,
              observation: params.observation,
              password: params.password,
              selectedColleagues: params.selectedColleagues || [],
              selectedState: params.selectedState
            })
            .then((response) => {
              defer.resolve(response.data);
            }, (error) => {
              defer.reject(error);
            });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      },

      getValidReplacedUsers: function getValidReplacedUsers() {
        const defer = $q.defer();

        try {
          $http.get('/ecm/api/rest/ecm/centralTasks/getValidReplacedUsers')
            .then((response) => {
                const Users = [];

                Object.getOwnPropertyNames(response.data)
                  .forEach((val) => {
                    Users.push({
                      colleagueName: response.data[val].colleagueName,
                      colleagueId: val,
                      login: response.data[val].login
                    });
                  });

                defer.resolve(Users);
              },
              (error) => {
                $log.error('getValidReplacedUsers Failed: ', error);
                defer.reject(error);
              });
        } catch (error) {
          $log.error(error);
          defer.reject(error);
        }

        return defer.promise;
      }

    })

  ]);
