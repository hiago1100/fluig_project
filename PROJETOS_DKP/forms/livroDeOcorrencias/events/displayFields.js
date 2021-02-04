function displayFields(form, customHTML) {
    FLUIGForms(form, customHTML);


    var CURRENT_STATE = getValue('WKNumState')
    var user = getValue('WKUser')

}

function FLUIGForms(form, customHTML) {
    customHTML.append("<script type='text/javascript'>");
    customHTML.append("if (FLUIGForms && FLUIGForms.initForm) {");
    customHTML.append("FLUIGForms.initForm({");
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