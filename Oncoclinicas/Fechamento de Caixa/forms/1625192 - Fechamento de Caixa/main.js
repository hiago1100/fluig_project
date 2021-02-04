var ultimaLinha = 0;
var controle = [];
var ARYForms = {
    params: {},
    initForm: function(params) {    
        this.params = params;
        var $this = this;   
        $(function () {
            if (params.formMode == "ADD" || params.formMode == "MOD") { 
                $this.onEdit(params);
            } else {
                $this.onView(params);
            }
        });
    },
    onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

        $(".addChild").hide();
        $(".auxiliar").hide();

    },
    onEdit: function(params) {  //Edição do formulário


        $(function() {
            $(".dtDeposito").datepicker({maxDate:0,format: 'DD/MM/YYYY HH:mm'});
        });

        // jQuery(function($){
        //         $.datepicker.regional['pt-BR'] = {
        //                 closeText: 'Fechar',
        //                 prevText: '&#x3c;Anterior',
        //                 nextText: 'Pr&oacute;ximo&#x3e;',
        //                 currentText: 'Hoje',
        //                 monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
        //                 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        //                 monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
        //                 'Jul','Ago','Set','Out','Nov','Dez'],
        //                 dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
        //                 dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        //                 dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        //                 weekHeader: 'Sm',
        //                 dateFormat: 'dd/mm/yy',
        //                 firstDay: 0,
        //                 isRTL: false,
        //                 showMonthAfterYear: false,
        //                 yearSuffix: ''};
        //         $.datepicker.setDefaults($.datepicker.regional['pt-BR']);


        setTimeout(function(){

            $("[name^='cpBanco___']").each(function(){
               reloadZoomFilterValues($(this).attr("id"), "FILIAL," + $("#cpCodFiliais").val());  
            });

        },1000);



        var WKNumState = params.WKNumState;


        if (WKNumState != 0 || WKNumState != 4) {
            extratoBancario();
            $("#zoomFilial").addClass('hide');
        }

        if(WKNumState == 0 || WKNumState == 4  ){ 

            $(".auxiliar").hide();
            $("#zoomFilial").removeClass('hide');
            addFilho();

            var dataAtual = new Date();
            var horaAtual = dataAtual.getHours();
            var minutos   = dataAtual.getMinutes();
            var segundos  = dataAtual.getSeconds();
            if (segundos == "0") {
                segundos="00";
            }
            if (segundos == "1") {
                segundos="01";
            }
            if (segundos == "2") {
                segundos="02";
            }
            if (segundos == "3") {
                segundos="03";
            }
            if (segundos == "4") {
                segundos="04";
            }
            if (segundos == "5") {
                segundos="05";
            }
            if (segundos == "6") {
                segundos="06";
            }
            if (segundos == "7") {
                segundos="07";
            }
            if (segundos == "8") {
                segundos="08";
            }
            if (segundos == "9") {
                segundos="09";
            }
            var fullHours = horaAtual+":"+minutos+":"+segundos;
            $("#cpHoras").val(fullHours);
        }


        if (WKNumState == 5) {

            $("#divAprovador").removeClass("hide");
                bloqueioCampos();
            $(".bpm-mobile-trash-column").hide(); 
            $(".addChild").hide();
            $("#divAprovador").removeClass('hide');

        }

        if(WKNumState == 15){ 
            bloqueioCampos();
            $(".bpm-mobile-trash-column").hide(); 
            $(".addChild").hide();
            $("#divAprovador").removeClass('hide');
            $("#divConfirmaDep").removeClass('hide');
            $("#cpObsAprova").attr("readonly","");
            
        }

        if (WKNumState == 24) {
            // $("#auxiliar").hide();
           
            $(".addChild").hide();
            
        }

        if (WKNumState == 24) {
            $("#divIntegracao").removeClass('hide');
            $(".auxiliar").hide();
        }

        if (WKNumState == 12) {
            $(".auxiliar").hide();
            $("#divAprovador").removeClass('hide');
            $("#divConfirmaDep").removeClass('hide');
            $("#cpObsAprova").attr("readonly","");
            $("#cpObsDeposito").attr("readonly","");
            $(".btnAprovadores").hide();

        }

        if (WKNumState == 15 ) {

        $("#aprovado").hide();
        $("#reprovado").hide();
        $("#cpObsDeposito").attr("readonly",false);

            
        }               
    } //fim do Edit                               
};

