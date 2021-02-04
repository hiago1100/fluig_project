function afterProcessCreate(processId) {

    hAPI.setCardValue("cpNumeroSolicitacao", getValue("WKNumProces"));
    //CENTRAL DE TAREFAS
    addCentralTarefasInfo(getValue("WKDef"), getValue("WKNumProces"));
}