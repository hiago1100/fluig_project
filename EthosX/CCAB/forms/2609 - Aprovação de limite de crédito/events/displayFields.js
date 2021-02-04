function displayFields(form,customHTML){ 

    var atv = getValue("WKNumState");
    var user = getValue("WKUser");

    customHTML.append("<script> \n");
    customHTML.append("var CURRENT_STATE = "+atv+";  \n");    
    customHTML.append("var USERID = "+user+"; \n");    
    customHTML.append("</script>");

}