//       ******************************** FUNCTIONS **********************************

function addFilho() {
 var linha = wdkAddChild("tableDepositos");
// newId -> essa variável já vem com a sequência do Pai x Filho
MaskEvent.init();

$(function() {
    $("#dtDeposito___"+ linha).datepicker({maxDate:0,format: 'DD/MM/YYYY HH:mm'});
});

$("[name^='cpBanco___']").each(function(){
   reloadZoomFilterValues($(this).attr("id"), "FILIAL," + $("#cpCodFiliais").val());  
});


jQuery(function($){
        $.datepicker.regional['pt-BR'] = {
                closeText: 'Fechar',
                prevText: '&#x3c;Anterior',
                nextText: 'Pr&oacute;ximo&#x3e;',
                currentText: 'Hoje',
                monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
                'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
                'Jul','Ago','Set','Out','Nov','Dez'],
                dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
                dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
                dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});



}
//  *********************************************************************************

function setZooms(){               
    //Cria zoom de filiais do Fluig
    $(".zoomFilial").on("click",function() {
        openZoom("cad_Filiais",
                "filial_protheus,Codigo,filial,Descrição,cnpj_filial,CGC,nomeGestor,Gestor",
                // "CODIGO, Codigo, DESCRICAO, Descrição, CGC, CPF/CNPJ",
                "filial_protheus,filial,cnpj_filial,nomeGestor,codGstFluig",
                "&filterValues= status, ativa",
                $(this).attr('name')
        );
    });

  if (WKNumState == 0 || WKNumState == 4 || WKNumState == 12) {
    // Dataset dos Bancos
    $(".cpBanco").on("click",function() {
        var filial = $("#cpCodFiliais").val();
        openZoom("ds_banco",
                "FILIAL, Filial, DESCRICAO, Descrição, AGENCIA, Agencia,CONTA, Conta",
                "FILIAL,DESCRICAO,AGENCIA,CONTA,CODIGO",
                "&filterValues= FILIAL, " + filial,
                $(this).attr('name')
        );
    });
 }

};

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    if (constraints != "") {
    var position = getPositionCenter(900,600);
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
            "status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
    }
}

/**
* Retorna o eixo x e y em um array*/

