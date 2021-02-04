function servicetask34(attempt, message) {

    var numSolic = getValue("WKNumProces"); 
    var cpf =  hAPI.getCardValue('cpCpf');
    var pa = hAPI.getCardValue('pa');
    var val = hAPI.getCardValue('totalTitulo');
    var valor = val.replace(",", ".");
    var codCusto = hAPI.getCardValue('aux_codCusto');

    var c1 = DatasetFactory.createConstraint("codCusto", codCusto, codCusto, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("numSolic", numSolic, numSolic, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("pa", pa, pa, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("valor", valor, valor, ConstraintType.MUST);
   

    var process = getValue("WKNumProces");
    var i = 0;
    var tabela = new Array();
    var cardData = new java.util.HashMap();
    cardData = hAPI.getCardData(process);
    var keys = cardData.keySet().toArray();

   
    for ( var key in keys) {
        var field = keys[key];
        if (field.indexOf("aux_codigo___") > -1) {
            var row = field.replace("aux_codigo___", "");
            var despesa = new Object();
            despesa.codTipo    = parseInt(hAPI.getCardValue("aux_codigo" + "___" + row));
            var teste = ""+ hAPI.getCardValue("cpValor" + "___" + row);
            var valor = teste.replace(",", ".");
            despesa.valorTit   = ""+ valor;
            tabela[i] = despesa;
            i++;
        }
    }

    log.info("=====TABELA=====");
    log.dir(tabela);

    var tipo = [];
    var valor = [];

    for (var i in tabela) {

        tipo.push(tabela[i].codTipo);
        valor.push(tabela[i].valorTit);
    }
    
    var c6 = DatasetFactory.createConstraint("codTipo_valorTit", tipo, valor, ConstraintType.MUST);
   

    var constraints = new Array(c1,c2,c3,c4,c5,c6);
    log.info("constraints");
    log.dir(constraints);
    // DatasetFactory.getDataset("ds_integraTitulo", null, constraints, null)   
    var dataset = DatasetFactory.getDataset("ds_integraTitulo", null, constraints, null);

    var retorno = dataset.values[0]
    var ret = retorno[0];
    log.info("****RETORNO INTEGRAÇÃO*****")
    log.dir(ret)

    if (ret != "[MSG-MFININC] Inclusao de Titulo a Pagar bem sucedida!" && ret != "[MSG-MFININC] Compensação Automática Concluida!" ) {
        throw (ret);
    }
}