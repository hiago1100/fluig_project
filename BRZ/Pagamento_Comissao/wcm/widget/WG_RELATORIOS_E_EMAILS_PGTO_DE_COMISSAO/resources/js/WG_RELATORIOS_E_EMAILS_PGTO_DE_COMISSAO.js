var rest_solicitacoes = [];
var num_venda_aux ;
var brz_panel = SuperWidget.extend({
    init: function() {
        startPanel();
        returnNextSinc();
        returnNextMovto();
        logSincronizacao();
        logMovto();
      

    },
    bindings: {
        local: {
            'Bonification'       : ['click_executeBonification'],          // Executa a tabela de premiação
            'sendDbAwards'       : ['click_updateFormAwards'],             // Aplica o prêmio nos formulários selecionados
            'DemandMin'          : ['click_executeDemandaMin'],            // Executa a tabela de demanda mínima
            'sendDbDemandMin'    : ['click_updateFormMin'],                // Aplica o demanda mínima nos formulários selecionados
            'DemandMax'          : ['click_executeDemandaMax'],            // Executa a tabela de demanda máxima
            'sendDbDemandMax'    : ['click_updateFormMax'],                // Aplica o demanda máxima nos formulários selecionados
            'Reports'            : ['click_executeReports'],               // cria o consolidado de envio de relatorios para imobiliaria
            'tabReports'         : ['click_tabReports'],                   // Executa o init na aba de envio de relatorios para imobiliaria
            'sendDbReports'      : ['click_sendDbReports'],                // Envia email para imobiliaria e faz o update na tabela de consolidados
            'NFS'                : ['click_executeNFS'],                   // Executa a tabela para anexar NFs
            'tabNFS'             : ['click_tabNFS'],                       // executa o init na aba de anexar NFs
            'sendDbNFS'          : ['click_sendDbNFS'],                    // Envia o numero das NFs nos formulários
            'tabCube'            : ['click_tabCube'],                      // Executa o init na aba do relatório de vendas
            'Cube'               : ['click_executeCube'],                  // Executa a tabela de relatorios de vendas
            'tabComissionBRZ'    : ['click_tabComissionBRZ'],              // Executa a init para permite comissão de corretor online
            'ComissionBRZ'       : ['click_executeComissionBRZ'],          // Executa a tabela para permite comissão de corretor online
            'sendDbComissionBRZ' : ['click_updateFormsendDbComissionBRZ'], // Aplica permição de comissão de corretor online no formulário
            'ExportExcel'        : ['click_ExportExcel'],                  // Exporta a tabela de de comissão BRZ em Excel
            'tabSuper'           : ['click_tabSuper'],                     // Executa a init para permitir comissão de supervisor
            'Super'              : ['click_executeSuper'],                 // Executa a tabela para permitir comissão de corretor online
            'exportExcelSuper'   : ['click_exportExcelSuper'],             // Exporta a tabela de de comissão BRZ em Excel
            'tabParameters'      : ['click_tabParameters'],                // Executa a init para aplicar percentual de comissão de vendas
            'Parameters'         : ['click_executeParameters'],            // Grava o percentual de comissão de vendas
            'tabParametersEmail' : ['click_tabParametersEmail'],           // Executa a init para cadastro de email
            'ParametersEmail'    : ['click_executeParametersEmail'],       // Grava troca percentual de comissão de vendas
        },
        global: {}
    },

    // Executa a tabela de premiação
    executeBonification: function() {
        
        loader("100");

        setTimeout(function(){
            $("#Awards_filter > *, #Awards_table > *, #Awards_pag > *").remove();

            $("#selectAllConsolided").prop("checked", false);

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
    },// Aplica o prêmio nos formulários selecionados
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

            var EmprReports = $("#slEmprReports").val();
            var ImoReports = $("#slImoReports").val();

            var imo = getImobEmpConsolidated("imobiliaria");
            var emp = getImobEmpConsolidated("empreendimento");

            if (dataInicio && dataFim ) {
                if(EmprReports && !ImoReports) {
                    for(i = 0; i < emp.length; i++){
                        getConsolidated(dataInicio, dataFim, EmprReports, imo[i], i);
                    }
                }else if(!EmprReports && ImoReports) {
                    for(i = 0; i < imo.length; i++){
                        getConsolidated(dataInicio, dataFim, emp[i], ImoReports, i);
                    }
                } else if(EmprReports && ImoReports){
                    getConsolidated(dataInicio, dataFim, EmprReports, ImoReports, 0);
                }else{
                    
                    var obj = new Object();
                    var y = 0;
                    for(i=0;i<imo.length; i++){
                        for(x=0; x<emp.length; x++){
                            obj[y] = {
                                "imobiliaria": imo[i],
                                "empreendimento": emp[x],
                            }
                            y++;
                        }
                    }

                    for(i = 0; i < Object.keys(obj).length; i++){
                        getConsolidated(dataInicio, dataFim, obj[i].empreendimento, obj[i].imobiliaria, i);
                    }
                }
            } else {
                alert("Favor preencher o período para filtrar.");
            }

            var c = 0;
            $("#Reports_table .panel.panel-default").each(function(){
                var tableBruto = $("#tableBruto_"+c+" tbody tr").length;
                var table1Parc = $("#table1Parc_"+c+" tbody tr").length;
                var table2Parc = $("#table2Parc_"+c+" tbody tr").length;
                var tableParcU = $("#tableParcU_"+c+" tbody tr").length;
                var tableDist  = $("#tableDist_"+c+"  tbody tr").length;

                if(tableBruto == 0 && table1Parc == 0 && table2Parc == 0 && tableParcU == 0 && tableDist == 0){
                    $(this).remove();
                }
                c++;
            });
            loader("-1");
        },4000);
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
    },// Envia email para imobiliaria e faz o update na tabela de consolidados
    sendDbReports: function(){

        loader("100");
        setTimeout(function(){

            var status = false;
            var id, num;
            var y = 0;
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

                    var inicio = ini.split("/").reverse();
                        inicio = inicio[0]+"-"+inicio[1]+"-"+inicio[2];

                    var final  = fim.split("/").reverse();
                        final  = final[0]+"-"+final[1]+"-"+final[2];

                    var doc = $("#cpDocumentID_"+id[0]).val();
                    // table Valor Bruto
                    var obj1 = {
                        "ini" : inicio,
                        "fim" : final,
                        "emp" : emp,
                        "imo" : imo,
                        "vbrt": vbrt,
                        "desc": desc,
                        "desp": desp,
                        "vnf" : vnf,
                        "did" : doc,
                    }

                    num = updateTableConsolidated(obj1, "bruto");

                    var DataVenda = [], NumVenda = [], Empreendimento = [], Imobiliaria = [], Bloco = [], Unidade = [], NomeCliente = [], NomeCorretor = [], TipoVenda = [], ValorBase = [], ValorPriParcCom = [], ValorParcBoni = [], TotalComissao = [], TotalBonificacao = [];
                    var val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12;

                    var P2_DataVenda = [], P2_DtVendaAg = [], P2_NumVenda = [], P2_Empreendimento = [], P2_Bloco = [], P2_Unidade = [], P2_NomeCliente = [], P2_Imobiliaria = [], P2_NomeCorretor = [], P2_TipoVenda = [], P2_ValorBase = [], P2_ValorPriParcCom = [], P2_DemandaMin = [], P2_DemandaMax = [], P2_ValorParcBoni = [];
                    var val21, val22, val23, val24, val25, val26, val27, val28, val29, val210, val211, val212, val213, val214, val215;

                    var PU_DataVenda = [], PU_DtVendaAg = [], PU_NumVenda = [], PU_Empreendimento = [], PU_Bloco = [], PU_Unidade = [], PU_NomeCliente = [], PU_Imobiliaria = [], PU_NomeCorretor = [], PU_TipoVenda = [], PU_ValorBase = [], PU_ValorPriParcCom = [], PU_DemandaMin = [], PU_DemandaMax = [], PU_ValorParcBoni = [];
                    var val31, val32, val33, val34, val35, val36, val37, val38, val39, val310, val311, val312, val313, val314, val315;

                    var D_DataVenda = [], D_NumVenda = [], D_Empreendimento = [], D_Bloco = [], D_Unidade = [], D_NomeCliente = [], D_Imobiliaria = [], D_NomeCorretor = [], D_TipoVenda = [], D_NF = [], D_ValorDist = [];
                    var val41, val42, val43, val44, val45, val46, val47, val48, val49, val410, val411;
                    
                    var m = $("#table1Parc_"+id[0]+" tbody tr:not(.total)").length;
                    if(m > 0){
                        $("#table1Parc_"+id[0]+" tbody tr:not(.total)").each(function(){
                            var el = $(this);
                            
                            val1  = el.find("td[name='p1Data']").text().split("/");
                            val1 = val1[2]+"-"+val1[1]+"-"+val1[0];

                            val2  = el.find("td[name='p1NuV']").text();
                            val11 = el.find("td[name='p1Emp']").text();
                            val3  = el.find("td[name='p1Blc']").text();
                            val4  = el.find("td[name='p1Uni']").text();
                            val5  = el.find("td[name='p1Cli']").text();
                            val12 = el.find("td[name='p1Imo']").text();
                            val6  = el.find("td[name='p1Cor']").text();
                            val7  = el.find("td[name='p1TVd']").text();
                            val8  = el.find("td[name='p1Bas']").text();
                            val9  = el.find("td[name='p1Par']").text();
                            val10 = el.find("td[name='p1Bon']").text();

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

                        var TotalComissao = $("#table1Parc_"+id[0]+" tbody tr.total td:nth-child(2)").text();
                        var TotalBonificacao = $("#table1Parc_"+id[0]+" tbody tr.total td:last-child").text();

                        // table Primeira Parcela
                        var obj2 = {
                                "ID": num[0],
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

                        updateTableConsolidated(obj2, "parc1", num[1]);
                    }

                    var l = $("#table2Parc_"+id[0]+" tbody tr:not(.total)").length;
                    if(l>0){
                        $("#table2Parc_"+id[0]+" tbody tr:not(.total)").each(function(){
                            var el = $(this);
                            
                            val21  = el.find("td[name='p2Data']").text().split("/");
                            val21 = val21[2]+"-"+val21[1]+"-"+val21[0];

                            val22  = el.find("td[name='p2DtAg']").text().split("/");
                            val22 = val22[2]+"-"+val22[1]+"-"+val22[0];

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
                            P2_DtVendaAg.push(val22);
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

                        var TotalComissao = $("#table2Parc_"+id[0]+" tbody tr.total td:nth-child(2)").text();
                        var TotalParcDemMin = $("#table2Parc_"+id[0]+" tbody tr.total td:nth-child(3)").text();
                        var TotalParcDemMax = $("#table2Parc_"+id[0]+" tbody tr.total td:nth-child(4)").text();
                        var TotalBonificacao = $("#table2Parc_"+id[0]+" tbody tr.total td:last-child").text();

                        var obj3 = {
                                "ID": num[0],
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
                                "ValorSegParcCom": P2_ValorPriParcCom,
                                "DemandaMin": P2_DemandaMin,
                                "DemandaMax": P2_DemandaMax,
                                "ValorParcBoni": P2_ValorParcBoni,
                                "TotalComissao": TotalComissao,
                                "TotalParcDemMin": TotalParcDemMin,
                                "TotalParcDemMax": TotalParcDemMax,
                                "TotalBonificacao": TotalBonificacao,
                            }

                        updateTableConsolidated(obj3, "parc2", num[1]);
                    }

                    var j = $("#tableParcU_"+id[0]+" tbody tr:not(.total)").length;
                    if(j>0){
                        $("#tableParcU_"+id[0]+" tbody tr:not(.total)").each(function(i){
                            var el = $(this);
                            
                            val31  = el.find("td[name='pUniData']").text().split("/");
                            val31 = val31[2]+"-"+val31[1]+"-"+val31[0];

                            val32  = el.find("td[name='pUniDtAg']").text().split("/");
                            val32 = val32[2]+"-"+val32[1]+"-"+val32[0];

                            val33  = el.find("td[name='pUniNuV']").text();
                            val34  = el.find("td[name='pUniEmp']").text();
                            val35  = el.find("td[name='pUniBlc']").text();
                            val36  = el.find("td[name='pUniUni']").text();
                            val37  = el.find("td[name='pUniCli']").text();
                            val38  = el.find("td[name='pUniImo']").text();
                            val39  = el.find("td[name='pUniCor']").text();
                            val310 = el.find("td[name='pUniTVen']").text();
                            val311 = el.find("td[name='pUniBas']").text(); 
                            val312 = el.find("td[name='pUniPar']").text();
                            val313 = el.find("td[name='pUniDmn']").text();
                            val314 = el.find("td[name='pUniDmx']").text(); 
                            val315 = el.find("td[name='pUniBon']").text();

                            PU_DataVenda.push(val31);
                            PU_DtVendaAg.push(val32);
                            PU_NumVenda.push(val33);
                            PU_Empreendimento.push(val34);
                            PU_Bloco.push(val35);
                            PU_Unidade.push(val36);
                            PU_NomeCliente.push(val37);
                            PU_Imobiliaria.push(val38);
                            PU_NomeCorretor.push(val39);
                            PU_TipoVenda.push(val310);
                            PU_ValorBase.push(val311);
                            PU_ValorPriParcCom.push(val312);
                            PU_DemandaMin.push(val313);
                            PU_DemandaMax.push(val314);
                            PU_ValorParcBoni.push(val315);
                        });

                        var TotalComissao = $("#tableParcU_"+id[0]+" tbody tr.total td:nth-child(2)").text();
                        var TotalParcDemMin = $("#tableParcU_"+id[0]+" tbody tr.total td:nth-child(3)").text();
                        var TotalParcDemMax = $("#tableParcU_"+id[0]+" tbody tr.total td:nth-child(4)").text();
                        var TotalBonificacao = $("#tableParcU_"+id[0]+" tbody tr.total td:last-child").text();

                        var obj4 = {
                                "ID": num[0],
                                "DataVenda": PU_DataVenda,
                                "DtVendaAg": PU_DtVendaAg,
                                "NumVenda": PU_NumVenda,
                                "Empreendimento": PU_Empreendimento,
                                "Bloco": PU_Bloco,
                                "Unidade": PU_Unidade,
                                "NomeCliente": PU_NomeCliente,
                                "Imobiliaria": PU_Imobiliaria,
                                "NomeCorretor": PU_NomeCorretor,
                                "TipoVenda": PU_TipoVenda,
                                "ValorBase": PU_ValorBase,
                                "ValorPriParcCom": PU_ValorPriParcCom,
                                "DemandaMin": PU_DemandaMin,
                                "DemandaMax": PU_DemandaMax,
                                "ValorParcBoni": PU_ValorParcBoni,
                                "TotalComissao": TotalComissao,
                                "TotalParcDemMin": TotalParcDemMin,
                                "TotalParcDemMax": TotalParcDemMax,
                                "TotalBonificacao": TotalBonificacao,
                            }

                        updateTableConsolidated(obj4, "parcU", num[1]);
                    }


                    var k = $("#tableDist_"+id[0]+" tbody tr:not(.total)").length;
                    if(k > 0){
                        $("#tableDist_"+id[0]+" tbody tr:not(.total)").each(function(){

                            var el = $(this);
                            
                            val41  = el.find("td[name='DistData']").text().split("/");
                            val41 = val41[2]+"-"+val41[1]+"-"+val41[0];

                            val42  = el.find("td[name='DistNuV']").text();
                            val43  = el.find("td[name='DistEmp']").text();
                            val44  = el.find("td[name='DistBlc']").text();
                            val45  = el.find("td[name='DistUni']").text();
                            val46  = el.find("td[name='DistCli']").text();
                            val47  = el.find("td[name='DistImo']").text();
                            val48  = el.find("td[name='DistCor']").text();
                            val49  = el.find("td[name='DistTVen']").text();
                            val410 = el.find("td[name='DistNF']").text();
                            val411 = el.find("td[name='DistTotal']").text();

                            D_DataVenda.push(val41);
                            D_NumVenda.push(val42);
                            D_Empreendimento.push(val43);
                            D_Bloco.push(val44);
                            D_Unidade.push(val45);
                            D_NomeCliente.push(val46);
                            D_Imobiliaria.push(val47);
                            D_NomeCorretor.push(val48);
                            D_TipoVenda.push(val49);
                            D_NF.push(val410);
                            D_ValorDist.push(val411);
                        });

                        var TotalDistrato = $("#tableDist_"+id[0]+" tbody tr.total td:last-child").text();
                        var obj5 = {
                                "ID": num[0],
                                "DataVenda": D_DataVenda,
                                "NumVenda": D_NumVenda,
                                "Empreendimento": D_Empreendimento,
                                "Bloco": D_Bloco,
                                "Unidade": D_Unidade,
                                "NomeCliente": D_NomeCliente,
                                "NomeImobiliaria": D_Imobiliaria,
                                "NomeCorretor": D_NomeCorretor,
                                "TipoVenda": D_TipoVenda,
                                "NotaFiscal": D_NF,
                                "ValorDistrato": D_ValorDist,
                                "TotalDistrato": TotalDistrato,
                            }

                        updateTableConsolidated(obj5, "dist", num[1]);
                    }

                    // saldo devedor de distrato
                    var saldoDistrato = $("#cpDistratoSaldo_"+id[0]).val();
                    var obj6 = {
                        "NomeImobiliaria": imo,
                        "Empreendimento": emp,
                        "saldoDistrato": saldoDistrato
                    }
                    updateTableConsolidated(obj6, "dist_saldo", '');

                    var obs = $("#cpObs_"+id).val();
                    var txt;
                    if(obs) txt = "<br><span><strong style='font-size:1.5em; white-space:nowrap;'>Observações</strong><br>"+obs+"</span><hr>";

                    var html  = $("#msg_"+id).html();
                        html += "<table>";
                        html += $("#tableBruto_"+id).html();
                        html += "</table>";
                        html += $("#saldoDistrato_"+id).html() || "";
                        html += txt ? txt : '';
                        html += $("#tbl1Name_"+id).html()   || "";
                        html += "<table>";
                        html += $("#table1Parc_"+id).html() || "";
                        html += "</table>";
                        html += $("#tbl2Name_"+id).html()   || "";
                        html += "<table>";
                        html += $("#table2Parc_"+id).html() || "";
                        html += "</table>";
                        html += $("#tbl3Name_"+id).html()   || "";
                        html += "<table>";
                        html += $("#tableParcU_"+id).html() || "";
                        html += "</table>";
                        html += $("#tbl4Name_"+id).html()   || "";
                        html += "<table>";
                        html += $("#tableDist_"+id).html()  || "";
                        html += "</table>";

                    var email =  consultDB(imo, "emailreturn");

                    if(email && email != null && email != "null"){
                        sendEmail(ini, fim, emp, imo, email, html);    
                    }else{
                        FLUIGC.message.alert({
                            message: 'Imobiliária não tem email cadastrado. Favor cadastrar email na "CONFIGURAÇÕES" e tentar novamente.',
                            title: 'Erro',
                            label: 'OK'
                        });
                    }

                    status = true;
                }
                y++;
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

            var periodo = $("#dtConsolidados").val();

            if(periodo){
                periodo = periodo.split("/");
                var inicio  = periodo[0];
                var fim     = periodo[1];

                executeDBSearchNFS(inicio, fim);
            } else{
                alert("Favor escolher o período para filtrar.");
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
        getEmprendimentosConsolidados('dtConsolidados', 'periodo');
        $("#dtConsolidados").select2();
    },// Envia o numero das nfs nos formulários
    sendDbNFS : function(){

        loader("100");
        setTimeout(function(){

            var status;
            $("#tableNFS tbody tr:not(.hide)").each(function() {
                var elm = $(this);
                var id  = elm.find("input[id^='cpNF_']").attr("id").split("_").reverse();
                var inp = $("#cpNF_"+id[0]).val();

                if ($("#select_row_"+id[0]+":not(:disabled)").is(":checked") && inp) {
                    var documentID = $("#documentId_"+id[0]).val();
                    var dbID = $("#dbId_"+id[0]).val();

                    if(documentID.indexOf(",") >= 0) documentID = documentID.split(",");

                    if(Array.isArray(documentID)){
                        console.log('documentID.length', documentID.length);
                        for(i=0; i<documentID.length; i++){
                            var type = consultDB(documentID[i], 'consultType');
                            console.log('type', type);
                            console.log('documentID', documentID[i]);
                            if(type != 'Distratada') updateFields(inp, inp, inp, inp, documentID[i], 'NFS', "");
                        }
                    }else{
                        var type = consultDB(documentID, 'consultType');
                        console.log('type', type);
                        if(type != 'Distratada') updateFields(inp, inp, inp, inp, documentID, 'NFS', "");
                    }

                    var obj = {
                        "ID": dbID,
                        "NF": inp,
                    }

                    updateTableConsolidated(obj, 'NFConsolidado', false);
                    
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

                    }else if($("#select_row_"+id[0]).is(":checked") && !inp){
                        
                        $("#cpNF_"+id[0]).css("border", "solid 1px red");
                        FLUIGC.message.alert({
                            message: 'O campo de nota fiscal não pode ser enviado vazio.',
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

    // Executa o init na aba do relatório de vendas
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
        getEmprendimentos("slctEmpreendimento");
        getEmprendimentos("slEmprCube");
        getImobiliarias("slImoCube");

        $("#slEmprCube, #slImoCube,#slctEmpreendimento").select2();
    },// Executa a tabela de relatorios de vendas
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
    },

    // Executa a init para permitir comissão de corretor online
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
    },// Executa a tabela para permitir comissão de corretor online
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
                    $(this).remove();
                });
                $('#tableSuperDist_fake tbody tr.hide').each(function(i) {
                    $(this).remove();
                });

            },1000);
            

            loader('-1');
        },200);
    },// Aplica permição de comissão de corretor online no formulário
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
    },// Exporta a tabela de de comissão BRZ em Excel
    ExportExcel: function(){
        tablesToExcel(['tableComissoesBRZTotal_fake', 'tableComissoesBRZ_fake'], ['first'], 'myfile.xls');
    },

    // Executa a init para permitir comissão de supervisor
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
    },// Executa a tabela para permitir comissão de corretor online
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
    },// Exporta a tabela de de comissão BRZ em Excel
    exportExcelSuper: function(){
        var countDist = $("#tableSuperDist tbody tr td").length;
        if(countDist > 1){
            tablesToExcel(["TableTotalSuper_fake", "tableSuper_fake", "tableSuperDist_fake"], ['first'], 'myfile.xls');
        }else{
           tablesToExcel(["TableTotalSuper_fake", "tableSuper_fake"], ['first'], 'myfile.xls');
        }
    },

    // Executa a init para aplicar percentual de comissão de vendas
    tabParameters: function(){
        $(".percent").mask('#0.00', { reverse: true });
        consultDB("", "param");
        getEmprendimentos2("slctEmpreendimento");
       $("#slctEmpreendimento").select2();
    }, // Grava o percentual de comissão de vendas
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
    },// Executa a init para cadastro de email
    tabParametersEmail: function(){
        getImobiliarias("slImoParametersEmail");
        
        $("#slImoParametersEmail").select2();
        
        FLUIGC.popover('.bs-docs-popover-hover',{trigger: 'hover', placement: 'top'});        

        $("#slImoParametersEmail").change(function(){
            consultDB(this.value, 'email')
        });        
    }, // Grava troca percentual de comissão de vendas
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

        $("#selectAllConsolided").click(function(){
            $("#Reports_table .panel.panel-default").each(function(){
                $(this).find("input[id^='ckConsolidaded_']").click();
            }); 
        });

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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
                    
                    if(data.content.values[i].cpValor2ParcelaComissao &&  (data.content.values[i].cpTipoVendaCod != "500" && data.content.values[i].cpTipoVendaCod != 500)) dtAgregacao = data.content.values[i].cpDate2ParcelaComissao.trim();

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


                    var deMin  = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                    }else if(pDeMin == "true" && deMin){
                        deMin  = fixedTwo(data.content.values[i].cpValorParcelaDemandaMinima);
                    }else{
                        deMin  = "";
                    }

                    var deMax = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;
                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }else if(pDeMax == "true" && deMax){
                        deMax  = fixedTwo(data.content.values[i].cpValorParceladeMandaMaxima);
                    }else{
                        deMax  = "";
                    }

                    var proID = data.content.values[i].cpProcessID || "";
                    var docID = data.content.values[i].documentid || "";
                    var documentid = "<input type='text' id='Aw_documentid_"+x+"'   class='form-control hide' value='"+docID+"'>";
                    var cpProcessID = "<input type='text' id='Aw_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var val1 = "", val2 = "", val3 = "";
                    var valBon = fixedTwo(data.content.values[i].cpValor1ParcelaComissao);
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
                            dtAgregacao = data.content.values[i].cpDate1ParcelaComissao;
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
                        fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                        fixedTwo(data.content.values[i].cpValorReferenciaComissao),
                        val1,
                        data.content.values[i].cpValor2ParcelaComissao,
                        val2,
                        val3,
                        deMin,
                        deMax,
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
                    if(data.content.values[i].cpValor2ParcelaComissao && (data.content.values[i].cpTipoVendaCod != "500" && data.content.values[i].cpTipoVendaCod != 500)) dtAgregacao = data.content.values[i].cpDate2ParcelaComissao;
                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    
                    var deMin  = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    var chk, deMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                        chk = "<input type='checkbox' id='select_sale_min_"+x+"' disabled='disabled' checked='checked'>";
                    }else if(pDeMin == "true" && deMin){
                        deMin  = fixedTwo(data.content.values[i].cpValorParcelaDemandaMinima);
                        chk = "<input type='checkbox' id='select_sale_min_"+x+"' disabled='disabled' checked='checked'>";
                    }else{
                        deMin  = "";
                        chk = "<input type='checkbox' id='select_sale_min_"+x+"'>"
                    }

                    var deMax  = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;

                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                    }else if(pDeMax == "true" && deMax){
                        deMax  = fixedTwo(data.content.values[i].cpValorParceladeMandaMaxima);
                    }else{
                        deMax  = "";
                    }

                    var proID = data.content.values[i].cpProcessID || "";
                    var documentid = "<input type='text' id='Dm_documentid_"+x+"' class='form-control hide' value='"+data.content.values[i].documentid+"' >";
                    var cpProcessID = "<input type='text' id='Dm_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var val2 = "", val3 = "";
                    var valBon = fixedTwo(data.content.values[i].cpValor1ParcelaComissao);
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
                            dtAgregacao = data.content.values[i].cpDate1ParcelaComissao;
                        }else{
                            val3 = valBon;
                        }
                    }

                    var val1 = "";
                    if(data.content.values[i].cpValor2ParcelaComissao && data.content.values[i].cpValor2ParcelaComissao != " " && data.content.values[i].cpValor2ParcelaComissao != null) val1 = fixedTwo(data.content.values[i].cpValor2ParcelaComissao);

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
                        fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                        fixedTwo(data.content.values[i].cpValorReferenciaComissao),
                        val3,
                        val1,
                        val2,
                        val4,
                        data.content.values[i].cpValorParcelaBonificacao || "",
                        deMin,
                        deMax,
                        dtAgregacao,
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
                    if(data.content.values[i].cpValor2ParcelaComissao && (data.content.values[i].cpTipoVendaCod != "500" && data.content.values[i].cpTipoVendaCod != 500)) dtAgregacao = data.content.values[i].cpDate2ParcelaComissao;
                    if(dtAgregacao == 'null' || dtAgregacao == null || dtAgregacao == undefined || dtAgregacao == 'undefined' || dtAgregacao == ''){
                        dtAgregacao = '';
                    }else{
                        dtAgregacao = dtAgregacao.split("-").reverse();
                        dtAgregacao = dtAgregacao[0]+"/"+dtAgregacao[1]+"/"+dtAgregacao[2];    
                    }

                    var proID = data.content.values[i].cpProcessID || "";
                    var documentid = "<input type='text' id='Dma_documentid_"+x+"' class='form-control hide' value='"+data.content.values[i].documentid+"'>";
                    var cpProcessID = "<input type='text' id='Dma_cpProcessID_"+x+"' class='form-control hide' value='"+proID+"'>";

                    var deMin  = data.content.values[i].cpValorParcelaDemandaMinima;
                    var pDeMin = data.content.values[i].cpPermiteDemandaMin;
                    if(pDeMin == "true" && !deMin){
                        deMin = processAlert();
                    }else if(pDeMin == "true" && deMin){
                        deMin  = fixedTwo(data.content.values[i].cpValorParcelaDemandaMinima);
                    }else{
                        deMin  = "";
                    }

                    var deMax = data.content.values[i].cpValorParceladeMandaMaxima;
                    var pDeMax = data.content.values[i].cpPermiteDemandaMax;
                    var chk, deMin;
                    if(pDeMax == "true" && !deMax){
                        deMax = processAlert();
                        chk = "<input type='checkbox' id='select_sale_max_"+x+"' disabled='disabled' checked='checked'>";
                    }else if(pDeMax == "true" && deMax){
                        deMax  = fixedTwo(data.content.values[i].cpValorParceladeMandaMaxima);
                        chk = "<input type='checkbox' id='select_sale_max_"+x+"' disabled='disabled' checked='checked'>";
                    }else{
                        deMax  = "";
                        chk = "<input type='checkbox' id='select_sale_max_"+x+"'>"
                    }
                    
                    var valBon = fixedTwo(data.content.values[i].cpValor1ParcelaComissao);
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
                            dtAgregacao = data.content.values[i].cpDate1ParcelaComissao;
                        }else{
                            val3 = valBon;
                        }
                    }

                    var val1 = "";
                    if(data.content.values[i].cpValor2ParcelaComissao && data.content.values[i].cpValor2ParcelaComissao != " " && data.content.values[i].cpValor2ParcelaComissao != null && data.content.values[i].cpValor2ParcelaComissao != "null"  && data.content.values[i].cpValor2ParcelaComissao != "") val1 = fixedTwo(data.content.values[i].cpValor2ParcelaComissao);

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
                        fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                        fixedTwo(data.content.values[i].cpValorReferenciaComissao),
                        val3,
                        val1,
                        val2,
                        val4,
                        data.content.values[i].cpValorParcelaBonificacao || "",
                        deMin,
                        deMax,
                        dtAgregacao,
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

                $("#tableAwards tbody tr td:nth-child(19)").each(function(){
                    var el = $(this);
                    var val = el.text();
                    if(val.indexOf("-") >= 0){
                        val = val.split("-").reverse();
                        val = val[0]+"/"+val[1]+"/"+val[2];
                        el.text(val);
                    }
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

                $("#tableDemandMin tbody tr td:nth-child(20)").each(function(){
                    var el = $(this);
                    var val = el.text();
                    if(val.indexOf("-") >= 0){
                        val = val.split("-").reverse();
                        val = val[0]+"/"+val[1]+"/"+val[2];
                        el.text(val);
                    }
                })

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

                $("#tableDemandMax tbody tr td:nth-child(20)").each(function(){
                    var el = $(this);
                    var val = el.text();
                    if(val.indexOf("-") >= 0){
                        val = val.split("-").reverse();
                        val = val[0]+"/"+val[1]+"/"+val[2];
                        el.text(val);
                    }
                })

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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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

// monta select com os consolidados gravados em banco
function getEmprendimentosConsolidados(idSelect, type) {
    var options;
    var optionsArr = [];
    var optionsCodArr = [];

    var query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO"

    // AJAX PARAMS
    var dados = {
        "name": "ds_buscaDB", //dataset's id 
        "constraints": [
            { //constraints to filter the search, all fields specified inside are required 
                "_field": "SQL", //name of the field used in the constraint 
                "_initialValue": query, //value to be filtered 
                "_finalValue": query, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": true
            }
        ]
    }
    // AJAX PARAMS

    $.ajax({
        method: "POST",
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            if(type == "empreendimento"){

                options += "<option></option>";

                for (var i = 0; i < data.content.values.length; i++) {
                    var empreendimento = data.content.values[i].Empreendimento;
                    if (optionsArr.indexOf(empreendimento) === -1 && empreendimento != null && empreendimento != "" && empreendimento != undefined && empreendimento != "undefined") {
                        optionsArr.push(empreendimento);
                        optionsCodArr.push(data.content.values[i].Empreendimento);
                    }
                }

                for (i = 0; i < optionsArr.length; i++) {
                    options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
                }

                $("#" + idSelect).html(options);
            }

            if(type == "imobiliaria"){
                options += "<option></option>";

                for (var i = 0; i < data.content.values.length; i++) {
                    var imobiliaria = data.content.values[i].Imobiliaria;
                    if (optionsArr.indexOf(imobiliaria) === -1 && imobiliaria != null && imobiliaria != "" && imobiliaria != undefined && imobiliaria != "undefined") {
                        optionsArr.push(imobiliaria);
                        optionsCodArr.push(data.content.values[i].Imobiliaria);
                    }
                }

                for (i = 0; i < optionsArr.length; i++) {
                    options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
                }

                $("#" + idSelect).html(options);
            }

            if(type == "periodo"){
                options += "<option></option>";

                for (var i = 0; i < data.content.values.length; i++) {
                    var inicio = data.content.values[i].PeriodoIni;
                    var final  = data.content.values[i].PeriodoFin;

                    if(inicio){
                        inicio = data.content.values[i].PeriodoIni.split("-").reverse();
                        inicio = inicio[0]+"/"+inicio[1]+"/"+inicio[2];
                    }

                    if(final){
                        final = data.content.values[i].PeriodoFin.split("-").reverse();
                        final = final[0]+"/"+final[1]+"/"+final[2];
                    }

                    if (optionsArr.indexOf(inicio+" - "+final) === -1 && inicio != null && inicio != "" && inicio != undefined && inicio != "undefined" && final != null && final != "" && final != undefined && final != "undefined") {
                        var ini = data.content.values[i].PeriodoIni.split("-").reverse();
                            ini = ini[0]+"/"+ini[1]+"/"+ini[2];
                        var fin = data.content.values[i].PeriodoFin.split("-").reverse();
                            fin = fin[0]+"/"+fin[1]+"/"+fin[2];
                        var value = ini+' - '+fin;

                        optionsArr.push(value);
                        optionsCodArr.push(data.content.values[i].PeriodoIni+'/'+data.content.values[i].PeriodoFin);

                    }
                }

                for (i = 0; i < optionsArr.length; i++) {
                    options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
                }

                $("#" + idSelect).html(options);
            }
        }
    });
}
// monta o select empreendimento e imobiliaria

// executa a query pra montar a tabela de NFS
function executeDBSearchNFS(ini, fim){
    
    var dataTableRows = [];

    var query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO WHERE PeriodoIni = '"+ini+"' AND PeriodoFin = '"+fim+"'";

    // AJAX PARAMS
    var dados = {
        "name": "ds_buscaDB", //dataset's id 
        "constraints": [
            { //constraints to filter the search, all fields specified inside are required 
                "_field": "SQL", //name of the field used in the constraint 
                "_initialValue": query, //value to be filtered 
                "_finalValue": query, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": true
            }
        ]
    }
    // AJAX PARAMS

    $.ajax({
        method: "POST",
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var DataTableColumns = '<table id="tableNFS" class="table table-hover table-bordered">';
            for(var i = 0, y=1; i < data.content.values.length; i++, y++){

                var PeriodoIni = data.content.values[i].PeriodoIni
                if(PeriodoIni){
                    PeriodoIni = PeriodoIni.split("-").reverse();
                    PeriodoIni = PeriodoIni[0]+"/"+PeriodoIni[1]+"/"+PeriodoIni[2];
                }
                    
                var PeriodoFin = data.content.values[i].PeriodoFin;
                if(PeriodoFin){
                    PeriodoFin = PeriodoFin.split("-").reverse();
                    PeriodoFin = PeriodoFin[0]+"/"+PeriodoFin[1]+"/"+PeriodoFin[2];
                }
                
                var DocumentID = data.content.values[i].DocumentID;
                var ID = data.content.values[i].ID;

                var input1 = '<input type="text" id="documentId_'+y+'" class="form-control hide" value="'+DocumentID+'">';
                var input2 = '<input type="text" id="dbId_'+y+'" class="form-control hide" value="'+ID+'">';
                var input3, checkbox;

                if(data.content.values[i].NF && data.content.values[i].NF != null && data.content.values[i].NF != "null"){
                    input3   = "<input type='text' name='cpNF_"+y+"' id='cpNF_"+y+"' class='form-control' value='"+data.content.values[i].NF+"' readonly>";
                    checkbox = "<input type='checkbox' id='select_row_"+y+"' disabled='disabled' checked='checked'>"
                }else{
                    input3 = "<input type='text' name='cpNF_"+y+"' id='cpNF_"+y+"' class='form-control'>"
                    checkbox = "<input type='checkbox' id='select_row_"+y+"'>"
                }

                dataTableRows.push([
                    PeriodoIni +' - '+ PeriodoFin + input1 + input2,
                    data.content.values[i].Imobiliaria,
                    data.content.values[i].Empreendimento,
                    data.content.values[i].ValorNF,
                    input3,
                    checkbox,
                ]);
                
                console.log(data.content.values[i].Empreendimento);


            } //fim do for

            DataTableColumns += '</table>';
            // DataTableColumns = DataTableColumns.replace('undefined', '').replace('null', '');

            console.log(dataTableRows)

            $("#NFS_table").html(DataTableColumns);

            var title = [
                    { title: 'Período'},
                    { title: 'Imobiliaria'},
                    { title: 'Empreendimento'},
                    { title: 'ValorNF'},
                    { title: 'Inserir NF'},
                    { title: "<input type='checkbox' id='select_all_rows'> " + ' <i class="fluigicon fluigicon-cog fluigicon-xs"></i>'}
                ];

            $('#tableNFS').dataTable({
                dom: '',
                data: dataTableRows,
                columns: title,
                paging: false,
                select: false,
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


        } // fim success
    });
}
// executa a query pra montar a tabela de NFS
function buildTable(obj, date1, date2, nf){

    var DataTableColumns;
    var dataTableRows = [];

    DataTableColumns += '<table id="tableNFS" class="table table-hover table-bordered">';

    for(var i = 0; i < Object.keys(obj).length; i++){

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

    var total = reduce(tot)
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
function getConsolidated(val1, val2, val3, val4, x){

    // val1 - data inicio
    // val2 - data fim
    // val3 - Empreendimentos
    // val4 - Imobiliaria
    // x    - index

    var imob;
    if(Array.isArray(val4)){
        for(i = 0; i<val4.length; i++){
            imob = val4[i];    
        }
    }else{
        imob = val4;
    }

    // var query = "SELECT * FROM FLUIG.DBO.ML0012472 WHERE (cpDate1ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDate2ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateBonus BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateDemandaMin BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateDemandaMax BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateDistrato BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateComBRZ BETWEEN '"+val1+"' AND '"+val2+"') AND cpEmpreendimentoCod = '"+val3+"' AND cpNomeImobiliaria = '"+imob+"'"
    // var query = "SELECT * FROM FLUIG.DBO.ML0012472 WHERE (cpDate1ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDate2ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateDistrato BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateComBRZ BETWEEN '"+val1+"' AND '"+val2+"') AND cpEmpreendimentoCod = '"+val3+"' AND cpNomeImobiliaria = '"+imob+"'"
    var query = "SELECT * FROM FLUIG.DBO.ML0012472 A JOIN DOCUMENTO B ON A.documentid = B.NR_DOCUMENTO AND A.version = B.NR_VERSAO AND B.VERSAO_ATIVA = 1 WHERE (cpDate1ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDate2ParcelaComissao BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateDistrato BETWEEN '"+val1+"' AND '"+val2+"' OR cpDateComBRZ BETWEEN '"+val1+"' AND '"+val2+"') AND cpEmpreendimentoCod = '"+val3+"' AND cpNomeImobiliaria = '"+imob+"'"
    
    console.log(query);


    // AJAX PARAMS
    var dados = {
        "name": "ds_buscaDB", //dataset's id 
        "constraints": [
            { //constraints to filter the search, all fields specified inside are required 
                "_field": "SQL", //name of the field used in the constraint 
                "_initialValue": query, //value to be filtered 
                "_finalValue": query, //final value to be filtered 
                "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
                "_likeSearch": true
            }
        ]
    }
    // AJAX PARAMS

    $.ajax({
        method: "POST",
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: true,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var columnsBruto = "", 
                columns1Parc = "", 
                columns2Parc = "", 
                columnsParcU = "",
                columnsDistr = "";

            var rowsColumnsBruto = [], 
                rowsColumnsParc1 = [],
                rowsColumnsParc2 = [],
                rowsColumnsParcUnic = [],
                rowsColumnsDistrato = [];

            var arrValorTotal = [],
                arrValorDistr = [];

            var arrProcessId = [];
            
            //1PARCELA
            var arrValor1Parc = [],
                arrBrz = [],
                arrValorBonus = [];
            //1PARCELA

            //2PARCELA
            var arrValor2Parc = [],
                arrDemanMinim = [],
                arrDemanMaxim = [];
            //2PARCELA

            //PARCELA UNICA
            var arrValorParcU = [];
            //PARCELA UNICA

            //DISTRATO
            var arrValorDist = [];
            //DISTRATO

            var empreendimento = "",
                valVenda = "",
                base = "";

            var documentid = [];

            var a = [], // primeira parcela
                b = [], // segunda parcela
                c = [], // parcela unica
                d = [], // distrato
                e = [], // bonus
                f = [], // demanda min 2parc
                g = []; // demanda max 2parc
                h = [], // demanda min parc unica
                j = []; // demanda max parc unica

            columnsBruto += '<table id="tableBruto_'+x+'" class="table-consolided">';
            columns1Parc += '<table id="table1Parc_'+x+'" class="table-consolided">';
            columns2Parc += '<table id="table2Parc_'+x+'" class="table-consolided">';
            columnsParcU += '<table id="tableParcU_'+x+'" class="table-consolided">';
            columnsDistr += '<table id="tableDist_'+x+'" class="table-consolided">' ;

            var status = false;

            for(i = 0; i < data.content.values.length; i++) {
                
                // if(val3 == data.content.values[i].cpEmpreendimentoCod && imob == data.content.values[i].cpNomeImobiliaria){

                    empreendimento = data.content.values[i].cpEmpreendimento;

                    if(!data.content.values[i].cpValorReferenciaComissao && data.content.values[i].cpValorReferenciaComissao != "0,00" ){
                        base = fixedTwo(data.content.values[i].cpValorReferenciaComissao)
                    }else{
                        base = fixedTwo(data.content.values[i].cpValorLiquidoVenda);
                    }

                    // INICIO TABELA 1 PARCELA
                    var p1   = data.content.values[i].cpValor1ParcelaComissao;
                    var pb   = data.content.values[i].cpValorParcelaBonificacao;
                    var cpu  = data.content.values[i].cpConfirmParcelUnic;

                    date = data.content.values[i].dtVenda;
                    if(date){
                        date = date.split("-").reverse();
                        date = date[0]+"/"+date[1]+"/"+date[2];    
                    }

                    var bonus;
                    if(p1 && p1 != null && p1 != "null" &&  cpu != "true"){
                        var dtp1;
                        if(val4 == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
                            dtp1 = data.content.values[i].cpDateComBRZ;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        }else{
                            dtp1 = data.content.values[i].cpDate1ParcelaComissao;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        }
                        
                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                        if(documentid.indexOf(data.content.values[i].documentid) === -1 ) documentid.push(data.content.values[i].documentid);

                        status = true;
                        var bn = data.content.values[i].cpValorParcelaBonificacao;
                        (bn && bn != null && bn != "null" && bn != "" && bn != " " && bn != undefined && bn != "undefined") ? bonus = bn : bonus = 0;

                        if( ( parseInt(dtp1) <= parseInt(dtpf) && parseInt(dtp1) >= parseInt(dtpi) )){

                            rowsColumnsParc1.push([
                                "",
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
                                bonus,
                            ]);

                            a.push(data.content.values[i].cpValor1ParcelaComissao);

                        }
                    }
                    // FIM TABELA 1 PARCELA

                    // INICIO TABELA 2 PARCELA
                    var p2   = data.content.values[i].cpValor2ParcelaComissao;
                    if(p2 && p2 != null && p2 != "null"){

                        var dtp2 = data.content.values[i].cpDate2ParcelaComissao;
                            dtp2 = dtp2.split('-');
                            dtp2 = dtp2[0]+dtp2[1]+dtp2[2];

                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                        if( ( parseInt(dtp2) <= parseInt(dtpf) && parseInt(dtp2) >= parseInt(dtpi) )){

                            var bn = data.content.values[i].cpValorParcelaBonificacao;
                            (bn && bn != null && bn != "null" && bn != "" && bn != " " && bn != undefined && bn != "undefined") ? bonus = bn : bonus = 0;

                            date2 = data.content.values[i].dtAgregacao.trim();
                            if(date2){
                                date2 = date2.split("-").reverse();
                                date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                            }else{
                                date2 = data.content.values[i].cpDate2ParcelaComissao.trim();
                                date2 = date2.split("-").reverse();
                                date2 = date2[0]+"/"+date2[1]+"/"+date2[2];
                            }

                            if(documentid.indexOf(data.content.values[i].documentid) === -1 ) documentid.push(data.content.values[i].documentid);

                            var cpValor2ParcelaComissao =  data.content.values[i].cpValor2ParcelaComissao;
                            if(!cpValor2ParcelaComissao || cpValor2ParcelaComissao == "null" || cpValor2ParcelaComissao == null) cpValor2ParcelaComissao = 0;

                            var cpValorParcelaDemandaMinima =  data.content.values[i].cpValorParcelaDemandaMinima;
                            if(cpValorParcelaDemandaMinima == "" || cpValorParcelaDemandaMinima == " " || cpValorParcelaDemandaMinima == "null" || cpValorParcelaDemandaMinima == null) cpValorParcelaDemandaMinima = 0;

                            var cpValorParceladeMandaMaxima =  data.content.values[i].cpValorParceladeMandaMaxima;
                            if(cpValorParceladeMandaMaxima == "" || cpValorParceladeMandaMaxima == " " || cpValorParceladeMandaMaxima == "null" || cpValorParceladeMandaMaxima == null) cpValorParceladeMandaMaxima = 0;

                            rowsColumnsParc2.push([
                                "",
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
                                cpValor2ParcelaComissao,
                                cpValorParcelaDemandaMinima,
                                cpValorParceladeMandaMaxima,
                                bonus,
                            ]);

                            b.push(cpValor2ParcelaComissao);
                            f.push(cpValorParcelaDemandaMinima)
                            g.push(cpValorParceladeMandaMaxima)
                
                        }
                    }
                    // FIM TABELA 2 PARCELA

                    // INICIO TABELA PARCELA UNICA
                    if(data.content.values[i].cpConfirmParcelUnic == "true"){

                        var dtp1 = data.content.values[i].cpDate1ParcelaComissao;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        
                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                            status = true

                        if( ( parseInt(dtp1) <= parseInt(dtpf) && parseInt(dtp1) >= parseInt(dtpi) )){

                            var bn = data.content.values[i].cpValorParcelaBonificacao;
                            (bn && bn != null && bn != "null" && bn != "" && bn != " " && bn != undefined && bn != "undefined") ? bonus = bn : bonus = 0;

                            if(documentid.indexOf(data.content.values[i].documentid) === -1 ) documentid.push(data.content.values[i].documentid);
                        
                            var cpValor1ParcelaComissao =  data.content.values[i].cpValor1ParcelaComissao;
                            if(!cpValor1ParcelaComissao || cpValor1ParcelaComissao == "null" || cpValor1ParcelaComissao == null) cpValor1ParcelaComissao = 0;

                            var cpValorParcelaDemandaMinima = data.content.values[i].cpValorParcelaDemandaMinima;
                            if(!cpValorParcelaDemandaMinima || cpValorParcelaDemandaMinima == "null" || cpValorParcelaDemandaMinima == null) cpValorParcelaDemandaMinima = 0;

                            var cpValorParceladeMandaMaxima = data.content.values[i].cpValorParceladeMandaMaxima;
                            if(!cpValorParceladeMandaMaxima || cpValorParceladeMandaMaxima == "null" || cpValorParceladeMandaMaxima == null) cpValorParceladeMandaMaxima = 0;

                            date2 = data.content.values[i].dtAgregacao.trim();
                            if(date2){
                                date2 = date2.split("-").reverse();
                                date2 = date2[0]+"/"+date2[1]+"/"+date2[2];        
                            }else{
                                date2 = data.content.values[i].cpDate1ParcelaComissao.trim();
                                date2 = date2.split("-").reverse();
                                date2 = date2[0]+"/"+date2[1]+"/"+date2[2];
                            }

                            rowsColumnsParcUnic.push([
                                "",
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
                                cpValor1ParcelaComissao,
                                cpValorParcelaDemandaMinima,
                                cpValorParceladeMandaMaxima,
                                bonus,
                            ]);

                            c.push(cpValor1ParcelaComissao);

                            h.push(cpValorParcelaDemandaMinima);
                            j.push(cpValorParceladeMandaMaxima);
                        }
                    }
                    // FIM TABELA PARCELA UNICA

                    // INICIO TABELA DISTRATO
                    if(data.content.values[i].cpValordeDistrato && data.content.values[i].cpValordeDistrato != null && data.content.values[i].cpValordeDistrato != "null"){
                        var dtpd = data.content.values[i].cpDateDistrato;
                            dtpd = dtpd.split('-');
                            dtpd = dtpd[0]+dtpd[1]+dtpd[2];
                        
                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                            status = true

                        if( ( parseInt(dtpd) <= parseInt(dtpf) && parseInt(dtpd) >= parseInt(dtpi) )){

                            if(documentid.indexOf(data.content.values[i].documentid) === -1 ) documentid.push(data.content.values[i].documentid);

                            nf1 = data.content.values[i].cpNF1ParcelaComissao || ''; 
                            nf2 = data.content.values[i].cpNF2ParcelaComissao || ''; 
                            nf3 = data.content.values[i].cpNFParcelaBonificacao || ''; 
                            nf4 = data.content.values[i].cpNFParcelaDemandaMinima || ''; 
                            nf5 = data.content.values[i].cpNFParceladeMandaMaxima || ''; 

                            var nf1Fake = data.content.values[i].cpNF1ParcelaComissaoFake;
                            var nf2Fake = data.content.values[i].cpNF2ParcelaComissaoFake;
                            var nf3Fake = data.content.values[i].cpNFParcelaBonificacaoFake;
                            var nf4Fake = data.content.values[i].cpNFParcelaDemandaMinimaFake;
                            var nf5Fake = data.content.values[i].cpNFParceladeMandaMaximaFake;

                            var nf1 = data.content.values[i].cpNF1ParcelaComissao;
                            var nf2 = data.content.values[i].cpNF2ParcelaComissao;
                            var nf3 = data.content.values[i].cpNFParcelaBonificacao;
                            var nf4 = data.content.values[i].cpNFParcelaDemandaMinima;
                            var nf5 = data.content.values[i].cpNFParceladeMandaMaxima;
                            var nfStatus;
                            if(nf1Fake && !nf1 ){
                                nfStatus = true;
                            }else{
                                nfStatus = false;
                            }
                            if(nf2Fake && !nf2 ){
                                nfStatus = true;
                            }else{
                                nfStatus = false;
                            }
                            if(nf3Fake && !nf3 ){
                                nfStatus = true;
                            }else{
                                nfStatus = false;
                            }
                            if(nf4Fake && !nf4 ){
                                nfStatus = true;
                            }else{
                                nfStatus = false;
                            }
                            if(nf5Fake && !nf5 ){
                                nfStatus = true;
                            }else{
                                nfStatus = false;
                            }

                            if(nfStatus){
                                nf = processAlert();
                            }else{
                                nf = nf1+" - "+nf2+" - "+nf3+" - "+nf4+" - "+nf5;    
                                if(nf == ' -  -  -  - ' || nf == 'null - null - null - null - null' ) nf = "";
                            }

                            rowsColumnsDistrato.push([
                                "",
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

                            d.push(data.content.values[i].cpValordeDistrato);
                        }
                    }
                    // FIM TABELA DISTRATO

                    if(p1 && p1 != null && p1 != "null" &&  cpu != "true"){
                        var dtp1;
                        if(val4 == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){
                            dtp1 = data.content.values[i].cpDateComBRZ;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        }else{
                            dtp1 = data.content.values[i].cpDate1ParcelaComissao;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        }
                        
                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                        var bn = data.content.values[i].cpValorParcelaBonificacao;
                        (bn && bn != null && bn != "null" && bn != "" && bn != " " && bn != undefined && bn != "undefined") ? bonus = bn : bonus = 0;
                        if( ( parseInt(dtp1) <= parseInt(dtpf) && parseInt(dtp1) >= parseInt(dtpi) )){
                            e.push(bonus);
                        }
                    }else if((!p1 || p1 == null || p1 == "null" ||  cpu == "true") && (p2 && p2 != null && p2 != "null")){
                        
                        var bn = data.content.values[i].cpValorParcelaBonificacao;
                        (bn && bn != null && bn != "null" && bn != "" && bn != " " && bn != undefined && bn != "undefined") ? bonus = bn : bonus = 0;

                        var dtp2 = data.content.values[i].cpDate2ParcelaComissao;
                            dtp2 = dtp2.split('-');
                            dtp2 = dtp2[0]+dtp2[1]+dtp2[2];

                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                        if( ( parseInt(dtp2) <= parseInt(dtpf) && parseInt(dtp2) >= parseInt(dtpi) )){
                            e.push(bonus);
                        }
                    }else if((!p1 || p1 == null || p1 == "null" ||  cpu == "true") && (!p2 || p2 == null || p2 == "null") && (data.content.values[i].cpConfirmParcelUnic == "true")){
                        var dtp1 = data.content.values[i].cpDate1ParcelaComissao;
                            dtp1 = dtp1.split('-');
                            dtp1 = dtp1[0]+dtp1[1]+dtp1[2];
                        
                        var dtpi = val1;
                            dtpi = dtpi.split('-');
                            dtpi = dtpi[0]+dtpi[1]+dtpi[2];

                        var dtpf = val2;
                            dtpf = dtpf.split('-');
                            dtpf = dtpf[0]+dtpf[1]+dtpf[2];

                            status = true

                        if( ( parseInt(dtp1) <= parseInt(dtpf) && parseInt(dtp1) >= parseInt(dtpi) )){
                            e.push(bonus);
                        }   
                    }
                    

                // }
            
            }

            if(status){

                Array.prototype.reverse.apply(rowsColumnsParc1);
                Array.prototype.reverse.apply(rowsColumnsParc2);
                Array.prototype.reverse.apply(rowsColumnsParcUnic);
                Array.prototype.reverse.apply(rowsColumnsDistrato);

                
                var inputDistrato = '<input name="cpDistratoSaldo_'+x+'" id="cpDistratoSaldo_'+x+'" class="form-control" style="display:none;">';
                var inputDocumentID = '<input name="cpDocumentID_'+x+'" id="cpDocumentID_'+x+'" class="form-control" style="display:none;" value="'+documentid+'">';

                // INICIO TABELA 1 PARCELA
                    columns1Parc += '</table>';
                    columns1Parc = columns1Parc.replace('undefined', '').replace('null', '');

                    var title1Parc = [
                        { title: 'ID'},
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
                    columns2Parc += '</table>';
                    columns2Parc = columns2Parc.replace('undefined', '').replace('null', '');

                    var title2Parc = [
                        { title: 'ID'},
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
                    columnsParcU += '</table>';
                    columnsParcU = columnsParcU.replace('undefined', '').replace('null', '');

                    var titleParcU = [
                        { title: 'ID'},
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

                    columnsDistr += '</table>';
                    columnsDistr = columnsDistr.replace('undefined', '').replace('null', '');

                    
                    var Despesas    = '<div id="ReportsDesp_'+x+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-10">';
                        Despesas   += ' <div class="row">';
                        Despesas   += ' <label>Despesas</label>';
                        Despesas   += ' <input name="cpDesp_'+x+'" id="cpDesp_'+x+'" class="form-control money">';
                        Despesas   += '</div></div>';

                    var Observacao  = '<div id="ReportsObs_'+x+'" class="col-xs-12 col-sm-8 col-md-8 col-lg-8 m-b-10">';
                        Observacao += ' <div class="row">';
                        Observacao += ' <label>Observação</label>';
                        Observacao += ' <textarea name="cpObs_'+x+'" id="cpObs_'+x+'" cols="30" rows="10" class="form-control"></textarea>';
                        Observacao += '</div></div>';
                        Observacao += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>';


                    var titleDistrato = [
                        { title: 'ID'},
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

                // INICIO TABELA BRUTO
                    columnsBruto += '</table><input type="text" id="cpValorTotal_'+x+'" class="form-control hide">';
                    columnsBruto = columnsBruto.replace('undefined', '').replace('null', '');

                    var dataInicio = val1.split('-').reverse();
                        dataInicio = dataInicio[0]+'/'+dataInicio[1]+'/'+dataInicio[2];

                    var dataFim = val2.split('-').reverse();
                        dataFim = dataFim[0]+'/'+dataFim[1]+'/'+dataFim[2];

                    var txt  = '<div id="chk_'+x+'" class="m-b-20">';
                        txt += ' <label><input type="checkbox" id="ckConsolidaded_'+x+'"> Selecionar Consolidado</label>';
                        txt += '</div>';
                        txt += '<div id="msg_'+x+'" class="m-b-20">';
                        txt += ' <h1>Prezados,<br>Liberada emissão de nota fiscal referente ao período <strong class="dtInicio">'+dataInicio+'</strong> a <strong class="dtFim">'+dataFim+'</strong> do empreendimento <strong class="emp">'+empreendimento+'</strong>, da imobiliária <strong>'+val4+'</strong> :</h1>';
                        txt += '</div>';

                    var titleBruto = [
                        { title: 'Valor BRUTO a pagar NF BRZ '+dataFim},
                        { title: 'Desconto'},
                        { title: 'Despesas'},
                        { title: 'Valor da NF'}
                    ];
                // FIM TABELA BRUTO

                // ANEXA AS TABELAS NA DIV REPORTS TABLE
                    $("#Reports_table > .row").append( txt + columnsBruto + inputDistrato + inputDocumentID + Despesas + Observacao + columns1Parc + columns2Parc + columnsParcU + columnsDistr);
                
                // INICIO TABELA 1PARCELA
                    if(rowsColumnsParc1.length > 0){
                        var t1 = $("#table1Parc_"+x).DataTable({
                                    data: rowsColumnsParc1,
                                    columns: title1Parc,
                                    paging: false,
                                    select: true,
                                    lengthMenu: [10, 25, 50, 100],
                                    order: [2, 'desc'],
                                    language: {
                                        search: "",
                                        emptyTable: "Não há solicitações com estas informações.",
                                        info: "Exibir _PAGE_ de _PAGES_"
                                    }
                                });

                        t1.on( 'order.dt search.dt', function () {
                            t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                                var calc = parseInt(i)+1
                                cell.innerHTML = calc;
                            } );
                        } ).draw();

                        $("#table1Parc_"+x).dataTable().fnDestroy();
                        
                        var seen1 = {};
                        $("#table1Parc_"+x+" tbody tr:not(.total)").each(function() {
                            var num_venda = $(this).find("td:nth-child(3)").text();
                            if (seen1[num_venda]){
                                arrValor1Parc.push($(this).find("td:nth-child(12)").text())
                                
                                var bon = 0
                                if($(this).find("td:last-child").text() != "") bon = parseFloat($(this).find("td:last-child").text());
                                arrValorBonus.push(bon);

                                $(this).remove();
                            }else{
                                seen1[num_venda] = true;
                            }
                        });


                        var Val1Parc = reduce(a); // total de 1 parcela do banco
                            Val1Parc = Val1Parc.toFixed(2);

                        var Val1ParcRem = reduce(arrValor1Parc); // total de 1 parcela duplicadas
                            Val1ParcRem = Val1ParcRem.toFixed(2);

                        var t1Parc = parseFloat(Val1Parc) - parseFloat(Val1ParcRem); // total de 1 parcela sem as duplicacoes
                            t1Parc = t1Parc.toFixed(2);

                        var ValBonus = reduce(e); // total de bonus do banco
                            ValBonus = ValBonus.toFixed(2);

                        var ValBonusRem = reduce(arrValorBonus); // total de bonus duplicadas
                            ValBonusRem = ValBonusRem.toFixed(2);

                        var tBonus = parseFloat(ValBonus) - parseFloat(ValBonusRem); // total de bonus sem as duplicacoes
                            tBonus = tBonus.toFixed(2);


                        // aplica mascara
                        $("#table1Parc_"+x+" tbody tr td:nth-child(11)").each(function(){
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



                        var tr = "<tr class='total'><td colspan='11'>Total</td><td>"+t1Parc+"</td> <td>"+tBonus+"</td></tr>";
                        $(tr).insertAfter("#table1Parc_"+x+" tbody tr:last-child");

                        var h1 = "<div id='tbl1Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1 style='white-space:nowrap;'>1ª Parcela para as unidades:</h1></div>";
                        $(h1).insertBefore("#table1Parc_"+x);

                        $("#table1Parc_"+x+" tbody tr td:nth-child(12), #table1Parc_"+x+" tbody tr td:last-child, #table1Parc_"+x+" tbody tr.total td:nth-child(2)").each(function(){
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });
                    }
                // INICIO TABELA 1PARCELA
                    
                // INICIO TABELA 2PARCELA
                    if(rowsColumnsParc2.length > 0){
                        var t2 = $("#table2Parc_"+x).DataTable({
                                    data: rowsColumnsParc2,
                                    columns: title2Parc,
                                    paging: false,
                                    select: true,
                                    lengthMenu: [10, 25, 50, 100],
                                    order: [2, 'desc'],
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
                        
                        $("#table2Parc_"+x).dataTable().fnDestroy();

                        var seen2 = {};
                        $("#table2Parc_"+x+" tbody tr:not(.total)").each(function() {
                            var num_venda  = $(this).find("td:nth-child(4)").text();
                            if (seen2[num_venda]){
                                arrValor2Parc.push($(this).find("td:nth-child(13)").text())
                                arrDemanMinim.push($(this).find("td:nth-child(14)").text())
                                arrDemanMaxim.push($(this).find("td:nth-child(15)").text())

                                $(this).remove();
                            }else{
                                seen2[num_venda] = true;
                            }
                        });


                        var Val2Parc = reduce(b); // total de 2 parcela do banco
                            Val2Parc = Val2Parc.toFixed(2);

                        var Val2ParcRem = reduce(arrValor2Parc); // total de 2 parcela duplicadas
                            Val2ParcRem = Val2ParcRem.toFixed(2);

                        var t2Parc = parseFloat(Val2Parc) - parseFloat(Val2ParcRem); // total de 2 parcela sem as duplicacoes
                            t2Parc = t2Parc.toFixed(2);

                        var ValDemMin = reduce(f); // total de demanda minima do banco
                            ValDemMin = ValDemMin.toFixed(2);

                        var ValDemMinRem = reduce(arrDemanMinim); // total de demanda minima duplicadas
                            ValDemMinRem = ValDemMinRem.toFixed(2);

                        var tDemMin = parseFloat(ValDemMin) - parseFloat(ValDemMinRem); // total de demanda minima sem as duplicacoes
                            tDemMin = tDemMin.toFixed(2);

                        var ValDemMax = reduce(g); // total de demanda maxima do banco
                            ValDemMax = ValDemMax.toFixed(2);

                        var ValDemMaxRem = reduce(arrDemanMaxim); // total de demanda maxima duplicadas
                            ValDemMaxRem = ValDemMaxRem.toFixed(2);

                        var tDemMax = parseFloat(ValDemMax) - parseFloat(ValDemMaxRem); // total de demanda maxima sem as duplicacoes
                            tDemMax = tDemMax.toFixed(2);

                        $("#table2Parc_"+x+" tbody tr td:nth-child(12), #table2Parc_"+x+" tbody tr td:nth-child(13), #table2Parc_"+x+" tbody tr td:nth-child(14), #table2Parc_"+x+" tbody tr td:nth-child(15), #table2Parc_"+x+" tbody tr td:last-child").each(function(){
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });
                        $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3), #table2Parc_"+x+" tbody tr.total td:nth-child(4)").each(function(){
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });

                        var tr = "<tr class='total'><td colspan='12'>Total</td><td>"+t2Parc+"</td> <td>"+tDemMin+"</td> <td>"+tDemMax+"</td> <td>"+tBonus+"</td> </tr>";
                        $(tr).insertAfter("#table2Parc_"+x+" tbody tr:last-child");

                        var h1 = "<div id='tbl2Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1 style='white-space:nowrap;'>2ª Parcela para as unidades:</h1></div>";
                        $(h1).insertBefore("#table2Parc_"+x);

                        $("#table2Parc_"+x+" tbody tr.total td:nth-child(2), #table2Parc_"+x+" tbody tr.total td:nth-child(3),#table2Parc_"+x+" tbody tr.total td:nth-child(4), #table2Parc_"+x+" tbody tr.total td:last-child").each(function(){
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });
                    }
                // INICIO TABELA 2PARCELA

                // INICIO TABELA PARCELA UNICA
                    if(rowsColumnsParcUnic.length > 0){
                        var t3 = $("#tableParcU_"+x).DataTable({
                                    data: rowsColumnsParcUnic,
                                    columns: titleParcU,
                                    paging: false,
                                    select: true,
                                    lengthMenu: [10, 25, 50, 100],
                                    order: [2, 'desc'],
                                    language: {
                                        search: "",
                                        emptyTable: "Não há solicitações com estas informações.",
                                        info: "Exibir _PAGE_ de _PAGES_"
                                    }
                                });

                        t3.on( 'order.dt search.dt', function () {
                            t3.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                                var calc = parseInt(i)+1
                                cell.innerHTML = calc;
                            } );
                        } ).draw();
                        
                        $("#tableParcU_"+x).dataTable().fnDestroy();

                        var seen3 = {};
                        var arrValorBonusPu = [], arrDemanMinimPu = [], arrDemanMaximPu = [];
                        $("#tableParcU_"+x+" tbody tr:not(.total)").each(function() {
                            var num_venda = $(this).find("td:nth-child(4)").text();
                            if (seen3[num_venda]){

                                arrValorParcU.push($(this).find("td:nth-child(13)").text())
                                arrValorBonusPu.push($(this).find("td:nth-child(14)").text())
                                arrDemanMinimPu.push($(this).find("td:nth-child(15)").text())
                                arrDemanMaximPu.push($(this).find("td:nth-child(16)").text())

                                $(this).remove();
                            }else{
                                seen3[num_venda] = true;
                            }
                        });

                        var ValParcU = reduce(c); // total de 2 parcela do banco
                            ValParcU = ValParcU.toFixed(2);

                        var ValParcURem = reduce(arrValorParcU); // total de 2 parcela duplicadas
                            ValParcURem = ValParcURem.toFixed(2);

                        var tParcU = parseFloat(ValParcU) - parseFloat(ValParcURem); // total de 2 parcela sem as duplicacoes
                            tParcU = tParcU.toFixed(2);

                        var ValDemMinU = reduce(h); // total de demanda minima do banco
                            ValDemMinU = ValDemMinU.toFixed(2);

                        var ValDemMinRemU = reduce(arrDemanMinimPu); // total de demanda minima duplicadas
                            ValDemMinRemU = ValDemMinRemU.toFixed(2);

                        var tDemMinU = parseFloat(ValDemMinU) - parseFloat(ValDemMinRemU); // total de demanda minima sem as duplicacoes
                            tDemMinU = tDemMinU.toFixed(2);

                        var ValDemMaxPu = reduce(j); // total de demanda maxima do banco
                            ValDemMaxPu = ValDemMaxPu.toFixed(2);

                        var ValDemMaxRemU = reduce(arrDemanMaximPu); // total de demanda maxima duplicadas
                            ValDemMaxRemU = ValDemMaxRemU.toFixed(2);

                        var tDemMaxU = parseFloat(ValDemMaxPu) - parseFloat(ValDemMaxRemU); // total de demanda maxima sem as duplicacoes
                            tDemMaxU = tDemMaxU.toFixed(2);

                        $("#tableParcU_"+x+" tbody tr td:nth-child(12), #tableParcU_"+x+" tbody tr td:nth-child(13),#tableParcU_"+x+" tbody tr td:nth-child(14), #tableParcU_"+x+" tbody tr td:last-child").each(function(){
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });

                        $("#tableParcU_"+x+" tbody tr td:nth-child(12)").each(function(){
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

                        var tr = "<tr class='total'><td colspan='12'>Total</td><td>"+tParcU+"</td> <td>"+tDemMinU+"</td> <td>"+tDemMaxU+"</td> <td>"+tBonus+"</td> </tr>";
                        $(tr).insertAfter("#tableParcU_"+x+" tbody tr:last-child");

                        var h1 = "<div id='tbl3Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1 style='white-space:nowrap;'>Parcela ÚNICA para as unidades:</h1></div>";
                        $(h1).insertBefore("#tableParcU_"+x);

                        $("#tableParcU_"+x+" tbody tr.total td:nth-child(2), #tableParcU_"+x+" tbody tr.total td:nth-child(3),#tableParcU_"+x+" tbody tr.total td:nth-child(4), #tableParcU_"+x+" tbody tr.total td:last-child").each(function(){
                            if($(this).text()){
                                $(this).mask('#.##0,00', { reverse: true });
                                var txt = $(this).text();
                                $(this).text('R$ '+txt);
                            }
                        });
                    }
                // INICIO TABELA PARCELA UNICA

                // INICIO TABELA DISTRATO
                    var distratoSaldo = consultDB([imob, empreendimento], "distrato");
                    if(distratoSaldo){
                        distratoSaldo = parseFloat(distratoSaldo).toFixed(2);
                        $("#cpDistratoSaldo_"+x).val(distratoSaldo);
                    }else{
                        distratoSaldo = 0;
                    }

                    var tDistrato = 0;

                    if(rowsColumnsDistrato.length > 0){
                        var t4 = $("#tableDist_"+x).DataTable({
                                    data: rowsColumnsDistrato,
                                    columns: titleDistrato,
                                    paging: false,
                                    select: true,
                                    lengthMenu: [10, 25, 50, 100],
                                    order: [2, 'desc'],
                                    language: {
                                        search: "",
                                        emptyTable: "Não há solicitações com estas informações.",
                                        info: "Exibir _PAGE_ de _PAGES_"
                                    }
                                });

                        t4.on( 'order.dt search.dt', function () {
                            t4.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                                var calc = parseInt(i)+1
                                cell.innerHTML = calc;
                            } );
                        } ).draw();
                        
                        $("#tableDist_"+x).dataTable().fnDestroy();

                        var seen4 = {};
                        var arrDistrato = [];
                        $("#tableDist_"+x+" tbody tr:not(.total)").each(function() {
                            var num_venda = $(this).find("td:nth-child(3)").text();
                            if (seen4[num_venda]){
                                arrDistrato.push($(this).find("td:last-child").text());
                                $(this).remove();
                            }else{
                                seen4[num_venda] = true;
                            }
                        });

                        var ValDistrato = reduce(d); // total de 2 parcela do banco
                            ValDistrato = ValDistrato.toFixed(2);

                        var ValDistratoRem = reduce(arrDistrato); // total de 2 parcela duplicadas
                            ValDistratoRem = ValDistratoRem.toFixed(2);

                            tDistrato = (parseFloat(ValDistrato) + parseFloat(distratoSaldo)) - parseFloat(ValDistratoRem); // total de 2 parcela sem as duplicacoes
                            tDistrato = tDistrato.toFixed(2);

                        var totalDistratoTable = parseFloat(ValDistrato) - parseFloat(ValDistratoRem); // total de 2 parcela sem as duplicacoes
                            totalDistratoTable = totalDistratoTable.toFixed(2);

                        var vDistratoTratado,
                            vLiquidoTratado;

                        var tr = "<tr class='total'><td colspan='11'>Total</td><td>"+numeroParaMoeda(totalDistratoTable)+"</td></tr>"
                        $(tr).insertAfter("#tableDist_"+x+" tbody tr:last-child");
                        var h1 = "<div id='tbl4Name_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h1 style='white-space:nowrap;'>Distrato das unidades:</h1></div>";
                        $(h1).insertBefore("#tableDist_"+x);
                    }else{
                        tDistrato = distratoSaldo;
                    }
                // FIM TABELA DISTRATO

                // INICIO TABELA BRUTO
                    if(rowsColumnsParc1.length > 0 || rowsColumnsParc2.length > 0 || rowsColumnsParcUnic.length > 0 || rowsColumnsDistrato.length > 0){

                        (t1Parc && t1Parc != NaN && t1Parc != undefined && t1Parc != "NaN" && t1Parc != "undefined") ? t1Parc  = t1Parc : t1Parc = 0;
                        (t2Parc && t2Parc != NaN && t2Parc != undefined && t2Parc != "NaN" && t2Parc != "undefined") ? t2Parc  = t2Parc : t2Parc = 0;
                        (tParcU && tParcU != NaN && tParcU != undefined && tParcU != "NaN" && tParcU != "undefined") ? tParcU  = tParcU : tParcU = 0;
                        (tBonus && tBonus != NaN && tBonus != undefined && tBonus != "NaN" && tBonus != "undefined") ? tBonus  = tBonus : tBonus = 0;
                        (tDemMin && tDemMin != NaN && tDemMin != undefined && tDemMin != "NaN" && tDemMin != "undefined") ? tDemMin = tDemMin : tDemMin = 0;
                        (tDemMax && tDemMax != NaN && tDemMax != undefined && tDemMax != "NaN" && tDemMax != "undefined") ? tDemMax = tDemMax : tDemMax = 0;
                        (tDemMinU && tDemMinU != NaN && tDemMinU != undefined && tDemMinU != "NaN" && tDemMinU != "undefined") ? tDemMinU = tDemMinU : tDemMinU = 0;
                        (tDemMaxU && tDemMaxU != NaN && tDemMaxU != undefined && tDemMaxU != "NaN" && tDemMaxU != "undefined") ? tDemMaxU = tDemMaxU : tDemMaxU = 0;


                        var bruto = parseFloat(t1Parc) + parseFloat(t2Parc) + parseFloat(tParcU) + parseFloat(tBonus) + parseFloat(tDemMin) + parseFloat(tDemMax) + parseFloat(tDemMinU) + parseFloat(tDemMaxU);
                            bruto = bruto.toFixed(2);

                        (vDistratoTratado && vDistratoTratado != NaN && vDistratoTratado != undefined && vDistratoTratado != "NaN" && vDistratoTratado != "undefined") ? vDistratoTratado = vDistratoTratado : vDistratoTratado = 0;
                        (vLiquidoTratado && vLiquidoTratado != NaN && vLiquidoTratado != undefined && vLiquidoTratado != "NaN" && vLiquidoTratado != "undefined") ? vLiquidoTratado = vLiquidoTratado : vLiquidoTratado = bruto;

                        $("#cpValorTotal_"+x).val(bruto);


                        if(val4 != "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){

                            if(!tDistrato) tDistrato = 0;

                            if(parseFloat(t2Parc) < parseFloat(tDistrato)){

                                var total = parseFloat(tDistrato) - parseFloat(t2Parc);
                                    total = total.toFixed(2);

                                $("#cpDistratoSaldo_"+x).val(total);


                                var ValorTotal = $("#cpValorTotal_"+x).val() || 0;

                                var t = parseFloat(ValorTotal) - parseFloat(t2Parc);
                                    t = t.toFixed(2);

                                vDistratoTratado = t2Parc;
                                vLiquidoTratado  = t;
                            }else{

                                $("#cpDistratoSaldo_"+x).val("0");

                                var ValorTotal = $("#cpValorTotal_"+x).val() || 0;

                                var t = parseFloat(ValorTotal) - parseFloat(tDistrato);
                                    t = t.toFixed(2);

                                vDistratoTratado = tDistrato;
                                vLiquidoTratado  = t;
                            }

                        }else if(val4 == "BRZ EMPREENDIMENTOS E CONSTRUÇÕES LTDA"){

                            if(!tDistrato) tDistrato = 0;

                            if(parseFloat(t1Parc) < parseFloat(tDistrato)){
                                var total = parseFloat(tDistrato) - parseFloat(t1Parc);
                                total = total.toFixed(2);

                                $("#cpDistratoSaldo_"+x).val(total);

                                var ValorTotal =$("#cpValorTotal_"+x).val() || 0

                                var t = parseFloat(ValorTotal) - parseFloat(t1Parc);
                                    t = t.toFixed(2);

                                vDistratoTratado = t1Parc;
                                vLiquidoTratado  = t;
                            }else{
                                $("#cpDistratoSaldo_"+x).val("0");

                                var ValorTotal = $("#cpValorTotal_"+x).val() || 0;

                                var t = parseFloat(ValorTotal) - parseFloat(tDistrato);
                                    t = t.toFixed(2);

                                vDistratoTratado = tDistrato;
                                vLiquidoTratado  = t;
                            }

                        }

                        rowsColumnsBruto.push([
                            bruto,
                            vDistratoTratado || "0,00",
                            "0,00",
                            vLiquidoTratado,
                        ]);

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
                            if($(this).text()) $(this).mask('#.##0,00', { reverse: true });
                        });
                        var sld = fixedTwo(distratoSaldo);
                            sld = numeroParaMoeda(sld);
                        var saldoDevedor = "<div id='saldoDistrato_"+x+"' class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><div class='row'><h1 style='white-space:nowrap;'>Saldo devedor de distrato: <strong>R$ "+sld+"</strong></h1></div></div>";
                        $(saldoDevedor).insertAfter("#tableBruto_"+x);
                    }
                // INICIO TABELA BRUTO

                $(".money").mask('#.##0,00', { reverse: true });

                var div  = '<div class="panel panel-default m-b-10">';
                    div += '    <div class="panel-heading">';
                    div += '        <h4 class="panel-title">';
                    div += '            <a class="collapse-icon down" data-toggle="collapse" data-parent="#div" href="#collapse_'+x+'"><span class="imobiliaria-title">'+imob+'</span> - <span class="emp-title">'+empreendimento+'</span></a>';
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
                    $('#chk_'+x+', #msg_'+x+',#tableBruto_'+x+',#cpDocumentID_'+x+', #saldoDistrato_'+x+', #cpValorTotal_'+x+', #cpDistratoSaldo_'+x+', #table1Parc_'+x+', #table2Parc_'+x+', #tableParcU_'+x+', #tableDist_'+x+', #ReportsDesp_'+x+', #ReportsObs_'+x+', #tbl1Name_'+x+', #tbl2Name_'+x+', #tbl3Name_'+x+', #tbl4Name_'+x).appendTo('#BlocoConsolidado_'+x);
                }

                $("#tableDist_"+x+" tbody tr td:last-child").each(function(){
                    if($(this).text()){
                        $(this).mask('#.##0,00', { reverse: true });
                        $('#cpValorTotal').mask('#.##0,00', { reverse: true });
                    }
                });

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
                        "border-radius": "10px",
                    });

                    elm.find("table.table-consolided tbody tr.total td:not(:first-child)").css({
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

                $("#table1Parc_"+x+" tbody tr:not(.total)").each(function(){
                    var el = $(this);
                    el.find("td:nth-child(2) ").attr("name", "p1Data");
                    el.find("td:nth-child(3) ").attr("name", "p1NuV");
                    el.find("td:nth-child(4) ").attr("name", "p1Emp");
                    el.find("td:nth-child(5) ").attr("name", "p1Blc");
                    el.find("td:nth-child(6) ").attr("name", "p1Uni");
                    el.find("td:nth-child(7) ").attr("name", "p1Cli");
                    el.find("td:nth-child(8) ").attr("name", "p1Imo");
                    el.find("td:nth-child(9) ").attr("name", "p1Cor");
                    el.find("td:nth-child(10)").attr("name", "p1TVd");
                    el.find("td:nth-child(11)").attr("name", "p1Bas");
                    el.find("td:nth-child(12)").attr("name", "p1Par");
                    el.find("td:nth-child(13)").attr("name", "p1Bon");
                })
                $("#table2Parc_"+x+" tbody tr:not(.total)").each(function(){
                    var el = $(this);
                    el.find("td:nth-child(2) ").attr("name",  "p2Data");
                    el.find("td:nth-child(3) ").attr("name",  "p2DtAg");
                    el.find("td:nth-child(4) ").attr("name",  "p2NuV");
                    el.find("td:nth-child(5) ").attr("name",  "p2Emp");
                    el.find("td:nth-child(6) ").attr("name",  "p2Blc");
                    el.find("td:nth-child(7) ").attr("name",  "p2Uni");
                    el.find("td:nth-child(8) ").attr("name",  "p2Cli");
                    el.find("td:nth-child(9) ").attr("name",  "p2Imo");
                    el.find("td:nth-child(10)").attr("name",  "p2Cor");
                    el.find("td:nth-child(11)").attr("name",  "p2TVen");
                    el.find("td:nth-child(12)").attr("name",  "p2Bas");
                    el.find("td:nth-child(13)").attr("name",  "p2Par");
                    el.find("td:nth-child(14)").attr("name",  "p2Dmn");
                    el.find("td:nth-child(15)").attr("name",  "p2Dmx");
                    el.find("td:nth-child(16)").attr("name",  "p2Bon");
                })
                $("#tableParcU_"+x+" tbody tr:not(.total)").each(function(){
                    var el = $(this);
                    el.find("td:nth-child(2) ").attr("name",  "pUniData");
                    el.find("td:nth-child(3) ").attr("name",  "pUniDtAg");
                    el.find("td:nth-child(4) ").attr("name",  "pUniNuV");
                    el.find("td:nth-child(5) ").attr("name",  "pUniEmp");
                    el.find("td:nth-child(6) ").attr("name",  "pUniBlc");
                    el.find("td:nth-child(7) ").attr("name",  "pUniUni");
                    el.find("td:nth-child(8) ").attr("name",  "pUniCli");
                    el.find("td:nth-child(9) ").attr("name",  "pUniImo");
                    el.find("td:nth-child(10)").attr("name",  "pUniCor");
                    el.find("td:nth-child(11)").attr("name",  "pUniTVen");
                    el.find("td:nth-child(12)").attr("name",  "pUniBas");
                    el.find("td:nth-child(13)").attr("name",  "pUniPar");
                    el.find("td:nth-child(14)").attr("name",  "pUniDmn");
                    el.find("td:nth-child(15)").attr("name",  "pUniDmx");
                    el.find("td:nth-child(16)").attr("name",  "pUniBon");
                })
                $("#tableDist_"+x+" tbody tr:not(.total)").each(function(){
                    var el = $(this);
                    el.find("td:nth-child(2) ").attr("name",  "DistData");
                    el.find("td:nth-child(3) ").attr("name",  "DistNuV");
                    el.find("td:nth-child(4) ").attr("name",  "DistEmp");
                    el.find("td:nth-child(5) ").attr("name",  "DistBlc");
                    el.find("td:nth-child(6) ").attr("name",  "DistUni");
                    el.find("td:nth-child(7) ").attr("name",  "DistCli");
                    el.find("td:nth-child(8) ").attr("name",  "DistImo");
                    el.find("td:nth-child(9) ").attr("name",  "DistCor");
                    el.find("td:nth-child(10)").attr("name",  "DistTVen");
                    el.find("td:nth-child(11)").attr("name",  "DistNF");
                    el.find("td:nth-child(12)").attr("name",  "DistTotal");
                });

                $('#cpDesp_'+x).focusout(function(){
                    $(this).mask('#0.00', { reverse: true });

                    var val = $(this).val() || 0;

                    var valTotal = $("#cpValorTotal_"+x).val();

                    var distrato = vDistratoTratado || 0;

                    var TotalL = (parseFloat(valTotal) - parseFloat(distrato)) - parseFloat(val);
                        TotalL = TotalL.toFixed(2);

                    $('#tableBruto_'+x+' tbody tr td:nth-child(3)').text(numeroParaMoeda(val));
                    $('#tableBruto_'+x+' tbody tr td:last-child').text(numeroParaMoeda(TotalL));

                });
                
            }  
        }
    });
}
// monta o consolidado

//busca a quantidade de imobiliarias no consolidados 
function getImobEmpConsolidated(type){
    var arr = [];
    dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {
            for (var i = 0; i < data.content.values.length; i++) {
                if(type == "imobiliaria"){
                    if(arr.indexOf(data.content.values[i].cpNomeImobiliaria) === -1 && data.content.values[i].cpNomeImobiliaria){
                        arr.push(data.content.values[i].cpNomeImobiliaria);
                    }    
                }
                if(type == "empreendimento"){
                    if(arr.indexOf(data.content.values[i].cpEmpreendimentoCod) === -1 && data.content.values[i].cpEmpreendimentoCod){
                        arr.push(data.content.values[i].cpEmpreendimentoCod);
                    }    
                }
                
                
            } // fim do for
        }
    });

    return arr;
}
//busca a quantidade de imobiliarias no consolidados 


function sendEmail(inicio, fim, emp, imob, email, html){

    var data = {
        // "to"         : "gustavo.almeida.t@brz.eng.br", //emails of recipients separated by ";"
        "to"         : email, //emails of recipients separated by ";"
        "from"       : "comissao@brz.eng.br", // sender
        "subject"    : "Consolidados da semana "+inicio+" à "+fim+" do empreendimento - "+emp+", da imobiliaria - "+imob, //   subject
        "templateId" : "EMAIL-CONSOLIDADO", // Email template Id previously registered
        "dialectId"  : "pt_BR", //Email dialect , if not informed receives pt_BR , email dialect ("pt_BR", "en_US", "es")
        "param"      : { "HTML": html }
    }


    $.ajax({
        url : "/api/public/alert/customEmailSender",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(data)
    })
    .done(function(data) {
        //Sucesso
        FLUIGC.message.alert({
            message: 'Consolidado enviado com sucesso.',
            title:   'Obrigado',
            label:   'OK'
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //Falha
        FLUIGC.message.alert({
            message: 'Erro ao enviar email.',
            title:   'Error',
            label:   'OK'
        });
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
                    "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                    "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function(x, e) {
            console.log("Erro Ajax Monta select", x, e);
        },
        success: function(data) {

            var x = 0;
                
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
                if(data.content.values[i].cpConfirmParcelUnic == "true") dtAgregacao = data.content.values[i].cpDate1ParcelaComissao;
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

                // data de calculos de comissoes
                cpDate1ParcelaComissao = data.content.values[i].cpDate1ParcelaComissao;
                if(cpDate1ParcelaComissao == 'null' || cpDate1ParcelaComissao == null || cpDate1ParcelaComissao == undefined || cpDate1ParcelaComissao == 'undefined' || cpDate1ParcelaComissao == ''){
                    cpDate1ParcelaComissao = '';
                }else{
                    cpDate1ParcelaComissao = cpDate1ParcelaComissao.split("-").reverse();
                    cpDate1ParcelaComissao = cpDate1ParcelaComissao[0]+"/"+cpDate1ParcelaComissao[1]+"/"+cpDate1ParcelaComissao[2];    
                }

                cpDate2ParcelaComissao = data.content.values[i].cpDate2ParcelaComissao;
                if(cpDate2ParcelaComissao == 'null' || cpDate2ParcelaComissao == null || cpDate2ParcelaComissao == undefined || cpDate2ParcelaComissao == 'undefined' || cpDate2ParcelaComissao == ''){
                    cpDate2ParcelaComissao = '';
                }else{
                    cpDate2ParcelaComissao = cpDate2ParcelaComissao.split("-").reverse();
                    cpDate2ParcelaComissao = cpDate2ParcelaComissao[0]+"/"+cpDate2ParcelaComissao[1]+"/"+cpDate2ParcelaComissao[2];    
                }

                cpDateBonus = data.content.values[i].cpDateBonus;
                if(cpDateBonus == 'null' || cpDateBonus == null || cpDateBonus == undefined || cpDateBonus == 'undefined' || cpDateBonus == ''){
                    cpDateBonus = '';
                }else{
                    cpDateBonus = cpDateBonus.split("-").reverse();
                    cpDateBonus = cpDateBonus[0]+"/"+cpDateBonus[1]+"/"+cpDateBonus[2];    
                }
                cpDateComBRZ = data.content.values[i].cpDateComBRZ;
                if(cpDateComBRZ == 'null' || cpDateComBRZ == null || cpDateComBRZ == undefined || cpDateComBRZ == 'undefined' || cpDateComBRZ == ''){
                    cpDateComBRZ = '';
                }else{
                    cpDateComBRZ = cpDateComBRZ.split("-").reverse();
                    cpDateComBRZ = cpDateComBRZ[0]+"/"+cpDateComBRZ[1]+"/"+cpDateComBRZ[2];    
                }
                cpDateDemandaMin = data.content.values[i].cpDateDemandaMin;
                if(cpDateDemandaMin == 'null' || cpDateDemandaMin == null || cpDateDemandaMin == undefined || cpDateDemandaMin == 'undefined' || cpDateDemandaMin == ''){
                    cpDateDemandaMin = '';
                }else{
                    cpDateDemandaMin = cpDateDemandaMin.split("-").reverse();
                    cpDateDemandaMin = cpDateDemandaMin[0]+"/"+cpDateDemandaMin[1]+"/"+cpDateDemandaMin[2];    
                }
                cpDateDemandaMax = data.content.values[i].cpDateDemandaMax;
                if(cpDateDemandaMax == 'null' || cpDateDemandaMax == null || cpDateDemandaMax == undefined || cpDateDemandaMax == 'undefined' || cpDateDemandaMax == ''){
                    cpDateDemandaMax = '';
                }else{
                    cpDateDemandaMax = cpDateDemandaMax.split("-").reverse();
                    cpDateDemandaMax = cpDateDemandaMax[0]+"/"+cpDateDemandaMax[1]+"/"+cpDateDemandaMax[2];    
                }
                cpDateDistrato = data.content.values[i].cpDateDistrato;
                if(cpDateDistrato == 'null' || cpDateDistrato == null || cpDateDistrato == undefined || cpDateDistrato == 'undefined' || cpDateDistrato == ''){
                    cpDateDistrato = '';
                }else{
                    cpDateDistrato = cpDateDistrato.split("-").reverse();
                    cpDateDistrato = cpDateDistrato[0]+"/"+cpDateDistrato[1]+"/"+cpDateDistrato[2];    
                }
                // data de calculos de comissoes

                var valBon = data.content.values[i].cpValor1ParcelaComissao;
                var valPer = data.content.values[i].cpPermiteComBRZ;
                var val4;
                if(valPer == "true"){
                    if(!valBon || valBon == "NaN" ){
                        val4 = processAlert();
                        val1 = ""  
                    }else{
                        val4 = valBon;
                        val1 = "";
                    }
                }else{
                    val4 = "";
                    val1 = valBon
                }

                var val1 = "", val2 = "", dtParcUnic = "";
                if(data.content.values[i].cpConfirmParcelUnic == "true"){
                    val1 = data.content.values[i].cpValor1ParcelaComissao;
                    dtParcUnic = cpDate1ParcelaComissao;
                    cpDate1ParcelaComissao = "";
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

                var nf1Fake = data.content.values[i].cpNF1ParcelaComissaoFake;
                var nf2Fake = data.content.values[i].cpNF2ParcelaComissaoFake;
                var nf3Fake = data.content.values[i].cpNFParcelaBonificacaoFake;
                var nf4Fake = data.content.values[i].cpNFParcelaDemandaMinimaFake;
                var nf5Fake = data.content.values[i].cpNFParceladeMandaMaximaFake;

                var nf = data.content.values[i].cpNF1ParcelaComissao;
                var nf2 = data.content.values[i].cpNF2ParcelaComissao;
                var nf3 = data.content.values[i].cpNFParcelaBonificacao;
                var nf4 = data.content.values[i].cpNFParcelaDemandaMinima;
                var nf5 = data.content.values[i].cpNFParceladeMandaMaxima;

                if(nf1Fake && !nf ){
                    nf = processAlert();
                } else if(!nf1Fake && !nf ){
                    nf = "";
                }else{
                    nf = data.content.values[i].cpNF1ParcelaComissao;
                }
                if(nf2Fake && !nf2 ){
                    nf2 = processAlert();
                } else if(!nf2Fake && !nf2 ){
                    nf2 = "";
                }else{
                    nf2 = data.content.values[i].cpNF2ParcelaComissao;
                }
                if(nf3Fake && !nf3 ){
                    nf3 = processAlert();
                } else if(!nf3Fake && !nf3 ){
                    nf3 = "";
                }else{
                    nf3 = data.content.values[i].cpNFParcelaBonificacao;
                }
                if(nf4Fake && !nf4 ){
                    nf4 = processAlert();
                } else if(!nf4Fake && !nf4 ){
                    nf4 = "";
                }else{
                    nf4 = data.content.values[i].cpNFParcelaDemandaMinima;
                }
                if(nf5Fake && !nf5 ){
                    nf5 = processAlert();
                } else if(!nf5Fake && !nf5 ){
                    nf5 = "";
                }else{
                    nf5 = data.content.values[i].cpNFParceladeMandaMaxima;
                }

                var bonus = "";
                if(data.content.values[i].cpValorParcelaBonificacao){
                    bonus = data.content.values[i].cpValorParcelaBonificacao;
                }


                if(data.content.values[i].cpValor2ParcelaComissao  && (data.content.values[i].cpTipoVendaCod != "500" && data.content.values[i].cpTipoVendaCod != 500)) dtAgregacao = cpDate2ParcelaComissao;

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
                    fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                    fixedTwo(data.content.values[i].cpValorReferenciaComissao),
                    fifty,
                    data.content.values[i].cpTipoVenda,
                    data.content.values[i].slStatusUnidade || "",
                    data.content.values[i].cpValorPagoAteMomento || "",
                    val2,
                    data.content.values[i].cpValor2ParcelaComissao,
                    val1,
                    val4,
                    bonus,
                    deMin,
                    deMax,
                    data.content.values[i].cpValordeDistrato,
                    data.content.values[i].cpValorTotalDeComissao,
                    nf,
                    nf2,
                    nf3,
                    nf4,
                    nf5,
                    data.content.values[i].cp1ValorGerado,
                    dtFechamentoPeriodo,
                    data.content.values[i].cp1ValorPagoCliente,
                    dtBaixaRecebimento,
                    dtChaves,
                    cpDate1ParcelaComissao,
                    cpDate2ParcelaComissao,
                    dtParcUnic,
                    cpDateBonus,
                    cpDateComBRZ,
                    cpDateDemandaMin,
                    cpDateDemandaMax,
                    cpDateDistrato,
                ]);

                arr.push(data.content.values[i].documentid);
                x++;
            } // fim do for
            
            Array.prototype.reverse.apply(dataTableRows);

            DataTableColumns += '</table></div>';

            DataTableColumns = DataTableColumns.replace('undefined', '');
            
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
                { title: "Data de Calculo de 1\&ordf\; Parcela"},
                { title: "Data de Calculo de 2\&ordf\; Parcela"},
                { title: "Data de Calculo de Parcela Única"},
                { title: "Data de Calculo de Prêmio"},
                { title: "Data de Calculo de Comissão BRZ"},
                { title: "Data de Calculo de Demanda Min."},
                { title: "Data de Calculo de Demanda Max."},
                { title: "Data de Calculo de Distrato"},
              ];

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

            $('#tableGeral tbody tr td:nth-child(11), #tableGeral tbody tr td:nth-child(12), #tableGeral tbody tr td:nth-child(16), #tableGeral tbody tr td:nth-child(17), #tableGeral tbody tr td:nth-child(18), #tableGeral tbody tr td:nth-child(19), #tableGeral tbody tr td:nth-child(20), #tableGeral tbody tr td:nth-child(21), #tableGeral tbody tr td:nth-child(22), #tableGeral tbody tr td:nth-child(23), #tableGeral tbody tr td:nth-child(24), #tableGeral tbody tr td:nth-child(25), #tableGeral tbody tr td:nth-child(31), #tableGeral tbody tr td:nth-child(33)').each(function(){
                var valLiq = $(this).text().trim();

                if(valLiq == null || valLiq == "null" || valLiq == "0") $(this).text("");

                if(valLiq != "Processando" && valLiq){
                    valLiq = parseFloat(valLiq).toFixed(2);
                    $(this).text(valLiq);
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
                },  
                buttons: [
                    {
                        extend: 'excelHtml5',
                        customize: function( xlsx, i , a) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];
                            $('row:not(:first-child):not(:nth-child(2)) c[s="63"] v', sheet).mask('##0.00', { reverse: true });
                            $('row c[s="63"]', sheet).removeAttr("s").attr("s", "64");
                        },
                    },
                ],
            });


            $("#tableGeral_wrapper .dt-buttons, #tableGeral_filter").appendTo("#Cube_filter");
            $("#tableGeral_info, #tableGeral_paginate").appendTo("#Cube_pag");
            $("#tableGeral_filter, #tableGeral_paginate").addClass("pull-right");
            $("#tableGeral_info").addClass("pull-left");
            $("#tableGeral_filter input").attr("placeholder", "Filtro");
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
                    "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
                        "_field": "cpNomeImobiliaria", //name of the field used in the constraint 
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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
                        fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                        fixedTwo(data.content.values[i].cpValorReferenciaComissao),
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
                        fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                        fixedTwo(data.content.values[i].cpValorReferenciaComissao),
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
                    var val1 = $(this).find("td:nth-child(14)").text().trim();

                    if(val1 != NaN && val1 != "NaN" && val1 != undefined && val1 != "undefined" && val1 != "" && val1 != " " && val1 != "Processando"){
                        a.push(val1);
                    }
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

                var distrato = reduce(arrDist);
                    distrato = distrato.toFixed(2);

                var total    = reduce(a);
                    total    = total.toFixed(2);

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
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
                            fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                            fixedTwo(data.content.values[i].cpValorReferenciaComissao)
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
                            fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                            fixedTwo(data.content.values[i].cpValorReferenciaComissao)
                        ]);
                    }


                    var distrato = data.content.values[i].cpValorDistrato || 0;
                    var total    = fixedTwo(data.content.values[i].cpValorLiquidoVenda);




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
                            fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                            fixedTwo(data.content.values[i].cpValorReferenciaComissao),
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
                            fixedTwo(data.content.values[i].cpValorLiquidoVenda),
                            fixedTwo(data.content.values[i].cpValorReferenciaComissao)
                        ]);
                    }

                    var distrato = data.content.values[i].cpValorDistrato || 0;
                    var total;

                    (data.content.values[i].cpValorReferenciaComissao) ? total = fixedTwo(data.content.values[i].cpValorReferenciaComissao) : total = fixedTwo(data.content.values[i].cpValorLiquidoVenda);

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

                    console.log("last", last);
                    console.log("lastbutone", lastbutone);

                    if(last == null || last == "null" || last == "0" || last == "" || last == " " || last == "0.00" || last == "NaN" || last == NaN){
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
                if(arrTot.length > 0 ){
                    total = reduce(arrTot);
                    total = total.toFixed(2);
                    $("#TableTotalSuper tbody tr td#rowVendidos, #rowVendidos_fake").text(numeroParaMoeda(total));
                    $("#cpValVendidos").val(total);
                }    
            }
            
            
            $("#TableTotalSuper tbody tr td#rowQtdVendas, #rowQtdVendas_fake").text(count);
            
        }
    });
}

