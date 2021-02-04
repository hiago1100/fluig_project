console.log("HELLO");
function validaCampo(v){
       console.log("valor = ",v);       
       if(v.length > 10) { 
        FLUIGC.message.confirm({
            message: 'Número de caracteres ultrapassado.(Max 10 caracteres)',
            labelNo: 'Entendi'
        });
        $("#concentracao_produto").val('');
    }
}

var REVANEXO = [];

var init = function(){
    // =============================================
    // VERIFICAÇÃO RETORNO
    // =============================================
    if($("#departamento").val() != "" && $("#retorno").val() == "nao" && $("#auxRetorno").val() == ""){
        $("#retorno").val("sim");
    }else{
        $("#departamento").val("");
        $("#auxRetorno").val("");
        $("#retorno").val("nao");
    }
    $("#necess_retorno").val("");

    // =====================================
    // PARÂMETRO
    // =====================================
    var STAGE = $('#atvAtual').val();
    var MODE = $("#formMode").val();
    var TIPO = $("#tipoProduto").val();
    var DEP = $("#departamento").val();
    var RET = $("#retorno").val();
    var USER = showUser();
    
    // =====================================
    // MASCARAS
    // =====================================
    $("#pesoLiq_produto").mask("9999999999999999999999999,999");
	$("#pesoBrut_produto").mask("9999999999999999999999999,999");
	$("#qtdEmb_produto").mask("9999999999999999999999999,999");
	$("#qtdEmb_produto2").mask("9999999999999999999999999,999");
	$("#redInss_produto").mask("9999999999999999999999999,999");
	$("#redIrrf_produto").mask("9999999999999999999999999,999");
	$("#redPid_produto").mask("9999999999999999999999999,999");
	$("#redCof_produto").mask("9999999999999999999999999,999");
	$("#alqIcms_produto").mask("99999999999999,99");
	$("#alqIpi_produto").mask("99999999999999,99");
    $("#alqIss_produto").mask("99999999999999,99");
    
    // =============================================
    // REGRAS DO PROCESSO
    // =============================================

    if(STAGE == 0 || STAGE == INICIO){
        // ======================================
        // DATA DO PROCESSO/FORMULARIO
        // ======================================
        $("#createDate").val(showDateTodayEua());
        $("#data_solicitacao").val(showDateToday());

        // ======================================
        // USUARIO QUE INSERE OS DADOS 
        // ======================================
        $("#usuario_solicitante").val(USER["colleaguePK.colleagueId"]);
        $("#nome_solicitante").val(USER["colleagueName"]);
        $("#email_solicitante").val(USER["mail"]);
        // ======================================

        $("#divPrincpAtivo").hide();
        $("#divPreProd").hide();
        $("#depart").hide();
        $("#desCadProd").hide();
        $("#tipoDepartCad").hide();
        $("#divNecessidade").hide();
        $("#tipoProd").show();
        $("#consulProd").hide();
        $("#divNotifUser").hide();

        //=============================== Anexos
        $(".tdacoes").hide();
        
        // CAMPO SUPRIMENTOS / SUPPLY
        $("#divSupply").hide();
        
        // CAMPOS LOGISTICA
        $("#divRespLogist").hide();
        $("#divLogist").hide();
        $("#necInfoLog").hide();
        $("#depLogistInfo").hide();
       
        // CAMPOS CONTABILIDADE
        $("#divRespContab").hide();
        $("#divContab").hide();
        $("#depContInfo").hide();
        $("#necInfoCont").hide();
       
        // CAMPOS FISCAL
        $("#divRespFiscal").hide();
        $("#divFiscal").hide();
        $("#necInfoFisc").hide();

        // ==================== 
        // TRATA CAMPO NCM
        // =====================
        $("input[type=search]").keyup(function(){
            var div = $(this).parent().parent().parent().parent().parent().parent()[0];
            var input = $(div).find('select')[0];
            if($(input).attr('id') == "ncm_produto"){
                var n = $(this).val();
                n = n.replace(".","");
                $(this).val(n);
            }
            
        });
  

        
    }

    if(STAGE == SUPRIMENTOS){
        if(MODE == "VIEW" && $("#codBloq_produto").val() != ''){
            escondeCamposSup();
        }
        
		switch(TIPO){
            case "direta":
                $("#depart").hide();
                $("#departCont2").hide();
                escondeCamposLog();
                
                enableField($("#codigo_produto"), false);
            break;
            case "indireta":
                $("#consulProd").show();
                $("#depart").hide();
                $("#respLog").hide();
                $("#divRespLogist").hide();
                $("#departCont1").hide();
            break;
            case "servico":
                $("#consulProd").show();
                $("#departCad").hide();
                $("#respLog").hide();
                $("#divRespLogist").hide();
            break;
        }

        escondeCamposCon();
        escondeCamposFis();

        $("#divNotifUser").hide();
        $("#tipoProd").hide();
        $("#necInfoLog").hide();
        $("#necInfoCont").hide();
        $("#necInfoFisc").hide();
        $("#respServFiscal").hide();
        $("#divNecessidade").show();

    }

    if(STAGE == LOGISTICA){
        if(MODE == "VIEW"){
            $("#necInfoLog").hide();
            if($("#codNewPrincpAtivo").val() != '' && $("#codNewPreProd").val() != ''){
                escondeCamposLog();
            }
        }else{
            // ======================================
            // USUARIO QUE INSERE OS DADOS 
            // ======================================
            $("#usuario_logistica").val(USER["colleaguePK.colleagueId"]);
            $("#nome_logistica").val(USER["colleagueName"]);
            $("#email_logistica").val(USER["mail"]);
            // ======================================
            
            if(RET == 'sim'){
                $("#necInfoLog").hide();
                $("#infoComplLogist").val("nao");
            }
        }

        exibiNec(RET);
        escondeCamposSup();
        escondeCamposCon();
        escondeCamposFis();

        $("#depart").hide();
        $("#tipoProd").hide();
        $("#consulProd").show();

        $("#respServFiscal").hide();
        $("#divRespContab").hide();
        $("#divRespFiscal").hide();
        
        $("#divPrincpAtivo").hide();
        $("#divPreProd").hide();
        $("#desCadProd").show();

        $("#divNotifUser").hide();
        $("#depLogistInfo").hide();
        $("#depContInfo").hide();
        $("#necInfoCont").hide();
        $("#necInfoFisc").hide();

        //exibe mensagem de retorno do retorno
        var departamento  = $("#departLogist option:selected").val();
        if(departamento){
            $("#divNecessidade").show();
        }

    }

    if(STAGE == CONTABILIDADE){
        if(MODE == "VIEW"){
            $("#necInfoCont").hide();
            if($("#codAtivo_produto").val() != ''){
                escondeCamposCon();
            }
        }else{
            // ======================================
            // USUARIO QUE INSERE OS DADOS 
            // ======================================
            $("#usuario_contabilidade").val(USER["colleaguePK.colleagueId"]);
            $("#nome_contabilidade").val(USER["colleagueName"]);
            $("#email_contabilidade").val(USER["mail"]);
            // ======================================
            
            if(RET == 'sim'){
                $("#necInfoCont").hide();
                $("#infoComplCont").val("nao");
            }
        }
        
        $("#divNotifUser").hide();
        $("#consulProd").hide();
        $("#divRespLogist").hide();
        $("#necInfoLog").hide();
        $("#tipoProd").hide();
        $("#depContInfo").hide();
        $("#divRespFiscal").hide();
        $("#necInfoFisc").hide();

        switch(TIPO){
            case "direta":
                $("#divRespLogist").show();
                $("#respServFiscal").hide();
                $("#depart").hide();
                $("#dc2").hide();
                $("#dc3").hide();
            break;
            case "indireta":
                $("#depart").hide();
                $("#respLog").hide();
                $("#respServFiscal").hide();
                $("#dc1").hide();
                $("#dc3").hide();
            break;
            case "servico":
                $("#departCad").hide();
                if(DEP == 'suprimentos'){
                    $("#respServFiscal").hide();
                    $("#respLog").hide();
                    $("#dc1").hide();
                    $("#dc3").hide();
                }else{
                    $("#respLog").hide();
                    $("#respSupli").hide();
                    $("#dc1").hide();
                    $("#dc2").hide();
                }
            break;
        }
        
        escondeCamposSup();
        escondeCamposLog();
        escondeCamposFis();
        exibiNec(RET);

        //exibe mensagem de retorno do retorno
        var departamento  = $("#departCont1 option:selected").val();
        if(departamento){
            $("#divNecessidade").show();
        }
    }

    if(STAGE == FISCAL){
        if(MODE == "VIEW"){
            $("#necInfoFisc").hide();
        }else{
            // ======================================
            // USUARIO QUE INSERE OS DADOS 
            // ======================================
            $("#usuario_fiscal").val(USER["colleaguePK.colleagueId"]);
            $("#nome_fiscal").val(USER["colleagueName"]);
            $("#email_fiscal").val(USER["mail"]);
            // ======================================

            if(RET == 'sim'){
                $("#necInfoFisc").hide();
                $("#infoComplFisc").val("nao");
            }else{
                $("#necInfoFisc").show();
            }
        }

        $("#divNotifUser").hide();
        $("#consulProd").hide();
        $("#tipoProd").hide();
        $("#necInfoLog").hide();
        $("#necInfoCont").hide();
        $("#depFiscInfo").hide();
        
        switch(TIPO){
            case "direta":
                $("#respServFiscal").hide();
                $("#depart").hide();
                $("#departCont2").hide();

                $("#df2").hide();
                $("#df3").hide();
            break;
            case "indireta":
                $("#depart").hide();
                $("#respLog").hide();
                $("#divRespLogist").hide();
                $("#respServFiscal").hide();
                $("#departCont1").hide();
                
                $("#df1").hide();
                $("#df3").hide();
            break;
            case "servico":
                $("#departCad").hide();
                $("#respLog").hide();
                $("#divRespLogist").hide();
    
                if(DEP == "suprimentos"){
                    $("#respServFiscal").hide();
                    $("#df1").hide();
                    $("#df3").hide();
                }else{
                    $("#respSupli").hide();
                    $("#divRespFiscal").hide();
                    $("#divNecessidade").show();
                    $("#df1").hide();
                    $("#df2").hide();
                }
            break;
        }

        escondeCamposSup();
        escondeCamposLog();
        escondeCamposCon();
        exibiNec(RET);

        //exibe mensagem de retorno do retorno
        var departamento  = $("#departFisc1 option:selected").val();
        if(departamento){
            $("#divNecessidade").show();
        }
    }

    if(STAGE == VERIF_ERRO){
        $("#divNecessidade").show();

        $("#infoNotif").hide();
        $("#consulProd").hide();
        $("#tipoProd").hide();
        $("#respServFiscal").hide();
        $("#divRespLogist").hide();
        $("#respLog").hide();
        $("#depart").hide();
        
        $("#necInfoLog").hide();
        $("#necInfoCont").hide();
        $("#necInfoFisc").hide();

        switch(TIPO){
            case "direta":
                $("#departCont2").hide();
                $("#divRespLogist").show();
                $("#respLog").show();
            break;
            case "indireta":
                $("#departCont1").hide();
            break;
            case "servico":
                $("#depart").show();
                $("#departCad").hide();
                
                if(DEP == 'fiscal'){
                    $("#respServFiscal").show();
                    $("#respSupli").hide();
                }
            break;
        }

        escondeCamposSup();
        escondeCamposLog();
        escondeCamposCon();
        escondeCamposFis();
    }

    if(STAGE == PRODUTO_INTG || STAGE == INTEGRACAO || STAGE == FIM){
        $("#divNecessidade").show();

        $("#infoNotif").hide();
        $("#consulProd").hide();
        $("#tipoProd").hide();
        $("#respServFiscal").hide();
        $("#divRespLogist").hide();
        $("#respLog").hide();
        $("#depart").hide();
        
        $("#necInfoLog").hide();
        $("#necInfoCont").hide();
        $("#necInfoFisc").hide();

        switch(TIPO){
            case "direta":
                $("#departCont2").hide();
                $("#divRespLogist").show();
                $("#respLog").show();
            break;
            case "indireta":
                $("#departCont1").hide();
            break;
            case "servico":
                $("#depart").show();
                $("#departCad").hide();
                
                if(DEP == 'fiscal'){
                    $("#respServFiscal").show();
                    $("#respSupli").hide();
                }
            break;
        }

        escondeCamposSup();
        escondeCamposLog();
        escondeCamposCon();
        escondeCamposFis();
    }

    // ===================================
    // EVENTOS
    // ====================================

    enableFields();
    
}
// ===============================================
// Beforesendalidate
// ===============================================

