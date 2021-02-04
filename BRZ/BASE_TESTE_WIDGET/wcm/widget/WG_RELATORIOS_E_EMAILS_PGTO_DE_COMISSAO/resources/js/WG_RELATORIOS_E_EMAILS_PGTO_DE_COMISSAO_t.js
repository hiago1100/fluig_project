    var brz_panel = SuperWidget.extend({
    init: function() {
        startPanel();
    },
    bindings: {
        local: {
            'Bonification'       : ['click_executeBonification'],
            'sendDbAwards'       : ['click_updateFormAwards'],
            'DemandMin'          : ['click_executeDemandaMin'],
            'sendDbDemandMin'    : ['click_updateFormMin'],
            'DemandMax'          : ['click_executeDemandaMax'],
            'sendDbDemandMax'    : ['click_updateFormMax'],
            'Reports'            : ['click_executeReports'],
            'tabReports'         : ['click_tabReports'],
            'sendDbReports'      : ['click_sendDbReports'],
            'NFS'                : ['click_executeNFS'],
            'tabNFS'             : ['click_tabNFS'],
            'sendDbNFS'          : ['click_sendDbNFS'],
            'Cube'               : ['click_executeCube'],
            'tabCube'            : ['click_tabCube'],
            'Brz'                : ['click_executeBrz'],
            'tabBRZ'             : ['click_tabBRZ'],
            'tabComissionBRZ'    : ['click_tabComissionBRZ'],
            'ComissionBRZ'       : ['click_executeComissionBRZ'],
            'ExportExcel'        : ['click_ExportExcel'],
            'tabSuper'           : ['click_tabSuper'],
            'Super'              : ['click_executeSuper'],
            'exportExcelSuper'   : ['click_exportExcelSuper'],
            'sendDbComissionBRZ' : ['click_updateFormsendDbComissionBRZ'],
            'tabParameters'      : ['click_tabParameters'],
            'Parameters'         : ['click_executeParameters'],
            'tabParametersEmail' : ['click_tabParametersEmail'],
            'ParametersEmail'    : ['click_executeParametersEmail'],
        },
        global: {}
    },

    // Executa a tabela de premiação
    executeBonification: function() {
        
        loader("100");

        setTimeout(function(){
            $("#Awards_filter > *, #Awards_table > *, #Awards_pag > *").remove();

            var dataInicio = $("#dtIniBonification").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinBonification").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var emprBoni = $("#slEmprBoni").val();
            var imobBoni = $("#slImoBoni").val();

            if (dataInicio && dataFim ) {
                if (emprBoni && !imobBoni) {
                    executeDBSearch(dataInicio, dataFim, emprBoni, "", "awards");
                } else if (emprBoni && imobBoni ) {
                    executeDBSearch(dataInicio, dataFim, emprBoni, imobBoni, "awards");
                } else if (!emprBoni && imobBoni ) {
                    executeDBSearch(dataInicio, dataFim, "", imobBoni, "awards");
                } else {
                    executeDBSearch(dataInicio, dataFim, "", "", "awards");
                    $("#hold_slEmprBoni").removeClass("hide");
                }
            } else {
                FLUIGC.message.alert({
                    message: 'Favor preencher o período para filtrar.',
                    title: 'Erro',
                    label: 'OK'
                });
            }

            loader("-1");
        },200);        
    },// Executa a tabela de demanda minima
    executeDemandaMin: function() {

        loader("100");

        setTimeout(function(){
            $("#DemandMin_filter > *, #DemandMin_table > *, #DemandMin_pag > *").remove();

            var dataInicio = $("#dtIniDemandMin").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinDemandMin").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }
            var emprDemandMin = $("#slEmprDemandMin").val();
            var imobDemandMin = $("#slImoDemandMin").val();

            if (dataInicio && dataFim) {
                if (emprDemandMin && !imobDemandMin) {
                    executeDBSearch(dataInicio, dataFim, emprDemandMin, "", "demandMin");
                } else if (emprDemandMin && imobDemandMin) {
                    executeDBSearch(dataInicio, dataFim, emprDemandMin, imobDemandMin, "demandMin");
                }else if (!emprDemandMin && imobDemandMin ) {
                    executeDBSearch(dataInicio, dataFim, "", imobDemandMin, "demandMin");
                }  else {
                    executeDBSearch(dataInicio, dataFim, "", "", "demandMin");
                    $("#hold_slEmprBoni").removeClass("hide");
                }
            } else {
                FLUIGC.message.alert({
                    message: 'Favor preencher o período para filtrar.',
                    title: 'Erro',
                    label: 'OK'
                });
            }

            loader('-1');
        },200);
    },// Executa a tabela de demanda maxima
    executeDemandaMax: function() {

        loader("100");

        setTimeout(function(){
            $("#DemandMax_filter > *, #DemandMax_table > *, #DemandMax_pag > *").remove();

            // DEMANDA MINIMA

            var dataInicio = $("#dtIniDemandMax").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinDemandMax").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var emprDemandMax = $("#slEmprDemandMax").val();
            var imobDemandMax = $("#slImoDemandMax").val();

            if (dataInicio && dataFim) {
                if (emprDemandMax && !imobDemandMax) {
                    executeDBSearch(dataInicio, dataFim, emprDemandMax, "", "demandMax");
                } else if (emprDemandMax && imobDemandMax) {
                    executeDBSearch(dataInicio, dataFim, emprDemandMax, imobDemandMax, "demandMax");
                }else if (!emprDemandMax && imobDemandMax ) {
                    executeDBSearch(dataInicio, dataFim, "", imobDemandMax, "demandMax");
                } else {
                    executeDBSearch(dataInicio, dataFim, "", "", "demandMax");
                    $("#hold_slEmprBoni").removeClass("hide");
                }
            } else {
                FLUIGC.message.alert({
                    message: 'Favor preencher o período para filtrar.',
                    title: 'Erro',
                    label: 'OK'
                });
            }

            loader('-1');
        },200);
    },// Executa a tabela de relatórios
    updateFormAwards: function() {
        
        loader("100");

        setTimeout(function(){
            $('#tableAwards').dataTable().fnDestroy();
            
            var status = "false";

            $("#tableAwards tbody tr").each(function() {
                var elm = $(this);
                var chk = elm.find("input[id^='select_sale_awards_']:not(:disabled)");
                var val = elm.find("input[id^='cpValBoni_']:not([readonly])").val();

                if(val && val != "null" && val != "undefined" && val != null && val != undefined){
                    if (chk.is(":checked")) {
                        
                        elm.find("input[id^='cpValBoni_']").mask('###0.00', { reverse: true });

                        var valor = elm.find("input[id^='cpValBoni_']").val();
                        var formId = elm.find("input[id^='Aw_documentid_']").val();

                        updateFields(valor, 'true', "", "", formId, 'premio', "");

                        elm.find("input[id^='cpValBoni_']").attr("readonly", "readonly");
                        chk.prop("disabled", true);

                        status = "true";

                        elm.find("input[id^='cpValBoni_']").mask('#.##0,00', { reverse: true });

                    }else{
                        
                        status = "abc";

                        elm.find("input[id^='cpValBoni_']:not([readonly])").css("border", "solid 1px red");

                        FLUIGC.message.alert({
                            message: 'Há valor pra ser aplicado e o campo de aprovação não está selecionado. Favor selecionar e enviar novamente',
                            title: 'Erro',
                            label: 'OK'
                        });
                    }
                }


                if (chk.is(":checked") && !val) elm.find("input[id^='cpValBoni_']:not([readonly])").css("border", "solid 1px red");

                
            });
            $("#tableAwards").DataTable({
                dom: '',
                paging: true,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });

            if(status == "true"){
                FLUIGC.message.alert({
                    message: 'Prêmio aplicado com sucesso.',
                    title: 'Obrigado',
                    label: 'OK'
                });
            } 
            if(status == "false"){
                FLUIGC.message.alert({
                    message: 'Não há valor pra ser aplicado, verifique se o campo de prêmio está preenchido ou o campo de aprovação não está selecionado.',
                    title: 'Erro',
                    label: 'OK'
                });
            }     
            loader('-1');
        },200);
    },// Atualiza o formulário com a demanda minima
    updateFormMin: function() {
        
        loader("100");

        setTimeout(function(){
            $('#tableDemandMin').dataTable().fnDestroy();
            var status = false;
            $("#tableDemandMin tbody tr").each(function() {
                var elm = $(this);
                var chk = elm.find("input[id^='select_sale_min_']:not(:disabled)");

                if (chk.is(":checked")) {
                    var formId = elm.find("input[id^='Dm_documentid_']").val();
                    chk.prop("disabled", true);
                    updateFields('', 'true', "", "", formId, 'demandaMin', "");
                    
                    if(!elm.find("td:nth-child(18)").text().trim()){
                        elm.find("td:nth-child(18)").html(processAlert());    
                    }

                    status = true;
                }
            });
            $("#tableDemandMin").DataTable({
                dom: '',
                paging: true,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });

            if(status){
                FLUIGC.message.alert({
                    message: 'Demanda Mínima aplicada com sucesso.',
                    title: 'Obrigado',
                    label: 'OK'
                });    
            }else{
                FLUIGC.message.alert({
                    message: 'Não há nenhuma venda aprovada calculo de demanda mínima.',
                    title: 'Erro',
                    label: 'OK'
                });
            }
            loader('-1');
        },200);
    },// Atualiza o formulário com a demanda maxima
    updateFormMax: function() {

        loader("100");

        setTimeout(function(){

            var status = false;
            $('#tableDemandMax').dataTable().fnDestroy();
            $("#tableDemandMax tbody tr").each(function() {
                var elm = $(this);
                var chk = elm.find("input[id^='select_sale_max_']:not(:disabled)");

                if (chk.is(":checked")) {
                    var formId = elm.find("input[id^='Dma_documentid_']").val();
                    chk.prop("disabled", true);
                    updateFields('', 'true', "", "", formId, 'demandaMax', "");
                    status = true;
                    if(!elm.find("td:nth-child(19)").text().trim()){
                        elm.find("td:nth-child(19)").html(processAlert());    
                    }
                }
            });
            $("#tableDemandMax").DataTable({
                dom: "",
                paging: true,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });
            
            if(status){
                FLUIGC.message.alert({
                    message: 'Demanda Máxima aplicada com sucesso.',
                    title: 'Obrigado',
                    label: 'OK'
                });    
            }else{
                FLUIGC.message.alert({
                    message: 'Não há nenhuma venda aprovada calculo de demanda máxima.',
                    title: 'Erro',
                    label: 'OK'
                });
            }
            loader('-1');
        },200);
    },

    // cria o consolidado de envio de relatorios para imobiliaria
    executeReports: function() {

        loader("100");
        setTimeout(function(){
            $("#Reports_table > .row > *").remove();

            var dataInicio = $("#dtIniReports").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinReports").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var slEmprReports = $("#slEmprReports").val();
            var slImoReports = $("#slImoReports").val();


            if (dataInicio && dataFim ) {
                if (slEmprReports && !slImoReports) {
                    var arrImobi = getImobConsolidated(dataInicio, dataFim);
                    for(i = 0; i < arrImobi.length; i++){
                        getConsolidated(dataInicio, dataFim, slEmprReports, '', arrImobi[i], i);
                    }
                } else if(slEmprReports && slImoReports){
                    getConsolidated(dataInicio, dataFim, slEmprReports, slImoReports, slImoReports, 0);
                } else if(!slEmprReports && slImoReports){
                    getConsolidated(dataInicio, dataFim, '', slImoReports, slImoReports, 0);
                } else {
                    var arrImobi = getImobConsolidated(dataInicio, dataFim);
                    for(i = 0; i < arrImobi.length; i++){
                        getConsolidated(dataInicio, dataFim, '', '', arrImobi[i], i);
                    }
                }
            } else {
                alert("Favor preencher o período para filtrar.");
            }

            $("#Reports_table .panel.panel-default").each(function(){
                var elm = $(this);

                elm.find("table.table-consolided").css("margin-bottom", "20px");

                elm.find("table.table-consolided, table.table-consolided tr, table.table-consolided tr th, table.table-consolided tr td").css({
                    "border": "none",
                    "border-collapse": "separate"
                });

                elm.find("table.table-consolided thead tr th").css({
                    "background"     : "transparent",
                    "color"          : "#58595b",
                    "font-weight"    : "bold",
                    "text-align"     : "center",
                    "text-shadow"    : "none",
                    "border"         : "solid 1px #f0dc50",
                    "border-radius"  : "10px",
                    "text-transform" : "uppercase"
                });

                elm.find("table.table-consolided tr, table.table-consolided tbody tr td").css({
                    "text-align": "center",
                    "border": "none",
                });

                elm.find("table.table-consolided thead tr th, table.table-consolided tbody tr td").css({
                    "white-space" : "nowrap",
                    "padding"     : "10px",
                    "width"       : "auto"
                });

                elm.find("table.table-consolided tbody tr.total").css({
                    "background": "#f0dc50",
                    "border-radius": "10px",
                });
                elm.find("table.table-consolided tbody tr.total td").css("color", "#58595b");
                elm.find("table.table-consolided tbody tr.total td:first-child").css("text-align", "right");
                elm.find("div[id^='BlocoConsolidado_'] h1").css({
                    "font-size": "1.5em",
                    "font-weight": "bolder",
                });

                var empreendimento = elm.find(".emp").text();
                elm.find(".emp-title").text(empreendimento);

                elm.find("table[id^='tableBruto_'] tbody tr td").css("border", "solid 1px #f0dc50");
                elm.find("table[id^='tableBruto_'] thead tr th:first-child").css("border-radius", "10px 0 0 0")
                elm.find("table[id^='tableBruto_'] thead tr th:nth-child(2), table[id^='tableBruto_'] thead tr th:nth-child(3)").css("border-radius", "0")
                elm.find("table[id^='tableBruto_'] thead tr th:last-child").css("border-radius", "0 10px 0 0")

                elm.find("table[id^='tableBruto_'] tbody tr td:first-child").attr("name", "brTotal");
                elm.find("table[id^='tableBruto_'] tbody tr td:nth-child(2)").attr("name", "brDesconto");
                elm.find("table[id^='tableBruto_'] tbody tr td:nth-child(3)").attr("name", "brDespesa");
                elm.find("table[id^='tableBruto_'] tbody tr td:last-child").attr("name", "brTotalNF");

            });
            
            var count = 0;
            $("#Reports_table .panel.panel-default").each(function(){
                var tableBruto = $("#tableBruto_"+count+" tbody tr").length;
                var table1Parc = $("#table1Parc_"+count+" tbody tr").length;
                var table2Parc = $("#table2Parc_"+count+" tbody tr").length;
                var tableParcU = $("#tableParcU_"+count+" tbody tr").length;
                var tableDist  = $("#tableDist_"+count+" tbody tr").length;

                if(tableBruto == 0 && table1Parc == 0 && table2Parc == 0 && tableParcU == 0 && tableDist == 0){
                    $(this).remove();
                }else{
                    if(table1Parc == 0 ) $("#table1Parc_"+count+", #tbl1Name_"+count).remove();
                    if(table2Parc == 0 ) $("#table2Parc_"+count+", #tbl2Name_"+count).remove();
                    if(tableParcU == 0 ) $("#tableParcU_"+count+", #tbl3Name_"+count).remove();
                    if(tableDist  == 0 ) $("#tableDist_"+count+", #tbl4Name_"+count).remove();
                }
                count++;
            });

            var t = $("#Reports_table .panel.panel-default").length;
            if(t == 0){
                var txt = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center messageTime"><h1>Não há vendas para este período, imobiliária ou empreendimento.<br> Favor escolher outro filtro.</h1></div>'
                $("#Reports_table").append(txt);
            }else{
                $(".messageTime").remove();
            }

            $("#selectAllConsolided").click(function(){
                $("#Reports_table .panel.panel-default").each(function(){
                    $(this).find("input[id^='ckConsolidaded_']").click();
                }); 
            });

            $('.money').focusout(function(){
                $("#cpValorTotal").mask('#0.00', { reverse: true });
                $(this).mask('#0.00', { reverse: true });

                var id  = $(this).attr('name').split('_').reverse();
                var val = $(this).val();

                var valTotal = $("#cpValorTotal").val();

                var TotalL = parseFloat(valTotal) - parseFloat(val);
                    TotalL = TotalL.toFixed(2);

                $('#tableBruto_'+id[0]+' tbody tr td:nth-child(3)').text(numeroParaMoeda(val));
                $('#tableBruto_'+id[0]+' tbody tr td:last-child').text(numeroParaMoeda(TotalL));

                $("#cpValorTotal").mask('#0.00', { reverse: true });

            });

            $("table[id^='table1Parc_'] tbody tr:not(.total)").each(function(){
                var el = $(this);
                el.find("td:nth-child(1)").attr("name", "p1Data")
                el.find("td:nth-child(2)").attr("name", "p1NuV")
                el.find("td:nth-child(3)").attr("name", "p1Emp")
                el.find("td:nth-child(4)").attr("name", "p1Blc")
                el.find("td:nth-child(5)").attr("name", "p1Uni")
                el.find("td:nth-child(6)").attr("name", "p1Cli")
                el.find("td:nth-child(7)").attr("name", "p1Imo")
                el.find("td:nth-child(8)").attr("name", "p1Cor")
                el.find("td:nth-child(9)").attr("name", "p1TVd")
                el.find("td:nth-child(10)").attr("name", "p1Bas")
                el.find("td:nth-child(11)").attr("name", "p1Par")
                el.find("td:nth-child(12)").attr("name", "p1Bon")
            })
            $("table[id^='table2Parc_'] tbody tr:not(.total)").each(function(){
                var el = $(this);
                el.find("td:nth-child(1)").attr("name",  "p2Data")
                el.find("td:nth-child(2)").attr("name",  "p2DtAg")
                el.find("td:nth-child(2)").attr("name",  "p2NuV")
                el.find("td:nth-child(3)").attr("name",  "p2Emp")
                el.find("td:nth-child(4)").attr("name",  "p2Blc")
                el.find("td:nth-child(5)").attr("name",  "p2Uni")
                el.find("td:nth-child(6)").attr("name",  "p2Cli")
                el.find("td:nth-child(7)").attr("name",  "p2Imo")
                el.find("td:nth-child(8)").attr("name",  "p2Cor")
                el.find("td:nth-child(9)").attr("name",  "p2TVen")
                el.find("td:nth-child(10)").attr("name", "p2Bas")
                el.find("td:nth-child(11)").attr("name", "p2Par")
                el.find("td:nth-child(12)").attr("name", "p2Dmn")
                el.find("td:nth-child(12)").attr("name", "p2Dmx")
                el.find("td:nth-child(12)").attr("name", "p2Bon")
            })
            // $("table[id^='tableParcU_'] tbody tr:not(.total)").each(function(){
            //     var el = $(this);
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            // })
            // $("table[id^='tableDist_'] tbody tr:not(.total)").each(function(){
            //     var el = $(this);
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            //     elm.find("td").attr("name", "")
            // })

            loader("-1");
        },200);
    },// executa o init na aba de envio de relatorios para imobiliaria
    tabReports: function(){

        $("#dtIniReports").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinReports').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniReports").on("dp.change", function(e) {
            $('#dtFinReports').data("DateTimePicker").minDate(e.date);
        });

        getEmprendimentos("slEmprReports");
        getImobiliarias("slImoReports");

        $("#slEmprReports, #slImoReports").select2();
    },// Envia email para imobiliaria
    sendDbReports: function(){

        loader("100");
        setTimeout(function(){

            var status = false;
            var obj2 = [], obj3 = [];
            var id, num;
            $("#Reports_table .panel").each(function(){
                var elm = $(this);
                var chk = elm.find("input[type='checkbox']");
                    id  = chk.attr("id").split("_").reverse();

                if(chk.is(':checked')){

                    var ini = elm.find(".dtInicio").text();
                    var fim = elm.find(".dtFim").text();
                    var emp = elm.find(".emp").text();
                    var imo = elm.find(".imobiliaria-title").text();
                    var obs = elm.find("textarea").val();

                    // consolidado da tabela geral
                    var vbrt = elm.find("td[name='brTotal']   ").text();
                    var desc = elm.find("td[name='brDesconto']").text();
                    var desp = elm.find("td[name='brDespesa'] ").text();
                    var vnf  = elm.find("td[name='brTotalNF'] ").text();
                    
                    ini = ini.split("/")
                    ini = ini[2]+"-"+ini[1]+"-"+ini[0];

                    fim = fim.split("/")
                    fim = fim[2]+"-"+fim[1]+"-"+fim[0];

                    // table Valor Bruto
                    var obj1 = {
                        "ini" : ini,
                        "fim" : fim,
                        "emp" : emp,
                        "imo" : imo,
                        "vbrt": vbrt,
                        "desc": desc,
                        "desp": desp,
                        "vnf" : vnf
                    }

                    num = updateTableConsolidated(obj1, "bruto");


                    var DataVenda = [], NumVenda = [], Empreendimento = [], Imobiliaria = [], Bloco = [], Unidade = [], NomeCliente = [], NomeCorretor = [], TipoVenda = [], ValorBase = [], ValorPriParcCom = [], ValorParcBoni = [], TotalComissao = [], TotalBonificacao = [];
                    var val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12;



                    var P2_DataVenda = [], P2_DtVendaAg = [], P2_NumVenda = [], P2_Empreendimento = [], P2_Bloco = [], P2_Unidade = [], P2_NomeCliente = [], P2_Imobiliaria = [], P2_NomeCorretor = [], P2_TipoVenda = [], P2_ValorBase = [], P2_ValorPriParcCom = [], P2_DemandaMin = [], P2_DemandaMax = [], P2_ValorParcBoni = [];
                    var val21, val22, val23, val24, val25, val26, val27, val28, val29, val210, val211, val212, val213, val214, val215;
                    
                    $("#table1Parc_"+id[0]+" tbody tr:not(.total)").each(function(i){
                        var el = $(this);
                        
                        val1  = el.find("td[name='p1Data']").text().split("/");
                        val1 = val1[2]+"-"+val1[1]+"-"+val1[0];



                        val2  = el.find("td[name='p1NuV']").text();
                        val3  = el.find("td[name='p1Blc']").text();
                        val4  = el.find("td[name='p1Uni']").text();
                        val5  = el.find("td[name='p1Cli']").text();
                        val6  = el.find("td[name='p1Cor']").text();
                        val7  = el.find("td[name='p1TVd']").text();
                        val8  = el.find("td[name='p1Bas']").text();
                        val9  = el.find("td[name='p1Par']").text();
                        val10 = el.find("td[name='p1Bon']").text();
                        val11 = el.find("td[name='p1Emp']").text(); 
                        val12 = el.find("td[name='p1Imo']").text(); 

                        DataVenda.push(val1);
                        NumVenda.push(val2);
                        Bloco.push(val3);
                        Unidade.push(val4);
                        NomeCliente.push(val5);
                        NomeCorretor.push(val6);
                        TipoVenda.push(val7);
                        ValorBase.push(val8);
                        ValorPriParcCom.push(val9);
                        ValorParcBoni.push(val10);
                        Empreendimento.push(val11);
                        Imobiliaria.push(val12);
                    });

                    var l = $("#table2Parc_"+id[0]+" tbody tr:not(.total)").length;

                    if(l>0){

                        $("#table2Parc_"+id[0]+" tbody tr:not(.total)").each(function(i){
                            var el = $(this);
                            
                            val21  = el.find("td[name='p2Data']").text().split("/");
                            val21 = val21[2]+"-"+val21[1]+"-"+val21[0];

                            val21  = el.find("td[name='p2DtAg']").text().split("/");
                            val21 = val21[2]+"-"+val21[1]+"-"+val21[0];

                            val23  = el.find("td[name='p2NuV']").text();
                            val24  = el.find("td[name='p2Emp']").text();
                            val25  = el.find("td[name='p2Blc']").text();
                            val26  = el.find("td[name='p2Uni']").text();
                            val27  = el.find("td[name='p2Cli']").text();
                            val28  = el.find("td[name='p2Imo']").text();
                            val29  = el.find("td[name='p2Cor']").text();
                            val210 = el.find("td[name='p2TVen']").text();
                            val211 = el.find("td[name='p2Bas']").text(); 
                            val212 = el.find("td[name='p2Par']").text();
                            val213 = el.find("td[name='p2Dmn']").text();
                            val214 = el.find("td[name='p2Dmx']").text(); 
                            val215 = el.find("td[name='p2Bon']").text();

                            P2_DataVenda.push(val21);
                            P2_DtVendaAg.push(val21);
                            P2_NumVenda.push(val23);
                            P2_Empreendimento.push(val24);
                            P2_Bloco.push(val25);
                            P2_Unidade.push(val26);
                            P2_NomeCliente.push(val27);
                            P2_Imobiliaria.push(val28);
                            P2_NomeCorretor.push(val29);
                            P2_TipoVenda.push(val210);
                            P2_ValorBase.push(val211);
                            P2_ValorPriParcCom.push(val212);
                            P2_DemandaMin.push(val213);
                            P2_DemandaMax.push(val214);
                            P2_ValorParcBoni.push(val215);
                        });
                    }

                    var TotalComissao = $("#table1Parc_"+id[0]+" tbody tr.total td:nth-child(2)").text();
                    var TotalBonificacao = $("#table1Parc_"+id[0]+" tbody tr.total td:last-child").text();

                    // table Primeira Parcela
                    obj2 = {
                        "ID": num,
                        "NmImob": Imobiliaria,
                        "DtVenda": DataVenda,
                        "NuVenda": NumVenda,
                        "Emp": Bloco,
                        "Bl": Unidade,
                        "Uni": NomeCliente,
                        "NmCliente": NomeCorretor,
                        "NmCorretor": TipoVenda,
                        "TpVenda": ValorBase,
                        "VlBase": ValorPriParcCom,
                        "VlPriParcCom": ValorParcBoni,
                        "VlParcBoni": Empreendimento,   
                        "TotComissao": TotalComissao,
                        "TotBonificacao": TotalBonificacao,
                    }

                    updateTableConsolidated(obj2, "parc1");

                    obj3 = {
                        "ID": num,
                        "DataVenda": P2_DataVenda,
                        "DtVendaAg": P2_DtVendaAg,
                        "NumVenda": P2_NumVenda,
                        "Empreendimento": P2_Empreendimento,
                        "Bloco": P2_Bloco,
                        "Unidade": P2_Unidade,
                        "NomeCliente": P2_NomeCliente,
                        "Imobiliaria": P2_Imobiliaria,
                        "NomeCorretor": P2_NomeCorretor,
                        "TipoVenda": P2_TipoVenda,
                        "ValorBase": P2_ValorBase,
                        "ValorPriParcCom": P2_ValorPriParcCom,
                        "DemandaMin": P2_DemandaMin,
                        "DemandaMax": P2_DemandaMax,
                        "ValorParcBoni": P2_ValorParcBoni,
                    }

                    updateTableConsolidated(obj3, "parc2");

                    var html  = $("#msg_"+id).html();
                        html += $("#tableBruto_"+id).html();
                        html += "<br><span><strong style='font-size:1.5em;'>Observações</strong><br>"+$("#cpObs_"+id).val()+"</span>";
                        html += "<hr>";
                        html += $("#tbl1Name_"+id).html()   || "";
                        html += $("#table1Parc_"+id).html() || "";
                        html += $("#tbl2Name_"+id).html()   || "";
                        html += $("#table2Parc_"+id).html() || "";
                        html += $("#tbl3Name_"+id).html()   || "";
                        html += $("#tableParcU_"+id).html() || "";
                        html += $("#tbl4Name_"+id).html()   || "";
                        html += $("#tableDist_"+id).html()  || "";

                    // sendEmailTeste(ini, fim, emp, imo, html);

                    status = true;
                }
            });


            

            if(!status){
                FLUIGC.message.alert({
                    message: 'Não foi selecionado nenhum consolidado para envio de email.',
                    title: 'Erro',
                    label: 'OK'
                });
            }
            loader('-1');
        },200);
    },

    // Executa a tabela de anexar nota fiscal
    executeNFS: function() {

        loader("100");
        setTimeout(function(){

            $("#NFS_filter > *, #NFS_table > *, #NFS_pag > *").remove();

            var obj = {};

            var dataInicio = $("#dtIniNFS").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinNFS").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var emprBoni = $("#slEmprNFS").val();
            var imobBoni = $("#slImoNFS").val();

            if (dataInicio && dataFim ) {
                if (emprBoni && !imobBoni) {
                    executeDBSearchNFS(dataInicio, dataFim, emprBoni, "");
                } else if (emprBoni && imobBoni ) {
                    executeDBSearchNFS(dataInicio, dataFim, emprBoni, imobBoni);
                } else if (!emprBoni && imobBoni ) {
                    executeDBSearchNFS(dataInicio, dataFim, "", imobBoni);
                } else {
                    obj = executeDBSearchNFS(dataInicio, dataFim, "", "");
                    $("#hold_slEmprBoni").removeClass("hide");
                }
            } else {
                alert("Favor preencher o período para filtrar.");
            }

            $("#select_all_rows").click(function(){
                $("#tableNFS  tbody tr td:last-child").each(function(){
                    var elm = $(this);
                    elm.find("input[id^='select_row_']").click();
                });
            });
            loader('-1');
        },200);
    },// executa o init na aba de anexar nota fiscal
    tabNFS: function(){
        $("#dtIniNFS").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });
        $('#dtFinNFS').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniNFS").on("dp.change", function(e) {
            $('#dtFinNFS').data("DateTimePicker").minDate(e.date);
        });

        getEmprendimentos("slEmprNFS");
        getImobiliarias("slImoNFS");

        $("#slEmprNFS, #slImoNFS").select2();
    },// Envia o numero das nfs nos formulários
    sendDbNFS : function(){

        loader("100");
        setTimeout(function(){

            var status;
            $("#tableNFS tbody tr:not(.hide)").each(function() {
                var elm = $(this);
                var id  = elm.attr("id").split("_").reverse();
                var inp = $("#cpNF_"+id[0]).val();

                if ($("#select_row_"+id[0]).is(":checked") && inp) {
                    var val1 = $("#cpNF_"+id[0]).val();


                    if(elm.hasClass("array")){
                        var formId = elm.find(".arrayDocID").text().split(",");

                        for(i=0; i<formId.length; i++){
                            updateFields(val1, val1, val1, val1, formId[i], 'NFS', "");
                        }

                    }else{
                        var formId = elm.find(".arrayDocID").text();
                        updateFields(val1, val1, val1, val1, formId, 'NFS', "");
                    }
                    
                    $("#select_row_"+id[0]).prop("disabled", true);
                    $("#cpNF_"+id[0]).attr("readonly", "readonly");

                    status = true;
                }else{
                    if(inp){
                        FLUIGC.message.alert({
                            message: 'O checkbox não está checado.',
                            title: 'Erro',
                            label: 'OK'
                        });    
                        $("#select_row_"+id[0]).css("border", "solid 1px red");

                    }else if($("#select_row_"+id[0]).is(":checked")){
                        
                        $("#cpNF_"+id[0]).css("border", "solid 1px red");
                        FLUIGC.message.alert({
                            message: 'O campo de nota fiscal não pode ser enviado vazio.',
                            title: 'Erro',
                            label: 'OK'
                        });
                    }else{
                        FLUIGC.message.alert({
                            message: 'Os campos, checkbox e NF, não pode ser enviado vazio.',
                            title: 'Erro',
                            label: 'OK'
                        });
                    }
                }
            });

            if(status){
                FLUIGC.message.alert({
                    message: 'Inserido as Notas Fiscais com sucesso.',
                    title: 'Obrigado',
                    label: 'OK'
                });
            }
            loader('-1');
        },200);
    },

    // executa o init na aba de anexar nota fiscal
    tabCube: function() {

        $("#dtIniCube").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinCube').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });


        $("#dtIniCube").on("dp.change", function(e) {
            $('#dtFinCube').data("DateTimePicker").minDate(e.date);
        });
        
        getEmprendimentos("slEmprCube");
        getImobiliarias("slImoCube");

        $("#slEmprCube, #slImoCube").select2();
    },// executa o init na aba de anexar nota fiscal
    tabBRZ: function() {

        $("#dtIniBrz").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinBrz').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniBrz").on("dp.change", function(e) {
            $('#dtFinBrz').data("DateTimePicker").minDate(e.date);
        });

        getEmprendimentos("slEmprBrz");
        getImobiliarias("slImoBrz");

        $("#slEmprBrz, #slImoBrz").select2();
    },// Executa a tabela de relatorios gerais
    executeCube: function() {

        loader("100");
        setTimeout(function(){
            $("#Cube_filter > *, #Cube_table > *, #Cube_pag > *").remove();

            var dataInicio = $("#dtIniCube").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinCube").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var empr = $("#slEmprCube").val();
            var imob = $("#slImoCube").val();
            var nf   = $("#cpNFSearch").val();

            if (dataInicio && dataFim ) {
                if(nf){
                    executeDBReports(dataInicio, dataFim, "", "", "geral", nf);
                }else if (empr && !imob) {
                    executeDBReports(dataInicio, dataFim, empr, "", "geral");
                } else if (empr && imob ) {
                    executeDBReports(dataInicio, dataFim, empr, imob, "geral");
                } else if (!empr && imob ) {
                    executeDBReports(dataInicio, dataFim, "", imob, "geral");
                } else {
                    executeDBReports(dataInicio, dataFim, "", "", "geral");
                }
            } else {
                alert("Favor preencher o período para filtrar.");
            }   
            loader('-1');
        },200);    
    },// Executa a tabela de relatorios BRZ
    executeBrz: function(){

        loader("100");
        setTimeout(function(){

            $("#Brz_filter > *, #Brz_table > *, #Brz_pag > *").remove();

            var dataInicio = $("#dtIniBrz").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinBrz").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var emprBoni = $("#slEmprBrz").val();
            var imobBoni = $("#slImoBrz").val();

            if (dataInicio && dataFim ) {
                if (emprBoni && !imobBoni) {
                    executeDBReports(dataInicio, dataFim, emprBoni, "", "brz");
                } else if (emprBoni && imobBoni ) {
                    executeDBReports(dataInicio, dataFim, emprBoni, imobBoni, "brz");
                }else if (!emprBoni && imobBoni ) {
                    executeDBReports(dataInicio, dataFim, "", imobBoni, "brz");
                } else {
                    executeDBReports(dataInicio, dataFim, "", "", "brz");
                }
            } else {
                alert("Favor preencher o período para filtrar.");
            }

            loader('-1');
        },200);
    },

    // Permite comissão de corretor online
    executeComissionBRZ: function() {

        loader("100");
        setTimeout(function(){
            $("#ComissionBRZ_filter > *, #ComissionBRZ_table > *, #ComissionBRZ_pag > *").remove();

            var dataInicio = $("#dtIniComissionBRZ").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinComissionBRZ").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var empr = $("#slEmprComissionBRZ").val();
            var imob = "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA";

            if (dataInicio && dataFim ) {
                (empr) ? executeDBCalculation(dataInicio, dataFim, empr, imob, "comissaoBRZ") : executeDBCalculation(dataInicio, dataFim, "", imob, "comissaoBRZ");
            } else {
                alert("Favor preencher o período para filtrar.");
            }

            $("#select_all_sales_ca").click(function(){
                
                loader("100");

                $("#tableComissoesBRZ").dataTable().fnDestroy();

                if($(this).is(":checked")){
                    
                    $("#tableComissoesBRZ tbody tr").each(function(){
                        $(this).find("input[id^='select_sale_comission_']:not(:disabled)").prop("checked", true);
                    });
                    $("#tableComissoesBRZ_fake tbody tr").each(function(){
                        if( $(this).find("td:last-child").attr('name') != 'true' ) $(this).find("td:last-child").text("true");
                    });
                }else{
                    $("#tableComissoesBRZ tbody tr").each(function(){
                        $(this).find("input[id^='select_sale_comission_']:not(:disabled)").prop("checked", false);
                    });

                    $("#tableComissoesBRZ_fake tbody tr").each(function(){
                        if( $(this).find("td:last-child").attr('name') != 'true' ) $(this).find("td:last-child").text("");
                    });
                } 

                $("#tableComissoesBRZ").DataTable({
                    dom: '',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                    
                    loader("-1");
                
            });

            $('input[id^="cpPercComissaoBrz_"]').change(function(){
                var el  = $(this);
                var id  = el.closest('tr').attr('id');
                var val = el.val();
                $("tr[name='"+id+"'] td:nth-child(15)").text(val);
            });

            $('input[id^="select_sale_comission_"]').click(function(){
                var el  = $(this);
                var id  = el.closest('tr').attr('id');

                if(el.is(":checked")){
                    $("tr[name='"+id+"'] td:last-child").text('true');
                }else{
                    $("tr[name='"+id+"'] td:last-child").text('false');
                }
            });

            setTimeout(function(){
                $("#rowValor").mask('#.##0,00', { reverse: true });    
                $('#tableSuperDist tbody tr.hide').each(function(i) {
                    console.log(i)
                    $(this).remove();
                });
                $('#tableSuperDist_fake tbody tr.hide').each(function(i) {
                    console.log(i)
                    $(this).remove();
                });

            },1000);
            

            loader('-1');
        },200);
    },
    tabComissionBRZ: function(){
        $("#dtIniComissionBRZ").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinComissionBRZ').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniComissionBRZ").on("dp.change", function(e) {
            $('#dtFinComissionBRZ').data("DateTimePicker").minDate(e.date);
        });

        getEmprendimentos("slEmprComissionBRZ");

        $("#slEmprComissionBRZ").select2();
    },
    updateFormsendDbComissionBRZ: function(){

        loader("100");
        setTimeout(function(){

            var status = "false";

            $('#tableComissoesBRZ').dataTable().fnDestroy();

            $("#tableComissoesBRZ tbody tr").each(function() {
                var elm = $(this);
                var chk = elm.find("input[id^='select_sale_comission_']:not(:disabled)");
                var val = elm.find("input[id^='cpPercComissaoBrz_']:not([readonly])").val();
                
                if(val){
                    if (chk.is(":checked")) {
                        var val = elm.find("input[id^='cpPercComissaoBrz_']").val();
                        var formId = elm.find("input[id^='CBdocumentid_']").val();

                        updateFields(val, 'true', "", "", formId, 'comissaoBRZ', "");

                        elm.find("input[id^='cpPercComissaoBrz_']").attr("readonly", "readonly");
                        elm.find("input[id^='select_sale_comission_']").prop("disabled", true);

                        if(elm.find("td:nth-child(14)").text().trim() == ""){
                            elm.find("td:nth-child(14)").html(processAlert());
                            var id = elm.attr("id");
                            $("#tableComissoesBRZ_fake tr[name='"+id+"'] td:nth-child(14)").html(processAlert());
                        }

                        status = "true";     
                    }else{

                        elm.find("input[id^='cpPercComissaoBrz_']:not([readonly])").css("border", "solid 1px red");

                        status = "abc";
                        FLUIGC.message.alert({
                            message: 'Há valor pra ser aplicado e o campo de aprovação não está selecionado. Favor selecionar e enviar novamente',
                            title: 'Erro',
                            label: 'OK'
                        });
                    }    
                }
                
            });

            $("#tableComissoesBRZ").DataTable({
                dom: '',
                paging: true,
                select: true,
                lengthMenu: [10, 25, 50, 100],
                language: {
                    search: "",
                    emptyTable: "Não há solicitações com estas informações.",
                    info: "Exibir _PAGE_ de _PAGES_"
                }
            });

            if(status == "true"){
                FLUIGC.message.alert({
                    message: "Comissão aplicada com sucesso",
                    title: 'Obrigado',
                    label: 'OK'
                });
            }else if(status == "false"){
                FLUIGC.message.alert({
                    message: 'Não há valor pra ser aplicado, verifique se o campo de prêmio está preenchido ou o campo de aprovação não está selecionado.',
                    title: 'Erro',
                    label: 'OK'
                });
            }

            loader('-1');
        },200);
    },
    ExportExcel: function(){
        tablesToExcel(['tableComissoesBRZTotal_fake', 'tableComissoesBRZ_fake'], ['first'], 'myfile.xls');
    },

    // Permite Comissão de supervisor
    tabSuper: function(){
        $("#dtIniSuper").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinSuper').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniSuperDist").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinSuperDist').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $("#dtIniSuperDist").on("dp.change", function(e) {
            $('#dtFinSuperDist').data("DateTimePicker").minDate(e.date);
        });

        getEmprendimentos("slEmprSuper");

        $("#slEmprSuper").select2();
    },
    executeSuper: function(){

        loader("100");
        setTimeout(function(){

            var dataInicio = $("#dtIniSuper").val();
            if (dataInicio) {
                dataInicio = dataInicio.split("/").reverse();
                dataInicio = dataInicio[0] + "-" + dataInicio[1] + "-" + dataInicio[2];
            }
            var dataFim = $("#dtFinSuper").val();
            if (dataFim) {
                dataFim = dataFim.split("/").reverse();
                dataFim = dataFim[0] + "-" + dataFim[1] + "-" + dataFim[2];
            }

            var dataIniDis = $("#dtIniSuperDist").val();
            if (dataIniDis) {
                dataIniDis = dataIniDis.split("/").reverse();
                dataIniDis = dataIniDis[0] + "-" + dataIniDis[1] + "-" + dataIniDis[2];
            }
            var dataFimDis = $("#dtFinSuperDist").val();
            if (dataFimDis) {
                dataFimDis = dataFimDis.split("/").reverse();
                dataFimDis = dataFimDis[0] + "-" + dataFimDis[1] + "-" + dataFimDis[2];
            }

            var empr = $("#slEmprSuper").val();
            var status = false;
            
            if (!dataIniDis && !dataFimDis){
                $("#Super_filter > *, #Super_table > *, #Super_pag > *").remove();
                if (dataInicio && dataFim){
                    (empr) ? executeDBSuper(dataInicio, dataFim, empr, "super") : executeDBSuper(dataInicio, dataFim, "", "super");
                    status = true;
                }
            }

            if (dataIniDis && dataFimDis && !dataInicio && !dataFim){
                $("#SuperDist_table > *").remove();
                (empr) ? executeDBSuper( dataIniDis, dataFimDis, empr, 'distratos') : executeDBSuper( dataIniDis, dataFimDis, "", 'distratos');
            }else if (dataInicio && dataFim && dataIniDis && dataFimDis){
                $("#Super_filter > *, #Super_table > *, #Super_pag > *, #SuperDist_table > *").remove();
                if(empr){
                    executeDBSuper( dataInicio, dataFim, empr, 'super');
                    executeDBSuper( dataIniDis, dataFimDis, empr, 'distratos');
                }else{
                    executeDBSuper( dataInicio, dataFim, "", 'super');
                    executeDBSuper( dataIniDis, dataFimDis, "", 'distratos');
                }
            }

            if(!dataIniDis && !dataFimDis && !dataInicio && !dataFim && !empr){
                FLUIGC.message.alert({
                    message: "Não há nenhum filtro selecionado.",
                    title: 'Erro',
                    label: 'OK'
                });
            }else if(!dataIniDis && !dataFimDis && !dataInicio && !dataFim && empr){
                FLUIGC.message.alert({
                    message: 'favor preencher o período de vendas ou distrato.',
                    title: 'Erro',
                    label: 'OK'
                });
            }
            
            if(status){
                $("#Super_tableTot").removeClass("hide");
            }



            $("#cpPercentComissaoSuper").blur(function(i){
                $("#cpValVendidos").mask('##0.00', { reverse: true });

                var perc = $(this).val();
                var val = $("#cpValVendidos").val();

                var total = (parseFloat(val) * parseFloat(perc))/100;
                    total = total.toFixed(2);

                $("#rowValorTotal, #rowValorTotal_fake").text(numeroParaMoeda(total));
                $("#rowPercentualVal, #rowPercentual_fake").text(perc);
            });

            setTimeout(function(){
                $("#rowVendidos, #rowValorTotal, #rowValorTotal_fake").mask('#.##0,00', { reverse: true });
                $("#cpPercentComissaoSuper, #rowPercentual_fake").mask('##0.00', { reverse: true });     
            },2000);
            

            loader('-1');
        },200);
    },
    exportExcelSuper: function(){
        var countDist = $("#tableSuperDist tbody tr td").length;
        if(countDist > 1){
            tablesToExcel(["TableTotalSuper_fake", "tableSuper_fake", "tableSuperDist_fake"], ['first'], 'myfile.xls');
        }else{
           tablesToExcel(["TableTotalSuper_fake", "tableSuper_fake"], ['first'], 'myfile.xls');
        }
    },

    // Permite troca perentual de comissão de determinadas vendas e cadastra email
    tabParameters: function(){
        $(".percent").mask('#0.00', { reverse: true });
        consultDB("", "param");
    },
    executeParameters: function() {

        loader('100');
        setTimeout(function(){
            var val1 = $("#cpParameters1Parcela").val();
            var val2 = $("#cpParameters2Parcela").val();
            var val3 = $("#cpParametersParcelaUnica").val();
            var val4 = $("#cpParametersDemandaMin").val();
            var val5 = $("#cpParametersDemandaMax").val();

            if(val1 || val2 || val3 || val4 || val5){
                updateParams(val1, val2, val3, val4, val5);
            }else{
                FLUIGC.message.alert({
                    message: 'Preencha ao menos 1 campo antes de enviar.',
                    title: 'Erro',
                    label: 'OK'
                });
            }
            loader('-1');
        },200);
    },
    tabParametersEmail: function(){
        
        getImobiliarias("slImoParametersEmail");
        $("#slImoParametersEmail").select2();
        FLUIGC.popover('.bs-docs-popover-hover',{trigger: 'hover', placement: 'top'});        

        $("#slImoParametersEmail").change(function(){
            consultDB(this.value, 'email')
        });        
    },
    executeParametersEmail: function() {

        loader('100');
        setTimeout(function(){
            var imob = $("#slImoParametersEmail").val();
            var val = $("#cpImoParametersEmail").val();

            if(imob && val){
                updateEmail(imob, val);
            }else{
                if(imob){
                    FLUIGC.message.alert({
                        message: 'O campo de email não pode estar vazio.',
                        title: 'Erro',
                        label: 'OK'
                    });    
                }else{
                    FLUIGC.message.alert({
                        message: 'Favor escolher a imobiliária que você deseja gravar o email.',
                        title: 'Erro',
                        label: 'OK'
                    });    
                }
            }

            loader('-1');
        },200);
    },
});

