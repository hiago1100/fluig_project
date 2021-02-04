//VERSÃO: 1.3.3
//MUDANÇA NO LABEL DO RESUMO DO COMBO DE TIPO DE SOLICITAÇÃO DO FORMULARIO FLUIG-0128
function addCentralTarefasInfo(processo, numProcess)
{
	try
	{
		Anexos(numProcess);
		Resumo(processo, numProcess);
	}
	catch(err)
	{
		var message = "ERRO AO INSERIR AS INFORMAÇÕES ADICIONAIS DA CENTRAL DE TAREFAS - DESCRIÇÃO DO ERRO: " + err.message;
		
		log.error("-----------------------------------------------------------------");
		log.error(message);
		log.error("-----------------------------------------------------------------");
		
		throw message;
	}
	
}

function Anexos(numProcess) {
	var attachments = hAPI.listAttachments();

	for (var i = 0; i < attachments.size(); i++) {
		var attachment = attachments.get(i);
		DatasetFactory.getDataset("DS_FLUIG_0114", [numProcess, attachment.getDocumentDescription(), attachment.documentId], null, null);
	}
}

function Resumo(processo, numProcess) {
	
	log.warn("ADICIONANDO OS MAPEAMENTOS PARA A CENTRAL DE TAREFAS - PROCESSO: " + processo + " - NUMERO PROCESSO: " + numProcess);
	
	var resumo = "";
	var mapa = mapeamento(processo);

	mapa.forEach(function(campos) {
		if (campos.tipo == 10) //combobox
		{
			if (resumo == "") {
				resumo = campos.label + ": " + valoresDescricao(campos.campo, hAPI.getCardValue(campos.campo), processo);
			} else {
				resumo = resumo + "; " + campos.label + ": " + valoresDescricao(campos.campo, hAPI.getCardValue(campos.campo), processo);
			}
		} else if (campos.tipo == 5) //pai e filho 
			{
			if (resumo == "") {
				resumo = valoresPaiFilho(campos.campo, processo,campos.label);
			} else {
				resumo = resumo + "; " + valoresPaiFilho(campos.campo, processo,campos.label);
			}
		} 
		else if (campos.tipo == 20) //customizado 
			{
			if (resumo == "") {
				resumo = campos.label + ": " + valoresCustomizados(campos.campo, hAPI.getCardValue(campos.campo), processo);
			} else {
				resumo = resumo + "; " + campos.label + ": " + valoresCustomizados(campos.campo, hAPI.getCardValue(campos.campo), processo);
			}
		} 
		else 
		{
			if (resumo == "") // normal 
				{
				resumo = campos.label + ": " + hAPI.getCardValue(campos.campo);
			} else {
				resumo = resumo + "; " + campos.label + ": " + hAPI.getCardValue(campos.campo);
			}
		}

	});

	DatasetFactory.getDataset("DS_FLUIG_0113", [numProcess, resumo], null, null);
}

function mapeamento(processo) {
	var dsReturn = DatasetFactory.getDataset("DS_FLUIG_0115", [processo], null, null);

	if (dsReturn.values.length != 0) {
		return dsReturn.values.map(function(mapeamento) {
			return {
				label: mapeamento[0],
				campo: mapeamento[1],
				tipo: mapeamento[2],
			};
		});

	}

}

