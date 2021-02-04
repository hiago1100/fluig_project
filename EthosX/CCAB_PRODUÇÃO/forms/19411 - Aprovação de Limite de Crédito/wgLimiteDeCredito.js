console.log("PAGINA 2");


var CLIENT = "";
// var userinfo;
            
var init = function () {
            
    // getUsersInfo(); // recebe informações do usuário             
    var gestorCode = selectAprovador(USERID); //preenche campo o código do gestor
    $('#dataatual').val(showDateTodayEua());
    $("#totvsid").val(gestorCode);
    $("#fluigid").val(USERID);
    var manager = checkManager();
        
    if(((gestorCode) || (manager)) || ((CURRENT_STATE != INICIO) && (CURRENT_STATE != 0))){
        var t = buscainfo();     

        // ======================================================
        // DETALHES DA TABELA 
        // ======================================================

        var detailRows = [];
        // $('#exemplo tbody').on( 'click', 'tr td i.details-size', function () {
        $('#exemplo tbody').on( 'click', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = t.row( tr );
            var idx = $.inArray( tr.attr('id'), detailRows );
            var icon = $(tr[0]).find('i');
    
            if ( row.child.isShown() ) {
                tr.removeClass( 'details' );
                row.child.hide();

                $(icon[0]).addClass("fluigicon-plus-sign");
                $(icon[0]).removeClass("fluigicon-minus-sign");
    
                // Remove from the 'open' array
                detailRows.splice( idx, 1 );
                
            }
            else {
                tr.addClass( 'details' );
                row.child( format( row.data() ) ).show();

                $(icon[0]).removeClass("fluigicon-plus-sign");
                $(icon[0]).addClass("fluigicon-minus-sign");
                $(tr).next().css( "background-color", "#f3feed" );

                // Add to the 'open' array
                if ( idx === -1 ) {
                    detailRows.push( tr.attr('id') );
                }
                
            }
        } );
    
        // On each draw, loop over the `detailRows` array and show any child rows
        t.on( 'draw', function () {
            $.each( detailRows, function ( i, id ) {
                $('#'+id+' td.details-control').trigger( 'click' );            
            } );
        } );

        // ============================================================================

            
        $('#busca').change(function(){
            buscainfo();
            removeSelecionados();        
        });
    }    
    else{
        FLUIGC.toast({            
            message: 'Não existem aprovações de acordo com a sua permissão',
            type: 'info'
        });
    }
    
    
    getBodyWidth();

    // =================================================================

    if (CURRENT_STATE  == INICIO || CURRENT_STATE  == 0) {}
    else if (CURRENT_STATE == APROVN2) {
        $("#divBuscaGrupo").addClass('hide');
    }
    else{
        $("#divTbResultados").removeClass('hide');
        $("#tbInfoTb").addClass('hide');
        $("#divBuscaGrupo").addClass('hide');
        changeFielInLabel('input');
        changeFielInLabel('span');
    }
}

function getBodyWidth() {        
    
    var body = $('body').width();                
    // $("#busca").val(body);

    if (body == 0) {
        setTimeout(getBodyWidth, 500);
    } else {
        if (body <= 900) {
            $("input[type=checkbox]").addClass('tdcheckbox');
            $(".mobile").removeAttr('class');                 
        }            
    }
}

var buscainfo  = function(){
    CLIENT = $("#busca").val();
    var t = busca();        
    return t;
}

var saveApprov = function(){                
    var aprov = $('input[name=aprovacao]:checked');

    if (aprov.length > 0) {
        
        $(aprov).each(function(){
            // CODIGO DO CRÉDITO
            var codigo = $(this).val();
            
            // COMPARAÇÃO DOS VALORES
            var tr = $(this).parent().parent()[0];
            var td = $(tr).find('td')[3];    
            var limite = $(td).find('input')[0];
            limite = $(limite).val();
            var origem = $(td).find('input')[1];
            origem = $(origem).val();

            // VALOR 
            var valor = (origem != limite) ? limite : " ";

            $(tr).remove();            

        });

        countAll();
        $("#valorSelecionado").text(formatter.format(0.0));

        FLUIGC.toast({            
            message: 'Aprovação realizada com sucesso',
            type: 'success'
        });
        
        // createNotification();        

    }
    else{
        FLUIGC.toast({            
            message: 'Selecionar item',
            type: 'warning'
        });
    }
    
}

