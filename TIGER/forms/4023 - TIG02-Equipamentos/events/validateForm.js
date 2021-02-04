function validateForm(form) {
	var arq = arqMarvinLoad("v1", {
		form: "com.arquimeda.marvin.server.js.Form-v1"
	});
	arq.form.validateForm(form);
	log.info("&&& ENTROU NO VALIDATEFORM");

	var ativAtual = getValue("WKNumState");

	var REQUISICAO = "222";

	if (ativAtual == REQUISICAO) {

		var tabelaRequisicao = form.getChildrenIndexes("tabelaRequisicao");

		for (var i = 0; i < tabelaRequisicao.length; i++) {
			var situacao = form.getValue("situacao___" + tabelaRequisicao[i]);

			if (situacao == "") {
				throw "Preencha Situação ";
			}
		}
	}
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a, h) {
	var b = {};if (h == null) {
		return b;
	}var d = new javax.naming.InitialContext().lookup("java:global/arq-marvin-" + a + "/MarvinLibLoaderEJB");for (var c in h) {
		try {
			var g = new Function("lib", "return " + d.getLib(h[c]));b[c] = g(b);
		} catch (i) {
			log.error("*** Error compilando libreria " + lib + ":" + i);
		}
	}return b;
};