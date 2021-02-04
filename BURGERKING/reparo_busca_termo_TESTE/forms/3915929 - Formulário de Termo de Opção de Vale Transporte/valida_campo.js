/*------------------------------- CAMPOS DE TEXTO -------------------------------*/
$(".valida-char")
.focusout(function() {
    var idCampo = $(this).attr("id");
    var titleCampo = $(this).attr("title").toLowerCase();
    var index = $(".tooltiptext").index($("#"+idCampo+"_erro"));
    for(var i = 0; i<$(".tooltiptext").length; i++) {
        if(i != index) {
            $(".tooltiptext:eq("+i+")").hide();
        }
    }
    try {
        if($(this).val() == '') {throw "Este campo é obrigatório";}
    }catch(err) {
        $("#"+idCampo+"_erro_text").val(err+"! Informe um "+titleCampo+" válido!");
        $("#"+idCampo+"_erro").show(1, function() {
            setTimeout(() => {
                $("#"+idCampo+"_erro").hide();
            }, 3000);
        });
    }
});

$(".valida-char")
.focusin(function() {
    var idCampo = $(this).attr("id");
    $("#"+idCampo+"_erro").hide();
});

/*------------------------------- CAMPOS NUMÉRICOS -------------------------------*/
$(".valida-num")
.focusout(function() {
    var idCampo = $(this).attr("id");
    var titleCampo = $(this).attr("title").toLowerCase();
    var index = $(".tooltiptext").index($("#"+idCampo+"_erro"));
    for(var i = 0; i<$(".tooltiptext").length; i++) {
        if(i != index) {
            $(".tooltiptext:eq("+i+")").hide();
        }
    }
    try {
        if($(this).val() == '') {throw "Este campo é obrigatório";}
        if($(this).val().isNaN) {throw "Número inválido";}
        if($(this).val().length < $(this).attr("maxlength")) {throw "Este campo está incompleto";}
    }catch(err) {
        $("#"+idCampo+"_erro_text").val(err+"! Informe um "+titleCampo+" válido!");
        $("#"+idCampo+"_erro").show(1, function() {
            setTimeout(() => {
                $("#"+idCampo+"_erro").hide();
            }, 3000);
        });
    }
});

$(".valida-num")
.focusin(function() {
    var idCampo = $(this).attr("id");
    $("#"+idCampo+"_erro").hide();
});
