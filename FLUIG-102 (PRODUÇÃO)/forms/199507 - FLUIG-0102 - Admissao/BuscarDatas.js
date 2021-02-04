function BuscarDatas() {

	this.Gerar = function (DiaMin, DiaMax) {
		var Hoje = new Date();
		var DatasDesativadas = [];
		for (var AnoCalculado = Hoje.getFullYear(), AnoPassado = Hoje.getFullYear(); AnoCalculado <= Hoje.getFullYear() + 100; AnoCalculado++ , AnoPassado--) {
			for (var MesCalculado = 1; MesCalculado <= 12; MesCalculado++) {
				for (var DiaCalculado = DiaMin; DiaCalculado <= DiaMax; DiaCalculado++) {
					if (DiaCalculado <= this.TotalDiasMes(MesCalculado, AnoCalculado)) {
						DatasDesativadas.push(DiaCalculado + "/" + MesCalculado + "/" + AnoCalculado);
					}

					if (DiaCalculado <= this.TotalDiasMes(MesCalculado, AnoPassado)) {
						DatasDesativadas.push(DiaCalculado + "/" + MesCalculado + "/" + AnoPassado);
					}
				}
			}
		}



		return DatasDesativadas;
	}

	this.TotalDiasMes = function (month, year) {
		return new Date(year, month, 0).getDate();
	}
}