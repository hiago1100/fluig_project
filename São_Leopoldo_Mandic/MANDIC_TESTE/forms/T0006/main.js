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

        mostraDivLib();


    },
    onEdit: function(params) {  //Edição do formulário

        mostraDivLib();

        var WKNumState = params.WKNumState;

        if(WKNumState == 0 || WKNumState == 5  ){            
            $(".1,.2,.3,.4,.5,.6,.7").addClass('hide');              
        }

        // Prontuários
        if (WKNumState == 20) {

            $(".2,.3,.4,.5,.6,.7").addClass('hide');
        }
        // dp. financeiro
        if (WKNumState == 21) {
            $(".1,.2,.4,.5,.6,.7").addClass('hide');
        }
        // comite etica
        if (WKNumState == 22) {
            $(".1,.2,.3,.5,.6,.7").addClass('hide');
        }
        // 23 Academico
        if (WKNumState == 23) {
            $(".1,.2,.3,.4,.6,.7").addClass('hide');
        }
        // Emprestimos de armario
        if (WKNumState == 27) {
            $(".1,.2,.3,.4,.5,.7").addClass('hide');              
        }
        // DP. Financeiro Liberação Qualificação
        if (WKNumState == 28) {
            $(".1,.2,.3,.4,.5,.6").addClass('hide');  

            // $("#dataLibeQual").attr('readonly');
            // $("#dataNoQual").attr('readonly');

        }
        if (WKNumState == 47) {

             $(".1,.3,.4,.5,.6,.7").addClass('hide');    

        }
            




       
    } //fim do Edit
                               
};

function mostraDivLib() {   


    if($('#exameQual').is(':checked') == true){

        $(".divLibera").removeClass('hide');

    }else{
        
        $(".divLibera").addClass('hide');        
    }


    if($('#defesa').is(':checked') == true){

        $(".divDefesa").removeClass('hide');

    }else{
        
        $(".divDefesa").addClass('hide');        
    }    

    if ($("#entregaApre").is(':checked') == true) {

        $(".divBiblio").removeClass('hide');

    }else{

        $(".divBiblio").addClass('hide');        
    }

    // desbloqueia a data 

    if($('#libSim').is(':checked') == true){

        $("#dataLibeQual").removeAttr('readonly');
        $("#dataNoQual").prop('readonly', true).val("");
        

    }else if($('#libNao').is(':checked') == true){
        
        $('#dataLibeQual').prop('readonly', true).val("");
        $("#dataNoQual").removeAttr('readonly');        
    }


    // libera data Defesa

    if($('#defLibera').is(':checked') == true){

        $("#dataLibeDef").removeAttr('readonly');
        $("#dataNoDef").prop('readonly', true).val("");
        

    }else if($('#defNaoLibera').is(':checked') == true){
        
        $('#dataLibeDef').prop('readonly', true).val("");
        $("#dataNoDef").removeAttr('readonly');        
    }


    //libera data biblioteca


    if($('#liberado').is(':checked') == true){

        $("#dataLibe").removeAttr('readonly');
        $("#dataNo").prop('readonly', true).val("");
        

    }else if($('#naoLiberado').is(':checked') == true){
        
        $('#dataLibe').prop('readonly', true).val("");
        $("#dataNo").removeAttr('readonly');        
    }
    




    

}
