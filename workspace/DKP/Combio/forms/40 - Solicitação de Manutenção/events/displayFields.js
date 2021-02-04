function displayFields(form,customHTML){ 
	log.info("===============displayFields (inicio)===============");
	
	var atividade  = getValue("WKNumState");
	var statusForm = form.getFormMode();
	var quantidade_item = form.getValue("item_quantidade");
	var quantidade = form.getValue("qtdItem");
	var prova = quantidade_item - quantidade;
	var id = getValue("WKUser");
	form.setValue("solicitante", id);


	if(atividade == 0 || atividade == 4 ){
		customHTML.append("<script>" +
								"$('#div_aprovacao').css('display', 'none');"+

							"</script>");
	}

	if(atividade == 16 ){
		customHTML.append("<script>" +
								"$('#div_aprovacao').css('display', 'block');"+	
																																																					
							"</script>");
	}

	if(atividade == 5 ){		
		customHTML.append("<script>" +
							"$('#botaoAprovado').css('display', 'none');"+
							"if($('#motivo').val() != ''){$('#divMotivo_revisor').css('display', 'block');}"+							
							"$('#div_solicitante').css('display', 'block');"+
							"$('#div_aprovacao').css('display', 'block');"+																																																											
						"</script>");
		
	}
	
	if(atividade == 9 ){
		customHTML.append("<script>" +
								"$('#div_solicitante').css('display', 'none');"+																																																					
							"</script>");
	}

	if(atividade == 11 ){
		customHTML.append("<script>" +								
								"$('#div_planejarManutencao').css('display', 'block');"+																																																						
							"</script>");
	}

	if(atividade == 24 ){
		customHTML.append("<script>" +								
								"$('#div_incluiItens').css('display', 'block');"+	
								"$('#necessitaCompra').css('display', 'block');"+																																																					
							"</script>");
	}

	if(atividade == 28 ){
		customHTML.append("<script>" +
								"$('#div_incluiItens').css('display', 'block');"+	
								"$('#necessitaCompra').css('display', 'block');"+								
								"$('#div_antecipa').css('display', 'block');"+																																																														
							"</script>");
	}

	if(atividade == 22 ){
		customHTML.append("<script>" +								
								"$('#div_programarManutencao').css('display', 'block');"+
								"$('#div_planejarManutencao').css('display', 'block');"+
								"$('#adquirir').css('display', 'block');"+
								"$('#compra').css('display', 'block');"+
								"$('#remover').css('display', 'none');"+
								"$('#labelAntecipa').css('display', 'none');"+
								"$('#botaoAntecipa').css('display', 'none');"+
								"$('#divAdicionar').hide();"+
								"$('#div_incluiItens').css('display', 'block');"+
								"$('#adquirir').css('display', 'none');"+																																																						
							"</script>");
	}

	if (atividade == 24 && prova > 0) {
		    customHTML.append("<script>" +	
		    	"$('#necessita_compra').val('Saldo em Estoque');"+
		    	"</script>");
	}

	if (atividade == 24 && prova < 0) {
		 customHTML.append("<script>" +	
		    	"$('#necessita_compra').val('Sem Saldo');"+
		    	"</script>");
	}



	if(atividade == 36 ){
		customHTML.append("<script>" +								
								"$('#div_solicitante').css('display', 'none');"+																																																						
							"</script>");
	}

	if(statusForm == 'VIEW'){
		customHTML.append("<script>" +								
								"$('#div_solicitante').css('display', 'block');"+
								"$('#div_aprovacao').css('display', 'block');"+	
								"$('#div_planejarManutencao').css('display', 'block');"+
								"$('#div_incluiItens').css('display', 'block');"+	
								"$('#necessitaCompra').css('display', 'block');"+
								"$('#div_antecipa').css('display', 'block');"+	
								"$('#div_programarManutencao').css('display', 'block');"+
								"$('#botaoAprovado').css('display', 'none');"+
								"$('#botaoNecessita').css('display', 'none');"+
								"$('#botaoAntecipa').css('display', 'block');"+
								"$('#botaoContratar').css('display', 'none');"+
								"$('#divAdicionar').css('display', 'none');"+																																																														
							"</script>");
	}

	log.info("===============displayFields (FIM)===============");
}
