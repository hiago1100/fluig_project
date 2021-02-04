/**
 *
 * @desc        Realiza consulta ao banco de dados do Fluig
 * @copyright   2018 upFlow.me
 * @version     1.0.0
 *
 * @param       {array String} fields - Deve-se informar um array os seguintes valores:
                                        INDEX0 = Cód de Sentença (Ex.: '3');
                                        INDEX1...n = Valores para campos de filtro nas querys;
 * @param       {array Constraint} constraints - Deve-se informar o objeto contendo todos os filtros necessários para exectar a consulta
 * @param       {array String} sortFields - Não utilizado. Informar null
 * @return      {dataset} Retorna o resultado da consulta com todas as colunas
 *
 */

function createDataset(fields, constraints, sortFields) {
    log.info('uf-log | Chamada do DataSet ds_DBFluigConsulta.js');

    // nome do datasource cadastrado no standalone.xml do Fluig
    var DATASOURCE = "jdbc/FluigDS";

    var QUERY = ""; // variável da query que será executada
    var CODSENTENCA = ""; // código de sentença que localiza a query
    var FILTROS = ""; // filtros que serão aplicados a query

    // resgata as variaveis passadas através do parâmetro fields do DataSet
    if (fields == null) return exibeErro('Parâmetro fields em branco.');
    if (fields[0] == '') return exibeErro('Parâmetro fields em branco. Informe o Cód. de Sentença.');

    // define o valor do código de sentença
    CODSENTENCA = fields[0];

    try {

        FILTROS = parseConstraints(constraints);

    } catch (e) {
        return exibeErro('Erro ao criar filtros (linha: ' + e.lineNumber + '): ' + e.message); // faz a chamada da função que exibe o erro
    }

    try {

        var CONSULTAINFO = lstConsulta[CODSENTENCA]; // consulta informações da sentença informada
        if (CONSULTAINFO == undefined) throw 'O Cód. de Sentença informado (' + CODSENTENCA + ') não é suportado pelo DataSet.';

        // informativo dos dados recebidos no log
        log.info("uf-log | Dados recebidos pelo dataset:");
        log.info("uf-log | DESCRIÇÃO: " + CONSULTAINFO.desc);
        log.info("uf-log | CODSENTENCA: " + CODSENTENCA);
        log.info("uf-log | FILTROS: " + FILTROS);


    } catch (e) {
        return exibeErro('Erro nos parâmetros passados através do fields do DataSet: ' + e); // faz a chamada da função que exibe o erro
    }

    // cria a query de acordo com o filtro informado
    try {

        // se tem filtro específico no fields[n] envia para montar a query
        QUERY = CONSULTAINFO.query(FILTROS, fields);
        
        log.info("uf-log | QUERY (início)" );
        log.dir(QUERY);
        log.info("uf-log | QUERY (final)" );

    } catch (e) {
        return exibeErro('Erro ao criar query (linha: ' + e.lineNumber + '): ' + e.message); // faz a chamada da função que exibe o erro
    };

    try {

        var newDataset = DatasetBuilder.newDataset();
        var ic = new javax.naming.InitialContext();
        var ds = ic.lookup(DATASOURCE);
        var created = false;

    } catch (e) {
        return exibeErro('Erro ao criar acessar base (linha: ' + e.lineNumber + '): ' + e.message); // faz a chamada da função que exibe o erro
    }

    try {

        var conn = ds.getConnection();
        var stmt = conn.createStatement();

        // informativo da chamada no log
        log.info("uf-log | Executando consulta ao Banco de Dados: "+DATASOURCE);

        // faz a chamada para execução da query
        var rs = stmt.executeQuery(QUERY);

        // informativo do resultado da consulta
        log.info("uf-log | Chamada realizada com sucesso.");
        var columnCount = rs.getMetaData().getColumnCount();

        // loop no resultado criando as linhas do dataset
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    var column = rs.getMetaData().getColumnName(i);
                    newDataset.addColumn(column);
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }

    } catch (e) {
        return exibeErro('Erro ao executar a query (linha: ' + e.lineNumber + '): ' + e.message); // faz a chamada da função que exibe o erro
    } finally {
        if (stmt != null) stmt.close();
        if (conn != null) conn.close();
    }

    return newDataset;

}

/**
 * @desc 	Localiza, monta e retorna a query conforme cod. sentença e filtros informado
 */
