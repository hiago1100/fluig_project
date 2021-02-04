function validateForm(form){
	
	// var customThrow = montaThrow();

	var atv_inicio    = [0,4];
    var acaoUsuario = getValue("WKCompletTask");
    var txtParecer = form.getValue("cpParecerReabertura");

    var campos_ResUnifamiliar = [
        { campo: 'cpCpf', label: 'CPF', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpNomeColab', label: 'NOME', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpFuncao', label: 'FUNÇÃO', atividades: atv_inicio, regras: ['obrigatorio']},
    ]



        setValidador(campos_ResUnifamiliar)
    

	function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));
        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }

}

