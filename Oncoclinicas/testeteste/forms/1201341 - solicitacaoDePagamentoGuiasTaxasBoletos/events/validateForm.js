var errorMsg = "";
var lineBreaker = "</br>"
function validateForm(form) {

	var atividadeAtual = buscarAtividadeAtual();
	var primeiraAtividade_1 = 0;
	var primeiraAtividade = 8;
	var avaliarPeloGestor = 9;
	var avaliarGerarTitulo = 10;
	var validacaoFiscal = 11;
	var corrigirSolicitacao = 12;
	var programarPagamento = 13;
	var aprovacaoSolicitante = 15;
	var solucaoInconsistencia = 16;
	var atribuirResponsavel = 43;
	var servicoXML = 68;
	var inconsistenciaDados = 72;
	var objForm = new objFormulario(form);
	
	var ATIVIDADE = getValue("WKNumState");

	if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR) {
		
		if(form.getValue("proximoAprovador") == ""){
			throw "Ausência de cadastro de Gestor para aprovação do Centro de Custo selecionado. Favor entrar em contato com a Central de Atendimento.";  
		}

		if(form.getValue("viaWebService") == false){
			if(form.getValue("cdSolicitante") == form.getValue("idAprovGestor1")){
				throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";  
			}
			
			if(form.getValue("cdSolicitante") == form.getValue("idAprovGestor2")){
				throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";  
			}
			
			if(form.getValue("cdSolicitante") == form.getValue("idAprovGestor3")){
				throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";  
			}
			
			if(form.getValue("cdSolicitante") == form.getValue("idAprovGestor4")){
				throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
			}
			
			if(form.getValue("cdSolicitante") == form.getValue("idAprovGestor5")){
				throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
			}
		}
		
		//valida no XML se o campo ID da conta esta vazio
		if(form.getValue("viaWebService") == "true" && form.getValue("idContaGuiando") == ""){
			throw "O campo 'identificador de contas' não pode estar vazio";
		}
		
		if(form.getValue("viaWebService") == "true" && form.getValue("valorPgtoGuiaTaxaBoletos") == "R$ 0,00"){
			throw "O campo Valor Total da conta não pode ser menor ou igual a zero";
		}
		
		verificaCamposGuiando(form);
	}
	
	if (ATIVIDADE == GESTOR) {
		
		var nivelAtual = form.getValue("nivelAtualAprovacao");

		if (nivelAtual == "1") {

			if (form.getValue("decisaoGestor1") == "") {
				throw "Favor aprovar ou reprovar a solicitação!";
			}

			if (form.getValue("decisaoGestor1") == "Nao" && form.getValue("motivoAprovGestor1") == "") {
				throw "Favor justificar o motivo da reprovação!";
			}
				
		}

		if (nivelAtual == "2") {

			if (form.getValue("decisaoGestor2") == "") {
				throw "Favor aprovar ou reprovar a solicitação!";
			}

			if (form.getValue("decisaoGestor2") == "Nao" && form.getValue("motivoAprovGestor2") == "") {
				throw "Favor justificar o motivo da reprovação!";
			}
				
		}
		
		if (nivelAtual == "3") {

			if (form.getValue("decisaoGestor3") == "") {
				throw "Favor aprovar ou reprovar a solicitação!";
			}

			if (form.getValue("decisaoGestor3") == "Nao" && form.getValue("motivoAprovGestor3") == "") {
				throw "Favor justificar o motivo da reprovação!";
			}
				
		}

		if (nivelAtual == "4") {

			if (form.getValue("decisaoGestor4") == "") {
				throw "Favor aprovar ou reprovar a solicitação!";
			}

			if (form.getValue("decisaoGestor4") == "Nao" && form.getValue("motivoAprovGestor4") == "") {
				throw "Favor justificar o motivo da reprovação!";
			}
				
		}

		if (nivelAtual == "5") {

			if (form.getValue("decisaoGestor5") == "") {
				throw "Favor aprovar ou reprovar a solicitação!";
			}

			if (form.getValue("decisaoGestor5") == "Nao" && form.getValue("motivoAprovGestor5") == "") {
				throw "Favor justificar o motivo da reprovação!";
			}
			
		}
		
	}
	
	if (atividadeAtual == primeiraAtividade
		|| atividadeAtual == primeiraAtividade_1
		|| atividadeAtual == corrigirSolicitacao) {
		campoObrigatorio(form, 'filial', 'Filial');
		campoObrigatorio(form, 'CTT_CUSTO', 'Centro de Custo');
		campoObrigatorio(form, 'A2_COD', 'Fornecedor');
		campoObrigatorio(form, 'cnpjFornecedor', 'CNPJ/CPF do Fornecedor');
		campoObrigatorio(form, 'valorPgtoGuiaTaxaBoletos', 'Valor Total');
		if (converteMoedaFloat(form,form.getValue('valorPgtoGuiaTaxaBoletos')) <= 0) {
			errorMsg += "O campo <b>Valor Total</b> não pode ser menor ou igual a zero"
					+ lineBreaker;
		}
		campoObrigatorio(form, 'dtDeVencPgtoGuiaTaxaBoletos','Data de Vencimento');
		campoObrigatorio(form, 'zoomTipo', 'Tipo de Título');
		campoObrigatorio(form, 'historico', 'Histórico');
		campoObrigatorio(form, 'zoomTipolancamento', 'Tipo');
		
		var data = new Date();
		var dia = data.getDay()+1;
		var mes = data.getMonth()+1;
		var ano = data.getFullYear();
		var dataAtual = dia + "/" + mes + "/" + mes;
		
		var tipoLancamento = form.getValue('zoomTipolancamento')
		
		if(tipoLancamento == 'GPS'){

			campoObrigatorio(form, 'codTributoGPS','Cod. Tributo GPS');
			campoObrigatorio(form, 'cgcTributo','CPF/CNPJ Contribuinte');
			validaCpfCnpj(form, 'cgcTributo', 'CPF/CNPJ Contribuinte');
			campoObrigatorio(form, 'dataApuracao','Data de Apuração');
			var data = new Date();
			var mesAtual = data.getMonth()+1;
			var anoAtual = data.getFullYear();
			var mesApuracao = form.getValue('dataApuracao').split('/')[1];
			var anoApuracao = form.getValue('dataApuracao').split('/')[2];
			if(anoApuracao >= anoAtual && mesApuracao > mesAtual){	
				errorMsg += "O campo <b>Data de Apuração</b> não pode ser uma data de um mês futuro"
					+ lineBreaker;
			}
			
		} else if(tipoLancamento == 'FGTS'){

			campoObrigatorio(form, 'cgcTributo','CPF/CNPJ Contribuinte');
			validaCpfCnpj(form, 'cgcTributo', 'CPF/CNPJ Contribuinte');
			campoObrigatorio(form, 'dataApuracao','Data de Apuração');
			campoObrigatorio(form, 'tipoTributo','Tipo Tributo');
			
		} else if (tipoLancamento == 'DARF'){

			campoObrigatorio(form, 'cgcTributo','CPF/CNPJ Contribuinte');
			validaCpfCnpj(form, 'cgcTributo', 'CPF/CNPJ Contribuinte');
			campoObrigatorio(form, 'zoomCodRetencao','Cod. Retenção');
			campoObrigatorio(form, 'dataApuracao','Data de Apuração');
			campoObrigatorio(form, 'cbGeraDirf','Gera Dirf.');
			
		} else if (tipoLancamento == 'IPTU'){
			
			campoObrigatorio(form, 'cgcTributo','CPF/CNPJ Contribuinte');
			validaCpfCnpj(form, 'cgcTributo', 'CPF/CNPJ Contribuinte');
			campoObrigatorio(form, 'tipoTributo','Tipo Tributo');
			
		} 
		validaSomatorioBeneficio(form);
	
	}
	
	if(atividadeAtual == avaliarGerarTitulo){
		campoObrigatorio(form, 'decisaoFiscal', 'Decisão');
		campoObrigatorio(form, 'zoomNatureza', 'Natureza');
		if(form.getValue('decisaoFiscal') ==  'Nao'){
			campoObrigatorio(form,'motivoAprovFiscal', 'Motivo');
		}
	}

	if(atividadeAtual == validacaoFiscal){	
		campoObrigatorio(form, 'decisaoValidacaoFiscal', 'Decisão');
		if(form.getValue('decisaoValidacaoFiscal') ==  'Nao'){
			campoObrigatorio(form,'motValidacaoFiscal', 'Motivo');
		}
		if (comparaDatas(form.getValue('dataemissaoPgtoGuiaTaxaBoletos'),
				form.getValue('dtDeVencPgtoGuiaTaxaBoletos'))) {
			errorMsg += "O campo <b>Data de Emissão</b> não pode ser maior que a data de vencimento"
					+ lineBreaker;
		}
	}
	
	if(atividadeAtual == programarPagamento){
		campoObrigatorio(form, 'decisaoAprovacaoFinanc', 'Decisão');
		if(form.getValue('decisaoAprovacaoFinanc') ==  'Nao'){
			campoObrigatorio(form,'motAprovacaoFinanc', 'Motivo');
		}
		if(form.getValue('aprovDataPrevista') == ''){
			throw "Favor preencher a Data Prevista de Pagamento!";
		}
	}
	
	if(atividadeAtual == aprovacaoSolicitante){
		campoObrigatorio(form, 'aceite', 'Solução Aceita');
		if(form.getValue('aceite') ==  'N'){
			campoObrigatorio(form,'compSolicitante', 'Complemento Solicitante');
		}
	}
	
	if(atividadeAtual == solucaoInconsistencia){
		campoObrigatorio(form, 'retorno', 'Retorno Analista');
	}
	
	/*
	 * Metodo que liga todas as validações
	 */
	objForm.validar();
	errorMsg += customValidateForm(form);
	if (!errorMsg.isEmpty()) {
		throw lineBreaker + errorMsg;
	}
}

