$(document).ready(function() {

  $('#arquivoOperadoresSubgruposImportar').on('click', function() {

    selectedFile = document.getElementById('arquivoOperadoresSubgrupos').files[0];

    if(selectedFile === undefined) {
      alert('Arquivo não selecionado');
      return;
    }

    buscarSubgrupos().success(function(data) {

      subgrupos = data.content.values.map(function (subgrupo) {
        return subgrupo.subgrupo;
      });

      importarPlanilhaOperadoresSubgrupos(selectedFile, subgrupos);
    });

  });

});

function importarPlanilhaOperadoresSubgrupos(arquivo, subgrupos_cadastrados) {

  var reader = new FileReader();
  reader.onload = function(event) {

    var data = event.target.result;
    var operadores = XLSX.read(data, {
      type: 'binary'
    })
    operadores.SheetNames.forEach(function(sheetName) {

      var XL_row_object = XLSX.utils.sheet_to_row_object_array(operadores.Sheets[sheetName]);
      var json_object = JSON.stringify(XL_row_object);
      console.log(json_object);

      subgruposImportacao = JSON.parse(json_object);

      salvarSubgrupos(subgruposImportacao, subgrupos_cadastrados);
    })


  }

  reader.onerror = function(event) {
    console.error("File could not be read! Code: " + event.target.error.code);
  }

  reader.readAsBinaryString(arquivo);


}

function buscarSubgrupos() {
  var dados = {
    "name": "dsOperadoresSubGrupos", //dataset's id
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


function salvarSubgrupos(subgrupos, subgrupos_cadastrados) {

  //URL do Serviço
  var wsUrl = window.parent.WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl";

//Modelo da Requisição
  var soapRequest =  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/"><soapenv:Header/><soapenv:Body><ws:create><companyId></companyId><username></username><password></password><card><item><cardData><field>campo_nome</field><value name="campo_nome"></value></cardData><cardData><field>campo_ramal</field><value name="campo_ramal"></value></cardData><parentDocumentId></parentDocumentId></item></card></ws:create></soapenv:Body></soapenv:Envelope>';


//Convertendo para XML, para facilitar a manipulação
  var parser=new DOMParser();
  var xmlRequest=parser.parseFromString(gerarXmlBaseOperadoresSubgrupo(),"text/xml");

//Código da empresa
  xmlRequest.getElementsByTagName("companyId")[0].innerHTML = window.parent.WCMAPI.organizationId;

  for(var x=0; x < subgrupos.length; x++) {
    if ($.inArray(subgrupos[x]['SUB-GRUPO'], subgrupos_cadastrados) < 0) {
      var registroSubgrupo = htmlToElement(criarRegistroOperadorSubgrupoXml(subgrupos[x]['SUB-GRUPO'], subgrupos[x]['UF']));
      xmlRequest.getElementsByTagName("card")[0].append( registroSubgrupo );
    }
  }

  if( xmlRequest.getElementsByTagName('item').length === 0) {
    alert('Não há novos subgrupos para adicionar');
    return;
  }

  // Enviando a requisição
    window.parent.WCMAPI.Create({
      url: wsUrl,
      contentType: 'text/xml;charset=UTF-8',
      dataType: "xml",
      data: xmlRequest,
      success: function(data){

        var xmlResp=parser.parseFromString(data.firstChild.innerHTML,"text/xml");
        console.log("Documento Publicado: " + xmlResp.getElementsByTagName("documentId")[0].innerHTML);

        alert("Importação de Subgrupos de Operadores Finalizada!");
        $("#barraOperadoresSubgrupos").hide();
        
      }
    });

    $("#barraOperadoresSubgrupos").show();
    



}


function gerarXmlBaseOperadoresSubgrupo() {

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

function criarRegistroOperadorSubgrupoXml(subgrupo, uf) {

    var cardXml = '<item>' +
    '         <cardData>' +
    '           <field>subgrupo</field>' +
    '           <value name="subgrupo">' + escapeXml(subgrupo) + '</value>' +
    '         </cardData>' +
    '         <cardData>' +
    '           <field>uf</field>' +
    '           <value name="uf">' + uf + '</value>' +
    '         </cardData>' +
    '         <parentDocumentId>4845693</parentDocumentId>' +
    '       </item>';

  return cardXml;

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