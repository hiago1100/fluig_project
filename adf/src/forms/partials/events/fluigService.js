const fluigService = {
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
      // dataset = DatasetFactory.getDataset('colleague', null, constraints)
      //   .values;
      var ds = DatasetFactory.getDataset('colleague', null, constraints, null);

      dataset = [];

      for (let i = 0; i < ds.rowsCount; i++) {
        let obj = {};
        fields.forEach(field => {
          obj[field] = String(ds.getValue(0, field));
        });
        dataset.push(obj);
      }
    } catch (error) {
      log.info('fluigService Error: ' + error);
    }

    dataset.forEach(usuario => {
      usuario.colleagueId = usuario['colleaguePK.colleagueId'];
    });

    return this.fixDataset(dataset, fields);
  },

  /**
   * Retorna dados de um dataset
   *
   * @param {any} name
   * @param {any} params
   * @param {any} fields
   * @returns
   */
  getDataset: function getDataset(name, params, fields, children, keepMetadata) {
    const that = this;
    let dataset;

    const constraints = new Array(this.active);
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
      log.info('getDataset');
      log.info(name);
      log.info(constraints)
      var ds = DatasetFactory.getDataset(name, null, constraints, null);

      dataset = [];

      for (let i = 0; i < ds.rowsCount; i++) {
        let obj = {};
        fields.forEach(field => {
          log.info(field)
          obj[field] = String(ds.getValue(0, field));
        });
        dataset.push(obj);
      }

      if (children) {
        dataset.forEach((value) => {
          children.forEach((child) => {
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

            // const datasetFilhos = DatasetFactory.getDataset(name, null, constraintsFilhos, null)
            //   .values;

            var dsFilhos = DatasetFactory.getDataset(name, null, constraintsFilhos, null);

            const datasetFilhos = [];

            for (let i = 0; i < dsFilhos.rowsCount; i++) {
              let obj = {};
              child.fields.forEach(field => {
                obj[field] = String(dsFilhos.getValue(0, field));
              });
              datasetFilhos.push(obj);
            }

            value[child.name] = that.fixDataset(datasetFilhos, child.fields)
              .toJSON();
            if (fields) {
              fields.push(child.name);
            }
          });
        });
      }
    } catch (error) {
      log.info(error);
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

    dataset.forEach((value) => {
      Object.keys(value)
        .forEach((key) => {
          if (!keepMetadata) {
            if (properties.inArray(key)) { delete value[key]; }
          }

          if (_fields && !_fields.inArray(key)) { delete value[key]; }

          if (value[key]) {
            value[key] = globalService.isJson(value[key]) ? JSON.parse(value[key]) : value[key];
            if (_lower) {
              value[key.toLowerCase()] = value[key];
              if (key !== key.toLowerCase()) { delete value[key]; }
            }
          }
        });
    });

    log.info(dataset)

    return dataset;
  }
}
