function adicionarComentarios(numProcesso, numEmpresa, numAtividade, usuario, actualThread)
{ 
	var msg = '';

	var objValoresEspecificos = [
		{
			campo: 'cpParecerAprovacaoRH',
			valor: '3',
			texto: 'Aprovado com alteração salarial'
		},
		{
			campo: 'cpAprovacaoRemuneracao',
			valor: '3',
			texto: 'Aprovado com ressalva'
		}
	];
	
	var comentarios = [
		{atividade: '10', campo: 'cpParecerAprovacaoRH', texto: 'Parecer', aprovacao: false},
		{atividade: '12', campo: 'cpParecerRemuneracao', texto: 'Parecer', aprovacao: false},
		{atividade: '13', campo: 'cpParecerGestorRH', texto: 'Parecer', aprovacao: false},
		{atividade: '14', campo: 'cpParecerAprovacaoN1', texto: 'Parecer', aprovacao: false},
		{atividade: '15', campo: 'cpParecerAprovacaoN2', texto: 'Parecer', aprovacao: false},
		{atividade: '16', campo: 'cpParecerAprovacaoN3', texto: 'Parecer', aprovacao: false},
		{atividade: '17', campo: 'cpParecerAprovacaoN4', texto: 'Parecer', aprovacao: false},
		{atividade: '10', campo: 'cpAprovacaoRH', texto: 'Aprovado', aprovacao: true},
		{atividade: '12', campo: 'cpAprovacaoRemuneracao', texto: 'Aprovado', aprovacao: true},
		{atividade: '13', campo: 'cpAprovacaoGestorRH', texto: 'Aprovado', aprovacao: true},
		{atividade: '14', campo: 'cpAprovacaoN1', texto: 'Aprovado', aprovacao: true},
		{atividade: '15', campo: 'cpAprovacaoN2', texto: 'Aprovado', aprovacao: true},
		{atividade: '16', campo: 'cpAprovacaoN3', texto: 'Aprovado', aprovacao: true},
		{atividade: '17', campo: 'cpAprovacaoN4', texto: 'Aprovado', aprovacao: true},
		];  					
	
	Object.keys(comentarios).forEach(function(key) 
	{	
		if(comentarios[key].atividade == numAtividade) 
		{
			if(hAPI.getCardValue(comentarios[key].campo) != '')
			{
				var textoCampo = hAPI.getCardValue(comentarios[key].campo);
				
				if(comentarios[key].aprovacao)
				{
					if(hAPI.getCardValue(comentarios[key].campo) == '1')
					{
						textoCampo = 'Sim';
					}
					else if(hAPI.getCardValue(comentarios[key].campo) == '2')
					{
						textoCampo = 'Não';
					}
					else
					{
						var campo = objValoresEspecificos.filter(function(map)
						{
							return map.campo == comentarios[key].campo && map.valor == hAPI.getCardValue(comentarios[key].campo);
						});

						textoCampo = campo.texto;
					}
				}

				msg = comentarios[key].texto + ': ' + textoCampo;
				
			}
		}
		
		if(msg != '')
		{
			hAPI.setTaskComments(usuario, numProcesso , actualThread, msg);	
			msg = '';
		}
	});
	
	
}