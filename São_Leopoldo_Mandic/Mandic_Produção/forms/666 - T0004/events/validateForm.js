function validateForm(form){


var activity = getValue('WKNumState'); 

	 var msg = "";
	   var indice = form.getChildrenIndexes("dsItens");

      if (indice.length != 0) {
          for (var i = 0; i < indice.length; i++) {
                 var iditem = "___"+indice[i];

                 var l = i+1; 
                 
                 if (activity == 2) {
                	 if ( (form.getValue("comAprFinanceiro"+iditem )== null) || (form.getValue("comAprFinanceiro"+iditem ) )==""){
                         msg = msg +  "O Campo Aprovado deve ser Preenchido na Linha "+l+" ";
                       }else if(form.getValue("comAprFinanceiro"+iditem )!= "S"){
			                	 if ( (form.getValue("txtJustificativaFin"+iditem )== null) | (form.getValue("txtJustificativaFin"+iditem ) )==""){
			                         msg = msg +  "Para Itens Não Aprovados a Justificativa deve ser Preenchida na Linha "+l+" ";
			                       }
                 				}
                  } else if (activity == 8 ){
                 	 if ( (form.getValue("comAprMantenedora"+iditem )== null) || (form.getValue("comAprMantenedora"+iditem ) )==""){
                         msg = msg +  "O Campo Aprovado deve ser Preenchido na Linha "+l+" ";
                       }else if(form.getValue("comAprMantenedora"+iditem )!= "S"){
			                	 if ( (form.getValue("txtJustificativaMan"+iditem )== null) | (form.getValue("txtJustificativaMan"+iditem ) )==""){
			                         msg = msg +  "Para Itens Não Aprovados a Justificativa deve ser Preenchida na Linha "+l+" ";
			                       }
                 				}
                  } 
                 }     
              }
  

  if (msg != "") {
        throw msg;
     }

}