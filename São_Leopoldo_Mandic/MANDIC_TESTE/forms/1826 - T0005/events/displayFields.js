function displayFields(form,customHTML){ 
	
	form.setValue('CODUSUARIO', getValue('WKUser'));

	customHTML.append("<script type='text/javascript'>");
        customHTML.append(" $(function(){ ");
        customHTML.append(" $('div#collapse-tabs').hide(); ");
        customHTML.append(" console.log('teste'); ");
        customHTML.append(" }); ");
        customHTML.append("</script>");   
	
}