var ANALISE_QUALIDADE = "Em análise com a qualidade";
var CRITICA = "Devolvida com crítica";
var AGUARDANDO_RESPOSTA = "Aguardando resposta";
var AGUARDANDO_IMPLEMENTACAO = "Baixar Ação";
var AGUARDANDO_VERIFICACAO_IMPL = "Aguardando verificação da implementação";
var AGUARDANDO_VERIFICACAO_EFICACIA = "Aguardando verificação da eficácia";
var FINALIZADO = "Finalizado";
var NAO_PROCEDE = "Não procede";

var tools = {
		buscaDataAtual : function(formato){
			importPackage(java.util)
			importPackage(java.text)
			var data = new java.util.Date();
		    var formatter = new SimpleDateFormat(formato);
		    
		    return formatter.format(data).toString();
		}
}