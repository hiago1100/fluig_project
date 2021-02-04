    const campos = ['cd-nivel', 'descricao'];
    const display = campos;
    const dePara = ['codigo', 'descricao'];
    const nomeTabela = 'adf-nivel';

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
        'adf-nivel': [{
            'cd-nivel': '1',
            descricao: 'Baixo'
          },
          {
            'cd-nivel': '2',
            descricao: 'Médio'
          },
          {
            'cd-nivel': '3',
            descricao: 'Alto'
          }
        ]
      };
    }
