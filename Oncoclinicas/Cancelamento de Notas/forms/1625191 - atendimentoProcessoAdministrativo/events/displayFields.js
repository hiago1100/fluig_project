function displayFields(form, customHTML) {
    ARYForms(form, customHTML);


    var CURRENT_STATE = getValue('WKNumState')
    var user = getValue('WKUser')

    if (CURRENT_STATE == ANALISE_FISCAL) {
        form.setValue('responsavelAnalise',buscarNomeUsuario(user))
        form.setValue('dataAnalise',getCurrentDate())
        customHTML.append('<script> $("#acompanhamento").hide() </script>')
    } else if (CURRENT_STATE == ACONPANHAR_PROCESSO) {
        form.setValue('responsavelAcompanhamento',buscarNomeUsuario(user))
        form.setValue('dataAcompanhamento',getCurrentDate())
        customHTML.append('<script> $("#analiseFiscal").hide() </script>')
    } else if (CURRENT_STATE == ERRO_INTEGRACAO) {
        customHTML.append('<script> $("#analiseFiscal").hide() </script>')
        customHTML.append('<script> $("#acompanhamento").hide() </script>')
    }

    // if (CURRENT_STATE != START) {
    //     customHTML.append('<script> $("#analiseFiscal").show() </script>')
    // }
    
}
function buscarNomeUsuario(user) {
    var userName = "";
    var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', user, user, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('colleague', null, [c1], null);
    if (dataset.rowsCount == 1) {
        userName = dataset.getValue(0, 'colleagueName');
    }
    return userName;
}
// retorna a data arual no formato AAAA-mm-DD
function getCurrentDate() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    if (dia < 10) { dia = '0' + dia }
    if (mes < 10) { mes = '0' + mes }
    return ano + '-' + mes + '-' + dia;
}

function ARYForms(form, customHTML) {
    customHTML.append("<script type='text/javascript'>");
    customHTML.append("if (ARYForms && ARYForms.initForm) {");
    customHTML.append("ARYForms.initForm({");
    customHTML.append(" formMode:'" + form.getFormMode() + "',");
    customHTML.append(" WKCompany:'" + getValue("WKCompany") + "',");
    customHTML.append(" WKNumState:'" + getValue("WKNumState") + "',");
    customHTML.append(" WKNumProces:'" + getValue("WKNumProces") + "',");
    customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState") + "',");
    customHTML.append(" WKUser:'" + getValue("WKUser") + "',");
    customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile()) + ",");
    customHTML.append("});");
    customHTML.append("}</script>");
}