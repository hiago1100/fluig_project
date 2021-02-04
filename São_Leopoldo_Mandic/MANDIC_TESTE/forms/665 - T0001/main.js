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

    if (WKNumState == 0) {

        
    }


    if(WKNumState == 108){            

        // alert("oi");

        // $('input[type="hidden"]').each (function(){this.type = 'text';});


    }
       
    } //fim do Edit
                               
};


