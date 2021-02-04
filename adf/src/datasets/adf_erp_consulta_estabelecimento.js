    const campos = ['cod_empresa', 'cod_estab', 'nom_abrev'];
    const display = ['cod_estab', 'nom_abrev'];
    const dePara = ['empresa', 'codigo', 'descricao'];
    const nomeTabela = 'estabelecimento';

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
        estabelecimento: [{
            cod_empresa: '100',
            cod_estab: '101',
            nom_abrev: 'MATRIZ'
          },
          {
            cod_empresa: '100',
            cod_estab: '102',
            nom_abrev: 'NAÇÕES UNIDAS'
          },
          {
            cod_empresa: '100',
            cod_estab: '103',
            nom_abrev: 'CAMPINAS'
          },
          {
            cod_empresa: '100',
            cod_estab: '201',
            nom_abrev: 'CURITIBA'
          },
          {
            cod_empresa: '100',
            cod_estab: '202',
            nom_abrev: 'LONDRINA'
          },
          {
            cod_empresa: '100',
            cod_estab: '301',
            nom_abrev: 'FLORIANÓPOLIS'
          },
          {
            cod_empresa: '100',
            cod_estab: '401',
            nom_abrev: 'PORTO ALEGRE'
          }
        ]
      };
    }
