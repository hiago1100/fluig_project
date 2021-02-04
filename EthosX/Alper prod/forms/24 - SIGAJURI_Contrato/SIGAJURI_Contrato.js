$(function() {

    //altera visibilidade dos campos
    lockFields();
    setMascaras();

    //inicializa o switchee
    FLUIGC.switcher.init('#cbRenova');

    var sVigenciaDe = FLUIGC.calendar('#sVigenciaDe', {
        language: 'pt'
    });

    var sVigenciaAte = FLUIGC.calendar('#sVigenciaAte', {
        language: 'pt'
    });

	
	$('#zoomAtivoBtn').click(function(){
        var escritorio = $('#cdFilialNS7 option:selected').val();

		switch($('input[name=optAtivo]:radio:checked').val()){
            case "optCli":
	    	mostraZoom('EMP','A',escritorio);
                $('#cdEntAtivo').val('SA1');
                break;
            case "optForn":
	    	mostraZoom('FOR','A',escritorio);
                $('#cdEntAtivo').val('SA2');
                break;
            case "optOutros":
	    	mostraZoom('NZ2','A',escritorio);
                $('#cdEntAtivo').val('NZ2');
                break;
        }

            });
		
	$('#zoomTransferenciaBtn').click(function(){
		var resp = $('#sStatusProc').val();
		if (resp=='1'){
			mostraZoom('RESP');
        } else {
			mostraZoom('RESP');
        }
    });

	$('#zoomPassivoBtn').click(function(){
		var escritorio = $('#cdFilialNS7 option:selected').val();

		switch($('input[name=optPassivo]:radio:checked').val()){
            case "optCli":
	    	mostraZoom('EMP','P',escritorio);
                $('#cdEntPassivo').val('SA1');
                break;
            case "optForn":
	    	mostraZoom('FOR','P',escritorio);
                $('#cdEntPassivo').val('SA2');
                break;
            case "optOutros":
	    	mostraZoom('NZ2','P',escritorio);
                $('#cdEntPassivo').val('NZ2');
                break;
        }

    });

    $("input[name='optAtivo']").on("change", function() {

        switch (this.value) {
            case "optCli":
                $('#btnNovaParte').prop("disabled", true);
                $('#optPassivoForn').prop("disabled", false);
                $('#optPassivoOutros').prop("disabled", false);
                break;
            case "optForn":
                $('#btnNovaParte').prop("disabled", true);
                $('#optPassivoForn').prop("disabled", false);
                $('#optPassivoOutros').prop("disabled", false);
                break;
            case "optOutros":
                $('#btnNovaParte').prop("disabled", false);
                $('#optPassivoForn').prop("disabled", true);
                $('#optPassivoOutros').prop("disabled", true);
                $('#optPassivoCli').prop("checked", true);
                break;
        }
    });

    $("input[name='optPassivo']").on("change", function() {
        switch (this.value) {
            case "optCli":
                $('#btnNovaParte').prop("disabled", true);
                $('#optAtivoForn').prop("disabled", false);
                $('#optAtivoOutros').prop("disabled", false);
                break;
            case "optForn":
                $('#btnNovaParte').prop("disabled", true);
                $('#optAtivoForn').prop("disabled", false);
                $('#optAtivoOutros').prop("disabled", false);
                break;
            case "optOutros":
                $('#btnNovaParte').prop("disabled", false);
                $('#optAtivoForn').prop("disabled", true);
                $('#optAtivoOutros').prop("disabled", true);
                $('#optAtivoCli').prop("checked", true);
                break;
        }
    });

    $('#btnNovaParte').click(function() {
        $("#dvNovaParte").toggle(true);

        //determina se o cadastro é para o pólo ativo ou passivo
        if ($('input[name=optAtivo]:radio:checked').val() == "optOutros") {
            //desabilita os campos para evitar que o zoom seja utilizado
            $('input[name="optAtivo"]').prop("disabled", true);
            $('#zoomAtivoBtn').toggle(false);

            //zera os campos caso exista algo preenchido
            $('#cdAtivo').val("");
            $('#sAtivo').val("");
            $('#cdEntAtivo').val("NZ2");
        } else {
            //desabilita os campos para evitar que o zoom seja utilizado
            $('input[name="optPassivo"]').prop("disabled", true);
            $('#zoomPassivoBtn').toggle(false);

            //zera os campos caso exista algo preenchido
            $('#cdPassivo').val("");
            $('#sPassivo').val("");
            $('#cdEntPassivo').val("NZ2");
        }

        $(this).prop("disabled", true);

    });

    $('#btnCancel').click(function() {
        $("#dvNovaParte").toggle(false);

        $('#btnNovaParte').prop("disabled", false);

        //determina se o cadastro é para o pólo ativo ou passivo
        if ($('input[name=optAtivo]:radio:checked').val() == "optOutros") {
            $('input[name="optAtivo"]').prop("disabled", false);
            $('#zoomAtivoBtn').toggle(true);
        } else {
            $('input[name="optPassivo"]').prop("disabled", false);
            $('#zoomPassivoBtn').toggle(true);
        }

        limpaNovaParte();

    });

    $('#btnLimpaForn').click(function() {
        limpaNovaParte();
    });

    $("#cdTipoCon").change(function() {
        if ($('#sTipoCon').is(":hidden")) {
            $('#sTipoCon').val($('#cdTipoCon option:selected').text());
        }
    });

    $("#cdAreaSol").change(function() {
        if ($('#sAreaSol').is(":hidden")) {
            $('#sAreaSol').val($('#cdAreaSol option:selected').text());
        }
    });

    $("#cdFilialNS7").change(function() {
        if ($('#sFilialNS7').is(":hidden")) {
            $('#sFilialNS7').val($('#cdFilialNS7 option:selected').text());
        }
    });

    loadInitial();

    FLUIGC.switcher.onChange($('#cbRenova'), function(event, state) {
        if ($('#cdCajuri').val() == "") {
            $('#sRenovacao').val(state ? "1" : "2");
        }
    });

    $('#btnTransferir').click(function() {
        $('#_sTransferencia').val('');
        $('#sTransferencia').val('');
        $("#dvTransferir").toggle();
        if ($('#dvTransferir').is(":hidden")) {
            $('#sTransferencia').val('');
            $('#_sTransferencia').val('');
        }

    });


});