// upperCase - Função deixa o campo input com font uppercase;
function upperCase(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

// consultDB - Função para fazer as consultas no banco de dados. Passa-se a query para o dataset ds_buscaDB e ele traz o retorno do banco de dados;
function consultDB(imob, type){

    var consult, email, saldoDistrato, returnType;

    if(type == "email" || type == "emailreturn"){
        consult  = "SELECT * FROM FLUIG.DBO.FLUIG_IMOBILIARIA_EMAILS WHERE IMOBILIARIA = '"+imob+"'";
    }else if(type == "param"){
        consult  = "SELECT * FROM FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS";
    }else if(type == "mlFluig"){
        consult  = "SELECT * FROM FLUIG.ML0012311";
    }

    if(type == "bruto"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO ORDER BY ID ASC";
    }else if(type == "parc1"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PPARC ORDER BY ID ASC";
    }else if(type == "parc2"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_SPARC ORDER BY ID ASC";
    }else if(type == "parcU"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCU ORDER BY ID ASC";
    }else if(type == "dist"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCD ORDER BY ID ASC";
    }

    if(type == "remove_bruto"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO";
    }else if(type == "remove_parc1"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PPARC";
    }else if(type == "remove_parc2"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_SPARC";
    }else if(type == "remove_parcU"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCU";
    }else if(type == "remove_dist"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCD";
    }else if(type == "remove_dist_saldo"){
        consult = "DELETE FROM FLUIG.DBO.FLUIG_ARMAZENA_DISTR";
    }

    if(type == "distrato"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_ARMAZENA_DISTR WHERE Imobiliaria = '"+imob[0]+"' AND Empreendimento = '"+imob[1]+"' ";
    }else if(type == "distratoConsulta"){
        consult = "SELECT * FROM FLUIG.DBO.FLUIG_ARMAZENA_DISTR";
    }

    if(type == "BRZ_COMISSAO"){
        consult = "SELECT * FROM FLUIG.DBO.BRZ_COMISSAO WHERE NUM_VENDA = '"+imob+"'";
        // consult = "SELECT * FROM FLUIG.DBO.BRZ_COMISSAO WHERE NUM_VENDA = '10362'";
    }

    if(type == "ALTER"){
        consult = "ALTER TABLE FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO ADD NF VARCHAR(255) NULL";
    }


    if(type == "ML"){
        consult  = "SELECT * FROM FLUIG.DBO.ML0012472 WHERE cpDate1ParcelaComissao BETWEEN '2018-11-28' AND '2018-11-28' OR cpDate2ParcelaComissao BETWEEN '2018-11-28' AND '2018-11-28' OR cpDateBonus BETWEEN '2018-11-28' AND '2018-11-28' OR cpDateDemandaMin BETWEEN '2018-11-28' AND '2018-11-28' OR cpDateDemandaMax BETWEEN '2018-11-28' AND '2018-11-28' OR cpDateDistrato BETWEEN '2018-11-28' AND '2018-11-28' AND cpEmpreendimentoCod = '40' AND cpNomeImobiliaria = 'VIK IMÓVEIS' ORDER BY cpNumeroVenda DESC"
    }

    if(type == "distratoCol"){
        consult = "ALTER TABLE FLUIG.DBO.FLUIG_ARMAZENA_DISTR ADD Empreendimento VARCHAR(255) NULL";
    }

    if(type == "banco"){
        consult = "SELECT * FROM FLUIG.DBO.BRZ_COMISSAO WHERE NUM_VENDA = '9447'";
    }

    if(type == "consultType"){
        consult  = "SELECT * FROM FLUIG.DBO.ML0012472 WHERE documentid = '"+imob+"'";
    }

    if(type == "removeForm"){
        consult = "DELETE FROM FLUIG.DBO.ML0012472";
    }

    if(type == "consultSale"){
        consult = "SELECT * FROM FLUIG.DBO.BRZ_COMISSAO WHERE DATAVENDA BETWEEN '2019-02-05' AND '2019-02-06' ORDER BY DATAVENDA DESC"
    }
    if(type == "consultSaleDs"){
        consult = "SELECT * FROM FLUIG.DBO.ML0012472 ORDER BY cpNumeroVenda DESC"
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

        if(type == "emailreturn"){

            if(data.content.values.length > 0 && data.content.values[0].IMOBILIARIA == imob){
                email = data.content.values[0].EMAIL;
            }else{
                FLUIGC.message.alert({
                    message: 'Imobiliária não tem email cadastrado. Favor cadastrar email na "CONFIGURAÇÕES" e tentar novamente.',
                    title: 'Erro',
                    label: 'OK'
                });                   
            }
        }

        if(type == "param"){
            if(data.content.values.length > 0){
                $("#cpParameters1Parcela").val(data.content.values[0].PRIMPARCELA);
                $("#cpParameters2Parcela").val(data.content.values[0].SEGPARCELA);
                $("#cpParametersParcelaUnica").val(data.content.values[0].PARCELAUNICA);
                $("#cpParametersDemandaMin").val(data.content.values[0].DEMANDAMIN);
                $("#cpParametersDemandaMax").val(data.content.values[0].DEMANDAMAX);
            } 
        }

        if(type == "mlFluig"){
            for(i=0; i<data.content.values.length; i++){
                console.log("numero venda", data.content.values[i].cpNumeroVenda);
            }
        }

        if(type == "bruto"){
            for(i=0; i<data.content.values.length; i++){
                console.log("ID", data.content.values[i].ID);
                console.log("PeriodoIni", data.content.values[i].PeriodoIni);
                console.log("PeriodoFin", data.content.values[i].PeriodoFin);
                console.log("Imobiliaria", data.content.values[i].Imobiliaria);
                console.log("Empreendimento", data.content.values[i].Empreendimento);
                console.log("ValorBruto", data.content.values[i].ValorBruto);
                console.log("Desconto", data.content.values[i].Desconto);
                console.log("Despesas", data.content.values[i].Despesas);
                console.log("ValorNF", data.content.values[i].ValorNF);
                console.log("ValorNF", data.content.values[i].DocumentID);
            }
        }
        if(type == "parc1"){
            for(i=0; i<data.content.values.length; i++){
                console.log("ID", data.content.values[i].ID);
                console.log("DataVenda", data.content.values[i].DataVenda);
                console.log("NumVenda", data.content.values[i].NumVenda);
                console.log("Empreendimento", data.content.values[i].Empreendimento);
                console.log("Bloco", data.content.values[i].Bloco);
                console.log("Unidade", data.content.values[i].Unidade);
                console.log("NomeCliente", data.content.values[i].NomeCliente);
                console.log("NomeImobiliaria", data.content.values[i].NomeImobiliaria);
                console.log("NomeCorretor", data.content.values[i].NomeCorretor);
                console.log("TipoVenda", data.content.values[i].TipoVenda);
                console.log("ValorBase", data.content.values[i].ValorBase);
                console.log("ValorPriParcCom", data.content.values[i].ValorPriParcCom);
                console.log("ValorParcBoni", data.content.values[i].ValorParcBoni);
                console.log("TotalComissao", data.content.values[i].TotalComissao);
                console.log("TotalBonificacao", data.content.values[i].TotalBonificacao);
            }
        }
        if(type == "parc2"){
            for(i=0; i<data.content.values.length; i++){
                console.log("ID", data.content.values[i].ID);
                console.log("DataVenda", data.content.values[i].DataVenda);
                console.log("DataAgregacao", data.content.values[i].DataAgregacao);
                console.log("NumVenda", data.content.values[i].NumVenda);
                console.log("Empreendimento", data.content.values[i].Empreendimento);
                console.log("Bloco", data.content.values[i].Bloco);
                console.log("Unidade", data.content.values[i].Unidade);
                console.log("NomeCliente", data.content.values[i].NomeCliente);
                console.log("NomeImobiliaria", data.content.values[i].NomeImobiliaria);
                console.log("NomeCorretor", data.content.values[i].NomeCorretor);
                console.log("TipoVenda", data.content.values[i].TipoVenda);
                console.log("ValorBase", data.content.values[i].ValorBase);
                console.log("ValorSegParcCom", data.content.values[i].ValorSegParcCom);
                console.log("ValorParcDemMin", data.content.values[i].ValorParcDemMin);
                console.log("ValorParcDemMax", data.content.values[i].ValorParcDemMax);
                console.log("ValorParcBoni", data.content.values[i].ValorParcBoni);
                console.log("TotalComissao", data.content.values[i].TotalComissao);
                console.log("TotalParcDemMin", data.content.values[i].TotalParcDemMin);
                console.log("TotalParcDemMax", data.content.values[i].TotalParcDemMax);
                console.log("TotalBonificacao", data.content.values[i].TotalBonificacao);
            }
        }
        if(type == "parcU"){
            for(i=0; i<data.content.values.length; i++){
                console.log("ID", data.content.values[i].ID);
                console.log("DataVenda", data.content.values[i].DataVenda);
                console.log("DataAgregacao", data.content.values[i].DataAgregacao);
                console.log("NumVenda", data.content.values[i].NumVenda);
                console.log("Empreendimento", data.content.values[i].Empreendimento);
                console.log("Bloco", data.content.values[i].Bloco);
                console.log("Unidade", data.content.values[i].Unidade);
                console.log("NomeCliente", data.content.values[i].NomeCliente);
                console.log("NomeImobiliaria", data.content.values[i].NomeImobiliaria);
                console.log("NomeCorretor", data.content.values[i].NomeCorretor);
                console.log("TipoVenda", data.content.values[i].TipoVenda);
                console.log("ValorBase", data.content.values[i].ValorBase);
                console.log("ValorParcUnicCom", data.content.values[i].ValorParcUnicCom);
                console.log("ValorParcDemMin", data.content.values[i].ValorParcDemMin);
                console.log("ValorParcDemMax", data.content.values[i].ValorParcDemMax);
                console.log("ValorParcBoni", data.content.values[i].ValorParcBoni);
                console.log("TotalComissao", data.content.values[i].TotalComissao);
                console.log("TotalParcDemMin", data.content.values[i].TotalParcDemMin);
                console.log("TotalParcDemMax", data.content.values[i].TotalParcDemMax);
                console.log("TotalBonificacao", data.content.values[i].TotalBonificacao);
            }
        }
        if(type == "dist"){
            for(i=0; i<data.content.values.length; i++){
                console.log("ID", data.content.values[i].ID);
                console.log("DataVenda", data.content.values[i].DataVenda);
                console.log("NumVenda", data.content.values[i].NumVenda);
                console.log("Empreendimento", data.content.values[i].Empreendimento);
                console.log("Bloco", data.content.values[i].Bloco);
                console.log("Unidade", data.content.values[i].Unidade);
                console.log("NomeCliente", data.content.values[i].NomeCliente);
                console.log("NomeImobiliaria", data.content.values[i].NomeImobiliaria);
                console.log("NomeCorretor", data.content.values[i].NomeCorretor);
                console.log("TipoVenda", data.content.values[i].TipoVenda);
                console.log("NotaFiscal", data.content.values[i].NotaFiscal);
                console.log("ValorDistrato", data.content.values[i].ValorDistrato);
                console.log("TotalDistrato", data.content.values[i].TotalDistrato);
            }
        }
        if(type == "distrato"){
            for(i=0; i<data.content.values.length; i++){
                saldoDistrato = data.content.values[i].SaldoDistrato;
                console.log(data.content.values[i].Imobiliaria ,'-', data.content.values[i].Empreendimento ,'-',saldoDistrato);
            }
        }

        if(type == "distratoConsulta"){
            for(i=0; i<data.content.values.length; i++){
                console.log(data.content.values[i].Imobiliaria,'-', data.content.values[i].SaldoDistrato, "-", data.content.values[i].Empreendimento);
            }
        }
        

        if(type == "BRZ_COMISSAO"){
            for(i=0; i<data.content.values.length; i++){
                console.log("NUM_VENDA", data.content.values[i].NUM_VENDA);
                console.log("EMPRRENDIMENTO", data.content.values[i].EMPRRENDIMENTO);
                console.log("COD_PESS_EMPR", data.content.values[i].COD_PESS_EMPR);
                console.log("BLOCO", data.content.values[i].BLOCO);
                console.log("APARTAMENTO", data.content.values[i].APARTAMENTO);
                console.log("DATAVENDA", data.content.values[i].DATAVENDA);
                console.log("CLIENTE", data.content.values[i].CLIENTE);
                console.log("IMOBILIARIA", data.content.values[i].IMOBILIARIA);
                console.log("CORRETOR", data.content.values[i].CORRETOR);
                console.log("VALORVENDA", data.content.values[i].VALORVENDA);
                console.log("COD_COMPN", data.content.values[i].COD_COMPN);
                console.log("COMPONENTE", data.content.values[i].COMPONENTE);
                console.log("SITUACAOCONTRATO", data.content.values[i].SITUACAOCONTRATO);
                console.log("VALORREFCOMISSAO", data.content.values[i].VALORREFCOMISSAO);
                console.log("EFIFTY", data.content.values[i].EFIFTY);
                console.log("VALORBAIXADO", data.content.values[i].VALORBAIXADO);
                console.log("VALORPRIMVENCIMENTO", data.content.values[i].VALORPRIMVENCIMENTO);
                console.log("VALORPRIMPAGAMENTO", data.content.values[i].VALORPRIMPAGAMENTO);
                console.log("DATAENTREGAAP", data.content.values[i].DATAENTREGAAP);
            }
        }

        if(type == "ML"){
            console.log(data.content.values.length);
            for(i=0; i<data.content.values.length; i++){
                console.log("cpNumeroVenda", data.content.values[i].cpNumeroVenda);
                console.log("cpNomeImobiliaria", data.content.values[i].cpNomeImobiliaria);
                console.log("cpEmpreendimento", data.content.values[i].cpEmpreendimento);
            }
        }

        if(type == "banco"){
            for(i=0; i<data.content.values.length; i++){
                console.log("NUM_VENDA", data.content.values[i].NUM_VENDA, " / DATAAGREGACAO", data.content.values[i].DATAAGREGACAO);
            }
        }

        if(type == "consultType"){
            returnType = data.content.values[0].slStatusUnidade;
        }

        if(type == "consultSale"){
            console.log("length", data.content.values.length);
            var id = '';
            if(id.indexOf(id))
            for(i=0; i<data.content.values.length; i++){
                id = data.content.values[i].NUM_VENDA;
                console.log("NUM_VENDA", data.content.values[i].NUM_VENDA, " / DATAVENDA", data.content.values[i].DATAVENDA);
            }
        }
        if(type == "consultSaleDs"){
            console.log("length", data.content.values.length);
            var id = '';
            // if(id.indexOf())
            for(i=0; i<data.content.values.length; i++){
                console.log("cpNumeroVenda", data.content.values[i].cpNumeroVenda, " / dtVenda", data.content.values[i].dtVenda, ' / version', data.content.values[i].version );
            }
        }

      }
    }); 

    if(type == "emailreturn") return email;
    if(type == "distrato")    return saldoDistrato;
    if(type == "consultType") return returnType;
}