function valoresCustomizados(campo, valor, processo) {
	
	//-----------------------------------------------
	//FLUIG-0130
	if (processo == "FLUIG-0130") {
		if (campo == "cpHorarioDesejadoHora") {
			return hAPI.getCardValue("cpHorarioDesejadoHora") + ":" + hAPI.getCardValue("cpHorarioDesejadoMinuto");
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0179
	if (processo == "FLUIG-0179") {
		if (campo == "cpCentroDeCusto") 
		{
			if(hAPI.getCardValue("cpTipo") == 2)
			{
				return hAPI.getCardValue("cpCentroDeCustoSemVarios")
			}
			else
			{
				return hAPI.getCardValue("cpCentroDeCusto")
			}
		}
		if (campo == "cpResponsavel") 
		{
			if(hAPI.getCardValue("cpTipo") == 2) 
			{
				return hAPI.getCardValue("cpSecaoLinhaRespSemVarios")
			}
			else
			{
				return hAPI.getCardValue("cpSecaoLinhaResp");
			}
			
			return "";
		}
	}
}

function ResumoPaiFilho(label,campo,quantidade)
{
	var resumo = '';
	
	for (i = 1; i <= quantidade; i++) 
	{
		if (resumo == "") 
		{
			resumo = "[" +i+ "] " +label + ": " + hAPI.getCardValue(campo + "___" + i);
		} else 
		{
			resumo = resumo + "; [" +i+ "] " + label + ": " + hAPI.getCardValue(campo + "___" + i);
		}
	}	
	return resumo;
}

function valoresPaiFilho(campo, processo, label) {
	
	//-----------------------------------------------
	//FLUIG-0104
	if (processo == "FLUIG-0104") {
		
		if (campo == "itmNomeCargo") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeColaboradores"));
		}
		if (campo == "itmQuantidade") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeColaboradores"));
		}
	}

	//-----------------------------------------------
	//FLUIG-0130
	if (processo == "FLUIG-0130") 
	{
		if (campo == "cpOrigem") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeTotal"));
		}
		
		if (campo == "cpDestino") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeTotal"));
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0169
	if (processo == "FLUIG-0169") {

		if (campo == "cpNomeColigada") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeObras"));
		}
		
		if (campo == "cpNomeObraUAU") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeObras"));
		}
		
	}
	
	
	
	//-----------------------------------------------
	//FLUIG-0170
	if (processo == "FLUIG-0170") {
		if (campo == "cpObra") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeObras"));
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0173
	if (processo == "FLUIG-0173") {
		if (campo == "cpNomeColaborador") 
		{
			return ResumoPaiFilho(label,campo,hAPI.getCardValue("cpQuantidadeObras"));
		}
	}
}