var getUsersInfo = function(){                    
    $.ajax(
        '/api/public/2.0/users/getCurrent', {
        method: 'GET',
        dataType: 'json',
        async: false,
        contentType: 'application/json'
    })
    .done(function(data) {          
        // código a ser executado em caso de sucesso                      
        userinfo = data.content;
    })
    .error(function(oError) {
        console.log(oError);
    });
}

var createNotification = function(){
    var data = { 
        "eventKey" : "DOCUMENT_APPROVED", //REQUIRED String that represents the event who generates the alert 
        "loginReceiver" : userinfo.login, //REQUIRED User login (alias, idpId or userCode) who will receive the alert 
        "priority" : "HIGH", // Options: NONE (Doesn't send notification), LOW, NORMAL and HIGH 
        "object" : { // the object of the alert, such as document, post, image or process 
            "alertObjectId" : "1", // the unique id number of the object 
            "alertObjectTypeDescriptionKey" : "sociable.the.task", // description of the object type 
            "alertObjectDescription" : "Aprovação de limite de crédito" + " ", // the object description showed in the alert 
            "alertObjectLink" : "/limite-de-credito", // the link to access the object 
            "alertObjectDetailKey" : " ", // (OPTIONAL) details of the key 
            "alertObjectNote" : "" // (OPTIONAL) the object note for extra information, it allows up to 600 characters 
        },
        "place" : { // (OPTIONAL) where the alert took action, such as communities, timeline, and so on... 
            "alertObjectId" : "1", // the unique id number of the object 
            "alertObjectDescription" : "Widget Limite de crédito", // where the notification took place 
            "alertObjectLink" : "/limite-de-credito", // the link to access the place where the notification took place 
            "alertObjectDetailKey" : " " 
        },
        "metadata" : {"FIRST-NAME" : userinfo.firstName, "SURNAME" : userinfo.lastName}
    };
            
    $.ajax(
        "/api/public/alert/service/sendNotification", {
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(data),
    })    
    .done(function(data) {                
        // código a ser executado em caso de sucesso                      
        console.log(data);                
    })
    .error(function(error) {
            console.log(error);                                    
    });   
}

var countSelected  = function(){
    var aprov = $('input[name=aprovacao]:checked');
    var tam = aprov.length;
    $("#selecionado").html(tam+" <br> selecionados");
    showValuesSelected();
    countAll();
}

var showValuesSelected = function(){
    var aprov = $('input[name=aprovacao]:checked');
    var valor = 0;

    $(aprov).each(function(){
        var input = $(this);        
        var tr = $(input).parent().parent()[0];
        var td = $(tr).find('td')[2];                            
        valor += $(td).text();

       
    });
    
    valor = converteMoeda("2",valor);
     console.log("SABER O VALOR DA PAGINA 2  ********************* "+ valor);
    $("#valorSelecionado").text(valor);
} 

var countAll  = function(){
    var valores = $('input[name=aprovacao]');
    var sum = 0;
        
    $(valores).each(function() {
        var input = $(this);        
        var tr = $(input).parent().parent()[0];
        var td = $(tr).find('td')[2];    
        input = $(td).text();
         sum += convertToFloat(input);
    });

    sum = converteMoeda("2",sum);

    console.log("SABER O VALOR DA PAGINA sum  ********************* "+ sum);

    $("#valor").text(sum);
}

