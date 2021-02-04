    const campos = ['cod-rejeicao', 'des-rejeicao'];
    const display = campos;
    const dePara = ['codigo', 'descricao'];
    const nomeTabela = 'mla-rej-aprov';

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
        'mla-rej-aprov': [{
            'cod-rejeicao': '1',
            'des-rejeicao': 'Valor não aprovado'
          },
          {
            'cod-rejeicao': '2',
            'des-rejeicao': 'Rejeitado por avaliação técnica'
          },
          {
            'cod-rejeicao': '3',
            'des-rejeicao': 'Negado'
          },
          {
            'cod-rejeicao': '4',
            'des-rejeicao': 'Outros motivos'
          }
        ]
      };
    }
