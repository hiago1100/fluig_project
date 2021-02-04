function enableFields(form){
    
    var atividade = parseInt(getValue("WKNumState"));
    
    var campos = [
        [['cpAvaliacaoN1', 'cpAvaliacaoN2' , 'cpAvaliacaoN3', 
          'cpAvaliacaoN4', 'cpAvaliacaoN5' , 'cpAvaliacaoN6', 
          'cpAvaliacaoN7', 'cpAvaliacaoN8' , 'cpAvaliacaoN9', 
          'cpAvaliacaoN10', 'cpEvidenciaHabilidade', 'cpObservacao'], 3],
  		  
        [['cpEvidenciaConsultoria', 'cpParecerConsultoria'], 4],
        
        [['cpSegundaAvaliacaoN1', 'cpSegundaAvaliacaoN2', 'cpSegundaAvaliacaoN3', 
          'cpSegundaAvaliacaoN4', 'cpSegundaAvaliacaoN5', 'cpSegundaAvaliacaoN6', 
          'cpSegundaAvaliacaoN7', 'cpSegundaAvaliacaoN8', 'cpSegundaAvaliacaoN9', 
          'cpSegundaAvaliacaoN10', 'cpEvidenciaGestor', 'cpObservacaoGestor', ], 5],           
        
        [['cpEvidenciaAvaliacao' , 'cpParecerAvaliacao'], 6]
          
    ];
    
    var isNotAtividade = function(atvList) {
        return Array.isArray(atvList) ? atvList.indexOf(atividade) == -1 : atvList != atividade;
    };
    
    var disableFields = function(fields){
        if (Array.isArray(fields)){
            fields.forEach(function(field){
                form.setEnabled(field, false);
            });
        }else{
            form.setEnabled(fields, false);
        }
    };
    
    campos.forEach(function(cList){
        if (isNotAtividade(cList[1]) ){
            disableFields(cList[0]);
        }

    });



    if(atividade == 3 || atividade == 43){
      form.setEnabled('cpAvaliacaoN1', true);
      form.setEnabled('cpAvaliacaoN2', true);
      form.setEnabled('cpAvaliacaoN3', true);
      form.setEnabled('cpAvaliacaoN4', true);
      form.setEnabled('cpAvaliacaoN5', true);
      form.setEnabled('cpAvaliacaoN6', true);
      form.setEnabled('cpAvaliacaoN7', true);
      form.setEnabled('cpAvaliacaoN8', true);
      form.setEnabled('cpAvaliacaoN9', true);
      form.setEnabled('cpAvaliacaoN10', true);
      form.setEnabled('cpEvidenciaHabilidade', true);
      form.setEnabled('cpObservacao', true);
    }

    if(atividade == 5 || atividade == 50){
      form.setEnabled('cpSegundaAvaliacaoN1', true);
      form.setEnabled('cpSegundaAvaliacaoN2', true);
      form.setEnabled('cpSegundaAvaliacaoN3', true);
      form.setEnabled('cpSegundaAvaliacaoN4', true);
      form.setEnabled('cpSegundaAvaliacaoN5', true);
      form.setEnabled('cpSegundaAvaliacaoN6', true);
      form.setEnabled('cpSegundaAvaliacaoN7', true);
      form.setEnabled('cpSegundaAvaliacaoN8', true);
      form.setEnabled('cpSegundaAvaliacaoN9', true);
      form.setEnabled('cpSegundaAvaliacaoN10', true);
      form.setEnabled('cpEvidenciaGestor', true);
      form.setEnabled('cpObservacaoGestor', true);
    }

    if(atividade != 3){
        form.setEnabled('cbTransferirGestor', false);
    }

    if(atividade != 5){
        form.setEnabled('cbTransferirGestorSeg', false);
    }


}