var lstConsulta = {
    0: {
        desc: 'Consulta de Teste',
        query: function(filtro, fields) {

            var _query = "SELECT * FROM $tabela";
            _query = _query.replace('$tabela', fields[1]);
            
            return _query;
        },
    },
    1: {
        desc: 'Consulta de solicitações Em Andamento do Processo CEF para painel de Vendas',
        query: function(filtro, fields) {  
            
        	var _query = '\
            SELECT \
            ds.documentid, \
            wkf.NUM_PROCES, \
            ds.txt_num_venda, \
            wkf.START_DATE, \
            ds.txt_nome_empreend, \
            ds.txt_cod_empreend, \
            ds.txt_num_bloco, \
            ds.txt_num_unidade, \
            his.NUM_SEQ_ESTADO, \
            est.NOM_ESTADO, \
            his.MOVTO_DATE_TIME \
            FROM $tabela as ds \
            JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid) \
            JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL) \
            JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS) \
            WHERE wkf.STATUS = 0 AND $filtro \
            AND wkf.STATUS <> 1 \
            ORDER BY ds.documentid';
            
            _query = _query.replace('$tabela', fields[1]);
            _query = _query.replace('$filtro', filtro);
            
            return _query;
        },
    },
    2: {
        desc: 'Consulta os dados da última sincronização de Processos CEF do PVI',
        query: function(filtro, fields) {  
            
        	var _query = '\
            SELECT TOP 1 ds.DATA_HORA \
            FROM $tabela as ds \
            JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            ORDER BY ds.DATA_HORA DESC';
            
            _query = _query.replace('$tabela', fields[1]);
            //_query = _query.replace('$filtro', filtro);
            
            return _query;
        },
    },
    3: {
        desc: 'Retorna a quantidade de processos em cada estado do Processo CEF',
        query: function(filtro, fields) {  
            
        	var _query = "\
            SELECT \
            est.NUM_SEQ, \
            est.NOM_ESTADO, \
            count(est.NUM_SEQ) AS QTD \
            FROM $tabela as ds  \
            JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1)  \
            JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid)  \
            JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL)  \
            JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS)  \
            WHERE $filtro \
            AND wkf.STATUS <> 1 \
            GROUP BY est.NUM_SEQ, est.NOM_ESTADO \
            ORDER BY est.NUM_SEQ DESC";
            
            //             WHERE ds.txt_cod_empreend = '$codemp' \
            // -- WHERE wkf.STATUS = 0 // retorna apenas os processos em andamento

            _query = _query.replace('$tabela', fields[1]);
            _query = _query.replace('$filtro', filtro);
            //_query = _query.replace('$codemp', fields[2]);
            
            return _query;
        },
    },
    4: {
        desc: 'Consulta os empreendimentos e responsaveis',
        query: function(filtro, fields) {

        	var a_query = " \
                SELECT	DISTINCT \
                        ML.txt_resp_cod, \
                        ML.txt_nome_empreend as 'txt_cod_empreend' \
                FROM	ML001005 AS ML, \
                        DOCUMENTO AS DOC, \
                        HISTOR_PROCES AS HIS, \
                        PROCES_WORKFLOW AS WKF \
                WHERE	DOC.versao_ativa = 1 \
                        AND DOC.nr_versao = ML.version \
                        AND (HIS.NUM_PROCES = ML.txt_num_protocolo AND HIS.LOG_FLUXO_RET IS NULL) \
                        AND (HIS.NUM_PROCES = WKF.NUM_PROCES AND HIS.LOG_FLUXO_RET IS NULL) \
                        AND WKF.STATUS <> 1 \
                        AND ML.txt_nome_empreend <> '' \
                        AND ML.txt_nome_empreend <> 'null' \
                GROUP BY ML.txt_resp_cod , ML.txt_nome_empreend "; 
            
            var _query = "\
                SELECT \
                    ds.txt_resp_cod, \
                    ds.txt_nome_empreend as 'txt_cod_empreend' \
                FROM ML001005 as ds \
                    JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
                    JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid ) \
                    JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL) \
                    JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS) \
                WHERE ds.txt_nome_empreend <> '' \
                    AND ds.txt_nome_empreend <> 'null' \
                    AND ds.txt_resp_cod <> 'null' \
                    AND ds.txt_resp_cod <> '' \
                    AND wkf.STATUS <> 1 \
                GROUP by ds.txt_nome_empreend ,ds.txt_resp_cod ";

            return _query;
        },
    },
    5: {
        desc: 'Consulta o status das solicitacoes',
        query: function(filtro, fields) {

            var _query = " \
                SELECT \
                    est.NUM_SEQ, \
                    est.NOM_ESTADO, \
                    count(est.NUM_SEQ) AS QTD \
                FROM ML001005 as ds  \
                    JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1)  \
                    JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid )  \
                    JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL)  \
                    JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS)  \
                WHERE $filtro \
                    AND ds.txt_nome_empreend <> '' \
                    AND ds.txt_nome_empreend <> 'null' \
                    AND ds.txt_resp_cod <> '' \
                    AND ds.txt_resp_cod <> 'null' \
                    AND wkf.STATUS <> 1 \
                GROUP BY est.NUM_SEQ, est.NOM_ESTADO \
                ORDER BY est.NUM_SEQ DESC";
                        
            _query = _query.replace('$filtro', filtro);

            return _query;
        },
    },
    6: {
      desc: 'Consulta o status das solicitacoes',
      query: function(filtro, fields) {

          var _query = " \
            SELECT \
              ds.txt_cod_empreend, \
              MAX(ds.txt_nome_empreend) as 'txt_nome_empreend', \
              his.NUM_SEQ_ESTADO, \
              MAX(est.NOM_ESTADO) as 'NOM_ESTADO', \
              count(NUM_SEQ_ESTADO) AS 'Qtd' \
            FROM ML001007 as ds \
              JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
              JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid) \
              JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL) \
              JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS) \
            WHERE wkf.STATUS <> 1 \
            GROUP BY ds.txt_cod_empreend, his.NUM_SEQ_ESTADO \
            ORDER BY ds.txt_cod_empreend, his.NUM_SEQ_ESTADO;";
                      
          _query = _query.replace('$filtro', filtro);

          return _query;
      },
  },
    7: {
        desc: 'Consulta para exportação do Excel através do Painel de Vendas',
        query: function(filtro, fields) {  
            
        	var _query = '\
                SELECT \
                wkf.NUM_PROCES, \
                ds.txt_num_venda, \
                wkf.START_DATE, \
                ds.txt_resp_desc, \
                ds.txt_proponente_1, \
                ds.txt_proponente_2, \
                DS.txt_cca_desc, \
                ds.txt_cod_empreend, \
                ds.txt_nome_empreend, \
                ds.txt_num_bloco, \
                ds.txt_num_unidade, \
                ds.txt_nome_corretor, \
                ds.txt_nome_imobiliaria, \
                CASE    \
                    WHEN his.NUM_SEQ_ESTADO = 12 THEN ds.txa_obs_ressarcimento_fgts \
                    WHEN his.NUM_SEQ_ESTADO = 10 THEN ds.txa_obs_entrega \
                    WHEN his.NUM_SEQ_ESTADO = 15 THEN ds.txa_obs_rec \
                    WHEN his.NUM_SEQ_ESTADO = 17 THEN ds.txa_obs_env \
                    WHEN his.NUM_SEQ_ESTADO = 21 THEN ds.txa_obs_ent_dossie \
                    WHEN his.NUM_SEQ_ESTADO = 38 THEN ds.txt_numero_contrato \
                    WHEN his.NUM_SEQ_ESTADO = 44 THEN ds.txa_obs_ent_cartorio \
                    WHEN his.NUM_SEQ_ESTADO = 46 THEN ds.txt_repons_ent_cef \
                END AS OBS, \
                his.NUM_SEQ_ESTADO, \
                est.NOM_ESTADO \
                FROM $tabela as ds \
                JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
                JOIN PROCES_WORKFLOW AS wkf ON (wkf.NR_DOCUMENTO_CARD = ds.documentid) \
                JOIN HISTOR_PROCES AS his ON (his.NUM_PROCES = wkf.NUM_PROCES AND his.LOG_FLUXO_RET IS NULL) \
                JOIN ESTADO_PROCES AS est ON (est.COD_DEF_PROCES = wkf.COD_DEF_PROCES AND est.NUM_SEQ = his.NUM_SEQ_ESTADO AND est.NUM_VERS = wkf.NUM_VERS) \
                WHERE wkf.STATUS = 0 AND $filtro \
                AND wkf.STATUS <> 1 \
                ORDER BY ds.documentid';
            
            _query = _query.replace('$tabela', fields[1]);
            _query = _query.replace('$filtro', filtro);
            
            return _query;
        },
    },
    8: {
        desc: 'Consulta no Log de envio de emails para pesquisa de satisfação clientes que devem recer novamente o email',
        query: function(filtro, fields) {  
            
            //-- tokens que já responderam a pesquisa
            //SELECT ds.* FROM ML001443 AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1)

            //-- tokens com menos de 3 envios
            //SELECT * FROM
            //(SELECT ds.TOKEN, count(ds.TOKEN) AS QTD FROM ML001444 AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1)
            //GROUP BY ds.TOKEN) AS TBL WHERE QTD < 3
            
            //WHERE CONVERT(date, ds.DTAHRA, 103) = '$dta' AND ds.BLOQUEIO = '0' AND \
            
            var _query = "SELECT DISTINCT CONVERT(date, ds.DTAHRA, 103) AS DTAENVIO, ds.BLOQUEIO, ds.TOKEN, ds.DTAENTREGA, ds.NUMVENDA, ds.SOLICNOME, ds.SOLICCOD, ds.SOLICEMAIL, ds.EMPNOME, ds.EMPCOD, ds.EMPBLOCO, ds.EMPUNIDADE \
            FROM $tblLog AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            WHERE CONVERT(date, ds.DTAHRA, 103) = '$dta' AND \
            ds.TOKEN NOT IN ( \
                SELECT ds.TOKEN FROM $tblPeq AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            ) AND \
            ds.TOKEN IN ( \
                SELECT TOKEN FROM \
                (SELECT ds.TOKEN, count(ds.TOKEN) AS QTD FROM $tblLog AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
                GROUP BY ds.TOKEN) AS TBL WHERE QTD < 3 \
            )";
            
            _query = _query.replace('$dta',     fields[1]);
            _query = _query.replace('$tblLog',  fields[2]);
            _query = _query.replace('$tblLog',  fields[2]); // poderia ser new RegExp(search, 'g') para mudar todas as referências
            _query = _query.replace('$tblPeq',  fields[3]);
            //_query = _query.replace('$filtro', filtro);
            
            return _query;
        },
    },
    9: {
        desc: 'Retorna nome da coluna da tabela sincronizada com base do nome do dataset',
        query: function(filtro, fields) {  
            
            var _query = "SELECT TOP 1 CONCAT('MD001',COD_LISTA) AS TBL FROM META_LISTA WHERE NOM_LISTA = '$dataset' ORDER BY COD_LISTA DESC";
            
            _query = _query.replace('$dataset', fields[1]);
            
            return _query;
        },
    },
    10: {
        desc: 'Consulta resultando das vendas comparando as respostas nas pesquisas de satisfação',
        query: function(filtro, fields) { 
            
            var f = ['9', fields[1]];    // cód. sentença, dataset
            var dsTABLE = DatasetFactory.getDataset('ds_DBFluigConsulta', f, null, null);
            if (!dsTABLE.rowsCount) return exibeErro('Não foi retornado nenhuma tabela.', 'Não há tabela para o dataset ('+fields[1]+') informado.');
            
            var _query = "SELECT *, \
                ISNULL((SELECT count(ds.EMPCOD) AS QTDRESP FROM $tblPeq AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
                WHERE ven.CODEMPREENDIMENTO = ds.EMPCOD GROUP BY ds.EMPCOD), 0) AS QTDRESPOSTAS \
            FROM $tblVen AS ven";
            
            _query = _query.replace('$tblVen', String(dsTABLE.getValue(0, "TBL")));
            _query = _query.replace('$tblPeq', fields[2]);
            
            return _query;
        },
    },
    11: {
        desc: 'Clientes ainda não responderam a pesquisa mesmo após 3 envios de email e que registros não estão bloqueados',
        query: function(filtro, fields) { 
            
            //WHERE CONVERT(date, ds.DTAHRA, 103) = '$dta' AND ds.BLOQUEIO = '0' AND \

            var _query = "SELECT DISTINCT CONVERT(date, ds.DTAHRA, 103) AS DTAENVIO, ds.BLOQUEIO, ds.TOKEN, ds.DTAENTREGA, ds.NUMVENDA, ds.SOLICNOME, ds.SOLICCOD, ds.SOLICEMAIL, ds.EMPNOME, ds.EMPCOD, ds.EMPBLOCO, ds.EMPUNIDADE \
            FROM $tblLog AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            WHERE CONVERT(date, ds.DTAHRA, 103) = '$dta' AND \
            ds.TOKEN NOT IN ( \
                SELECT ds.TOKEN FROM $tblPeq AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
            ) AND \
            ds.TOKEN IN ( \
                SELECT TOKEN FROM \
                (SELECT ds.TOKEN, count(ds.TOKEN) AS QTD FROM $tblLog AS ds JOIN DOCUMENTO AS doc ON (doc.NR_DOCUMENTO = ds.documentid AND doc.NR_VERSAO = ds.version AND doc.VERSAO_ATIVA = 1) \
                GROUP BY ds.TOKEN) AS TBL WHERE QTD >= 3 \
            )";
            
            _query = _query.replace('$dta',     fields[1]);
            _query = _query.replace('$tblLog',  fields[2]);
            _query = _query.replace('$tblLog',  fields[2]); // poderia ser new RegExp(search, 'g') para mudar todas as referências
            _query = _query.replace('$tblPeq',  fields[3]);
            
            return _query;
        },
    },
};

