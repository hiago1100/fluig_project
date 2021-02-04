    const campos = ['cod_empresa', 'cod_plano_ccusto', 'cod_ccusto', 'des_tit_ctbl', 'dat_inic_valid', 'dat_fim_valid'];
    const display = ['cod_empresa', 'cod_ccusto', 'des_tit_ctbl'];
    const dePara = ['empresa', 'plano', 'codigo', 'descricao', 'inicio', 'termino'];
    const nomeTabela = 'ccusto';
    const filtroWhere = 'dat_fim_valid >= today';

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

      const json = callDatasul("adf/queryDinamicaV1.p", "piBusca", params);

      //const json = jsonLocal();

      return montaDataset(json.ttErro, json[nomeTabela], campos, display, dePara);
    }

    /*$$ partials/callDatasul.js $$*/
    /*$$ partials/montaDataset.js $$*/

    function jsonLocal() {
      return {
        ccusto: [{
            cod_empresa: '100',
            cod_plano_ccusto: 'PADRAO',
            cod_ccusto: '1001001',
            des_tit_ctbl: 'PRESIDENCIA',
            dat_inic_valid: '01/01/0001',
            dat_fim_valid: '31/12/9999'
          },
          {
            cod_empresa: '100',
            cod_plano_ccusto: 'PADRAO',
            cod_ccusto: '1001002',
            des_tit_ctbl: 'VICE-PRESIDENCIA',
            dat_inic_valid: '01/01/0001',
            dat_fim_valid: '31/12/9999'
          },
          {
            cod_empresa: '100',
            cod_plano_ccusto: 'PADRAO',
            cod_ccusto: '1001003',
            des_tit_ctbl: 'DIRETORIA TECNICA',
            dat_inic_valid: '01/01/0001',
            dat_fim_valid: '31/12/9999'
          },
          {
            cod_empresa: '100',
            cod_plano_ccusto: 'PADRAO',
            cod_ccusto: '1001004',
            des_tit_ctbl: 'DIRETORIA FINANCEIRA',
            dat_inic_valid: '01/01/0001',
            dat_fim_valid: '31/12/9999'
          },
          {
            cod_empresa: '100',
            cod_plano_ccusto: 'PADRAO',
            cod_ccusto: '1001005',
            des_tit_ctbl: 'DIRETORIA GERAL',
            dat_inic_valid: '01/01/0001',
            dat_fim_valid: '31/12/9999'
          }
        ]
      };
    }
