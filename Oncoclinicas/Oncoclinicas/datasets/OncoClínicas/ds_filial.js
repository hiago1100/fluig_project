function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetFactory.newDataset();
	dataset.addColumn("CODIGO");
	dataset.addColumn("DESCRICAO");
	dataset.addColumn("DESCRICAO_PROTHEUS");
	dataset.addColumn("CGC");
	dataset.addColumn("ENDERECO");
	dataset.addColumn("COMPLEMENTO");
	dataset.addColumn("BAIRRO");
	dataset.addColumn("CIDADE");
	dataset.addColumn("ESTADO");
	dataset.addColumn("ATIVA");
	dataset.addColumn("RADIOTERAPIA");
	dataset.addColumn("LOGIN_BIONEXO");
	dataset.addColumn("SENHA_BIONEXO");

	var	periodicService = ServiceManager.getService('ws_consultasProtheus');
	var serviceHelper = periodicService.getBean();
	var serviceLocator = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wsconsultas_apw.WSCONSULTAS');
	var service = serviceLocator.getWSCONSULTASSOAP();

	var codigo = "";
	var descricao = "";
	var cgc = "";

	if(constraints != undefined && constraints != '' && constraints != null) {
		for (var i in constraints) {
			if(constraints[i].fieldName == "CODIGO"){
				codigo = constraints[i].initialValue;
			}

			if(constraints[i].fieldName == "DESCRICAO"){
				descricao = constraints[i].initialValue;
			}

			if(constraints[i].fieldName == "CGC"){
				cgc = constraints[i].initialValue;
			}
		}

	}

	addFilial(service, dataset, codigo, descricao, cgc);

	return dataset;

}

function addFilial(service, dataset, codigo, descricao, cgc){
	var resultObj = service.wsfilial(codigo, "", cgc);
	var result = resultObj.getWSRETCONSULTAS().toArray();

	for (var x in result) {
		if(result[x].getDESCRICAO() != ""){
			filialFluig = dadosFluig(result[x].getCODIGO());

			if(descricao == "" || filialFluig.filial.indexOf(descricao) != -1){
				dataset.addRow(new Array(result[x].getCODIGO(),
											filialFluig.filial,
											result[x].getDESCRICAO(),
											result[x].getCGC(),
											result[x].getENDERECO(),
											result[x].getCOMPLEMENTO(),
											result[x].getBAIRRO(),
											result[x].getCIDADE(),
											result[x].getESTADO(),
											filialFluig.ativa,
											filialFluig.filialRadioterapia,
											filialFluig.login_bionexo,
											filialFluig.senha_bionexo));
			}
		}
	}
};

function dadosFluig(codigo){

	var c1 = DatasetFactory.createConstraint("metadata#active", "true",	"true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("filial_protheus", codigo, codigo, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var cad_Filiais = DatasetFactory.getDataset("cad_Filiais", null, constraints, null);

	var filialFluig = {};

	if(cad_Filiais.rowsCount != 0){
		for (var i = 0; i < cad_Filiais.rowsCount; i++) {
			filialFluig.ativa = cad_Filiais.getValue(i, "status");
			filialFluig.filial = cad_Filiais.getValue(i, "filial");
			filialFluig.filialRadioterapia = cad_Filiais.getValue(i, "filialRadioterapia");
			filialFluig.login_bionexo = cad_Filiais.getValue(i, "login_bionexo");
			filialFluig.senha_bionexo = cad_Filiais.getValue(i, "senha_bionexo");
		}
	} else{
		filialFluig.ativa = ""
		filialFluig.filial = ""
		filialFluig.filialRadioterapia = ""
		filialFluig.login_bionexo = ""
		filialFluig.senha_bionexo = ""
	}

	return filialFluig;
}