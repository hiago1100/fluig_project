function beforeStateEntry(sequenceId){
    
    var getTodayString = function() {
        var hoje = new Date();
        var m = hoje.getMonth() + 1;
        var d = hoje.getDate();
        
        if (m < 10) m = '0' + m;
        if (d < 10) d = '0' + d;
        
        return d + '/' + m + '/' + hoje.getFullYear();
    };
    
    
    var appendHistorico = function(historico, campos) {
        var childData = new java.util.HashMap();
        
        for (campo in campos) {
            childData.put(campo, campos[campo]);
        }
        
        hAPI.addCardChild(historico, childData);
    };
   
        
    if (sequenceId == 70) {
    	var aprovacao = hAPI.getCardValue('cpAprovarFolha');
    	var cpNomCorre = hAPI.getCardValue('cpNomCorre'),
    	cpDtCorrecao = hAPI.getCardValue('cpDtCorrecao'), 
    	cpParCorrePara = hAPI.getCardValue('cpParCorrePara'),
    	cpAprovarFolha = hAPI.getCardValue('cpAprovarFolha'),
    	Dpto;
    	
    	if (aprovacao != '0' && aprovacao != '1' && cpNomCorre!="") {
    	
    	if(cpAprovarFolha=="RS"){
    		Dpto = "Solicitante"
    	}if(cpAprovarFolha=="RC"){
    		Dpto = "Controle"
    	}if(cpAprovarFolha=="RP"){
    		Dpto = "Planejamento"
    	}if(cpAprovarFolha=="RT"){
    		Dpto = "Tesouraria"
    	}if(cpAprovarFolha=="RTI"){
    		Dpto = "TI"
    	}
            var dadosHistorico = {
            	RespCorrecaoHist: cpNomCorre,
            	DataCorrecaoHist: cpDtCorrecao,
            	AreaCorrecaoHist: Dpto,
            	ObsCorrecaoHist: cpParCorrePara
            };
            
            appendHistorico('tbHistCorrecao', dadosHistorico);
            
            hAPI.setCardValue('RespCorrecaoHist', '');
            hAPI.setCardValue('DataCorrecaoHist', '');
            hAPI.setCardValue('AreaCorrecaoHist', '');
            hAPI.setCardValue('DataCorrecaoHist', '');
            
        }
    }
    
}