/**
 * 
 * 
 * @param campo:
 *            Name do campo no formulario
 * @param textoCampo:
 *            Nome do campo que será exibido na mensagem de erro
 */
function campoObrigatorio(form, campo, textoCampo) {
	if (form.getValue(campo) == null || form.getValue(campo).isEmpty()) {
		errorMsg += "O campo <b>" + textoCampo + "</b> é obrigatório"
				+ lineBreaker;
	}
}

function converteMoedaFloat(form,valor) {
	
	if(form.getValue('sMoeda') == '' || form.getValue('sMoeda') == '1' || form.getValue('sMoeda') == '3'){
		valor = valor.replace("R$",'');
	} else if (form.getValue('sMoeda') == '2'){
		valor = valor.replace("US$",'');
	} else if (form.getValue('sMoeda') == '4'){
		valor = valor.replace("€",'');
	} else if (form.getValue('sMoeda') == '5'){
		valor = valor.replace("¥",'');
	}
	valor = valor.replace(" ",'');
	
	while(valor.indexOf(".") != -1){
		valor = valor.replace('.','');
	}
	
	valor = valor.replace(",",".");
	valor = parseFloat(valor);
	
	return valor;
}

function comparaDatas(data1, data2) {
	var dataEmissao = data1.split('/');
	var dataVencimento = data2.split('/');
	var d1 = new Date(dataEmissao[2], dataEmissao[1] - 1, dataEmissao[0]);
	var d2 = new Date(dataVencimento[2], dataVencimento[1] - 1, dataVencimento[0]);
	if (d1 > d2) {
		return true;
	} else {
		return false;
	}
}