var selectAprovador = function (userid) {
    var c1 = [];
    // userid = "47338453153";
    
    if(userid == "47338253153" || userid == "44209840823"){
        userid = 47338453153;
    }
        
    c1.push(DatasetFactory.createConstraint("CCPF", userid, userid, ConstraintType.MUST));     
    var data = DatasetFactory.getDataset("ds_consultaAprovadoresDeCredito", null, c1,  null); 
    var resul  = data.values;
    var user = null;

    if(resul.length > 0){
        for (let i = 0; i < resul.length; i++) {        
            var cpf = data.values[i]['CCPF'].replace(".","");
            if (cpf = userid) {
                user = data.values[i]['CCODIGO'];
            }
        }
    }
    else{
        FLUIGC.toast({            
            message: 'Usuário não encontrado como gestor no Protheus, entre em contato com a T.I.',
            type: 'warning'
        });   
    }
    
    return user;

}

var addRow = function (e) {

    // VERIFICA SE CAMPO ESTA SELECIONADO
    var checked = $(e).is(':checked');                 
    if (checked) {

        // COLUNA DE APROVAÇÃO
        var input = $(e)[0]; 
        var tr = $(input).parent().parent()[0]; 
        var tdaprov = $(tr).find('td')[0];    
        var iptaprov = $(tdaprov).find('input')[0];
        var vlaprov = $(iptaprov).val();    
        
        //COLETA OUTRAS INFORMAÇÕES              
        var iptdetails =  $(tdaprov).find('input')[1];
        var iptdetv = $(iptdetails).val();
        var obj = JSON.parse(iptdetv);
        
        // VERIFICA JÁ FOI SELECIONADO ANTES
        var check = checkAprov(vlaprov, obj["SAFRA"]);    
        if (!check) {        
            // ADICIONA TABELA
            var index = wdkAddChild('itensCredito');     
        }    
        else{
            var tdindex = $(tr).find('td')[1];         
            var iptindex =  $(tdindex).find('input')[0];
            var index = $(iptindex).val();
        }   
            
        // COLUNA DE APROVAÇÃO                  
        $("#"+"tdaprovacao"+"___"+index).val(vlaprov);

        // COLUNA DE BRUPO DE APROVACAO
        var tdsafra = $(tr).find('td')[1];     
        var vlsafra = $(tdsafra).text();
        $("#"+ "tdgrpvenda" +"___"+index).val(vlsafra);

        //COLUNA COM INFORMAÇÕES DE DETALHES        
        $("#"+ "tdsafra" +"___"+index).val(obj["SAFRA"]);
        $("#"+ "tdlmtdisponivel" +"___"+index).val(obj["LIMITEDISPONIVEL"]);
        $("#"+ "tdpdbloqueado" +"___"+index).val(obj["PEDIDOSBLOQUEADOS"]);
        $("#"+ "tdpdliberado" +"___"+index).val(obj["PEDIDOSLIBERADOS"]);
        $("#"+ "tdsldduplicado" +"___"+index).val(obj["SALDODUPLICATAS"]);
        $("#"+ "tdlmtclean" +"___"+index).val(obj["LIMITECLEAN"]);
        $("#"+ "tdpdcarteira" +"___"+index).val(obj["PEDIDOSCARTEIRA"]);
        $("#"+ "tdcropline" +"___"+index).val(obj["CROPLINE"]);
        $("#"+ "tdslvencido" +"___"+index).val(obj["SALDOVENCIDO"]);

        //ADICIONA INDEX -> 
        var iptindex =  $(tdsafra).find('input')[0];
        $(iptindex).val(index);
                        
        // COLUNA DE LIMITE CALCULADO
        var tdcliente = $(tr).find('td')[2];     
        var vlcliente = $(tdcliente).text();
        $("#"+ "tdlmtcalculado" +"___"+index).val(vlcliente);
        $("#"+ "tdgrpvenda" +"___"+index).val(vlsafra);
        
    }    
    else{
        var input = $(e)[0]; 
        var tr = $(input).parent().parent()[0]; 

        var tdsafra = $(tr).find('td')[1]; 
        var iptindex =  $(tdsafra).find('input')[0];
        var index = $(iptindex).val();        
        
        $("#tdaprovacao___" + index).parent().parent().remove();
        $(iptindex).val("");

        FLUIGC.toast({            
            message: 'Aprovação removida',
            type: 'warning'
        });     
        
    }

}

