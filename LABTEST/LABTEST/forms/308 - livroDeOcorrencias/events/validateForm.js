function validateForm(form){
	
	// var customThrow = montaThrow();

	var atv_inicio    = [0,4];
    var acaoUsuario = getValue("WKCompletTask");
    var txtParecer = form.getValue("cpParecerReabertura");

    var campos_ResUnifamiliar = [
        { campo: 'tipoDesconto', label: 'Motivo', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpPedido', label: 'Tipo de Baixa', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpPedidoCli', label: 'Nome da Empresa', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpCodCliente', label: 'CNPJ', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'cpNomeAbrev', label: 'Tipo de Baixa', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpValorPedido', label: 'Nome da Empresa', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpPercentual', label: 'CNPJ', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'cpValorDesconto', label: 'Tipo de Baixa', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'txtSolicitante', label: 'Nome da Empresa', atividades: atv_inicio, regras: ['obrigatorio']},
    ]

        setValidador(campos_ResUnifamiliar)
    

	function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));
        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }

}

