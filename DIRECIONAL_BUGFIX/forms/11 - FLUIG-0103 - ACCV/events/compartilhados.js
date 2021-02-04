////////////////////////////////////////////////////////////////////////////////
/*ARQUIVO COM FUNÇÕES COMPARTILHADAS NO BACKEND DO FORMULARIO*/
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//VALIDATEFORM
////////////////////////////////////////////////////////////////////////////////
function inArray(needle, stack) {
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] == needle) return true;
    }
    return false;
};

function contorna(prefix, sufix) {
    return function(txt) {
        var txt = prefix + txt;
        txt += !sufix ? prefix : sufix
        return txt;
    }
};

/////////////////////////////////////////////////////////////////////////

function ValidaFormulario(form, atividade_atual) {
    this.form = form;
    this.atividade_atual= atividade_atual;
    
    
    this.formulario_valido = true;
    this.error_message = '';
    this.campos_nao_preenchidos = [];
    this.errors = [];
};

ValidaFormulario.prototype.mensagem_de_erro = function()
{
    
    if (!this.formulario_valido) 
    {
        if (this.campos_nao_preenchidos.length > 0) 
        {
            this.error_message += 'OPA! porblemas encontrados.<br>Favor verificar as seguintes informações:<br>';
            var campos_para_preencher = this.campos_nao_preenchidos.map(contorna('<strong> "', '"</strong>'));
            this.error_message += campos_para_preencher.join(' ,') + "!";
        }
    }
    
    if (this.errors.length > 0) 
    {
        for (let erro_id = 0; erro_id < this.errors.length; erro_id++)
        {
            this.error_message += '<br>' + this.errors[erro_id];
        }
    }
    
    return this.error_message;
}


ValidaFormulario.prototype.obriga_campo = function(config) {
    if (this.form.getValue(config.campo) == '') {
        this.formulario_valido = false;
        this.campos_nao_preenchidos.push(config.label);
    }
};

ValidaFormulario.prototype.atende_condicoes = function(condicoes) {
    for (let i = 0; i < condicoes.length; i++) {
        
        var valor_campo = this.form.getValue(condicoes[i].campo);
        
        for (let j = 0; j < condicoes[i].valores.length; j++) {
            if (condicoes[i].valores[j] == valor_campo) {
                return true;
            }
        }
    }
    return false;
};


ValidaFormulario.prototype.regra_obrigatorio = function(config) 
{
    if (!('condicoes' in config)) 
    {
        this.obriga_campo(config);
    } 
    else 
    {
        if(this.atende_condicoes(config.condicoes))
        {
            this.obriga_campo(config);
        }
    }
};

ValidaFormulario.prototype.regra_minimo_de_filhos = function(config) 
{
        var indexes = this.form.getChildrenIndexes(config.tablename);
        
        if (indexes.length < config.minimoFilhos) {
            this.formulario_valido = false;
            this.errors.push("Adicione ao menos " + config.minimoFilhos + ' "' + config.label + '" <strong>(' + (config.minimoFilhos - indexes.length) + " faltando)</strong>!");
        }
}

ValidaFormulario.prototype.regra_minimo_de_filhos_condicional = function(config) 
{
 	if (!('condicoes' in config)) 
    {
		 this.regra_minimo_de_filhos(config);
    } 
    else 
    {
    	 if(this.atende_condicoes(config.condicoes))
         {
    		 this.regra_minimo_de_filhos(config);
         }
    }
}

ValidaFormulario.prototype.regra_aomenos = function(qtdParaPreencher) {
    return function(config) {
        if (this.atende_condicoes(config.condicoes)) {
            
            var qtdPreenchida = 0;

            for (let i = 0; i < config.grupo.length; i++){
                if (this.form.getValue(config.grupo[i]) == 'sim') {
                    qtdPreenchida++;
                }
            }

            if (qtdPreenchida < qtdParaPreencher) {
                this.formulario_valido = false;
                this.errors.push('Selecione ao menos ' + qtdParaPreencher + ' ' + config.label + ' <strong>(' + (qtdParaPreencher - qtdPreenchida) + 'faltando)</strong>!');
            }
        }
    };
};


ValidaFormulario.prototype.regra_filho_obrigatorio = function(config) 
{
    if (this.form.getValue(config.campo + "___" + config.index) == '') 
    {
        this.formulario_valido = false;
        this.errors.push(config.index + '&ordm; O campo "' + config.label + '" do "' + config.label_pai + '" não está preenchido!' );
    }
};

ValidaFormulario.prototype.regra_filho_obrigatorio_condicional = function(config) 
{
	 if (!('condicoes' in config)) 
	    {
	        this.filho_obrigatorio(config);
	    } 
	    else 
	    {
	        if(this.atende_condicoes(config.condicoes))
	        {
	            this.filho_obrigatorio(config);
	        }
	    }
};


// Valida regras do formulário
ValidaFormulario.prototype.validar = function(regras_do_formulario) {
    // processa configurações das regras
    regras_do_formulario.forEach(function(config){
        
        // Verifica se as regras precisam ser aplicadas na atividade atual
        if (inArray(this.atividade_atual, config.atividades)) {
            config.regras.forEach(function(regra){
                var regra_preparada = this.prepara_regra(regra);
                regra_preparada(config);
            }, this);
        }
    }, this);
    
    return this.formulario_valido;
};


ValidaFormulario.prototype.prepara_regra = function(regra) {
    
    var dados_regra = regra.split("|");
    
    var regra = dados_regra.length == 1 ? this['regra_' + regra] : this['regra_' + dados_regra[0]](dados_regra[1]);

    return regra.bind(this);
};


