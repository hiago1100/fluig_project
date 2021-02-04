function getParametroGeral() {

    var constraints = new Array(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    var dataset = DatasetFactory.getDataset("parametros_geral", null, constraints, null);

    if (!dataset || dataset.rowsCount == 0) {
        return null;
    }

    var Parametros = {}

    Parametros.Geral = JSON.parse(dataset.getValue(0, "Geral"));
    Parametros.Integracao = JSON.parse(dataset.getValue(0, "Integracao"));
    Parametros.Autenticacao = JSON.parse(dataset.getValue(0, "Autenticacao"));

    return Parametros;
}