var beforeSendValidate = function(numState,nextState){ 
    
    if(numState == INICIO || numState == SUPRIMENTOS || numState == LOGISTICA || numState == CONTABILIDADE || numState == FISCAL){
        addNec();
    }

    $("#auxRetorno").val("sim");

    switch(numState){
        case 0:
            if($("#tipoProduto").val() != "direta"){
                if($("#codigo_produto").val() != "") buscaCodProd($("#codigo_produto").val(), "prod");
                if($("#codNewPrincpAtivo").val() == "Sim" && $("#codigo_princpAtiv").val() != "") buscaCodNewPrincAtiv($("#codigo_princpAtiv").val());
                if($("#codNewPreProd").val() == "Sim" && $("#codigo_preproduto").val() != "") buscaCodProd($("#codigo_preproduto").val(), "preProd");
            }

            if($("#tipoProduto").val() == 'servico' && $("#departCadastrante").val() == 'fiscal'){
                $("#fiscalResp").val($("#usuario_solicitante").val());
                $("#fiscalPrazo").val("000:30");
            }else{
                $("#supplyResp").val($("#usuario_solicitante").val());
                $("#supplyPrazo").val("000:30");
            }
        break;
        case INICIO:
            if($("#tipoProduto").val() != "direta"){
                if($("#codigo_produto").val() != "") buscaCodProd($("#codigo_produto").val(), "prod");
                if($("#codNewPrincpAtivo").val() == "Sim" && $("#codigo_princpAtiv").val() != "") buscaCodNewPrincAtiv($("#codigo_princpAtiv").val());
                if($("#codNewPreProd").val() == "Sim" && $("#codigo_preproduto").val() != "") buscaCodProd($("#codigo_preproduto").val(), "preProd");
            }

            if($("#tipoProduto").val() == 'servico' && $("#departCadastrante").val() == 'fiscal'){
                $("#fiscalResp").val($("#usuario_solicitante").val());
                $("#fiscalPrazo").val("000:30");
            }else{
                $("#supplyResp").val($("#usuario_solicitante").val());
                $("#supplyPrazo").val("000:30");
            }
        break;
        case SUPRIMENTOS:
            if($("#tipoProduto").val() != "direta"){
                if($("#codigo_produto").val() != "") buscaCodProd($("#codigo_produto").val(), "prod");
                if($("#codNewPrincpAtivo").val() == "Sim" && $("#codigo_princpAtiv").val() != "") buscaCodNewPrincAtiv($("#codigo_princpAtiv").val());
                if($("#codNewPreProd").val() == "Sim" && $("#codigo_preproduto").val() != "") buscaCodProd($("#codigo_preproduto").val(), "preProd");
            }
        break;
        case LOGISTICA:
            if($("#codigo_produto").val() != "") buscaCodProd($("#codigo_produto").val(), "prod");
            if($("#codNewPrincpAtivo").val() == "Sim") buscaCodNewPrincAtiv($("#codigo_princpAtiv").val());
            if($("#codNewPreProd").val() == "Sim") buscaCodProd($("#codigo_preproduto").val(), "preProd");

            if($("#infoComplLogist option:selected").val() == "sim" && ($("#departLogist option:selected").val() != null || $("#departLogist option:selected").val() != '')){
                $("#departamento").val("logistica");
                $("#auxRetorno").val("");
            }

            if($("#logistResp").val() == 'Pool:Role:logistica' && $("#usuario_logistica").val() != ''){
                $("#logistResp").val($("#usuario_logistica").val());
                $("#logistPrazo").val("000:30");
            }
        break;
        case CONTABILIDADE:
            if($("#infoComplCont option:selected").val() == "sim" && ($("#selecDepartCont").val() != null || $("#selecDepartCont").val() != '')){
                $("#departamento").val("contabilidade");
                $("#auxRetorno").val("");
            }

            if($("#contabResp").val() == 'Pool:Role:contabilidade' && $("#usuario_contabilidade").val() != ''){
                $("#contabResp").val($("#usuario_contabilidade").val());
                $("#contabPrazo").val("000:30");
            }
        break;
        case FISCAL:
            if($("#infoComplFisc option:selected").val() == "sim" && ($("#selecDepartFisc").val() != null || $("#selecDepartFisc").val() != '')){
                $("#departamento").val("fiscal");
                $("#auxRetorno").val("");
            }

            if($("#fiscalResp").val() == 'Pool:Role:fiscal' && $("#usuario_fiscal").val() != ''){
                $("#fiscalResp").val($("#usuario_fiscal").val());
                $("#fiscalPrazo").val("000:30");
            }
        break;
    
    }

}
// ===============================================
// Esconde Campos
// ===============================================
function escondeCamposSup(){
    $("#bloq_produto").hide();
    $("#descBloq_produto").show();
}

