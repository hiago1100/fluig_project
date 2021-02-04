function displayFields(form, customHTML) {

    var atividade = parseInt(getValue("WKNumState"));
    atividade = atividade == 0 ? 4 : atividade;
    customHTML.append("<script type='text/javascript'>");
    customHTML.append("initDisplayFields(" + atividade + ");");
    customHTML.append("</script>");

}