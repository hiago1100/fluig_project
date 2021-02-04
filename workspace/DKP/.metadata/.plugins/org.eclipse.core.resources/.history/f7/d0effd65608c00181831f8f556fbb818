var BLL = (function () {

    var instance;

    function init() {
        /**
		 * Retorna os detalhes do periodo aquisitivo de um determinado colaborador
		 * @param {string}   chapa
		 * @param {string}   coligada
		 * @param {string}   funcao 
		 * 
		 * @return {object} objeto com periodo ativo, detalhes das ferias marcadas, e detalhes do periodo ativo.
		 */
        var getPeriodoAquisitivo = function (chapa, coligada, funcao) {

            try{
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada) || Compartilhados.isEmpty(funcao)) {
                    throw Mensagens.M0019;
                }

                var periodoAtivo = BLL.getInstance().getPeriodoAtivo(chapa, coligada);

                if (periodoAtivo == undefined) {
                    throw Mensagens.M0020;
                }

                var detalhesPeriodoAtivo = BLL.getInstance().getDetalhesPeriodoAtivo(periodoAtivo);

                if (detalhesPeriodoAtivo == undefined) {
                    throw Mensagens.M0021;
                }

                var feriasMarcadas = getFeriasMarcadas(chapa, coligada, periodoAtivo);

                // para estagiarios para cada periodo sempre mostra 30 dias de ferias
                if (isEstagiario(funcao) && isPrimeiroAnoEstagiario(detalhesPeriodoAtivo)) {
                    detalhesPeriodoAtivo.DIASAMARCAR = 30;
                    detalhesPeriodoAtivo.FALTAS = 0;
                }

                //mostra somente 30 dias de direito caso o colaborador já tenha mais que isso.
                if (detalhesPeriodoAtivo.DIASAMARCAR > 30)
                {
                    detalhesPeriodoAtivo.DIASAMARCAR = 30;
                }
                //caso ele tenha menos de 30 dias, verificar se tem dias tirados naquele periodo, 
                //caso não tenha, o periodo ainda nao foi completo e seta 30 dias de direito TODO
                else if (detalhesPeriodoAtivo.DIASAMARCAR < 30)
                {
                    if (detalhesPeriodoAtivo.FALTAS == 0) {
                        detalhesPeriodoAtivo.DIASAMARCAR = 30;
                    }
                }

                return {
                    periodoAtivo: periodoAtivo,
                    feriasMarcadas: feriasMarcadas,
                    detalhesPeriodoAtivo: detalhesPeriodoAtivo
                };

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getPeriodoAquisitivo').replace('{1}', erro))
            }

        };

        /**
		 * Retorna se e primeiro ano de de trabalho do estagiario
		 * @param {date}   dataBase
		 * @param {object} periodo
		 * 
		 * @return {bool} 
		 */
        var isPrimeiroAnoEstagiario = function (detalhesPeriodoAtivo) {
            try {
                if (detalhesPeriodoAtivo == undefined) {
                    throw Mensagens.M0019;
                }
                var dataAtual = new Date();
                var inicioPeriodo = new Date(detalhesPeriodoAtivo.INICIOPERAQUIS.replace('T0', 'T1')).setHours(0);
                var fimPeriodo = new Date(detalhesPeriodoAtivo.FIMPERAQUIS.replace('T0', 'T1')).setHours(0);

                return dataAtual >= inicioPeriodo && dataAtual < fimPeriodo;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'isPrimeiroAnoEstagiario').replace('{1}', erro))
            }
        }

         /**
		 * Retorna as informações de ferias marcadas no RM
		 * @param {string}   chapa
		 * @param {string}   coligada
		 * @param {object}   periodoAtivo
		 * 
		 * @return {object} obejto com as ferias do usuario marcadas
		 */
        var getFeriasMarcadas = function (chapa, coligada, periodoAtivo) {
            try {
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada) || periodoAtivo == undefined) {
                    throw Mensagens.M0019;
                }

                return DAL.getInstance().getFeriasMarcadas(chapa, coligada, periodoAtivo.FIMPERAQUIS.slice(0, 10));
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getFeriasMarcadas').replace('{1}', erro))
            }
        }

        /**
		 * Retorna as informações de periodo ativo de ferias do colaborador no RM
		 * @param {string}   chapa  
		 * @param {string}   coligada  
		 * 
		 * @return {object} obejto com o periodo ativo do colaborador
		 */
        var getPeriodoAtivo = function (chapa, coligada) {
            try {
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada)) {
                    throw Mensagens.M0019;
                }

                return DAL.getInstance().getPeriodoAtivo(chapa, coligada);

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getPeriodoAtivo').replace('{1}', erro))
            }

        }

        /**
		 * Retorna as informações detalhadas de periodo ativo de ferias do colaborador no RM
		 * @param {object}   periodoAtivo  
		 * 
		 * @return {object} objeto com o periodo ativo do colaborador
		 */
        var getDetalhesPeriodoAtivo = function (periodoAtivo) {
            try {
                if (periodoAtivo == undefined) {
                    throw Mensagens.M0019;
                }

                return DAL.getInstance().getDetalhesPeriodoAtivo(periodoAtivo.CHAPA, periodoAtivo.CODCOLIGADA, periodoAtivo.FIMPERAQUIS.slice(0, 10));

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getDetalhesPeriodoAtivo').replace('{1}', erro))
            }
        }

        /**
		 * Verifica se a funcao do colaborador e estagiario
		 * @param {string}   funcao  
		 * 
		 * @return {bool}
		 */
        var isEstagiario = function (funcao) {
            try {
                if (Compartilhados.isEmpty(funcao)) {
                    throw Mensagens.M0019;
                }

                return funcao.search('ESTAGIARIO') > -1;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'isEstagiario').replace('{1}', erro))
            }
        };

        /**
		 * Verifica se o dia e valido para iniciar as ferias
		 * @param {string}   colaboradorSituacao  
		 * @param {date}   data  
		 * 
		 * @return {bool}
		 */
        var validaDiasFerias = function (colaboradorSituacao, data) {
            try {
                if (Compartilhados.isEmpty(colaboradorSituacao) || Compartilhados.isEmpty(data)) {
                    throw Mensagens.M0019;
                }

                var extractDadosFeriado = function (f) {
                    return {
                        dia: f.holidayDay,
                        mes: f.holidayMonth,
                        ano: f.holidayYear
                    };
                };

                var feriados = Model.get_Holiday().values.map(extractDadosFeriado);

                var validWeekDay = data.getDay() != 0 && data.getDay() != 6;

                if (colaboradorSituacao != "Licença Mater.") {
                    validWeekDay = data.getDay() == 1 || data.getDay() == 2;
                }

                return [isFeriado(feriados, validWeekDay), ''];
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'validaDiasFerias').replace('{1}', erro))
            }
        }

        /**
		 * Verifica se o dia e feriado
		 * @param {object}   feriados  
		 * @param {bool}   validWeekDay  
		 * 
		 * @return {bool}
		 */
        var isFeriado = function (feriados, validWeekDay) 
        {
        	var data = new Date();
            var retorno = feriados.some(function (feriado) 
            {
                var isDia = feriado.dia == data.getDate(),
					isMes = feriado.mes == data.getMonth() + 1,
					isAno = (feriado.ano == 0 || feriado.ano == data.getFullYear());
                
                return isDia && isMes && isAno;
            });

            return validWeekDay && !retorno;
        }

        /**
		 * Compara as datas do periodo aquisitivo + 11 meses e a data do inicio das ferias
		 * para verificar se antingiu o limite que o proximo periodo aquisitivo
		 * @param {object}   feriados  
		 * @param {bool}   validWeekDay  
		 * 
		 * @return {bool}
		 */
        function limiteFeriasExcedido(dataFimPeriodoAquisitivo, dataInicioFerias) {
            try 
            {
                if (Compartilhados.isEmpty(dataFimPeriodoAquisitivo) || Compartilhados.isEmpty(dataInicioFerias)) {
                    throw Mensagens.M0019;
                }

                //fim periodo aquisitivo adicionado de 11 meses, para verificar limite de ferias
                dataFimPeriodoAquisitivo = new Date(Compartilhados.ConvertDatePTtoUS(dataFimPeriodoAquisitivo));
                dataFimPeriodoAquisitivo.setMonth(dataFimPeriodoAquisitivo.getMonth() + 11);

                dataInicioFerias = new Date(Compartilhados.ConvertDatePTtoUS(dataInicioFerias));

                return dataFimPeriodoAquisitivo <= dataInicioFerias;

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'limiteFeriasExcedido').replace('{1}', erro))
            }
        }

        /**
		 * Verifica se utrapassou os dias de direito 
		 * @param {string}   diasDireito  
		 * @param {string}   diasFerias  
		 * 
		 * @return {bool}
		 */
        function limiteDiasFeriasExcedido(diasDireito, diasFerias) {
            try {
                if (Compartilhados.isEmpty(diasDireito) || Compartilhados.isEmpty(diasFerias)) {
                    throw Mensagens.M0019;
                }

                return diasDireito < diasFerias;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'limiteDiasFeriasExcedido').replace('{1}', erro))
            }
        }

        /**
		 * Verifica se utrapassou os dias de direito 
		 * @param {string}   dataInicioFerias  
		 * @param {string}   dataFimFerias  
		 * 
		 * @return {bool}
		 */
        var getDiasFerias = function (dataInicioFerias, dataFimFerias) {
            try {
                if (Compartilhados.isEmpty(dataInicioFerias) || Compartilhados.isEmpty(dataFimFerias)) {
                    throw Mensagens.M0019;
                }

                var diaMilessimos = 1000 * 60 * 60 * 24

                var dateInicio = dataInicioFerias.getTime();
                var dataFim = dataFimFerias.getTime();

                var difference_ms = dateInicio < dataFim ? Math.abs((dataFim - dateInicio) + diaMilessimos) : 0;

                return difference_ms != 0 ? Math.round(difference_ms / diaMilessimos) : 0;

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getDiasFerias').replace('{1}', erro))
            }

        }

        /**
		 * Verifica se o colaborador pode antencipar o 13 salario
		 * @param {string}   DataInicioConvertida
		 * 
		 * @return {bool}
		 */
        var podeAntecipacao13Salario = function (DataInicioConvertida) {
            try {
                if (Compartilhados.isEmpty(DataInicioConvertida)) {
                    throw Mensagens.M0019;
                }

                var IsMesesBloqeados = DataInicioConvertida.getMonth() == 10 || DataInicioConvertida.getMonth() == 11;
                var DiasTotalFeriasMenor15 = parseFloat($('#cpDiasFerias').val()) < 15;
                return !IsMesesBloqeados && !DiasTotalFeriasMenor15;

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'podeAntecipacao13Salario').replace('{1}', erro))
            }
        }

        /**
		 * Retorna a menos data de ferias que pode o colaborador pode selecionar
		 * @param {string}   funcao
		 * @param {string}   fimPeriodoAquisitivo
		 * @param {string}   chapa
		 * @param {string}   coligada
		 * 
		 * @return {date}
		 */
        var getDataMinimaFerias = function (funcao, fimPeriodoAquisitivo, chapa, coligada) {
            try
            {
                if (Compartilhados.isEmpty(funcao) || Compartilhados.isEmpty(fimPeriodoAquisitivo) ||
					Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada)) {
                    throw Mensagens.M0019;
                }

                var prazoMinimo = 45;

                //if (isColaboradorGravida(chapa, coligada)) {
                 //   prazoMinimo = dataRetornoColaboradaGravidez(chapa, coligada);
                //}

                if (isEstagiario(funcao)) {
                    prazoMinimo = 20;
                }

                var minDate = new Date();
                minDate.setDate(minDate.getDate() + prazoMinimo);

                if (!isEstagiario(funcao)) {
                    if (new Date(Compartilhados.ConvertDatePTtoUS(fimPeriodoAquisitivo)) > minDate) {
                        return fimPeriodoAquisitivo;
                    }
                }

                return minDate;

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'getDataMinimaFerias').replace('{1}', erro))
            }
        }

        /**
		 * Retorna se a colaboradora esta gravida
		 * @param {string}   chapa
		 * @param {string}   coligada
		 * 
		 * @return {bool}
		 */
        var isColaboradorGravida = function (chapa, coligada) {
            try {
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada)) {
                    throw Mensagens.M0019;
                }

                var resultado = Model.get_DS0152(chapa, coligada);

                if (resultado == undefined) {
                    throw Mensagens.M0022;
                }

                return resultado.values.length > 0;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'isColaboradorGravida').replace('{1}', erro))
            }
        }

        /**
		 * Retorna a data de retorno da colaboradora gravida
		 * @param {string}   chapa
		 * @param {string}   coligada
		 * 
		 * @return {date}
		 */
        var dataRetornoColaboradaGravidez = function (chapa, coligada) {
            try
            {
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(coligada))
                {
                    throw Mensagens.M0019;
                }

                var resultado = Model.get_DS0152(chapa, coligada);

                if (resultado == undefined)
                {
                    throw Mensagens.M0022;
                }

                return resultado.values[0].DATA_PRAZO_GESTANTE;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'dataRetornoColaboradaGravidez').replace('{1}', erro))
            }
        }

        /**
		 * Retorna se o colaborador tem ferias marcadas
		 * @param {object}   periodoAquisitivo
		 * 
		 * @return {bool}
		 */
        var isFeriasMarcadas = function (periodoAquisitivo) {
            try {
                if (periodoAquisitivo == undefined) {
                    throw Mensagens.M0019;
                }

                return periodoAquisitivo.feriasMarcadas.length != 0;
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'isFeriasMarcadas').replace('{1}', erro))
            }
        }

        /**
		 * Retorna se o colaborador tem ferias em dobro
		 * @param {string}   fimPeriodoAquitivo
		 * @param {string}   dataFimFerias
		 * 
		 * @return {bool}
		 */
        var isFeriasEmDobro = function (fimPeriodoAquitivo, dataFimFerias) {
            try {
                if (Compartilhados.isEmpty(fimPeriodoAquitivo) || Compartilhados.isEmpty(dataFimFerias)) {
                    throw Mensagens.M0019;
                }

                //proximo periodo aquisitivo
                fimPeriodoAquitivo.setFullYear(fimPeriodoAquitivo.getFullYear() + 1);

                return new Date(dataFimFerias) > new Date(fimPeriodoAquitivo);
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'isFeriasEmDobro').replace('{1}', erro))
            }

        }

        /**
		 * verifica se existe chamado de ferias aberto para o colaborador
		 * @param {string}   fimPeriodoAquitivo
		 * @param {string}   dataFimFerias
		 * 
		 * @return {bool}
		 */
        var verificaChamadosFeriasAberto = function (chapa, nome, chamado) {
            try
            {
                if (Compartilhados.isEmpty(chapa) || Compartilhados.isEmpty(nome)) {
                    throw Mensagens.M0019;
                }

                chamados = DAL.getInstance().getChamadosFeriasAbertos(chapa, nome, chamado);

                if (chamados != undefined && chamados.length > 0) {
                    chamados = filtraChamadosFeriasAbertos(chamados);
                    return chamados.length > 0;
                }

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'verificaChamadosFeriasAberto').replace('{1}', erro))
            }
        };

        /**
		 * Filtra os chamados de ferias, trazendo somente os abertos
		 * @param {object}   chamados
		 * 
		 * @return {object}
		 */
        var filtraChamadosFeriasAbertos = function (chamados) {

            try
            {
                if (chamados == undefined)
                {
                    throw Mensagens.M0019;
                }

                var filtros = chamados.map(function (chamado) {
                    return DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", chamado + '', chamado + '', ConstraintType.SHOULD);
                });

                var datasetResult = DatasetFactory.getDataset('workflowProcess', null, filtros, null);
                if (datasetResult == undefined || datasetResult == null || datasetResult.values == 0)
                {
                    return 0;
                }
                else
                {
                    chamados = datasetResult.values.filter(function (chamado) {
                        return chamado.active;
                    }).map(function (chamado) {
                        return chamado['workflowProcessPK.processInstanceId'];
                    });

                    return chamados;
                }
            }
            catch (erro)
            {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'filtraChamadosFeriasAbertos').replace('{1}', erro))
            }
        };

        /**
		 * Retorna se a quantidade de dias escolhidos para a ferias está dentro da regra
		 * @param {string}   dias
		 * 
		 * @return {bool}
		 */
        var isPeriodosDisponiveisMarcacaoFerias = function (dias) {
            try {
                if (Compartilhados.isEmpty(dias)) {
                    throw Mensagens.M0019;
                }

                var diasDisponiveis = [5, 7, 8, 10, 15, 20, 30];

                return diasDisponiveis.filter(x => x === dias).length == 1;

            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'filtraChamadosFeriasAbertos').replace('{1}', erro))
            }
        }

        /**
		 * Retorna se o primeiro periodo selecionado esta dentro da regra
		 * @param {string}   quantidadePeriodoFerias
		 * @param {string}   diasferias
		 * 
		 * @return {bool}
		 */
        var isPrimeiroPeriodoValido = function (quantidadePeriodoFerias, diasferias, index) {
            try {
                if (Compartilhados.isEmpty(quantidadePeriodoFerias) || Compartilhados.isEmpty(diasferias) || Compartilhados.isEmpty(index)) {
                    throw Mensagens.M0019;
                }

                var isPrimeiro = index == 1;
                var isDiaValido = (diasferias == 15 || diasferias == 20 || diasferias == 30);
                if (isPrimeiro)
                {
                    return isDiaValido;
                }
                else
                {
                    return true;
                }
                
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'filtraChamadosFeriasAbertos').replace('{1}', erro))
            }
        }

        /**
		 * Retorna o responsavel para a aprovação do chamado de ferias na parte da aprovação do gestor
		 * @param {object}   dadosColaborador
		 * 
		 * @return {string}
		 */
        var retornaChapaGestorImediato = function (dadosColaborador) {
            try {
                if (dadosColaborador == undefined) 
                {
                    throw Mensagens.M0019;
                }

                isGestor = dadosColaborador.CHAPA_GESTOR == dadosColaborador.CHAPA;
                isGG = dadosColaborador.CHAPA_GG == dadosColaborador.CHAPA;
                isSuperintendente = dadosColaborador.CHAPA_SUP == dadosColaborador.CHAPA;
                isDiretor = dadosColaborador.CHAPA_DIRETOR == dadosColaborador.CHAPA;

                if (isGestor) 
                {
                    if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_GG)  || dadosColaborador.CHAPA_GG != 'null') 
                    {
                        return dadosColaborador.CHAPA_GG;
                    }
                    else if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_SUP)  || dadosColaborador.CHAPA_SUP != 'null') 
                    {
                        return dadosColaborador.CHAPA_SUP;
                    }
                    else if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_DIRETOR) || dadosColaborador.CHAPA_DIRETOR != 'null') 
                    {
                        return dadosColaborador.CHAPA_DIRETOR;
                    }
                    else 
                    {
                        return '';
                    }
                }
                else if (isGG) 
                {
                    if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_SUP) || dadosColaborador.CHAPA_SUP != 'null') 
                    {
                        return dadosColaborador.CHAPA_SUP;
                    }
                    else if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_DIRETOR) || dadosColaborador.CHAPA_DIRETOR != 'null') 
                    {
                        return dadosColaborador.CHAPA_DIRETOR;
                    }
                    else 
                    {
                        return '';
                    }
                }
                else if (isSuperintendente) {
                    if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_DIRETOR) || dadosColaborador.CHAPA_DIRETOR != 'null') 
                    {
                        return dadosColaborador.CHAPA_DIRETOR;
                    }
                    else 
                    {
                        return '';
                    }
                }
                else 
                {
                    if (!Compartilhados.isEmpty(dadosColaborador.CHAPA_GESTOR) || dadosColaborador.CHAPA_GESTOR != 'null') 
                    {
                        return dadosColaborador.CHAPA_GESTOR;
                    }
                    else 
                    {
                    	throw Mensagens.M0009;
                    }
                }
            }
            catch (erro) {
                Compartilhados.WarningToast(Mensagens.M0017, '', 'danger');
                console.log(Mensagens.M0018.replace('{0}', 'filtraChamadosFeriasAbertos').replace('{1}', erro))
            }
        }

        /**
        * Retorna 
        * @param {date}   dataInicioFerias
        * @param {date}   dataFimFerias
        * 
        * @return {bool}
        */
        var isMarcacaoDataValida = function (dataInicioFerias, dataFimFerias)
        {
            return dataInicioFerias < dataFimFerias;
        }

        /**
        * verifica se os dias de ferias condizem com a regra de 20 dias obrigatorios
        * @param {bool}   isHaveraAbono
        * @param {int}   diasferias
        * 
        * @return {bool}
        */
        var isDiasFeriasComAbonoValido = function (isHaveraAbono, diasferias)
        {
            return isHaveraAbono && diasferias == 20;    
        }

        return {
            getPeriodoAquisitivo: getPeriodoAquisitivo,
            isEstagiario: isEstagiario,
            validaDiasFerias: validaDiasFerias,
            getDiasFerias: getDiasFerias,
            getDataMinimaFerias: getDataMinimaFerias,
            podeAntecipacao13Salario: podeAntecipacao13Salario,
            limiteFeriasExcedido: limiteFeriasExcedido,
            limiteDiasFeriasExcedido: limiteDiasFeriasExcedido,
            isColaboradorGravida: isColaboradorGravida,
            dataRetornoColaboradaGravidez: dataRetornoColaboradaGravidez,
            isFeriasMarcadas: isFeriasMarcadas,
            getFeriasMarcadas: getFeriasMarcadas,
            getPeriodoAtivo: getPeriodoAtivo,
            isPrimeiroAnoEstagiario: isPrimeiroAnoEstagiario,
            isFeriasEmDobro: isFeriasEmDobro,
            verificaChamadosFeriasAberto: verificaChamadosFeriasAberto,
            isPeriodosDisponiveisMarcacaoFerias: isPeriodosDisponiveisMarcacaoFerias,
            isPrimeiroPeriodoValido: isPrimeiroPeriodoValido,
            retornaChapaGestorImediato: retornaChapaGestorImediato,
            getDetalhesPeriodoAtivo: getDetalhesPeriodoAtivo,
            isMarcacaoDataValida: isMarcacaoDataValida,
            isDiasFeriasComAbonoValido: isDiasFeriasComAbonoValido
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();