function escondeCamposLog(){

    $("#newPrincpAtivo").hide();
    $("#codNewPrincpAtivo").show();
    $("#princatv").hide();

    if($("#codNewPrincpAtivo").val() == 'Sim'){
        $("#codpriatv").removeClass("col-md-offset-2");
        $("#codprincatv").hide();
        $("#descprincatv").hide();
    }else{
        $("#divPrincpAtivo").hide();
        $("#codprincatv").removeClass("col-md-2");
        $("#descprincatv").removeClass("col-md-5");

        $("#codprincatv").addClass("col-md-3");
        $("#descprincatv").addClass("col-md-7");
    }

    // ==========================================
    $("#newPreProd").hide();
    $("#codNewPreProd").show();
    $("#preprodut").hide();

    if($("#codNewPreProd").val() == 'Sim'){
        $("#codpreprodut").removeClass("col-md-offset-2");
        $("#codpreprod").hide();
        $("#descpreprod").hide();
    }else{
        $("#divPreProd").hide();
        $("#codpreprod").removeClass("col-md-2");
        $("#descpreprod").removeClass("col-md-5");

        $("#codpreprod").addClass("col-md-3");
        $("#descpreprod").addClass("col-md-7");
    }

    // ==========================================
    $("#tipoConver_produto").hide();
    $("#descTipoConver_produto").show();

    $("#rastro_produto").hide();
    $("#descRastro_produto").show();

    $("#import_produto").hide();
    $("#descImport_produto").show();

    $("#indust_produto").hide();
    $("#descIndus_produto").show();
}

function escondeCamposCon(){
    $("#ativo_produto").hide();
    $("#descAtivo_produto").show();
}

function escondeCamposFis(){
    $("#impostRenda_produto").hide();
    $("#descImpostRenda_produto").show();

    $("#foraEstado_produto").hide();
    $("#descForaEstado_produto").show();

    $("#fRetIss_produto").hide();
    $("#descfRetInss_produto").show();

    $("#calcInss_produto").hide();
    $("#descCalcInss_produto").show();

    $("#retemPis_produto").hide();
    $("#descRetemPis_produto").show();

    $("#retemConfins_produto").hide();
    $("#descRetemConfins_produto").show();

    $("#retemCsll_produto").hide();
    $("#descRetemCsll_produto").show();

    $("#credIcms_produto").hide();
    $("#descCreditoIcms_produto").show();

    $("#retOp_produto").hide();
    $("#descRetornoOp_produto").show();

    $("#ratroAtivo_produto").hide();
    $("#descRastroAtivo_produto").show();
}

