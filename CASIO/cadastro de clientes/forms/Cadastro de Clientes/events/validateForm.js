function validateForm(form){
	

	var atv_inicio    = [0,4,11];
    var atv_sop       = [57];
    var atv_cred      = [24];
    var atv_fiscal    = [35];  
    var acaoUsuario   = getValue("WKCompletTask");
    var txtParecer    = form.getValue("cpParecerReabertura");

    var campos_vendas = [
        { campo: 'slcDivisao', label: 'Divisão', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'zoomRepresentante', label: 'Representante', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'slcFinalidade', label: 'Finalidade', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cnpj', label: 'CNPJ', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'cpRazao', label: 'Razão', atividades: atv_inicio, regras: ['obrigatorio']},                    
        { campo: 'cpNomeFantasia', label: 'Nome Fantasia', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpEndereco', label: 'Endereço', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpNumero', label: 'Numero', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpMunicipio', label: 'Municipio', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpEstado', label: 'Estado', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'cpPais', label: 'Pais', atividades: atv_inicio, regras: ['obrigatorio']},
        { campo: 'txtSolicitante', label: 'Observação', atividades: atv_inicio, regras: ['obrigatorio']},
    ]
        setValidador(campos_vendas)
    
var campos_sop = [
        { campo: 'slcJuridica', label: 'Fisica/Juridica', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'slcTipo', label: 'Tipo', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpComplemento', label: 'Complemento', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpBairro', label: 'Bairro', atividades: atv_sop, regras: ['obrigatorio']},                    
        { campo: 'zoomCodMunicipio', label: 'Municipio', atividades: atv_sop, regras: ['obrigatorio']},                    
        { campo: 'cpDdd', label: 'DDD', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpTelefone', label: 'Telefone 1', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpTelefoneAlter', label: 'Telefone 2', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpContato', label: 'Contato', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpCep', label: 'Cep', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpEmail', label: 'Email', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'zoomNatureza', label: 'Natureza', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'zoomCcontab', label: 'C.contab', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'slcTipoFrete', label: 'Tipo Frete', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'zoomGrpVendas', label: 'GrpVendas', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'cpEmailRep', label: 'Email Representante', atividades: atv_sop, regras: ['obrigatorio']},
        { campo: 'txtSop', label: 'Observação', atividades: atv_sop, regras: ['obrigatorio']},
    ]
        setValidador(campos_sop)




var campos_credito = [
        { campo: 'cpEnderecoCob', label: 'Endereço', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpBairroCobranca', label: 'Bairro', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpMuniCobr', label: 'Municipio', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpCepCobra', label: 'CEP', atividades: atv_cred, regras: ['obrigatorio']},                    
        { campo: 'zoomUfCobra', label: 'Uf', atividades: atv_cred, regras: ['obrigatorio']},                    
        { campo: 'slcBoleto', label: 'Boleto', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpEmailBoleto', label: 'Email Boleto', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpCondPagamento', label: 'Cond. Pagamento', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpPrazoMd', label: 'Prazo', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'slcRisco', label: 'Risco', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpLimiteCreditoInter', label: 'Limite Credito Inter', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'dateLimCred', label: 'Data Lim', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpLimiteCredSeguro', label: 'Lim. Credito Seguro', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'dateVencSeg', label: 'Data Venc Seg.', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'dateEfetSeg', label: 'Data Efe Seg', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpLimiteCreditoSec', label: 'Limite de credito Sec', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'cpLimiteCredito', label: 'Limite de Credito', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'txtCredito', label: 'Observação Credito', atividades: atv_cred, regras: ['obrigatorio']},
        { campo: 'txtInfoAdi', label: 'Observação Informação adicional', atividades: atv_cred, regras: ['obrigatorio']},
    ]
        setValidador(campos_credito)



var campos_fiscal = [
            { campo: 'cpInsEst', label: 'Ins. Estad', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'cpCodCnae', label: 'Cod.CNAE', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'slcStatus', label: 'Status', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'cpSuframa', label: 'Suframa', atividades: atv_fiscal, regras: ['obrigatorio']},                    
            { campo: 'cpCodMunZf', label: 'Cod.Mun.ZF', atividades: atv_fiscal, regras: ['obrigatorio']},                    
            { campo: 'cpPaisBacen', label: 'Pais Bacen', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'slcTpj', label: 'TPJ', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'slcOptSimpNac', label: 'Opt.Simp.Nac ', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'slcOptSimples', label: 'Pot. Simples', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'slcContribuinte', label: 'Contribuinte', atividades: atv_fiscal, regras: ['obrigatorio']},
            { campo: 'cpMarcacao', label: 'Marcação', atividades: atv_fiscal, regras: ['obrigatorio']},            
            { campo: 'txtFiscal', label: 'Observação', atividades: atv_fiscal, regras: ['obrigatorio']},

    ]

 setValidador(campos_fiscal)






















	function setValidador(regras_do_formulario) {
        var Validador = new ValidaFormulario(form, getValue("WKNumState"));
        if (!Validador.validar(regras_do_formulario)) {
            throw Validador.mensagem_de_erro();
        }
    }

}

