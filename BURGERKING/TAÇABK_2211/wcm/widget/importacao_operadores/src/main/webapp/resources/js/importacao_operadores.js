$(document).ready(function() {
	
  alert("Hello");
	
  $('#arquivoOperadoresImportar').on('click', function() {

    selectedFile = document.getElementById('arquivoOperadores').files[0];
    // selectedFile = evt.target.files[0];

    if(selectedFile == undefined) {
      alert("Arquivo não selecionado");
      return;
    }

    buscarOperadores().success(function(data) {

      operadores = data.content.values;

      importarPlanilhaOperadores(selectedFile, operadores);
    })

  })

});

function importarPlanilhaOperadores(arquivo, operadores_cadastrados) {

  var reader = new FileReader();
  reader.onload = function(event) {

    var data = event.target.result;
    var operadores = XLSX.read(data, {
      type: 'binary'
    })
    operadores.SheetNames.forEach(function(sheetName) {

      delete_row(operadores.Sheets[sheetName], 0)
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(operadores.Sheets[sheetName]);
      var json_object = JSON.stringify(XL_row_object);

      var operadores_importacao = JSON.parse(json_object);

      salvarOperadores(operadores_importacao, operadores_cadastrados);
    });


  }

  reader.onerror = function(event) {
    console.error("File could not be read! Code: " + event.target.error.code);
  }

  reader.readAsBinaryString(arquivo);


}

function buscarOperadores() {
  var dados = {
    "name": "dsOperadoresTransporte", //dataset's id
    "fields" : null
  }

  return $.ajax({

    method: "POST",
    url: location.protocol + "//"+ location.host +"/api/public/ecm/dataset/datasets",
    data: JSON.stringify(dados),
    contentType: "application/json",
    async: true,
    error: function(x, e) {

      console.log("Erro Ajax Monta select", x, e);
    }
  });
}


function salvarOperadores(operadores, operadores_cadastrados) {

  //Convertendo para XML, para facilitar a manipulação
  var parser=new DOMParser();

  xmlGroupRequestsCreate = [];
  xmlGroupRequestsUpdate = [];

  var contCreate = 0;
  xmlGroupRequestsCreate[contCreate] = [];

  for(x=0; x < operadores.length; x++) {

    var operador = operadores_cadastrados.find(function(element) {
      return element.codigo === operadores[x]['CÓD.'].toString();
    });


    if(operador === undefined) {

      if(xmlGroupRequestsCreate[contCreate].length === 50) {
        contCreate++;
        xmlGroupRequestsCreate[contCreate] = [];
      }

      var registroSubgrupo = htmlToElementCreate( criarRegistroOperadorXmlCreate(operadores[x]) );
      xmlGroupRequestsCreate[contCreate].push( registroSubgrupo );
    } else {

      var registroSubgrupoUpdate = htmlToElementUpdate( criarRegistroOperadorXmlUpdate(operadores[x]) );
      xmlGroupRequestsUpdate.push( {id: operador['documentid'], xml: registroSubgrupoUpdate } );
    }
  }

  if(xmlGroupRequestsCreate[0].length === 0) {
    xmlGroupRequestsCreate.pop();
  }

  if($('#atualizarOperadores').prop('checked')) {
    if (xmlGroupRequestsCreate.length == 0 && xmlGroupRequestsUpdate.length == 0 ) {
      alert("Não há novos registros para serem inseridos ou atualizados");
      return;
    }
  } else {
    if (xmlGroupRequestsCreate.length == 0 ) {
      alert("Não há novos registros para serem inseridos");
      return;
    }
  }


  var xmlRequests = [];



  for(var x=0; x < xmlGroupRequestsCreate.length; x++) {

    var xmlRequestCreate = parser.parseFromString(gerarXmlBaseCreate(),"text/xml");
    //Código da empresa
    xmlRequestCreate.getElementsByTagName("companyId")[0].innerHTML = window.parent.WCMAPI.organizationId;


    for(var y=0; y < xmlGroupRequestsCreate[x].length; y++) {
      xmlRequestCreate.getElementsByTagName("card")[0].append( xmlGroupRequestsCreate[x][y] );
    }

    xmlRequests.push(xmlRequestCreate);
  }

  if($('#atualizarOperadores').prop('checked')) {

    for(var x=0; x < xmlGroupRequestsUpdate.length; x++) {

      var xmlRequestUpdate = parser.parseFromString(gerarXmlBaseUpdate(),"text/xml");
      //Código da empresa
      xmlRequestUpdate.getElementsByTagName("companyId")[0].innerHTML = window.parent.WCMAPI.organizationId;
      xmlRequestUpdate.getElementsByTagName("cardId")[0].innerHTML = xmlGroupRequestsUpdate[x].id;

      $(xmlGroupRequestsUpdate[x].xml).children("item").each(function(index,element) {
        xmlRequestUpdate.getElementsByTagName("cardData")[0].append(element);
      });

      xmlRequests.push(xmlRequestUpdate);
    }
  }

  enviarOperadoresRecursivo(xmlRequests);

  alert("Iniciado Importação de Operadores");

}