function exibiNec(ret){
    if(ret == 'sim'){
        $("#divNecessidade").show();
    }else{
        $("#divNecessidade").hide();
    }
}
// ===============================================
// Verifica Dados
// ===============================================
function verificaNewPrincip(op){
    verificaSelect('newPrincip', op);

    switch(op){
        case 'sim':
            $("#divPrincpAtivo").show();
            $("#codNewPrincpAtivo").val("Sim");
    
            var zoomPrincp = document.getElementById("princpAtivo_produto");
            var length = zoomPrincp.options.length;
            for (i = 0; i < length; i++) {
                zoomPrincp.options[0].remove();
            }
            $("#codPrincpAtivo_produto").val("");
            $("#descPrincpAtivo_produto").val("");
    
            enableZoom($("#princpAtivo_produto"), false);

            break;
        case 'nao':
            $("#divPrincpAtivo").hide();
            $("#codNewPrincpAtivo").val("Não");
    
            $("#codigo_princpAtiv").val("");
            $("#desc_principAtiv").val("");
    
            $("#codigo_princpAtiv").removeClass("erro");
            $("#cod_princpAtiv").val("");
    
            enableZoom($("#princpAtivo_produto"), true);

            break;
        default:
            $("#divPrincpAtivo").hide();
            $("#codNewPrincpAtivo").val("");
    
            $("#codigo_princpAtiv").val("");
            $("#desc_principAtiv").val("");
    
            $("#codigo_princpAtiv").removeClass("erro");
            $("#cod_princpAtiv").val("");
    
            enableZoom($("#princpAtivo_produto"), true);

            break;
    }
}

function verificaNewPreProd(op){
    verificaSelect('newPreProd', op);

    switch(op){
        case 'sim':
            $("#divPreProd").show();
            $("#codNewPreProd").val("Sim");
    
            var zoomPrincp = document.getElementById("preProd_produto");
            var length = zoomPrincp.options.length;
            for (i = 0; i < length; i++) {
                zoomPrincp.options[0].remove();
            }
            $("#codPreProd_produto").val("");
            $("#descPreProd_produto").val("");
    
            enableZoom($("#preProd_produto"), false);

            break;
        case 'nao':
            $("#divPreProd").hide();
            $("#codNewPreProd").val("Não");
    
            $("#codigo_preproduto").val("");
            $("#desc_preproduto").val("");
            
            $("#codigo_preproduto").removeClass("erro");
            $("#cod_preProduto").val("");
    
            enableZoom($("#preProd_produto"), true);

            break;
        default:
            $("#divPreProd").hide();
            $("#codNewPreProd").val("");

            $("#codigo_preproduto").val("");
            $("#desc_preproduto").val("");
            
            $("#codigo_preproduto").removeClass("erro");
            $("#cod_preProduto").val("");
    
            enableZoom($("#preProd_produto"), true);

            break;
    }
}

function verificaCatgProd(op){
    limpaCampos();
    $("#departCad").val("");

    switch(op){
        case "direta":
            $("#tipoProduto").val("direta");
            $("#tipoProdDesc").val("Produto de Compra Direta");

            $("#respSupli").show();
            $("#respServFiscal").hide();

            $("#consulProd").hide();
            $("#depart").hide();
            $("#respLog").show();
            $("#respFis").show();

            $("#divSupply").show();
            $("#divLogist").show();
            $("#divContab").show();
            $("#divFiscal").show();

            $("#necInfoFisc").hide();
            $("#divNotifUser").show();

            enableContainer2($("#divLogist"), false);
            enableField($("#codigo_produto"), false);
            enableZoom($("#princpAtivo_produto"), false);
            enableZoom($("#armazem_produto"), false);
            enableZoom($("#preProd_produto"), false);

            enableContainer2($("#divFiscal"), false);
            enableZoom($("#origem_produto"), false);
            enableZoom($("#grupoTrib_produto"), false);
            enableZoom($("#servIss_produto"), false);
            enableZoom($("#exNcm_produto"), false);
            enableZoom($("#tabNatRec_produto"), false);

            break;

        case "servico":
            var DEPART = departCadastrante();

            $("#consulProd").hide();
            $("#tipoProduto").val("servico");
            $("#tipoProdDesc").val("Serviço");

            $("#depart").show();

            enableField($("#codigo_produto"), true);
            
            $("#divSupply").hide();
            $("#divLogist").hide();
            $("#divContab").hide();
            $("#divFiscal").hide();
            $("#divNotifUser").hide();

            if(DEPART.values.length > 1){
                $("#departCad").val("");
            }else{
                $("#departCad").val(DEPART.values[0]['workflowColleagueRolePK.roleId']);
                $("#departCad").attr('disabled', true);
                verificaDepartCad(DEPART.values[0]['workflowColleagueRolePK.roleId']);
            }

            enableField($("#descArmazem_produto"), false);
            enableField($("#codArmazem_produto"), false);
            enableField($("#codPrincpAtivo_produto"), false);
            enableField($("#descPrincpAtivo_produto"), false);
            enableField($("#codPreProd_produto"), false);
            enableField($("#descPreProd_produto"), false);

            enableZoom($("#armazem_produto"), true);
            enableZoom($("#preProd_produto"), true);

            break;

        case "indireta":
            $("#consulProd").show();
            $("#tipoProduto").val("indireta");
            $("#tipoProdDesc").val("Produto de Compra Indireta");

            $("#respSupli").show();
            $("#respServFiscal").hide();

            $("#depart").hide();
            $("#respLog").hide();
            $("#respFis").show();
            $("#divNotifUser").show();

            $("#divSupply").show();
            $("#divLogist").show();
            $("#divContab").show();
            $("#divFiscal").show();

            $("#necInfoFisc").hide();

            enableContainer2($("#divLogist"), true);
            enableField($("#codigo_produto"), true);
            enableZoom($("#ncm_produto"), true);
            enableZoom($("#princpAtivo_produto"), true);
            enableZoom($("#armazem_produto"), true);
            enableZoom($("#preProd_produto"), true);

            enableContainer2($("#divFiscal"), false);
            enableZoom($("#origem_produto"), false);
            enableZoom($("#grupoTrib_produto"), false);
            enableZoom($("#servIss_produto"), false);
            enableZoom($("#exNcm_produto"), false);
            enableZoom($("#tabNatRec_produto"), false);

            enableField($("#descArmazem_produto"), false);
            enableField($("#codArmazem_produto"), false);
            enableField($("#codPrincpAtivo_produto"), false);
            enableField($("#descPrincpAtivo_produto"), false);
            enableField($("#codPreProd_produto"), false);
            enableField($("#descPreProd_produto"), false);
        break;
    }

}