function validaSomatorioBeneficio(form){
	if(form.getValue('existeRateio') ==  'true'){
		//busca os indices do pai filho
		var indexes = form.getChildrenIndexes("tbBeneficios");
		//percorre os campos do pai
		for (var i = 0; i < indexes.length; i++) {
			var index = indexes[i];
			//Objeto com todos os campos de da linha atual
			var rowTable = {
				codCentroCusto:	'codCentroCustoBeneficio___'+index,
				centroCusto:	'centroCustoBeneficio___'+index,
				valorMovimento:	'valorBeneficio___'+index,
				percentual:		'percentualBeneficio___'+index
			}
			//cria a regra de validação do campo
			campoObrigatorio(form, rowTable.centroCusto, 'Centro de Custo da linha '+i);
			campoObrigatorio(form, rowTable.valorMovimento, 'Valor do Movimento da linha '+i);
			campoObrigatorio(form, rowTable.percentual, 'Percentual de Distribuição da linha '+i);
			
			//Verifica se existe centro de custo não existente no protheus
			if(form.getValue(rowTable.centroCusto).indexOf('CÓDIGO INVALIDO') != -1){
				errorMsg += 'O <b>Centro de Custo na linha '+i+'</b> é invalido.'+lineBreaker;
			}
		}
		
		var valorTotal = converteMoedaFloat(form,form.getValue('valorPgtoGuiaTaxaBoletos'));
		var valorTotalMovimento = converteMoedaFloat(form,form.getValue('somatorioValorBeneficio'));
		if(valorTotal != valorTotalMovimento){
			errorMsg += 'A soma dos <b>valores de movimento</b>('+valorTotalMovimento+'), não pode ser diferente do <b>valor Total</b>('+valorTotal+'). '+lineBreaker;
		}
	}
}

