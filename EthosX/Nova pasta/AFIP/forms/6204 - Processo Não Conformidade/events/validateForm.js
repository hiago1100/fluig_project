function validateForm(form){
	
	var atividade = getValue("WKNumState");
	log.info("atividade " + atividade);
	
	
	
	if(atividade == 0 || atividade == 4){ //Atividade Inicial
		if(dataInvertida(form.getValue("dataOcorrencia")) > dataInvertida(form.getValue("dataRegistro"))){
			throw "Data da ocorrência deve ser igual ou anterior à data de registro"
		}
		
	}
	
	
	
	
	else if(atividade == 15){ //Área Responsável Valida
		if(form.getValue("conferenciaNaoConformidade") == null || form.getValue("conferenciaNaoConformidade") == ""){
			throw "\n Campo \"Não conformidade procede?\" é obrigatório!";
		}else if(form.getValue("conferenciaNaoConformidade") == "Sim"){
			if(form.getValue("descricaoCausaEvento") == ""){
				throw "\n Campo \"Descrição da causa do evento\" é obrigatório!";
			}else{
				var acoes = new Array();
				var qtd = 0;
				var dtControl = true;
				var ultimaData = "0000/00/00";
				for(var i = 1 ; i <= 8 ; i++){
					var control = "N";

					if(form.getValue("acaoCorretiva"+i) != "" && form.getValue("acaoCorretiva"+i) != null){
						control = "S";
					}

					if(form.getValue("responsavelPlacoAcao"+i) == "" || form.getValue("idResponsavelPlacoAcao"+i) == ""){
						control = (control == "S" ? "I" : control);
					}else{
						control = (control == "N" ? "I" : control);
					}

					if(form.getValue("prazo"+i) == "" ){
						control = (control == "S" ? "I" : control);
					}else{
						control = (control == "N" ? "I" : control);
					}
					
					if(dtControl && (control == "S" || control == "I") && form.getValue("prazo"+i) != "" ){
						var dtAtual = dataInvertida(form.getValue("prazo"+i));
						if(ultimaData > dtAtual){
							dtControl = false;
						}else{
							ultimaData = dtAtual;
						}
					}

					if(control == "I") acoes.push(i);
					if(control == "S") qtd++;
				}
				if(qtd == 0){
					throw "\n É necessário possuir ao menos uma ação planejada.";
				}else if (acoes.length > 0){
					throw "\n As linhas ("+acoes+ ") do plano de ação estão incompletas";
				}else if(!dtControl){
					throw "As ações devem seguir ordem cronológica!";
				}
			}
		}else if(form.getValue("conferenciaNaoConformidade") == "Nao"){
			if(form.getValue("justificativaNaoProcede") == ""){
				throw "\n Campo \"Justificativa do Não Procede\" é obrigatório!";
			}
		}
	}
	
	else if(atividade == 66){
		if(form.getValue("acaoImplementada1") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 34){
		if(form.getValue("confirmacaoEficacia") == "" || form.getValue("confirmacaoEficacia") == null){
			throw "\n É necessário preencher o campo \"Ação eficaz?\"";
		}
	}
	else if(atividade == 68){
		if(form.getValue("acaoImplementada2") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 70){
		if(form.getValue("acaoImplementada3") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 72){
		if(form.getValue("acaoImplementada4") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 74){
		if(form.getValue("acaoImplementada5") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 76){
		if(form.getValue("acaoImplementada6") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 78){
		if(form.getValue("acaoImplementada7") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	else if(atividade == 80){
		if(form.getValue("acaoImplementada8") == ""){
			throw "\n É necessário preencher o campo \"Ação implementada\"";
		}
	}
	
	else if(atividade == 28){
		
		var qtdNaoValidado = 0;
		var problemas = new Array();
		
		if(form.getValue("confirmacaoAcaoCorretiva") == ""){
			throw "\n\n O campo \"Ação implementada?\" localizado na caixa Validar baixa de ação é obrigatório.";
		}else if(form.getValue("confirmacaoAcaoCorretiva") == "Sim"){
			for(var i = 1 ; i <= 8 ; i++){
				if(form.getValue("acaoCorretiva"+i) != ""){
					if(form.getValue("validacaoAcao"+i) == "" || form.getValue("validacaoAcao"+i) == "Refazer" || form.getValue("validacaoAcao"+i) == "Alterar"){
						problemas.push([i,form.getValue("acaoCorretiva"+i),"Não Validado"]);
					}
				}else{
					if(form.getValue("validacaoAcao"+i) != ""){
						problemas.push([i,"","Validado sem uma ação corretiva definida"]);
					}
				}
			}
			
			if(problemas.length > 0){
				var txtErro = "\n\n Foram encontrado problemas com as ações abaixo: \n";
				for(var i=0 ; i<problemas.length ; i++){
					if(problemas[i][1] != ""){
						txtErro += "Linha " + problemas[i][0] + " > Ação: " + problemas[i][1] + " > Problema: " + problemas[i][2] + "\n";
					}else{
						txtErro += "Linha " + problemas[i][0] + " > Problema: " + problemas[i][2] + "\n";
					}
				}
				throw txtErro;
			}
		}else if(form.getValue("confirmacaoAcaoCorretiva") == "Nao"){
			if(form.getValue("criticaAcaoCorretiva") == ""){
				throw '<br/> É necessário preencher o campo "Crítica" para prosseguir';
			}else{
				for(var i = 1 ; i <= 8 ; i++){
					if(form.getValue("acaoCorretiva"+i) != ""){
						if(form.getValue("validacaoAcao"+i) == ""){
							problemas.push([i,form.getValue("acaoCorretiva"+i),"Não Validado"]);
						}else if(form.getValue("validacaoAcao"+i) == "Refazer" || form.getValue("validacaoAcao"+i) == "Alterar"){
							if(form.getValue("obsValidacao"+i) == ""){
								problemas.push([i,form.getValue("acaoCorretiva"+i),"Necessário incluir Observação"]);
							}else{
								qtdNaoValidado++;
							}
						}
					}else{
						if(form.getValue("validacaoAcao"+i) != ""){
							problemas.push([i,"","Validado sem uma ação corretiva definida"]);
						}
					}
				}
				
				if(problemas.length > 0){
					var txtErro = "\n\n Foram encontrado problemas com as ações abaixo: \n";
					for(var i=0 ; i<problemas.length ; i++){
						if(problemas[i][1] != ""){
							txtErro += "Linha " + problemas[i][0] + " > Ação: " + problemas[i][1] + " > Problema: " + problemas[i][2] + "\n";
						}else{
							txtErro += "Linha " + problemas[i][0] + " > Problema: " + problemas[i][2] + "\n";
						}
					}
					throw txtErro;
				}else if(qtdNaoValidado == 0){
					throw "É necessário que ao menos uma ação seja validada com a opção Alterar ou Refazer";
				}
			}
			
		}
		
		
	}

}

function getDataAtual(){
	var data = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");

	return formatoData.format(data);
}

function dataInvertida(data){
	if(data.indexOf(data.match(/\d\d\d\d/g)) == 6){
		return data.substring(6) + data.substring(2,3) + data.substring(3,5) + data.substring(2,3) + data.substring(0,2);
	}else{
		return data;
	}
}