/**
 * @desc 	Transforma o conceito de constraints do Fluig para o Filtro da Query
 * @param	{array Constraint} constraints - Deve-se informar o objeto contendo todos os filtros necessários para chamar a query
 */
function parseConstraints(constraints) {

    // se não foi passado nenhum filtro, retorna filtro vazio
    if (constraints == null || constraints.length <= 0) return "1=1";

    var filtro = ""; // resultado final do filtro

    // percorre as constraints
    for (var i = 0; i < constraints.length; i++) {
        var con = constraints[i];

        // MUST: indicates that all Dataset records must meet this condition.
        // SHOULD: indicates that the Dataset records may or may not meet the condition. This type is more common when you need the same field to have values A or B (where each will be a search condition with type SHOULD).
        // MUST_NOT: indicates that none of the records can satisfy the condition.

        filtro += "(";

        if (con.getConstraintType() == ConstraintType.SHOULD) {

            filtro += "(" + con.getFieldName() + "=" + con.getInitialValue() + ")";
            filtro += " OR ";
            filtro += "(" + con.getFieldName() + "=" + con.getFinalValue() + ")";

        } else {

            if (con.getInitialValue() == con.getFinalValue()) {

                filtro += con.getFieldName();
                if (ConstraintType.MUST == con.getConstraintType()) filtro += " = ";
                if (ConstraintType.MUST_NOT == con.getConstraintType()) filtro += " <> ";
                //filtro += con.getInitialValue();
                filtro += ((typeof con.getInitialValue() == 'number')?con.getInitialValue():"'"+con.getInitialValue()+"'");

            } else {

                filtro += con.getFieldName() + " BETWEEN " + con.getInitialValue() + " AND " + con.getFinalValue();

            }

        }

        filtro += ")"; // fecha constraints
        filtro += " AND "; // se for a última constraints, isso será retirado

    }

    // retorna a string retirando o último " AND "
    return filtro.substr(0, (filtro.length - 5));

}

/**
 * @desc 	Exibe a mensagem de erro do console do Servidor e retorna uma coluna única com o erro para o usuário
 * @param	{string} msg - Mensagem de erro que será gravada no log e exibida ao usuário
 */
function exibeErro(msg) {
    if (msg == null || msg == '') msg = "Erro desconhecido, verifique o log do servidor."; // se mensagem de erro não foi definida
    var msgErro = msg; // incrementa a mensagem de erro vinda do código
    log.error('uf-log | ' + msgErro); // grava log no arquivo 'server.log' do JBOSS
    dataset = DatasetBuilder.newDataset(); // cria um novo DataSet para resposta do erro
    dataset.addColumn("ERRO"); // 1=Erro; 0=Sucesso
    dataset.addColumn("MSG"); // coluna com mensagem do erro para exibição ao usuário final
    dataset.addColumn("DETALHES"); // Mensagem detalhada a ser analisada pelo administrador
    dataset.addRow(new Array('1', 'Ocorreu um erro ao realizar na consulta ao servidor', msgErro)); // cria apenas uma linha com a mensagem de erro
    return dataset; // retorna o erro como resposta do DataSet
}