function verificaDepartCad(op){
    limpaCampos();

    $("#divSupply").show();
    $("#respFis").show();
    $("#respLog").hide();
    $("#divLogist").show();
    $("#divContab").show();
    $("#divFiscal").show();
    $("#divNotifUser").show();

    switch(op){
        case "suprimentos":
            $("#departCadastrante").val("suprimentos");
            $("#tipoDepartCad").val("Suprimentos");

            $("#respSupli").show();
            $("#consulProd").show();
            $("#respServFiscal").hide();
            $("#necInfoFisc").hide();
            // =======================  
            enableContainer2($("#divLogist"), true);
            enableZoom($("#ncm_produto"), true);
            enableZoom($("#princpAtivo_produto"), true);

            enableContainer2($("#divFiscal"), false);
            enableZoom($("#origem_produto"), false);
            enableZoom($("#grupoTrib_produto"), false);
            enableZoom($("#servIss_produto"), false);
            enableZoom($("#exNcm_produto"), false);
            enableZoom($("#tabNatRec_produto"), false);
        break;

        case "fiscal":
            $("#departCadastrante").val("fiscal");
            $("#tipoDepartCad").val("Fiscal");

            $("#consulProd").show();
            $("#respServFiscal").show();
            $("#respSupli").hide();
            $("#necInfoFisc").show();
            $("#depFiscInfo").hide();
            $("#df1").hide();
            $("#df2").hide();
            // =======================
            enableContainer2($("#divLogist"), true);
            enableZoom($("#ncm_produto"), true);
            enableZoom($("#princpAtivo_produto"), true);

            enableContainer2($("#divFiscal"), true);
            enableZoom($("#origem_produto"), true);
            enableZoom($("#grupoTrib_produto"), true);
            enableZoom($("#servIss_produto"), true);
            enableZoom($("#exNcm_produto"), true);
            enableZoom($("#tabNatRec_produto"), true);

            enableField($("#codOrigem_produto"), false);
            enableField($("#descOrigem_produto"), false);
            enableField($("#codGrupTrib_produto"), false);
            enableField($("#descGrupTrib_produto"), false);
            enableField($("#codExNcm_produto"), false);
            enableField($("#descExNcm_produto"), false);
            enableField($("#codTabNatRec_produto"), false);
            enableField($("#descTabNatRec_produto"), false);
            enableField($("#codServIss_produto"), false);
            enableField($("#descServIss_produto"), false);
        break;
    }

    enableField($("#descArmazem_produto"), false);
    enableField($("#codArmazem_produto"), false);
    enableField($("#codPrincpAtivo_produto"), false);
    enableField($("#descPrincpAtivo_produto"), false);
    enableField($("#codPreProd_produto"), false);
    enableField($("#descPreProd_produto"), false);
}

function verificaComplLogist(op){
    $("#divNecessidade").hide();
    $("#departLogist").val("");
    $("#necess_retorno").val("");

    if(op == "sim"){
        $("#depLogistInfo").show();
    }else{
        $("#depLogistInfo").hide();
    }
}


function verificaComplCont(op){
    $("#departCont1").val("");
    $("#departCont2").val("");
    $("#divNecessidade").hide();
    $("#necess_retorno").val("");
    $("#selecDepartCont").val("");

    if(op == "sim"){
        $("#depContInfo").show();
    }else{
        $("#depContInfo").hide();
    }
}

function verficaDepartCont(op){
    $("#selecDepartCont").val(op);
    $("#divNecessidade").show();
}

function verificaComplFisc(op){
    $("#departFisc1").val("");
    $("#departFisc2").val("");
    $("#departFisc3").val("");
    $("#selecDepartFisc").val("");

    if(op == "sim"){
        $("#depFiscInfo").show();
    }else{
        $("#depFiscInfo").hide();
        $("#divNecessidade").hide();
        $("#necess_retorno").val("");
    }
}

function verficaDepartFisc(op){
    $("#selecDepartFisc").val(op);
    $("#divNecessidade").show();
}

function verificaNecCompl(){
    $("#divNecessidade").show();
}

// ===============================================
// Busca Códigos
// ===============================================
function buscaCodNewPrincAtiv(op){
    try{
        var con = [];
        var dsPrincpativ = new Dataset('ds_principio_ativo_filtro_produto', null, null);
    
        con.push(dsPrincpativ.createConstraints('CODIGO', op, op, 1, false));
     
        var result = dsPrincpativ.getDataset(con);
     
        if(result.values.length != 0){
            $("#codigo_princpAtiv").addClass("erro");
            $("#cod_princpAtiv").val("erro");
        }else{
            $("#codigo_princpAtiv").removeClass("erro");
            $("#cod_princpAtiv").val("");
        }
    }catch(e){
     
    }
}

function buscaCodProd(op, tipo){
    try {
    
        var con = [];
        var dsPreprod = new Dataset('ds_preproduto_filtro', null, null);
    
        con.push(dsPreprod.createConstraints('CODIGO', op, op, 1, false));
     
        var result = dsPreprod.getDataset(con);

        console.log(result);        
        
        switch(tipo){
            case "prod":
                if(result.values.length != 0){
                    $("#codigo_produto").addClass("erro");
                    $("#cod_prod").val("erro");
                }else{
                    $("#codigo_produto").removeClass("erro");
                    $("#cod_prod").val("");
                }
            break;
            case "preProd":
                if(result.values.length != 0){
                    $("#codigo_preproduto").addClass("erro");
                    $("#cod_preProduto").val("erro");
                }else{
                    $("#codigo_preproduto").removeClass("erro");
                    $("#cod_preProduto").val("");
                }
            break;
        }
    
    } catch (e) {
        console.log("ERROR");        
        console.log(e);        
    }
}