// grava as informacoes passadas no form
function updateFields(field1, field2, field3, field4, documentid, type, field5){

    // field1 valor da porcentagem da bonificacao do formulário
    // field2 aprovacao da bonificacao

    var constraints = new Array();

    var companyId = DatasetFactory.createConstraint("companyId", 1, 1, ConstraintType.MUST);
    var user      = DatasetFactory.createConstraint("user", "dkpadmin", "dkpadmin", ConstraintType.MUST);
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
      var date       = DatasetFactory.createConstraint("field", "cpDateBonus", todayDate(), ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(percent);
      constraints.push(aprovacao);
      constraints.push(date);
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
      var NFBon   = DatasetFactory.createConstraint("field", "cpNFParcelaBonificacaoFake", field1, ConstraintType.MUST);
      var NFDMin  = DatasetFactory.createConstraint("field", "cpNFParcelaDemandaMinimaFake", field1, ConstraintType.MUST);
      var NFDMax  = DatasetFactory.createConstraint("field", "cpNFParceladeMandaMaximaFake", field1, ConstraintType.MUST);

      // campos para atualizar
      constraints.push(formulario);
      constraints.push(NF1);
      constraints.push(NF2);
      constraints.push(NFBon);
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

    var consult  = "SELECT * FROM FLUIG.DBO.FLUIG_IMOBILIARIA_EMAILS ";
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
      url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
            query  = "UPDATE FLUIG.DBO.FLUIG_IMOBILIARIA_EMAILS";
            query += " SET IMOBILIARIA = '"+imob+"', EMAIL = '"+email+"' ";
            query += " WHERE IMOBILIARIA = '"+imob+"' ";
        }else{
            query  = "INSERT INTO FLUIG.DBO.FLUIG_IMOBILIARIA_EMAILS (IMOBILIARIA, EMAIL)";
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
      url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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

    var consult  = "SELECT * FROM FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS ";

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
      url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
            
            query  = "UPDATE FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS";

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
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA, DEMANDAMIN, DEMANDAMAX)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"', '"+val4+"', '"+val5+"')";
            }else if(val1 && val2 && val3 && val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA, DEMANDAMIN)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"', '"+val4+"')";
            }else if(val1 && val2 && val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA, PARCELAUNICA)";
                query += " VALUES ('"+val1+"', '"+val2+"', '"+val3+"')";
            }else if(val1 && val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA, SEGPARCELA)";
                query += " VALUES ('"+val1+"', '"+val2+"')";
            }else if(val1 && !val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PRIMPARCELA)";
                query += " VALUES ('"+val1+"')";
            }else if(!val1 && val2 && !val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (SEGPARCELA)";
                query += " VALUES ('"+val2+"')";
            }else if(!val1 && !val2 && val3 && !val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (PARCELAUNICA)";
                query += " VALUES ('"+val3+"')";
            }else if(!val1 && !val2 && !val3 && val4 && !val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (DEMANDAMIN)";
                query += " VALUES ('"+val4+"')";
            }else if(!val1 && !val2 && !val3 && !val4 && val5){
                query  = "INSERT INTO FLUIG.DBO.FLUIG_PARAMETROS_PERCENTUAIS (DEMANDAMAX)";
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
      url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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

function updateTableConsolidated(obj, type, upd){

    var id, qry, query; 
    var update = false;
    var arrID = [], arrDtIni = [], arrDtFim = [], arrImob = [], arrEmp = [], arrNF = [];

    if(type == "bruto" || type == 'NFConsolidado'){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO ORDER BY ID ASC";
    }else if(type == "parc1"){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PPARC ORDER BY ID ASC";
    }else if(type == "parc2"){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_SPARC ORDER BY ID ASC";
    }else if(type == "parcU"){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCU ORDER BY ID ASC";
    }else if(type == "dist"){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCD ORDER BY ID ASC";
    }else if(type == "dist_saldo"){
        query = "SELECT * FROM FLUIG.DBO.FLUIG_ARMAZENA_DISTR ORDER BY Imobiliaria ASC";
    }

    var data = { 
      "name" : "ds_buscaDB",        //dataset's id 
      "constraints" :[{             //constraints to filter the search, all fields specified inside are required 
            "_field" : "SQL",       //name of the field used in the constraint 
            "_initialValue": query, //value to be filtered 
            "_finalValue" : query,  //final value to be filtered 
            "_type": 1,             //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT) 
            "_likeSearch": false
        }]
    }

    $.ajax({
      method : "POST",
      url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
            var s = 'novo';
            var d = 0;
            var find;

            for(i=0; i<data.content.values.length; i++){
                if(find != 'stop'){
                    for(x=0; x<data.content.values.length; x++){
                        if(data.content.values[x].Imobiliaria && data.content.values[x].Imobiliaria != undefined && data.content.values[x].Imobiliaria != null && find != 'stop'){
                            if(obj.imo == data.content.values[x].Imobiliaria){
                                if(obj.emp == data.content.values[x].Empreendimento){
                                    if(obj.ini == data.content.values[x].PeriodoIni){
                                        if(obj.fim == data.content.values[x].PeriodoFin){
                                            s = 'igual';
                                            d = data.content.values[x].ID;
                                            find = 'stop';
                                        }else{
                                            s = 'diferentes';    
                                        }
                                    }else{
                                        s = 'diferentes';    
                                    }
                                }else if(obj.emp != data.content.values[x].Empreendimento){
                                    s = 'diferentes';
                                }else if(obj.ini != data.content.values[x].PeriodoIni){
                                    s = 'diferentes';
                                }else if(obj.fim != data.content.values[x].PeriodoFin){
                                    s = 'diferentes';
                                }
                            }else{
                                s = 'diferentes';
                            }
                        }
                    }
                    arrID.push(data.content.values[i].ID);
                }
            }

            var st;
            if(s == 'diferentes'){
                var c = arrID.reverse();
                id = parseInt(c[0]) + 1;
                st = true;
            }else if(s == 'igual'){
                id = d;
                st = false;
            }else if(s == 'novo'){
                id = 1;
                st = true;
            }

            if(st){
                qry  = " INSERT INTO FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO  (ID, PeriodoIni, PeriodoFin, Imobiliaria, Empreendimento, ValorBruto, Desconto, Despesas, ValorNF, DocumentID)";
                qry += " VALUES("+id+", '"+obj.ini+"', '"+obj.fim+"', '"+obj.imo+"', '"+obj.emp+"', '"+obj.vbrt+"', '"+obj.desc+"', '"+obj.desp+"', '"+obj.vnf+"', '"+obj.did+"')";

            }else{
                qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO";
                qry += " SET PeriodoIni = '"+obj.ini+"', PeriodoFin = '"+obj.fim+"', Imobiliaria = '"+obj.imo+"', Empreendimento = '"+obj.emp+"', ValorBruto = '"+obj.vbrt+"', Desconto = '"+obj.desc+"', Despesas = '"+obj.desp+"', ValorNF = '"+obj.vnf+"', DocumentID = '"+obj.did+"'";
                qry += " WHERE ID= '"+arrID[0]+"'";
                update = true;
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
              url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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

        } // fim if type == bruto
        if(type == "parc1"){

            for(i=0; i<Object.keys(obj["Bl"]).length; i++){

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

                if(!upd){
                    qry  = " INSERT INTO FLUIG.DBO.FLUIG_CONSOLIDADOS_PPARC  (ID, DataVenda, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorPriParcCom, ValorParcBoni, TotalComissao, TotalBonificacao)";
                    qry += " VALUES("+obj.ID+", '"+obj.DtVenda[i]+"', '"+obj.NuVenda[i]+"', '"+obj.Emp[i]+"', '"+obj.Bl[i]+"', '"+obj.Uni[i]+"', '"+obj.NmCliente[i]+"', '"+obj.NmImob[i]+"', '"+obj.NmCorretor[i]+"', '"+obj.TpVenda[i]+"', '"+obj.VlBase[i]+"', '"+obj.VlPriParcCom[i]+"', '"+obj.VlParcBoni[i]+"', '"+obj.TotComissao+"', '"+obj.TotBonificacao+"')";
                }else{
                    qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_PPARC";
                    qry += " SET  DataVenda = '"+obj.DtVenda[i]+"', NumVenda = '"+obj.NuVenda[i]+"', Empreendimento = '"+obj.Emp[i]+"', Bloco = '"+obj.Bl[i]+"', Unidade = '"+obj.Uni[i]+"', NomeCliente = '"+obj.NmCliente[i]+"', NomeImobiliaria = '"+obj.NmImob[i]+"', NomeCorretor = '"+obj.NmCorretor[i]+"', TipoVenda = '"+obj.TpVenda[i]+"', ValorBase = '"+obj.VlBase[i]+"', ValorPriParcCom = '"+obj.VlPriParcCom[i]+"', ValorParcBoni = '"+obj.VlParcBoni[i]+"', TotalComissao = '"+obj.TotComissao+"', TotalBonificacao = '"+obj.TotBonificacao+"'";
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
                  url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        }// fim if type == parc1

        if(type == "parc2"){

            for(i=0; i<Object.keys(obj["Bloco"]).length; i++){

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
                if(!obj.ValorSegParcCom[i]) obj.ValorSegParcCom[i] = null;
                if(!obj.DemandaMin[i])      obj.DemandaMin[i]      = null;
                if(!obj.DemandaMax[i])      obj.DemandaMax[i]      = null;
                if(!obj.ValorParcBoni[i])   obj.ValorParcBoni[i]   = null;
            
                if(!upd){
                    qry  = " INSERT INTO FLUIG.DBO.FLUIG_CONSOLIDADOS_SPARC  (ID, DataVenda, DataAgregacao, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorSegParcCom, ValorParcDemMin, ValorParcDemMax, ValorParcBoni, TotalComissao, TotalParcDemMin, TotalParcDemMax, TotalBonificacao)"; 
                    qry += " VALUES("+obj.ID+", '"+obj.DataVenda[i]+"', '"+obj.DtVendaAg[i]+"', '"+obj.NumVenda[i]+"', '"+obj.Empreendimento[i]+"', '"+obj.Bloco[i]+"', '"+obj.Unidade[i]+"', '"+obj.NomeCliente[i]+"', '"+obj.Imobiliaria[i]+"', '"+obj.NomeCorretor[i]+"', '"+obj.TipoVenda[i]+"', '"+obj.ValorBase[i]+"', '"+obj.ValorSegParcCom[i]+"', '"+obj.DemandaMin[i]+"', '"+obj.DemandaMax[i]+"', '"+obj.ValorParcBoni[i]+"' , '"+obj.ValorParcBoni[i]+"', '"+obj.TotalComissao+"', '"+obj.TotalParcDemMin+"', '"+obj.TotalParcDemMax+"' , '"+obj.TotalBonificacao+"')";
                }else{
                    qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_SPARC";
                    qry += " SET DataVenda = '"+obj.DataVenda[i]+"', DataAgregacao = '"+obj.DtVendaAg[i]+"', NumVenda = '"+obj.NumVenda[i]+"', Empreendimento = '"+obj.Empreendimento[i]+"', Bloco = '"+obj.Bloco[i]+"', Unidade = '"+obj.Unidade[i]+"', NomeCliente = '"+obj.NomeCliente[i]+"', NomeImobiliaria = '"+obj.Imobiliaria[i]+"', NomeCorretor = '"+obj.NomeCorretor[i]+"', TipoVenda = '"+obj.TipoVenda[i]+"', ValorBase = '"+obj.ValorBase[i]+"', ValorSegParcCom = '"+obj.ValorSegParcCom[i]+"', ValorParcDemMin = '"+obj.DemandaMin[i]+"', ValorParcDemMax = '"+obj.DemandaMax[i]+"', ValorParcBoni = '"+obj.ValorParcBoni[i]+"', TotalComissao = '"+obj.TotalComissao+"', TotalParcDemMin = '"+obj.TotalParcDemMin+"', TotalParcDemMax = '"+obj.TotalParcDemMax+"', TotalBonificacao = '"+obj.TotalBonificacao+"'"; 
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
                  url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        }// fim if type == parc2

        if(type == "parcU"){

            for(i=0; i<Object.keys(obj["Bloco"]).length; i++){

                if(!obj.DataVenda[i])        obj.DataVenda[i]        = null;
                if(!obj.DtVendaAg[i])        obj.DtVendaAg[i]        = null;
                if(!obj.NumVenda[i])         obj.NumVenda[i]         = null;
                if(!obj.Empreendimento[i])   obj.Empreendimento[i]   = null;
                if(!obj.Bloco[i])            obj.Bloco[i]            = null;
                if(!obj.Unidade[i])          obj.Unidade[i]          = null;
                if(!obj.NomeCliente[i])      obj.NomeCliente[i]      = null;
                if(!obj.Imobiliaria[i])      obj.Imobiliaria[i]      = null;
                if(!obj.NomeCorretor[i])     obj.NomeCorretor[i]     = null;
                if(!obj.TipoVenda[i])        obj.TipoVenda[i]        = null;
                if(!obj.ValorBase[i])        obj.ValorBase[i]        = null;
                if(!obj.ValorPriParcCom[i])  obj.ValorPriParcCom[i]  = null;
                if(!obj.DemandaMin[i])       obj.DemandaMin[i]       = null;
                if(!obj.DemandaMax[i])       obj.DemandaMax[i]       = null;
                if(!obj.ValorParcBoni[i])    obj.ValorParcBoni[i]    = null;
                if(!obj.TotalComissao)       obj.TotalComissao       = null;
                if(!obj.TotalParcDemMin)     obj.TotalParcDemMin     = null;
                if(!obj.TotalParcDemMax)     obj.TotalParcDemMax     = null;
                if(!obj.TotalBonificacao)    obj.TotalBonificacao    = null;
            
                if(!upd){
                    qry  = " INSERT INTO FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCU  (ID, DataVenda, DataAgregacao, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, ValorBase, ValorParcUnicCom, ValorParcDemMin, ValorParcDemMax, ValorParcBoni, TotalComissao, TotalParcDemMin, TotalParcDemMax, TotalBonificaca)";
                    qry += " VALUES("+obj.ID+", '"+obj.DataVenda[i]+"', '"+obj.DtVendaAg[i]+"', '"+obj.NumVenda[i]+"', '"+obj.Empreendimento[i]+"', '"+obj.Bloco[i]+"', '"+obj.Unidade[i]+"', '"+obj.NomeCliente[i]+"', '"+obj.Imobiliaria[i]+"', '"+obj.NomeCorretor[i]+"', '"+obj.TipoVenda[i]+"', '"+obj.ValorBase[i]+"', '"+obj.ValorPriParcCom[i]+"', '"+obj.DemandaMin[i]+"', '"+obj.DemandaMax[i]+"', '"+obj.ValorParcBoni[i]+"', '"+obj.TotalComissao+"', '"+obj.TotalParcDemMin+"', '"+obj.TotalParcDemMax+"', '"+obj.TotalBonificacao+"')";
                }else{
                    qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCU";
                    qry += " SET DataVenda = '"+obj.DataVenda[i]+"', DataAgregacao = '"+obj.DtVendaAg[i]+"', NumVenda = '"+obj.NumVenda[i]+"', Empreendimento = '"+obj.Empreendimento[i]+"', Bloco = '"+obj.Bloco[i]+"', Unidade = '"+obj.Unidade[i]+"', NomeCliente = '"+obj.NomeCliente[i]+"', NomeImobiliaria = '"+obj.Imobiliaria[i]+"', NomeCorretor = '"+obj.NomeCorretor[i]+"', TipoVenda = '"+obj.TipoVenda[i]+"', ValorBase = '"+obj.ValorBase[i]+"', ValorSegParcCom = '"+obj.ValorPriParcCom[i]+"', ValorParcDemMin = '"+obj.DemandaMin[i]+"', ValorParcDemMax = '"+obj.DemandaMax[i]+"', ValorParcBoni = '"+obj.ValorParcBoni[i]+"', TotalComissao = '"+obj.TotalComissao+"', TotalParcDemMin = '"+obj.TotalParcDemMin+"', TotalParcDemMax = '"+obj.TotalParcDemMax+"', TotalBonificaca = '"+obj.TotalBonificacao+"'"; 
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
                  url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        }// fim if type == parcU

        if(type == "dist"){

            for(i=0; i<Object.keys(obj["Bloco"]).length; i++){

                if(!obj.DataVenda[i])        obj.DataVenda[i]        = null;
                if(!obj.NumVenda[i])         obj.NumVenda[i]         = null;
                if(!obj.Empreendimento[i])   obj.Empreendimento[i]   = null;
                if(!obj.Bloco[i])            obj.Bloco[i]            = null;
                if(!obj.Unidade[i])          obj.Unidade[i]          = null;
                if(!obj.NomeCliente[i])      obj.NomeCliente[i]      = null;
                if(!obj.NomeImobiliaria[i])  obj.NomeImobiliaria[i]  = null;
                if(!obj.NomeCorretor[i])     obj.NomeCorretor[i]     = null;
                if(!obj.TipoVenda[i])        obj.TipoVenda[i]        = null;
                if(!obj.NotaFiscal[i])       obj.NotaFiscal[i]       = null;
                if(!obj.ValorDistrato[i])    obj.ValorDistrato[i]    = null;
                if(!obj.TotalDistrato[i])    obj.TotalDistrato[i]    = null;
            
                if(!upd){
                    qry  = " INSERT INTO FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCD (ID, DataVenda, NumVenda, Empreendimento, Bloco, Unidade, NomeCliente, NomeImobiliaria, NomeCorretor, TipoVenda, NotaFiscal, ValorDistrato, TotalDistrato)";
                    qry += " VALUES("+obj.ID+", '"+obj.DataVenda[i]+"', '"+obj.NumVenda[i]+"', '"+obj.Empreendimento[i]+"', '"+obj.Bloco[i]+"', '"+obj.Unidade[i]+"', '"+obj.NomeCliente[i]+"', '"+obj.NomeImobiliaria[i]+"', '"+obj.NomeCorretor[i]+"', '"+obj.TipoVenda[i]+"', '"+obj.NotaFiscal[i]+"', '"+obj.ValorDistrato[i]+"', '"+obj.TotalDistrato+"')";
                }else{
                    qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_PARCD";
                    qry += " SET DataVenda = '"+obj.DataVenda[i]+"' , NumVenda = '"+obj.NumVenda[i]+"' , Empreendimento = '"+obj.Empreendimento[i]+"' , Bloco = '"+obj.Bloco[i]+"' , Unidade = '"+obj.Unidade[i]+"' , NomeCliente = '"+obj.NomeCliente[i]+"' , NomeImobiliaria = '"+obj.NomeImobiliaria[i]+"' , NomeCorretor = '"+obj.NomeCorretor[i]+"' , TipoVenda = '"+obj.TipoVenda[i]+"' , NotaFiscal = '"+obj.NotaFiscal[i]+"' , ValorDistrato = '"+obj.ValorDistrato[i]+"' , TotalDistrato = '"+obj.TotalDistrato+"'"; 
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
                  url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        }// fim if type == dist

        if(type == "dist_saldo"){

            var st = false;
            for(i=0; i<data.content.values.length; i++){
                if(!st && obj.NomeImobiliaria == data.content.values[i].Imobiliaria && obj.Empreendimento == data.content.values[i].Empreendimento){
                    st = true;
                }   
            }

            if(!obj.NomeImobiliaria) obj.NomeImobiliaria = null;
            if(!obj.Empreendimento)  obj.Empreendimento  = null;
            if(!obj.saldoDistrato)   obj.saldoDistrato   = null;
        
            if(!st){
                qry  = " INSERT INTO FLUIG.DBO.FLUIG_ARMAZENA_DISTR (Imobiliaria, Empreendimento, SaldoDistrato)";
                qry += " VALUES('"+obj.NomeImobiliaria+"', '"+obj.Empreendimento+"', '"+obj.saldoDistrato+"')";
            }else{
                qry  = " UPDATE FLUIG.DBO.FLUIG_ARMAZENA_DISTR SET SaldoDistrato = '"+obj.saldoDistrato+"' WHERE Imobiliaria = '"+obj.NomeImobiliaria+"' AND Empreendimento = '"+obj.Empreendimento+"'";
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
              url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
        }// fim if type == dist


        if(type == 'NFConsolidado'){
            qry  = " UPDATE FLUIG.DBO.FLUIG_CONSOLIDADOS_BRUTO SET NF = '"+obj.NF+"' WHERE ID= '"+obj.ID+"'";
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
              url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
    });

    return [id, update];
}

function processAlert(){
    return '<span class="text-danger">Processando</span> <i class="fa fa-cog fa-spin fa-fw margin-bottom"></i>';
}

function reduce(array){
    return array.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
}

function reduce2(array){
    return array.reduce((a,b) => (a) + (b), 0);
}

function fixedTwo(value){
    return parseFloat(value).toFixed(2);
}
function todayDate(){
    var nd = new Date();
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();

    if (d.toString().length == 1) d = "0" + d;
    if (m.toString().length == 1) m = "0" + m;

    var date = y + "-" + m + "-" + d;
    return date;
}


function returnNextSinc(){

    console.log("ENTROU NA FUNCTION");

 var dados2 = {
        "name": "ds_statusJobs",
        "fields": null
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
             
        $.each(model.content.values, function(index, value){

            var testeData = converteData(value.NEXT_FIRE_TIME);

            console.log("teste = "+ testeData);

            var horas    =  new Date(testeData).getHours();
            var minutes  =  new Date(testeData).getMinutes();
            var seconds  =  new Date(testeData).getSeconds(); 
            var dia      =  new Date(testeData).getDate();
            var mes      =  new Date(testeData).getMonth();


            if (mes == 0) {
                mes = "Janeiro";
            }else if(mes == 1){
                mes = "Fevereiro";
            }else if(mes == 2){
                mes = "Março";
            }else if(mes == 3){
                mes = "Abril";
            }else if(mes == 4){
                mes = "Maio";
            }else if(mes == 5){
                mes = "Junho";
            }else if(mes == 6){
                mes = "Julho";
            }else if(mes == 7){
                mes = "Agosto";
            }else if(mes == 8){
                mes = "Setembro";
            }else if(mes == 9){
                mes = "Outubro";
            }else if(mes == 10){
                mes = "Novembro";
            } else if(mes == 11){
                mes = "Dezembro";
            }  


            if (seconds == 0) {
                seconds = "00";
            }else if(seconds == 1){
                seconds = "01";
            }else if(seconds == 2){
                seconds = "02";
            }else if(seconds == 3){
                seconds = "03";
            }else if(seconds == 4){
                seconds = "04";
            }else if(seconds == 5){
                seconds = "05";
            }else if(seconds == 6){
                seconds = "06";
            }else if(seconds == 7){
                seconds = "07";
            }else if(seconds == 8){
                seconds = "08";
            }else if(seconds == 9){
                seconds = "09";
            } 

            if (minutes == 0) {
                minutes = "00";
            }else if(minutes == 1){
                minutes = "01";
            }else if(minutes == 2){
                minutes = "02";
            }else if(minutes == 3){
                minutes = "03";
            }else if(minutes == 4){
                minutes = "04";
            }else if(minutes == 5){
                minutes = "05";
            }else if(minutes == 6){
                minutes = "06";
            }else if(minutes == 7){
                minutes = "07";
            }else if(minutes == 8){
                minutes = "08";
            }else if(minutes == 9){
                minutes = "09";
            } 

            if (horas == 0) {
                horas = "00";
            }else if(horas == 1){
                horas = "01";
            }else if(horas == 2){
                horas = "02";
            }else if(horas == 3){
                horas = "03";
            }else if(horas == 4){
                horas = "04";
            }else if(horas == 5){
                horas = "05";
            }else if(horas == 6){
                horas = "06";
            }else if(horas == 7){
                horas = "07";
            }else if(horas == 8){
                horas = "08";
            }else if(horas == 9){
                horas = "09";
            }             

               
            $("#proxSinc").text("Próxima sincronização dia "+dia+ " de " +mes+ " às " +horas+":"+minutes+":"+seconds);


            var horaCompleta = horas+":"+minutes+":"+seconds;
            $("#horaSinc").val(horaCompleta);

        });

       
     }
    }); 



}

function returnNextMovto(){

    console.log("ENTROU NA FUNCTION");

 var dados2 = {
        "name": "ds_Status_Bpm",
        "fields": null
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
             
        $.each(model.content.values, function(index, value){

            var testeData = converteData(value.NEXT_FIRE_TIME);

            console.log("teste = "+ testeData);

            var horas    =  new Date(testeData).getHours();
            var minutes  =  new Date(testeData).getMinutes();
            var seconds  =  new Date(testeData).getSeconds(); 
            var dia      =  new Date(testeData).getDate();
            var mes      =  new Date(testeData).getMonth();


            if (mes == 0) {
                mes = "Janeiro";
            }else if(mes == 1){
                mes = "Fevereiro";
            }else if(mes == 2){
                mes = "Março";
            }else if(mes == 3){
                mes = "Abril";
            }else if(mes == 4){
                mes = "Maio";
            }else if(mes == 5){
                mes = "Junho";
            }else if(mes == 6){
                mes = "Julho";
            }else if(mes == 7){
                mes = "Agosto";
            }else if(mes == 8){
                mes = "Setembro";
            }else if(mes == 9){
                mes = "Outubro";
            }else if(mes == 10){
                mes = "Novembro";
            } else if(mes == 11){
                mes = "Dezembro";
            }  


            if (seconds == 0) {
                seconds = "00";
            }else if(seconds == 1){
                seconds = "01";
            }else if(seconds == 2){
                seconds = "02";
            }else if(seconds == 3){
                seconds = "03";
            }else if(seconds == 4){
                seconds = "04";
            }else if(seconds == 5){
                seconds = "05";
            }else if(seconds == 6){
                seconds = "06";
            }else if(seconds == 7){
                seconds = "07";
            }else if(seconds == 8){
                seconds = "08";
            }else if(seconds == 9){
                seconds = "09";
            } 

            if (minutes == 0) {
                minutes = "00";
            }else if(minutes == 1){
                minutes = "01";
            }else if(minutes == 2){
                minutes = "02";
            }else if(minutes == 3){
                minutes = "03";
            }else if(minutes == 4){
                minutes = "04";
            }else if(minutes == 5){
                minutes = "05";
            }else if(minutes == 6){
                minutes = "06";
            }else if(minutes == 7){
                minutes = "07";
            }else if(minutes == 8){
                minutes = "08";
            }else if(minutes == 9){
                minutes = "09";
            } 

            if (horas == 0) {
                horas = "00";
            }else if(horas == 1){
                horas = "01";
            }else if(horas == 2){
                horas = "02";
            }else if(horas == 3){
                horas = "03";
            }else if(horas == 4){
                horas = "04";
            }else if(horas == 5){
                horas = "05";
            }else if(horas == 6){
                horas = "06";
            }else if(horas == 7){
                horas = "07";
            }else if(horas == 8){
                horas = "08";
            }else if(horas == 9){
                horas = "09";
            }             

               
            $("#proxMovto").text("Próxima movimentação dia "+dia+ " de " +mes+ " às " +horas+":"+minutes+":"+seconds);


            var horaMovCompleta = horas+":"+minutes+":"+seconds;
            $("#horaMovto").val(horaMovCompleta);

        });

       
     }
    }); 
}


function logSincronizacao(){

 var htmlAux = "";

 var dados2 = {
        "name": "ds_buscaSinc",
        "fields": null,
        "constraints": [
            {
                "_field": null,
                "_initialValue": null,
                "_finalValue": null,
                "_type": 1
            }        ]
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
             

        var table = $("#table-history").DataTable();
        var modelDate = [];

        var horaProxSinc = $("#horaSinc").val().split(':');
      
        console.log("Horas = "+horaProxSinc[0] + "Minutos = "+ horaProxSinc[1]);        

        $.each(model.content.values, function(index, value){

            var dds_descrição;
            var dds_usuario = value.USUARIO; 

            var dds_item = "Sincronização de vendas";              
            var dataBanco = value.DATA_INICIO;
            var aux = dataBanco.split("-");
            var hora = value.HORA_INICIO;
            var dataFull = aux[2]+"/"+aux[1]+"/"+aux[0];
            var horaFim = value.HORA_FIM;

            var horaBanco = hora.split(':');
                                               
            var vendas = value.VENDAS;

            var minutosTolMax = parseInt(horaProxSinc[1]) + 15;

            var minutosTolMin = parseInt(horaProxSinc[1]) - 15;

            console.log("Minutos tolerância = "+ minutosTolMax)

            if (horaBanco[0] > horaProxSinc[0] || horaBanco[0] < horaProxSinc[0] || horaBanco[1] >=  minutosTolMax || horaBanco[1] <= minutosTolMin){

                dds_descrição = "Sincronismo Manual";     
                
            }else{
                dds_descrição = "Automático";    
                
            }

            

            htmlAux += '<tr>';             
            htmlAux += '<td class="col-sm-2">'    +  dds_item      + '</td>' ;      
            htmlAux += '<td class="col-sm-2">'    +  dataFull      + ' | '+ hora+  '</td>';
            htmlAux += '<td class="col-sm-2">'    +  horaFim  + '</td>' ;
            htmlAux += '<td class="col-sm-2">'    +  dds_descrição + '</td>' ;
            htmlAux += '<td class="col-sm-2">'    +  vendas        + '</td>' ; 
            htmlAux += '</tr>';      

         });
    
    

       table.destroy();



     $("#table-history tbody").html(htmlAux);

        $("#table-history").DataTable({
            language: {
                search: "",
                emptyTable: "Não há solicitações com estas informações.",
                info: "Exibir _PAGE_ de _PAGES_"
            }
        }); 
 
    
     }
    }); 
}

function logMovto(){

var htmlAux = "";

var dados2 = {
        "name": "buscaHistoricoMov",
        "fields": null
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

               var table = $("#table-movto").DataTable();
               var horaProxSinc = $("#horaMovto").val().split(':');
            
            
            $.each(model.content.values, function (index, value) {
               
               var item;
               var dataAux      = value.DATA_INICIO;
               var novaDataAux  = dataAux.split("-");
               var fullDate     = novaDataAux[2] + "/" + novaDataAux[1] + "/" + novaDataAux[0];
               
               console.log("Data completa = "+ fullDate);

               var horaInicio   = value.HORA_INICIO;
               var horaFim      = value.HORA_FIM;
               var usuarioAux   = value.USUARIO;
               var tipo;
               var horaBanco = horaInicio.split(':');
               var minutosTolMax = parseInt(horaProxSinc[1]) + 15;
               var minutosTolMin = parseInt(horaProxSinc[1]) - 15;


                if (horaBanco[0] > horaProxSinc[0] || horaBanco[0] < horaProxSinc[0] || horaBanco[1] >=  minutosTolMax || horaBanco[1] <= minutosTolMin){
                    
                    item = "Manual, para todos os Fluxos";
                }else{
                        
                    item = "Movimentação de Fluxo automática";
                }               


               // if (usuarioAux == "dkpadmin") {
               //      tipo = "Automática, todos os Fluxos"
               // }else{
               //      tipo = "Manual, Empreendimento X";
               // }
               var numero_movto = value.MOVIMENTACOES;
               
               
                htmlAux += '<tr>';
                 htmlAux += '<td class="col-sm-2">Movimentação de Fluxo</td>' ;      
                 htmlAux += '<td class="col-sm-2">'    +  fullDate + " as " + horaInicio + '</td>'  ;
                 htmlAux += '<td class="col-sm-2">'+horaFim+'</td>'  ;                     
                 htmlAux += '<td class="col-sm-2">'+item+'</td>';
                 htmlAux += '<td class="col-sm-2">'    +  numero_movto + '</td>' ;
                  
                htmlAux += '</tr>';

                //   Segunda linha informando a última movimentação
    
            });            

var htmlAux2 = "";

var dados3 = {
        "name": "ds_testeDB",
        "fields": null
    };
    $.ajax({
        method: "POST",
        url: "/api/public/ecm/dataset/datasets/",
        data: JSON.stringify(dados3),
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

               var table = $("#table-movto").DataTable();
            
            
            $.each(model.content.values, function (index, value) {
               

    
               var usuario = value.usuario;


              // console.log("Data completa = "+ fullDate);

               var fullDate = value.DATA_MOVIMENTO;
               var empreendimento = value.EMPREENDIMENTO;
               var usuarioAux   = value.USUARIO;
               var horas = value.HORA_MOVIMENTO;

              
                var tipo = "Manual | "+ empreendimento + " | pelo usuário " + usuarioAux;

                console.log("*****************"+ tipo);

               var numero_movto = value.NUM_VENDAS;
               
               
                htmlAux2 += '<tr>';
                 htmlAux2 += '<td class="col-sm-2">Movimentação de Fluxo</td>' ;      
                 htmlAux2 += '<td class="col-sm-2">'    +  fullDate + ' as ' +horas+ '</td>'  ;
                 htmlAux2 += '<td class="col-sm-2">'+horas+'</td>'  ;                     
                 htmlAux2 += '<td class="col-sm-2">'+tipo+'</td>';
                 htmlAux2 += '<td class="col-sm-2">'    +  numero_movto + '</td>' ;
                 
                htmlAux2 += '</tr>';

                //   Segunda linha informando a última movimentação
    
            }); 
        }
    });

            
            table.destroy();
             $("#table-movto tbody").html(htmlAux+htmlAux2);

                $("#table-movto").DataTable({
                    language: {
                        search: "",
                        emptyTable: "Não há solicitações com estas informações.",
                        info: "Exibir _PAGE_ de _PAGES_"
                    }
                }); 
        }
    }); 

}

function converteData(data){

    var serieInt = parseInt(data);     
    var novaData = new Date(serieInt);

    return novaData;

}

// -------------------------------------- NOVA FUNCTION -------------------------------------


function getEmprendimentos2(idSelect) {
    var options;
    var optionsArr = [];
    var optionsCodArr = [];

    var dados = {
        "name": "dsCalculaComissao"
    }

    $.ajax({
        method: "POST",
        url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
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
                    optionsCodArr.push(data.content.values[i].cpEmpreendimento);
                }
            }

            for (i = 0; i < optionsArr.length; i++) {
                options += "<option value='" + optionsCodArr[i] + "'>" + optionsArr[i] + "</option>";
            }

            $("#" + idSelect).html(options);
        }
    });
}

