/*--------------------------------- TRIGGER ---------------------------------*/

function initiator(){
  var exclusao = $(".tipoCad").val();
  escondeDiv(exclusao);
}

function array_id(obj) {
  var string = obj.id;
  var array = [];
  var ini = 0, fim, index = 0;
  for (var fim = 0; fim < string.length; fim++) {
    if (string.charAt(fim) == "_") {
      array[index] = string.substring(ini, fim);
      ini = fim + 1;
      index++;
    }
  }
  array[index] = string.substring(ini, fim);
  return array;
}

function campo(obj) {
  var array = array_id(obj);
  return array[1];
}

function linha(obj) {
  var array = array_id(obj);
  return array[2];
}

function local(obj) {
  var array = array_id(obj);
  return array[3];
}

function oculta_zero(v, c, n, t) {
  if (v == 0) {
    document.getElementById("id_" + c + "_" + n + "_" + t).value = '';
  }
}

function only_0_4(event, obj) {
  if ((event.charCode < 48 || event.charCode > 52) && event.charCode != 9 && event.charCode != 13) {
    event.preventDefault();
  } else {
    //obj.value = String.fromCharCode(event.charCode);
    calc_vale(obj);
    //event.preventDefault();
  }
}

    // $(".unlock").on('change', function () {
    //   var string = $(this).attr("id");
    //   var array = [];
    //   var ini = 0, fim, index = 0;
    //   for (var fim = 0; fim < string.length; fim++) {
    //     if (string.charAt(fim) == "_") {
    //       array[index] = string.substring(ini, fim);
    //       ini = fim + 1;
    //       index++;
    //     }
    //   }
    //   array[index] = string.substring(ini, fim);
    //
    //   var line = array[2];
    //   console.log("linha: " + line);
    //   var local = array[3];
    //   console.log("local: " + local);
    //   var opera = $($("#id_oper_" + line + "_" + local)).val();
    //   console.log("operadora: " + opera);
    //   var forn = $($("#id_forn_" + line + "_" + local)).val();
    //   console.log("fornecedor: " + forn);
    //   var valor = $($("#id_valor_" + line + "_" + local)).val();
    //   console.log("valor: " + valor);
    //   var ida = $($("#id_ida_" + line + "_" + local)).val();
    //   console.log("ida: " + ida);
    //   var volta = $($("#id_volta_" + line + "_" + local)).val();
    //   console.log("volta: " + volta);
    //   var total = $($("#id_total_" + line + "_" + local)).val();
    //   console.log("total: " + total);
    //   var lock = parseInt(line) + 1;
    //
    //   if (opera == '' || forn == '' || valor == '' || ida == '' || volta == '' || total == '') {
    //     $($("#id_oper_" + lock + "_" + local)).val('');
    //     $($("#id_forn_" + lock + "_" + local)).val('');
    //     $($("#id_valor_" + lock + "_" + local)).val('');
    //     $($("#id_ida_" + lock + "_" + local)).val('');
    //     $($("#id_volta_" + lock + "_" + local)).val('');
    //     $($("#id_total_" + lock + "_" + local)).val('');
    //     $(".line_" + lock + "_" + local).css("visibility", "hidden");
    //     $(".td_" + lock + "_" + local).css("background-image", "url(_img/inativo.png)");
    //   } else {
    //     $(".line_" + lock + "_" + local).css("visibility", "visible");
    //     $(".td_" + lock + "_" + local).css("background-image", "none");
    //   }
    // });
    //
// function invalida_td() {
//   for (var i = 2; i < 5; i++) {
//     $(".line_" + i + "_tren").css("visibility", "hidden");
//     $(".td_" + i + "_tren").css("background-image", "url(_img/inativo.png)");
//     $(".line_" + i + "_trab").css("visibility", "hidden");
//     $(".td_" + i + "_trab").css("background-image", "url(_img/inativo.png)");
//   }
// }

// invalida_td();

/*------------------------- CALCULA VALE TRANSPORTE -------------------------*/
function calc_vale(obj) {
  var valor = zera_null('valor', linha(obj), local(obj));
  var ida = zera_null('ida', linha(obj), local(obj));
  var volta = zera_null('volta', linha(obj), local(obj));
  var total = (parseInt(ida) + parseInt(volta)) * parseFloat(valor);
  document.getElementById("id_total_" + linha(obj) + "_" + local(obj)).value = total.toFixed(2).replace(".",",");

  oculta_zero(zera_null(campo(obj), linha(obj), local(obj)), campo(obj), linha(obj), local(obj));
  oculta_zero(total, 'total', linha(obj), local(obj));

  calc_vale_total(obj);
}

