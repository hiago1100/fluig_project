function adicionarComentarios(numProcesso, numEmpresa, numAtividade, usuario, actualThread)
{ 
	var msg = '';
	
	var comentarios = [
		{atividade: '8', 	campo: 'cpParecerAprovacaoN1', texto: 'Parecer', aprovacao: false},
		{atividade: '10', 	campo: 'cpParecerRecolhimento', texto: 'Parecer', aprovacao: false},
		{atividade: '5', 	campo: 'cpParecerRecolhimento', texto: 'Parecer', aprovacao: false},
		{atividade: '11', 	campo: 'cpParecerCadastroKit', texto: 'Parecer', aprovacao: false},
		{atividade: '12', 	campo: 'cpParecerAssinaturaKit', texto: 'Parecer', aprovacao: false},
		{atividade: '14', 	campo: 'cpParecerCadastroPonto', texto: 'Parecer', aprovacao: false},
		{atividade: '13', 	campo: 'cpParecerAjusteCadastro', texto: 'Parecer', aprovacao: false},
		{atividade: '15', 	campo: 'cpParecerCadastroCancelament', texto: 'Parecer', aprovacao: false},
		{atividade: '143', 	campo: 'cpParecerCadastroSSMTManual', texto: 'Parecer', aprovacao: false},
		{atividade: '37', 	campo: 'cpParecerMovimentacao', texto: 'Parecer', aprovacao: false},
		{atividade: '181', 	campo: 'cpParecerAberturaDesligament', texto: 'Parecer', aprovacao: false},
		{atividade: '239', 	campo: 'cpParecerExcecaoConsultorRH', texto: 'Parecer', aprovacao: false},
		{atividade: '240', 	campo: 'cpParecerExcecaoGestorRH', texto: 'Parecer', aprovacao: false},
		{atividade: '241', 	campo: 'cpParecerExcecaoRemuneracao', texto: 'Parecer', aprovacao: false},
		{atividade: '43', 	campo: 'cpParecerExcecaoAprovadorN1', texto: 'Parecer', aprovacao: false},
		{atividade: '222', 	campo: 'cpParecerExcecaoAprovadorN2', texto: 'Parecer', aprovacao: false},
		{atividade: '228', 	campo: 'cpParecerExcecaoAprovadorN3', texto: 'Parecer', aprovacao: false},
		{atividade: '232', 	campo: 'cpParecerExcecaoAprovadorN4', texto: 'Parecer', aprovacao: false},
		{atividade: '146', 	campo: 'cpParecerErroTI146', texto: 'Parecer', aprovacao: false},
		{atividade: '170', 	campo: 'cpParecerErroTI170', texto: 'Parecer', aprovacao: false},
		{atividade: '77', 	campo: 'cpParecerErroTI77', texto: 'Parecer', aprovacao: false},
		{atividade: '8', 	campo: 'cpAprovacaoN1Experiencia', texto: 'Aprovado', aprovacao: true},
		{atividade: '10', 	campo: 'cpAprovacaoRecolhimento', texto: 'Aprovado', aprovacao: true},
		{atividade: '5', 	campo: 'cpAprovacaoRecolhimento', texto: 'Aprovado', aprovacao: true},
		{atividade: '11', 	campo: 'cpParecerCadastroKit', texto: 'Aprovado', aprovacao: true},
		{atividade: '12', 	campo: 'cpCadastroKitManual', texto: 'Aprovado', aprovacao: true},
		{atividade: '14', 	campo: 'cpAprovacaoCadastroPonto', texto: 'Aprovado', aprovacao: true},
		{atividade: '13', 	campo: 'cpAprovacaoAjusteCadastro', texto: 'Aprovado', aprovacao: true},
		{atividade: '15', 	campo: 'cpAprovacaoCadastroCancelament', texto: 'Aprovado', aprovacao: true},
		{atividade: '143', 	campo: 'cpAprovacaoCadastroSSMTManual', texto: 'Aprovado', aprovacao: true},
		{atividade: '37', 	campo: 'cpAprovacaoMovimentacao', texto: 'Aprovado', aprovacao: true},
		{atividade: '181', 	campo: 'cpAprovacaoAberturaDesligament', texto: 'Aprovado', aprovacao: true},
		{atividade: '239', 	campo: 'cpAprovacaoExcecaoConsultorRH', texto: 'Aprovado', aprovacao: true},
		{atividade: '240', 	campo: 'cpAprovacaoExcecaoGestorRH', texto: 'Aprovado', aprovacao: true},
		{atividade: '241', 	campo: 'cpAprovacaoExcecaoRemuneracao', texto: 'Aprovado', aprovacao: true},
		{atividade: '43', 	campo: 'cpAprovacaoExcecaoAprovadorN1', texto: 'Aprovado', aprovacao: true},
		{atividade: '222', 	campo: 'cpAprovacaoExcecaoAprovadorN2', texto: 'Aprovado', aprovacao: true},
		{atividade: '228', 	campo: 'cpAprovacaoExcecaoAprovadorN3', texto: 'Aprovado', aprovacao: true},
		{atividade: '232', 	campo: 'cpAprovacaoExcecaoAprovadorN4', texto: 'Aprovado', aprovacao: true},
		{atividade: '146', 	campo: 'cpAprovacaoErroTI146', texto: 'Aprovado', aprovacao: true},
		{atividade: '170', 	campo: 'cpAprovacaoErroTI170', texto: 'Aprovado', aprovacao: true},
		{atividade: '77', 	campo: 'cpAprovacaoErroTI77', texto: 'Aprovado: ', aprovacao: true},
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
						textoCampo: 'Não';
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