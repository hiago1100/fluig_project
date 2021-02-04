function insereTituloProtheus(){
	//informa ao objeto de WS se o valor está sendo rateado para a geração correta do xml
	var rateado = (hAPI.getCardValue("existeRateio") == "true") ? true : false;
	var objPreTitulo = new objWS('OncoclinicasCriacaoTitulos', 'WSINTIPG', rateado);
	//Estrutura o xml com os dados obtidos
	montaXMLNovo(objPreTitulo,'1');
	var retorno = objPreTitulo.executar();
	return retorno;
}
function removeTiTuloProtheus(){
	var rateado = (hAPI.getCardValue("existeRateio") == "true") ? true : false;
	var objPreTitulo = new objWS('OncoclinicasCriacaoTitulos', 'WSINTIPG', rateado);
	//Estrutura o xml com os dados obtidos
	montaXMLNovo(objPreTitulo,'3');
	var retorno = objPreTitulo.executar();
	return retorno;		
}

function montaXMLNovo(objPreTitulo, operacao) {
	var rateado = (hAPI.getCardValue("existeRateio") == "true") ? true : false;
	//Busca os valores do hmtl
	var filiaProtheus = hAPI.getCardValue("filial_protheus");
	var valorTotalTitulo = formataMoeda(hAPI.getCardValue("valorPgtoGuiaTaxaBoletos"));
	var centroDeCusto = hAPI.getCardValue("CTT_CUSTO");
	var fornecedor = hAPI.getCardValue("A2_COD");
	var tipo = hAPI.getCardValue("codTipoLancamento");
	//Os prefixos dos títulos incluidos automaticamente devem ser iguais aos tipos, exceto nos casos de pagamento internacional
	//que devem ser "CAM".
	var prefixo = tipo;
	if(hAPI.getCardValue('compraExterior') == 'sim'){
		prefixo = 'CAM';
	}
	var loja = hAPI.getCardValue('lojaFornecedor');
	var historia = removeAcentos(new java.lang.String(hAPI.getCardValue("historico")));
	var dataEmissao = formataDataFormulario(new Date());
	var dataVencimento = hAPI.getCardValue("dtDeVencPgtoGuiaTaxaBoletos");
	var naturezaGeral = hAPI.getCardValue("zoomNatureza").split("-")[0].trim();
	var codTributoGps = hAPI.getCardValue("codTributoGPS");
	var cgcTrib = new java.lang.String(hAPI.getCardValue("cgcTributo")).replaceAll("[^0-9]","");
	var vlrOutrasEntidades = formataMoeda(hAPI.getCardValue("vlrOutEntidades"));
	if (vlrOutrasEntidades == 0){
		//Para valores iguais a 0 eles devem ser convertidos para String, caso contrário
		//o JavaScript o reconhece como valor vazio e não permite a integração com o protheus
		vlrOutrasEntidades = '0';
	}
	var codRetencao = hAPI.getCardValue("zoomCodRetencao").split("-")[0].trim();
	var dtApuracao = hAPI.getCardValue("dataApuracao");
	var geraDirf = (hAPI.getCardValue("cbGeraDirf") == "S") ? 1 : 2;
	var tipoTributo = hAPI.getCardValue("tipoTributo");
	var idFluig = getValue("WKNumProces");
	var dtCriacao =  formataDataProtheus(new Date());
	var hrCriacao = formataHoraProtheus(new Date());
	var multnat ='2';
	var parcela ='1'; //1 = Gravação, Multnat sempre vai ser 1, parcela sempre vai ser 1
	var tipoLancamento = hAPI.getCardValue('zoomTipolancamento');
	var numeroDocumento = hAPI.getCardValue('numeroDocumento');
	var dataPagamento = hAPI.getCardValue('dtDePgtoGuiaTaxaBoletos');
	var moeda = validaMoeda(hAPI.getCardValue('sMoeda'));
	
	//Operação 3 = Remover titulo do protheus
	if(operacao === '3'){
		if(numeroDocumento != ''){
			objPreTitulo.setListaCabec('E2_NUM',numeroDocumento);
		}else{
			throw 'Impossível apagar o título no Protheus sem o número do documento.';
		}
	}else if(operacao !== '1'){//Operação 1 = Inserção de Título no Protheus
		throw 'Erro ao inserir título no Protheus. Número da operação inválido.';
	}
	
	//"De/Para" para traduzir os valores dos dados de tipo de tributo que serã incluidos no protheus
	//O tipo de tributo de valor 6 no Protheus não existe tradução, provavelmente trata-se de um registro antigo que não é utilizado mais.
	if(tipoTributo == 'ISS/IPTU/OUTROS'){
		tipoTributo = '1';
	} else if(tipoTributo == 'IPV'){
		tipoTributo = '2';
	} else if(tipoTributo == 'DRJ'){
		tipoTributo = '3';
	} else if(tipoTributo == 'FGT'){
		tipoTributo = '4';
	} else if(tipoTributo == 'GNR'){
		tipoTributo = '5';
	}
	
	if(tipoLancamento == 'GPS'){

		objPreTitulo.setListaCabec('E2_CODTRIB',codTributoGps);
		objPreTitulo.setListaCabec('E2_CGCTRIB',cgcTrib);
		objPreTitulo.setListaCabec('E2_COMPET',dtApuracao);
		objPreTitulo.setListaCabec('E2_ZPERIOD',dtApuracao);
		
	} else if(tipoLancamento == 'FGTS'){

		objPreTitulo.setListaCabec('E2_CGCTRIB',cgcTrib);
		objPreTitulo.setListaCabec('E2_ZTPTRIB',tipoTributo);
		objPreTitulo.setListaCabec('E2_COMPET',dtApuracao);
		objPreTitulo.setListaCabec('E2_ZPERIOD',dtApuracao);
		
	} else if (tipoLancamento == 'DARF'){

		objPreTitulo.setListaCabec('E2_CGCTRIB',cgcTrib);
		objPreTitulo.setListaCabec('E2_CODRET',codRetencao);
		objPreTitulo.setListaCabec('E2_COMPET',dtApuracao);
		objPreTitulo.setListaCabec('E2_ZPERIOD',dtApuracao);
		objPreTitulo.setListaCabec('E2_DIRF',geraDirf);
		
	} else if (tipoLancamento == 'IPTU'){

		objPreTitulo.setListaCabec('E2_CGCTRIB',cgcTrib);
		objPreTitulo.setListaCabec('E2_ZTPTRIB',tipoTributo);
		
	}	
	
	//Cria os campos xml passando os valores
	objPreTitulo.setListaCabec('E2_PREFIXO',prefixo);
	objPreTitulo.setListaCabec('E2_FILIAL',filiaProtheus);
	objPreTitulo.setListaCabec('E2_TIPO',tipo);
	objPreTitulo.setListaCabec('E2_NATUREZ',naturezaGeral);
	objPreTitulo.setListaCabec('E2_FORNECE',fornecedor);
	objPreTitulo.setListaCabec('E2_EMISSAO',dataEmissao);
	objPreTitulo.setListaCabec('E2_VALOR',valorTotalTitulo);
	objPreTitulo.setListaCabec('E2_ZVALENT',vlrOutrasEntidades);
	objPreTitulo.setListaCabec('E2_CCD',centroDeCusto);
	objPreTitulo.setListaCabec('E2_CCUSTO',centroDeCusto); // glpi-148704
	objPreTitulo.setListaCabec('E2_LOJA',loja);
	objPreTitulo.setListaCabec('E2_HIST',historia);
	objPreTitulo.setListaCabec('E2_ZIDFLG',idFluig);
	objPreTitulo.setListaCabec('E2_ZDTINT',dtCriacao);
	objPreTitulo.setListaCabec('E2_ZHRINT',hrCriacao);
	objPreTitulo.setListaCabec('E2_PARCELA',parcela);
	if(rateado){
		var multnat = '1';
	} else {
		var multnat = '2';
	}
	objPreTitulo.setListaCabec('E2_MULTNAT',multnat);
	objPreTitulo.setListaCabec('E2_MOEDA',moeda.codigo);
	objPreTitulo.setListaCabec('E2_TXMOEDA',moeda.taxa);
	
	//Verifica se o titulo foi pago após o vencimento, para preencher os campos Vencimento Original e Vencimento no Protheus
	if(dataPagamento != '' && dataPagamento != null && dataPagamento != undefined){
		objPreTitulo.setListaCabec('E2_VENCORI',dataVencimento);
		objPreTitulo.setListaCabec('E2_VENCTO',dataPagamento);
	} else {
		objPreTitulo.setListaCabec('E2_VENCTO',dataVencimento);
	}
	objPreTitulo.setListaTipo('Titulo');
	objPreTitulo.setListaOperacao(operacao);
	
	if(hAPI.getCardValue('existeRateio') == 'true'){
		//Busca os campos do pai filho do formulario que são correspondentes a despesas 
		var camposNatureza = [{'tag':'EV_PERC','valorTag':'100'}, //Como não há rateio por natureza, a porcentagem é fixa em 100%
							  {'tag':'EV_NATUREZ','valorTag':naturezaGeral},
							  {'tag':'EV_VALOR','valorTag':valorTotalTitulo}]
		
		var campos = new formularioUtils().buscaCamposPaiFilho([{"ref":"valorBeneficio"},{"ref":"codCentroCustoBeneficio"}]);
		objPreTitulo.setListaItens(camposNatureza,campos);	
	}
	hAPI.setCardValue("dataemissaoPgtoGuiaTaxaBoletos", dataEmissao);
}