// init 
function startPanel() {

    loader("100");

    setTimeout(function(){
        
        $('#myTabs li').each(function(){
            var el = $(this);
            if(el.find(".btn").attr("disabled")) el.find(".mask").addClass("active");
        });
        

        $('#myTabs>a').click(function(e) {
            e.preventDefault()
            $(this).tab('show');
        });

        $("#dtIniBonification, #dtIniDemandMin, #dtIniDemandMax").datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        $('#dtFinBonification, #dtFinDemandMin, #dtFinDemandMax').datetimepicker({
            format: 'DD/MM/YYYY',
            useCurrent: false,
            locale: 'pt-br'
        });

        // Awards
        $("#dtIniBonification").on("dp.change", function(e) {
            $('#dtFinBonification').data("DateTimePicker").minDate(e.date);
        });
        // Demand Min
        $("#dtIniDemandMin").on("dp.change", function(e) {
            $('#dtIniDemandMin').data("DateTimePicker").minDate(e.date);
        });
        // Demand Max
        $("#dtIniDemandMax").on("dp.change", function(e) {
            $('#dtIniDemandMax').data("DateTimePicker").minDate(e.date);
        });

        // awards
        getEmprendimentos("slEmprBoni");
        getImobiliarias("slImoBoni");

        // demand min
        getEmprendimentos("slEmprDemandMin");
        getImobiliarias("slImoDemandMin");

        // demand max
        getEmprendimentos("slEmprDemandMax");
        getImobiliarias("slImoDemandMax");

        $("#slEmprBoni, #slImoBoni, #slEmprDemandMin, #slImoDemandMin, #slEmprDemandMax, #slImoDemandMax").select2();

        loader("-1");
    },200);
}
// init 

