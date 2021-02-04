/*eslint-disable*/
/*jshint -W116 */
function inputFields(form) {

  const niveis = getChildren(form, 'niveis', ['nivel']);
  const tipoDocumento = adfService.getTipoDocumento(value(form, 'codTipoDocto'), ['codigo', 'descricao', 'displaykey'])[0];
  const estabelecimento = erpService.getEstabelecimento(value(form, 'codEstab'), ['codigo', 'descricao', 'displaykey'])[0];

  const displaykey = 'Tipo Documento: ' + (tipoDocumento.displaykey) + ' | Estab: ' + (estabelecimento.displaykey);

  form.setValue('displaykey', displaykey);
  form.setValue('tipoDocumento', JSON.stringify(tipoDocumento));
  form.setValue('tipoDocumento_input', tipoDocumento.displaykey);
  form.setValue('estabelecimento', JSON.stringify(estabelecimento));
  form.setValue('estabelecimento_input', estabelecimento.displaykey);

  niveis.forEach((childNivel, index) => {
    const nivel = erpService.getNivelEmergencial(childNivel.nivel.codigo)[0];

    form.setValue('nivel___' + index + 1, JSON.stringify(nivel));
    form.setValue('nivelInput___' + index + 1, nivel.displaykey);
  });

}
