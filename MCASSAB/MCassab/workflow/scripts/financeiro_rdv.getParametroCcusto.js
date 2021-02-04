function getParametroCcusto(cod_empresa, cod_plano_ccusto, cod_ccusto) {

    var constraints = new Array(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));

    cod_empresa ? constraints.push(DatasetFactory.createConstraint("cod_empresa", cod_empresa, cod_empresa, ConstraintType.MUST)) : null;
    cod_plano_ccusto ? constraints.push(DatasetFactory.createConstraint("cod_plano_ccusto", cod_plano_ccusto, cod_plano_ccusto, ConstraintType.MUST)) : null;
    cod_ccusto ? constraints.push(DatasetFactory.createConstraint("cod_ccusto", cod_ccusto, cod_ccusto, ConstraintType.MUST)) : null;

    var dataset = DatasetFactory.getDataset("parametros_ccusto", null, constraints, null);

    if (!dataset || dataset.rowsCount == 0) {
        return null;
    }

    var CcustoParam = JSON.parse(dataset.getValue(0, "Ccusto"));

    var Ccusto = CcustoParam.ccusto;
    Ccusto.responsavel = CcustoParam.responsavel;
    var documentId = dataset.getValue(0, "metadata#id");
    var documentVersion = dataset.getValue(0, "metadata#version");

    var c1 = DatasetFactory.createConstraint("tablename", "Aprovadores", "Aprovadores", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
    var constraintsFilhos = new Array(c1, c2, c3);

    var aprovadores = DatasetFactory.getDataset("parametros_ccusto", null, constraintsFilhos, null);

    Ccusto.Aprovadores = [];

    for (var j = 0; j < aprovadores.rowsCount; j++) {

        Ccusto.Aprovadores.push(
            JSON.parse(String(aprovadores.getValue(j, "aprovador")))
        )
    }
    
    return Ccusto;
}