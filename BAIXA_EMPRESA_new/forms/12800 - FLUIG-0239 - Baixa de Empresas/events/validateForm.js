function validateForm(form) {
  var atv_inicio = [0, 4, 29];
  var atv_reabertura = [29];
  var atv_verificarProcessoJuridico = [5];
  var atv_conferenciaProcessamento = [183];
  var atv_realizaBaixaEmpresa = [178];
  var atv_solicitarEncerramentoConta = [176];
  var atv_ajusteSolicitacao = [191];
  var atv_verificaPendenciasControladoria = [38];
  var atv_solucionarPendenciasControladoria = [70];
  var atv_encerraCentroCusto = [172];
  var atv_verificaPendenciaSocietaria = [40];
  var atv_solucionaPendenciaSocietaria = [74];
  var atv_emiteDeclaracaoEncerraDespesa = [185];
  var atv_verificaPendenciaSuprimento = [42];
  var atv_solucionaPendenciaSuprimento = [78];
  var atv_verificaPendenciaFiscal = [44];
  var atv_solucionaPendenciaFiscal = [82];
  var atv_verificaPendenciaSuprimentoAdm = [46];
  var atv_solucionaPendenciaSuprimentoAdm = [86];
  var atv_verificaPendenciaDepartamentoPessoal = [48];
  var atv_solucionaPendenciaDepartamentoPessoal = [90];
  var atv_verificaPendenciaContasPagar = [50];
  var atv_solucionaPendenciaContasPagar = [94];
  var atv_verificaPendenciaAssistenciaTecnica = [142];
  var atv_solucionaPendenciaAssistenciaTecnica = [109];
  var atv_verificaPendenciaContasReceber = [144];
  var atv_solucionaPendenciaContasReceber = [114];
  var atv_verificaPendenciaGestaoDividas = [146];
  var atv_solucionaPendenciaGestaoDividas = [119];
  
  var regras_do_formulario = [
    // Inicio
    {
      campo: 'slcTipoBaixa',
      label: 'Tipo de Baixa',
      atividades: atv_inicio,
      regras: ['obrigatorio']
    },
    {
      campo: 'cpNomeEmpresa',
      label: 'Nome da Empresa',
      atividades: atv_inicio,
      regras: ['obrigatorio']
    },
    {
      campo: 'cpCnpj',
      label: 'CNPJ',
      atividades: atv_inicio,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtMotivo',
      label: 'Parecer',
      atividades: atv_inicio,
      regras: ['obrigatorio']
    },
    // Reabertura
    {
      campo: 'cpReaberturaChamado',
      label: 'Aprovação Reabertura',
      atividades: atv_reabertura,
      regras: ['obrigatorio']
    },
    {
      campo: 'cpParecerReabertura',
      label: 'Parecer',
      atividades: atv_reabertura,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'cpReaberturaChamado',
        valores: [2]
      }]
    },
    // Verificar Processo Juridico
    {
      campo: 'slcAppJuridico',
      label: 'Aprovação Juridico',
      atividades: atv_verificarProcessoJuridico,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtParecerJuridico',
      label: 'Parecer',
      atividades: atv_verificarProcessoJuridico,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAppJuridico',
        valores: [2]
      }]
    },
    // Verificar Pendencias Controladoria
    {
      campo: 'slcControladoria',
      label: 'Aprovação Controladoria',
      atividades: atv_verificaPendenciasControladoria,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtPrevisaoReg',
      label: 'Previsão de Regularização das Pendências',
      atividades: atv_verificaPendenciasControladoria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcControladoria',
        valores: [2]
      }]
    },
    {
      campo: 'txtParecerControladoria',
      label: 'Parecer',
      atividades: atv_verificaPendenciasControladoria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcControladoria',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Controladoria
    {
      campo: 'slcControladoriaSolu',
      label: 'Aprovação Controladoria Solu',
      atividades: atv_solucionarPendenciasControladoria,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtParecerControladoriaSolu',
      label: 'Parecer',
      atividades: atv_solucionarPendenciasControladoria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcControladoriaSolu',
        valores: [2]
      }]
    },
    // Verificar Pendencias Societaria
    {
      campo: 'slcContabVeri',
      label: 'Aprovação Verifica Societaria',
      atividades: atv_verificaPendenciaSocietaria,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtPrevRegCont',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaSocietaria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcContabVeri',
        valores: [2]
      }]
    },
    {
      campo: 'txtParecerContabVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaSocietaria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcContabVeri',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Societaria
    {
      campo: 'slcContabSolu',
      label: 'Aprovação solu societaria',
      atividades: atv_solucionaPendenciaSocietaria,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtParecerContabSolu',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaSocietaria,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcContabSolu',
        valores: [2]
      }]
    },
    // Verificar Pendencias Suprimentos
    {
      campo: 'slcSuprVer',
      label: 'Aprovação veri supri',
      atividades: atv_verificaPendenciaSuprimento,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtSuprVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaSuprimento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcSuprVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtSuprVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaSuprimento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcSuprVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Suprimentos
    {
      campo: 'slcSuprSol',
      label: 'Aprovação solu supri',
      atividades: atv_solucionaPendenciaSuprimento,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtSuprSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaSuprimento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcSuprSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Fiscais
    {
      campo: 'slcFisVer',
      label: 'Aprovação veri fiscal',
      atividades: atv_verificaPendenciaFiscal,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtFisVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaFiscal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcFiscVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtFisVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaFiscal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcFisVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Fiscais
    {
      campo: 'slcFisSol',
      label: 'Aprovação solu fical',
      atividades: atv_solucionaPendenciaFiscal,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtFisSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaFiscal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcFisSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Suprimentos Administrativos
    {
      campo: 'slcAdmVer',
      label: 'Aprovação veri sup adm',
      atividades: atv_verificaPendenciaSuprimentoAdm,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtAdmVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaSuprimentoAdm,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAdmVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtAdmVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaSuprimentoAdm,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAdmVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Suprimentos Administrativos
    {
      campo: 'slcAdmSol',
      label: 'Aprovação solu sup adm',
      atividades: atv_solucionaPendenciaSuprimentoAdm,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtAdmSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaSuprimentoAdm,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAdmSol',
        valores: [2]
      }]
    },
    // Verifica Pendencias Departamento Pessoal 
    {
      campo: 'slcDepVer',
      label: 'Aprovação veri depto pessoal',
      atividades: atv_verificaPendenciaDepartamentoPessoal,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtDepVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaDepartamentoPessoal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcDepVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtDepVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaDepartamentoPessoal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcDepVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Departamento Pessoal
    {
      campo: 'slcDepSol',
      label: 'Aprovação solu depto pessoal',
      atividades: atv_solucionaPendenciaDepartamentoPessoal,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtDepSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaDepartamentoPessoal,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcDepSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Contas a Pagar
    {
      campo: 'slcCpVer',
      label: 'Aprovação veri conta a pagar',
      atividades: atv_verificaPendenciaContasPagar,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtCpVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaContasPagar,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCpVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtCpVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaContasPagar,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCpVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Conta a Pagar
    {
      campo: 'slcCpSol',
      label: 'Aprovação solu conta a pagar',
      atividades: atv_solucionaPendenciaContasPagar,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtCpSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaContasPagar,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCpSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Assistencia Tecnica
    {
      campo: 'slcAssVer',
      label: 'Aprovação veri assis tec',
      atividades: atv_verificaPendenciaAssistenciaTecnica,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtAssVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaAssistenciaTecnica,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAssVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtAssVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaAssistenciaTecnica,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAssVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Assitencia Tecnica
    {
      campo: 'slcAssSol',
      label: 'Aprovação solu assi tec',
      atividades: atv_solucionaPendenciaAssistenciaTecnica,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtAssSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaAssistenciaTecnica,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAssSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Contas a Receber
    {
      campo: 'slcCrVer',
      label: 'Aprovação veri conta a receber',
      atividades: atv_verificaPendenciaContasReceber,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtCrVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaContasReceber,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCrVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtCrVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaContasReceber,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCrVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Contas a Receber
    {
      campo: 'slcCrSol',
      label: 'Aprovação solu conta a receber',
      atividades: atv_solucionaPendenciaContasReceber,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtCrSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaContasReceber,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCrSol',
        valores: [2]
      }]
    },
    // Verificar Pendencias Gestao Dividas
    {
      campo: 'slcGesVer',
      label: 'Aprovação veri gestao dividas',
      atividades: atv_verificaPendenciaGestaoDividas,
      regras: ['obrigatorio']
    },
    {
      campo: 'dtGesVer',
      label: 'Previsão de regularização das pendências',
      atividades: atv_verificaPendenciaGestaoDividas,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcGesVer',
        valores: [2]
      }]
    },
    {
      campo: 'txtGesVer',
      label: 'Parecer',
      atividades: atv_verificaPendenciaGestaoDividas,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcGesVer',
        valores: [2]
      }]
    },
    // Solucionar Pendencias Gestao Dividas
    {
      campo: 'slcGesSol',
      label: 'Aprovação solu gestao dividas',
      atividades: atv_solucionaPendenciaGestaoDividas,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtGesSol',
      label: 'Parecer',
      atividades: atv_solucionaPendenciaGestaoDividas,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcGesSol',
        valores: [2]
      }]
    },
    // Encerrar Centro Custo Vinculo Contrato
    {
      campo: 'slcCcEnc',
      label: 'Aprovação cc vinc contr',
      atividades: atv_encerraCentroCusto,
      regras: ['obrigatorio']
    },
    {
      campo: 'slcObra',
      label: 'Baixa da Empresa',
      atividades: atv_encerraCentroCusto,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCcEnc',
        valores: [2]
      }]
    },
    {
      campo: 'txtCcEnc',
      label: 'Parecer',
      atividades: atv_encerraCentroCusto,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcCcEnc',
        valores: [2]
      }]
    },
    // Solicitar Banco Encerra Conta
    {
      campo: 'slcBancoEnc',
      label: 'Aprovação encerra conta',
      atividades: atv_solicitarEncerramentoConta,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtBancoEnc',
      label: 'Parecer',
      atividades: atv_solicitarEncerramentoConta,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcBancoEnc',
        valores: [2]
      }]
    },
    // Realiza Baixa Empresa
    {
      campo: 'slcBaixaEmp',
      label: 'Aprovação baixa emp',
      atividades: atv_realizaBaixaEmpresa,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtBaixaEmp',
      label: 'Parecer',
      atividades: atv_realizaBaixaEmpresa,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcBaixaEmp',
        valores: [2]
      }]
    },
    // Emite Declaracao Enceramento Empresa
    {
      campo: 'slcEncEmp',
      label: 'Aprovação decla  encerra emp',
      atividades: atv_emiteDeclaracaoEncerraDespesa,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtEncEmp',
      label: 'Parecer',
      atividades: atv_emiteDeclaracaoEncerraDespesa,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcEncEmp',
        valores: [2]
      }]
    },
    // Conferencia Processamento Solicitante
    {
      campo: 'slcConfProc',
      label: 'Aprovação conf process soli',
      atividades: atv_conferenciaProcessamento,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtConfProc',
      label: 'Parecer',
      atividades: atv_conferenciaProcessamento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcConfProc',
        valores: [2]
      }]
    },
    // Avalia Atendimento
    {
      campo: 'slcConfProcSatisf',
      label: 'Grau de Satisfação',
      atividades: atv_conferenciaProcessamento,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtConfProcSatisf',
      label: 'Parecer',
      atividades: atv_conferenciaProcessamento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcConfProcSatisf',
        valores: [3]
      }]
    },
    {
      campo: 'txtConfProcSatisf',
      label: 'Parecer',
      atividades: atv_conferenciaProcessamento,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcConfProcSatisf',
        valores: [4]
      }]
    },
    // Ajuste Solicitacao
    {
      campo: 'slcAjusteSol',
      label: 'Aprovação ajuste soli',
      atividades: atv_ajusteSolicitacao,
      regras: ['obrigatorio']
    },
    {
      campo: 'txtAjusteSol',
      label: 'Parecer',
      atividades: atv_ajusteSolicitacao,
      regras: ['obrigatorio'],
      condicoes: [{
        campo: 'slcAjusteSol',
        valores: [2]
      }]
    },
  ];
  var Validador = new ValidaFormulario(form, getValue("WKNumState"));
  if (!Validador.validar(regras_do_formulario)) {
    throw Validador.mensagem_de_erro();
  };
};