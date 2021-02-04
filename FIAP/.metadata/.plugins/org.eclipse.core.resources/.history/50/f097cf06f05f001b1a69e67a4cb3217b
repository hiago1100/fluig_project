function validateForm(form) {
		
	var activity = getValue("WKNumState");
	var acaoUsuario = getValue("WKCompletTask")
	var errorMsg = "";

	if (activity == 0 || activity == 4) { // inicio

		/*if (form.getValue('txt_Nome') == null
				|| form.getValue('txt_Nome') == '') {
			throw (" O campo 'Nome' não foi preenchido\n");

		}

		if (form.getValue('txt_telefone_01') == null
				|| form.getValue('txt_telefone_01') == '') {
			throw (" O campo 'Telefone\Celular não foi preenchido\n");

		}

		if (form.getValue('txt_telefone_02') == null
				|| form.getValue('txt_telefone_02') == '') {
			throw (" O campo 'Telefone\Celular não foi preenchido\n");

		}

		if (form.getValue('txt_departamento') == null
				|| form.getValue('txt_departamento') == '') {
			throw (" O campo 'Departamento' não foi preenchido\n");

		}

		if (form.getValue('txt_Cargo') == null
				|| form.getValue('txt_Cargo') == '') {
			throw (" O campo 'Cargo' não foi preenchido\n");

		}
		
		*/

		if (form.getValue('txt_tituloMudanca') == null
				|| form.getValue('txt_tituloMudanca') == '') {
			throw (" O campo 'Titulo da Mudança' não foi preenchido\n");

		}

		if (form.getValue('txt_dataInicial') == null
				|| form.getValue('txt_dataInicial') == '') {
			throw (" O campo 'Data de Inicio' não foi preenchido\n");

		}

		if (form.getValue('dt_dataFinal') == null
				|| form.getValue('dt_dataFinal') == '') {
			throw (" O campo 'Data Final' não foi preenchido\n");

		}

		/*if (form.getValue('txt_horaInicial') == null
				|| form.getValue('txt_horaInicial') == '') {
			throw (" O campo 'Hora de Inicio' não foi preenchido\n");

		}*/
		
		
		
				
		if (form.getValue('txt_descricaoDetalhada') == null	|| form.getValue('txt_descricaoDetalhada') == '') {
			throw (" O campo 'Descrição Detalhada' não foi preenchido\n");

		}
		
	  	var campo = form.getValue('txt_descricaoDetalhada');
		var qtdcaracteres = campo.length();		
		 if (qtdcaracteres < 100) {
			 throw (" Por favor preencha com mais informações o campo 'Descrição Detalhada' \n");			
			 
		 }			
			

		if (form.getValue('classificacao') == null
				|| form.getValue('classificacao') == '') {
			throw (" O campo 'Classificação' não foi preenchido\n");

		}

		if ((form.getValue('motivo_melhoria') == null || form
				.getValue('motivo_melhoria') == '')
				&& (form.getValue('motivo_preventiva') == null || form
						.getValue('motivo_preventiva') == '')
				&& (form.getValue('motivo_projeto') == null || form
						.getValue('motivo_projeto') == '')
				&& (form.getValue('motivo_legal') == null || form
						.getValue('motivo_legal') == '')) {
			throw (" O campo 'Motivo' não foi preenchido\n");

		}

		if ((form.getValue('tipo_dadosbancarios') == null || form
				.getValue('tipo_dadosbancarios') == '')
				&& (form.getValue('tipo_SI') == null || form
						.getValue('tipo_SI') == '')
				&& (form.getValue('tipo_aplicacao') == null || form
						.getValue('tipo_aplicacao') == '')
				&& (form.getValue('tipo_telecom') == null || form
						.getValue('tipo_telecom') == '')
				&& (form.getValue('tipo_segurancaInformacao') == null || form
						.getValue('tipo_segurancaInformacao') == '')
				&& (form.getValue('tipo_imac') == null || form
						.getValue('tipo_imac') == '')
				&& (form.getValue('tipo_telecomVoz') == null || form
						.getValue('tipo_telecomVoz') == '')
				&& (form.getValue('tipo_distribuicaoPacotes') == null || form
						.getValue('tipo_distribuicaoPacotes') == '')) {
			throw (" O campo 'Tipo' não foi preenchido\n");

		}

		if ((form.getValue('ambiente_dataCenterAllianzBR') == null || form
				.getValue('ambiente_dataCenterAllianzBR') == '')
				&& (form.getValue('ambiente_callCenter') == null || form
						.getValue('ambiente_callCenter') == '')
				&& (form.getValue('ambiente_level3') == null || form
						.getValue('ambiente_level3') == '')
				&& (form.getValue('ambiente_Infraestrutura') == null || form
						.getValue('ambiente_Infraestrutura') == '')) {
			throw (" O campo 'Ambiente Impactado' não foi preenchido\n");

		}
		
		if (form.getValue('necessario_pci') == null
				|| form.getValue('necessario_pci') == '') {
			throw (" O campo 'PCI?' não foi preenchido\n");

		}

		if (form.getValue('txt_sistemaAfetado') == null
				|| form.getValue('txt_sistemaAfetado') == '') {
			throw (" O campo 'Sistema afetado' não foi preenchido\n");

		}

		if (form.getValue('txt_servidoresAfetados') == null
				|| form.getValue('txt_servidoresAfetados') == '') {

			if (form.getValue('txt_outros') == null
					|| form.getValue('txt_outros') == '') {
				throw (" O campo 'Outros' não foi preenchido\n");

			}

		}

		if (form.getValue('radio_severidade') == null || form.getValue('radio_severidade') == ''){
				
			throw (" O campo 'Severidade' não foi preenchido\n");

		}

		if (form.getValue('txt_detalhesImpacto') == null
				|| form.getValue('txt_detalhesImpacto') == '') {
			throw (" O campo 'Descrição dos riscos e impactos da tarefa' não foi preenchido\n");

		}
		
		var campo = form.getValue('txt_detalhesImpacto');
		var qtdcaracteres = campo.length();		
		 if (qtdcaracteres < 100) {
			 throw (" Por favor preencha com mais informações o campo 'Quais os riscos e impactos da tarefa? Descrevê-los detalhadamente' \n");			
			 
		 }	
		 
		 if (form.getValue('txt_observacoesTeste') == null
					|| form.getValue('txt_observacoesTeste') == '') {
				throw (" O campo 'Observações (Aba Plano de Teste)' não foi preenchido\n");

			}
			
			var campo = form.getValue('txt_observacoesTeste');
			var qtdcaracteres = campo.length();		
			 if (qtdcaracteres < 100) {
				 throw (" Por favor preencha com mais informações o campo 'Observações (Aba Plano de Teste)' \n");			
				 
			 }	
		 
		 
		 
		 
			

		/*if (form.getValue("check_aprovador_1") == "sysadmin") {

			if (form.getValue('responsavel_Sysadmins') == null
					|| form.getValue('responsavel_Sysadmins') == '') {
				throw (" O campo 'Sysadmin' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_2") == "DBA") {

			if (form.getValue('responsavel_DBA') == null
					|| form.getValue('responsavel_DBA') == '') {
				throw (" O campo 'DBA' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_3") == "Telecom") {

			if (form.getValue('responsavel_Telecom') == null
					|| form.getValue('responsavel_Telecom') == '') {
				throw (" O campo 'Telecom' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_4") == "Network") {

			if (form.getValue('responsavel_Network') == null
					|| form.getValue('responsavel_Network') == '') {
				throw (" O campo 'Network' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_5") == "Seguranca") {

			if (form.getValue('responsavel_Seguranca') == null
					|| form.getValue('responsavel_Seguranca') == '') {
				throw (" O campo 'Segurança' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_6") == "workplace") {

			if (form.getValue('responsavel_Workplace') == null
					|| form.getValue('responsavel_Workplace') == '') {
				throw (" O campo 'Workplace' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_7") == "desenvolvimento") {

			if (form.getValue('responsavel_Desenvolvimento') == null
					|| form.getValue('responsavel_Desenvolvimento') == '') {
				throw (" O campo 'Desenvolvimento' não foi preenchido\n");

			}

		}
*/
		if (form.getValue("check_aprovador_8") == "fornecedor") {

			if (form.getValue('responsavel_fornecedor') == null
					|| form.getValue('responsavel_fornecedor') == '') {
				throw (" O campo 'Fornecedor' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_9") == "diretoria_ti") {

			if (form.getValue('responsavel_diretoriaTI') == null
					|| form.getValue('responsavel_diretoriaTI') == '') {
				throw (" O campo 'Diretoria - TI' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_11") == "area_negocio") {

			if (form.getValue('responsavel_areaNegocios') == null
					|| form.getValue('responsavel_areaNegocios') == '') {
				throw (" O campo 'Area de Negócios' não foi preenchido\n");

			}

		}

		if (form.getValue("check_aprovador_12") == "diretoria_areNegocio") {

			if (form.getValue('responsavel_areaNegocios') == null
					|| form.getValue('responsavel_areaNegocios') == '') {
				throw (" O campo 'Diretoria - Area de Negócios' não foi preenchido\n");

			}

		}
		
		
		var indexes = form.getChildrenIndexes("tableAtividadesMudanca");
	    if (indexes.length > 0) {
	        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
	        	
	            if(form.getValue('executor_atividade___' + indexes[i]) == null || form.getValue('executor_atividade___' + indexes[i]) == '') {
	            	throw (" O campo 'Executor da Atividade' não foi preenchido\n");
	            }
	            
	            if(form.getValue('area_responsavel___' + indexes[i]) == null || form.getValue('area_responsavel___' + indexes[i]) == '') {
	            	throw (" O campo 'Área Responsável' não foi preenchido\n");
	            }
	            
	            if(form.getValue('atividade___' + indexes[i]) == null || form.getValue('atividade___' + indexes[i]) == '') {
	            	throw (" O campo 'Atividade' não foi preenchido\n");
	            }
	            
	            if(form.getValue('data_inicial___' + indexes[i]) == null || form.getValue('data_inicial___' + indexes[i]) == '') {
	            	throw (" O campo 'Data Inicial' não foi preenchido\n");
	            }
	            
	            if(form.getValue('data_final___' + indexes[i]) == null || form.getValue('data_final___' + indexes[i]) == '') {
	            	throw (" O campo 'Data Final' não foi preenchido\n");
	            }
	            
	           /* if(form.getValue('hora_inicial___' + indexes[i]) == null || form.getValue('hora_inicial___' + indexes[i]) == '') {
	            	throw (" O campo 'Hora Inicial' não foi preenchido\n");
	            }
	            
	            if(form.getValue('hora_final___' + indexes[i]) == null || form.getValue('hora_final___' + indexes[i]) == '') {
	            	throw (" O campo 'Hora Final' não foi preenchido\n");
	            }*/
	        }
	    }
	    
	    
	    var indexes = form.getChildrenIndexes("tablePlanoTeste");
	    if (indexes.length > 0) {
	        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
	        	
	            if(form.getValue('txt_ItemTestado___' + indexes[i]) == null || form.getValue('txt_ItemTestado___' + indexes[i]) == '') {
	            	throw (" O campo 'Item a Ser Testado' não foi preenchido\n");
	            }
	            
	            if(form.getValue('planoTeste_responsavel___' + indexes[i]) == null || form.getValue('planoTeste_responsavel___' + indexes[i]) == '') {
	            	throw (" O campo 'Responsável ( Plano de Teste)' não foi preenchido\n");
	            }	            
	           
	            
	            if(form.getValue('planoTeste_resultado___' + indexes[i]) == null || form.getValue('planoTeste_resultado___' + indexes[i]) == '') {
	            	throw (" O campo 'Resultado Esperado' não foi preenchido\n");
	            }
	         
	        }
	    }
	    
	    var indexes = form.getChildrenIndexes("tablePlanoDeVolta");
	    if (indexes.length > 0) {
	        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
	        	
	            if(form.getValue('executor_planoDeVolta___' + indexes[i]) == null || form.getValue('executor_planoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Executor da Atividade (Plano de Volta)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('areaResponsavel_PlanoDeVolta___' + indexes[i]) == null || form.getValue('areaResponsavel_PlanoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Área Responsável (Plano de Volta)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('atividade_planoDeVolta___' + indexes[i]) == null || form.getValue('atividade_planoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Atividade (Plano de Volta)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('dtInicialPlanoDeVolta___' + indexes[i]) == null || form.getValue('dtInicialPlanoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Data Inicial (Plano de Volta)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('dtFinalPlanoDeVolta___' + indexes[i]) == null || form.getValue('dtFinalPlanoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Data Final (Plano de Volta)' não foi preenchido\n");
	            }
	            
	          /*  if(form.getValue('horaInicialPlanoDeVolta___' + indexes[i]) == null || form.getValue('horaInicialPlanoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Hora Inicial (Plano de Volta)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('horaFinalPlanoDeVolta___' + indexes[i]) == null || form.getValue('horaFinalPlanoDeVolta___' + indexes[i]) == '') {
	            	throw (" O campo 'Hora Final (Plano de Volta)' não foi preenchido\n");
	            }*/
	        }
	    }
	    
	    var indexes = form.getChildrenIndexes("tableEscalonamento");
	    if (indexes.length > 0) {
	        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
	        	
	            if(form.getValue('txtNomeEscalonamento___' + indexes[i]) == null || form.getValue('txtNomeEscalonamento___' + indexes[i]) == '') {
	            	throw (" O campo 'Nome ( Escalonamento)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('txtAreaEscalonamento___' + indexes[i]) == null || form.getValue('txtAreaEscalonamento___' + indexes[i]) == '') {
	            	throw (" O campo 'Área (Escalonamento)' não foi preenchido\n");
	            }
	            
	            if(form.getValue('txtTelefoneEscalonamento___' + indexes[i]) == null || form.getValue('txtTelefoneEscalonamento___' + indexes[i]) == '') {
	            	throw (" O campo 'Telefone (Escalonamento)' não foi preenchido\n");
	            }
	            
	          
	         
	        }
	    }
	    
	    
		

	}
	
	if (activity == 12) { //Avaliar solicitação (Sysadmins)
		
		if (form.getValue('aprovacao_sysadmins') == null || form.getValue('aprovacao_sysadmins') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_sysadmins') == 'Nao') {
			
			if (form.getValue('txtObservacoesSysadmins') == null || form.getValue('txtObservacoesSysadmins') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 183) { //Avaliar solicitação (DBA)
		
		if (form.getValue('aprovacao_DBA') == null || form.getValue('aprovacao_DBA') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_DBA') == 'Nao') {
			
			if (form.getValue('txtObservacoesDBA') == null || form.getValue('txtObservacoesDBA') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 66) { //Avaliar solicitação (Telecom)
		
		if (form.getValue('aprovacao_Telecom_2') == null || form.getValue('aprovacao_Telecom_2') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Telecom_2') == 'Nao') {
			
			if (form.getValue('txtObservacoesTelecom') == null || form.getValue('txtObservacoesTelecom') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");
			}		
			
			

		}	
		
		
	}
	
	if (activity == 21) { //Avaliar solicitação (Network)
		
		if (form.getValue('aprovacao_Network') == null || form.getValue('aprovacao_Network') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Network') == 'Nao') {
			
			if (form.getValue('txtObservacoesNetwork') == null || form.getValue('txtObservacoesNetwork') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 199) { //Avaliar solicitação (Segurança)
		
		if (form.getValue('aprovacao_Seguranca') == null || form.getValue('aprovacao_Seguranca') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Seguranca') == 'Nao') {
			
			if (form.getValue('txtObservacoesSeguranca') == null || form.getValue('txtObservacoesSeguranca') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 75) { //Avaliar solicitação (Workplace)
		
		
		if (form.getValue('aprovacao_Workplace') == null || form.getValue('aprovacao_Workplace') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Workplace') == 'Nao') {
			
			if (form.getValue('txtObservacoesWorkplace') == null || form.getValue('txtObservacoesWorkplace') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 28) { //Avaliar solicitação (Desenvolvimento)
		
		if (form.getValue('aprovacao_Desenvolvimento') == null || form.getValue('aprovacao_Desenvolvimento') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Desenvolvimento') == 'Nao') {
			
			if (form.getValue('txtObservacoesDesenvolvimento') == null || form.getValue('txtObservacoesDesenvolvimento') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 42) { //Avaliar solicitação (Fornecedor)
		
		if (form.getValue('aprovacao_Fornecedor_2') == null || form.getValue('aprovacao_Fornecedor_2') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Fornecedor_2') == 'Nao') {
			
			if (form.getValue('txtObservacoesFornecedor') == null || form.getValue('txtObservacoesFornecedor') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 49) { //Avaliar solicitação (Gerente 1)
		
		if (form.getValue('aprovacao_Gerente_1') == null || form.getValue('aprovacao_Gerente_1') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Gerente_1') == 'Nao') {
			
			if (form.getValue('txtObservacoesGerente_1') == null || form.getValue('txtObservacoesGerente_1') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 104) { //Avaliar solicitação (Gerente 2)
		
		if (form.getValue('aprovacao_Gerente_2') == null || form.getValue('aprovacao_Gerente_2') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Gerente_2') == 'Nao') {
			
			if (form.getValue('txtObservacoesGerente_2') == null || form.getValue('txtObservacoesGerente_2') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 107) { //Avaliar solicitação (Gerente 3)
		
		if (form.getValue('aprovacao_Gerente_3') == null || form.getValue('aprovacao_Gerente_3') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_Gerente_3') == 'Nao') {
			
			if (form.getValue('txtObservacoesGerente_3') == null || form.getValue('txtObservacoesGerente_3') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}	
		
		
	}
	
	if (activity == 35) { //Avaliar solicitação ()
		
		
		if (form.getValue('aprovacao_DiretoriaTI') == null || form.getValue('aprovacao_DiretoriaTI') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_DiretoriaTI') == 'Nao') {
			
			if (form.getValue('txtObservacoesDiretoriaTI') == null || form.getValue('txtObservacoesDiretoriaTI') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}
		
		
	}
	
	if (activity == 130) { //Avaliar solicitação (Area de Negocio )
		
		if (form.getValue('aprovacao_AreaNegocios') == null || form.getValue('aprovacao_AreaNegocios') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_AreaNegocios') == 'Nao') {
			
			if (form.getValue('txtObservacoesAreaNegocios') == null || form.getValue('txtObservacoesAreaNegocios') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}				

		}
		
		
	}
	
	if (activity == 140) { //Avaliar solicitação (Dretoria - Area de Negocio)
		
		if (form.getValue('aprovacao_DiretoriaNegocios') == null || form.getValue('aprovacao_DiretoriaNegocios') == '') {
			throw ("Aprova Solicitação?");

		}
		
		
		if (form.getValue('aprovacao_DiretoriaNegocios') == 'Nao') {
			
			if (form.getValue('txtObservacoesDNegocios') == null || form.getValue('txtObservacoesDNegocios') == '') {
				throw ("\nJustifique a reprovação desta solicitaçao no campo 'Observações'\n");

			}		
			
			

		}
		
		
	}
	
	if (activity == 243) { //Execução GMUD
		
		if (form.getValue('radio_execucaoGMUD') == null || form.getValue('radio_execucaoGMUD') == '') {
			throw ("GMUD foi Executada?");

		}
		
			

		
		
		
	}
	
	
	

}