// -------------------------------------- NOVA FUNCTION -------------------------------------


function protoType(){

var empreendimento =  $("#slctEmpreendimento").val();
 
var html = "";
var modelEmpreend = [];
    rest_solicitacoes = [];

var dados2 = {
        "name": "ds_listaEmpreendimento",
        "fields": null,
        "constraints": [
            {
                "_field": "slctEmpreendimento",
                "_initialValue": empreendimento ,
                "_finalValue": empreendimento ,
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
                
            var Db_empreendimento = value.cpEmpreendimento;
                rest_solicitacoes.push(value.num_proces);

            if (modelEmpreend.indexOf(Db_empreendimento) === -1){
                modelEmpreend.push(Db_empreendimento);
                               
                html  += '<tr>';
                html  += '<th style="text-align: center;font-weight: bold;">'+modelEmpreend+'</th>';
                html  += '<td>'+model.content.values.length+'</td>';
                html  += '<td><button id="'+modelEmpreend+'"  onclick="movSolicitacoes(this.id)" class="btn btn-success btnMovto"> Enviar <i class="fluigicon fluigicon-pointer-right"></i></button></td></tr>';
             }

            });        
                        
             $("#recebeTable").html(html);
             validaDataMvto(empreendimento);             
        }
    }); 

            validaDataMvto(empreendimento);

}


