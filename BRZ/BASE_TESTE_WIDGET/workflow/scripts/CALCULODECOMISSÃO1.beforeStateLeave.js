function beforeStateLeave(sequenceId){

	if(sequenceId == 15 || sequenceId == 16){
		setSellType();
		updateValuesFromDataset();

        if(hAPI.getCardValue("slStatusUnidade") != "Distratada"){
		  setNF();
        }

        removeNull();
		getCalculation();
	}

}
function removeNull(){
    
    var value1 = hAPI.getCardValue("dtAgregacao");
    var value2 = hAPI.getCardValue("slFifty");
    var value3 = hAPI.getCardValue("cpDataChaves");
    var value4 = hAPI.getCardValue("cpDataBaixaRecebimento");
    var value5 = hAPI.getCardValue("cpValorReferenciaComissao");

    if(value1 == null || value1 == "null"){
        hAPI.setCardValue("dtAgregacao", "");
    }
    if(value2 == null || value2 == "null"){
        hAPI.setCardValue("slFifty", "");
    }
    if(value3 == null || value3 == "null"){
        hAPI.setCardValue("cpDataChaves", "");
    }
    if(value4 == null || value4 == "null"){
        hAPI.setCardValue("cpDataBaixaRecebimento", "");
    }

    if(value5 == null || value5 == "null"){
        hAPI.setCardValue("cpValorReferenciaComissao", "0");
    }
}

function setPercent(){


    // var query = "SELECT * FROM FLUIG_TESTE.DBO.FLUIG_PARAMETROS_PERCENTUAIS";
    // var c1 = DatasetFactory.createConstraint('where', query, query, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('ds_AtualizaInfoParam', null, [], null);

    var PorcentCalculo1Parc     = hAPI.getCardValue("cpPorcentCalculo1Parc");
    var PorcentCalculo2Parc     = hAPI.getCardValue("cpPorcentCalculo2Parc");
    var PorcentCalculoParcUnica = hAPI.getCardValue("cpPorcentCalculoParcUnica");
    var PorcentDemMin           = hAPI.getCardValue("cpPorcentDemMin");
    var PorcentDemMax           = hAPI.getCardValue("cpPorcentDemMax");

    if(dataset.values.length > 0){
        hAPI.setCardValue("cpPorcentCalculo1Parc", dataset.values[0]['PRIMPARCELA']);
        hAPI.setCardValue("cpPorcentCalculo2Parc", dataset.values[0]['SEGPARCELA']);
        hAPI.setCardValue("cpPorcentCalculoParcUnica", dataset.values[0]['PARCELAUNICA']);
        hAPI.setCardValue("cpPorcentDemMin", dataset.values[0]['DEMANDAMIN']);
        hAPI.setCardValue("cpPorcentDemMax", dataset.values[0]['DEMANDAMAX']);
    }
}

function setSellType(){
	var comp      = hAPI.getCardValue("cpTipoVendaCod");
    var valPago   = hAPI.getCardValue("cp1ValorPagoCliente");
    var valLiquid = hAPI.getCardValue("cpValorLiquidoVenda");
    var dataBaixa = hAPI.getCardValue("cpDataBaixaRecebimento");


    if(comp == '500' || comp == '550' || comp == '530'){
    	hAPI.setCardValue("cpTipoVenda", 'Financiamento CEF');
    }

    if(comp != '500' && valPago != valLiquid){
    	hAPI.setCardValue("cpTipoVenda", 'Financiamento BRZ');
    }

    if(valPago == valLiquid){
    	hAPI.setCardValue("cpTipoVenda", 'Pagamento à vista');
    }

    if( hAPI.getCardValue("cpNomeImobiliaria") == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
        hAPI.setCardValue("cpTipoVenda", 'BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA');
        hAPI.setCardValue("cpTipoVendaCod", '');
    }

    if(hAPI.getCardValue("slFifty") == null || hAPI.getCardValue("slFifty") == "null" ){
    	hAPI.setCardValue("slFifty", "N");
    }
    if(hAPI.getCardValue("cpDataChaves") == null || hAPI.getCardValue("cpDataChaves") == "null" ){
    	hAPI.setCardValue("cpDataChaves", "");
    }

    if(hAPI.getCardValue("cpNomeImobiliaria") == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
        hAPI.setCardValue("cpTipoVendaCod", "");
    }
}

