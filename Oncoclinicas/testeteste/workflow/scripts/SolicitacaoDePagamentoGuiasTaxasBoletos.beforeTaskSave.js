var gestorResponsavelId = "";

function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var atividadeAtual = getValue("WKNumState");
	var ATIVIDADE = getValue("WKNumState");
	
	/*
	if (nextSequenceId == ATRIBUIR_RESPONSAVEL) {
		definirGestorResponsavel();
	}
	*/


	
	
	
	if (ATIVIDADE == CORRIGIR) {

		hAPI.setCardValue("nomeAprovGestor1","");
		hAPI.setCardValue("dataAprovGestor1","");
		hAPI.setCardValue("decisaoGestor1","");
		hAPI.setCardValue("motivoAprovGestor1","");

		hAPI.setCardValue("nomeAprovGestor2","");
		hAPI.setCardValue("dataAprovGestor2","");
		hAPI.setCardValue("decisaoGestor2","");
		hAPI.setCardValue("motivoAprovGestor2","");
		
		hAPI.setCardValue("nomeAprovGestor3","");
		hAPI.setCardValue("dataAprovGestor3","");
		hAPI.setCardValue("decisaoGestor3","");
		hAPI.setCardValue("motivoAprovGestor3","");
		
		hAPI.setCardValue("nomeAprovGestor4","");
		hAPI.setCardValue("dataAprovGestor4","");
		hAPI.setCardValue("decisaoGestor4","");
		hAPI.setCardValue("motivoAprovGestor4","");
		
		hAPI.setCardValue("nomeAprovGestor5","");
		hAPI.setCardValue("dataAprovGestor5","");
		hAPI.setCardValue("decisaoGestor5","");
		hAPI.setCardValue("motivoAprovGestor5","");
		
	}
	
	if (ATIVIDADE == GESTOR){
		hAPI.setCardValue("nivelAtualAprovacao", parseInt(hAPI.getCardValue("nivelAtualAprovacao")) + 1);
	}
		
	if (atividadeAtual == PROGRAMAR && getValue("WKCompletTask")=="true"){
		//Caso aprovado pelo fiscal e não seja "apenas boleto" o título será gerado
		log.info('HEITOR SALDANHA CAMPO SOLICITACAO: '+hAPI.getCardValue('numSolLancNfPgtoGuiaTxBoletos'))
		if(hAPI.getCardValue('decisaoAprovacaoFinanc') == 'Sim' && hAPI.getCardValue('numSolLancNfPgtoGuiaTxBoletos') == ''){
			log.info('HEITOR SALDANHA INTEGROU PAGAMENTO');
			//verifica se deve-se gerar o título do protheus baseado nas retenções
			if(verificaRetencao()){
				// Faz a inserção de Título no Protheus
				var msgWS = insereTituloProtheus();
				var retornoWS = verificaErro(msgWS);
				if (retornoWS != "Sucesso") {
					throw "Não foi possível inserir o Título no Protheus. ";
				} else {
					var numeroTitulo = msgWS.split("|"); 
					var users = new java.util.ArrayList();
					hAPI.setCardValue("numeroDocumento", numeroTitulo[1]);
				}
			}			
		}		
	}
	
	//Apaga o titulo quando ele for enviado para correção 
	if(atividadeAtual == EXCLUSIVO_VALIDAR_PROGRAMAR && getValue("WKCompletTask")=="true"){
		if(nextSequenceId == CORRECAO || nextSequenceId == VALIDACAO){
			var numeroTitulo = hAPI.getCardValue('numeroDocumento');
			if(numeroTitulo != '' && numeroTitulo != undefined){
				var msgWS = removeTiTuloProtheus();
				var retornoWS = verificaErro(msgWS);
				if (retornoWS != "Sucesso") {
					throw "Não foi possível remover o Título no Protheus. ";
				} else {
					var numeroTitulo = msgWS.split("|"); 
					var users = new java.util.ArrayList();
					hAPI.setCardValue("numeroDocumento", '');
				}
			}
		}
	}
}

function definirGestorResponsavel() {
	buscarGestorResponsavel();
	setWFParametro("gestorResponsavel", gestorResponsavelId);
}

function buscarGestorResponsavel() {
	var dataSet = new objDataSet("dataSetResponsavelAprovacaoGeral");

	// Parametro para consulta do responsavel do Centro de Custo
	var codFilial = getCodFilial();
	var codCentroCusto = getCodCentroCusto();
	var numAlcada = 1;
	var valorPedido = 0;

	// realizacao do filtro
	dataSet.setFiltro("codFilial", codFilial);
	dataSet.setFiltro("codCentroCusto", codCentroCusto);
	dataSet.setFiltro("numAlcada", numAlcada);
	dataSet.setFiltro("valorPedido", valorPedido);

	dataSet.buscar();

	// Retorno com todos os dados
	var dados = dataSet.getDados();

	if (dados.getValue(0, "status") != false) {
		gestorResponsavelId = dados.getValue(0, "matricula");

		return true;
	} else {
		return false;
	}
}

function getCodFilial(){
	return getWFParametro("codigo_filial");
}

function getCodCentroCusto() {
	return getWFParametro("CTT_CUSTO");;
}