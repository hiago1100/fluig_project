function validateForm(form){
	
	// var customThrow = montaThrow();

	var atv_inicio    = [0,4];
    var acaoUsuario = getValue("WKCompletTask");
    var txtParecer = form.getValue("cpParecerReabertura");

    var campos_ResUnifamiliar = [
        { campo: 'cpSetor', label: 'Setor', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpRegional', label: 'Regional', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'slcTipo', label: 'Tipo', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'slcDuvida', label: 'Duvida', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'slcIndicador', label: 'Indicador', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'slcMes', label: 'Mês', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'txtSolicitante', label: 'Observação', atividades: atv_inicio, regras: ['obrigatorio']},
    ]

        setValidador(campos_ResUnifamiliar)
    

	function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));
        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }

}