function getCalculation(){
	var comp      = hAPI.getCardValue('cpTipoVendaCod');
    var valPago   = hAPI.getCardValue("cp1ValorPagoCliente");
    var valLiquid = hAPI.getCardValue("cpValorLiquidoVenda");
    var dataBaixa = hAPI.getCardValue("cpDataBaixaRecebimento");

    var field1 = hAPI.getCardValue("cpValor1ParcelaComissao");
    var field2 = hAPI.getCardValue("cpValorParcelaDemandaMinima");
    var field3 = hAPI.getCardValue("cpValorParceladeMandaMaxima");

    var permComBRZ = hAPI.getCardValue("cpPermiteComBRZ");

    if( hAPI.getCardValue("cpNomeImobiliaria") != "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
        if(comp == '500'){
            CalculoFinanciamentoCaixa();
        }else if(comp != '500' && valPago != valLiquid){
            CalculoFinanciamentoBRZ();
        }else if(valPago == valLiquid && todayDate() >= dataBaixa && (field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined)){
            CalculoPagamentoAvista();
        }    
    }else if( hAPI.getCardValue("cpNomeImobiliaria") == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA" && permComBRZ && ((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined))){
        CalculoPagamentoComBRZ();
    }


    var min = hAPI.getCardValue("cpPermiteDemandaMin");
    var max = hAPI.getCardValue("cpPermiteDemandaMax");

    if(min == "true" && (field2 == "" || field2 == undefined || field2 == null)) {
    	CalculoComissaoMinMax("min");
    }
    if(max == "true" && (field3 == "" || field3 == undefined || field3 == null)) {
    	CalculoComissaoMinMax("max");
    }

    //CALCULA Bonus 
    var bonusPermission = hAPI.getCardValue("cpPermComiCorrOnline");
    var bonusPercent    = hAPI.getCardValue("cpPorcentComiCorrOnline");
    var type 			= hAPI.getCardValue("slStatusUnidade");
    var field5 			= hAPI.getCardValue("cpValordeDistrato") || 0;

    var perBonus = hAPI.getCardValue("cpPermiteComBRZ");
    if(perBonus == "true") CalculaBonus();


    var fifty = hAPI.getCardValue("slFifty");

    if(fifty == "S"){
    	CalculoComissoesFifty();
    }else{
    	CalculoTotalComissoes();
    }
    
    var atualizacao = hAPI.getCardValue("cpVerificaAtualizacao");
    if(!atualizacao ){
    	hAPI.setCardValue("cpVerificaAtualizacao", "true");
    }

    var valDistrato = hAPI.getCardValue("cpValordeDistrato");

    if(type == 'Distratada' && (!valDistrato || valDistrato == null || valDistrato == "null" || valDistrato == undefined || valDistrato == "undefined" || valDistrato == ''  || valDistrato == ' ') ){

        var total = hAPI.getCardValue("cpValorTotalDeComissao").trim();
        var premio = hAPI.getCardValue("cpValorParcelaBonificacao").trim();
        
        if (!total || total == "" || total == undefined || total == null || total == "undefined" || total == "null" || total == NaN || total == 0 || total == "NaN") premio = 0;
        if (!premio || premio == "" || premio == undefined || premio == null || premio == "undefined" || premio == "null" || premio == NaN || premio == 0 || premio == "NaN") premio = 0;

        var distrato = parseFloat(total) - parseFloat(premio);
            distrato = distrato.toFixed(2);

        hAPI.setCardValue("cpValordeDistrato", distrato);
        hAPI.setCardValue("cpDateDistrato", todayDate());
    } 
}

