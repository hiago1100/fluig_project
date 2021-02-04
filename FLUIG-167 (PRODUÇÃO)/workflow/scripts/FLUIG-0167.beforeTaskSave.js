function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    var atividadeAtual = getValue("WKNumState");

    if (atividadeAtual == '13') {

        var aprovAtv = hAPI.getCardValue('cpAprovacaoCriacao');
        var histAtv = hAPI.getCardValue('cpObsCriacao');
        var textApro = '';

        if (aprovAtv == '1') {
            textApro = ('Acessos Liberados');
        } else if (aprovAtv == '2') {
            textApro = ('Reprovado');
        } else if (aprovAtv == '3') {
            textApro = ('Enviado para aprovação específica');
        };

        var parecer = (textApro + " - " + histAtv);
        hAPI.setCardValue('cpHistAtv13', parecer);

    } else if (atividadeAtual == '19') {

        var aprovAtv = hAPI.getCardValue('cpAprovacaoResponsavel');
        var histAtv = hAPI.getCardValue('cpParecerResponsavel');
        var textApro = '';

        if (aprovAtv == '1') {
            textApro = ('Aprovado');
        } else if (aprovAtv == '2') {
            textApro = ('Reprovado');
        } else if (aprovAtv == '3') {
            textApro = ('Gestor Incorreto');
        };

        var parecer = (textApro + " - " + histAtv);
        hAPI.setCardValue('cpHistAtv19', parecer);

    } else if (atividadeAtual == '8') {

        var aprovAtv = hAPI.getCardValue('cpAprovacaoGestorDP');
        var histAtv = hAPI.getCardValue('cpParecerAprGestorDP');
        var textApro = '';

        if (aprovAtv == '1') {
            textApro = ('Aprovado');
        } else if (aprovAtv == '2') {
            textApro = ('Reprovado');
        };

        var parecer = (textApro + " - " + histAtv);
        hAPI.setCardValue('cpHistAtv8', parecer);

    } else if (atividadeAtual == '21') {

        var aprovAtv = hAPI.getCardValue('cpConfirmacao');
        var histAtv = hAPI.getCardValue('cpParecerConfirmacao');
        var textApro = '';

        if (aprovAtv == '1') {
            textApro = ('Aprovado - Finalizar Chamado');
        } else if (aprovAtv == '2') {
            textApro = ('Reprovado - enviar para Ajustes');
        };

        var parecer = (textApro + " - " + histAtv);
        hAPI.setCardValue('cpHistAtv21', parecer);

    };

}