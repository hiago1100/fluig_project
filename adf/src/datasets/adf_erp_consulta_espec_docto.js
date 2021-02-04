    const campos = ['cod_espec_docto', 'des_espec_docto'];
    const display = campos;
    const dePara = ['codigo', 'descricao'];
    const nomeTabela = 'espec_docto';

    function defineStructure() {
      for (let i = 0; i < dePara.length; i++) {
        addColumn(dePara[i]);
      }
      addColumn('displaykey');

      setKey(['codigo']);

      addIndex(['codigo']);
    }

    function onSync(lastSyncDate) {
      return buscaDataset();
    }

    function createDataset(fields, constraints, sortFields) {
      return buscaDataset();
    }

    function onMobileSync(user) {

    }

    function buscaDataset() {
      const params = {
        ttParam: [{
          nomeTabela,
          camposBusca: campos.join(' '),
          rows: 999
        }]
      };

      var json = callDatasul("adf/queryDinamicaV1.p", "piBusca", params);

      // const json = jsonLocal();

      return montaDataset(json.ttErro, json[nomeTabela], campos, display, dePara);
    }

    /*$$ partials/callDatasul.js $$*/
    /*$$ partials/montaDataset.js $$*/

    function jsonLocal() {
      return {
        espec_docto: [{
            cod_espec_docto: 'RD',
            des_espec_docto: 'Reembolso de despesa'
          },
          {
            cod_espec_docto: 'RH',
            des_espec_docto: 'Despesas de RH'
          },
          {
            cod_espec_docto: 'FN',
            des_espec_docto: 'Pagamento de fornecedores'
          },
          {
            cod_espec_docto: 'IP',
            des_espec_docto: 'Pagamento de impostos'
          }
        ]
      };
    }
