function beforeStateEntry(sequenceId) {
  
   var idPastaDestino = hAPI.getCardValue("idPasta");
   var pastaCriada = hAPI.getCardValue("pastaCriada");
   var pastaSeguraExistente = hAPI.getCardValue("pastaSeguraExistente");
   if (sequenceId == 7) {      
       validaAnexo();  
      if (pastaCriada == 'sim') {
         enviaDoc(pastaSeguraExistente);  
      }else if (pastaCriada == 'nao') {  
         var novaPasta = createFoldersChildren(parseInt(idPastaDestino));
         enviaDoc(novaPasta);

    }
  }
}



function createFoldersChildren(idPastaPai){

try{
// Cria pasta dentro da pasta pai
var dto = docAPI.newDocumentDto();
  dto.setDocumentDescription("Seguro de Vida"); // nome da pasta criada, obrigatoriedades
  dto.setDocumentType("1");               // tipo de documento 
  dto.setParentDocumentId(parseInt(idPastaPai));  // Número da pasta principal que vai receber os arquivos
  dto.setAdditionalComments("(Processo seguro de vida) Número: "+getValue("WKNumProces"))
  dto.setDocumentTypeId("");
  dto.setInheritSecurity(true);
  dto.setUpdateIsoProperties(true);
      
  var approvesArray = new java.util.ArrayList();
  var folder = docAPI.createFolder(dto, null, null);
  var gedNewParentId = folder.getDocumentId();  

  log.info("ID DA PASTA CRIADA "+ gedNewParentId); 

  return gedNewParentId
  }catch(error){
    throw "Erro ao criar a pasta: "+error;
  }
  
}

function enviaDoc(idPastaDoc){

        var attachments = hAPI.listAttachments();
        for ( var i = 0; i < attachments.size(); i++) {
            var docDto = attachments.get(i);
  
            if (docDto.getDocumentType() == "7") {
                // var idPastaDoc = createFoldersChildren(idPastaDestino);                               
                docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());          
                docDto.setDocumentId(0);
                // Criar uma pasta para armazenar os anexos como documentos, concedendo à mesma as permissões de segurança e aprovação necessárias
                docDto.setParentDocumentId(parseInt(idPastaDoc));
                var attachArray = new java.util.ArrayList();
                var mainAttach = docAPI.newAttachment();
                mainAttach.setFileName(docDto.getPhisicalFile());
                mainAttach.setPrincipal(true);
                mainAttach.setAttach(false);
                attachArray.add(mainAttach);
                        // Adicionando aprovadores
               docDto.setActiveVersion(true);
               docDto.setColleagueId(getValue("WKUser")); // Informar o usuário logado.
               docDto.setPublisherId(getValue("WKUser")); // Informar o publicador.
  
              var aprovador = docAPI.newApproverDto();
              aprovador.setCompanyId(getValue("WKCompany"));
              aprovador.setColleagueId(getValue("WKUser")); // Informar o aprovador
              aprovador.setDocumentId(3939579);
              aprovador.setVersion(1); // Versão do documento
              aprovador.setLevelId(1); // Nível de aprovação
              aprovador.setApproverType(0); //Tipo de aprovadores (0 = Colaboradores, 1 = Grupo)
              var aprovadoresArray = new java.util.ArrayList();
              aprovadoresArray.add(aprovador);
 
 
                try {
                    var doc = docAPI.createDocument(docDto, attachArray, null, null,null);
                    log.info("DOCUMENTO CRIADO COM O ID: " + doc.getDocumentId());
                } catch (e) {
                    log.error("Problemas na criação do documento:\n" + e);
                }
            }
        }

}

function validaAnexo(){

    var atv      = getValue("WKNumState");
    var nextAtv  = getValue("WKNextState");

        var anexos   = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "É preciso anexar o formulário para continuar o processo !";
        }
}