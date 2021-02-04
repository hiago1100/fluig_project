function validateForm(form){

  var activity = getValue('WKNumState');


if (activity == 4) {

    var indexes = form.getChildrenIndexes("tableDepositos");
    if (indexes.length > 0) {

      if ((form.getValue("cpFilial") == null) || (form.getValue("cpFilial") == "")){

                    throw "Necessário Informar a Filial";
       }
  
        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
            if(form.getValue('dtDeposito___' + indexes[i]) == null || form.getValue('dtDeposito___' + indexes[i]) == '') {
                throw "Favor informar a Data de Deposito";
            }

            if(form.getValue('seleTipoPgmt___' + indexes[i]) == null || form.getValue('seleTipoPgmt___' + indexes[i]) == '') {
                throw "Informe o valor Ajustado! 2";
            } 

            if(form.getValue('cpBanco___' + indexes[i]) == null || form.getValue('cpBanco___' + indexes[i]) == '') {
                throw "Informe o valor Ajustado! 3";
            } 



        }
    }
}


}