function enviarOperadoresRecursivo(xmlRequests, x) {

  var parser=new DOMParser();

  if(xmlRequests[x] == undefined) {
    return;
  }

  $("#barraOperadores").show();

  window.parent.WCMAPI.Create({
    url: window.parent.WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl",
    contentType: 'text/xml;charset=UTF-8',
    dataType: "xml",
    data: xmlRequests[x],
    success: function(data){

      var percentage = ((x + 1) * 100) / xmlRequests.length;
      $("#barraOperadores > .progress-bar").first().prop('aria-valuenow', percentage);
      $("#barraOperadores > .progress-bar").first().css('width', percentage + '%');
      $("#barraOperadores").find(".sr-only").first().innerHTML = percentage + '% Completo';

      if(percentage == 100) {
        alert("Importação de Operadores Finalizada!");
        $("#barraOperadores").hide();
      }

      var xmlResp=parser.parseFromString(data.firstChild.innerHTML,"text/xml");
      x++;

      return enviarOperadoresRecursivo(xmlRequests, x);

    }
  });

}


function gerarXmlBaseCreate() {

  var soapRequest =  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
    '<soapenv:Header/>' +
    ' <soapenv:Body>' +
    '   <ws:create>' +
    '     <companyId></companyId>' +
    '     <username></username>' +
    '     <password></password>' +
    '     <card></card>' +
    '   </ws:create>' +
    ' </soapenv:Body>' +
    '</soapenv:Envelope>';

  return soapRequest;


}

function gerarXmlBaseUpdate() {

  var soapRequest =  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
    '<soapenv:Header/>' +
    ' <soapenv:Body>' +
    '   <ws:updateCardData>' +
    '     <companyId></companyId>' +
    '     <username></username>' +
    '     <password></password>' +
    '     <cardId></cardId>' +
    '     <cardData></cardData>' +
    '   </ws:updateCardData>' +
    ' </soapenv:Body>' +
    '</soapenv:Envelope>';

  return soapRequest;


}

function criarRegistroOperadorXmlCreate(operador) {

  var cardXml = '<item>' + montarRegistroOperadorXmlCampos(operador) +
    '         <parentDocumentId>3916684</parentDocumentId>' +
    '       </item>';

  return cardXml;

}

function criarRegistroOperadorXmlUpdate(operador) {

  var cardXml = "<container>" + montarRegistroOperadorXmlCampos(operador).replace(/cardData/g, "item") + "</container>";

  return cardXml;

}

function montarRegistroOperadorXmlCampos(operador) {
    var xml = '<cardData>' +
    '           <field>codigo</field>' +
    '           <value name="codigo">' + operador['CÓD.'] + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>codigo_fornecedor</field>' +
    '           <value name="codigo_fornecedor">' + operador['CÓD. FORNEC.'] + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>descricao</field>' +
    '           <value name="descricao">' + escapeXml(operador['DESCRIÇÃO DO BENEFÍCIO']) + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>grupo</field>' +
    '           <value name="grupo">' + escapeXml(operador['GRUPO']) + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>subgrupo</field>' +
    '           <value name="subgrupo">' + escapeXml(operador['SUB-GRUPO']) + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>unitario</field>' +
    '           <value name="unitario">' + operador['UNIT.'] + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>facial</field>' +
    '           <value name="facial">' + (operador['FACIAL'] == "X" ? 1 : "") + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>multiplo</field>' +
    '           <value name="multiplo">' + (operador['MÚLTIPLO'] == "X" ? 1 : "") + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>blocado</field>' +
    '           <value name="blocado">' + (operador['BLOCADO'] == "X" ? 1 : "") + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>cartao</field>' +
    '           <value name="cartao">' + (operador['CARTÃO'] == "X" ? 1 : "") + '</value>' +
    '         </cardData>';

    return xml;

}

function htmlToElementCreate(html) {

  //Convertendo para XML, para facilitar a manipulação
  var parser=new DOMParser();
  var xmlRequest=parser.parseFromString(html,"text/xml");

  return xmlRequest.getElementsByTagName('item')[0];
}

function htmlToElementUpdate(html) {

  //Convertendo para XML, para facilitar a manipulação
  var parser=new DOMParser();

  var xmlRequest=parser.parseFromString(html,"text/xml");
  return xmlRequest.getElementsByTagName('container')[0];
}

function ec(r, c){
  return XLSX.utils.encode_cell({r:r,c:c});
}
function delete_row(ws, row_index){
  var variable = XLSX.utils.decode_range(ws["!ref"])
  for(var R = row_index; R < variable.e.r; ++R){
    for(var C = variable.s.c; C <= variable.e.c; ++C){
      ws[ec(R,C)] = ws[ec(R+1,C)];
    }
  }
  variable.e.r--
  ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
}

function htmlToElement(html) {

  //Convertendo para XML, para facilitar a manipulação
  var parser=new DOMParser();
  var xmlRequest=parser.parseFromString(html,"text/xml");

  return xmlRequest.getElementsByTagName('item')[0];
}


function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}