function updateValuesFromDataset(){

	var numVenda  = hAPI.getCardValue("cpNumeroVenda");
    var numUnida  = hAPI.getCardValue("cpUnidade");
    var numBloco  = hAPI.getCardValue("cpBloco");
    var numEmpCod = hAPI.getCardValue("cpEmpreendimentoCod");

    var query   = "WHERE NUM_VENDA='"+numVenda+"'";
    var c1      = DatasetFactory.createConstraint('where', query, query, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('ds_AtualizaInfoVenda', null, [c1], null);

    var cpValorPagoAteMomento     = hAPI.getCardValue('cpValorPagoAteMomento');
    var cpValorReferenciaComissao = hAPI.getCardValue('cpValorReferenciaComissao');
    var slStatusUnidade           = hAPI.getCardValue('slStatusUnidade');
    var cpValorPagoAteMomento     = hAPI.getCardValue('cpValorPagoAteMomento');
    var dataChave                 = hAPI.getCardValue("cpDataChaves");
    var cod                       = hAPI.getCardValue("cpTipoVendaCod");


    for(i=0; i<dataset.values.length; i++){

        // atualiza a data de agregacao
        var DATAAGREGACAO = dataset.getValue(i, "DATAAGREGACAO").trim();
        if(DATAAGREGACAO && DATAAGREGACAO != null && DATAAGREGACAO != "null" && DATAAGREGACAO != undefined && DATAAGREGACAO != "undefined" && DATAAGREGACAO != " " && DATAAGREGACAO != ""){
            DATAAGREGACAO = DATAAGREGACAO.split("-");
            DATAAGREGACAO = DATAAGREGACAO[0]+DATAAGREGACAO[1]+DATAAGREGACAO[2];
        }

        var dtAgregacao = hAPI.getCardValue('dtAgregacao');
        if(dtAgregacao && dtAgregacao != null && dtAgregacao != "null" && dtAgregacao != undefined && dtAgregacao != "undefined" && dtAgregacao != " " && dtAgregacao != ""){
            dtAgregacao = dtAgregacao.split("-");
            dtAgregacao = dtAgregacao[0]+dtAgregacao[1]+dtAgregacao[2];
        }

        var d = dataset.getValue(i, "DATAAGREGACAO").trim()
        if((d != null && d != "null" && d != undefined && d != "undefined" && d != " " && d != "") && (cod == '500' || cod == 500)){
            if((dtAgregacao == "" || dtAgregacao == " " || dtAgregacao == null || dtAgregacao == "null" || dtAgregacao == "undefined" || dtAgregacao == undefined) && parseInt(dtAgregacao) < parseInt(DATAAGREGACAO) || (dtAgregacao != DATAAGREGACAO && DATAAGREGACAO != null && DATAAGREGACAO != "null" && DATAAGREGACAO != undefined && DATAAGREGACAO != "undefined")){
                hAPI.setCardValue('dtAgregacao', dataset.getValue(i, "DATAAGREGACAO"));
            }    
        }
    
        // atualiza o valor referencia
        var VALORREFCOMISSAO = dataset.getValue(i, "VALORREFCOMISSAO");

        if(cpValorReferenciaComissao != VALORREFCOMISSAO && VALORREFCOMISSAO != 0 && VALORREFCOMISSAO != "0" && VALORREFCOMISSAO != null && VALORREFCOMISSAO != "null" ){
            hAPI.setCardValue('cpValorReferenciaComissao', VALORREFCOMISSAO);
        }

        // atualiza o status da venda
        var SITUACAOCONTRATO = dataset.getValue(i, "SITUACAOCONTRATO");
        if(slStatusUnidade != SITUACAOCONTRATO && (SITUACAOCONTRATO == "Efetivada" || SITUACAOCONTRATO == "Quitada" || SITUACAOCONTRATO == "Distratada")){
            hAPI.setCardValue('slStatusUnidade', SITUACAOCONTRATO);
        }

        // atualiza o valor pago
        var VALORBAIXADO = dataset.getValue(i, "VALORBAIXADO");
        if(cpValorPagoAteMomento != VALORBAIXADO && VALORBAIXADO != 0 && VALORBAIXADO != "0" && VALORBAIXADO != null && VALORBAIXADO != "null"){
            hAPI.setCardValue('cpValorPagoAteMomento', VALORBAIXADO);
        }

        // atualiza a data da entrega das chaves para finalizar o fluxo
        var DATAENTREGAAP = dataset.getValue(i, "DATAENTREGAAP");
        if(DATAENTREGAAP && DATAENTREGAAP != null){
            DATAENTREGAAP = DATAENTREGAAP.split("-");
            DATAENTREGAAP = DATAENTREGAAP[0]+DATAENTREGAAP[1]+DATAENTREGAAP[2];
        }

        if(parseInt(dataChave) < parseInt(DATAENTREGAAP) || dataChave != DATAENTREGAAP && DATAENTREGAAP != null && DATAENTREGAAP != "null"){
            hAPI.setCardValue('cpDataChaves', dataset.getValue(i, "DATAENTREGAAP"));
        }

    }
}

function setNF(){
	var NF1ParcelaComissaoFake     = hAPI.getCardValue("cpNF1ParcelaComissaoFake").trim();
    var NF2ParcelaComissaoFake     = hAPI.getCardValue("cpNF2ParcelaComissaoFake").trim();
    var NFParcelaBonificacaoFake   = hAPI.getCardValue("cpNFParcelaBonificacaoFake").trim();
    var NFParcelaDemandaMinimaFake = hAPI.getCardValue("cpNFParcelaDemandaMinimaFake").trim();
    var NFParceladeMandaMaximaFake = hAPI.getCardValue("cpNFParceladeMandaMaximaFake").trim();

    var NF1ParcelaComissao     	   = hAPI.getCardValue("cpNF1ParcelaComissao").trim();
    var NF2ParcelaComissao     	   = hAPI.getCardValue("cpNF2ParcelaComissao").trim();
    var NFParcelaBonificacao   	   = hAPI.getCardValue("cpNFParcelaBonificacao").trim();
    var NFParcelaDemandaMinima 	   = hAPI.getCardValue("cpNFParcelaDemandaMinima").trim();
    var NFParceladeMandaMaxima 	   = hAPI.getCardValue("cpNFParceladeMandaMaxima").trim();

    var Valor1ParcelaComissao      = hAPI.getCardValue("cpValor1ParcelaComissao").trim();
    var Valor2ParcelaComissao      = hAPI.getCardValue("cpValor2ParcelaComissao").trim();
    var ValorParcelaBonificacao    = hAPI.getCardValue("cpValorParcelaBonificacao").trim();
    var ValorParcelaDemandaMinima  = hAPI.getCardValue("cpValorParcelaDemandaMinima").trim();
    var ValorParceladeMandaMaxima  = hAPI.getCardValue("cpValorParceladeMandaMaxima").trim();


    if(!NF1ParcelaComissao || NF1ParcelaComissao == "" || NF1ParcelaComissao == null || NF1ParcelaComissao == "null" || NF1ParcelaComissao == undefined || NF1ParcelaComissao == "undefined"){
        if(NF1ParcelaComissaoFake && Valor1ParcelaComissao && Valor1ParcelaComissao != "0.00" && Valor1ParcelaComissao != "0,00" && Valor1ParcelaComissao != null && Valor1ParcelaComissao != "null" && Valor1ParcelaComissao != undefined && Valor1ParcelaComissao != "undefined" && Valor1ParcelaComissao != " " && Valor1ParcelaComissao != ""){
            hAPI.setCardValue("cpNF1ParcelaComissao", NF1ParcelaComissaoFake);
            hAPI.setCardValue("cpNF1ParcelaComissaoFake", "");
        }else{
            hAPI.setCardValue("cpNF1ParcelaComissaoFake", "");
        }    
    }
    
    if(!NF2ParcelaComissao || NF2ParcelaComissao == "" || NF2ParcelaComissao == null || NF2ParcelaComissao == "null" || NF2ParcelaComissao == undefined || NF2ParcelaComissao == "undefined"){
        if(NF2ParcelaComissaoFake && Valor2ParcelaComissao && Valor2ParcelaComissao != "0.00" && Valor2ParcelaComissao != "0,00" && Valor2ParcelaComissao != null && Valor2ParcelaComissao != "null" && Valor2ParcelaComissao != undefined && Valor2ParcelaComissao != "undefined" && Valor2ParcelaComissao != " " && Valor2ParcelaComissao != ""){
        	hAPI.setCardValue("cpNF2ParcelaComissao", NF2ParcelaComissaoFake);
            hAPI.setCardValue("cpNF2ParcelaComissaoFake", "");
        }else{
        	hAPI.setCardValue("cpNF2ParcelaComissaoFake", "");
        }
    }

    if(!NFParcelaBonificacao || NFParcelaBonificacao == "" || NFParcelaBonificacao == null || NFParcelaBonificacao == "null" || NFParcelaBonificacao == undefined || NFParcelaBonificacao == "undefined"){
        if(NFParcelaBonificacaoFake && ValorParcelaBonificacao && ValorParcelaBonificacao != "0.00" && ValorParcelaBonificacao != "0,00" && ValorParcelaBonificacao != null && ValorParcelaBonificacao != "null" && ValorParcelaBonificacao != undefined && ValorParcelaBonificacao != "undefined" && ValorParcelaBonificacao != " " && ValorParcelaBonificacao != ""){
        	hAPI.setCardValue("cpNFParcelaBonificacao", NFParcelaBonificacaoFake);
            hAPI.setCardValue("cpNFParcelaBonificacaoFake", "");
        }else{
        	hAPI.setCardValue("cpNFParcelaBonificacaoFake", "");
        }
    }

    if(!NFParcelaDemandaMinima || NFParcelaDemandaMinima == "" || NFParcelaDemandaMinima == null || NFParcelaDemandaMinima == "null" || NFParcelaDemandaMinima == undefined || NFParcelaDemandaMinima == "undefined"){
        if(NFParcelaDemandaMinimaFake && ValorParcelaDemandaMinima && ValorParcelaDemandaMinima != "0.00" && ValorParcelaDemandaMinima != "0,00" && ValorParcelaDemandaMinima != null && ValorParcelaDemandaMinima != "null" && ValorParcelaDemandaMinima != undefined && ValorParcelaDemandaMinima != "undefined" && ValorParcelaDemandaMinima != " " && ValorParcelaDemandaMinima != ""){
        	hAPI.setCardValue("cpNFParcelaDemandaMinima", NFParcelaDemandaMinimaFake);
            hAPI.setCardValue("cpNFParcelaDemandaMinimaFake", "");
        }else{
        	hAPI.setCardValue("cpNFParcelaDemandaMinimaFake", "");
        }
    }

    if(!NFParceladeMandaMaxima || NFParceladeMandaMaxima == "" || NFParceladeMandaMaxima == null || NFParceladeMandaMaxima == "null" || NFParceladeMandaMaxima == undefined || NFParceladeMandaMaxima == "undefined"){
        if(NFParceladeMandaMaximaFake && ValorParceladeMandaMaxima && ValorParceladeMandaMaxima != "0.00" && ValorParceladeMandaMaxima != "0,00" && ValorParceladeMandaMaxima != null && ValorParceladeMandaMaxima != "null" && ValorParceladeMandaMaxima != undefined && ValorParceladeMandaMaxima != "undefined" && ValorParceladeMandaMaxima != " " && ValorParceladeMandaMaxima != ""){
        	hAPI.setCardValue("cpNFParceladeMandaMaxima", NFParceladeMandaMaximaFake);
            hAPI.setCardValue("cpNFParceladeMandaMaximaFake", "");
        }else{
        	hAPI.setCardValue("cpNFParceladeMandaMaximaFake", "");
        }
    }
}
function CalculoFinanciamentoCaixa() {

    var valorReferencia = 0;

    var porcPriParc = hAPI.getCardValue("cpPorcentCalculo1Parc").trim();
    var porcSegParc = hAPI.getCardValue("cpPorcentCalculo2Parc").trim();
    var valRef      = hAPI.getCardValue('cpValorReferenciaComissao').trim() 
    var dtvend      = new Date(hAPI.getCardValue('dtVenda') + 'T00:00:00');
    var dtagregacao = hAPI.getCardValue('dtAgregacao').trim();

    var field1 = hAPI.getCardValue("cpValor1ParcelaComissao").trim();
    var field2 = hAPI.getCardValue("cpValor2ParcelaComissao").trim();

    console.info("$$$$ JONATHAN CalculoFinanciamentoCaixa valRef "+ valRef);

    if(valRef != "0.00" && valRef != "" && valRef != "0"  && valRef != 0 && valRef != null && valRef != "null" && valRef != undefined && valRef != "undefined" && valRef != " " && valRef != NaN && valRef != "NaN"){
    	valorReferencia = valRef;
    }else{
    	valorReferencia = hAPI.getCardValue('cpValorLiquidoVenda');
    }

    var Parc = (parseFloat(valorReferencia)*parseFloat(porcPriParc))/100;
    	Parc = Parc.toFixed(2);

    // primeira parcela
    if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined || field1 == NaN || field1 == "NaN")){
    	hAPI.setCardValue('cpValor1ParcelaComissao', Parc);
        hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());
    }

    // segunda parcela
    if((dtagregacao != "" && dtagregacao != null  && dtagregacao != "null"  && dtagregacao != undefined && dtagregacao != "undefined" && dtagregacao != "Invalid Date" && dtagregacao != " ") && (field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined || field2 == NaN || field2 == "NaN")){
        var Parc = (parseFloat(valorReferencia)*parseFloat(porcSegParc))/100;
        	Parc = Parc.toFixed(2);
        hAPI.setCardValue('cpValor2ParcelaComissao', Parc);
        hAPI.setCardValue('cpDate2ParcelaComissao', todayDate());
    }

}
// Calculo de comissão com financiamanto BRZ
function CalculoFinanciamentoBRZ() {

    var VlRef = 0, Valorpago = 0, PorcVliquido = 0;
    
    var valorPago          = hAPI.getCardValue('cpValorPagoAteMomento').trim();
    var primeiroVlGerado   = hAPI.getCardValue("cp1ValorGerado").trim();
    var primeiroVlPago     = hAPI.getCardValue("cp1ValorPagoCliente").trim();
    var ValorLiquido       = hAPI.getCardValue("cpValorLiquidoVenda").trim();
    var valRefCom          = hAPI.getCardValue('cpValorReferenciaComissao').trim();
 
    var porcPriParc = hAPI.getCardValue("cpPorcentCalculo1Parc").trim();
    var porcSegParc = hAPI.getCardValue("cpPorcentCalculo2Parc").trim();
    var porcParcUni = hAPI.getCardValue("cpPorcentCalculoParcUnica").trim();

    if(ValorLiquido != "" && ValorLiquido != "0.00" && ValorLiquido != "0" && ValorLiquido != " " && ValorLiquido != 0 && ValorLiquido != null && ValorLiquido != "null" && ValorLiquido != undefined && ValorLiquido != "undefined"){
    	PorcVliquido = parseFloat(ValorLiquido)* 0.20;  // 20 porcento do valor liquido
    }

    if(valRefCom != "" && valRefCom != "0.00" && valRefCom != "0" && valRefCom != " " && valRefCom != 0 && valRefCom != null && valRefCom != "null" && valRefCom != undefined && valRefCom != "undefined"){
    	VlRef = valRefCom;
    }else{
    	VlRef = hAPI.getCardValue('cpValorLiquidoVenda');
    }

    var dtBaixaRecebimento = hAPI.getCardValue('cpDataBaixaRecebimento').trim();
    if(dtBaixaRecebimento != "" && dtBaixaRecebimento != null  && dtBaixaRecebimento != "null"  && dtBaixaRecebimento != undefined && dtBaixaRecebimento != "undefined" && dtBaixaRecebimento != "Invalid Date" && dtBaixaRecebimento != " "){
        dtBaixaRecebimento = hAPI.getCardValue('cpDataBaixaRecebimento').split("-");
        dtBaixaRecebimento = dtBaixaRecebimento[0]+dtBaixaRecebimento[1]+dtBaixaRecebimento[2];
    }

    var date = todayDate();
	    date = date.split("-");
	    date = date[0]+date[1]+date[2];


    var field1 = hAPI.getCardValue("cpValor1ParcelaComissao").trim();
    var field2 = hAPI.getCardValue("cpValor2ParcelaComissao").trim();

    // Parcela única
    if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined  || field1 == NaN || field1 == "NaN") && parseFloat(primeiroVlPago) != parseFloat(ValorLiquido) && parseFloat(primeiroVlPago) >= parseFloat(PorcVliquido) && parseInt(date) >= parseInt(dtBaixaRecebimento)){

        var prcl = (parseFloat(VlRef)*porcParcUni)/100;
        	prcl = prcl.toFixed(2);

        hAPI.setCardValue('cpValor1ParcelaComissao', prcl);
        hAPI.setCardValue("cpDate1ParcelaComissao", todayDate() );
        hAPI.setCardValue("dtAgregacao", todayDate());
        hAPI.setCardValue("cpConfirmParcelUnic", "true");


    }else{
        // Calcula a primeira parcela     
        if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined   || field1 == NaN || field1 == "NaN") && parseFloat(primeiroVlGerado) < parseFloat(PorcVliquido)){
            var prcl = (parseFloat(VlRef)*parseFloat(porcPriParc))/100;
            	prcl = prcl.toFixed(2);

            hAPI.setCardValue('cpValor1ParcelaComissao', prcl);
            hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());
        }
    
        // Calcula a segunda parcela
        if((field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined || field2 == NaN || field2 == "NaN") && parseFloat(primeiroVlGerado) < parseFloat(PorcVliquido) && parseFloat(valorPago) >= parseFloat(PorcVliquido)){

            hAPI.setCardValue('cpValor2ParcelaComissao', "");
            hAPI.setCardValue('cpDate2ParcelaComissao', "");
            var prcl = (parseFloat(VlRef)*parseFloat(porcSegParc))/100;
            	prcl = prcl.toFixed(2);
            
            hAPI.setCardValue('cpValor2ParcelaComissao', prcl);
            hAPI.setCardValue('cpDate2ParcelaComissao', todayDate());
            
            hAPI.setCardValue('dtAgregacao', todayDate());

        } 
    }
}

