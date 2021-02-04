
/**
 * grava_val
 *
 * Funcao que retorna o valor no campo do form
 *
 * @param valor String : id do campo que recebera o valor
 */
function grava_val(id, valor)
{


	$("#"+id+"___"+contador).val(valor);
	// Regra para o campo - principais areas de interface
	// Verificar se o valor do campo - qual sua area - sofreu alteracao
	if ( $.fn.verifica_restrito(id, valor) == 0)
	{
		/**
		 * Caso o id contenha um Array aplica a regra da revisao
		 */
		 if ( Array.isArray(id) )
		 {
			 var v1 = valor.split(';');
			 console.log(v1 + "  function grava_val()")
			 for ( var a = 0; a < id.length; a++ )
			 {
				 if ( id[a] != 'txt_data_cadastro' )
				 {
					 if ( id[a] == 'txt_cod_proc' )
					 {
						 $("#txt_cod_revisao").val(v1[a]);
					 }
					 else
					 {
						 $("#"+id[a]).val(v1[a]);
					 }
				 }
			 }
		 }
		 else
		 {
			 /**
	 		 * Caso nao for as regras acima realizar somente a inclusao do campo
	 		 */
	 		// Regra para consenso
	 		if ( id == "txt_cfg_consenso" )
	 		{
	 			if ( valor != "")
	 			{
	 				var valor_atual = $("#"+id).val();
	 				if ( valor_atual == "" )
	 				{
	 					$("#"+id).val(valor);
	 				}
	 				else
	 				{
	 					$("#"+id).val(valor_atual + "," + valor);
	 				}
	 				return;
	 			}
			} else 
			
				if ( id == "txt_area_ler_doc" )
				{
					if ( valor != "")
					{
						var valor_atual = $("#"+id).val();
						if ( valor_atual == "" )
						{
							$("#"+id).val(valor);
						}
						else
						{
							$("#"+id).val(valor_atual + "," + valor);
						}
						return;
					}
				}
	 		
	 		$("#"+id).val(valor);
		 }
	}


	// Atualiza o valor do campo cod. doc quando alterar o valor
	if ( id == "txt_cfg_area" )
	{
		// Altera o valor
		$.fn.tp_gera_codigo_docto();
		//$.fn.search_area_description($("#txt_cfg_area").val())
		
	}
}

/**
 * zoom
 *
 * Funcao que abre o zoom
 *
 */
function zoom(id)
{
	var a = id.substr(1, id.length);
	window.open("zoom.html?id=" + a, "list", "width=700, height=300, left=300, top=100");
}



/**
 * get_html_param
 *
 * Funcao que trata os parametros e retona o conteudo
 *
 * @param id_campo String : Id do campo que esta sendo pesquisado
 * @param nome_parametro String : Nome do parametro que quer pesquisar
 *
 * @return String : Conteudo armazenado no parametro
 */
function get_html_param (id_campo, nome_parametro)
{
    var retorno = document.getElementById('z' + id_campo).childNodes;

    for ( var retorno_parametro in retorno)
    {
        if (retorno[retorno_parametro].localName == 'param')
        {
            if (retorno[retorno_parametro].getAttribute('name') == nome_parametro)
            {
                return retorno[retorno_parametro].getAttribute('value');

            }
        }
    }
    return '';
}