function zera_null(c, n, t) {
  var num = document.getElementById("id_" + c + "_" + n + "_" + t).value;
  if (num == null || num == '') {
    return 0;
  } else {
    return num.replace(",", ".");
  }
}

function calc_vale_total(obj) {
  var total1 = zera_null('total', 1, local(obj));
  var total2 = zera_null('total', 2, local(obj));
  var total3 = zera_null('total', 3, local(obj));
  var total4 = zera_null('total', 4, local(obj));
  var totalDia = parseFloat(total1) + parseFloat(total2) + parseFloat(total3) + parseFloat(total4);

  document.getElementById("id_total_dia_" + local(obj)).value = totalDia.toFixed(2).replace(".", ",");
  oculta_zero(totalDia, 'total', 'dia', local(obj));
}

/*------------------------------- MÁSCARAS -------------------------------*/
function aplica_mascara(objeto, mascara) {
  obj = objeto;
  masc = mascara;
  setTimeout("aux_aplica_mascara()", 1);
}

function aux_aplica_mascara() {
  obj.value = masc(obj.value);
}

function mascara_rg(rg) {
  rg = rg.replace(/\D/g, "");
  rg = rg.replace(/(\d{2})(\d)/, "$1.$2");
  rg = rg.replace(/(\d{3})(\d)/, "$1.$2");
  rg = rg.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return rg;
}

function mascara_cpf(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

function mascara_cep(cep) {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
  return cep;
}

function mascara_tel(tel) {
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/(\d{0})(\d)/, "$1($2");
  tel = tel.replace(/(\d{2})(\d)/, "$1) $2");
  tel = tel.replace(/(\d{5})(\d)/, "$1-$2");
  return tel;
}

function mascara_valor(event) {
  if ((event.charCode < 48 || event.charCode > 57) &&
    (event.charCode < 44 || event.charCode > 44)) {
    event.preventDefault();
  }
}

function only_char(event) {
  if ((event.charCode < 32 || event.charCode > 32) &&
    (event.charCode < 65 || event.charCode > 90) &&
    (event.charCode < 97 || event.charCode > 122) &&
    (event.charCode < 192 || event.charCode > 196) &&
    (event.charCode < 199 || event.charCode > 207) &&
    (event.charCode < 209 || event.charCode > 214) &&
    (event.charCode < 217 || event.charCode > 221) &&
    (event.charCode < 224 || event.charCode > 228) &&
    (event.charCode < 231 || event.charCode > 239) &&
    (event.charCode < 241 || event.charCode > 246) &&
    (event.charCode < 249 || event.charCode > 253) &&
    (event.charCode < 255 || event.charCode > 255)) {
    event.preventDefault();
  }
}

function only_num(event) {
  if (event.charCode < 48 || event.charCode > 57) {
    event.preventDefault();
  }
}

/*------------------------------- VALIDA IMPRESSÃO DE PDF -------------------------------*/
function valida_impressao(event, obj) {
  var $form = $('form')[0];

  if ($form.checkValidity()) {

    //
    // var printContents = document.getElementById('secaoFormulario').innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;


    print();
  }
  return false;
}

/*------------------------------- VALIDA CAMPO TEXTO -------------------------------*/
$(".valida-char")
  .focusout(function () {
    var idCampo = $(this).attr("id");
    var titleCampo = $(this).attr("title").toLowerCase();
    var index = $(".tooltiptext").index($("#" + idCampo + "_erro"));
    for (var i = 0; i < $(".tooltiptext").length; i++) {
      if (i != index) {
        $(".tooltiptext:eq(" + i + ")").hide();
      }
    }
    try {
      if ($(this).val() == '') {
        throw "Este campo é obrigatório";
      }
    } catch (err) {
      $("#" + idCampo + "_erro_text").val(err + "! Informe um " + titleCampo + " válido!");
      $("#" + idCampo + "_erro").show(1, function () {
        setTimeout(() => {
          $("#" + idCampo + "_erro").hide();
        }, 3000);
      });
    }
  });

$(".valida-char")
  .focusin(function () {
    var idCampo = $(this).attr("id");
    $("#" + idCampo + "_erro").hide();
  });

