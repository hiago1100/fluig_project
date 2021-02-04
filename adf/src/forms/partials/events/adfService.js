const adfService = {
  /**
   * Retorna os níveis emergenciais cadastrados no ADF
   *
   * @param {any} codTipoDocto
   * @param {any} codEstab
   * @param {any} fields
   * @returns
   */
  getNivelEmergencial: function getNivelEmergencial(codTipoDocto, codEstab, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_nivel_emergencial', {
      codTipoDocto,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os terceiros notificados nas aprovações
   *
   * @param {any} codTipoDocto
   * @param {any} fields
   * @returns
   */
  getNotificaTerceiros: function getNotificaTerceiros(codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_notifica_terceiros', {
      codTipoDocto
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os parâmetros gerais do ADF
   *
   * @param {any} fields
   * @returns
   */
  getParamGeral: function getParamGeral(fields, children, keepMetadata) {
    return fluigService.getDataset('adf_param_geral', null, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de documento do ADF
   *
   * @param {any} fields
   * @returns
   */
  getTipoDocumento: function getTipoDocumento(codigo, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_documento', {
      codigo
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna as lotações cadastradas no ADF
   *
   * @param {any} codigo
   * @param {any} fields
   * @returns
   */
  getLotacao: function getLotacao(codigo, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lotacao', {
      codigo
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna as faixas de aprovação cadastradas no ADF
   *
   * @param {any} codEstab
   * @param {any} codLotacao
   * @param {any} codTipoDocto
   * @param {any} fields
   * @param {any} children
   * @returns
   */
  getFaixasAprovacao: function getFaixasAprovacao(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_faixas_aprovacao', {
      codEstab,
      codLotacao,
      codTipoDocto
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por faixa cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codLotacao
   * @param {any} codTipoDocto
   * @param {any} codFaixa
   * @param {any} limiteInicial
   * @param {any} limiteFinal
   * @param {any} fields
   *
   * @returns
   */
  getAprovadoresFaixa: function getAprovadoresFaixa(codEstab, codLotacao, codTipoDocto, codFaixa, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_aprovadores_faixa', {
      codEstab,
      codLotacao,
      codTipoDocto,
      codFaixa
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores padrão cadastrados no ADF
   *
   * @param {any} codTipoAprovacao
   * @param {any} codEstab
   * @param {any} fields
   *
   * @returns
   */
  getAprovadorPadrao: function getAprovadorPadrao(codTipoAprovacao, codEstab, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_aprovador_padrao', {
      codTipoAprovacao,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por hierarquia cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codLotacao
   * @param {any} codTipoDocto
   * @param {any} fields
   *
   * @returns
   */
  getHierarquiaAprovadores: function getHierarquiaAprovadores(codEstab, codLotacao, codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_hierarquia_aprovadores', {
      codTipoDocto,
      codEstab,
      codLotacao
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os limites de aprovação por família cadastrados no ADF
   *
   * @param {any} codFamilia
   * @param {any} codTipoDocto
   * @param {any} fields
   *
   * @returns
   */
  getLimiteAprovacaoFamilia: function getLimiteAprovacaoFamilia(codFamilia, codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_limite_aprovacao_familia', {
      codFamilia,
      codTipoDocto
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por documento cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codTipoDocto
   * @param {any} fields
   *
   * @returns
   */
  getAprovadoresDocumento: function getAprovadoresDocumento(codEstab, codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lista_aprovadores_documento', {
      codTipoDocto,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por família cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codFamilia
   * @param {any} fields
   *
   * @returns
   */
  getAprovadoresFamilia: function getAprovadoresFamilia(codEstab, codFamilia, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lista_aprovadores_familia', {
      codFamilia,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por item cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codItem
   * @param {any} fields
   *
   * @returns
   */
  getAprovadoresItem: function getAprovadoresItem(codEstab, codItem, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lista_aprovadores_item', {
      codItem,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os aprovadores por referência cadastrados no ADF
   *
   * @param {any} codEstab
   * @param {any} codTipoDocto
   * @param {any} codReferencia
   * @param {any} fields
   *
   * @returns
   */
  getAprovadoresReferencia: function getAprovadoresReferencia(codEstab, codTipoDocto, codReferencia, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lista_aprovadores_referencia', {
      codTipoDocto,
      codReferencia,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna as lotações do usuário cadastradas no ADF
   *
   * @param {any} codUsuario
   * @param {any} fields
   *
   * @returns
   */
  getLotacoesUsuario: function getLotacoesUsuario(codUsuario, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_lotacoes_usuario', {
      codUsuario
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os campos do gerencial (Formato Lista) do tipo de documento cadastrados no ADF
   *
   * @param {any} codUsuario
   * @param {any} fields
   *
   * @returns
   */
  getCamposLista: function getCamposLista(codigo, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_documento', {
      codigo
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna as permissões do usuário cadastradas no ADF
   *
   * @param {any} codUsuario
   * @param {any} codEstab
   * @param {any} fields
   *
   * @returns
   */
  getPermissoesUsuario: function getPermissoesUsuario(codUsuario, codEstab, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_permissoes_usuario', {
      codUsuario,
      codEstab
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna as referências cadastradas no ADF
   *
   * @param {any} codTipoDocto
   * @param {any} fields
   *
   * @returns
   */
  getReferencias: function getReferencias(codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_referencias', {
      codTipoDocto
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de aprovação cadastradas no ADF
   *
   * @param {any} codigo
   * @param {any} fields
   *
   * @returns
   */
  getTipoAprovacao: function getTipoAprovacao(codigo, fields, children, keepMetadata) {
    log.info('getTipoAprovacao');
    log.info(codigo);
    return fluigService.getDataset('adf_tipo_aprovacao', {
      codigo
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de aprovação por família cadastrados no ADF
   *
   * @param {any} codFamilia
   * @param {any} fields
   *
   * @returns
   */
  getTipoAprovacaoFamilia: function getTipoAprovacaoFamilia(codFamilia, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_aprovacao_familia', {
      codFamilia
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de aprovação por referência cadastrados no ADF
   *
   * @param {any} codTipoDocto
   * @param {any} codReferencia
   * @param {any} fields
   *
   * @returns
   */
  getTipoAprovacaoReferencia: function getTipoAprovacaoReferencia(codTipoDocto, codReferencia, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_aprovacao_referencia', {
      codTipoDocto,
      codReferencia
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de aprovação por referência cadastrados no ADF
   *
   * @param {any} codTipoDocto
   * @param {any} fields
   *
   * @returns
   */
  getTipoAprovacaoDocumento: function getTipoAprovacaoDocumento(codTipoDocto, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_aprovacao_documento', {
      codTipoDocto
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os tipos de aprovação por item cadastrados no ADF
   *
   * @param {any} codItem
   * @param {any} fields
   *
   * @returns
   */
  getTipoAprovacaoItem: function getTipoAprovacaoItem(codItem, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_tipo_aprovacao_item', {
      codItem
    }, fields, children, keepMetadata);
  },

  /**
   * Retorna os usuários cadastrados no ADF
   *
   * @param {any} codUsuario
   * @param {any} fields
   *
   * @returns
   */
  getUsuario: function getUsuario(codUsuario, fields, children, keepMetadata) {
    return fluigService.getDataset('adf_usuario', {
      codUsuario
    }, fields, children, keepMetadata);
  },
}
