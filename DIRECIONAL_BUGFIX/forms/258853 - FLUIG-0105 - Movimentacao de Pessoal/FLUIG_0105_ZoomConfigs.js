var ZoomFactory = function(zoomConfig) {
	var newZoom = new Zoom();
	
	for (prop in zoomConfig) {
		if (zoomConfig.hasOwnProperty(prop)) {
			newZoom[prop] = zoomConfig[prop];
		}
	}
	
	return newZoom;
};

var ZoomConfigs = {
		
		// Configuracao do Zoom de obra/departamento de origem
		ObraDepOrigem: {
			Titulo: "Buscar Obra/Departamento",
			FieldsName: new Array("cpLoginFluig"),
			Id: "IDZoomObraDep",
			DataSet: "DS_FLUIG_0007",
			Colunas: new Array(
					{ "title" : "Obra/Departamento", "name" : "DEPARTAMENTO" },
					{ "title" : "Código da Empresa", "name" : "CODCOLIGADA" },
					{ "title" : "Empresa", "name" : "EMPRESA" },
					{ "title" : "Código da secao", "name" : "CODSECAO", "display" : false },
					{ "title" : "Gestor", "name" : "NOME_GESTOR" },
					{ "Title" : "CodGestor", "name" : "GESTOR", "display": false },
					{ "Title" : "Estado", "name" : "ESTADO", "display": false },
					{ "Title" : "IsObra", "name" : "OBRAOUSEDE", "display": false},
					{ "Title" : "Nome Consultor RH", "name" : "NOME_CONSULTORA", "display": false}
			),
			Retorno: function(retorno) {
				if (document.getElementById("cpCodSecao").value != retorno[3]) {
					
	                var tipoSecao = getTipoSecao(retorno[3], retorno[1]);
	                var isObra = tipoSecao == "SEDE" ? '0' : '1';
				    
				    var secao = {
				        nome: retorno[0],
				        codColigada: retorno[1],
				        coligada: retorno[2],
				        codSecao: retorno[3],
				        nomeGestor: retorno[4],
				        chapaGestor: retorno[5],
				        estado: retorno[6],
				        isObra: isObra,
				        nomeConsultora: retorno[8]
				    };
					
					$("#FormMovimentacaoDePessoal").trigger("selectedObraDep", secao);
				}
			}
		},
		
		
		// Configuracoes do Zoom de Colaborador
		Colaborador: {
			Titulo: "Buscar Colaborador",
			FieldsName: new Array("cpCodSecao","cpCodEmpresa"),
			Id: "IDZoomColaborador",
			DataSet: "DS_FLUIG_0013",
			Colunas: new Array(
					{ "title" : "Nome", "name" : "NOME" },
					{ "title" : "Funcao", "name" : "FUNCAO" },
					{ "title" : "Matricula", "name" : "CHAPA" },
					{ "title" : "Salario Atual", "name" : "SALARIO" },
					{ "title" : "Data de Admissao", "name" : "DATAADMISSAO" },
					{ "title" : "Código da Funcao", "name" : "CODFUNCAO", "display" : false },
					{ "title" : "Consultoria", "name" : "CHAPA_CONSULTORA", "display" : false },
					{ "title" : "Gestor", "name" : "CHAPA_GERENTE", "display" : false },
					{ "title" : "Gerente Geral", "name" : "CHAPA_GG", "display" : false },
					{ "title" : "Superintendente", "name" : "CHAPA_SUP", "display" : false },
					{ "title" : "Diretor", "name" : "CHAPA_DIRETOR", "display" : false },
					{ "title" : "Filtrar Nome", "name" : "NOME", "display" : false },
					{ "title" : "Responsavel pela Folha", "name" : "CHAPA_FOLHA", "display" : false },
					{ "title" : "CPF", "name" : "CPF", "display" : false },
					{ "title" : "PCD", "name" : "PCD", "display" : false }
			),
			Retorno: function(retorno) {

				if (document.getElementById("cpMatricula").value != retorno[2]) {
				    
				    var colaborador = {
			            nome: retorno[0],
			            funcao: retorno[1],
			            matricula: retorno[2],
			            salario: retorno[3],
			            admissao: retorno[4],
			            codFuncao: retorno[5],
			            consultoria: retorno[6],
			            gerenteGeral: retorno[8],
			            superintendente: retorno[9],
			            diretor: retorno[10],
			            folha: retorno[12],
			            cpf: retorno[13],
			            PCD: retorno[14]
			        };
					
					$("#FormMovimentacaoDePessoal").trigger("selectedColaborador", colaborador);
				}
			}
		},
		
		// Configuracao do Zoom de Obra/Departamento de destino
		NovaObraDep: {
			Titulo: "Busca Obra/Departamento",
			//FieldsName: new Array("cpLoginFluig"),
			Id: "IDZoomObraDepKmsim",
			DataSet: "DS_FLUIG_0008",
			Colunas: new Array (
				{ "title" : "Obra/Departamento", "name" : "NOME_SECAO" },
				{ "title" : "Código da Empresa", "name" : "CODICOLIGADA_SECAO" },
				{ "title" : "Empresa", "name" : "NOME_EMPRESA" },
				{ "title" : "Gestor", "name" : "CHAPA_GERENTE", "display" : false },
				{ "title" : "Código da Secao", "name" : "CODSECAO", "display" : false },
				{ "title" : "Consultoria Destino", "name" : "CHAPA_CONSULTORA", "display" : false },
				{ "title" : "Gerente Geral Destino", "name" : "CHAPA_GG", "display" : false },
				{ "title" : "Superintendente Destino", "name" : "CHAPA_SUPER", "display" : false },
				{ "title" : "Diretor Destino", "name" : "CHAPA_DIRETOR", "display" : false },
				{ "title" : "Estado", "name" : "ESTADO", "display" : false },
				{ "title" : "Gestor", "name" : "NOME_GERENTE", "display" : false },
				{ "title" : "Nome Consultor", "name" : "NOME_CONSULTORA", "display" : false }
			),
			Retorno: function(retorno) {
			    
			    var codNovaSecao = $("#cpCodSecaoNovo").val();
			   
				if (codNovaSecao != retorno[4]) {
				    
				    var isObra = getTipoSecao(retorno[4], retorno[1]);
				    
				    isObra = isObra == 'OBRA' ? 1 : 0;
				    
			        var secao = {
		                nome: retorno[0],
		                codColigada: retorno[1],
		                empresa: retorno[2],
		                gestor: retorno[3],
		                codSecao: retorno[4],
		                consultor: retorno[5],
		                gerenteGeral: retorno[6],
		                superintendente: retorno[7],
		                diretor: retorno[8],
		                estado: retorno[9],
		                nomeGestor: retorno[10],
		                isObra: isObra,
		                nomeConsultora: retorno[11]
		            };
					
					$("#FormMovimentacaoDePessoal").trigger("selectedNovaObraDep", secao);
				}
				 
			    var NovSecao = $("#cpCodSecaoNovo").val(); 
			    NovSecao = NovSecao.substring(5,8);
				 
				 	if(NovSecao=="400"){
					 FLUIGC.message.alert({
				            message: 'N&atilde;o &eacute; poss&eacute;vel transferir colaboradores para essa Obra.Favor contatar seu Gestor.',
				            title: 'Atenção!',
				            label: 'OK'
				        });
					 
					 $("#cpZoomNovaObraDepTransPadrao").val(""); 
					 $("#cpCodigoEmpresaTransPadrao").val(""); 
					 $("#cpEstadoDestino").val(""); 
					 $("#cpNovaEmpresaTransPadrao").val(""); 
					 $("#cpNovoGestorTransPadrao").val(""); 
					 $("#cpDestinoParceiro").val(""); 
					 $("#cpNomeParceiroDestino").val(""); 
					 $("#cpDestinoConstrutor").val(""); 
				 	}
			}
		},
		
		Preenchedor: {
			FieldsName: ["cpCodigoEmpresaTransPadrao", "cpCodSecaoNovo"],
			Id: "IDZoomDpResponsavelProd",
			DataSet: "DS_FLUIG_0034",
			Titulo: "Buscar Responsável",
			Colunas: [
				{ "title" : "Nome do responsável", "name" : "NOME" },
				{ "title" : "CHAPA", "name" : "CHAPA", "display" : false }
			],
			Retorno: function(retorno) {
				if (document.getElementById('cpPreenchedorChapa').value != retorno[1]) {
					document.getElementById('cpPreenchedorNome').value = retorno[0];
					document.getElementById('cpPreenchedorChapa').value = retorno[1];
					
					$("#FormMovimentacaoDePessoal").trigger("selectedPreenchedor", retorno[1]);
				}
			}
		},
		
        Recolhedor: {
            Id: "IDZoomRecolhedorASO",
            DataSet: "DS_FLUIG_0034",
            Titulo: "Buscar Recolhedor ASO",
            Colunas: [
                { "title" : "Nome do responsável", "name" : "NOME" },
                { "title" : "CHAPA", "name" : "CHAPA", "display" : false }
            ],
            Retorno: function(retorno) {
                var recolhedor = { nome: retorno[0], matricula: retorno[1]};
                $("#FormMovimentacaoDePessoal").trigger("selectedRecolhedorASO", recolhedor);
            }
        },
		
		
		// Configuracao do Zoom de novo cargo
		NovoCargo: {
			Id: "IDZoomNovoCargo",
			DataSet: "DS_FLUIG_0023",
			Colunas: new Array(
				{ "title" : "Funcao", "name" : "NOME" },
				{ "title" : "Codigo da Funcao", "name" : "CODIGO", "display" : false }
			),
			Retorno: function(retorno) {
				
				if (document.getElementById("cpCodFuncaoNovo").value != retorno[1]) {
					document.getElementById("cpZoomNovoCargo").value = retorno[0];
					document.getElementById("cpCodFuncaoNovo").value = retorno[1];

					$("#FormMovimentacaoDePessoal").trigger("selectedNovoCargo");
				}
			},
		},
		
		
		// Configuracao do Zoom de novo salario
		NovoSalario: {
			Titulo: "Buscar Novo Salario",
			Id: "IDZoomNovoSalario",
			DataSet: "DS_FLUIG_0001",
			Colunas: new Array({"title" : "Novo Salario", "name" : "SALARIO"}),
			Retorno: function (retorno) {
				
				if (document.getElementById("cpZoomNovoSalario").value != retorno[0]) {
					document.getElementById("cpZoomNovoSalario").value = retorno[0];
					
					$("#FormMovimentacaoDePessoal").trigger("selectedNovoSalario");
				}
			}
		}
};

var getTipoSecao = function(secao, coligada) {
    var datasetResult = DatasetFactory.getDataset('DS_FLUIG_0050', [secao, coligada], null, null),
        tipoSecao = datasetResult.values[0].TIPOSECAO;
    
    $("#cpTipoSecao").val('');
    
    if (!tipoSecao) {
        
        FLUIGC.message.alert({
            message: 'Obra/Departamento não registrado!<br>Selecione outra seção.',
            title: 'Atenção!',
            label: 'OK'
        });
        $("#cpTipoSecao").val('SECAO_NAO_REGISTRADA');
        return 'SECAO_NAO_REGISTRADA';
    }
    
    return tipoSecao.indexOf('SEDE') > -1 ? 'SEDE' : 'OBRA';
};

	
