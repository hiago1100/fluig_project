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

    },
    onEdit: function (params) {  //Edição do formulário

    
    //   
    
        validaMulta($("#multa").val());
        var WKNumState = params.WKNumState;
       // 
       if (WKNumState == 0) {
            $("#multaContrato").addClass('hide');

       }
       if (WKNumState == 12) {
            $("#porcentagem").attr('readonly','');
            $("#valor").attr('readonly','');
            $("#multa").attr('readonly','readonly');
            $(".aprovaDiv").addClass("hide");          
       }
        if (WKNumState == 5 || WKNumState == 19 || WKNumState == 25 || WKNumState == 31 || WKNumState == 37 || WKNumState == 43 || WKNumState == 45) {
            $("#filial").attr('readonly','');
            $("#fornecedor").attr('readonly','');
            $("#NumeroContrato").attr('readonly','');
            $("#cpMotivo").attr('readonly',''); 
            $("#cpCc").attr("readonly","");

            $("#cnpjfornecedor").attr("readonly","");
            $("#email").attr("readonly","");
            $("#cpTelefone").attr("readonly","");
            $("#cpSaldo").attr("readonly","");
            
        }
        if (WKNumState == 19 || WKNumState == 25 || WKNumState == 31 || WKNumState == 37) {
            $("#multaContrato").removeClass("hide");
            $(".aprovaDiv").addClass("hide");
            $("#porcentagem").attr('readonly','');
            $("#valor").attr('readonly','');
            $("#multa").attr('readonly','readonly');           
        }
        if (WKNumState == 19) {
            $(".analiseContrato").removeClass('hide');
        }

        if (WKNumState == 25) {
            $(".validacaoContrato").removeClass('hide');
        }

        // Máscara para porcentagem no campo 
        $('.porcentagem').mask('Z#9V##', {
            translation: {
                'Z': {
                  pattern: /[\-\+]/,
                  optional: true
                },
                'V': {
                  pattern: /[\,]/
                },
                '#': {
                  pattern: /[0-9]/,
                  optional: true
                }
            }
        });

        $(".porcentagem").on('blur',function(){
            if($(this).val().length > 0)
               $(this).val( $(this).val() + '%' );
        }).on('focus',function(){
              $(this).val( $(this).val().replace('%','') ); 
        });


    } //fim do Edit                         
}; // fim da chamada de forms


function setSelectedZoomItem(selectedItem) {
    var typer = selectedItem.inputId;
    if (typer == 'filial') {

        $('#filial').val(selectedItem.DESCRICAO);
        $('#codFilial').val(selectedItem.CODIGO);

    // } else if (typer == 'fornecedor') {


    //     $('#fornecedor').val(selectedItem.DESCRICAO);
    //     $('#codFornecedor').val(selectedItem.CODIGO);
    //     $('#cnpjfornecedor').val(selectedItem.CGC);
    //     $('#email').val(selectedItem.EMAIL);
    //     $('#loja').val(selectedItem.LOJA);

        

    //     reloadZoomFilterValues("NumeroContrato", "FORNECEDOR," + $('#codFornecedor').val() + ",FILIAL," + $('#codFilial').val() + ",EMAIL," + "pedro.neves@oncoclinicas.com" + ",liberaracesso," + $('#loja').val());

    } else if (typer == 'NumeroContrato') {

        $('#NumeroContrato').val(selectedItem.CONTRATO);
        $('#cpSaldo').val("R$ " + selectedItem.SALDO);
        $('#numeroContratoAux').val(selectedItem.CONTRATO);
        
    } else if (typer == "cpCc"){

        $("#CTT_CUSTO").val(selectedItem.CODIGO);
       

         console.log("Gestores 1 = " + $("#idAprovGestor1").val());
         console.log("Gestores 2 = " + $("#idAprovGestor2").val());
         console.log("Gestores 3 = " + $("#idAprovGestor3").val());
         console.log("Gestores 4 = " + $("#idAprovGestor4").val());
         console.log("Gestores 5 = " + $("#idAprovGestor5").val());


    }

}

function appWorkflow(id){
    var aprova  = "1";
    var reprova = "2";

    if (id == "docOk") {
        $("#analiseDoc").val(aprova);
        $(".likeDocOk").removeClass("hide");
        $(".dislikeAnaliseNok").addClass("hide");
        
    }else if(id == "analiseNok"){
        $("#analiseDoc").val(reprova);
        $(".dislikeAnaliseNok").removeClass("hide");
        $(".likeDocOk").addClass("hide");   
    }
}

