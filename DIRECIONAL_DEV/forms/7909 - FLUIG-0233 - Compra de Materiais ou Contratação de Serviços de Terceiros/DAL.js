const DAL = (function(){
    var instance;

    function startInstance(){
        /**
         * @description Busca os Insumos ou Composição cadastrados no UAU
         * @param  {[string]}   campo_descricao [Campo para parametrizar o LIKE da consulta SQL]
         * @param  {Function} callback        [description]
         * @return {[json]}                   [description]
         */
        function getListaInsumosComposicaoUAU(campo_descricao, callback){
            let tipo_solicitacao = $('#cpTipoSolicitacao').val();
            let json_insumos;

            if(tipo_solicitacao == '1'){
                json_insumos = Model.get_DS1000("SP_FLUIG_1083", `'MATERIAL', '${campo_descricao}'`).values;

                if(json_insumos.length > 0){
                    callback(true, json_insumos); //callback(status, dados);
                }
                else{
                    callback(false, null);
                }
            }
            else if(tipo_solicitacao == '2'){
                json_insumos = Model.get_DS1000("SP_FLUIG_1083", `'SERVICO', '${campo_descricao}'`).values;

                if(json_insumos.length > 0){
                    callback(true, json_insumos); //callback(status, dados);
                }
                else{
                    callback(false, null);
                }
            }
        }

        /**
         * @description Busca os grupos aprovadores por Nível (N1, N2, N3, N4)
         * @param  {Function} callback [description]
         * @return {[json]}            [description]
         */
        function getAprovadoresNivelEmpresaObraUAU(callback){
            let cod_empresa = $('#cpCodEmpresa').val()
			let cod_obra = $('#cpCodCentroCustoUau').val()
            let json_dados;

			json_dados = Model.get_DS1000("SP_FLUIG_1088", `'${cod_empresa}', '${cod_obra}'`).values;

            if(json_dados != ''){
                callback(true, json_dados);
            }
            else{
                callback(false, null);
            }
        }

        /**
         * @description Busca os dados Papel no FLUIG através do Código do mesmo
         * @param  {[string]}   cod_papel [description]
         * @param  {Function} callback  [description]
         * @return {[json]}             [description]
         */
        function getPapelPorCodigo(cod_papel, callback){
            let c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', cod_papel, cod_papel, ConstraintType.MUST);
            let consulta = DatasetFactory.getDataset("workflowColleagueRole", null, [c1], null).values;

            if(consulta.length != 0){
                console.log(consulta);
                callback(true, consulta);
            }
            else{
                callback(false, null);
            }
        }

        /**
         * @description Busca a lista de feriados cadastrados no FLUIG
         * @param  {Function} callback [description]
         * @return {[array]}            [description]
         */
        function getFeriadosCadastradosFluig(callback){
            const url = `${location.origin}/api/public/2.0/holidays`;
			const xhr = new XMLHttpRequest();

			try{
                xhr.open("GET", url);
    			xhr.responseType = "json";

                xhr.addEventListener("readystatechange", function () {
    				if(xhr.readyState == 4 && xhr.status == 200) {
    					callback(true, xhr.response.content);
    				}
                    else{
                        callback(false, null);
                    }
    			});

    			xhr.send();
            }
            catch(ex){
                console.error('Houve um erro ao consultar os feriados!');
                console.error(ex);
                callback(false, false);
            }
        }

        /**
         * @description Busca os dados do pedido de compra gerado no UAU via Integração FLUIG ~ UAU
         * @param  {Function} callback [description]
         * @return {[json]}            [description]
         */
        function getPedidoCompraUAU(callback){
            let consulta;
            let cod_empresa = $('#cpCodEmpresa').val();
            let cod_obra = $('#cpCodCentroCustoUau').val();
            let num_cotacao = $('#cpNumeroCotacao').val();

            try{
                consulta = Model.get_DS1000("SP_FLUIG_1084", `'${cod_empresa}', '${cod_obra}', '${num_cotacao}'`).values;

                if(consulta != ''){
                    callback(true, consulta);
                }
                else{
                    callback(false, null);
                }
            }
            catch(ex){
                console.error("Houve um erro ao buscar os dados do pedido de compra no UAU!");
                console.error(ex);
                callback(false, null);
            }
        }

        /**
         * @description Busca as empresas vinculadas ao UAU
         * @param  {[string]}   usuario  [description]
         * @param  {Function} callback [description]
         * @return {[json]}            [description]
         */
        function getEmpresaUAU(usuario, callback){
            let consulta;

            try{
                consulta = Model.get_DS1000("SP_FLUIG_1090", `${usuario}, ''`).values;

                if(consulta != ''){
                    callback(true, consulta);
                }
                else{
                    callback(false, null);
                }
            }
            catch(ex){
                console.error("Houve um erro ao buscar os dados da empresa UAU!");
                console.error(ex);
                callback(false, null);
            }
        }

        /**
         * @description Busca as obras vinculadas ao UAU, por codigo de empresa
         * @param  {[string]}   usuario  [description]
         * @param  {[string]}   empresa  [description]
         * @param  {Function} callback [description]
         * @return {[json]}            [description]
         */
        function getObraUAU(usuario, empresa, callback){
            let consulta;

            try{
                consulta = Model.get_DS1000("SP_FLUIG_1090", `'${usuario}', '${empresa}'`).values;

                if(consulta != ''){
                    callback(true, consulta);
                }
                else{
                    callback(false, null);
                }
            }
            catch(ex){
                console.error("Houve um erro ao buscar os dados da obra UAU!");
                console.error(ex);
                callback(false, null);
            }
        }

        /**
         * @description Busca os planejamentos do Produto UAU
         * @param  {[string]}   empresa  [description]
         * @param  {[string]}   obra     [description]
         * @param  {[string]}   produto  [description]
         * @param  {[string]}   ano      [description]
         * @param  {[string]}   mes      [description]
         * @param  {Function} callback [description]
         * @return {[json]}            [description]
         */
        function getPlanejamentoUAU(empresa, obra, produto, mes, ano, callback){
            let consulta;

            try{
                consulta = Model.get_DS1000("SP_FLUIG_1082", `'${empresa}', '${obra}', '${produto}', '${ano}', '${mes}' `).values;

                if(consulta != ''){
                    callback(true, consulta);
                }
                else{
                    callback(false, null);
                }
            }
            catch(ex){
                console.error("Houve um erro ao buscar os dados do planejamento UAU!");
                console.error(ex);
                callback(false, null);
            }
        }

        /**
         * @description Busca os produtos relacionados ao Planejamento do UAU
         * @param  {[string]} obra [description]
         * @return {[type]}      [description]
         */
        function getProdutoUAU(obra, callback){
            let consulta;

            try{
                consulta = Model.get_DS1000("SP_FLUIG_1055", `'${obra}'`).values;

                if(consulta != ''){
                    callback(true, consulta);
                }
                else{
                    callback(false, null);
                }
            }
            catch(ex){
                console.error("Houve um erro ao buscar os dados do produto UAU!");
                console.error(ex);
                callback(false, null);
            }
        }

        return{
            getListaInsumosComposicaoUAU,
            getAprovadoresNivelEmpresaObraUAU,
            getPapelPorCodigo,
            getFeriadosCadastradosFluig,
            getPedidoCompraUAU,
            getEmpresaUAU,
            getObraUAU,
            getPlanejamentoUAU,
            getProdutoUAU
        }
    }

    return{
		getInstance: function(){
			if (!instance){
				instance = startInstance();
			}

			return instance;
		}
	}
})();
