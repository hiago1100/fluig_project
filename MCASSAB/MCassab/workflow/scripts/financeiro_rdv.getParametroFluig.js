function getParametroFluig() {

    var dataset = DatasetFactory.getDataset("fluig_parametros", null, null, null);

    if (!dataset || dataset.rowsCount == 0) {
        return null;
    }

    var Parametros = {}

    Parametros.usuarioFluig = dataset.getValue(0, "usuarioFluig");
    Parametros.senhaFluig = dataset.getValue(0, "senhaFluig");
    Parametros.empresaFluig = dataset.getValue(0, "empresaFluig");

    return Parametros;
}