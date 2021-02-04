// Formata a data de 2018-12-15 para 15/12/2018
function formataData(data) {
    dt = data.split("-");
    return dt[2] + "/" + dt[1] + "/" + dt[0];
}