// ===============================================
// Limpa Campos
// ===============================================
function limpaCampos(){
    $("#codigo_produto").val("");
    $("#desc_produto").val("");
    $("#departCadastrante").val("");

    // ================ TIPO PRODUTO ================
    var zoomTipoProd = document.getElementById("tipo_produto");
    var length = zoomTipoProd.options.length;
    for (i = 0; i < length; i++) {
        zoomTipoProd.options[0].remove();
        $("#codTipo_produto").val("");
        $("#descTipo_produto").val("");
    }

    // ================ ARMAZEM PADRÃO ================
    var zoomArmazProd = document.getElementById("armazem_produto");
    var length = zoomArmazProd.options.length;
    for (i = 0; i < length; i++) {
        zoomArmazProd.options[0].remove();
        $("#codArmazem_produto").val("");
        $("#descArmazem_produto").val("");
    }

    // ================ GRUPO ================
    var zoomGrupProd = document.getElementById("grupo_produto");
    var length = zoomGrupProd.options.length;
    for (i = 0; i < length; i++) {
        zoomGrupProd.options[0].remove();
        $("#codGrupo_produto").val("");
        $("#descGrupo_produto").val("");
    }

    // ================ FORMULAÇÃO ================
    var zoomFormProd = document.getElementById("formulacao_produto");
    var length = zoomFormProd.options.length;
    for (i = 0; i < length; i++) {
        zoomFormProd.options[0].remove();
        $("#codFormula_produto").val("");
        $("#descFormula_produto").val("");
    }

    // ================ CLASSE ================
    var zoomFormProd = document.getElementById("classe_produto");
    var length = zoomFormProd.options.length;
    for (i = 0; i < length; i++) {
        zoomFormProd.options[0].remove();
        $("#codClasse_produto").val("");
        $("#descClasse_produto").val("");
    }

    // ================ UNIDADE DE MEDIDA ================
    var zoomFormProd = document.getElementById("uniMedida_Produto");
    var length = zoomFormProd.options.length;
    for (i = 0; i < length; i++) {
        zoomFormProd.options[0].remove();
        $("#codUniMed_produto").val("");
        $("#descUniMed_produto").val("");
    }

    // ================ SEGUNDA UNIDADE DE MEDIDA ================
    var zoomFormProd = document.getElementById("segUniMedida_Produto");
    var length = zoomFormProd.options.length;
    for (i = 0; i < length; i++) {
        zoomFormProd.options[0].remove();
        $("#codSegUniMed_produto").val("");
        $("#descSegUniMed_produto").val("");
    }

    // ================================================
    $("#concentracao_produto").val("");
    $("#fabric_produto").val("");
    $("#registrante_produto").val("");
    $("#infoComp_produto").val("");
    $("#pesoLiq_produto").val("");
    $("#pesoBrut_produto").val("");

    // ================ NCM ================
    var zoomNcm = document.getElementById("ncm_produto");
    var length = zoomNcm.options.length;
    for (i = 0; i < length; i++) {
        zoomNcm.options[0].remove();
        $("#codNcm_produto").val("");
        $("#descNcm_produto").val("");
    }

    // ================================================
    $("#qtdEmb_produto").val("");
    $("#qtdEmb2_produto").val("");
    $("#embalagem_produto").val("");

    // ================ PRINCIPIO ATIVO ================
    $("#newPrincpAtivo").val("");

    var zoomPrincp = document.getElementById("princpAtivo_produto");
    var length = zoomPrincp.options.length;
    for (i = 0; i < length; i++) {
        zoomPrincp.options[0].remove();
        $("#codPrincpAtivo_produto").val("");
        $("#descPrincpAtivo_produto").val("");
    }

    $("#codigo_princpAtiv").val("");
    $("#desc_principAtiv").val("");

    // ================ PRÉ-PRODUTO ================
    $("#newPreProd").val("");

    var zoomPreProd = document.getElementById("preProd_produto");
    var length = zoomPreProd.options.length;
    for (i = 0; i < length; i++) {
        zoomPreProd.options[0].remove();
        $("#codPreProd_produto").val("");
        $("#descPreProd_produto").val("");
    }

    $("#pre_produto").val("");
    $("#codigo_preproduto").val("");
    $("#desc_preproduto").val("");

    // ================ ORIGEM ================
    var zoomOrigem = document.getElementById("origem_produto");
    var length = zoomOrigem.options.length;
    for (i = 0; i < length; i++) {
        zoomOrigem.options[0].remove();
        $("#codOrigem_produto").val("");
        $("#descOrigem_produto").val("");
    }

    // ================ GRUPO TRIBUTARIO ================
    var zoomGrupTrib = document.getElementById("grupoTrib_produto");
    var length = zoomGrupTrib.options.length;
    for (i = 0; i < length; i++) {
        zoomGrupTrib.options[0].remove();
        $("#codGrupoTrib_produto").val("");
        $("#descGrupoTrib_produto").val("");
    }

    // ================================================
    $("#codTribMunic_produto").val("");
    $("#impostRenda_produto").val("");
    $("#foraEstado_produto").val("");
    $("#classeFiscal_produto").val("");
    $("#percSll_produto").val("");
    $("#percCofins_produto").val("");
    $("#percPis_produto").val("");
    $("#alqIcms_produto").val("");
    $("#alqIpi_produto").val("");
    $("#alqIss_produto").val("");

    // ================ CÓDIGO SERVIÇO ISS ================
    var zoomServIss = document.getElementById("servIss_produto");
    var length = zoomServIss.options.length;
    for (i = 0; i < length; i++) {
        zoomServIss.options[0].remove();
        $("#codServIss_produto").val("");
        $("#descServIss_produto").val("");
    }

    // ================================================
    $("#fRetIss_produto").val("");
    $("#redInss_produto").val("");
    $("#redIrrf_produto").val("");
    $("#redPid_produto").val("");
    $("#redCof_produto").val("");
    $("#calcInss_produto").val("");
    $("#espTipi_produto").val("");

    // ================ EXCEÇÃO NCM ================
    var zoomExNcm = document.getElementById("exNcm_produto");
    var length = zoomExNcm.options.length;
    for (i = 0; i < length; i++) {
        zoomExNcm.options[0].remove();
        $("#codExNcm_produto").val("");
        $("#descExNcm_produto").val("");
    }

    // ================================================
    $("#tePadrao_produto").val("");
    $("#tsPadrao_produto").val("");
    $("#retemPis_produto").val("");
    $("#retemConfins_produto").val("");
    $("#retemCsll_produto").val("");
    $("#cnae_produto").val("");
    $("#credIcms_produto").val("");
    
    // ================ TABELA NATUREZA RECEITA ================
    var zoomTabNat = document.getElementById("tabNatRec_produto");
    var length = zoomTabNat.options.length;
    for (i = 0; i < length; i++) {
        zoomTabNat.options[0].remove();
        $("#codTabNatRec_produto").val("");
        $("#descTabNatRec_produto").val("");
    }

    // ================================================
    $("#sitTrib_produto").val("");
    $("#retOp_produto").val("");
    $("#ratroAtivo_produto").val("");
    $("#infoComplFisc").val("");
    $("#departFisc1").val("");
    $("#departFisc2").val("");
    $("#departFisc3").val("");

}