function CalculoPagamentoAvista() {  // Calculo comissão para pagamento à vista

    var Valorrefencia = 0;
    var porcParcUni = hAPI.getCardValue("cpPorcentCalculoParcUnica");
    var valRef = hAPI.getCardValue('cpValorReferenciaComissao');
        
    if(!valRef && valRef != "0.00" && valRef != "0"){
    	Valorrefencia = valRef;
    }else{
    	Valorrefencia = hAPI.getCardValue('cpValorLiquidoVenda');
    }
    
    var pcl = (parseFloat(Valorrefencia)*parseFloat(porcParcUni))/100;
    	pcl = pcl.toFixed(2);

    hAPI.setCardValue('cpValor1ParcelaComissao', pcl);
    hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());
    hAPI.setCardValue("dtAgregacao", todayDate());
    hAPI.setCardValue("cpConfirmParcelUnic", "true");
    
}   
function CalculoComissaoMinMax(tipo) {  // Calculo de Comissão Minima e Maxima só informar no parametro tipo  se é Min para minima

    var valorRef = 0;
    var percentMin = hAPI.getCardValue("cpPorcentDemMin");
    var percentMax = hAPI.getCardValue("cpPorcentDemMax");
    var valRefCom  = hAPI.getCardValue('cpValorReferenciaComissao');

    var field1 = hAPI.getCardValue("cpValorParcelaDemandaMinima");
    var field2 = hAPI.getCardValue("cpValorParcelaDemandaMaxima");

    if(valRefCom != "" && valRefCom != "0.00" && valRefCom != "0"){
    	valorRef = valRefCom;
    }else{
    	valorRef = hAPI.getCardValue('cpValorLiquidoVenda');
    }

    if(tipo == 'min' && (field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined   || field1 == NaN || field1 == "NaN")){
        var val = (parseFloat(valorRef) * parseFloat(percentMin))/100;
        	val = val.toFixed(2);

        hAPI.setCardValue("cpValorParcelaDemandaMinima", val);
        hAPI.setCardValue("cpDateDemandaMin", todayDate());
    }
    if(tipo == 'max' && (field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined   || field2 == NaN || field2 == "NaN")){
        var val = (parseFloat(valorRef) * parseFloat(percentMax))/100;
        	val = val.toFixed(2);

        hAPI.setCardValue("cpValorParceladeMandaMaxima", val);
        hAPI.setCardValue("cpDateDemandaMax", todayDate());
    }
    
}
function CalculaBonus() { // Corretor Online Comissão demanda bonus

    var valorRef  = 0;
    var valRefCom = hAPI.getCardValue('cpValorReferenciaComissao');
    var perc      = hAPI.getCardValue('cpPorcentComBRZ');

    if(valRefCom != "" && valRefCom != "0.00" && valRefCom != "0"){
    	valorRef = valRefCom;
    }else{
    	valorRef = hAPI.getCardValue('cpValorLiquidoVenda');
    }
    
    var valor = (parseFloat(valorRef) * parseFloat(perc))/100;
    	valor = valor.toFixed(2);

    hAPI.setCardValue('cpValor1ParcelaComissao', valor);
    hAPI.setCardValue("cpDateComBRZ", todayDate());

}