//mapeamento dos valores de itens nao text - proxima atualização colocar isso dinamicamente
function valoresDescricao(campo, valor, processo) {
	//-----------------------------------------------
	//FLUIG-0100
	if (processo == 'FLUIG-0100') {
		if (campo == "cpTipoExcecao") {
			if (valor == 1) {
				return "Admissão (Fora da Política de Remuneração)";
			}
			if (valor == 2) {
				return "Admissão (Fora do prazo)";
			}
			if (valor == 3) {
				return "Férias";
			}
			if (valor == 4) {
				return "Rescisão";
			}
			if (valor == 5) {
				return "Movimentação de Pessoal";
			}
			if (valor == 6) {
				return "Hora Extra";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0104
	if (processo == "FLUIG-0104") {
		
		if (campo == "cpTipoMaoObra") {
			if (valor == 1) {
				return "Produção";
			}
			if (valor == 2) {
				return "Encarregado de Produção";
			}
			if (valor == 3) {
				return "Administrativo";
			}
			if (valor == 4) {
				return "Estratégico";
			}
			return "";
		}

		if (campo == "cpMotivoAdmissaoProd") 
		{
			if (valor == 1) {
				return "Aumento de Quadro";
			}
			if (valor == 2) {
				return "Efetivação";
			}
			if (valor == 3) {
				return "Substituição de demissão";
			}
			if (valor == 4) {
				return "Substituição de Férias";
			}
			if (valor == 5) {
				return "Substituição de Licença Maternidade";
			}
			if (valor == 6) {
				return "Substituição de Acidente de trabalho ou doença";
			}
			if (valor == 7) {
				return "Substituição de Transferência / Promoção";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0105
	if (processo == "FLUIG-0105") {
		if (campo == "cpTransferencia") {
			if (valor == 1) {
				return "Sim";
			}
			if (valor == 2) {
				return "Não";
			}
			return "";
		}

		if (campo == "cpTipoMovimentacao") {
			if (valor == 1) {
				return "Promoção";
			}
			if (valor == 2) {
				return "Progressão";
			}
			if (valor == 3) {
				return "Enquadramento";
			}
			if (valor == 4) {
				return "Reclassificação";
			}
			if (valor == 5) {
				return "Sem alteração salarial";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0106
	if (processo == "FLUIG-0106") {
		if (campo == "cpTipoBeneficio") {
			if (valor == "ConvenioOdontologico") {
				return "Convênio Odontológico";
			}
			if (valor == "ConvenioFarmacia") {
				return "Convênio Farmácia";
			}
			if (valor == "SeguroDeVida") {
				return "Seguro de Vida";
			}
			if (valor == "PlanoDeSaude") {
				return "Plano de Saúde";
			}
			if (valor == "CartaoAlimentacao") {
				return "Cartão Alimentação e Refeição";
			}
			if (valor == "ValeTransporte") {
				return "Vale Transporte";
			}
			return "";
		}

		if (campo == "cpTipoSolicitacao") {
			if (valor == 1) {
				return "Solicitação de Continuidade de Convênio Odontológico";
			}
			if (valor == 2) {
				return "Solicitação de Convênio Odontológico";
			}
			if (valor == 3) {
				return "Solicitação de 2ª via do cartão do Convênio Odontológico";
			}
			if (valor == 4) {
				return "Solicitação de alteração/atualização de Convênio Odontológico";
			}
			if (valor == 5) {
				return "Solicitação de exclusão de Convênio Odontológico";
			}
			if (valor == 6) {
				return "Solicitação de cartão Convênio Farmácia";
			}
			if (valor == 7) {
				return "Solicitação de 2ª via do cartão Convênio Farmácia";
			}
			if (valor == 8) {
				return "Solicitação de exclusão de Cartão Convênio Farmácia";
			}
			if (valor == 9) {
				return "Solicitação de Processo Indenizatório";
			}
			if (valor == 10) {
				return "Solicitação de Cesta de Natalidade";
			}
			if (valor == 11) {
				return "Solicitação de Certificado da Apólice";
			}
			if (valor == 12) {
				return "Solicitação de Plano de Saúde";
			}
			if (valor == 13) {
				return "Solicitação de 2ª via do cartão Plano de Saúde";
			}
			if (valor == 14) {
				return "Solicitação de reembolso de Plano de Saúde";
			}
			if (valor == 15) {
				return "Solicitação de exclusão de Plano de Saúde";
			}
			if (valor == 16) {
				return "Solicitação de alteração/atualização de dados cadastrais de Plano de Saúde";
			}
			if (valor == 17) {
				return "Solicitação de Continuidade de Plano de Saúde (demitidos)";
			}
			if (valor == 35) {
				return "Solicitação de extrato de coparticipação";
			}
			if (valor == 18) {
				return "Solicitação mensal de Ticket Alimentação ou Cesta Básica";
			}
			if (valor == 19) {
				return "Solicitação de Pedido Complementar";
			}
			if (valor == 20) {
				return "Solicitação de alteração de Cartão Alimentação ou Refeição";
			}
			if (valor == 21) {
				return "Crédito mensal não disponibilizado / valor incorreto";
			}
			if (valor == 22) {
				return "Solicitação de Cartão Alimentação/refeição Provisório";
			}
			if (valor == 23) {
				return "Solicitação de 2ª Via Cartão Alimentação/Refeição";
			}
			if (valor == 24) {
				return "Solicitação de saldo de Vale Transporte";
			}
			if (valor == 25) {
				return "Solicitação de relatório de carga de Vale transporte";
			}
			if (valor == 26) {
				return "Solicitação de exclusão de Vale Transporte";
			}
			if (valor == 27) {
				return "Informações para pedido mensal de Vale Transporte";
			}
			if (valor == 28) {
				return "Solicitação de Vale Transporte Complementar";
			}
			if (valor == 29) {
				return "Solicitação de Vale Transporte (após admissão)";
			}
			if (valor == 30) {
				return "Solicitação de 2ª via/bloqueio do cartão de Vale Transporte";
			}
			if (valor == 31) {
				return "Solicitação de alteração/atualização de tarifa de Vale Transporte";
			}
			if (valor == 32) {
				return "Solicitação de Vale Transporte Admitidos (regional MG)";
			}
			if (valor == 34) {
				return "Crédito mensal não disponibilizado / valor incorreto";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0107
	if (processo == "FLUIG-0107") {
		if (campo == "cpFinalidade") {
			if (valor == 1) {
				return "Pagamento";
			}
			if (valor == 2) {
				return "Cobrança";
			}
			if (valor == 3) {
				return "Financiamento";
			}
			if (valor == 4) {
				return "Outros";
			}
			return "";
		}
		if (campo == "cpTipoSolicitacao") {
			if (valor == 1) {
				return "Abertura de conta bancária (Obra já existente no UAU)";
			}
			if (valor == 2) {
				return "Criação de nova Empresa / Obra / Etapa / Conta Bancária";
			}
			return "";
		}
		if (campo == "cpTipoConta") {
			if (valor == 1) {
				return "Abertura de Conta Bancária de gaveta";
			}
			if (valor == 2) {
				return "Abertura de Conta Bancária";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0109
	if (processo == "FLUIG-0109") {
		if (campo == "cpHaveraAbono") {
			if (valor == 1) {
				return "Sim";
			}
			if (valor == 2) {
				return "Não";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0110
	if (processo == "FLUIG-0110") {
		if (campo == "cpMinutosLocais" || campo == "cpMinutosLongaDistancia" || campo == "cpRoamingInternacional") {
			if (valor == 1) {
				return "Sim";
			}
			if (valor == 2) {
				return "Não";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0112
	if (processo == "FLUIG-0112") {
		if (campo == "cpPerfilTelefonia") {
			if (valor == 1) {
				return "CONSELHEIRO";
			}
			if (valor == 2) {
				return "CONSULTOR REGIONAL / ENGENHARIA STAFF";
			}
			if (valor == 3) {
				return "COORDENADOR LOCAL";
			}
			if (valor == 4) {
				return "COORDENADOR VIAJANTE";
			}
			if (valor == 5) {
				return "DIRETOR";
			}
			if (valor == 6) {
				return "ENCARREGADO";
			}
			if (valor == 7) {
				return "ESTAGIARIO DE CAMPO";
			}
			if (valor == 8) {
				return "ENGENHEIRO DE OBRA";
			}
			if (valor == 9) {
				return "GERENTE GERAL DE OBRA / VIAJANTE";
			}
			if (valor == 10) {
				return "GERENTE SEDE";
			}
			if (valor == 11) {
				return "GESTOR ADMINISTRATIVO DE OBRA";
			}
			if (valor == 12) {
				return "GESTOR DE ALMOXARIFADO";
			}
			if (valor == 13) {
				return "GESTOR DE ASSISTENCIA TECNICA";
			}
			if (valor == 14) {
				return "GESTOR DE ASSISTENCIA TECNICA VIAJANTE";
			}
			if (valor == 15) {
				return "GESTOR DE OBRA";
			}
			if (valor == 16) {
				return "MEDICO DO TRABALHO";
			}
			if (valor == 17) {
				return "MESTRE DE OBRA";
			}
			if (valor == 18) {
				return "MOTOBOY - PRESIDENCIA";
			}
			if (valor == 19) {
				return "MOTORISTA";
			}
			if (valor == 20) {
				return "MOTORISTA - PRESIDECIA";
			}
			if (valor == 21) {
				return "PILOTO - PRESIDENCIA";
			}
			if (valor == 22) {
				return "PORTARIA - VIGIA DE OBRA";
			}
			if (valor == 23) {
				return "PRESIDENTE";
			}
			if (valor == 24) {
				return "SECRETARIA EXECUTIVA";
			}
			if (valor == 25) {
				return "SUPERINTENDENTE";
			}
			if (valor == 26) {
				return "SUPERINTENDENTE DE ENGENHARIA";
			}
			if (valor == 27) {
				return "SUPERVISOR";
			}
			if (valor == 28) {
				return "TECNICO";
			}
			if (valor == 29) {
				return "TELEFONE DA AREA";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0113
	if (processo == "FLUIG-0113") {
		if (campo == "cpTipoAfastamento") {
			if (valor == 1) {
				return "Licença maternidade";
			}
			if (valor == 2) {
				return "Afastamento por motivo de doença";
			}
			if (valor == 3) {
				return "Afastamento por acidente de trabalho";
			}
			if (valor == 4) {
				return "Aposentadoria por invalidez";
			}
			if (valor == 5) {
				return "Licença sem vencimentos";
			}
			if (valor == 6) {
				return "Outros";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0114
	if (processo == "FLUIG-0114") {
		if (campo == "cpTipoAviso") {
			if (valor == 1) {
				return "Trabalhado";
			}
			if (valor == 2) {
				return "Indenizado";
			}
			if (valor == 3) {
				return "Não se aplica";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0115
	if (processo == "FLUIG-0115") {
		if (campo == "cpTipoMudanca") {
			if (valor == 1) {
				return "Todos os Colaboradores de uma Empresa ou Seção";
			}
			if (valor == 2) {
				return "Adicionar colaboradores separadamente";
			}
			if (valor == 3) {
				return "Próprio colaborador";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0118
	if (processo == "FLUIG-0118") {
		if (campo == "cpStandObra") {
			if (valor == 1) {
				return "Stand";
			}
			if (valor == 2) {
				return "Obra";
			}
			if (valor == 3) {
				return "Escritório";
			}
			return "";
		}
		if (campo == "cpComInternet") {
			if (valor == 1) {
				return "Sim";
			}
			if (valor == 2) {
				return "Não";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0120
	if (processo == "FLUIG-0120") {
		if (campo == "cpTipoChamado") {
			if (valor == 1) {
				return "Solicitação/Alteraçao de Acesso ou Perfil";
			}
			if (valor == 2) {
				return "Criação de lista de Distribuição";
			}
			if (valor == 3) {
				return "Criação de Caixa Compartilhada";
			}
			if (valor == 4) {
				return "Criação de Pasta";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0122
	if (processo == "FLUIG-0122") {
		if (campo == "cpAreaDepartamento") {
			if (valor == 1) {
				return "Admissão / Cadastro";
			}
			if (valor == 2) {
				return "Benefícios";
			}
			if (valor == 3) {
				return "Férias";
			}
			if (valor == 4) {
				return "Folha de Pagamento";
			}
			if (valor == 5) {
				return "PJ";
			}
			if (valor == 6) {
				return "Ponto Eletrônico";
			}
			if (valor == 7) {
				return "Relações Trabalhistas";
			}
			if (valor == 8) {
				return "Rescisão";
			}
			if (valor == 9) {
				return "Infraestrutura";
			}
			if (valor == 10) {
				return "Viagem";
			}
			if (valor == 11) {
				return "Adorno";
			}
			if (valor == 12) {
				return "Despesas Diretoria";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0125
	if (processo == "FLUIG-0125") {
		if (campo == "cpTipoViajante") {
			if (valor == 1) {
				return "Próprio Colaborador";
			}
			if (valor == 2) {
				return "Outro Colaborador";
			}
			if (valor == 3) {
				return "Terceiro";
			}
			if (valor == 4) {
				return "Dependente";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0126
	if (processo == "FLUIG-0126") {
		if (campo == "cpTipo") {
			if (valor == 1) {
				return "Cancelamento de Linha";
			}
			if (valor == 2) {
				return "Mudança de endereço";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0127
	if (processo == "FLUIG-0127") {
		if (campo == "cpTipoSolicitacao") {
			if (valor == 1) {
				return "Repasse de Aparelho";
			}
			if (valor == 2) {
				return "Devolução de Aparelho";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0128
	if (processo == "FLUIG-0128") {
		if (campo == "cpTipoSolicitacao") {
			if (valor == 1) {
				return "Corte de adiantamento";
			}
			if (valor == 2) {
				return "Descontos danos causados em folha";
			}
			if (valor == 3) {
				return "Folha complementar";
			}
			if (valor == 4) {
				return "Prêmio de produção";
			}
			if (valor == 5) {
				return "Reenvio de pagamento";
			}
			if (valor == 6) {
				return "Solicitação GPS";
			}
			if (valor == 7) {
				return "Tratamento de folha";
			}
			if (valor == 8) {
				return "Comissão";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0131
	if (processo == "FLUIG-0131") {
		if (campo == "cpTipoAjuste") {
			if (valor == 1) {
				return "Admissão";
			}
			if (valor == 2) {
				return "Férias";
			}
			if (valor == 3) {
				return "Rescisão";
			}
			if (valor == 4) {
				return "Movimentação de Pessoal";
			}
			if (valor == 5) {
				return "Tratamento de Folha de Pagamento";
			}
			if (valor == 6) {
				return "Rescisão Complementar";
			}
			return "";
		}
	}


	//-----------------------------------------------
	//FLUIG-0134
	if (processo == "FLUIG-0134") {
		if (campo == "cpNovoPerfil") {
			if (valor == 1) {
				return "Consultor Local";
			}
			if (valor == 2) {
				return "Consultor Regional/Engenharia Staff";
			}
			if (valor == 3) {
				return "Coordenador Local";
			}
			if (valor == 4) {
				return "Coordenador Viajante";
			}
			if (valor == 5) {
				return "Diretor";
			}
			if (valor == 6) {
				return "Encarregado";
			}
			if (valor == 7) {
				return "Estagiário de Campo";
			}
			if (valor == 8) {
				return "Gerente Geral de Obra/Viajante";
			}
			if (valor == 9) {
				return "Gerente Sede";
			}
			if (valor == 10) {
				return "Gestor Administrativo de Obra";
			}
			if (valor == 11) {
				return "Gestor de Almoxarifado";
			}
			if (valor == 12) {
				return "Gestor de Assistência Técnica";
			}
			if (valor == 13) {
				return "Gestor de Assistência Técnica Viajante";
			}
			if (valor == 14) {
				return "Gestor de Obra";
			}
			if (valor == 15) {
				return "Médico do Trabalho";
			}
			if (valor == 16) {
				return "Mestre de Obra";
			}
			if (valor == 17) {
				return "Motoboy - Presidência";
			}
			if (valor == 18) {
				return "Motorista";
			}
			if (valor == 19) {
				return "Motorista - Presidência";
			}
			if (valor == 20) {
				return "Piloto - Presidência";
			}
			if (valor == 21) {
				return "Portaria - Vigia de Obra";
			}
			if (valor == 22) {
				return "Presidênte";
			}
			if (valor == 23) {
				return "Secretaria Executiva";
			}
			if (valor == 24) {
				return "Superintendente";
			}
			if (valor == 25) {
				return "Superintendente de Engenharia";
			}
			if (valor == 26) {
				return "Supervisor";
			}
			if (valor == 27) {
				return "Técnico";
			}
			if (valor == 28) {
				return "Telefone da Área";
			}
			if (valor == 29) {
				return "Conselheiro";
			}
			if (valor == 30) {
				return "Engenheiro de Obra";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0135
	if (processo == "FLUIG-0135") {
		if (campo == "cpTipo") {
			if (valor == 1) {
				return "Aparelho com problema";
			}
			if (valor == 2) {
				return "Perda/Roubo";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0136
	if (processo == "FLUIG-0136") {
		if (campo == "cpTipo") {
			if (valor == 1) {
				return "Alteração de férias";
			}
			if (valor == 2) {
				return "Cancelamento de férias";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0138
	if (processo == "FLUIG-0138") {
		if (campo == "cpMotivo") {
			if (valor == 1) {
				return "Perda/Roubo";
			}
			if (valor == 2) {
				return "Desgaste Natural";
			}
			if (valor == 3) {
				return "Quebra/Danificação";
			}
			return "";
		}
		if (campo == "cpSolicitaCordao") {
			if (valor == 1) {
				return "Sim";
			}
			if (valor == 2) {
				return "Não";
			}
			return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0141
	if (processo == "FLUIG-0141") {

		var isPJ = hAPI.getCardValue("cpFornecedor") == 2;
		var isPF = hAPI.getCardValue("cpFornecedor") == 1;

		if (campo == "cpFornecedor") {
			if (valor == 1) {
				return "Pessoa Física";
			}
			if (valor == 2) {
				return "Pessoa Jurídica";
			}
			return "";
		}
		if (campo == "cpNome") {
			if (isPJ) {
				return hAPI.getCardValue("cpRazaoSocial");
			}
			if (isPF) {
				return hAPI.getCardValue("cpNome");
			}
		}
		if (campo == "cpCPF") {
			if (isPJ) {
				return hAPI.getCardValue("cpCNPJ");
			}
			if (isPF) {
				return hAPI.getCardValue("cpCPF");
			}
		}
	}

	//-----------------------------------------------
	//FLUIG-0142
	if (processo == "FLUIG-0142") {
		if (campo == "cpTipoSolicitacao") {
			if (valor == 1) {
                return "Alteração de cadastro";
            }
            if (valor == 2) {
                return "Alteração de dados bancários";
            }
            if (valor == 3) {
                return "Aditivo de estágio";
            }
            if (valor == 4) {
                return "Informe de aposentadoria";
            }
            if (valor == 5) {
                return "Mensalidade Sindical";
            }
            if (valor == 6) {
                return "Salário Família";
            }
            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0143
	if (processo == "FLUIG-0143") {
		if (campo == "cpTipoSolicitacao") {
			 if (valor == 1) {
	                return "Alteração";
	            }
	            if (valor == 2) {
	                return "Inclusão";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0148
	if (processo == "FLUIG-0148") {
		if (campo == "cpTipoFolha") {
			   if (valor == 1) {
	                return "Adiantamento";
	            }
	            if (valor == 2) {
	                return "Folha Mensal";
	            }
	            return "";
		}
		
		if (campo == "cpMesReferencia") {
			 if (valor == 1) {
	                return "Janeiro";
	            }
	            if (valor == 2) {
	                return "Fevereiro";
	            }
	            if (valor == 3) {
	                return "Março";
	            }
	            if (valor == 4) {
	                return "Abril";
	            }
	            if (valor == 5) {
	                return "Maio";
	            }
	            if (valor == 6) {
	                return "Junho";
	            }
	            if (valor == 7) {
	                return "Julho";
	            }
	            if (valor == 8) {
	                return "Agosto";
	            }
	            if (valor == 9) {
	                return "Setembro";
	            }
	            if (valor == 10) {
	                return "Outubro";
	            }
	            if (valor == 11) {
	                return "Novembro";
	            }
	            if (valor == 12) {
	                return "Dezembro";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0149
	if (processo == "FLUIG-0149") {
		if (campo == "cpTipoAfastamento") {
			if (valor == 1) {
                return "Licença maternidade";
            }
            if (valor == 2) {
                return "Afastamento po motivo de doença";
            }
            if (valor == 3) {
                return "Afastamento por acidente de trabalho";
            }
            if (valor == 4) {
                return "Aposentadoria por invalidez";
            }
            if (valor == 5) {
                return "Licença sem vencimentos";
            }
            if (valor == 6) {
                return "Outros";
            }
            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0150
	if (processo == "FLUIG-0150") {
		if (campo == "cpTipoManutencao") {
			 if (valor == 1) {
	                return "Elétrica";
	            }
	            if (valor == 2) {
	                return "Manutenção Predial";
	            }
	            if (valor == 3) {
	                return "Máquina de café";
	            }
	            if (valor == 4) {
	                return "Purificador de água";
	            }
	            if (valor == 5) {
	                return "Material Gráfico";
	            }
	            if (valor == 6) {
	                return "Ar condicionado";
	            }
	            if (valor == 7) {
	                return "Outros";
	            }
	            return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0151
	if (processo == "FLUIG-0151") {
		if (campo == "cpTipoDeclaracao") {
			   if (valor == 1) {
	                return "Comprovação de vínculo empregatício";
	            }
	            if (valor == 2) {
	                return "Atestado pra Faculdade(Perda de Atividades)";
	            }
	            if (valor == 3) {
	                return "Comprovação de mais de um vínculo";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0160
	if (processo == "FLUIG-0160") {
		if (campo == "cpTipoSolicitacao") {
			 if (valor == 1) {
	                return "Repasse de Mini Modem";
	            }
	            if (valor == 2) {
	                return "Devolução de Mini Modem";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0161
	if (processo == "FLUIG-0161") {
		if (campo == "cpTipoMudanca") {
			  if (valor == 1) {
	                return "Emergencial";
	            }
	            if (valor == 2) {
	                return "Programada";
	            }
	            if (valor == 3) {
	                return "Imediata";
	            }
	            return "";
		}
		if (campo == "cpLocalidadesAfetadas") {
			if (valor == "Escritorios_Regionais") {
                return "Escritórios Regionais";
            }
            return valor;
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0165
	if (processo == "FLUIG-0165") {
		if (campo == "cpModeloAparelho") {
			 if (valor == 1) {
	                return "C201";
	            }
	            if (valor == 2) {
	                return "208";
	            }
	            if (valor == 3) {
	                return "Lumia 520";
	            }
	            if (valor == 4) {
	                return "Outros";
	            }
	            if (valor == 5) {
	                return "Moto G";
	            }
	            if (valor == 6) {
	                return "Moto E";
	            }
	            if (valor == 7) {
	                return "Outros";
	            }
	            if (valor == 8) {
	                return "Iphone 4";
	            }
	            if (valor == 9) {
	                return "Iphone 5";
	            }
	            if (valor == 10) {
	                return " Iphone 6";
	            }
	            if (valor == 11) {
	                return "Outros";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0168
	if (processo == "FLUIG-0168") {
		if (campo == "cpMesReferencia") {
			  if (valor == 1) {
	                return "Janeiro";
	            }
	            if (valor == 2) {
	                return "Fevereiro";
	            }
	            if (valor == 3) {
	                return "Março";
	            }
	            if (valor == 4) {
	                return "Abril";
	            }
	            if (valor == 5) {
	                return "Maio";
	            }
	            if (valor == 6) {
	                return "Junho";
	            }
	            if (valor == 7) {
	                return "Julho";
	            }
	            if (valor == 8) {
	                return "Agosto";
	            }
	            if (valor == 9) {
	                return "Setembro";
	            }
	            if (valor == 10) {
	                return "Outubro";
	            }
	            if (valor == 11) {
	                return "Novembro";
	            }
	            if (valor == 12) {
	                return "Dezembro";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0170
	if (processo == "FLUIG-0170") {
		if (campo == "cpMesReferencia") {
			 if (valor == 1) {
	                return "Janeiro";
	            }
	            if (valor == 2) {
	                return "Fevereiro";
	            }
	            if (valor == 3) {
	                return "Março";
	            }
	            if (valor == 4) {
	                return "Abril";
	            }
	            if (valor == 5) {
	                return "Maio";
	            }
	            if (valor == 6) {
	                return "Junho";
	            }
	            if (valor == 7) {
	                return "Julho";
	            }
	            if (valor == 8) {
	                return "Agosto";
	            }
	            if (valor == 9) {
	                return "Setembro";
	            }
	            if (valor == 10) {
	                return "Outubro";
	            }
	            if (valor == 11) {
	                return "Novembro";
	            }
	            if (valor == 12) {
	                return "Dezembro";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0171
	if (processo.trim() == "FLUIG-0171") {
		if (campo == "cpTipoSolicitante") {
			  if (valor == 1) {
	                return "Colaborador";
	            }
	            if (valor == 2) {
	                return "Terceiro";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0174
	if (processo == "FLUIG-0174") {
		if (campo == "cpTipoSolicitacao") {
			  if (valor == 1) {
	                return "Criação de Acesso";
	            }
	            if (valor == 2) {
	                return "Alteração de Acesso";
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0176
	if (processo == "FLUIG-0176") {
		if (campo == "cpCriacaoUsuarioLabore") {
		    if (valor == 1) {
                return "Sim";
            }
            if (valor == 2) {
                return "Não";
            }
            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0179
	if (processo == "FLUIG-0179") 
	{
		
		if (campo == "cpTipo") {
			if (valor == 1) {
				return "Instalação de ramal";
			}
			if (valor == 2) {
				return "Configuração de ramal";
			}
			return "";
		}
		
	
	}
	
	//-----------------------------------------------
	//FLUIG-0189
	if (processo == "FLUIG-0189") {
		if (campo == "cpPublico") {
			  if (valor == 1){return "Sede";}
	            if (valor == 2){return "Todo Brasil";}
	            if (valor == 3){
	               //ver a questao dos estados
	            }
	            return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0190
	if (processo == "FLUIG-0190") {
		if (campo == "cpAreaResponsavel") {
			 if (valor == 1) {
                 return "Admissão";
             }
             if (valor == 2) {
                 return "Benefícios";
             }
             if (valor == 3) {
                 return "Férias";
             }
             if (valor == 4) {
                 return "Ponto";
             }
             if (valor == 5) {
                 return "Rescisão";
             }
             return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0192
	if (processo == "FLUIG-0192") {
		if (campo == "cpTipoCargo") {
			 if (valor == 1) {
                 return "Gerencial";
             }
             if (valor == 2) {
                 return "Técnico/Administrativo";
             }
             if (valor == 3) {
                 return "Obras";
             }
             return "";
		}
	}
	
	//-----------------------------------------------
	//FLUIG-0196
	if (processo == "FLUIG-0196") {
		if (campo == "cpTipoSolicitacao") {
			 if (valor == 1) {
                 return "Cria&ccedil;&atilde;o de Acesso";
             }
             if (valor == 2) {
                 return "Altera&ccedil;&atilde;o de Acesso";
             }
             
             return "";
		}
	}

	//-----------------------------------------------
	//FLUIG-0197
	if (processo == "FLUIG-0197") {
		if (campo == "cpTipoSolicitacao") {
			 if (valor == 1) {
                 return "Balan&ccedil;o";
             }if (valor == 2) {
                 return "Balancete";
             }if (valor == 3) {
                 return "Declara&ccedil;&atilde;o de Faturamento";
             } if (valor == 4) {
                 return "Sped ECD / ECF (C&oacute;pia)";
             }
             
             return "";
             
		}
	}

}