function removeSelecionados(){

	$("input[name^=tdaprovacao___]").each(function () {
		var tr = $(this).parent().parent();
		$(tr).remove();
	});

}

var checkAprov = function(valor, safra){
    var ret = false;

    $("input[name^=tdaprovacao___]").each(function() {               
        if (valor == $(this).val()) {
            
            // COLETA INFO DE SAFRA
            var name = $(this).attr('id').split('___');
            var index = name[name.length - 1];
            csafra = $("#" + "tdsafra" + "___" + index).val();
                        
            if (csafra == safra) {
                var name = $(this).attr('id');
                var id = name.split("_");
                id = id[id.length - 1];                        
                ret = id;            
            }            
            
        }
    });

    return ret;
}


// ===================================
// MODAL INFORMAÇÕES COMPLEMENTARES
// ===================================

var modalShowFields =  function (e){

    var input = $(e)[0]; 
    var tr = $(input).parent().parent()[0]; 
        
    //COLUNA COM INFORMAÇÕES DE DETALHES
    var td = $(tr).find('td')[0];       
    var iptdetails =  $(td).find('input')[1];
    var iptdetv = $(iptdetails).val();
    var obj = JSON.parse(iptdetv);  

    // COLUNA COM INDEX DA TABELA PAI X FILHO     
    td = $(tr).find('td')[1];            
    var iptindex =  $(td).find('input')[0];       
    var index = $(iptindex).val();
    
    var checked = $(e).is(':checked');         
    if (checked) {
        var template 	= $('#tmplModal').html();                
        myModal = FLUIGC.modal({
            title: 'Informações complementares',
            content: template,
            id: 'form-info-modal',
            size: 'large',
            actions: [{
                'label': 'Salvar',
                'bind': 'data-addForm'        
            },
            {
                'label': 'Cancelar',
                'bind': 'data-addForm'
            }]
        }, function(err, data) {             
            if(err) {} 
            else {  

                if (obj["CROPLINE"] == true || obj["CROPLINE"] == "true") {
                    $("#" + "lmttemp").parent().parent().hide();
                }

                $("#" + "lmttemp").val(obj["LIMITETEMPORARIO"]);
                $("#" + "origem").val(obj["LIMITETEMPORARIO"]);     

                var MOTIVO = (obj["MOTIVO"]) ? obj["MOTIVO"] : 0;
                $("#" + "motivo").val(MOTIVO);                
                
                $("#" + "indextd").val(index);                
                $("#" + "cropline").val(obj["CROPLINE"]);                
                $('button[data-addForm]').attr('onclick','saveAddInfo(this)');                  
            }
        });	   
    }    
} 

