    const campos = ['mo-codigo', 'descricao', 'sigla'];
    const display = ['mo-codigo', 'descricao'];
    const dePara = ['codigo', 'descricao', 'sigla'];
    const nomeTabela = 'moeda';

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
        moeda: [{
          'mo-codigo': '0',
          descricao: 'Real',
          sigla: 'R$'
        }, {
          'mo-codigo': '1',
          descricao: 'Dolar',
          sigla: 'USD'
        }, {
          'mo-codigo': '2',
          descricao: 'Euro',
          sigla: 'EUR'
        }]
      };
    }
