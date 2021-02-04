var myLoading1 = FLUIGC.loading(window,{textMessage: '<h1>Carregando...</h1>'});
var codGest ;
var nomeUsuarioRdv;
var tipoUser;
var rdv_panel = SuperWidget.extend({
    message: null,

    init: function () {
        codGest = gestorLogado();
        getDiretor(codGest);
        console.log("Trouxe o:", getDiretor(codGest));
    },

    bindings: {
        local: {
//code
}
},

showMessage: function () {

}
});

function gestorLogado(){
    var codigoUser    = WCMAPI.getUserCode();
    var nomeUser = WCMAPI.getUser();
    // var tt = "9109";

     // var tt = "0605";
    
    listaUsers();

    return codigoUser;
}

function getGestor(codFornecedor){

    var nomeGestor;
    var dados2 = {
        "name": "colleague",
        "fields": null,
        "constraints":[
        {
            "_field": "colleaguePK.colleagueId",
            "_initialValue": codFornecedor,
            "_finalValue": codFornecedor ,
            "_type": 1
        }
        ]
    };
    $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados2),
        contentType: "application/json",
        async: false,
        error: function (x, e) {
            if (x.status == 500) {
                alert("Erro Interno do Servidor: entre em contato com o Administrador.");
            }
        },
        beforeSend: function () {

        },
        success: function (model) {

            $.each(model.content.values, function (index, value) {

                nomeGestor = value.colleagueName;

            });        
        }
    }); 
    return nomeGestor;
}

function getDespesa(){
    
    var dataInicio = $("#dtInicio").val();
    var dataFim    = $("#dtFim").val();
    var html = "";
    var total = 0;

    if (new Date(dataInicio) > new Date()) {
        $("#valorTotal").html("");
        var table = $("#relatorio").DataTable();
        FLUIGC.message.alert({
            message: 'A data de início não pode ser maior que a data de fim.',
            title: 'Atenção',
            label: 'OK'
        });        
        table.destroy();
        $("#relatorio tbody").html("");
        $("#relatorio").DataTable({
            "oLanguage": {
                "sProcessing": "Aguarde enquanto os dados são carregados ...",
                "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                "sZeroRecords": "Nenhum registro correspondente ao criterio encontrado",
                "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                "sInfoFiltered": "",
                "sSearch": "Procurar",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext":     "Próximo",
                    "sLast":     "Último"
                }
            }
        }); 
    }else{  

        var dados2 = {
            "name": "buscaDadosRdv",
            "fields": null,
            "constraints": [
            {
                "_field": "dataInicio",
                "_initialValue": dataInicio,
                "_finalValue": dataInicio ,
                "_type": 1
            },
            {
                "_field": "dataFim",
                "_initialValue": dataFim,
                "_finalValue": dataFim,
                "_type": 1
            },{
                "_field": "codGest",
                "_initialValue": codGest,
                "_finalValue": codGest,
                "_type": 1
            },{
                "_field": "tipoUser",
                "_initialValue": tipoUser,
                "_finalValue": tipoUser,
                "_type": 1
            }

            ]
        };
        $.ajax({
            method: "POST",
            url: "/api/public/ecm/dataset/datasets/",
            data: JSON.stringify(dados2),
            contentType: "application/json",
            async: true,
            error: function (x, e) {
                if (x.status == 500) {
                    alert("Erro Interno do Servidor: entre em contato com o Administrador.");
                }
            },
            beforeSend: function () {
              myLoading1.show();  
            },
            success: function (model) {

                var table = $("#relatorio").DataTable();
                new $.fn.dataTable.Buttons( table, {
                    buttons: [
                    'print', 'excel', 'pdf'
                    ]
                } );


                var array = model.content.values;  
                

                array.map(function(item,i){

                    var despesaAux = JSON.parse(item.DESPESA);
                    var geralAux   = JSON.parse(item.GERAL);
                    var paramsAux  = JSON.parse(item.PARAMS);  
                    var numSolicitacao = paramsAux["numProcess"];

                    if (numSolicitacao != 0) {
                        var valorTotal = parseFloat(geralAux["valorTotal"]);                        
                        total = total + valorTotal;                     
                        html += '<tr><td><a target="_blank" href="http://mcassab15:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numSolicitacao + '">' + numSolicitacao + '</a></td>';
                        html += "<td>"+geralAux["solicitante"]["colleagueName"]+"</td>";
                        html += "<td>"+geralAux["viajante"]["colleagueName"]+"</td>";
                        html += "<td>"+geralAux["estabelecimento"]["nom_abrev"]+"</td>";
                        html += "<td>"+despesaAux["ccusto"]["des_tit_ctbl"]+"</td>";  
                        html += "<td>"+convertMoney(valorTotal)+"</td></tr>";                          
                    }
                });

                var valorTotalHtml = retornarValorHtml(convertMoney(total));                

                $("#valorTotal").html(valorTotalHtml);

                table.destroy();
                $("#relatorio tbody").html(html);
                $("#relatorio").DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                    'print', 'excel', 'pdf'
                    ],
                    "oLanguage": {
                        "sProcessing": "Aguarde enquanto os dados são carregados ...",
                        "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                        "sZeroRecords": "Nenhum registro correspondente ao criterio encontrado",
                        "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                        "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                        "sInfoFiltered": "",
                        "sSearch": "Procurar",
                        "oPaginate": {
                            "sFirst":    "Primeiro",
                            "sPrevious": "Anterior",
                            "sNext":     "Próximo",
                            "sLast":     "Último",
                            "sPrint":     "Imprimir"
                        }
                    }     
                });                             
            myLoading1.hide();
            }
        }); 
    }
}

