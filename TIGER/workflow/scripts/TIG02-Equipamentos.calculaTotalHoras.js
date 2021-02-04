function calculaTotalHoras(inicio, termino) {

  log.info('***** calculaTotalHoras');
  log.info('***** calculaTotalHoras. inicio: ' + inicio);
  log.info('***** calculaTotalHoras. termino: ' + termino);

  var dia = 1000 * 60 * 60;
  var diferenca = Math.abs(termino - inicio);
  var total = diferenca / dia;

  return total;
}
