function servicetask25(attempt, message) {


    log.info("@@@ Entrou no EVENTO BPM");   
    
    var codigoGrupo = hAPI.getCardValue("codGrupoAux");


    var indices = getChildrenIndexes('manter');
 
    for (var i = 0; i < indices.length; i++) {
          
    var flagAux  = hAPI.getCardValue('manter___'+indices[i]);
    var idPrograma =hAPI.getCardValue('idGrupoPk___' + indices[i])

    if (flagAux == "on") {

        var c0 = DatasetFactory.createConstraint('tipo', "DELETE" ,"DELETE" ,ConstraintType.MUST);
        var c1 = DatasetFactory.createConstraint('cod_grupo', codigoGrupo ,codigoGrupo ,ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('idPrograma', idPrograma ,idPrograma ,ConstraintType.MUST);
        
        var dsGrupo = DatasetFactory.getDataset('SGA-atualiza_tabela_programa', null, [c0,c1,c2],null);


        log.info("@@@ Dados DELETE"+ [c0,c1,c2]);

     }

    }     

                    // INSERT GRUPOS

    var indices2 = getChildrenIndexes('manterTwo');

    for (var i = 0; i < indices2.length; i++) {
          
    var flagAux   = hAPI.getCardValue('manterTwo___'+indices2[i]);

    var codGrupoAux   = hAPI.getCardValue('codGrupoAux');
    var nomeGrupo     = hAPI.getCardValue('nomeGrupo');
    var gestorGrupo   = hAPI.getCardValue('gestorGrupo');
    var codPrograma   = hAPI.getCardValue('nomeProgAuxTwo___'+indices2[i]);
    var codGrupoPk    = hAPI.getCardValue('codGrupoAux'); 
    var idProgPk      = hAPI.getCardValue('idProgPk___'+indices2);    

    var c0 = DatasetFactory.createConstraint('tipo', "INSERT" ,"INSERT" ,ConstraintType.MUST);
    
    var c1 = DatasetFactory.createConstraint('cod_grupo', codGrupoAux ,codGrupoAux ,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('nomeGrupo', nomeGrupo ,nomeGrupo ,ConstraintType.MUST);    
    var c3 = DatasetFactory.createConstraint('gestorGrupo', gestorGrupo ,gestorGrupo ,ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('codPrograma', codPrograma ,codPrograma ,ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint('codGrupoPk', codGrupoPk ,codGrupoPk ,ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint('idProgPk', idProgPk ,idProgPk ,ConstraintType.MUST);

    
    
    var dsGrupo = DatasetFactory.getDataset('SGA-atualiza_tabela_programa', null, [c0,c1,c2,c3,c4,c5,c6],null);

           log.info("@@@ Dados DELETE"+ [c0,c1,c2,c3,c4,c5,c6]);




    }

  

//     try {
//         var serviceProvider = ServiceManager.getService('WSEXECBO');
//         var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
//         var service = serviceLocator.getWebServiceExecBOPort();
//         var bloqueio = hAPI.getCardValue("bloquear");

//         var token = service.userLogin("super");
//         log.info('>>> servicetask17 token: ' + token);

//         var params = [] ;
//         var jsonParams;

     

//         var params = [] ;
//         var jsonParams;

//  //else {

//             var param1 = [
//                 'cod_usuario',
//                 'cod_grp_usuar',
//                 'cod_prog_dtsul',
//                 'acao',
//                 ];

//             var fields = createFields(param1);      

//             log.info('>>> indices Inicio ');
            
            
//             var indices = getChildrenIndexes('MANTER');
//             var records = [];

//             log.info('>>> indices: ' + indices);
//             var aux = 0;
            
//             for (var i = 0; i < indices.length; i++) {
                
//                 log.info('@@@ idusuario: ' + hAPI.getCardValue('codGest'));
//                 log.info('@@@ GrupoCod: ' + hAPI.getCardValue('codDoGrupo'));
//                 log.info('@@@ Manter: ' + hAPI.getCardValue('manter___' + indices[i]));
//                 log.info('@@@ Cod Programa: ' + hAPI.getCardValue('nomeProgAux___' + indices[i]));

//                 records[i] = {};
//                 records[i]['cod_usuario'] = '"' + hAPI.getCardValue('codGest') + '"';
//                 records[i]['cod_grp_usuar'] = '"' + hAPI.getCardValue('codDoGrupo') + '"';
//                 records[i]['cod_prog_dtsul'] = '"' + hAPI.getCardValue('nomeProgAux___'+indices[i]) + '"';
//                 records[i]['acao'] = (hAPI.getCardValue('manter___'+indices[i]) == 'on') ? 'INC' : 'ESC' ;
                   
//                 aux = i;
//             }
                      
//             log.info('@@@ indice disso aqui: ' + aux);            
//             var auxTwo = 0;
//             var indices = getChildrenIndexes('MANTERTWO');
//             for (var j = 0; j < indices.length; j++) {
              
//               auxTwo = j;             
//               log.info('@@@ indice 2 disso aqui no for : ' + auxTwo);   
//                 log.info('@@@ indice disso aqui no for: ' + aux);                
//                 var auxSun = aux + auxTwo;
//                 log.info('@@@ somador : ' + auxSun);                       
//                 log.info('@@@ idusuario 2: ' + hAPI.getCardValue('codGest'));
//                 log.info('@@@ GrupoCod 2: ' + hAPI.getCardValue('codDoGrupo'));
//                 log.info('@@@ Manter 2 : ' + hAPI.getCardValue('manterTwo___' + indices[j]));
//                 log.info('@@@ Cod Programa 2 : ' + hAPI.getCardValue('nomeProgAuxTwo___' + indices[j]));
                
//                 records[auxSun] = {};
//                 records[auxSun]['cod_usuario'] = '"' + hAPI.getCardValue('codGest') + '"';
//                 records[auxSun]['cod_grp_usuar'] = '"' + hAPI.getCardValue('codDoGrupo') + '"';
//                 records[auxSun]['cod_prog_dtsul'] = '"' + hAPI.getCardValue('nomeProgAuxTwo___'+indices[j]) + '"';
//                 records[auxSun]['acao'] = (hAPI.getCardValue('manterTwo___'+indices[j]) == 'on') ? 'INC' : 'ESC' ;

//           }
         





//             var temptable = {
//                     'name': "ttProgramaGrupo", 
//                     'fields': fields,
//                     'records': records                
//             };

//             var retorno = {
//                     'dataType': 'character',
//                     'name': 'retorno',
//                     'value': '',
//                     'type': 'output'
//             };

//             var capa = {
//                     'name': 'ttGrupoUsuario',
//                     'type': 'input',
//                     'dataType': 'temptable',
//                     'value': temptable
//             };



//             params.push(capa, retorno);
            
//             jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );

//        // }


// //      var jsonParams = JSON.stringify(params).replace( /[\\]["]/g, '' );
        
//             log.info('>>> Parametros da procedure: ' + jsonParams);
//             var resp = service.callProcedureWithToken(token, "esp/essec005b.p", "piProgramaGrupo", jsonParams);
//             log.info('### resp: ' + resp);
        
        
//             var respObj = JSON.parse(resp);    
//             log.info('' + respObj[0].value);

//     } catch(error) { 
//         log.error(error);
//         throw error;
//     }
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

    
    log.info('@@@ NUMERO DO PROCESSO : ' + getValue("WKNumProces"));

    var dados = hAPI.getCardData(getValue("WKNumProces"));
    var entries = dados.entrySet().iterator();
    var indexes = [];

    while (entries.hasNext()) {
        var e = entries.next();
        log.info('>>> fieldName : ' + fieldName);
        log.info('>>> e.getKey(): ' + e.getKey());
        if (e.getKey().match(fieldName + "___")) {
//          if (e.getKey().startWith(fieldName + "___")) {
//          log.info('@@@ getChildrenIndexes indice: ' + e.getKey().split("___")[1]);
            indexes.push(e.getKey().split("___")[1])
        }
    }
    return indexes;
};