// ========================================
// Verifica SELECT's
// ========================================
function verificaSelect(select, op){
    switch(select){
        case 'bloqueado':       // PRODUTO BLOQUEADO
            $("#codBloq_produto").val(op);
            if(op == "1") $("#descBloq_produto").val("Sim")
            else $("#descBloq_produto").val("Não");
        break;
        case 'tipoConver':      // TIPO CONVERSÃO DO PRODUTO
            $("#codTipoConver_produto").val(op);
            if(op == "D") $("#descTipoConver_produto").val("Divisor")
            else $("#descTipoConver_produto").val("Multiplicador");
        break;
        case 'rastro':          // RASTRO
            $("#codRastro_produto").val(op);
            if(op == "L") $("#descRastro_produto").val("Lote")
            else if(op == "S") $("#descRastro_produto").val("SubLote")
            else $("#descRastro_produto").val("Não utiliza");
        break;
        case 'importado':       // PRODUTO IMPORTADO 
            $("#codImport_produto").val(op);
            if(op == "S") $("#descImport_produto").val("Sim")
            else $("#descImport_produto").val("Não");
        break;
        case 'industrializado': // PRODUTO INDUSTRIALIZADO
            $("#codIndus_produto").val(op);
            if(op == "S") $("#descIndus_produto").val("Sim")
            else $("#descIndus_produto").val("Não");
        break;
        case 'newPrincp':       // NOVO PRINCIPIO ATIVO
            $("#codNewPrincpAtivo").val(op);
        break;
        case 'newPreProd':      // NOVO PRE-PRODUTO
            $("#codNewPreProd").val(op);
        break;
        case 'ativo':           // PRODUTO ATIVO
            $("#codAtivo_produto").val(op);
            if(op == "S") $("#descAtivo_produto").val("Sim")
            else $("#descAtivo_produto").val("Não");
        break;
        case 'impostRenda':     // IMPOSTO DE RENDA
            $("#codImpostRenda_produto").val(op);
            if(op == "S") $("#descImpostRenda_produto").val("Sim")
            else $("#descImpostRenda_produto").val("Não");
        break;
        case 'foraEstado':      // FORA DO ESTADO
            $("#codForaEstado_produto").val(op);
            if(op == "S") $("#descForaEstado_produto").val("Sim")
            else $("#descForaEstado_produto").val("Não");
        break;
        case 'fRetInss':        // FORMA RETENÇÃO INSS
            $("#codfRetInss_produto").val(op);
            if(op == "1") $("#descfRetInss_produto").val("Cons Vlr Minimo")
            else $("#descfRetInss_produto").val("Sempre Retem");
        break;
        case 'calculaInss':     // CALCULA INSS
            $("#codCalcInss_produto").val(op);
            if(op == "S") $("#descCalcInss_produto").val("Sim")
            else $("#descCalcInss_produto").val("Não");
        break;
        case 'retemPis':        // RETEM PIS
            $("#codRetemPis_produto").val(op);
            if(op == "1") $("#descRetemPis_produto").val("Sim")
            else $("#descRetemPis_produto").val("Não");
        break;
        case 'retemConfins':    // RETEM CONFINS
            $("#codRetemConfins_produto").val(op);
            if(op == "1") $("#descRetemConfins_produto").val("Sim")
            else $("#descRetemConfins_produto").val("Não");
        break;
        case 'retemCsll':       // RETEM CSLL
            $("#codRetemCsll_produto").val(op);
            if(op == "1") $("#descRetemCsll_produto").val("Sim")
            else $("#descRetemCsll_produto").val("Não");
        break;
        case 'creditoIcms':     // CREDITO ICMS
            $("#codCreditoIcms_produto").val(op);
            if(op == "1") $("#descCreditoIcms_produto").val("Sim")
            else $("#descCreditoIcms_produto").val("Não");
        break;
        case 'retornoOp':       // RETORNO OPERAÇÃO
            $("#codRetornoOp_produto").val(op);
            if(op == "1") $("#descRetornoOp_produto").val("Sim")
            else $("#descRetornoOp_produto").val("Não");
        break;
        case 'rastroAtivo':     // RASTRO ATIVO
            $("#codRastroAtivo_produto").val(op);
            if(op == "1") $("#descRastroAtivo_produto").val("Sim")
            else $("#descRastroAtivo_produto").val("Não");
        break;
        case 'email':
            $("#end_email").val(op);
        break;
    }
}

// ========================================
// Funções Table
// ========================================
function addNec(){
    var necRet = $("#necess_retorno").val();
    var user   = parent.WCMAPI.getUser();

    if((necRet.length > 0)){
        var index = wdkAddChild('tabNecRet');

        $('#tb_usuario___'+index).val(user);
        $('#tb_descricao___'+index).val(necRet);
        $('#td_data___'+index).val(showDateHourToday());
    }
}

function addEmail(){
    var email = $("#emailUser").val();
    var endEmail = $("#end_email").val();
    if(email != ""){
        if((email.length > 0)){
            var index = wdkAddChild('tabNotifUser');
    
            $('#td_email___'+index).val(email+"@"+endEmail);
        }
        $("#emailUser").val("");
        $("#endereco_email").val("ccab-agro.com.br");
        $("#end_email").val("ccab-agro.com.br");
    }
}

// ========================================
// CONSULTAS
// ========================================
var showUser = function(){
    try {
        
        var con = [];
        var userid = $('#matricula').val(); 
        var User = new Dataset('colleague',null, null);

        con.push(User.createConstraints('colleaguePK.colleagueId', userid, userid, 1, false));
        
        var result = User.getDataset(con);       

        return result.values[0];

    } catch (e) {
    
    }
}

var departCadastrante = function(){
    try{
        var cons = [];
        var userid = $("#matricula").val();
        
        var Papel = new Dataset('workflowColleagueRole', null, null);
        cons.push(Papel.createConstraints('workflowColleagueRolePK.colleagueId', userid, userid, 1, false));
        cons.push(Papel.createConstraints('workflowColleagueRolePK.roleId', "suprimentos", "suprimentos", 2, false));
        cons.push(Papel.createConstraints('workflowColleagueRolePK.roleId', "fiscal", "fiscal", 2, false));
        
        var result = Papel.getDataset(cons);
        
        return result;

    }catch(e){

    }
}

// ============================================
// DATA
// ============================================
var showDateToday = function () {
    
    var d  = new Date();

    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    day = ("00" + day).slice(-2);
	month = ("00" + month).slice(-2);

    var resul = day.toString()+'/'+month.toString()+'/'+year.toString();
    return resul;
}

var showDateTodayEua = function () {
    
    var d  = new Date();

    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    day = ("00" + day).slice(-2);
	month = ("00" + month).slice(-2);

    var resul = year.toString()+'-'+month.toString()+'-'+day.toString();

    return resul;

}

var showDateHourToday = function () {
    
    var d  = new Date();

    var day = d.getDate();
    var month = d.getMonth();
    month = parseInt(month) + 1;
    var year = d.getFullYear();

    var hora = d.getHours();
    var min =  d.getMinutes();
    var sec = d.getSeconds();

    day = ("00" + day).slice(-2);
    month = ("00" + month).slice(-2);
    
    hora = ("00" + hora).slice(-2);
    min = ("00" + min).slice(-2);
    sec = ("00" + sec).slice(-2);
    
    var resul = day.toString()+'/'+month.toString()+'/'+year.toString()+'  '+hora+":"+min+":"+sec;
    return resul;
}

//=============================================
// ANEXOS DO PROCESSO
//=============================================

//---- função que adiciona linhas 
var addRow = function () {  
    var indice = wdkAddChild('tbanexos');             
    var button = $("#paramAnexo___"+indice).parent().find('button')[0];
    $(button).hide();
}

var addRow2 = function () {  
    var indice = wdkAddChild('tbanexos');         
    return indice;    
}

