function beforeStateLeave(sequenceId){

	if(sequenceId == 15 || sequenceId == 16){
		//setPercent();
		setSellType();
		updateValuesFromDataset();
		setNF();
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

    log.info("$$$$ removeNull value1 "+value1);
    log.info("$$$$ removeNull value2 "+value2);
    log.info("$$$$ removeNull value3 "+value3);
    log.info("$$$$ removeNull value4 "+value4);

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



    var dataset = DatasetFactory.getDataset('ds_AtualizaInfoParam', null, [], null);

    var PorcentCalculo1Parc     = hAPI.getCardValue("cpPorcentCalculo1Parc");
    var PorcentCalculo2Parc     = hAPI.getCardValue("cpPorcentCalculo2Parc");
    var PorcentCalculoParcUnica = hAPI.getCardValue("cpPorcentCalculoParcUnica");
    var PorcentDemMin           = hAPI.getCardValue("cpPorcentDemMin");
    var PorcentDemMax           = hAPI.getCardValue("cpPorcentDemMax");

    if(dataset.values.length > 0){

        log.info("$$$$ setPercent dataset.length = "+ dataset.values.length);
        
        log.info("$$$$ setPercent PorcentCalculo1Parc ======= "+ PorcentCalculo1Parc);
        log.info("$$$$ setPercent PorcentCalculo2Parc ======= "+ PorcentCalculo2Parc);
        log.info("$$$$ setPercent PorcentCalculoParcUnica === "+ PorcentCalculoParcUnica);
        log.info("$$$$ setPercent PorcentDemMin ============= "+ PorcentDemMin);
        log.info("$$$$ setPercent PorcentDemMax ============= "+ PorcentDemMax);

        log.info("$$$$ setPercent PRIMPARCELA ==== "+ dataset.values[0]['PRIMPARCELA']);
        log.info("$$$$ setPercent SEGPARCELA ===== "+ dataset.values[0]['SEGPARCELA']);
        log.info("$$$$ setPercent PARCELAUNICA === "+ dataset.values[0]['PARCELAUNICA']);
        log.info("$$$$ setPercent DEMANDAMIN ===== "+ dataset.values[0]['DEMANDAMIN']);
        log.info("$$$$ setPercent DEMANDAMAX ===== "+ dataset.values[0]['DEMANDAMAX']);


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

    log.info('$$$$ getCalculation cpNomeImobiliaria ==== '+hAPI.getCardValue("cpNomeImobiliaria"));
    log.info('$$$$ getCalculation permComBRZ =========== '+permComBRZ);
    log.info('$$$$ getCalculation field1 =============== '+field1);
    log.info('$$$$ getCalculation field2 =============== '+field2);
    log.info('$$$$ getCalculation comp ================= '+comp);

    if( hAPI.getCardValue("cpNomeImobiliaria") != "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
        if(comp == '500' || comp == '550' || comp == '530'){
            CalculoFinanciamentoCaixa();
        }else if(comp != '500' && valPago != valLiquid){
            CalculoFinanciamentoBRZ();
        }else if(valPago == valLiquid && todayDate() >= dataBaixa && (field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined)){
            CalculoPagamentoAvista();
        }    
    }else if( hAPI.getCardValue("cpNomeImobiliaria") == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA" && permComBRZ && ((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined))){
        CalculoPagamentoComBRZ();
    }


    log.info('$$$$ getCalculation cpNomeImobiliaria ==== '+hAPI.getCardValue("cpNomeImobiliaria"));

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


    log.info("##### Distratada type ===="+ type );
    log.info("##### Distratada field5 =="+ field5 );

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

    if(type == 'Distratada'){
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

    if(dataset.values.length > 0){

        var cpValorPagoAteMomento 	  = hAPI.getCardValue('cpValorPagoAteMomento');
        var dtAgregacao 			  = hAPI.getCardValue('dtAgregacao');
        var cpValorReferenciaComissao = hAPI.getCardValue('cpValorReferenciaComissao');
        var slStatusUnidade 		  = hAPI.getCardValue('slStatusUnidade');
        var cpValorPagoAteMomento 	  = hAPI.getCardValue('cpValorPagoAteMomento');
        var dataChave 				  = hAPI.getCardValue("cpDataChaves");

        log.info("$$$$ updateValuesFromDataset DATASET DATAAGREGACAO "+dataset.getValue(0, "DATAAGREGACAO"));

        

        if(dtAgregacao != dataset.getValue(0, "DATAAGREGACAO") ){
            hAPI.setCardValue('dtAgregacao', dataset.getValue(0, "DATAAGREGACAO"));                  // atualiza a data de agregacao
        }

        if(cpValorReferenciaComissao != dataset.getValue(0, "VALORREFCOMISSAO") ){
            hAPI.setCardValue('cpValorReferenciaComissao', dataset.getValue(0, "VALORREFCOMISSAO")); // atualiza o valor referencia
        }

        if(slStatusUnidade != dataset.getValue(0, "SITUACAOCONTRATO")){
            hAPI.setCardValue('slStatusUnidade', dataset.getValue(0, "SITUACAOCONTRATO"));           // atualiza o status da venda
        }

        if(cpValorPagoAteMomento != dataset.getValue(0, "VALORBAIXADO")){
            hAPI.setCardValue('cpValorPagoAteMomento', dataset.getValue(0, "VALORBAIXADO"));         // atualiza o valor pago
        }

        if(dataChave != dataset.getValue(0, "DATAENTREGAAP")){
            hAPI.setCardValue('cpDataChaves', dataset.getValue(0, "DATAENTREGAAP"));                 // atualiza a data da entrega das chaves para finalizar o fluxo
        }

    }
}

function setNF(){
	var NF1ParcelaComissaoFake     = hAPI.getCardValue("cpNF1ParcelaComissaoFake");
    var NF2ParcelaComissaoFake     = hAPI.getCardValue("cpNF2ParcelaComissaoFake");
    var NFParcelaBonificacaoFake   = hAPI.getCardValue("cpNFParcelaBonificacaoFake");
    var NFParcelaDemandaMinimaFake = hAPI.getCardValue("cpNFParcelaDemandaMinimaFake");
    var NFParceladeMandaMaximaFake = hAPI.getCardValue("cpNFParceladeMandaMaximaFake");

    var NF1ParcelaComissao     	   = hAPI.getCardValue("cpNF1ParcelaComissao");
    var NF2ParcelaComissao     	   = hAPI.getCardValue("cpNF2ParcelaComissao");
    var NFParcelaBonificacao   	   = hAPI.getCardValue("cpNFParcelaBonificacao");
    var NFParcelaDemandaMinima 	   = hAPI.getCardValue("cpNFParcelaDemandaMinima");
    var NFParceladeMandaMaxima 	   = hAPI.getCardValue("cpNFParceladeMandaMaxima");

    var Valor1ParcelaComissao      = hAPI.getCardValue("cpValor1ParcelaComissao");
    var Valor2ParcelaComissao      = hAPI.getCardValue("cpValor2ParcelaComissao");
    var ValorParcelaBonificacao    = hAPI.getCardValue("cpValorParcelaBonificacao");
    var ValorParcelaDemandaMinima  = hAPI.getCardValue("cpValorParcelaDemandaMinima");
    var ValorParceladeMandaMaxima  = hAPI.getCardValue("cpValorParceladeMandaMaxima");


    if(!NF1ParcelaComissao 	  && NF1ParcelaComissaoFake     && Valor1ParcelaComissao     && Valor1ParcelaComissao != "0.00"     && Valor1ParcelaComissao != "0,00"){
    	hAPI.setCardValue("cpNF1ParcelaComissao", NF1ParcelaComissaoFake);
    }else{
    	hAPI.setCardValue("cpNF1ParcelaComissaoFake", "");
    }
    if(!NF2ParcelaComissao 	  && NF2ParcelaComissaoFake     && Valor2ParcelaComissao     && Valor2ParcelaComissao != "0.00"     && Valor2ParcelaComissao != "0,00"){
    	hAPI.setCardValue("cpNF2ParcelaComissao", NF2ParcelaComissaoFake);
    }else{
    	hAPI.setCardValue("cpNF2ParcelaComissaoFake", "");
    }
    if(!NFParcelaBonificacao   && NFParcelaBonificacaoFake   && ValorParcelaBonificacao   && ValorParcelaBonificacao != "0.00"   && ValorParcelaBonificacao != "0,00"){
    	hAPI.setCardValue("cpNFParcelaBonificacao", NFParcelaBonificacaoFake);
    }else{
    	hAPI.setCardValue("cpNFParcelaBonificacaoFake", "");
    }
    if(!NFParcelaDemandaMinima && NFParcelaDemandaMinimaFake && ValorParcelaDemandaMinima && ValorParcelaDemandaMinima != "0.00" && ValorParcelaDemandaMinima != "0,00"){
    	hAPI.setCardValue("cpNFParcelaDemandaMinima", NFParcelaDemandaMinimaFake);
    }else{
    	hAPI.setCardValue("cpNFParcelaDemandaMinimaFake", "");
    }
    if(!NFParceladeMandaMaxima && NFParceladeMandaMaximaFake && ValorParceladeMandaMaxima && ValorParceladeMandaMaxima != "0.00" && ValorParceladeMandaMaxima != "0,00"){
    	hAPI.setCardValue("cpNFParceladeMandaMaxima", NFParceladeMandaMaximaFake);
    }else{
    	hAPI.setCardValue("cpNFParceladeMandaMaximaFake", "");
    }
}
function CalculoFinanciamentoCaixa() {

    var valorReferencia = 0;

    var porcPriParc = hAPI.getCardValue("cpPorcentCalculo1Parc");
    var porcSegParc = hAPI.getCardValue("cpPorcentCalculo2Parc");
    var valRef      = hAPI.getCardValue('cpValorReferenciaComissao'); 
    var dtvend      = new Date(hAPI.getCardValue('dtVenda') + 'T00:00:00');
    var dtagregacao = new Date(hAPI.getCardValue('dtAgregacao') + 'T00:00:00');

    var field1 = hAPI.getCardValue("cpValor1ParcelaComissao");
    var field2 = hAPI.getCardValue("cpValor2ParcelaComissao");

    log.info('$$$$ CalculoFinanciamentoCaixa porcPriParc ============= '+porcPriParc)
    log.info('$$$$ CalculoFinanciamentoCaixa porcSegParc ============= '+porcSegParc)
    log.info('$$$$ CalculoFinanciamentoCaixa valRef ================== '+valRef)
    log.info('$$$$ CalculoFinanciamentoCaixa dtvend ================== '+dtvend)
    log.info('$$$$ CalculoFinanciamentoCaixa dtagregacao ============= '+dtagregacao)
    log.info('$$$$ CalculoFinanciamentoCaixa field1 ================== '+field1)
    log.info('$$$$ CalculoFinanciamentoCaixa field2 ================== '+field2)


    if(valRef != "0.00" && valRef != "" && valRef != "0"){
    	valorReferencia = valRef;
    }else{
    	valorReferencia = hAPI.getCardValue('cpValorLiquidoVenda');
    }

    log.info('$$$$ CalculoFinanciamentoCaixa valorReferencia ==== '+valorReferencia)

    var Parc = (parseFloat(valorReferencia)*parseFloat(porcPriParc))/100;
    	Parc = Parc.toFixed(2);
    log.info('$$$$ CalculoFinanciamentoCaixa Parc ============= '+Parc)

    // primeira parcela
    if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined || field1 == NaN || field1 == "NaN")){
    	hAPI.setCardValue('cpValor1ParcelaComissao', Parc);
        hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());
    }

    // segunda parcela
    if(dtagregacao && dtagregacao != "Invalid Date" && (field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined || field2 == NaN || field2 == "NaN")){
        var Parc = (parseFloat(valorReferencia)*parseFloat(porcSegParc))/100;
        	Parc = Parc.toFixed(2);
        hAPI.setCardValue('cpValor2ParcelaComissao', Parc);
        hAPI.setCardValue('cpDate2ParcelaComissao', todayDate());

        log.info('$$$$ CalculoFinanciamentoCaixa Parc ============= '+Parc)
    }

}
// Calculo de comissão com financiamanto BRZ
function CalculoFinanciamentoBRZ() {

    var VlRef = 0, Valorpago = 0, PorcVliquido = 0;
    
    var valorPago          = hAPI.getCardValue('cpValorPagoAteMomento');
    var primeiroVlGerado   = hAPI.getCardValue("cp1ValorGerado");
    var primeiroVlPago     = hAPI.getCardValue("cp1ValorPagoCliente");
    var ValorLiquido       = hAPI.getCardValue("cpValorLiquidoVenda");
    var valRefCom          = hAPI.getCardValue('cpValorReferenciaComissao');
 
    var porcPriParc = hAPI.getCardValue("cpPorcentCalculo1Parc");
    var porcSegParc = hAPI.getCardValue("cpPorcentCalculo2Parc");
    var porcParcUni = hAPI.getCardValue("cpPorcentCalculoParcUnica");

    if(ValorLiquido != "" && ValorLiquido != "0.00"){
    	PorcVliquido = parseFloat(ValorLiquido)* 0.20;  // 20 porcento do valor liquido
    }

    if(valRefCom && valRefCom != "0.00" && valRefCom != "0,00" && valRefCom != "0"){
    	VlRef = valRefCom;
    }else{
    	VlRef = hAPI.getCardValue('cpValorLiquidoVenda');
    }

    var dtBaixaRecebimento = hAPI.getCardValue('cpDataBaixaRecebimento').split("-");
        dtBaixaRecebimento = dtBaixaRecebimento[0]+dtBaixaRecebimento[1]+dtBaixaRecebimento[2];

    var date = todayDate();
	    date = date.split("-");
	    date = date[0]+date[1]+date[2];

	log.info("$$$$ CalculoFinanciamentoBRZ todayDate =========== "+todayDate());
    log.info("$$$$ CalculoFinanciamentoBRZ dtBaixaRecebimento == "+dtBaixaRecebimento);
    log.info("$$$$ CalculoFinanciamentoBRZ date ================ "+date);
    log.info("$$$$ CalculoFinanciamentoBRZ field1 ============== "+field1);
    log.info("$$$$ CalculoFinanciamentoBRZ PorcVliquido ======== "+PorcVliquido);
    log.info("$$$$ CalculoFinanciamentoBRZ primeiroVlGerado ==== "+primeiroVlGerado);
    log.info("$$$$ CalculoFinanciamentoBRZ valorPago =========== "+valorPago);
    log.info("$$$$ CalculoFinanciamentoBRZ primeiroVlPago ====== "+primeiroVlPago);
    log.info("$$$$ CalculoFinanciamentoBRZ ValorLiquido ======== "+ValorLiquido);


    var field1 = hAPI.getCardValue("cpValor1ParcelaComissao");
    var field2 = hAPI.getCardValue("cpValor2ParcelaComissao");

    // parcela unica
    if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined  || field1 == NaN || field1 == "NaN") && parseFloat(primeiroVlPago) != parseFloat(ValorLiquido) && parseFloat(primeiroVlPago) >= parseFloat(PorcVliquido) && parseInt(date) >= parseInt(dtBaixaRecebimento)){ // Parcela única

        var prcl = (parseFloat(VlRef)*porcParcUni)/100;
        	prcl = prcl.toFixed(2);

        hAPI.setCardValue('cpValor1ParcelaComissao', prcl);
        hAPI.setCardValue("cpDate1ParcelaComissao", todayDate() );
        hAPI.setCardValue("dtAgregacao", todayDate() );
        hAPI.setCardValue("cpConfirmParcelUnic", "true");


        log.info('$$$$ CalculoFinanciamentoBRZ parcela unica prcl ==== '+prcl)

    }else{  
        // primeira parcela
        if((field1 == "" || field1 == null || field1 == " " || field1 == "undefined" || field1 == undefined   || field1 == NaN || field1 == "NaN") && parseFloat(primeiroVlGerado) < parseFloat(PorcVliquido)){ // Calcula a primeira parcela
            
            var prcl = (parseFloat(VlRef)*parseFloat(porcPriParc))/100;
            	prcl = prcl.toFixed(2);

            hAPI.setCardValue('cpValor1ParcelaComissao', prcl);
            hAPI.setCardValue("cpDate1ParcelaComissao", todayDate());

            log.info('$$$$ CalculoFinanciamentoBRZ 1 parcela prcl ==== '+prcl)

        }
    
        // segunda parcela
        if((field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined || field2 == NaN || field2 == "NaN") && parseFloat(primeiroVlGerado) < parseFloat(PorcVliquido) && parseFloat(valorPago) >= parseFloat(PorcVliquido)){ // Calcula a segunda parcela

            hAPI.setCardValue('cpValor2ParcelaComissao', "");
            hAPI.setCardValue('cpDate2ParcelaComissao', "");
            var prcl = (parseFloat(VlRef)*parseFloat(porcSegParc))/100;
            	prcl = prcl.toFixed(2);
            
            hAPI.setCardValue('cpValor2ParcelaComissao', prcl);
            hAPI.setCardValue('cpDate2ParcelaComissao', todayDate());
            hAPI.setCardValue('dtAgregacao', todayDate());

            log.info('$$$$ CalculoFinanciamentoBRZ 2 parcela prcl ==== '+prcl)

        } 
    }
    
    log.info('$$$$ CalculoFinanciamentoBRZ PorcVliquido ==== '+PorcVliquido)
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

    log.info('$$$$ CalculoPagamentoAvista pagamento a vista prcl ==== '+prcl);
    
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
        log.info('$$$$ CalculoComissaoMinMax demanda min val ==== '+val);
    }
    if(tipo == 'max' && (field2 == "" || field2 == null || field2 == " " || field2 == "undefined" || field2 == undefined   || field2 == NaN || field2 == "NaN")){
        var val = (parseFloat(valorRef) * parseFloat(percentMax))/100;
        	val = val.toFixed(2);

        hAPI.setCardValue("cpValorParceladeMandaMaxima", val);
        hAPI.setCardValue("cpDateDemandaMax", todayDate());
        log.info('$$$$ CalculoComissaoMinMax demanda max val ==== '+val);
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
    hAPI.setCardValue("cpDateBonus", todayDate());

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

	log.info('$$$$ CalculoTotalComissoes valPriParc ===== '+ valPriParc);
	log.info('$$$$ CalculoTotalComissoes valSegParc ===== '+ valSegParc);
	log.info('$$$$ CalculoTotalComissoes valBonus ======= '+ valBonus);
	log.info('$$$$ CalculoTotalComissoes valDemMin ====== '+ valDemMin);
	log.info('$$$$ CalculoTotalComissoes valDemMax ====== '+ valDemMax);

    var total = parseFloat(valPriParc) + parseFloat(valSegParc) + parseFloat(valBonus) + parseFloat(valDemMin) + parseFloat(valDemMax);
    	total = total.toFixed(2);

    hAPI.setCardValue('cpValorTotalDeComissao', total);

    log.info('$$$$ CalculoTotalComissoes total ==== '+total);

}
function CalculoComissoesFifty() { // CALCULA O TOTAL DE COMISSÃO 

    // comissao 
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

    log.info('$$$$ CalculoComissoesFifty total ==== '+total);

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