/// ADICIONA INFORMAÇÕES ADICIONAIS
function saveAddInfo(e){

    var form = $(e).parent().parent().parent().parent();
    var temp = $(form).find("#" + "lmttemp")[0];
    temp = $(temp).val();

    var corigem = $(form).find("#" + "origem")[0];
    origem = $(corigem).val();

    var cindex = $(form).find("#" + "indextd")[0];
    index = $(cindex).val();

    var cmotivo = $(form).find("#" + "motivo")[0];
    motivo = $(cmotivo).val();

    var ccropline = $(form).find("#" + "cropline")[0];
    cropline = $(ccropline).val();
    
    var reprov = (origem == temp);

    if((!reprov) && (!motivo)) {

        var div = $(cmotivo).parent(); 
        
        $(div).addClass('has-error');
        
        FLUIGC.toast({            
            message: 'Campo motivo é obrigatório',
            type: 'danger'
        });      

    } else{

        $("#" + "tdlmttemporario" + "___" + index).val(temp);
        $("#" + "tdorigem" + "___" + index).val(origem);
        $("#" + "tdmotivo" + "___" + index).val(motivo);
    
        $('.container-modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
        $('body').attr('style','overflow: auto');
    
        if ($(e).text() == "Salvar") {
            FLUIGC.toast({            
                message: 'Informações editadas com sucesso',
                type: 'success'
            });        
        }   

    }
    
}


// =========================================================
// ALTERA LAYOUT DE CAMPOS
// =========================================================

var changeFielInLabel = function(classe) {
    $(classe).addClass('inputlabel');
    $(classe).attr('readonly',true);

    $(classe).each(function() {
        $(this).parent().find('.btn').hide();
        $(this).parent().parent().parent().find('.help-block').hide();
        $(this).parent().find('.input-group-addon').hide();
    });
}

var setCampoObrigatorio = function (e) {
    var div = $(e).parent().parent().parent();
    var col2 = $(div).find('.form-group')[1];
    
    var temp = $("#" + "lmttemp").val();    
    var origem = $("#" + "origem").val();
    
    if (temp == origem) {
        $(col2).find('label').html("Motivo ");    
    }
    else{
        $(col2).find('label').html("Motivo <span class='obg'>*</span>");    
    }
    
}


// =================================================================
// VALIDA APROVAÇÕES JÁ REALIZADAS
// =================================================================

function checkAprovacoes(gestor, safra, grupo, manager) { 
    var vetor = [];
    var data = $("#dataatual").val();
    data = parseInt(data);
    
    if(!manager){
        var c1 = DatasetFactory.createConstraint('totvsid', gestor, gestor, ConstraintType.MUST);
        vetor.push(c1);
    }

    // SOMANDO DATA
    var d = new Date(data);    
    var vd = convertStringToDateEua(d);
    d.setDate(vd[2]);
    d.setMonth(vd[1] - 1);
    d.setFullYear(vd[0]);    
    d.setDate(d.getDate() + 2);    
    var prazo = d.getTime();
    
    var c1 = DatasetFactory.createConstraint('dataatual', data, prazo, ConstraintType.MUST);
    vetor.push(c1);

    var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
    vetor.push(c2);

    var dataset = DatasetFactory.getDataset('dsAprovacaoCredito', null, vetor, null);
    var retorno  = false;
    var row = dataset.values;        
    for (let i = 0; i < row.length; i++) {
        var documentid = row[i]['documentid'];
        var version = row[i]["metadata#version"];                  
        var check = searchAprovacoes(documentid, version, safra, grupo);                        
        if(check){
            retorno = true; 
            break;
        }
        else{
            continue;
        }
    }
    return retorno;

}

//Busca informações da tabela PAIxFILHO
function searchAprovacoes(documentId, documentVersion, safra, grupo){        
    var tbfilho = "itensCredito";
    
    //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
    var c2 = new Array();
    c2.push(DatasetFactory.createConstraint("tdsafra", safra, safra, ConstraintType.MUST)); 
    c2.push(DatasetFactory.createConstraint("tdaprovacao", grupo, grupo, ConstraintType.MUST));             
    c2.push(DatasetFactory.createConstraint("tablename", tbfilho, tbfilho, ConstraintType.MUST));     
    c2.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST)); 
    c2.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST)); 
    c2.push(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));
    var filho = DatasetFactory.getDataset("dsAprovacaoCredito", null, c2,  null); 
            
    var tm = [];
    if (filho.hasOwnProperty('values')) {
        tm = filho.values;    
        if(filho.values.length > 0 ) return true
    }
    return false; 
}

// ======================================
// VERIFICA GESTORES DO PROCESSO
// ==========================================