function movSolicitacoes(empreendimento){

var hora     =  new Date().getHours();
var minutos  =  new Date().getMinutes();
var segundos =  new Date().getSeconds();

var dia      =  new Date().getDate();
var mes      =  new Date().getMonth();
    mes      =  mes + 1;
var ano      =  new Date().getFullYear();

            if (dia == 0) {
                dia = "00";
            }else if(dia == 1){
                dia = "01";
            }else if(dia == 2){
                dia = "02";
            }else if(dia == 3){
                dia = "03";
            }else if(dia == 4){
                dia = "04";
            }else if(dia == 5){
                dia = "05";
            }else if(dia == 6){
                dia = "06";
            }else if(dia == 7){
                dia = "07";
            }else if(dia == 8){
                dia = "08";
            }else if(dia == 9){
                dia = "09";
            } 

             if(mes == 1){
                mes = "01";
            }else if(mes == 2){
                mes = "02";
            }else if(mes == 3){
                mes = "03";
            }else if(mes == 4){
                mes = "04";
            }else if(mes == 5){
                mes = "05";
            }else if(mes == 6){
                mes = "06";
            }else if(mes == 7){
                mes = "07";
            }else if(mes == 8){
                mes = "08";
            }else if(mes == 9){
                mes = "09";
            } 

            if (minutos == 0) {
                minutos = "00";
            }else if(minutos == 1){
                minutos = "01";
            }else if(minutos == 2){
                minutos = "02";
            }else if(minutos == 3){
                minutos = "03";
            }else if(minutos == 4){
                minutos = "04";
            }else if(minutos == 5){
                minutos = "05";
            }else if(minutos == 6){
                minutos = "06";
            }else if(minutos == 7){
                minutos = "07";
            }else if(minutos == 8){
                minutos = "08";
            }else if(minutos == 9){
                minutos = "09";
            }

            if (segundos == 0) {
                segundos = "00";
            }else if(segundos == 1){
                segundos = "01";
            }else if(segundos == 2){
                segundos = "02";
            }else if(segundos == 3){
                segundos = "03";
            }else if(segundos == 4){
                segundos = "04";
            }else if(segundos == 5){
                segundos = "05";
            }else if(segundos == 6){
                segundos = "06";
            }else if(segundos == 7){
                segundos = "07";
            }else if(segundos == 8){
                segundos = "08";
            }else if(segundos == 9){
                segundos = "09";
            }

            if (hora == 0) {
                hora = "00";
            }else if(hora == 1){
                hora = "01";
            }else if(hora == 2){
                hora = "02";
            }else if(hora == 3){
                hora = "03";
            }else if(hora == 4){
                hora = "04";
            }else if(hora == 5){
                hora = "05";
            }else if(hora == 6){
                hora = "06";
            }else if(hora == 7){
                hora = "07";
            }else if(hora == 8){
                hora = "08";
            }else if(hora == 9){
                hora = "09";
            }
            


var horaFull =  hora +":"+minutos+":"+segundos ;

var data_movimento = dia +"/"+mes+"/"+ano ;
var usuario = parent.WCMAPI.getUser();
    num_venda_aux = rest_solicitacoes.length; 



FLUIGC.message.confirm({
    message: 'Deseja movimentar as '+rest_solicitacoes.length+' vendas?',
    title: empreendimento,
    size: 'full',
    labelYes: 'Movimentar',
    labelNo: 'Cancelar'
}, function(result, el, ev) {
 
if(result == true){


//for(var i = 0; i < rest_solicitacoes.length; i++) {   

    var myJSON = JSON.stringify(rest_solicitacoes); 

    console.log("solicitação = ", myJSON);

    var dados2 = {
    "name": "ds_movimentacaoManualComissao",
    "fields": null,
    "constraints": [
        {
            "_field": "slctEmpreendimento",
            "_initialValue": myJSON ,
            "_finalValue": myJSON ,
            "_type": 1
        }
    ]
};
$.ajax({
    method: "POST",
    url: "/api/public/ecm/dataset/datasets/",
    data: JSON.stringify(dados2),
    contentType: "application/json",
    async: true,
    error: function (x, e) {
        if (x.status == 500) {
            alert("Erro Interno do Servidor: entre em contato com o Administrador.");
        }
    },
    beforeSend: function () {
        loader("100");
        console.log("Numero da solicitação = "+ rest_solicitacoes[i]);
    },
    success: function (model) {
        loader("-1");
    }
   });   
  //} for

        gravaLog(num_venda_aux,data_movimento,empreendimento,usuario,horaFull);
        // FLUIGC.message.alert({
        //     message: ' As solicitações serão movimentadas em até 10 minutos.',
        //     size: 'full',
        //     title: 'Atenção',
        //     label: 'Entendi'
        // });

        // location.reload();
    }
  });   
}


