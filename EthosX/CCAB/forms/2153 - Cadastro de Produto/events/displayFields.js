function displayFields(form,customHTML){

    // Parametros do registro do formulário
    var mobile = getValue("WKMobile");
    var atv    = getValue("WKNumState");
    var sol    = getValue("WKNumProces");
    var docid  = getValue("WKCardId");
    var user   = getValue("WKUser");
    
    form.setValue('formMode', form.getFormMode());
    form.setValue('isMobile', mobile);
    form.setValue('atvAtual', atv);
    form.setValue('numSolicitacao', sol);
    form.setValue('numDoc', docid);
    form.setValue('matricula', user);

    form.setShowDisabledFields(true);

    customHTML.append("<script>");
        // customHTML.append("$('.grau_opcoes').hide();");
                
        if(atv == 0 || atv == 4 || atv == null || atv == ""){            
            customHTML.append("$('.grau_label').hide();");               
        } 
        else{
            customHTML.append("$('.grau_botoes').hide();");
            customHTML.append("threatAttch();");
            customHTML.append("showUrgenceForm();");   
            customHTML.append("$('.grau_label').show();");         
        }       
    customHTML.append("</script>");

}