function CalculoTotalComissoes() { // CALCULA O TOTAL DE COMISSÃO 

    // comissao 
    var valPriParc = 0;
	if(hAPI.getCardValue("cpValor1ParcelaComissao").trim() != "" && hAPI.getCardValue("cpValor1ParcelaComissao").trim() != null && hAPI.getCardValue("cpValor1ParcelaComissao").trim() != " " ){
		valPriParc = hAPI.getCardValue("cpValor1ParcelaComissao");
	}
    var valSegParc = 0;
	if(hAPI.getCardValue("cpValor2ParcelaComissao").trim() != "" && hAPI.getCardValue("cpValor2ParcelaComissao").trim() != null && hAPI.getCardValue("cpValor2ParcelaComissao").trim() != " " ){
		valSegParc = hAPI.getCardValue("cpValor2ParcelaComissao");
	}
    // bonus
    var valBonus = 0;
	if(hAPI.getCardValue("cpValorParcelaBonificacao").trim() != "" && hAPI.getCardValue("cpValorParcelaBonificacao").trim() != null && hAPI.getCardValue("cpValorParcelaBonificacao").trim() != " " ){
		valBonus   = hAPI.getCardValue("cpValorParcelaBonificacao");
	}
    var valDemMin = 0;
	if(hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != "" && hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != null && hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != " " ){
		valDemMin  = hAPI.getCardValue("cpValorParcelaDemandaMinima");
	}
    var valDemMax = 0;
	if(hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != "" && hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != null && hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != " " ){
		valDemMax  = hAPI.getCardValue("cpValorParceladeMandaMaxima");
	}

    var total = parseFloat(valPriParc) + parseFloat(valSegParc) + parseFloat(valBonus) + parseFloat(valDemMin) + parseFloat(valDemMax);
    	total = total.toFixed(2);

    hAPI.setCardValue('cpValorTotalDeComissao', total);

}
function CalculoComissoesFifty() { // CALCULA O TOTAL DE COMISSÃO 

    // comissao 
    var valPriParc = 0;
	if(hAPI.getCardValue("cpValor1ParcelaComissao").trim() != "" && hAPI.getCardValue("cpValor1ParcelaComissao").trim() != null && hAPI.getCardValue("cpValor1ParcelaComissao").trim() != " " ){
		valPriParc = hAPI.getCardValue("cpValor1ParcelaComissao");
	}
    var valSegParc = 0;
	if(hAPI.getCardValue("cpValor2ParcelaComissao").trim() != "" && hAPI.getCardValue("cpValor2ParcelaComissao").trim() != null && hAPI.getCardValue("cpValor2ParcelaComissao").trim() != " " ){
		valSegParc = hAPI.getCardValue("cpValor2ParcelaComissao");
	}
    // bonus
    var valBonus = 0;
	if(hAPI.getCardValue("cpValorParcelaBonificacao").trim() != "" && hAPI.getCardValue("cpValorParcelaBonificacao").trim() != null && hAPI.getCardValue("cpValorParcelaBonificacao").trim() != " " ){
		valBonus   = hAPI.getCardValue("cpValorParcelaBonificacao");
	}
    var valDemMin = 0;
	if(hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != "" && hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != null && hAPI.getCardValue("cpValorParcelaDemandaMinima").trim() != " " ){
		valDemMin  = hAPI.getCardValue("cpValorParcelaDemandaMinima");
	}
    var valDemMax = 0;
	if(hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != "" && hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != null && hAPI.getCardValue("cpValorParceladeMandaMaxima").trim() != " " ){
		valDemMax  = hAPI.getCardValue("cpValorParceladeMandaMaxima");
	}

    if(valPriParc != 0) valPriParc = parseFloat(valPriParc) / 2;
    if(valSegParc != 0) valSegParc = parseFloat(valSegParc) / 2;
    if(valBonus	  != 0) valBonus   = parseFloat(valBonus)   / 2;
    if(valDemMin  != 0) valDemMin  = parseFloat(valDemMin)  / 2;
    if(valDemMax  != 0) valDemMax  = parseFloat(valDemMax)  / 2;

    hAPI.setCardValue("cpValor1ParcelaComissao", valPriParc);
    hAPI.setCardValue("cpValor2ParcelaComissao", valSegParc);
    hAPI.setCardValue("cpValorParcelaBonificacao", valBonus);
    hAPI.setCardValue("cpValorParcelaDemandaMinima", valDemMin);
    hAPI.setCardValue("cpValorParceladeMandaMaxima", valDemMax);

    var total = (parseFloat(valPriParc) + parseFloat(valSegParc) + parseFloat(valBonus) + parseFloat(valDemMin) + parseFloat(valDemMax));
    	total = total.toFixed(2);

    hAPI.setCardValue('cpValorTotalDeComissao', total);

}
function CalculoPagamentoComBRZ(){

    var valorRef = 0;
    var valRefCom = hAPI.getCardValue('cpValorReferenciaComissao');
    var porcentagem = hAPI.getCardValue("cpPorcentComBRZ");

    if(valRefCom && valRefCom != "0.00" && valRefCom != "0,00" && valRefCom != "0"){
    	VlRef = valRefCom;
    }else{
    	VlRef = hAPI.getCardValue('cpValorLiquidoVenda');
    }
    
    var valor = (parseFloat(valorRef) * parseFloat(porcentagem))/100;
    	valor = valor.toFixed(2);

    if(hAPI.getCardValue('cpValor1ParcelaComissao') != "" && hAPI.getCardValue('cpValor1ParcelaComissao') != null && hAPI.getCardValue('cpValor1ParcelaComissao') != " "){
    	hAPI.setCardValue('cpValor1ParcelaComissao', valor);
    	hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());    	
    }
    
}
function todayDate(){
    var nd = new Date();
	var y = nd.getFullYear();
	var m = nd.getMonth() + 1;
	var d = nd.getDate();

	if (d.toString().length == 1) d = "0" + d;
	if (m.toString().length == 1) m = "0" + m;

	var date = y + "-" + m + "-" + d;
	return date;
}