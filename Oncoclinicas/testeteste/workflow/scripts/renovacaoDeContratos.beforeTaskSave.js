function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var ATIVIDADE = getValue("WKNumState");

	if (ATIVIDADE == APROVACAO) {
		var anexos = hAPI.listAttachments();
		var qtdAnexos = anexos.size();
		if (hAPI.getCardValue("decisaoAprovador") == "renovar") {
			if (qtdAnexos == 0) {
				throw "É preciso anexar o contrato para continuar o processo";
			}
		}

		/// Direcionar a atividade para outro processo automatico

		var decisaoRenovcao = hAPI.getCardValue('decisaoAprovador');


		log.info("#### Antes do if -- decisaoRenovcao: " + decisaoRenovcao);

		if (decisaoRenovcao == "renovar") {
			// Busca os valores do formulario
			var filial = hAPI.getCardValue('filial');
			var idFilial = hAPI.getCardValue('idFilial');
			var ctC = hAPI.getCardValue('centroCusto')
			var codcentroCusto = hAPI.getCardValue('codcentroCusto');
			var codResponCompra = hAPI.getCardValue('codResponCompra');
			var nomeResponCompra = hAPI.getCardValue('nomeResponCompra');
			var centroCusto = ctC.split("-");
			try {

				var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
				var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
				var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
				var campos = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
				var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

				var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
				var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
				var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');

				// Adicionando os campos no cardData
				var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo1.getItem().add("txtNmRequisitante");
				fieldCampo1.getItem().add(nomeResponCompra);
				cardData.getItem().add(fieldCampo1);

				var fieldCampo2 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo2.getItem().add("idRequisitante");
				fieldCampo2.getItem().add(codResponCompra);
				cardData.getItem().add(fieldCampo2);

				var fieldCampo3 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo3.getItem().add("txtNomeCentroCusto");
				fieldCampo3.getItem().add(centroCusto[1].trim());
				cardData.getItem().add(fieldCampo3);

				var fieldCampo4 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo4.getItem().add("txtCodCentroCusto");
				fieldCampo4.getItem().add(codcentroCusto);
				cardData.getItem().add(fieldCampo4);

				var fieldCampo5 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo5.getItem().add("filial_protheus");
				fieldCampo5.getItem().add(idFilial);
				cardData.getItem().add(fieldCampo5);

				var fieldCampo6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo6.getItem().add("filial");
				fieldCampo6.getItem().add(filial);
				cardData.getItem().add(fieldCampo6);

				// Serviço WS StartProcess
				var rest = workflowEngineService.startProcess("integrador.fluig@oncoclinicas.com",
															"hUbust*7",
															1,
															"SolicitacaoCompras",
															0,
															stringArray,
															"Solicitação inicializada pela função hAPI",
															codResponCompra,
															false,
															processAttachmentDtoArray,
															cardData,
															processTaskAppointmentDtoArray,
															false);

				var iProcess = "";
				for (var j = 0; j < rest.getItem().size(); j++) {
					var item = rest.getItem().get(j).getItem();
					var key = item.get(0);
					var value = item.get(1);
					log.info("numero do chamado 0 " + value);

					if (key == "iProcess") {
						iProcess = value;
						log.info("numero do chamado 1 " + value);
						hAPI.setCardValue('numChamadoCompra', value);
					}
				}

			} catch (e) {
				throw "Ocorreu um erro ao tentar criar uma solicitação de Compra " + e;
			}
		} else if (decisaoRenovcao == "encerrar") {
			log.info("#### Entrou no encerrar");

			// Busca os valores do formulario
			var filial = hAPI.getCardValue('filial');
			var idFilial = hAPI.getCardValue('idFilial');
			var ctC = hAPI.getCardValue('centroCusto');
			var codcentroCusto = hAPI.getCardValue('codcentroCusto');
			var codResponCompra = hAPI.getCardValue('codResponCompra');
			var nomeResponCompra = hAPI.getCardValue('nomeResponCompra');
			var centroCusto = ctC.split("-");

			log.info("#### -- " + codResponCompra);
			try {

				log.info("#### Entrou no Try");


				var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
				var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
				var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
				var campos = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
				var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

				var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
				var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
				var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');

				// Adicionando os campos no cardData
				var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
				fieldCampo1.getItem().add("filial");
				fieldCampo1.getItem().add(idFilial);
				cardData.getItem().add(fieldCampo1);

				// Serviço WS StartProcess

				var rest = workflowEngineService.startProcess("integrador.guiando@oncoclinicas.com",
					"#9?vu3ip0erO",
					1,
					"Encerramentodecontratos",
					0,
					stringArray,
					"Solicitação inicializada pela função hAPI",
					codResponCompra,
					false,
					processAttachmentDtoArray,
					cardData,
					processTaskAppointmentDtoArray,
					false);

				for (var j = 0; j < rest.getItem().size(); j++) {
					var item = rest.getItem().get(j).getItem();
					var key = item.get(0);
					var value = item.get(1);
					log.info("numero do chamado 0 " + value);

					if (key == "iProcess") {
						iProcess = value;
						log.info("numero do chamado 1 " + value);
						hAPI.setCardValue('numChamadoCompra', value);
					}
				}

			} catch (e) {
				throw "Ocorreu um erro ao tentar criar uma solicitação de Compra " + e;
			}

		}
	}
}