// executa a query pra montar as tabelas padrão dos formulário
function executeDBSearch(val1, val2, val3, val4, id){

    var DataTableColumns;
    var dataTableRows = [];
    var dados;

    var arr = [];

    if (id == 'awards'){
        if (val3 && !val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                        "_initialValue": val3, //value to be filtered 
                        "_finalValue": val3, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "metadata#active", //name of the field used in the constraint 
                        "_initialValue": true, //value to be filtered 
                        "_finalValue": true, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        } else if (val3 && val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                        "_initialValue": val3, //value to be filtered 
                        "_finalValue": val3, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }

                ]
            }
        } else if (!val3 && val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        } else {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        }
    }else{
        if (val3 && !val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                        "_initialValue": val3, //value to be filtered 
                        "_finalValue": val3, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "metadata#active", //name of the field used in the constraint 
                        "_initialValue": true, //value to be filtered 
                        "_finalValue": true, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        } else if (val3 && val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                        "_initialValue": val3, //value to be filtered 
                        "_finalValue": val3, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }

                ]
            }
        } else if (!val3 && val4) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        } else {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                ]
            }
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var x = 0;
            if (id == 'awards') {
                DataTableColumns += '<table id="tableAwards" class="table table-hover table-bordered">';
                var date;
                var dtAgregacao;
                var cpValorliquidovenda;

                for (var i = 0; i < data.content.values.length; i++){
                    
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dtAgregacao = data.content.values[i].dtAgregacao.trim();
                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }


                    var valBonus = data.content.values[i].cpPermiteBonus;
                    var chk, input;
                    if(valBonus == "true"){
                        chk = "<input type='checkbox' id='select_sale_awards_"+x+"' disabled='disabled' checked='checked'>";
                        input = "<input type='text' id='cpValBoni_"+x+"' class='form-control' value='"+data.content.values[i].cpValorParcelaBonificacao+"' readonly>";
                    }else{
                        chk = "<input type='checkbox' id='select_sale_awards_" + x + "'>";
                        input = "<input type='text' id='cpValBoni_"+x+"' class='form-control val'>";
                    }


                    var deMin = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                    }

                    var deMax = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;

                    console.log(data.content.values[i].cpNumeroVenda, pDeMax, deMax);

                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }

                    var proID = data.content.values[i].cpProcessID || "";
                    var docID = data.content.values[i].documentid || "";
                    var documentid = "<input type='text' id='Aw_documentid_"+x+"'   class='form-control hide' value='"+docID+"'>";
                    var cpProcessID = "<input type='text' id='Aw_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var val1 = "", val2 = "", val3 = "";
                    var valBon = data.content.values[i].cpValor1ParcelaComissao;
                    var valPer = data.content.values[i].cpPermiteComBRZ;
                    if(valPer == "true"){
                        if(!valBon || valBon == "NaN" ){
                            val3 = processAlert();
                            val1 = "";
                        }else{
                            val3 = valBon || "";
                            val1 = "";
                        }
                    }else{
                        val3 = "";
                        if(data.content.values[i].cpConfirmParcelUnic == "true"){
                            val2 = valBon;
                        }else{
                            val1 = valBon;
                        }
                    }

                    dataTableRows.push([
                        "",
                        data.content.values[i].cpEmpreendimento + documentid + cpProcessID,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        val1,
                        data.content.values[i].cpValor2ParcelaComissao,
                        val2,
                        val3,
                        deMin || "",
                        deMax || "",
                        dtAgregacao,
                        input,
                        chk,
                    ]);

                    arr.push(data.content.values[i].documentid);
                    x++;
                    
                } // fim do for
            }

            if (id == 'demandMin') {
                DataTableColumns += '<table id="tableDemandMin" class="table table-hover table-bordered">';
                var date;
                for (var i = 0; i < data.content.values.length; i++) {

                    var vendaAux = data.content.values[i].cpConfirmParcelUnic;
                        
                    var input = "";
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dtAgregacao = data.content.values[i].dtAgregacao.trim();

                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    var valBonus = data.content.values[i].cpPermiteDemandaMin;
                    var chk, deMin;                 
                    if(valBonus == "true"){
                        chk = "<input type='checkbox' id='select_sale_min_"+x+"' disabled='disabled' checked='checked'>";
                        deMin = data.content.values[i].cpValorParcelaDemandaMinima || processAlert();
                    }else{
                        chk = "<input type='checkbox' id='select_sale_min_"+x+"'>"
                        deMin = "";
                    }

                    var deMax = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;
                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }

                    var proID = data.content.values[i].cpProcessID || "";
                    var documentid = "<input type='text' id='Dm_documentid_"+x+"' class='form-control hide' value='"+data.content.values[i].documentid+"' >";
                    var cpProcessID = "<input type='text' id='Dm_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var val2 = "", val3 = "";
                    var valBon = data.content.values[i].cpValor1ParcelaComissao;
                    var valPer = data.content.values[i].cpPermiteComBRZ;
                    var val4;
                    if(valPer == "true"){
                        if(!valBon || valBon == "NaN" ){
                            val4 = processAlert();
                            val3 = ""    
                        }else{
                            val4 = valBon || "";
                            val3 = ""
                        }
                        
                    }else{
                        val4 = "";
                        if(data.content.values[i].cpConfirmParcelUnic == "true"){
                            val2 = valBon;
                        }else{
                            val3 = valBon;
                        }
                    }

                    var val1 = "";
                    if(data.content.values[i].cpValor2ParcelaComissao && data.content.values[i].cpValor2ParcelaComissao != " " && data.content.values[i].cpValor2ParcelaComissao != null) val1 = data.content.values[i].cpValor2ParcelaComissao;

                    dataTableRows.push([
                        "",
                        data.content.values[i].cpEmpreendimento + documentid + cpProcessID,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        val3,
                        val1,
                        val2,
                        val4,
                        data.content.values[i].cpValorParcelaBonificacao || "",
                        deMin || "",
                        deMax || "",
                        dtAgregacao || "",
                        chk,
                    ]);

                    arr.push(data.content.values[i].documentid);
                    x++;
                } // fim do for
            }

            if (id == 'demandMax') {
                DataTableColumns += '<table id="tableDemandMax" class="table table-hover table-bordered">';
                var date;

                for (var i = 0; i < data.content.values.length; i++) {
                    var checkbox = "";
                    var input = "";
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dtAgregacao = data.content.values[i].dtAgregacao.trim();
                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    var valBonus = data.content.values[i].cpPermiteDemandaMax;
                    var chk;
                    (valBonus == "true") ? chk = "<input type='checkbox' id='select_sale_max_"+x+"' disabled='disabled' checked='checked'>" : chk = "<input type='checkbox' id='select_sale_max_"+x+"'>"

                    var proID = data.content.values[i].cpProcessID || "";
                    var documentid = "<input type='text' id='Dma_documentid_"+x+"' class='form-control hide' value='"+data.content.values[i].documentid+"'>";
                    var cpProcessID = "<input type='text' id='Dma_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var deMin = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                    }

                    var deMax = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;
                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }
                    
                    var valBon = data.content.values[i].cpValor1ParcelaComissao;
                    var valPer = data.content.values[i].cpPermiteComBRZ;
                    var val2 = "", val3 = "", val4 = "";
                    if(valPer == "true"){
                        if(!valBon || valBon == "NaN" ){
                            val4 = processAlert();
                            val3 = ""    
                        }else{
                            val4 = valBon || "";
                            val3 = ""
                        }
                        
                    }else{
                        val4 = "";
                        if(data.content.values[i].cpConfirmParcelUnic == "true"){
                            val2 = valBon;
                        }else{
                            val3 = valBon;
                        }
                    }

                    var val1 = "";
                    if(data.content.values[i].cpValor2ParcelaComissao && data.content.values[i].cpValor2ParcelaComissao != " " && data.content.values[i].cpValor2ParcelaComissao != null && data.content.values[i].cpValor2ParcelaComissao != "null"  && data.content.values[i].cpValor2ParcelaComissao != "") val1 = data.content.values[i].cpValor2ParcelaComissao;

                    dataTableRows.push([
                        '',
                        data.content.values[i].cpEmpreendimento + documentid + cpProcessID,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        val3,
                        val1,
                        val2,
                        val4,
                        data.content.values[i].cpValorParcelaBonificacao || "",
                        deMin || "",
                        deMax || "",
                        dtAgregacao || "",
                        chk,
                    ]);

                    arr.push(data.content.values[i].documentid);
                    x++;
                } // fim do for
            }

            
            Array.prototype.reverse.apply(dataTableRows);

            DataTableColumns += '</table></div>';

            DataTableColumns = DataTableColumns.replace('undefined', '').replace('null', '');

            var checkboxAll;

            if (id == 'awards') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_aw'>";
                $("#Awards_table").html(DataTableColumns);
            }
            if (id == 'demandMin') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_dmin'>";
                $("#DemandMin_table").html(DataTableColumns);
            }
            if (id == 'demandMax') {
                checkboxAll = "<input type='checkbox' id='select_all_sales_dmax'>";
                $("#DemandMax_table").html(DataTableColumns);
            }


            var cog = '<i class="fluigicon fluigicon-cog fluigicon-xs"></i>';
            var buttonAll = "<button id='apply_to_all'><i class='fa'></i>Aplicar para Todos</button>";

            if (id == 'awards') {
              var columTab = [
                {title: "ID"},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Valor 1\&ordf\; Parcela'},
                { title: 'Valor 2\&ordf\; Parcela'},
                { title: 'Valor Parcela Única'},
                { title: 'Comissão BRZ'},
                { title: 'Valor Demanda Mínima'},
                { title: 'Valor Demanda Máxima'},
                { title: 'Data de Agregação / Quitação'},
                { title: 'Valor de Premiação'},
                { title: checkboxAll + " Aprovação"},
              ];
            }
            if (id == 'demandMin') {
              var columTab = [
                {title: "ID"},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Valor 1\&ordf\; Parcela'},
                { title: 'Valor 2\&ordf\; Parcela'},
                { title: 'Valor Parcela Única'},
                { title: 'Comissão BRZ'},
                { title: 'Valor Prêmio'},
                { title: 'Valor Demanda Mínima'},
                { title: 'Valor Demanda Máxima'},
                { title: 'Data de Agregação / Quitação'},
                { title: checkboxAll + " Aprovação Demanda Min."},
              ];
            }
            if (id == 'demandMax') {
              var columTab = [
                {title: "ID"},
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Valor 1\&ordf\; Parcela'},
                { title: 'Valor 2\&ordf\; Parcela'},
                { title: 'Valor Parcela Única'},
                { title: 'Comissão BRZ'},
                { title: 'Valor Prêmio'},
                { title: 'Valor Demanda Mínima'},
                { title: 'Valor Demanda Máxima'},
                { title: 'Data de Agregação / Quitação'},
                { title: checkboxAll + " Aprovação Demanda Max."},
              ];
            }
            
            if (id == 'awards') {

                var t = $("#tableAwards").DataTable({
                            dom: 'frtip',
                            data: dataTableRows,
                            columns: columTab,
                            paging: false,
                            select: true,
                            lengthMenu: [10, 25, 50, 100],
                            order: [3, "asc"],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });

                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();
                
                $('#tableAwards').dataTable().fnDestroy();
                $('#tableAwards tbody tr td:nth-child(11), #tableAwards tbody tr td:nth-child(12), #tableAwards tbody tr td:nth-child(13), #tableAwards tbody tr td:nth-child(14), #tableAwards tbody tr td:nth-child(15), #tableAwards tbody tr td:nth-child(16), #tableAwards tbody tr td:nth-child(17), #tableAwards tbody tr td:nth-child(18)').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq != "Processando"){
                        
                        if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                            valLiq = valLiq + ".00";
                            $(this).text(valLiq);
                        }

                        if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                        if(valLiq.indexOf("-") >= 0){
                            $(this).mask('#.##0,00', { reverse: true });
                            var val = $(this).text();
                            $(this).text("-"+val).addClass("text-danger");
                        }else{
                            $(this).mask('#.##0,00', { reverse: true });    
                        }
                    }
                });

                $('#tableAwards tbody tr').each(function(i){
                    $(this).attr('id', 'trAwards_'+i);
                });

                var seen = {};
                $('#tableAwards tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(4)").text();
                    (seen[num_venda]) ? $(this).remove() : seen[num_venda] = true;
                });

                $("#tableAwards").DataTable({
                    dom: 'frtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    order: [[ 3, 'asc' ]],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableAwards_wrapper .dt-buttons, #tableAwards_filter").appendTo("#Awards_filter");
                $("#tableAwards_info, #tableAwards_paginate").appendTo("#Awards_pag");
                $("#tableAwards_filter, #tableAwards_paginate").addClass("pull-right");
                $("#tableAwards_info").addClass("pull-left");
                $("#tableAwards_filter input").attr("placeholder", "Filtro");

                $("#Awards_send").removeClass("hide");
            }

            if (id == 'demandMin') {
                var t = $("#tableDemandMin").DataTable({
                    dom: 'frtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: false,
                    select: false,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, 'desc'],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                $('#tableDemandMin').dataTable().fnDestroy();

                $('#tableDemandMin tbody tr td:nth-child(11), #tableDemandMin tbody tr td:nth-child(12), #tableDemandMin tbody tr td:nth-child(13), #tableDemandMin tbody tr td:nth-child(14), #tableDemandMin tbody tr td:nth-child(15), #tableDemandMin tbody tr td:nth-child(16), #tableDemandMin tbody tr td:nth-child(17), #tableDemandMin tbody tr td:nth-child(18), #tableDemandMin tbody tr td:nth-child(19)').each(function(i){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq != 'Processando'){
                        
                        if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                            valLiq = valLiq + ".00";
                            $(this).text(valLiq);
                        }

                        if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                        if(valLiq.indexOf("-") >= 0){
                            $(this).mask('#.##0,00', { reverse: true });
                            var val = $(this).text();
                            $(this).text("-"+val).addClass("text-danger");
                        }else{
                            $(this).mask('#.##0,00', { reverse: true });    
                        }
                    }
                });

                var txt;
                $('#tableDemandMin tbody tr').each(function(i){
                    $(this).attr('id', 'trDemandMin_'+i);
                });

                var seen = {};
                $('#tableDemandMin tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(4)").text();

                    if (seen[num_venda]){
                        $(this).remove();
                    }else{
                        seen[num_venda] = true;
                    }
                });

                $("#tableDemandMin").DataTable({
                    dom: 'frtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }

                });

                $("#tableDemandMin_wrapper .dt-buttons, #tableDemandMin_filter").appendTo("#DemandMin_filter");
                $("#tableDemandMin_info, #tableDemandMin_paginate").appendTo("#DemandMin_pag");
                $("#tableDemandMin_filter, #tableDemandMin_paginate").addClass("pull-right");
                $("#tableDemandMin_info").addClass("pull-left");
                $("#tableDemandMin_filter input").attr("placeholder", "Filtro");
                
                $("#DemandMin_send").removeClass("hide");
            }

            if (id == 'demandMax') {
                
                var t = $("#tableDemandMax").DataTable({
                    dom: 'frtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: false,
                    select: false,
                    lengthMenu: [10, 25, 50, 100],
                    order: [ 3, 'asc' ],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                $('#tableDemandMax').dataTable().fnDestroy();
                $('#tableDemandMax tbody tr td:nth-child(11), #tableDemandMax tbody tr td:nth-child(12), #tableDemandMax tbody tr td:nth-child(13), #tableDemandMax tbody tr td:nth-child(14), #tableDemandMax tbody tr td:nth-child(15), #tableDemandMax tbody tr td:nth-child(16), #tableDemandMax tbody tr td:nth-child(17), #tableDemandMax tbody tr td:nth-child(18), #tableDemandMax tbody tr td:nth-child(19)').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq != 'Processando'){
                        
                        if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                            valLiq = valLiq + ".00";
                            $(this).text(valLiq);
                        }

                        if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                        if(valLiq.indexOf("-") >= 0){
                            $(this).mask('#.##0,00', { reverse: true });
                            var val = $(this).text();
                            $(this).text("-"+val).addClass("text-danger");
                        }else{
                            $(this).mask('#.##0,00', { reverse: true });    
                        }
                    }
                });

                var txt;
                $('#tableDemandMax tbody tr').each(function(i){
                    $(this).attr('id', 'trDemandMax_'+i);
                });

                var seen = {};
                $('#tableDemandMax tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(4)").text();
                    if (seen[num_venda]){
                        $(this).remove();
                    }else{
                        seen[num_venda] = true;
                    }
                });

                $("#tableDemandMax").DataTable({
                    dom: 'frtip',
                    paging: true,
                    select: false,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableDemandMax_wrapper .dt-buttons, #tableDemandMax_filter").appendTo("#DemandMax_filter");
                $("#tableDemandMax_info, #tableDemandMax_paginate").appendTo("#DemandMax_pag");
                $("#tableDemandMax_filter, #tableDemandMax_paginate").addClass("pull-right");
                $("#tableDemandMax_info").addClass("pull-left");
                $("#tableDemandMax_filter input").attr("placeholder", "Filtro");

                $("#DemandMax_send").removeClass("hide");
            }

            $("#select_all_sales_aw").click(function() {
                loader("100");

                setTimeout(function(){
                    $('#tableAwards').dataTable().fnDestroy();
                    $("#tableAwards tbody tr").each(function() {
                        var el = $(this);
                        el.find("input[type='checkbox']").click();
                    });
                    $('#tableAwards').dataTable({
                        dom: '',
                        paging: true,
                        select: false,
                        lengthMenu: [10, 25, 50, 100],
                        language: {
                            search: "",
                            emptyTable: "Não há solicitações com estas informações.",
                            info: "Exibir _PAGE_ de _PAGES_"
                        }
                    });
                    loader("-1");
                },200);
            });

            $("#select_all_sales_dmin").click(function() {
                loader("100");

                setTimeout(function(){
                    $('#tableDemandMin').dataTable().fnDestroy();
                    $("#tableDemandMin tbody tr").each(function() {
                        var el = $(this);
                        el.find("input").click();
                    });
                    $('#tableDemandMin').dataTable({
                        dom: '',
                        paging: true,
                        select: false,
                        lengthMenu: [10, 25, 50, 100],
                        language: {
                            search: "",
                            emptyTable: "Não há solicitações com estas informações.",
                            info: "Exibir _PAGE_ de _PAGES_"
                        }
                    });
                    loader("-1");
                },200);
            });

            $("#select_all_sales_dmax").click(function() {
                loader("100");

                setTimeout(function(){
                    $('#tableDemandMax').dataTable().fnDestroy();
                    $("#tableDemandMax tbody tr").each(function() {
                        var el = $(this);
                        el.find("input").click();
                    });
                    $('#tableDemandMax').dataTable({
                        dom: '',
                        paging: true,
                        select: false,
                        lengthMenu: [10, 25, 50, 100],
                        language: {
                            search: "",
                            emptyTable: "Não há solicitações com estas informações.",
                            info: "Exibir _PAGE_ de _PAGES_"
                        }
                    });
                    loader("-1");
                },200);
            });

            $(".val").mask('#.##0,00', { reverse: true });

            $("#apply_to_all").click(function() {
                FLUIGC.message.confirm({
                    title: 'Aplicar valor de bonificação a todos.',
                    message: '<label>Valor a ser aplicado</label><input type="text" name="cpApplyToAll" id="cpApplyToAll" class="form-control">',
                    labelYes: 'Salvar',
                    labelNo: 'Cancelar'
                }, function(result, el, ev) {
                    if (result) {
                        $("#tableBonification tbody tr").each(function(i) {
                            $("#cpValBoni_" + i).val($("#cpApplyToAll").val());
                        });
                    }
                });
            });


        }
    });
}
// executa a query pra montar as tabelas padrão dos formulário

