var contador = 0;

$(document).ready(function(){
	//Ativa data-toggle
	$('[data-toggle="tooltip"]').tooltip();
	console.log("carregou o doc");
	

	$.fn.extend({

		/**
		 * prin_area_int
		 *
		 * Altera o valor do campo - princiapis areas de interface
		 * conforme altera os valores na area e onde se aplica
		 */
		prin_area_int:function()
		{
			// Verifica se existe valor no campo tipo de solicitacao
			if ( $("#op_cfg_uso").val().length == '' )
			{
				// Remove o zoom para o campo princiapsi areas da interface
				$("#ztxt_cfg_consenso").removeAttr("onclick");
				$("#txt_cfg_consenso").val("");
			}
			else if ( $("#op_cfg_uso").val() == "restrito" )
			{
				// Remove o zoom para o campo princiapsi areas da interface
				$("#ztxt_cfg_consenso").removeAttr('onclick');

				// Adiciona o mesmo valor do campo qual sua area
				$("#txt_cfg_consenso").val( $("#txt_cfg_area").val() );
			}
			else if ( $("#op_cfg_uso").val() == "demais" )
			{
				$("#ztxt_cfg_consenso").attr("onclick","zoom(this.id)");
				$("#txt_cfg_consenso").val("");
			}


			// Regras para o tipo de solicitacao
			// Quando for revisao
			var tp_sol = $("input[name='op_cfg_tipo']:checked").val();
			if ( tp_sol == "revisao" )
			{
				// Adiciona o zoom no botao de codigo do documento
				$("#ztxt_cfg_codigo_docto").attr("onclick","zoom(this.id)");
			}
			// Quando for criacao ou nada
			else
			{
				// Remove o zoom no botao de codigo de documento
				$("#ztxt_cfg_codigo_docto").removeAttr("onclick");
			}
		},

		/**
		 * verifica_restrito
		 *
		 * Regra para o campo - principais areas de interface
		 * Verificar se o valor do campo - qual sua area - sofreu alteracao
		 *
		 * @param id String : Id do campo que sera comprado
		 * @param valor String : Valor que sera adicionando no campo
		 *
		 * @return int : 1 para regra , 0 para fora da regra
		 */
		verifica_restrito:function(id, valor)
		{
			// Regra para o campo - principais areas de interface
			// Verificar se o valor do campo - qual sua area - sofreu alteracao
			if ( id == "txt_cfg_area" && $("#op_cfg_uso").val() == "restrito" )
			{
				// Coleta o valor atual
				var val_ant = $("#txt_cfg_area").val();

				// Altera o valor
				$("#"+id).val(valor);

				// Coleta o novo
				var val_nov = $("#txt_cfg_area").val();

				// Compra os valores para verificar mudancas
				if ( val_ant != val_nov )
				{
					$.fn.prin_area_int();
				}
				return 1;
			}

			return 0;
		},

		/**
		 * habilita_tela
		 *
		 * Compara os o tipo de documento para habilitar
		 * os campos referente ao modelo na aba de documento
		 *
		 * @param div String : Id do div que sera habilitado
		 * @param valor String : Valor do campo tipo documento
		 *
		 */
		habilita_tela:function( div, valor )
		{
			try
			{
				// Coleta o valor do campo op_cfg_tipo_docto
				var model_sel = $("#op_cfg_tipo_docto").val();

				if ( model_sel == valor )
				{
					$("#" + div).show();
				}
				else
				{
					$("#" + div).hide();
				}
			}
			catch( e )
			{
				log.info("Erro ao habilitar tela " + e);
//				console.log("Ocorreu um erro ao habilitar a tela : " + e);
			}
		},

		/**
		 * gera_codigo_docto
		 *
		 * Funcao que cria o sequencial para a criacao
		 * de um novo modelo
		 *
		 * @param coddocto String : Codigo composto pelo modelo + area
		 *
		 * @return String : Novo codigo do modelo mais a sequencia
		 */
		gera_codigo_docto:function(coddocto, tipo)
		{
			var caux = '%';
//			console.log('*** xxxgera_codigo_docto - entrou: ' + coddocto + " Tipo = " + tipo);

			if(coddocto != undefined && coddocto != '')
			{
				caux = coddocto;
			}

			if ( tipo == "c" )
			{
//				console.log(" caux = " + caux);
				var c1 = DatasetFactory.createConstraint("Codigo", caux, caux, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
			    var constraints   = new Array(c1,c2);

//				console.log('*** xxxgera_codigo_docto - vai chamar dataset');
				var dataset_next_seq = DatasetFactory.getDataset("ds_next_seq_documento",null, constraints,null);
				console.log("dataset = "+dataset_next_seq);
				var seqnew = '0001';

				if ( dataset_next_seq.values.length > 0 )
				{
					for(var i = 0; i < dataset_next_seq.values.length; i++)
				    {
				    	seqnew = dataset_next_seq.values[0]['SeqNew'];
				    	console.log("Entrou = "+seqnew)
//				    	console.log('*** xxxGeraCodigoDocto - seqnew:' + seqnew);
				    }
				}

				coddocto = coddocto + seqnew;
			}
			else
			{
				caux += "%"
				var c1 = DatasetFactory.createConstraint("txt_cfg_codigo_docto", caux, caux, ConstraintType.SHOULD, true);
				var c2 = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
				var constr = new Array(c1,c2);
			    var sortingFields = new Array("txt_cfg_codigo_docto");
				var dt_get_doc  = DatasetFactory.getDataset("ds_padronizacao_documento", null, constr, sortingFields);
				if ( dt_get_doc.values.length > 0 )
				{
					coddocto = dt_get_doc.values[dt_get_doc.values.length - 1]['txt_cfg_codigo_docto'];
				}
			}

			return coddocto;
		},

		/**
		 * tp_gera_codigo_docto
		 *
		 * Funcao verifica o tipo de solicitacao para gerar o codigo
		 * sequencial na criacao
		 */
		tp_gera_codigo_docto:function()
		{
			var vtipo = $("input[name='op_cfg_tipo']:checked").val();
			console.log("vtipo: " + vtipo);
		    var varea = $("#txt_cfg_area").val();
		    var vtipodoc = $("#op_cfg_tipo_docto").val();

		    $('#txt_cfg_codigo_docto').val(null);
		    var nome = vtipodoc.toUpperCase() + '-' + varea.toUpperCase() + '-';
//		    console.log("Envia o valor para gera_codigo_docto = ["+nome+"]");
		    if (vtipo == "criacao")
		    {
		    	vcodigo = $.fn.gera_codigo_docto(nome, "c");
		    	$('#txt_cfg_codigo_docto').val(vcodigo);

		    	// Remove o zoom no botao de codigo de documento
				$("#ztxt_cfg_codigo_docto").removeAttr("onclick");
		    }
		    else if (vtipo == "revisao")
		    {
//		    	vcodigo = $.fn.gera_codigo_docto(nome, "r");
//		    	$('#txt_cfg_codigo_docto').val(vcodigo);

		    	// Adiciona o zoom no botao de codigo do documento
				$("#ztxt_cfg_codigo_docto").attr("onclick","zoom(this.id)");
		    }
		    else if (vtipo == "")
		    {
		    	// Remove o zoom no botao de codigo de documento
				$("#ztxt_cfg_codigo_docto").removeAttr("onclick");
		    }
		},

		/**
		 * coleta_data
		 *
		 * Gera uma data
		 *
		 * @param s String : se setado soma 1 no ano
		 *
		 * @return String : data formatada
		 */
		coleta_data:function(campo,s)
		{
			try
			{
				var dt = new Date();
				var dia = dt.getDate();
				var mes = dt.getMonth() + 1;

				if ( s == null )
				{
					var ano = dt.getFullYear();
				}
				else if ( s == 'soma' )
				{
					var ano = dt.getFullYear() + 1;
				}


				if ( dia < 10 )
				{
				  dia = "0" + dia.toString();
				}

				if ( mes < 10 )
				{
				  mes = "0" + mes.toString();
				}


				$("#" + campo).val(dia + "/" + mes + "/" + ano);
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar a data.');
				console.log(e);
			}
		},
		
		retorna_data:function()
		{
			var arr = [];
			var dt = new Date();
			var dia = dt.getDate();
			var mes = dt.getMonth() + 1;
			var ano = dt.getFullYear();
			var hora = dt.getHours();
			var min = dt.getMinutes();
			var sec = dt.getSeconds();

			if ( dia < 10 )
			{
			  dia = "0" + dia.toString();
			}

			if ( mes < 10 )
			{
			  mes = "0" + mes.toString();
			}

			if ( hora < 10 )
			{
			  hora = "0" + hora.toString();
			}

			if ( min < 10 )
			{
			  min = "0" + min.toString();
			}

			if ( sec < 10 )
			{
			  sec = "0" + sec.toString();
			}

			arr.push(dia.toString(), mes.toString(), ano.toString(), hora.toString(), min.toString(), sec.toString());

			return arr;
		},
		
		/**
		 * load_main_info
		 *
		 * Carreaga as informacoes quando selecionaod revisao
		 */
		load_main_info:function()
		{
			var verificaAddLine = $("#hd_tb_revisao").val();
			



			if ( $("input[name='op_cfg_tipo']:checked").val() == "criacao" )
			{
				return;
			}
			
			var completa = [];
			var caux = $("#txt_cod_revisao").val();
			
			var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
			var c1 = DatasetFactory.createConstraint("txt_cod_proc", caux, caux, ConstraintType.SHOULD, true);
			var constr = new Array(cst, c1);
			var sortingFields = new Array("txt_data_cadastro");
			var dt_get_doc  = DatasetFactory.getDataset("ds_padronizacao_documento", null, constr, sortingFields);
			console.log(dt_get_doc);
			// Preenche as informacoes do cabecalho
			if ( dt_get_doc.values.length > 0 )
			{
				// Campos do cabecalho
				completa.push("txt_assunto","txt_codigo","txt_area_resp","txt_doc_plubicado");

				for ( var b = 0; b < completa.length; b++ )
				{
					var v_ds = dt_get_doc.values[0][completa[b]];
					$("#" + completa[b]).val(v_ds);
				}
				
				
				// Tablenames
				var arr_tb = ['tb_reg_ocorr','tb_revisao'];
				
				for ( var a = 0; a < arr_tb.length; a++ )
				{
					for ( var i = 0; i < dt_get_doc.values.length; i++ )
					{
						var documentId = dt_get_doc.values[i]["metadata#id"];
				        var documentVersion = dt_get_doc.values[i]["metadata#version"];

				        var fc1 = DatasetFactory.createConstraint("tablename", arr_tb[a] ,arr_tb[a], ConstraintType.MUST);
				        var fc2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
				        var fc3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

				        var constraintsFilhos = new Array(fc1, fc2, fc3);
				        
				        var dsp = DatasetFactory.getDataset("ds_padronizacao_documento", null, constraintsFilhos, null);
				        
				        if ( dsp.values != "" && dsp.values != undefined)
				        {
				        	for ( var b = 0; b < dsp.values.length; b++ )
				        	{
				        		if ( arr_tb[a] == "tb_reg_ocorr")
				        		{
				        			if(verificaAddLine == "nao"){
				        				wdkAddChild("tb_reg_ocorr");
				        			}

				        			$("#txt_nome_arquivo___" + (b+1)).val(dsp.values[b]["txt_nome_arquivo"]);
				        			$("#txt_local_arm___" + (b+1)).val(dsp.values[b]["txt_local_arm"]);
				        			$("#txt_quem_acessa___" + (b+1)).val(dsp.values[b]["txt_quem_acessa"]);
				        			$("#txt_qual_inform___" + (b+1)).val(dsp.values[b]["txt_qual_inform"]);
				        			$("#txt_periodo_retencao___" + (b+1)).val(dsp.values[b]["txt_periodo_retencao"]);
				        			$("#txt_apos_expira___" + (b+1)).val(dsp.values[b]["txt_apos_expira"]);
				        		}
				        		else if ( arr_tb[a] == "tb_revisao" )
				        		{
				        			console.log("Entrou 1 = "+dsp.values[b]["txt_revisao"])
				        			if(verificaAddLine == "nao"){
					        			wdkAddChild("tb_revisao");
				        			}

				        			$("#txt_revisao___" + (b+1)).val(dsp.values[b]["txt_revisao"]);
				        			$("#dt_data_revisao___" + (b+1)).val(dsp.values[b]["dt_data_revisao"]);
				        			$("#txt_desc_revisao___" + (b+1)).val(dsp.values[b]["txt_desc_revisao"]);
				        			
				        			$("#txt_revisao___" + (b+1)).attr('readonly', true);
				        			$("#dt_data_revisao___" + (b+1)).attr('readonly', true);
				        			$("#txt_desc_revisao___" + (b+1)).attr('readonly', true);
				        		}
				        	}
				        }
					}
				}
				var tp_sol = $("input[name='op_cfg_tipo']:checked").val();
				
				if(tp_sol == "revisao"){
					
					if(verificaAddLine == "nao"){
						row = wdkAddChild('tb_revisao');
						console.log("Entrou 2")
						
						var linhaAnterior = parseInt(row)-1;
						
						var versao = $("#txt_revisao___"+linhaAnterior).val();
						var novaVersao = parseInt(versao) + 1
						
						$("#txt_revisao___"+row).val(novaVersao);
						$.fn.coleta_data("dt_data_revisao___"+row, null);
						
						$("#hd_tb_revisao").val("sim");
					}
				}
			}
		},

		/**
		 * coleta_att_url
		 *
		 * Coleta a url do documento em anexo para realizar as mudanças
		 * na estrutura
		 *
		 * return String : Caminho do documento via url
		 */
		coleta_att_url:function()
		{
			var retorno = '';

			try
			{
				// Coleta o id do anexo
				var id_doc = $("#txt_modelo_id").val();
				// Inclui o id na url
				var url = "/api/public/2.0/documents/getDownloadURL/" + id_doc;
				// Chama o ajax para coletar o caminho
				var url_doc = $.fn.chama_service(url, "GET", "json", "coleta_att_url",null);
				// Retorna o caminho
				retorno = url_doc.content;
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar o diretorio do arquivo .docx.');
				console.log(e);
			}

			return retorno;
		},

		/**
		 * atualizar_doc
		 *
		 * Atualiza o documento em anexo
		 *
		 * @param dir_up String : Diretorio de upload
		 * @param nome_doc String : Nome do documento
		 * @param dicti Array : Dicionario com os valores a serem passados para o servico
		 */
		atualizar_doc:function(dir_up, nome_doc, dicti)
		{
			var retorno = '';
			try
			{
				// Url do servico de update
				var url = "/api/public/2.0/documents/updateFile";

				var dt_est = null;

				if ( dicti == null )
				{
					// Estrutura de update
					dt_est = {
						"documentId"          : $("#txt_modelo_id").val(),
						"version"             : versao,
						"documentDescription" : nome_doc,
						"versionAction"       : "",
						"additionalComments"  : "Update document"
					}
				}
				else
				{
					dt_est = dicti;
				}

				// Convert para estrutura json
				dt_est = JSON.stringify(dt_est);
				
				// Chama a api
				retorno = $.fn.chama_service(url, "POST", "json", "atualiza_doc", dt_est);
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao atualizar o doc em anexo do processo.');
				console.log(e);
			}
			return retorno;
		},
		
		/**
		 * grava_doc
		 *
		 * Realiza a alteracao no arquivo doc
		 *
		 * @param my_data json : Estrutura json com os campos
		 *
		 * @return json : Retorno do response
		 */
		grava_doc:function(my_data)
		{
			var retorno = '';
			try
			{
				// Url do servico
				var url = '/AvgWordService/WordWritter';


				// Chama o servico
				retorno = $.fn.chama_service(url, "POST", "json", "grava_doc", my_data);
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao gravar o doc.');
				console.log(e);
			}
			return retorno;
		},

		/**
		 * coleta_upload_dir
		 *
		 * Realiza a coleta do diretorio de upload
		 *
		 * @return String : Diretorio de upload
		 */
		coleta_upload_dir:function()
		{
			var retorno = '/opt/fluig_data/volume/upload';

			try
			{
				// TODO : Criar um formulario para nao fixar o diretorio no codigo
//				// Servico de informacoes do servidor
//				var url = "/api/public/admin/tenant";
//				// Chama o ajax para chamada da api
//				var dir = $.fn.chama_service(url, "GET", "json", "coleta_upload_dir", null);
//				// Retorna a url do diretorio de upload
//				retorno = dir.content.data.dirDefault + "/upload/";
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar o diretorio da pasta upload.');
				console.log(e);
			}
//			console.log('--------------coleta_upload_dir');
//			console.log(retorno);
			return retorno;
		},

		/**
		 * dados_usuario
		 *
		 * Coleta o nome do usuario e insere no campo informado
		 *
		 * @param mat_user String : Matricula do usuario
		 * @param campo String : Id do campo no formulario
		 */
		dados_usuario:function(mat_user, campo)
		{
			try
			{
				// Servico para trazers as informacoes do usuario
				var url = "/api/public/social/user/" + mat_user;
				// Chama o servico
				var userd = $.fn.chama_service(url, "GET", "json", "dados_usuario", null);
				// Insere o valor no campo
				$("#" + campo).val(userd.name);
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar os dados do usuario. ');
				console.log(e);
			}
		},


		/**
		 * coleta_user_logged
		 *
		 * Coleta a matricula do usuario
		 *
		 * @return String : Matricula do usuario logado
		 */
		coleta_user_logged:function()
		{
			var retorno = '';

			try
			{
				// Link da api de coleta de usuario logado
				var url = '/api/public/social/user/logged';
				// Chama o servico
				var retorno = $.fn.chama_service(url, "GET", "json", "coleta_user_logged", null);
				// Retorna a matricula
				retorno = retorno;
			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar os dados do usuario lagado.');
				console.log(e);
			}

			return retorno;
		},

		/**
		 * copy_upload_and_publish
		 *
		 * Copia um documento para a area de upload do usuario
		 */
		copy_upload_and_publish:function()
		{
			try
			{
				/**
				 * IMPORTANTE
				 *
				 * As variaveis abaixo sao configuradas de acordo com
				 * o servidor, o id da pasta sempre varia
				 */
				var id_pasta_publicacao = $.fn.relacao_pasta_docto('publicacao');
				
				var nome_documento = $("#txt_codigo").val() + ".docx";
				// Coleta o id do documento anexo
				var id_documento = $("#txt_modelo_id").val();
				// Url do servico rest
				var url = "/api/public/2.0/documents/copyDocumentToUploadArea/" + id_documento;
				console.log("------------------- copy_upload_adn_publish");
				console.log(url);
				
				// Chama o rest
				var retorno = '',
				retorno = $.fn.chama_service(url, "POST", "json", "copy_upload",null);
				
				// Verifica se o upoload ocorreu
				if ( retorno.message.detail == "OK" )
				{
					// Verifica se eh criacao
					if ( $("input[name='op_cfg_tipo']:checked").val() == "criacao" )
					{
						// txt_doc_plubicado
						
						//Pega a data de validade
						var dataValidadeFim = $('#txt_validade').val();
						dataValidadeFim = String(dataValidadeFim).split("/");
						
						//Coloca a data no formato aaaa-mm-dd
						dataValidadeFim = dataValidadeFim[2]+"-"+dataValidadeFim[1]+"-"+dataValidadeFim[0];
						
						//Recupera a data de hoje
						var dataValidadeInicio = $.fn.retorna_data();
						dataValidadeInicio = dataValidadeInicio[2] +"-"+ dataValidadeInicio[1] +"-"+ dataValidadeInicio[0];
						
						// Realiza a publicacao do documento
						var url = "/api/public/2.0/documents/createDocument/";
						var dicionario = {
							"activeVersion":true,
							"createDate":"2018-04-17",
							"documentDescription":nome_documento,
							"downloadEnabled":true,
							"draft":false,
							"inheritSecurity":true,
							"internalVisualizer":true,
							"parentDocumentId":id_pasta_publicacao,
							"permissionType":0,
							"tenantId":1,
							"version":1000,
							"expirationDate":"2018-04-19",
							"expires":true,
							"lastModifiedDate":"2018-04-17",
							"validationStartDate":"2018-04-17"
						};
						console.log('-----------------------dicionario');
						console.log(dicionario);
						// Convert para estrutura json
						dicionario = JSON.stringify(dicionario);
						console.log('-----------------------id_pasta_publicacao');
						console.log(id_pasta_publicacao);
						// Chama o rest
						retorno = $.fn.chama_service(url, "POST", "json", "copy_upload", dicionario);
						console.log(retorno.content);

						// Salva o valor do id do documento publicado no campo do form
						$("#txt_doc_plubicado").val(retorno.content.documentId);
					}
					else if ( $("input[name='op_cfg_tipo']:checked").val() == "revisao" )
					{
						// Coleta a url de upload
						var url = $.fn.coleta_upload_dir() + "\\";

						// Coleta a matricula do usuario
						var d_user = $.fn.coleta_user_logged();

						// Coleta caminho arquivo em anexo
						var anexo_dir = $.fn.coleta_att_url();

						// Completa a url
						url += d_user.userCode + "\\" + $("#txt_codigo").val() + ".docx";
						url = url.replace("/\\","\\");
						url = url.replace("\\\\","\\");
						
						// Coleta id do documento publicado
						var id_doct_pb = $("#txt_doc_plubicado").val();
						// Coleta a versao do documento antigo
						var url = "/api/public/2.0/documents/getCurrentUserPermission/" + id_doct_pb;
						// Chama o servico
						var coleta_versao = $.fn.chama_service(url, "GET", "json", "coletar_lista_docs", null);
						// Verifica se existe valores
						if ( coleta_versao.message.detail == "OK" )
						{
							// Coleta a ultima descricao do pai filho
							var cont = 1;
							var ver_cont = true;
							var texto_revisao = "";
							while(ver_cont)
							{
								if ( $("#txt_desc_revisao___" + cont).val() != undefined )
								{
									
									texto_revisao = $("#txt_desc_revisao___" + cont).val();
								}
								else
								{
									ver_cont = false;
								}
								cont++;
							}
							
							
							// Coleta a versao do documento e soma 1
							var versao = parseInt(coleta_versao.content.document.version);
							
							// Estrutura de update
							var new_dict = {
								"documentId"              : id_doct_pb,
								"version"                 : versao,
								"documentDescription"     : $("#txt_codigo").val() + ".docx",
								"versionAction"           : "NEW_REVISION",
								"additionalComments"      : texto_revisao
							}
							// Atualiza o anexo
							retorno = $.fn.atualizar_doc(url, null , new_dict);
						}
					}
				}
				return retorno;
			}
			catch (e)
			{
				console.log('Ocorreu um erro ao copiar o documento para a pasta de upload do usuario.');
				console.log(e);
			}
		},
		
		permissoes_documento:function()
		{
			// Insere a permissao de download no documento
			var url = "/api/public/2.0/documents/setDocumentPermissions";
			var dicionario = {
					"documentId" : $('#txt_doc_plubicado').val(),
					"documentPermissionVO" :[{
						"attributionType" : 1,
						"attributionValue" : $('#txt_requisitante').val(),
						"downloadEnabled" : true,
						"securityVersion": true,
						"securityLevel" : 3,
						"showContent": true
					}]
			}
			// Convert para estrutura json
			dicionario = JSON.stringify(dicionario);
			
			// Chama o rest
			retorno = $.fn.chama_service(url, "POST", "json", "copy_upload", dicionario);
			return retorno;
		},


		/**
		 * chama_service
		 *
		 * Utilizado para chamar os servicos do fluig
		 *
		 * @param url String : Url do servico
		 * @param tipo String : Tipo de chamada GET ou POST
		 * @param dttype String : Tipo de retorno ex: json
		 *
		 * @return json : Estrutura de retorno do servico
		 */
		chama_service:function(url, tipo, dttype, local, my_data)
		{
			var resposta = '';
			$.ajax({
				type: tipo,
				async: false,
				dataType: dttype,
				data: my_data,
				'contentType': 'application/json',
				url: url,
				success:function(data) {
					resposta = data;
				},
				error:function(data) {
					resposta = data;
					console.log("Erro ao realizar a captura da url do documento = " + local);
					//console.log(data);
				}
			});
			return resposta;
		},

		/**
		 * reseta_consenso
		 *
		 * Apaga a opcao do consenso
		 */
		reseta_consenso:function()
		{
			$("input[name='op_consense']:checked").prop('checked', false);
			$("#txt_obs_consense").val('');
		},

		/**
		 * opcao_consenso
		 *
		 * Se selecionado nao no consenso sempre mantem essa
		 * opcap
		 */
		opcao_consenso:function()
		{
			var h_con = $("#op_consenseh").val();
			var con = $("input[name='op_consense']:checked").val();

			// Verifica se o consenso nao foi nao
			if ( h_con != 'n' )
			{
				$("#op_consenseh").val(con);
			}
		},

		/**
		 * coletar_lista_docs
		 *
		 * Coleta todos os arqivos da pasta de modelos
		 */
		coletar_lista_docs:function()
		{
			var id_pasta = $.fn.relacao_pasta_docto('modelo');
			var nome_modelo = $("#txt_codigo").val();
			nome_modelo = nome_modelo.split("-");
			nome_modelo = nome_modelo[0];
			try
			{
				// Coleta o tipo de solicitacao
				var tp_sol = $("input[name='op_cfg_tipo']:checked").val();

				if ( tp_sol == 'criacao' )
				{
					// Servico para trazers todos os modelos da pasta
					var url = "/api/public/ecm/document/listDocument/" + id_pasta;
					// Chama o servico
					var lista_docs = $.fn.chama_service(url, "GET", "json", "coletar_lista_docs", null);
					
					//console.log(lista_docs);
					for ( var a = 0; a < lista_docs.content.length; a++ )
					{
						var nome = lista_docs.content[a]['phisicalFile'];
						// Coleta as informacoes do arquivo modelo
						if ( nome.indexOf(nome_modelo) != -1 )
						{
							$('#a_link_modelo').attr( 'href', lista_docs.content[a]['fileURL'] );
						}
					}
				}
				else if ( tp_sol == 'revisao' )
				{
					var caux = $("#txt_cod_revisao").val();
					var c1 = DatasetFactory.createConstraint("txt_cod_proc", caux, caux, ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
					var constr = new Array(c1,c2);
					var dt_get_doc  = DatasetFactory.getDataset("ds_padronizacao_documento", null, constr, null);
					
					// Verifica se existe dados no dataset
					if ( dt_get_doc.values.length > 0 )
					{
						// Coleta o id do docx anexado
						var url = "/api/public/2.0/documents/getDownloadURL/" + dt_get_doc.values[0]['txt_doc_plubicado'];
						// Chama o servico
						var lista_docs = $.fn.chama_service(url, "GET", "json", "coletar_lista_docs", null);
						// Adiciona a url do arquivo no botao de download
						$('#a_link_modelo').attr( 'href', lista_docs.content );
					}
					
				}

			}
			catch( e )
			{
				console.log('Ocorreu um erro ao coletar a lista de documentos modelos. ' + e);
			}
		},


		/**
		 * revisao_first_line
		 *
		 * Insere uma nova linha na revisao quando for a primeira
		 * na fase de cricao
		 *
		 */
		revisao_first_line:function()
		{
			try
			{
				// Coleta o tipo de solicitacao
				var tp_sol = $("input[name='op_cfg_tipo']:checked").val();

				// Verifica se eh criacao
				if ( tp_sol == "criacao" )
				{
					// Verifica se os campos nao existem
					if ( $("#txt_revisao___1").val() == undefined &&  $("#dt_data_revisao___1").val() == undefined &&  $("#txt_desc_revisao___1").val() == undefined )
					{
						// Adiciona uma nova linha na tabela de revisao
						wdkAddChild('tb_revisao');

						// Verifica se existe valores nos campos
						if ( $("#txt_revisao___1").val().length == 0 && $("#dt_data_revisao___1").val().length == 0 && $("#txt_desc_revisao___1").val().length == 0 )
						{
							// Adiciona os valores nos campos da tabela
							$("#txt_revisao___1").val("0");
							$.fn.coleta_data("dt_data_revisao___1", null);
							$("#txt_desc_revisao___1").val("Criação do documento");
						}
					}
				}
				else if(tp_sol == "revisao")
				{
				}
				
			}
			catch( e )
			{
				console.log('Ocorreu um erro na revisao first line. ' + e);
			}
		},
		
		/**
		 * relacao_pasta_docto
		 * 
		 * Retorno o id da pasta modelo ou publicacao
		 * 
		 * @param busca String : Informar qual id quer receber modelo ou publicacao
		 */
		relacao_pasta_docto:function(busca)
		{
			var ret = null;
			var constraints;
			var c1;
			var c2;
			
			try
			{
				//Busca os campos Área e Tipo de Documento no formulario
				var area = $("#txt_cfg_area").val();
				var tipo_doc = $("#op_cfg_tipo_docto").val();
				
				//Realiza o filtro pela area e tipo_doc
				c1 = DatasetFactory.createConstraint("op_cfg_tipo_docto", tipo_doc, tipo_doc, ConstraintType.MUST);
				c2 = DatasetFactory.createConstraint("txt_cfg_area", area, area, ConstraintType.MUST);
				c3 = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
				constraints   = new Array(c1, c2, c3);
				
				var dts_rdocto = DatasetFactory.getDataset('ds_parametros_pastas', null, constraints, null);
				
				if ( dts_rdocto.values.length > 0 )
				{
					if ( busca == "modelo" )
					{
						ret = dts_rdocto.values[0]['txt_codigo_modelo'];
					}
					else if ( busca == "publicacao" )
					{
						ret = dts_rdocto.values[0]['txt_publicacao_lms'];
					}
				}
			}
			catch(e)
			{
				console.log('Erro ao busca a pasta ou modelo: ' + e );
			}
			
			return ret;
		},
		
		/**
		 * Loop para criacao de constraint
		 */
		cria_constraint:function(arr_valores, campo_pesquisa, tipo_constraint, cmp_arr=null)
		{
			var consta = new Array();
			
			for ( var a = 0; a < arr_valores.length; a++ )
			{
				// Cria a constraint para coletar os papeis relacionandos a area
				if ( cmp_arr != null )
				{
					if ( tipo_constraint == 'must' )
					{
						consta.push(DatasetFactory.createConstraint(campo_pesquisa,arr_valores[a][cmp_arr],arr_valores[a][cmp_arr], ConstraintType.MUST));
					}
				}
				else
				{
					if ( tipo_constraint == 'must' )
					{
						consta.push(DatasetFactory.createConstraint(campo_pesquisa,arr_valores[a],arr_valores[a], ConstraintType.MUST));
					}
				}
			}
			return consta;
		},
		
		/**
		 * dados_user
		 * 
		 * Retorna os dados do usuario
		 * 
		 * @param id_user String : Matricula do usuario
		 */
		pesquisa_usuario:function(id_user)
		{
			var ret = null;
			try
			{
				var url = '/api/public/2.0/users/getUser/';
				ret = $.fn.chama_service(url + id_user, "GET", "json", "pesquisa_usuario", null);
			}
			catch(e)
			{
				console.log("Erro ao pesquisar as informacoes do usuario");
				console.log(e);
			}
			return ret;
		},
		
		/**
		 * cria_conteudo_lms
		 * 
		 * Cria o conteudo, treinamento e matricula do
		 * treinamento cadastrado no LMS
		 */
		cria_conteudo_lms:function()
		{
			// Alterara de acordo com o ambiente
			var pasta_catalogo = "25";// AmbienTe: BK QAS = 25 ; BK PRD = ; AVG = 27
			var posexam = "15683";    // AmbienTe: BK QAS = 15683 ; BK PRD = ; AVG = 652
			
			
//			console.log("Entrou cria_conteudo_lms");
			// Coleta o id do documento anexo
			var id_documento = $("#txt_doc_plubicado").val();
			
			// Copia o arquivo para a area de upload
			var url = "/api/public/2.0/documents/copyDocumentToUploadArea/" + id_documento;

			// Chama o rest
			var retorno = '';
			retorno = $.fn.chama_service(url, "POST", "json", "cria_conteudo_lms",null);
			
			// Verifica se o upload ocorreu
			if ( retorno.message.detail == "OK" )
			{
				// Url para criar o conteudo
				var  url = "/lms/api/v0/contents/";
				
				// Coleta a data e hora do sistema
				var data_nome = $.fn.retorna_data();
				data_nome = data_nome[0] +"-"+ data_nome[1] +"-"+ data_nome[2] +" "+ data_nome[3] +"-"+ data_nome[4] +"-"+ data_nome[5];
				
				var nome_conteudo = $("#txt_cod_proc").val() + ' - ' + $("#txt_cfg_nome_docto").val() + " " + data_nome;
//				var nome_conteudo = "0015" + ' - ' + $("#txt_cfg_nome_docto").val();
				
				my_dict = {
					"id": null,
					"name": nome_conteudo,
					"keyword": "",
					"description": "Conteudo do treinamento LMS",
					"privateContent": null,
					"scormType": null,
					"elucidatReleasePackageId": null,
					"fileName": $("#txt_codigo").val() + ".docx",
					"changeFile": true
				}
				my_dict = JSON.stringify(my_dict);
				
				// Chama o servico de criar conteudo
				retorno = $.fn.chama_service(url, "POST", "json", "cria_conteudo_lms",my_dict);
				
				if ( retorno.message == null )
				{
					var id_conteudo = retorno.content.id;
					var nome_treinamento = "Treinamento -" + $("#txt_cod_proc").val() + ' - ' + $("#txt_cfg_nome_docto").val() + " " + data_nome;;
					var dados_user = $.fn.coleta_user_logged();
					
					// Api para criar treinamento
					url = "/lms/api/v0/trainings/";
					
					my_dict = {
						"code":"",
						"name":nome_treinamento,
						"status":"AVAILABLE",
						"author": dados_user.name,
						"cost":"0",
						"workload":"0",
						"objective":"<html>\n<head>\n\t<title></title>\n</head>\n<body></body>\n</html>\n",
						"parentId":pasta_catalogo,
						"certificateId":"",
						"programmaticContent":"<h..tml>\n<head>\n\t<title></title>\n</head>\n<body></body>\n</html>\n",
						"targetPublic":"<html>\n<head>\n\t<title></title>\n</head>\n<body></body>\n</html>\n",
						"preExamId":"",
						"posExamId": posexam,
						"reactionId":"",
						"scoreApprove":"",
						"approvePreExam":false,
						"scoreApprovePreExam":null,
						"reprovePreExam":false,
						"scoreReprovePreExam":null,
						"requiredPreExam":false,
						"allowContinue":false,
						"contents":[
							{"contentId": id_conteudo}
						],
						"requirementsIds":[],
						"requirementsDisciplineIds":[],
						"securityRestriction":[],
						"inheritPermissions" : "INHERIT",
						"catalogSkills":[],
						"theme":""
					}
					
					my_dict = JSON.stringify(my_dict);
//					console.log(my_dict);
					retorno = $.fn.chama_service(url, "POST", "json", "cria_conteudo_lms",my_dict);
					var id_treinamento = retorno.content.id;
					
					
					// Verifica se tem erro
					if ( retorno.message == null )
					{
						/**
						 * Realiza a busca do id lms do usuario
						 */
						// Coleta as areas envolvidas
						var areas_treinamento = $("#txt_cfg_consenso").val();
						areas_treinamento = areas_treinamento.split(',');
						
						// Coleta a hierarquia e o nível desejado
						var hierarquia = $("#txt_cdg_hierarquia___"+contador).val();
						var nivel = $("#txt_nivel_hierarquia___"+contador).val();
						var consultaDataset = "ds_varre_hierarquia";

						console.log("OPPAAAA NENEM = " + contador);
						
//						console.log(" ##### hierarquia = "+hierarquia)
//						console.log(" ##### nivel = "+nivel)
//						
//						console.log(areas_treinamento);
						// Verifica se os campos hierarquia e nivel foram preenchidos
						if ( hierarquia != "" && nivel != "")
						{
							// Cria as constraints do ds_recupera_hierarquia passando constraint no formato "hierarquia/nivel"
							var c1 = DatasetFactory.createConstraint("nomeFunc", hierarquia+"/"+nivel, hierarquia+"/"+nivel, ConstraintType.MUST);
							var constraints = new Array(c1);
						    var dts_hierarquia_nivel = DatasetFactory.getDataset(consultaDataset, null, constraints, null);
						    console.log("Dataset length dts_hierarquia_nivel = "+dts_hierarquia_nivel.values.length)
							// Verifica se existe valor no dataset
							if ( dts_hierarquia_nivel.values.length > 0 )
							{
									var parties = [];
									var my_dict = null;
									var arrValidaUser = [];
									
									for ( var a = 0; a < dts_hierarquia_nivel.values.length; a++ )
									{
										// Busca o id dos usuários no dts_hierarquia_nivel
										var id_user = dts_hierarquia_nivel.values[a]['codFunc'];
										var ret = $.fn.pesquisa_usuario(id_user);
										
										if (arrValidaUser.indexOf(id_user) == -1) {
											arrValidaUser.push(id_user)
										
											//console.log(" ##### id_user = "+id_user)
											//console.log(" ##### fullName = "+ret.content.fullName)
											
											// Recupera o Id no LMS do usuário
											var consta_lms = new Array(DatasetFactory.createConstraint('USERNAME',id_user,id_user,ConstraintType.MUST));
											consta_lms.push(DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST));
											var dts_cod_lms = DatasetFactory.getDataset('ds_user_lms', null, consta_lms, null);
											console.log(dts_cod_lms);
											
											// Verifica se existe valores dentro do
											// dataset de usuarios do lms
											if ( dts_cod_lms.values.length > 0 )
											{
												// Cria a lista de usuario que sera
												// matriculado no treinamento
												//console.log(" ##### dts_cod_lms.values[0]['ID'] = "+dts_cod_lms.values[0]['ID'])

												console.log(" ##### ret.content.fullName = "+ret.content.fullName)
												parties.push({"id":dts_cod_lms.values[0]['ID'],"name":ret.content.fullName,"type":"User"});
											}
										}
									}
									
									my_dict = {
										"parties": parties,
										"items": [
											{
											"id": id_treinamento,
											"type": "TRACK_TRAINING"
											}
										]
									};
									
									my_dict = JSON.stringify(my_dict);
									// console.log(my_dict);
									
									var url = "/lms/api/v1/enrollments/requests/";
									var retorno = $.fn.chama_service(url, "POST", "json", "cria_conteudo_lms_matricula_user",my_dict);
									
									if ( retorno.failureItems.length > 0 )
									{
										console.log("Existe erros na criacao do LMS");
										console.log(retorno)
									}
								
							}
						}
						// Se os campos Hierarquia e Nivel não estão preenchidos
						else{
							console.log("caiu no else")
							if (hierarquia == "" || hierarquia == null) throw "Campo de preenchimento obrigat&oacute;rio [ Hierarquia ]";
							if (nivel == "" || nivel == null) throw "Campo de preenchimento obrigat&oacute;rio [ N\u00edvel ]";
							
							
						}
						/**
						 * Fim da busca id lms user fluig
						 */						
					}					
				}
			}
		},
		
		/**
		 * altera_aplicacao
		 * 
		 * Altera o valor do campo de aplicacao conforme 
		 * opcao selecionada no campo - O que deseja padronizar
		 */
		altera_aplicacao:function()
		{
			// Coleta o valor do campo de padronizacao
			var op_tipo = $("#op_cfg_tipo_docto").val();
			var read_only = false;
			// Verifica se o campo esta padronizando pl
			if ( op_tipo == "pl" )
			{
				// Apaga o valor do campo
				$("#op_pl_aplicacao").val('');
				read_only = false;
			}
			else
			{
				// Apaga o valor do campo
				$("#op_pl_aplicacao").val('');
				//trocar para true se quiser que o campo aplicação fique desabilitado quando não for PL
				read_only = false;
			}
			$("#op_pl_aplicacao").attr('readonly',read_only).prop('disabled', read_only);
			if ( read_only )
			{
				$("#op_pl_aplicacao").children('option:not(:selected)');
			}
		},

		/**
		 * lista_usuarios_treinamento
		 * 
		 * função que monta uma lista de usuarios que serão treinados
		 */
		lista_usuarios_treinamento: function() {

			console.log("indice function monstra = "+ contador);

			// Coleta a hierarquia e o nível desejado
			var hierarquia = $("#txt_cdg_hierarquia___"+contador).val();
			var nivel = $("#txt_nivel_hierarquia___"+contador).val();
			var consultaDataset = "ds_varre_hierarquia";

			if ( hierarquia != "" && nivel != "")	{

				// Cria as constraints do ds_recupera_hierarquia passando constraint no formato "hierarquia/nivel"
				var c1 = DatasetFactory.createConstraint("nomeFunc", hierarquia+"/"+nivel, hierarquia+"/"+nivel, ConstraintType.MUST);
				var constraints = new Array(c1);
				var dts_hierarquia_nivel = DatasetFactory.getDataset(consultaDataset, null, constraints, null);
				console.log("dts_hierarquia_nivel");
				console.log(dts_hierarquia_nivel);

				// Verifica se existe valor no dataset
				if ( dts_hierarquia_nivel.values.length > 0 )	{

					var parties = [];
					var my_dict = null;
					var arrValidaUser = [];
					var tr = "";

									
					for ( var a = 0; a < dts_hierarquia_nivel.values.length; a++ )
					{
						// Busca o id dos usuários no dts_hierarquia_nivel
						var id_user = dts_hierarquia_nivel.values[a]['codFunc'];
						var ret = $.fn.pesquisa_usuario(id_user);
						
						if (arrValidaUser.indexOf(id_user) == -1) {
							arrValidaUser.push(id_user)  //Aqui eu monto uma lista de usuarios para criar
						
							//console.log(" ##### id_user = "+id_user)
							//console.log(" ##### fullName = "+ret.content.fullName)
							
							// Recupera o Id no LMS do usuário
							var consta_lms = new Array(DatasetFactory.createConstraint('USERNAME',id_user,id_user,ConstraintType.MUST));
							consta_lms.push(DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST));
							var dts_cod_lms = DatasetFactory.getDataset('ds_user_lms', null, consta_lms, null);
							console.log(dts_cod_lms);
							
							// Verifica se existe valores dentro do
							// dataset de usuarios do lms
							if ( dts_cod_lms.values.length > 0 ) {
									
									console.log("Valor ID = "+ dts_cod_lms.values[0]['ID']);
									console.log("Valor Nome = "+ ret.content.fullName);

								tr += '<tr>'+
												'<td>' + dts_cod_lms.values[0]['ID'] + '</td>'+
												'<td>' + ret.content.fullName 	     + '</td>'+
											'</tr>';
							
							} else {

								tr += '<tr>'+
											'<td> - </td>'+
											'<td>NÃO HÁ USUÁRIO PARA SER TREINADO</td>'+
										'</tr>';
							}
						}
					}
				}

				// modal onde será listados os usuarios
				var myModal = FLUIGC.modal({
					title: 'Treinamento LMS',
					content: '<h2>Usuários que serão cadastrados no treinamento</h2>'+
					'<table class="table table-bordered" id="lista_usuarios" style="width: 100%">'+
					'<thead>'+
						'<tr>'+
							'<th scope="col">ID</th>'+
							'<th scope="col">NOME</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>'+
							tr+
					'</tbody>'+
				'</table>',
					id: 'fluig-modal',
					actions: [{
							'label': 'Close',
							'autoClose': true
					}]
			}, function(err, data) {

			});
			
			} else {

				if (hierarquia == "" || hierarquia == null) throw "Campo de preenchimento obrigat&oacute;rio [ Hierarquia ]";
				if (nivel == "" || nivel == null) throw "Campo de preenchimento obrigat&oacute;rio [ N\u00edvel ]";
			}
		},
		
		/**
		 * 
		 * @param {*} cod_area String: codigo da area do colaborador
		 * 
		 * Realiza a busca da area do colaborador no dataset ds_parametrização_area
		 * Retorna a descrição da area 
		 */
		search_area_description: function(cod_area) {
			
			var c1 = DatasetFactory.createConstraint("CodArea", "%"+cod_area+"%", "%"+cod_area+"%", ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
			var constraints   = new Array(c1, c2);
			var ds_area = DatasetFactory.getDataset("ds_parametrizacao_area", null, constraints, null);
			var desc = ds_area.values[0]['DescArea'];

			if (desc.indexOf(".") != -1) {

				var description = desc.split(".");		
				console.log(ds_area.values[0]['CodArea']);
				console.log(description);

				return description[1].trim();
			}
			
			return null;
		},
		
		/**
		 * 
		 * @param {*} id id do campo que recebera o cargo 
		 * @param {*} cpf login do colaborador para realizar a consulta no dataset
		 * 
		 * função que atribui a um input o cargo do colaborador
		 */
		cargo_colaborador: function (id, cpf) {

			if (isNaN(cpf)) {	return }

			var c1 		  = DatasetFactory.createConstraint("CPF", cpf, cpf, ConstraintType.MUST);
			var dataset = DatasetFactory.getDataset("dsDadosFuncionarioRM", null, new Array(c1), null);

			if (dataset.values.length > 0 && (dataset.values[0].NOMFUNCAO != "" && dataset.values[0].NOMFUNCAO != null)) {
				
				var cargo = dataset.values[0].NOMFUNCAO.split("-");
				$("#"+id).prop("readonly", true);
				$("#"+id).val(cargo[1].trim().toUpperCase());
				
			} else {

				$("#"+id).prop("readonly", false);
				$("#"+id).val("");
			}
		}
	});

	// $("#btnListaUsuarios___"+contador).click(function() {
	// 	console.log("click"+contador);
	// 	$.fn.lista_usuarios_treinamento();
	// });




	
	// Quando alterar o valor do campo - qual a sua area
	$("#op_cfg_uso").change(function(){
		console.log("op_cfg_uso")
		$.fn.prin_area_int()
	});


	// Quando alterar o tipo de solicitacao
	$("#id_op_cfg_tipo").change(function(){
		console.log("id_op_cfg_tipo")
		$.fn.tp_gera_codigo_docto();
	});

	
	// Quando alterar o que deseja padronizar
	$("#op_cfg_tipo_docto").change(function(){
		console.log("op_cfg_tipo_docto")
		$.fn.tp_gera_codigo_docto();
		// Altera o valor do campo de aplicacao
		$.fn.altera_aplicacao();
	});

	//Quando escolher a area pega a descrição
	// $("#txt_cfg_area").change(function(){

	// lista usuarios que serão treinados

	// pega o value da arpovação do gestor e seta no campo auxiliar
	$("input[type=radio][name='op_cfg_aprov_gestor']").click(function(){		
		$("#aprovacaoGestor").val($(this).val());
	});

	// Mascara para campo de data
	$('.calendario').mask("00/00/0000");
});


var beforeSendValidate = function(numState,nextState)
{
	// Atividades
	var inicio = "7";
	var criar_revisar_doc = "14";
	var aprovar_gestor = "8";
	var realizar_consenso = "22";
	var validar_conteudo = "29";
	var validar_gestao = "31";
	var aprovar_diretoria = "43";
	var publicar_pdf = "18";
	var fim = 20;
	var campos_obr = [];


	if ( numState == 0 || numState == inicio )
	{
		var isOk = confirm("Acessar a solicitação novamente para conclusão do preenchimento das informações.");
	    return isOk;
	}

	// Atividade do consenso
	if ( numState == realizar_consenso)
	{
		$.fn.opcao_consenso();
	}
	
	// Quando a atividade for a final
	if ( numState == publicar_pdf )
	{
		// Publica o arquivo no lms
		$.fn.cria_conteudo_lms();
	}
	
	//if ( numState == inicio || numState == 0 )
	if ( numState == validar_gestao && nextState == publicar_pdf )
	{
		campos_obr.push("txt_cfg_obs_gestao","txt_cargo_aprovado");

		// Verifica se existe campos em branco
		for ( var i1 = 0; i1 < campos_obr.length; i1++ )
		{
			var campo = $("#"+campos_obr[i1]).val();
			if ( campo == null || campo == '' )
			{
				throw( 'Verifique se os campos ( Observa&ccedil;&atilde;o ou Cargo ) n&atilde;o est&atilde;o em branco.' );
			}
		}

		// Coleta a url de upload
		var url = $.fn.coleta_upload_dir() + "/";

		// Coleta a matricula do usuario
		var d_user = $.fn.coleta_user_logged();
		
		// Coleta caminho arquivo em anexo
		var anexo_dir = $.fn.coleta_att_url();

		// Completa a url
		url += d_user.userCode + "/" + $("#txt_codigo").val() + ".docx";
//		url = url.replace("/\\","\\");
//		url = url.replace("\\\\","\\");
		
		// Coleta dados das tabelas pai filho
		// Tabela de conrole de revisao e registros decorrentes
		var aux = 1;
		var tb_aux_revisao = true;
		var tb_aux_reg = true;

		// Array para montar o json da tabela de revisao
		var arr_txt_revisao = [];
		var arr_data_revisao = [];
		var arr_desc_revisao = [];

		// Array para montar o json da tabela de registros decorrentes
		var arr_txt_nome = [];
		var arr_txt_local = [];
		var arr_txt_quem = [];
		var arr_txt_inform = [];
		var arr_txt_periodo = [];
		var arr_txt_expira = [];

		while ( true )
		{
			if ( tb_aux_revisao || tb_aux_reg )
			{
				// Campos da tabela de revisao
				var txtrevisao = $("#txt_revisao___" + aux).val();
				var datarevisao = $("#dt_data_revisao___" + aux).val();
				var descrevisao = $("#txt_desc_revisao___" + aux).val();
				// Monta o Array da tabela de revisao
				if ( txtrevisao != undefined && datarevisao != undefined && descrevisao != undefined )
				{
					arr_txt_revisao.push(txtrevisao);
					arr_data_revisao.push(datarevisao);
					arr_desc_revisao.push(descrevisao);
				}
				else
				{
					tb_aux_revisao = false;
				}

				// Campos da tabala de registros decorrentes
				var txtnomear = $("#txt_nome_arquivo___" + aux).val();
				var txtlocarm = $("#txt_local_arm___" + aux).val();
				var txtquemac = $("#txt_quem_acessa___" + aux).val();
				var txtqualin = $("#txt_qual_inform___" + aux).val();
				var txtperret = $("#txt_periodo_retencao___" + aux).val();
				var txtapoexp = $("#txt_apos_expira___" + aux).val();
				// Monta o Array da tabela de registro decorrente
				if ( txtnomear != undefined && txtlocarm != undefined && txtquemac != undefined
						&& txtqualin != undefined && txtperret != undefined && txtapoexp != undefined )
				{
					arr_txt_nome.push(txtnomear);
					arr_txt_local.push(txtlocarm);
					arr_txt_quem.push(txtquemac);
					arr_txt_inform.push(txtqualin);
					arr_txt_periodo.push(txtperret);
					arr_txt_expira.push(txtapoexp);
				}
				else
				{
					tb_aux_reg = false;
				}
			}
			else
			{
				break;
			}

			aux++;
		}

		// Monta a estrutura json
//		console.log("docUrl = "+anexo_dir);
//		console.log("url = "+url);
		var my_dict = {
			"docUrl":anexo_dir,
			"caminhoSalva":url,

			"assunto": $("#txt_assunto").val().toUpperCase(),
			"codigo": $("#txt_codigo").val(),
			"validade": $("#txt_validade").val(),
			//"area_resp": $("#txt_area_resp").val(),
			"area_resp": $.fn.search_area_description($("#txt_cfg_area").val()),

			"nom_ela": $("#txt_nome_elaborado").val(),
			"car_ela": $("#txt_cargo_elaborado").val(),
			"dat_ale": $("#dt_data_elaborado").val(),
			"nom_apr": $("#txt_nome_aprovado").val(),
			"car_apr": $("#txt_cargo_aprovado").val(),
			"dat_apr": $("#dt_data_aprovado").val(),

			"revisao":arr_txt_revisao,
			"data":arr_data_revisao,
			"descricao":arr_desc_revisao,

			"nom_arq":arr_txt_nome,
			"loc_arm":arr_txt_local,
			"qem_ace":arr_txt_quem,
			"qal_inf":arr_txt_inform,
			"per_ret":arr_txt_periodo,
			"aps_exp":arr_txt_expira
		};
		
		// Verifica se eh criacao ou revisao
		if ( $("input[name='op_cfg_tipo']:checked").val() == "revisao" )
		{
			my_dict.tipo_sol = 1;
		}
		else
		{
			my_dict.tipo_sol = 0;
		}
		
		// Converte para json
		my_dict = JSON.stringify(my_dict);
		console.log("my_dict ");
		console.log(my_dict);
		// Atualiza o doc
		var doc_at = $.fn.grava_doc(my_dict);
		
		// Realiza a alteracao no documento e salva no upload
		if ( doc_at.status == "200" )
		{
			// Atualiza o anexo
//			console.log("Atualiza doc");
			var tipo_sol = $("input[name='op_cfg_tipo']:checked").val();
			
			// Quando for criacao publica um documento no GED
			var publica_doc = $.fn.copy_upload_and_publish();

			console.log(publica_doc);
			if (!publica_doc) {
				throw("Erro ao publicar o documento");
			}
			
			// Realiza a publicacao no GED
			if ( publica_doc.message.detail != "OK" )
			{
				throw("Erro ao publicar o documento");
			}
			else if ( publica_doc.message.detail == "OK")
			{
				//console.log("Entrou permissoes");
				// Atribui as permissoes no documento
				var permi_doc = $.fn.permissoes_documento();
//				console.log(permi_doc);
			}
		}
		else
		{
			throw("Ocorreu um erro ao alterar o arquivo.");
		}
	}
//	throw "barrando atividade para testes";
}

/**
 * envia_formulario
 * 
 * envia o formulario para a proxima atividade
 * necessita de 2 clicks para enviar a solicitação 
 * @param {*} obj this - objeto que foi clicado
 */

var attrBtn = [];

function enviaFormulario(obj) {

	attrBtn.push($(obj).attr('name'));
	
	// Se houver 2 cliques, verifique se foi no mesmo botão
	if(attrBtn.length == 2){
		if(attrBtn[0] == attrBtn[1]){
			window.parent.$('button[data-send]').first().click();
			attrBtn = [];
		}else{
			var aux = attrBtn[1];
			attrBtn = [];
			attrBtn.push(aux);
			aux = "";
		}
	}
}

function addHierarquia(){

	 contador = wdkAddChild("tb_hierarquia");
	 console.log("indice function = "+ contador);

}

function zoomDoido(){

    var id = "ztxt_cdg_hierarquia___"+contador;

	console.log("entrei!");
	console.log("AWWWN ! " +id);

	var a = id.substr(1, id.length).replace("___"+contador,"");

	console.log("olha la olha só = "+ a);

	window.open("zoom.html?id=" + a, "list", "width=700, height=300, left=300, top=100");
}

function seFodeuPc(id){

	console.log("Na sua Birra !! TROUXA"+id);
	$.fn.lista_usuarios_treinamento();
}

console.log("indice = "+ contador);