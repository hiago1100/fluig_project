
//CAMPO DESCRITOR
function setDescritor(select) {
    var descricao = (select.value != 0) ? select.options[select.options.selectedIndex].innerHTML : '';
    $("#cpDescritor").val(descricao);
}

//LIMPA CAMPOS
function limparCampos(atividade) {

    if ((atividade == 0) || (atividade == 7)) {

        $(".limpaCampos").each(function () {
            if ((this.type == "select-one") && (this.id != "cpHorarioHoraExtraHora") && (this.id != "cpHorarioHoraExtraMinutos")) {
                $(this).val(0);
            } else {
                $(this).val("");
            }
        });
    }
}

//CRIA DATE PIKER PARA SELECIONAR DATA ADMISSAO
function criarDatepicker(tipo, atividade) {

    if ((tipo == 1) || ((tipo == 2) && (atividade <= 7))) {
        $("#cpDataAdmissao").datepicker({ showOn: "button" });

        $("#buscaDataAdmissao").click(function () {
            $("#cpDataAdmissao").datepicker('show');
        });

    } else if ((tipo == 4) && (atividade <= 7)) {

        //DATA AVISO
        $("#cpDataAviso").datepicker({
            showOn: "button",

            //ADICIONA 30 DIAS NO CMAPO DATA DESLGAMENTO
            onSelect: function (data, datepicker) {
                var dtDesligamento = new Date(datepicker.currentYear, datepicker.currentMonth, datepicker.currentDay);

                dtDesligamento.setDate(dtDesligamento.getDate() + 30);

                $("#cpDataDesligamento").datepicker("setDate", dtDesligamento);
            }
        });

        $("#buscaDataAviso").click(function () {
            $("#cpDataAviso").datepicker('show');
        });

        //DATA DESLIGAMENTO
        $("#cpDataDesligamento").datepicker({ showOn: "button" });

        $("#buscaDataDesligamento").click(function () {
            $("#cpDataDesligamento").datepicker('show');
        });

    } else if ((tipo == 5) && (atividade <= 7)) {
        //DATA DE MOVIMENTACAO
        var array = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
        //cpDataMovimentacao
        $("#cpDtMov").datepicker({
            showOn: "button",
            beforeShowDay: function (date) {
                var string = jQuery.datepicker.formatDate('dd', date);
                return [array.includes(string)]
            },
            minDate: new Date()
        });

        $("#buscaDataMovimentacao").click(function () {
            $("#cpDataMovimentacao").datepicker('show');
        });


    } else if ((tipo == 6) && (atividade <= 7)) {
        //DATA HORA EXTRA
        $("#cpDataHoraExtra").datepicker({ showOn: "button" });

        $("#buscaDataHoraExtra").click(function () {
            $("#cpDataHoraExtra").datepicker('show');
        });
    }
}