ValidaFormulario.prototype.regra_pai_e_filho = function(config) 
{
    var indexes = this.form.getChildrenIndexes(config.tablename);
    
    for (let index_filho = 0; index_filho < indexes.length; index_filho++) {

        for (let id_config_filho = 0; id_config_filho < config.regras_filhos.length; id_config_filho++) {
            
            let filho_config = config.regras_filhos[id_config_filho];
            
            filho_config.index = indexes[index_filho];
            filho_config.label_pai = config.label;
            
            for (let id_regra_filho = 0; id_regra_filho < filho_config.regras.length; id_regra_filho++) {
                
                var regra_para_verificar = this.prepara_regra(filho_config.regras[id_regra_filho]);
                
                regra_para_verificar(filho_config);
            }
        }
    }
};

ValidaFormulario.prototype.regra_pai_e_filho_condicional = function(config) 
{
	 if (!('condicoes' in config)) 
	    {
	        this.regra_pai_e_filho (config);
	    } 
	    else 
	    {
	        if(this.atende_condicoes(config.condicoes))
	        {
	            this.regra_pai_e_filho (config);
	        }
	    }
};

ValidaFormulario.prototype.ObrigatorioCustomizada = function(config) 
{
	if (this.form.getValue(config.campo + "___" + config.index) == '') {
        this.formulario_valido = false;
        this.errors.push(config.index + '&ordm; campo "' + config.label + '" para "' + config.label_pai + '" não preenchido!' );
    }
};


ValidaFormulario.prototype.regra_PIS = function(config) 
{
	var mensagem = '<strong>o Campo "PIS" tem um número invalido.</strong>'
	 var pis = new String(this.form.getValue(config.campo));
	 var multiplicadorBase = "3298765432";
	    var total = 0;
	    var resto = 0;
	    var multiplicando = 0;
	    var multiplicador = 0;
	    var digito = 99;

	    // Retira a mascara
	    var numeroPIS = pis.replace(/[^\d]+/g, '');

	    if (numeroPIS.length !== 11 ||
	        numeroPIS === "00000000000" ||
	        numeroPIS === "11111111111" ||
	        numeroPIS === "22222222222" ||
	        numeroPIS === "33333333333" ||
	        numeroPIS === "44444444444" ||
	        numeroPIS === "55555555555" ||
	        numeroPIS === "66666666666" ||
	        numeroPIS === "77777777777" ||
	        numeroPIS === "88888888888" ||
	        numeroPIS === "99999999999") {
	        this.formulario_valido = false;
	        this.errors.push(mensagem);
	    } 
	    else 
	    {
	        for (var i = 0; i < 10; i++) {
	            multiplicando = parseInt(numeroPIS.substring(i, i + 1));
	            multiplicador = parseInt(multiplicadorBase.substring(i, i + 1));
	            total += multiplicando * multiplicador;
	        }

	        resto = 11 - total % 11;
	        resto = resto === 10 || resto === 11 ? 0 : resto;

	        digito = parseInt("" + numeroPIS.charAt(10));
	        if(!resto === digito)
	        {
	        	this.formulario_valido = false;
	        	this.errors.push(mensagem);
	        }
	    }
};

ValidaFormulario.prototype.regra_CPF = function(config) 
{
	var strCPF = String(this.form.getValue(config.campo)).replace(/[^\d]+/g, '');
    var mensagem = '<strong>o Campo "CPF" tem um número invalido.</strong>';

    if (strCPF.length !== 11 ||
    		strCPF === "00000000000" ||
    		strCPF === "11111111111" ||
    		strCPF === "22222222222" ||
    		strCPF === "33333333333" ||
        strCPF === "44444444444" ||
        strCPF === "55555555555" ||
        strCPF === "66666666666" ||
        strCPF === "77777777777" ||
        strCPF === "88888888888" ||
        strCPF === "99999999999") {
        this.formulario_valido = false;
        this.errors.push(mensagem + '!');
        return;
    } 
    
    var Soma = 0;
    var Resto;  
    
    for (i=1; i<=9; i++)
    {
    	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    }
    
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))
    {
    	Resto = 0;
    }
    
    if (Resto != parseInt(strCPF.substring(9, 10)))
    {
    	this.formulario_valido = false;
        this.errors.push(mensagem + '@');
        return;
    }
    
	Soma = 0;
	
    for (i = 1; i <= 10; i++)
    {
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))
    {
    	Resto = 0;
    }
    if (Resto != parseInt(strCPF.substring(10, 11)))
    {
    	this.formulario_valido = false;
        this.errors.push(mensagem + '#');
        return;
    }
    
};

////////////////////////////////////////////////////////////////////////////////
//DISPLAYFIELDS
////////////////////////////////////////////////////////////////////////////////

//PARA RESOLVER O PROBLEMA DA DATA, ONDE SE APROVADO PELO FLUIG MOBILE A DATA FICA NO FORMATO AMERICANO
function CorrecaoDatas(form , arrayCamposData)
{
  for (var i = 0; i < arrayCamposData.length; i++) 
  {
  	
  	var dataAtual = form.getValue(arrayCamposData[i]);
  	
  	if (dataAtual != "") 
  	{
  		form.setValue(arrayCamposData[i], AjustarData(dataAtual));
  	}
  }
}

function AjustarData(data)
{
  if(data == "") 
  {
  	return "";
  };
  
  if (data.indexOf("-") > -1) 
  {
	  return data.split("-")[2] + "/" + data.split("-")[1] + "/" + data.split("-")[0];
  }
  
  return data;
}