// monta o select empreendimento e imobiliaria
function getEmprendimentos(idSelect) {
    var options;
    var optionsArr = [];
    var optionsCodArr = [];

    var dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            options += "<option></option>";

            for (var i = 0; i < data.content.values.length; i++) {
                var empreendimento = data.content.values[i].cpEmpreendimento;
                if (optionsArr.indexOf(empreendimento) === -1 && empreendimento != null && empreendimento != "" && empreendimento != undefined && empreendimento != "undefined") {
                    optionsArr.push(empreendimento);
                    optionsCodArr.push(data.content.values[i].cpEmpreendimentoCod);
                }
            }

            for (i = 0; i < optionsArr.length; i++) {
                options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
            }

            $("#" + idSelect).html(options);
        }
    });
}
function getImobiliarias(idSelect) {
    var options;
    var optionsArr = [];

    var dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            options += "<option></option>";

            for (var i = 0; i < data.content.values.length; i++) {
                var imobiliaria = data.content.values[i].cpNomeImobiliaria;
                if (optionsArr.indexOf(imobiliaria) === -1 && imobiliaria != null && imobiliaria != "" && imobiliaria != undefined && imobiliaria != "undefined") {
                    optionsArr.push(imobiliaria);
                }
            }
            optionsArr.sort();

            for (i = 0; i < optionsArr.length; i++) {
                options += "<option value='" + optionsArr[i] + "'>" + optionsArr[i] + "</option>";
            }

            $("#" + idSelect).html(options);
        }
    });
}
// monta o select empreendimento e imobiliaria

// executa a query pra montar a tabela de NFS
function executeDBSearchNFS(val1, val2, val3, val4){
    
    var dados;
    var total;
    var cpEmpreendimento;
    var cpNomeimobiliaria;
    var cpValor1parcelacomissao;
    var cpValor2parcelacomissao;
    var cpValorparcelademandaminima;
    var cpValorParceladeMandaMaxima;

    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    var arr5 = [];

    var arrNF1P = [];
    var arrNF2P = [];
    var arrNFB  = [];
    var arrNFDm = [];
    var arrNFDM = [];
    

    var obj  = {};

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
            ]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var date1 = val1;
                date1 = date1.split("-").reverse();
                date1 = date1[0]+"/"+date1[1]+"/"+date1[2];

            var date2 = val2;
                date2 = date2.split("-").reverse();
                date2 = date2[0]+"/"+date2[1]+"/"+date2[2];

            total = 0;


            console.log("date val1", val1);
            console.log("date val2", val2);

            for(var i = 0; i < data.content.values.length; i++){

                console.log("date 1PARCELA", data.content.values[i].cpDate1ParcelaComissao);
                console.log("date 2PARCELA", data.content.values[i].cpDate2ParcelaComissao);
                console.log("date BONUS", data.content.values[i].cpDateBonus);
                console.log("date DEMANDA MIN", data.content.values[i].cpDateDemandaMin);
                console.log("date DEMANDA MAX", data.content.values[i].cpDateDemandaMax);
                console.log("date DISTRATO", data.content.values[i].cpDateDistrato);
                
                cpVal1Par      = data.content.values[i].cpValor1ParcelaComissao;
                cpVal2Par      = data.content.values[i].cpValor2ParcelaComissao;
                cpValParDemMin = data.content.values[i].cpValorParcelaDemandaMinima;
                cpValParDemMax = data.content.values[i].cpValorParceladeMandaMaxima;

                if(cpVal1Par || cpVal2Par || cpValParDemMin || cpValParDemMax){

                    arr1.push(data.content.values[i].cpNomeImobiliaria);

                    arr2.push(data.content.values[i].cpEmpreendimento);

                    arr3.push(data.content.values[i].documentid);

                    var processID = data.content.values[i].cpProcessID || "";
                    arr4.push(processID);

                    cpValor1ParcelaComissao = data.content.values[i].cpValor1ParcelaComissao || 0;
                    cpValor2ParcelaComissao = data.content.values[i].cpValor2ParcelaComissao || 0;
                    cpValorParcelaDemandaMinima = data.content.values[i].cpValorParcelaDemandaMinima || 0;
                    cpValorParceladeMandaMaxima = data.content.values[i].cpValorParceladeMandaMaxima || 0;

                    total = parseFloat(cpValor1parcelacomissao) + parseFloat(cpValor2parcelacomissao) + parseFloat(cpValorparcelademandaminima) + parseFloat(cpValorParceladeMandaMaxima);
                    total = total.toFixed(2);
                    // arr5.push(total);
                    arr5.push(data.content.values[i].cpValorTotalDeComissao);

                    
                    NF1P = data.content.values[i].cpNF1ParcelaComissaoFake || "";
                    NF2P = data.content.values[i].cpNF2ParcelaComissaoFake || "";
                    NFB  = data.content.values[i].cpNFParcelaBonificacaoFake || "";
                    NFDm = data.content.values[i].cpNFParcelaDemandaMinimaFake || "";
                    NFDM = data.content.values[i].cpNFParceladeMandaMaximaFake || "";
                    
                    if(NF1P && NF1P != null && NF1P != undefined && arrNF1P.indexOf(NF1P) === -1 ) arrNF1P.push(NF1P);
                    if(NF2P && NF2P != null && NF2P != undefined && arrNF2P.indexOf(NF2P) === -1 ) arrNF2P.push(NF2P);
                    if(NFB  && NFB  != null && NFB  != undefined && arrNFB.indexOf(NFB)   === -1 ) arrNFB.push(NFB);
                    if(NFDm && NFDm != null && NFDm != undefined && arrNFDm.indexOf(NFDm) === -1 ) arrNFDm.push(NFDm);
                    if(NFDM && NFDM != null && NFDM != undefined && arrNFDM.indexOf(NFDM) === -1 ) arrNFDM.push(NFDM);
                    
                }
                
            } //fim do for


            for(i=0; i<arr1.length; i++){
                obj[i] = {
                    "imobiliaria"     : arr1[i],
                    "empreendimento"  : arr2[i],
                    "documentID"      : arr3[i],
                    "processID"       : arr4[i],
                    "total"           : arr5[i],
                    "NF1Parcela"      : arrNF1P[i],
                    "NF2Parcela"      : arrNF2P[i],
                    "NFBonificacao"   : arrNFB[i],
                    "NFDemandaMinima" : arrNFDm[i],
                    "NFDemandaMaxima" : arrNFDM[i]
                }
            }

            Object.keys(obj).sort(function(a,b) {
                var x = a.name;
                var y = b.name;
                return x < y ? -1 : x > y ? 1 : 0;
            });

            buildTable(obj, date1, date2);


        } // fim success
    });
}
// executa a query pra montar a tabela de NFS
function buildTable(obj, date1, date2, nf){

    var DataTableColumns;
    var dataTableRows = [];

    DataTableColumns += '<table id="tableNFS" class="table table-hover table-bordered">';


    console.log("obj.length", Object.keys(obj).length);
    for(var i = 0; i < Object.keys(obj).length; i++){

        console.log("obj", obj[i].total);

        var documentid = "<input type='text' id='NFS_documentid_"+i+"' class='form-control hide' value='"+obj[i].documentID+"' >";
        var cpProcessID = "<input type='text' id='NFS_cpProcessID_"+i+"' class='form-control hide' value='"+obj[i].processID+"'>";

        dataTableRows.push([
            date1 +" à "+ date2,
            obj[i].imobiliaria + documentid + cpProcessID,
            obj[i].empreendimento,
            obj[i].total,
            obj[i].NF1Parcela,
            obj[i].NF2Parcela,
            obj[i].NFBonificacao,
            obj[i].NFDemandaMinima,
            obj[i].NFDemandaMaxima,
            "<input type='text' name='cpNF_"+i+"' id='cpNF_"+i+"' class='form-control valor'>",
            "<input type='checkbox' id='select_row_"+i+"'>"
        ]);
    }

    var title = [
        { title: 'Período'},
        { title: 'Imobiliária'},
        { title: 'Empreendimento'},
        { title: 'Valor (R$)'},
        { title: 'NF 1\&ordf\; Parcela'},
        { title: 'NF 2\&ordf\; Parcela'},
        { title: 'NF Bonificação'},
        { title: 'NF Demanda Mín.'},
        { title: 'NF Demanda Max.'},
        { title: 'Inserir NF'},
        { title: "<input type='checkbox' id='select_all_rows'> " + ' <i class="fluigicon fluigicon-cog fluigicon-xs"></i>'}
    ];

    DataTableColumns += '</table>';
    DataTableColumns = DataTableColumns.replace('undefined', '').replace('null', '');

    $("#NFS_table").html(DataTableColumns);

    $("#tableNFS").DataTable({
        dom: 'frtip',
        data: dataTableRows,
        columns: title,
        paging: false,
        select: true,
        lengthMenu: [10, 25, 50, 100],
        language: {
            search: "",
            emptyTable: "Não há solicitações com estas informações.",
            info: "Exibir _PAGE_ de _PAGES_"
        }
    });

    $("#tableNFS_wrapper .dt-buttons, #tableNFS_filter").appendTo("#NFS_filter");
    $("#tableNFS_info, #tableNFS_paginate").appendTo("#NFS_pag");
    $("#tableNFS_filter, #tableNFS_paginate").addClass("pull-right");
    $("#tableNFS_info").addClass("pull-left");
    $("#tableNFS_filter input").attr("placeholder", "Filtro");
    $("#NFS_send").removeClass("hide");


    $("#tableNFS  tbody tr").each(function(i){
        $(this).attr("id", "tr_"+i);
    });

    var numDoc;
    var numDocAnt;
    var ant = 0;


    var documentID_a;
    var processID_a;
    var imobiliaria_a;
    var empreendimento_a;
    var valor_a = 0;


    var documentID_a;
    var processID_a;
    var imobiliaria_a;
    var empreendimento_a;
    var documentID;
    var processID;
    var imobiliaria;
    var empreendimento;
    var total;

    var doc = [];
    var pro = [];
    var del = [];
    var tot = [];

    var index;

    $("#tableNFS  tbody tr").each(function(){
        var elm = $(this);
        var id = elm.attr("id").split("_").reverse();
        
        imobiliaria    = $("#tableNFS  tbody #tr_"+id[0]+" td:nth-child(4)").text();
        empreendimento = $("#tableNFS  tbody #tr_"+id[0]+" td:nth-child(5)").text();
        
        if(id[0] != "0"){

            ant = parseInt(id[0]) - 1;

            imobiliaria_a    = $("#tableNFS  tbody #tr_"+ant+" td:nth-child(4)").text();
            empreendimento_a = $("#tableNFS  tbody #tr_"+ant+" td:nth-child(5)").text();

        }

        if(imobiliaria_a == imobiliaria && empreendimento_a == empreendimento ){

            if(!index) index = ant;

            documentID = $("#NFS_documentid_"+id[0]).val();
            processID  = $("#NFS_cpProcessID_"+id[0]).val();
            total      = $("#tableNFS  tbody #tr_"+id[0]+" td:nth-child(6)").text();

            if(doc.indexOf(documentID) === -1 ) doc.push(documentID);
            if(processID && pro.indexOf(processID) === -1) pro.push(processID);
            if(del.indexOf(id[0]) === -1 ) del.push(id[0]);
            if(tot.indexOf(total) === -1 ) tot.push(total);

        }

        if($("#cpNF_"+id[0]).val() == "undefined" ) $("#cpNF_"+id[0]).val("");

    });

    var total = tot.reduce((a,b) => parseFloat(a)+parseFloat(b),0);
        total = total.toFixed(2);

    if(index){

        var docArray = $("#NFS_documentid_"+index).val()+","+doc;
        var proArray = $("#NFS_cpProcessID_"+index).val()+","+pro;


        var arrayStr = '<span class="arrayDocID hide">'+docArray+'</span>'
        $("#tableNFS tbody #tr_"+index+" td:nth-child(2)").append(arrayStr)
        $("#tableNFS tbody #tr_"+index).addClass("array");

        if(pro.length > 0){
            var arrStr = '<span class="arrayProID hide">'+proArray+'</span>'
            $("#tableNFS tbody #tr_"+index+" td:nth-child(2)").append(arrStr)
        }

        var val = $("#tableNFS  tbody #tr_"+index+" td:nth-child(6)").text();
            val = parseFloat(val) + parseFloat(total);
            val = val.toFixed(2);

        $("#tableNFS tbody #tr_"+index+" td:nth-child(6)").text(val);
    }

    for(i=0; i<del.length; i++){
        $("#tableNFS  tbody #tr_"+del[i]+":not(.array)").addClass("hide");
    }

    $("#tableNFS  tbody tr td:nth-child(4)").each(function(){
        $(this).attr("class", "money");
    });

    $(".money").mask('#.##0,00', { reverse: true });
}