/*------------------------------- VALIDA CAMPO NUMÉRICO -------------------------------*/
$(".valida-num")
  .focusout(function () {
    var idCampo = $(this).attr("id");
    var titleCampo = $(this).attr("title").toLowerCase();
    var index = $(".tooltiptext").index($("#" + idCampo + "_erro"));
    for (var i = 0; i < $(".tooltiptext").length; i++) {
      if (i != index) {
        $(".tooltiptext:eq(" + i + ")").hide();
      }
    }
    try {
      if ($(this).val() == '') {
        throw "Este campo é obrigatório";
      }
      if ($(this).val().isNaN) {
        throw "Número inválido";
      }
      if ($(this).val().length < $(this).attr("maxlength")) {
        throw "Este campo está incompleto";
      }
    } catch (err) {
      $("#" + idCampo + "_erro_text").val(err + "! Informe um " + titleCampo + " válido!");
      $("#" + idCampo + "_erro").show(1, function () {
        setTimeout(() => {
          $("#" + idCampo + "_erro").hide();
        }, 3000);
      });
    }
  });

$(".valida-num")
  .focusin(function () {
    var idCampo = $(this).attr("id");
    $("#" + idCampo + "_erro").hide();
  });

/*------------------------------- IMPRIMIR PDF -------------------------------*
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function(element, renderer) {
        return true;
    }
};

$('#id_print').click(function() {
    console.log('OK1');
    doc.fromHTML($("#id_formulario"), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    console.log('OK2');
    doc.save('exemplo.pdf');
});*/


/*---------------------------- API Correios ------------------------------------ */

function setSelectedZoomItem(selecao) {

  console.log(selecao);

  if(selecao.inputId == "funcionario") {

    console.log("esse cara >",selecao.CPF);

    getColleagueByCpf(selecao.CPF).done(function (data) {
      var dtAdmissao = new Date(data.content.values[0].DATAADMISSAO);
      var dtNascimento = new Date(data.content.values[0].DTNASCIMENTO);

      console.log(data.content.values[0]);

      var eKeydownEvent = jQuery.Event('keydown', {which: $.ui.keyCode.ENTER});

      const re = /.*?- (.*)/;
      var arrLocal = re.exec(data.content.values[0].NOMECCUSTO);

      $("#id_nome").val(data.content.values[0].NOME);
      $("#id_matricula").val(data.content.values[0].CHAPA);
      $("#id_admissao").val(dtAdmissao.toISOString().split('T')[0]);
      $("#id_rg").val(data.content.values[0].CARTIDENTIDADE);
      $("#id_cpf").val(data.content.values[0].CPF);
      $("#id_nascimento").val(dtNascimento.toISOString().split('T')[0]);
      $("#id_cep").val(data.content.values[0].CEP);
      $("#id_residencia").val(data.content.values[0].RUA);
      //$('#id_numero').val(data.content.values[0].RUA);
      $("#id_bairro").val(data.content.values[0].BAIRRO);
      $("#id_municipio").val(data.content.values[0].CIDADE);
      $("#id_estado").val(data.content.values[0].ESTADO);
      //$('#id_telefone').val(data.content.values.0.CIDADE);
      $("#id_cargo").val(selecao.CODFUNCAO);

      aplica_mascara($("#id_rg"), mascara_rg);
      aplica_mascara($("#id_cpf"), mascara_cpf);
      aplica_mascara($("#id_cep"), mascara_cep);

      $("#id_cpf").trigger(eKeydownEvent);
      $("#id_rg").trigger(eKeydownEvent);
      $("#id_cep").trigger(eKeydownEvent);


      // window["local_trabalho"].setValue(arrLocal[1]).trigger('change');
    });

  }

  if(selecao.inputId == "id_local_trabalho") {

    $("#localTrabalhoUf").val(selecao.Estado);
    $("#nomeLocalTrab").val(selecao.nmLoja);

    reloadZoomFilterValues("gruposCopia", "cod_usuario," + selectedItem["cod_usuario"]);
    // $(".coluna-operador").each(function() {
    //   var inputZoom = $(this).children('select').first();
    //   var name = $(inputZoom).attr('name');
    //   console.log(name);
    //   reloadZoomFilterValues(name, 'UF,' +selecao.Estado);
    // });


  }



}

