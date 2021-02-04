function validateForm(form)
{
    var atv_inicio = [0, 1, 2];
	var atv_reabertura = [2];
	
    var regras_do_formulario = [ 
    	
    	{ campo: 'cpReaberturaChamado', label: 'Aprovação', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	{ campo: 'cpParecerReabertura', label: 'Parecer', atividades: atv_reabertura, regras: ['obrigatorio'] },
     	
    ];
  
    var Validador = new ValidaFormulario(form, getValue("WKNumState"));
    
    if (!Validador.validar(regras_do_formulario)) 
    {
        throw Validador.mensagem_de_erro();
    }
}