// monta o consolidado
function getConsolidated(val1, val2, val3, val4, imobiliaria, x){

    var columnsBruto;
    var columns1Parc;
    var columns2Parc;
    var columnsParcU;
    var columnsDistr;

    var rowsColumnsBruto = [];
    var rowsColumnsParc1 = [];
    var rowsColumnsParc2 = [];
    var rowsColumnsParcUnic = [];
    var rowsColumnsDistrato = [];

    var dados;

    var arrValorTotal = [];
    var arrValorDistr = [];

    var arr = [];


    
    //1PARCELA
    var arrValor1Parc = [];
    var arrValorBonus = [];
    //1PARCELA

    //2PARCELA
    var arrValor2Parc = [];
    var arrDemanMinim = [];
    var arrDemanMaxim = [];
    //2PARCELA

    //PARCELA UNICA
    var arrValorParcU = [];
    //PARCELA UNICA

    //DISTRATO
    var arrValorDist = [];
    //DISTRATO


    // AJAX PARAMS
    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    }else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDate2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateBonus", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMin", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDemandaMax", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpDateDistrato", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
            ]
        }
    }
    // AJAX PARAMS

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            columnsBruto += '<table id="tableBruto_'+x+'" class="table-consolided">';
            columns1Parc += '<table id="table1Parc_'+x+'" class="table-consolided">';
            columns2Parc += '<table id="table2Parc_'+x+'" class="table-consolided">';
            columnsParcU += '<table id="tableParcU_'+x+'" class="table-consolided">';
            columnsDistr += '<table id="tableDist_'+x+'" class="table-consolided">';

            var empreendimento;
            var empreendimento2;
            var valVenda;
            var base;

            var documentid = [];

            for (var i = 0; i < data.content.values.length; i++) {
                

                empreendimento = data.content.values[i].cpEmpreendimento;
                valComissao    = data.content.values[i].cpValorTotalDeComissao;

                if(documentid.indexOf(data.content.values[i].documentid) === -1 && imobiliaria == data.content.values[i].cpNomeImobiliaria && empreendimento && empreendimento != "undefined" && valComissao && valComissao != "0,00"){

                    (!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ) ? base = data.content.values[i].cpValorReferenciaComissao : base = data.content.values[i].cpValorLiquidoVenda;

                    // INICIO TABELA BRUTO
                    var cpValorTotalDeComissao  = data.content.values[i].cpValorTotalDeComissao  || 0;
                    var cpValor1ParcelaComissao = data.content.values[i].cpValor1ParcelaComissao || 0;
                    var cpValor2ParcelaComissao = data.content.values[i].cpValor2ParcelaComissao || 0;
                    var cpValordeDistrato       = data.content.values[i].cpValordeDistrato       || 0;
                    
                    var cpValorParcelaUnica;
                    (data.content.values[i].cpConfirmParcelUnic == "true") ? cpValorParcelaUnica = data.content.values[i].cpValor1ParcelaComissao : cpValorParcelaUnica = 0;

                    empreendimento = data.content.values[i].cpEmpreendimento;
                    empreendimento2 = data.content.values[i].cpEmpreendimento;

                    arrValorTotal.push(cpValorTotalDeComissao);
                    arrValorDistr.push(cpValordeDistrato);
                    // FIM TABELA BRUTO

                    // INICIO TABELA 1 PARCELA
                    if(data.content.values[i].cpValor1ParcelaComissao && data.content.values[i].cpValor1ParcelaComissao != "0,00" && data.content.values[i].cpValor1ParcelaComissao != 0 && data.content.values[i].cpConfirmParcelUnic != "true"){
                        date = data.content.values[i].dtVenda;
                        date = date.split("-").reverse();
                        date = date[0]+"/"+date[1]+"/"+date[2];

                        rowsColumnsParc1.push([
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].cpTipoVenda,
                            base,
                            data.content.values[i].cpValor1ParcelaComissao,
                            data.content.values[i].cpValorParcelaBonificacao,
                        ]);

                        var cpValor1ParcelaComissao = data.content.values[i].cpValor1ParcelaComissao || 0;
                        arrValor1Parc.push(cpValor1ParcelaComissao);

                        var cpValorBonus = data.content.values[i].cpValorParcelaBonificacao || 0;
                        arrValorBonus.push(cpValorBonus);
                    }
                    // FIM TABELA 1 PARCELA

                    // INICIO TABELA 2 PARCELA
                    if(data.content.values[i].cpValor2ParcelaComissao && data.content.values[i].cpValor2ParcelaComissao != "0,00" && data.content.values[i].cpValor2ParcelaComissao != 0){
                        date2 = data.content.values[i].dtAgregacao.trim() || "";
                        if(date2){
                            date2 = date2.split("-").reverse();
                            date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                        }

                        rowsColumnsParc2.push([
                            date,
                            date2,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].cpTipoVenda,
                            base,
                            data.content.values[i].cpValor2ParcelaComissao,
                            data.content.values[i].cpValorParcelaDemandaMinima,
                            data.content.values[i].cpValorParceladeMandaMaxima,
                            data.content.values[i].cpValorParcelaBonificacao
                        ]);


                        var cpValor2ParcelaComissao = data.content.values[i].cpValor2ParcelaComissao || 0;
                        arrValor2Parc.push(cpValor2ParcelaComissao);

                        var cpValorBonus = data.content.values[i].cpValorParcelaBonificacao || 0;
                        arrValorBonus.push(cpValorBonus);

                        var cpValDemanMin = data.content.values[i].cpValorParcelaDemandaMinima || 0;
                        arrDemanMinim.push(cpValDemanMin);

                        var cpValDemanMax = data.content.values[i].cpValorParceladeMandaMaxima || 0;
                        arrDemanMaxim.push(cpValDemanMax);
                    }
                    // FIM TABELA 2 PARCELA

                    // INICIO TABELA PARCELA UNICA
                    if(data.content.values[i].cpConfirmParcelUnic == "true"){
                        date2 = data.content.values[i].dtAgregacao.trim() || "";
                        if(date2){
                            date2 = date2.split("-").reverse();
                            date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                        }

                        rowsColumnsParcUnic.push([
                            date,
                            date2,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].cpTipoVenda,
                            base,
                            data.content.values[i].cpValor1ParcelaComissao,
                            data.content.values[i].cpValorParcelaDemandaMinima,
                            data.content.values[i].cpValorParceladeMandaMaxima,
                            data.content.values[i].cpValorParcelaBonificacao
                        ]);


                        var cpValor1ParcelaComissao = data.content.values[i].cpValor1ParcelaComissao || 0;
                        arrValorParcU.push(cpValor1ParcelaComissao);

                        var cpValorBonus = data.content.values[i].cpValorParcelaBonificacao || 0;
                        arrValorBonus.push(cpValorBonus);

                        var cpValDemanMin = data.content.values[i].cpValorParcelaDemandaMinima || 0;
                        arrDemanMinim.push(cpValDemanMin);

                        var cpValDemanMax = data.content.values[i].cpValorParceladeMandaMaxima || 0;
                        arrDemanMaxim.push(cpValDemanMax);    
                    }
                    // FIM TABELA PARCELA UNICA

                    // INICIO TABELA DISTRATO
                    if(data.content.values[i].cpValordeDistrato && data.content.values[i].cpValordeDistrato != "0,00" && data.content.values[i].cpValordeDistrato != 0){
                        nf1 = data.content.values[i].cpNF1ParcelaComissao || ''; 
                        nf2 = data.content.values[i].cpNF2ParcelaComissao || ''; 
                        nf3 = data.content.values[i].cpNFParcelaBonificacao || ''; 
                        nf4 = data.content.values[i].cpNFParcelaDemandaMinima || ''; 
                        nf5 = data.content.values[i].cpNFParceladeMandaMaxima || ''; 

                        nf = nf1+" - "+nf2+" - "+nf3+" - "+nf4+" - "+nf5;

                        if(nf == ' -  -  -  - ') nf = "";

                        rowsColumnsDistrato.push([
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].cpTipoVenda,
                            nf,
                            data.content.values[i].cpValordeDistrato,
                        ]);

                        var cpValorDistrato = data.content.values[i].cpValordeDistrato || 0;
                        arrValorDist.push(cpValorDistrato);
                    }
                    // FIM TABELA DISTRATO

                    documentid.push(data.content.values[i].documentid);
                }
            } // fim do for
            
            var ValorTotal        = arrValorTotal.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorDistr        = arrValorDistr.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
            var ValorTotalLiquido = parseFloat(ValorTotal) - parseFloat(ValorDistr);
                
            ValorTotal        = ValorTotal.toFixed(2);
            ValorDistr        = ValorDistr.toFixed(2);
            ValorTotalLiquido = ValorTotalLiquido.toFixed(2);

            if(ValorTotal == 0)        ValorTotal = "";
            if(ValorDistr == 0)        ValorDistr = "";
            if(ValorTotalLiquido == 0) ValorTotalLiquido = "";

            if(ValorTotal || ValorDistr || ValorTotalLiquido){
                rowsColumnsBruto.push([
                    ValorTotal,
                    ValorDistr,
                    '',
                    ValorTotalLiquido
                ]);
            }

            // INICIO TABELA BRUTO
                columnsBruto += '</table><input type="text" id="cpValorTotal" class="form-control hide" value="'+ValorTotal+'">';
                columnsBruto = columnsBruto.replace('undefined', '').replace('null', '');

                var dataInicio = val1.split('-').reverse();
                    dataInicio = dataInicio[0]+'/'+dataInicio[1]+'/'+dataInicio[2];

                var dataFim = val2.split('-').reverse();
                    dataFim = dataFim[0]+'/'+dataFim[1]+'/'+dataFim[2];

                imobiliaria = imobiliaria.replace(/\s/g, '-');

                var txt  = '<div id="chk_'+x+'" class="m-b-20">';
                    txt += ' <label><input type="checkbox" id="ckConsolidaded_'+x+'"> Selecionar Consolidado</label>';
                    txt += '</div>';
                    txt += '<div id="msg_'+x+'" class="m-b-20">';
                    txt += ' <h1>Prezados,<br>Liberado emissão de nota fiscal referente ao período <strong class="dtInicio">'+dataInicio+'</strong> a <strong class="dtFim">'+dataFim+'</strong> do empreendimento <strong class="emp">'+empreendimento2+'</strong>:</h1>';
                    txt += '</div>';

                var titleBruto = [
                    { title: 'Valor BRUTO a pagar NF BRZ '+dataFim},
                    { title: '- Desconto'},
                    { title: '- Despesas'},
                    { title: '= Valor da NF'}
                ];
            // FIM TABELA BRUTO

            // INICIO TABELA 1 PARCELA


                var Valor1Parc = arrValor1Parc.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorBonus = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

                Valor1Parc = Valor1Parc.toFixed(2);
                ValorBonus = ValorBonus.toFixed(2);

                columns1Parc += '</table>';
                columns1Parc = columns1Parc.replace('undefined', '').replace('null', '');

                var title1Parc = [
                    { title: 'Data da Venda'},
                    { title: 'N\&ordm\; da Venda'},
                    { title: 'Empreendimento'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Cliente'},
                    { title: 'Imobiliária'},
                    { title: 'Corretor'},
                    { title: 'Tipo Venda'},
                    { title: 'Base Calculo'},
                    { title: '1° Parcela'},
                    { title: 'Bônus'}
                ];
            // FIM TABELA 1 PARCELA

            // INICIO TABELA 2 PARCELA
                var Valor2Parc = arrValor2Parc.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorBonus = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorDemMin = arrDemanMinim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorDemMax = arrDemanMaxim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                
                Valor2Parc  = Valor2Parc.toFixed(2);
                ValorBonus  = ValorBonus.toFixed(2);
                ValorDemMin = ValorDemMin.toFixed(2);
                ValorDemMax = ValorDemMax.toFixed(2);

                columns2Parc += '</table>';
                columns2Parc = columns2Parc.replace('undefined', '').replace('null', '');

                var title2Parc = [
                    { title: 'Data da Venda'},
                    { title: 'Data de Agregação / Quitação'},
                    { title: 'N\&ordm\; da Venda'},
                    { title: 'Empreendimento'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Cliente'},
                    { title: 'Imobiliária'},
                    { title: 'Corretor'},
                    { title: 'Tipo Venda'},
                    { title: 'Base Calculo'},
                    { title: '2° Parcela'},
                    { title: 'Demanda Mínima'},
                    { title: 'Demanda Máxima'},
                    { title: 'Bônus'},
                ];
            // FIM TABELA 2 PARCELA

            // INICIO TABELA PARCELA UNICA
                var ValorParcU  = arrValorParcU.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorBonus  = arrValorBonus.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorDemMin = arrDemanMinim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                var ValorDemMax = arrDemanMaxim.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

                ValorParcU = ValorParcU.toFixed(2);
                ValorBonus = ValorBonus.toFixed(2);
                ValorDemMin = ValorDemMin.toFixed(2);
                ValorDemMax = ValorDemMax.toFixed(2);

                columnsParcU += '</table>';
                columnsParcU = columnsParcU.replace('undefined', '').replace('null', '');

                var titleParcU = [
                    { title: 'Data da Venda'},
                    { title: 'Data quitação'},
                    { title: 'N\&ordm\; da Venda'},
                    { title: 'Empreendimento'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Cliente'},
                    { title: 'Imobiliária'},
                    { title: 'Corretor'},
                    { title: 'Tipo Venda'},
                    { title: 'Base Calculo'},
                    { title: 'Parcela Unica'},
                    { title: 'Demanda Mínima'},
                    { title: 'Demanda Máxima'},
                    { title: 'Bônus'}
                ];
            // FIM TABELA PARCELA UNICA

            // INICIO TABELA DISTRATO
                var ValorDist = arrValorDist.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                    ValorDist = ValorDist.toFixed(2);

                columnsDistr += '</table>';
                columnsDistr = columnsDistr.replace('undefined', '').replace('null', '');

                
                var Despesas    = '<div id="ReportsDesp_'+x+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">';
                    Despesas   += ' <div class="row">';
                    Despesas   += ' <label>Despesas</label>';
                    Despesas   += ' <input name="cpDesp_'+x+'" id="cpDesp'+x+'" class="form-control money">';
                    Despesas   += '</div></div>';

                var Observacao  = '<div id="ReportsObs_'+x+'" class="col-xs-12 col-sm-8 col-md-8 col-lg-8 m-b-10">';
                    Observacao += ' <div class="row">';
                    Observacao += ' <label>Observação</label>';
                    Observacao += ' <textarea name="cpObs_'+x+'" id="cpObs_'+x+'" cols="30" rows="10" class="form-control"></textarea>';
                    Observacao += '</div></div>';
                    Observacao += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>';


                var titleDistrato = [
                    { title: 'Data da Venda'},
                    { title: 'N\&ordm\; da Venda'},
                    { title: 'Empreendimento'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Cliente'},
                    { title: 'Imobiliária'},
                    { title: 'Corretor'},
                    { title: 'Tipo Venda'},
                    { title: 'NF Faturada'},
                    { title: 'Valor Pago'}
                ];
            // FIM TABELA DISTRATO

            // MONTA AS TABELAS
                $("#Reports_table > .row").append( txt + columnsBruto + Observacao + columns1Parc + columns2Parc + columnsParcU + columnsDistr + Despesas);

                $("#tableBruto_"+x).DataTable({
                    data: rowsColumnsBruto,
                    columns: titleBruto,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $("#tableBruto_"+x).dataTable().fnDestroy();

                $("#tableBruto_"+x+" tbody tr td").each(function(i){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            
                $("#table1Parc_"+x).DataTable({
                    data: rowsColumnsParc1,
                    columns: title1Parc,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $("#table1Parc_"+x).dataTable().fnDestroy();

                $("#table1Parc_"+x+" tbody tr td:nth-child(10)").each(function(){
                    var valLiq = $(this).text().trim();
                     
                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");   

                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                });

                var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+Valor1Parc+"</td> <td>"+ValorBonus+"</td></tr>";
                $(tr).insertAfter("#table1Parc_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl1Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1>1ª Parcela para as unidades:</h1></div>";
                $(h1).insertBefore("#table1Parc_"+x);

                $("#table1Parc_"+x+" tbody tr td:nth-child(11), #table1Parc_"+x+" tbody tr td:last-child, #table1Parc_"+x+" tbody tr.total td:nth-child(2)").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
            
                $("#table2Parc_"+x).DataTable({
                    data: rowsColumnsParc2,
                    columns: title2Parc,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $("#table2Parc_"+x).dataTable().fnDestroy();

                $("#table2Parc_"+x+" tbody tr td:nth-child(11), #table2Parc_"+x+" tbody tr td:nth-child(12), #table2Parc_"+x+" tbody tr td:nth-child(13), #table2Parc_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });

                $("#table2Parc_"+x+" tbody tr td:nth-child(11)").each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                });

                var tr = "<tr class='total'><td colspan='11'>Total</td><td>"+Valor2Parc+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
                $(tr).insertAfter("#table2Parc_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl2Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1>2ª Parcela para as unidades:</h1></div>";
                $(h1).insertBefore("#table2Parc_"+x);

                $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3),#table2Parc_"+x+" tbody tr.total td:nth-child(4), #table2Parc_"+x+" tbody tr.total td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });

                $("#tableParcU_"+x).DataTable({
                    data: rowsColumnsParcUnic,
                    columns: titleParcU,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $("#tableParcU_"+x).dataTable().fnDestroy();

                $("#tableParcU_"+x+" tbody tr td:nth-child(12), #tableParcU_"+x+" tbody tr td:nth-child(13),#tableParcU_"+x+" tbody tr td:nth-child(14), #tableParcU_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                    }
                });
                $("#tableParcU_"+x+" tbody tr td:nth-child(11)").each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }

                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                });

                var tr = "<tr class='total'><td colspan='11'>Total</td><td>"+ValorParcU+"</td> <td>"+ValorDemMin+"</td> <td>"+ValorDemMax+"</td> <td>"+ValorBonus+"</td> </tr>";
                $(tr).insertAfter("#tableParcU_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl3Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1>Parcela ÚNICA para as unidades:</h1></div>";
                $(h1).insertBefore("#tableParcU_"+x);

                $("#tableParcU_"+x+" tbody tr.total td:nth-child(2), #tableParcU_"+x+" tbody tr.total td:nth-child(3),#tableParcU_"+x+" tbody tr.total td:nth-child(4), #tableParcU_"+x+" tbody tr.total td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                        var txt = $(this).text();
                        $(this).text('R$ '+txt);
                    }
                });
            
                $("#tableDist_"+x).DataTable({
                    data: rowsColumnsDistrato,
                    columns: titleDistrato,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                
                $("#tableDist_"+x).dataTable().fnDestroy();

                $(".money").mask('#.##0,00', { reverse: true });

                var tr = "<tr class='total'><td colspan='10'>Total</td><td>"+ValorDist+"</td></tr>"
                $(tr).insertAfter("#tableDist_"+x+" tbody tr:last-child");

                var h1 = "<div id='tbl4Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1>Distrato das unidades:</h1></div>";
                $(h1).insertBefore("#tableDist_"+x);

                var div  = '<div class="panel panel-default m-b-10">';
                    div += '    <div class="panel-heading">';
                    div += '        <h4 class="panel-title">';
                    div += '            <a class="collapse-icon down" data-toggle="collapse" data-parent="#div" href="#collapse_'+x+'"><span class="imobiliaria-title">'+imobiliaria+'</span> - <span class="emp-title"></span></a>';
                    div += '        </h4>';
                    div += '    </div>';
                    div += '    <div id="collapse_'+x+'" class="panel-collapse collapse">';
                    div += '        <div class="panel-body">';
                    div += '            <div id="BlocoConsolidado_'+x+'" class="table-responsive"></div>';
                    div += '        </div>';
                    div += '    </div>';
                    div += '</div>';


                $(div).insertAfter("#ReportsDesp_"+x);

                for(y=0; y<=x; y++){
                    $('#chk_'+x+', #msg_'+x+',#tableBruto_'+x+', #table1Parc_'+x+', #table2Parc_'+x+', #tableParcU_'+x+', #tableDist_'+x+', #ReportsDesp_'+x+', #ReportsObs_'+x+', #tbl1Name_'+x+', #tbl2Name_'+x+', #tbl3Name_'+x+', #tbl4Name_'+x).appendTo('#BlocoConsolidado_'+x);
                }

                $("#tableDist_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                        $('#cpValorTotal').mask('#.##0,00', { reverse: true });
                    }
                });

        }
    });
}
// monta o consolidado

//busca a quantidade de imobiliarias no consolidados 
function getImobConsolidated(val1, val2){
    var arr = [];
    dados = {
        "name": "dsCalculaComissao", //dataset's id 
        "constraints": [{ //constraints to filter the search, all fields specified inside are required 
            "_field": "dtVenda", //name of the field used in the constraint 
            "_initialValue": val1, //value to be filtered 
            "_finalValue": val2, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {
            for (var i = 0; i < data.content.values.length; i++) {
                if(arr.indexOf(data.content.values[i].cpNomeImobiliaria) === -1 && data.content.values[i].cpNomeImobiliaria){
                    arr.push(data.content.values[i].cpNomeImobiliaria);
                }
                
            } // fim do for
        }
    });

    return arr;
}
//busca a quantidade de imobiliarias no consolidados 


function sendEmailTeste(inicio, fim, emp, imob, html){



    var data = {
        "to"          : "jonathan.canavieira@gmail.com", //emails of recipients separated by ";"
        "from"        : "comissao@brz.eng.br", // sender
        "subject"     : "Consolidados da semana "+inicio+" à "+fim+" do empreendimento - "+emp+", da imobiliaria - "+imob, //   subject
        "templateId" : "consolidado", // Email template Id previously registered
        "dialectId"  : "pt_BR", //Email dialect , if not informed receives pt_BR , email dialect ("pt_BR", "en_US", "es")
        "param"      : {
            "HTML": html,
        }
    }


    $.ajax({
        url : "/api/public/alert/customEmailSender",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(data)
    }).done(function(data) {
        //Sucesso
        console.log("Success")
        console.log(data)

    }).fail(function(jqXHR, textStatus, errorThrown) {
        //Falha
        console.log(textStatus)
        console.log(jqXHR)
        console.log(errorThrown)

    });
}

// envia email do consolidado

// executa a query pra montar as tabelas de relatorios
function executeDBReports(val1, val2, val3, val4, id, val5){

    var DataTableColumns;
    var dataTableRows = [];
    var dados;

    var arr = [];

    if (val3 && !val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                    "_initialValue": val3, //value to be filtered 
                    "_finalValue": val3, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    } else if (!val3 && val4) {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    }else if(val5){
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "dtVenda", //name of the field used in the constraint 
                    "_initialValue": val1, //value to be filtered 
                    "_finalValue": val2, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNF1ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val5, //value to be filtered 
                    "_finalValue": val5, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNF2ParcelaComissao", //name of the field used in the constraint 
                    "_initialValue": val5, //value to be filtered 
                    "_finalValue": val5, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNFBonificacao", //name of the field used in the constraint 
                    "_initialValue": val5, //value to be filtered 
                    "_finalValue": val5, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNFParcelaDemandaMinima", //name of the field used in the constraint 
                    "_initialValue": val5, //value to be filtered 
                    "_finalValue": val5, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                },
                { //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNFParceladeMandaMaxima", //name of the field used in the constraint 
                    "_initialValue": val5, //value to be filtered 
                    "_finalValue": val5, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    }else {
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                "_field": "dtVenda", //name of the field used in the constraint 
                "_initialValue": val1, //value to be filtered 
                "_finalValue": val2, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": false
            }]
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var x = 0;
            if (id == 'geral') {
                DataTableColumns += '<table id="tableGeral" class="table table-hover table-bordered">';
                var date;
                var dtAgregacao;
                var cpValorliquidovenda;

                for (var i = 0; i < data.content.values.length; i++) {
                    var checkbox = "";
                    var input = "";
                    
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dtAgregacao = data.content.values[i].dtAgregacao.trim();
                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    dtFechamentoPeriodo = data.content.values[i].cpDataFechamentoPeriodo.trim();
                    if(dtFechamentoPeriodo == 'null' || dtFechamentoPeriodo == null || dtFechamentoPeriodo == undefined || dtFechamentoPeriodo == 'undefined' || dtFechamentoPeriodo == ''){
                        dtFechamentoPeriodo = '';
                    }else{
                        dtFechamentoPeriodo = dtFechamentoPeriodo.split("-").reverse();
                        dtFechamentoPeriodo = dtFechamentoPeriodo[0]+"/"+dtFechamentoPeriodo[1]+"/"+dtFechamentoPeriodo[2];    
                    }

                    dtBaixaRecebimento = data.content.values[i].cpDataBaixaRecebimento.trim();
                    if(dtBaixaRecebimento == 'null' || dtBaixaRecebimento == null || dtBaixaRecebimento == undefined || dtBaixaRecebimento == 'undefined' || dtBaixaRecebimento == ''){
                        dtBaixaRecebimento = '';
                    }else{
                        dtBaixaRecebimento = dtBaixaRecebimento.split("-").reverse();
                        dtBaixaRecebimento = dtBaixaRecebimento[0]+"/"+dtBaixaRecebimento[1]+"/"+dtBaixaRecebimento[2];    
                    }

                    dtChaves = data.content.values[i].cpDataChaves.trim();
                    if(dtChaves == 'null' || dtChaves == null || dtChaves == undefined || dtChaves == 'undefined' || dtChaves == ''){
                        dtChaves = '';
                    }else{
                        dtChaves = dtChaves.split("-").reverse();
                        dtChaves = dtChaves[0]+"/"+dtChaves[1]+"/"+dtChaves[2];    
                    }

                    var valBon = data.content.values[i].cpValor1ParcelaComissao;
                    var valPer = data.content.values[i].cpPermiteComBRZ;
                    var val4;
                    if(valPer == "true"){
                        if(!valBon || valBon == "NaN" ){
                            val4 = processAlert();
                            val1 = ""  
                        }else{
                            val4 = valBon || "";
                            val1 = ""
                        }
                    }else{
                        val4 = "";
                        val1 = valBon
                    }

                    var val1 = "", val2 = "";
                    if(data.content.values[i].cpConfirmParcelUnic == "true"){
                        val1 = data.content.values[i].cpValor1ParcelaComissao;
                    }else if(data.content.values[i].cpConfirmParcelUnic != "true" && valPer != "true" ){
                        val2 = data.content.values[i].cpValor1ParcelaComissao;
                    }

                    var deMin  = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                    }else{
                        deMin = data.content.values[i].cpValorParcelaDemandaMinima || "";
                    }

                    var deMax  = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;
                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }else{
                        deMax = data.content.values[i].cpValorParceladeMandaMaxima || "";
                    }

                    var fifty = data.content.values[i].slFifty;
                    if(fifty == "null") fifty = "N";                    

                    dataTableRows.push([
                        '',
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpEmpreendimento,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        date,
                        dtAgregacao,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        fifty,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].slStatusUnidade || "",
                        data.content.values[i].cpValorPagoAteMomento || "",
                        val2,
                        data.content.values[i].cpValor2ParcelaComissao,
                        val1,
                        val4,
                        data.content.values[i].cpValorParcelaBonificacao || "",
                        deMin,
                        deMax,
                        data.content.values[i].cpValordeDistrato,
                        data.content.values[i].cpValorTotalDeComissao,
                        data.content.values[i].cpNF1ParcelaComissao     || "",
                        data.content.values[i].cpNF2ParcelaComissao     || "",
                        data.content.values[i].cpNFBonificacao          || "",
                        data.content.values[i].cpNFParcelaDemandaMinima || "",
                        data.content.values[i].cpNFParceladeMandaMaxima || "",
                        data.content.values[i].cp1ValorGerado,
                        dtFechamentoPeriodo,
                        data.content.values[i].cp1ValorPagoCliente,
                        dtBaixaRecebimento,
                        dtChaves,
                    ]);

                    arr.push(data.content.values[i].documentid);
                    x++;
                } // fim do for
            }

            if (id == 'brz') {
                DataTableColumns += '<table id="tableBrz" class="table table-hover table-bordered">';
                var date;
                for (var i = 0; i < data.content.values.length; i++) {
                    var checkbox = "";
                    var input = "";
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dataTableRows.push([
                        data.content.values[i].cpEmpreendimento,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        data.content.values[i].dtAgregacao.trim(),
                    ]);

                    arr.push(data.content.values[i].documentid);
                    x++;
                } // fim do for
            }

            Array.prototype.reverse.apply(dataTableRows);

            DataTableColumns += '</table></div>';

            DataTableColumns = DataTableColumns.replace('undefined', '');
            
            if(id == 'geral'){
                $("#Cube_table").html(DataTableColumns);

                var columTab = [
                    { title: "ID"},
                    { title: "Numero da Venda"},
                    { title: "Empreendimento"},
                    { title: "Bloco"},
                    { title: "Unidade"},
                    { title: "Data da Venda"},
                    { title: "Data de Agregação / Quitação"},
                    { title: "Nome do Cliente"},
                    { title: "Nome da Imobiliária"},
                    { title: "Nome do Corretor"},
                    { title: "Valor Líquido Venda"},
                    { title: "Valor Referência"},
                    { title: "É Fifty?"},
                    { title: "Tipo da Venda"},
                    { title: "Status da Unidade"},
                    { title: "Valor Pago até o Momento"},
                    { title: "Valor da 1ª Parcela"},
                    { title: "Valor da 2ª Parcela"},
                    { title: "Valor Parcela Única"},
                    { title: "Valor comissão BRZ"},
                    { title: "Valor Prêmio"},
                    { title: "Valor Demanda Minima"},
                    { title: "Valor Demanda Máxima"},
                    { title: "Valor de Distrato"},
                    { title: "Valor Total de Comissão"},
                    { title: "NF da 1ª Parcela"},
                    { title: "NF da 2ª Parcela"},
                    { title: "NF parcela prêmio"},
                    { title: "NF parcela de demanda minima"},
                    { title: "NF parcela de demanda máxima"},
                    { title: "1\&ordm\; Valor Gerado"},
                    { title: "Data do 1\&ordm\; Valor Gerado "},
                    { title: "1\&ordm\; Valor do Pgto. do Cliente "},
                    { title: "Data da Baixa do 1\&ordm\; Valor do Cliente"},
                    { title: "Data da Entrega das Chaves"},
                  ];
            }

            if (id == 'brz') {
              $("#Brz_table").html(DataTableColumns);

              var columTab = [
                { title: 'Empreendimento'},
                { title: 'Data da Venda'},
                { title: 'Numero da Venda'},
                { title: 'Bloco'},
                { title: 'Unidade'},
                { title: 'Nome do Cliente'},
                { title: 'Nome da Imobiliária'},
                { title: 'Nome do Corretor'},
                { title: 'Tipo da Venda'},
                { title: 'Valor Líquido Venda'},
                { title: 'Valor Referência'},
                { title: 'Data de Agregação / Quitação'},
              ];
            }
            

            if (id == 'geral') {

                var t = $("#tableGeral").DataTable({
                            dom: 'Bfrtip',
                            data: dataTableRows,
                            columns: columTab,
                            paging: false,
                            select: true,
                            lengthMenu: [10, 25, 50, 100],
                            order:[2, "asc"],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });
                t.on('order.dt search.dt', function(){
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i){
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    });
                }).draw();

                $('#tableGeral').dataTable().fnDestroy();

                $('#tableGeral tbody tr td:nth-child(11), #tableGeral tbody tr td:nth-child(12), #tableGeral tbody tr td:nth-child(16), #tableGeral tbody tr td:nth-child(17), #tableGeral tbody tr td:nth-child(18), #tableGeral tbody tr td:nth-child(19), #tableGeral tbody tr td:nth-child(20), #tableGeral tbody tr td:nth-child(21), #tableGeral tbody tr td:nth-child(22), #tableGeral tbody tr td:nth-child(23), #tableGeral tbody tr td:nth-child(24), #tableGeral tbody tr td:nth-child(25),#tableGeral tbody tr td:nth-child(26), #tableGeral tbody tr td:nth-child(31), #tableGeral tbody tr td:nth-child(33)').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq != "Processando"){

                        if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                            valLiq = valLiq + ".00";
                            $(this).text(valLiq);
                        }

                        if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            if(valLiq && valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                        if(valLiq.indexOf("-") >= 0){
                            $(this).mask('#.##0,00', { reverse: true });
                            var val = $(this).text();
                            $(this).text("-"+val).addClass("text-danger");
                        }else{
                            $(this).mask('#.##0,00', { reverse: true });    
                        }
                    }
                });

                $('#tableGeral tbody tr').each(function(i){
                    $(this).attr('id', 'trAll_'+i);
                });

                var seen = {};
                $('#tableGeral tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(2)").text();
                    (seen[num_venda]) ? $(this).remove() : seen[num_venda] = true;
                });
                
                $("#tableGeral").DataTable({
                    dom: 'Bfrtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],

                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });


                $("#tableGeral_wrapper .dt-buttons, #tableGeral_filter").appendTo("#Cube_filter");
                $("#tableGeral_info, #tableGeral_paginate").appendTo("#Cube_pag");
                $("#tableGeral_filter, #tableGeral_paginate").addClass("pull-right");
                $("#tableGeral_info").addClass("pull-left");
                $("#tableGeral_filter input").attr("placeholder", "Filtro");
            }

            if (id == 'brz') {
                $("#tableBrz").DataTable({
                    dom: 'Bfrtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    },
                    buttons: [
                      'csv',
                      'excel',
                      'print',
                      {
                        extend: 'pdfHtml5',
                        orientation : "landscape",
                        download: 'open',
                        customize: function ( doc ) {
                          doc.pageMargins = [10, 10, 10, 10];
                          doc.content[1].table.widths = (100 / (doc.content[1].table.body[0].length)) + "%";
                        }
                      }
                    ]
                });

                $('#tableBrz').dataTable().fnDestroy();
                $('#tableBrz tbody tr td:nth-child(12)').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq.indexOf(",") === -1 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                });
                $("#tableBrz").DataTable({
                    dom: 'Bfrtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    },
                    buttons: [
                      'csv',
                      'excel',
                      'print',
                      {
                        extend: 'pdfHtml5',
                        orientation : "landscape",
                        download: 'open',
                        customize: function ( doc ) {
                          doc.pageMargins = [10, 10, 10, 10];
                          doc.content[1].table.widths = (100 / (doc.content[1].table.body[0].length)) + "%";
                        }
                      }
                    ]

                });

                $("#tableBrz_wrapper .dt-buttons, #tableBrz_filter").appendTo("#Brz_filter");
                $("#tableBrz_info, #tableBrz_paginate").appendTo("#Brz_pag");
                $("#tableBrz_filter, #tableBrz_paginate").addClass("pull-right");
                $("#tableBrz_info").addClass("pull-left");
                $("#tableBrz_filter input").attr("placeholder", "Filtro");
            }


        }
    });
}