function getColleagueByCpf(cpf) {

  var dados = {
    "name": "dsFuncionarioPorCpf", //dataset's id
    "fields": null,
    "constraints": [
      { //constraints to filter the search, all fields specified inside are required
        "_field": "CPF", //name of the field used in the constraint
        "_initialValue": cpf, //value to be filtered
        "_finalValue": cpf, //final value to be filtered
        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
        "_likeSearch": false
      }]
  }

  return $.ajax({

    method: "POST",
    url: location.protocol + "//" + location.host + "/api/public/ecm/dataset/datasets",
    data: JSON.stringify(dados),
    contentType: "application/json",
    async: true,
    error: function (x, e) {

      console.log("Erro Ajax Monta select", x, e);
    }
  });

}

$(document).ready(function () {
  $("#id_cep").on("blur", function () {
    $.getJSON('//viacep.com.br/ws/' + $(this).val() + '/json/', function (dados) {
      $('#id_municipio').val(dados.localidade);
      $('#id_estado').val(dados.uf);
      $('#id_bairro').val(dados.bairro);
      $('#id_residencia').val(dados.logradouro);
    });
  });

  $("[name='acao']").on('change', function () {
    var acao = $(this).val();

    switch (acao) {
      case "cadastro":
        //window["funcionario"].disable(true);

        $('#funcionario1').prop('disabled', 'disabled');
        break;
      case "renovacao":
      case "exclusao":
        //window["funcionario"].disable(false);

        $('#funcionario1').prop('disabled', null);
        break;
    }
  });

  $("input[name='acao']:checked").trigger('change');

  $("#regiao").on('change', function() {
    buscarOperadoresRegiao($(this).val())
      .success(function(dados) {
        console.log(dados);

        popularOperadoresRegiao(dados);
      }
    );
  });


});


function initDisplayFields(atividade) {

  $('#secaoFormulario').hide();
  $('#secaoAprovacao').hide();

  switch (atividade) {

    case 0:
    case 4:
    case 5:
      $('#secaoFormulario').show();
      break;
    // Aprovação
    case 10:
      $('#secaoAprovacao').show();
      break;
  }

}

function criarLinhaTabelaOperadores(tipoTabela) {

  var html = '<tr>' +
    '<td><input type="text" id="" class="unlock treinamento-operador" name="name_oper_1_tren" onkeypress="only_char(event)" />  </td>' +
    '<td><input type="text" id="" class="unlock treinamento-codigo" name="name_forn_1_tren" maxlength="11" onkeypress="only_num(event)" />  </td>' +
    '<td><input type="number" id="" class="unlock treinamento-valor" name="name_valor_1_tren" min="0" step="0.05" onchange="calc_vale(this)" onkeypress="only_num(event)" />  </td>' +
    '<td><input type="number" id="" class="unlock treinamento-ida" name="name_ida_1_tren" min="0" max="4" onchange="calc_vale(this)" onkeypress="only_0_4(event, this)" />  </td>' +
    '<td><input type="number" id="" class="unlock treinamento-volta" name="name_volta_1_tren" min="0" max="4" onchange="calc_vale(this)" onkeypress="only_0_4(event, this)" />  </td>' +
    '<td><input type="text" id="" class="unlock treinamento-total" name="name_total_1_tren" readonly />  </td>' +
    '</tr>';


}

function buscarOperadoresRegiao(idRegiao) {
  var dados = {
    "name": "dsRegioesTransportadora", //dataset's id
    "fields": null,
    "constraints": [{ //constraints to filter the search, all fields specified inside are required
      "_field": "tablename", //name of the field used in the constraint
      "_initialValue": 'dsOperadoresTransporteRegiao', //value to be filtered
      "_finalValue": 'dsOperadoresTransporteRegiao', //final value to be filtered
      "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
      "_likeSearch": false
    },
      { //constraints to filter the search, all fields specified inside are required
        "_field": "masterid", //name of the field used in the constraint
        "_initialValue": idRegiao, //value to be filtered
        "_finalValue": idRegiao, //final value to be filtered
        "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
        "_likeSearch": false
      }]
  }

  return $.ajax({

    method: "POST",
    url: location.protocol + "//" + location.host + "/api/public/ecm/dataset/datasets",
    data: JSON.stringify(dados),
    contentType: "application/json",
    async: true,
    error: function (x, e) {

      console.log("Erro Ajax Monta select", x, e);
    }
  });
}

function popularOperadoresRegiao(dados) {

  console.log(dados);

  $('.operadores-regiao').each(function(index) {

    $(this).html("");
    $(this).append("<option value=''></option>");

    var operadores = dados.content.values;

    if(operadores != null) {

      for(var y=0; y < operadores.length; y++) {
        $(this).append("<option value='" + operadores[y].id + "'>" + operadores[y].operador + "</option>");
      }
    }

  });

}