function checkCheckManager(){

    var retorno = {}    ;
    $.ajax(
        '/ecm/api/rest/ecm/workflowModeling/getprocess?processId=aprovacao_limite_credito', {
        method: 'GET',
        dataType: 'xml',
        async: false        
    })
    .done(function(data) {          
    
        var tag = $(data).find("ProcessDefinition")[0];
        tag = $(data).find("managerEngineAllocationConfiguration").text();   

        var gerente = tag.replace("<AssignmentController>","");        
        gerente = gerente.replace("</AssignmentController>","");

        if (gerente.indexOf('User') >= 0) {
            retorno['tipo'] = 1;
        }
        else if (gerente.indexOf('Role') >= 0) {
            retorno['tipo'] = 2;
        }
        else if (gerente.indexOf('Group') >= 0) {
            retorno['tipo'] = 3;
        }
        else{
            retorno['tipo'] = false;
        }
        
        gerente = gerente.replace("<User>","");
        gerente = gerente.replace("</User>","");
        gerente = gerente.replace("<Role>","");
        gerente = gerente.replace("</Role>","");
        gerente = gerente.replace("<Group>","");
        gerente = gerente.replace("</Group>","");
        retorno['manager'] = gerente;
        
    })
    .error(function(oError) {
        console.log(oError);
    });     
          
    return (retorno['tipo']) ? retorno : false;
}

function checkUserOfRole(valor) {
    var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', valor, valor, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', USERID, USERID, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(c1, c2), null);    
    return (dataset.values.length > 0);
}

function checkUserOfGroup(valor){
    var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', valor, valor, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', USERID, USERID, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('colleagueGroup', null, new Array(c1, c2), null);
    return (dataset.values.length > 0);
}

function checkManager(){
    // var vetor = checkCheckManager();        
    // var check = vetor['tipo'];
    // var gerente = vetor['manager'];
    var gerente = "gestorLimiteDeCredito";
    var check = 2;

    switch (check) {
        case 1:
            return gerente == USERID;            
        case 2:
            return checkUserOfRole(gerente);            
        case 3:
            return checkUserOfGroup(gerente);            
        default:
            return false;           
    }
}


