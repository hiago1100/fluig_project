function displayFields(form,customHTML){ 

	form.setHideDeleteButton(true);
    customHTML.append("<script type='text/javascript'>");
    customHTML.append(" $(function(){ ");
    customHTML.append(" $('div#logo').hide(); ");
    customHTML.append(" }); ");
    customHTML.append("</script>");


    if (form.getFormMode() == "VIEW")	{


    	 customHTML.append("<script type='text/javascript'>");
         customHTML.append(" $(function(){ ");
         customHTML.append(" $('#btnImprimir').hide(); ");
         customHTML.append(" }); ");
         customHTML.append("</script>");  
  
    }

}