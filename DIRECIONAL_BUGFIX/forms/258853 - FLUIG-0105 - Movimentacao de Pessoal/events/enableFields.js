function enableFields(form)
{
	var atividade;
	
	if (getValue("WKNumState") === null) {
		atividade = 1;
	} else {
		atividade = parseInt(getValue("WKNumState"));
	}
	
	if ((atividade != 0) && (atividade != 1) && (atividade != 141) && (atividade != 374)) {

		// Dados da Transfer?ncia
		form.setEnabled("cpTransferencia", false);
		
		// Observa??o
		form.setEnabled("cpObs", false);
		
		// Dados da Movimenta??o
		if ((atividade != 313) && (atividade != 45)) {
			form.setEnabled("cpTipoMovimentacao", false);
			form.setEnabled("cpSemAdicionalTransferencia", false);
			form.setEnabled("cpTransferenciaKm", false);
			form.setEnabled("cpMudanca", false);
			form.setEnabled("cpMembrosFamilia", false);
			form.setEnabled("cpQuantidadeMembros", false);
			form.setEnabled("cpTipoMoradia", false);
			form.setEnabled("cpAuxilioInstalacao", false);
			form.setEnabled("cpValorAuxilio", false);
			form.setEnabled("cpDataAuxilio", false);
			form.setEnabled("cpTransporteMobiliario", false);
			form.setEnabled("cpDataTransporte", false);
			form.setEnabled("cpPassagemRetorno", false);
			form.setEnabled("cpPeridiocidade", false);
			form.setEnabled("cpQtViajantes", false);
			form.setEnabled("cpTransVeiculo", false);
			form.setEnabled("cpDataTransporteVeic", false);
		}
	}

	if (atividade != 437) {
		form.setEnabled("aprovarRelaTrab", false);
		form.setEnabled("parecerRelaTrab", false);
	}
	
	if (atividade != 7) {
		form.setEnabled("aprovarConsultoria", false);
		form.setEnabled("parecerConsultoria", false);
	}
	
	if (atividade != 38) {
		form.setEnabled("aprovarRemuneracao", false);
		form.setEnabled("parecerRemuneracao", false);
	}

	if (atividade != 18) {
		form.setEnabled("aprovarGestor", false);
		form.setEnabled("parecerGestor", false);
	}

	if (atividade != 20) {
		form.setEnabled("aprovarGerenteGeral", false);
		form.setEnabled("parecerGerenteGeral", false);
	}
	
	if (atividade != 21) {
		form.setEnabled("aprovarSuperintendente", false);
		form.setEnabled("parecerSuperintendente", false);
	}
	
	if (atividade != 22) {
		form.setEnabled("aprovarDiretor", false);
		form.setEnabled("parecerDiretor", false);
	}
	
	
	if (atividade != 45) {
		form.setEnabled("aprovarGestorDestino", false);
		form.setEnabled("parecerGestorDestino", false);
	}
	
	if (atividade != 47) {
		form.setEnabled("aprovarConsultoriaDestino", false);
		form.setEnabled("parecerConsultoriaDestino", false);
	}
	
	if (atividade != 49) {
		form.setEnabled("aprovarRemuneracaoDestino", false);
		form.setEnabled("parecerRemuneracaoDestino", false);
	}
	
	if (atividade != 51) {
		form.setEnabled("aprovarGerenteGeralDestino", false);
		form.setEnabled("parecerGerenteGeralDestino", false);
	}
	
	
	if (atividade != 55) {
		form.setEnabled("aprovarSuperintendenteDestino", false);
		form.setEnabled("parecerSuperintendenteDestino", false);
	}
	
	if (atividade != 102) {
		form.setEnabled("aprovarDiretorDestino", false);
		form.setEnabled("parecerDiretorDestino", false);
	}
	
	if (atividade != 118) {
		form.setEnabled("aprovarDiretoria", false);
		form.setEnabled("parecerDiretoria", false);
	}
	
	if (atividade != 80) {
		form.setEnabled("aprovarPMP", false);
		form.setEnabled("parecerPMP", false);
		form.setEnabled("cpConfMatriculaAtual", false);
		
		form.setEnabled("cpHouveCCT", false);
		form.setEnabled("cpSalarioCCT", false);
	}
	
	if (atividade != 85) {
		form.setEnabled("aprovarCMP", false);
		form.setEnabled("parecerCMP", false);
		
		form.setEnabled("cpAvaliacao", false);
		form.setEnabled("cpParecerAvaliacao", false);
	}
	
	if (atividade != 84) {
		form.setEnabled("aprovarAMP", false);
		form.setEnabled("parecerAMP", false);
	}
	
	if (atividade != 339) {
		form.setEnabled("cpAprovaASO", false);
		form.setEnabled("cpParecerASO", false);
	}
	
	if (atividade != 96) {
		form.setEnabled("parecerAHMP", false);
	}
	
	if (atividade != 313) {
		form.setEnabled("aprovarPreenchimento", false);
		form.setEnabled("parecerPreenchimento", false);
	}
	
    if (atividade != 354) {
        form.setEnabled("cpAprovacaoASO", false);
        form.setEnabled("cpParecerConfASO", false);
    }
    
    if (atividade != 374) {
        form.setEnabled("cpReabertura", false);
        form.setEnabled("cpParecerReabertura", false);
    }
}
