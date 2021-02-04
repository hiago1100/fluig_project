angular.module('adf.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      /**
       * Retorna os estabelecimentos cadastrados no ERP
       *
       * @param {string} cod_empresa
       * @returns
       */
      getEstabelecimento: function getEstabelecimento(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_estabelecimento', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os estabelecimentos cadastrados no ERP
       *
       * @param {string} cod_empresa
       * @returns
       */
      getCcusto: function getCcusto(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_ccusto', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os tipos de documento cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getTipoDocumento: function getTipoDocumento(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_tipo_documento', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os códigos de rejeição cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getCodigosRejeicao: function getCodigosRejeicao(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_codigo_rejeicao', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os códigos de rejeição cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getNivelEmergencial: function getNivelEmergencial(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_nivel_emergencial', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna as lotações cadastradas no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getLotacao: function getLotacao(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_lotacao', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna as famílias de itens cadastradas no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getFamilia: function getFamilia(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_familia', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os itens cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getItem: function getItem(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_item', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna as espécies de documento cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getEspecDocto: function getEspecDocto(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_espec_docto', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna as espécies de documento cadastrados no ERP
       *
       * @param {string} codigo
       * @returns
       */
      getMoeda: function getMoeda(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('adf_erp_consulta_moeda', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },
    })
  ]);