function getDespesaUser(){

var html = "";
var total = 0;
var dataInicio = $("#dtInicioUser").val(); 
var dataFim    = $("#dtFimUser").val(); 
if (new Date(dataInicio) > new Date()) {
        $("#valorTotalUser").html("");
        var table = $("#relatorioUser").DataTable();
        FLUIGC.message.alert({
            message: 'A data de início não pode ser maior que a data de fim.',
            title: 'Atenção',
            label: 'OK'
        });        
        table.destroy();
        $("#relatorioUser tbody").html("");
        $("#relatorioUser").DataTable({
            "oLanguage": {
                "sProcessing": "Aguarde enquanto os dados são carregados ...",
                "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                "sZeroRecords": "Nenhum registro correspondente ao criterio encontrado",
                "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                "sInfoFiltered": "",
                "sSearch": "Procurar",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext":     "Próximo",
                    "sLast":     "Último"
                }
            }
        }); 
    }else{ 
validaCampo();       
var dados2 = {
    "name": "busca_rdv_usuario",
    "fields": null,
    "constraints": [
    {
        "_field": "codGest",
        "_initialValue": codGest,
        "_finalValue": codGest ,
        "_type": 1
    },
    {
        "_field": "nomeUser",
        "_initialValue": nomeUsuarioRdv,
        "_finalValue": nomeUsuarioRdv,
        "_type": 1
    },
    {
        "_field": "dataInicio",
        "_initialValue": dataInicio,
        "_finalValue": dataInicio,
        "_type": 1
    },
    {
        "_field": "dataFim",
        "_initialValue": dataFim,
        "_finalValue": dataFim,
        "_type": 1
    },{
        "_field": "tipoUser",
        "_initialValue": tipoUser,
        "_finalValue": tipoUser,
        "_type": 1
    }    
    ]
};
$.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados2),
    contentType: "application/json",
    async: true,
    error: function (x, e) {
        if (x.status == 500) {
            alert("Erro Interno do Servidor: entre em contato com o Administrador.");
        }
    },
    beforeSend: function () {
        myLoading1.show();
    },
    success: function (model) {

        var table = $("#relatorioUser").DataTable();
        new $.fn.dataTable.Buttons( table, {
            buttons: [
            'print', 'excel', 'pdf'
            ]
        });

        var array = model.content.values;  

        array.map(function(item,i){

            var despesaAux = JSON.parse(item.DESPESA);
            var geralAux   = JSON.parse(item.GERAL);
            var paramsAux  = JSON.parse(item.PARAMS);  
            var numSolicitacao = paramsAux["numProcess"];

            if (numSolicitacao != 0) {
                var valorTotal = parseFloat(geralAux["valorTotal"]);                        
                total = total + valorTotal;                     
                html += '<tr><td><a target="_blank" href="http://mcassab15:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numSolicitacao + '">' + numSolicitacao + '</a></td>';
                html += "<td>"+geralAux["solicitante"]["colleagueName"]+"</td>";
                html += "<td>"+geralAux["viajante"]["colleagueName"]+"</td>";
                html += "<td>"+geralAux["estabelecimento"]["nom_abrev"]+"</td>";
                html += "<td>"+despesaAux["ccusto"]["des_tit_ctbl"]+"</td>";  
                html += "<td>"+convertMoney(valorTotal)+"</td></tr>";                          
            }
        });

        var valorTotalHtml = retornarValorHtml(convertMoney(total));                
        $("#valorTotalUser").html(valorTotalHtml);
        table.destroy();
        $("#relatorioUser tbody").html(html);
        $("#relatorioUser").DataTable({
            dom: 'Bfrtip',
            buttons: [
            'print', 'excel', 'pdf'
            ],
            "oLanguage": {
                "sProcessing": "Aguarde enquanto os dados são carregados ...",
                "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                "sZeroRecords": "Nenhum registro correspondente ao criterio encontrado",
                "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                "sInfoFiltered": "",
                "sSearch": "Procurar",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext":     "Próximo",
                    "sLast":     "Último",
                    "sPrint":     "Imprimir"
         }
        }
     }); //DATATABLE                             
    myLoading1.hide();
    }
  }); 
 }
}