function limpaNovaParte() {
    $('#sRazaoSocial').val('');
    $('#sCnpj').val('');
    $('#sEndereco').val('');
    $('#sComplemento').val('');
    $('#sBairro').val('');
    $('#sEstado').val('');
    $('#sCidade').val('');
    $('#sCep').val('');
}

function mostraZoom(id, polo,escritorio){
    var type = '';
    var ds = '';
    var zoomTitle = '';
    var zoomHeader = '';
    var zoomFields = '';
    var zoomFilter = '';

    switch (id) {

        case 'EMP':
            type = polo + 'EMP';
            ds = 'dsClienteSigajuri';
            zoomTitle = 'Escolha uma empresa';
            zoomHeader = 'Razao_Social,Razão Social,Nome_Fantasia,Nome Fantasia,Cnpj,CNPJ';
            zoomFields = 'Id,Razao_Social,Nome_Fantasia,Cnpj';
		zoomFilter = 'Razao_Social, ,Escritorio,'+ escritorio
            break;
        case 'FOR':
            type = polo + 'FOR';
            ds = 'dsFornecedorSigajuri';
            zoomTitle = 'Escolha um fornecedor';
            zoomHeader = 'Razao_Social,Razão Social,Nome_Fantasia,Nome Fantasia,Cnpj,CNPJ';
            zoomFields = 'Id,Razao_Social,Nome_Fantasia,Cnpj';
		zoomFilter = 'Razao_Social, ,Escritorio,' + escritorio;
            break;
        case 'NZ2':
            type = polo + 'NZ2';
            ds = 'dsParteContrariaSIGAJURI';
            zoomTitle = 'Escolha uma parte';
            zoomHeader = 'Razao_Social,Razão Social,Cnpj,CNPJ';
            zoomFields = 'Id,Razao_Social,Cnpj';
		zoomFilter = 'Razao_Social, ,Escritorio,' + escritorio;
            break;
        case 'RESP':
		type = '_RESP';
            ds = "colleague";
            zoomTitle = "Usuários";
            zoomHeader = "colleagueName,Nome,mail,Email";
            zoomFields = "colleagueName,colleaguePK.colleagueId,mail";
            zoomFilter = "active,true"
            break;
    }

	window.open("/webdesk/zoom.jsp?datasetId=" + ds + "&dataFields=" + zoomHeader + "&resultFields=" + zoomFields + "&type=" + type + "&filterValues=" + zoomFilter + "&title=" + zoomTitle, "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
};

function setSelectedZoomItem(selectedItem) {
    var polo = selectedItem.type.substring(0, 1);
    var tipo = selectedItem.type.substring(1);
    var sDescricao = '';

    if (tipo == "NZ2") {
        sDescricao = selectedItem.Razao_Social + ' - ' + selectedItem.Cnpj;
    } else {
        sDescricao = selectedItem.Razao_Social + ' - ' + selectedItem.Nome_Fantasia + ' - ' + selectedItem.Cnpj;
    }

    if (polo != "_") {
        //valida o polo para diferenciar os campos
        if (polo == "A") {
            $('#cdAtivo').val(selectedItem.Id);
            $('#sAtivo').val(sDescricao);
        } else {
            $('#cdPassivo').val(selectedItem.Id);
            $('#sPassivo').val(sDescricao);
        }
    }

    switch (tipo) {
        case 'EMP':
            if (polo == "A") {
                $('#cdEntAtivo').val('SA1');
            } else {
                $('#cdEntPassivo').val('SA1');
            }
            break;
        case 'FOR':
            if (polo == "A") {
                $('#cdEntAtivo').val('SA2');
            } else {
                $('#cdEntPassivo').val('SA2');
            }
            break;
        case 'NZ2':
            if (polo == "A") {
                $('#cdEntAtivo').val('NZ2');
            } else {
                $('#cdEntPassivo').val('NZ2');
            }
            break;
        case 'RESP':
                $('#_sTransferencia').val(selectedItem.colleagueName);
                $('#sTransferencia').val(selectedItem.colleagueName);

                if ($('#sStatusProc').val() == "1") {
                    $('#cdResponsavel').val(selectedItem["colleaguePK.colleagueId"]);
                } else {
                    $('#cdSolicitante').val(selectedItem["colleaguePK.colleagueId"]);
                }
            break;
    }

};

function lockFields() {
    //oculta div nova parte
    $("#dvNovaParte").toggle(false);
    $("#dvTransferir").toggle(false);
};

function setMascaras() {
	$('#sValor').mask('#.##0,00', {reverse: true});
	
};


function loadInitial() {
    var lCarrega = true; //variável global para identificar o status da tarefa
    var ABRIR = 2;
    var step = parseInt($("#sStatusAtiv").val());

    if ($('#cdCajuri').val() != "") {
        lCarrega = false;
    }

    //carrega os valores padrao para os campos caso não seja inclusão

    if ($('#sRenovacao').val() != "") {
        if ($('#sRenovacao').val() == "1") {
            FLUIGC.switcher.setTrue('#cbRenova');
        } else {
            FLUIGC.switcher.setFalse('#cbRenova');
        }
    }

    if (lCarrega) {
        if ($('#sTipoCon').is(":hidden")) {
            $('#sTipoCon').val($('#cdTipoCon option:selected').text());
        }
        if ($('#sAreaSol').is(":hidden")) {
            $('#sAreaSol').val($('#cdAreaSol option:selected').text());
        }
        if ($('#sFilialNS7').is(":hidden")) {
            $('#sFilialNS7').val($('#cdFilialNS7 option:selected').text());
        }

        $('#btnTransferir').toggle(!lCarrega);
    } else {
        //esconde botão do zoom
        $('#zoomAtivoBtn').toggle(lCarrega);
        $('#zoomPassivoBtn').toggle(lCarrega);
        FLUIGC.switcher.disable('#cbRenova');
    }

    $('#linkFolder').toggle(step != ABRIR && $('#sPastaCaso').val() != "");
}

function AnexoDoc() {
    var concAnexo = '';
    var context = window.parent.WCMAPI.getContextPath();
    var empresa = window.parent.WCMAPI.getTenantCode();
    var pastaCaso = document.getElementById("sPastaCaso").value;

    concAnexo = (context + '/p/' + empresa + '/ecmnavigation?app_ecm_navigation_doc=' + pastaCaso);

    if (pastaCaso != '') {
        window.open(concAnexo);
    }
}