function validaCpfCnpj(form, campo, mensagemCampo) {
	var valorCampo = form.getValue(campo);
	if (valorCampo.length() == 18) {
		var CNPJ = valorCampo;
		switch (validarCNPJ(CNPJ)) {
		case 0:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, não pode ser vazio'+lineBreaker;
			return false;
		case 1:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, deve ter 14 digitos no caso de um CNPJ'+lineBreaker;
			return false;
		case 2:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, não pode ser composto pelo mesmo digito repetido'+lineBreaker;
			return false;
		case 3:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, foi preenchido com um CNPJ inválido'+lineBreaker;
			return false;
		default:
			return true;
		}
	} else if (valorCampo.length() == 14) {
		var CPF = valorCampo;
		switch (validarCPF(CPF)) {
		case 0:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, não pode ser vazio'+lineBreaker;
			return false;
		case 1:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, deve ter 14 digitos no caso de um CPF'+lineBreaker;
			return false;
		case 2:
			errorMsg += 'O campo <b>'+mensagemCampo+'</b>, foi preenchido com um CPF inválido'+lineBreaker;
			return false;
		default:
			return true;
		}
	}
}

/**
 * 
 * @param cnpj
 * @returns {0: Erro de campo CNPJ vazio, 1: Erro de CNPJ com número de digitos
 *          diferente de 14, 2: Erro de CNPJ sempre com o mesmo digito, 3 Erro
 *          de CNPJ inválido}
 */

function validarCNPJ(cnpj) {	
	
	cnpj = new java.lang.String(cnpj).replaceAll("[^0-9]","");
			
    if(cnpj == '') 
    	return 0;     
    

    if (cnpj.length() != 14)
        return 1;

    // Elimina CNPJs com o mesmo número repetido em todos os digitos
    var cnpjPrimeiroDigito = cnpj.substring(0,1);
    var cnpjRepetido = new java.lang.String(cnpj).replaceAll(cnpjPrimeiroDigito ,"");
    if(cnpjRepetido == ""){
        return 2;
    }  
         
    // Valida DVs
    var tamanho = cnpj.length() - 2
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    
    for (var i = tamanho; i >= 1; i--) {
      soma += ('' + numeros)[tamanho - i] * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != ('' + digitos)[0])
        return 3;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += ('' + numeros)[tamanho - i] * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != ('' + digitos)[1])
        return 3;          
    return 4;    
}

/**
 * 
 * @param strCPF
 * @returns {0: Erro de campo de CPF vazio, 1: Erro de CPF com número de digitos
 *          diferente de 11, 2: CPF inválido ou com todos os digitos iguais a 0}
 */
function validarCPF(strCPF) {
	var Soma;
    var Resto;
    Soma = 0;
    strCPF = new java.lang.String(strCPF).replaceAll("[^0-9]","");
      
    if (strCPF == "") return 0;
    
    if (strCPF.length() != 11) return 1;
    
	 // Elimina CPFs com o mesmo número repetido em todos os digitos
    var cpfPrimeiroDigito = strCPF.substring(0,1);
    var cpfRepetido = new java.lang.String(strCPF).replaceAll(cpfPrimeiroDigito ,"");
    if(cpfRepetido == ""){
        return 2;
    } 
	
	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return 2;
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return 2;
    return 3;
}


/*
 * - Validação de código do Filial
 * - Validação de código do Centro de Custo
 * - Validação de código do Fornecedor
 * - Validação de duplicidade nas contas da Guiando
 */