// ========================================
// TRATA VALORES SELECIONADOS
// ===================================
var convertSelecionadosParaJson = function(){
    var json = {};
    var vetor = [];
    $('[name^="tdlmttemporario___"] ').each(function(item){
        
        var i = $(this).attr('id').split("_");
        i = i[i.length - 1];
        var obj = {}
                
        var DESCGRUPOVENDAS    = $('input[name="tdgrpvenda___'+i+'"]').val();
        var GRUPOVENDAS        = $('input[name="tdaprovacao___'+i+'"]').val();
        var LIMITECALCULADO    = $('input[name="tdlmtcalculado___'+i+'"]').val();
        var LIMITECLEAN        = $('input[name="tdlmtclean___'+i+'"]').val();
        var LIMITEDISPONIVEL   = $('input[name="tdlmtdisponivel___'+i+'"]').val();
        var LIMITETEMPORARIO   = $('input[name="tdlmttemporario___'+i+'"]').val();
        var PEDIDOSBLOQUEADOS  = $('input[name="tdpdbloqueado___'+i+'"]').val();
        var PEDIDOSCARTEIRA    = $('input[name="tdpdcarteira___'+i+'"]').val();
        var PEDIDOSLIBERADOS   = $('input[name="tdpdliberado___'+i+'"]').val();
        var SAFRA              = $('input[name="tdsafra___'+i+'"]').val();
        var SALDODUPLICATAS    = $('input[name="tdsldduplicado___'+i+'"]').val();
        var CROPLINE           = $('input[name="tdcropline___'+i+'"]').val();
        var SALDOVENCIDO       = $('input[name="tdslvencido___'+i+'"]').val();
        var MOTIVO             = $('input[name="tdmotivo___'+i+'"]').val();
        
        obj["DESCGRUPOVENDAS"]   = DESCGRUPOVENDAS;
        obj["GRUPOVENDAS"]       = GRUPOVENDAS;
        obj["LIMITECALCULADO"]   = (LIMITECALCULADO)? convertToFloat(LIMITECALCULADO) : 'R$ 0,00';
        obj["LIMITECLEAN"]       = (LIMITECLEAN) ? convertToFloat(LIMITECLEAN) : 'R$ 0,00';
        obj["LIMITEDISPONIVEL"]  = (LIMITEDISPONIVEL) ? convertToFloat(LIMITEDISPONIVEL) : 'R$ 0,00';
        obj["LIMITETEMPORARIO"]  = (LIMITEDISPONIVEL) ? convertToFloat(LIMITETEMPORARIO) : 'R$ 0,00'; 
        obj["PEDIDOSBLOQUEADOS"] = (PEDIDOSBLOQUEADOS) ? convertToFloat(PEDIDOSBLOQUEADOS) : 'R$ 0,00';
        obj["PEDIDOSCARTEIRA"]   = (PEDIDOSCARTEIRA) ? convertToFloat(PEDIDOSCARTEIRA): 'R$ 0,00';
        obj["PEDIDOSLIBERADOS"]  = (PEDIDOSLIBERADOS) ? convertToFloat(PEDIDOSLIBERADOS) : 'R$ 0,00';
        obj["SAFRA"]             = SAFRA;
        obj["SALDODUPLICATAS"]   = (SALDODUPLICATAS) ? convertToFloat(SALDODUPLICATAS) : 'R$ 0,00';
        obj["CROPLINE"]          = CROPLINE;
        obj["SALDOVENCIDO"]      = (SALDOVENCIDO) ? convertToFloat(SALDOVENCIDO) : 'R$ 0,00';
        obj["MOTIVO"]            = MOTIVO;

        vetor.push(obj);        
    });

    if( CURRENT_STATE != FIM){
        $('[name^="tdlmttemporario___"] ').parent().parent().remove();
    }
    
    console.log(vetor);    

    json['values'] = vetor;
    return json;
}

// =============================================
// VERIFICA SE HÁ ALTERAÇÃO NO LIMITE TEMPORÁRIO
// ================================================
var beforeSendValidate = function(numState, nextState) {
    
    $('[name^="tdlmttemporario___"] ').each(function(item){
        
        var i = $(this).attr('id').split("_");
        i = i[i.length - 1];
        var limite = $(this).val();
        var origem = $('input[name="tdorigem___'+i+'"]').val();

        if (limite != origem) {                        
            $("#checkaprov2").val(true);
            return 0 ;
        }
        
    });

}

var showDateTodayEua = function () {
    
    var d  = new Date();

    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    day = ("00" + day).slice(-2);
	month = ("00" + month).slice(-2);

    // var resul = year.toString()+'-'+month.toString()+'-'+day.toString();
    var resul = d.getTime();

    return resul;

}


var convertStringToDateEua = function (d) {
        
    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    day = ("00" + day).slice(-2);
	month = ("00" + month).slice(-2);

    var resul = year.toString()+'-'+month.toString()+'-'+day.toString();
    return resul;

}

function converteMoeda(moeda,valor){

console.log("%%%%%%%%%%%%%%%%   ENTROU NA FUNCTION");

console.log("%%%%%%%%%%%%%%%%   VALOR = ", moeda);

var total = 0;

if (moeda == "1") {
    console.log("########################## ENTROU NO IF 1")
    var formatterBr = new Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL'
    });

    total = formatterBr.format(valor);
    var result = "R$ " + total;
}else if (moeda == "2"){
    console.log("########################## ENTROU NO IF 2")
    var formatterBr = new Intl.NumberFormat('en-US'); 
    total = formatterBr.format(valor);    
    var result = "US$ " + total;
}



console.log("VALOR TOTAL APÓS TRATATIVA", total);

return result;

}