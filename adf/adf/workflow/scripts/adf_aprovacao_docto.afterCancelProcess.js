function afterCancelProcess(colleagueId,processId){
    log.info('>>>>>>>> afterCancelProcess, sequenceId: ' + processId);

    hAPI.setCardValue("integrado", 'false');
    hAPI.setCardValue("status", 'C');
}