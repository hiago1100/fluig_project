/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const lotacoes = getChildren(form, 'lotacoes', ['lotacaoCodigo']);
  const usuario = fluigService.getUsuarios(value(form, 'codUsuario'), ['colleagueId', 'colleagueName', 'mail'])[0];
  
  const displaykey = 'Usuário: ' + (vm.Formulario.usuario.colleagueName);

  form.setValue('displaykey', displaykey);
  form.setValue('usuario', JSON.stringify(usuario));
  form.setValue('usuario_input', usuario.colleagueName);
  
  lotacoes.forEach((lotac, index) => {
    const lotacao = fluigService.getLotacao(lotac.lotacaoCodigo, ['codigo', 'descricao', 'displaykey'])[0];

    form.setValue('lotacaoLotacao___' + index + 1, JSON.stringify(lotacao));
    form.setValue('lotacaoLotacao_input___' + index + 1, lotacao.displaykey);
  });

}
