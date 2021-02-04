function integraDocumento(ParamGeral, docto) {
  const ttParam = {};

  ttParam['nr-trans'] = docto.nrTrans;
  ttParam.tipo = docto.status;
  ttParam.usuario = ParamGeral.usuarioErp;
  ttParam.senha = ParamGeral.senhaErp;

  const params = {
    ttParam: [ttParam]
  };

  const result = {
    integrado: 'false',
    statusIntegracao: '',
    error: false
  };

  try {

    log.info('>> ParamGeral.usuarioErp : ' + ParamGeral.usuarioErp);
    
    const json = callDatasul('adf/adfapi001.p', 'pi-aprova-reprova', params, docto.codEmpresa, ParamGeral.usuarioErp);

    if (json && json.ttIntegracao) {

      result.integrado = 'true';

    } else {
      let error = '';

      if (json && json.ttErro && json.ttErro.length > 0) {
        json.ttErro.forEach(erro => {
          error += `${erro.mensagem}\n\n`;
        });

        throw error;
      } else {
        throw 'Não foi possível identificar o erro. Consulte os logs do ERP e do Fluig para mais detalhes.';
      }
    }

  } catch (error) {
    log.info(error);
    result.integrado = 'false';
    result.statusIntegracao = error.message || error;
    result.error = true;
  }

  return result;
}
