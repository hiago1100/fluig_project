function validateForm(form){
    var STAGE = getValue("WKNumState");

    var message = '';
    var messageAtt = '';

    if(STAGE == 0 || STAGE == INICIO){
        // ============= CATEGORIA  =============
        if (form.getValue('tipoProd') == null || form.getValue('tipoProd') == ''){
            message += "</br>- Categoria do produto ";
        }

        // ============ DEPARTAMENTO ============
        if(form.getValue('tipoProd') == "servico" && (form.getValue('departCadastrante') == '' || form.getValue('departCadastrante') == null)){
            message += "</br>- Departamento Cadastrante ";
        }

        //========== GRAU DE URGÊNCIA ===========
        if (form.getValue('grauUrg') == null || form.getValue('grauUrg') == ''){
            message += "</br>- Grau de urgência ";
        }

        // =================================================================
        if(form.getValue('tipoProd') == "direta"){
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "</br>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "</br>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "</br>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "</br>- Unidade de medida do produto ";
            }
        }

        // =================================================================
        if(form.getValue('tipoProd') == "indireta" || (form.getValue('tipoProd') == "servico" && form.getValue('departCadastrante') == "suprimentos")){
            // if(form.getValue('codigo_produto') == null || form.getValue('codigo_produto') == ''){
            //     message += "<br/>- Código do produto ";
            // }
            if(form.getValue('cod_prod') != null && form.getValue('cod_prod') != ""){
                messageAtt += "<br/>- Código do Produto informado <strong>já existe</strong>";
            }
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "<br/>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "<br/>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "<br/>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "<br/>- Unidade de medida do produto ";
            }
            if(form.getValue('armazem_produto') == null || form.getValue('armazem_produto') == ''){
                message += "<br/>- Armazém Padrão do produto ";
            }

            // ============ PRINCIPIO ATIVO ============
            if(form.getValue('codNewPrincpAtivo') == "Sim"){
                if(form.getValue('codigo_princpAtiv') == '' || form.getValue('codigo_princpAtiv') == null){
                    message += "<br/>- Código do <strong>novo</strong> Principio Ativo do produto ";
                }

                if(form.getValue('desc_principAtiv') == '' || form.getValue('desc_principAtiv') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Principio Ativo do produto ";
                }

                // if(form.getValue('cod_princpAtiv') != '' && form.getValue('cod_princpAtiv') != null){
                //     messageAtt += "<br/>- Código do <strong>novo</strong> Principio Ativo informado <strong>já existe</strong> ";
                // }

            }else if(form.getValue('codNewPrincpAtivo') == "Não"){
                if(form.getValue('codPrincpAtivo_produto') == '' || form.getValue('codPrincpAtivo_produto') == null){
                    message += "<br/>- Principio Ativo do produto ";
                }
            }
            // ============ PRÉ PRODUTO ============
            if(form.getValue('codTipo_produto') == "PA"){  
                log.info("validate 1");
                if(form.getValue('codNewPreProd') == "" || form.getValue('codNewPreProd') == null){
                    message += "<br/>- Tipo <strong>PA</strong> Pré-Produto obrigatório ";
                }

                if(form.getValue('newPrincpAtivo') == "" || form.getValue('newPrincpAtivo') == null){
                    message += "<br/>- Tipo <strong>PA</strong> novo Principio ativo obrigatório ";
                }

            if(form.getValue('newPreProd') == "sim"){
                if(form.getValue('codigo_preproduto') == '' || form.getValue('codigo_preproduto') == null){
                    message += "<br/>- Código do <strong>novo</strong> Pré-Produto do produto ";
                }

                if(form.getValue('desc_preproduto') == '' || form.getValue('desc_preproduto') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Pré-Produto do produto";
                }

                if(form.getValue('cod_preProduto') != ''){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Pré-Produto informado <strong>já existe</strong> ";
                }
            }

            if(form.getValue('newPreProd') == "nao"){
                if(form.getValue("codPreProd_produto") == "" || form.getValue("codPreProd_produto") == null){ 
                messageAtt += "<br/>- Informar <strong>Pré-produto</strong> já existe  ";
                }
            }

          }
        //   if(form.getValue('codTipo_produto') != "PA"){
        //     if(form.getValue('newPreProd') == "nao"){
        //         if(form.getValue("codPreProd_produto") == "" || form.getValue("codPreProd_produto") == null){ 
        //         messageAtt += "<br/>- Informar <strong>Pré-produto</strong> já existe  ";
        //         }
        //     }
        //   }

        }

        // =================================================================
        if(form.getValue('tipoProd') == "servico" && form.getValue('departCadastrante') == "fiscal"){
            // if(form.getValue('codigo_produto') == null || form.getValue('codigo_produto') == ''){
            //     message += "<br/>- Código do produto ";
            // }
            if(form.getValue('cod_prod') != null && form.getValue('cod_prod') != ""){
                messageAtt += "<br/>- Código do Produto informado <strong>já existe</strong>";
            }
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "<br/>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "<br/>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "<br/>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "<br/>- Unidade de Medida do produto ";
            }
            if(form.getValue('armazem_produto') == null || form.getValue('armazem_produto') == ''){
                message += "<br/>- Armazém Padrão do produto ";
            }
            if(form.getValue('codOrigem_produto') == null || form.getValue('codOrigem_produto') == ''){
                message += "<br/>- Origem do produto ";
            }
            if(form.getValue('codGrupTrib_produto') == null || form.getValue('codGrupTrib_produto') == ''){
                message += "<br/>- Grupo Tributário do produto ";
            }

            // ============ PRINCIPIO ATIVO ============
            if(form.getValue('codNewPrincpAtivo') == "Sim"){
                if(form.getValue('codigo_princpAtiv') == '' || form.getValue('codigo_princpAtiv') == null){
                    message += "<br/>- Código do <strong>novo</strong> Princípio Ativo do produto ";
                }

                if(form.getValue('desc_principAtiv') == '' || form.getValue('desc_principAtiv') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Principio Ativo do produto ";
                }

                // if(form.getValue('cod_princpAtiv') == '' || form.getValue('cod_princpAtiv') == null){
                //     messageAtt += "<br/>- Código do <strong>novo</strong> Principio Ativo informado <strong>já existe</strong> ";
                // }

            }
            else if(form.getValue('codNewPrincpAtivo') == "Não"){
                if(form.getValue('codPrincpAtivo_produto') == '' || form.getValue('codPrincpAtivo_produto') == null){
                    message += "<br/>- o Princípio Ativo do produto ";
                }
            }

            // ============ PRÉ PRODUTO ============
            if (form.getValue('codTipo_produto') == "PA"){ 
              if(form.getValue('codNewPreProd') == "Não"){
                 //ok
                  if(form.getValue('codPreProd_produto') == '' || form.getValue('codPreProd_produto') == null){
                      message += "<br/>- Pré-Produto do produto ";
                  }
             }
            }

            // ==========================================
            if(form.getValue('retorno') != 'sim'){
                if(form.getValue('infoComplFisc') == null || form.getValue('infoComplFisc') == ''){
                    message += '<br/>- Se a necessidade de completo de informações de outro departamento ';
                }
    
                if(form.getValue('infoComplFisc') == 'sim'){
                    if(form.getValue('departFisc3') == null || form.getValue('departFisc3') == ''){
                        message += '<br/>- Departamento para complementar informações ';
                    }
                    if(form.getValue('necess_retorno') == null || form.getValue('necess_retorno') == ''){
                        message += '<br/>- Descrição da necessidade do complemento ';
                    }
                }
            }
        }

    }
    else{
        if(form.getValue('retorno') == 'sim'){            
    
            if(form.getValue('necess_retorno') == null || form.getValue('necess_retorno') == ''){
                message += "<br/>- Descrição da necessidade de complemento";
            }
            
        }
    }

    if(STAGE == SUPRIMENTOS){
        if(form.getValue('tipoProd') == "direta"){
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "</br>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "</br>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "</br>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "</br>- Unidade de medida do produto ";
            }
        }

        // =================================================================
        if(form.getValue('tipoProd') == "indireta" || (form.getValue('tipoProd') == "servico" && form.getValue('departCadastrante') == "suprimentos")){
            // if(form.getValue('codigo_produto') == null || form.getValue('codigo_produto') == ''){
            //     message += "<br/>- Código do produto ";
            // }
            if(form.getValue('cod_prod') != null && form.getValue('cod_prod') != ""){
                messageAtt += "<br/>- Código do Produto informado <strong>já existe</strong>";
            }
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "<br/>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "<br/>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "<br/>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "<br/>- Unidade de medida do produto ";
            }
            if(form.getValue('armazem_produto') == null || form.getValue('armazem_produto') == ''){
                message += "<br/>- Armazém Padrão do produto ";
            }

            // ============ PRINCIPIO ATIVO ============
            if(form.getValue('codNewPrincpAtivo') == "sim"){
                if(form.getValue('codigo_princpAtiv') == '' || form.getValue('codigo_princpAtiv') == null){
                    message += "<br/>- Código do <strong>novo</strong> Principio Ativo do produto ";
                }

                if(form.getValue('desc_principAtiv') == '' || form.getValue('desc_principAtiv') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Principio Ativo do produto ";
                }

                if(form.getValue('cod_princpAtiv') == '' || form.getValue('cod_princpAtiv') == null){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Principio Ativo informado <strong>já existe</strong> ";
                }
            }else if(form.getValue('codNewPrincpAtivo') == "nao"){
                if(form.getValue('codPrincpAtivo_produto') == '' || form.getValue('codPrincpAtivo_produto') == null){
                    message += "<br/>- Principio Ativo do produto ";
                }
            }
            // ============ PRÉ PRODUTO ============
            if(form.getValue('codNewPreProd') == "sim"){
                if(form.getValue('codigo_preproduto') == '' || form.getValue('codigo_preproduto') == null){
                    message += "<br/>- Código do <strong>novo</strong> Pré-Produto do produto ";
                }

                if(form.getValue('desc_preproduto') == '' || form.getValue('desc_preproduto') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Pré-Produto do produto";
                }

                if(form.getValue('cod_preProduto') != ''){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Pré-Produto informado <strong>já existe</strong> ";
                }
            }else if(form.getValue('codNewPreProd') == "nao"){
                if(form.getValue('codPreProd_produto') == '' || form.getValue('codPreProd_produto') == null){
                    message += "<br/>- Pré-Produto do produto ";
                }
            }
        }

        // =================================================================
        if(form.getValue('tipoProd') == "servico" && form.getValue('departCadastrante') == "fiscal"){
            
           
            if(form.getValue('desc_produto') == null || form.getValue('desc_produto') == ''){
                message += "<br/>- Descrição do produto ";
            }
            if(form.getValue('codTipo_produto') == null || form.getValue('codTipo_produto') == ''){
                message += "<br/>- Tipo do produto ";
            }
            if(form.getValue('grupo_produto') == null || form.getValue('grupo_produto') == ''){
                message += "<br/>- Grupo do produto ";
            }
            if(form.getValue('codUniMed_produto') == null || form.getValue('codUniMed_produto') == ''){
                message += "<br/>- Unidade de Medida do produto ";
            }
            if(form.getValue('armazem_produto') == null || form.getValue('armazem_produto') == ''){
                message += "<br/>- Armazém Padrão do produto ";
            }
            if(form.getValue('codOrigem_produto') == null || form.getValue('codOrigem_produto') == ''){
                message += "<br/>- Origem do produto ";
            }
            if(form.getValue('codGrupTrib_produto') == null || form.getValue('codGrupTrib_produto') == ''){
                message += "<br/>- Grupo Tributário do produto ";
            }


            // ============ PRINCIPIO ATIVO ============
            if(form.getValue('codNewPrincpAtivo') == "sim"){
                if(form.getValue('codigo_princpAtiv') == '' || form.getValue('codigo_princpAtiv') == null){
                    message += "<br/>- Código do <strong>novo</strong> Princípio Ativo do produto ";
                }

                if(form.getValue('desc_principAtiv') == '' || form.getValue('desc_principAtiv') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Principio Ativo do produto ";
                }

                if(form.getValue('cod_princpAtiv') == '' || form.getValue('cod_princpAtiv') == null){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Principio Ativo informado <strong>já existe</strong> ";
                }

            }else if(form.getValue('codNewPrincpAtivo') == "nao"){
                if(form.getValue('codPrincpAtivo_produto') == '' || form.getValue('codPrincpAtivo_produto') == null){
                    message += "<br/>- o Princípio Ativo do produto ";
                }
            }

            // ============ PRÉ PRODUTO ============
            if(form.getValue('codNewPreProd') == "sim"){
                if(form.getValue('codigo_preproduto') == '' || form.getValue('codigo_preproduto') == null){
                    message += "<br/>- Código do <strong>novo</strong> Pré-Produto do produto ";
                }
                

                if(form.getValue('desc_preproduto') == '' || form.getValue('desc_preproduto') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Pré-Produto do produto ";
                }
                
                if(form.getValue('cod_preProduto') != ''){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Pré-Produto informado <strong>já existe</strong> ";
                }
            }else if(form.getValue('codNewPreProd') == "nao"){
                if(form.getValue('codPreProd_produto') == '' || form.getValue('codPreProd_produto') == null){
                    message += "<br/>- Pré-Produto do produto ";
                }
            }
        }
    }

    if(STAGE == LOGISTICA){
        // =========================== NECESSIDADE ===========================
                        
        // if(form.getValue('retorno') == 'sim'){
          if (form.getValue('infoComplLogist') == null || form.getValue("infoComplLogist") == '' || form.getValue("infoComplLogist") == 'nao') {  


            if(form.getValue('infoComplLogist') == null || form.getValue("infoComplLogist") == ''){
                message += "<br/>- Se a necessidade de completo de informações de outro departamento ";
            }
            
            if(form.getValue('infoComplLogist') == 'sim'){
                if(form.getValue('departLogist') == null || form.getValue('departLogist') == ''){
                    message += "<br/>- Departamento para complementar informações ";
                }
                if(form.getValue('necess_retorno') == null || form.getValue('necess_retorno') == ''){
                    message += "<br/>- Descrição da necessidade de complemento";
                }
            }
        // }else{

            // if(form.getValue('codigo_produto') == null || form.getValue('codigo_produto') == ''){
            //     message += "<br/>- Código do produto ";
            // }

            if(form.getValue('cod_prod') == "erro"){
                messageAtt += "<br/>- Código do Produto informado <strong>já existe</strong>";
            }

            if(form.getValue('codArmazem_produto') == null || form.getValue('codArmazem_produto') == ''){
                message += "<br/>- Armazém padrão do produto ";
            }
            // ============ PRINCIPIO ATIVO ============
            if(form.getValue('codNewPrincpAtivo') == null || form.getValue('codNewPrincpAtivo') == ''){
                message += "<br/>- Informar necessidade de <strong>novo</strong> Princípio Ativo do produto ";
            }
             if (form.getValue('codTipo_produto') == "PA" && form.getValue('newPreProd') == "sim"){
                log.info("validate 2");
                if(form.getValue('codigo_preproduto') == '' || form.getValue('codigo_preproduto') == null){
                    message += "<br/>- Código do <strong>novo</strong> Pré-Produto do produto ";
                }
    
                if(form.getValue('desc_preproduto') == '' || form.getValue('desc_preproduto') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Pré-Produto do produto ";
                }
    
                if(form.getValue('cod_preProduto') != ''){
                    messageAtt += "<br/>- Código do <strong>novo</strong> Pré-Produto informado <strong>já existe</strong> ";
                }
            }
            // if(form.getValue('codTipo_produto') != "PA"){
            //     if(form.getValue('newPreProd') == "nao"){
            //         if(form.getValue("codPreProd_produto") == "" || form.getValue("codPreProd_produto") == null){ 
            //             messageAtt += "<br/>- Informar <strong>Pré-produto</strong> já existe  ";
            //             }                    
            //     }

            // }

            
    
            if(form.getValue('codNewPrincpAtivo') == "Sim"){
                if(form.getValue('codigo_princpAtiv') == '' || form.getValue('codigo_princpAtiv') == null){
                    message += "<br/>- Código do <strong>novo</strong> Principio Ativo do produto ";
                }
    
                if(form.getValue('desc_principAtiv') == '' || form.getValue('desc_principAtiv') == null){
                    message += "<br/>- Descrição do <strong>novo</strong> Principio Ativo do produto ";
                }
    
                // if(form.getValue('cod_princpAtiv') == '' || form.getValue('cod_princpAtiv') == null){
                //     messageAtt += "<br/>- Código do <strong>novo</strong> Principio Ativo informado <strong>já existe</strong> ";
                // }
            }
            if(form.getValue('codNewPrincpAtivo') == "Não"){
                if(form.getValue('codPrincpAtivo_produto') == '' || form.getValue('codPrincpAtivo_produto') == null){
                    message += "<br/>- Principio Ativo do produto ";
                }
            }
            // ============ PRÉ PRODUTO ============

            if(form.getValue('codTipo_produto') == "PA"){ 
                log.info("validate 3");
                if(form.getValue('codNewPreProd') == null || form.getValue('codNewPreProd') == ''){
                    log.info("validate 3");
                    message += "<br/>- Informar necessidade de <strong>novo</strong> Pré-Produto do produto ";
               
            
            if(form.getValue('codNewPreProd') == "Sim"){
                if(form.getValue('codigo_preproduto') == '' || form.getValue('codigo_preproduto') == null){
                 message += "<br/>- Informar código do Pré-Produto do produto.";
                }
                if(form.getValue('desc_preproduto') == '' || form.getValue('desc_preproduto') == null){
                    message += "<br/>- Informar descrição do Pré-Produto do produto.";
                }
            }

            if(form.getValue('codNewPreProd') == "Não"){
                //ok
                if(form.getValue('codPreProd_produto') == '' || form.getValue('codPreProd_produto') == null){
                 message += "<br/>- Informar código do Pré-Produto do produto.";
                }
            }
               
        }     

        }
        if (form.getValue('codTipo_produto') == "PA"){ 
            if(form.getValue('codNewPreProd') == "Não"){
                if(form.getValue('codPreProd_produto') == '' || form.getValue('codPreProd_produto') == null){
                    message += "<br/>- Pré-Produto do produto";
                }
            }
        }
        // }   
        }     
    }

    if(STAGE == CONTABILIDADE){ 

      if (form.getValue('infoComplCont') == null || form.getValue("infoComplCont") == '' || form.getValue("infoComplCont") == 'nao') {  

        if(form.getValue('codContaContb_produto') == null || form.getValue('codContaContb_produto') == ''){
            message += "<br/>- Conta Contábil do produto ";
        }
        if(form.getValue('codItemContb_produto') == null || form.getValue('codItemContb_produto') == ''){
            message += "<br/>- Item Contábil do produto ";
        }

        if(form.getValue('retorno') != 'sim'){
            if(form.getValue('infoComplCont') == null || form.getValue('infoComplCont') == ''){
                message += "<br/>- Se a necessidade de completo de informações de outro departamento ";
            }
    
            if(form.getValue('infoComplCont') == 'sim'){
                if(form.getValue('selecDepartCont') == null || form.getValue('selecDepartCont') == ''){
                    message += "<br/>- Departamento para complementar informações ";
                } 
                if(form.getValue('necess_retorno') == null || form.getValue('necess_retorno') == ''){
                    message += "<br/>- Descrição da necessidade de complemento ";
                }
            }
        }
      } 
    }

    if(STAGE == FISCAL){

       if (form.getValue('infoComplFisc') == null || form.getValue("infoComplFisc") == '' || form.getValue("infoComplFisc") == 'nao') {   
        
    
            if(form.getValue('codOrigem_produto') == null || form.getValue('codOrigem_produto') == ''){
                message += "<br/>- Origem do produto ";
            }
            if(form.getValue('codGrupTrib_produto') == null || form.getValue('codGrupTrib_produto') == ''){
                message += "<br/>- Grupo tributário do produto ";
            }
        

        if(form.getValue('retorno') != 'sim'){
            if(form.getValue('infoComplFisc') == null || form.getValue('infoComplFisc') == ''){
                message += "<br/>- Se a necessidade de completo de informações de outro departamento ";
            }
    
            if(form.getValue('infoComplFisc') == 'sim'){
                if(form.getValue('selecDepartFisc') == null || form.getValue('selecDepartFisc') == ''){
                    message += "<br/>- Departamento para complementar informações ";
                }
                if(form.getValue('necess_retorno') == null || form.getValue('necess_retorno') == ''){
                    message += "<br/>- Descrição da necessidade de complemento";
                }
            }            
        }
      } 
    }

    var retornoadd = " ";
    if(messageAtt != ""){
        retornoadd = "<br/><br/><strong>Campos de atenção: </strong><br/> "+ messageAtt + "<br/><br/>";
    }
    
    var retorno = "";
    if (message != ""){
        retorno = "<br/><strong>Os campos abaixo são de preencimento/seleção obrigatório:</strong><br/>" + message + "<br/><br/>";        
    } 
    retorno += retornoadd;        

    if(message || messageAtt){
        throw retorno;
    }

}