/**
 * Transforma o objeto do tipo data para uma string no formato de data do protheus
 * @param data Objeto do tipo data  
 * @returns String com a data passada no formato aceito pelo protheus. Retorna Falso se ocorrer algum erro
 */
function formataDataProtheus(data){
	try{
		var ano =  data.getFullYear()
		var mes = data.getMonth();
		mes = parseInt(mes)+1; //Altera o fato do date considerar 0 como janeiro
		mes = (mes < 10) ? "0"+mes : mes;
		var dia = (data.getDate() < 10) ? "0"+data.getDate() :data.getDate();
		var dateResult = ano+""+mes+""+dia;
		return dateResult;
	}catch(err){
		return false;
	}
}

/**
 * Transforma o objeto do tipo data para uma string no formato de data formatado para ser exibido no formulário
 * @param data Objeto do tipo data  
 * @returns String com a data passada no formato dd/mm/aaaa. Retorna Falso se ocorrer algum erro
 */
function formataDataFormulario(data){
	try{
		var ano =  data.getFullYear()
		var mes = data.getMonth();
		mes = parseInt(mes)+1; //Altera o fato do date considerar 0 como janeiro
		mes = (mes < 10) ? "0"+mes : mes;
		var dia = (data.getDate() < 10) ? "0"+data.getDate() :data.getDate();
		var dateResult = dia+"/"+mes+"/"+ano;
		return dateResult;
	}catch(err){
		return false;
	}
}

