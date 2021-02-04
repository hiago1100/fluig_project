    const campos = ['processo', 'usuario', 'data', 'valor', 'status'];

    function defineStructure() {
      campos.forEach(campo => {
        addColumn(campo);
      });
    }

    function onSync(lastSyncDate) {
      return buscaDataset();
    }

    function createDataset(fields, constraints, sortFields) {

      var param = {};

      if (constraints) {
        for (var i = 0; i < constraints.length; i++) {
          param[constraints[i].fieldName] = String(constraints[i].initialValue);
        }
      }

      return buscaDataset(param);
    }

    function buscaDataset(param) {
      log.info(param.usuario);
      log.info(param.inicio);
      log.info(param.termino);

      const dataset = DatasetBuilder.newDataset();
      const documentos = [];

      const c1ProcessTask = DatasetFactory.createConstraint("processTaskPK.colleagueId", param.usuario, param.usuario, ConstraintType.MUST);
      const c2ProcessTask = DatasetFactory.createConstraint("taskCompletionDate", param.inicio, param.termino, ConstraintType.MUST);
      const c3ProcessTask = DatasetFactory.createConstraint("choosedSequence", "4", "5", ConstraintType.MUST);
      const dsProcessTask = DatasetFactory.getDataset("processTask", null, [c1ProcessTask, c2ProcessTask, c3ProcessTask], null);

      log.info(dsProcessTask.rowsCount);

      for (var iProcessTask = 0; iProcessTask < dsProcessTask.rowsCount; iProcessTask++) {
        const codProcesso = dsProcessTask.getValue(iProcessTask, "processTaskPK.processInstanceId");
        const taskCompletionDate = dsProcessTask.getValue(iProcessTask, "taskCompletionDate");
        const choosedSequence = dsProcessTask.getValue(iProcessTask, "choosedSequence");

        const c1AprovacaoDocto = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
        const c2AprovacaoDocto = DatasetFactory.createConstraint("codProcesso", codProcesso, codProcesso, ConstraintType.MUST);
        const dsAprovacaoDocto = DatasetFactory.getDataset("adf_aprovacao_docto", null, [c1AprovacaoDocto, c2AprovacaoDocto], null);
        
        log.info(iProcessTask);
        log.info(codProcesso);
        log.info(dsAprovacaoDocto.rowsCount);

        if (dsAprovacaoDocto.rowsCount > 0) {
          log.info('dsAprovacaoDocto.rowsCount ==> ' + dsAprovacaoDocto.rowsCount);
          log.info('iProcessTask ==> ' + iProcessTask);
          log.info('codProcesso ==> ' + codProcesso);

          for (var iAProvacaoDocto = 0; iAProvacaoDocto < dsAprovacaoDocto.rowsCount; iAProvacaoDocto++) {
            const valor = dsAprovacaoDocto.getValue(iAProvacaoDocto, "valor");
            log.info(valor);
            log.info(choosedSequence);
            documentos.push({
              'processo': codProcesso,
              'usuario': param.usuario,
              'data': taskCompletionDate,
              'valor': valor,
              'status': choosedSequence == '4' ? 'A' : 'R'
            });
          }
        }
      }

      campos.forEach(campo => {
        dataset.addColumn(campo);
      });

      // const valores = jsonLocal();

      documentos.forEach(docto => {
        let row = [];
        campos.forEach((campo, index) => {
          log.info(index);
          log.info(docto[campo])
          row[index] = docto[campo] || '';
        });

        dataset.addRow(row);
      });

      return dataset;
    }

    function jsonLocal() {
      return [{
        'usuario': 'admin.adf',
        'data': new Date()
          .toString(),
        'valor': '1000.34'
      }];
    }
