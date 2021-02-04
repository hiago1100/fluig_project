    const campos = ['documentid', 'nrTrans', 'integrado', 'status', 'statusIntegracao', 'codProcesso', 'notifica', 'notificaErro', 'codEmpresa', 'empresa', 'codEstab', 'estab', 'valor', 'descricao', 'codTipoDocto', 'tipoDocto', 'dataRef', 'labelDataRef'];

    function defineStructure() {
      campos.forEach(campo => {
        addColumn(campo);
      });

      setKey(['documentid']);

      addIndex(['documentid']);

    }

    function onSync(lastSyncDate) {
      return buscaDataset();
    }

    function createDataset(fields, constraints, sortFields) {
      return buscaDataset();
    }

    function buscaDataset() {
      
      const dataset = DatasetBuilder.newDataset();
      
      campos.forEach(campo => {
        dataset.addColumn(campo);
      });

      try {
        
        const ParamGeral = getParamGeral();
        
        const Documentos = getDocumentosPendentes(campos);

        Documentos.forEach((docto) => {
          
          log.info('integra Docto. docto.codProcesso: ' + docto.codProcesso);

          const result = integraDocumento(ParamGeral, docto);
          const status = docto.status === 'A' ? 'Aprovado' : docto.status === 'R' ? 'Reprovado' : 'Cancelado';

          if (docto.integrado !== result.integrado ||
            docto.statusIntegracao !== result.statusIntegracao ||
            !docto.notificaErro) {

            docto.integrado = result.integrado;
            docto.statusIntegracao = result.statusIntegracao;
            docto.alterado = true;

          }

          if (result.error) {

            if (!docto.notificaErro || docto.statusIntegracao !== result.statusIntegracao) {

              notificaGeral(
                ParamGeral,
                docto,
                status,
                result.statusIntegracao,
                `Erro ao integrar ${docto.tipoDocto}`,
                'Ocorreram erros ao tentar integrar o documento abaixo', ParamGeral.emailNotificaErros
              );

              docto.notificaErro = 'ok';

              docto.alterado = true;
            }

          } else if (!docto.notifica && docto.status === 'A') {

            const Terceiros = getNotificaTerceiros(docto.codTipoDocto);

            Terceiros.forEach((terceiro) => {
              notificaGeral(
                ParamGeral,
                docto,
                status,
                '',
                `${docto.tipoDocto} ${status}`,
                `O documento abaixo foi ${status}`, terceiro.email
              );
            });

            docto.notifica = 'ok';

            docto.alterado = true;
          }

          if (docto.alterado) {
            let tbAprovadores = getTabelaAprovadores(docto);
            atualizaDocumento(docto, ParamGeral, tbAprovadores);
          }

          let row = [];

          campos.forEach((campo, index) => {
            row[index] = docto[campo] || '';
          });

          dataset.addOrUpdateRow(row);
        });
      } catch (e) {
        log.error(`*** ERRO adf_aprovacao_docto: ${e.message}`);
      }

      log.info('*** adf_aprovacao_docto fim ***');

      return dataset;
    }

    function onMobileSync(user) {

    }

    /*$$ partials/getTabelaAprovadores.js $$*/
    /*$$ partials/prototypes.js $$*/
    /*$$ partials/callDatasul.js $$*/
    /*$$ partials/sendCustomEmail.js $$*/
    /*$$ partials/getParamGeral.js $$*/
    /*$$ partials/getDocumentosPendentes.js $$*/
    /*$$ partials/integraDocumento.js $$*/
    /*$$ partials/notificaGeral.js $$*/
    /*$$ partials/getNotificaTerceiros.js $$*/
    /*$$ partials/atualizaDocumento.js $$*/
