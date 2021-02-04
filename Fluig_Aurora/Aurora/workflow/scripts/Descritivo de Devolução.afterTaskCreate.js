function afterTaskCreate(colleagueId){
	
//	log.info("*** ENTROU NO afterTaskCreate ");
	
//	var atividade = getValue('WKCurrentState');
//	
//	colleagueId = "Pool:Role:DescritivoDevolucao_EncontroNotas";
//	
//	if(atividade == 44){
//		
//		log.info("*** ENTROU NO IF ");
//		
//        var dataset = DatasetFactory.getDataset("prazo_dev", null, null, null);
//        
//        log.info("@@ DATA DO DATA SET : "+ dataset.getValue(0, "prazo_canc_dev"));
//		       
//        log.info("***dataset "+ dataset.values.length);
//        var dias =  parseInt(dataset.getValue(0, "prazo_canc_dev"));
//        
//        var dataAtual = new Date();            
//        var previsao = new Date();
//
//        previsao.setDate(dataAtual.getDate()+ dias );  		
//        var n = 0;
//        if(previsao.getDate() < 10 && (previsao.getMonth() + 1) <10 ){
//        	n = "0"+previsao.getDate()  +"/" +"0"+(previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() < 10 && (previsao.getMonth() + 1) >10 ){
//        	n = "0"+previsao.getDate()  +"/" + (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() > 10 && (previsao.getMonth() + 1) <10 ){
//        	n = previsao.getDate()  +"/" +"0"+ (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() > 10 && (previsao.getMonth() + 1) >10 ){
//        	n = previsao.getDate()  +"/" + (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        
//        
//        console.log("@@ DIAS SOMADOS : "+n);
//
//        var numeroDaSolicitacao = getValue('WKNumProces');
//        var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
//        var responsavelPelaTarefa = colleagueId;
//        
//        log.info("*** responsavelPelaTarefa "+ responsavelPelaTarefa);
//         
//        /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
//           mudando assim as posições das informações dentro do array */
//         
//        / Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript /
//        var arrayPrazoConclusao = n.split("/");
//        var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
//        var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
//        var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
//         
//        var horaDoPrazo = (8*60*60) - 1; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja, 
//        o prazo de conclusão vai ser até o último segundo do dia informado no formulário */
//         
//        // Cria a data no Javascript
//        var dataDoPrazo = new Date();
//        dataDoPrazo.setDate(dia);
//        dataDoPrazo.setMonth(mes);
//        dataDoPrazo.setFullYear(ano);
//         
//        // Altera o prazo de conclusão
//        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
//		
//	}
//	
//	if(atividade == 50){
//		
//		log.info("*** ENTROU NO IF ");
//		
//        var dataset = DatasetFactory.getDataset("prazo_dev", null, null, null);
//        
//        log.info("@@ DATA DO DATA SET : "+ dataset.getValue(0, "prazo_canc_dev"));
//		       
//        log.info("***dataset "+ dataset.values.length);
//        var dias =  parseInt(dataset.getValue(0, "prazo_susp_dev"));
//        
//        var dataAtual = new Date();            
//        var previsao = new Date();
//
//        previsao.setDate(dataAtual.getDate()+ dias );  		
//        var n = 0;
//        if(previsao.getDate() < 10 && (previsao.getMonth() + 1) <10 ){
//        	n = "0"+previsao.getDate()  +"/" +"0"+(previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() < 10 && (previsao.getMonth() + 1) >10 ){
//        	n = "0"+previsao.getDate()  +"/" + (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() > 10 && (previsao.getMonth() + 1) <10 ){
//        	n = previsao.getDate()  +"/" +"0"+ (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        if(previsao.getDate() > 10 && (previsao.getMonth() + 1) >10 ){
//        	n = previsao.getDate()  +"/" + (previsao.getMonth() + 1)+ "/" + previsao.getFullYear();
//        }
//        
//        
//        console.log("@@ DIAS SOMADOS : "+n);
//
//        var numeroDaSolicitacao = getValue('WKNumProces');
//        var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
//        var responsavelPelaTarefa = responsavelPelaTarefa;
//         
//        /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
//           mudando assim as posições das informações dentro do array */
//         
//        / Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript /
//        var arrayPrazoConclusao = n.split("/");
//        var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
//        var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
//        var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
//         
//        var horaDoPrazo = (8*60*60) - 1; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja, 
//        o prazo de conclusão vai ser até o último segundo do dia informado no formulário */
//         
//        // Cria a data no Javascript
//        var dataDoPrazo = new Date();
//        dataDoPrazo.setDate(dia);
//        dataDoPrazo.setMonth(mes);
//        dataDoPrazo.setFullYear(ano);
//         
//        // Altera o prazo de conclusão
//        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
//		
//	}
	
		
}