function gravaLog(num_vendas,data_movimento,empreendimento,usuario,horaFull){

    var usuario = parent.WCMAPI.getUser();
                    
    var dados2 = {
    "name": "ds_insertMvLog",
    "fields": null,
    "constraints": [
        {
            "_field": "num_vendas",
            "_initialValue": num_vendas ,
            "_finalValue": num_vendas ,
            "_type": 1
        },        {
            "_field": "data_movimento",
            "_initialValue": data_movimento ,
            "_finalValue": data_movimento ,
            "_type": 1
        },        {
            "_field": "empreendimento",
            "_initialValue": empreendimento ,
            "_finalValue": empreendimento ,
            "_type": 1
        },        {
            "_field": "usuario",
            "_initialValue": usuario ,
            "_finalValue": usuario ,
            "_type": 1
        },         {
            "_field": "horaFull",
            "_initialValue": horaFull ,
            "_finalValue": horaFull ,
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
                         
       validaDataMvto(empreendimento);
        
    }
   }); 
    

}


function validaDataMvto(empreendimento){

var full_date = new Date();
var hora     =  full_date.getHours();
var minutos  =  full_date.getMinutes();
var segundos =  full_date.getSeconds();
var horaFull =  hora +":"+minutos+":"+segundos ;
var dia      =  full_date.getDate();
var mes      =  full_date.getMonth();
    mes      =  mes + 1;
var ano      =  full_date.getFullYear();

   if (dia == 0) {
        dia = "00";
    }else if(dia == 1){
        dia = "01";
    }else if(dia == 2){
        dia = "02";
    }else if(dia == 3){
        dia = "03";
    }else if(dia == 4){
        dia = "04";
    }else if(dia == 5){
        dia = "05";
    }else if(dia == 6){
        dia = "06";
    }else if(dia == 7){
        dia = "07";
    }else if(dia == 8){
        dia = "08";
    }else if(dia == 9){
        dia = "09";
    } 

     if(mes == 1){
        mes = "01";
    }else if(mes == 2){
        mes = "02";
    }else if(mes == 3){
        mes = "03";
    }else if(mes == 4){
        mes = "04";
    }else if(mes == 5){
        mes = "05";
    }else if(mes == 6){
        mes = "06";
    }else if(mes == 7){
        mes = "07";
    }else if(mes == 8){
        mes = "08";
    }else if(mes == 9){
        mes = "09";
    } 


    var dataset = DatasetFactory.getDataset("ds_testeDB",null, null, null);                      
    var rowsCount = dataset.values.length;
    console.log("row count "+ rowsCount);

    for(var j = 0; j < rowsCount; j++) {  

     var emp_banco  = dataset.values[j]['EMPREENDIMENTO'];
     var data_banco1 = dataset.values[j]['DATA_MOVIMENTO'];
     
     var data_banco = data_banco1.split("/");
     var dia_banco  = data_banco[0];
     var mes_banco  = data_banco[1];
     var ano_banco  = data_banco[2];


     var data_full = dia+"/"+mes+"/"+ano;

     if (data_banco == undefined) {
        data_banco == "";
     }
     if (emp_banco == undefined ){
        emp_banco = "";
     }
     if(dia_banco == undefined){
        dia_banco = "";
     }
     if (mes_banco == undefined) {
        mes_banco = "";
     }

   if (empreendimento != "" ) { 
        console.log("true 1");
    if (empreendimento == emp_banco )  { 
        console.log("true 2");
     if (data_full == data_banco1){
        console.log("true 3");
        $(".btnMovto").prop("disabled",true);

     }else{
        $(".btnMovto").removeAttr("disabled");
     }
    }
  }
 
 }
}

