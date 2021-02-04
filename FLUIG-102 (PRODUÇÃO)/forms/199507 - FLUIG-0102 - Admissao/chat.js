function Chat()
{

	this.TableName = "tbDuvidas";
	this.DisplayTable = "tbDuvidasChat";
	this.LastIndex = 0;
	this.OrderDESC = false;
	this.Fields = new Array(
	{
		"name" : "itmTitulo", "busca" : "Empresa", "tipo" : "nome"
	},
	{
		"name" : "itmData", "tipo" : "data"
	},
	{
		"name" : "itmResposta", "busca" : "pergunta", "tipo" : "descricao"
	});

	this.ReplaceValues = new Array(
	{
		"name" : "itmTitulo", "IfValue" : "5", "NewValue" : "Opa"
	});

	this.Colors = new Array(
	{
		"name" : "itmTitulo", "IfValue" : "1", "Color" : "Azul"
	},
	{
		"name" : "itmTitulo", "IfValue" : "2", "Color" : "Verde"
	},
	{
		"name" : "itmTitulo", "IfValue" : "3", "Color" : "Amarelo"
	},
	{
		"name" : "itmTitulo", "IfValue" : "4", "Color" : "Vermelho"
	});

	this.TemplateLine = "<h5> {nome} - {data} <br /> {descricao} </h5>";

	this.Gerar = function()
	{
		var element = this;
		this.AdicionarLinha();

		var DataEncontrada = false;
		for ( var key in this.Fields)
		{
			if (this.Fields[key]["tipo"] == "data")
				DataEncontrada = true;
		}

		if (!DataEncontrada)
		{
			console.log("Chat: Campo de data não encontrado. Favor inserir em Fields um campo do tipo data.");
		}

		for ( var key in this.Fields)
		{
			if (typeof this.Fields[key]['busca'] !== "undefined" && !$("#" + this.Fields[key]['busca']).is(':disabled')
					&& !$("#" + this.Fields[key]['busca']).is('[readonly]'))
			{
				$("#" + this.Fields[key]['busca']).blur(
						function()
						{
							for ( var key2 in element.Fields)
							{
								if (typeof (element.Fields[key2]['busca']) !== "undefined" && element.Fields[key2]['tipo'] != "data")
								{
									var value = $("#" + element.Fields[key2]['busca']).val();
									// Checa valores replace
									for ( var item in element.ReplaceValues)
									{
										if (element.ReplaceValues[item]['name'] == element.Fields[key2]['name']
												&& element.ReplaceValues[item]['IfValue'] == value)
										{
											value = element.ReplaceValues[item]['NewValue'];
										}
									}

									$("#" + element.Fields[key2]['name'] + "___" + element.LastIndex).val(value);
								}
								else if (element.Fields[key2]['tipo'] == "data")
								{
									var Hoje = new Date();
									var Dia = Hoje.getDate();
									if (Dia.toString().length == 1)
										Dia = "0" + Dia.toString();
									var Mes = Hoje.getMonth() + 1;
									if (Mes.toString().length == 1)
										Mes = "0" + Mes.toString();
									var Ano = Hoje.getFullYear();

									var Hora = Hoje.getHours();
									if (Hora.toString().length == 1)
										Hora = "0" + Hora.toString();

									var Minutos = Hoje.getMinutes();
									if (Minutos.toString().length == 1)
										Minutos = "0" + Minutos.toString();

									var Segundos = Hoje.getSeconds();
									if (Segundos.toString().length == 1)
										Segundos = "0" + Segundos.toString();
									$("#" + element.Fields[key2]['name'] + "___" + element.LastIndex).val(
											Dia + "/" + Mes + "/" + Ano + " - " + Hora + ":" + Minutos + ":" + Segundos);
								}
							}
						});
			}
		}

	};

	this.AdicionarLinha = function()
	{
		this.LastIndex = wdkAddChild(this.TableName);
	};

	this.Exibir = function()
	{
		var element = this;
		$("." + this.Fields[0]['name']).each(
				function(elem, index)
				{
					var rowIndex = parseInt(elem);

					if (rowIndex > 0)
					{

						var trClass = "alert-warning";

						for ( var item in element.Colors)
						{
							for ( var key in element.Fields)
							{
								var value = $("#" + element.Fields[key]['name'] + "___" + rowIndex).val();
								if (element.Fields[key]['name'] == element.Colors[item]['name'] && value == element.Colors[item]['IfValue'])
								{
									var color = element.Colors[item]['Color'];
									if (color == "Azul")
									{
										trClass = "alert-info";
									}
									else if (color == "Vermelho")
									{
										trClass = "alert-danger";
									}
									else if (color == "Verde")
									{
										trClass = "alert-success";
									}
								}
							}
						}

						var Template = element.TemplateLine;
						for ( var key in element.Fields)
						{
							Template = Template.replace("{" + element.Fields[key]["tipo"] + "}", $(
									"#" + element.Fields[key]['name'] + "___" + rowIndex).val());
						}

						var html = "<div class='alert " + trClass + "'>";
						html += Template;
						html += "</div>";
						if (!element.OrderDESC)
						{
							$("#" + element.DisplayTable).append(html);
						}
						else
						{
							$("#" + element.DisplayTable).prepend(html);
						}
					}
				});
	};

}
