function servicetask17(attempt, message) {


    var codigoUsuario = hAPI.getCardValue("idUsuario");
    var indices = getChildrenIndexes('manter');
    
    var solicitante = hAPI.getCardValue("matriculaSolicitante");
    var dataInicio = hAPI.getCardValue("dataSolic");
    var numPrecesso = hAPI.getCardValue("numPrecesso");
    var aprovadorAcao = hAPI.getCardValue("codGest");
    
    var dataInicio = dataInicio.split("/");
    var dia = dataInicio[0];
    var mes = dataInicio[1];
    var ano = dataInicio[2];
    
    dataInicio = ano+"-"+mes+"-"+dia;
    
    
    
    var data = new Date();
    var dia     = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2    = data.getYear();           // 2 dígitos
    var ano4    = data.getFullYear();       // 4 dígitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59
    var mseg    = data.getMilliseconds();   // 0-999
    var tz      = data.getTimezoneOffset(); // em minutos
    
    var dataFim = ano4 + '-' + (mes+1) + '-' +dia ;
    
    log.info("*** solicitante "+ solicitante);
    log.info("*** DATA INICIO "+ dataInicio);
    log.info("*** numPrecesso "+ numPrecesso);
    log.info("*** dataFim "+ dataFim);
    
    
    for (var i = 0; i < indices.length; i++) {
          
	  var flagAux  = hAPI.getCardValue('manter___'+indices[i]);
	  var grupoAux =hAPI.getCardValue('grupoAux___' + indices[i]);
	  var acao = hAPI.getCardValue('nomedoseugrupo___' + indices[i]);
	  var descricaoAcao = hAPI.getCardValue('descGrupoUser___' + indices[i]);
	  
	  acao = acao +" - "+descricaoAcao;
	  
	  if (flagAux == "on") {} else {
		  
	  		var c0 = DatasetFactory.createConstraint('tipo', "DELETE" ,"DELETE" ,ConstraintType.MUST);
            var c1 = DatasetFactory.createConstraint('codigoUsuario', codigoUsuario ,codigoUsuario ,ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint('codGrupo', grupoAux ,grupoAux ,ConstraintType.MUST);
            DatasetFactory.getDataset('SGA-atualiza_tabela_grupo', null, [c0,c1,c2],null);
            
            
            var c3 = DatasetFactory.createConstraint('tipoAcao', "DELETE" ,"DELETE" ,ConstraintType.MUST);
            var c4 = DatasetFactory.createConstraint('solicitante', solicitante ,solicitante ,ConstraintType.MUST);
            var c5 = DatasetFactory.createConstraint('dataInicio', dataInicio ,dataInicio ,ConstraintType.MUST);
            var c6 = DatasetFactory.createConstraint('numPrecesso', numPrecesso ,numPrecesso ,ConstraintType.MUST);
            var c7 = DatasetFactory.createConstraint('dataFim', dataFim ,dataFim ,ConstraintType.MUST);
            var c8 = DatasetFactory.createConstraint('acao', acao ,acao ,ConstraintType.MUST);
            var c9 = DatasetFactory.createConstraint('aprovadorAcao', aprovadorAcao ,aprovadorAcao ,ConstraintType.MUST);
            
            DatasetFactory.getDataset('SGA-cria_log', null, [c3,c4,c5,c6,c7,c8,c9],null);
            


         }

    }			

    // INSERT GRUPOS

    var indices2 = getChildrenIndexes('manterTwo');

    for (var i = 0; i < indices2.length; i++) {
          
		var flagAux   = hAPI.getCardValue('manterTwo___'+indices2[i]);

		var codigoUserErp  = hAPI.getCardValue('codigoERP');
		var grupoAdd 	   = hAPI.getCardValue('nomedoseugrupo2___'+indices2[i]);
		var descGrupo      = hAPI.getCardValue('descGrupoERP___'+indices2[i]);
		var gestGrupo      = hAPI.getCardValue('nomeGestdoGrupo2___'+indices2[i]);
		var codGrupoERP    = hAPI.getCardValue('codGrupoERP___'+indices2[i]); 

		var c0 = DatasetFactory.createConstraint('tipo', "INSERT" ,"INSERT" ,ConstraintType.MUST);
		var c1 = DatasetFactory.createConstraint('codigoUsuario', codigoUsuario ,codigoUsuario ,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('codGrupo', grupoAdd ,grupoAdd ,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint('descGrupo', descGrupo ,descGrupo ,ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint('gestGrupo', gestGrupo ,gestGrupo ,ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint('codigoUserErp', codigoUserErp ,codigoUserErp ,ConstraintType.MUST);
		var c6 = DatasetFactory.createConstraint('codGrupoERP', codGrupoERP ,codGrupoERP ,ConstraintType.MUST);
		
		var dsGrupo = DatasetFactory.getDataset('SGA-atualiza_tabela_grupo', null, [c0,c1,c2,c3,c4,c5,c6],null);



    }




//     var servicoIntegracao = hAPI.getCardValue("servicoIntegracao"); 
//     var urlIntegracao = hAPI.getCardValue("urlIntegracao");
//     var userIntegracao = hAPI.getCardValue("userIntegracao");   

//   try {
//     var serviceProvider = ServiceManager.getService(servicoIntegracao); //Parametro do banco 
//     var serviceLocator = serviceProvider.instantiate(urlIntegracao);    // parametro do banco

//     var service = serviceLocator.getWebServiceExecBOPort();
//     var bloqueio = hAPI.getCardValue("bloquear");

//     var token = service.userLogin(userIntegracao); //Parametro do Banco
    
//     log.info('>>> servicetask17 token: ' + token);

//     var params = [] ;
//     var jsonParams;

//       if(bloqueio == "on"){
//             // Prepara os parametros da procedure a ser chamada no Progress
//             var param1 = {} ;
//             param1.dataType = "character";
//             param1.name = "c_usuario";
//             param1.value = '"' + hAPI.getCardValue("idUsuario")+ '"' ;
//             param1.type = "input";
//             params[0] = param1;
//         
//             var param2 = {};
//             param2.dataType = "character";
//             param2.name = "retorno";
//             param2.value = "";
//             param2.type = "output";
//             params[1] = param2;
      
//       jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
//         
//     } else {

//       var param1 = [
//         'cod_usuario',
//         'cod_grp_usuar',
//         'acao',
//         ];

//       var fields = createFields(param1);    

//       log.info('>>> indices Inicio ');
//       var indices = getChildrenIndexes('MANTER');
//       var records = [];

//       log.info('>>> indices: ' + indices);
//       for (var i = 0; i < indices.length; i++) {
//         var j = 1 + 1;

//         log.info('@@@ idusuario: ' + hAPI.getCardValue('idUsuario'));
//         log.info('@@@ GrupoCod: ' + hAPI.getCardValue('nomedoseugrupo___' + indices[i]));
//         log.info('@@@ Manter: ' + hAPI.getCardValue('manter___' + indices[i]));

//         records[i] = {};
//         records[i]['cod_usuario'] = '"' + hAPI.getCardValue('idUsuario') + '"';
//         records[i]['cod_grp_usuar'] = '"' + hAPI.getCardValue('nomedoseugrupo___'+indices[i]) + '"';
//         records[i]['acao'] = (hAPI.getCardValue('manter___'+indices[i]) == 'on') ? 'INC' : 'ESC' ;
//       }

//       var temptable = {
//           'name': "ttGrupoUsuario", 
//           'fields': fields,
//           'records': records            
//       };

//       var retorno = {
//           'dataType': 'character',
//           'name': 'retorno',
//           'value': '',
//           'type': 'output'
//       };

//       var capa = {
//           'name': 'ttGrupoUsuario',
//           'type': 'input',
//           'dataType': 'temptable',
//           'value': temptable
//       };

//       params.push(capa, retorno);
      
//       jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );

//     }


// //    var jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
    
//     log.info('>>> Parametros da procedure: ' + jsonParams);

//     if(bloqueio == "on"){
//       var resp = service.callProcedureWithToken(token, "esp/secba005b.p", "piBloqueiaUsuario", jsonParams);
//       log.info('### resp: ' + resp);
//     }else{
//       var resp = service.callProcedureWithToken(token, "esp/secba005b.p", "piGrupoUsuario", jsonParams);
//       log.info('### resp: ' + resp);
//     }
    
//     var respObj = JSON.parse(resp);    
//     log.info('??? respObj[0].value: ' + respObj[0].value);

//   } catch(error) { 
//     log.error(error);
//     throw error;
//   }


      

  

}

function createFields(param){
  var fields = [];

  for(i in param) {
    fields[i] = {};
    fields[i]['name'] = param[i];
    fields[i]['label'] = param[i];
    fields[i]['type'] = 'character';
  }

  return fields;
}

function getChildrenIndexes(fieldName){


  var dados = hAPI.getCardData(getValue("WKNumProces"));
  var entries = dados.entrySet().iterator();
  var indexes = [];

  while (entries.hasNext()) {
    var e = entries.next();

    if (e.getKey().match(fieldName + "___")) {
//      if (e.getKey().startWith(fieldName + "___")) {
//      log.info('@@@ getChildrenIndexes indice: ' + e.getKey().split("___")[1]);
      indexes.push(e.getKey().split("___")[1])
    }
  }
  return indexes;
};