function verificaCamposGuiando(form){
	
	//Entra na função apenas se for via Web Service	
	if(form.getValue("viaWebService") == "true"){				
		
		//Validação de código do filial
		var codFilial = form.getValue("filial_protheus");
		log.info("CODIGO FILIAL  WS: " + codFilial);
		
		if(codFilial.length() != 5){
			errorMsg += "O código da filial deve conter 5 digitos. Favor verificar!"; 
		}
		
		var listDsFilial = [];
		listDsFilial.push(DatasetFactory.createConstraint('CODIGO', codFilial, codFilial, ConstraintType.MUST));	
		var ds_filial = DatasetFactory.getDataset('ds_filial', null, listDsFilial, null);
		
		if(ds_filial.rowsCount == 0){
			errorMsg += "O código da filial " + codFilial + " não existe. Favor verificar!";
		}
		
		//Validação de código do Centro de Custo
		var codCentroCusto = form.getValue("CTT_CUSTO");
		if(codCentroCusto.length() != 8){
			errorMsg += "O código do centro de custo deve conter 8 digitos. Favor verificar!"; 
		}
		
		var listDsCentroCusto = [];
		listDsCentroCusto.push(DatasetFactory.createConstraint('CODIGO', codCentroCusto, codCentroCusto, ConstraintType.MUST));	
		var ds_centroCusto = DatasetFactory.getDataset('ds_centroCusto', null, listDsCentroCusto, null);
		
		for (var c = 0; c < ds_centroCusto.rowsCount; c++){			
			if(ds_centroCusto.getValue(c, "CODIGO") == ""){
				errorMsg += "O código do centro de custo " + codCentroCusto + " não existe. Favor verificar!";
			}
		}	
		
		//Validação de código do Fornecedor
		var codFornecedorGuiando = form.getValue("A2_COD");		
		var cnpjGuiando = form.getValue("cnpjFornecedor");
		cnpjGuiando = new java.lang.String(cnpjGuiando).replaceAll("[^0-9]","");
		
		if(codFornecedorGuiando.length() != 6){
			errorMsg += "O código do fornecedor deve conter 6 digitos."; 
		}
		
		var listDsFornecedor = [];
		listDsFornecedor.push(DatasetFactory.createConstraint('CODIGO', codFornecedorGuiando, codFornecedorGuiando, ConstraintType.MUST));	
		var ds_fornecedor = DatasetFactory.getDataset('ds_fornecedor', null, listDsFornecedor, null);
	
		for (var f = 0; f < ds_fornecedor.rowsCount; f++){
			
			if(ds_fornecedor.getValue(f, "CODIGO") == ""){
				errorMsg += "O código de fornecedor " + codFornecedorGuiando + " não existe. Favor verificar!";
			}
			
			if(ds_fornecedor.getValue(f, "CODIGO") == codFornecedorGuiando && ds_fornecedor.getValue(f, "CGC") != cnpjGuiando){
				log.info("CNPJ COM ERRO");
				errorMsg += "O número do CNPJ " + cnpjGuiando + " não confere com o código do fornecedor " + codFornecedorGuiando + "!";
	        }
		}
				
		//Validação de duplicidade nas contas da Guiando		
		//Consulta workflow de todas as solicitações de pagamento
		var listConstraint = [];
		listConstraint.push(DatasetFactory.createConstraint('status', '0', '0', ConstraintType.MUST));
		listConstraint.push(DatasetFactory.createConstraint('cardIndexDocumentId', '1201341', '1201341', ConstraintType.MUST));
		listConstraint.push(DatasetFactory.createConstraint('active', true, true, ConstraintType.MUST));
		var ds_WorkflowProcess = DatasetFactory.getDataset('workflowProcess', ['workflowProcessPK.processInstanceId'], listConstraint, null);
		
		listConstraint = [];	
		for (var i = 0; i < ds_WorkflowProcess.rowsCount; i++){
			listConstraint.push(DatasetFactory.createConstraint("codSolicitacao", ds_WorkflowProcess.getValue(i, "workflowProcessPK.processInstanceId"), ds_WorkflowProcess.getValue(i, "workflowProcessPK.processInstanceId"), ConstraintType.SHOULD));
		}
		
		//Filtra as solictações de pagamento pelo Cód Solicitação
		listConstraint.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST));
		var ds_solicitacaoDePagamentos = DatasetFactory.getDataset('ds_solicitacaoDePagamentos', ['idContaGuiando','codSolicitacao', 'viaWebService'], listConstraint, null);
	
		//Verifica se existe duplicidade do Identificador Conta Guiando
		for (var j = 0; j < ds_solicitacaoDePagamentos.rowsCount; j++){
			if(ds_solicitacaoDePagamentos.getValue(j, "idContaGuiando") == form.getValue("idContaGuiando")){
				errorMsg += "Erro de duplicidade. O ID " + form.getValue("idContaGuiando") + " desta conta, foi enviada anteriormente!";
	        	}
			}
		}
}