var showAttch = function(document,company,coddoc,versao){
    return "/webdesk/streamcontrol/"+document+"?WDCompanyId="+company+"&WDNrDocto="+coddoc+"&WDNrVersao="+versao;    
}

var modalViewAttch =  function (document,company,coddoc,versao){                
    var template 	= $('#tmplModal').html();                
    myModal = FLUIGC.modal({
        title: 'Visualizar anexo',
        content: template,
        id: 'form-edit-modal',
        size: 'large'
        ,
        actions: [
        {
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {             
        if(err) {                
        } else {                
            var url = showAttch(document,company,coddoc,versao);                
            $('iframe[name=visuaAnexo]').attr('src',url);
        }
    });	
}

var modalShow = function(e){
    var td = $(e).parent();
    var input = $(td).find('input')[0];
    var text = $(input).val();
    var vetor = text.split(";");

    var document = vetor[0], 
        company = vetor[1],
        coddoc = vetor[2],
        versao = vetor[3];

    modalViewAttch(document,company,coddoc,versao);

}

function showCamera(param){
        
    var index = $(param).attr('id');
    index = index.split("_");
    index = index[index.length - 1];
    console.log(index);    

    var MOBILE = parent.WCMAPI.isMobileAppMode();    
    if(MOBILE != false){
        param  = "ANEXO "+index;
        JSInterface.showCamera(param);        
    }
    else{
        JSInterface.showCamera();
    }
    
    
    var name_campo = $(param).parent().parent().find('input').attr('name');
            
    var index = name_campo.substr(name_campo.length - 1);        
    if (REVANEXO.indexOf(index) > -1) {
        REVANEXO.splice( REVANEXO.indexOf(index), 1 );
    }            
    REVANEXO.push(index);   

    parent.ECM.attachmentTable.on('change', () => {
        
        var load = FLUIGC.loading(window);
        load.show();
        
        setTimeout(() => {
            
            var file = parent.ECM.attachmentTable.getData();            
            var n1 = REVANEXO.length;
            var n2 = file.length;
                                                
            var j  = n2 - n1; 
                                                    
            $.each(REVANEXO, function(i, index) {                                   
                var attachment = file[j];                                    
                if(attachment){
                    var attachmentName = attachment.description;    
                    $("#descAnexo___"+index).val(attachmentName);        
                    if (attachment.documentId) {
                        $("#paramAnexo___"+index).val(attachmentName+';'+"1"+attachment.documentId+";"+attachment.version);                            
                    }                    
                }                    
                j++;
            });
                                   
            load.hide();
        }, 3000);           

    })
    
    $(param).parent().parent().parent().find("input[name^='checkAnexo___']").val('adicionado');
    preVerificaEscop(param);
    
    
}

function preVerificaEscop(val){
    var e = $(val).parent().parent().find("input[name^='descAnexo___']").val();

    if(e != '' || e != null){
        $(val).parent().parent().find('.removAnexo').attr('disabled',false);
        $(val).parent().parent().find('.adicAnexo').attr('disabled',true);
    }else{
        $(val).parent().parent().find('.removAnexo').attr('disabled',false);
        $(val).parent().parent().find('.adicAnexo').attr('disabled',true);
    }
}

var threatAttch = function () {

    $("#tbanexos").find("input[name^='paramAnexo___']").each(function(){  $(this).parent().parent().remove();  })
                    
    var file = parent.ECM.attachmentTable.getData();            
                                                
    $.each(file, function(i, campo) {            
        var attachment = file[i];                                    
                
        if(attachment){
            var attachmentName = attachment.description;     

            var index = addRow2();

            $("#descAnexo___"+index).val(attachmentName);
            $("#checkAnexo___"+index).val('cadastrado');
            var acoes = $("#paramAnexo___"+index).parent().find('button')[0];
                                        
            if (attachment.documentId) {
                
                $("#paramAnexo___"+index).val(""+attachmentName+';'+"1"+";"+attachment.documentId+";"+attachment.version+"");                                            
                $(acoes).show();
                    
                var url = showAttch(attachmentName,"1",attachment.documentId,attachment.version);                                  
                $("#linkAnexo___"+index).val(url);
                    
                var button = $("#descAnexo___"+index).parent().find('button')[1];
                $(button).attr('disabled',true);                
            }                    
            else{
                $(acoes).hide();
            }
        }        
    
    });
    
}

function delAnexo(e){

    var name_campo = $(e).parent().parent().find('input').attr('name');  
    var index = name_campo.substr(name_campo.length - 1);        
    if (REVANEXO.indexOf(index) > -1) {
        REVANEXO.splice( REVANEXO.indexOf(index), 1 );
    }   

    var desc = $(e).parent().parent().find("input[name^='descAnexo___']").val();

    $.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
        if(attachment.name == desc){
            parent.WKFViewAttachment.removeAttach([i])            
        }
    });

    $(e).parent().parent().find("input[name^='descAnexo___']").val('');
    $(e).parent().parent().find("input[name^='checkAnexo___']").val('');

    $(e).attr('disabled',true);
    $(e).parent().parent().find('.adicAnexo').attr('disabled',false);

    removeRow(e); 
    
    return true;
}

var removeRow = function (e) {
    fnWdkRemoveChild(e);    
}

//======= GRAU DE URGÊNCIA ======

var showButtonUrgence = function (e) {

    $('[data-urg]').removeClass('btn-success');
    $('[data-urg]').removeClass('btn-info');
    $('[data-urg]').removeClass('btn-warning');
    $('[data-urg]').removeClass('btn-danger');
    $('[data-urg]').addClass('btn-default');
    
    var button = $(e);   
    var grau  = $(e).data('urg');
    var input = $(e).find('input[name=grauUrg]')[0];
    
    $(grau).removeClass('btn-default');
    
    switch (grau) {
        case 'baixo':   
            $(button).addClass('btn-success');
            break;
        case 'medio':
            $(button).addClass('btn-info');
            break;
        case 'alta':
            $(button).addClass('btn-warning');
            break;
        case 'urgente':
            $(button).addClass('btn-danger');
            break;           
    }
}


var showUrgenceForm = function () {
    var grau = $("input[name=grauUrg]:checked").val();
    $("#lblGrauUrg").text(grau);

    $("#lblGrauUrg").removeClass('label-success');
    $("#lblGrauUrg").removeClass('label-info');
    $("#lblGrauUrg").removeClass('label-warning');
    $("#lblGrauUrg").removeClass('label-danger');
    
    switch (grau) {
        case 'Baixa':   
            $("#lblGrauUrg").addClass('label-success');            
            break;
        case 'Media':
            $("#lblGrauUrg").addClass('label-info');
            $("#lblGrauUrg").text("Média");
            break;
        case 'Alta':
            $("#lblGrauUrg").addClass('label-warning');
            break;
        case 'Urgente':
            $("#lblGrauUrg").addClass('label-danger');
            break;           
    }
}


