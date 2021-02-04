var loadingNota = FLUIGC.loading('#div_solicitante');
var ultimaLinha = 0;
var controle = [];
var ARYForms = {
    params: {},
    initForm: function (params) {
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
    onView: function (params) { //Visualização do formulário sem a possibilidade de edição (consulta)
           $("#aprovacao").css('display','block');
           $("#consideracoesAconpanhamento").attr("readonly","");
           $("#divAprovacao").css('display','none');
    },
    onEdit: function (params) {  //Edição do formulário


        if ($("#cpStatusNf").val() != "") {
            $("#DivTipoTitulo").removeClass('hide');
            $("#DivTipoTitulo").text($("#cpStatusNf").val());
        }

        var WKNumState = params.WKNumState;

        if (WKNumState == 0) {

        }

        if (WKNumState != 0) {
             $("#cpNumeroNota").attr("readonly","");
             $("#cpObservacao").attr("readonly","");
             $("#cpNumeSerie").attr("readonly","");
             $("#cpMotivoCanc").attr("readonly","");
        }

        if ( WKNumState == 57) {

             $("#cpNumeroNota").removeAttr("readonly");
             $("#cpObservacao").removeAttr("readonly");
             $("#cpNumeSerie").removeAttr("readonly");
            // $("#cpMotivoCanc").removeAttr("readonly");

        }

        if (WKNumState == 24 || WKNumState == 34 || WKNumState == 42){

           $("#aprovacao").css('display','block');
           $("#consideracoesAconpanhamento").attr("readonly","");
           $("#divAprovacao").css('display','none');
        }

    } //fim do Edit                         
}; // fim da chamada de forms



function setZooms() {
    //Cria zoom de filiais do Fluig
   if (WKNumState == 0 || WKNumState == 4) { 
    $(".zoomFilial").on("click", function () {
        openZoom("ds_filial",
            "CODIGO, Codigo, DESCRICAO, Descrição, CGC, CPF/CNPJ",
            "CODIGO, DESCRICAO, CGC, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO",
            "",
            $(this).attr('name')
        );
    });
   }
};

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    var position = getPositionCenter(900, 600);
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
        "status, scrollbars=no,top=" + position[1] + ", left=" + position[0] + ",width=900, height=600");
}

