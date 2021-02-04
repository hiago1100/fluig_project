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
        
    },
    onEdit: function(params) {  //Edição do formulário

        var WKNumState = params.WKNumState;

        if(WKNumState == 0 || WKNumState == 5  ){            
            
        }

        if (WKNumState != 0 || WKNumState != 5) {

            // $(".form-control").attr("readonly","");
        }

    } //fim do Edit                         
}; // fim da chamada de forms



function setZooms(){               
    //Cria zoom de filiais do Fluig
    $(".zoomFilial").on("click",function() {
        openZoom("ds_filial",
                "CODIGO, Codigo, DESCRICAO, Descrição, CGC, CPF/CNPJ",
                "CODIGO, DESCRICAO, CGC, ENDERECO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO",
                "",
                $(this).attr('name')
        );
    });

};

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    var position = getPositionCenter(900,600);
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
            "status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
}

function getPositionCenter(widthDiv, heightDiv){
    var alturaTela  = screen.height;
    var larguraTela = screen.width;                   
    var posicaoX = (larguraTela / 2) - (widthDiv  / 2); 
    var posicaoY = (alturaTela  / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}

function setSelectedZoomItem(item) { 

    if(item.type == 'zoomFilial'){
        $("#cpCodFiliais").val(item.CODIGO);
        $("#cpFilial").val(item.DESCRICAO);
  }
}

function autoComplete(){

    var valor = $("#cpNumeroNota").val();
    var tamanho = valor.length;

    if (tamanho == 6 ) {
        $("#cpNumeroNota").val("00" + valor);
    }else if (tamanho == 5){
        $("#cpNumeroNota").val("000" + valor);
    }else if (tamanho == 4) {
        $("#cpNumeroNota").val("0000" + valor);
    }else if (tamanho == 3) {
        $("#cpNumeroNota").val("00000" + valor);
    }else if (tamanho == 2) {
        $("#cpNumeroNota").val("000000" + valor);
    }else if (tamanho == 1) {
        $("#cpNumeroNota").val("0000000" + valor);
    }

    console.log("Entrou na function");

 var dados2 = {
                "name": "ds_dadosNotaFiscal",
                "fields":null,
                "constraints":[
                    {
                        "_field":"FILIAL",
                        "_initialValue": $("#cpCodFiliais").val(),
                        "_finalValue": $("#cpCodFiliais").val(),
                        "_type":1
                    },{
                        "_field":"NUMERONF",
                        "_initialValue": valor,
                        "_finalValue": valor,
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
               
                var retorno  = value.SUCESSO;
                var mensagem = value.MENSAGEM;
                var statusNF = value.TIPO;

                $("#cpTipoNota").val(statusNF);


       // FLUIGC.modal({
       //              title: "Status da Nota fiscal" ,
       //              content: mensagem ,
       //                    id: "fluig-modal",
       //                    size: "full",
       //                    actions: [{
       //                      'label': 'Fechar',
       //                      'bind': 'data-open-modal',
       //                      'autoClose': true
       //                    }]
       //              });

                consultaDadosNF($("#cpCodFiliais").val(),valor);
        
                });
                
                //console.log("mensagem" + mensagem);
                return model;
                //extratoBancario(dadoss2);
            }
        });
}


function consultaDadosNF(filial,notaFiscal){

 var dados2 = {
                "name": "ds_notasFiscaisSaida",
                "fields":null,
                "constraints":[
                    {
                        "_field":"FILIAL",
                        "_initialValue": filial,
                        "_finalValue": filial,
                        "_type":1
                    },{
                        "_field":"DOCUMENTO",
                        "_initialValue": notaFiscal,
                        "_finalValue": notaFiscal,
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
               
                var dataEmissao  = value.DATA_EMISSAO;
                var CNPJ         = value.CGC;
                var cliente      = value.DESC_CLIENTE;
                var valorNF      = value.VALOR;

                $("#cpDataEmissao").val(dataEmissao);

                $("#cpCnpjCliente").val(CNPJ);
                $("#cpRazaoSocial").val(cliente);
                $("#cpValorNf").val(valorNF);


        
                });
                
                //console.log("mensagem" + mensagem);
                return model;
                //extratoBancario(dadoss2);
            }
        });


}