// executa a query pra montar as tabelas para mudança de parâmetros de calculo de comissões
function executeDBCalculation(val1, val2, val3, val4, id){

    var DataTableColumns;
    var DataTableColumnsFake;
    var dataTableRows = [];
    var dataTableRowsFake = [];
    var dados;

    var arr = [], arrDist = [], arrTot = [];
    

    if(id == "parametros"){
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "companyId", //name of the field used in the constraint 
                    "_initialValue": 1, //value to be filtered 
                    "_finalValue": 1, //final value to be filtered 
                    "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    }

    if(id == "parametrosEmail"){
        dados = {
            "name": "dsCalculaComissao", //dataset's id 
            "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                    "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                    "_initialValue": val4, //value to be filtered 
                    "_finalValue": val4, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }
            ]
        }
    }

    if(id == "comissaoBRZ"){
        if (!val3) {
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        }else{
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpEmpreendimentoCod", //name of the field used in the constraint 
                        "_initialValue": val3, //value to be filtered 
                        "_finalValue": val3, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    },
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpNomeimobiliaria", //name of the field used in the constraint 
                        "_initialValue": val4, //value to be filtered 
                        "_finalValue": val4, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }
        }
    }

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            if(id == "comissaoBRZ"){
                DataTableColumns     += '<table id="tableComissoesBRZ" class="table table-hover table-bordered tableComissoesBRZ">';
                DataTableColumnsFake += '<table id="tableComissoesBRZ_fake" class="table table-hover table-bordered tableComissoesBRZ hide">';

                for (var i = 0; i < data.content.values.length; i++) {

                    var checkbox = "";
                    var input = "";
                    
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    dtAgregacao = data.content.values[i].dtAgregacao.trim();

                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    var proID = data.content.values[i].cpProcessID;

                    var documentid = "<input type='text' id='CBdocumentid_"+i+"' class='form-control hide' value='"+data.content.values[i].documentid+"'>";
                    var cpProcessID = "<input type='text' id='CBcpProcessID_"+i+"' class='form-control hide' value='"+proID+"'>";

                    var PorcentComBRZ = data.content.values[i].cpPorcentComBRZ;
                    var field;
                    (PorcentComBRZ) ? field = '<input type="text" id="cpPercComissaoBrz_'+i+'" class="form-control percent" value="'+data.content.values[i].cpPorcentComBRZ+'" maxlength="6" readonly>' : field = '<input type="text" id="cpPercComissaoBrz_'+i+'" class="form-control percent" maxlength="6">'

                    var valPer = data.content.values[i].cpPermiteComBRZ;
                    var chk;
                    if(valPer == "true"){
                        chk = "<input type='checkbox' id='select_sale_comission_"+i+"' disabled='disabled' checked='checked'>"
                    }else{
                        chk = "<input type='checkbox' id='select_sale_comission_"+i+"'>"
                    }

                    var valBon = data.content.values[i].cpValor1ParcelaComissao;
                    var calculo;
                    if(valPer == "true" && !valBon){
                        console.log(data.content.values[i].cpNumeroVenda, valBon)
                        calculo = processAlert();
                    }else{
                        calculo = valBon || "";
                    }

                    dataTableRows.push([
                        "",
                        data.content.values[i].cpEmpreendimento + documentid + cpProcessID,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        data.content.values[i].slStatusUnidade,
                        calculo,
                        field+'<span class="hide"></span>',
                        chk
                    ]);

                    dataTableRowsFake.push([
                        "",
                        data.content.values[i].cpEmpreendimento,
                        date,
                        data.content.values[i].cpNumeroVenda,
                        data.content.values[i].cpBloco,
                        data.content.values[i].cpUnidade,
                        data.content.values[i].cpNomeCliente,
                        data.content.values[i].cpNomeImobiliaria,
                        data.content.values[i].cpNomeCorretor,
                        data.content.values[i].cpTipoVenda,
                        data.content.values[i].cpValorLiquidoVenda,
                        data.content.values[i].cpValorReferenciaComissao,
                        data.content.values[i].slStatusUnidade,
                        calculo,
                        PorcentComBRZ,
                        valBon,
                    ]);

                    var distrato = data.content.values[i].cpValorDistrato || 0;
                    var total    = data.content.values[i].cpValorTotalDeComissao || 0;

                    arrDist.push(distrato);
                    arrTot.push(total);

                    arr.push(data.content.values[i].documentid);
                } // fim do for

                Array.prototype.reverse.apply(dataTableRows);
                Array.prototype.reverse.apply(dataTableRowsFake);

                DataTableColumns += '</table>';
                DataTableColumnsFake += '</table>';

                DataTableColumns     = DataTableColumns.replace('undefined', '').replace('null', '');
                DataTableColumnsFake = DataTableColumnsFake.replace('undefined', '').replace('null', '');

                var checkboxAll;

                checkboxAll = "<input type='checkbox' id='select_all_sales_ca'>";
                $("#ComissionBRZ_table").html(DataTableColumns + DataTableColumnsFake);

                var cog = '<i class="fluigicon fluigicon-cog fluigicon-xs"></i>';
                var icon = '<span class="bs-docs-popover-hover" data-toggle="popover" data-content="Para gravar mais de um email no mesmo campo, basta separar com virgula." data-original-title="Dica"><i class="fa fa-question-circle" aria-hidden="true"></i></span>';

                var columTab = [
                    { title: 'ID'},
                    { title: 'Empreendimento'},
                    { title: 'Data da Venda'},
                    { title: 'Numero da Venda'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Nome do Cliente'},
                    { title: 'Nome da Imobiliária'},
                    { title: 'Nome do Corretor'},
                    { title: 'Tipo da Venda'},
                    { title: 'Valor Líquido Venda'},
                    { title: 'Valor Referência'},
                    { title: 'Status'},
                    { title: 'Comissão Calculada'},
                    { title: '% da Comissão'},
                    { title: checkboxAll + " Aprovação"},
                ];

                var columTabFake = [
                    { title: 'ID'},
                    { title: 'Empreendimento'},
                    { title: 'Data da Venda'},
                    { title: 'Numero da Venda'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Nome do Cliente'},
                    { title: 'Nome da Imobiliária'},
                    { title: 'Nome do Corretor'},
                    { title: 'Tipo da Venda'},
                    { title: 'Valor Líquido Venda'},
                    { title: 'Valor Referência'},
                    { title: 'Status'},
                    { title: 'Comissão Calculada'},
                    { title: '% da Comissão'},
                    { title: 'Aprovação'},
                ];

                var t = $("#tableComissoesBRZ").DataTable({
                    dom: 'frtip',
                    data: dataTableRows,
                    columns: columTab,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, 'asc'],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                var t2 = $("#tableComissoesBRZ_fake").DataTable({
                            dom: '',
                            data: dataTableRowsFake,
                            columns: columTabFake,
                            paging: false,
                            select: false,
                            lengthMenu: [10, 25, 50, 100],
                            order: [3, 'asc'],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });
                t2.on( 'order.dt search.dt', function () {
                    t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                $('#tableComissoesBRZ').dataTable().fnDestroy();
                $('#tableComissoesBRZ_fake').dataTable().fnDestroy();


                var seen = {};
                $('#tableComissoesBRZ tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(4)").text();
                    (seen[num_venda]) ? $(this).remove() : seen[num_venda] = true;
                });

                var seen2 = {};
                $('#tableComissoesBRZ_fake tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(4)").text();
                    (seen2[num_venda]) ? $(this).remove() : seen2[num_venda] = true;
                });
                
                var count = 0;
                var a = [];
                $('#tableComissoesBRZ tbody tr').each(function(i){
                    var val1 = $(this).find("td:nth-child(14)").text();
                    if(val1 != NaN && val1 != "NaN" && val1 != undefined && val1 != "" && val1 != " " && val1 != "Processando") a.push(val1);
                    count++;
                });

                $('#tableComissoesBRZ_fake tbody tr').each(function(i){
                    var val = $(this).find("td:last-child").text()
                    if(val == 'true') $(this).find("td:last-child").attr('name', 'true');
                });

                $('#tableComissoesBRZ tbody tr td:nth-child(11), #tableComissoesBRZ tbody tr td:nth-child(12),  #tableComissoesBRZ tbody tr td:nth-child(14), #tableComissoesBRZ_fake tbody tr td:nth-child(11), #tableComissoesBRZ_fake tbody tr td:nth-child(12), #tableComissoesBRZ_fake tbody tr td:nth-child(14)').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq != "Processando"){
                        
                        if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                            valLiq = valLiq + ".00";
                            $(this).text(valLiq);
                        }

                        if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                            valLiq = valLiq.split(".");
                            
                            if(valLiq[1].length == 4){
                                valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                                $(this).text(valLiq);
                            }
                        }
                        if(valLiq.indexOf("-") >= 0){
                            $(this).mask('#.##0,00', { reverse: true });
                            var val = $(this).text();
                            $(this).text("-"+val).addClass("text-danger");
                        }else{
                            $(this).mask('#.##0,00', { reverse: true });    
                        }
                    }
                });

                $('#tableComissoesBRZ tbody tr').each(function(i){
                    $(this).find(".percent").mask('#0.00', { reverse: true });    
                    $(this).attr('id', 'trComissionBRZ_'+i);
                });
                $('#tableComissoesBRZ_fake tbody tr').each(function(i){
                    $(this).find(".percent").mask('#0.00', { reverse: true });    
                    $(this).attr('name', 'trComissionBRZ_'+i);
                });        

                $("#tableComissoesBRZ").DataTable({
                    dom: 'frtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, "asc"],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableComissoesBRZ_fake").DataTable({
                    dom: '',
                    paging: false,
                    select: false,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, "asc"],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableComissoesBRZ_wrapper .dt-buttons, #tableComissoesBRZ_filter").appendTo("#ComissionBRZ_filter");
                $("#tableComissoesBRZ_info, #tableComissoesBRZ_paginate").appendTo("#ComissionBRZ_pag");
                $("#tableComissoesBRZ_filter, #tableComissoesBRZ_paginate").addClass("pull-right");
                $("#tableComissoesBRZ_info").addClass("pull-left");
                $("#tableComissoesBRZ_filter input").attr("placeholder", "Filtro");

                $("#ComissionBRZ_send, #ComissionBRZ_tableTot").removeClass("hide");

                var distrato = arrDist.reduce((a,b) => parseFloat(a) + parseFloat(b),0);
                    distrato = distrato.toFixed(2);
                var total    = a.reduce((a,b) => parseFloat(a) + parseFloat(b),0);
                    total    = total.toFixed(2);

                console.log(a)
                console.log(total)

                $("#ComissionBRZ_tableTot tbody tr td#rowVendas, #rowVendas_fake").text(count);
                $("#ComissionBRZ_tableTot tbody tr td#rowValor, #rowValor_fake").text(numeroParaMoeda(total));

                $("#rowValor, #rowValor_fake").mask('#.##0,00', { reverse: true });
                
            }

            if(id == "parametros" || id == "parametrosEmail"){

                for (var i = 0; i < data.content.values.length; i++) {
                    if (arr.indexOf(data.content.values[i].documentid) === -1 || !data.content.values[i].documentid) {
                        arr.push(data.content.values[i].documentid);
                    } // fim do if
                } // fim do for
            }
            if(id == "parametros"){

                var PriParcela = $("#cpParameters1Parcela").val();
                var SegParcela = $("#cpParameters2Parcela").val();
                var ParcelaUni = $("#cpParametersParcelaUnica").val();
                var DemandaMin = $("#cpParametersDemandaMin").val();
                var DemandaMax = $("#cpParametersDemandaMax").val();

                if(PriParcela && SegParcela && ParcelaUni && DemandaMin && DemandaMax){
                    for(i=0; i<arr.length; i++){   
                        updateFields(PriParcela, SegParcela, ParcelaUni, DemandaMin, arr[i], 'parametros', DemandaMax);
                    }    
                }else if(PriParcela && SegParcela && ParcelaUni && DemandaMin && !DemandaMax){
                    for(i=0; i<arr.length; i++){   
                        updateFields(PriParcela, SegParcela, ParcelaUni, DemandaMin, arr[i], 'parametros', "");
                    }    
                }else if(PriParcela && SegParcela && ParcelaUni && !DemandaMin && !DemandaMax){
                    for(i=0; i<arr.length; i++){   
                        updateFields(PriParcela, SegParcela, ParcelaUni, "", arr[i], 'parametros', "");
                    }    
                }else if(PriParcela && SegParcela && !ParcelaUni && !DemandaMin && !DemandaMax){
                    for(i=0; i<arr.length; i++){   
                        updateFields(PriParcela, SegParcela, "", "", arr[i], 'parametros', "");
                    }    
                }else if(PriParcela && !SegParcela && !ParcelaUni && !DemandaMin && !DemandaMax){
                    for(i=0; i<arr.length; i++){   
                        updateFields(PriParcela, "", "", "", arr[i], 'parametros', "");
                    }    
                }   
            }
            if(id == "parametrosEmail"){

                var email = $("#cpImoParametersEmail").val();
                for(i=0; i<arr.length; i++){   
                    updateFields(email, "", "", "", arr[i], 'parametersEmail');
                }
            }

        }
    });
}