function getPositionCenter(widthDiv, heightDiv) {
    var alturaTela = screen.height;
    var larguraTela = screen.width;
    var posicaoX = (larguraTela / 2) - (widthDiv / 2);
    var posicaoY = (alturaTela / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}

function setSelectedZoomItem(item) {

    if (item.type == 'zoomFilial') {
        $("#cpCodFiliais").val(item.CODIGO);
        $("#cpFilial").val(item.DESCRICAO);
    }
}

function autoComplete() {

    var filial      = $("#cpCodFiliais").val();
    var valor       = $("#cpNumeroNota").val();
    var numeroSerie = $("#cpNumeroNota").val();

    var tamanho = valor.length;

    if (tamanho == 6) {
        $("#cpNumeroNota").val("000" + valor);
    } else if (tamanho == 5) {
        $("#cpNumeroNota").val("0000" + valor);
    } else if (tamanho == 4) {
        $("#cpNumeroNota").val("00000" + valor);
    } else if (tamanho == 3) {
        $("#cpNumeroNota").val("000000" + valor);
    } else if (tamanho == 2) {
        $("#cpNumeroNota").val("0000000" + valor);
    } else if (tamanho == 1) {
        $("#cpNumeroNota").val("00000000" + valor);
    }
}

function consultaDadosNF(filial,notaFiscal,mensagem,retorno,titulo,statusNF) {

    console.log("Filial "+filial);
    console.log("Numero da nota "+notaFiscal);
    console.log("Mensagem "+mensagem);
    console.log("RETORNO "+retorno);
    console.log("TITULO "+titulo);

    var filial      = $("#cpCodFiliais").val();
    var numeroNota  = $("#cpNumeroNota").val();
    var numeroSerie = $("#cpNumeSerie").val();

    var dados2 = {
        "name": "ds_notasFiscaisSaida",
        "fields": null,
        "constraints": [
            {
                "_field": "FILIAL",
                "_initialValue": filial,
                "_finalValue": filial,
                "_type": 1
            }, {
                "_field": "DOCUMENTO",
                "_initialValue": notaFiscal,
                "_finalValue": notaFiscal,
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

                var dataEmissao = value.DATA_EMISSAO;
                var CNPJ = value.CGC;
                var cliente = value.DESC_CLIENTE;
                var valorNF = value.VALOR;
                var tituloAux;
                    if (titulo == "Titulo Baixado" || titulo == "Titulo Baixado Parcialmente") {
                        tituloAux = "1";
                        $("#cpStatusNfAux").val(tituloAux);
                    }else{
                        tituloAux = "2";
                        $("#cpStatusNfAux").val(tituloAux);
                    }        

                    if (statusNF == "Extemporâneo") {
                        $("#cpTipoNotaAux").val("1");
                    }else{
                        $("#cpTipoNotaAux").val("2");
                    }

                    console.log("valor do campo "+ $("#cpTipoNotaAux").val());


                var tamanho = model.content.values.length;

                console.log("Tamanho do retorno " + tamanho);
            
            if (mensagem != "Nota/Série informada não localizada.") {
                
                $("#cpDataEmissao").val(dataEmissao);
                $("#cpCnpjCliente").val(CNPJ);
                $("#cpRazaoSocial").val(cliente);
                $("#cpValorNf").val(valorNF);
                
                $("#DivTipoTitulo").removeClass("hide");
                $("#DivTipoTitulo").text(titulo);
                $("#cpStatusNf").val(titulo);
                $("#cpMensagemProtheus").val(mensagem);
                $("#cpTipoNota").val(statusNF);

            }else{

                console.log("Retorno da integração " + retorno);

                $("#cpDataEmissao").val("");
                $("#cpCnpjCliente").val("");
                $("#cpRazaoSocial").val("");
                $("#cpValorNf").val("");
                $("#cpMotivo").val("");
                $("#DivTipoTitulo").addClass("hide");
                $("#DivTipoTitulo").text("");
                $("#cpTipoNota").val("");
                tituloAux = "";
                $("#cpStatusNfAux").val("");
                $("#cpStatusNf").val("");
                $("#cpMensagemProtheus").val("");

                FLUIGC.modal({
                             title: "Status da Nota fiscal" ,
                             content: mensagem ,
                                   id: "fluig-modal",
                                   size: "full",
                                   actions: [{
                                     'label': 'Fechar',
                                     'bind': 'data-open-modal',
                                     'autoClose': true
                                   }]
                             });
              }
         });
                return model;
        }
    });
}


function buscaNfProtheus(){

    var filial      = $("#cpCodFiliais").val();
    var numeroNota  = $("#cpNumeroNota").val();
    var numeroSerie = $("#cpNumeSerie").val();

    var dados2 = {
        "name": "ds_dadosNotaFiscal",
        "fields": null,
        "constraints": [
            {
                "_field": "FILIAL",
                "_initialValue": filial,
                "_finalValue": filial,
                "_type": 1
            }, {
                "_field": "NUMERONF",
                "_initialValue": numeroNota,
                "_finalValue": numeroNota,
                "_type": 1
            }, {
                "_field": "NUMEROSERIE",
                "_initialValue": numeroSerie,
                "_finalValue": numeroSerie,
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
            loadingNota.show();
        },
        success: function (model) {
            
            $.each(model.content.values, function (index, value) {
                    var retorno  = value.SUCESSO;
                    var mensagem = value.MENSAGEM;
                    var statusNF = value.TIPO;

                    var tituloAux = value.TITULO;
                // if (retorno == "true"){
                   


                    consultaDadosNF($("#cpCodFiliais").val(), numeroNota,mensagem,retorno,tituloAux,statusNF);
                    loadingNota.hide();
                // }else{
                //     FLUIGC.modal({
                //                  title: "Status da Nota fiscal" ,
                //                  content: mensagem ,
                //                        id: "fluig-modal",
                //                        size: "full",
                //                        actions: [{
                //                          'label': 'Fechar',
                //                          'bind': 'data-open-modal',
                //                          'autoClose': true
                //                        }]
                //                  });
                //     loadingNota.hide();
                // }
            });            
            return model;
        }
    }); 
}


function startBtn(id) {
    if (id == "Aprov") { 
        $('#aprovacaoAux').val('sim');
        $('.Aprov').show();
        $('.Reprov').hide();
    }else if(id == "Reprov"){ 
        $('#aprovacaoAux').val('nao');
        $('.Reprov').show();
        $('.Aprov').hide();
    }

}

