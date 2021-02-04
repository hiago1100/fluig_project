function criaWorkflowDespesa() {

    log.info(">>>>>>>>>>> criaWorkflowDespesa");

    var userList = new java.util.ArrayList();

    userList.add("System:Auto");

    var Geral = JSON.parse(String(hAPI.getCardValue("Geral")).escape());
    var Ccustos = JSON.parse(String(hAPI.getCardValue("Ccustos")).escape());
    var DespesaIds = JSON.parse(String(hAPI.getCardValue("DespesaIds")).escape());
    var Despesas = getChildren("despesa", DespesaIds);
    var numSolicitacao = getValue("WKNumProces");
    
    //Popular Campo Data Aprovação.
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    var FluigParametros = getParametroFluig();
    
    Despesas.forEach(function (despesa, index) {
        
        if (!despesa.wf) {
            var cardData = new java.util.HashMap();
            var cc = Ccustos.map(function (x) {
                return x.displayKey;
            }).indexOf(despesa.ccusto.displayKey);

            cardData.put('solicitante', String(Geral.solicitante.colleagueName));
            cardData.put('viajante', String(Geral.viajante.colleagueName));
            cardData.put('estabelecimento', String(Geral.estabelecimento.displayKey));
            cardData.put('dataSolicitacao', String(new Date()))
            cardData.put('despesa', String(despesa.item.descricao));
            cardData.put('despesaData', String(despesa.data));
            cardData.put('despesaCcusto', String(despesa.ccusto.displayKey));
            cardData.put('despesaAprovador', String(Ccustos[cc].aprovador.colleagueName));
            cardData.put('despesaQtde', String(despesa.qtde));
            cardData.put('despesaValorUn', String(despesa.valor));
            cardData.put('despesaValorTotal', String(despesa.valorTotal));
            cardData.put('despesaObs', String(despesa.obs));
            cardData.put('numeroSolicitacao', String(numSolicitacao));
            cardData.put('dataAprovacao', String(today));            

            //var wf = workflowService.startProcess(FluigParametros.usuarioFluig, FluigParametros.senhaFluig, Number(FluigParametros.empresaFluig), "financeiro_rdv_despesa", 3, null, "", Geral.solicitante.colleagueId, true, null, cardData, null, false);

            var wf = hAPI.startProcess("financeiro_rdv_despesa", 3, userList, "Criação de despesa para o Analytics", true, cardData, false);
            
            despesa.wf = String(wf.get("iProcess"));
            hAPI.setCardValue("despesa___" + String(despesa.fluigId), JSON.stringify(despesa));
        }

    })

}

function montaCardData(campo, valor) {

    //return '<item><key>' + campo + '</key><value>' + valor + '</value></item>';

    var field = new StringArray();
    field.getItem().add(campo);
    field.getItem().add(valor);
    return field;
}