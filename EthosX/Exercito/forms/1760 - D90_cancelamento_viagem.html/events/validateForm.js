function validateForm(form) {

    var atv_inicio = [0, 4];
    var atv_aprova = [5];

    var campo_solicitante = [
        { campo: 'numSolicitacao_viagem', label: 'Num. Solicitacao a ser cancelada', atividades: atv_inicio, regras: ['obrigatorio'] },
        { campo: 'txtSolicitante', label: 'Observação', atividades: atv_inicio, regras: ['obrigatorio'] },
    ]
    setValidador(campo_solicitante)

    var atv_aprova = [
        { campo: 'aprovacao', label: 'Necessita de uma decisão de aprovação', atividades: atv_aprova, regras: ['obrigatorio'] },
        { campo: 'txtAprovador', label: 'Observação', atividades: atv_aprova, regras: ['obrigatorio'] }
    ]
    setValidador(atv_aprova)

    function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));
        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }

}

