function sendCustomEmail(params) {
  const mimeType = 'text/html';
  const data = new java.util.HashMap();
  const separador = java.io.File.separator;
  const globalParam = new javax.naming.InitialContext().lookup('java:global/fluig/ecm-ejb/wdk/GlobalParam');
  const templatesFolder = `${globalParam.read(params.companyId).getTemplatesFolder() + separador}tplmail${separador}${params.templateId}${separador}${params.templateDialect}`;
  const sdk = new javax.naming.InitialContext().lookup('java:global/fluig/wcm-core/service/SDK');

    // Valores default
  data.put('SERVER_URL', sdk.getServerURL());
  data.put('SERVER_EXTERNAL_URL', sdk.getServerContextURL());
  data.put('SERVER_PROTECTED_URL', sdk.getProtectedTenantContextPath());
  data.put('COMPANY_ID', params.companyId);

    // Copio datos propios del template
  if (params.dados) {
    for (param in params.dados) {
      data.put(param, params.dados[param]);
    }
  }

  com.fluig.foundation.mail.EMailSenderFactory.getEMailSender().customEmail(new java.lang.Long(params.companyId), params.subject, params.from, params.to, templatesFolder, params.templateHtml, mimeType, data);
}