/**
 * Transforma o objeto do tipo data para uma string no formato de hora do protheus
 * @param data Objeto do tipo data  
 * @returns String com a hora passada no formato aceito pelo protheus. Retorna Falso se ocorrer algum erro
 */
function formataHoraProtheus(data){
	try{
		var hora = data.getHours();
		hora = (hora < 10) ? "0"+hora : hora;
		var minuto = data.getMinutes();
		minuto = (minuto < 10) ? "0"+minuto : minuto;
		var segundos = data.getSeconds();
		segundos = (segundos < 10) ? "0"+segundos : segundos;
		var horaTotal =  hora + ":" + minuto + ":" + segundos
		return horaTotal;
	} catch(err) {
		return false;
	}
}

/**
 * Converte o valor de um campo monetário para o formato aceito pelo Protheus
 * @param valor String do valor informado
 * @returns retorna o valor monetário como float
 */
function formataMoeda(valor){
	if(hAPI.getCardValue('sMoeda') == '' || hAPI.getCardValue('sMoeda') == '1' || hAPI.getCardValue('sMoeda') == '3'){
		valor = valor.replace("R$",'');
	} else if (hAPI.getCardValue('sMoeda') == '2'){
		valor = valor.replace("US$",'');
	} else if (hAPI.getCardValue('sMoeda') == '4'){
		valor = valor.replace("€",'');
	} else if (hAPI.getCardValue('sMoeda') == '5'){
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

/**
 * Verifica se aconteceu algum erro na inserção do titulo
 * @param retornoTitulo
 * @returns Se existir erro retorna a mensagem de erro se não existir retorna Sucesso
 */
function verificaErro(retornoTitulo){
	
	var response = retornoTitulo.split("|");
	
	if(response[0] !="1"){
		return response[1];
	}else{
		return "Sucesso"
	}

}

/**
 * Verifica se o codigo retenção informado deve gerar título no protheus. 
 * Os Codigos de Retenção listados a baixo não geram títulos no protheus.
 * @returns {Boolean} True caso deva ser incluido o título e false caso não deva.
 */
function verificaRetencao(){
	var codRetencao = hAPI.getCardValue("zoomCodRetencao");
	var codTributoGps = hAPI.getCardValue("codTributoGPS");
	var codNatureza = hAPI.getCardValue("zoomNatureza").split('-')[0].trim();
	if(codRetencao != "" && codRetencao != null && codRetencao != undefined && codNatureza != '41111012' && codNatureza != '41111011'){
		if(codRetencao == 'N/A' && codTributoGps == "2631"){
			return false;
		}
		codRetencao = codRetencao.split("-")[0].trim();
		if(codRetencao != "0588" &&
		   codRetencao != "1708" &&
		   codRetencao != "2631" &&
		   codRetencao != "3208" &&
		   codRetencao != "3280" &&
		   codRetencao != "5952" &&
		   codRetencao != "5979" &&
		   codRetencao != "5987"){
			return true;
		}
	} else {
	   return false;
	}
}

/**
 * Recebe uma String como paramentro e a retorna sem os acentos
 * @param string
 * @returns
 */
function removeAcentos(string){
	string = string.replaceAll('Á|À|Â|Ã|Ä','A');
	string = string.replaceAll('É|È|Ê|Ë','E');
	string = string.replaceAll('Í|Ì|Î|Ï','I');
	string = string.replaceAll('Ó|Ò|Ô|Õ|Ö','O');
	string = string.replaceAll('Ú|Ù|Û|Ü','U');
	string = string.replaceAll('Ç','C');
	string = string.replaceAll("[^a-zA-Z0-9]", " "); 
	return string
}

function validaMoeda(codigo){
	var moeda = {};
	if(codigo == '' || codigo == null || codigo == undefined || codigo == '1'){
		moeda.codigo = '1';
		moeda.taxa = '1';
	} else {
		var constraint_ds_moeda = DatasetFactory.createConstraint('CODIGO', codigo, codigo, ConstraintType.MUST);
		var ds_moeda = DatasetFactory.getDataset('ds_moeda', null, [constraint_ds_moeda], null);
		moeda.codigo = codigo;
		moeda.taxa = ds_moeda.getValue(0, "VALOR");
	}
	return moeda;
}