function executeDBSuper(val1, val2, val3, id){

    var DataTableColumns = "", DataTableColumnsDist = "";
    var dataTableRows = [], dataTableRowsDist = [];

    var DataTableColumnsFake = "", DataTableColumnsDistFake = "";
    var dataTableRowsFake = [], dataTableRowsDistFake = [];

    var dados;

    var arr = [], arrDist = [], arrTot = [];

    if(id == "distratos"){
        if(!val3){
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDateDistrato", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 2, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            } 
        }else{
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [{ //constraints to filter the search, all fields specified inside are required 
                        "_field": "cpDateDistrato", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }    
        }        
    }else{
        if(!val3){
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            } 
        }else{
            dados = {
                "name": "dsCalculaComissao", //dataset's id 
                "constraints": [
                    { //constraints to filter the search, all fields specified inside are required 
                        "_field": "dtVenda", //name of the field used in the constraint 
                        "_initialValue": val1, //value to be filtered 
                        "_finalValue": val2, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }
                ]
            }    
        } 
    }
    

    $.ajax({
        method: "POST",
        url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            if(id == "super"){
                DataTableColumns     += '<table id="tableSuper" class="table table-hover table-bordered tableSuper">';
                DataTableColumnsFake += '<table id="tableSuper_fake" class="table table-hover table-bordered tableSuper hide">';
            }
            if(id == "distratos"){
                DataTableColumnsDist     += '<table id="tableSuperDist" class="table table-hover table-bordered tableSuper">';
                DataTableColumnsDistFake += '<table id="tableSuperDist_fake" class="table table-hover table-bordered tableSuper hide">';
            }

            for (var i = 0; i < data.content.values.length; i++) {

                cod = data.content.values[i].cpEmpreendimentoCod;

                if(val3 && val3.indexOf(cod) >= 0 ){
                    
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    if(data.content.values[i].slStatusUnidade == "Distratada"){
                        dataTableRowsDist.push([
                            "",
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].slStatusUnidade,
                            data.content.values[i].cpValorLiquidoVenda,
                            data.content.values[i].cpValorReferenciaComissao
                        ]);
                    }else{
                        dataTableRows.push([
                            "",
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].slStatusUnidade,
                            data.content.values[i].cpValorLiquidoVenda,
                            data.content.values[i].cpValorReferenciaComissao
                        ]);
                    }


                    var distrato = data.content.values[i].cpValorDistrato || 0;
                    var total    = data.content.values[i].cpValorLiquidoVenda;




                    arrDist.push(distrato);

                }else if(!val3){
                    
                    date = data.content.values[i].dtVenda;
                    date = date.split("-").reverse();
                    date = date[0]+"/"+date[1]+"/"+date[2];

                    if(data.content.values[i].slStatusUnidade == "Distratada"){

                        dataTableRowsDist.push([
                            "",
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].slStatusUnidade,
                            data.content.values[i].cpValorLiquidoVenda,
                            data.content.values[i].cpValorReferenciaComissao,
                        ]);    
                    }else{
                        dataTableRows.push([
                            "",
                            date,
                            data.content.values[i].cpNumeroVenda,
                            data.content.values[i].cpBloco,
                            data.content.values[i].cpUnidade,
                            data.content.values[i].cpNomeCliente,
                            data.content.values[i].cpEmpreendimento,
                            data.content.values[i].cpNomeImobiliaria,
                            data.content.values[i].cpNomeCorretor,
                            data.content.values[i].slStatusUnidade,
                            data.content.values[i].cpValorLiquidoVenda,
                            data.content.values[i].cpValorReferenciaComissao
                        ]);
                    }

                    var distrato = data.content.values[i].cpValorDistrato || 0;
                    var total;
                    (data.content.values[i].cpValorReferenciaComissao) ? total = data.content.values[i].cpValorReferenciaComissao : total = data.content.values[i].cpValorLiquidoVenda;

                    arrDist.push(distrato);
                }
            } // fim do for

            Array.prototype.reverse.apply(dataTableRows);

            if(id == "distratos"){
                
                DataTableColumnsDist += '</table></div>';
                DataTableColumnsDist = DataTableColumnsDist.replace('undefined', '').replace('null', '');

                DataTableColumnsDistFake += '</table></div>';
                DataTableColumnsDistFake = DataTableColumnsDistFake.replace('undefined', '').replace('null', '');

                $("#SuperDist_table").html(DataTableColumnsDist + DataTableColumnsDistFake);

                var title = [
                    { title: 'ID'},
                    { title: 'Data da Venda'},
                    { title: 'Numero da Venda'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Nome do Cliente'},
                    { title: 'Empreendimento'},
                    { title: 'Nome da Imobiliária'},
                    { title: 'Nome do Corretor'},
                    { title: 'Status da Unidade'},
                    { title: 'Valor Líquido Venda'},
                    { title: 'Valor Referência'},
                ];
                
                var d = $("#tableSuperDist").DataTable({
                            dom: '',
                            data: dataTableRowsDist,
                            columns: title,
                            paging: false,
                            select: true,
                            lengthMenu: [10, 25, 50, 100],
                            order: [3, "asc"],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });

                d.on( 'order.dt search.dt', function () {
                    d.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                var d2 = $("#tableSuperDist_fake").DataTable({
                            dom: '',
                            data: dataTableRowsDist,
                            columns: title,
                            paging: false,
                            select: true,
                            lengthMenu: [10, 25, 50, 100],
                            order: [3, "asc"],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });

                d2.on( 'order.dt search.dt', function () {
                    d2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();


                $('#tableSuperDist').dataTable().fnDestroy();
                $('#tableSuperDist_fake').dataTable().fnDestroy();


                var seen = {};
                $('#tableSuperDist tbody tr').each(function(i) {
                    var num_venda  = $(this).find("td:nth-child(3)").text();
                    if (seen[num_venda]){
                        $(this).remove();
                    }else{
                        seen[num_venda] = true;
                    }
                });

                var seen2 = {};
                $('#tableSuperDist_fake tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(3)").text();
                    if (seen2[num_venda]){
                        $(this).remove();
                    }else{
                        seen2[num_venda] = true;
                    }
                });

                $('#tableSuperDist tbody tr td:nth-child(11), #tableSuperDist tbody tr td:nth-child(12), #tableSuperDist tbody tr td:last-child, #tableSuperDist_fake tbody tr td:nth-child(11), #tableSuperDist_fake tbody tr td:nth-child(12), #tableSuperDist_fake tbody tr td:last-child').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                        valLiq = valLiq + ".00";
                        $(this).text(valLiq);
                    }

                    if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }
                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                });

                $("#tableSuperDist, #tableSuperDist_fake").DataTable({
                    dom: '',
                    columns: title,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, "asc"],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

            }

            if(id == "super"){
                DataTableColumns += '</table></div>';
                DataTableColumns  = DataTableColumns.replace('undefined', '').replace('null', '');

                DataTableColumnsFake += '</table></div>';
                DataTableColumnsFake  = DataTableColumnsFake.replace('undefined', '').replace('null', '');
                
                $("#Super_table").html(DataTableColumns + DataTableColumnsFake);

                var title = [
                    { title: 'ID'},
                    { title: 'Data da Venda'},
                    { title: 'Numero da Venda'},
                    { title: 'Bloco'},
                    { title: 'Unidade'},
                    { title: 'Nome do Cliente'},
                    { title: 'Empreendimento'},
                    { title: 'Nome da Imobiliária'},
                    { title: 'Nome do Corretor'},
                    { title: 'Status da Unidade'},
                    { title: 'Valor Líquido Venda'},
                    { title: 'Valor Referência'},
                ];

                var t = $("#tableSuper").DataTable({
                    dom: 'frtip',
                    data: dataTableRows,
                    columns: title,
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    order: [3, "asc"],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });
                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();

                var t2 = $("#tableSuper_fake").DataTable({
                            dom: '',
                            data: dataTableRows,
                            columns: title,
                            paging: false,
                            select: true,
                            lengthMenu: [10, 25, 50, 100],
                            order: [3, "asc"],
                            language: {
                                search: "",
                                emptyTable: "Não há solicitações com estas informações.",
                                info: "Exibir _PAGE_ de _PAGES_"
                            }
                        });

                t2.on( 'order.dt search.dt', function () {
                    t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        var calc = parseInt(i)+1
                        cell.innerHTML = calc;
                    } );
                } ).draw();


                $('#tableSuper').dataTable().fnDestroy();
                $('#tableSuper_fake').dataTable().fnDestroy();

                var seen = {};
                $('#tableSuper tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(3)").text();
                    if (seen[num_venda]){
                        $(this).remove();
                    }else{
                        seen[num_venda] = true;
                    }
                });

                var seen2 = {};
                $('#tableSuper_fake tbody tr').each(function() {
                    var num_venda  = $(this).find("td:nth-child(3)").text();
                    if (seen2[num_venda]){
                        $(this).remove();
                    }else{
                        seen2[num_venda] = true;
                    }
                });

                var count = 0;
                var arrTot = [], arrVend = [];
                $('#tableSuper tbody tr').each(function(i){
                    var el = $(this);
                    el.find(".percent").mask('#0.00', { reverse: true });
                    el.attr('id', 'trComissionBRZ_'+i);

                    var last       = $(this).find("td:last-child").text();
                    var lastbutone = $(this).find("td:nth-child(11)").text();

                    if(last == "null" || last == "0" || last == "" || last == " "){
                        arrTot.push(lastbutone);
                    }else{
                        arrTot.push(last);
                    }

                    arrVend.push($(this).find("td:nth-child(3)").text());

                    count++;
                });

                $('#tableSuper_fake tbody tr').each(function(i){
                    $(this).find(".percent").mask('#0.00', { reverse: true });    
                    $(this).attr('name', 'trComissionBRZ_'+i);
                });

                $('#tableSuper tbody tr td:nth-child(11), #tableSuper_fake tbody tr td:nth-child(11), #tableSuper tbody tr td:last-child, #tableSuper_fake tbody tr td:last-child').each(function(){
                    var valLiq = $(this).text().trim();

                    if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                    if(valLiq.indexOf(".") === -1 && valLiq != null && valLiq != "null" && valLiq != "" && valLiq != " " && valLiq != undefined && valLiq != "undefined" && valLiq != NaN && valLiq != "NaN" && valLiq != "0"){
                        valLiq = valLiq + ".00";
                        $(this).text(valLiq);
                    }                    

                    if(valLiq.indexOf(",") === -1 && valLiq.indexOf(".") >= 0 && valLiq != "" && valLiq != undefined && valLiq != null && valLiq != 0.00 && valLiq != "0,00" && valLiq != 0 && valLiq != 'undefined' && valLiq != 'null'){
                        valLiq = valLiq.split(".");
                        if(valLiq[1].length == 4){
                            valLiq = valLiq[0] +"."+ valLiq[1].substr(0, 2);
                            $(this).text(valLiq);
                        }
                    }

                    if(valLiq.indexOf("-") >= 0){
                        $(this).mask('#.##0,00', { reverse: true });
                        var val = $(this).text();
                        $(this).text("-"+val).addClass("text-danger");
                    }else{
                        $(this).mask('#.##0,00', { reverse: true });    
                    }
                    
                });
                
                $("#tableSuper").DataTable({
                    dom: 'frtip',
                    paging: true,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableSuper_fake").DataTable({
                    dom: '',
                    paging: false,
                    select: true,
                    lengthMenu: [10, 25, 50, 100],
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                });

                $("#tableSuper_wrapper .dt-buttons, #tableSuper_filter").appendTo("#Super_filter");
                $("#tableSuper_info, #tableSuper_paginate").appendTo("#Super_pag");
                $("#tableSuper_filter, #tableSuper_paginate").addClass("pull-right");
                $("#tableSuper_info").addClass("pull-left");
                $("#tableSuper_filter input").attr("placeholder", "Filtro");
            }

            $("#Super_tableTot, #TableTotalSuper").removeClass("hide");


            if(arrDist.length > 0 && id == "distratos"){
                var c = 0;
                $('#tableSuperDist tbody tr').each(function(i){
                    c++;
                });
                $("#TableTotalSuper tbody tr td#rowQtdDistrato, #rowQtdDistrato_fake").text(c);
            }
            var total = 0;

            if(id == "super"){
                console.log(arrTot);
                console.log(arrVend);
                if(arrTot.length > 0 ){
                    total = arrTot.reduce((a,b) => parseFloat(a) + parseFloat(b),0);
                    total = total.toFixed(2);
                    $("#TableTotalSuper tbody tr td#rowVendidos, #rowVendidos_fake").text(numeroParaMoeda(total));
                    $("#cpValVendidos").val(total);
                }    
            }
            
            
            $("#TableTotalSuper tbody tr td#rowQtdVendas, #rowQtdVendas_fake").text(count);
            
        }
    });
}

function upperCase(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

function consultDB(imob, type){

    var consult;

    if(type == "email"){
        consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_IMOBILIARIA_EMAILS WHERE IMOBILIARIA = '"+imob+"'";
    }else if(type == "param"){
        consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS";
    }else if(type == "mlFluig"){
        consult  = "SELECT * FROM FLUIG.ML0012311";
    }

    if(type == "consolidado"){
        // consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_BRUTO" 
        // consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PPARC" 
        consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_SPARC"
    }

    

    var data = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" : [{ //constraints to filter the search, all fields specified inside are required 
            "_field" : "SQL", //name of the field used in the constraint 
            "_initialValue": consult, //value to be filtered 
            "_finalValue" : consult, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }

    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data) {

        if(type == "email"){
            if(data.content.values.length > 0 && data.content.values[0].IMOBILIARIA == imob){
                $("#cpImoParametersEmail").val(data.content.values[0].EMAIL);
            }else{
                $("#cpImoParametersEmail").val('');
            }    
        }

        if(type == "param"){
            console.log("length", data.content.values.length);

            if(data.content.values.length > 0){
                console.log("PRIMPARCELA", data.content.values[0].PRIMPARCELA);
                console.log("SEGPARCELA", data.content.values[0].SEGPARCELA);
                console.log("PARCELAUNICA", data.content.values[0].PARCELAUNICA);
                console.log("DEMANDAMIN", data.content.values[0].DEMANDAMIN);
                console.log("DEMANDAMAX", data.content.values[0].DEMANDAMAX);
            }


            if(data.content.values.length > 0){
                $("#cpParameters1Parcela").val(data.content.values[0].PRIMPARCELA);
                $("#cpParameters2Parcela").val(data.content.values[0].SEGPARCELA);
                $("#cpParametersParcelaUnica").val(data.content.values[0].PARCELAUNICA);
                $("#cpParametersDemandaMin").val(data.content.values[0].DEMANDAMIN);
                $("#cpParametersDemandaMax").val(data.content.values[0].DEMANDAMAX);
            }else{
                $("#cpParameters1Parcela, #cpParameters2Parcela, #cpParametersParcelaUnica, #cpParametersDemandaMin, #cpParametersDemandaMax").val('');
            } 
        }

        if(type == "mlFluig"){
            console.log("length", data.content.values.length);
            console.log("data", data);

            for(i=0; i<data.content.values.length; i++){
                console.log("numero venda", data.content.values[i].cpNumeroVenda);
                console.log("numero venda", data.content.values[i].cpNumeroVenda);
                console.log("numero venda", data.content.values[i].cpNumeroVenda);
                console.log("numero venda", data.content.values[i].cpNumeroVenda);
            }
        }
        
        if(type == "consolidado"){
            console.log("length", data.content.values.length);
            console.log("data", data);

            for(i=0; i<data.content.values.length; i++){
                console.log("numero ID", data.content.values[i].ID);
                console.log("numero DataVenda", data.content.values[i].DataVenda);
                console.log("numero NumVenda", data.content.values[i].NumVenda);
                console.log("numero Empreendimento", data.content.values[i].Empreendimento);
                console.log("numero Unidade", data.content.values[i].Unidade);

                // console.log("Imobiliaria", data.content.values[i].Imobiliaria);
                // console.log("Empreendimento", data.content.values[i].Empreendimento);
                // console.log("ValorBruto", data.content.values[i].ValorBruto);
            }
        }

      }
    }); 
}

// grava as informacoes passadas no form
function updateFields(field1, field2, field3, field4, documentid, type, field5){

    // field1 valor da porcentagem da bonificacao do formulário
    // field2 aprovacao da bonificacao

    var constraints = new Array();

    var companyId = DatasetFactory.createConstraint("companyId", 1, 1, ConstraintType.MUST);
    var user      = DatasetFactory.createConstraint("user", "App.Fluig@3461", "App.Fluig@3461", ConstraintType.MUST);
    var password  = DatasetFactory.createConstraint("password", "Brz@3461", "Brz@3461", ConstraintType.MUST);

    // info básica do formulálrio
    constraints.push(companyId);
    constraints.push(user);
    constraints.push(password);

    //fields
    if(type == 'premio'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var percent    = DatasetFactory.createConstraint("field", "cpValorParcelaBonificacao", field1, ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteBonus", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(percent);
      constraints.push(aprovacao);
    }

    if(type == 'demandaMin'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteDemandaMin", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(aprovacao);
    }

    if(type == 'demandaMax'){
      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteDemandaMax", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(aprovacao);
    }

    if(type == 'NFS'){

      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);

      var NF1     = DatasetFactory.createConstraint("field", "cpNF1ParcelaComissaoFake", field1, ConstraintType.MUST);
      var NF2     = DatasetFactory.createConstraint("field", "cpNF2ParcelaComissaoFake", field1, ConstraintType.MUST);
      var NFDMin  = DatasetFactory.createConstraint("field", "cpNFParcelaBonificacaoFake", field1, ConstraintType.MUST);
      var NFDMax  = DatasetFactory.createConstraint("field", "cpNFParcelaDemandaMinimaFake", field1, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(NF1);
      constraints.push(NF2);
      constraints.push(NFDMin);
      constraints.push(NFDMax);
    }

    if(type == 'comissaoBRZ'){


      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var percent    = DatasetFactory.createConstraint("field", "cpPorcentComBRZ", field1, ConstraintType.MUST);
      var aprovacao  = DatasetFactory.createConstraint("field", "cpPermiteComBRZ", field2, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(percent);
      constraints.push(aprovacao);
    }

    if(type == 'parametros'){

      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      constraints.push(formulario);

        if(field1 && field2 && field3 && field4 && field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo1Parc", field1, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo2Parc", field2, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculoParcUnica", field3, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentDemMin", field4, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentDemMax", field5, ConstraintType.MUST));
        }
        else if(field1 && field2 && field3 && field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo1Parc", field1, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo2Parc", field2, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculoParcUnica", field3, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentDemMin", field4, ConstraintType.MUST));
        }
        else if(field1 && field2 && field3 && !field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo1Parc", field1, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo2Parc", field2, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculoParcUnica", field3, ConstraintType.MUST));
        }
        else if(field1 && field2 && !field3 && !field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo1Parc", field1, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo2Parc", field2, ConstraintType.MUST));
        }
        else if(field1 && !field2 && !field3 && !field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo1Parc", field1, ConstraintType.MUST));
        }
        else if(!field1 && field2 && !field3 && !field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculo2Parc", field2, ConstraintType.MUST));
        }
        else if(!field1 && !field2 && field3 && !field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentCalculoParcUnica", field3, ConstraintType.MUST));
        }
        else if(!field1 && !field2 && !field3 && field4 && !field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentDemMin", field4, ConstraintType.MUST));
        }
        else if(!field1 && !field2 && !field3 && !field4 && field5){
            constraints.push(DatasetFactory.createConstraint("field", "cpPorcentDemMax", field4, ConstraintType.MUST));
        }

    }

    if(type == 'parametersEmail'){

      var formulario = DatasetFactory.createConstraint("documentid", parseInt(documentid), parseInt(documentid), ConstraintType.MUST);
      var email      = DatasetFactory.createConstraint("field", "cpEmailImob", field1, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(email);
    }

    // executa o dataset
    var datasetUpdateCard = DatasetFactory.getDataset("ds_update_card", [], constraints, []);
}
// grava as informacoes passadas no form

