function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  var dataset = DatasetBuilder.newDataset();

  var campos = ['accesslog_id', 'access_date', 'login', 'client_address', 'server_address'];

  campos.forEach(function (campo) {
    dataset.addColumn(campo);
  });
  dataset.addColumn('new_version');

  var Acessos = executaSql("SELECT * FROM fdn_accesslog where access_date >= '2017-10-14' and access_date <= '2017-10-17'", 'query', campos, '/jdbc/FluigDS');

  Acessos.forEach(function (acesso) {

    var row = new Array();
    campos.forEach(function (campo) {
      row.push(String(acesso[campo]));
    });

    dataset.addRow(row);

  });

  return dataset;

}

function onMobileSync(user) {

}

/*$$ partials/executaSql.js $$*/
