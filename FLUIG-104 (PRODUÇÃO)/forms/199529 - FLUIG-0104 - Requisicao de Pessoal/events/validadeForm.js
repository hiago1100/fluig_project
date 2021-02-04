function validateForm(form, customHTML) {
	var atividade1 = parseInt(getValue("WKNumState"));
	// Regras para campos do pai e filho Abertura e Reabertura de Solicitacao
	    var regras_do_formulario = [
	    	 
			 { tablename: 'tbSalario', label: 'Adicionar Colaboradores', atividades: [0,3], regras: ['pai_e_filho'], regras_filhos: [
				 {campo: 'itmQuantidade', label: 'Quantidade', regras: ['filho_obrigatorio']},
				 {campo: 'itmSalario', label: 'Sal&#225;rio', regras: ['filho_obrigatorio']},
		         {campo: 'itmHorario', label: 'Hor&#225;rio', regras: ['filho_obrigatorio_condicional'], campoCondicao:'cpTipoMaoObra'},
				 
		     ]},
	    ];
	    
	    var Validador = new ValidaFormulario(form, atividade1);
	    
	    if (!Validador.validar(regras_do_formulario)) {
	        throw Validador.mensagem_de_erro();
	    }
	
	
	var atividade = parseInt(getValue("WKNumState"));
	var acaoUsuario = getValue("WKCompletTask");
	
	var msg = "";
	
	if(form.getValue("cpTipoMaoObra") == "0"){
		msg += "O campo 'Tipo de m&atilde;o de obra' est&aacute;  vazio.<br />";
	}
	
	if((atividade == 0 || atividade == 3 ) && (acaoUsuario=="true")){ 
		// PRODUCAO
		if(form.getValue("cpTipoMaoObra") == "1" || form.getValue("cpTipoMaoObra") == "2"){
			if(form.getValue("cpObraDepProd") == ""){
				msg += "O campo 'Obra/Departamento' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpCodSecaoProd") == ""){ 	
				msg += "O campo 'Código da se &ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpEstadoProd") == ""){
				msg += "O campo 'Estado' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpMotivoAdmissaoProd") == "0"){
				msg += "O campo'Motivo de admiss&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("MotivoRequisicao") == ""){
				msg += "O campo 'Descreva o motivo' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpObraSede") == "1" && form.getValue("cpRecolherDocProd") == ""){
				msg += "O campo'Recolher documenta &ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpBloqueiaContratacao") == "1"){
				msg += "Esta Obra/Departamento n&atilde;o permite contrata&ccedil;&atilde;o.<br />";
			}
			
		} else if(form.getValue("cpTipoMaoObra") == "3" || form.getValue("cpTipoMaoObra") == "4"){
			
			if(form.getValue("cpObraDepAE") == ""){
				msg += "O campo 'Obra/Departamento' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpCodSecaoAE") == ""){
				msg += "O campo 'Código da se &ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpEstadoAE") == ""){
				msg += "O campo 'Estado' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpCaracteristicaAE") == "0"){
				msg += "O campo 'Caracter&iacute;stica da Sele&ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpTipoSelecao") == "0")
			{
				msg += "O campo 'Tipo de Sele&ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpTipoVagaAE") == "0"){
				msg += "O campo 'Tipo de vaga' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpMotivoAdmissaoProd") == "0"){
				msg += "O campo'Motivo de admiss&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("MotivoRequisicao") == ""){
				msg += "O campo 'Descreva o motivo' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpObraSede") == "1" && form.getValue("cpRecolherDocProd") == ""){
				msg += "O campo'Recolher documenta &ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpEscolaridade") == "4" && form.getValue("cpSuperiorCursando") == "0"){
				msg += "O campo 'Periodo' est&aacute;  vazio.<br />";
			}
			
			if(form.getValue("cpBloqueiaContratacao") == "1"){
				msg += "Esta Obra/Departamento n&atilde;o permite contrata&ccedil;&atilde;o.<br />";
			}
		}
		
		//MOTIVO DE ADMISSAO 
		if(form.getValue("cpMotivoAdmissaoProd") == "2" || form.getValue("cpMotivoAdmissaoProd") == "7"){
			if(form.getValue("cpColaboradorMA") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoSDTP") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}

		if(form.getValue("cpMotivoAdmissaoProd") == "3"){
			if(form.getValue("cpColaboradorSF") == ""){
				msg += "O campo 'Colaborador est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoSF") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}
		
		if(form.getValue("cpMotivoAdmissaoProd") == "4"){
			if(form.getValue("cpColaboradorLM") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoLM") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}

		if(form.getValue("cpMotivoAdmissaoProd") == "5"){
			if(form.getValue("cpColaboradorATD") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoATD") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}

		if(form.getValue("cpTipoMaoObra") == "1" || form.getValue("cpTipoMaoObra") == "2"){
			
			if(form.getValue("DescreverMotivoProd") == ""){
				msg += "Favor descrever motivo da admiss&atilde;o.<br />";
			}
		}
		

		var indexes = form.getChildrenIndexes("tbSalario");
		
		if(indexes.length == 0){
			msg += "&eacute; necess&aacute;rio inserir ao menos um colaborador.<br />";
			
		} else {
			
			var TotalQuantidade = 0;
			var TotalError = "";
			
			for(var i = 1; i < indexes.length; i++){
				
				var cargo = form.getValue("itmNomeCargo___" + indexes[i]);
				var quantidade = parseInt(form.getValue("itmQuantidade___" + indexes[i]));
				var salario = form.getValue("itmSalario___" + indexes[i]);
				
				var horario = form.getValue("itmHorarioAE___" + indexes[i]);
				var haindicacao = form.getValue("itmHaIndicacao___" + indexes[i]);
				
				var quemindicou = form.getValue("itmQuemIndicou___" + indexes[i]);
				var nomecandidato = form.getValue("itmNomeCandidato___" + indexes[i]);
				
				TotalQuantidade += quantidade;
				
				if(TotalQuantidade > 30 && TotalError == ""){
					msg += "M&aacute;ximo de 30 colaboradores por solicita &ccedil;&atilde;o.<br />";
				}
				
				if(cargo == ""){
					msg += "O campo 'Nome do Cargo' est&aacute; vazio.<br />";
				}
				
				if(quantidade == "0"){
					msg += "O campo 'Quantidade' est&aacute; vazio.<br />";
				}
				
				if(salario == ""){
					msg += "O campo 'Sal&aacute;rio' est&aacute; vazio.<br />";
				}
				 
				if(form.getValue("cpTipoMaoObra") == "3" || form.getValue("cpTipoMaoObra") == "4"){
					
					if(horario == ""){
						msg += "O campo 'Hor&aacute;rio' est&aacute; vazio.<br />";
					}
					
					if(haindicacao == "0"){
						msg += "O campo 'H&aacute; Indica &ccedil;&atilde;o' est&aacute; vazio.<br />";
					}
					
					if(haindicacao == "1" && quemindicou == ""){
						msg += "O campo 'Quem Indicou' est&aacute; vazio.<br />";
					}
					
					if(haindicacao == "1" && nomecandidato == ""){
						msg += "O campo 'Nome do Candidato' est&aacute; vazio.<br />";
					}
				}
			}
			
			if(TotalError != ""){
				msg += TotalError;
			}
		} 
		
		//ADMINISTRATIVO E ESTRAT&eacute;GICO
		
		if(form.getValue("cpTipoMaoObra") == "3" || form.getValue("cpTipoMaoObra") == "4"){
			if(form.getValue("cpObraDepAE") == ""){
				msg += "O campo 'Obra/Departamento' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpCodSecaoAE") == ""){
				msg += "O campo 'Código da se &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpEstadoAE") == ""){
				msg += "O campo 'Estado' est&aacute; vazio.<br />";
			}
			if(form.getValue("CpCaracteristicaAE") == "0"){
				msg += "O campo 'Caracteristica da sele &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpTipoSelecao") == "0")
			{
				msg += "O campo 'Tipo de Sele&ccedil;&atilde;o' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpTipoVagaAE") == "0"){
				msg += "O campo 'Tipo de vaga' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpMotivoAdmissaoAE") == "0"){
				msg += "O campo 'Motivo de admiss&atilde;o' est&aacute; vazio.<br />";
			}
			if(form.getValue("DescreverMotivoAE") == ""){
				msg += "Favor descrever o motivo de admiss&atilde;o.<br />";
			}
			if(form.getValue("cpRecolherDocAE") == ""){
				msg += "O campo 'Recolher Documenta &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpNomeCargoAE") == ""){
				msg += "O campo 'Nome do cargo' est&aacute; vazio.<br />";
			}
			if(form.getValue("CpQuantidadeAE") == "0"){
				msg += "O campo 'Quantidade' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpSalarioAE") == ""){
				msg += "O campo 'Sal&aacute;rio' est&aacute; vazio.<br />";
			}
			
			if(form.getValue("DescreverMotivoAE") == ""){
				msg += "Favor descrever motivo da admiss&atilde;o.<br />";
			}
			
			if(form.getValue("cpMotivoAdmissaoAE") == "2"){
				if(form.getValue("cpColaboradorAdm") == ""){
					msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
				}
				if(form.getValue("cpFuncaoSDAdm") == ""){
					msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
				}
			}		
		}
		
		//MOTIVO ADMISSAO ADMINISTRATIVO ESTRATEGICO
		if(form.getValue("cpMotivoAdmissaoAE") == "3"){
			if(form.getValue("cpColaboradorSFAdm") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoSFAdm") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}
			
		if(form.getValue("cpMotivoAdmissaoAE") == "4"){
			if(form.getValue("cpColaboradorLMAdm") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoLMAdm") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}
			
		if(form.getValue("cpMotivoAdmissaoAE") == "5"){
			if(form.getValue("cpColaboradorATDAdm") == ""){
				msg += "O campo 'Colaborador' est&aacute; vazio.<br />";
			}
			if(form.getValue("cpFuncaoATDAdm") == ""){
				msg += "O campo 'Fun &ccedil;&atilde;o' est&aacute; vazio.<br />";
			}
		}
			
		// DESCRICAO DO PERFIL PARA O CARGO 
		if(form.getValue("cpTipoMaoObra") == "3" || form.getValue("cpTipoMaoObra") == "4"){
			
			if(form.getValue("cpFeminino") == "" || form.getValue("cpMasculino") == ""){
				msg += "O campo 'Sexo' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpAreaFormacao") == ""){
				msg += "O campo '&aacute;rea de Forma&ccedil;&atilde;o desejada' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpEscolaridade") == "0"){
				msg += "O campo 'Escolaridade' est&aacute;  vazio.<br />";
			}
			
			//travar campo qual peridodo
			//idiomas
			
			if(form.getValue("CpTempoExperiencia") == "0"){
				msg += "O campo 'Tempo de experi&ecirc;ncia' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpExperienciaComprovada") == ""){
				msg += "O campo 'Experi&ecirc;ncia comprovada' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpExperienciaDesejada") == ""){
				msg += "O campo 'Desejada' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpCompetencias") == ""){
				msg += "O campo 'Compet&ecirc;ncias' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpAtribuicoesCargo") == ""){
				msg += "O campo 'Atribui &ccedil;&otilde;es do cargo' est&aacute;  vazio.<br />";
			}
			if(form.getValue("cpConhecimentosTecnicos") == ""){
				msg += "O campo 'Descrever conhecimentos t&eacute;cnicos' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpDisponibilidadeViagens") == "0"){
				msg += "O campo 'Disponibilidade para viagens' est&aacute;  vazio.<br />";
			}
			if(form.getValue("CpDisponibilidadeViagens") == "1"){
				if(form.getValue("cpPeriodicidade") == "0"){
					msg += "O campo 'Periodicidade' est&aacute;  vazio.<br />";
				}
			}
			
			if(form.getValue("cpDiferenciais") == ""){
				msg += "O campo 'Diferenciais' est&aacute;  vazio.<br />";
			}
		}
	}
		
	//APROVACAO DA CONSULTORIA
	if((atividade == 8) && (acaoUsuario=="TRUE")){ 
		if(form.getValue("cpAprovarConsultoria") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarConsultoria") == "2" && form.getValue("cpParecerConsultoria") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}	
	}
			
	//APROVACAO GESTOR
	if((atividade == 16) && (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarGestor") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarGestor") == "2" && form.getValue("cpParecerGestor") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}	
	}
			
	//APROVACAO GERENTE GERAL
	if((atividade == 23) && (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarGerenteGeral") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarGerenteGeral") == "2" && form.getValue("cpParecerGerenteGeral") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}
	}
		
	//APROVACAO SUPERINTENDENTE
	if((atividade == 32)&& (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarSuperintendente") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarSuperintendente") == "2" && form.getValue("cpParecerSuperintendente") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}
	}

	//APROVACAO DIRETOR
	if((atividade == 38)&& (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarDiretor") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarDiretor") == "2" && form.getValue("cpParecerDiretor") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}
	}
		
	// RECRUTAMENTO E SELECAO / INTERNO
	if((atividade == 93)&& (acaoUsuario=="TRUE")){	

		var RecrutamentoInternoValidado = true;
		
		var UmEncontrado = false,
			ColaboradorValidacaoErro = "";
		
		var Inicio = 0;
		for(var i = 1; i <= parseInt(form.getValue("tbSalarioTotal")); i++){
			var quantidade = parseInt(form.getValue("itmQuantidade___"+i));
			for(var j = Inicio + 1; j <= Inicio + quantidade; j++ ){
				
				var tipo = form.getValue("itmTipo___"+j),
					centrocustoorigem = form.getValue("itmCetroCustoOrigem___"+j),
					itmColaboradorCCO = form.getValue("itmColaboradorCCO___"+j),
					itmCargoCCO = form.getValue("itmCargoCCO___"+j),
					itmSalarioCCO = form.getValue("itmSalarioCCO___"+j),
					itmNovoSalarioCCO = form.getValue("itmNovoSalarioCCO___"+j),
					itmRecrutado = form.getValue("itmRecrutado___"+j);

				if(itmRecrutado == "Aguardando"){
					if(tipo == "1"){
						if(centrocustoorigem != "" && itmColaboradorCCO != "" && itmCargoCCO != "" && itmSalarioCCO != "" && itmNovoSalarioCCO != ""){
							UmEncontrado = true;
							
						} else {
							ColaboradorValidacaoErro = "&eacute; obrigatório informar todos os campos do colaborador";
						}  
						} else if(tipo == "2"){
							
							if(itmColaboradorCCO != "" && itmNovoSalarioCCO != ""){
								UmEncontrado = true;
							} else{
								ColaboradorValidacaoErro = "&eacute; obrigatório informar todos os campos do colaborador";
							}
					}
				} 
				
			}
			
			if(ColaboradorValidacaoErro != ""){
				msg += ColaboradorValidacaoErro;
			}
			
			Inicio += quantidade; 
			
			
		}
			
		if(!UmEncontrado){
			msg += "Para prosseguir deve-se preencher ao menos um candidato que ainda n&atilde;o foi recrutado.<br />";
		} 
	} 
	
	//APROVACAO SALARIO
	if((atividade == 56)&& (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarSalario") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		if(form.getValue("cpAprovarSalario") == "2" && form.getValue("cpParecerSalario") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}
	}
		
	//APROVACAO CANDIDATO
	if((atividade == 54)&& (acaoUsuario=="TRUE")){ 
		
		if(form.getValue("cpAprovarCandidatos") == "0"){
			msg += "O campo 'Aprovado' est&aacute; vazio.<br />";
		}
		
		if(form.getValue("cpAprovarCandidatos") == "1"){
			var Inicio = 0;
			var ExperienciaErro = "";
			for(var i = 1; i <= parseInt(form.getValue("tbSalarioTotal")); i++){
				var quantidade = parseInt(form.getValue("itmQuantidade___"+i));
				for(var j = Inicio + 1; j <= Inicio + quantidade; j++ ){
					var candidato = form.getValue("itmCandidato___"+j);
					if(candidato != ""){ 
						var experiencia = form.getValue("itmExperiencia___"+j);
						if(experiencia == "0"){
							ExperienciaErro = "Para prosseguir &eacute; necess&aacute;rio validar a experi&ecirc;ncia de todos os candidatos.\n";
						}
					} 
				}
				Inicio += quantidade;
			}
			 
			if(ExperienciaErro != "")
				msg += ExperienciaErro;
			
		}
		
		if(form.getValue("cpAprovarCandidatos") == "2" && form.getValue("cpParecerCandidatos") == ""){
			msg += "O campo 'Parecer' est&aacute; vazio.<br />";
		}
	}		
	
	if (msg != ""){
		 
		throw "<br /> ERRO! <br />Campo(s) n&atilde;o informado(s): <br />" + msg;
		
	}
}