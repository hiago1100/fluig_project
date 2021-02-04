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


    },
    onEdit: function (params) {  //Edição do formulário


        var WKNumState = params.WKNumState;

        if (WKNumState != 0) {
            $("#analiseFiscal").show();
            $("#cpObservacao").attr("readonly","");
        }
        if (WKNumState == 19 || WKNumState == 27) {
            $("#acompanhamento").show();
            $("#consideracoesAconpanhamento").attr("readonly","");
            $("#consideracoes").attr("readonly","readonly");
            $("#cpDeferido").attr("readonly","readonly");
            $("#cpDeferido").removeClass("hide");

        }
        if (WKNumState == 9) {
            $("#cpDeferido").removeClass("hide");
            $("#consideracoes").attr('readonly','');
        }


    } //fim do Edit                         
}; // fim da chamada de forms


function confirmaDef(value){

    if(value == "sim"){
        FLUIGC.message.confirm({
                    message: 'Esta nota esta Deferida?',
                    size: "full",
                    title: 'Confirmação',
                    labelYes: 'Sim',
                    labelNo: 'Não'
                }, function(result, el, ev) {
                    console.log("Resultado" +result);

                    if (result == true) {
                        $("#workflowActions > button:first-child", window.parent.document).click();
                    }else{

                    }  
                     
                });
        }      
}