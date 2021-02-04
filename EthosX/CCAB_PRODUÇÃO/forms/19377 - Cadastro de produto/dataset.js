class Dataset {
        
    constructor(ds, fields, order){
        this.dataset = ds;
        this.fields = fields;
        this.order = order;
    }
    
    //Cria constraints
    createConstraints(field, iValue, fValue, type, likeValue) {
        return { //constraints to filter the search, all fields specified inside are required
          "_field": field,
          //name of the field used in the constraint
          "_initialValue": iValue,
          //value to be filtered
          "_finalValue": fValue,
          //final value to be filtered
          "_type": type,
          //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
          "_likeSearch": likeValue
          //if it is a LIKE search
        };
      
    }
    
    //Realiza consulta 
    getDataset(cons) {
        var oData = {
          name: this.dataset,
          fields: this.fields,
          constraints: cons,
          order: this.order,
        };
        var url = '/api/public/ecm/dataset/datasets';
        var retorno = null;
        try {
          $.ajax(url, {
              method: 'POST',
              dataType: 'json',
              async: false,
              contentType: 'application/json',
              data: JSON.stringify(oData)
            })
            .done(function(oDataRet) {
              retorno = oDataRet.content;
            })
            .error(function(oError) {
              retorno = oError.responseText;
            });
        } catch (e) {
          retorno  = e.responseText;
        }
        return retorno;
    }
}

// ===============================



