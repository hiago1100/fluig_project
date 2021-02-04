function gerarAvaliacoes(){
   
    log.warn('[DEBUGANDO] FLUIG-0187 - GERADOR DE AVALIAÇÃO DE PERIODO DE EXPERIENCIA');
    
    try {
      
      var listaColaboradores = getColaboradores();
    
       listaColaboradores.forEach(function(colaborador){
         logAvaliacaoCriada(colaborador, criaAvaliacao(colaborador));
       });
    } 
    catch(err){
        return "ERRO AO CRIAR A SOLICITAÇÃO NO PROCESSO FLUIG-0187 - ERRO: " + err.message;
    } 
}

function logAvaliacaoCriada(colaborador, numeroProcesso){
   
   var childData = new java.util.HashMap();
    
    if(numeroProcesso == 'undefined' || numeroProcesso == '' || numeroProcesso == '0' ){
      numeroProcesso = 'NÃO GERADA - COLABORADOR FORA DOS PARAMETROS'
   }
    
    childData.put("cpMatricula", colaborador.chapa);
    childData.put("cpNome", colaborador.nome);
    childData.put("cpAdmissao", numeroProcesso);
    hAPI.addCardChild("solGeradas", childData);
}

function criaAvaliacao(colaborador) {
   
   log.warn('[DEBUGANDO] FLUIG-0187 - CRIANDO A SOLICITAÇÃO PARA A CHAPA: ' + colaborador.chapa + ', COLIGADA: ' + colaborador.coligada);
     
   var parametros = new java.util.HashMap();       
   var colaboradorInfo = getInfoColaborador(colaborador.chapa, colaborador.coligada);
   
   if(colaboradorInfo != ''){
      
      log.warn('[DEBUGANDO] FLUIG-0187 - DADOS DO COLABORADOR' + colaboradorInfo);
   
       parametros.put("cpColaboradorInfo", colaboradorInfo.nome); 
       parametros.put("cpMatriculaInfo", colaboradorInfo.chapa.toString()); 
       parametros.put("cpFuncaoInfo", colaboradorInfo.funcao);
       parametros.put("cpDataAdmissaoInfo", colaboradorInfo.dataAdmissao);
       parametros.put("cpObraDepartamentoInfo", colaboradorInfo.secao);
       parametros.put("cpEmpresaInfo", colaboradorInfo.empresa);
       parametros.put("cpGestorInfo", colaboradorInfo.nomeGestor);
       parametros.put("cpChapaConsultor", colaboradorInfo.chapaCons);
       
       if(colaboradorInfo.chapa == colaboradorInfo.chapaGestor){
          parametros.put("cpChapaGestor", colaboradorInfo.chapaDiretor);
       }else{
          parametros.put("cpChapaGestor", colaboradorInfo.chapaGestor);
       }
       
       var maoObra = getMaoObra(colaboradorInfo.coligada, colaboradorInfo.codFuncao);
      
       log.warn('[DEBUGANDO] FLUIG-0187 - CODIGO DA FUNÇÃO: ' + colaboradorInfo.codFuncao)
       log.warn('[DEBUGANDO] FLUIG-0187 - TIPO MAO DE OBRA: ' + maoObra.tipo)
            
       var tipoMaoObra = maoObra.tipo;
       var nomeFuncao = maoObra.nome;
       var blFuncaoEstrategicaOuAdministrativa = tipoMaoObra.startsWith('Estrat') || tipoMaoObra.startsWith('Adminis');
       var blFuncaoAutonomo = nomeFuncao.startsWith('AUTONOMO');
       var blFuncaoEstagiario = nomeFuncao.startsWith('ESTAGIARIO');
       var blFuncaoAprendiz = nomeFuncao.startsWith('APRENDIZ');
       
       log.warn('[DEBUGANDO] FLUIG-0187 - É MÃO DE OBRA ESTRATEGICA OU ADMINISTRATIVA? - ' + blFuncaoEstrategicaOuAdministrativa)
       log.warn('[DEBUGANDO] FLUIG-0187 - AUTONOMO? - ' + blFuncaoAutonomo)
       
       parametros.put("cpMaoObraInfo", maoObra.tipo);
       
       if(blFuncaoEstrategicaOuAdministrativa && !blFuncaoAutonomo && !blFuncaoEstagiario && !blFuncaoAprendiz){
         log.warn('[DEBUGANDO] FLUIG-0187 -  INFORMAÇÕES DO GESTOR - CHAPA: ' + colaboradorInfo.chapaGestor)
         log.warn('[DEBUGANDO] FLUIG-0187 -  INFORMAÇÕES DA CONSULTORA - CHAPA: ' + colaboradorInfo.chapaCons + ',COLIGADA: ' + colaboradorInfo.coligadaConsultora)
         
         var consultorInfo = getInfoColaborador(colaboradorInfo.chapaCons, colaboradorInfo.coligadaConsultora);
         
         log.warn('[DEBUGANDO] FLUIG-0187 - DADOS DA CONSULTORA: ' + consultorInfo);
         
         parametros.put("cpNomeSolicitante", consultorInfo.nome);
          parametros.put("cpFuncaoSolicitante", consultorInfo.funcao);
          parametros.put("cpEmpresaSolicitante", consultorInfo.empresa);
          parametros.put("cpDepartamentoObraSolicitante", consultorInfo.secao);
          parametros.put("cpEmailSolicitante", consultorInfo.email);
          parametros.put("cpEstadoSolicitante", consultorInfo.estado);
   
         log.warn('[DEBUGANDO] FLUIG-0187 - CAMPOS DO FORMULARIO FLUIG-0185' + parametros);
         
           
           try {
            var avaliacaoGerada = hAPI.startProcess("FLUIG-0185", '3', [colaboradorInfo.chapaGestor], "", true, parametros, true);
           } 
           catch(err) {
            return '0';
           } 
            
           log.warn('[DEBUGANDO] FLUIG-0187 -  NUMERO DO PROCESSO GERADO FLUIG-0185 - ' + avaliacaoGerada.get("iProcess"))
           
           return avaliacaoGerada.get("iProcess");
      
       }
       else{
         return '0';
       }
   }else{
      return '0';
   }
}

