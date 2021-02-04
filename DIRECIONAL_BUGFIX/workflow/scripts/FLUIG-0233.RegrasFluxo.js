function verificarPedidoMenorQueAlcada(cpAlcada) {
	var vlrPedido = hAPI.getCardValue('cpTotalPedido')
	var vlrAlcada = hAPI.getCardValue(cpAlcada)

	vlrAlcada = parseFloat(vlrAlcada)
	vlrPedido =  new java.lang.String(vlrPedido).replace('.', '').replace(',','.');
	vlrPedido = parseFloat(vlrPedido)
	return vlrPedido < vlrAlcada
}

function isHierarquiaPapel(papeis, matriculaUsuario) {
	var isHierarquia = 'SEM_PAPEL';	
	var Usuarios = [];
	
	papeis.forEach(function (papel) {
		
		Usuarios = getUsuariosPorPapel(papel)
		
		Usuarios.forEach(function (matricula) {
			
			if (matriculaUsuario == matricula) {				
				if (papel == papeis[3]) isHierarquia = 'PAPELN4'
				else if (papel == papeis[2]) isHierarquia = 'PAPELN3'
				else if (papel == papeis[1]) isHierarquia = 'PAPELN2'
				else if (papel == papeis[0]) isHierarquia = 'PAPELN1'				
			}
		})
	})
	
	return isHierarquia
}

function hasN1() {
	return hAPI.getCardValue("cpPapelN1") != 'Pool:Role:';
}

function hasN2() {
	return hAPI.getCardValue("cpPapelN2") != 'Pool:Role:';
}

function hasN3() {
	return hAPI.getCardValue("cpPapelN3") != 'Pool:Role:';
}

function hasN4() {
	return hAPI.getCardValue("cpPapelN4") != 'Pool:Role:';
}

function aprovadorN2(papel) {
	return papel == 'SEM_PAPEL' || papel == 'PAPELN1'
}

function aprovadorN3(papel) {
	return papel == 'SEM_PAPEL' || papel == 'PAPELN1' || papel == 'PAPELN2'
}

function aprovadorN4(papel) {
	return papel == 'SEM_PAPEL' || papel == 'PAPELN1' || papel == 'PAPELN2' || papel == 'PAPELN3'
}

function getUsuariosPorPapel(papelObra) {
	var Usuarios = [];
	var Datasets = DatasetFactory.getDataset("workflowColleagueRole", null, null, null).values;

	Datasets.forEach(function (papel) {
		var MatriculaUsuario = papel[1];
		var CodPapel = papel[2];

		if ('Pool:Role:' + CodPapel == papelObra) {
			Usuarios.push(MatriculaUsuario)
		}
	})

	return Usuarios
}