function updateEmail(imob, email){

    var query;

    var consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_IMOBILIARIA_EMAILS ";
        consult += "WHERE IMOBILIARIA='"+imob+"' ";

    var data = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" : [{ //constraints to filter the search, all fields specified inside are required 
        "_field" : "SQL", //name of the field used in the constraint 
        "_initialValue": consult, //value to be filtered 
        "_finalValue" : consult, //final value to be filtered 
        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
        "_likeSearch": false
      }]
    }

    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data) {

        if(data.content.values.length > 0 && data.content.values[0].IMOBILIARIA == imob){
            query  = "UPDATE FLUIG_DEV.DBO.FLUIG_IMOBILIARIA_EMAILS";
            query += " SET IMOBILIARIA = '"+imob+"', EMAIL = '"+email+"' ";
            query += " WHERE IMOBILIARIA = '"+imob+"' ";
        }else{
            query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_IMOBILIARIA_EMAILS (IMOBILIARIA, EMAIL)";
            query += " VALUES ('"+imob+"', '"+email+"')";
        }

      }
    });

    var data2 = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
            "_field" : "SQL", //name of the field used in the constraint 
            "_initialValue": query, //value to be filtered 
            "_finalValue" : query, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }


    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data2),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data){

        $("#slImoParametersEmail, #cpImoParametersEmail").val('').trigger('change');
        
        FLUIGC.message.alert({
            message: 'Email da imobiliaria foi atualizado com successo.',
            title: 'Obrigado',
            label: 'OK'
        });
      }
    });
}

function updateParams(val1, val2, val3, val4, val5){

    var query;

    var consult  = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS ";

    var data = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" : [{ //constraints to filter the search, all fields specified inside are required 
        "_field" : "SQL", //name of the field used in the constraint 
        "_initialValue": consult, //value to be filtered 
        "_finalValue" : consult, //final value to be filtered 
        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
        "_likeSearch": false
      }]
    }

    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data) {

        if(data.content.values.length > 0){
            
            query  = "UPDATE FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS";

            if(val1 && val2 && val3 && val4 && val5){
                query += " SET PRIMPARCELA = '"+val1+"', SEGPARCELA = '"+val2+"', PARCELAUNICA= '"+val3+"', DEMANDAMIN= '"+val4+"', DEMANDAMAX= '"+val5+"' ";
            }else if(val1 && val2 && val3 && val4 && !val5){
                query += " SET PRIMPARCELA = '"+val1+"', SEGPARCELA = '"+val2+"', PARCELAUNICA= '"+val3+"', DEMANDAMIN= '"+val4+"' ";
            }else if(val1 && val2 && val3 && !val4 && !val5){
                query += " SET PRIMPARCELA = '"+val1+"', SEGPARCELA = '"+val2+"', PARCELAUNICA= '"+val3+"' ";
            }else if(val1 && val2 && !val3 && !val4 && !val5){
                query += " SET PRIMPARCELA = '"+val1+"', SEGPARCELA = '"+val2+"' ";
            }else if(val1 && !val2 && !val3 && !val4 && !val5){
                query += " SET PRIMPARCELA = '"+val1+"' ";
            }else if(!val1 && val2 && !val3 && !val4 && !val5){
                query += " SET SEGPARCELA = '"+val2+"' ";
            }else if(!val1 && !val2 && val3 && !val4 && !val5){
                query += " SET PARCELAUNICA= '"+val3+"'";
            }else if(!val1 && !val2 && !val3 && val4 && !val5){
                query += " SET DEMANDAMIN= '"+val4+"' ";
            }else if(!val1 && !val2 && !val3 && !val4 && val5){
                query += " SET DEMANDAMAX= '"+val5+"' ";
            }
            
        }else{

            if(val1 && val2 && val3 && val4 && val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA, DEMANDAMIN, DEMANDAMAX)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"', '"+val4+"', '"+val5+"')";
            }else if(val1 && val2 && val3 && val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA, DEMANDAMIN)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"', '"+val4+"')";
            }else if(val1 && val2 && val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"')";
            }else if(val1 && val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA)";
                query += " VALUES ('"+val1+"', '"+val2+"')";
            }else if(val1 && !val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA)";
                query += " VALUES ('"+val1+"')";
            }else if(!val1 && val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (SEGPARCELA)";
                query += " VALUES ('"+val2+"')";
            }else if(!val1 && !val2 && val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PARCELAUNICA)";
                query += " VALUES ('"+val3+"')";
            }else if(!val1 && !val2 && !val3 && val4 && !val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (DEMANDAMIN)";
                query += " VALUES ('"+val4+"')";
            }else if(!val1 && !val2 && !val3 && !val4 && val5){
                query  = "INSERT INTO FLUIG_DEV.DBO.FLUIG_PARAMETROS_PERCENTUAIS (DEMANDAMAX)";
                query += " VALUES ('"+val5+"')";
            }
        }

      }
    });

    var data2 = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
            "_field" : "SQL", //name of the field used in the constraint 
            "_initialValue": query, //value to be filtered 
            "_finalValue" : query, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }


    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data2),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data){

        $("#slImoParametersEmail, #cpImoParametersEmail").val('').trigger('change');
        
        FLUIGC.message.alert({
            message: 'Os parametros de percentuais foram atualizados com sucesso.',
            title: 'Obrigado',
            label: 'OK'
        });
      }
    });
}


function numeroParaMoeda(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function loader(zIndex){
    $("#loader").css('z-index', zIndex);
}

function tablesToExcel(table, name, filename){

    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40" charset="UTF-8" xml:lang="pt-BR"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>';
    var templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';
    var body = '<body>';
    var tablevar = '<table>{table';
    var tablevarend = '}</table>';
    var bodyend = '</body></html>';
    var worksheet = '<x:ExcelWorksheet><x:Name>';
    var worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>';
    var worksheetvar = '{worksheet';
    var worksheetvarend = '}';
    var base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) };
    var format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    var wstemplate = '';
    var tabletemplate = '';
    
    var tables = table;

    for (var i = 0; i < tables.length; ++i) {
        wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
        tabletemplate += tablevar + i + tablevarend;
    }

    var allTemplate  = template + wstemplate + templateend;
    var allWorksheet = body + tabletemplate + bodyend;
    var allOfIt      = allTemplate + allWorksheet;

    var ctx = {};
    for (var j = 0; j < tables.length; ++j) {
        ctx['worksheet' + j] = name[j];
    }

    for (var k = 0; k < tables.length; ++k) {
        var exceltable;
        if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
        ctx['table' + k] = exceltable.innerHTML;
    }

    return window.location.href = uri + base64(format(allOfIt, ctx));
}

function updateTableConsolidated(obj, type){

    var id, qry, query;
    var arrID = [], arrDtIni = [], arrDtFim = [];

    if(type == "bruto"){
        query = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_BRUTO";
    }else if(type == "parc1"){
        query = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PPARC";
    }else if(type == "parc2"){
        query = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_SPARC";
    }else if(type == "parcU"){
        query = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCU";
    }else if(type == "dist"){
        query = "SELECT * FROM FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCD";
    }

    var data = { 
      "name" : "ds_buscaDB", //dataset's id 
      "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
            "_field" : "SQL", //name of the field used in the constraint 
            "_initialValue": query, //value to be filtered 
            "_finalValue" : query, //final value to be filtered 
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }

    $.ajax({
      method : "POST",
      url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
      data : JSON.stringify(data),
      contentType : "application/json",
      async : false,
      error : function(x, e) {
        console.log("Erro Ajax Monta select");
        console.log(x);
        console.log(e);
      },
      success : function(data){

        if(type == "bruto"){

            for(i=0; i<data.content.values.length; i++){
                arrID.push(data.content.values[i].ID);
                arrDtIni.push(data.content.values[i].PeriodoIni);
                arrDtFim.push(data.content.values[i].PeriodoFin);
            }

            if(arrID>0){
                arrID.reverse();
                id = parseInt(arrID[0]) + 1;
            }else{
                id = 1;
            }

            if((arrDtIni.length == 0 && arrDtFim.length == 0) || (arrDtIni.indexOf(obj.ini) === -1 && arrDtFim.indexOf(obj.fim) === -1)){
                qry  = " INSERT INTO FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_BRUTO  (ID, PeriodoIni, PeriodoFin, Imobiliaria, Empreendimento, ValorBruto, Desconto, Despesas, ValorNF)";
                qry += " VALUES("+id+", '"+obj.ini+"', '"+obj.fim+"', '"+obj.imo+"', '"+obj.emp+"', '"+obj.vbrt+"', null, '"+obj.desp+"', '"+obj.vnf+"')";

            }else{
                qry  = " UPDATE FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_BRUTO";
                qry += " SET PeriodoIni = '"+obj.ini+"', PeriodoFin = '"+obj.fim+"', Imobiliaria = '"+obj.imo+"', Empreendimento = '"+obj.emp+"', ValorBruto = '"+obj.vbrt+"', Desconto = '"+obj.desc+"', Despesas = '"+obj.desp+"', ValorNF = '"+obj.vnf+"'";
                qry += " WHERE ID= '"+arrID[0]+"'";
            }

            var dt = { 
              "name" : "ds_buscaDB", //dataset's id 
              "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
                    "_field" : "SQL", //name of the field used in the constraint 
                    "_initialValue": qry, //value to be filtered 
                    "_finalValue" : qry, //final value to be filtered 
                    "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                    "_likeSearch": false
                }]
            }

            $.ajax({
              method : "POST",
              url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
              data : JSON.stringify(dt),
              contentType : "application/json",
              async : false,
              error : function(x, e) {
                console.log("Erro Ajax Monta select");
                console.log(x);
                console.log(e);
              },
              success : function(data){
                console.log(data)
              }
            });
        } // fim if type == bruto
        else if(type == "parc1"){

            if(data.content.values.length > 0){
                for(i=0; i<data.content.values.length; i++){
                    arrID.push(data.content.values[i].ID);
                    console.log('ID', data.content.values[i].ID);
                    console.log('DataVenda', data.content.values[i].DataVenda);
                    console.log('NumVenda', data.content.values[i].NumVenda);    
                }
            }
            

            for(i=0; i<Object.keys(obj["Bl"]).length; i++){

                if(!obj.ID)                obj.ID                = null
                if(!obj.DtVenda[i])        obj.DtVenda[i]        = null
                if(!obj.NuVenda[i])        obj.NuVenda[i]        = null
                if(!obj.Emp[i])            obj.Emp[i]            = null
                if(!obj.Bl[i])             obj.Bl[i]             = null
                if(!obj.Uni[i])            obj.Uni[i]            = null
                if(!obj.NmCliente[i])      obj.NmCliente[i]      = null
                if(!obj.NmImob[i])         obj.NmImob[i]         = null
                if(!obj.NmCorretor[i])     obj.NmCorretor[i]     = null
                if(!obj.TpVenda[i])        obj.TpVenda[i]        = null
                if(!obj.VlBase[i])         obj.VlBase[i]         = null
                if(!obj.VlPriParcCom[i])   obj.VlPriParcCom[i]   = null
                if(!obj.VlParcBoni[i])     obj.VlParcBoni[i]     = null
                if(!obj.TotComissao[i])    obj.TotComissao[i]    = null
                if(!obj.TotBonificacao[i]) obj.TotBonificacao[i] = null


                if(arrID.indexOf(obj.ID) === -1 || data.content.values.length == 0){
                    qry  = " INSERT INTO FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PPARC  (ID, DataVenda, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorPriParcCom, ValorParcBoni, TotalComissao, TotalBonificacao)";
                    qry += " VALUES("+obj.ID+", '"+obj.DtVenda[i]+"', '"+obj.NuVenda[i]+"', '"+obj.Emp[i]+"', '"+obj.Bl[i]+"', '"+obj.Uni[i]+"', '"+obj.NmCliente[i]+"', '"+obj.NmImob[i]+"', '"+obj.NmCorretor[i]+"', '"+obj.TpVenda[i]+"', '"+obj.VlBase[i]+"', '"+obj.VlPriParcCom[i]+"', '"+obj.VlParcBoni[i]+"', '"+obj.TotComissao[i]+"', '"+obj.TotBonificacao[i]+"')";
                }else{
                    qry  = " UPDATE FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PPARC";
                    qry += " SET PeriodoIni = '"+obj.ini[i]+"', PeriodoFin = '"+obj.fim[i]+"', Imobiliaria = '"+obj.imo[i]+"', Empreendimento = '"+obj.emp[i]+"', ValorBruto = '"+obj.vbrt[i]+"', Desconto = '"+obj.desc[i]+"', Despesas = '"+obj.desp[i]+"', ValorNF = '"+obj.vnf[i]+"'";
                    qry += " WHERE ID= '"+obj.ID+"'";
                }

                var dt = { 
                  "name" : "ds_buscaDB", //dataset's id 
                  "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
                        "_field" : "SQL", //name of the field used in the constraint 
                        "_initialValue": qry, //value to be filtered 
                        "_finalValue" : qry, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }]
                }

                $.ajax({
                  method : "POST",
                  url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
                  data : JSON.stringify(dt),
                  contentType : "application/json",
                  async : false,
                  error : function(x, e) {
                    console.log("Erro Ajax Monta select");
                    console.log(x);
                    console.log(e);
                  },
                  success : function(data){}
                });
            }

        }
        else if(type == "parc2"){
            for(i=0; i<data.content.values.length; i++){
                arrID.push(data.content.values[i].ID);

                if(!obj.DataVenda[i])       obj.DataVenda[i]       = null;
                if(!obj.DtVendaAg[i])       obj.DtVendaAg[i]       = null;
                if(!obj.NumVenda[i])        obj.NumVenda[i]        = null;
                if(!obj.Empreendimento[i])  obj.Empreendimento[i]  = null;
                if(!obj.Bloco[i])           obj.Bloco[i]           = null;
                if(!obj.Unidade[i])         obj.Unidade[i]         = null;
                if(!obj.NomeCliente[i])     obj.NomeCliente[i]     = null;
                if(!obj.Imobiliaria[i])     obj.Imobiliaria[i]     = null;
                if(!obj.NomeCorretor[i])    obj.NomeCorretor[i]    = null;
                if(!obj.TipoVenda[i])       obj.TipoVenda[i]       = null;
                if(!obj.ValorBase[i])       obj.ValorBase[i]       = null;
                if(!obj.ValorPriParcCom[i]) obj.ValorPriParcCom[i] = null;
                if(!obj.DemandaMin[i])      obj.DemandaMin[i]      = null;
                if(!obj.DemandaMax[i])      obj.DemandaMax[i]      = null;
                if(!obj.ValorParcBoni[i])   obj.ValorParcBoni[i]   = null;
            
                if(arrID.indexOf(obj.ID) === -1){
                    qry  = " INSERT INTO FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_SPARC  (ID, DataVenda, DataAgregacao, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorSegParcCom, ValorParcDemMin, ValorParcDemMax, ValorParcBoni)";
                    qry += " VALUES("+obj.ID+", '"+obj.DataVenda[i]+"', '"+obj.DtVendaAg[i]+"', '"+obj.NumVenda[i]+"', '"+obj.Empreendimento[i]+"', '"+obj.Bloco[i]+"', '"+obj.Unidade[i]+"', '"+obj.NomeCliente[i]+"', '"+obj.Imobiliaria[i]+"', '"+obj.NomeCorretor[i]+"', '"+obj.TipoVenda[i]+"', '"+obj.ValorBase[i]+"', '"+obj.ValorPriParcCom[i]+"', '"+obj.DemandaMin[i]+"', '"+obj.DemandaMax[i]+"', '"+obj.ValorParcBoni[i]+"')";
                }else{
                    qry  = " UPDATE FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_SPARC";
                    qry += " SET DataVenda = '"+obj.DataVenda[i]+"', DataAgregacao = '"+obj.DtVendaAg[i]+"', NumVenda = '"+obj.NumVenda[i]+"', Empreendimento = '"+obj.Empreendimento[i]+"', Bloco = '"+obj.Bloco[i]+"', Unidade = '"+obj.Unidade[i]+"', NomeCliente = '"+obj.NomeCliente[i]+"', NomeImobiliaria = '"+obj.Imobiliaria[i]+"', NomeCorretor = '"+obj.NomeCorretor[i]+"', TipoVenda = '"+obj.TipoVenda[i]+"', ValorBase = '"+obj.ValorBase[i]+"', ValorSegParcCom = '"+obj.ValorPriParcCom[i]+"', ValorParcDemMin = '"+obj.DemandaMin[i]+"', ValorParcDemMax = '"+obj.DemandaMax[i]+"', ValorParcBoni = '"+obj.ValorParcBoni[i]+"'"; 
                    qry += " WHERE ID= '"+obj.ID+"'";
                }

                console.log("query", qry);

                var dt = { 
                  "name" : "ds_buscaDB", //dataset's id 
                  "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
                        "_field" : "SQL", //name of the field used in the constraint 
                        "_initialValue": qry, //value to be filtered 
                        "_finalValue" : qry, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }]
                }

                $.ajax({
                  method : "POST",
                  url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
                  data : JSON.stringify(dt),
                  contentType : "application/json",
                  async : false,
                  error : function(x, e) {
                    console.log("Erro Ajax Monta select");
                    console.log(x);
                    console.log(e);
                  },
                  success : function(data){ 
                    console.log(data);
                  }
                });


            }

        }
        else if(type == "parcU"){
            for(i=0; i<data.content.values.length; i++){
                arrID.push(data.content.values[i].ID);
            
                if(arrID.indexOf(obj.ID) === -1){
                    qry  = " INSERT INTO FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCU  (ID, DataVenda, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorPriParcCom, ValorParcBoni, TotalComissao, TotalBonificacao)";
                    qry += " VALUES('"+obj[i].ID+"', '"+obj[i].NmImob+"', '"+obj[i].DtVenda+"', '"+obj[i].NuVenda+"', '"+obj[i].Emp+"', '"+obj[i].Bl+"', '"+obj[i].Uni+"', '"+obj[i].NmCliente+"', '"+obj[i].NmCorretor+"', '"+obj[i].TpVenda+"', '"+obj[i].VlBase+"', '"+obj[i].VlPriParcCom+"', '"+obj[i].VlParcBoni+"', '"+obj[i].TotComissao+"', '"+obj[i].TotBonificacao+"')";
                }else{
                    qry  = " UPDATE FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCU";
                    qry += " SET PeriodoIni = '"+obj.ini+"', PeriodoFin = '"+obj.fim+"', Imobiliaria = '"+obj.imo+"', Empreendimento = '"+obj.emp+"', ValorBruto = '"+obj.vbrt+"', Desconto = '"+obj.desc+"', Despesas = '"+obj.desp+"', ValorNF = '"+obj.vnf+"'";
                    qry += " WHERE ID= '"+obj.ID+"'";
                }


                var dt = { 
                  "name" : "ds_buscaDB", //dataset's id 
                  "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
                        "_field" : "SQL", //name of the field used in the constraint 
                        "_initialValue": qry, //value to be filtered 
                        "_finalValue" : qry, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }]
                }

                $.ajax({
                  method : "POST",
                  url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
                  data : JSON.stringify(dt),
                  contentType : "application/json",
                  async : false,
                  error : function(x, e) {
                    console.log("Erro Ajax Monta select");
                    console.log(x);
                    console.log(e);
                  },
                  success : function(data){ 
                    console.log("Success"); 
                  }
                });


            }

        }
        else if(type == "dist"){
            for(i=0; i<data.content.values.length; i++){
                arrID.push(data.content.values[i].ID);
            
                if(arrID.indexOf(obj.ID) === -1){
                    qry  = " INSERT INTO FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCD  (ID, DataVenda, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorPriParcCom, ValorParcBoni, TotalComissao, TotalBonificacao)";
                    qry += " VALUES('"+obj[i].ID+"', '"+obj[i].NmImob+"', '"+obj[i].DtVenda+"', '"+obj[i].NuVenda+"', '"+obj[i].Emp+"', '"+obj[i].Bl+"', '"+obj[i].Uni+"', '"+obj[i].NmCliente+"', '"+obj[i].NmCorretor+"', '"+obj[i].TpVenda+"', '"+obj[i].VlBase+"', '"+obj[i].VlPriParcCom+"', '"+obj[i].VlParcBoni+"', '"+obj[i].TotComissao+"', '"+obj[i].TotBonificacao+"')";
                }else{
                    qry  = " UPDATE FLUIG_DEV.DBO.FLUIG_CONSOLIDADOS_PARCD";
                    qry += " SET PeriodoIni = '"+obj.ini+"', PeriodoFin = '"+obj.fim+"', Imobiliaria = '"+obj.imo+"', Empreendimento = '"+obj.emp+"', ValorBruto = '"+obj.vbrt+"', Desconto = '"+obj.desc+"', Despesas = '"+obj.desp+"', ValorNF = '"+obj.vnf+"'";
                    qry += " WHERE ID= '"+obj.ID+"'";
                }


                var dt = { 
                  "name" : "ds_buscaDB", //dataset's id 
                  "constraints" :[{ //constraints to filter the search, all fields specified inside are required 
                        "_field" : "SQL", //name of the field used in the constraint 
                        "_initialValue": qry, //value to be filtered 
                        "_finalValue" : qry, //final value to be filtered 
                        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                        "_likeSearch": false
                    }]
                }

                $.ajax({
                  method : "POST",
                  url: "http://fluig.brz.eng.br/api/public/ecm/dataset/datasets",
                  data : JSON.stringify(dt),
                  contentType : "application/json",
                  async : false,
                  error : function(x, e) {
                    console.log("Erro Ajax Monta select");
                    console.log(x);
                    console.log(e);
                  },
                  success : function(data){ 
                    console.log("Success"); 
                  }
                });


            }

        }


      }
    });
    return id;
}

function processAlert(){
    return '<span class="text-danger">Processando</span> <i class="fa fa-cog fa-spin fa-fw margin-bottom"></i>';
}