$(document).ready(function() {


  $(".operador-transporte").select2({
    language: "pt-BR",
    ajax: {

      transport: function (params, success, failure) {

        var $request = $.ajax({

          method: "POST",
          url: location.protocol + "//" + location.host + "/api/public/ecm/dataset/datasets",
          data: params.data,
          contentType: "application/json",
          async: true,
          error: function (x, e) {

            console.log("Erro Ajax Monta select", x, e);
          }
        });

        $request.then(success);
        $request.fail(failure);

        return $request;
      },

      url: location.protocol + "//" + location.host + "/api/public/ecm/dataset/datasets",
      delay: 250,
      data: function (params) {

        if($("#localTrabalhoUf").val() === "") {
          alert("Necessário informar o local de trabalho");
        }


        var dadosOperadores = {
          "name": "dsOperadoresPorUf", //dataset's id
          "fields": null,
          "constraints": [{ //constraints to filter the search, all fields specified inside are required
            "_field": "UF", //name of the field used in the constraint
            "_initialValue": $("#localTrabalhoUf").val(), //value to be filtered
            "_finalValue": $("#localTrabalhoUf").val(), //final value to be filtered
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
            "_likeSearch": false
          },
          {
            "_field": "DESCRICAO",
            "_initialValue": "%" + params.term + "%",
            "_finalValue":  "%" + params.term + "%",
            "_type": 1, //type of the constraint (1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
            "_likeSearch": true
          }
          ]
        }

        return JSON.stringify(dadosOperadores);
      },

      processResults: function (data, params) {
        params.page = params.page || 1;

        console.log(data);

        itemsPage = [];

        for(var x=(params.page -1) * 30; x < params.page * 30; x++) {
          if(data.content.values[x] !== undefined) {
            itemsPage.push({
              "id": data.content.values[x].OPERADOR,
              "text": data.content.values[x].OPERADOR,
              "codigo": data.content.values[x].CODIGO,
              "valor-unitario": data.content.values[x].UNITARIO,
            });
          }
        }

        return {
          results: itemsPage,
          pagination: {
            more: (params.page * 30) < data.content.values.length
          }
        };
      },
      cache: true
    },
    placeholder: 'Procure por um operador de transporte',
    minimumInputLength: 1,
  });

  $('.operador-transporte').on('select2:select', function (e) {
    var data = e.params.data;

    var elementTd = $(e.currentTarget).parent();
    var elementRow = $(e.currentTarget).parent().parent();

    $(elementTd).children('span.operador-transporte-caption').first().html(data.text);

    $(elementRow).children(".coluna-codigo").first().children("input").first().val(data.codigo);
    $(elementRow).children(".coluna-valor-unitario").first().children("input").first().val(data['valor-unitario']).trigger('change');
  });


  $('input[name=acao]').on('change', function() {

    var acao = $('input[name=acao]:checked').val();

    switch(acao) {
      case 'cadastro':
        $('#id_matricula').removeAttr('required');
        $('#id_admissao').removeAttr('required');

        $('#secaoOperadoresTransporte').find('select').removeAttr('readonly');
        $('#secaoOperadoresTransporte').find('input').removeAttr('readonly');
        break;
      case 'renovacao':
        $('#id_matricula').prop('required', true);
        $('#id_admissao').prop('required', true);

        $('#secaoOperadoresTransporte').find('input').removeAttr('readonly');
        $('#secaoOperadoresTransporte').find('select').removeAttr('readonly');
        break;
      case 'exclusao':
        $('#id_matricula').prop('required', true);
        $('#id_admissao').prop('required', true);

        $('#secaoOperadoresTransporte').find('input').val('').prop('readonly', true);
        $('#secaoOperadoresTransporte').find('select').each(function() {
          this.setAttribute('readonly', 'readonly');
        });
        break;

    }


  })

});

function escondeDiv(){
  var name = $('#exclusao').attr('name');
  var exclusao = getRadioValor(name);    

  console.log("NAME E VALOR "+ name + "valor" + exclusao);

  if (exclusao == "exclusao") {
  $('.hideDelete').hide();
  }else{
  $('.hideDelete').show();  
  }
}

 function getRadioValor(name){
  var rads = document.getElementsByName(name);
   
  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
    return rads[i].value;
   }
  }
  return null;
 }