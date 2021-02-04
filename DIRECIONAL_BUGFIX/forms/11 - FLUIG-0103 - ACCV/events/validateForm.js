function validateForm(form){
	
	log.info("Carregando ValidateForm do formulário FLUIG-0103 -  Alteração de Centro de Custo de viajante");
	
	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";
		
	if(form.getValue("cpTipoViajante") == "0") {
		msg += "O campo 'Tipo de  viajante' está vazio.<br/>";
		
	} else if (form.getValue("cpTipoViajante") == "1" || form.getValue("cpTipoViajante") == "2") {
		dadosTipoViajante();
		
	} else if (form.getValue("cpTipoViajante") == "3") {
		
		if(form.getValue("cpNomeCompleto") == "" || form.getValue("cpCpf") == "") {
			msg += "O campo 'Nome Completo' ou CPF está vazio.<br/>";
		}
		if(form.getValue("cpNomeCompleto") != "") {
			dadosViagem();
		}
		
	} else if (form.getValue("cpTipoViajante") == "4") {
		
		if(form.getValue("cpCentroCusto") == "") {
			msg += "O campo 'Centro de Custo' está vazio.<br/>";
		}
		if(form.getValue("cpCentroCusto") != "" && form.getValue("cpNomeCompleto") == "") {
			msg += "O campo 'Colaborador Responsável' está vazio.<br/>";
		}
		if(form.getValue("cpCentroCusto") != "" && form.getValue("cpNomeCompleto") != "") {
			paiFilho();
			dadosViagem();
		}		
	}

	//CENTRO DE CUSTO - NOME COMPLETO - CPF E CARGO
	function dadosTipoViajante() {
		
		if(form.getValue("cpCentroCusto") == "") {
			msg += "O campo 'Centro de Custo' está vazio.<br/>";
		}
		if(form.getValue("cpCentroCusto") != "" && form.getValue("cpNomeCompleto") == "") {
			msg += "O campo 'Nome Completo' está vazio.<br/>";
		}
		if(form.getValue("cpCentroCusto") != "" && form.getValue("cpNomeCompleto") != "") {
			dadosViagem();
		}
	}
	
	//VALIDANDO PAI E FILHO
	function paiFilho() {
		
		 var indexes = form.getChildrenIndexes("tbAddDependente");
		 
		 if (indexes.length == 0){
			 msg += "Você deve informar ao menos um Dependente.";
			 
		 } else {
			 
			 for (var i = 0; i < indexes.length; i++) {
				 
				if(form.getValue("cpNomeCompletoDependente___" + indexes[i]) == ""){
						msg += "O campo 'Nome Completo' está vazio.<br/>";	
				} 
				 
				if(form.getValue("cpCpfDependente___" + indexes[i]) == "") {
						msg += "O campo 'Cpf' está vazio.<br/>";	
				}
				
				if(form.getValue("cpDataNascimento___" + indexes[i]) == "") {
					msg += "O campo 'Data Nascimento' está vazio.<br/>";	
				}
				
				if(form.getValue("cpParentesco___" + indexes[i]) == "") {
					msg += "O campo 'Parentesco' está vazio.<br/>";	
				}
		    } 
			
		 }
	}
	
	//DADOS DA VIAGEM
	function dadosViagem() {
		
		if(form.getValue("cpCentroCustoViagem") == "") {
			msg += "O campo 'Centro de Custo da viagem' está vazio.<br/>";
		}
		if(form.getValue("cpDataInicioViagem") == "") {
			msg += "O campo 'Data Início da viagem' está vazio.<br/>";
		}
		if(form.getValue("cpDataTermino") == "") {
			msg += "O campo 'Data término da viagem' está vazio.<br/>";
		}
	}
	
	//VALIDANDO APROVACOES
	
	if (atividade == 18){ //GESTOR ATUAL
		aprovacaoGestorAtual();
		
	} else if (atividade == 23){ //GESTOR VIAGEM
		aprovacaoGestorViagem();
		
	} else if (atividade == 28){ //ALTERACAO DO CENTRO DE CUSTO
		alteracaoCentroCusto();

	} else if (atividade == 33){ //CONFIRMACAO DA ALTERACAO
		confirmacaoAlteracao();
		
	} else if (atividade == 38){ //CORRECAO DO CENTRO DE CUSTO
		correcaoCentroCusto();
		
	}  else if (atividade == 44){ //ALTERACAO DO CENTRO DE CUSTO
		addCentroCusto();
		
	}

	//APROVACAO GESTOR ATUAL
	function aprovacaoGestorAtual() {
		
		if(form.getValue("cpAprovarGestorAtual") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if (form.getValue("cpAprovarGestorAtual") == 2 && form.getValue("cpParecerGestorAtual") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		
	}
	
	//APROVACAO GESTOR VIAGEM
	function aprovacaoGestorViagem() {
		
		if(form.getValue("cpAprovarGestorViagem") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if (form.getValue("cpAprovarGestorViagem") == 2 && form.getValue("cpParecerGestorViagem") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
		
	}
	
	//ALTERACAO DO CENTRO DE CUSTO
	function alteracaoCentroCusto() {
		
		if(form.getValue("cpAlterarCentroCusto") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if (form.getValue("cpAlterarCentroCusto") == 2 && form.getValue("cpParecerAlterarCentroCusto") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	
	//CONFIRMACAO DA ALTERACAO
	function confirmacaoAlteracao() {
		
		if(form.getValue("cpSolicitacaoAtendida") == "0") {
			msg += "O campo 'Atendido conforme solicitado' está vazio.<br/>";	
			
		} else if(form.getValue("cpSolicitacaoAtendida") == "1" && form.getValue("cpNumeroOs") == "") {
			msg += "O campo 'Número da O.S' está vazio.<br/>";	
			
		} else if (form.getValue("cpSolicitacaoAtendida") == 2 && form.getValue("cpParecerSolicitacaoAtendida") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}	
	}
	
	//CORRECAO DO CENTRO DE CUSTO
	function correcaoCentroCusto() {
		
		if(form.getValue("cpCorrigirCentroCusto") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if (form.getValue("cpCorrigirCentroCusto") == 2 && form.getValue("cpParecercpCorrigirCentroCusto") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	
	//ADICIONAR CENTRO DE CUSTO NA LISTA DE CONVERSAO
	function addCentroCusto() {
		
		if (form.getValue("cpAddCentroCustoListaConversao") == "0") {
			msg += "O campo 'Aprovação' está vazio.<br/>";
			
		} else if (form.getValue("cpAddCentroCustoListaConversao") == 2 && form.getValue("cpParecerCCListaConversao") == "" ){
			msg += "O campo 'Parecer' está vazio.<br/>";
		}
	}
	
	log.info("Fim do ValidateForm do formulário FLUIG-0103 -  Alteração de Centro de Custo de viajante");


	if (msg != "") {
		
		throw "\n ERRO! \nCampo(s) nao informado(s): \n" + msg;
	}
}

