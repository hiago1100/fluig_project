function defineStructure() { 

    campos.forEach(function (a) { 
        addColumn(a) }), 
        setKey(["documentid"]), 
        addIndex(["documentid"]) 
    } 
    
function onSync(a) { 

    return buscaDataset() 
} 

function createDataset(a, t, e) { 

    return buscaDataset() 
} 

function buscaDataset() { 

    var a = DatasetBuilder.newDataset(); 

    campos.forEach(function (t) { 
        a.addColumn(t) 
    }); 
    
    try { 
        var t = getParamGeral(); 

        getDocumentosPendentes(campos).forEach(function (e) { 
            var o = integraDocumento(t, e), 
            r = "A" === e.status ? "Aprovado" : "R" === e.status ? "Reprovado" : "Cancelado"; 
            if (e.integrado === o.integrado && 
                e.statusIntegracao === o.statusIntegracao && 
                e.notificaErro || 
                (e.integrado = o.integrado, e.statusIntegracao = o.statusIntegracao, e.alterado = !0), o.error) e.notificaErro && 
                e.statusIntegracao === o.statusIntegracao || 
                (notificaGeral(t, e, r, o.statusIntegracao, "Erro ao integrar " + e.tipoDocto, 
                "Ocorreram erros ao tentar integrar o documento abaixo", t.emailNotificaErros), e.notificaErro = "ok", e.alterado = !0); 

                else if (!e.notifica && "A" === e.status) { 
                    var n = getNotificaTerceiros(e.codTipoDocto); 
                    n.forEach(function (a) { 
                        notificaGeral(t, e, r, "", e.tipoDocto + " " + r, "O documento abaixo foi " + r, a.email) 

                    }), e.notifica = "ok", e.alterado = !0 
                } 
                if (e.alterado) { 

                    var i = getTabelaAprovadores(e); atualizaDocumento(e, t, i) 
                } 
                
                var s = []; 
                campos.forEach(function (a, t) { 
                    s[t] = e[a] || "" 
                }), 
                
                a.addOrUpdateRow(s) 
            }) 
        } catch (a) { 

            log.error("*** ERRO adf_aprovacao_docto: " + a.message) 

        }
        
        return log.info("*** adf_aprovacao_docto fim ***"), a 
    } 
    function onMobileSync(a) { } 
    
    function getTabelaAprovadores(a) { 

        var t = DatasetFactory.createConstraint("nrTrans", a.codProcesso, a.codProcesso, ConstraintType.MUST); 
        return DatasetFactory.getDataset("adf_get_status_aprovacao", null, [t], null) 
    } 
    
    function callDatasul(a, t, e, o) { 

        log.info(">>>>>> tenantId: " + o); 
        var r = ServiceManager.getService("WSEXECBO"), 
        n = r.instantiate("com.totvs.framework.ws.execbo.service.WebServiceExecBO"), 
        i = n.getWebServiceExecBOPort(); 
        e.ttParam[0].tmpField = "";

        var s = { 
            dsInput: e 
        }, 
        c = [{ dataType: "longchar", name: "wsInput", value: JSON.stringify(s), type: "input" }, 
        { dataType: "longchar", name: "wsOutput", value: "", type: "output" }], 
        l = JSON.stringify(c), 
        d = i.userLogin("super"), 
        u = void 0; u = o ? i.callProcedureWithTokenAndCompany(d, o, "adf/adfapi001.p", "pi-aprova-reprova", l) : i.callProcedureWithToken(d, a, t, l), 
        log.info("Retorno callDatasul: " + u); 
        log.info("JSON:>>>>>" + l);
        var m = JSON.parse(u), 
        g = "" != m[0].value ? JSON.parse(m[0].value) : ""; return g.dsOutput || g 
    } 
    
    function sendCustomEmail(a) { 

        var t = new java.util.HashMap, 

        e = java.io.File.separator, 
        o = (new javax.naming.InitialContext).lookup("java:global/fluig/ecm-ejb/wdk/GlobalParam"), 
        r = o.read(a.companyId).getTemplatesFolder() + e + "tplmail" + e + a.templateId + e + a.templateDialect, 
        n = (new javax.naming.InitialContext).lookup("java:global/fluig/wcm-core/service/SDK"); 

        if (t.put("SERVER_URL", n.getServerURL()), 
            t.put("SERVER_EXTERNAL_URL", n.getServerContextURL()), 
            t.put("SERVER_PROTECTED_URL", n.getProtectedTenantContextPath()), 
            t.put("COMPANY_ID", a.companyId), a.dados) 
            
        for (param in a.dados) 
            t.put(param, a.dados[param]); 
            com.fluig.foundation.mail.EMailSenderFactory.getEMailSender().customEmail(new java.lang.Long(a.companyId), a.subject, a.from, a.to, r, a.templateHtml, "text/html", t)

    } 
        
    function getParamGeral() {

        var a = new Array(DatasetFactory.createConstraint("metadata#active", !0, !0, ConstraintType.MUST)), 
        t = DatasetFactory.getDataset("adf_param_geral", null, a, null), 
        e = {}, 
        o = ["usuarioErp", "senhaErp", "empresaFluig", "usuarioFluig", "senhaFluig", "emailNotifica", "emailNotificaErros"]; 

        return t.rowsCount > 0 && o.forEach(function (a) { 

            e[a] = String(t.getValue(0, a)) 
        }), e 
    } 
    
    function getDocumentosPendentes(a) {

        var t = DatasetFactory.createConstraint("integrado", "false", "false", ConstraintType.MUST), 
        e = DatasetFactory.createConstraint("status", "P", "P", ConstraintType.MUST_NOT), 
        o = DatasetFactory.getDataset("adf_aprovacao_docto", null, [t, e], null), 
        r = []; 
        
        if (o.rowsCount > 0) 
            for (var n = 0; n < o.rowsCount; n++)!
                function (t) { 
                    if ("true" === String(o.getValue(t, "metadata#active")) && (o.getValue(t, "codProcesso") > 194959)) { 
                        // log.info("getDocumentosPendentes 7"), 
                        // og.info(o.getValue(t, "metadata#active")), 
                        // log.info(o.getValue(t, "dataRef")); 
                        var e = {};
                        a.forEach(function (a) { 
                            e[a] = "null" === String(o.getValue(t, a)) ? null : String(o.getValue(t, a)) }), 
                            r.push(e) 
                            log.info("retorno");
                            log.dir(r);
                        } }(n); 
                            return r 
    }
    
    function integraDocumento(a, t) { 
        var e = {}; 
        e["nr-trans"] = t.nrTrans, 
        e.tipo = t.status, 
        e.usuario = a.usuarioErp, 
        e.senha = a.senhaErp; 
        
        var o = { 
            
            ttParam: [e] 
        }, 
        
        r = { 
            integrado: "false", 
            statusIntegracao: "", 
            error: !1 
        }; 
        
        try { 
            
            var n = callDatasul("adf/adfapi001.p", "pi-aprova-reprova", o, t.codEmpresa); 
            
            if (!n || !n.ttIntegracao) { 
                
                var i = ""; 
                throw n && n.ttErro && n.ttErro.length > 0 ? (n.ttErro.forEach(function (a) { i += a.mensagem + "\n\n" }), i) : "Não foi possível identificar o erro. Consulte os logs do ERP e do Fluig para mais detalhes." } 
                r.integrado = "true" 
            
            } catch (i) { 
                
                log.info(i), r.integrado = "false", r.statusIntegracao = i.message || i, r.error = !0 
            
            } 
            
            return r 
        } 
        
        function notificaGeral(a, t, e, o, r, n, i) { 

            var s = { 
                tipoDocto: t.tipoDocto, 
                descricao: t.descricao, 
                empresa: t.empresa, 
                estab: t.estab, 
                valor: t.valor ? Number(t.valor).toMoney() : "Não informado", dataRef: t.dataRef || "Não informada", labelDataRef: t.labelDataRef || "Data Referência", codProcesso: t.codProcesso, status: e, detalhes: o, descricaoEmail: n 
            }; 
                
            try { 
                sendCustomEmail({ companyId: a.empresaFluig, from: a.emailNotifica, subject: r, to: i, templateId: "adf_notifica_geral", templateDialect: "pt_BR", templateHtml: "adf_notifica_geral.html", dados: s }), 
                log.info("*** notificaGeral - EMAIL ENVIADO COM SUCESSO! - ") 

            } catch (a) { 
                log.error("*** ADF notificaGeral - ERRO AO ENVIAR EMAIL! " + a) 
            } 
        }
        
        function getNotificaTerceiros(a) { 

            var t = DatasetFactory.createConstraint("codTipoDocto", a, a, ConstraintType.MUST), 
            e = DatasetFactory.getDataset("adf_notifica_terceiros", null, [t], null), 
            o = []; 
            
            if (e.rowsCount > 0) { 

                var r, n; 

                !function () {
                    var a = e.getValue(0, "metadata#id"), 
                    t = e.getValue(0, "metadata#version"), 
                    i = DatasetFactory.createConstraint("tablename", "notificados", "notificados", ConstraintType.MUST), 
                    s = DatasetFactory.createConstraint("metadata#id", a, a, ConstraintType.MUST), 
                    c = DatasetFactory.createConstraint("metadata#version", t, t, ConstraintType.MUST), 
                    l = new Array(i, s, c), 
                    d = DatasetFactory.getDataset("adf_notifica_terceiros", null, l, null), 
                    u = ["nome", "area", "email"]; 
                    
                    for (r = 0; r < d.rowsCount; r++)
                        n = {}, 

                        u.forEach(
                            function (a) { 
                                n[a] = d.getValue(r, a) 
                            }
                        ), 
                        
                        o.push(n) 
                    }() 
                } 
                return o 
        }

        function atualizaDocumento(a, t, e) {

            var o = ServiceManager.getServiceInstance("CardService"), 
            r = o.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService"), 
            n = r.getCardServicePort(), i = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray"), 
            s = 0;
            ["statusIntegracao", "integrado", "notifica", "notificaErro"].forEach(function (t, e) { 
                var r = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto"); 
                log.info(t + ": " + a[t] || ""), 
                r.setField(t), 
                r.setValue(a[t] || ""), 
                i.getItem().add(e, r), 
                s++ 

            }), 

            log.info("adicionando campos da tabela"); 

            for (var c = 0; c < e.rowsCount; c++) { 
                log.info("adicionando primeira linha"); 
                var l = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto"), 
                d = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto"), 
                u = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto"), 
                m = o.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto"); 
                log.info("campo: aprovadorEmail - " + e.getValue(c, "aprovadorEmail")), 
                log.info("campo: aprovadorStatus - " + e.getValue(c, "aprovadorStatus")), 
                log.info("campo: aprovadorSeq - " + e.getValue(c, "aprovadorSeq")), 
                log.info("campo: aprovadorData - " + e.getValue(c, "aprovadorData")), 
                log.info("aprovadorEmail___" + c), 
                l.setField("aprovadorEmail___" + (c + 1)), 
                l.setValue(e.getValue(c, "aprovadorEmail") || ""), 
                i.getItem().add(s, l), s++ , 
                d.setField("aprovadorStatus___" + (c + 1)), 
                d.setValue(e.getValue(c, "aprovadorStatus") || ""), 
                i.getItem().add(s, d), 

                s++ , 
                u.setField("aprovadorSeq___" + (c + 1)), 
                u.setValue(e.getValue(c, "aprovadorSeq") || ""), 
                i.getItem().add(s, u), 
                s++ , 
                m.setField("aprovadorData___" + (c + 1)),
                m.setValue(e.getValue(c, "aprovadorData") || ""), 
                i.getItem().add(s, m), 
                s++ , 
                log.info("adicionando primeira linha fim") 
            } 
            
            log.info("antes updateCardData"),

            n.updateCardData(t.empresaFluig, t.usuarioFluig, t.senhaFluig, a.documentid, i), 

            log.info("depois updateCardData") 
        } 
        var campos = ["documentid", "nrTrans", "integrado", "status", "statusIntegracao", "codProcesso", "notifica", "notificaErro", "codEmpresa", "empresa", "codEstab", "estab", "valor", "descricao", "codTipoDocto", "tipoDocto", "dataRef", "labelDataRef"]; 
        
        Number.prototype.toMoney = function (a, t, e) { 
            var o = this, 
            a = isNaN(a = Math.abs(a)) ? 2 : a, 
            t = void 0 === t ? "," : t, 
            e = void 0 === e ? "." : e, 
            r = o < 0 ? "-" : "", 
            n = String(parseInt(o = Math.abs(Number(o) || 0).toFixed(a))), 
            i = (i = n.length) > 3 ? i % 3 : 0; 
            return r + (i ? n.substr(0, i) + e : "") + n.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + e) + (a ? t + Math.abs(o - n).toFixed(a).slice(2) : "") 
        };