function validaMulta(value){
    if (value == "2") {
        $(".campMult").removeClass('hide');
    }else{
        $(".campMult").addClass('hide');
    }
}

function removedZoomItem(removedItem) {

    // if (removedItem.inputId == "fornecedor") {

    //     $("#cnpjfornecedor").val('');
    //     $("#email").val('');
    //     $("#cpTelefone").val('');
    //     $("#cpSaldo").val('');
    //     $("#NumeroContrato").val('');
    // }

    if (removedItem.inputId == "NumeroContrato") {

        $("#cpSaldo").val('');

    }

    if (removedItem.inputId == "filial") {

        $("#cnpjfornecedor").val('');
        $("#email").val('');
        $("#cpTelefone").val('');
        $("#cpSaldo").val('');
        $("#NumeroContrato").val('');
        $("#fornecedor").val('');
    }
}

function buscaGestor(){
    var c1 = DatasetFactory.createConstraint("filial", $("[name=codFilial]").val(), $("[name=codFilial]").val(), ConstraintType.MUST); 
    var c2 = DatasetFactory.createConstraint("centroCusto", $("[name=CTT_CUSTO]").val(), $("[name=CTT_CUSTO]").val(), ConstraintType.MUST); 
    var c3 = DatasetFactory.createConstraint("valor", $("[name=valor]").val(), $("[name=valor]").val(), ConstraintType.MUST); 
    var constraints = new Array(c1, c2, c3); 

    var ds_aprov = DatasetFactory.getDataset("ds_alcadaAprovacaoPagamentos", null, constraints, null);
     $("#proximoAprovador").val("");
     $("#nivelAtualAprovacao").val("0");
     $("#idAprovGestor1").val(""); 
     $("#idAprovGestor2").val(""); 
     $("#idAprovGestor3").val(""); 
     $("#idAprovGestor4").val(""); 
     $("#idAprovGestor5").val(""); 

     for (var x = 0; x < ds_aprov.values.length; x++) { 
        if($("#proximoAprovador").val() == ""){        
            $("#proximoAprovador").val(ds_aprov.values[x].IDAPROVADOR);
            $("#nivelAtualAprovacao").val("0");
        } 
      $("#idAprovGestor" + (x + 1)).val(ds_aprov.values[x].IDAPROVADOR); 

    }
}

function aprovaContrato(id){
    var aprova  = "Sim";
    var reprova = "Nao";

    if (id == "analiseAprov") {
        $("#analise").val(aprova);
        $(".likeAprova").removeClass("hide");
        $(".dislikeAprova").addClass("hide");
        
    }else if(id == "analiseReprov"){
        $("#analise").val(reprova);
        $(".dislikeAprova").removeClass("hide");
        $(".likeAprova").addClass("hide");   
    }
}

function avaliacaoContrato(id){
    var aprova  = "Sim";
    var reprova = "Nao";

    if (id == "avaliaOk") {
        $("#avaliacao").val(aprova);
        $(".AprovAvalia").removeClass("hide");
        $(".ReprovAvalia").addClass("hide");
        
    }else if(id == "avaliaNok"){
        $("#avaliacao").val(reprova);
        $(".ReprovAvalia").removeClass("hide");
        $(".AprovAvalia").addClass("hide");
        $(".obsReprova").show();   
    }
}

function buscaFornecedor(valor){
    var dados2 = {
                "name": "ds_fornecedor",
                "fields":null,
                "constraints":[
                    {
                        "_field":"CGC",
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
                       
                if (value.DESCRICAO != "") {        
                    $('#fornecedor').val(value.DESCRICAO);
                    $('#codFornecedor').val(value.CODIGO);
                    $('#cnpjfornecedor').val(value.CGC);
                    $('#email').val(value.EMAIL);
                    $('#loja').val(value.LOJA);
                    reloadZoomFilterValues("NumeroContrato", "FORNECEDOR," + $('#codFornecedor').val() + ",FILIAL," + $('#codFilial').val() + ",EMAIL," + "pedro.neves@oncoclinicas.com" + ",liberaracesso," + $('#loja').val());
                }
            });
                
                //console.log("mensagem" + mensagem);
                return model;
                //extratoBancario(dadoss2);
            }
        });
}



