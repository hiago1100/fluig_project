function validateForm(form){

log.info("===============Validate form================");	
var atividade = getValue("WKNumState");
var message = "";
var modalidade = form.getValue("cbModalidade");
var tipoEmpresa = form.getValue("cpOutorgado");
var outorgado = form.getValue("cpOutorgado_dois");
var solicitacao = form.getValue("cpSolicitacao");
var poder = form.getValue("cpPoderes");
var banco = form.getValue("cpBancos");
var status = form.getValue("cbStatus");
var aprovacao = form.getValue("cbAprovacaoSolicitante");
var avaliacao = form.getValue("cbAvaliacao");

if(atividade == 5){

    log.info("dentro do if ===== 5==========");
		if(form.getValue("cbTipoProcuracao") == ""){
			message += "</br>- Tipo de Procuração";
		}

		if(form.getValue("cbModalidade") == ""){
			message += "</br>- Modalidade";
		}

		if(form.getValue("cbViaFisica") == ""){
			message += "</br>- Via Física";
		}

		

		if (modalidade == "certidao"){
			if(form.getValue("cpLivro") == "")
				message += "</br>- Livro";

			if(form.getValue("cpFolha") == "")
				message += "</br>- Folha";
		}

		if (modalidade == "nova" || modalidade == "renovacao") {

			// if (form.getValue("cpOutorgado") == "") 
			//    message += "</br>- Tipo de Empresa";

			// if (form.getValue("cpOutorgado_dois") == "") 
			//    message += "</br>- Outorgado";


			// if (form.getValue("cpPoderes") == "") 
			//    message += "</br>- Poderes";

			if (form.getValue("botaoTipoEmpresa") == "sim") {

			    if (form.getValue("cpOutorgado") == "") 
				    message += "</br>- Tipo de Empresa";

				}

			if (form.getValue("botaoOutorgado") == "sim") {
				if (form.getValue("cpOutorgado_dois") == "") 
				    message += "</br>- Outorgado";
				}

			if (form.getValue("poderesBotao") == "sim") {
				if (form.getValue("cpPoderes") == "") 
					message += "</br>- Poderes";
				}

			if (poder == "outros") {

				if (form.getValue("cpQpoderes") == "") 
				   message += "</br>- Quais Poderes?";
			}

			if (poder == "orgaos") {

				if (form.getValue("cpQorgaos") == "") 
				   message += "</br>- Quais Orgãos?";
			}

			if (poder == "financiamento") {

				if (form.getValue("cpNomeEmpreedimento") == "") 
				   message += "</br>- Nome do Empreedimento";

				if (form.getValue("cpCidadeEmpreedimento") == "") 
				   message += "</br>- Cidade";

				if (form.getValue("cbEstados_brasilEmpreedimento") == "") 
				   message += "</br>- UF";

				if (form.getValue("cpMatricula") == "") 
				   message += "</br>- Matricula";

				if (form.getValue("cpCartorio") == "") 
				   message += "</br>- Cartório";

				if (form.getValue("cpLivroEmpreedimento") == "") 
				   message += "</br>- Livro";
			}

			if (poder == "movimentacao") {

				if (form.getValue("cpBancos") == "") 
				   message += "</br>- Bancos";

				if (banco == "outros") {

					if (form.getValue("cpQbanco") == "") 
					   message += "</br>- Qual banco?";
				}
			}

			if (poder == "escritura") {

				if (form.getValue("cpMatricula_escrituras") == "") 
				   message += "</br>- Matricula";


				if (form.getValue("cpCidade_escrituras") == "") 
				   message += "</br>- Cidade";


				if (form.getValue("cpEstados_brasilEscrituras") == "") 
				   message += "</br>- UF";

				if (form.getValue("cpCartorio_escrituras") == "") 
				   message += "</br>- Cartorio";

				if (form.getValue("cpLivro_escrituras") == "") 
				   message += "</br>- Livro";
			}


		}

		if (tipoEmpresa == "spe" || tipoEmpresa == "speGaveta" || tipoEmpresa == "scp" || tipoEmpresa == "parceiras" || tipoEmpresa == "corretora"){
			if (form.getValue("cpCnpj") == "") 
			   message += "</br>- CNPJ";

			if (form.getValue("cpCepSede") == "") 
			   message += "</br>- Cep da Sede";

			if (form.getValue("cpLogradouro") == "") 
			   message += "</br>- Logradouro";

			if (form.getValue("cpNumero") == "") 
			   message += "</br>- Número";

			if (form.getValue("cpComplemento") == "") 
			   message += "</br>- Complemento";

			if (form.getValue("cpBairro") == "") 
			   message += "</br>- Bairro";

			if (form.getValue("cpCidade") == "") 
			   message += "</br>- Cidade";

			if (form.getValue("cpEstados_brasil") == "") 
			   message += "</br>- UF";
		}

		if (tipoEmpresa == "regional") {
			if (form.getValue("cpRegionais") == "") 
			   message += "</br>- Quais Regionais?";
		}

		if (outorgado == "pessoaFisica") {
			if (form.getValue("cpSolicitacao") == "")
				message += "</br>- Solicitação";
		}

		if (solicitacao == "outroColaborador" || solicitacao == "proprioColaborador") {
			if (form.getValue("cpEstadoCivil") == "")
				message += "</br>- Estado Civil";

			if (form.getValue("cpCpf") == "")
				message += "</br>- CPF";

			if (form.getValue("cpRg") == "")
				message += "</br>- RG";

			if (form.getValue("cpFuncao") == "")
				message += "</br>- Função";

			if (form.getValue("cpCarteira") == "")
				message += "</br>- Carteira";

			if (form.getValue("cpNacionalidade") == "")
				message += "</br>- Nacionalidade";

			if (form.getValue("cpCep") == "")
				message += "</br>- CEP";

			if (form.getValue("cpLogradouro_dois") == "")
				message += "</br>- Logradouro";

			if (form.getValue("cpNumero") == "")
				message += "</br>- Numero";

			if (form.getValue("cpComplemento_dois") == "")
				message += "</br>- Complemento";

			if (form.getValue("cpBairro_dois") == "")
				message += "</br>- Bairro";

			if (form.getValue("cpCidade_dois") == "")
				message += "</br>- Cidade";

			if (form.getValue("cpEstados_brasil_dois") == "")
				message += "</br>- UF";
		}

		if (solicitacao == "terceiro") {

			if (form.getValue("cpNomeCompletoOutorgante") == "")
				message += "</br>- Nome do Outorgante";

			if (form.getValue("cpEstadoCivil_dois") == "")
				message += "</br>- Estado Civil";

			if (form.getValue("cpCpf_dois") == "")
				message += "</br>- CPF";

			if (form.getValue("cpRg_dois") == "")
				message += "</br>- RG";

			if (form.getValue("cpProfissao") == "")
				message += "</br>- Profissão";

			if (form.getValue("cpCarteira_dois") == "")
				message += "</br>- Carteira";

			if (form.getValue("cpNacionalidade_dois") == "")
				message += "</br>- Nacionalidade";

			if (form.getValue("cpCepComercial") == "")
				message += "</br>- Cep Comercial";

			if (form.getValue("cpLogradouro_tres") == "")
				message += "</br>- Logradouro";

			if (form.getValue("cpNumero_tres") == "")
				message += "</br>- Numero";

			if (form.getValue("cpComplemento_tres") == "")
				message += "</br>- Complemento";

			if (form.getValue("cpBairro_tres") == "")
				message += "</br>- Bairro";

			if (form.getValue("cpCidade_tres") == "" )
				message += "</br>- Cidade";

			if (form.getValue("cpEstados_brasil_tres") == "")
				message += "</br>- UF";
		}

		if (outorgado == "pessoaJuridica") {

			if (form.getValue("cpNomeEmpresarial") == "")
				message += "</br>- Nome Empresarial";


			if (form.getValue("cpCnpj_dois") == "")
				message += "</br>- CNPJ";


			if (form.getValue("cpNomeRepresentante") == "")
				message += "</br>- Nome Representante";


			if (form.getValue("cpCpfRepresentante") == "")
				message += "</br>- CPF";


			if (form.getValue("cpRgRepresentante") == "")
				message += "</br>- RG";


			if (form.getValue("cpCepEmpresa") == "")
				message += "</br>- CEP";


			if (form.getValue("cpLogradouroEmpresa") == "")
				message += "</br>- Logradouro";


			if (form.getValue("cpNumeroEmpresa") == "")
				message += "</br>- Numero";


			if (form.getValue("cpComplementoEmpresa") == "")
				message += "</br>- Complemento";


			if (form.getValue("cpBairroEmpresa") == "")
				message += "</br>- Bairro";


			if (form.getValue("cpCidadeEmpresa") == "")
				message += "</br>- Cidade";


			if (form.getValue("cpEstados_brasilEmpresa") == "")
				message += "</br>- UF";
		}
}
	

if (atividade == 9) {
	if(form.getValue("cbAprovacao") == "")
		message += "</br>- Defina a aprovação";

	if (form.getValue("cpParecerGestor") == "") 
		message += "</br>- Parecer do Gestor";

}

if (atividade == 11) {

	if(form.getValue("cbAprovacaoJuridico") == "")
		message += "</br>- Defina a aprovação";

	if (form.getValue("cbStatus") == "") 
		message += "</br>- Parecer do Gestor";


	if (form.getValue("cbParecerJuridico") == "") 
		message += "</br>- Parecer Juridico";

	if (status == "2") {
		if (form.getValue("cpPrevisao") == "") 
			message += "</br>- Previsão Assinatura";
	}
}

if (atividade == 28) {
	if(form.getValue("cbAprovacaoAdicional") == "")
		message += "</br>- Defina a aprovação";

	if (form.getValue("cpParecerAdicional") == "") 
		message += "</br>- Parecer";
}

if (atividade == 38) {
	 if(form.getValue("cbValidacao") == "")
	 	message += "</br>- Defina a aprovação";

	 if (form.getValue("cpParecerValidacao") == "") 
	 	message += "</br>- Parecer do Validador";
}

if (atividade == 46) {
	if(form.getValue("cbAprovacaoDiretoria") == "")
		message += "</br>- Defina a aprovação";

	if (form.getValue("cpParecerDiretoria") == "") 
		message += "</br>- Parecer da Diretoria";
}

if (atividade == 50) {

	if(form.getValue("cbAprovacaoSolicitante") == "")
		message += "</br>- Defina a aprovação";

	if (form.getValue("cpParecerSolicitante") == "") 
		message += "</br>- Parecer do Solicitante";

	if (aprovacao == "1") {

	if(form.getValue("cbAvaliacao") == "")
		message += "</br>- Aveliar Solicitação";
	}

	if (avaliacao == "3" || avaliacao == "4") {

		if(form.getValue("cpJustificativa") == "")
			message += "</br>- Justificativa";
	}
}


if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;

}