function getInfoColaborador(chapa, coligada){

   
   log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR');
   
   var dsReturn = DatasetFactory.getDataset('DS_FLUIG_0003', [chapa, coligada], null, null);
   
   if (dsReturn.values.length != 0){
      var colaborador = dsReturn.values[0];
      
      
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR coligada - ' + colaborador[0]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR chapa - ' + colaborador[1]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR funcao - ' + colaborador[2]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR dataAdmissao - ' + colaborador[9]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR secao - ' + colaborador[4]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR empresa - ' + colaborador[6]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR nomeGestor - ' + colaborador[17]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR chapaCons - ' + colaborador[24]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR chapaGestor - ' + colaborador[16]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR chapaDiretor - ' + colaborador[14]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR codFuncao - ' + colaborador[3]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR email - ' + colaborador[8]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR nome - ' + colaborador[27]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR estado - ' + colaborador[5]);
      log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS DADOS DO COLABORADOR coligadaConsultora - ' + colaborador[69]);
      
      
      return {
         coligada: colaborador[0],
         chapa: colaborador[1],
         funcao: colaborador[2],
         dataAdmissao: colaborador[9],
         secao: colaborador[4],
         empresa: colaborador[6],
         nomeGestor: colaborador[17],
         chapaCons: colaborador[24],
         chapaGestor: colaborador[16],
         chapaDiretor: colaborador[14],
         codFuncao: colaborador[3],
         email: colaborador[8],
         nome: colaborador[27],
         estado: colaborador[5],
         coligadaConsultora: colaborador[69]
      }
   }else{
      log.warn( "ERRO AO BUSCAR AS INFORMAÇÕES NO DATASET DS_FLUIG_0003 - NENHUM DADO RETORNADO - CHAPA: " + chapa + ", COLIGADA:" + coligada);
      return '';
   }
}

function getMaoObra(coligada, funcao) {
   
   log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO MÃO DE OBRA COLABORADOR');
   
   var dsReturn = DatasetFactory.getDataset('DS_FLUIG_0022', [coligada, funcao], null, null);
   
   if (dsReturn.values.length != 0){
      var retorno = dsReturn.values[0];
      return {tipo: retorno[2], nome: retorno[1]}
   }else{
      throw "ERRO AO BUSCAR AS INFORMAÇÕES NO DATASET DS_FLUIG_0022 - NENHUM DADO RETORNADO - FUNÇÃO: " + funcao + ", COLIGADA:" + coligada;
   }
}

function getColaboradores() {
   
   log.warn('[DEBUGANDO] FLUIG-0187 - BUSCANDO OS COLABORADORES QUE PODEM SER GERADAS AS AVALIAÇÕES');
   
   var dsReturn = DatasetFactory.getDataset('DS_FLUIG_0110', null, null, null);
    
    if (dsReturn.values.length != 0){
      
      log.warn('[DEBUGANDO] FLUIG-0187 - QUANTIDADE DE COLABORADORES: ' + dsReturn.values.length);
      
       return dsReturn.values.map(function(colaborador){
           return {
               chapa: colaborador[0],
               nome: colaborador[1],
               coligada: colaborador[2],
           };
       });
   }else{
      throw "ERRO AO BUSCAR AS INFORMAÇÕES NO DATASET DS_FLUIG_0110 - NENHUM DADO RETORNADO"
   }
}