function getPositionCenter(widthDiv, heightDiv){
    var alturaTela  = screen.height;
    var larguraTela = screen.width;                   
    var posicaoX = (larguraTela / 2) - (widthDiv  / 2); 
    var posicaoY = (alturaTela  / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}

function setSelectedZoomItem(selectedItem) { 

    var dadoss2 = "";
    setaUltimaLinha();

    if(selectedItem.inputName == 'cpFilial'){
        $("#cpCodFiliais").val(selectedItem.filial_protheus);
        $("#cpFilial").val(selectedItem.filial);
       $("#cpNomeGestor").val(selectedItem.NomeGestor);
       $("#cpCodGstFluig").val(selectedItem.codGstFluig);

       var cod_fluig = selectedItem.filial_protheus;

       
       $("[name^='cpBanco___']").each(function(){
    	   reloadZoomFilterValues($(this).attr("id"), "FILIAL," + cod_fluig);  
       });
      


    if (selectedItem.filial_protheus != ""){ 
        console.log(selectedItem.filial_protheus);

        var dados = {
                "name": "ds_FechamentoCaixa",
                "fields":null,
                "constraints":[
                    {
                        "_field":"FILIAL",
                        "_initialValue": selectedItem.filial_protheus,
                        "_finalValue": selectedItem.filial_protheus,
                        "_type":1
                    }
                    ]
        };
        $.ajax({
            method: "POST",
            url: "/api/public/ecm/dataset/datasets/",
            data: JSON.stringify(dados),
            contentType: "application/json", 
            async: false,
            error: function(x, e) {
                if (x.status == 500) {
                    alert("Erro Interno do Servidor: entre em contato com o Administrador.");
                }
            },
            beforeSend: function(){

            },
            success:function(model) {

                $.each(model.content.values, function(index, value){
                    var dataUltFech  = value.FECHADO;
                    var saldoAtual   = value.SALDO;

                    $("#cpValorTotalOculto").val(saldoAtual);

                    saldoAtual = parseFloat(saldoAtual.trim()).toLocaleString('pt-BR');


                    console.log("Data do ultimo fechamento" + dataUltFech);
                    console.log(saldoAtual);

                    $("#dtPeriodoIni").val(dataUltFech);
                    $("#cpSaldoAtual").val("R$ " + saldoAtual);

                    $("#cpTotalAtual").val("R$ " + saldoAtual);

                    somaValores();


                });
                return model;
            }
        });

      var dados2 = {
                "name": "ds_extratoCaixa",
                "fields":null,
                "constraints":[
                    {
                        "_field":"FILIAL",
                        "_initialValue": selectedItem.filial_protheus,
                        "_finalValue": selectedItem.filial_protheus,
                        "_type":1
                    }
                    ]
        };
        $.ajax({
            method: "POST",
            url: "/api/public/ecm/dataset/datasets/",
            data: JSON.stringify(dados2),
            contentType: "application/json", 
            async: false,
            error: function(x, e) {
                if (x.status == 500) {
                    alert("Erro Interno do Servidor: entre em contato com o Administrador.");
                }
            },
            beforeSend: function(){

            },
            success:function(model) {

                $.each(model.content.values, function(index, value){
                var extratoCaixa  = value.EXTRATO;

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(extratoCaixa,"text/xml");
    

                var bancoExt   = xmlDoc.getElementsByTagName("Banco")[0].childNodes[0].nodeValue;
                var agenciaExt = xmlDoc.getElementsByTagName("Agencia")[0].childNodes[0].nodeValue;
                var contaExt   = xmlDoc.getElementsByTagName("Conta")[0].childNodes[0].nodeValue;

                var dadosBanc = "DADOS BANCARIOS - " + bancoExt + " - AGENCIA - " + agenciaExt + " - CONTA - " + contaExt;

                dadoss2 += '<div align=center>'+dadosBanc+'</div><br>';
                dadoss2 += '<table class="table">';
                dadoss2 += '<thead>';
                dadoss2 += '<tr>';
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Data Mov.</th>';     
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Operação</th>';     
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Título</th>';     
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Entrada</th>';     
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Saída</th>';
                dadoss2 += '<th style="text-align: center;" class="col-sm-2">Saldo</th>';          
                dadoss2 += '</tr>';
                dadoss2 += '</thead>';
                dadoss2 += '</table">';    
               
               for (var i = 0; i < xmlDoc.getElementsByTagName("Movimento").length; i++) {

                // Cabeçalho com dados bancários
                // dados dos extratos
                var dataExt        = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("DATA")[0].childNodes["0"].nodeValue ;                                    
                var operacaoExt    = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("OPERACAO")[0].childNodes["0"].nodeValue ;
                
              //  var documentoAux      = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("DOCUMENTO")[0].childNodes["0"].nodeValue ;

                var tituloExt      = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("TITULO")[0].childNodes["0"].nodeValue ;
                var entradaExt     = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("ENTRADAS")[0].childNodes["0"].nodeValue ;                    
                var saidaExt       = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("SAIDAS")[0].childNodes["0"].nodeValue ;
                var saldoAtualAux  = xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("SALDO")[0].childNodes["0"].nodeValue ;       



                console.log("Valores de saída = " + saidaExt);

                dadoss2 += '<table class="table">';
                dadoss2 += '<tr>';
                dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + dataExt    + '</td>';     
                dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + operacaoExt+ '</td>';     
                dadoss2 += '<td style="text-align: center;" class="col-sm-2">' + tituloExt  + '</td>';     
                dadoss2 += '<td style="text-align: center; color:#32CD32;" class="col-sm-2">' +  parseFloat(entradaExt).toLocaleString('pt-BR') + '</td>';     
                dadoss2 += '<td style="text-align: center;color:#FF0000;" class="col-sm-2">' +  parseFloat(saidaExt).toLocaleString('pt-BR')   + '</td>';
                dadoss2 += '<td style="text-align: center" class="col-sm-2">' +  parseFloat(saldoAtualAux).toLocaleString('pt-BR')   + '</td>';                       
                dadoss2 += '</tr>';
                dadoss2 += '</table>';


                var novoSaldoAux = $(xmlDoc.getElementsByTagName("Movimento")[i].getElementsByTagName("SALDO")[0].childNodes["0"].nodeValue).get(-1);

                console.log("Ultimo registros"+ novoSaldoAux);

                   } 
                });
                
                return model;
                //extratoBancario(dadoss2);
            }
        });

        $("#htmlExtrato").val(dadoss2);
        $("#htmlCabecalho").val(selectedItem.DESCRICAO);
            $("#abreExtrato").click(function(){
                FLUIGC.modal(
                    {
                    title: "Extrato Fechamento de caixa",
                    content: dadoss2 ,
                          id: "fluig-modal-Extrato",
                          size: "full",
                          actions: [{
                            'label': 'Fechar',
                            'bind': 'data-open-modal',
                            'autoClose': true
                          }]
                    });
            });
    }

    }
  
    if (selectedItem.inputName.match(/cpBanco___/g)) {

        var id = selectedItem.inputName.split("___").reverse();


        $("#cpBanco___"+id[0]).val(selectedItem.DESCRICAO);
        $("#cpAgencia___"+id[0]).val(selectedItem.AGENCIA);
        $("#cpConta___"+id[0]).val(selectedItem.CONTA);
        $("#cpCodigoBanco___"+id[0]).val(selectedItem.CODIGO);
    }

}

function setaUltimaLinha(){
    $('input[id^="cpBanco___"]').each(function(){
        var context = $(this);
        ultimaLinha = parseInt(context.attr('id').split('___')[1]);     
    });
}


function aprovador(id){

    var aprova  = "sim";
    var reprova = "nao";

    if (id == "aprovado") {
        $("#cpAprova").val(aprova);
        $("#likeAprova").removeClass("hide");
        $("#dislikeReprova").addClass("hide");    
    }else if(id == "reprovado"){
        $("#cpAprova").val(reprova);
        $("#dislikeReprova").removeClass("hide");
        $("#likeAprova").addClass("hide");
        
    }
}

function somaValores(){

    var novoValor = $("#cpValorTotalOculto").val();
        //parseFloat(novoValor);
    console.log(parseFloat(novoValor));
// **************** Saldo atual - Total de do fechamento. *****************
    $("input[id^='cpValor___']").each(function(index, value){
        if ($(this).val() == ""){
            $(this).val(0);
        }
        novoValor = parseFloat(novoValor) - convertStringFloat($(this).val());
        novoValor = novoValor;
    });
    var padBrasil = parseFloat(novoValor).toLocaleString('pt-BR');
    $("#cpTotalAtual").val("R$ " + padBrasil);
 }

function convertStringFloat(valor) {

    if (valor.indexOf(',') == -1) {
    } else {
        valor = String(valor).split(".").join("").replace(",",".");
    }
    valor = parseFloat(valor);
    return valor;
}

function extratoBancario(){

        setTimeout(function(){
            $("#abreExtrato").click(function(){
                FLUIGC.modal(
                    {
                    title: "Extrato Fechamento de caixa - Filial - " + $("#htmlCabecalho").val(),
                    content: $("#htmlExtrato").val(),
                          id: "fluig-modal-Extrato",
                          size: "full",
                          actions: [{
                            'label': 'Fechar',
                            'bind': 'data-open-modal',
                            'autoClose': true
                          }]
                    });
            });
        },100);
}


function bloqueioCampos(){
    $(".bloqueio").attr('readonly','');
    $("select[readonly]").css({'background':'#eee','pointer-events':'none','touch-action':'none'});
}

function fnCustomDelete(oElement){
    fnWdkRemoveChild(oElement); 
//  Chamada a funcao padrao, NAO RETIRAR
    somaValores();

}

function deposito(id){
    var aprova  = "sim";
    var reprova = "nao";

    if (id == "depositado") {
        $("#cpDeposita").val(aprova);
        $("#likeDeposita").removeClass("hide");
        $("#dislikeDeposita").addClass("hide");    
    }else if(id == "nDeposita"){
        $("#cpDeposita").val(reprova);
        $("#dislikeDeposita").removeClass("hide");
        $("#likeDeposita").addClass("hide");
        
    }
}