function convertMoney(numero){
    var dinheiro = numero.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    return dinheiro;
}

function retornarValorHtml(valor){
    var html = "";
    html += '  <div class="alert alert-warning alert-dismissible" role="alert">';
    html += '  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
    html += ' <strong aling="center">Valor total : </strong>'+valor ;
    html += ' </div>';
    return html;
}

function validaCampo(){ 
if ($("#nomeUsuario").val() == "" || $("#nomeUsuario").val() == null) {
        $("#valorTotalUser").html("");
        var table = $("#relatorioUser").DataTable();
        FLUIGC.message.alert({
            message: 'Favor escolher um usuário.',
            title: 'Atenção',
            label: 'OK'
        });
        table.destroy();
        $("#relatorioUser tbody").html("");
        $("#relatorioUser").DataTable({
            "oLanguage": {
                "sProcessing": "Aguarde enquanto os dados são carregados ...",
                "sLengthMenu": "Mostrar _MENU_ registros por pagina",
                "sZeroRecords": "Nenhum registro correspondente ao criterio encontrado",
                "sInfoEmtpy": "Exibindo 0 a 0 de 0 registros",
                "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                "sInfoFiltered": "",
                "sSearch": "Procurar",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext":     "Próximo",
                    "sLast":     "Último"
                }
            }
      });
   }
}
function listaUsers(){
        var settings = {
        source: {
            url:  '/api/public/ecm/dataset/search?datasetId=colleague&searchField=colleagueName&',
            contentType: 'application/json',
            root: 'content',
            pattern: '',
            limit: 10,
            offset: 0,
            patternKey : 'searchValue',
            limitkey: 'limit',
            offsetKey: 'offset'
        },
        displayKey: 'colleagueName',
        multiSelect: true,
        style: {
            autocompleteTagClass: 'tag-gray',
            tableSelectedLineClass: 'info'
        },
        table: {
            header: [
            {
                'title': 'Nome',
                'size': 'col-xs-9',
                'dataorder': 'colleagueName',
                'standard': true
            },{
                'title': 'Código',
                'size': 'col-xs-9',
                'dataorder': 'colleagueName',
                'standard': true
            }
            ],
            renderContent: ['colleagueName','colleagueId']
        }
    }
    var filter = FLUIGC.filter('#nomeUsuario', settings);
    filter.on('fluig.filter.item.added', function(data){
        nomeUsuarioRdv = data.item.colleagueName;
    });
}

function getDiretor(codGestFunc){

var arrayAux = [];

    var dados2 = {
        "name": "busca_diretor_logado",
        "fields": null,
        "constraints":[
        {
            "_field": null,
            "_initialValue": null,
            "_finalValue": null ,
            "_type": 1
        }
        ]
    };
    $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados2),
        contentType: "application/json",
        async: false,
        error: function (x, e) {
            if (x.status == 500) {
                alert("Erro Interno do Servidor: entre em contato com o Administrador.");
            }
        },
        beforeSend: function () {
        },
        success: function (model) {
            $.each(model.content.values, function (index, value) {
                var codUserGroup = value.USER_CODE;

                arrayAux.push(codUserGroup);
            });

            console.log("arr",arrayAux);

             arrayAux.includes(codGestFunc) ? tipoUser = "DIRETOR" : tipoUser = "GERENTE";
        }        

    }); 
    return tipoUser;    
}